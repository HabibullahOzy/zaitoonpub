import React from 'react';
import './SkeltonLoader.css';

const SkeltonLoader = () => {
    return (
          <div className="skeleton-card">
      <div className="skeleton skeleton-img"></div>
      <div className="skeleton skeleton-text short"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
    </div>
    );
};

export default SkeltonLoader;