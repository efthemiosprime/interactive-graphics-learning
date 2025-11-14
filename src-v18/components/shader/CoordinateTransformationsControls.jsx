export default function CoordinateTransformationsControls({
  transformType = 'rotation',
  setTransformType,
  transformAngle = 0.0,
  setTransformAngle,
  transformTranslation = { x: 0.0, y: 0.0 },
  setTransformTranslation,
  transformScale = { x: 1.0, y: 1.0 },
  setTransformScale,
  transformCenter = { x: 0.5, y: 0.5 },
  setTransformCenter
}) {
  const getTransformDescription = () => {
    const type = transformType || 'rotation';
    const descriptions = {
      rotation: 'Rotates UV coordinates around a center point using a rotation matrix',
      translation: 'Moves UV coordinates by adding an offset vector',
      scaling: 'Scales UV coordinates around a center point (non-uniform scaling)',
      polar: 'Converts Cartesian coordinates (x, y) to polar coordinates (angle, radius)'
    };
    return descriptions[type] || descriptions.rotation;
  };

  const getTransformFormula = () => {
    const type = transformType || 'rotation';
    const angleDeg = ((transformAngle || 0) * 180.0 / Math.PI).toFixed(1);
    const formulas = {
      rotation: `Rotated = R(θ) × (UV - Center) + Center\nwhere R(θ) = [cos(θ) -sin(θ); sin(θ) cos(θ)]\nCurrent angle: ${angleDeg}°`,
      translation: `Translated = UV + Offset\nCurrent offset: (${(transformTranslation?.x || 0).toFixed(2)}, ${(transformTranslation?.y || 0).toFixed(2)})`,
      scaling: `Scaled = (UV - Center) × Scale + Center\nCurrent scale: (${(transformScale?.x || 1).toFixed(2)}, ${(transformScale?.y || 1).toFixed(2)})`,
      polar: `Angle = atan2(y, x)\nRadius = length(UV - Center)\nCurrent center: (${(transformCenter?.x || 0.5).toFixed(2)}, ${(transformCenter?.y || 0.5).toFixed(2)})`
    };
    return formulas[type] || formulas.rotation;
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
        <p className="text-sm font-semibold text-gray-700 mb-1">Transformation Type:</p>
        <select
          value={transformType || 'rotation'}
          onChange={(e) => setTransformType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="rotation">Rotation</option>
          <option value="translation">Translation</option>
          <option value="scaling">Scaling</option>
          <option value="polar">Polar Coordinates</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          {getTransformDescription()}
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
        <p className="text-sm font-semibold text-gray-700 mb-1">Formula:</p>
        <p className="text-xs text-gray-600 font-mono whitespace-pre-line">{getTransformFormula()}</p>
      </div>

      {transformType === 'rotation' && (
        <>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rotation Angle: {((transformAngle || 0) * 180.0 / Math.PI).toFixed(1)}°
            </label>
            <input
              type="range"
              min="-3.14159"
              max="3.14159"
              step="0.01"
              value={transformAngle || 0}
              onChange={(e) => setTransformAngle(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Center X: {(transformCenter?.x || 0.5).toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={transformCenter?.x || 0.5}
                onChange={(e) => setTransformCenter({ ...transformCenter, x: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Center Y: {(transformCenter?.y || 0.5).toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={transformCenter?.y || 0.5}
                onChange={(e) => setTransformCenter({ ...transformCenter, y: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </>
      )}

      {transformType === 'translation' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Translation X: {(transformTranslation?.x || 0).toFixed(2)}
            </label>
            <input
              type="range"
              min="-0.5"
              max="0.5"
              step="0.01"
              value={transformTranslation?.x || 0}
              onChange={(e) => setTransformTranslation({ ...transformTranslation, x: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Translation Y: {(transformTranslation?.y || 0).toFixed(2)}
            </label>
            <input
              type="range"
              min="-0.5"
              max="0.5"
              step="0.01"
              value={transformTranslation?.y || 0}
              onChange={(e) => setTransformTranslation({ ...transformTranslation, y: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      )}

      {transformType === 'scaling' && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Scale X: {(transformScale?.x || 1).toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={transformScale?.x || 1}
                onChange={(e) => setTransformScale({ ...transformScale, x: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Scale Y: {(transformScale?.y || 1).toFixed(2)}
              </label>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={transformScale?.y || 1}
                onChange={(e) => setTransformScale({ ...transformScale, y: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Center X: {(transformCenter?.x || 0.5).toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={transformCenter?.x || 0.5}
                onChange={(e) => setTransformCenter({ ...transformCenter, x: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Center Y: {(transformCenter?.y || 0.5).toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={transformCenter?.y || 0.5}
                onChange={(e) => setTransformCenter({ ...transformCenter, y: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </>
      )}

      {transformType === 'polar' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Center X: {(transformCenter?.x || 0.5).toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={transformCenter?.x || 0.5}
              onChange={(e) => setTransformCenter({ ...transformCenter, x: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Center Y: {(transformCenter?.y || 0.5).toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={transformCenter?.y || 0.5}
              onChange={(e) => setTransformCenter({ ...transformCenter, y: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

