import type { Category, DraftExpense, Expense } from "../types";
import { v4 as uuidv4 } from "uuid";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } }
  | { type: "reset-app" }
  | { type: "add-filter-category"; payload: { id: Category["id"] } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
  currentCategory: Category["id"];
};

const initialBuget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};

const initialExpense = (): Expense[] => {
  const localStorageExpense = localStorage.getItem("expense");
  return localStorageExpense ? JSON.parse(localStorageExpense) : [];
};

export const initialState: BudgetState = {
  budget: initialBuget(),
  modal: false,
  expenses: initialExpense(),
  editingId: "",
  currentCategory: "",
};

// const createExpense = (draftExpense: DraftExpense) => {
//     return{
//         ...draftExpense,
//         id: uuidv4()
//     }
// }

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }

  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "add-expense") {
    // const expense = createExpense( action.payload.expense )
    const newExpense: Expense = { ...action.payload.expense, id: uuidv4() };

    return {
      ...state,
      expenses: [...state.expenses, newExpense],
      modal: false,
    };
  }

  if (action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.payload.id),
    };
  }

  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "update-expense") {
    return {
      ...state,
      expenses: state.expenses.map((item) =>
        item.id === action.payload.expense.id ? action.payload.expense : item
      ),
      editingId: "",
      modal: false,
    };
  }

  if (action.type === "reset-app") {
    return {
      ...state,
      expenses: [],
      budget: 0,
    };
  }

  if (action.type === "add-filter-category") {
    return {
      ...state,
      currentCategory: action.payload.id,
    };
  }

  return state;
};
