export const ValidateInputs = (xInput, yInput, interpolationPointInput, x, y) => {
    if (!xInput.trim() && !yInput.trim() && !interpolationPointInput.trim()) {
        return 'You clicked calculate, but no values were entered. Please input the required data.';
    } else if (!xInput.trim()) {
        return 'Error: X values are required. Please enter at least one valid number.';
    } else if (!yInput.trim()) {
        return 'Error: Y values are required. Please enter at least one valid number.';
    } else if (!interpolationPointInput.trim()) {
        return 'Error: Interpolation point is required. Please enter a valid number.';
    } else if (isNaN(parseFloat(interpolationPointInput))) {
        return 'Error: Interpolation point must be a valid number.';
    } else if (x.length !== y.length) {
        return 'Error: Number of X values must be equal to the number of Y values.';
    } else if (x.length < 2) {
        return 'Error: Insufficient data points. Please enter at least two data points for interpolation.';
    }
};
