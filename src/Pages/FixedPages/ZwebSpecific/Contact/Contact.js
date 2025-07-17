import React from 'react';
import './Contact.css';

const Contact = () => {

  return (
    <div className='max-h-screen'> 
      <div className="help-card">
      <h2 className="help-title">Need Help?</h2>
      <p className="help-text">Our support team is here for you 24/7. Reach out to us anytime!</p>

      <div className="contact-info">
        <div className="contact-method">
          <span className="contact-label">Email:</span>
          <a href="mailto:support@example.com" className="contact-link">zaitoonpublication.bd@gmail.com</a>
        </div>
        <div className="contact-method">
          <span className="contact-label">Phone:</span>
          <a href="tel:+1234567890" className="contact-link">+8801748-806492</a>
        </div>
        <div className="contact-method">
          {/* <span className="contact-label">Live Chat:</span>
          <a href="/chat" className="contact-link">Start a Chat</a> */}
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default Contact;