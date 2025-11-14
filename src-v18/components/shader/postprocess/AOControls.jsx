export default function AOControls({ aoIntensity, setAoIntensity, aoRadius, setAoRadius, aoBias, setAoBias }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          AO Intensity: {aoIntensity.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={aoIntensity}
          onChange={(e) => setAoIntensity(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          How strong the occlusion effect is
        </p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          AO Radius: {aoRadius.toFixed(3)}
        </label>
        <input
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={aoRadius}
          onChange={(e) => setAoRadius(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Sampling radius for occlusion detection
        </p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          AO Bias: {aoBias.toFixed(3)}
        </label>
        <input
          type="range"
          min="0"
          max="0.1"
          step="0.001"
          value={aoBias}
          onChange={(e) => setAoBias(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Minimum depth difference to trigger occlusion
        </p>
      </div>
    </div>
  );
}

