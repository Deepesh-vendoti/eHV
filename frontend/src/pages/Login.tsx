import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api'; // Import the configured api instance

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEE5F2] to-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Left side - Welcome Text */}
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold text-[#3C91E6] mb-4">
            Welcome to eHealthVault
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your secure platform for managing health records
          </p>
          <div className="space-y-4 text-gray-600">
            <div className="flex items-center">
              <span className="text-2xl mr-3">🔒</span>
              <span>Secure storage for all your medical records</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">📱</span>
              <span>Access your health data anytime, anywhere</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-3">🏥</span>
              <span>Share records easily with healthcare providers</span>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3C91E6] focus:border-[#3C91E6] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3C91E6] focus:border-[#3C91E6] sm:text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3C91E6] hover:bg-[#78D6C6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C91E6] transition-colors"
                >
                  Sign in
                </button>
              </div>

              <div className="text-sm text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <Link
                  to="/register"
                  className="font-medium text-[#3C91E6] hover:text-[#78D6C6] transition-colors"
                >
                  Register here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} eHealthVault. All rights reserved.
      </footer>
    </div>
  );
};

export default Login; 