import React, { useState } from 'react';

const StirlingInterpolation = () => {
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

  // Function to calculate Stirling's interpolation
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

    // Finding appropriate x0 value based on interpolation point
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
    const p = (interpolationPoint - xArray[x0Index]) / h;

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

    // Setting state
    setHValue(h.toFixed(decimalPlaces));
    setPValue(p.toFixed(decimalPlaces));
    setResult(interpolatedValue.toFixed(decimalPlaces));
    setTableData(differencesTable);
    setNearestIndex(x0Index);
    setX0(xArray[x0Index]);
    setY0(yArray[x0Index]);
    setX1(xArray[x0Index + 1]);
  };

  // Function to calculate factorial
  const factorial = (n) => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const getSuperscript = (num) => {
    return num.toString().split('').map(digit => superscript[digit]).join('');
  };

  return (
    <div className="calculator max-w-md mx-auto p-4 bg-white shadow-md rounded-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-purple-800 uppercase">Stirling Interpolation</h2>
      {/* Input fields */}
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

      {/* Render content based on interpolation method */}
      {result && (
        <div className="interpolation-method mt-4">
          <div className="result mt-4">
            <label className="block mb-1"><strong>h</strong> (Step Size / Interval)</label>
            <p>h = x₁ - x₀ = {x1} - {x0} = <span className='font-bold'>{hValue}</span></p>
          </div>
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
            <label className="block mb-1"><strong>Stirling Interpolation</strong></label>
            <p className="text-sm font-semibold">Formula</p>
            <p className='text-xs mb-3'>
              {`y₀ + p/1! (∆y₀ + ∆y-₁/2) + p²/2! (∆²y-₁) + p(p²-1)/3! (∆y³-₁ + ∆y³-₂/2) + p²(p²-1)/4! ∆y⁴-₂ ...`}
            </p>
            <p className="text-sm font-semibold">Substituted Values</p>
            <p className='text-sm'>
            {y0}
{tableData.slice(1).map((row, i) => {
  const interpolatedDiff1 = row[nearestIndex];
  const interpolatedDiff2 = row[nearestIndex - 1];
  const interpolatedDiff3 = row[nearestIndex - 2];
  const factorialVal = factorial(i + 1);
  const productTerm = Array.from({ length: i + 1 }, (_, index) => `(${pValue} - ${index})`).join(' ');
  if (interpolatedDiff1 != null) {
    let terms = [];
    terms.push(
      <div key={`term-${i}-1`} className="fraction">
        <span>{pValue}</span>
        <span>1</span>
      </div>,
      `(${interpolatedDiff1}`
    );
    if (interpolatedDiff2 != null) {
      terms.push(` + ${interpolatedDiff2}/2!)`);
    }
    if (interpolatedDiff3 != null) {
      terms.push(
        ` + `,
        <div key={`term-${i}-2`} className="fraction">
          <span>{pValue}²</span>
          <span>{factorialVal}</span>
        </div>,
        `(${interpolatedDiff3}/2!)`
      );
    }
    if (i > 0 && interpolatedDiff3 != null && interpolatedDiff2 != null) {
      terms.push(
        ` + `,
        <div key={`term-${i}-3`} className="fraction">
          <span>{pValue}({pValue}² - 1)/3!</span>
          <span>6</span>
        </div>,
        `(${interpolatedDiff3} + ${interpolatedDiff2}/2)`
      );
    }
    return terms;
  }
})}
            </p>
            <label className="block mb-1 font-bold">Result:</label>
            <span className="font-bold underline">{result}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StirlingInterpolation;
