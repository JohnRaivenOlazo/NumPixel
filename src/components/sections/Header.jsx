import React, { useEffect } from 'react';
import logo from '/logo.png';
import headerVideo from '/Header.mp4';
import '../../assets/styles/css/index.css';
import '../../assets/styles/css/window.css';
import { Fade } from 'react-awesome-reveal';


const Header = ( {setCalculatorActive, calculatorActive} ) => {
  const scrollToAbout = () => {
    const About = document.getElementById('about');
    About.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    // Pause the video when the calculator is active
    const video = document.querySelector('video');
    if (calculatorActive) {
      video.pause();
    } else {
      video.play();
    }

    return () => {
      video.play();
    }
  }, [calculatorActive]);

  

  return (
    <div id="header" className="header z-50 relative bg-black">
      <div className="absolute top-0 left-0 p-6 z-30">
        <div className="logo-container flex items-center transform hover:scale-105 transition-transform duration-300">
          <img src={logo} alt="Logo" className="logo w-10 h-auto mr-3" />
          <span className="logo-text text-2xl lg:text-3xl font-semibold font-[VT323] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">NumPixel</span>
        </div>
      </div>

      <div className="relative top-0 h-screen-plus flex flex-col justify-center items-start z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute top-0 h-full w-full object-cover z-0 filter brightness-75"
        >
          <source src={headerVideo} type="video/mp4" />
        </video>
        <Fade cascade triggerOnce>
          <div className="content relative w-full text-center py-4 px-auto transition-all duration-300 ease text-white flex flex-col justify-center items-start p-8 lg:p-12 z-30 mb-10 backdrop-blur-sm bg-black/30 rounded-2xl shadow-2xl
          before:content-[''] before:absolute before:transition-all before:duration-300 before:ease before:top-0 before:left-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.6)] before:rounded-md before:rounded-2xl before:z-[-1] before:shadow-2xl before:backdrop-blur-sm before:blur[50px] before:opacity-0 before:hover:opacity-100
          ">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-left leading-tight">
              A <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">powerful calculator</span> for numerical interpolations.
            </h1>
            <h2 className="text-lg lg:text-xl mb-10 text-left text-gray-300">Get started now—it's completely free!</h2>
            <div className="flex flex-col lg:flex-row justify-center lg:justify-start gap-4">
              <button 
              onClick={() => setCalculatorActive(true)}
              className="openWindow group relative font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <span className="flex items-center justify-center">
                  Start Calculating
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              <button
                onClick={scrollToAbout}
                className="learnMore group relative font-semibold bg-transparent border border-purple-400 text-purple-300 text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-purple-500/10 hover:border-purple-300 hover:text-white"
              >
                Learn More
              </button>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Header;
