import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './pages/Homepage/Homepage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Homepage/>
  </React.StrictMode>
);