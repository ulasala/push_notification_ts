import React, { ChangeEvent, useState, KeyboardEvent } from 'react';

interface LabeledInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  onEnter?: (value: string) => void;
  onValueCghange?: (value: string) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  className = '',
  onChange = () => {},
  onKeyDown = () => {},
  value = '',
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
        className={` px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default LabeledInput;
