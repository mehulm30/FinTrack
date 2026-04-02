import { useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";
import { computeCategoryBreakdown, formatCurrency } from "../../utils/finance";

function DonutChart({ data, hovered, onHover }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const R = 80, cx = 100, cy = 100, strokeW = 28;
  const circ = 2 * Math.PI * R;

  let offset = 0;
  const slices = data.map((d) => {
    const len = (d.value / total) * circ;
    const slice = { ...d, offset, len };
    offset += len + 2;
    return slice;
  });

  const active = hovered !== null ? data[hovered] : null;

  return (
    <svg viewBox="0 0 200 200" style={{ width: "180px", height: "180px", flexShrink: 0 }}>
      {slices.map((s, i) => (
        <circle
          key={s.key}
          cx={cx} cy={cy} r={R}
          fill="none"
          stroke={s.color}
          strokeWidth={hovered === i ? strokeW + 4 : strokeW}
          strokeDasharray={`${s.len - 2} ${circ - s.len + 2}`}
          strokeDashoffset={-s.offset + circ / 4}
          style={{ transition: "stroke-width 0.2s, opacity 0.2s", opacity: hovered !== null && hovered !== i ? 0.4 : 1, cursor: "pointer" }}
          onMouseEnter={() => onHover(i)}
          onMouseLeave={() => onHover(null)}
        />
      ))}
      <text x={cx} y={cy - 10} textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.5">
        {active ? active.icon : "total"}
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="12" fontWeight="700" fill={active?.color || "currentColor"}>
        {active ? `${active.percent}%` : "spend"}
      </text>
    </svg>
  );
}

export default function SpendingBreakdown() {
  const { state } = useApp();
  const [hovered, setHovered] = useState(null);
  const data = useMemo(() => computeCategoryBreakdown(state.transactions), [state.transactions]);

  if (data.length === 0) {
    return (
      <div className="chart-card">
        <div className="chart-header"><h3>Spending Breakdown</h3></div>
        <div className="empty-chart">No expense data</div>
      </div>
    );
  }

  return (
    <div className={`chart-card ${state.darkMode ? "dark" : ""}`}>
      <div className="chart-header">
        <h3>Spending Breakdown</h3>
        <span className="chart-sub">By category</span>
      </div>
      <div className="breakdown-body">
        <DonutChart data={data} hovered={hovered} onHover={setHovered} />
        <div className="breakdown-legend">
          {data.map((d, i) => (
            <div
              key={d.key}
              className={`legend-item ${hovered === i ? "legend-active" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ "--leg-color": d.color }}
            >
              <span className="legend-dot" style={{ background: d.color }} />
              <span className="legend-icon">{d.icon}</span>
              <span className="legend-label">{d.label}</span>
              <span className="legend-value">{formatCurrency(d.value)}</span>
              <span className="legend-pct">{d.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
