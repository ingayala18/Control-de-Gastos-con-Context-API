import {
  createContext,
  useMemo,
  useReducer,
  type ActionDispatch,
  type ReactNode,
} from "react";
import {
  budgetReducer,
  initialState,
  type BudgetActions,
  type BudgetState,
} from "../reducers/budgetReducer";

export type BudgetContextProps = {
  state: BudgetState;
  dispatch: ActionDispatch<[action: BudgetActions]>;
  totalExpense: number;
  disponibleExpense: number;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpense = useMemo(
    () => state.expenses.reduce((total, item) => total + item.amount, 0),
    [state.expenses]
  );
  const disponibleExpense = state.budget - totalExpense;

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpense, disponibleExpense }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
