import api from './api';

export const serviceService = {
  getAllServices: async (category = '') => {
    const response = await api.get(`/services${category ? `?category=${category}` : ''}`);
    return response.data;
  },

  getServiceById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  createService: async (serviceData) => {
    const response = await api.post('/services', serviceData);
    return response.data;
  },

  updateService: async (id, serviceData) => {
    const response = await api.put(`/admin/services/${id}`, serviceData);
    return response.data;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/admin/services/${id}`);
    return response.data;
  },
};