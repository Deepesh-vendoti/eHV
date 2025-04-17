import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/layouts/DashboardLayout';
import Store from './pages/dashboard/Store';
import Organize from './pages/dashboard/Organize';
import Analyze from './pages/dashboard/Analyze';
import Share from './pages/dashboard/Share';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="store" element={<Store />} />
            <Route path="organize" element={<Organize />} />
            <Route path="analyze" element={<Analyze />} />
            <Route path="share" element={<Share />} />
            <Route index element={<Navigate to="store" replace />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;