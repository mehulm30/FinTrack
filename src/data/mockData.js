export const CATEGORIES = {
  food: { label: "Food & Dining", color: "#F97316", icon: "🍽️" },
  transport: { label: "Transport", color: "#3B82F6", icon: "🚌" },
  shopping: { label: "Shopping", color: "#A855F7", icon: "🛍️" },
  health: { label: "Health", color: "#10B981", icon: "💊" },
  entertainment: { label: "Entertainment", color: "#F59E0B", icon: "🎬" },
  utilities: { label: "Utilities", color: "#6B7280", icon: "⚡" },
  salary: { label: "Salary", color: "#22C55E", icon: "💼" },
  freelance: { label: "Freelance", color: "#06B6D4", icon: "💻" },
  investment: { label: "Investment", color: "#84CC16", icon: "📈" },
  rent: { label: "Rent", color: "#EF4444", icon: "🏠" },
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const INITIAL_TRANSACTIONS = [
  // January
  { id: generateId(), date: "2024-01-03", description: "Monthly Salary", amount: 85000, category: "salary", type: "income" },
  { id: generateId(), date: "2024-01-05", description: "Grocery Store", amount: 3200, category: "food", type: "expense" },
  { id: generateId(), date: "2024-01-07", description: "Metro Card Recharge", amount: 500, category: "transport", type: "expense" },
  { id: generateId(), date: "2024-01-10", description: "Freelance Project - UI Design", amount: 18000, category: "freelance", type: "income" },
  { id: generateId(), date: "2024-01-12", description: "Zomato Order", amount: 650, category: "food", type: "expense" },
  { id: generateId(), date: "2024-01-15", description: "Electricity Bill", amount: 1800, category: "utilities", type: "expense" },
  { id: generateId(), date: "2024-01-17", description: "Amazon Shopping", amount: 4500, category: "shopping", type: "expense" },
  { id: generateId(), date: "2024-01-20", description: "Gym Membership", amount: 2000, category: "health", type: "expense" },
  { id: generateId(), date: "2024-01-22", description: "Netflix Subscription", amount: 799, category: "entertainment", type: "expense" },
  { id: generateId(), date: "2024-01-25", description: "Mutual Fund SIP", amount: 5000, category: "investment", type: "expense" },
  { id: generateId(), date: "2024-01-28", description: "House Rent", amount: 22000, category: "rent", type: "expense" },
  { id: generateId(), date: "2024-01-30", description: "Swiggy Dinner", amount: 890, category: "food", type: "expense" },

  // February
  { id: generateId(), date: "2024-02-01", description: "Monthly Salary", amount: 85000, category: "salary", type: "income" },
  { id: generateId(), date: "2024-02-03", description: "Pharmacy", amount: 1200, category: "health", type: "expense" },
  { id: generateId(), date: "2024-02-06", description: "Ola Cab", amount: 380, category: "transport", type: "expense" },
  { id: generateId(), date: "2024-02-08", description: "Restaurant Dinner", amount: 2100, category: "food", type: "expense" },
  { id: generateId(), date: "2024-02-10", description: "Freelance - Web Dev", amount: 25000, category: "freelance", type: "income" },
  { id: generateId(), date: "2024-02-14", description: "Valentine Gift", amount: 3500, category: "shopping", type: "expense" },
  { id: generateId(), date: "2024-02-16", description: "Internet Bill", amount: 999, category: "utilities", type: "expense" },
  { id: generateId(), date: "2024-02-18", description: "Movie Tickets", amount: 1200, category: "entertainment", type: "expense" },
  { id: generateId(), date: "2024-02-20", description: "Grocery Shopping", amount: 2800, category: "food", type: "expense" },
  { id: generateId(), date: "2024-02-25", description: "Mutual Fund SIP", amount: 5000, category: "investment", type: "expense" },
  { id: generateId(), date: "2024-02-28", description: "House Rent", amount: 22000, category: "rent", type: "expense" },

  // March
  { id: generateId(), date: "2024-03-01", description: "Monthly Salary", amount: 85000, category: "salary", type: "income" },
  { id: generateId(), date: "2024-03-04", description: "Swiggy Breakfast", amount: 340, category: "food", type: "expense" },
  { id: generateId(), date: "2024-03-06", description: "Auto Rickshaw", amount: 120, category: "transport", type: "expense" },
  { id: generateId(), date: "2024-03-08", description: "Freelance - Logo Design", amount: 8000, category: "freelance", type: "income" },
  { id: generateId(), date: "2024-03-10", description: "Doctor Visit", amount: 800, category: "health", type: "expense" },
  { id: generateId(), date: "2024-03-12", description: "Holi Shopping", amount: 1500, category: "shopping", type: "expense" },
  { id: generateId(), date: "2024-03-15", description: "Water Bill", amount: 450, category: "utilities", type: "expense" },
  { id: generateId(), date: "2024-03-18", description: "Spotify Premium", amount: 119, category: "entertainment", type: "expense" },
  { id: generateId(), date: "2024-03-20", description: "Grocery Store", amount: 3100, category: "food", type: "expense" },
  { id: generateId(), date: "2024-03-22", description: "Investment - Stocks", amount: 10000, category: "investment", type: "expense" },
  { id: generateId(), date: "2024-03-28", description: "House Rent", amount: 22000, category: "rent", type: "expense" },

  // April
  { id: generateId(), date: "2024-04-01", description: "Monthly Salary", amount: 92000, category: "salary", type: "income" },
  { id: generateId(), date: "2024-04-03", description: "Zomato Lunch", amount: 480, category: "food", type: "expense" },
  { id: generateId(), date: "2024-04-06", description: "Rapido Bike Taxi", amount: 95, category: "transport", type: "expense" },
  { id: generateId(), date: "2024-04-09", description: "Freelance - App Design", amount: 30000, category: "freelance", type: "income" },
  { id: generateId(), date: "2024-04-11", description: "Fitness Supplements", amount: 2500, category: "health", type: "expense" },
  { id: generateId(), date: "2024-04-13", description: "Myntra Order", amount: 5200, category: "shopping", type: "expense" },
  { id: generateId(), date: "2024-04-16", description: "Electricity Bill", amount: 2100, category: "utilities", type: "expense" },
  { id: generateId(), date: "2024-04-19", description: "BookMyShow", amount: 850, category: "entertainment", type: "expense" },
  { id: generateId(), date: "2024-04-22", description: "Grocery Shopping", amount: 2600, category: "food", type: "expense" },
  { id: generateId(), date: "2024-04-25", description: "Mutual Fund SIP", amount: 5000, category: "investment", type: "expense" },
  { id: generateId(), date: "2024-04-28", description: "House Rent", amount: 22000, category: "rent", type: "expense" },

  // May
  { id: generateId(), date: "2024-05-01", description: "Monthly Salary", amount: 92000, category: "salary", type: "income" },
  { id: generateId(), date: "2024-05-04", description: "Street Food", amount: 220, category: "food", type: "expense" },
  { id: generateId(), date: "2024-05-07", description: "Bus Pass", amount: 300, category: "transport", type: "expense" },
  { id: generateId(), date: "2024-05-10", description: "Freelance - Content", amount: 12000, category: "freelance", type: "income" },
  { id: generateId(), date: "2024-05-12", description: "Lab Tests", amount: 1500, category: "health", type: "expense" },
  { id: generateId(), date: "2024-05-15", description: "Flipkart Sale", amount: 8900, category: "shopping", type: "expense" },
  { id: generateId(), date: "2024-05-17", description: "Gas Bill", amount: 800, category: "utilities", type: "expense" },
  { id: generateId(), date: "2024-05-20", description: "Disney+ Hotstar", amount: 299, category: "entertainment", type: "expense" },
  { id: generateId(), date: "2024-05-23", description: "Supermarket", amount: 3400, category: "food", type: "expense" },
  { id: generateId(), date: "2024-05-25", description: "Stock Purchase", amount: 15000, category: "investment", type: "expense" },
  { id: generateId(), date: "2024-05-28", description: "House Rent", amount: 22000, category: "rent", type: "expense" },

  // June
  { id: generateId(), date: "2024-06-01", description: "Monthly Salary", amount: 92000, category: "salary", type: "income" },
  { id: generateId(), date: "2024-06-05", description: "Cafe Visit", amount: 760, category: "food", type: "expense" },
  { id: generateId(), date: "2024-06-07", description: "Ola Cab Airport", amount: 1200, category: "transport", type: "expense" },
  { id: generateId(), date: "2024-06-12", description: "Freelance - Photography", amount: 20000, category: "freelance", type: "income" },
  { id: generateId(), date: "2024-06-15", description: "Dentist Appointment", amount: 3000, category: "health", type: "expense" },
  { id: generateId(), date: "2024-06-18", description: "Wardrobe Update", amount: 6500, category: "shopping", type: "expense" },
  { id: generateId(), date: "2024-06-20", description: "Internet + OTT Bundle", amount: 1299, category: "utilities", type: "expense" },
  { id: generateId(), date: "2024-06-22", description: "Concert Tickets", amount: 3500, category: "entertainment", type: "expense" },
  { id: generateId(), date: "2024-06-24", description: "Weekly Groceries", amount: 2900, category: "food", type: "expense" },
  { id: generateId(), date: "2024-06-25", description: "Mutual Fund SIP", amount: 5000, category: "investment", type: "expense" },
  { id: generateId(), date: "2024-06-28", description: "House Rent", amount: 22000, category: "rent", type: "expense" },
];

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
