import React from 'react';

const TransformationParameterDisplay = ({
  currentModule,
  scaleX,
  scaleY,
  translateX,
  translateY,
  rotationAngle,
  reflectionAxis,
  quaternionW,
  quaternionX,
  quaternionY,
  quaternionZ,
  projectionType,
  fov,
  aspect,
  near,
  far,
  orthoLeft,
  orthoRight,
  orthoBottom,
  orthoTop,
  orthoNear,
  orthoFar,
  combinedScale,
  combinedRotation,
  combinedTranslateX
}) => {
  if (currentModule === 'matrix-operations') {
    return null;
  }

  const renderParameters = () => {
    switch (currentModule) {
      case 'scaling':
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Scale X:</span>
              <span className="text-sm font-mono text-blue-600">{scaleX.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Scale Y:</span>
              <span className="text-sm font-mono text-blue-600">{scaleY.toFixed(2)}</span>
            </div>
          </div>
        );

      case 'translation':
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Translate X:</span>
              <span className="text-sm font-mono text-blue-600">{translateX.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Translate Y:</span>
              <span className="text-sm font-mono text-blue-600">{translateY.toFixed(2)}</span>
            </div>
          </div>
        );

      case 'rotation':
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Angle:</span>
              <span className="text-sm font-mono text-blue-600">{rotationAngle.toFixed(2)}°</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Radians:</span>
              <span className="text-sm font-mono text-blue-600">{((rotationAngle * Math.PI) / 180).toFixed(3)}</span>
            </div>
          </div>
        );

      case 'reflection':
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Axis:</span>
              <span className="text-sm font-mono text-blue-600 capitalize">{reflectionAxis}</span>
            </div>
          </div>
        );

      case 'quaternions':
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">W:</span>
              <span className="text-sm font-mono text-blue-600">{quaternionW.toFixed(3)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">X:</span>
              <span className="text-sm font-mono text-blue-600">{quaternionX.toFixed(3)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Y:</span>
              <span className="text-sm font-mono text-blue-600">{quaternionY.toFixed(3)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Z:</span>
              <span className="text-sm font-mono text-blue-600">{quaternionZ.toFixed(3)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-700">Magnitude:</span>
              <span className="text-sm font-mono text-blue-600">
                {Math.sqrt(quaternionW*quaternionW + quaternionX*quaternionX + quaternionY*quaternionY + quaternionZ*quaternionZ).toFixed(3)}
              </span>
            </div>
          </div>
        );

      case 'projection':
        if (projectionType === 'perspective') {
          return (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Type:</span>
                <span className="text-sm font-mono text-blue-600 capitalize">{projectionType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">FOV:</span>
                <span className="text-sm font-mono text-blue-600">{((fov * 180) / Math.PI).toFixed(1)}°</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Aspect:</span>
                <span className="text-sm font-mono text-blue-600">{aspect.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Near:</span>
                <span className="text-sm font-mono text-blue-600">{near.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Far:</span>
                <span className="text-sm font-mono text-blue-600">{far.toFixed(0)}</span>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Type:</span>
                <span className="text-sm font-mono text-blue-600 capitalize">{projectionType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Left:</span>
                <span className="text-sm font-mono text-blue-600">{orthoLeft.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Right:</span>
                <span className="text-sm font-mono text-blue-600">{orthoRight.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Bottom:</span>
                <span className="text-sm font-mono text-blue-600">{orthoBottom.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Top:</span>
                <span className="text-sm font-mono text-blue-600">{orthoTop.toFixed(1)}</span>
              </div>
            </div>
          );
        }

      case 'combined':
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Scale:</span>
              <span className="text-sm font-mono text-blue-600">{combinedScale.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Rotation:</span>
              <span className="text-sm font-mono text-blue-600">{combinedRotation.toFixed(2)}°</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Translate X:</span>
              <span className="text-sm font-mono text-blue-600">{combinedTranslateX.toFixed(2)}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Parameters</h3>
      {renderParameters()}
    </div>
  );
};

export default TransformationParameterDisplay;

