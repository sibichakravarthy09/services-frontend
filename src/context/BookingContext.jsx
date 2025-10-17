import React, { createContext, useState } from 'react';

export const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingData, setBookingData] = useState({
    service: '',
    bookingDate: '',
    timeSlot: '',
    address: '',
    notes: '',
  });

  const updateBookingData = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const resetBookingData = () => {
    setBookingData({
      service: '',
      bookingDate: '',
      timeSlot: '',
      address: '',
      notes: '',
    });
    setSelectedService(null);
  };

  const value = {
    selectedService,
    setSelectedService,
    bookingData,
    updateBookingData,
    resetBookingData,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};