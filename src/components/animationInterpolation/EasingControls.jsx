import React from 'react';

const EasingControls = ({ easingType, setEasingType, power, setPower }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Easing Type
        </label>
        <select
          value={easingType}
          onChange={(e) => setEasingType(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg"
        >
          <option value="easeIn">Ease In</option>
          <option value="easeOut">Ease Out</option>
          <option value="easeInOut">Ease In-Out</option>
          <option value="easeOutIn">Ease Out-In</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Power: {power}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          step="0.5"
          value={power}
          onChange={(e) => setPower(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Controls the strength of the easing effect
        </p>
      </div>
    </div>
  );
};

export default EasingControls;

