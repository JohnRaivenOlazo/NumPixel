import React from 'react';

const Result = ({ result, interpolationPointInput }) => {
  return (
    <div className="result mt-4">
      <label className="block mb-1 font-bold">Result:</label>
      <p>f({interpolationPointInput}) = <span className="font-bold text-lg text-red-500 rounded-md border-2 border-red-500 p-2 py-0">{result}</span></p>
    </div>
  );
};

export default Result
