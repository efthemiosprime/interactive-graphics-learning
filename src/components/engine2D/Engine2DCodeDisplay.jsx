import React from 'react';
import { getEngine2DCodeSnippet } from '../../utils/engine2DCodeSnippets';

const Engine2DCodeDisplay = ({ currentModule, currentStep }) => {
  const codeSnippet = getEngine2DCodeSnippet(currentModule, currentStep);

  if (!codeSnippet) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-purple-900 mb-4">Implementation Code</h3>
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm text-green-400" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
          <code>{codeSnippet}</code>
        </pre>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        This is the actual implementation code for this step. Copy it into your engine project.
      </p>
    </div>
  );
};

export default Engine2DCodeDisplay;

