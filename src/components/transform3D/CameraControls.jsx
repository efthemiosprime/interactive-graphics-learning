import React from 'react';

const CameraControls = ({
  cameraType,
  setCameraType,
  cameraEye,
  setCameraEye,
  cameraTarget,
  setCameraTarget,
  cameraUp,
  setCameraUp
}) => {
  const handleCameraEyeChange = (axis, value) => {
    setCameraEye(prev => ({
      ...prev,
      [axis]: parseFloat(value)
    }));
  };

  const handleCameraTargetChange = (axis, value) => {
    setCameraTarget(prev => ({
      ...prev,
      [axis]: parseFloat(value)
    }));
  };

  const handleCameraUpChange = (axis, value) => {
    setCameraUp(prev => ({
      ...prev,
      [axis]: parseFloat(value)
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Camera Type
        </label>
        <select
          value={cameraType}
          onChange={(e) => setCameraType(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg"
        >
          <option value="fps">FPS (First-Person)</option>
          <option value="orbit">Orbit</option>
          <option value="free">Free Look</option>
        </select>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-700 mb-3">Camera Position (Eye)</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Eye X: {cameraEye.x.toFixed(2)}
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={cameraEye.x}
              onChange={(e) => handleCameraEyeChange('x', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Eye Y: {cameraEye.y.toFixed(2)}
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={cameraEye.y}
              onChange={(e) => handleCameraEyeChange('y', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Eye Z: {cameraEye.z.toFixed(2)}
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={cameraEye.z}
              onChange={(e) => handleCameraEyeChange('z', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-700 mb-3">Target Point</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Target X: {cameraTarget.x.toFixed(2)}
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={cameraTarget.x}
              onChange={(e) => handleCameraTargetChange('x', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Target Y: {cameraTarget.y.toFixed(2)}
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={cameraTarget.y}
              onChange={(e) => handleCameraTargetChange('y', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Target Z: {cameraTarget.z.toFixed(2)}
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={cameraTarget.z}
              onChange={(e) => handleCameraTargetChange('z', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-700 mb-3">Up Vector</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Up X: {cameraUp.x.toFixed(2)}
            </label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={cameraUp.x}
              onChange={(e) => handleCameraUpChange('x', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Up Y: {cameraUp.y.toFixed(2)}
            </label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={cameraUp.y}
              onChange={(e) => handleCameraUpChange('y', e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Up Z: {cameraUp.z.toFixed(2)}
            </label>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={cameraUp.z}
              onChange={(e) => handleCameraUpChange('z', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraControls;

