import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import About from './components/sections/About.jsx';
import Header from './components/sections/Header.jsx';
import Solution from './components/sections/Solution.jsx';
import Footer from './components/sections/Footer.jsx';
import ActionButton from './components/sections/actionbutton/ActionButton.jsx';

import PreLoader from './components/common/PreLoader.jsx';
import Window from './components/sections/window/Window.jsx';
import './assets/styles/css/index.css';
import logo from '/logo.png';
import headerVideo from '/Header.mp4';

const App = () => {
  const [calculatorActive, setCalculatorActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleVideoLoad = () => {
      setTimeout(() => {
        setIsShown(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 0);
      }, 5000);
    };

    const updateProgress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgress(percentComplete);
      }
    };

    // Preload the video
    const video = document.createElement('video');
    video.src = headerVideo;
    video.preload = 'auto';
    video.addEventListener('canplay', handleVideoLoad);
    video.addEventListener('progress', updateProgress);
    video.load();

    const logoImage = new Image();
    logoImage.src = logo;
    logoImage.onload = handleVideoLoad;
    
    return () => {
      video.removeEventListener('canplay', handleVideoLoad);
      video.removeEventListener('progress', updateProgress);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <PreLoader progress={progress} />
      ) : (
        <>
          <div className={`${calculatorActive && 'hidden'}`}>
            <ActionButton setCalculatorActive={setCalculatorActive} />
          </div>
          <div className={`main absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all overflow-x-hidden duration-200 ${isShown && 'showed'} ${calculatorActive && 'blurred active'}`}>
            <Header setCalculatorActive={setCalculatorActive} calculatorActive={calculatorActive} />
            <About />
            <Solution setCalculatorActive={setCalculatorActive} />
            <Footer />
          </div>
          <Window setCalculatorActive={setCalculatorActive} />
        </>
      )}
    </>
  );
};

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);
