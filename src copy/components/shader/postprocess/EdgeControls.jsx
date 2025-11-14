export default function EdgeControls({ edgeThreshold, setEdgeThreshold }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Edge Threshold: {edgeThreshold.toFixed(2)}
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={edgeThreshold}
        onChange={(e) => setEdgeThreshold(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

