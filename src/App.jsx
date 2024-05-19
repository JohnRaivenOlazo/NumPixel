import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from './Header.jsx';
import About from './About.jsx';
import PreLoader from './PreLoader.jsx';
import Window from './Window.jsx';
import './assets/styles/css/index.css';
import Solution from './Solution.jsx';
import Footer from './Footer.jsx';
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
      }, 3800);
    };

    // Preload the video
    const video = document.createElement('video');
    video.src = headerVideo;
    video.preload = 'auto';
    video.addEventListener('loadedmetadata', handleVideoLoad);
    video.load();

    const logoImage = new Image();
    logoImage.src = logo;
    logoImage.onload = handleVideoLoad;

    // Clean up
    return () => {
      video.removeEventListener('loadedmetadata', handleVideoLoad);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <PreLoader />
      ) : (
        <>
          <div className={`main ${isShown ? 'showed' : ''} ${calculatorActive ? 'blurred' : ''}`}>
            <Header setCalculatorActive={setCalculatorActive} />
            <About />
            <Solution />
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
