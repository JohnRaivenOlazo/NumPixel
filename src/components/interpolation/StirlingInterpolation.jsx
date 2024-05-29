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

// if (table[1] && table[1][x0Index - 0] && table[1][x0Index - 1] != null) {
//   termCoefficient = p / Factorial(1);
//   interpolatedValue += termCoefficient * (parseFloat(table[1][x0Index]) + parseFloat(table[1][x0Index - 1]) / 2);
// }
// if (table[2] && table[2][x0Index - 1] != null) {
//   termCoefficient = p**2 / Factorial(2);
//   interpolatedValue += termCoefficient * parseFloat(table[2][x0Index - 1]);
// }
// if (table[3] && table[3][x0Index - 1] && table[3][x0Index - 2] != null) {
//   termCoefficient = p * (p**2 - 1**2) / Factorial(3);
//   interpolatedValue += termCoefficient * parseFloat(table[3][x0Index - 1]) + parseFloat(table[3][x0Index - 2]) / 2;
// }
// if (table[4] && table[4][x0Index - 2] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) / Factorial(4);
//   interpolatedValue += termCoefficient * parseFloat(table[4][x0Index - 2]);
// }
// if (table[5] && table[5][x0Index - 2] && table[5][x0Index - 3] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) / Factorial(5);
//   interpolatedValue += termCoefficient * parseFloat(table[5][x0Index - 2]) + parseFloat(table[5][x0Index - 3]) / 2;
// }
// if (table[6] && table[6][x0Index - 3] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) / Factorial(6);
//   interpolatedValue += termCoefficient * parseFloat(table[6][x0Index - 3]);
// }
// if (table[7] && table[7][x0Index - 3] && table[7][x0Index - 4] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) * (p**2 - 3**2) / Factorial(7);
//   interpolatedValue += termCoefficient * parseFloat(table[7][x0Index - 3]) + parseFloat(table[7][x0Index - 4]) / 2;
// }
// if (table[8] && table[8][x0Index - 4] != null) {
//   termCoefficient = p**2 * (p**2 - 1**2) * (p**2 - 2**2) * (p**2 - 3**2) / Factorial(8);
//   interpolatedValue += termCoefficient * parseFloat(table[8][x0Index - 4]);
// }

const StirlingInterpolation = () => {
  const [xInput, setXInput] = useState('');
  const [yInput, setYInput] = useState('');
  const [interpolationPointInput, setInterpolationPointInput] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [result, setResult] = useState('');
  const [hValue, setHValue] = useState('');
  const [pValue, setPValue] = useState('');
  const [table, setTable] = useState([]);
  const [x0, setX0] = useState('');
  const [nearestIndex, setNearestIndex] = useState('');
  const [x1, setX1] = useState('');
  const [y0, setY0] = useState('');
  const [yArray, setYArray] = useState([]); // Define yArray state
  const [interpolationPoint, setInterpolationPoint] = useState('');
  
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  
  const [error, setError] = useState('');
  const isError = validateInputs(xInput, yInput, interpolationPointInput, x, y);

  const calculate = () => {
    if (isError) {
      setError(isError);
      setTable([]);
    }

    const xArray = xInput.replace(/,/g, '').split(/\s+/).map(Number);
    const yArray = yInput.replace(/,/g, '').split(/\s+/).map(Number);
    setYArray(yArray);
    const interpolationPoint = parseFloat(interpolationPointInput.replace(/,/g, ''));

    let x0Index = 0;
    for (let i = 1; i < xArray.length; i++) {
      if (interpolationPoint < xArray[i]) {
        x0Index = i - 1;
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

    const h = xArray[1] - xArray[0];
    const p = (interpolationPoint - xArray[x0Index]) / h;

    let interpolatedValue = yArray[x0Index];

    for (let term = 1; term < table.length; term++) {
      if (term % 2 === 1) {
        if (table[term] && table[term][x0Index - (term - 1)] && table[term][x0Index - term] != null) {
          let termCoefficient = p;

          for (let i = 1; i < term; i++) {
            termCoefficient *= (p ** 2 - i ** 2);
          }
          termCoefficient /= Factorial(term);
          let termValue = parseFloat(table[term][x0Index - (term - 1)]) + parseFloat(table[term][x0Index - term]) / 2;
          interpolatedValue += termCoefficient * termValue;
        }
      } else {
        if (table[term] && table[term][x0Index - (term - 1)] != null) {
          let termCoefficient = p ** 2;
          for (let i = 2; i < term; i++) {
            termCoefficient *= (p ** 2 - i ** 2);
          }
          termCoefficient /= Factorial(term);
          let termValue = parseFloat(table[term][x0Index - (term - 1)]);
          interpolatedValue += termCoefficient * termValue;
        }
      }
    }

    // Setting state
    setX(xArray);
    setY(yArray);
    setHValue(h.toFixed(decimalPlaces));
    setPValue(p.toFixed(decimalPlaces));
    setResult(interpolatedValue.toFixed(decimalPlaces));
    setInterpolationPoint(interpolationPoint);
    setTable(table);
    setNearestIndex(x0Index);
    setX0(xArray[x0Index]);
    setY0(yArray[x0Index]);
    setX1(xArray[x0Index + 1]);
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
            <div className="table mt-4">
              <h3 className="font-bold mb-2">Difference table:</h3>
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
              {`${y0}`}
              {table[1] && table[1][nearestIndex] && table[1][nearestIndex - 1] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}`} denominator={Factorial(1)} />
                  <Fraction numerator={`(${table[1][nearestIndex]} + ${table[1][nearestIndex - 1]})`} denominator={"2"} />
                </>
              )}
              {table[2] && table[2][nearestIndex - 1] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}²`} denominator={Factorial(2)} />
                  {` (${table[2][nearestIndex - 1]})`}
                </>
              )}
              {table[3] && table[3][nearestIndex - 1] && table[3][nearestIndex - 2] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}(${pValue}²-1²)`} denominator={Factorial(3)} />
                  <Fraction numerator={`(${table[3][nearestIndex - 1]} + ${table[3][nearestIndex - 2]})`} denominator={"2"} />
                </>
              )}
              {table[4] && table[4][nearestIndex - 2] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}(${pValue}²-1²)`} denominator={Factorial(4)} />
                  {` (${table[4][nearestIndex - 2]})`}
                </>
              )}
              {table[5] && table[5][nearestIndex - 2] && table[5][nearestIndex - 3] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}(${pValue}²-1²)(${pValue}²-2²)`} denominator={Factorial(5)} />
                  <Fraction numerator={`(${table[5][nearestIndex - 2]} + ${table[5][nearestIndex - 3]})`} denominator={"2"} />
                </>
              )}
              {table[6] && table[6][nearestIndex - 3] != null && (
                <>
                  {" +"}
                  <Fraction numerator={`${pValue}(${pValue}²-1²)(${pValue}²-2²)`} denominator={Factorial(6)} />
                  {` (${table[6][nearestIndex - 3]})`}
                </>
              )}
              {table[7] && table[7][nearestIndex - 3] && table[7][nearestIndex - 4] != null && (
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
    </>
  );
};

export default StirlingInterpolation
