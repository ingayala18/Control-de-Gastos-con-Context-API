import { useContext } from "react";
import { BudgetContext } from "../contexts/BudgetContext";

const useBudget = () => {
  const context = useContext(BudgetContext);

  return context;
};

export default useBudget;
