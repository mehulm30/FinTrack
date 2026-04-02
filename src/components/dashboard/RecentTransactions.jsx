import { useApp } from "../../context/AppContext";
import { formatCurrency, formatShortDate } from "../../utils/finance";
import { CATEGORIES } from "../../data/mockData";

export default function RecentTransactions() {
  const { state, dispatch } = useApp();
  const recent = [...state.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  if (recent.length === 0) {
    return (
      <div className="chart-card">
        <div className="chart-header"><h3>Recent Activity</h3></div>
        <div className="empty-chart">No transactions</div>
      </div>
    );
  }

  return (
    <div className={`chart-card ${state.darkMode ? "dark" : ""}`}>
      <div className="chart-header">
        <h3>Recent Activity</h3>
        <button
          className="see-all-btn"
          onClick={() => dispatch({ type: "SET_TAB", payload: "transactions" })}
        >
          See all →
        </button>
      </div>
      <div className="recent-list">
        {recent.map((t) => {
          const cat = CATEGORIES[t.category] || {};
          return (
            <div key={t.id} className="recent-item">
              <span className="recent-icon" style={{ background: cat.color + "20" }}>
                {cat.icon || "💰"}
              </span>
              <div className="recent-info">
                <span className="recent-desc">{t.description}</span>
                <span className="recent-meta">{cat.label} · {formatShortDate(t.date)}</span>
              </div>
              <span className={`recent-amount ${t.type}`}>
                {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
