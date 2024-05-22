import React, {
  ChangeEvent,
  useContext,
  useState,
  KeyboardEvent,
  useEffect,
} from 'react';
import LabeledInput from './LabeledInput';
import ComponentOne from './ComponentOne';
import ComponentThree from './ComponentThree';
import ComponentTwo from './ComponentTwo';
import { ComponentRenderContext } from '../context/componentRenderContext';

import { useRowContext } from '../context/RowContext';
import toast, { Toaster } from 'react-hot-toast';
import signalRService from '../signalR/signalRService';

const GridLayout: React.FC = () => {
  const { state } = useRowContext();

  const [value, setValue] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number>(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [user, setUser] = useState<string>('Hi');
  const [message, setMessage] = useState<string>('Ashok');

  useEffect(() => {
    signalRService.connection.on(
      'ReceiveMessage',
      (user: string, message: string) => {
        setMessages((prevMessages) => [...prevMessages, `${user}: ${message}`]);
      }
    );

    return () => {
      signalRService.connection.off('ReceiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (user && message) {
      console.log('user && message', user, message);
      signalRService.sendMessage(user, message);
      //setMessage('');
    }
  };

  const componentrenderContext = useContext(ComponentRenderContext);

  const handleClick = (index: number) => {
    setSelectedId(index);
  };

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
    <div className="min-h-screen p-8">
      <div className="container mx-auto ">
        {/* Horizontal grid with text input */}
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
          <button onClick={sendMessage}>call signalR</button>
        </div>

        {/* Vertical grids */}
        {componentrenderContext?.isRendered ? (
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-4">
            {/* Left side vertical grid */}
            <div className=" border border-gray-300 rounded p-9 flex flex-col items-start col-span-4">
              {state?.map((item) => (
                <div
                  key={item.rowId}
                  onClick={() => handleClick(item.rowId)}
                  className={`w-[60%] p-4 mb-5 rounded shadow cursor-pointer hover:bg-red-200 
                  ${item.isSubmitted ? 'bg-yellow-300' : null} ${
                    item.isNotified ? 'bg-green-300' : null
                  }
                  ${
                    !item.isSubmitted && !item.isNotified ? 'bg-gray-300' : null
                  }`}
                >
                  Clickable Row {item.rowId + 1}
                </div>
              ))}
            </div>

            {/* Right side vertical grid */}
            <div className="col-span-8 border border-gray-300 rounded ">
              {selectedId === 0 ? <ComponentOne id={selectedId} /> : null}
              {selectedId === 1 ? <ComponentTwo id={selectedId} /> : null}
              {selectedId === 2 ? <ComponentThree id={selectedId} /> : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GridLayout;
