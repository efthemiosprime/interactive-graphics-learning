export default function TextureControls({
  useImageTexture,
  setUseImageTexture,
  textureScale,
  setTextureScale,
  textureOffset,
  setTextureOffset,
  textureLoaded
}) {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useImageTexture}
            onChange={(e) => setUseImageTexture(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm font-semibold text-gray-700">
            Use Image Texture
          </span>
        </label>
        {useImageTexture && (
          <p className="text-xs text-gray-500 mt-1 ml-6">
            {textureLoaded ? '✓ Image loaded' : 'Loading image...'}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Texture Scale: {textureScale.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={textureScale}
          onChange={(e) => setTextureScale(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Offset X: {textureOffset.x.toFixed(2)}
        </label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={textureOffset.x}
          onChange={(e) => setTextureOffset({ ...textureOffset, x: parseFloat(e.target.value) })}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Offset Y: {textureOffset.y.toFixed(2)}
        </label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={textureOffset.y}
          onChange={(e) => setTextureOffset({ ...textureOffset, y: parseFloat(e.target.value) })}
          className="w-full"
        />
      </div>
    </div>
  );
}

