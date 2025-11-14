import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimationInterpolationControls from '../components/animationInterpolation/AnimationInterpolationControls';
import AnimationVisualization from '../components/animationInterpolation/AnimationVisualization';
import AnimationInterpolationEducationalPanels from '../components/animationInterpolation/AnimationInterpolationEducationalPanels';

export default function AnimationInterpolation() {
  const [interpolationType, setInterpolationType] = useState('linear');
  
  // Linear Interpolation state
  const [linearStart, setLinearStart] = useState({ x: 0.1, y: 0.1 });
  const [linearEnd, setLinearEnd] = useState({ x: 0.9, y: 0.9 });
  
  // Easing Functions state
  const [easingType, setEasingType] = useState('easeIn');
  const [easingPower, setEasingPower] = useState(2);
  
  // Bezier Easing state
  const [bezierEasingPoints, setBezierEasingPoints] = useState([
    { x: 0.25, y: 0.1 },
    { x: 0.25, y: 1.0 }
  ]);
  
  // Spherical Linear Interpolation (SLERP) state
  const [slerpStart, setSlerpStart] = useState({ x: 1, y: 0, z: 0 });
  const [slerpEnd, setSlerpEnd] = useState({ x: 0, y: 1, z: 0 });
  
  // Keyframe Animation state
  const [keyframes, setKeyframes] = useState([
    { time: 0, value: 0.1 },
    { time: 0.5, value: 0.8 },
    { time: 1.0, value: 0.3 }
  ]);
  const [keyframeInterpolation, setKeyframeInterpolation] = useState('linear');
  
  // Path Animation state
  const [pathPoints, setPathPoints] = useState([
    { x: 0.1, y: 0.5 },
    { x: 0.3, y: 0.8 },
    { x: 0.7, y: 0.2 },
    { x: 0.9, y: 0.6 }
  ]);
  const [pathType, setPathType] = useState('bezier');
  
  // Time state for animation
  const [time, setTime] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-purple-900 mb-2">Animation & Interpolation</h1>
            <p className="text-purple-700">Learn interpolation techniques, easing functions, and animation principles</p>
          </div>
        </div>

        {/* Interpolation Type Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Interpolation Type</h2>
          <select
            value={interpolationType}
            onChange={(e) => setInterpolationType(e.target.value)}
            className="w-full p-3 border-2 border-purple-300 rounded-lg text-lg"
          >
            <option value="linear">1. Linear Interpolation (LERP)</option>
            <option value="easing">2. Easing Functions</option>
            <option value="bezierEasing">3. Bezier Easing</option>
            <option value="slerp">4. Spherical Linear Interpolation (SLERP)</option>
            <option value="keyframes">5. Keyframe Animation</option>
            <option value="path">6. Path Animation</option>
          </select>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Visualization and Controls */}
          <div className="space-y-6">
            {/* Animation Visualization */}
            <AnimationVisualization
              interpolationType={interpolationType}
              linearStart={linearStart}
              linearEnd={linearEnd}
              easingType={easingType}
              easingPower={easingPower}
              bezierEasingPoints={bezierEasingPoints}
              slerpStart={slerpStart}
              slerpEnd={slerpEnd}
              keyframes={keyframes}
              keyframeInterpolation={keyframeInterpolation}
              pathPoints={pathPoints}
              pathType={pathType}
              time={time}
              setTime={setTime}
            />

            {/* Controls */}
            <AnimationInterpolationControls
              interpolationType={interpolationType}
              linearStart={linearStart}
              setLinearStart={setLinearStart}
              linearEnd={linearEnd}
              setLinearEnd={setLinearEnd}
              easingType={easingType}
              setEasingType={setEasingType}
              easingPower={easingPower}
              setEasingPower={setEasingPower}
              bezierEasingPoints={bezierEasingPoints}
              setBezierEasingPoints={setBezierEasingPoints}
              slerpStart={slerpStart}
              setSlerpStart={setSlerpStart}
              slerpEnd={slerpEnd}
              setSlerpEnd={setSlerpEnd}
              keyframes={keyframes}
              setKeyframes={setKeyframes}
              keyframeInterpolation={keyframeInterpolation}
              setKeyframeInterpolation={setKeyframeInterpolation}
              pathPoints={pathPoints}
              setPathPoints={setPathPoints}
              pathType={pathType}
              setPathType={setPathType}
              time={time}
              setTime={setTime}
            />
          </div>

          {/* Right Column - Educational Content */}
          <div>
            <AnimationInterpolationEducationalPanels
              interpolationType={interpolationType}
              linearStart={linearStart}
              linearEnd={linearEnd}
              easingType={easingType}
              easingPower={easingPower}
              bezierEasingPoints={bezierEasingPoints}
              slerpStart={slerpStart}
              slerpEnd={slerpEnd}
              keyframes={keyframes}
              keyframeInterpolation={keyframeInterpolation}
              pathPoints={pathPoints}
              pathType={pathType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

