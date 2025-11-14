import React from 'react';

const PathAnimationControls = ({ points, setPoints, pathType, setPathType }) => {
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
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Path Type
        </label>
        <select
          value={pathType}
          onChange={(e) => setPathType(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg"
        >
          <option value="linear">Linear</option>
          <option value="bezier">Bezier</option>
          <option value="catmullrom">Catmull-Rom</option>
        </select>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Path Points</h3>
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
    </div>
  );
};

export default PathAnimationControls;

