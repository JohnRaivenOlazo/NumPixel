import React, { useState } from 'react';
import { Fade } from "react-awesome-reveal";

const NewtonBackward = () => {
  // State variables
  const [xValuesInput, setXValuesInput] = useState('');
  const [yValuesInput, setYValuesInput] = useState('');
  const [interpolationPointInput, setInterpolationPointInput] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [result, setResult] = useState('');
  const [hValue, setHValue] = useState('');
  const [pValue, setPValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [x0, setX0] = useState('');
  const [nearestIndex, setNearestIndex] = useState('');
  const [x1, setX1] = useState('');
  const [y0, setY0] = useState('');
  const [superscript] = useState(["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]);
  const [isInterpolationBeforeMid, setIsInterpolationBeforeMid] = useState(false);

  const getSuperscript = (number) => {
    const digits = number.toString().split('').map(digit => parseInt(digit));
    let result = '';
    for (let digit of digits) {
      result += superscript[digit];
    }
    return result;
  };
  
  // Calculate factorial
  const factorial = (n) => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  // Function to calculate forward difference interpolation
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

    // Finding appropriate xn value based on interpolation point
    //let xnindex = xArray.length - 1;
    let xnindex = 0;
    for (let i = xArray.length - 1; i > 0; i--) {
      if (interpolationPoint <= xArray[i] && interpolationPoint > xArray[i - 1]) {
        xnindex = i;
        break;
      }
    }
    console.log(yArray[xnindex]);


    let x0Index = 0;
    for (let i = 1; i < xArray.length; i++) {
      if (interpolationPoint < xArray[i]) {
        x0Index = i - 1;
        break;
      }
    }

    // Constructing differences table with appropriate order
    const differencesTable = [[...yArray.map(val => val.toFixed(decimalPlaces))]];
    for (let i = 1; i <= xArray.length - 1; i++) {
      const newRow = [];
      for (let j = 0; j < differencesTable[i - 1].length - 1; j++) {
        newRow.push((differencesTable[i - 1][j + 1] - differencesTable[i - 1][j]).toFixed(decimalPlaces));
      }
      differencesTable.push(newRow);
    }

    const h = xArray[1] - xArray[0];
    const p = (interpolationPoint - xArray[xnindex]) / h;
    
    let interpolatedValue = yArray[xnindex];
    let term = 0;
    
    for (let i = 1; i < differencesTable.length; i++) {
      if (differencesTable.length > i && differencesTable[i][xnindex - i] != null) {
        let product = 1;
        for (let j = 0; j < i; j++) {
          product *= (p + j);
        }
        term += parseFloat(differencesTable[i][xnindex - i]) * product / factorial(i);
        console.log(differencesTable[i][xnindex - i]);
      } else {
        break;
      }
    }

    interpolatedValue += term;

    // Determine if interpolation is before or after mid value
    setIsInterpolationBeforeMid(interpolationPoint < (xArray[0] + xArray[xArray.length - 1]));

    // Setting state
    setHValue(h.toFixed(decimalPlaces));
    setPValue(p.toFixed(decimalPlaces));
    setResult(interpolatedValue.toFixed(decimalPlaces));
    setTableData(differencesTable);
    setNearestIndex(xnindex);
    setX0(xArray[x0Index]);
    setY0(yArray[xnindex]);
    setX1(xArray[x0Index + 1]);
  };
  
  
  return (
    <div className="calculator max-w-md mx-auto p-4 bg-white shadow-md rounded-md overflow-x-auto">
      <h2 className="text-lg font-bold mb-4 text-purple-800 uppercase">Backward Difference Interpolation</h2>
      {/* Input fields */}
      {/* X Values */}
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
      {/* Y Values */}
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
      {/* Interpolation Point */}
      <div className="input-container mb-4">
        <label className="block mb-1">Enter (X) Interpolation Point:</label>
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

      {/* Render content based on interpolation method */}
      {result && (
        <div className="interpolation-method mt-4">
                  {/* Header Text */}
      { xValuesInput && yValuesInput && (
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
      {/* Difference Table */}
      {tableData.length > 0 && (
        <div className="table mt-4">
          <h3 className="font-bold mb-2">Difference Table:</h3>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">x</th>
                <th className="border border-gray-400 p-2">y</th>
                <th className="border border-gray-400 p-2">∇y</th>
                {Array.from({ length: tableData[0].length - 2 }, (_, index) => (
                  <th key={`difference-${index}`} className="border border-gray-400 p-2">{`∇${getSuperscript(2 + index)}y`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {xValuesInput.replace(/,/g, '').split(/\s+/).map((x, index) => (
                <tr key={`row-x-${index}`}>
                  <td className="border border-gray-400 p-2">{x}</td>
                  {tableData.map((row, rowIndex) => (
                    <td key={`data-${rowIndex}-${index}`} className="border border-gray-400 p-2">
                      {row[index]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Results */}
        <div className="result mt-4">
          <label className="block mb-1"><strong>h</strong> (Step Size / Interval)</label>
          <p>h = x₁ - x₀ = {x1} - {x0} = <span className='font-bold'>{hValue}</span></p>
        </div>
      {hValue && (
        <div className="result mt-4">
          <p>
            {"p = "}
            <div className="fraction">
              <span>x - xₙ</span>
              <span>h</span>
            </div>
            {" = "}
            <div className="fraction">
              <span>{interpolationPointInput} - {x0}</span>
              <span>{hValue}</span>
            </div>
            {" = "}
            <span className='font-bold'>{pValue}</span>
          </p>
        </div>
      )}
      {result && (
        <div className="result mt-4">
          <label className="block mb-1"><strong>Backward Difference</strong></label>
          <p className="text-sm font-semibold">Formula</p>
          <p className='text-xs mb-3'>
            {"yₙ + "}
            <div className="fraction">
              <span>p</span>
              <span>1!</span>
            </div>
            {" (∇yₙ) + "}
            <div className="fraction">
              <span>p (p - 1)</span>
              <span>2!</span>
            </div>
            {" (∇²yₙ) + "}
            <div className="fraction">
              <span>p (p - 1) (p - 2)</span>
              <span>3!</span>
            </div>
            {" (∇³yₙ) ..."}
          </p>
          <p className="text-sm font-semibold">Substituted Values</p>
          <p className='text-sm'>
            {y0}
          {tableData.length > 1 && tableData[1][nearestIndex - 1] != null && (
            <>
            {" + "}
            <div className="fraction">
              <span>{pValue} ({tableData[1][nearestIndex - 1]})</span>
              <span>1</span>
            </div>
            </>
          )}
            {tableData.length > 2 && tableData[2][nearestIndex - 2] != null && (
              <>
                {" + "}
              <div className="fraction">
                <span>{pValue} ({pValue} + 1) ({tableData[2][nearestIndex - 2]})</span>
                <span>2</span>
              </div>
              </>
            )} 
            {tableData.length > 3 && tableData[3][nearestIndex - 3] != null && (
              <>
                {" + "}
                <div className="fraction">
                  <span>{pValue} ({pValue} + 1) ({pValue} + 2) ({tableData[3][nearestIndex - 3]})</span>
                  <span>6</span>
                </div>
              </>
            )}
            {tableData.length > 4 && tableData[4][nearestIndex - 4] != null && (
              <>
                {" + "}
                <div className="fraction">
                  <span>{pValue} ({pValue} + 1) ({pValue} + 2) ({pValue} + 3) ({tableData[4][nearestIndex - 4]})</span>
                  <span>24</span>
                </div>
              </>
            )}
            {tableData.length > 5 && tableData[5][nearestIndex - 5] != null && (
              <>
                {" + "}
                <div className="fraction">
                  <span>{pValue} ({pValue} + 1) ({pValue} + 2) ({pValue} + 3) ({pValue} + 4) {tableData[5][nearestIndex - 5]}</span>
                  <span>120</span>
                </div>
              </>
            )}
          </p>
          <label className="block mb-1 font-bold">Result:</label>
          <span className="font-bold underline">{result}</span>
        </div>
      )}
        </div>
      )}
    </div>
  );
}

export default NewtonBackward;
