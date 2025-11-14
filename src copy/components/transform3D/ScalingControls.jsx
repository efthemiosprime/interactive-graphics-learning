import React from 'react';

const ScalingControls = ({ scaling, setScaling }) => {
  const handleScalingChange = (axis, value) => {
    setScaling(prev => ({
      ...prev,
      [axis]: parseFloat(value)
    }));
  };

  const isUniform = scaling.x === scaling.y && scaling.y === scaling.z;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Scale X: {scaling.x.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={scaling.x}
          onChange={(e) => handleScalingChange('x', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Scale Y: {scaling.y.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={scaling.y}
          onChange={(e) => handleScalingChange('y', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Scale Z: {scaling.z.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={scaling.z}
          onChange={(e) => handleScalingChange('z', e.target.value)}
          className="w-full"
        />
      </div>

      <div className="bg-purple-50 p-3 rounded-lg text-sm text-gray-700">
        <p className="font-semibold mb-1">Scale Matrix:</p>
        <p>S = ({scaling.x.toFixed(2)}, {scaling.y.toFixed(2)}, {scaling.z.toFixed(2)})</p>
        {isUniform && (
          <p className="text-green-600 mt-1">✓ Uniform Scaling</p>
        )}
        {!isUniform && (
          <p className="text-orange-600 mt-1">⚠ Non-Uniform Scaling</p>
        )}
      </div>
    </div>
  );
};

export default ScalingControls;

