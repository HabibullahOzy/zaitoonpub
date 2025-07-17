import React, { useEffect, useState } from 'react';
import './OpeningAnimation.css';

const Openinganimation = () => {
     const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false); // Hide after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="opening-screen">
      <div className="animation-content">
        <h1>Welcome to My Website</h1>
        <p>Loading your experience...</p>
      </div>
    </div>
  );
};

export default Openinganimation;