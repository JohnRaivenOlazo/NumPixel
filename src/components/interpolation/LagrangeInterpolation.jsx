import React, { useState } from 'react';
import Fraction from '../utils/Fraction';
import { validateInputs } from '../utils/Validation';
import Result from '../common/Result';
import InterpolationTitle from '../common/InterpolationTitle';
import InputForm from '../common/InputForm';
import scrollOnCondition from '../hooks/scrollOnCondition';
import updateGraph from '../hooks/updateGraph';
import InterpolationGraph from '../common/InterpolationGraph';
import Error from '../common/Error';

const LagrangeInterpolation = () => {
  const [xInput, setXInput] = useState('');
  const [yInput, setYInput] = useState('');
  const [interpolationPointInput, setInterpolationPointInput] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [result, setResult] = useState('');
  const [resultFormula, setResultFormula] = useState('');

  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [graph, setGraph] = useState([]);

  const [error, setError] = useState('');
  const isError = validateInputs(xInput, yInput, interpolationPointInput, x, y);

  scrollOnCondition(result, ".interpolation-method, .error");
  updateGraph(xInput, yInput, interpolationPointInput, result, setGraph);

  const calculate = () => {
    if (isError) {
      setError(isError);
    }

    const xArray = xInput.trim().replace(/,/g, '').split(/\s+/).map(Number);
    const yArray = yInput.trim().replace(/,/g, '').split(/\s+/).map(Number);
    const interpolationPoint = parseFloat(interpolationPointInput.replace(/,/g, ''));

    let interpolatedValue = 0;
    for (let i = 0; i < xArray.length; i++) {
      let term = yArray[i];
      for (let j = 0; j < xArray.length; j++) {
        if (j !== i) {
          term *= (interpolationPoint - xArray[j]) / (xArray[i] - xArray[j]);
        }
      }
      interpolatedValue += term;
    }

    let interpolatedValuePrint = [];
    for (let i = 0; i < xArray.length; i++) {
      let term = yArray[i];
      let numerator = [];
      let denominator = [];
      for (let j = 0; j < xArray.length; j++) {
        if (j !== i) {
          numerator.push(`(${interpolationPoint} - ${xArray[j]})`);
          denominator.push(`(${xArray[i]} - ${xArray[j]})`);
        }
      }

      let numeratorStr = numerator.join('') || '1';
      let denominatorStr = denominator.join('') || '1';
      let fraction = <Fraction numerator={numeratorStr} denominator={denominatorStr} />;

      interpolatedValuePrint.push(
        <span key={`term-${i}`}>
          {term} * {fraction}
        </span>
      );
      if (i !== xArray.length - 1) {
        interpolatedValuePrint.push(" + ");
      }
    }

    setX(xArray);
    setY(yArray);
    setResult(interpolatedValue.toFixed(decimalPlaces));
    setResultFormula(interpolatedValuePrint);
  };

  return (
    <>
      <InterpolationTitle title="Lagrange" />
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
            <label className="block mb-1"><strong>Formula</strong></label>
            <p className="text-xs mb-3">
              {"f(x) = y₀ "}
              <Fraction numerator={`(x - x₁)(x - x₂)...(x - xₙ)`} denominator={`(x₀ - x₁)(x₀ - x₂)...(x₀ - xₙ)`} />
              {" + y₁ "}
              <Fraction numerator={`(x - x₀)(x - x₂)...(x - xₙ)`} denominator={`(x₁ - x₀)(x₁ - x₂)...(x₁ - xₙ)`} />
              {" ... "}
            </p>
            <label className="block mb-1 font-bold">Substituted Values</label>
            <div className="interpolated-value-formula">
              {resultFormula.map((element, index) => (
                <span key={`term-${index}`}>
                  {element}
                </span>
              ))}
            </div>
            <Result result={result} interpolationPointInput={interpolationPointInput} />
            <InterpolationGraph graph={graph} />
          </div>
        </div>
      )}
    </>
  );
}

export default LagrangeInterpolation
