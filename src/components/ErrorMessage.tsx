import type { ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <p className="font-bold uppercase text-sm text-red-600 text-center p-2 mb-3">
      {children}
    </p>
  );
};

export default ErrorMessage;
