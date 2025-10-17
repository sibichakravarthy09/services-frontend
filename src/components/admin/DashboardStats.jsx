import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import '../../styles/components.css';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: '📋',
      color: '#6366f1',
    },
    {
      title: 'Pending',
      value: stats.pendingBookings,
      icon: '⏳',
      color: '#fbbf24',
    },
    {
      title: 'Confirmed',
      value: stats.confirmedBookings,
      icon: '✅',
      color: '#10b981',
    },
    {
      title: 'Completed',
      value: stats.completedBookings,
      icon: '🎊',
      color: '#8b5cf6',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: '#3b82f6',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: '💰',
      color: '#10b981',
    },
    {
      title: 'Today\'s Bookings',
      value: stats.todayBookings,
      icon: '📅',
      color: '#f59e0b',
    },
    {
      title: 'Active Services',
      value: stats.totalServices,
      icon: '🛠️',
      color: '#6366f1',
    },
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => (
        <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
          <div className="stat-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-info">
            <p className="stat-title">{stat.title}</p>
            <h3 className="stat-value">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;