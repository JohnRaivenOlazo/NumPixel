import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import NewtonImage from '/Newton.png';
import LagrangeImage from '/Lagrange.png';
import DividedDifference from '../../interpolation/NewtonDivided';
import NewtonForward from '../../interpolation/NewtonForward';
import NewtonBackward from '../../interpolation/NewtonBackward';
import LagrangeInterpolation from '../../interpolation/LagrangeInterpolation';
import Stirling from '/Stirling.png';
import StirlingInterpolation from '../../interpolation/StirlingInterpolation';

const WindowContent = () => {
  const [selectedInterpolation, setSelectedInterpolation] = useState(null);
  const [previousSelection, setPreviousSelection] = useState(null);

  const handleInterpolationSelection = (interpolation) => {
    if (interpolation === 'Newton' || interpolation === 'Lagrange' || interpolation === 'Stirling') {
      setPreviousSelection(null);
    } else {
      setPreviousSelection(selectedInterpolation);
    }
    setSelectedInterpolation(interpolation);
  };

  const handleBackButtonClick = () => {
    const Window = document.querySelector(".window");
    Window.scrollTo({ top: 0, behavior: 'smooth' });
    if (previousSelection === null) {
      setSelectedInterpolation(null);
    } else {
      setSelectedInterpolation(previousSelection);
      setPreviousSelection(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-b from-purple-600 to-black">
      <Fade cascade>
        <div className="bg-purple-300 my-5 p-8 rounded-lg shadow-lg max-w-lg w-full border border-purple-800">
            {selectedInterpolation === null && (
                <Fade>
                <div className="bg-white py-1 px-4 rounded-lg shadow-lg border border-purple-600 mb-8">
                    <h2 className="text-2xl font-semibold text-center text-purple-800 uppercase drop-shadow-xl font-sans">
                      Interpolation Methods
                    </h2>
                 </div>
                  <button
                    className="bg-purple-400 bg-gradient-to-t from-purple-800 hover:bg-purple-500 text-white py-4 rounded-lg flex flex-col justify-center items-center transform transition ease duration-300 hover:scale-105 focus:outline-none w-full mb-4"
                    onClick={() => handleInterpolationSelection('Newton')}
                  >
                    <img src={NewtonImage} alt="Newton" className="h-24 mb-2 rounded-full" />
                    <span className="text-xl font-semibold">Newton</span>
                  </button>
                  <button
                    className="bg-purple-400 bg-gradient-to-t from-purple-800 hover:bg-purple-500 text-white py-4 rounded-lg flex flex-col justify-center items-center transform transition duration-300 hover:scale-105 focus:outline-none w-full mb-4"
                    onClick={() => handleInterpolationSelection('Lagrange')}
                  >
                    <img src={LagrangeImage} alt="Lagrange" className="h-24 mb-2 rounded-full" />
                    <span className="text-xl font-semibold">Lagrange</span>
                  </button>
                  <button
                    className="bg-purple-400 bg-gradient-to-t from-purple-800 hover:bg-purple-500 text-white py-4 rounded-lg flex flex-col justify-center items-center transform transition duration-300 hover:scale-105 focus:outline-none w-full"
                    onClick={() => handleInterpolationSelection('Stirling')}
                  >
                    <img src={Stirling} alt="Stirling" className="h-24 mb-2 rounded-full" />
                    <span className="text-xl font-semibold">Stirling</span>
                  </button>
                </Fade>
            )}
            {selectedInterpolation === 'Stirling' && (
              <StirlingInterpolation />
            )}
            {selectedInterpolation === 'Newton' && (
              <Fade cascade>
                <div className="bg-white py-1 px-4 rounded-lg shadow-lg border border-purple-600 mb-8">
                    <h2 className="text-2xl font-semibold text-center text-purple-800 uppercase drop-shadow-xl font-sans">
                      Newton Interpolation
                    </h2>
                 </div>
                <div className="space-y-4 w-full">
                  <button
                    className="bg-purple-400 bg-gradient-to-t from-purple-800 hover:bg-purple-500 text-white font-semibold py-4 rounded-lg mt-10 flex justify-center items-center transform transition duration-200 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
                    onClick={() => handleInterpolationSelection('ForwardDifference')}
                  >
                    Newton's Forward Difference Interpolation
                  </button>
                  <button
                    className="bg-purple-400 bg-gradient-to-t from-purple-800 hover:bg-purple-500 text-white font-semibold py-4 rounded-lg flex justify-center items-center transform transition duration-200 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
                    onClick={() => handleInterpolationSelection('BackwardDifference')}
                  >
                    Newton's Backward Difference Interpolation
                  </button>
                  <button
                    className="bg-purple-400 bg-gradient-to-t from-purple-800 hover:bg-purple-500 text-white font-semibold py-4 rounded-lg flex justify-center items-center transform transition duration-200 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
                    onClick={() => handleInterpolationSelection('DividedDifference')}
                  >
                    Newton's Divided Difference Interpolation
                  </button>
                </div>
              </Fade>
            )}
            <Fade>
              <div className="overflow-x-auto">
                {selectedInterpolation === 'ForwardDifference' && <NewtonForward />}
                {selectedInterpolation === 'BackwardDifference' && <NewtonBackward />}
                {selectedInterpolation === 'DividedDifference' && <DividedDifference />}
              </div>
            </Fade>
            {selectedInterpolation === 'Lagrange' && (
              <Fade>
                <LagrangeInterpolation />
              </Fade>
            )}

          {selectedInterpolation !== null && (
            <button
              className="bg-gradient-to-b bg-purple-500 hover:bg-purple-600 border border-purple-600 text-white font-bold py-1 px-4 rounded-lg flex justify-center items-center transform transition duration-300 hover:scale-105 focus:outline-none mt-6"
              onClick={handleBackButtonClick}
            >
              Back
            </button>
          )}
        </div>
      </Fade>
    </div>
  );
}

export default WindowContent
