import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
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
        </div>
      </div>
    </div>
  );
};

export default Home; 