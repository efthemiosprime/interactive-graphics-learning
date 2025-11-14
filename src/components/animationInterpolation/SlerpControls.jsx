import React from 'react';

const SlerpControls = ({ start, setStart, end, setEnd }) => {
  const handleVectorChange = (vector, axis, value) => {
    const setter = vector === 'start' ? setStart : setEnd;
    setter(prev => ({
      ...prev,
      [axis]: parseFloat(value)
    }));
  };

  const normalize = (v) => {
    const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return len > 0 ? { x: v.x / len, y: v.y / len, z: v.z / len } : v;
  };

  const startMag = Math.sqrt(start.x * start.x + start.y * start.y + start.z * start.z);
  const endMag = Math.sqrt(end.x * end.x + end.y * end.y + end.z * end.z);

  return (
    <div className="space-y-4">
      <div className="bg-purple-50 p-3 rounded-lg">
        <h3 className="text-sm font-semibold text-purple-900 mb-3">Start Vector</h3>
        <div className="space-y-2">
          {['x', 'y', 'z'].map((axis) => (
            <div key={axis}>
              <label className="block text-xs text-gray-600 mb-1">
                {axis.toUpperCase()}: {start[axis].toFixed(2)}
              </label>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={start[axis]}
                onChange={(e) => handleVectorChange('start', axis, e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Magnitude: {startMag.toFixed(3)}</p>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 mb-3">End Vector</h3>
        <div className="space-y-2">
          {['x', 'y', 'z'].map((axis) => (
            <div key={axis}>
              <label className="block text-xs text-gray-600 mb-1">
                {axis.toUpperCase()}: {end[axis].toFixed(2)}
              </label>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={end[axis]}
                onChange={(e) => handleVectorChange('end', axis, e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Magnitude: {endMag.toFixed(3)}</p>
      </div>

      <div className="bg-green-50 p-3 rounded-lg text-xs text-gray-700">
        <p className="font-semibold mb-1">Note:</p>
        <p>SLERP works best with unit vectors. Vectors will be normalized automatically.</p>
      </div>
    </div>
  );
};

export default SlerpControls;

