import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const InterpolationGraph = ({ graph }) => {
  return (
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
  );
};

export default InterpolationGraph
