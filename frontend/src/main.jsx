import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './lib/auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
