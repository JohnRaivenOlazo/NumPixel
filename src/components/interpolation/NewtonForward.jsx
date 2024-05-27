import React, { useState, useEffect } from 'react';
import Fraction from '../utils/Fraction'
import { Factorial } from '../utils/Calculations';
import { validateInputs } from '../utils/Validation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const NewtonForward = () => {
  const [xInput, setXInput] = useState('');
  const [yInput, setYInput] = useState('');
  const [interpolationPointInput, setInterpolationPointInput] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [result, setResult] = useState('');

  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [x0, setX0] = useState('');
  const [table, setTable] = useState([]);
  const [graph, setgraph] = useState([]);
  const [hValue, setHValue] = useState('');
  const [pValue, setPValue] = useState('');
  
  const [error, setError] = useState('');
  const isError = validateInputs(xInput, yInput, interpolationPointInput, x, y);
  
  const [superscript] = useState(["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]);

  useEffect(() => {
    if (result) {
      let interpolation = document.querySelector(".interpolation-method, .error");
      if (interpolation) {
        interpolation.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [result]);

  useEffect(() => {
    if (xInput && yInput && interpolationPointInput) {
      const xArray = xInput.trim().replace(/,/g, '').split(/\s+/).map(Number);
      const yArray = yInput.trim().replace(/,/g, '').split(/\s+/).map(Number);

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
      setgraph(data);
    }
  }, [xInput, yInput, interpolationPointInput, result]);


  const getSuperscript = (number) => {
    const digits = number.toString().split('').map(digit => parseInt(digit));
    let result = '';
    for (let digit of digits) {
      result += superscript[digit];
    }
    return result;
  };

  const calculate = () => {
    if (isError) {
      setError(isError);
      setTable([]);
    }

    const xArray = xInput.trim().replace(/,/g, '').split(/\s+/).map(Number);
    const yArray = yInput.trim().replace(/,/g, '').split(/\s+/).map(Number);
    const interpolationPoint = parseFloat(interpolationPointInput.replace(/,/g, ''));


    let x0 = 0;
    for (let i = 1; i < xArray.length; i++) {
      if (interpolationPoint < xArray[i]) {
        x0 = i - 1;
        break;
      }
    }

    const table = [[...yArray.map(val => val)]];
    for (let i = 1; i <= xArray.length - 1; i++) {
      const newRow = [];
      for (let j = 0; j < table[i - 1].length - 1; j++) {
        newRow.push((table[i - 1][j + 1] - table[i - 1][j]).toFixed(decimalPlaces));
      }
      table.push(newRow);
    }

    const h = xArray[x0 + 1] - xArray[x0];
    const p = (interpolationPoint - xArray[x0]) / h;

    let interpolatedValue = yArray[x0];
    let term = 0;

    for (let i = 1; i < table.length; i++) {
      if (table.length > i && table[i][x0] != null) {
        let product = 1;
        for (let j = 0; j < i; j++) {
          product *= (p - j);
        }
        term += parseFloat(table[i][x0]) * product / Factorial(i);
      } else {
        break;
      }
    }

    interpolatedValue += term;

    setX(xArray);
    setY(yArray);
    setTable(table);
    setX0(x0);
    setHValue(h.toFixed(decimalPlaces));
    setPValue(p.toFixed(decimalPlaces));
    setResult(interpolatedValue.toFixed(decimalPlaces));
  };

  const substitutedValues = (pValue, n) => {
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
          value={xInput}
          onChange={(e) => setXInput(e.target.value)}
        />
      </div>
      <div className="input-container mb-4">
        <label className="block mb-1 font-bold italic">y or f(x) Values:</label>
        <input
          type="text"
          className="w-full p-2 border border-purple-700 rounded-md"
          placeholder="Enter y values separated by space..."
          value={yInput}
          onChange={(e) => setYInput(e.target.value)}
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
          onClick={calculate}
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
      {isError ? (
        <div className="error text-red-800 font-bold underline">
          {error}
        </div>
      ) : (
        <div className="interpolation-method mt-4 px-5 py-2 rounded-lg bg-white overflow-auto">
          <div className="mt-4">
            <label className="block mb-1"><strong>Newton Forward Difference</strong></label>
            <div className="table mt-4">
              <h3 className="font-bold mb-2">Interpolation table</h3>
              <table className="border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2">x</th>
                    <th className="border border-gray-400 p-2">y</th>
                    <th className="border border-gray-400 p-2">△y</th>
                    {Array.from({ length: table[0].length - 2 }, (_, index) => (
                      <th key={`difference-${index}`} className="border border-gray-400 p-2">{`△${getSuperscript(2 + index)}y`}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {xInput.trim().replace(/,/g, '').split(/\s+/).map((x, index) => (
                    <tr key={`row-x-${index}`}>
                      <td className="border border-gray-400 p-2">{x}</td>
                      {table.map((row, rowIndex) => (
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
                <p><strong className="text-lg">h</strong> = x₁ - x₀</p>
                <p><strong className="text-lg">h</strong> = {x[x0 + 1]} - {x[x0]} = <span className='font-bold'>{hValue}</span></p>
              </div>
              <div className="result mt-4 text-sm">
                <p><strong className="text-lg">p</strong> =
                  <Fraction numerator={"x - x₀"} denominator={"h"} />
                </p>
                <p className="result text-sm"><strong className="text-lg">p</strong> =
                  <Fraction numerator={`${interpolationPointInput} - ${x[x0]}`} denominator={hValue} addEquals />
                  <span className='font-bold'>{pValue}</span>
                </p>
              </div>
            </div>
            <div className="result mt-4">
              <p className="text-sm font-semibold">Formula</p>
              <p className="bg-gray-100 text-sm p-4 rounded-lg shadow-lg mb-4">
                {"y₀ + "}
                <Fraction numerator={"p"} denominator={"1!"} /> {" (△y₀) + "}
                <Fraction numerator={"p (p - 1)"} denominator={"2!"} /> {" (△²y₀) + "}
                <Fraction numerator={"p (p - 1) (p - 2)"} denominator={"3!"} /> {" (△³y₀) ..."}
              </p>
              <p className="text-sm font-semibold">Substituted Values</p>
              <p className='text-sm'>
                {y[x0]}
                {table.map((row, index) => {
                  if (index === 0 || row[x0] == null) return null;
                  return (
                    <>
                      {" + "}
                      <Fraction
                        key={index}
                        numerator={`${substitutedValues(pValue, index)} (${row[x0]})`}
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
                data={graph}
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
      )}
    </>
  );
}

export default NewtonForward
