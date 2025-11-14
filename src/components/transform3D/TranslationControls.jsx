import React from 'react';

const TranslationControls = ({ translation, setTranslation }) => {
  const handleTranslationChange = (axis, value) => {
    setTranslation(prev => ({
      ...prev,
      [axis]: parseFloat(value)
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Translation X: {translation.x.toFixed(2)}
        </label>
        <input
          type="range"
          min="-5"
          max="5"
          step="0.1"
          value={translation.x}
          onChange={(e) => handleTranslationChange('x', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Translation Y: {translation.y.toFixed(2)}
        </label>
        <input
          type="range"
          min="-5"
          max="5"
          step="0.1"
          value={translation.y}
          onChange={(e) => handleTranslationChange('y', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Translation Z: {translation.z.toFixed(2)}
        </label>
        <input
          type="range"
          min="-5"
          max="5"
          step="0.1"
          value={translation.z}
          onChange={(e) => handleTranslationChange('z', e.target.value)}
          className="w-full"
        />
      </div>

      <div className="bg-purple-50 p-3 rounded-lg text-sm text-gray-700">
        <p className="font-semibold mb-1">Translation Vector:</p>
        <p>T = ({translation.x.toFixed(2)}, {translation.y.toFixed(2)}, {translation.z.toFixed(2)})</p>
      </div>
    </div>
  );
};

export default TranslationControls;

