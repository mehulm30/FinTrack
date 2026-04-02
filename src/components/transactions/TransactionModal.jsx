import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";
import { generateId } from "../../utils/finance";

const EMPTY = {
  description: "",
  amount: "",
  category: "food",
  type: "expense",
  date: new Date().toISOString().split("T")[0],
};

export default function TransactionModal({ transaction, onClose }) {
  const { dispatch, state } = useApp();
  const isEdit = !!transaction;
  const [form, setForm] = useState(transaction || EMPTY);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) e.amount = "Must be > 0";
    if (!form.date) e.date = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      id: form.id || generateId(),
    };
    dispatch({ type: isEdit ? "EDIT_TRANSACTION" : "ADD_TRANSACTION", payload });
    onClose();
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
    },
  });

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal ${state.darkMode ? "dark" : ""}`}>
        <div className="modal-header">
          <h3>{isEdit ? "Edit Transaction" : "New Transaction"}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <label>Type</label>
            <div className="type-toggle">
              {["expense", "income"].map((t) => (
                <button
                  key={t}
                  className={`type-btn ${form.type === t ? "active " + t : ""}`}
                  onClick={() => setForm((f) => ({ ...f, type: t }))}
                >
                  {t === "income" ? "↑ Income" : "↓ Expense"}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input className={`form-input ${errors.description ? "error" : ""}`} placeholder="e.g. Grocery Shopping" {...field("description")} />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Amount (₹)</label>
              <input className={`form-input ${errors.amount ? "error" : ""}`} type="number" placeholder="0" min="0" {...field("amount")} />
              {errors.amount && <span className="form-error">{errors.amount}</span>}
            </div>
            <div className="form-group">
              <label>Date</label>
              <input className={`form-input ${errors.date ? "error" : ""}`} type="date" {...field("date")} />
              {errors.date && <span className="form-error">{errors.date}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Category</label>
            <div className="category-grid">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  className={`cat-chip ${form.category === key ? "active" : ""}`}
                  style={form.category === key ? { "--chip-color": cat.color } : {}}
                  onClick={() => setForm((f) => ({ ...f, category: key }))}
                >
                  {cat.icon} {cat.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>
            {isEdit ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
