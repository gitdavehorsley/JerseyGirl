import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // optional global stylesheet
import LandingPage from './components/LandingPage';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);
