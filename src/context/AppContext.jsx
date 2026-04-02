import { createContext, useContext, useReducer, useEffect } from "react";
import { INITIAL_TRANSACTIONS } from "../data/mockData";

const AppContext = createContext(null);

const STORAGE_KEY = "fintrack_data";

const initialState = {
  transactions: [],
  role: "admin", // "admin" | "viewer"
  darkMode: false,
  filters: {
    search: "",
    type: "all",
    category: "all",
    month: "all",
    sortBy: "date-desc",
  },
  activeTab: "dashboard",
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, ...action.payload };
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "TOGGLE_DARK":
      return { ...state, darkMode: !state.darkMode };
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "RESET_FILTERS":
      return { ...state, filters: initialState.filters };
    case "SET_TAB":
      return { ...state, activeTab: action.payload };
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "INIT", payload: parsed });
      } else {
        dispatch({ type: "INIT", payload: { transactions: INITIAL_TRANSACTIONS } });
      }
    } catch {
      dispatch({ type: "INIT", payload: { transactions: INITIAL_TRANSACTIONS } });
    }
  }, []);

  useEffect(() => {
    if (state.transactions.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          transactions: state.transactions,
          darkMode: state.darkMode,
          role: state.role,
        })
      );
    }
  }, [state.transactions, state.darkMode, state.role]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
