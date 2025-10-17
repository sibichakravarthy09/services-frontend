import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// User Pages
import Home from '../pages/user/Home';
import Services from '../pages/user/Services';
import ServiceDetails from '../pages/user/ServiceDetails';
import BookingPage from '../pages/user/BookingPage';
import BookingForm from '../pages/user/BookingForm';   // ✅ Added this import
import MyBookings from '../pages/user/MyBookings';
import Profile from '../pages/user/Profile';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import ManageBookings from '../pages/admin/ManageBookings';
import ManageServices from '../pages/admin/ManageServices';
import ManageUsers from '../pages/admin/ManageUsers';

// Root redirect component
const RootRedirect = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/register" replace />;
  }

  if (isAdmin()) {
    return <Navigate to="/admin/dashboard" replace />;
  } else {
    return <Navigate to="/home" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<RootRedirect />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/bookingForm" element={<BookingForm />} />
      <Route path="/services/:id" element={<ServiceDetails />} />

      {/* ✅ Added BookingForm route */}
      <Route
        path="/book/:id"
        element={
          <PrivateRoute>
            <BookingForm />
          </PrivateRoute>
        }
      />

      {/* Other User Routes */}
      <Route
        path="/booking/:id"
        element={
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/services"
        element={
          <AdminRoute>
            <ManageServices />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
