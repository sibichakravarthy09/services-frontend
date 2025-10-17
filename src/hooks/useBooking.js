import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === null) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};