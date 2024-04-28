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

const App = () => {
  const [calculatorActive, setCalculatorActive] = useState(false);
  
  return (
    <>
      <PreLoader />
      <div className={`main showed ${calculatorActive && 'blurred'}`}>
        <Header setCalculatorActive={setCalculatorActive} />
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
