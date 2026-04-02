import { useApp } from "./context/AppContext";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import DashboardPage from "./components/dashboard/DashboardPage";
import TransactionsPage from "./components/transactions/TransactionsPage";
import InsightsSection from "./components/insights/InsightsSection";

export default function App() {
  const { state } = useApp();
  const { activeTab, darkMode } = state;

  return (
    <div className={`app-shell ${darkMode ? "dark" : ""}`}>
      <Sidebar />
      <div className="main-area">
        <Header />
        <main className="content-area">
          {activeTab === "dashboard" && <DashboardPage />}
          {activeTab === "transactions" && <TransactionsPage />}
          {activeTab === "insights" && <InsightsSection />}
        </main>
      </div>
    </div>
  );
}
