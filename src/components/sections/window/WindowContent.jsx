import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import NewtonImage from '/Newton.png';
import LagrangeImage from '/Lagrange.png';
import StirlingImage from '/Stirling.png';
import DividedDifference from '../../interpolation/NewtonDivided';
import NewtonForward from '../../interpolation/NewtonForward';
import NewtonBackward from '../../interpolation/NewtonBackward';
import LagrangeInterpolation from '../../interpolation/LagrangeInterpolation';
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
    <div className="flex flex-col justify-start items-center bg-gradient-to-b">
      <Fade cascade>
        <div className="bg-gray-800 my-5 p-8 rounded-lg shadow-lg w-full border border-gray-700">
          {selectedInterpolation === null && (
            <Fade>
              <div className="bg-gray-900 py-2 px-6 rounded-lg shadow-lg border border-gray-700 mb-8">
                <h2 className="text-3xl font-semibold text-center text-white uppercase drop-shadow-xl font-sans">
                  Interpolation Methods
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  className="bg-gray-700 bg-gradient-to-t from-gray-800 hover:bg-gray-600 text-white py-6 rounded-lg flex flex-col justify-center items-center transform transition ease duration-300 hover:scale-105 focus:outline-none"
                  onClick={() => handleInterpolationSelection('Newton')}
                >
                  <img src={NewtonImage} alt="Newton" className="h-24 mb-4 rounded-full shadow-lg" />
                  <span className="text-xl font-semibold">Newton</span>
                </button>
                <button
                  className="bg-gray-700 bg-gradient-to-t from-gray-800 hover:bg-gray-600 text-white py-6 rounded-lg flex flex-col justify-center items-center transform transition ease duration-300 hover:scale-105 focus:outline-none"
                  onClick={() => handleInterpolationSelection('Lagrange')}
                >
                  <img src={LagrangeImage} alt="Lagrange" className="h-24 mb-4 rounded-full shadow-lg" />
                  <span className="text-xl font-semibold">Lagrange</span>
                </button>
                <button
                  className="bg-gray-700 bg-gradient-to-t from-gray-800 hover:bg-gray-600 text-white py-6 rounded-lg flex flex-col justify-center items-center transform transition ease duration-300 hover:scale-105 focus:outline-none"
                  onClick={() => handleInterpolationSelection('Stirling')}
                >
                  <img src={StirlingImage} alt="Stirling" className="h-24 mb-4 rounded-full shadow-lg" />
                  <span className="text-xl font-semibold">Stirling</span>
                </button>
              </div>
            </Fade>
          )}
          {selectedInterpolation === 'Stirling' && (
            <StirlingInterpolation />
          )}
          {selectedInterpolation === 'Newton' && (
            <Fade cascade>
              <div className="bg-gray-900 py-2 px-6 rounded-lg shadow-lg border border-gray-700 mb-8">
                <h2 className="text-3xl font-semibold text-center text-white uppercase drop-shadow-xl font-sans">
                  Newton Interpolation
                </h2>
              </div>
              <div className="space-y-4 w-full">
                <button
                  className="bg-gray-700 bg-gradient-to-t from-gray-800 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg mt-10 flex justify-center items-center transform transition duration-200 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
                  onClick={() => handleInterpolationSelection('ForwardDifference')}
                >
                  Newton's Forward Difference Interpolation
                </button>
                <button
                  className="bg-gray-700 bg-gradient-to-t from-gray-800 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg flex justify-center items-center transform transition duration-200 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
                  onClick={() => handleInterpolationSelection('BackwardDifference')}
                >
                  Newton's Backward Difference Interpolation
                </button>
                <button
                  className="bg-gray-700 bg-gradient-to-t from-gray-800 hover:bg-gray-600 text-white font-semibold py-4 rounded-lg flex justify-center items-center transform transition duration-200 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
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
              className="bg-gradient-to-b bg-gray-700 hover:bg-gray-600 border border-gray-700 text-white font-bold py-2 px-6 rounded-lg flex justify-center items-center transform transition duration-300 hover:scale-105 focus:outline-none mt-6"
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
