import React from "react";
import { useApp } from "../context/AppContext";

export default function Transactions() {
  const { transactions, search, setSearch, role, setTransactions } = useApp();

  const filtered = transactions.filter(t =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const addTransaction = () => {
    const newTx = {
      id: Date.now(),
      date: "2026-03-15",
      amount: 1000,
      category: "Misc",
      type: "expense"
    };
    setTransactions([...transactions, newTx]);
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-5">
      <div className="flex justify-between mb-4 gap-3">
        <input
          className="border p-2 rounded-lg w-full"
          placeholder="Search transactions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {role === "admin" && (
          <button
            onClick={addTransaction}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Add
          </button>
        )}
      </div>

      <div className="space-y-3">
        {filtered.map(t => (
          <div key={t.id} className="flex justify-between p-3 border rounded-lg">
            <span>{t.date}</span>
            <span>{t.category}</span>
            <span className={t.type === "income" ? "text-green-600" : "text-red-600"}>
              ₹{t.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}