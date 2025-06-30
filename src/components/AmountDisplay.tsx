import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
  label?: string;
  amount: number;
};

const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
  return (
    <div>
      <p className="text-2xl text-pink-700 font-bold">
        {label} {""}
        <span className="font-black text-gray-800">
          {formatCurrency(amount)}
        </span>
      </p>
    </div>
  );
};

export default AmountDisplay;
