import React, { useState, useEffect } from 'react';
import Fraction from '../Utils/Fraction'
import { validateInputs } from '../Utils/Validation';
import { Factorial } from '../Utils/Calculations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const NewtonForward = () => {
  const [xValuesInput, setXValuesInput] = useState('');
  const [yValuesInput, setYValuesInput] = useState('');
  const [interpolationPointInput, setInterpolationPointInput] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [result, setResult] = useState('');
  const [hValue, setHValue] = useState('');
  const [pValue, setPValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [nearestIndex, setNearestIndex] = useState('');
  const [x0Index, setX0Index] = useState('');
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [error, setError] = useState('');
  const [superscript] = useState(["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    if (xValuesInput && yValuesInput && interpolationPointInput) {
      const xArray = xValuesInput.trim().replace(/,/g, '').split(/\s+/).map(Number);
      const yArray = yValuesInput.trim().replace(/,/g, '').split(/\s+/).map(Number);

      const interpolationPoint = parseFloat(interpolationPointInput.replace(/,/g, ''));
      const interpolatedValue = parseFloat(result);

      const data = xArray.map((x, index) => ({
        x: x,
        y: yArray[index]
      }));

      let insertIndex = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].x > interpolationPoint) {
          insertIndex = i;
          break;
        }
      }

      data.splice(insertIndex, 0, {
        x: interpolationPoint,
        y: interpolatedValue,
        Interpolated: true
      });

      setGraphData(data);
    }
  }, [xValuesInput, yValuesInput, interpolationPointInput, result]);

  const getSuperscript = (number) => {
    const digits = number.toString().split('').map(digit => parseInt(digit));
    let result = '';
    for (let digit of digits) {
      result += superscript[digit];
    }
    return result;
  };

  const calculateInterpolation = () => {
    const xArray = xValuesInput.trim().replace(/,/g, '').split(/\s+/).map(Number);
    const yArray = yValuesInput.trim().replace(/,/g, '').split(/\s+/).map(Number);

    const interpolationPoint = parseFloat(interpolationPointInput.replace(/,/g, ''));

    const error = validateInputs(xValuesInput, yValuesInput, interpolationPointInput, xArray, yArray);
    if (error) {
      setError(error);
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
        term += parseFloat(differencesTable[i][x0Index]) * product / Factorial(i);
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
    setX0Index(x0Index);
    setX(xArray);
    setY(yArray);
  };

  const generateTermProduct = (pValue, n) => {
    let product = `${pValue}`;
    for (let i = 1; i < n; i++) {
      product += ` (${pValue} - ${i})`;
    }
    return product;
  }


  return (
    <>
      <p className="text-2xl shadow-lg rounded-full font-bold mb-4 p-2 px-5 text-purple-900 text-center uppercase transition-all duration-300 ease transform hover:-translate-y-1">
        Newton's Forward
      </p>
      <div className="input-container mb-4">
        <label className="block mb-1 font-bold italic">x Values:</label>
        <input
          type="text"
          className="w-full p-2 border border-purple-700 rounded-md"
          placeholder="Enter x values separated by space..."
          value={xValuesInput}
          onChange={(e) => setXValuesInput(e.target.value)}
        />
      </div>
      <div className="input-container mb-4">
        <label className="block mb-1 font-bold italic">y or f(x) Values:</label>
        <input
          type="text"
          className="w-full p-2 border border-purple-700 rounded-md"
          placeholder="Enter y values separated by space..."
          value={yValuesInput}
          onChange={(e) => setYValuesInput(e.target.value)}
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
          onClick={calculateInterpolation}
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
      {(result && xValuesInput && yValuesInput && hValue && interpolationPointInput &&
        [result, xValuesInput, yValuesInput, hValue, interpolationPointInput].every(val => !isNaN(parseFloat(val)))) ? (
        <div className="interpolation-method mt-4 px-5 py-2 rounded-lg bg-white overflow-auto">
          <div className="mt-4">
            <p className="mb-2"><strong>The value of table for x and y:</strong></p>
            <table className="border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2 font-bold">x</th>
                  {xValuesInput.trim().replace(/,/g, '').split(/\s+/).map((x, index) => (
                    <th key={`x-${index}`} className="border border-gray-400 font-normal p-2">{x}</th>
                  ))}
                </tr>
                <tr>
                  <th className="border border-gray-400 p-2 font-bold">y</th>
                  {yValuesInput.trim().replace(/,/g, '').split(/\s+/).map((y, index) => (
                    <td key={`y-${index}`} className="border border-gray-400 font-normal p-2">{y}</td>
                  ))}
                </tr>
              </thead>
            </table>

            <div className="table mt-4">
              <h3 className="font-bold mb-2">Interpolation Table</h3>
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
                  {xValuesInput.trim().replace(/,/g, '').split(/\s+/).map((x, index) => (
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

              <div className="result mt-4">
                <label className="block mb-1"><strong>h</strong> (Step Size / Interval)</label>
                <p>h = x₁ - x₀ = {x[x0Index+1]} - {x[x0Index]} = <span className='font-bold'>{hValue}</span></p>
              </div>
              <div className="result mt-4">
                <p>p =
                  <Fraction numerator={"x - x₀"} denominator={"h"} addEquals />
                  <Fraction numerator={`${interpolationPointInput} - ${x[x0Index]}`} denominator={hValue} addEquals />
                  <span className='font-bold'>{pValue}</span>
                </p>
              </div>
            </div>
            <div className="result mt-4">
              <label className="block mb-1"><strong>Newton Forward Difference</strong></label>
              <p className="text-sm font-semibold">Formula</p>
              <p className='text-xs mb-3'>
                {"y₀ + "}
                <Fraction numerator={"p"} denominator={"1!"} /> {" (△y₀) + "}
                <Fraction numerator={"p (p - 1)"} denominator={"2!"} /> {" (△²y₀) + "}
                <Fraction numerator={"p (p - 1) (p - 2)"} denominator={"3!"} /> {" (△³y₀) ..."}
              </p>
              <p className="text-sm font-semibold">Substituted Values</p>
              <p className='text-sm'>
                {y[x0Index]}
                {tableData.map((row, index) => {
                  if (index === 0 || row[nearestIndex] == null) return null;
                  return (
                    <>
                      {" + "}
                      <Fraction
                        key={index}
                        numerator={`${generateTermProduct(pValue, index)} (${row[nearestIndex]})`}
                        denominator={Factorial(index)}
                      />
                    </>
                  );
                })}
              </p>
              <label className="block mb-1 font-bold">Result:</label>
              <span className="font-bold text-lg text-red-500 rounded-md border-2 border-red-500 p-2 py-0">{result}</span>
            </div>
            <div className="mt-8">
              <label className="font-semibold mb-4">Interpolation Graph</label>
              <LineChart
                width={300}
                height={300}
                data={graphData}
                margin={{ top: 26, right: 15, left: 0, bottom: 26 }}
              >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="x" label={{ value: 'X Values', position: 'insideBottom', offset: -10 }} />
                <YAxis label={{ value: 'Y Values', angle: -90, position: 'insideLeft', offset: 10 }} />
                <Tooltip formatter={(value, name, props) => {
                  if (props.payload.Interpolated) {
                    return `${props.payload.y}`;
                  } else {
                    return `${value}`;
                  }
                }} />
                <Line type="monotone" dataKey="y" stroke="black" strokeWidth={1} dot={{ fill: "black" }} activeDot={{ r: 5, fill: "red" }} />
                <Line type="monotone" dataKey="Interpolated" stroke="red" strokeWidth={1} dot={{ fill: "red" }} activeDot={{ r: 5 }} />
              </LineChart>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-red-800 font-bold underline">
          {error}
        </div>
      )}
    </>
  );
}

export default NewtonForward
