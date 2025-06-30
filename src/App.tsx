import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import useBudget from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

const App = () => {
  const { state } = useBudget();

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expense", JSON.stringify(state.expenses));
  }, [state]);

  const isValidBudget = useMemo(
    () => state.budget > 0,
    [state.expenses, state.budget]
  );
  return (
    <div>
      <div className="bg-pink-700 py-8">
        <h1 className="md:text-4xl text-2xl text-white font-black uppercase text-center">
          Planificador de Gastos
        </h1>
      </div>

      <div className="mt-10 max-w-3xl mx-auto bg-white shadow-lg p-10 rounded-lg">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </div>
  );
};

export default App;
