import api from './api';

export const adminService = {
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getAllBookings: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/admin/bookings${params ? `?${params}` : ''}`);
    return response.data;
  },

  updateBookingStatus: async (id, status) => {
    const response = await api.patch(`/admin/bookings/${id}/status`, { status });
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getAllServicesAdmin: async () => {
    const response = await api.get('/admin/services/all');
    return response.data;
  },

  deleteBooking: async (id) => {
    const response = await api.delete(`/admin/bookings/${id}`);
    return response.data;
  },
};