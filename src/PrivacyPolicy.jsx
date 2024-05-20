import React, { useEffect } from 'react';
import './assets/styles/css/actionbutton.css';
import openWindow from './hooks/openWindow';

const PrivacyPolicy = ({ toggleActionButton , togglePrivacyPolicy }) => {
  const handleClick = () => {
    togglePrivacyPolicy();
    toggleActionButton();
  };

  openWindow();

  const handleOpenCalculatorClick = () => {
    setCalculatorActive(true);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
          togglePrivacyPolicy();
          toggleActionButton();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [togglePrivacyPolicy, toggleActionButton]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="relative bg-white rounded-lg p-8 shadow-lg w-3/4 max-w-lg h-3/4 overflow-auto transition-transform duration-300 transform translate-y-0">
        <button className="fixed top-0 right-0 p-4 z-50" onClick={handleClick}>
          <svg className="h-6 w-6 text-gray-500 hover:scale-110" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <div className="text-gray-700">
          <p className="mb-4">Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.</p>
          <p className="mb-4">We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
          <p className="mb-4">We don't share any personally identifying information publicly or with third-parties, except when required to by law.</p>
          <p className="mb-4">Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
          <p className="mb-4">You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
          <p className="mb-4">Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
          <p className="mb-4">This policy is effective as of 1 January 2024.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
