import React from 'react';

const KeyframeControls = ({ keyframes, setKeyframes, interpolation, setInterpolation }) => {
  const handleKeyframeChange = (index, field, value) => {
    const newKeyframes = [...keyframes];
    newKeyframes[index] = {
      ...newKeyframes[index],
      [field]: parseFloat(value)
    };
    // Sort by time
    newKeyframes.sort((a, b) => a.time - b.time);
    setKeyframes(newKeyframes);
  };

  const addKeyframe = () => {
    const maxTime = Math.max(...keyframes.map(k => k.time));
    const newKeyframes = [...keyframes, { time: Math.min(maxTime + 0.2, 1.0), value: 0.5 }];
    newKeyframes.sort((a, b) => a.time - b.time);
    setKeyframes(newKeyframes);
  };

  const removeKeyframe = (index) => {
    if (keyframes.length > 2) {
      const newKeyframes = keyframes.filter((_, i) => i !== index);
      setKeyframes(newKeyframes);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Interpolation Method
        </label>
        <select
          value={interpolation}
          onChange={(e) => setInterpolation(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg"
        >
          <option value="linear">Linear</option>
          <option value="easeIn">Ease In</option>
          <option value="easeOut">Ease Out</option>
          <option value="easeInOut">Ease In-Out</option>
        </select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Keyframes</h3>
          <button
            onClick={addKeyframe}
            className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          >
            Add Keyframe
          </button>
        </div>
        
        {keyframes.map((keyframe, index) => (
          <div key={index} className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-purple-900">Keyframe {index + 1}</p>
              {keyframes.length > 2 && (
                <button
                  onClick={() => removeKeyframe(index)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Time: {keyframe.time.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={keyframe.time}
                  onChange={(e) => handleKeyframeChange(index, 'time', e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Value: {keyframe.value.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={keyframe.value}
                  onChange={(e) => handleKeyframeChange(index, 'value', e.target.value)}
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

export default KeyframeControls;

