import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";

export default function SummaryCards() {
  const { transactions } = useApp();

  const { income, expenses, balance } = useMemo(() => {
    let income = 0, expenses = 0;
    transactions.forEach(t => {
      if (t.type === "income") income += t.amount;
      else expenses += t.amount;
    });
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  const cards = [
    { title: "Balance", value: balance, color: "bg-blue-500" },
    { title: "Income", value: income, color: "bg-green-500" },
    { title: "Expenses", value: expenses, color: "bg-red-500" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((c, i) => (
        <motion.div key={i} whileHover={{ scale: 1.05 }}>
          <div className={`p-5 rounded-2xl shadow-lg text-white ${c.color}`}>
            <p className="text-sm opacity-80">{c.title}</p>
            <h2 className="text-3xl font-bold">₹{c.value}</h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
}