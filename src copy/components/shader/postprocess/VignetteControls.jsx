export default function VignetteControls({ vignetteIntensity, setVignetteIntensity }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Vignette Intensity: {vignetteIntensity.toFixed(2)}
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={vignetteIntensity}
        onChange={(e) => setVignetteIntensity(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

