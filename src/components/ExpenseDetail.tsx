import { useMemo } from "react";
import { formatDate } from "../helpers";
import type { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import useBudget from "../hooks/useBudget";

type ExpenseDetailProps = {
  item: Expense;
};

const ExpenseDetail = ({ item }: ExpenseDetailProps) => {
  const { dispatch } = useBudget();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "get-expense-by-id", payload: { id: item.id } })
        }
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() =>
          dispatch({ type: "remove-expense", payload: { id: item.id } })
        }
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  const categoryInfo = useMemo(
    () => categories.find((cat) => cat.id === item.category),
    [item]
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
        maxSwipe={1}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b rounded-lg border-gray-200 flex gap-5 items-center">
          <div className="">
            <img
              className="w-20"
              src={`/icono_${categoryInfo?.icon}.svg`}
              alt=""
            />
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo?.name}
            </p>
            <p>{item.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(item.date!.toString())}
            </p>
          </div>

          <AmountDisplay amount={item.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default ExpenseDetail;
