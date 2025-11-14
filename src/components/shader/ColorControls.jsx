export default function ColorControls({ color, setColor }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Red: {color.r.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={color.r}
          onChange={(e) => setColor({ ...color, r: parseFloat(e.target.value) })}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Green: {color.g.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={color.g}
          onChange={(e) => setColor({ ...color, g: parseFloat(e.target.value) })}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Blue: {color.b.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={color.b}
          onChange={(e) => setColor({ ...color, b: parseFloat(e.target.value) })}
          className="w-full"
        />
      </div>
    </div>
  );
}

