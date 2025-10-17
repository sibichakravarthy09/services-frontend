import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../../services/adminService';
import Sidebar from '../../components/layout/Sidebar';
import Loader from '../../components/common/Loader';
import DashboardStats from '../../components/admin/DashboardStats';
import { formatDate, formatCurrency } from '../../utils/helpers';
import '../../styles/components.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await adminService.getDashboard();
      setStats(data.statistics);
      setRecentBookings(data.recentBookings);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen message="Loading dashboard..." />;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>📊 Admin Dashboard</h1>
          <p>Overview of your service booking platform</p>
        </div>

        <DashboardStats stats={stats} />

        {/* Recent Bookings */}
        <div className="dashboard-section">
          <h2>📋 Recent Bookings</h2>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.user.name}</td>
                    <td>{booking.service.name}</td>
                    <td>{formatDate(booking.bookingDate)}</td>
                    <td>
                      <span className={`status-badge badge-${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>{formatCurrency(booking.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;