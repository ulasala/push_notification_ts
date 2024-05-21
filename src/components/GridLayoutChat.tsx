import React, { useContext, useState } from 'react';
import LabeledInput from './LabeledInput';
import ComponentOne from './ComponentOne';
import ComponentThree from './ComponentThree';
import ComponentTwo from './ComponentTwo';
import { ComponentRenderContext } from '../context/componentRenderContext';
//import InputField from './InputField';

const GridLayoutChat: React.FC = () => {
  const [rowColors, setRowColors] = useState<string[]>([
    'gray',
    'gray',
    'gray',
  ]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [rowColorStatusId, setColorStuatusId] = useState<number>(1);
  const componentrenderContext = useContext(ComponentRenderContext);

  console.log(componentrenderContext?.isRendered);

  const handleClick = (index: number) => {
    setSelectedId(index);
    //alert(`Row ${index + 1} clicked!`);
    // Update the color of the clicked row
    setRowColors((prevColors) =>
      prevColors.map((color, i) => (i === index ? 'blue' : color))
    );
  };

  const handleEnter = (inputValue: string) => {
    if (inputValue === 'empty') {
      console.log('Input should not be empty');
    } else {
      console.log('Enter pressed, input value:', inputValue);
      componentrenderContext?.setIsRendered(true);
    }
  };

  return (
    <div className="min-h-screen p-4 ">
      <div className="container mx-auto ">
        {/* Horizontal grid with text input */}
        <div className="mb-4 border border-gray-300 rounded  p-9">
          <LabeledInput
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
            className="w-[30%]"
            onEnter={handleEnter}
          />
        </div>

        {/* Vertical grids */}
        {componentrenderContext?.isRendered ? (
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-4">
            {/* Left side vertical grid */}
            <div className=" border border-gray-300 rounded p-9 flex flex-col items-start col-span-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`w-[60%] p-4 mb-5 bg-${
                    rowColorStatusId === 1 ? 'gray' : 'red'
                  }-300 rounded shadow cursor-pointer hover:bg-red-200 bg-${
                    rowColors[index]
                  }-500`}
                >
                  Clickable Row {index + 1}
                </div>
              ))}
            </div>

            {/* Right side vertical grid */}
            <div className="col-span-8 border border-gray-300 rounded ">
              {selectedId === 0 ? <ComponentOne /> : null}
              {selectedId === 1 ? <ComponentTwo /> : null}
              {selectedId === 2 ? <ComponentThree /> : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GridLayoutChat;
