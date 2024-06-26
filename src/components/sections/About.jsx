import React, { useState, useEffect, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faClock } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/css/About.css";
import Interpolation from "/Interpolation-Image.png";

const interpolationMethods = [
  "Newton's Forward",
  "Stirling's Forward",
  "Gauss's Forward",
  "Newton's Backward",
  "Stirling's Backward",
  "Gauss's Backward",
  "Lagrange",
  "Hermite",
  "Divided Differences",
  "Central Difference",
];

const About = () => {
  const [currentMethodIndex, setCurrentMethodIndex] = useState(0);
  const [currentMethods, setCurrentMethods] = useState([]);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState("");
  const wheelContainerRef = useRef(null);

  useEffect(() => {
    const updateCurrentMethods = () => {
      const currentIndex = currentMethodIndex;
      const prevIndex = (currentIndex - 1 + interpolationMethods.length) % interpolationMethods.length;
      const nextIndex = (currentIndex + 1) % interpolationMethods.length;
      setCurrentMethods([prevIndex, currentIndex, nextIndex]);
    };

    updateCurrentMethods();
  }, [currentMethodIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!transitioning) {
        switch (event.key) {
          case "ArrowUp":
            handlePrev();
            event.preventDefault();
            break;
          case "ArrowDown":
            handleNext();
            event.preventDefault();
            break;
          default:
            break;
        }
      }
    };

    const wheelContainer = wheelContainerRef.current;

    wheelContainer.addEventListener("keydown", handleKeyDown);

    return () => {
      wheelContainer.removeEventListener("keydown", handleKeyDown);
    };
  }, [transitioning]);

  const handleNext = () => {
    if (!transitioning) {
      setTransitionDirection("next");
      setTransitioning(true);
      setTimeout(() => {
        setCurrentMethodIndex((prevIndex) => (prevIndex + 1) % interpolationMethods.length);
        setTransitioning(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (!transitioning) {
      setTransitionDirection("prev");
      setTransitioning(true);
      setTimeout(() => {
        setCurrentMethodIndex((prevIndex) => (prevIndex - 1 + interpolationMethods.length) % interpolationMethods.length);
        setTransitioning(false);
      }, 300);
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div id="about" className="features-section bg-black pt-24 pb-20 relative z-20 -mb-1">
        <div className="container mx-auto px-4">
          <Fade>

          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white text-center">About</h2>
          </Fade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Fade direction="left" triggerOnce>
              <div className="flex justify-center">
                <div className="feature-card bg-gradient-to-bl from-purple-800 rounded-lg shadow-lg p-8 h-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faDesktop} className="text-pink-400 text-4xl -m-1" />
                    <h3 className="text-xl font-semibold mb-4 text-white">Immaculate User Interface</h3>
                  </div>
                  <p className="text-pink-100 mb-4">
                    Experience ease of use with its well-crafted interface design, providing easier navigation and enjoyable user experience.
                  </p>
                  <ol className="text-pink-100 space-y-2 list-disc list-inside">
                    <li>Intuitive layout with easy-to-access features</li>
                    <li>Responsive design for all device sizes</li>
                    <li>Quick access to frequently used tools</li>
                    <li>Consistent and clean aesthetic throughout</li>
                  </ol>
                  <p className=" font-mono text-black text-sm mt-4 p-4 bg-white rounded-md">
                    Designed with user experience in mind, ensuring that tasks can be performed with ease and precision.
                  </p>
                </div>
              </div>
            </Fade>
            <Fade direction="right" triggerOnce>
              <div className="flex justify-center">
                <div className="feature-card bg-gradient-to-br from-purple-800 rounded-lg shadow-lg p-8 h-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                  <div className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faClock} className="text-pink-400 text-4xl -m-1" />
                    <h3 className="text-xl font-semibold mb-4 text-white">Real-time Visualization</h3>
                  </div>
                  <p className="text-pink-100 mb-4">
                    Watch mathematical computations with visually captivating real-time representations.
                  </p>
                  <ul className="text-pink-100 space-y-2 list-disc list-inside">
                    <li>Interactive graphs and charts</li>
                    <li>Dynamic updates as you input data</li>
                    <li>Easy Navigation</li>
                    <li>High-quality rendering for clarity</li>
                  </ul>
                  <p className=" font-mono text-black text-sm mt-4 p-4 bg-white rounded-md">
                    Enhance your understanding of complex data with our advanced visualization tools, designed to provide insights at a glance.
                  </p>
                </div>
              </div>
            </Fade>
          </div>

          <div className="mt-20">
            <Fade>
              <p className="text-lg text-white max-w-2xl font-bolder text-center m-auto">
                Explore a wide range of numerical techniques integrated into this platform, providing precision and flexibility in your mathematical computations.
              </p>
            </Fade>

            <Fade direction="up" triggerOnce>
              <div className="flex flex-col md:flex-row gap-2 lg:gap-8 mt-8 items-start md:items-center">
                <div className="md:w-1/2 flex justify-center items-center">
                  <img
                    src={Interpolation}
                    alt="Interpolation Illustration"
                    className="w-full rounded-lg shadow-lg transition-all duration-300 ease hover:-skew-y-1 hover:scale-105"
                  />
                </div>
                <div
                  className="md:w-1/2 wheel-container outline-none"
                  ref={wheelContainerRef}
                  onWheel={handleWheel}
                  tabIndex="0"
                >
                  <div className="wheel">
                    {currentMethods.map((methodIndex, i) => (
                      <div
                        key={i}
                        className={`wheel-item ${i === 1 && "active"} ${
                          transitioning && "transitioning"
                        } ${
                          transitioning &&
                          transitionDirection === "next" &&
                          i === 2 &&
                          "transitionNext"
                        } ${
                          transitioning &&
                          transitionDirection === "prev" &&
                          i === 0 &&
                          "transitionPrev"
                        }`}
                        onClick={
                          i === 0 ? handlePrev : i === 2 ? handleNext : null
                        }
                      >
                        {interpolationMethods[methodIndex]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </>
  );
};

export default About
