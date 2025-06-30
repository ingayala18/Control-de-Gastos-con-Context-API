import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import useBudget from "../hooks/useBudget";

const BudgetForm = () => {
  const { dispatch } = useBudget();
  const [budget, setBudget] = useState(0);
  const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "add-budget", payload: { budget: budget } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label
          htmlFor="budget"
          className="text-3xl uppercase text-pink-700 font-bold text-center mb-5"
        >
          Define Presupuesto
        </label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={budget}
          onChange={handleChange}
          className="border border-gray-200 p-2 mb-5"
          placeholder="Define un Presupuesto"
        />
      </div>

      <input
        type="submit"
        disabled={isValid}
        className="bg-pink-700 hover:bg-pink-800 transition-all duration-300 w-full p-2 font-bold uppercase text-white cursor-pointer rounded disabled:opacity-35"
        value="Definir Presupuesto"
      />
    </form>
  );
};

export default BudgetForm;
