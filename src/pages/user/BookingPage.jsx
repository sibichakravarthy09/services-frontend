import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serviceService } from '../../services/serviceService';
import { bookingService } from '../../services/bookingService';
import Loader from '../../components/common/Loader';
import BookingForm from "./BookingForm"; 
import '../../styles/components.css';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const data = await serviceService.getServiceById(id);
      setService(data);
    } catch (error) {
      toast.error('Failed to load service');
      navigate('/services');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (bookingData) => {
    setSubmitting(true);
    try {
      const response = await bookingService.createBooking({
        ...bookingData,
        service: id,
      });
      toast.success(response.message || 'Booking created successfully! Check your email for confirmation.');
      navigate('/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader fullScreen message="Loading..." />;

  return (
    <div className="booking-page">
      <div className="container">
        <h1>📅 Book Your Service</h1>
        <BookingForm 
          service={service} 
          onSubmit={handleBookingSubmit}
          submitting={submitting}
        />
      </div>
    </div>
  );
};

export default BookingPage;