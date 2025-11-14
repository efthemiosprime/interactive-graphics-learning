import React from 'react';

const RotationControls = ({ rotation, setRotation, useQuaternions, setUseQuaternions }) => {
  const handleRotationChange = (axis, value) => {
    setRotation(prev => ({
      ...prev,
      [axis]: parseFloat(value)
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="useQuaternions"
          checked={useQuaternions}
          onChange={(e) => setUseQuaternions(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="useQuaternions" className="text-sm font-semibold text-gray-700">
          Use Quaternions (smooth interpolation)
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Rotation X (Pitch): {(rotation.x * 180 / Math.PI).toFixed(1)}°
        </label>
        <input
          type="range"
          min="-180"
          max="180"
          value={rotation.x * 180 / Math.PI}
          onChange={(e) => handleRotationChange('x', e.target.value * Math.PI / 180)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Rotation Y (Yaw): {(rotation.y * 180 / Math.PI).toFixed(1)}°
        </label>
        <input
          type="range"
          min="-180"
          max="180"
          value={rotation.y * 180 / Math.PI}
          onChange={(e) => handleRotationChange('y', e.target.value * Math.PI / 180)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Rotation Z (Roll): {(rotation.z * 180 / Math.PI).toFixed(1)}°
        </label>
        <input
          type="range"
          min="-180"
          max="180"
          value={rotation.z * 180 / Math.PI}
          onChange={(e) => handleRotationChange('z', e.target.value * Math.PI / 180)}
          className="w-full"
        />
      </div>

      <div className="bg-purple-50 p-3 rounded-lg text-sm text-gray-700">
        <p className="font-semibold mb-1">Euler Angles (ZYX order):</p>
        <p>X: {(rotation.x * 180 / Math.PI).toFixed(2)}°</p>
        <p>Y: {(rotation.y * 180 / Math.PI).toFixed(2)}°</p>
        <p>Z: {(rotation.z * 180 / Math.PI).toFixed(2)}°</p>
      </div>
    </div>
  );
};

export default RotationControls;

