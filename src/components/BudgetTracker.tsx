import { useMemo } from "react";
import useBudget from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const BudgetTracker = () => {
  const { state, totalExpense, disponibleExpense, dispatch } = useBudget();
  const percentage = useMemo(
    () => +((totalExpense / state.budget) * 100).toFixed(0),
    [state.expenses]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex items-center">
        <CircularProgressbar
          value={+percentage}
          text={`${percentage}% Gastado`}
          className="font-bold"
          styles={buildStyles({
            pathColor: percentage === 100 ? "#be185d" : "#475569",
            textColor: percentage === 100 ? "#be185d" : "#475569",
            textSize: 8,
          })}
        />
        ;
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <button
          onClick={() => dispatch({ type: "reset-app" })}
          type="button"
          className="bg-pink-700 hover:bg-pink-800 transition-all duration-300 w-full text-white  p-1 rounded-lg uppercase font-bold cursor-pointer"
        >
          Resetear
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Gastado" amount={totalExpense} />
        <AmountDisplay label="Disponible" amount={disponibleExpense} />
      </div>
    </div>
  );
};

export default BudgetTracker;
