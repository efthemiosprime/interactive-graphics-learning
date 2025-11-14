export default function LightingControls({ lightIntensity, setLightIntensity }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Light Intensity: {lightIntensity.toFixed(2)}
      </label>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={lightIntensity}
        onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

