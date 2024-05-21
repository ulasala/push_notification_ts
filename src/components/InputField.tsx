import React from 'react';

interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
}

const InputField: React.FC<InputProps> = ({
  label,
  name,
  type,
  placeholder,
  className = '',
}) => {
  return (
    <div className="flex flex-col justify-start items-start">
      <label htmlFor={name} className="text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 rounded-md border border-gray-300 bg-gray focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
};

export default InputField;
