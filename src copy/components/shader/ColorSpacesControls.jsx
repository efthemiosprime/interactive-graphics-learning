export default function ColorSpacesControls({
  colorSpaceMode,
  setColorSpaceMode,
  hsvColor,
  setHsvColor,
  colorMixMode,
  setColorMixMode,
  colorMixColor1,
  setColorMixColor1,
  colorMixColor2,
  setColorMixColor2,
  colorMixAmount,
  setColorMixAmount
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Color Space Mode
        </label>
        <select
          value={colorSpaceMode}
          onChange={(e) => setColorSpaceMode(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg"
        >
          <option value="hsv">HSV Color Space</option>
          <option value="mixing">Color Mixing</option>
        </select>
      </div>

      {colorSpaceMode === 'hsv' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hue: {(hsvColor.h * 360).toFixed(1)}°
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={hsvColor.h}
              onChange={(e) => setHsvColor({ ...hsvColor, h: parseFloat(e.target.value) })}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Hue ranges from 0° (red) to 360° (back to red)
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Saturation: {(hsvColor.s * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={hsvColor.s}
              onChange={(e) => setHsvColor({ ...hsvColor, s: parseFloat(e.target.value) })}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              0% = grayscale, 100% = fully saturated
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Value (Brightness): {(hsvColor.v * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={hsvColor.v}
              onChange={(e) => setHsvColor({ ...hsvColor, v: parseFloat(e.target.value) })}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              0% = black, 100% = full brightness
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 border-l-4 border-purple-500">
            <p className="text-xs text-gray-700">
              <strong>HSV Preview:</strong> RGB({Math.round(hsvToRgb(hsvColor).r * 255)}, {Math.round(hsvToRgb(hsvColor).g * 255)}, {Math.round(hsvToRgb(hsvColor).b * 255)})
            </p>
          </div>
        </div>
      )}

      {colorSpaceMode === 'mixing' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mixing Mode
            </label>
            <select
              value={colorMixMode}
              onChange={(e) => setColorMixMode(e.target.value)}
              className="w-full p-2 border-2 border-purple-300 rounded-lg"
            >
              <option value="additive">Additive (Light)</option>
              <option value="multiply">Multiply (Darken)</option>
              <option value="screen">Screen (Lighten)</option>
              <option value="overlay">Overlay</option>
              <option value="subtract">Subtract</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {colorMixMode === 'additive' && 'Adds colors together (like light sources)'}
              {colorMixMode === 'multiply' && 'Multiplies colors (darkens image)'}
              {colorMixMode === 'screen' && 'Inverse multiply (lightens image)'}
              {colorMixMode === 'overlay' && 'Combines multiply and screen based on base color'}
              {colorMixMode === 'subtract' && 'Subtracts second color from first'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color 1
              </label>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    R: {colorMixColor1.r.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={colorMixColor1.r}
                    onChange={(e) => setColorMixColor1({ ...colorMixColor1, r: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    G: {colorMixColor1.g.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={colorMixColor1.g}
                    onChange={(e) => setColorMixColor1({ ...colorMixColor1, g: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    B: {colorMixColor1.b.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={colorMixColor1.b}
                    onChange={(e) => setColorMixColor1({ ...colorMixColor1, b: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color 2
              </label>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    R: {colorMixColor2.r.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={colorMixColor2.r}
                    onChange={(e) => setColorMixColor2({ ...colorMixColor2, r: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    G: {colorMixColor2.g.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={colorMixColor2.g}
                    onChange={(e) => setColorMixColor2({ ...colorMixColor2, g: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    B: {colorMixColor2.b.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={colorMixColor2.b}
                    onChange={(e) => setColorMixColor2({ ...colorMixColor2, b: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mix Amount: {(colorMixAmount * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={colorMixAmount}
              onChange={(e) => setColorMixAmount(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Controls the blend ratio between Color 1 and Color 2
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to convert HSV to RGB for preview
function hsvToRgb(hsv) {
  const h = hsv.h * 6;
  const s = hsv.s;
  const v = hsv.v;
  
  const c = v * s;
  const x = c * (1 - Math.abs((h % 2) - 1));
  const m = v - c;
  
  let r, g, b;
  
  if (h < 1) {
    r = c; g = x; b = 0;
  } else if (h < 2) {
    r = x; g = c; b = 0;
  } else if (h < 3) {
    r = 0; g = c; b = x;
  } else if (h < 4) {
    r = 0; g = x; b = c;
  } else if (h < 5) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }
  
  return {
    r: r + m,
    g: g + m,
    b: b + m
  };
}

