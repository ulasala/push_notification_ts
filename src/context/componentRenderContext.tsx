import React, { ReactNode, createContext, useMemo, useState } from 'react';

interface RenderState {
  isRendered: boolean;
  setIsRendered: React.Dispatch<
    React.SetStateAction<RenderState['isRendered']>
  >;
}

export const ComponentRenderContext = createContext<RenderState | null>(null);

export const ComponentRenderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isRendered, setIsRendered] =
    useState<RenderState['isRendered']>(false);

  const value = useMemo(() => ({ isRendered, setIsRendered }), [isRendered]);

  return (
    <ComponentRenderContext.Provider value={value}>
      {children}
    </ComponentRenderContext.Provider>
  );
};
