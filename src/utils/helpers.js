import { format, parseISO } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return '';
  try {
    return format(parseISO(date), 'MMM dd, yyyy');
  } catch (error) {
    return format(new Date(date), 'MMM dd, yyyy');
  }
};

export const formatDateTime = (date) => {
  if (!date) return '';
  try {
    return format(parseISO(date), 'MMM dd, yyyy hh:mm a');
  } catch (error) {
    return format(new Date(date), 'MMM dd, yyyy hh:mm a');
  }
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'badge-warning',
    confirmed: 'badge-success',
    completed: 'badge-info',
    cancelled: 'badge-danger',
  };
  return classes[status] || 'badge-secondary';
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getMinBookingDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

export const getMaxBookingDate = () => {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90); // 90 days from now
  return maxDate.toISOString().split('T')[0];
};