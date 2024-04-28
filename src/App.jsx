import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from './Header.jsx';
import About from './About.jsx';
import LoadingScreen from './LoadingScreen.jsx';
import Window from './Window.jsx';
import './assets/styles/css/index.css';
import SolutionHighlights from './SolutionHighlights.jsx';
import Footer from './Footer.jsx';
import headerVideo from '../public/header-animation.mp4';

const App = () => {
  const [isVideoPreloaded, setIsVideoPreloaded] = useState(false);
  const [isShowingLoading, setIsShowingLoading] = useState(true);
  const [isMainVisible, setIsMainVisible] = useState(false);
  const [calculatorActive, setCalculatorActive] = useState(false);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = headerVideo;
    video.addEventListener('loadeddata', () => {
      setIsVideoPreloaded(true);
      setTimeout(() => {
        setIsShowingLoading(false);
        setIsMainVisible(true);
      }, 3000); // Show main content after 3 seconds
    });

    // Clean-up function to remove event listener
    return () => {
      video.removeEventListener('loadeddata', () => setIsVideoPreloaded(true));
    };
  }, []);

  return (
    <>
      {!isMainVisible && isShowingLoading && <LoadingScreen />} {/* Show loading screen for 3 seconds */}
      <div className={`main ${isMainVisible && 'showed'} ${calculatorActive ? 'blurred' : ''}`}>
        <Header setCalculatorActive={setCalculatorActive} /> {/* Pass setCalculatorActive as a prop */}
        <About />
        <SolutionHighlights />
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
