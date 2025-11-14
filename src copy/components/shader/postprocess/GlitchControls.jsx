export default function GlitchControls({ glitchIntensity, setGlitchIntensity }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Glitch Intensity: {glitchIntensity.toFixed(2)}
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={glitchIntensity}
        onChange={(e) => setGlitchIntensity(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

