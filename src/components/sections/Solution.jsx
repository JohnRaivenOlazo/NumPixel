import React from "react";
import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning, faChartLine, faWandSparkles, faInfinity } from '@fortawesome/free-solid-svg-icons';

const solutionCards = [
  {
    icon: faWandSparkles,
    title: "No Unnecessary Signup",
    description: "Use it right away without any unnecessary signups. Get started instantly and save time.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: faInfinity,
    title: "Simple & Intuitive",
    description: "Jump right in with our clean, straightforward interface that feels natural from day one.",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    icon: faChartLine,
    title: "Pixel-Perfect Results",
    description: "Our site handles the math while you focus on what matters most.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: faBoltLightning,
    title: "Lightning Fast",
    description: "Get instant results with our process that saves you hours of number crunching.",
    gradient: "from-purple-600 to-indigo-600"
  }
];

export const Solution = ({ setCalculatorActive }) => {
  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCalculatorActive(true);
  };

  return (
    <div className="relative py-24 bg-[#1a1a1a] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/logo.png')] bg-center opacity-[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(125,60,152,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(125,60,152,0.07)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative container mx-auto px-4">
        <Fade triggerOnce>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                Why Choose NumPixel?
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-xl" />
            </h2>
          </div>
        </Fade>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <Fade cascade triggerOnce damping={0.1}>
            {solutionCards.map((card, index) => (
              <div 
                key={index} 
                className="group relative h-full"
              >
                {/* Card Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-pink-500/50 rounded-2xl blur opacity-0 
                  group-hover:opacity-100 transition duration-500 group-hover:duration-200" />
                
                <div className="relative h-full p-8 rounded-2xl bg-black/50 backdrop-blur-sm border border-purple-900/30
                  hover:border-purple-500/50 transition-all duration-300">
                  {/* Icon Container */}
                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} p-3
                      shadow-lg shadow-purple-500/20 transform group-hover:scale-110 transition-transform duration-300`}>
                      <FontAwesomeIcon 
                        icon={card.icon} 
                        className="w-full h-full text-white" 
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-transparent 
                    group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-300
                    transition-all duration-300">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </Fade>
        </div>

        <Fade triggerOnce>
          <div className="text-center mt-16">
            <button 
              onClick={handleButtonClick}
              className="openWindow group relative px-8 py-4 rounded-xl text-white font-medium
                bg-gradient-to-r from-purple-600 to-pink-500 
                hover:from-purple-500 hover:to-pink-400
                transition-all duration-300 
                hover:shadow-lg hover:shadow-purple-500/25
                hover:scale-105 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                Start Calculating Now
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-500/20 blur-xl 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Solution;
