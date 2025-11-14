import React from 'react';

const HermiteControls = ({ points, setPoints, tangents, setTangents }) => {
  const handlePointChange = (index, axis, value) => {
    const newPoints = [...points];
    newPoints[index] = {
      ...newPoints[index],
      [axis]: parseFloat(value)
    };
    setPoints(newPoints);
  };

  const handleTangentChange = (index, axis, value) => {
    const newTangents = [...tangents];
    newTangents[index] = {
      ...newTangents[index],
      [axis]: parseFloat(value)
    };
    setTangents(newTangents);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">End Points</h3>
        {points.map((point, index) => (
          <div key={index} className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-purple-900 mb-2">P{index}</p>
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

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Tangent Vectors</h3>
        {tangents.map((tangent, index) => (
          <div key={index} className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs font-semibold text-blue-900 mb-2">T{index}</p>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  X: {tangent.x.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.01"
                  value={tangent.x}
                  onChange={(e) => handleTangentChange(index, 'x', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Y: {tangent.y.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.01"
                  value={tangent.y}
                  onChange={(e) => handleTangentChange(index, 'y', e.target.value)}
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

export default HermiteControls;

