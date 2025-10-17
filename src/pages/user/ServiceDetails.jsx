import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serviceService } from '../../services/serviceService';
import { useAuth } from '../../hooks/useAuth';
import { useBooking } from '../../hooks/useBooking';
import Loader from '../../components/common/Loader';
import { formatCurrency } from '../../utils/helpers';
import '../../styles/components.css';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { setSelectedService } = useBooking();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  const fetchServiceDetails = async () => {
    try {
      const data = await serviceService.getServiceById(id);
      setService(data);
    } catch (error) {
      toast.error('Failed to load service details');
      navigate('/services');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated()) {
      toast.info('Please login to book a service');
      navigate('/login');
      return;
    }
    setSelectedService(service);
    navigate(`/booking/${service._id}`);
  };

  if (loading) return <Loader fullScreen message="Loading service details..." />;
  if (!service) return null;

  return (
    <div className="service-details-page">
      <div className="container">
        <button onClick={() => navigate('/services')} className="btn btn-back">
          ← Back to Services
        </button>

        <div className="service-details-card">
          <div className="service-details-header">
            <div className="service-icon-large">
              {service.category === 'car_wash' && '🚗'}
              {service.category === 'home_cleaning' && '🏠'}
              {service.category === 'salon' && '💇'}
              {service.category === 'other' && '🛠️'}
            </div>
            <div>
              <h1>{service.name}</h1>
              <p className="service-category">{service.category.replace('_', ' ').toUpperCase()}</p>
            </div>
          </div>

          <div className="service-details-body">
            <div className="service-info-section">
              <h3>📝 Service Description</h3>
              <p>{service.description}</p>
            </div>

            <div className="service-info-grid">
              <div className="info-item">
                <span className="info-label">💰 Price</span>
                <span className="info-value">{formatCurrency(service.price)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">⏱️ Duration</span>
                <span className="info-value">{service.duration} minutes</span>
              </div>
            </div>

            <div className="service-features">
              <h3>✨ What's Included</h3>
              <ul>
                <li>✅ Professional service by trained experts</li>
                <li>✅ High-quality equipment and materials</li>
                <li>✅ Flexible scheduling</li>
                <li>✅ Email confirmation and updates</li>
                <li>✅ Customer support</li>
              </ul>
            </div>
          </div>

          <div className="service-details-footer">
            <div className="price-display">
              <span>Total Price:</span>
              <span className="price-amount">{formatCurrency(service.price)}</span>
            </div>
            <button onClick={handleBookNow} className="btn btn-primary btn-lg">
              Book This Service Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;