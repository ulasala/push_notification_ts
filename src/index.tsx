import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import { APIProvider } from './context/APIContext';
import { ComponentRenderProvider } from './context/componentRenderContext';
import { RowColorChangeProvider } from './context/rowColorChangeContext';
import { RowProvider } from './context/RowContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ComponentRenderProvider>
      <RowColorChangeProvider>
        <RowProvider>
          <App />
        </RowProvider>
      </RowColorChangeProvider>
    </ComponentRenderProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
