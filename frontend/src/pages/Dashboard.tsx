import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-[#3C91E6]">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const features = [
    {
      icon: "📝",
      title: "Store",
      description: "Upload documents or enter health data manually",
      onClick: () => navigate('/upload')
    },
    {
      icon: "🗂",
      title: "Organize",
      description: "View and organize your health records",
      onClick: () => navigate('/records')
    },
    {
      icon: "📊",
      title: "Analyze",
      description: "View trends and health summaries",
      onClick: () => navigate('/analytics')
    },
    {
      icon: "📤",
      title: "Share",
      description: "Securely share records with healthcare providers",
      onClick: () => navigate('/share')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Health Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name || 'User'}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#3C91E6] text-white rounded-md hover:bg-[#78D6C6] transition-colors duration-300"
          >
            Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              onClick={feature.onClick}
            />
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-[#3C91E6]">Recent Activity</h2>
          <p className="text-gray-600">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 