import React from 'react';

const LinearInterpolationControls = ({ start, setStart, end, setEnd }) => {
  const handlePointChange = (point, axis, value) => {
    const setter = point === 'start' ? setStart : setEnd;
    setter(prev => ({
      ...prev,
      [axis]: parseFloat(value)
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-purple-50 p-3 rounded-lg">
        <h3 className="text-sm font-semibold text-purple-900 mb-3">Start Point</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              X: {start.x.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={start.x}
              onChange={(e) => handlePointChange('start', 'x', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Y: {start.y.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={start.y}
              onChange={(e) => handlePointChange('start', 'y', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">End Point</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              X: {end.x.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={end.x}
              onChange={(e) => handlePointChange('end', 'x', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Y: {end.y.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={end.y}
              onChange={(e) => handlePointChange('end', 'y', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinearInterpolationControls;

