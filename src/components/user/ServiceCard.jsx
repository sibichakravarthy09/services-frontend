import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import '../../styles/components.css';

const ServiceCard = ({ service }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      car_wash: '🚗',
      home_cleaning: '🏠',
      salon: '💇',
      other: '🛠️',
    };
    return icons[category] || '🛠️';
  };

  return (
    <div className="service-card">
      <div className="service-card-icon">
        {getCategoryIcon(service.category)}
      </div>

      <div className="service-card-body">
        <h3>{service.name}</h3>
        <p className="service-description">{service.description}</p>
        <div className="service-details">
          <span className="service-price">{formatCurrency(service.price)}</span>
          <span className="service-duration">⏱️ {service.duration} min</span>
        </div>
      </div>

      <div className="service-card-footer">
        {/* Existing "View Details" button */}
        <Link to={`/services/${service._id}`} className="btn btn-secondary btn-block">
          View Details
        </Link>

        {/* ✅ New "Book Now" button that links to BookingForm */}
        <Link to={`/book/${service._id}`} className="btn btn-primary btn-block">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
