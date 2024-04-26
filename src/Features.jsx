import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faChartLine, faPalette, faClock, faDesktop } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  return (
    <>
    <div id="features" className="features-section bg-theme py-12 relative z-20">
      <div className="container mx-auto px-4">
        <Fade triggerOnce={false}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white text-center">
            About
          </h2>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Slide direction="left" triggerOnce={false} damping={0.2}>
            <div className="flex justify-center">
              <div className="feature-card bg-purple-800 rounded-lg shadow-lg p-8 h-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faDesktop} className="text-pink-400 text-4xl -m-1" /> 
                <h3 className="text-xl font-semibold mb-4 text-pink-100">Immaculate User Interface</h3>
                </div>
                <p className="text-pink-100">
                  Experience ease of use with its well
                  crafted interface design, providing easier navigation and enjoyable
                  user experience.
                </p>
              </div>
            </div>
          </Slide>
          <Slide direction="right" triggerOnce={false} damping={0.2}>
            <div className="flex justify-center">
              <div className="feature-card bg-purple-800 rounded-lg shadow-lg p-8 h-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faClock} className="text-pink-400 text-4xl -m-1" /> 
                  <h3 className="text-xl font-semibold mb-4 text-pink-100">
                  Real-time Visualization
                  </h3>
                </div>
                <p className="text-pink-100">
                  Watch mathematical computations with its
                  visually captivating real-time representations.
                </p>
              </div>
            </div>
          </Slide>
        </div>
        <Slide direction="up" triggerOnce={false} damping={0.2}>
          <div className="mt-8">
            <p className="text-lg text-white max-w-2xl font-bolder text-center m-auto">
              Explore wide range of numerical techniques
              integrated into this platform, providing precision
              and flexibility in your mathematical computations.
            </p>
          </div>
        </Slide>
      </div>
    </div>
    </>
  );
};

export default Features
