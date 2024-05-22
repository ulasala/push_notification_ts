import React, { useEffect } from 'react';
import { useRowContext } from '../context/RowContext';
import toast, { Toaster } from 'react-hot-toast';
import signalRService from '../signalR/signalRService';

interface ComponentOneProps {
  id: number;
}

const ComponentOne: React.FC<ComponentOneProps> = ({ id }) => {
  const { updateRow } = useRowContext();

  useEffect(() => {
    signalRService.connection.on(
      'ReceiveNotification',
      (user: string, message: string) => {
        console.log('Component One Effect ===>', user, message);
        checkPushNotification(id, user, message);
      }
    );

    return () => {
      signalRService.connection.off('ReceiveNotification');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    signalRService.sendMessage('One', 'call');

    toast.success('Data Submitted', {
      duration: 4000,
      position: 'top-right',
    });

    updateRow(id, { isSubmitted: true });
  };

  const checkPushNotification = (id: number, user: string, message: string) => {
    toast.success(`${id + 1} ${user} ${message} Data Notification`, {
      duration: 4000,
      position: 'top-right',
    });

    updateRow(id, { isSubmitted: false, isNotified: true });
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
