import React from 'react';
import { formatDate, formatCurrency, getStatusBadgeClass } from '../../utils/helpers';
import '../../styles/components.css';

const BookingCard = ({ booking, onCancel }) => {
  const canCancel = booking.status === 'pending' || booking.status === 'confirmed';

  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <div>
          <h3>{booking.service.name}</h3>
          <p className="booking-date">📅 {formatDate(booking.bookingDate)}</p>
        </div>
        <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
          {booking.status.toUpperCase()}
        </span>
      </div>

      <div className="booking-card-body">
        <div className="booking-info">
          <div className="info-row">
            <span className="info-label">⏰ Time Slot:</span>
            <span>{booking.timeSlot}</span>
          </div>
          <div className="info-row">
            <span className="info-label">📍 Address:</span>
            <span>{booking.address}</span>
          </div>
          <div className="info-row">
            <span className="info-label">💰 Price:</span>
            <strong>{formatCurrency(booking.totalPrice)}</strong>
          </div>
          {booking.notes && (
            <div className="info-row">
              <span className="info-label">📝 Notes:</span>
              <span>{booking.notes}</span>
            </div>
          )}
        </div>
      </div>

      {canCancel && (
        <div className="booking-card-footer">
          <button
            onClick={() => onCancel(booking._id)}
            className="btn btn-danger btn-sm"
          >
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
