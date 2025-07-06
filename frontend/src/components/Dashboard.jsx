// src/components/Dashboard.jsx
import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import ProfilePic from '../assets/profile.jpg'; // ✅ Make sure this path is correct

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3 className="site-name">Rato<span className="red">Number</span></h3>
          <img src={ProfilePic} alt="Profile" className="profile-image" />
        </div>
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
  );
};

export default Dashboard;
