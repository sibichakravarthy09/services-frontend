import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components.css';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      <nav className="sidebar-nav">
        <Link to="/admin/dashboard" className={`sidebar-link ${isActive('/admin/dashboard')}`}>
          📊 Dashboard
        </Link>
        <Link to="/admin/bookings" className={`sidebar-link ${isActive('/admin/bookings')}`}>
          📅 Manage Bookings
        </Link>
        <Link to="/admin/services" className={`sidebar-link ${isActive('/admin/services')}`}>
          🛠️ Manage Services
        </Link>
        <Link to="/admin/users" className={`sidebar-link ${isActive('/admin/users')}`}>
          👥 Users
        </Link>
        <Link to="/" className="sidebar-link">
          🏠 Back to Home
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;