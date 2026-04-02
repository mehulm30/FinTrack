import { useApp } from "../../context/AppContext";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "transactions", label: "Transactions", icon: "⇄" },
  { id: "insights", label: "Insights", icon: "◎" },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const { activeTab, darkMode } = state;

  return (
    <aside className={`sidebar ${darkMode ? "dark" : ""}`}>
      <div className="sidebar-brand">
        <span className="brand-icon">₹</span>
        <span className="brand-name">FinTrack</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => dispatch({ type: "SET_TAB", payload: item.id })}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {activeTab === item.id && <span className="nav-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="role-badge">
          <span className={`role-dot ${state.role}`} />
          <span>{state.role === "admin" ? "Admin" : "Viewer"}</span>
        </div>
      </div>
    </aside>
  );
}
