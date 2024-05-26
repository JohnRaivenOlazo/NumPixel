import React, { useEffect } from 'react';
import '../../../assets/styles/css/actionbutton.css';

const PrivacyPolicy = ({ toggleActionButton, togglePrivacyPolicy }) => {
  const handleClick = () => {
    togglePrivacyPolicy();
    toggleActionButton();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300">
      <div className="relative bg-white rounded-lg p-8 shadow-2xl w-11/12 max-w-lg h-3/4 overflow-auto transition-transform duration-500 transform">
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={handleClick}>
          &times;
        </button>
        <h2 className="text-3xl font-extrabold mb-6 text-purple-800">Privacy Policy</h2>
        <div className="text-gray-700 space-y-4">
          <p>Welcome to NumPixel! We are committed to safeguarding your privacy and ensuring that your personal information is protected.</p>
          
          <h3 className="text-xl font-semibold text-purple-700">Information Collection</h3>
          <p>We collect personal information only when necessary, using fair and transparent methods. This may include your name, email address, and other contact details provided with your consent.</p>
          
          <h3 className="text-xl font-semibold text-purple-700">Usage of Information</h3>
          <p>Your information is used solely to provide the services you request, improve our offerings, and communicate with you. We do not sell, trade, or otherwise transfer your information to outside parties, except as required by law.</p>
          
          <h3 className="text-xl font-semibold text-purple-700">Data Security</h3>
          <p>We implement robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. Our systems are regularly reviewed and updated to maintain data security.</p>
          
          <h3 className="text-xl font-semibold text-purple-700">Third-Party Links</h3>
          <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of these sites. We encourage you to review their privacy policies.</p>
          
          <h3 className="text-xl font-semibold text-purple-700">Your Rights</h3>
          <p>You have the right to access, update, or delete your personal information at any time. You can also withdraw consent for us to use your data, with the understanding that this may affect the services we can provide.</p>
          
          <h3 className="text-xl font-semibold text-purple-700">Changes to This Policy</h3>
          <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this page. We encourage you to review this policy periodically for any updates.</p>
          
          <h3 className="text-xl font-semibold text-purple-700">Contact Us</h3>
          <p>If you have any questions or concerns about our privacy policy or practices, please reach out the developer!</p>
          
          <p className="text-sm text-gray-500">Effective Date: 1 January 2024</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
