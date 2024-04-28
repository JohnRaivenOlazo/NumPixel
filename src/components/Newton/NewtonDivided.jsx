import React, { useState } from 'react';

const NewtonDivided = () => {
  const [xValuesInput, setXValuesInput] = useState('');
  const [yValuesInput, setYValuesInput] = useState('');
  const [interpolationPointInput, setInterpolationPointInput] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [result, setResult] = useState('');
  const [tableData, setTableData] = useState([]);

  const calculateInterpolation = () => {
    const xArray = xValuesInput.replace(/,/g, '').split(/\s+/).map(Number);
    const yArray = yValuesInput.replace(/,/g, '').split(/\s+/).map(Number);
    const interpolationPoint = parseFloat(interpolationPointInput.replace(/,/g, ''));

    if (!xValuesInput || !yValuesInput || !interpolationPointInput || isNaN(interpolationPoint) || xArray.length !== yArray.length || xArray.length < 2) {
      setResult('Invalid input. Please enter valid numbers');
      setTableData([]);
      return;
    }

    const differencesTable = [];
    for (let i = 0; i < yArray.length; i++) {
      differencesTable.push([xArray[i], yArray[i]]);
    }

    for (let j = 1; j < yArray.length; j++) {
      for (let i = 0; i < yArray.length - j; i++) {
        differencesTable[i].push((differencesTable[i + 1][j] - differencesTable[i][j]) / (differencesTable[i + j][0] - differencesTable[i][0]));
      }
    }

    let interpolatedValue = differencesTable[0][1];
    let term = 1;
    for (let i = 1; i < xArray.length; i++) {
      term *= (interpolationPoint - differencesTable[i - 1][0]);
      interpolatedValue += term * differencesTable[0][i + 1];
    }

    setResult(interpolatedValue.toFixed(decimalPlaces));
    setTableData(differencesTable);
  };

  const renderSubstitutedValues = () => {
    if (tableData.length === 0) return null;

    const order = tableData[0].length - 2;
    let substitutedValues = '';
  
    for (let i = 1; i <= order; i++) {
      const term = tableData[0][i + 1].toFixed(decimalPlaces);
      const factors = xValuesInput
        .replace(/,/g, '')
        .split(/\s+/)
        .slice(0, i)
        .map((x, index) => `(${interpolationPointInput} - ${x})`)
        .join('');
  
      substitutedValues += term !== 0 ? `${term} * ${factors}` : '0';
      if (i !== order) substitutedValues += ' + ';
    }

    return substitutedValues;
  };

  return (
    <div className="calculator max-w-md mx-auto p-4 bg-white shadow-md rounded-md overflow-x-auto">
      <h2 className="text-lg font-bold mb-4 text-purple-800 uppercase">Divided Difference Interpolation</h2>
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
                {Array.from({ length: tableData[0].length - 3}, (_, index) => (
                  <th key={`difference-${index}`} className="border border-gray-400 p-2">{`△${index + 2}y`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`} className="border border-gray-400">
                  {row.map((value, colIndex) => (
                    <td key={`data-${rowIndex}-${colIndex}`} className="border border-gray-400 p-2">
                      {value.toFixed(decimalPlaces)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {result && (
        <>
        <div className="result mt-4">
          <label className="block mb-1"><strong>Newton Divided Difference</strong></label>
          <p className="text-sm font-semibold">Formula</p>
            <p>f(x) = y₀ + (x-x₀) [x₀x₁] + (x-x₀)(x-x₁) [x₀x₁x₂] ...</p>
        </div>
        <div className="result mt-4">
          <p className="text-sm font-semibold">Substituted Values</p>
          {renderSubstitutedValues()}
        </div>
          <div className="result mt-4">
            <h3 className="font-bold">Result:</h3>
            <p>f({interpolationPointInput}) = <span className='font-bold underline'>{result}</span></p>
          </div>
        </>
      )}
    </div>
  );
};

export default NewtonDivided
