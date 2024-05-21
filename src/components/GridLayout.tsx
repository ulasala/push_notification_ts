import React from 'react';

interface GridItemProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({ onClick, children }) => {
  return (
    <div
      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
        onClick ? 'border border-gray-300 rounded-md' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const GridLayout: React.FC = () => {
  const handleLeftItemClick = (index: number) => {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-100">
      <div className="mb-4">
        <div className="grid grid-cols-12">
          <input
            type="text"
            className="col-span-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter text"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 gap-4">
          <GridItem onClick={() => handleLeftItemClick(1)}>
            Left item 1
          </GridItem>
          <GridItem onClick={() => handleLeftItemClick(2)}>
            Left item 2
          </GridItem>
          <GridItem onClick={() => handleLeftItemClick(3)}>
            Left item 3
          </GridItem>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Input 1"
          />
          <input
            type="text"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Input 2"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridLayout;
