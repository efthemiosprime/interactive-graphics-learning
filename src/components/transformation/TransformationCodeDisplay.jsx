import React from 'react';
import { getTransformationCodeSnippet } from '../../utils/transformationCodeSnippets';

const TransformationCodeDisplay = ({ currentModule, currentStep }) => {
  const codeSnippet = getTransformationCodeSnippet(currentModule, currentStep);

  if (!codeSnippet) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-blue-900 mb-4">Code Snippet</h3>
      <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded-lg block overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
        <code>{codeSnippet}</code>
      </pre>
    </div>
  );
};

export default TransformationCodeDisplay;

