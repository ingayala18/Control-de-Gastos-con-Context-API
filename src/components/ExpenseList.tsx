import { useMemo } from "react";
import useBudget from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

function ExpenseList() {
  const { state } = useBudget();

  const filterExpense = state.currentCategory
    ? state.expenses.filter((item) => item.category === state.currentCategory)
    : state.expenses;
  const isEmpty = useMemo(() => filterExpense.length === 0, [filterExpense]);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold p-10">No Hay Gastos</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold p-5">
            Listado de Gastos
          </p>
          {filterExpense.map((item) => (
            <ExpenseDetail key={item.id} item={item} />
          ))}
        </>
      )}
    </div>
  );
}

export default ExpenseList;
