import React, { useState, useEffect, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import logo from '/logo.png';
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

  const timelineData = [
    {
      title: "User-Friendly Interface",
      content: "Navigate easily with a simple and clean design.",
    },
    {
      title: "Simple Layout",
      content: "Effortlessly access built-in tools for quick computations.",
    },
    {
      title: "Live Data Visualization",
      content: "Instantly view and understand numerical changes.",
    },
  ];

  useEffect(() => {
    const items = document.querySelectorAll('.timeline ul li');

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        setTimeout(() => {
          entry.isIntersecting ? entry.target.classList.add('in-view') : entry.target.classList.remove('in-view');
        }, 200);
      });
    };
    const observer = new IntersectionObserver(observerCallback);

    items.forEach((item) => {
      observer.observe(item);
    });
  }, []);

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
      <div id="about" className="features-section pt-24 pb-20 relative z-20 -mb-1">
        <div className="container mx-auto px-4">
          <Fade><h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white text-center">About</h2></Fade>

          <div className='aboutAuthor'>
            <div className='aboutCont'>
              <img
                alt='Logo'
                src={logo}
              />
              <p className="text-xl text-gray-200 font-bolder">
                <p>
                  <span className="font-bold">NumPixel</span> is a calculator for numerical interpolation. <br />
                  It allows users to calculate different numerical methods with real time visuals and solutions. <br />
                </p>
              </p>
              <div className='athrBtn'></div>
            </div>
          </div>
          <div className="timeline pb-40">
            <ul>
              {timelineData.map((item, index) => (
                <li key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                  <div className="text-xl">{item.content}</div>
                </li>
              ))}
            </ul>
          </div>

          <Fade triggerOnce>
            <div className="wheel-title mt-20 p-5 sm:m-2 pt-6 rounded-lg">
              <Fade>
                <p className="text-lg text-white max-w-2xl font-bolder text-center m-auto">
                  Explore a wide range of numerical techniques integrated into this platform, providing precision and flexibility in your mathematical computations.
                </p>
              </Fade>

              <Fade triggerOnce>
                <div className="wheel flex flex-col md:flex-row gap-2 lg:gap-8 mt-8 items-start md:items-center md:justify-center">
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
                          className={`wheel-item ${i === 1 && "active"} ${transitioning && "transitioning"
                            } ${transitioning &&
                            transitionDirection === "next" &&
                            i === 2 &&
                            "transitionNext"
                            } ${transitioning &&
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
          </Fade>
        </div>
      </div>
    </>
  );
};

export default About
