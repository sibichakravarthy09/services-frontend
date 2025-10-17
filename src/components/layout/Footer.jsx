import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🚗 Service Booking</h3>
            <p>Your trusted platform for booking quality services.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Car Wash</li>
              <li>Home Cleaning</li>
              <li>Salon Services</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>📧 sibichakravarthy0909@gmail.com</li>
              <li>📞 +91 98765 43210</li>
              <li>📍 Madurai, Tamil Nadu</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Service Booking Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;