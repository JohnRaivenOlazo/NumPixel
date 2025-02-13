import React, { useState, useEffect } from "react";
import {
  InputForm,
  InterpolationTitle,
  Error,
  InterpolationGraph,
  Result,
  HPValues,
} from "../common";
import { Fraction, Factorial, Superscript, ValidateInputs } from "../utils";
import { scrollOnCondition, updateGraph } from "../hooks";

const NewtonBackward = () => {
  const [xInput, setXInput] = useState("");
  const [yInput, setYInput] = useState("");
  const [interpolationPointInput, setInterpolationPointInput] = useState("");
  const [decimalPlaces, setDecimalPlaces] = useState(0);
  const [result, setResult] = useState("");

  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [x0, setX0] = useState("");
  const [xn, setXn] = useState("");
  const [table, setTable] = useState([]);
  const [graph, setGraph] = useState([]);
  const [hValue, setHValue] = useState("");
  const [pValue, setPValue] = useState("");

  const [error, setError] = useState("");
  const isError = ValidateInputs(xInput, yInput, interpolationPointInput, x, y);

  scrollOnCondition(result, ".interpolation-method, .error");
  updateGraph(xInput, yInput, interpolationPointInput, result, setGraph);

  const calculate = () => {
    if (isError) {
      setError(isError);
      setTable([]);
    }

    const xArray = xInput.trim().replace(/,/g, "").split(/\s+/).map(Number);
    const yArray = yInput.trim().replace(/,/g, "").split(/\s+/).map(Number);
    const interpolationPoint = parseFloat(
      interpolationPointInput.replace(/,/g, "")
    );

    let x0 = 0;
    for (let i = 1; i < xArray.length; i++) {
      if (interpolationPoint < xArray[i]) {
        x0 = i - 1;
        break;
      }
    }

    let xn = 0;
    for (let i = xArray.length - 1; i > 0; i--) {
      if (
        interpolationPoint <= xArray[i] &&
        interpolationPoint > xArray[i - 1]
      ) {
        xn = i;
        break;
      }
    }

    const table = [[...yArray.map((val) => val)]];
    for (let i = 1; i <= xArray.length - 1; i++) {
      const newRow = [];
      for (let j = 0; j < table[i - 1].length - 1; j++) {
        newRow.push(
          (table[i - 1][j + 1] - table[i - 1][j]).toFixed(decimalPlaces)
        );
      }
      table.push(newRow);
    }

    const h = xArray[x0 + 1] - xArray[x0];
    const p = (interpolationPoint - xArray[xn]) / h;

    let interpolatedValue = yArray[xn];
    let term = 0;

    for (let i = 1; i < table.length; i++) {
      if (table.length > i && table[i][xn - i] != null) {
        let product = 1;
        for (let j = 0; j < i; j++) {
          product *= p + j;
        }
        term += (parseFloat(table[i][xn - i]) * product) / Factorial(i);
      } else {
        break;
      }
    }

    interpolatedValue += term;

    setX(xArray);
    setY(yArray);
    setTable(table);
    setX0(x0);
    setXn(xn);
    setHValue(h.toFixed(decimalPlaces));
    setPValue(p.toFixed(decimalPlaces));
    setResult(interpolatedValue.toFixed(decimalPlaces));
  };

  return (
    <>
      <InterpolationTitle title="Newton's Backward" />
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
        <div className="interpolation-method mt-4 px-5 py-2 rounded-lg bg-gray-800 text-white overflow-auto">
          <div className="mt-4">
            <label className="block mb-1">
              <strong>Newton Backward Difference</strong>
            </label>
            <h3 className="font-bold mb-2">Difference Table:</h3>
            <table className="border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 p-2">x</th>
                  <th className="border border-gray-600 p-2">y</th>
                  <th className="border border-gray-600 p-2">∇y</th>
                  {Array.from({ length: table[0].length - 2 }, (_, index) => (
                    <th
                      key={`difference-${index}`}
                      className="border border-gray-600 p-2"
                    >
                      ∇<Superscript number={2 + index} />y
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {x.map((x, index) => (
                  <tr key={index}>
                    <td className="border border-gray-600 p-2">{x}</td>
                    {table.map((row, rowIndex) => (
                      <td key={rowIndex} className="border border-gray-600 p-2">
                        {row[index]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <HPValues
              hValue={hValue}
              pValue={pValue}
              x0={x0}
              x={x}
              interpolationPointInput={interpolationPointInput}
            />
          </div>
          {result && (
            <div className="result mt-4">
              <label className="block mb-1">
                <strong>Backward Difference</strong>
              </label>
              <p className="text-sm font-semibold">Formula</p>
              <p className="text-xs mb-3">
                {"yₙ + "}
                <div className="fraction">
                  <span>p</span>
                  <span>1!</span>
                </div>
                {" (∇yₙ) + "}
                <div className="fraction">
                  <span>p (p + 1)</span>
                  <span>2!</span>
                </div>
                {" (∇²yₙ) + "}
                <div className="fraction">
                  <span>p (p + 1) (p + 2)</span>
                  <span>3!</span>
                </div>
                {" (∇³yₙ) ..."}
              </p>
              <p className="text-sm font-semibold">Substituted Values</p>
              <p className="text-sm">
                {y[xn]}
                {table.length > 1 && table[1][xn - 1] != null && (
                  <>
                    {" + "}
                    <div className="fraction">
                      <span>
                        {pValue} ({table[1][xn - 1]})
                      </span>
                      <span>1</span>
                    </div>
                  </>
                )}
                {table.length > 2 && table[2][xn - 2] != null && (
                  <>
                    {" + "}
                    <div className="fraction">
                      <span>
                        {pValue} ({pValue} + 1) ({table[2][xn - 2]})
                      </span>
                      <span>2</span>
                    </div>
                  </>
                )}
                {table.length > 3 && table[3][xn - 3] != null && (
                  <>
                    {" + "}
                    <div className="fraction">
                      <span>
                        {pValue} ({pValue} + 1) ({pValue} + 2) (
                        {table[3][xn - 3]})
                      </span>
                      <span>6</span>
                    </div>
                  </>
                )}
                {table.length > 4 && table[4][xn - 4] != null && (
                  <>
                    {" + "}
                    <div className="fraction">
                      <span>
                        {pValue} ({pValue} + 1) ({pValue} + 2) ({pValue} + 3) (
                        {table[4][xn - 4]})
                      </span>
                      <span>24</span>
                    </div>
                  </>
                )}
                {table.length > 5 && table[5][xn - 5] != null && (
                  <>
                    {" + "}
                    <div className="fraction">
                      <span>
                        {pValue} ({pValue} + 1) ({pValue} + 2) ({pValue} + 3) (
                        {pValue} + 4) {table[5][xn - 5]}
                      </span>
                      <span>120</span>
                    </div>
                  </>
                )}
              </p>
              <Result
                result={result}
                interpolationPointInput={interpolationPointInput}
              />
              <InterpolationGraph graph={graph} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NewtonBackward;
