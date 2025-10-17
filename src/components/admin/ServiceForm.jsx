import React, { useState, useEffect } from 'react';
import { SERVICE_CATEGORIES } from '../../utils/constants';
import '../../styles/components.css';

const ServiceForm = ({ service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'car_wash',
    price: '',
    duration: '',
    isActive: true,
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        category: service.category,
        price: service.price,
        duration: service.duration,
        isActive: service.isActive,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="service-form">
      <div className="form-group">
        <label>Service Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Premium Car Wash"
          required
        />
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the service..."
          rows="4"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {SERVICE_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Price ($) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="29.99"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Duration (minutes) *</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="30"
            min="15"
            step="15"
            required
          />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <span>Active Service</span>
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-outline">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {service ? 'Update Service' : 'Create Service'}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;