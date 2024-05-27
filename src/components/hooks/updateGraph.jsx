import { useEffect } from 'react';

const updateGraph = (xInput, yInput, interpolationPointInput, result, setGraph) => {
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
      setGraph(data);
    }
  }, [xInput, yInput, interpolationPointInput, result, setGraph]);
};

export default updateGraph
