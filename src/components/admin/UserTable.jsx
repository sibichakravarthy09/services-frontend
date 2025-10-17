import React from 'react';
import { formatDate } from '../../utils/helpers';
import '../../styles/components.css';

const UserTable = ({ users }) => {
  if (users.length === 0) {
    return <div className="no-data">No users found</div>;
  }

  return (
    <div className="table-responsive">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Joined Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <strong>{user.name}</strong>
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <span className={`status-badge ${user.role === 'admin' ? 'badge-info' : 'badge-success'}`}>
                  {user.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                </span>
              </td>
              <td>{formatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;