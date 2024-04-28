import React, { useState } from 'react';

const LagrangeInterpolation = () => {
  const [xValuesInput, setXValuesInput] = useState('');
  const [yValuesInput, setYValuesInput] = useState('');
  const [interpolationPointInput, setInterpolationPointInput] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [result, setResult] = useState('');
  const [resultFormula, setResultFormula] = useState('');
  const [tableData, setTableData] = useState([]);
  const [nearestIndex, setNearestIndex] = useState('');
  const [superscript] = useState(["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]);

  const getSuperscript = (number) => {
    const digits = number.toString().split('').map(digit => parseInt(digit));
    let result = '';
    for (let digit of digits) {
      result += superscript[digit];
    }
    return result;
  };

  const LinearFraction = ({ numerator, denominator }) => {
    return (
      <>
      <div className='fraction'>
      <span>
            {numerator}
        </span>
        <span>
            {denominator}
            </span>
      </div>
    </>
    );
  }
  
  const calculateInterpolation = () => {
    const xArray = xValuesInput.replace(/,/g, '').split(/\s+/).map(Number);
    const yArray = yValuesInput.replace(/,/g, '').split(/\s+/).map(Number);
    const interpolationPoint = parseFloat(interpolationPointInput.replace(/,/g, ''));

    if (!xValuesInput || !yValuesInput || !interpolationPointInput || isNaN(interpolationPoint) || xArray.length !== yArray.length || xArray.length < 2) {
      setResult('Invalid input. Please enter valid numbers');
      return;
    }

    let nearestIndex = 0;
    let minDiff = Math.abs(interpolationPoint - xArray[0]);
    for (let i = 1; i < xArray.length; i++) {
      let diff = Math.abs(interpolationPoint - xArray[i]);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIndex = i;
      }
    }

    const differencesTable = [[...yArray.map(val => val.toFixed(decimalPlaces))]];
    for (let i = 1; i <= xArray.length - 1; i++) {
      const newRow = [];
      for (let j = 0; j < differencesTable[i - 1].length - 1; j++) {
        newRow.push((differencesTable[i - 1][j + 1] - differencesTable[i - 1][j]).toFixed(decimalPlaces));
      }
      differencesTable.push(newRow);
    }

    let interpolatedValue = 0;
    for (let i = 0; i < xArray.length; i++) {
      let term = yArray[i];
      for (let j = 0; j < xArray.length; j++) {
        if (j !== i) {
          term *= (interpolationPoint - xArray[j]) / (xArray[i] - xArray[j]);
        }
      }
      interpolatedValue += term;
    }

    //    FOR RENDERING PURPOSE 
    let interpolatedValuePrint = [];
    for (let i = 0; i < xArray.length; i++) {
        let term = yArray[i];
        let numerator = [];
        let denominator = [];
        for (let j = 0; j < xArray.length; j++) {
            if (j !== i) {
                numerator.push(`(${interpolationPoint} - ${xArray[j]})`);
                denominator.push(`(${xArray[i]} - ${xArray[j]})`);
            }
        }

        let numeratorStr = numerator.join('') || '1'; // If no terms in the numerator, set it to 1
        let denominatorStr = denominator.join('') || '1'; // If no terms in the denominator, set it to 1
        let fraction = <LinearFraction numerator={numeratorStr} denominator={denominatorStr} />;
    
        interpolatedValuePrint.push(
            <span key={`term-${i}`}>
                {term} * {fraction}
            </span>
        );
        if (i !== xArray.length - 1) {
            interpolatedValuePrint.push(" + ");
        }
    }
    
    setTableData(differencesTable);
    setResult(interpolatedValue.toFixed(decimalPlaces));
    setResultFormula(interpolatedValuePrint);
    setNearestIndex(nearestIndex);
  };

  return (
    <div className="calculator max-w-md mx-auto p-4 bg-white shadow-md rounded-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-800 uppercase">Lagrange Interpolation</h2>
      <div className="input-container mb-4">
        <label className="block mb-1">Enter X Values:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter x values separated by space..."
          value={xValuesInput}
          onChange={(e) => setXValuesInput(e.target.value)}
        />
      </div>
      <div className="input-container mb-4">
        <label className="block mb-1">Enter Y Values:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter y values separated by space..."
          value={yValuesInput}
          onChange={(e) => setYValuesInput(e.target.value)}
        />
      </div>
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
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition duration-300"
        onClick={calculateInterpolation}
      >
        Calculate
      </button>
      {result && (
        <div className="interpolation-method mt-4">
          {xValuesInput && yValuesInput && (
            <div className="mt-4">
              <p className="mb-2"><strong>The value of table for x and y:</strong></p>
              <table className="border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2 font-bold">x</th>
                    {xValuesInput.replace(/,/g, '').split(/\s+/).map((x, index) => (
                      <th key={`x-${index}`} className="border border-gray-400 font-normal p-2">{x}</th>
                    ))}
                  </tr>
                  <tr>
                    <th className="border border-gray-400 p-2 font-bold">y</th>
                    {yValuesInput.replace(/,/g, '').split(/\s+/).map((y, index) => (
                      <td key={`y-${index}`} className="border border-gray-400 font-normal p-2">{y}</td>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>
          )}
          {result && (
            <div className="result mt-4">
              <label className="block mb-1"><strong>Formula</strong></label>
              <p className="text-xs mb-3">
                 {"f(x) = y₀ "} 
                 <LinearFraction numerator={`(x - x₁)(x - x₂)...(x - xₙ)`} denominator={`(x₀ - x₁)(x₀ - x₂)...(x₀ - xₙ)`} />
                 {" + y₁ "}
                 <LinearFraction numerator={`(x - x₀)(x - x₂)...(x - xₙ)`} denominator={`(x₁ - x₀)(x₁ - x₂)...(x₁ - xₙ)`} />
                 {" ... "}
              </p>
              <label className="block mb-1 font-bold">Substituted Values</label>
              <span className="text-sm">{resultFormula}</span>
              <label className="block font-bold">Result:</label>
              <span>f({interpolationPointInput}) = <span className="font-bold underline">{result}</span></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LagrangeInterpolation
