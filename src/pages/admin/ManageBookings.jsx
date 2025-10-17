import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../../services/adminService';
import Sidebar from '../../components/layout/Sidebar';
import Loader from '../../components/common/Loader';
import BookingTable from '../../components/admin/BookingTable';
import '../../styles/components.css';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', search: '' });

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllBookings(filter);
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await adminService.updateBookingStatus(id, status);
      toast.success(response.message || 'Booking status updated successfully');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      await adminService.deleteBooking(id);
      toast.success('Booking deleted successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to delete booking');
    }
  };

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>📅 Manage Bookings</h1>
          <p>View and manage all service bookings</p>
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="text"
            name="search"
            value={filter.search}
            onChange={handleFilterChange}
            placeholder="Search by customer name or email..."
            className="filter-input"
          />
        </div>

        {loading ? (
          <Loader message="Loading bookings..." />
        ) : (
          <BookingTable
            bookings={bookings}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ManageBookings;