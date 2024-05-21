import React from 'react';
import LabeledInput from './LabeledInput';

interface ComponentTwoProps {}

const ComponentTwo: React.FC<ComponentTwoProps> = () => {
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
          />
        </div>
      </div>

      <div className="flex flex-col justify-end items-end">
        <button className="w-[20%] p-2 bg-blue-500 text-white rounded hover:bg-blue-600 absolute bottom-8 right-8 ">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ComponentTwo;