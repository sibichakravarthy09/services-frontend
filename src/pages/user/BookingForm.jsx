import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/bookingService';
import { formatCurrency, getMinBookingDate, getMaxBookingDate } from '../../utils/helpers';
import { TIME_SLOTS } from '../../utils/constants';
import '../../styles/components.css';

const BookingForm = ({ service, onSubmit, submitting }) => {
  const [formData, setFormData] = useState({
    bookingDate: '',
    timeSlot: '',
    address: '',
    notes: '',
  });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  useEffect(() => {
    if (formData.bookingDate) {
      checkAvailability(formData.bookingDate);
    }
  }, [formData.bookingDate]);

  const checkAvailability = async (date) => {
    setCheckingAvailability(true);
    try {
      const response = await bookingService.checkAvailability(date);
      setBookedSlots(response.bookedSlots || []);
    } catch (error) {
      console.error('Error checking availability:', error);
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isSlotBooked = (slot) => {
    return bookedSlots.includes(slot);
  };

  return (
    <div className="booking-form-container">
      <div className="booking-summary">
        <h3>📋 Booking Summary</h3>
        <div className="summary-item">
          <span>Service:</span>
          <strong>{service.name}</strong>
        </div>
        <div className="summary-item">
          <span>Duration:</span>
          <strong>{service.duration} minutes</strong>
        </div>
        <div className="summary-item">
          <span>Price:</span>
          <strong>{formatCurrency(service.price)}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <h3>📅 Select Date & Time</h3>

        <div className="form-group">
          <label>Booking Date *</label>
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            min={getMinBookingDate()}
            max={getMaxBookingDate()}
            required
          />
          <small>Please book at least 1 day in advance</small>
        </div>

        {formData.bookingDate && (
          <div className="form-group">
            <label>Select Time Slot *</label>
            {checkingAvailability ? (
              <p>Checking availability...</p>
            ) : (
              <div className="time-slots-grid">
                {TIME_SLOTS.map((slot) => (
                  <label
                    key={slot}
                    className={`time-slot-label ${
                      isSlotBooked(slot) ? 'booked' : ''
                    } ${formData.timeSlot === slot ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot}
                      checked={formData.timeSlot === slot}
                      onChange={handleChange}
                      disabled={isSlotBooked(slot)}
                      required
                    />
                    <span>{slot}</span>
                    {isSlotBooked(slot) && <span className="booked-tag">Booked</span>}
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="form-group">
          <label>Service Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter complete address where service is required"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Additional Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special instructions or requirements?"
            rows="3"
          />
        </div>

        <div className="form-total">
          <span>Total Amount:</span>
          <span className="total-price">{formatCurrency(service.price)}</span>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary btn-lg btn-block"
          disabled={submitting}
        >
          {submitting ? 'Processing...' : 'Confirm Booking'}
        </button>

        <p className="booking-note">
          ✉️ You will receive a confirmation email after booking. Our team will review and confirm your booking shortly.
        </p>
      </form>
    </div>
  );
};

export default BookingForm;