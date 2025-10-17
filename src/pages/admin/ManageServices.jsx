import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../../services/adminService';
import { serviceService } from '../../services/serviceService';
import Sidebar from '../../components/layout/Sidebar';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import ServiceForm from '../../components/admin/ServiceForm';
import { formatCurrency } from '../../utils/helpers';
import '../../styles/components.css';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await adminService.getAllServicesAdmin();
      setServices(data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      await serviceService.deleteService(id);
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const handleSubmit = async (serviceData) => {
    try {
      if (editingService) {
        await serviceService.updateService(editingService._id, serviceData);
        toast.success('Service updated successfully');
      } else {
        await serviceService.createService(serviceData);
        toast.success('Service created successfully');
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save service');
    }
  };

  if (loading) return <Loader fullScreen message="Loading services..." />;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <div className="admin-header">
          <div>
            <h1>🛠️ Manage Services</h1>
            <p>Add, edit, or remove services</p>
          </div>
          <button onClick={handleAddNew} className="btn btn-primary">
            + Add New Service
          </button>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td>
                    <strong>{service.name}</strong>
                    <br />
                    <small>{service.description.substring(0, 50)}...</small>
                  </td>
                  <td>{service.category.replace('_', ' ').toUpperCase()}</td>
                  <td>{formatCurrency(service.price)}</td>
                  <td>{service.duration} min</td>
                  <td>
                    <span className={`status-badge ${service.isActive ? 'badge-success' : 'badge-danger'}`}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(service)}
                      className="btn btn-sm btn-outline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingService ? 'Edit Service' : 'Add New Service'}
        >
          <ServiceForm
            service={editingService}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ManageServices;