import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import useBudget from "../hooks/useBudget";

const ExpenseForm = () => {
  const { dispatch, state, disponibleExpense } = useBudget();

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  useEffect(() => {
    if (state.editingId) {
      const existe = state.expenses.find((item) => item.id === state.editingId);
      if (existe) {
        setExpense(existe);
        setPreviousAmount(existe.amount);
      }
    }
  }, [state.editingId]);

  const [error, setError] = useState("");
  const [previousAmount, setPreviousAmount] = useState(0);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const isNumber = ["amount"].includes(e.target.id);
    setExpense({
      ...expense,
      [e.target.id]: isNumber ? +e.target.value : e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validar
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    //validar que no me pase del limite
    if (expense.amount - previousAmount > disponibleExpense) {
      setError("Este gasto se sale del presupuesto");
      return;
    }

    //Agregar o actualizar el gasto
    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
      setError("");
    }

    setPreviousAmount(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <legend className="text-2xl font-black text-gray-800 text-center uppercase border-b-4 border-pink-700 leading-loose mb-3">
        {state.editingId ? "Guardar Cambios" : "Nuevo Gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2 mb-3">
        <label htmlFor="expenseName" className=" text-xl">
          Nombre Gasto
        </label>
        <input
          type="text"
          id="expenseName"
          name="expenseName"
          className="bg-slate-100 p-2 rounded-lg"
          placeholder="Añade el nombre del gasto"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 mb-3">
        <label htmlFor="amount" className=" text-xl">
          Cantidad
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          className="bg-slate-100 p-2 rounded-lg"
          placeholder="Añade la cantidad del gasto Ej. 300"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 mb-3">
        <label htmlFor="category" className=" text-xl">
          Categorias
        </label>
        <select
          name="category"
          id="category"
          className="bg-slate-100 p-2 rounded-lg"
          value={expense.category}
          onChange={handleChange}
        >
          <option disabled value="">
            --Seleccione Categoria--
          </option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 mb-3">
        <label htmlFor="date" className=" text-xl">
          Fecha
        </label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={(e: Value) => setExpense({ ...expense, date: e })}
        />
      </div>

      <input
        type="submit"
        value={state.editingId ? "Actualizar Gasto" : "Registrar Gasto"}
        className={`${
          state.editingId &&
          "bg-slate-800 hover:bg-slate-900 transition-all duration-300"
        } bg-pink-700 hover:bg-pink-800 transition-all duration-300 w-full p-2 rounded-lg mt-5 font-bold uppercase text-white cursor-pointer`}
      />
    </form>
  );
};

export default ExpenseForm;
