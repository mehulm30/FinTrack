import React, { useMemo } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "../context/AppContext";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function Charts() {
  const { transactions } = useApp();

  const categoryData = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const trendData = transactions.map((t, i) => ({
    name: t.date,
    balance: transactions.slice(0, i + 1).reduce((acc, curr) => acc + (curr.type === "income" ? curr.amount : -curr.amount), 0)
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

      <div className="bg-white rounded-2xl shadow-lg p-5">
        <h3 className="font-semibold mb-4">Spending Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" outerRadius={90}>
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-5">
        <h3 className="font-semibold mb-4">Balance Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}