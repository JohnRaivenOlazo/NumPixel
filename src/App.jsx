import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from './Header.jsx';
import About from './About.jsx'
import PreLoader from './PreLoader.jsx';
import Window from './Window.jsx';
import './assets/styles/css/index.css';
import SolutionHighlights from './SolutionHighlights.jsx';
import Footer from './Footer.jsx';
import headerVideo from '../public/Header.mp4';

const App = () => {
  const [isShown, setIsShown] = useState(false);
  const [calculatorActive, setCalculatorActive] = useState(false);

  useEffect(() => {
    // Preload Header
    const video = new Image();
    video.src = headerVideo;
    setTimeout(() => {
      setIsShown(true);
    }, 3800);
  }, []);

  return (
    <>
      <PreLoader />
      <div className={`main ${isShown && 'showed'} ${calculatorActive ? 'blurred' : ''}`}>
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
