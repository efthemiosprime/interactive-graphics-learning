export default function ColorGradingControls({
  colorGradingBrightness,
  setColorGradingBrightness,
  colorGradingContrast,
  setColorGradingContrast,
  colorGradingSaturation,
  setColorGradingSaturation,
  colorGradingTemperature,
  setColorGradingTemperature,
  colorGradingTint,
  setColorGradingTint
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Brightness: {colorGradingBrightness.toFixed(2)}
        </label>
        <input
          type="range"
          min="-0.5"
          max="0.5"
          step="0.01"
          value={colorGradingBrightness}
          onChange={(e) => setColorGradingBrightness(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Contrast: {colorGradingContrast.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={colorGradingContrast}
          onChange={(e) => setColorGradingContrast(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Saturation: {colorGradingSaturation.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={colorGradingSaturation}
          onChange={(e) => setColorGradingSaturation(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Temperature: {colorGradingTemperature.toFixed(2)}
        </label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={colorGradingTemperature}
          onChange={(e) => setColorGradingTemperature(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Positive = warm (red/yellow), Negative = cool (blue)
        </p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tint: {colorGradingTint.toFixed(2)}
        </label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={colorGradingTint}
          onChange={(e) => setColorGradingTint(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Positive = magenta, Negative = green
        </p>
      </div>
    </div>
  );
}

