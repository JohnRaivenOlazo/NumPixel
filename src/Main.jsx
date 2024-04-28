import React, { useState } from 'react';
import { Fade, Slide} from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import NewtonImage from '../public/Newton.jfif';
import LagrangeImage from '../public/Lagrange.png';
import DividedDifference from './components/Newton/NewtonDivided';
import NewtonForward from './components/Newton/NewtonForward';
import NewtonBackward from './components/Newton/NewtonBackward';
import LagrangeInterpolation from './components/Lagrange/LagrangeInterpolation';
import Stirling from '../public/Stirling.png'
import StirlingInterpolation from './components/Stirling/StirlingInterpolation';

const Main = () => {
  const [selectedInterpolation, setSelectedInterpolation] = useState(null);

  const handleInterpolationSelection = (interpolation) => {
    setSelectedInterpolation(interpolation);
  };

  const handleBackButtonClick = () => {
    setSelectedInterpolation(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-400 to-black">
      <Fade cascade>
        <div className="bg-white p-8 rounded shadow-lg max-w-full w-full">
          <div className="pb-10">
            {selectedInterpolation === null && (
              <>
              <Fade>
                <h2 className="text-3xl font-bold text-center mb-8 text-purple-800 uppercase drop-shadow-xl">Choose Interpolation Method</h2>
                <Link className="no-underline">
                  <button 
                    className="bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg flex flex-col justify-center items-center transform transition duration-300 hover:scale-105 focus:outline-none w-full mb-4"
                    onClick={() => handleInterpolationSelection('Newton')}
                  >
                    <img src={NewtonImage} alt="Newton" className="h-24 mb-2 rounded-full" />
                    <span className="text-xl font-semibold">Newton</span>
                  </button>
                </Link>
                <Link className="no-underline">
                  <button 
                    className="bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg flex flex-col justify-center items-center transform transition duration-300 hover:scale-105 focus:outline-none w-full mb-4"
                    onClick={() => handleInterpolationSelection('Lagrange')}
                  >
                    <img src={LagrangeImage} alt="Lagrange" className="h-24 mb-2 rounded-full" />
                    <span className="text-xl font-semibold">Lagrange</span>
                  </button>
                </Link>
                <Link className="no-underline">
                  <button 
                    className="bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg flex flex-col justify-center items-center transform transition duration-300 hover:scale-105 focus:outline-none w-full mb-4"
                    onClick={() => handleInterpolationSelection('Stirling')}
                  >
                    <img src={Stirling} alt="Stirling" className="h-24 mb-2 rounded-full" />
                    <span className="text-xl font-semibold">Stirling</span>
                  </button>
                </Link>
              </Fade>
              </>
            )}
            {selectedInterpolation === 'Stirling' && (
              <StirlingInterpolation />
            )}
            {selectedInterpolation === 'Newton' && (
              <Fade cascade>
                <h2 className="text-3xl font-bold text-center mb-8 text-purple-800 uppercase underline drop-shadow-xl">Choose Newton Interpolation</h2>
                <div className="space-y-4 w-full">
                  <button 
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-lg mt-10 flex justify-center items-center transform transition duration-300 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
                    onClick={() => handleInterpolationSelection('ForwardDifference')}
                  >
                    Newton's Forward Difference Interpolation 
                  </button>
                  <button 
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-lg flex justify-center items-center transform transition duration-300 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
                    onClick={() => handleInterpolationSelection('BackwardDifference')}
                  >
                    Newton's Backward Difference Interpolation
                  </button>
                  <button 
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-lg flex justify-center items-center transform transition duration-300 hover:scale-105 hover:drop-shadow-xl focus:outline-none w-full"
                    onClick={() => handleInterpolationSelection('DividedDifference')}
                  >
                    Newton's Divided Difference Interpolation
                  </button>
                </div>
              </Fade>
            )}
            <Fade>
              <div className='overflow-x-auto'>
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
          </div>
          {selectedInterpolation !== null && (
            <button 
            className="bg-purple-500 hover:bg-purple-600 border border-purple-600 text-white font-bold py-1 px-4 rounded-lg flex justify-center items-center transform transition duration-300 hover:scale-105 focus:outline-none mt-4"
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

export default Main
