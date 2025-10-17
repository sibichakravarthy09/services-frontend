import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/helpers';
import '../../styles/components.css';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="container">
        <div className="page-header">
          <h1>👤 My Profile</h1>
          <p>View your account information</p>
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2>{user?.name}</h2>
              <p className="profile-role">{user?.role === 'admin' ? '🛡️ Admin' : '👤 User'}</p>
            </div>
          </div>

          <div className="profile-info">
            <div className="info-section">
              <h3>📧 Contact Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span>{user?.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span>{user?.phone}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>🔐 Account Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Account Type:</span>
                  <span>{user?.role === 'admin' ? 'Administrator' : 'Customer'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Member Since:</span>
                  <span>{formatDate(user?.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;