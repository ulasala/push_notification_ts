import React from 'react';
import { useRowContext } from '../context/RowContext';
import toast, { Toaster } from 'react-hot-toast';

interface ComponentOneProps {
  id: number;
}

const ComponentOne: React.FC<ComponentOneProps> = ({ id }) => {
  const { updateRow } = useRowContext();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    toast.success('Data Submitted', {
      duration: 4000,
      position: 'top-right',
    });
    updateRow(id, { isSubmitted: true });
    setTimeout(() => {
      toast.success(`${id + 1} Data Notification`, {
        duration: 4000,
        position: 'top-right',
      });
      updateRow(id, { isSubmitted: false, isNotified: true });
    }, 5000);
  };

  return (
    <div className="relative h-full justify-content-start p-8">
      <div className="flex flex-col justify-start items-start">
        <label className="text-sm font-medium mb-2">Short Description</label>
        <div>Use your real name so people will recognize you.</div>
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

export default ComponentOne;
