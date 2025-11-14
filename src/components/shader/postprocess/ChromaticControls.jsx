export default function ChromaticControls({ chromaticAberration, setChromaticAberration }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Chromatic Aberration: {chromaticAberration.toFixed(3)}
      </label>
      <input
        type="range"
        min="0"
        max="0.05"
        step="0.001"
        value={chromaticAberration}
        onChange={(e) => setChromaticAberration(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

