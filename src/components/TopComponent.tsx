import React, { ChangeEvent, useState, KeyboardEvent, useContext } from 'react';
import LabeledInput from './LabeledInput';
import toast, { Toaster } from 'react-hot-toast';
import { ComponentRenderContext } from '../context/componentRenderContext';

type Props = {};

const TopComponent: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState<string>('');
  const componentrenderContext = useContext(ComponentRenderContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (value.length > 0) {
        componentrenderContext?.setIsRendered(true);
        setValue('');
      } else {
        toast.error('Enter value and hit Enter', {
          duration: 4000,
          position: 'top-right',
        });
      }
    }
  };

  return (
    <div className="mb-4 border border-gray-300 rounded  p-9">
      <LabeledInput
        label="Username"
        name="username"
        type="text"
        placeholder="Enter your username"
        className="w-[30%]"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
      <Toaster />
    </div>
  );
};

export default TopComponent;
