# FinTrack — Finance Dashboard

A clean, interactive personal finance dashboard built with React. Track transactions, visualize spending patterns, and gain insights into your financial health.

#To start: npm run dev

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Then open [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
src/
├── context/
│   └── AppContext.jsx          # Global state (useReducer + localStorage)
├── data/
│   └── mockData.js             # 60+ seeded transactions, category config
├── utils/
│   └── finance.js              # Pure helpers: formatCurrency, filters, insights
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx         # Fixed left nav
│   │   └── Header.jsx          # Top bar — role switcher, dark mode, CSV export
│   ├── dashboard/
│   │   ├── DashboardPage.jsx   # Composes the dashboard tab
│   │   ├── SummaryCards.jsx    # 4 KPI cards (balance, income, expenses, savings)
│   │   ├── BalanceTrend.jsx    # Custom SVG line chart with hover tooltip
│   │   ├── SpendingBreakdown.jsx # Interactive SVG donut chart + legend
│   │   └── RecentTransactions.jsx # Latest 6 transactions mini-list
│   ├── transactions/
│   │   ├── TransactionsPage.jsx # Composes the transactions tab
│   │   ├── FiltersBar.jsx      # Search, type/category/month/sort filters
│   │   ├── TransactionTable.jsx # Sortable table with edit/delete (admin only)
│   │   └── TransactionModal.jsx # Add/edit form modal with validation
│   └── insights/
│       └── InsightsSection.jsx  # KPI insight cards + bar chart + top categories
├── styles.css                  # All styles (CSS variables, dark mode, responsive)
├── App.jsx                     # Tab router
└── main.jsx                    # Entry point
```

---

## Features

### Dashboard Overview
- **4 Summary KPIs**: Total Balance, Income, Expenses, Savings Rate
- **Balance Trend Chart**: Custom SVG line chart with togglable views (balance / income / expenses), hover tooltips
- **Spending Breakdown**: Interactive SVG donut chart with hover-linked legend
- **Recent Activity**: Latest 6 transactions with quick "See all" navigation

### Transactions
- Full transaction table with date, description, category, type, amount
- **Search**: real-time text search across description + category
- **Filters**: type (income/expense), category, month
- **Sort**: newest/oldest/highest/lowest amount
- Admin: Add / Edit / Delete transactions with inline confirm-delete guard
- Form validation on all fields

### Insights
- 4 auto-generated insight cards: highest spend category, MoM expense change, avg transaction size, savings rate health
- **Monthly Comparison**: grouped bar chart (income vs expenses per month)
- **Top 5 Categories**: ranked list with proportional progress bars

### Role-Based UI
Switch between roles via the header dropdown:

| Feature | Viewer | Admin |
|---|---|---|
| View dashboard | ✅ | ✅ |
| Filter/search | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |
| Reset data | ❌ | ✅ |

### Extra Enhancements
- **Dark mode**: Full dark theme, toggled via header button, persisted to localStorage
- **Data persistence**: All transactions, role, and theme stored in localStorage
- **CSV export**: Exports all transactions as a downloadable `.csv`
- **Data reset**: Admin can restore original seeded data
- **Empty state handling**: Graceful empty states on all views

---

## State Management

All state lives in a single `useReducer` inside `AppContext`. The context is provided at the root and consumed via a `useApp()` hook.

**State shape:**
```js
{
  transactions: [...],     // all transaction records
  role: "admin",           // "admin" | "viewer"
  darkMode: false,         // boolean
  filters: {
    search: "",
    type: "all",
    category: "all",
    month: "all",
    sortBy: "date-desc",
  },
  activeTab: "dashboard",  // "dashboard" | "transactions" | "insights"
}
```

**Actions:** `INIT`, `SET_ROLE`, `TOGGLE_DARK`, `SET_FILTER`, `RESET_FILTERS`, `SET_TAB`, `ADD_TRANSACTION`, `EDIT_TRANSACTION`, `DELETE_TRANSACTION`

Pure utility functions in `utils/finance.js` derive computed values (summaries, monthly data, category breakdown, insights, filtered lists) from state without mutating it.

---

## Design Decisions

- **No charting library** — all charts (line, donut, bar) are hand-drawn SVG for zero bundle overhead and full control
- **CSS variables** for theming — dark mode is a class swap, no JS overhead
- **Google Fonts** (Syne + DM Sans + DM Mono) for a distinctive editorial feel
- **INR locale** — amounts formatted as ₹ with Indian number formatting
- Modular component tree — each component is independently testable and reusable

---

## Tech Stack

- React 18 (hooks only, no class components)
- Vite
- Plain CSS with CSS custom properties
- localStorage for persistence
- No external UI or chart libraries
