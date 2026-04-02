import { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import {
  computeCategoryBreakdown,
  computeMonthlyData,
  formatCurrency,
  getInsights,
} from "../../utils/finance";
import { MONTHS } from "../../data/mockData";

function InsightCard({ insight }) {
  const colors = { warning: "#F59E0B", danger: "#EF4444", success: "#22C55E", info: "#3B82F6" };
  const color = colors[insight.type];
  return (
    <div className="insight-card" style={{ "--ins-color": color }}>
      <div className="insight-icon">{insight.icon}</div>
      <div className="insight-body">
        <div className="insight-title">{insight.title}</div>
        <div className="insight-value" style={{ color }}>{insight.value}</div>
        <div className="insight-detail">{insight.detail}</div>
      </div>
      <div className="insight-bar" style={{ background: color + "22" }}>
        <div className="insight-bar-fill" style={{ background: color }} />
      </div>
    </div>
  );
}

function MonthlyComparison({ monthlyData, darkMode }) {
  if (monthlyData.length < 2) return null;

  const max = Math.max(...monthlyData.flatMap((m) => [m.income, m.expenses]));

  return (
    <div className={`chart-card ${darkMode ? "dark" : ""}`}>
      <div className="chart-header">
        <h3>Monthly Comparison</h3>
        <span className="chart-sub">Income vs Expenses</span>
      </div>
      <div className="bar-chart">
        {monthlyData.map((m, i) => (
          <div key={i} className="bar-group">
            <div className="bar-pair">
              <div className="bar-wrap" title={`Income: ${formatCurrency(m.income)}`}>
                <div
                  className="bar income"
                  style={{ height: `${max > 0 ? (m.income / max) * 100 : 0}%` }}
                />
              </div>
              <div className="bar-wrap" title={`Expenses: ${formatCurrency(m.expenses)}`}>
                <div
                  className="bar expense"
                  style={{ height: `${max > 0 ? (m.expenses / max) * 100 : 0}%` }}
                />
              </div>
            </div>
            <span className="bar-label">{m.label.split(" ")[0]}</span>
          </div>
        ))}
      </div>
      <div className="bar-legend">
        <span><span className="dot income" /> Income</span>
        <span><span className="dot expense" /> Expenses</span>
      </div>
    </div>
  );
}

function TopCategories({ breakdown, darkMode }) {
  const top = breakdown.slice(0, 5);
  const max = top[0]?.value || 1;
  return (
    <div className={`chart-card ${darkMode ? "dark" : ""}`}>
      <div className="chart-header">
        <h3>Top Spending Categories</h3>
      </div>
      <div className="top-cats">
        {top.map((cat, i) => (
          <div key={cat.key} className="top-cat-row">
            <span className="top-cat-rank">#{i + 1}</span>
            <span className="top-cat-icon">{cat.icon}</span>
            <div className="top-cat-info">
              <div className="top-cat-meta">
                <span>{cat.label}</span>
                <span style={{ color: cat.color, fontWeight: 700 }}>{formatCurrency(cat.value)}</span>
              </div>
              <div className="top-cat-bar-bg">
                <div
                  className="top-cat-bar-fill"
                  style={{ width: `${(cat.value / max) * 100}%`, background: cat.color }}
                />
              </div>
            </div>
            <span className="top-cat-pct">{cat.percent}%</span>
          </div>
        ))}
        {top.length === 0 && <p style={{ opacity: 0.5 }}>No expense data available.</p>}
      </div>
    </div>
  );
}

export default function InsightsSection() {
  const { state } = useApp();
  const { transactions, darkMode } = state;

  const monthlyData = useMemo(() => computeMonthlyData(transactions), [transactions]);
  const breakdown = useMemo(() => computeCategoryBreakdown(transactions), [transactions]);
  const insights = useMemo(() => getInsights(transactions, breakdown, monthlyData), [transactions, breakdown, monthlyData]);

  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <h3>No insights yet</h3>
        <p>Add some transactions to see insights.</p>
      </div>
    );
  }

  return (
    <div className="insights-layout">
      <div className="insights-grid">
        {insights.map((ins, i) => <InsightCard key={i} insight={ins} />)}
      </div>
      <div className="insights-charts">
        <MonthlyComparison monthlyData={monthlyData} darkMode={darkMode} />
        <TopCategories breakdown={breakdown} darkMode={darkMode} />
      </div>
    </div>
  );
}
