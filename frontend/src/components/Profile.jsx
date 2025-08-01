import React from 'react';
import { useForm } from 'react-hook-form';
import illustration from '../assets/profileresetillu.jpg'; // ensure this exists

const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f3f2] px-4">
      <div className="flex max-w-5xl w-full bg-white rounded-xl shadow-lg p-10 gap-10">
        {/* Form Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-[#009689] mb-8">Edit Profile</h2>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Full Name"
              {...register('fullName', { required: 'Full Name is required' })}
              className={`px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#009689] ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#009689] ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              type="text"
              placeholder="Contact Number"
              {...register('contactNumber', {
                required: 'Contact Number is required',
                minLength: { value: 6, message: 'Too short' },
              })}
              className={`px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#009689] ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum length is 6' },
              })}
              className={`px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#009689] ${errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value, formValues) =>
                  value === formValues.password || 'Passwords do not match',
              })}
              className={`px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#009689] ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-[#009689] hover:bg-[#007e73] text-white font-semibold py-3 rounded-md transition flex-1"
              >
                Save Profile
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-md transition flex-1"
              >
                Reset Profile
              </button>
            </div>
          </form>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <img
            src={illustration}
            alt="Profile Reset Illustration"
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

