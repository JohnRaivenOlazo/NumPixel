import React, { useState } from 'react';

// if (Table[1] && Table[1][x0Index - 0] && Table[1][x0Index - 1] != null) {
//   termCoefficient = p / factorial(1);
//   interpolatedValue += termCoefficient * (parseFloat(Table[1][x0Index]) + parseFloat(Table[1][x0Index - 1]) / 2);
// }
// if (Table[2] && Table[2][x0Index - 1] != null) {
//   termCoefficient = p**2 / factorial(2);
//   interpolatedValue += termCoefficient * parseFloat(Table[2][x0Index - 1]);
// }
// if (Table[3] && Table[3][x0Index - 1] && Table[3][x0Index - 2] != null) {
//   termCoefficient = p * (p**2 - 1**2) / factorial(3);
//   interpolatedValue += termCoefficient * parseFloat(Table[3][x0Index - 1]) + parseFloat(Table[3][x0Index - 2]) / 2;
// }
// if (Table[4] && Table[4][x0Index - 2] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) / factorial(4);
//   interpolatedValue += termCoefficient * parseFloat(Table[4][x0Index - 2]);
// }
// if (Table[5] && Table[5][x0Index - 2] && Table[5][x0Index - 3] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) / factorial(5);
//   interpolatedValue += termCoefficient * parseFloat(Table[5][x0Index - 2]) + parseFloat(Table[5][x0Index - 3]) / 2;
// }
// if (Table[6] && Table[6][x0Index - 3] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) / factorial(6);
//   interpolatedValue += termCoefficient * parseFloat(Table[6][x0Index - 3]);
// }
// if (Table[7] && Table[7][x0Index - 3] && Table[7][x0Index - 4] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) * (p**2 - 3**2) / factorial(7);
//   interpolatedValue += termCoefficient * parseFloat(Table[7][x0Index - 3]) + parseFloat(Table[7][x0Index - 4]) / 2;
// }
// if (Table[8] && Table[8][x0Index - 4] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) * (p**2 - 3**2) / factorial(8);
//   interpolatedValue += termCoefficient * parseFloat(Table[8][x0Index - 4]);
// }

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
  const [yArray, setYArray] = useState([]); // Define yArray state
  const [superscript] = useState(["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]);
  const [interpolationPoint, setInterpolationPoint] = useState('');

  const Fraction = ({ numerator, denominator }) => {
    return (
      <>
        {" "}
        <div className="fraction">
          <span>{numerator}</span>
          <span>{denominator}</span>
        </div>
      </>
    );
  }

  const calculateInterpolation = () => {
    const xArray = xValuesInput.replace(/,/g, '').split(/\s+/).map(Number);
    const yArray = yValuesInput.replace(/,/g, '').split(/\s+/).map(Number);
    setYArray(yArray);
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
    const Table = [[...yArray.map(val => val)]];
    for (let i = 1; i <= xArray.length - 1; i++) {
      const newRow = [];
      for (let j = 0; j < Table[i - 1].length - 1; j++) {
        newRow.push((Table[i - 1][j + 1] - Table[i - 1][j]).toFixed(decimalPlaces));
      }
      Table.push(newRow);
    }

    const h = xArray[1] - xArray[0];
    const p = (interpolationPoint - xArray[x0Index]) / h;

    let interpolatedValue = yArray[x0Index];

    for (let term = 1; term < Table.length; term++) {
      if (term % 2 === 1) {
        if (Table[term] && Table[term][x0Index - (term - 1)] && Table[term][x0Index - term] != null) {
          let termCoefficient = p;

          for (let i = 1; i < term; i++) {
            termCoefficient *= (p ** 2 - i ** 2);
          }
          termCoefficient /= factorial(term);
          let termValue = parseFloat(Table[term][x0Index - (term - 1)]) + parseFloat(Table[term][x0Index - term]) / 2;
          interpolatedValue += termCoefficient * termValue;
        }
      } else {
        if (Table[term] && Table[term][x0Index - (term - 1)] != null) {
          let termCoefficient = p ** 2;
          for (let i = 2; i < term; i++) {
            termCoefficient *= (p ** 2 - i ** 2);
          }
          termCoefficient /= factorial(term);
          let termValue = parseFloat(Table[term][x0Index - (term - 1)]);
          interpolatedValue += termCoefficient * termValue;
        }
      }
    }

    // Setting state
    setHValue(h.toFixed(decimalPlaces));
    setPValue(p.toFixed(decimalPlaces));
    setResult(interpolatedValue.toFixed(decimalPlaces));
    setInterpolationPoint(interpolationPoint);
    setTableData(Table);
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
              {"y₀ + "}
              <Fraction numerator={"p"} denominator={"1!"} /> <Fraction numerator={"(∆y₀ + ∆y-₁)"} denominator={"2"} />
              {" + "}
              <Fraction numerator={"p²"} denominator={"2!"} /> (∆²y-₁) + <Fraction numerator={"p(p²-1²)"} denominator={"3!"} /> <Fraction numerator={"(∆y³-₁ + ∆y³-₂)"} denominator={"2"} />
              {" + "}
              <Fraction numerator={"p²(p²-1²)"} denominator={"4!"} /> ∆y⁴-₂
              {" + "}
              <Fraction numerator={"p²(p²-1²)(p²-2²)"} denominator={"5!"} /> <Fraction numerator={"(∆y⁵-₂ + ∆y⁵-₃)"} denominator={"2"} /> ...
            </p>
            <div className="text-sm font-semibold">Substituted Values</div>
            <div className="text-sm">
              {`${y0}`}
              {tableData[1] && tableData[1][nearestIndex] && tableData[1][nearestIndex - 1] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}`} denominator={factorial(1)} />
                  <Fraction numerator={`(${tableData[1][nearestIndex]} + ${tableData[1][nearestIndex - 1]})`} denominator={"2"} />
                </>
              )}
              {tableData[2] && tableData[2][nearestIndex - 1] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}²`} denominator={factorial(2)} />
                  {` (${tableData[2][nearestIndex - 1]})`}
                </>
              )}
              {tableData[3] && tableData[3][nearestIndex - 1] && tableData[3][nearestIndex - 2] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}(${pValue}²-1²)`} denominator={factorial(3)} />
                  <Fraction numerator={`(${tableData[3][nearestIndex - 1]} + ${tableData[3][nearestIndex - 2]})`} denominator={"2"} />
                </>
              )}
              {tableData[4] && tableData[4][nearestIndex - 2] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}(${pValue}²-1²)`} denominator={factorial(4)} />
                  {` (${tableData[4][nearestIndex - 2]})`}
                </>
              )}
              {tableData[5] && tableData[5][nearestIndex - 2] && tableData[5][nearestIndex - 3] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}(${pValue}²-1²)(${pValue}²-2²)`} denominator={factorial(5)} />
                  <Fraction numerator={`(${tableData[5][nearestIndex - 2]} + ${tableData[5][nearestIndex - 3]})`} denominator={"2"} />
                </>
              )}
              {tableData[6] && tableData[6][nearestIndex - 3] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}(${pValue}²-1²)(${pValue}²-2²)`} denominator={factorial(6)} />
                  {` (${tableData[6][nearestIndex - 3]})`}
                </>
              )}
              {tableData[7] && tableData[7][nearestIndex - 3] && tableData[7][nearestIndex - 4] != null && (
                <>
                  <span> ... </span>
                </>
              )}
            </div>

            <label className="block mb-1 font-bold">Result:</label>
            <span className="font-bold underline">{result}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StirlingInterpolation;
