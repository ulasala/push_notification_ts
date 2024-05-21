import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the types
export interface Row {
  rowId: number;
  isSubmitted: boolean;
  isNotified: boolean;
}

type State = Row[];

interface ContextProps {
  state: State;
  addRow: (row: Row) => void;
  updateRow: (rowId: number, newRow: Partial<Row>) => void;
  removeRow: (rowId: number) => void;
}

// Initial state
const initialState: State = [
  {
    rowId: 0,
    isSubmitted: false,
    isNotified: false,
  },
  {
    rowId: 1,
    isSubmitted: false,
    isNotified: false,
  },
  {
    rowId: 2,
    isSubmitted: false,
    isNotified: false,
  },
];

// Create the context
const RowContext = createContext<ContextProps | undefined>(undefined);

// Reducer function to manage the state
const rowReducer = (
  state: State,
  action: { type: string; payload: any }
): State => {
  switch (action.type) {
    case 'ADD_ROW':
      return [...state, action.payload];
    case 'UPDATE_ROW':
      return state.map((row) =>
        row.rowId === action.payload.rowId
          ? { ...row, ...action.payload.newRow }
          : row
      );
    case 'REMOVE_ROW':
      return state.filter((row) => row.rowId !== action.payload);
    default:
      return state;
  }
};

// Provider component
const RowProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(rowReducer, initialState);

  const addRow = (row: Row) => {
    // Check for duplicate rowId
    const isDuplicate = state.some(
      (existingRow) => existingRow.rowId === row.rowId
    );
    if (!isDuplicate) {
      dispatch({ type: 'ADD_ROW', payload: row });
    } else {
      console.warn(`Row with rowId ${row.rowId} already exists`);
    }
  };

  const updateRow = (rowId: number, newRow: Partial<Row>) => {
    dispatch({ type: 'UPDATE_ROW', payload: { rowId, newRow } });
  };

  const removeRow = (rowId: number) => {
    dispatch({ type: 'REMOVE_ROW', payload: rowId });
  };

  return (
    <RowContext.Provider value={{ state, addRow, updateRow, removeRow }}>
      {children}
    </RowContext.Provider>
  );
};

// Custom hook to use the RowContext
const useRowContext = () => {
  const context = useContext(RowContext);
  if (context === undefined) {
    throw new Error('useRowContext must be used within a RowProvider');
  }
  return context;
};

export { RowProvider, useRowContext };
