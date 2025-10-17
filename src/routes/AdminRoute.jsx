// src/routes/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen message="Loading..." />;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin() ? children : <Navigate to="/home" replace />;
};

export default AdminRoute;