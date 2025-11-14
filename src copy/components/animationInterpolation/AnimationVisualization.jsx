import React, { useRef, useEffect } from 'react';
import * as animationUtils from '../../utils/animationInterpolation';

const AnimationVisualization = ({
  interpolationType,
  linearStart,
  linearEnd,
  easingType,
  easingPower,
  bezierEasingPoints,
  slerpStart,
  slerpEnd,
  keyframes,
  keyframeInterpolation,
  pathPoints,
  pathType,
  time,
  setTime
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const drawWidth = width - 2 * padding;
    const drawHeight = height - 2 * padding;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * drawWidth;
      const y = padding + (i / 10) * drawHeight;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding);
    ctx.stroke();

    // Convert normalized coordinates (0-1) to canvas coordinates
    const toCanvasX = (x) => padding + x * drawWidth;
    const toCanvasY = (y) => height - padding - y * drawHeight;

    // Draw based on interpolation type
    if (interpolationType === 'linear') {
      animationUtils.drawLinearInterpolation(ctx, linearStart, linearEnd, time, toCanvasX, toCanvasY);
    } else if (interpolationType === 'easing') {
      animationUtils.drawEasingFunction(ctx, easingType, easingPower, time, toCanvasX, toCanvasY, drawWidth, drawHeight, padding);
    } else if (interpolationType === 'bezierEasing') {
      animationUtils.drawBezierEasing(ctx, bezierEasingPoints, time, toCanvasX, toCanvasY, drawWidth, drawHeight, padding);
    } else if (interpolationType === 'slerp') {
      animationUtils.drawSlerp(ctx, slerpStart, slerpEnd, time, toCanvasX, toCanvasY, drawWidth, drawHeight, padding);
    } else if (interpolationType === 'keyframes') {
      animationUtils.drawKeyframeAnimation(ctx, keyframes, keyframeInterpolation, time, toCanvasX, toCanvasY, drawWidth, drawHeight, padding);
    } else if (interpolationType === 'path') {
      animationUtils.drawPathAnimation(ctx, pathPoints, pathType, time, toCanvasX, toCanvasY);
    }
  }, [
    interpolationType,
    linearStart,
    linearEnd,
    easingType,
    easingPower,
    bezierEasingPoints,
    slerpStart,
    slerpEnd,
    keyframes,
    keyframeInterpolation,
    pathPoints,
    pathType,
    time
  ]);

  // Auto-animate if desired (optional)
  useEffect(() => {
    if (interpolationType !== 'keyframes') {
      // Auto-animate for non-keyframe types
      const interval = setInterval(() => {
        setTime(prev => {
          const next = prev + 0.01;
          return next > 1 ? 0 : next;
        });
      }, 16); // ~60fps

      return () => clearInterval(interval);
    }
  }, [interpolationType, setTime]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-4">Visualization</h2>
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="w-full border-2 border-gray-200 rounded-lg"
      />
    </div>
  );
};

export default AnimationVisualization;

