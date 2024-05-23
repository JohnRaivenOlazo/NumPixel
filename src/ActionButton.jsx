import React, { useEffect, useState } from 'react';
import './assets/styles/css/actionbutton.css';
import PrivacyPolicy from './PrivacyPolicy';

const ActionButton = ( {setCalculatorActive} ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  const togglePrivacyPolicy = () => {
    setIsPrivacyPolicyOpen(!isPrivacyPolicyOpen);
  };

  const toggleActionButton = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEsc = (event) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
        document.removeEventListener('keydown', handleEsc);
    };
}, []);

  return (
    <>
        {isPrivacyPolicyOpen && <PrivacyPolicy toggleActionButton={toggleActionButton} togglePrivacyPolicy={togglePrivacyPolicy} />}
      <div 
        id="actionBtn" 
        className={`action-button bg-gradient-to-b from-purple-900 to-black ${isOpen && 'actionsBoxOpen'}`} 
        onClick={toggleActionButton}
      >
        <div className="action-button-content">
          <div className="action-button-content-inner">
            <h2>How can we help you?</h2>
            <a className="openWindow btn">Open Calculator</a>
            <a className="btn" href="#">Changelog</a>
            <a className="btn" href="#" onClick={togglePrivacyPolicy}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionButton;