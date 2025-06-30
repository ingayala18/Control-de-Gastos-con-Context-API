import type { ChangeEvent } from "react";
import { categories } from "../data/categories";
import useBudget from "../hooks/useBudget";

const FilterByCategory = () => {
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "add-filter-category", payload: { id: e.target.value } });
  };

  return (
    <div className="bg-white shadow-lg p-10 rounded-lg mb-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar Gastos</label>
          <select
            name="category"
            id="category"
            className="bg-slate-100 flex-1 p-2 rounded-lg"
            onChange={handleChange}
          >
            <option value="">--Todas las Categorias--</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default FilterByCategory;
