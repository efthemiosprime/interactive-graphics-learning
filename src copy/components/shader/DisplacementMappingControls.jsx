export default function DisplacementMappingControls({
  displacementType,
  setDisplacementType,
  displacementScale,
  setDisplacementScale,
  displacementHeight,
  setDisplacementHeight,
  useImageTexture,
  setUseImageTexture,
  textureLoaded,
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Displacement Type
        </label>
        <select
          value={displacementType}
          onChange={(e) => setDisplacementType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="height">Height-based Displacement</option>
          <option value="parallax">Parallax Mapping</option>
          <option value="steepParallax">Steep Parallax Mapping</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Displacement Scale: {displacementScale.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.0"
          max="2.0"
          step="0.01"
          value={displacementScale}
          onChange={(e) => setDisplacementScale(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Height Intensity: {displacementHeight.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.0"
          max="1.0"
          step="0.01"
          value={displacementHeight}
          onChange={(e) => setDisplacementHeight(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="useImageDisplacement"
          checked={useImageTexture}
          onChange={(e) => setUseImageTexture(e.target.checked)}
          disabled={!textureLoaded}
          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
        />
        <label
          htmlFor="useImageDisplacement"
          className={`text-sm font-medium ${
            textureLoaded ? 'text-gray-700' : 'text-gray-400'
          }`}
        >
          Use Image Texture {!textureLoaded && '(Image not loaded)'}
        </label>
      </div>
    </div>
  );
}

