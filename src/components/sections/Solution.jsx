import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faChartLine, faPalette, faHeart } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/css/Solution.css';

export const Solution = ( {setCalculatorActive} ) => {
  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCalculatorActive(true);
  };

  return (
    <div className="solution-highlights pb-16 outline-none">
      <div className=" py-8 outline-none mb-12" />
      <div className="container mx-auto px-4">
        <Fade triggerOnce={false}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white text-center">
            Why Choose NumPixel?
          </h2>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Fade cascade triggerOnce damping={0.1}>
            <div className="solution-card bg-purple-800 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center transition duration-300 transform hover:scale-105">
              <div className="solution-icon mb-4">
                <FontAwesomeIcon icon={faHeart} className="text-pink-400 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Simple & Intuitive
              </h3>
              <p className="text-pink-100">
                Skip the learning curve. Jump right in with our clean, straightforward interface that feels natural from day one.
              </p>
            </div>
            <div className="solution-card bg-purple-800 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center transition duration-300 transform hover:scale-105">
              <div className="solution-icon mb-4">
                <FontAwesomeIcon icon={faChartLine} className="text-pink-400 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Pixel-Perfect Results
              </h3>
              <p className="text-pink-100">
                Get spot-on measurements every time. Our smart tech handles the math while you focus on what matters most.
              </p>
            </div>
            <div className="solution-card bg-purple-800 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center transition duration-300 transform hover:scale-105">
              <div className="solution-icon mb-4">
                <FontAwesomeIcon icon={faCog} className="text-pink-400 text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Lightning Fast
              </h3>
              <p className="text-pink-100">
                Ditch the manual work. Get instant results with our streamlined process that saves you hours of number crunching.
              </p>
            </div>
          </Fade>
        </div>
        <div className="mt-12">
          <Fade triggerOnce>
            <p className="text-lg text-white max-w-3xl text-center mx-auto">
              Ready to level up your workflow? Start using <span className="text-pink-400 font-semibold">NumPixel</span> today!
            </p>
          <div className="text-center mt-4">
            <button className="openWindow btn-cool" onClick={handleButtonClick}>
              Get Started
            </button>
          </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Solution
