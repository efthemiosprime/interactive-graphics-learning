import React from 'react';
import LinearInterpolationControls from './LinearInterpolationControls';
import EasingControls from './EasingControls';
import BezierEasingControls from './BezierEasingControls';
import SlerpControls from './SlerpControls';
import KeyframeControls from './KeyframeControls';
import PathAnimationControls from './PathAnimationControls';

const AnimationInterpolationControls = ({
  interpolationType,
  // Linear
  linearStart,
  setLinearStart,
  linearEnd,
  setLinearEnd,
  // Easing
  easingType,
  setEasingType,
  easingPower,
  setEasingPower,
  // Bezier Easing
  bezierEasingPoints,
  setBezierEasingPoints,
  // SLERP
  slerpStart,
  setSlerpStart,
  slerpEnd,
  setSlerpEnd,
  // Keyframes
  keyframes,
  setKeyframes,
  keyframeInterpolation,
  setKeyframeInterpolation,
  // Path
  pathPoints,
  setPathPoints,
  pathType,
  setPathType,
  // Time
  time,
  setTime
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-4">Animation Controls</h2>
      
      {/* Time Control */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Time (t): {time.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={time}
          onChange={(e) => setTime(parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          t = 0: start, t = 1: end
        </p>
      </div>
      
      {interpolationType === 'linear' && (
        <LinearInterpolationControls
          start={linearStart}
          setStart={setLinearStart}
          end={linearEnd}
          setEnd={setLinearEnd}
        />
      )}
      
      {interpolationType === 'easing' && (
        <EasingControls
          easingType={easingType}
          setEasingType={setEasingType}
          power={easingPower}
          setPower={setEasingPower}
        />
      )}
      
      {interpolationType === 'bezierEasing' && (
        <BezierEasingControls
          points={bezierEasingPoints}
          setPoints={setBezierEasingPoints}
        />
      )}
      
      {interpolationType === 'slerp' && (
        <SlerpControls
          start={slerpStart}
          setStart={setSlerpStart}
          end={slerpEnd}
          setSlerpEnd={setSlerpEnd}
        />
      )}
      
      {interpolationType === 'keyframes' && (
        <KeyframeControls
          keyframes={keyframes}
          setKeyframes={setKeyframes}
          interpolation={keyframeInterpolation}
          setInterpolation={setKeyframeInterpolation}
        />
      )}
      
      {interpolationType === 'path' && (
        <PathAnimationControls
          points={pathPoints}
          setPoints={setPathPoints}
          pathType={pathType}
          setPathType={setPathType}
        />
      )}
    </div>
  );
};

export default AnimationInterpolationControls;

