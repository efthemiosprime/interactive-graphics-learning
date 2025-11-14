import React from 'react';

const TransformationControls = ({
  currentModule,
  currentStep,
  // Scaling
  scaleX,
  setScaleX,
  scaleY,
  setScaleY,
  // Translation
  translateX,
  setTranslateX,
  translateY,
  setTranslateY,
  // Rotation
  rotationAngle,
  setRotationAngle,
  // Reflection
  reflectionAxis,
  setReflectionAxis,
  // Quaternions
  quaternionW,
  setQuaternionW,
  quaternionX,
  setQuaternionX,
  quaternionY,
  setQuaternionY,
  quaternionZ,
  setQuaternionZ,
  // Projections
  projectionType,
  setProjectionType,
  fov,
  setFov,
  aspect,
  setAspect,
  near,
  setNear,
  far,
  setFar,
  orthoLeft,
  setOrthoLeft,
  orthoRight,
  setOrthoRight,
  orthoBottom,
  setOrthoBottom,
  orthoTop,
  setOrthoTop,
  orthoNear,
  setOrthoNear,
  orthoFar,
  setOrthoFar,
  // Combined
  combinedScale,
  setCombinedScale,
  combinedRotation,
  setCombinedRotation,
  combinedTranslateX,
  setCombinedTranslateX
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Interactive Controls</h2>
      
      {/* Module-specific Controls */}
      {currentModule === 'quaternions' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quaternion Parameters</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              W: {quaternionW.toFixed(3)}
            </label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={quaternionW}
              onChange={(e) => setQuaternionW(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              X: {quaternionX.toFixed(3)}
            </label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={quaternionX}
              onChange={(e) => setQuaternionX(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Y: {quaternionY.toFixed(3)}
            </label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={quaternionY}
              onChange={(e) => setQuaternionY(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Z: {quaternionZ.toFixed(3)}
            </label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={quaternionZ}
              onChange={(e) => setQuaternionZ(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            Magnitude: {Math.sqrt(quaternionW*quaternionW + quaternionX*quaternionX + quaternionY*quaternionY + quaternionZ*quaternionZ).toFixed(3)}
          </div>
        </div>
      )}

      {currentModule === 'projection' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Parameters</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projection Type
            </label>
            <select
              value={projectionType}
              onChange={(e) => setProjectionType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="perspective">Perspective</option>
              <option value="orthographic">Orthographic</option>
            </select>
          </div>

          {projectionType === 'perspective' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  FOV (degrees): {((fov * 180) / Math.PI).toFixed(1)}°
                </label>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="1"
                  value={(fov * 180) / Math.PI}
                  onChange={(e) => setFov((parseFloat(e.target.value) * Math.PI) / 180)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aspect Ratio: {aspect.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={aspect}
                  onChange={(e) => setAspect(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Near Plane: {near.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={near}
                  onChange={(e) => setNear(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Far Plane: {far.toFixed(0)}
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={far}
                  onChange={(e) => setFar(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </>
          )}

          {projectionType === 'orthographic' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Left: {orthoLeft.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="-10"
                  max="0"
                  step="0.5"
                  value={orthoLeft}
                  onChange={(e) => setOrthoLeft(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Right: {orthoRight.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={orthoRight}
                  onChange={(e) => setOrthoRight(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bottom: {orthoBottom.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="-10"
                  max="0"
                  step="0.5"
                  value={orthoBottom}
                  onChange={(e) => setOrthoBottom(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top: {orthoTop.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={orthoTop}
                  onChange={(e) => setOrthoTop(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </>
          )}
        </div>
      )}

      {currentModule === 'scaling' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Scaling Parameters</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scale X: {scaleX.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.01"
              value={scaleX}
              onChange={(e) => setScaleX(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scale Y: {scaleY.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.01"
              value={scaleY}
              onChange={(e) => setScaleY(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          
          <button
            onClick={() => {
              setScaleX(1);
              setScaleY(1);
            }}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
          >
            Reset to Identity
          </button>
        </div>
      )}

      {currentModule === 'translation' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Translation Parameters</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Translate X: {translateX.toFixed(2)}
            </label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={translateX}
              onChange={(e) => setTranslateX(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Translate Y: {translateY.toFixed(2)}
            </label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={translateY}
              onChange={(e) => setTranslateY(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          
          <button
            onClick={() => {
              setTranslateX(0);
              setTranslateY(0);
            }}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
          >
            Reset to Origin
          </button>
        </div>
      )}

      {currentModule === 'rotation' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Rotation Parameters</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Angle: {rotationAngle.toFixed(2)}° ({((rotationAngle * Math.PI) / 180).toFixed(3)} rad)
            </label>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={rotationAngle}
              onChange={(e) => setRotationAngle(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setRotationAngle(0)}
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
            >
              0°
            </button>
            <button
              onClick={() => setRotationAngle(90)}
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
            >
              90°
            </button>
            <button
              onClick={() => setRotationAngle(180)}
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
            >
              180°
            </button>
            <button
              onClick={() => setRotationAngle(270)}
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
            >
              270°
            </button>
          </div>
        </div>
      )}

      {currentModule === 'reflection' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Reflection Parameters</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reflection Axis
            </label>
            <select
              value={reflectionAxis}
              onChange={(e) => setReflectionAxis(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="x">X-Axis</option>
              <option value="y">Y-Axis</option>
              <option value="origin">Origin</option>
              <option value="diagonal">Diagonal (y=x)</option>
            </select>
          </div>
        </div>
      )}

      {currentModule === 'combined' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Combined Transformation</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scale: {combinedScale.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.01"
              value={combinedScale}
              onChange={(e) => setCombinedScale(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rotation: {combinedRotation.toFixed(2)}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={combinedRotation}
              onChange={(e) => setCombinedRotation(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Translate X: {combinedTranslateX.toFixed(2)}
            </label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={combinedTranslateX}
              onChange={(e) => setCombinedTranslateX(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransformationControls;

