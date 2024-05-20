import React, { useState } from 'react';
import './assets/styles/css/actionbutton.css'; // Import SCSS file
import PrivacyPolicy from './PrivacyPolicy'; // Import the PrivacyPolicy component

const ActionButton = () => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  const togglePrivacyPolicy = () => {
    setIsPrivacyPolicyOpen(!isPrivacyPolicyOpen);
  };

  return (
    <div>
      <div 
        id="actionBtn" 
        className="action-button bg-gradient-to-b from-purple-900 to-black" 
      >
        <div className="action-button-content">
          <div className="action-button-content-inner">
            <h2>How can we help you?</h2>
            <a className="btn" href="#">Open Calculator</a>
            <a className="btn" href="#">Contact Support</a>
            <button className="btn" onClick={togglePrivacyPolicy}>Privacy Policy</button> {/* Change anchor tag to button */}
          </div>
        </div>
      </div>
      <PrivacyPolicy isOpen={isPrivacyPolicyOpen} togglePrivacyPolicy={togglePrivacyPolicy} /> {/* Render PrivacyPolicy component */}
    </div>
  );
};

export default ActionButton;
