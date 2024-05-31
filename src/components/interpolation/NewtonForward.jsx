import React, { useState, useEffect } from 'react';
import Fraction from '../utils/Fraction'
import { Factorial, Superscript } from '../utils/Calculations';
import { validateInputs } from '../utils/Validation';
import InputForm from '../common/InputForm';
import InterpolationTitle from '../common/InterpolationTitle';
import Error from '../common/Error';
import scrollOnCondition from '../hooks/scrollOnCondition';
import updateGraph from '../hooks/updateGraph';
import InterpolationGraph from '../common/InterpolationGraph';
import Result from '../common/Result';

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
  const [graph, setGraph] = useState([]);
  const [hValue, setHValue] = useState('');
  const [pValue, setPValue] = useState('');

  const [error, setError] = useState('');
  const isError = validateInputs(xInput, yInput, interpolationPointInput, x, y);

  scrollOnCondition(result, ".interpolation-method, .error");
  updateGraph(xInput, yInput, interpolationPointInput, result, setGraph);

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
      <InterpolationTitle title="Newton's Forward" />
      <InputForm
        xInput={xInput}
        setXInput={setXInput}
        yInput={yInput}
        setYInput={setYInput}
        interpolationPointInput={interpolationPointInput}
        setInterpolationPointInput={setInterpolationPointInput}
        decimalPlaces={decimalPlaces}
        setDecimalPlaces={setDecimalPlaces}
        calculate={calculate}
      />
      {isError ? (
        <Error error={error} />
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
                      <th key={`difference-${index}`} className="border border-gray-400 p-2">
                        {`△`}<Superscript number={2 + index} />{'y'}
                      </th>
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
            </div>
            <Result result={result} interpolationPointInput={interpolationPointInput} />
            <InterpolationGraph graph={graph} />
          </div>
        </div>
      )}
    </>
  );
}

export default NewtonForward
