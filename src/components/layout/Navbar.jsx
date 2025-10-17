import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/components.css';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ✅ Safe checks
  const authenticated = user && isAuthenticated();
  const admin = authenticated && isAdmin();

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          🚗 Service Booking
        </Link>

        <button 
          className="navbar-toggler"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>

            {authenticated ? (
              <>
                {admin ? (
                  <>
                    <li><Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                    <li><Link to="/admin/bookings" onClick={() => setIsMenuOpen(false)}>Bookings</Link></li>
                    <li><Link to="/admin/services" onClick={() => setIsMenuOpen(false)}>Manage Services</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/my-bookings" onClick={() => setIsMenuOpen(false)}>My Bookings</Link></li>
                    <li><Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>
                  </>
                )}
                <li className="navbar-user">
                  <span>👤 {user?.name || 'User'}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-logout">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
                <li>
                  <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
