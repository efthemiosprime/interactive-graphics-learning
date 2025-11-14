import React from 'react';

const BezierControls = ({ points, setPoints, degree, setDegree }) => {
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
    
    // Adjust points array to match new degree
    const currentLength = points.length;
    const requiredLength = newDegreeNum + 1;
    
    if (requiredLength > currentLength) {
      // Add new points
      const newPoints = [...points];
      for (let i = currentLength; i < requiredLength; i++) {
        newPoints.push({ x: 0.5, y: 0.5 });
      }
      setPoints(newPoints);
    } else if (requiredLength < currentLength) {
      // Remove excess points
      setPoints(points.slice(0, requiredLength));
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Bezier Degree: {degree}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={degree}
          onChange={(e) => handleDegreeChange(e.target.value)}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Degree {degree} requires {degree + 1} control points
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Control Points</h3>
        {points.map((point, index) => (
          <div key={index} className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-purple-900 mb-2">Point {index + 1} (P{index})</p>
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
    </div>
  );
};

export default BezierControls;

