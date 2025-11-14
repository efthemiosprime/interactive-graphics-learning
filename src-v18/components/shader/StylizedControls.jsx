import React from 'react';

const StylizedControls = ({
  toonBands,
  setToonBands,
  stylizedEdgeThreshold,
  setStylizedEdgeThreshold,
  stylizedEdgeThickness,
  setStylizedEdgeThickness,
  colorQuantization,
  setColorQuantization,
  rimPower,
  setRimPower,
  specularPower,
  setSpecularPower,
  rimColor,
  setRimColor,
  specularColor,
  setSpecularColor,
  useImageForStylized,
  setUseImageForStylized,
  textureLoaded
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-purple-900 mb-4">Stylized/Cartoon Shader Controls</h3>
      
      {/* Use Image Texture Toggle */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="useImageForStylized"
          checked={useImageForStylized}
          onChange={(e) => setUseImageForStylized(e.target.checked)}
          className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
          disabled={!textureLoaded}
        />
        <label htmlFor="useImageForStylized" className="text-sm font-medium text-gray-700">
          Use Image Texture {!textureLoaded && '(Load image first)'}
        </label>
      </div>

      {/* Toon Bands */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Toon Bands: {toonBands.toFixed(1)}
        </label>
        <input
          type="range"
          min="2"
          max="16"
          step="1"
          value={toonBands}
          onChange={(e) => setToonBands(parseFloat(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <p className="text-xs text-gray-500 mt-1">Number of lighting bands (quantization levels)</p>
      </div>

      {/* Edge Threshold */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Edge Threshold: {stylizedEdgeThreshold.toFixed(3)}
        </label>
        <input
          type="range"
          min="0.01"
          max="0.5"
          step="0.01"
          value={stylizedEdgeThreshold}
          onChange={(e) => setStylizedEdgeThreshold(parseFloat(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <p className="text-xs text-gray-500 mt-1">Edge detection sensitivity</p>
      </div>

      {/* Edge Thickness */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Edge Thickness: {stylizedEdgeThickness.toFixed(3)}
        </label>
        <input
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={stylizedEdgeThickness}
          onChange={(e) => setStylizedEdgeThickness(parseFloat(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <p className="text-xs text-gray-500 mt-1">Thickness of edge outlines</p>
      </div>

      {/* Color Quantization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color Quantization: {colorQuantization.toFixed(1)}
        </label>
        <input
          type="range"
          min="2"
          max="32"
          step="1"
          value={colorQuantization}
          onChange={(e) => setColorQuantization(parseFloat(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <p className="text-xs text-gray-500 mt-1">Number of color levels (posterization)</p>
      </div>

      {/* Rim Power */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rim Power: {rimPower.toFixed(1)}
        </label>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.1"
          value={rimPower}
          onChange={(e) => setRimPower(parseFloat(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <p className="text-xs text-gray-500 mt-1">Rim lighting intensity</p>
      </div>

      {/* Specular Power */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Specular Power: {specularPower.toFixed(1)}
        </label>
        <input
          type="range"
          min="1"
          max="128"
          step="1"
          value={specularPower}
          onChange={(e) => setSpecularPower(parseFloat(e.target.value))}
          className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <p className="text-xs text-gray-500 mt-1">Specular highlight sharpness</p>
      </div>

      {/* Rim Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rim Color
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={`#${Math.round(rimColor.r * 255).toString(16).padStart(2, '0')}${Math.round(rimColor.g * 255).toString(16).padStart(2, '0')}${Math.round(rimColor.b * 255).toString(16).padStart(2, '0')}`}
            onChange={(e) => {
              const hex = e.target.value;
              const r = parseInt(hex.slice(1, 3), 16) / 255;
              const g = parseInt(hex.slice(3, 5), 16) / 255;
              const b = parseInt(hex.slice(5, 7), 16) / 255;
              setRimColor({ r, g, b });
            }}
            className="w-16 h-10 border-2 border-purple-300 rounded cursor-pointer"
          />
          <div className="flex-1 grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-600">R</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={rimColor.r.toFixed(2)}
                onChange={(e) => setRimColor({ ...rimColor, r: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 border border-purple-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">G</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={rimColor.g.toFixed(2)}
                onChange={(e) => setRimColor({ ...rimColor, g: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 border border-purple-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">B</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={rimColor.b.toFixed(2)}
                onChange={(e) => setRimColor({ ...rimColor, b: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 border border-purple-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Specular Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specular Color
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={`#${Math.round(specularColor.r * 255).toString(16).padStart(2, '0')}${Math.round(specularColor.g * 255).toString(16).padStart(2, '0')}${Math.round(specularColor.b * 255).toString(16).padStart(2, '0')}`}
            onChange={(e) => {
              const hex = e.target.value;
              const r = parseInt(hex.slice(1, 3), 16) / 255;
              const g = parseInt(hex.slice(3, 5), 16) / 255;
              const b = parseInt(hex.slice(5, 7), 16) / 255;
              setSpecularColor({ r, g, b });
            }}
            className="w-16 h-10 border-2 border-purple-300 rounded cursor-pointer"
          />
          <div className="flex-1 grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-gray-600">R</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={specularColor.r.toFixed(2)}
                onChange={(e) => setSpecularColor({ ...specularColor, r: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 border border-purple-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">G</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={specularColor.g.toFixed(2)}
                onChange={(e) => setSpecularColor({ ...specularColor, g: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 border border-purple-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">B</label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value={specularColor.b.toFixed(2)}
                onChange={(e) => setSpecularColor({ ...specularColor, b: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 border border-purple-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylizedControls;

