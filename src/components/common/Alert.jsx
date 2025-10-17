import React from 'react';
import '../../styles/components.css';

const Alert = ({ type = 'info', message, onClose }) => {
  const alertTypes = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className={`alert alert-${type}`}>
      <span className="alert-icon">{alertTypes[type]}</span>
      <span className="alert-message">{message}</span>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;