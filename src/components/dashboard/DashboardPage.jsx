import SummaryCards from "./SummaryCards";
import BalanceTrend from "./BalanceTrend";
import SpendingBreakdown from "./SpendingBreakdown";
import RecentTransactions from "./RecentTransactions";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <SummaryCards />
      <div className="charts-row">
        <BalanceTrend />
        <SpendingBreakdown />
      </div>
      <RecentTransactions />
    </div>
  );
}
