import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";

export default function FiltersBar() {
  const { state, dispatch } = useApp();
  const { filters, transactions } = state;

  const months = [...new Set(
    transactions.map((t) => {
      const d = new Date(t.date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    })
  )].sort().reverse();

  const setFilter = (payload) => dispatch({ type: "SET_FILTER", payload });

  const hasActive =
    filters.search ||
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.month !== "all";

  return (
    <div className={`filters-bar ${state.darkMode ? "dark" : ""}`}>
      <div className="search-wrap">
        <span className="search-icon">⌕</span>
        <input
          className="search-input"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter({ search: e.target.value })}
        />
        {filters.search && (
          <button className="clear-search" onClick={() => setFilter({ search: "" })}>✕</button>
        )}
      </div>

      <div className="filter-selects">
        <select
          className="filter-select"
          value={filters.type}
          onChange={(e) => setFilter({ type: e.target.value })}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="filter-select"
          value={filters.category}
          onChange={(e) => setFilter({ category: e.target.value })}
        >
          <option value="all">All Categories</option>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <option key={key} value={key}>{cat.icon} {cat.label}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={filters.month}
          onChange={(e) => setFilter({ month: e.target.value })}
        >
          <option value="all">All Months</option>
          {months.map((m) => {
            const [y, mo] = m.split("-");
            const label = new Date(y, mo - 1).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
            return <option key={m} value={m}>{label}</option>;
          })}
        </select>

        <select
          className="filter-select"
          value={filters.sortBy}
          onChange={(e) => setFilter({ sortBy: e.target.value })}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>

        {hasActive && (
          <button className="clear-filters-btn" onClick={() => dispatch({ type: "RESET_FILTERS" })}>
            Clear ✕
          </button>
        )}
      </div>
    </div>
  );
}
