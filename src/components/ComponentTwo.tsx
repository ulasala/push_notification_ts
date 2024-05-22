import React, { ChangeEvent, useEffect, useState } from 'react';
import LabeledInput from './LabeledInput';
import toast, { Toaster } from 'react-hot-toast';
import { useRowContext } from '../context/RowContext';
import signalRService from '../signalR/signalRService';

interface ComponentTwoProps {
  id: number;
}

const ComponentTwo: React.FC<ComponentTwoProps> = ({ id }) => {
  const { updateRow } = useRowContext();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    signalRService.connection.on(
      'ReceiveNotification',
      (user: string, message: string) => {
        console.log('Component Two Effect ===>', user, message);
        checkPushNotification(id, user, message);
      }
    );

    return () => {
      signalRService.connection.off('ReceiveNotification');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (value.length > 0) {
      signalRService.sendMessage('Two', 'call');
      toast.success('Data Submitted', {
        duration: 4000,
        position: 'top-right',
      });
      updateRow(id, { isSubmitted: true });
      setValue('');
      //checkPushNotification(id);
      //setTimeout(() => {}, 5000);
    } else {
      toast.error('Enter value in the fields', {
        duration: 4000,
        position: 'top-right',
      });
    }
  };

  const checkPushNotification = (id: number, user: string, message: string) => {
    toast.success(`${id + 1} ${user} ${message} Notification`, {
      duration: 4000,
      position: 'top-right',
    });

    updateRow(id, { isSubmitted: false, isNotified: true });
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
