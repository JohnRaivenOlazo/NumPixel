import React from 'react';
import Fraction from '../utils/Fraction';

const HPValues = ({ hValue, pValue, x0, x, interpolationPointInput }) => {
  return (
    <div className="result mt-4">
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
  );
}

export default HPValues
