import React from "react";
import { Fade, Slide } from "react-awesome-reveal";

const Features = () => {
  return (
    <>
    <div id="features" className="features-section bg-theme py-12 relative z-20">
      <div className="container mx-auto px-4">
        <Fade triggerOnce={false}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white text-center">
            Unlock Its Remarkable Features
          </h2>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Slide direction="left" triggerOnce={false} damping={0.2}>
            <div className="flex justify-center">
              <div className="feature-card bg-purple-800 rounded-lg shadow-lg p-8 h-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Immaculate User Interface
                </h3>
                <p className="text-gray-300">
                  Experience unparalleled ease of use with our meticulously
                  crafted interface design, ensuring a seamless and intuitive
                  user experience.
                </p>
              </div>
            </div>
          </Slide>
          <Slide direction="right" triggerOnce={false} damping={0.2}>
            <div className="flex justify-center">
              <div className="feature-card bg-purple-800 rounded-lg shadow-lg p-8 h-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Real-time Visualization
                </h3>
                <p className="text-gray-300">
                  Watch numerical methods come to life with immersive,
                  visually captivating real-time representations.
                </p>
              </div>
            </div>
          </Slide>
        </div>
        <Slide direction="up" triggerOnce={false} damping={0.2}>
          <div className="mt-8">
            <p className="text-lg text-white max-w-2xl text-center m-auto">
              Explore an extensive range of numerical techniques seamlessly
              integrated into this platform, providing unparalleled precision
              and flexibility in your mathematical endeavors. Enhance your
              problem-solving skills and unleash your full potential with our
              innovative React numerical methods calculator.
            </p>
          </div>
        </Slide>
      </div>
    </div>
    </>
  );
};

export default Features
