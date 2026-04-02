import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { applyFilters, formatCurrency, formatDate } from "../../utils/finance";
import { CATEGORIES } from "../../data/mockData";
import TransactionModal from "./TransactionModal";

export default function TransactionTable() {
  const { state, dispatch } = useApp();
  const { transactions, filters, role, darkMode } = state;
  const [editTx, setEditTx] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = applyFilters(transactions, filters);

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
    setDeleteConfirm(null);
  };

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3>No transactions found</h3>
        <p>Try adjusting your filters or add a new transaction.</p>
        {role === "admin" && (
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + Add Transaction
          </button>
        )}
        {showModal && <TransactionModal onClose={() => setShowModal(false)} />}
      </div>
    );
  }

  return (
    <>
      <div className={`tx-header-row ${darkMode ? "dark" : ""}`}>
        <span className="tx-count">{filtered.length} transaction{filtered.length !== 1 ? "s" : ""}</span>
        {role === "admin" && (
          <button className="btn-primary" onClick={() => { setEditTx(null); setShowModal(true); }}>
            + Add Transaction
          </button>
        )}
      </div>

      <div className={`tx-table-wrap ${darkMode ? "dark" : ""}`}>
        <table className="tx-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th style={{ textAlign: "right" }}>Amount</th>
              {role === "admin" && <th style={{ textAlign: "center" }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => {
              const cat = CATEGORIES[t.category] || {};
              return (
                <tr key={t.id} className="tx-row">
                  <td className="tx-date">{formatDate(t.date)}</td>
                  <td className="tx-desc">{t.description}</td>
                  <td className="tx-cat">
                    <span className="cat-tag" style={{ "--tag-color": cat.color }}>
                      {cat.icon} {cat.label}
                    </span>
                  </td>
                  <td className="tx-type">
                    <span className={`type-badge ${t.type}`}>
                      {t.type === "income" ? "↑" : "↓"} {t.type}
                    </span>
                  </td>
                  <td className={`tx-amount ${t.type}`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  {role === "admin" && (
                    <td className="tx-actions">
                      <button
                        className="action-btn edit"
                        onClick={() => { setEditTx(t); setShowModal(true); }}
                        title="Edit"
                      >✎</button>
                      {deleteConfirm === t.id ? (
                        <span className="confirm-delete">
                          <button className="action-btn confirm" onClick={() => handleDelete(t.id)}>✓</button>
                          <button className="action-btn cancel" onClick={() => setDeleteConfirm(null)}>✕</button>
                        </span>
                      ) : (
                        <button
                          className="action-btn delete"
                          onClick={() => setDeleteConfirm(t.id)}
                          title="Delete"
                        >🗑</button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <TransactionModal
          transaction={editTx}
          onClose={() => { setShowModal(false); setEditTx(null); }}
        />
      )}
    </>
  );
}
