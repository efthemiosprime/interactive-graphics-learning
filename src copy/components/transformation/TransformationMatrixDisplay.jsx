import React from 'react';

const TransformationMatrixDisplay = ({ matrix, module, step }) => {
  if (!matrix || !Array.isArray(matrix) || matrix.length === 0) {
    return null;
  }

  const formatValue = (value) => {
    if (Math.abs(value) < 0.001) return '0';
    if (Math.abs(value - 1) < 0.001) return '1';
    if (Math.abs(value + 1) < 0.001) return '-1';
    return value.toFixed(3);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold text-blue-900 mb-4">Transformation Matrix</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="font-mono text-sm">
          {matrix.map((row, i) => (
            <div key={i} className="flex items-center justify-center gap-2 mb-1">
              <span className="text-gray-500">[</span>
              {row.map((value, j) => (
                <React.Fragment key={j}>
                  <span className={`px-2 py-1 rounded ${
                    i === j ? 'bg-blue-100 text-blue-800' : 
                    value !== 0 ? 'bg-gray-100 text-gray-800' : 'text-gray-400'
                  }`}>
                    {formatValue(value)}
                  </span>
                  {j < row.length - 1 && <span className="text-gray-400">,</span>}
                </React.Fragment>
              ))}
              <span className="text-gray-500">]</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-600 space-y-1">
        <p><strong>Module:</strong> {module}</p>
        <p><strong>Step:</strong> {step}</p>
        <p className="text-gray-500 mt-2">
          {matrix.length === 2 ? '2×2 Matrix' : 
           matrix.length === 3 ? '3×3 Matrix' : 
           matrix.length === 4 ? '4×4 Matrix (Homogeneous)' : ''}
        </p>
      </div>

      {/* Matrix Properties */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Matrix Properties</h4>
        <div className="text-xs text-gray-600 space-y-1">
          {matrix.length === 4 && (
            <>
              <p>• Homogeneous coordinates (w = 1)</p>
              <p>• Last row: [0, 0, 0, 1] (preserves w)</p>
            </>
          )}
          {module === 'scaling' && (
            <p>• Diagonal matrix: scale factors on diagonal</p>
          )}
          {module === 'translation' && (
            <p>• Identity matrix with translation in last column</p>
          )}
          {module === 'rotation' && (
            <p>• Orthogonal matrix: preserves distances and angles</p>
          )}
          {module === 'reflection' && (
            <p>• Determinant = -1 (flips orientation)</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransformationMatrixDisplay;

