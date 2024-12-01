import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string[];
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black text-xs"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // className="text-xs h-10 rounded-none bg-[#efecff]  focus:outline-none focus:border-[#b071ec]"
        className={`w-full p-2 mt-2 border text-xs h-10 rounded-none   focus:outline-none focus:border-[#b071ec] ${
          error && "border-red-500"
        }`}
        placeholder={placeholder}
      />
      {error && (
        <div className="mt-1 text-sm text-red-600">
          {error.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormInput;
