import React, { useEffect, useState } from 'react';
import '../../../assets/styles/css/actionbutton.css';
import PrivacyPolicy from './PrivacyPolicy';

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
        className={`action-button block fixed ml-10 right-10 bottom-4 w-12 h-12 p-3 rounded-lg bg-gradient-to-b cursor-pointer from-[#7D3C98] to-[#4B0082] z-10 ${isOpen && 'actionsBoxOpen'}`} 
        onClick={toggleActionButton}
      >
        <div className="action-button-content">
          <div className="action-button-content-inner">
            <h2 className="text-[#4B0082] font-bold mb-4">NumWidget</h2>
            <a className="openWindow btn block py-1 text-center text-black mb-3" onClick={() => { setCalculatorActive(true); }}>Open Calculator</a>
            <a className="btn block py-1" onClick={togglePrivacyPolicy}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionButton
