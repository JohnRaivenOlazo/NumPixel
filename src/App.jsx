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
import headerVideo from '../public/Header.mp4'; // Import video source

const App = () => {
  const [calculatorActive, setCalculatorActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const video = document.createElement('video'); // Create video element
    video.src = headerVideo;
    video.preload = 'auto';

    const handleVideoLoad = () => {
      // Add delay after video is loaded
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsShown(true);
        }, 0);
      }, 3800); // Adjust the delay time as needed
    };

    video.addEventListener('loadeddata', handleVideoLoad);

    return () => {
      // Clean up event listener
      video.removeEventListener('loadeddata', handleVideoLoad);
    };
  }, []);

  return isLoading ? (
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
  );
};

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);
