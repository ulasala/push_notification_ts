import React, { ChangeEvent, useEffect, useState } from 'react';
import LabeledInput from './LabeledInput';
import { useRowContext } from '../context/RowContext';
import toast, { Toaster } from 'react-hot-toast';
import signalRService from '../signalR/signalRService';

interface ComponentThreeProps {
  id: number;
}

const ComponentThree: React.FC<ComponentThreeProps> = ({ id }) => {
  const { updateRow } = useRowContext();
  const [valueOne, setValueOne] = useState<string>('');
  const [valueTwo, setValueTwo] = useState<string>('');

  useEffect(() => {
    signalRService.connection.on(
      'ReceiveNotification',
      (user: string, message: string) => {
        console.log('Component Three Effect ===>', user, message);
        checkPushNotification(id, user, message);
      }
    );

    return () => {
      signalRService.connection.off('ReceiveNotification');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeOne = (event: ChangeEvent<HTMLInputElement>) => {
    setValueOne(event.target.value);
  };
  const handleChangeTwo = (event: ChangeEvent<HTMLInputElement>) => {
    setValueTwo(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (valueOne.length > 0 && valueTwo.length > 0) {
      signalRService.sendMessage('Three', 'call');
      toast.success('Data Submitted', {
        duration: 4000,
        position: 'top-right',
      });
      updateRow(id, { isSubmitted: true });
      setValueOne('');
      setValueTwo('');
      // checkPushNotification(id);
      // setTimeout(() => {}, 5000);
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
