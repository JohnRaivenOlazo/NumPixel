// PreLoader.jsx

import React, { useState, useEffect } from 'react';
import '../../App';
import '../../assets/styles/css/index.css';

const PreLoader = ({ progress: externalProgress }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');

  useEffect(() => {
    const loadingStages = [
      { progress: 20, text: 'Loading resources' },
      { progress: 40, text: 'Preparing components' },
      { progress: 60, text: 'Initializing calculator' },
      { progress: 80, text: 'Setting up interface' },
      { progress: 100, text: 'Almost ready' }
    ];

    let currentStage = 0;
    
    // Simulate realistic loading stages
    const loadingInterval = setInterval(() => {
      if (currentStage < loadingStages.length) {
        const { progress: targetProgress, text } = loadingStages[currentStage];
        
        setProgress(prev => {
          if (prev < targetProgress) {
            return prev + 1;
          }
          currentStage++;
          setLoadingText(text);
          return prev;
        });
      } else {
        clearInterval(loadingInterval);
      }
    }, 50);

    return () => clearInterval(loadingInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1a1a1a]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/logo.png')] bg-center opacity-[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      
      <div className="relative">
        {/* Logo Container */}
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-8">
            {/* Rotating Circles */}
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className={`
                    absolute inset-0 rounded-full border-2 border-transparent
                    border-t-purple-500 border-r-pink-500
                    animate-[spin_${2 + i}s_linear_infinite]
                  `}
                  style={{
                    transform: `scale(${1 + i * 0.2})`,
                    opacity: 1 - i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="NumPixel Logo"
                className="w-16 h-16 animate-pulse"
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-1 mb-4 relative overflow-hidden rounded-full bg-white/5">
            <div 
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            {/* Glow Effect */}
            <div 
              className="absolute inset-y-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 blur-md transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                opacity: 0.5 
              }}
            />
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
              NumPixel
            </h2>
            <p className="text-sm text-gray-400">
              {loadingText}{' '}
              <span className="inline-flex w-8">
                {[...Array(3)].map((_, i) => (
                  <span 
                    key={i}
                    className="w-1 h-1 mx-0.5 rounded-full bg-gray-400 animate-bounce"
                    style={{ 
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '1s'
                    }}
                  />
                ))}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              {progress}% Complete
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -inset-32 -z-10">
          {/* Gradient Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-3xl animate-pulse" 
                style={{ animationDelay: '1s' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
