export default function BloomControls({ bloomIntensity, setBloomIntensity, bloomThreshold, setBloomThreshold }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Bloom Intensity: {bloomIntensity.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={bloomIntensity}
          onChange={(e) => setBloomIntensity(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Bloom Threshold: {bloomThreshold.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={bloomThreshold}
          onChange={(e) => setBloomThreshold(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Higher values = only brightest areas glow
        </p>
      </div>
    </div>
  );
}

