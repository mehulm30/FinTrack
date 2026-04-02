import { useApp } from "../../context/AppContext";
import { INITIAL_TRANSACTIONS } from "../../data/mockData";
import { applyFilters, computeSummary, formatCurrency } from "../../utils/finance";

export default function Header() {
  const { state, dispatch } = useApp();
  const { role, darkMode, filters, transactions } = state;

  const filtered = applyFilters(transactions, filters);
  const { balance } = computeSummary(filtered);

  const handleExport = () => {
    const csv = [
      "Date,Description,Category,Type,Amount",
      ...transactions.map(
        (t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fintrack_transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (window.confirm("Reset all data to defaults?")) {
      dispatch({ type: "INIT", payload: { transactions: INITIAL_TRANSACTIONS } });
    }
  };

  const TAB_LABELS = { dashboard: "Dashboard", transactions: "Transactions", insights: "Insights" };

  return (
    <header className={`header ${darkMode ? "dark" : ""}`}>
      <div className="header-left">
        <h1 className="page-title">{TAB_LABELS[state.activeTab]}</h1>
        <span className="balance-pill">
          Net Balance: <strong>{formatCurrency(balance)}</strong>
        </span>
      </div>

      <div className="header-right">
        <button className="icon-btn" onClick={handleExport} title="Export CSV">
          ↓ CSV
        </button>

        <button
          className="icon-btn"
          onClick={() => dispatch({ type: "TOGGLE_DARK" })}
          title="Toggle theme"
        >
          {darkMode ? "☀" : "☽"}
        </button>

        <select
          className="role-select"
          value={role}
          onChange={(e) => dispatch({ type: "SET_ROLE", payload: e.target.value })}
        >
          <option value="admin">👤 Admin</option>
          <option value="viewer">👁 Viewer</option>
        </select>

        {role === "admin" && (
          <button className="reset-btn" onClick={handleReset} title="Reset data">
            ↺
          </button>
        )}
      </div>
    </header>
  );
}
