import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Remove this if you don't have an index.css file
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
