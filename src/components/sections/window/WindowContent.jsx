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
    <div className="flex flex-col justify-start items-center">
      <Fade cascade>
        <div className="bg-transparent my-4 p-6 w-full">
          {selectedInterpolation === null && (
            <Fade>
              <div className="py-2 px-6 mb-8">
                <h2 className="text-3xl font-semibold text-center text-white uppercase drop-shadow-xl font-sans">
                  Interpolation Methods
                </h2>
                <p className="text-center text-white mt-4">
                  Interpolation is a method of constructing new data points within the range of a discrete set of known data points. 
                  It is widely used in numerical analysis, computer graphics, and many other fields. Below are some of the most commonly 
                  used interpolation methods.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  className="border border-purple-400/20 bg-gradient-to-t from-purple-800 hover:bg-purple-600 text-white py-6 px-4 rounded-lg flex flex-col justify-center items-center transform transition ease duration-200 hover:scale-105 focus:outline-none"
                  onClick={() => handleInterpolationSelection('Newton')}
                >
                  <img src={NewtonImage} alt="Newton" className="h-24 mb-4 rounded-full shadow-lg" />
                  <span className="text-xl font-semibold">Newton</span>
                  <p className="text-center text-white mt-2">
                    Newton's interpolation methods are based on the concept of divided differences and can be used for both equally 
                    and unequally spaced data points.
                  </p>
                </button>
                <button
                  className="border border-purple-400/20 bg-gradient-to-t from-purple-800 hover:bg-purple-600 text-white py-6 px-4 rounded-lg flex flex-col justify-center items-center transform transition ease duration-200 hover:scale-105 focus:outline-none"
                  onClick={() => handleInterpolationSelection('Lagrange')}
                >
                  <img src={LagrangeImage} alt="Lagrange" className="h-24 mb-4 rounded-full shadow-lg" />
                  <span className="text-xl font-semibold">Lagrange</span>
                  <p className="text-center text-white mt-2">
                    Lagrange interpolation is a polynomial interpolation method that uses the concept of Lagrange polynomials to 
                    construct the interpolating polynomial.
                  </p>
                </button>
                <button
                  className="border border-purple-400/20 bg-gradient-to-t from-purple-800 hover:bg-purple-600 text-white py-6 px-4 rounded-lg flex flex-col justify-center items-center transform transition ease duration-200 hover:scale-105 focus:outline-none"
                  onClick={() => handleInterpolationSelection('Stirling')}
                >
                  <img src={StirlingImage} alt="Stirling" className="h-24 mb-4 rounded-full shadow-lg" />
                  <span className="text-xl font-semibold">Stirling</span>
                  <p className="text-center text-white mt-2">
                    Stirling's interpolation method is used for equally spaced data points and is particularly useful for 
                    approximating functions that are symmetric about a central point.
                  </p>
                </button>
              </div>
            </Fade>
          )}
          {selectedInterpolation === 'Stirling' && (
            <Fade>
              <StirlingInterpolation />
            </Fade>
          )}
          {selectedInterpolation === 'Newton' && (
            <Fade cascade>
              <div className="py-2 px-6 mb-8">
                <h2 className="text-3xl font-semibold text-center text-white uppercase drop-shadow-xl font-sans">
                  Newton Interpolation
                </h2>
                <p className="text-center text-white mt-4">
                  Newton's interpolation methods include the forward difference, backward difference, and divided difference methods. 
                  These methods are based on the concept of divided differences and can be used for both equally and unequally spaced 
                  data points.
                </p>
              </div>
              <div className="space-y-4 w-full">
                <button
                  className="border border-purple-400/20 bg-gradient-to-t from-purple-800 hover:bg-purple-600 text-white font-semibold py-4 rounded-lg mt-10 flex justify-center items-center transform transition duration-200 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
                  onClick={() => handleInterpolationSelection('ForwardDifference')}
                >
                  Newton's Forward Difference Interpolation
                </button>
                <button
                  className="border border-purple-400/20 bg-gradient-to-t from-purple-800 hover:bg-purple-600 text-white font-semibold py-4 rounded-lg flex justify-center items-center transform transition duration-200 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
                  onClick={() => handleInterpolationSelection('BackwardDifference')}
                >
                  Newton's Backward Difference Interpolation
                </button>
                <button
                  className="border border-purple-400/20 bg-gradient-to-t from-purple-800 hover:bg-purple-600 text-white font-semibold py-4 rounded-lg flex justify-center items-center transform transition duration-200 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
                  onClick={() => handleInterpolationSelection('DividedDifference')}
                >
                  Newton's Divided Difference Interpolation
                </button>
              </div>
            </Fade>
          )}
          <Fade>
            <div className="overflow-x-auto">
              {selectedInterpolation === 'ForwardDifference' && <Fade><NewtonForward /></Fade>}
              {selectedInterpolation === 'BackwardDifference' && <Fade><NewtonBackward /></Fade>}
              {selectedInterpolation === 'DividedDifference' && <Fade><DividedDifference /></Fade>}
            </div>
          </Fade>
          {selectedInterpolation === 'Lagrange' && (
            <Fade>
              <LagrangeInterpolation />
            </Fade>
          )}

          {selectedInterpolation !== null && (
            <button
              className="bg-gradient-to-b border-purple-400/20 hover:bg-purple-600 border border-purple-700 text-white font-bold py-1 px-6 rounded-lg flex justify-center items-center transform transition duration-200 hover:scale-105 focus:outline-none mt-6"
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

export default WindowContent;
