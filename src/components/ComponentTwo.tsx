import React, { ChangeEvent, useState } from 'react';
import LabeledInput from './LabeledInput';
import toast, { Toaster } from 'react-hot-toast';
import { useRowContext } from '../context/RowContext';

interface ComponentTwoProps {
  id: number;
}

const ComponentTwo: React.FC<ComponentTwoProps> = ({ id }) => {
  const { updateRow } = useRowContext();
  const [value, setValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (value.length > 0) {
      updateRow(id, { isSubmitted: true });
      setValue('');
      toast.success('Data Submitted', {
        duration: 4000,
        position: 'top-right',
      });
      setTimeout(() => {
        updateRow(id, { isSubmitted: false, isNotified: true });
        toast.success(`${id + 1} Data Notification`, {
          duration: 4000,
          position: 'top-right',
        });
      }, 5000);
    } else {
      toast.error('Enter value in the fields', {
        duration: 4000,
        position: 'top-right',
      });
    }
  };

  return (
    <div className="relative h-full justify-content-start p-8">
      <div className="  p-8  col-span-4 ">
        <div className="mb-4">
          <LabeledInput
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
            className="w-[50%]"
            onChange={handleChange}
            value={value}
          />
        </div>
      </div>

      <div className="flex flex-col justify-end items-end">
        <button
          className="w-[20%] p-2 bg-blue-500 text-white rounded hover:bg-blue-600 absolute bottom-8 right-8 "
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default ComponentTwo;
