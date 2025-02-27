import React, { useEffect } from 'react';

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
          <p className="leading-relaxed">Welcome to NumPixel! This privacy policy explains how we handle information when you use our calculator application.</p>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Data Collection</h3>
            <p className="leading-relaxed">NumPixel is a client-side application. We do not collect, store, or transmit any personal information. All calculations and data processing happen directly in your browser.</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Usage Information</h3>
            <p className="leading-relaxed">Your input values and calculation results remain on your device and are not saved or transmitted to any servers. Each session starts fresh, ensuring your privacy.</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Third-Party Services</h3>
            <p className="leading-relaxed">We use Vercel for hosting our application. Please refer to Vercel's privacy policy for information about their data practices.</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Updates</h3>
            <p className="leading-relaxed">As we add new features, we'll update this privacy policy accordingly. Check back periodically for any changes.</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-400">Contact</h3>
            <p className="leading-relaxed">If you have questions about this privacy policy, feel free to reach out to the developer through GitHub!</p>
          </div>
          
          <p className="text-sm text-gray-500 pt-4 border-t border-purple-900/30">Last Updated: 1 January 2024</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
