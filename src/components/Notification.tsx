import React from 'react';

type NotificationProps = {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return '';
    }
  };

  return (
    <div className={`border-l-4 p-4 ${getTypeStyles(type)}`} role="alert">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </p>
          <p>{message}</p>
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
