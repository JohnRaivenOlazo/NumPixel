import React, { useState } from 'react';

const CentralDifference = () => {
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

  const getPSubscript = (index) => {
    return index === 1 ? 'p' : `p${getSuperscript(index)}`;
  };
  
  const getDeltaYSubscript = (index) => {
    return index === 0 ? 'y₀' : `Δ${getSuperscript(index)}y₀`;
  };
  
  const getSuperscript = (number) => {
    const digits = number.toString().split('').map(digit => parseInt(digit));
    let result = '';
    for (let digit of digits) {
      result += superscript[digit];
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

    let interpolatedValue = yArray[x0Index];
    let term = 0;

    for (let i = 1; i < differencesTable.length; i++) {
      if (differencesTable.length > i && differencesTable[i][x0Index] != null) {
        let product = 1;
        for (let j = 0; j < i; j++) {
          product *= (p - j);
        }
        term += parseFloat(differencesTable[i][x0Index]) * product / i;
      } else {
        break;
      }
    }

    interpolatedValue += term;

    setIsInterpolationBeforeMid(interpolationPoint < (xArray[0] + xArray[xArray.length - 1]));

    setHValue(h.toFixed(decimalPlaces));
    setPValue(p.toFixed(decimalPlaces));
    setResult(interpolatedValue.toFixed(decimalPlaces));
    setTableData(differencesTable);
    setNearestIndex(x0Index);
    setX0(xArray[x0Index]);
    setY0(yArray[x0Index]);
    setX1(xArray[x0Index + 1]);
  };

  const factorial = (n) => {
    let fact = 1;
    for (let i = 1; i <= n; i++) {
      fact *= i;
    }
    return fact;
  };

  return (
    <div className="calculator max-w-md mx-auto p-4 bg-white shadow-md rounded-md overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Central Difference Interpolation</h2>
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
    <label className="block mb-1"><strong>Central Difference Interpolation</strong></label>
    <p className="text-sm font-semibold">Formula</p>
    <p className='text-xs mb-3'>
      {"y₀ + "}
      <div className="fraction">
        <span>{getPSubscript(1)} ({getDeltaYSubscript(0)})</span>
        <span>1</span>
      </div>
      {" (△" + getSuperscript(1) + "y₀)"}
      {tableData.length > 1 && " + "}
      {tableData.length > 1 && (
        <div className="fraction">
          <span>{getPSubscript(2)} ({getDeltaYSubscript(1)})</span>
          <span>2</span>
        </div>
      )}
      {tableData.length > 2 && " + ..."}
    </p>
    <p className="text-sm font-semibold">Substituted Values</p>
    <p className='text-sm'>
      {y0}
      {tableData.length > 1 && " + "}
      {tableData.length > 1 && (
        <div className="fraction">
          <span>{getPSubscript(1)} ({getDeltaYSubscript(0)})</span>
          <span>1</span>
        </div>
      )}
      {tableData.length > 1 && " (△" + getSuperscript(1) + "y₀)"}
      {tableData.length > 2 && " + "}
      {tableData.length > 2 && (
        <div className="fraction">
          <span>{getPSubscript(2)} ({getDeltaYSubscript(1)})</span>
          <span>2</span>
        </div>
      )}
      {tableData.length > 2 && " (△" + getSuperscript(2) + "y₀)"}
      {tableData.length > 3 && " + ..."}
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

export default CentralDifference;
