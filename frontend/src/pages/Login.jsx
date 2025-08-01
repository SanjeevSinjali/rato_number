import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { toast } from 'react-toastify';

const Login = () => {
  const { login } = useAuth()
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      toast.success("Successfully logged in!!")

    } catch (err) {
      console.error(`Error occured at login: ${err.response?.data.error}`)
      toast.error(err.response?.data.error)
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen
        bg-gradient-to-b from-black/50 to-black/50
        bg-[url('../assets/login.jpg')] bg-center bg-cover
        px-5"
    >
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md
                text-gray-700 text-base
                focus:outline-none focus:border-teal-600 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md
                text-gray-700 text-base
                focus:outline-none focus:border-teal-600 transition"
            />
          </div>

          <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
            <label className="flex items-center gap-2 select-none">
              <input type="checkbox" name="remember" className="form-checkbox text-teal-600" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-teal-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold
              py-3 rounded-md shadow-md transition duration-200"
          >
            Login
          </button>

          <p className="text-center mt-6 text-gray-600 text-base">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-teal-600 font-semibold hover:underline transition duration-200"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

