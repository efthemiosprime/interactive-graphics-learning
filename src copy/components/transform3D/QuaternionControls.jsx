import React from 'react';

const QuaternionControls = ({ quaternion, setQuaternion }) => {
  const handleQuaternionChange = (component, value) => {
    setQuaternion(prev => ({
      ...prev,
      [component]: parseFloat(value)
    }));
  };

  const magnitude = Math.sqrt(
    quaternion.w * quaternion.w +
    quaternion.x * quaternion.x +
    quaternion.y * quaternion.y +
    quaternion.z * quaternion.z
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          W (scalar): {quaternion.w.toFixed(3)}
        </label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={quaternion.w}
          onChange={(e) => handleQuaternionChange('w', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          X (i component): {quaternion.x.toFixed(3)}
        </label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={quaternion.x}
          onChange={(e) => handleQuaternionChange('x', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Y (j component): {quaternion.y.toFixed(3)}
        </label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={quaternion.y}
          onChange={(e) => handleQuaternionChange('y', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Z (k component): {quaternion.z.toFixed(3)}
        </label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={quaternion.z}
          onChange={(e) => handleQuaternionChange('z', e.target.value)}
          className="w-full"
        />
      </div>

      <div className="bg-purple-50 p-3 rounded-lg text-sm text-gray-700">
        <p className="font-semibold mb-1">Quaternion:</p>
        <p>q = [{quaternion.w.toFixed(3)}, {quaternion.x.toFixed(3)}, {quaternion.y.toFixed(3)}, {quaternion.z.toFixed(3)}]</p>
        <p className="mt-2">Magnitude: {magnitude.toFixed(3)}</p>
        {Math.abs(magnitude - 1.0) < 0.1 ? (
          <p className="text-green-600 mt-1">✓ Unit Quaternion</p>
        ) : (
          <p className="text-orange-600 mt-1">⚠ Not normalized (should be 1.0)</p>
        )}
      </div>
    </div>
  );
};

export default QuaternionControls;

