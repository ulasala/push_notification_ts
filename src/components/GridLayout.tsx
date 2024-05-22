import React, { useContext, useState } from 'react';

import { ComponentRenderContext } from '../context/componentRenderContext';

import TopComponent from './TopComponent';
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';

const GridLayout: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(0);

  const componentrenderContext = useContext(ComponentRenderContext);

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto ">
        {/* Horizontal grid with text input */}
        <TopComponent />

        {/* Vertical grids */}
        {componentrenderContext?.isRendered ? (
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-4">
            {/* Left side vertical grid */}
            <LeftComponent updateSelectedId={setSelectedId} />
            {/* Right side vertical grid */}
            <RightComponent selectedId={selectedId} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GridLayout;
