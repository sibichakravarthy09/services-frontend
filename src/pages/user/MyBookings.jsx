import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { bookingService } from '../../services/bookingService';
import Loader from '../../components/common/Loader';
import BookingCard from '../../components/user/BookingCard';
import '../../styles/components.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await bookingService.cancelBooking(id);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  if (loading) return <Loader fullScreen message="Loading your bookings..." />;

  return (
    <div className="my-bookings-page">
      <div className="container">
        <div className="page-header">
          <h1>📋 My Bookings</h1>
          <p>View and manage your service bookings</p>
        </div>

        {/* Filter Tabs */}
        <div className="booking-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({bookings.length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button
            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({bookings.filter(b => b.status === 'completed').length})
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="bookings-list">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancelBooking}
              />
            ))}
          </div>
        ) : (
          <div className="no-data">
            <p>📭 No bookings found</p>
            <a href="/services" className="btn btn-primary">
              Browse Services
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;