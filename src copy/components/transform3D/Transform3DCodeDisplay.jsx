import React from 'react';
import { getTransformCodeSnippet } from '../../utils/transform3DCodeSnippets';

const Transform3DCodeDisplay = ({
  transformType,
  rotation,
  translation,
  scaling,
  perspectiveParams,
  orthographicParams,
  cameraEye
}) => {
  // Get code snippet with current parameter values
  let codeParams = null;
  if (transformType === 'rotation') {
    codeParams = { rx: rotation.x, ry: rotation.y, rz: rotation.z };
  } else if (transformType === 'translation') {
    codeParams = { tx: translation.x, ty: translation.y, tz: translation.z };
  } else if (transformType === 'scaling') {
    codeParams = { sx: scaling.x, sy: scaling.y, sz: scaling.z };
  } else if (transformType === 'projection') {
    codeParams = { ...perspectiveParams, ...orthographicParams };
  } else if (transformType === 'camera') {
    codeParams = { eye: cameraEye };
  }

  const codeSnippet = getTransformCodeSnippet(transformType, codeParams);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-purple-900 mb-4">{codeSnippet.title}</h3>
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-green-400 text-sm font-mono">
          <code>{codeSnippet.code}</code>
        </pre>
      </div>
      <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <p className="font-semibold text-blue-900 mb-1">💡 Tip:</p>
        <p>This code shows how to implement {transformType} transformations in JavaScript. Copy and adapt it for your own projects!</p>
      </div>
    </div>
  );
};

export default Transform3DCodeDisplay;

