export default function GradientControls({
  gradientType,
  setGradientType,
  gradientStartColor,
  setGradientStartColor,
  gradientEndColor,
  setGradientEndColor,
  gradientAngle,
  setGradientAngle,
  gradientCenter,
  setGradientCenter,
  gradientRadius,
  setGradientRadius
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Gradient Type
        </label>
        <select
          value={gradientType}
          onChange={(e) => setGradientType(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg"
        >
          <option value="linear">Linear Gradient</option>
          <option value="radial">Radial Gradient</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Start Color
          </label>
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                R: {gradientStartColor.r.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={gradientStartColor.r}
                onChange={(e) => setGradientStartColor({ ...gradientStartColor, r: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                G: {gradientStartColor.g.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={gradientStartColor.g}
                onChange={(e) => setGradientStartColor({ ...gradientStartColor, g: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                B: {gradientStartColor.b.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={gradientStartColor.b}
                onChange={(e) => setGradientStartColor({ ...gradientStartColor, b: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            End Color
          </label>
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                R: {gradientEndColor.r.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={gradientEndColor.r}
                onChange={(e) => setGradientEndColor({ ...gradientEndColor, r: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                G: {gradientEndColor.g.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={gradientEndColor.g}
                onChange={(e) => setGradientEndColor({ ...gradientEndColor, g: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                B: {gradientEndColor.b.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={gradientEndColor.b}
                onChange={(e) => setGradientEndColor({ ...gradientEndColor, b: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      {gradientType === 'linear' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Angle: {(gradientAngle * 180 / Math.PI).toFixed(1)}°
          </label>
          <input
            type="range"
            min="0"
            max={Math.PI * 2}
            step="0.01"
            value={gradientAngle}
            onChange={(e) => setGradientAngle(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      )}
      
      {gradientType === 'radial' && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Center X: {gradientCenter.x.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={gradientCenter.x}
              onChange={(e) => setGradientCenter({ ...gradientCenter, x: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Center Y: {gradientCenter.y.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={gradientCenter.y}
              onChange={(e) => setGradientCenter({ ...gradientCenter, y: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Radius: {gradientRadius.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.01"
              value={gradientRadius}
              onChange={(e) => setGradientRadius(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

