export default function NoiseControls({ noiseScale, setNoiseScale }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Noise Scale: {noiseScale.toFixed(2)}
      </label>
      <input
        type="range"
        min="0.1"
        max="10"
        step="0.1"
        value={noiseScale}
        onChange={(e) => setNoiseScale(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

