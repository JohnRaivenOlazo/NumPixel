import React, { useEffect, useState } from 'react';
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
      
      <div className="fixed bottom-6 right-6 z-50">
        {/* Action Button Menu */}
        <div className={`
          absolute bottom-full right-0 mb-4 
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
          transition-all duration-300 ease-in-out
        `}>
          <div className="relative min-w-[240px] bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl 
            p-4 shadow-[0_0_30px_0_rgba(125,60,152,0.3)] border border-purple-900/30">
            {/* Decorative Elements */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-purple-500/20 to-transparent blur-sm pointer-events-none" />
            
            {/* Content */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 p-2
                  shadow-lg shadow-purple-500/20">
                  <img src="/logo.png" alt="NumPixel Logo" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                  NumWidget
                </h2>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => { setCalculatorActive(true); }}
                  className="openWindow w-full px-4 py-3 rounded-xl text-sm font-medium text-white
                    bg-gradient-to-r from-purple-600 to-pink-500 
                    hover:from-purple-500 hover:to-pink-400
                    transition-all duration-300 
                    hover:shadow-lg hover:shadow-purple-500/25
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Z" />
                  </svg>
                  Open Calculator
                </button>
                
                <button 
                  onClick={togglePrivacyPolicy}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium 
                    text-gray-300 hover:text-white
                    hover:bg-white/5 
                    transition-all duration-200
                    hover:shadow-lg hover:shadow-purple-500/5
                    active:bg-white/10
                    flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0 1 12 2.714Z" />
                  </svg>
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Button */}
        <button
          onClick={toggleActionButton}
          className={`
            group relative w-16 h-16 rounded-2xl overflow-hidden
            bg-gradient-to-br from-purple-600 to-pink-500
            shadow-lg shadow-purple-500/30
            hover:shadow-purple-500/50 hover:scale-105
            active:scale-95
            transition-all duration-500 ease-out
            ${isOpen ? 'rotate-45 scale-90' : ''}
          `}
        >
          {/* Button Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-0 
            group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 
            group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="NumPixel Logo"
              className={`
                w-9 h-9 object-contain
                transition-all duration-500
                ${isOpen ? 'rotate-180 scale-90' : 'scale-100'}
                group-hover:scale-110
              `}
            />
          </div>
          
          {/* Notification Dot */}
          <div className={`
            absolute -top-1 -right-1 w-4 h-4 rounded-full
            bg-gradient-to-r from-purple-400 to-pink-300
            animate-pulse
            before:content-[''] before:absolute before:inset-0 
            before:rounded-full before:bg-inherit before:blur-sm
          `}/>
        </button>
      </div>
    </>
  );
};

export default ActionButton;
