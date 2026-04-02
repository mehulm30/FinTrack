import { CATEGORIES, MONTHS } from "../data/mockData";

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

export const formatShortDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
};

export const getMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const getMonthIndex = (dateStr) => new Date(dateStr).getMonth();

export function computeSummary(transactions) {
  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses };
}

export function computeMonthlyData(transactions) {
  const map = {};
  transactions.forEach((t) => {
    const key = getMonthYear(t.date);
    if (!map[key]) map[key] = { label: key, income: 0, expenses: 0, balance: 0 };
    if (t.type === "income") map[key].income += t.amount;
    else map[key].expenses += t.amount;
    map[key].balance = map[key].income - map[key].expenses;
  });
  return Object.values(map).sort((a, b) => new Date("1 " + a.label) - new Date("1 " + b.label));
}

export function computeCategoryBreakdown(transactions) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const map = {};
  expenses.forEach((t) => {
    if (!map[t.category]) map[t.category] = 0;
    map[t.category] += t.amount;
  });
  const total = Object.values(map).reduce((s, v) => s + v, 0);
  return Object.entries(map)
    .map(([key, value]) => ({
      key,
      label: CATEGORIES[key]?.label || key,
      color: CATEGORIES[key]?.color || "#888",
      icon: CATEGORIES[key]?.icon || "💰",
      value,
      percent: total > 0 ? ((value / total) * 100).toFixed(1) : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

export function applyFilters(transactions, filters) {
  let result = [...transactions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }
  if (filters.type !== "all") result = result.filter((t) => t.type === filters.type);
  if (filters.category !== "all") result = result.filter((t) => t.category === filters.category);
  if (filters.month !== "all") {
    result = result.filter((t) => {
      const date = new Date(t.date);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}` === filters.month;
    });
  }

  const [field, dir] = filters.sortBy.split("-");
  result.sort((a, b) => {
    let av = field === "date" ? new Date(a.date) : a.amount;
    let bv = field === "date" ? new Date(b.date) : b.amount;
    return dir === "desc" ? bv - av : av - bv;
  });

  return result;
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export function getInsights(transactions, categoryBreakdown, monthlyData) {
  const insights = [];

  if (categoryBreakdown.length > 0) {
    const top = categoryBreakdown[0];
    insights.push({
      type: "warning",
      title: "Highest Spending Category",
      value: top.label,
      detail: `${formatCurrency(top.value)} (${top.percent}% of expenses)`,
      icon: top.icon,
    });
  }

  if (monthlyData.length >= 2) {
    const last = monthlyData[monthlyData.length - 1];
    const prev = monthlyData[monthlyData.length - 2];
    const diff = last.expenses - prev.expenses;
    const pct = prev.expenses > 0 ? Math.abs((diff / prev.expenses) * 100).toFixed(1) : 0;
    insights.push({
      type: diff > 0 ? "danger" : "success",
      title: "Month-over-Month Expenses",
      value: diff > 0 ? `+${formatCurrency(diff)}` : formatCurrency(diff),
      detail: `${pct}% ${diff > 0 ? "increase" : "decrease"} vs ${prev.label}`,
      icon: diff > 0 ? "📈" : "📉",
    });
  }

  const expenseTransactions = transactions.filter((t) => t.type === "expense");
  if (expenseTransactions.length > 0) {
    const avg = expenseTransactions.reduce((s, t) => s + t.amount, 0) / expenseTransactions.length;
    insights.push({
      type: "info",
      title: "Avg Transaction Size",
      value: formatCurrency(avg),
      detail: `Across ${expenseTransactions.length} expense transactions`,
      icon: "📊",
    });
  }

  if (monthlyData.length > 0) {
    const savingsRates = monthlyData.map((m) =>
      m.income > 0 ? ((m.income - m.expenses) / m.income) * 100 : 0
    );
    const avgSavings = savingsRates.reduce((s, v) => s + v, 0) / savingsRates.length;
    insights.push({
      type: avgSavings >= 20 ? "success" : avgSavings >= 10 ? "warning" : "danger",
      title: "Average Savings Rate",
      value: `${avgSavings.toFixed(1)}%`,
      detail: avgSavings >= 20 ? "Great savings habit!" : avgSavings >= 10 ? "Could be better" : "Try to save more",
      icon: "🏦",
    });
  }

  return insights;
}
