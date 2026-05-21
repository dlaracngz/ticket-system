import React from "react";

type Option = {
  label: string;
  value: string;
};

type InputProps = {
  id?: number;
  label?: string;
  name: string;
  type?: "text" | "textarea" | "select" | "password";
  placeholder?: string;
  value?: string;
  options?: Option[];
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onBlur?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  error?: string;
};

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  options,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {type === "text" || type === "password" ? (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full px-2 py-1 border rounded-lg outline-none transition
          ${error ? "border-red-500" : "border-gray-300 focus:border-black"}`}
        />
      ) : null}
      {type === "textarea" && (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full px-2 py-1 border rounded-lg outline-none transition
          ${error ? "border-red-500" : "border-gray-300 focus:border-black"}`}
        />
      )}
      {type === "select" && (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full px-2 py-1 border rounded-lg outline-none transition
          ${error ? "border-red-500" : "border-gray-300 focus:border-black"}`}
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default InputField;
