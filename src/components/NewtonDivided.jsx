import React, { useState } from 'react';

const NewtonDivided = () => {
  // State variables
  const [xValuesInput, setXValuesInput] = useState('');
  const [yValuesInput, setYValuesInput] = useState('');
  const [interpolationPointInput, setInterpolationPointInput] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [result, setResult] = useState('');
  const [tableData, setTableData] = useState([]);
  const [superscript] = useState(["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]);

  const getSuperscript = (number) => {
    const digits = number.toString().split('').map(digit => parseInt(digit));
    let result = '';
    for (let digit of digits) {
      result += superscript[digit];
    }
    return result;
  };
  
  // Function to calculate Newton's divided difference interpolation
  const calculateInterpolation = () => {
    const xArray = xValuesInput.replace(/,/g, '').split(/\s+/).map(Number);
    const yArray = yValuesInput.replace(/,/g, '').split(/\s+/).map(Number);
    const interpolationPoint = parseFloat(interpolationPointInput.replace(/,/g, ''));

    // Input validation
    if (!xValuesInput || !yValuesInput || !interpolationPointInput || isNaN(interpolationPoint) || xArray.length !== yArray.length || xArray.length < 2) {
      setResult('Invalid input. Please enter valid numbers');
      setTableData([]);
      return;
    }

    // Initialize table with y values
    const dividedDifferences = [...yArray];
    
    // Calculate divided differences
    for (let j = 1; j < xArray.length; j++) {
      for (let i = xArray.length - 1; i >= j; i--) {
        dividedDifferences[i] = (dividedDifferences[i] - dividedDifferences[i - 1]) / (xArray[i] - xArray[i - j]);
      }
    }

    // Initialize interpolated value
    let interpolatedValue = dividedDifferences[0];

    // Calculate interpolated value using Newton's divided difference formula
    let term = 1;
    for (let i = 1; i < xArray.length; i++) {
      term *= (interpolationPoint - xArray[i - 1]);
      interpolatedValue += term * dividedDifferences[i];
    }

    // Setting state
    setResult(interpolatedValue.toFixed(decimalPlaces));
    setTableData(dividedDifferences.map(val => val.toFixed(decimalPlaces)));
  };
  
  return (
    <div className="calculator max-w-md mx-auto p-4 bg-white shadow-md rounded-md overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Newton's Divided Difference Interpolation</h2>
      {/* Input fields */}
      {/* X Values */}
      <div className="input-container mb-4">
        <label className="block mb-1">Enter X Values:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter x values separated by space or comma"
          value={xValuesInput}
          onChange={(e) => setXValuesInput(e.target.value)}
        />
      </div>
      {/* Y Values */}
      <div className="input-container mb-4">
        <label className="block mb-1">Enter Y Values:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter y values separated by space or comma"
          value={yValuesInput}
          onChange={(e) => setYValuesInput(e.target.value)}
        />
      </div>
      {/* Interpolation Point */}
      <div className="input-container mb-4">
        <label className="block mb-1">Enter Interpolation Point:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter interpolation point"
          value={interpolationPointInput}
          onChange={(e) => setInterpolationPointInput(e.target.value)}
        />
      </div>
      {/* Decimal Places */}
      <div className="input-container mb-4">
        <label className="block mb-1">Enter Decimal Places:</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter decimal places"
          value={decimalPlaces}
          onChange={(e) => setDecimalPlaces(parseInt(e.target.value))}
        />
      </div>
      {/* Calculate Button */}
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition duration-300"
        onClick={calculateInterpolation}
      >
        Calculate
      </button>

      {/* Render content */}
      {result && (
        <div className="result mt-4">
          <h3 className="font-bold">Interpolated Value:</h3>
          <p>{result}</p>
        </div>
      )}
      {tableData.length > 0 && (
        <div className="table mt-4">
          <h3 className="font-bold">Divided Differences:</h3>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">Order</th>
                <th className="border border-gray-400 p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((value, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 p-2">{index}</td>
                  <td className="border border-gray-400 p-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewtonDivided;
