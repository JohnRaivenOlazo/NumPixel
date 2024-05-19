import React, { useEffect } from 'react'
import './assets/styles/css/window.css'
import WindowContent from './WindowContent.jsx'

const Window = ({ calculatorActive, setCalculatorActive }) => {

  const handleClick = (e) => {
    // Prevent the propagation of click events when calculator is active
    if (calculatorActive) {
      e.stopPropagation();
    }
  };

  const handleMinimizeClick = () => {
    setCalculatorActive(prevState => !prevState); // Toggle calculatorActive
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
