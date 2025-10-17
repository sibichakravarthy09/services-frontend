// src/utils/constants.js
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const APP_NAME = process.env.REACT_APP_NAME || 'Service Booking Platform';

export const TIME_SLOTS = [
  '08:00 AM - 08:30 AM',
  '08:30 AM - 09:00 AM',
  '09:00 AM - 09:30 AM',
  '09:30 AM - 10:00 AM',
  '10:00 AM - 10:30 AM',
  '10:30 AM - 11:00 AM',
  '11:00 AM - 11:30 AM',
  '11:30 AM - 12:00 PM',
  '12:00 PM - 12:30 PM',
  '12:30 PM - 01:00 PM',
  '01:00 PM - 01:30 PM',
  '01:30 PM - 02:00 PM',
  '02:00 PM - 02:30 PM',
  '02:30 PM - 03:00 PM',
  '03:00 PM - 03:30 PM',
  '03:30 PM - 04:00 PM',
  '04:00 PM - 04:30 PM',
  '04:30 PM - 05:00 PM',
  '05:00 PM - 05:30 PM',
  '05:30 PM - 06:00 PM',
];

export const SERVICE_CATEGORIES = [
  { value: 'car_wash', label: 'Car Wash' },
  { value: 'home_cleaning', label: 'Home Cleaning' },
  { value: 'salon', label: 'Salon' },
  { value: 'other', label: 'Other' },
];

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const STATUS_COLORS = {
  pending: '#fbbf24',
  confirmed: '#10b981',
  completed: '#6366f1',
  cancelled: '#ef4444',
};