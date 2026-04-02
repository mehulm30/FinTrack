import { useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";
import { computeMonthlyData, formatCurrency } from "../../utils/finance";

export default function BalanceTrend() {
  const { state } = useApp();
  const monthly = useMemo(() => computeMonthlyData(state.transactions), [state.transactions]);
  const [hovered, setHovered] = useState(null);
  const [view, setView] = useState("balance"); // balance | income | expenses

  if (monthly.length === 0) {
    return (
      <div className="chart-card">
        <div className="chart-header">
          <h3>Balance Trend</h3>
        </div>
        <div className="empty-chart">No data yet</div>
      </div>
    );
  }

  const W = 580, H = 220, PAD = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const values = monthly.map((m) => (view === "balance" ? m.balance : view === "income" ? m.income : m.expenses));
  const minVal = Math.min(...values, 0);
  const maxVal = Math.max(...values, 1);
  const range = maxVal - minVal || 1;

  const toX = (i) => PAD.left + (i / (monthly.length - 1 || 1)) * chartW;
  const toY = (v) => PAD.top + chartH - ((v - minVal) / range) * chartH;

  const points = monthly.map((m, i) => ({
    x: toX(i),
    y: toY(values[i]),
    value: values[i],
    label: m.label,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${PAD.top + chartH} L ${PAD.left} ${PAD.top + chartH} Z`;

  const COLORS = { balance: "#22C55E", income: "#3B82F6", expenses: "#F97316" };
  const color = COLORS[view];

  // Y-axis ticks
  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => {
    const v = minVal + (range / ticks) * i;
    return { v, y: toY(v) };
  });

  return (
    <div className={`chart-card ${state.darkMode ? "dark" : ""}`}>
      <div className="chart-header">
        <h3>Monthly Trend</h3>
        <div className="view-toggle">
          {["balance", "income", "expenses"].map((v) => (
            <button
              key={v}
              className={`toggle-btn ${view === v ? "active" : ""}`}
              style={view === v ? { "--btn-color": COLORS[v] } : {}}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-wrap" style={{ position: "relative" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={PAD.left} x2={W - PAD.right} y1={t.y} y2={t.y} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />
              <text x={PAD.left - 8} y={t.y + 4} textAnchor="end" fontSize="10" fill="currentColor" fillOpacity="0.5">
                {Math.abs(t.v) >= 1000 ? `${(t.v / 1000).toFixed(0)}k` : t.v.toFixed(0)}
              </text>
            </g>
          ))}

          {/* Area */}
          <path d={areaD} fill="url(#areaGrad)" />

          {/* Line */}
          <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* X labels */}
          {monthly.map((m, i) => (
            <text key={i} x={toX(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.5">
              {m.label.split(" ")[0]}
            </text>
          ))}

          {/* Dots + hover areas */}
          {points.map((p, i) => (
            <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <circle cx={p.x} cy={p.y} r={hovered === i ? 6 : 4} fill={color} stroke="white" strokeWidth="2" style={{ transition: "r 0.15s" }} />
              <rect x={p.x - 20} y={PAD.top} width={40} height={chartH} fill="transparent" />
            </g>
          ))}

          {/* Tooltip */}
          {hovered !== null && (() => {
            const p = points[hovered];
            const tx = Math.min(Math.max(p.x, 80), W - 80);
            return (
              <g>
                <line x1={p.x} x2={p.x} y1={PAD.top} y2={PAD.top + chartH} stroke={color} strokeOpacity="0.3" strokeDasharray="4 4" />
                <rect x={tx - 60} y={p.y - 38} width={120} height={34} rx="6" fill={state.darkMode ? "#1e1e2e" : "#fff"} stroke={color} strokeOpacity="0.3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))" />
                <text x={tx} y={p.y - 22} textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.6">{p.label}</text>
                <text x={tx} y={p.y - 10} textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>{formatCurrency(p.value)}</text>
              </g>
            );
          })()}
        </svg>
      </div>
    </div>
  );
}
