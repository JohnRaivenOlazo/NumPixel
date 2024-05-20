import React from "react";
import { Fade } from "react-awesome-reveal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faChartLine, faPalette, faHeart } from '@fortawesome/free-solid-svg-icons';

const Solution = () => {
  return (
    <div className="solution-highlights bg-theme py-12 pt-20">
      <div className="container mx-auto px-4">
        <Fade triggerOnce={false}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white text-center">
            Discover its Unique Solutions
          </h2>
        </Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
  <Fade cascade damping={0.2}>
    <div className="solution-card bg-purple-800 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center transition duration-300 transform hover:scale-105">
      <div className="solution-icon mb-4">
      <FontAwesomeIcon icon={faHeart} className="text-pink-400 text-4xl" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        User Friendly
      </h3>
      <p className="text-pink-100">
        built-in interface and helpful features  make the experience of using it user-friendly, just like your favorite app.
      </p>
    </div>
    <div className="solution-card bg-purple-800 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center transition duration-300 transform hover:scale-105">
      <div className="solution-icon mb-4">
        <FontAwesomeIcon icon={faPalette} className="text-pink-400 text-4xl" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        Flexible Customization
      </h3>
      <p className="text-pink-100">
        With customizable options, you have the flexibility to adapt and customize to your specific requirements.
      </p>
    </div>
    <div className="solution-card bg-purple-800 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center transition duration-300 transform hover:scale-105">
      <div className="solution-icon mb-4">
        <FontAwesomeIcon icon={faChartLine} className="text-pink-400 text-4xl" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        Enhanced Accuracy
      </h3>
      <p className="text-pink-100">
        Achieve best accuracy with its advanced algorithm ensure to produce precise results every time.
      </p>
    </div>
    <div className="solution-card bg-purple-800 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center transition duration-300 transform hover:scale-105">
      <div className="solution-icon mb-4">
        <FontAwesomeIcon icon={faCog} className="text-pink-400 text-4xl" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        Streamlined Workflow
      </h3>
      <p className="text-pink-100">
        Say goodbye to manual processes and calculations, and say hello to efficiency and productivity with NumPixel.
      </p>
    </div>
  </Fade>
</div>

          <div className="mt-12">
        <Fade>
            <p className="text-lg text-white max-w-3xl text-center mx-auto">
              <span className="font-semibold">Ready to start its approach?</span> Experience the power of <span className="text-pink-400 font-semibold">NumPixel</span> now!
            </p>
        </Fade>
          </div>
      </div>
    </div>
  );
};

export default Solution;
