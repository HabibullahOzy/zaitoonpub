import React from 'react';
import './NotFoundPages.css';
import img1 from '../../assets/4O4page.jpg'
import { Link } from 'react-router-dom';

const NotFoundPages = () => {

    return (
        <div className="notfound-container">
            <img
                className="notfound-image"
                src={img1}
                alt="Not Found"
            />
            <h1 className="notfound-title">404</h1>
            <p className="notfound-text">Oops! The page you're looking for doesn't exist.</p>
            <Link to={'/'} className="notfound-button">Back to Home</Link>
        </div>
    );
};

export default NotFoundPages;