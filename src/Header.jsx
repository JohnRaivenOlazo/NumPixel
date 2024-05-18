import React, { useEffect, useRef, useState } from 'react';
import logo from '../public/logo.png';
import headerVideo from '../public/Header.mp4';
import './assets/styles/css/index.css';
import './assets/styles/css/window.css';
import { Fade } from 'react-awesome-reveal';

const Header = ({ setCalculatorActive }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const openModal = document.querySelector('.openModal');
    const closeButton = document.querySelector('.close');
    const minimizeButton = document.querySelector('.minimize');
    const maximizeButton = document.querySelector('.maximize');
    const macWindow = document.querySelector('.mac-window');

    const handleOpenModalClick = () => {
      macWindow.classList.remove('hidden');
      macWindow.classList.remove('minimize');
      macWindow.classList.add('active');
      setCalculatorActive(true);
    };

    const handleCloseButtonClick = () => {
      macWindow.classList.remove('active');
      macWindow.classList.remove('maximize');
      macWindow.classList.remove('minimize');
      setCalculatorActive(false);
    };

    const handleMinimizeButtonClick = () => {
      macWindow.classList.toggle('minimize');
      macWindow.classList.remove('maximize');
    };

    const handleMaximizeButtonClick = () => {
      macWindow.classList.toggle('maximize');
      macWindow.classList.remove('minimize');
    };

    openModal.addEventListener('click', handleOpenModalClick);
    closeButton.addEventListener('click', handleCloseButtonClick);
    minimizeButton.addEventListener('click', handleMinimizeButtonClick);
    maximizeButton.addEventListener('click', handleMaximizeButtonClick);

    return () => {
      openModal.removeEventListener('click', handleOpenModalClick);
      closeButton.removeEventListener('click', handleCloseButtonClick);
      minimizeButton.removeEventListener('click', handleMinimizeButtonClick);
      maximizeButton.removeEventListener('click', handleMaximizeButtonClick);
    };
  }, [setCalculatorActive]);

  return (
    <div id="header" className="header z-50 relative">
      <div className="relative top-0 w-full h-screenplus flex flex-col justify-center items-start z-20">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute top-0 h-full w-full object-cover z-0`}
        >
          <source src={headerVideo} type="video/mp4" />
        </video>
        <Fade>
          <div className="content text-white flex flex-col justify-center items-start p-10 z-30 mb-10">
            <div className="logo-container flex items-center mb-4">
              <img src={logo} alt="Logo" className="logo w-20 lg:w-28 h-auto mr-4" />
              <span className="logo-text text-3xl lg:text-5xl font-semibold font-licorice text-white">NumPixel</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-left">Elevate Math Calculations to New Heights</h1>
            <h2 className="text-md lg:text-lg mb-8 text-left">Your Modern Solution for Complex Mathematical Computations</h2>
            <div className="flex flex-col lg:flex-row justify-center lg:justify-start gap-0 lg:gap-4">
              <button className="openModal font-semibold font-sans bg-purple-600 text-pink-100 text-sm lg:text-lg py-3 px-5 lg:py-4 lg:px-6 rounded-full shadow-lg hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Start Calculating
              </button>
              <button
                className="learnMore font-semibold font-sans bg-purple-600 text-pink-100 text-sm lg:text-lg py-3 px-5 lg:py-4 lg:px-6 rounded-full shadow-lg hover:bg-purple-700 transition duration-300 mt-4 lg:mt-0 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                onClick={() => console.log('Learn More clicked')}
              >
                Learn More
              </button>
            </div>
          </div>
        </Fade>
      </div>
      <div className="custom-shape-divider-bottom-1711856172">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Header;
