import React, { useState, useEffect } from 'react';
import { InputForm, InterpolationTitle, Error, InterpolationGraph, Result, HPValues } from '../common';
import { Fraction, Factorial, Superscript, validateInputs } from '../utils';
import { scrollOnCondition, updateGraph } from '../hooks';

// if (table[1] && table[1][x0 - 0] && table[1][x0 - 1] != null) {
//   termCoefficient = p / Factorial(1);
//   interpolatedValue += termCoefficient * (parseFloat(table[1][x0]) + parseFloat(table[1][x0 - 1]) / 2);
// }
// if (table[2] && table[2][x0 - 1] != null) {
//   termCoefficient = p**2 / Factorial(2);
//   interpolatedValue += termCoefficient * parseFloat(table[2][x0 - 1]);
// }
// if (table[3] && table[3][x0 - 1] && table[3][x0 - 2] != null) {
//   termCoefficient = p * (p**2 - 1**2) / Factorial(3);
//   interpolatedValue += termCoefficient * parseFloat(table[3][x0 - 1]) + parseFloat(table[3][x0 - 2]) / 2;
// }
// if (table[4] && table[4][x0 - 2] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) / Factorial(4);
//   interpolatedValue += termCoefficient * parseFloat(table[4][x0 - 2]);
// }
// if (table[5] && table[5][x0 - 2] && table[5][x0 - 3] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) / Factorial(5);
//   interpolatedValue += termCoefficient * parseFloat(table[5][x0 - 2]) + parseFloat(table[5][x0 - 3]) / 2;
// }
// if (table[6] && table[6][x0 - 3] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) / Factorial(6);
//   interpolatedValue += termCoefficient * parseFloat(table[6][x0 - 3]);
// }
// if (table[7] && table[7][x0 - 3] && table[7][x0 - 4] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) * (p**2 - 3**2) / Factorial(7);
//   interpolatedValue += termCoefficient * parseFloat(table[7][x0 - 3]) + parseFloat(table[7][x0 - 4]) / 2;
// }
// if (table[8] && table[8][x0 - 4] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) * (p**2 - 3**2) / Factorial(8);
//   interpolatedValue += termCoefficient * parseFloat(table[8][x0 - 4]);
// }

const StirlingInterpolation = () => {
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

    for (let term = 1; term < table.length; term++) {
      if (table.length > term && table[term][x0] != null) {
      if (term % 2 === 1) {
        if (table[term] && table[term][x0 - (term - 1)] && table[term][x0 - term] != null) {
          let termCoefficient = p;

          for (let i = 1; i < term; i++) {
            termCoefficient *= (p ** 2 - i ** 2);
          }
          termCoefficient /= Factorial(term);
          let termValue = (parseFloat(table[term][x0 - (term - 1)]) + parseFloat(table[term][x0 - term])) / 2;
          interpolatedValue += termCoefficient * termValue;
        }
      } else {
        if (table[term] && table[term][x0 - (term - 1)] != null) {
          let termCoefficient = p ** 2;
          for (let i = 2; i < term; i++) {
            termCoefficient *= (p ** 2 - i ** 2);
          }
          termCoefficient /= Factorial(term);
          let termValue = parseFloat(table[term][x0 - (term - 1)]);
          interpolatedValue += termCoefficient * termValue;
        }
      }}else{
        break;
      }
    }

    setX(xArray);
    setY(yArray);
    setX0(x0);
    setHValue(h.toFixed(decimalPlaces));
    setPValue(p.toFixed(decimalPlaces));
    setResult(interpolatedValue.toFixed(decimalPlaces));
    setTable(table);
  };

  return (
    <>
      <InterpolationTitle title="Stirling" />
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
            <label className="block mb-1"><strong>Stirling Interpolation</strong></label>
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
            <div className="table mt-4">
              <h3 className="font-bold mb-2">Difference table</h3>
              <table className="border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2">x</th>
                    <th className="border border-gray-400 p-2">y</th>
                    <th className="border border-gray-400 p-2">△y</th>
                    {Array.from({ length: table[0].length - 2 }, (_, index) => (
                      <th key={`difference-${index}`} className="border border-gray-400 p-2">{`△`}<Superscript number={2 + index} />{'y'}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {xInput.replace(/,/g, '').split(/\s+/).map((x, index) => (
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
            </div>
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
                {y[x0]}
                {table[1] && table[1][x0] && table[1][x0 - 1] != null && (
                  <>
                    {" +"}
                    <Fraction numerator={`${pValue}`} denominator={Factorial(1)} />
                    <Fraction numerator={`(${table[1][x0]} + ${table[1][x0 - 1]})`} denominator={"2"} />
                  </>
                )}
                {table[2] && table[2][x0 - 1] != null && (
                  <>
                    {" +"}
                    <Fraction numerator={`${pValue}²`} denominator={Factorial(2)} />
                    {` (${table[2][x0 - 1]})`}
                  </>
                )}
                {table[3] && table[3][x0 - 1] && table[3][x0 - 2] != null && (
                  <>
                    {" +"}
                    <Fraction numerator={`${pValue}(${pValue}²-1²)`} denominator={Factorial(3)} />
                    <Fraction numerator={`(${table[3][x0 - 1]} + ${table[3][x0 - 2]})`} denominator={"2"} />
                  </>
                )}
                {table[4] && table[4][x0 - 2] != null && (
                  <>
                    {" +"}
                    <Fraction numerator={`${pValue}(${pValue}²-1²)`} denominator={Factorial(4)} />
                    {` (${table[4][x0 - 2]})`}
                  </>
                )}
                {table[5] && table[5][x0 - 2] && table[5][x0 - 3] != null && (
                  <>
                    {" +"}
                    <Fraction numerator={`${pValue}(${pValue}²-1²)(${pValue}²-2²)`} denominator={Factorial(5)} />
                    <Fraction numerator={`(${table[5][x0 - 2]} + ${table[5][x0 - 3]})`} denominator={"2"} />
                  </>
                )}
                {table[6] && table[6][x0 - 3] != null && (
                  <>
                    {" +"}
                    <Fraction numerator={`${pValue}(${pValue}²-1²)(${pValue}²-2²)`} denominator={Factorial(6)} />
                    {` (${table[6][x0 - 3]})`}
                  </>
                )}
                {table[7] && table[7][x0 - 3] && table[7][x0 - 4] != null && (
                  <>
                    <span> ... </span>
                  </>
                )}
              </div>
              <Result result={result} interpolationPointInput={interpolationPointInput} />
              <InterpolationGraph graph={graph} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StirlingInterpolation
