import React from 'react';

const InputForm = ({ xInput, setXInput, yInput, setYInput, interpolationPointInput, setInterpolationPointInput, decimalPlaces, setDecimalPlaces, calculate }) => {
  return (
    <>
      <div className="input-container mb-4">
        <label className="block mb-1 font-bold italic">x Values:</label>
        <input
          type="text"
          className="w-full p-2 border border-purple-700 rounded-md"
          placeholder="Enter x values separated by space..."
          value={xInput}
          onChange={(e) => setXInput(e.target.value)}
        />
      </div>
      <div className="input-container mb-4">
        <label className="block mb-1 font-bold italic">y or f(x) Values:</label>
        <input
          type="text"
          className="w-full p-2 border border-purple-700 rounded-md"
          placeholder="Enter y values separated by space..."
          value={yInput}
          onChange={(e) => setYInput(e.target.value)}
        />
      </div>
      <div className="input-container mb-4">
        <label className="block mb-1 font-bold">Interpolation Point:</label>
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
          className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full uppercase font-bold text-xs transition duration-300"
          onClick={calculate}
        >
          Calculate
        </button>
        <div className='flex flex-row-reverse items-center gap-2'>
          <label className="block mb-1 text-xs font-bold">Decimal Places</label>
          <input
            type="number"
            className="w-14 h-8 p-2 border border-purple-700 rounded-md"
            value={decimalPlaces}
            onChange={(e) => setDecimalPlaces(parseInt(e.target.value))}
          />
        </div>
      </div>
    </>
  );
};

export default InputForm