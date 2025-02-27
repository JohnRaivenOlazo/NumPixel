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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-300">
      <div className="relative bg-[#1a1a1a] rounded-xl p-8 shadow-[0_0_50px_0_rgba(125,60,152,0.3)] w-11/12 max-w-lg h-4/5 overflow-auto transition-all duration-500 transform border border-purple-900/30">
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10" 
          onClick={handleClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">Privacy Policy</h2>
        
        <div className="text-gray-300 space-y-6">
          <p className="leading-relaxed">Welcome to NumPixel! We are committed to safeguarding your privacy and ensuring that your personal information is protected.</p>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Information Collection</h3>
            <p className="leading-relaxed">We collect personal information only when necessary, using fair and transparent methods. This may include your name, email address, and other contact details provided with your consent.</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Usage of Information</h3>
            <p className="leading-relaxed">Your information is used solely to provide the services you request, improve our offerings, and communicate with you. We do not sell, trade, or otherwise transfer your information to outside parties, except as required by law.</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Data Security</h3>
            <p className="leading-relaxed">We implement robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. Our systems are regularly reviewed and updated to maintain data security.</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Third-Party Links</h3>
            <p className="leading-relaxed">Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of these sites. We encourage you to review their privacy policies.</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Your Rights</h3>
            <p className="leading-relaxed">You have the right to access, update, or delete your personal information at any time. You can also withdraw consent for us to use your data, with the understanding that this may affect the services we can provide.</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Changes to This Policy</h3>
            <p className="leading-relaxed">We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this page. We encourage you to review this policy periodically for any updates.</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Contact Us</h3>
            <p className="leading-relaxed">If you have any questions or concerns about our privacy policy or practices, please reach out to the developer!</p>
          </div>
          
          <p className="text-sm text-gray-500 pt-4 border-t border-purple-900/30">Effective Date: 1 January 2024</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
