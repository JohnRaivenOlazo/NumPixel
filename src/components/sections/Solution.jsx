import React from "react";
import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faChartLine, faHeart, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

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
          <h2 className="text-3xl lg:text-4xl font-bold mb-14 text-white text-center">
            Why Choose NumPixel?
          </h2>
        </Fade>
        <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-8">
          <Fade cascade triggerOnce damping={0.1}>
            {solutionCards.map((card, index) => (
              // {background: linear-gradient(to bottom, #7D3C98, #4B0082);}
              <div key={index} className="solution-card h-full bg-gradient-to-b from-[#7D3C98] to [#4b0082] rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center transition duration-300 transform hover:scale-105">
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
            <button className="openWindow relative inline-block px-6 py-3 bg-[#7D3C98] text-white font-bold rounded-lg cursor-pointer overflow-hidden transition-all duration-400 shadow-lg hover:bg-[#7D3C98]/60 hover:shadow-xl" onClick={handleButtonClick}>
              Get Started
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-white/20 to-transparent opacity-0 transition-all duration-400 hover:opacity-100"></span>
            </button>
          </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Solution
