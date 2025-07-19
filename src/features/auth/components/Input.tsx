import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

const Input = ({ label, icon, ...props }: InputProps) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-dark mb-1">
        {label}
      </label>
      <div className="flex items-center border-b border-gray py-2">
        {icon && <span className="mr-2">{icon}</span>}
        <input type="text" className="w-full bg-transparent outline-none " {...props} />
      </div>
    </div>
  );
};

export default Input;
