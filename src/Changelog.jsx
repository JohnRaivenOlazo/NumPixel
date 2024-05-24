import React, { useEffect } from 'react';

const Changelog = ({ toggleActionButton, toggleChangelog }) => {
    const handleClick = () => {
        toggleChangelog();
        toggleActionButton();
      };
    
      useEffect(() => {
        const handleEsc = (event) => {
          if (event.key === 'Escape') {
              toggleChangelog();
              toggleActionButton();
          }
        };
    
        document.addEventListener('keydown', handleEsc);
    
        return () => {
          document.removeEventListener('keydown', handleEsc);
        };
      }, [toggleChangelog, toggleActionButton]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full h-3/5 p-6 relative overflow-y-auto">
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={handleClick}>
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">What's New?</h2>
        <ul className="space-y-4">
          <li className="flex flex-col">
            <span className="font-semibold text-gray-700">v1.0.0</span>
            <p className="text-gray-600">🎉 Initial release with all the core features.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Changelog;
