import React, { useState } from 'react';
import { validateInputs } from '../utils/Validation';
import Error from '../common/Error';
import InputForm from '../common/InputForm';
import InterpolationTitle from '../common/InterpolationTitle';
import { Superscript } from '../utils/Calculations';
import Result from '../common/Result';
import scrollOnCondition from '../hooks/scrollOnCondition';
import updateGraph from '../hooks/updateGraph';
import InterpolationGraph from '../common/InterpolationGraph';

const NewtonDivided = () => {
  const [xInput, setXInput] = useState('');
  const [yInput, setYInput] = useState('');
  const [interpolationPointInput, setInterpolationPointInput] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [result, setResult] = useState('');
  
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [table, setTable] = useState([]);
  const [graph, setGraph] = useState([]);

  const [error, setError] = useState('');
  const isError = validateInputs(xInput, yInput, interpolationPointInput, x, y);

  scrollOnCondition(result, ".interpolation-method, .error");
  updateGraph(xInput, yInput, interpolationPointInput, result, setGraph);

  const calculate = () => {
    if (isError) {
      setError(isError);
      setTable([]);
    }

    const xArray = xInput.replace(/,/g, '').split(/\s+/).map(Number);
    const yArray = yInput.replace(/,/g, '').split(/\s+/).map(Number);
    const interpolationPoint = parseFloat(interpolationPointInput.replace(/,/g, ''));

    const table = [];
    for (let i = 0; i < yArray.length; i++) {
      table.push([xArray[i], yArray[i]]);
    }

    for (let j = 1; j < yArray.length; j++) {
      for (let i = 0; i < yArray.length - j; i++) {
        table[i].push((table[i + 1][j] - table[i][j]) / (table[i + j][0] - table[i][0]));
      }
    }

    let interpolatedValue = table[0][1];
    let term = 1;
    for (let i = 1; i < xArray.length; i++) {
      term *= (interpolationPoint - table[i - 1][0]);
      interpolatedValue += term * table[0][i + 1];
    }

    setX(xArray);
    setY(yArray);
    setTable(table);
    setResult(interpolatedValue.toFixed(decimalPlaces));
  };

  const renderSubstitutedValues = () => {
    if (table.length === 0) return null;

    const order = table[0].length - 2;
    let substitutedValues = `${y[0]} + `;

    for (let i = 1; i <= order; i++) {
      const term = table[0][i + 1].toFixed(decimalPlaces);
      const factors = xInput
        .replace(/,/g, '')
        .split(/\s+/)
        .slice(0, i)
        .map((x) => `(${interpolationPointInput} - ${x})`)
        .join('');

      substitutedValues += term !== 0 ? `${factors} * [${term}]` : '0';
      if (i !== order) substitutedValues += ' + ';
    }

    return substitutedValues;
  };

  return (
    <>
      <InterpolationTitle title="Newton's Divided" />
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
            <label className="block mb-1"><strong>Newton Backward Difference</strong></label>
            <h3 className="font-bold mb-2">Difference Table</h3>
            <table className="border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">x</th>
                  <th className="border border-gray-400 p-2">y</th>
                  <th className="border border-gray-400 p-2">△y</th>
                  {Array.from({ length: table[0].length - 3 }, (_, index) => (
                    <th key={`difference-${index}`} className="border border-gray-400 p-2">{`△`}<Superscript number={2 + index} />{'y'}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.map((row, rowIndex) => (
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
          <div className="result mt-4">
            <label className="block mb-1"><strong>Newton Divided Difference</strong></label>
            <p className="text-sm font-semibold">Formula</p>
            <p>f(x) = y₀ + (x-x₀) [x₀x₁] + (x-x₀)(x-x₁) [x₀x₁x₂] ...</p>
          </div>
          <div className="result mt-4">
            <p className="text-sm font-semibold">Substituted Values</p>
            {renderSubstitutedValues()}
          </div>
          <Result result={result} interpolationPointInput={interpolationPointInput} />
          <InterpolationGraph graph={graph} />
        </div>
      )}
    </>
  );
};

export default NewtonDivided
