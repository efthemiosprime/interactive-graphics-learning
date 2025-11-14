import React from 'react';

const ProjectionControls = ({
  projectionType,
  setProjectionType,
  perspectiveParams,
  setPerspectiveParams,
  orthographicParams,
  setOrthographicParams
}) => {
  const handlePerspectiveChange = (param, value) => {
    setPerspectiveParams(prev => ({
      ...prev,
      [param]: parseFloat(value)
    }));
  };

  const handleOrthographicChange = (param, value) => {
    setOrthographicParams(prev => ({
      ...prev,
      [param]: parseFloat(value)
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Projection Type
        </label>
        <select
          value={projectionType}
          onChange={(e) => setProjectionType(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg"
        >
          <option value="perspective">Perspective</option>
          <option value="orthographic">Orthographic</option>
        </select>
      </div>

      {projectionType === 'perspective' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Field of View (FOV): {perspectiveParams.fov.toFixed(1)}°
            </label>
            <input
              type="range"
              min="10"
              max="120"
              step="1"
              value={perspectiveParams.fov * 180 / Math.PI}
              onChange={(e) => handlePerspectiveChange('fov', e.target.value * Math.PI / 180)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Aspect Ratio: {perspectiveParams.aspect.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={perspectiveParams.aspect}
              onChange={(e) => handlePerspectiveChange('aspect', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Near Plane: {perspectiveParams.near.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={perspectiveParams.near}
              onChange={(e) => handlePerspectiveChange('near', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Far Plane: {perspectiveParams.far.toFixed(2)}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={perspectiveParams.far}
              onChange={(e) => handlePerspectiveChange('far', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      )}

      {projectionType === 'orthographic' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Left: {orthographicParams.left.toFixed(1)}
            </label>
            <input
              type="range"
              min="-10"
              max="0"
              step="0.5"
              value={orthographicParams.left}
              onChange={(e) => handleOrthographicChange('left', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Right: {orthographicParams.right.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={orthographicParams.right}
              onChange={(e) => handleOrthographicChange('right', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bottom: {orthographicParams.bottom.toFixed(1)}
            </label>
            <input
              type="range"
              min="-10"
              max="0"
              step="0.5"
              value={orthographicParams.bottom}
              onChange={(e) => handleOrthographicChange('bottom', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Top: {orthographicParams.top.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={orthographicParams.top}
              onChange={(e) => handleOrthographicChange('top', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Near: {orthographicParams.near.toFixed(1)}
            </label>
            <input
              type="range"
              min="-10"
              max="0"
              step="0.5"
              value={orthographicParams.near}
              onChange={(e) => handleOrthographicChange('near', e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Far: {orthographicParams.far.toFixed(1)}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={orthographicParams.far}
              onChange={(e) => handleOrthographicChange('far', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectionControls;

