import React, { ChangeEvent, useState, KeyboardEvent } from 'react';

interface LabeledInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  onEnter?: (value: string) => void;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  className = '',
  onEnter = () => {},
}) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (value.length > 0) {
        onEnter(value);
        setValue('');
      } else {
        onEnter('empty');
      }
    }
  };

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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default LabeledInput;
