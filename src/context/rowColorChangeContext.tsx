import React, { ReactNode, createContext, useMemo, useState } from 'react';

interface RowColorChangeState {
  rowId: number;
  isSubmitted: boolean;
  isNotified: boolean;
  setRowId: React.Dispatch<React.SetStateAction<RowColorChangeState['rowId']>>;
  setIsSubmitted: React.Dispatch<
    React.SetStateAction<RowColorChangeState['isSubmitted']>
  >;
  setIsNotified: React.Dispatch<
    React.SetStateAction<RowColorChangeState['isNotified']>
  >;
}

export const RowColorChangeContext = createContext<RowColorChangeState | null>(
  null
);

export const RowColorChangeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [rowId, setRowId] = useState<RowColorChangeState['rowId']>(0);

  const [isSubmitted, setIsSubmitted] =
    useState<RowColorChangeState['isSubmitted']>(false);

  const [isNotified, setIsNotified] =
    useState<RowColorChangeState['isNotified']>(false);

  const value = useMemo(
    () => ({
      isSubmitted,
      setIsSubmitted,
      isNotified,
      setIsNotified,
      rowId,
      setRowId,
    }),
    [isSubmitted, isNotified, rowId]
  );

  return (
    <RowColorChangeContext.Provider value={value}>
      {children}
    </RowColorChangeContext.Provider>
  );
};
