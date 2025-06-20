import React from "react";

interface InputFieldProps {
  label?: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
  className?: string;
  error?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  options?: { value: string; label: string }[];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required = false,
  name,
  className = "",
  error,
  onKeyDown,
  // options = [],
}) => {
  return (
    <div className={`flex flex-col gap-y-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-lg font-medium text-black mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        name={name}
        required={required}
        className={`w-full h-[40px] px-3 py-2 text-lg text-black border ${
          error ? "border-red-500" : "border-[#d9d9d9]"
        } rounded-[10px] focus:outline-none focus:border-[#3a5b22] focus:ring-1 focus:ring-[#3a5b22]`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
