import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import Dashboard from './components/Dashboard'; // ✅ Import Dashboard
import Profile from './components/Profile'; // ✅ Import Profile
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Add Dashboard route */}
          <Route path="/profile" element={<Profile />} /> {/* ✅ Add Profile route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
