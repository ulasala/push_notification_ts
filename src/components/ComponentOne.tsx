import React from 'react';

interface ComponentOneProps {}

const ComponentOne: React.FC<ComponentOneProps> = () => {
  return (
    <div className="relative h-full justify-content-start p-8">
      <div className="flex flex-col justify-start items-start">
        <label className="text-sm font-medium mb-2">Short Description</label>
        <div>Use your real name so people will recognize you.</div>
      </div>
      <div className="flex flex-col justify-end items-end">
        <button className="w-[20%] p-2 bg-blue-500 text-white rounded hover:bg-blue-600 absolute bottom-8 right-8 ">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ComponentOne;
