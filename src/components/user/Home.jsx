import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/components.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>🚗 Welcome to Service Booking Platform</h1>
            <p className="hero-subtitle">
              Book premium services at your convenience. From car wash to home cleaning,
              we've got you covered!
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary btn-lg">
                Browse Services
              </Link>
              {!isAuthenticated() && (
                <Link to="/register" className="btn btn-outline btn-lg">
                  Sign Up Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Booking</h3>
              <p>Book your service in minutes with our simple booking process</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Verified Services</h3>
              <p>All our service providers are verified and highly rated</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with no hidden charges</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Email Notifications</h3>
              <p>Get instant email updates on your booking status</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <h2 className="section-title">Our Popular Services</h2>
          <div className="services-grid">
            <div className="service-preview-card">
              <div className="service-icon">🚗</div>
              <h3>Car Wash</h3>
              <p>Professional car washing and detailing services</p>
            </div>
            <div className="service-preview-card">
              <div className="service-icon">🏠</div>
              <h3>Home Cleaning</h3>
              <p>Deep cleaning for your home, kitchen, and more</p>
            </div>
            <div className="service-preview-card">
              <div className="service-icon">💇</div>
              <h3>Salon Services</h3>
              <p>Haircuts, styling, spa, and beauty treatments</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Book Your Service?</h2>
            <p>Join thousands of satisfied customers today!</p>
            {isAuthenticated() ? (
              <Link to="/services" className="btn btn-light btn-lg">
                Browse Services
              </Link>
            ) : (
              <Link to="/register" className="btn btn-light btn-lg">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;