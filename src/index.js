import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles
import App from './App'; // Main application component
import reportWebVitals from './reportWebVitals'; // Optional performance monitoring

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the App component into the DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Performance monitoring
reportWebVitals();
