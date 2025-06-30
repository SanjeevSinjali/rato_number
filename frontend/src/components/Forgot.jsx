import React, { useState } from 'react';
import './Forgot.css';

const Forgot = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot Password submitted:', formData);
    // Add logic to send request to backend here
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>

          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>

          <button type="submit" className="login-btn">Reset Password</button>

          <p className="register-link">
            Remember your password? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
