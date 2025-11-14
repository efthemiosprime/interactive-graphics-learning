import React from 'react';

const SurfaceControls = ({ surfaceType, setSurfaceType, points, setPoints }) => {
  const handlePointChange = (row, col, axis, value) => {
    const newPoints = points.map((r, ri) => 
      r.map((p, ci) => 
        (ri === row && ci === col) 
          ? { ...p, [axis]: parseFloat(value) }
          : p
      )
    );
    setPoints(newPoints);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Surface Type
        </label>
        <select
          value={surfaceType}
          onChange={(e) => setSurfaceType(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg"
        >
          <option value="bezier">Bezier Surface</option>
          <option value="nurbs">NURBS Surface</option>
        </select>
      </div>

      <div className="bg-purple-50 p-3 rounded-lg">
        <p className="text-xs font-semibold text-purple-900 mb-2">
          Control Points Grid ({points.length}×{points[0]?.length || 0})
        </p>
        <p className="text-xs text-gray-600">
          Adjust points in the visualization by clicking and dragging.
          Use the sliders below for fine control.
        </p>
      </div>

      {surfaceType === 'bezier' && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700">Z-Height Controls</p>
          {points.map((row, rowIndex) => (
            <div key={rowIndex} className="bg-gray-50 p-2 rounded">
              <p className="text-xs text-gray-600 mb-1">Row {rowIndex + 1}</p>
              {row.map((point, colIndex) => (
                <div key={colIndex} className="mb-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    Point ({rowIndex}, {colIndex}) Z: {point.z.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="-0.5"
                    max="1"
                    step="0.01"
                    value={point.z}
                    onChange={(e) => handlePointChange(rowIndex, colIndex, 'z', e.target.value)}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurfaceControls;

