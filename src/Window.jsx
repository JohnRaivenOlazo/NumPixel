import React, { useEffect } from 'react'
import './assets/styles/css/window.css'
import WindowContent from './WindowContent.jsx'
import openWindow from './hooks/openWindow.jsx'

const Window = ({ calculatorActive, setCalculatorActive }) => {
  
    openWindow(setCalculatorActive);

  const handleClick = (e) => {
    if (calculatorActive) {
      e.stopPropagation();
    }
  };

  const handleMinimizeClick = () => {
    setCalculatorActive(prevState => !prevState);
  };

  const handleMaximizeClick = () => {
    setCalculatorActive(true);
  }
  
  const handleCalculatorClick = () => {
    setCalculatorActive(true);
  };

  return (
    <div className="mac-window" onClick={() => { handleClick(); }}>
      <div className="title-bar bg-gray-800 text-white">
        <div className="buttons">
          <div className="close"></div>
          <div className="minimize" onClick={handleMinimizeClick}></div>
          <div className="maximize" onClick={handleMaximizeClick}></div>
        </div>
        <div className="title">Numerical Methods</div>
      </div>
      <div className="window">
        <WindowContent handleCalculatorClick={handleCalculatorClick} />
      </div>
    </div>
  )
}

export default Window
