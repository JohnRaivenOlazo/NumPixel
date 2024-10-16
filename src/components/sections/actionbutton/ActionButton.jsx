import React, { useEffect, useState } from 'react';
import '../../../assets/styles/css/actionbutton.css';
import PrivacyPolicy from './PrivacyPolicy';
import Changelog from './Changelog';

const ActionButton = ({ setCalculatorActive }) => {
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
        setIsPrivacyPolicyOpen(false);
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
        className={`action-button bg-gradient-to-b ${isOpen && 'actionsBoxOpen'}`} 
        onClick={toggleActionButton}
      >
        <div className="action-button-content">
          <div className="action-button-content-inner">
            <h2>NumWidget</h2>
            <a className="openWindow btn" onClick={() => { setCalculatorActive(true); }}>Open Calculator</a>
            <a className="btn" onClick={togglePrivacyPolicy}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionButton
