// src/components/Dashboard.jsx

import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
        <aside className="sidebar">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/logout">Sign Out</Link></li>
          </ul>
        </aside>

        <main className="dashboard-main">
          <h2>Welcome to your Dashboard!</h2>
          <p>This is where you can manage your bookings and profile.</p>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

