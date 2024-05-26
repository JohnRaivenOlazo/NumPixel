import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import About from './components/sections/About.jsx';
import Header from './components/sections/Header.jsx';
import Solution from './components/sections/Solution.jsx';
import Footer from './components/sections/Footer.jsx';
import ActionButton from './components/sections/actionbutton/ActionButton.jsx'

import PreLoader from './components/common/PreLoader.jsx';
import Window from './components/sections/window/Window.jsx';
import './assets/styles/css/index.css';
import logo from '/logo.png';
import headerVideo from '/Header.mp4';

const App = () => {
  const [calculatorActive, setCalculatorActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const handleVideoLoad = () => {
      setTimeout(() => {
        setIsShown(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 0);
      }, 5000);
    };

    // Preload the video
    const video = document.createElement('video');
    video.src = headerVideo;
    video.preload = 'auto';
    video.addEventListener('canplay', handleVideoLoad);
    video.load();

    const logoImage = new Image();
    logoImage.src = logo;
    logoImage.onload = handleVideoLoad;
    
    return () => {
      video.removeEventListener('canplay', handleVideoLoad);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <PreLoader />
      ) : (
        <>
        <div className={`${calculatorActive && 'hidden'}`}>

          <ActionButton setCalculatorActive={setCalculatorActive}/>
        </div>
          <div className={`main ${isShown && 'showed'} ${calculatorActive && 'blurred'}`}>
            <Header setCalculatorActive={setCalculatorActive} />
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
