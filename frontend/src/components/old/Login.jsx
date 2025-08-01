import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);

    // On success:
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <a href="/forgot-password" className="text-[#009689]">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#009689] hover:bg-[#007f73] text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
          >
            Login
          </button>

          <p className="text-center mt-6 text-gray-600 text-base">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-[#009689] font-semibold no-underline hover:underline transition duration-200"
            >
              Register
            </a>
          </p>


        </form>
      </div>
    </div>
  );
};

export default Login;
