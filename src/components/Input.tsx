import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  helperTxt?: string;
}

const Input = ({ label, icon, error, helperTxt, required, ...props }: InputProps) => {

  const inputIdAccessbility = `input-${Math.random().toString(36).substr(2,9)}`;


  return (
    <div className="mb-4 w-full">
      <label htmlFor={inputIdAccessbility} className="block text-sm font-medium text-grayScale mb-1">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center border-b border-gray py-2">
        {icon && <span className="mr-2 opacity-35">{icon}</span>}
        <input 
          id={inputIdAccessbility}
          type="text" 
          className="w-full bg-transparent py-3 px-2 outline-none "
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputIdAccessbility}-error` : helperTxt ?  `${inputIdAccessbility}-helper`: undefined} 
          {...props} 
        />
      </div>

      {error && (
        <p id={`${inputIdAccessbility}-error`} className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}

      {helperTxt && !error && (
        <p id={`${inputIdAccessbility}-helper`} className="text-gray-500 text-sm mt-1">
          {helperTxt}
        </p>
      )}
    </div>
  );
};

export default Input;
