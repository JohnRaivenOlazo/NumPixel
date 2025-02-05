import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faChartLine, faPalette, faHeart, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/css/Solution.css';

const solutionCards = [
  {
    icon: faSignInAlt,
    title: "No Unnecessary Signup",
    description: "Use it right away without any unnecessary signups. Get started instantly and save time."
  },
  {
    icon: faHeart,
    title: "Simple & Intuitive",
    description: "Jump right in with our clean, straightforward interface that feels natural from day one."
  },
  {
    icon: faChartLine,
    title: "Pixel-Perfect Results",
    description: "Our site handles the math while you focus on what matters most."
  },
  {
    icon: faCog,
    title: "Lightning Fast",
    description: "Get instant results with our process that saves you hours of number crunching."
  }
];

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
        <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-8">
          <Fade cascade triggerOnce damping={0.1}>
            {solutionCards.map((card, index) => (
              <div key={index} className="solution-card h-full bg-purple-800 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center transition duration-300 transform hover:scale-105">
                <div className="solution-icon mb-4">
                  <FontAwesomeIcon icon={card.icon} className="text-pink-400 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {card.title}
                </h3>
                <p className="text-pink-100">
                  {card.description}
                </p>
              </div>
            ))}
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
