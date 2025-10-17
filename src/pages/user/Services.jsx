import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { serviceService } from '../../services/serviceService';
import Loader from '../../components/common/Loader';
import ServiceCard from '../../components/user/ServiceCard';
import { SERVICE_CATEGORIES } from '../../utils/constants';

import '../../styles/components.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await serviceService.getAllServices(selectedCategory);
      setServices(data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  if (loading) return <Loader fullScreen message="Loading services..." />;

  return (
    <div className="services-page">
      <div className="container">
        <div className="page-header">
          <h1>🛠️ Our Services</h1>
          <p>Choose from our wide range of professional services</p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('')}
          >
            All Services
          </button>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              className={`filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="no-data">
            <p>No services found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
