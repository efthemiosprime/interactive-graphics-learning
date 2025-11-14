import React from 'react';
import { getCurveCodeSnippet } from '../../utils/curvesAndSurfacesCodeSnippets';

const CurvesAndSurfacesCodeDisplay = ({ curveType }) => {
  const codeSnippet = getCurveCodeSnippet(curveType);

  if (!codeSnippet) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-purple-900 mb-4">Code Example</h3>
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm text-green-400" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
          <code>{codeSnippet}</code>
        </pre>
      </div>
    </div>
  );
};

export default CurvesAndSurfacesCodeDisplay;

