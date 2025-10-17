import React from 'react';
import '../../styles/components.css';

const Loader = ({ fullScreen = false, message = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default Loader;