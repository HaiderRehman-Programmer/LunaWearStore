import React from 'react';

export const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClass = size === 'small' ? 'spinner-sm' : size === 'large' ? 'spinner-lg' : 'spinner-md';
  return (
    <div className="loading-spinner-container">
      <div className={`luxury-spinner ${sizeClass}`}></div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
