import { useApp } from "../../context/AppContext";
import { computeSummary, formatCurrency } from "../../utils/finance";

export default function SummaryCards() {
  const { state } = useApp();
  const { income, expenses, balance } = computeSummary(state.transactions);

  const cards = [
    {
      label: "Total Balance",
      value: formatCurrency(balance),
      sub: "Income minus expenses",
      accent: "#22C55E",
      icon: "◈",
      positive: balance >= 0,
    },
    {
      label: "Total Income",
      value: formatCurrency(income),
      sub: `${state.transactions.filter((t) => t.type === "income").length} transactions`,
      accent: "#3B82F6",
      icon: "↑",
      positive: true,
    },
    {
      label: "Total Expenses",
      value: formatCurrency(expenses),
      sub: `${state.transactions.filter((t) => t.type === "expense").length} transactions`,
      accent: "#F97316",
      icon: "↓",
      positive: false,
    },
    {
      label: "Savings Rate",
      value: income > 0 ? `${(((income - expenses) / income) * 100).toFixed(1)}%` : "—",
      sub: "Of total income saved",
      accent: "#A855F7",
      icon: "◎",
      positive: income > expenses,
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <div key={card.label} className="summary-card" style={{ "--card-accent": card.accent }}>
          <div className="card-header">
            <span className="card-icon" style={{ color: card.accent }}>{card.icon}</span>
            <span className="card-label">{card.label}</span>
          </div>
          <div className="card-value" style={{ color: card.accent }}>
            {card.value}
          </div>
          <div className="card-sub">{card.sub}</div>
          <div className="card-bar">
            <div
              className="card-bar-fill"
              style={{
                width: income > 0 ? `${Math.min((Math.abs(expenses) / income) * 100, 100)}%` : "0%",
                background: card.accent,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
