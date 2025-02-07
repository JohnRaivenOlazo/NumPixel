import React from 'react';

const InputForm = ({ xInput, setXInput, yInput, setYInput, interpolationPointInput, setInterpolationPointInput, decimalPlaces, setDecimalPlaces, calculate }) => {
  return (
    <>
      <div className="input-container mb-4">
        <label className="block mb-1 font-medium italic text-white">x Values:</label>
        <input
          type="text"
          className="w-full p-2 border border-purple-700 rounded-md"
          placeholder="Enter x values separated by space..."
          value={xInput}
          onChange={(e) => setXInput(e.target.value)}
        />
      </div>
      <div className="input-container mb-4">
        <label className="block mb-1 font-medium italic text-white">y or f(x) Values:</label>
        <input
          type="text"
          className="w-full p-2 border border-purple-700 rounded-md"
          placeholder="Enter y values separated by space..."
          value={yInput}
          onChange={(e) => setYInput(e.target.value)}
        />
      </div>
      <div className="input-container mb-4">
        <label className="block mb-1 font-medium text-white">Interpolation Point:</label>
        <input
          type="text"
          className="w-full p-2 border border-purple-700 rounded-md"
          placeholder="Enter interpolation point..."
          value={interpolationPointInput}
          onChange={(e) => setInterpolationPointInput(e.target.value)}
        />
      </div>
      <div className="input-container mb-4 flex items-center justify-start gap-3">
        <button
          className="bg-green-500 hover:bg-green-500/80 text-white py-2 px-4 rounded-full uppercase font-medium text-xs transition duration-200"
          onClick={calculate}
        >
          Calculate
        </button>
        <div className='flex flex-row-reverse items-center gap-2'>
          <label className="block mb-1 text-xs font-medium text-white">Decimal Places</label>
          <input
            type="number"
            className="w-12 h-4 p-2 border border-purple-700 rounded-md"
            value={decimalPlaces}
            onChange={(e) => setDecimalPlaces(parseInt(e.target.value))}
          />
        </div>
      </div>
    </>
  );
};

export default InputForm