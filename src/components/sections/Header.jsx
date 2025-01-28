import React from 'react';
import logo from '/logo.png';
import headerVideo from '/Header.mp4';
import '../../assets/styles/css/index.css';
import '../../assets/styles/css/window.css';
import { Fade } from 'react-awesome-reveal';


const Header = ( {setCalculatorActive} ) => {
  const scrollToAbout = () => {
    const About = document.getElementById('about');
    About.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div id="header" className="header z-50 relative bg-black">
      {/* Logo positioned at top left */}
      <div className="absolute top-0 left-0 p-6 z-30">
        <div className="logo-container flex items-center transform hover:scale-105 transition-transform duration-300">
          <img src={logo} alt="Logo" className="logo w-10 h-auto mr-3" />
          <span className="logo-text text-2xl lg:text-3xl font-semibold font-licorice text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">NumPixel</span>
        </div>
      </div>

      <div className="relative top-0 w-full h-screen-plus flex flex-col justify-center items-start z-20">
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
          <div className="content text-white flex flex-col justify-center items-start p-8 lg:p-12 z-30 mb-10 mx-4 lg:mx-16 backdrop-blur-sm bg-black/30 rounded-2xl shadow-2xl">
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
                className="learnMore group relative font-semibold bg-transparent border border-purple-400 text-purple-300 text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-purple-500/10 hover:border-purple-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Learn More
              </button>
            </div>
          </div>
        </Fade>
      </div>

      <div className="custom-shape-divider-bottom-1711856172 -mb-1">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="opacity-25 fill-purple-600"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" className="opacity-50 fill-purple-500"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-purple-800"></path>
        </svg>
      </div>
    </div>
  );
};

export default Header;
