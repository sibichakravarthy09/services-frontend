import React from 'react';
import { formatDate, formatCurrency } from '../../utils/helpers';
import '../../styles/components.css';

const BookingTable = ({ bookings, onStatusUpdate, onDelete }) => {
  if (bookings.length === 0) {
    return <div className="no-data">No bookings found</div>;
  }

  return (
    <div className="table-responsive">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>
                <div>
                  <strong>{booking.user.name}</strong>
                  <br />
                  <small>{booking.user.email}</small>
                </div>
              </td>
              <td>{booking.service.name}</td>
              <td>{formatDate(booking.bookingDate)}</td>
              <td>{booking.timeSlot}</td>
              <td>{formatCurrency(booking.totalPrice)}</td>
              <td>
                <select
                  value={booking.status}
                  onChange={(e) => onStatusUpdate(booking._id, e.target.value)}
                  className={`status-select status-${booking.status}`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => onDelete(booking._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;