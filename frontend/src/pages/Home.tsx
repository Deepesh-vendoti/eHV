import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome back to eHealthVault
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Manage and access your health records securely.
        </p>
        <div className="mt-6 text-center">
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-[#EEE5F2] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#3C91E6] mb-6">Welcome to eHealthVault</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Your secure platform for managing and organizing all your health records in one place.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/register"
              className="px-8 py-3 bg-[#3C91E6] text-white rounded-md hover:bg-[#78D6C6] transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border-2 border-[#3C91E6] text-[#3C91E6] rounded-md hover:bg-[#3C91E6] hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;