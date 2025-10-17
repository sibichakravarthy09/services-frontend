import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminService } from '../../services/adminService';
import Sidebar from '../../components/layout/Sidebar';
import Loader from '../../components/common/Loader';
import UserTable from '../../components/admin/UserTable';
import '../../styles/components.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader fullScreen message="Loading users..." />;

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <div className="admin-header">
          <div>
            <h1>👥 Manage Users</h1>
            <p>View all registered users</p>
          </div>
        </div>

        <div className="admin-filters">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="filter-input"
          />
        </div>

        <UserTable users={filteredUsers} />
      </div>
    </div>
  );
};

export default ManageUsers;
