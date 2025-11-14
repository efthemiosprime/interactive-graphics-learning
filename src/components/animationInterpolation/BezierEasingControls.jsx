import React from 'react';

const BezierEasingControls = ({ points, setPoints }) => {
  const handlePointChange = (index, axis, value) => {
    const newPoints = [...points];
    newPoints[index] = {
      ...newPoints[index],
      [axis]: parseFloat(value)
    };
    setPoints(newPoints);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Bezier easing uses a cubic Bezier curve to define the easing function.
        Control points define the curve shape.
      </p>
      
      {points.map((point, index) => (
        <div key={index} className="bg-purple-50 p-3 rounded-lg">
          <p className="text-xs font-semibold text-purple-900 mb-2">Control Point {index + 1}</p>
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
  );
};

export default BezierEasingControls;

