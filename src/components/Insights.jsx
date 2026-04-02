import React, { useMemo } from "react";
import { useApp } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useApp();

  const topCategory = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  }, [transactions]);

  return (
    <div className="mt-6 bg-white p-5 rounded-2xl shadow-lg">
      <h3 className="font-semibold mb-2">Insights</h3>
      <p className="text-gray-600">Top spending category: <b>{topCategory}</b></p>
    </div>
  );
}