import React, { useState } from 'react';
import { Fade } from "react-awesome-reveal";

const NewtonForward = () => {
  // State variables
  const [xValuesInput, setXValuesInput] = useState('');
  const [yValuesInput, setYValuesInput] = useState('');
  const [interpolationPointInput, setInterpolationPointInput] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [result, setResult] = useState('');
  const [hValue, setHValue] = useState('');
  const [pValue, setPValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [nearestIndex, setNearestIndex] = useState('');
  const [x0, setX0] = useState('');
  const [y0, setY0] = useState('');
  const [x1, setX1] = useState('');
  const [superscript] = useState(["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]);

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

  const calculateInterpolation = () => {
    const xArray = xValuesInput.replace(/,/g, '').split(/\s+/).map(Number);
    const yArray = yValuesInput.replace(/,/g, '').split(/\s+/).map(Number);
    const interpolationPoint = parseFloat(interpolationPointInput.replace(/,/g, ''));

    if (!xValuesInput || !yValuesInput || !interpolationPointInput || isNaN(interpolationPoint) || xArray.length !== yArray.length || xArray.length < 2) {
      setResult('Invalid input. Please enter valid numbers');
      setTableData([]);
      return;
    }

    let x0Index = 0;
    for (let i = 1; i < xArray.length; i++) {
      if (interpolationPoint < xArray[i]) {
        x0Index = i - 1;
        break;
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

    const h = xArray[1] - xArray[0];
    const p = (interpolationPoint - xArray[x0Index]) / h;

//Initialize interpolated value with y0
// let interpolatedValue = yArray[x0Index];
// let term1, term2, term3, term4, term5 = 0;
// // Calculate the first order difference (i = 1)
// if (differencesTable.length > 1 && differencesTable[1][x0Index] != null) {
//   term1 = p * parseFloat(differencesTable[1][x0Index]) / factorial(1);
// }else{
//   term1 = 0;
// }
// // Calculate the second order difference (i = 2)
// if (differencesTable.length > 2 && differencesTable[2][x0Index] != null) {
//   term2 = p * (p - 1) * parseFloat(differencesTable[2][x0Index]) / factorial(2);
// }else{
//   term2 = 0;
// }
// // Calculate the third order difference (i = 3)
// if (differencesTable.length > 3 && differencesTable[3][x0Index] != null) {
//   term3 = p * (p - 1) * (p - 2) * parseFloat(differencesTable[3][x0Index]) / factorial(3);
// }else{
//   term3 = 0;
// }
// interpolatedValue += term1 + term2 + term3 + term4 + term5;

let interpolatedValue = yArray[x0Index];
let term = 0;

for (let i = 1; i < differencesTable.length; i++) {
  if (differencesTable.length > i && differencesTable[i][x0Index] != null) {
    let product = 1;
    for (let j = 0; j < i; j++) {
      product *= (p - j);
    }
    term += parseFloat(differencesTable[i][x0Index]) * product / factorial(i);
  } else {
    break;
  }
}

interpolatedValue += term;

    setHValue(h.toFixed(decimalPlaces));
    setPValue(p.toFixed(decimalPlaces));
    setResult(interpolatedValue.toFixed(decimalPlaces));
    setTableData(differencesTable);
    setNearestIndex(x0Index);
    setX0(xArray[x0Index]);
    setY0(yArray[x0Index]);
    setX1(xArray[x0Index + 1]);
  };
  
  
  return (
    <div className="calculator max-w-md mx-auto p-4 bg-white shadow-md rounded-md overflow-x-auto">
      <h2 className="text-lg font-bold mb-4 text-purple-800 uppercase">Forward Difference Interpolation</h2>
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
      {tableData.length > 0 && (
        <div className="table mt-4">
          <h3 className="font-bold mb-2">Difference Table:</h3>
          <table className="border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">x</th>
                <th className="border border-gray-400 p-2">y</th>
                <th className="border border-gray-400 p-2">△y</th>
                {Array.from({ length: tableData[0].length - 2 }, (_, index) => (
                  <th key={`difference-${index}`} className="border border-gray-400 p-2">{`△${getSuperscript(2 + index)}y`}</th>
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
        <div className="result mt-4">
          <label className="block mb-1"><strong>h</strong> (Step Size / Interval)</label>
          <p>h = x₁ - x₀ = {x1} - {x0} = <span className='font-bold'>{hValue}</span></p>
        </div>
      {hValue && (
        <div className="result mt-4">
          <p>
            {"p = "}
            <div className="fraction">
              <span>x - x₀</span>
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
          <label className="block mb-1"><strong>Newton Forward Difference</strong></label>
          <p className="text-sm font-semibold">Formula</p>
          <p className='text-xs mb-3'>
            {"y₀ + "}
            <div className="fraction">
              <span>p</span>
              <span>1!</span>
            </div>
            {" (△y₀) + "}
            <div className="fraction">
              <span>p (p - 1)</span>
              <span>2!</span>
            </div>
            {" (△²y₀) + "}
            <div className="fraction">
              <span>p (p - 1) (p - 2)</span>
              <span>3!</span>
            </div>
            {" (△³y₀) ..."}
          </p>
          <p className="text-sm font-semibold">Substituted Values</p>
          <p className='text-sm'>
            {y0}
          {tableData.length > 1 && tableData[1][nearestIndex] != null && (
            <>
            {" + "}
            <div className="fraction">
              <span>{pValue} ({tableData[1][nearestIndex]})</span>
              <span>1</span>
            </div>
            </>
          )}
            {tableData.length > 2 && tableData[2][nearestIndex] != null && (
              <>
                {" + "}
              <div className="fraction">
                <span>{pValue} ({pValue} - 1) ({tableData[2][nearestIndex]})</span>
                <span>2</span>
              </div>
              </>
            )} 
            {tableData.length > 3 && tableData[3][nearestIndex] != null && (
              <>
                {" + "}
                <div className="fraction">
                  <span>{pValue} ({pValue} - 1) ({pValue} - 2) ({tableData[3][nearestIndex]})</span>
                  <span>6</span>
                </div>
              </>
            )}
            {tableData.length > 4 && tableData[4][nearestIndex] != null && (
              <>
                {" + "}
                <div className="fraction">
                  <span>{pValue} ({pValue} - 1) ({pValue} - 2) ({pValue} - 3) ({tableData[4][nearestIndex]})</span>
                  <span>24</span>
                </div>
              </>
            )}
            {tableData.length > 5 && tableData[5][nearestIndex] != null && (
              <>
                {" + "}
                <div className="fraction">
                  <span>{pValue} ({pValue} - 1) ({pValue} - 2) ({pValue} - 3) ({pValue} - 4) {tableData[5][nearestIndex]}</span>
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

export default NewtonForward
