export default function UVControls({ uvScale, setUvScale }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        UV Scale: {uvScale.toFixed(2)}
      </label>
      <input
        type="range"
        min="0.1"
        max="10"
        step="0.1"
        value={uvScale}
        onChange={(e) => setUvScale(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

