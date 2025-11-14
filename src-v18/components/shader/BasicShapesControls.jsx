export default function BasicShapesControls({
  shapeType,
  setShapeType,
  shapeCenter,
  setShapeCenter,
  shapeSize,
  setShapeSize,
  shapeColor,
  setShapeColor,
  shapeEdgeSoftness,
  setShapeEdgeSoftness,
  lineThickness,
  setLineThickness,
  lineAngle,
  setLineAngle
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Shape Type
        </label>
        <select
          value={shapeType}
          onChange={(e) => setShapeType(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg"
        >
          <option value="circle">Circle</option>
          <option value="rectangle">Rectangle</option>
          <option value="line">Line</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Center X: {shapeCenter.x.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={shapeCenter.x}
            onChange={(e) => setShapeCenter({ ...shapeCenter, x: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Center Y: {shapeCenter.y.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={shapeCenter.y}
            onChange={(e) => setShapeCenter({ ...shapeCenter, y: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      {shapeType === 'circle' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Radius: {shapeSize.x.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.05"
            max="0.5"
            step="0.01"
            value={shapeSize.x}
            onChange={(e) => setShapeSize({ ...shapeSize, x: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>
      )}

      {shapeType === 'rectangle' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Width: {shapeSize.x.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.01"
              value={shapeSize.x}
              onChange={(e) => setShapeSize({ ...shapeSize, x: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Height: {shapeSize.y.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.01"
              value={shapeSize.y}
              onChange={(e) => setShapeSize({ ...shapeSize, y: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      )}

      {shapeType === 'line' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Length: {shapeSize.x.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.01"
              value={shapeSize.x}
              onChange={(e) => setShapeSize({ ...shapeSize, x: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thickness: {lineThickness.toFixed(3)}
            </label>
            <input
              type="range"
              min="0.001"
              max="0.1"
              step="0.001"
              value={lineThickness}
              onChange={(e) => setLineThickness(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Angle: {(lineAngle * 180 / Math.PI).toFixed(1)}°
            </label>
            <input
              type="range"
              min="0"
              max={Math.PI * 2}
              step="0.01"
              value={lineAngle}
              onChange={(e) => setLineAngle(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Red: {shapeColor.r.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={shapeColor.r}
            onChange={(e) => setShapeColor({ ...shapeColor, r: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Green: {shapeColor.g.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={shapeColor.g}
            onChange={(e) => setShapeColor({ ...shapeColor, g: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Blue: {shapeColor.b.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={shapeColor.b}
            onChange={(e) => setShapeColor({ ...shapeColor, b: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Edge Softness: {shapeEdgeSoftness.toFixed(3)}
        </label>
        <input
          type="range"
          min="0"
          max="0.1"
          step="0.001"
          value={shapeEdgeSoftness}
          onChange={(e) => setShapeEdgeSoftness(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Controls the smoothness of shape edges (0 = hard edge, higher = softer)
        </p>
      </div>
    </div>
  );
}

