import React from 'react';

const BSplineControls = ({ points, setPoints, degree, setDegree, knots, setKnots }) => {
  const handlePointChange = (index, axis, value) => {
    const newPoints = [...points];
    newPoints[index] = {
      ...newPoints[index],
      [axis]: parseFloat(value)
    };
    setPoints(newPoints);
  };

  const handleDegreeChange = (newDegree) => {
    const newDegreeNum = parseInt(newDegree);
    setDegree(newDegreeNum);
    // Knot vector will be auto-generated in the visualization
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          B-Spline Degree: {degree}
        </label>
        <input
          type="range"
          min="1"
          max="4"
          value={degree}
          onChange={(e) => handleDegreeChange(e.target.value)}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Degree {degree} B-spline with {points.length} control points
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Control Points</h3>
        {points.map((point, index) => (
          <div key={index} className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-purple-900 mb-2">Point {index + 1}</p>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  X: {point.x.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={point.x}
                  onChange={(e) => handlePointChange(index, 'x', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Y: {point.y.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={point.y}
                  onChange={(e) => handlePointChange(index, 'y', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-3 rounded-lg text-xs text-gray-700">
        <p className="font-semibold mb-1">Knot Vector:</p>
        <p className="font-mono">{knots.map(k => k.toFixed(1)).join(', ')}</p>
        <p className="mt-2 text-gray-600">
          Knot vector length: {knots.length} (n + k + 1, where n = {points.length - 1} control points, k = {degree + 1} degree)
        </p>
      </div>
    </div>
  );
};

export default BSplineControls;

