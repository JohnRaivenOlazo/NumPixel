import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Header from './Header.jsx';
import Features from './Features.jsx'
import LoadingScreen from './loadingScreen.jsx';
import Window from './Window.jsx';
import './assets/styles/css/index.css';
import SolutionHighlights from './SolutionHighlights.jsx';
import Footer from './Footer.jsx';

const App = () => {
  const [isShown, setIsShown] = useState(false);
  const [calculatorActive, setCalculatorActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, 3800);
  }, []);

  return (
    <>
      <LoadingScreen />
      <div className={`main ${isShown && 'showed'} ${calculatorActive ? 'blurred' : ''}`}>
        <Header setCalculatorActive={setCalculatorActive} /> {/* Pass setCalculatorActive as a prop */}
        <Features />
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
