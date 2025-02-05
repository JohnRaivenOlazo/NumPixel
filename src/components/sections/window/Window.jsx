import React, { useEffect } from 'react'
import '../../../assets/styles/css/window.css'
import WindowContent from './WindowContent.jsx'
import openWindow from '../../hooks/openWindow.jsx'
import Logo from '/logo.png'; // Adjust the path to your logo image

const Window = ({ calculatorActive, setCalculatorActive }) => {
  
    openWindow(setCalculatorActive);

  const handleClick = (e) => {
    if (calculatorActive) {
      e.stopPropagation();
      e.preventDefault();
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
    <div className="mac-window" onClick={() => handleClick}>
      <div className="title-bar bg-gray-800 text-white">
        <div className="buttons">
          <div className="close" /><div className="minimize" onClick={handleMinimizeClick} /><div className="maximize" onClick={handleMaximizeClick} />
        </div>
        <div className="overflow-hidden h-full text-center mr-16 font-sans leading-5 text-sm font-bold text-white">
          <img src={Logo} alt="NumPixel Logo" className="h-full py-1 mx-auto" />
        </div>
      </div>
      <div className="window bg-[#1a1a1a] rounded-ee-md border border-[#333] overflow-x-hidden overflow-y-auto h-full">
        <WindowContent handleCalculatorClick={handleCalculatorClick} />
      </div>
    </div>
  )
}

export default Window
