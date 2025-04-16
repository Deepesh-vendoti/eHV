import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
<<<<<<< HEAD
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEE5F2] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#3C91E6] mb-6">
            Welcome to eHealthVault
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Your secure platform for managing and organizing all your health records in one place.
            Access your medical history anytime, anywhere.
          </p>
          
          <div className="flex justify-center gap-6">
            <Link
              to="/register"
              className="px-8 py-3 bg-[#3C91E6] text-white rounded-md hover:bg-[#78D6C6] transition-colors duration-300 font-medium"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 border-2 border-[#3C91E6] text-[#3C91E6] rounded-md hover:bg-[#3C91E6] hover:text-white transition-colors duration-300 font-medium"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-[#3C91E6]">Secure Storage</h3>
              <p className="text-gray-600">Your health records are encrypted and stored securely</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2 text-[#3C91E6]">Easy Access</h3>
              <p className="text-gray-600">Access your records anytime from any device</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2 text-[#3C91E6]">Share Securely</h3>
              <p className="text-gray-600">Share records with healthcare providers safely</p>
            </div>
          </div>
=======
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome to eHealthVault
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your secure electronic health records management system
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="space-y-4">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Account
              </Link>
            </div>
          )}
>>>>>>> 7495d3c7 (feat: Initialized eHV project with separated FE/BE structure and core functionalities)
        </div>
      </div>
    </div>
  );
};

export default Home; 