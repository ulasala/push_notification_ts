import React, { ChangeEvent, useState } from 'react';
import LabeledInput from './LabeledInput';
import { useRowContext } from '../context/RowContext';
import toast, { Toaster } from 'react-hot-toast';

interface ComponentThreeProps {
  id: number;
}

const ComponentThree: React.FC<ComponentThreeProps> = ({ id }) => {
  const { updateRow } = useRowContext();
  const [valueOne, setValueOne] = useState<string>('');
  const [valueTwo, setValueTwo] = useState<string>('');

  const handleChangeOne = (event: ChangeEvent<HTMLInputElement>) => {
    setValueOne(event.target.value);
  };
  const handleChangeTwo = (event: ChangeEvent<HTMLInputElement>) => {
    setValueTwo(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (valueOne.length > 0 && valueTwo.length > 0) {
      updateRow(id, { isSubmitted: true });
      setValueOne('');
      setValueTwo('');
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
            onChange={handleChangeOne}
            value={valueOne}
          />
        </div>
        <div className="mb-4">
          <LabeledInput
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
            className="w-[50%]"
            onChange={handleChangeTwo}
            value={valueTwo}
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
        <Toaster />
      </div>
    </div>
  );
};

export default ComponentThree;
