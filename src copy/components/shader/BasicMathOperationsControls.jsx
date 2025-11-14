export default function BasicMathOperationsControls({
  mathOperation = 'add',
  setMathOperation,
  mathValue1 = 0.5,
  setMathValue1,
  mathValue2 = 0.5,
  setMathValue2,
  mathValue3 = 0.5,
  setMathValue3,
  useImageForMath = false,
  setUseImageForMath,
  textureLoaded = false
}) {
  const getOperationDescription = () => {
    const op = mathOperation || 'add';
    const descriptions = {
      add: 'Adds two values together',
      subtract: 'Subtracts second value from first',
      multiply: 'Multiplies two values',
      divide: 'Divides first value by second',
      power: 'Raises first value to the power of second',
      modulo: 'Returns remainder after division',
      abs: 'Returns absolute value (distance from zero)',
      floor: 'Rounds down to nearest integer',
      ceil: 'Rounds up to nearest integer',
      min: 'Returns the smaller of two values',
      max: 'Returns the larger of two values',
      clamp: 'Constrains value between min and max',
      mix: 'Linear interpolation between two values'
    };
    return descriptions[op] || '';
  };

  const getOperationFormula = () => {
    // Ensure values are defined and are numbers
    const v1 = (typeof mathValue1 === 'number' && !isNaN(mathValue1)) ? mathValue1 : 0.5;
    const v2 = (typeof mathValue2 === 'number' && !isNaN(mathValue2)) ? mathValue2 : 0.5;
    const v3 = (typeof mathValue3 === 'number' && !isNaN(mathValue3)) ? mathValue3 : 0.5;
    const op = mathOperation || 'add';
    
    const formulas = {
      add: `result = ${v1.toFixed(2)} + ${v2.toFixed(2)} = ${(v1 + v2).toFixed(2)}`,
      subtract: `result = ${v1.toFixed(2)} - ${v2.toFixed(2)} = ${(v1 - v2).toFixed(2)}`,
      multiply: `result = ${v1.toFixed(2)} × ${v2.toFixed(2)} = ${(v1 * v2).toFixed(2)}`,
      divide: `result = ${v1.toFixed(2)} ÷ ${v2.toFixed(2)} = ${v2 !== 0 ? (v1 / v2).toFixed(2) : 'undefined'}`,
      power: `result = ${v1.toFixed(2)}^${v2.toFixed(2)} = ${Math.pow(v1, v2).toFixed(2)}`,
      modulo: `result = ${v1.toFixed(2)} mod ${v2.toFixed(2)} = ${(v1 % v2).toFixed(2)}`,
      abs: `result = |${v1.toFixed(2)}| = ${Math.abs(v1).toFixed(2)}`,
      floor: `result = floor(${v1.toFixed(2)}) = ${Math.floor(v1)}`,
      ceil: `result = ceil(${v1.toFixed(2)}) = ${Math.ceil(v1)}`,
      min: `result = min(${v1.toFixed(2)}, ${v2.toFixed(2)}) = ${Math.min(v1, v2).toFixed(2)}`,
      max: `result = max(${v1.toFixed(2)}, ${v2.toFixed(2)}) = ${Math.max(v1, v2).toFixed(2)}`,
      clamp: `result = clamp(${v1.toFixed(2)}, ${v2.toFixed(2)}, ${v3.toFixed(2)}) = ${Math.max(v2, Math.min(v3, v1)).toFixed(2)}`,
      mix: `result = mix(${v1.toFixed(2)}, ${v2.toFixed(2)}, ${v3.toFixed(2)}) = ${(v1 * (1 - v3) + v2 * v3).toFixed(2)}`
    };
    return formulas[op] || '';
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Math Operation
        </label>
        <select
          value={mathOperation}
          onChange={(e) => setMathOperation(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg"
        >
          <optgroup label="Arithmetic">
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
            <option value="power">Power (^)</option>
            <option value="modulo">Modulo (%)</option>
          </optgroup>
          <optgroup label="Functions">
            <option value="abs">Absolute Value (|x|)</option>
            <option value="floor">Floor (⌊x⌋)</option>
            <option value="ceil">Ceiling (⌈x⌉)</option>
          </optgroup>
          <optgroup label="Comparison">
            <option value="min">Minimum</option>
            <option value="max">Maximum</option>
          </optgroup>
          <optgroup label="Utility">
            <option value="clamp">Clamp</option>
            <option value="mix">Mix (Lerp)</option>
          </optgroup>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          {getOperationDescription()}
        </p>
      </div>

      <div className="bg-purple-50 rounded-lg p-3 border-l-4 border-purple-500">
        <p className="text-sm font-semibold text-gray-700 mb-1">Formula:</p>
        <p className="text-xs text-gray-600 font-mono">{getOperationFormula()}</p>
      </div>

      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          id="useImageForMath"
          checked={useImageForMath}
          onChange={(e) => setUseImageForMath(e.target.checked)}
          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
        />
        <label htmlFor="useImageForMath" className="text-sm font-semibold text-gray-700 cursor-pointer">
          Use Image Texture
        </label>
        {!textureLoaded && useImageForMath && (
          <span className="text-xs text-orange-600 ml-2">(Loading image...)</span>
        )}
      </div>
      <p className="text-xs text-gray-500 -mt-2">
        {useImageForMath ? 'Math operations will use grayscale values from the image' : 'Math operations will use the slider values'}
      </p>

      {mathOperation === 'abs' || mathOperation === 'floor' || mathOperation === 'ceil' ? (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Value: {(typeof mathValue1 === 'number' ? mathValue1 : 0.5).toFixed(2)}
          </label>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.01"
            value={typeof mathValue1 === 'number' ? mathValue1 : 0.5}
            onChange={(e) => setMathValue1(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      ) : mathOperation === 'clamp' ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Value: {(typeof mathValue1 === 'number' ? mathValue1 : 0.5).toFixed(2)}
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.01"
              value={typeof mathValue1 === 'number' ? mathValue1 : 0.5}
              onChange={(e) => setMathValue1(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Min: {(typeof mathValue2 === 'number' ? mathValue2 : 0.5).toFixed(2)}
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.01"
              value={typeof mathValue2 === 'number' ? mathValue2 : 0.5}
              onChange={(e) => setMathValue2(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Max: {(typeof mathValue3 === 'number' ? mathValue3 : 0.5).toFixed(2)}
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.01"
              value={typeof mathValue3 === 'number' ? mathValue3 : 0.5}
              onChange={(e) => setMathValue3(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      ) : mathOperation === 'mix' ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Value 1: {(typeof mathValue1 === 'number' ? mathValue1 : 0.5).toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={typeof mathValue1 === 'number' ? mathValue1 : 0.5}
              onChange={(e) => setMathValue1(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Value 2: {(typeof mathValue2 === 'number' ? mathValue2 : 0.5).toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={typeof mathValue2 === 'number' ? mathValue2 : 0.5}
              onChange={(e) => setMathValue2(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interpolation Factor (t): {(typeof mathValue3 === 'number' ? mathValue3 : 0.5).toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={typeof mathValue3 === 'number' ? mathValue3 : 0.5}
              onChange={(e) => setMathValue3(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              0.0 = Value 1, 1.0 = Value 2, 0.5 = halfway between
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Value 1: {(typeof mathValue1 === 'number' ? mathValue1 : 0.5).toFixed(2)}
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.01"
              value={typeof mathValue1 === 'number' ? mathValue1 : 0.5}
              onChange={(e) => setMathValue1(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Value 2: {(typeof mathValue2 === 'number' ? mathValue2 : 0.5).toFixed(2)}
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.01"
              value={typeof mathValue2 === 'number' ? mathValue2 : 0.5}
              onChange={(e) => setMathValue2(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

