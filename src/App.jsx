import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from './Header.jsx';
import About from './About.jsx';
import PreLoader from './PreLoader.jsx';
import Window from './Window.jsx';
import './assets/styles/css/index.css';
import Solution from './Solution.jsx';
import Footer from './Footer.jsx';
import headerVideo from '../public/Header.mp4';

const App = () => {
  const [calculatorActive, setCalculatorActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = headerVideo;
    video.preload = 'auto';
    videoRef.current = video;

    const handleCanPlayThrough = () => {
      // Delay for better UX
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsShown(true);
        }, 0);
      }, 3800);
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      // Clean up event listener
      if (videoRef.current) {
        videoRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
      }
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
