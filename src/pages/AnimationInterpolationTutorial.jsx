import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Code, FileText } from 'lucide-react';

export default function AnimationInterpolationTutorial() {
  const [expandedSteps, setExpandedSteps] = useState({});

  const toggleStep = (stepIndex) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  const steps = [
    {
      title: 'Step 1: Set Up Vite Project',
      description: 'Create a new Vite project with vanilla JavaScript',
      code: `# Create a new Vite project
npm create vite@latest animation-interpolation -- --template vanilla

# Navigate to project directory
cd animation-interpolation

# Install dependencies
npm install`,
      explanation: 'Vite provides fast development with hot module replacement. This sets up a basic vanilla JavaScript project perfect for building an animation and interpolation visualization editor.',
      files: [
        {
          name: 'package.json',
          content: `{
  "name": "animation-interpolation",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}`
        }
      ]
    },
    {
      title: 'Step 2: Create HTML Structure',
      description: 'Set up the HTML file with canvas and animation controls',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Animation & Interpolation Editor</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: #1a1a2e;
      color: #fff;
      font-family: 'Courier New', monospace;
    }
    .container {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    #canvas {
      border: 2px solid #6366f1;
      border-radius: 8px;
      display: block;
      background: #0f0f1e;
    }
    .controls {
      background: #16213e;
      padding: 20px;
      border-radius: 8px;
      height: fit-content;
    }
    .control-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      color: #a5b4fc;
    }
    select, input[type="range"] {
      width: 100%;
      padding: 8px;
      background: #0f0f1e;
      color: #fff;
      border: 1px solid #6366f1;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 10px;
      background: #6366f1;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    button:hover {
      background: #7c7cf8;
    }
  </style>
</head>
<body>
  <div class="container">
    <div>
      <h1>Animation & Interpolation Editor</h1>
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
    <div class="controls">
      <h2>Controls</h2>
      <div class="control-group">
        <label>Interpolation Type:</label>
        <select id="interpolationType">
          <option value="linear">Linear (LERP)</option>
          <option value="easing">Easing Functions</option>
          <option value="bezierEasing">Bezier Easing</option>
          <option value="keyframes">Keyframe Animation</option>
        </select>
      </div>
      <div class="control-group">
        <label>Time: <span id="timeValue">0.0</span></label>
        <input type="range" id="time" min="0" max="1" step="0.01" value="0">
      </div>
      <div class="control-group">
        <button id="playPause">Play</button>
      </div>
    </div>
  </div>
  <script type="module" src="/main.js"></script>
</body>
</html>`,
      explanation: 'The HTML structure includes a canvas for rendering animations and controls for selecting interpolation types and controlling time. We include a play/pause button for animation control.',
      files: [
        {
          name: 'index.html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Animation & Interpolation Editor</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="container">
    <div>
      <h1>Animation & Interpolation Editor</h1>
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
    <div class="controls">
      <!-- Controls here -->
    </div>
  </div>
  <script type="module" src="/main.js"></script>
</body>
</html>`
        }
      ]
    },
    {
      title: 'Step 3: Initialize Canvas and Animation Loop',
      description: 'Set up canvas and create animation loop with requestAnimationFrame',
      code: `// main.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Animation state
let isPlaying = false;
let animationStartTime = 0;
let currentTime = 0;
let animationDuration = 2.0; // seconds

// Clear canvas
function clear() {
  ctx.fillStyle = '#0f0f1e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid
  ctx.strokeStyle = '#333366';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

// Animation loop
let lastFrameTime = 0;
function animate(currentFrameTime) {
  if (isPlaying) {
    const deltaTime = (currentFrameTime - lastFrameTime) / 1000; // Convert to seconds
    lastFrameTime = currentFrameTime;
    
    currentTime += deltaTime;
    if (currentTime >= animationDuration) {
      currentTime = 0; // Loop
    }
    
    render();
  }
  
  requestAnimationFrame(animate);
}

// Start animation loop
requestAnimationFrame(animate);

console.log('Animation loop initialized!');`,
      explanation: 'We set up an animation loop using requestAnimationFrame for smooth 60fps rendering. The loop updates time and calls render each frame. We track deltaTime for frame-independent animation.',
      files: [
        {
          name: 'main.js',
          content: `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isPlaying = false;
let animationStartTime = 0;
let currentTime = 0;
let animationDuration = 2.0;

function clear() {
  ctx.fillStyle = '#0f0f1e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ... (grid drawing as shown above)
}

let lastFrameTime = 0;
function animate(currentFrameTime) {
  if (isPlaying) {
    const deltaTime = (currentFrameTime - lastFrameTime) / 1000;
    lastFrameTime = currentFrameTime;
    currentTime += deltaTime;
    if (currentTime >= animationDuration) {
      currentTime = 0;
    }
    render();
  }
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);`
        }
      ]
    },
    {
      title: 'Step 4: Implement Linear Interpolation (LERP)',
      description: 'Create linear interpolation function and visualization',
      code: `// interpolation/Linear.js

// Linear interpolation between two values
export function lerp(start, end, t) {
  // Clamp t between 0 and 1
  t = Math.max(0, Math.min(1, t));
  return start + (end - start) * t;
}

// Linear interpolation for 2D points
export function lerp2D(p0, p1, t) {
  return {
    x: lerp(p0.x, p1.x, t),
    y: lerp(p0.y, p1.y, t)
  };
}

// Draw linear interpolation visualization
export function drawLinearInterpolation(ctx, start, end, t, canvasWidth, canvasHeight) {
  // Convert normalized coordinates (0-1) to screen coordinates
  const screenStart = {
    x: start.x * canvasWidth,
    y: start.y * canvasHeight
  };
  const screenEnd = {
    x: end.x * canvasWidth,
    y: end.y * canvasHeight
  };
  const current = lerp2D(start, end, t);
  const screenCurrent = {
    x: current.x * canvasWidth,
    y: current.y * canvasHeight
  };
  
  // Draw line from start to end
  ctx.strokeStyle = '#666666';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(screenStart.x, screenStart.y);
  ctx.lineTo(screenEnd.x, screenEnd.y);
  ctx.stroke();
  
  // Draw start point
  ctx.fillStyle = '#ff6b6b';
  ctx.beginPath();
  ctx.arc(screenStart.x, screenStart.y, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw end point
  ctx.fillStyle = '#4ecdc4';
  ctx.beginPath();
  ctx.arc(screenEnd.x, screenEnd.y, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw current interpolated point
  ctx.fillStyle = '#6366f1';
  ctx.beginPath();
  ctx.arc(screenCurrent.x, screenCurrent.y, 12, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw trail
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 2]);
  ctx.beginPath();
  ctx.moveTo(screenStart.x, screenStart.y);
  ctx.lineTo(screenCurrent.x, screenCurrent.y);
  ctx.stroke();
  ctx.setLineDash([]);
}`,
      explanation: 'Linear interpolation (LERP) creates a straight-line transition between two values. It is the simplest form of interpolation and forms the basis for more complex easing functions.',
      files: [
        {
          name: 'interpolation/Linear.js',
          content: `export function lerp(start, end, t) {
  t = Math.max(0, Math.min(1, t));
  return start + (end - start) * t;
}

export function lerp2D(p0, p1, t) {
  return {
    x: lerp(p0.x, p1.x, t),
    y: lerp(p0.y, p1.y, t)
  };
}

export function drawLinearInterpolation(ctx, start, end, t, canvasWidth, canvasHeight) {
  // ... (drawing implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 5: Implement Easing Functions',
      description: 'Create easing functions (easeIn, easeOut, easeInOut)',
      code: `// interpolation/Easing.js

// Ease In (slow start, fast end)
export function easeIn(t, power = 2) {
  return Math.pow(t, power);
}

// Ease Out (fast start, slow end)
export function easeOut(t, power = 2) {
  return 1 - Math.pow(1 - t, power);
}

// Ease In Out (slow start and end, fast middle)
export function easeInOut(t, power = 2) {
  if (t < 0.5) {
    return Math.pow(2 * t, power) / 2;
  } else {
    return 1 - Math.pow(2 * (1 - t), power) / 2;
  }
}

// Apply easing to interpolation
export function lerpWithEasing(start, end, t, easingType = 'linear', power = 2) {
  let easedT = t;
  
  switch (easingType) {
    case 'easeIn':
      easedT = easeIn(t, power);
      break;
    case 'easeOut':
      easedT = easeOut(t, power);
      break;
    case 'easeInOut':
      easedT = easeInOut(t, power);
      break;
    case 'linear':
    default:
      easedT = t;
  }
  
  return start + (end - start) * easedT;
}

// Draw easing function graph
export function drawEasingGraph(ctx, easingType, power, canvasWidth, canvasHeight) {
  const padding = 50;
  const graphWidth = canvasWidth - padding * 2;
  const graphHeight = canvasHeight - padding * 2;
  
  // Draw axes
  ctx.strokeStyle = '#666666';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, padding + graphHeight);
  ctx.lineTo(padding + graphWidth, padding + graphHeight);
  ctx.stroke();
  
  // Draw grid
  ctx.strokeStyle = '#333366';
  for (let i = 0; i <= 10; i++) {
    const x = padding + (graphWidth / 10) * i;
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, padding + graphHeight);
    ctx.stroke();
    
    const y = padding + (graphHeight / 10) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(padding + graphWidth, y);
    ctx.stroke();
  }
  
  // Draw easing curve
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    let easedT;
    
    switch (easingType) {
      case 'easeIn':
        easedT = easeIn(t, power);
        break;
      case 'easeOut':
        easedT = easeOut(t, power);
        break;
      case 'easeInOut':
        easedT = easeInOut(t, power);
        break;
      default:
        easedT = t;
    }
    
    const x = padding + graphWidth * t;
    const y = padding + graphHeight * (1 - easedT); // Flip Y
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.stroke();
}`,
      explanation: 'Easing functions modify the interpolation rate to create natural motion. EaseIn starts slow, EaseOut ends slow, and EaseInOut combines both for smooth acceleration and deceleration.',
      files: [
        {
          name: 'interpolation/Easing.js',
          content: `export function easeIn(t, power = 2) {
  return Math.pow(t, power);
}

export function easeOut(t, power = 2) {
  return 1 - Math.pow(1 - t, power);
}

export function easeInOut(t, power = 2) {
  if (t < 0.5) {
    return Math.pow(2 * t, power) / 2;
  } else {
    return 1 - Math.pow(2 * (1 - t), power) / 2;
  }
}

export function lerpWithEasing(start, end, t, easingType = 'linear', power = 2) {
  // ... (implementation as shown above)
}

export function drawEasingGraph(ctx, easingType, power, canvasWidth, canvasHeight) {
  // ... (drawing implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 6: Implement Bezier Easing',
      description: 'Create cubic Bezier easing for custom animation curves',
      code: `// interpolation/BezierEasing.js

// Calculate point on cubic Bezier curve
function bezierPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  
  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y
  };
}

// Bezier easing - uses Bezier curve to map time
export function bezierEasing(t, cp1x, cp1y, cp2x, cp2y) {
  // Control points for Bezier curve (0,0) -> (cp1) -> (cp2) -> (1,1)
  const p0 = { x: 0, y: 0 };
  const p1 = { x: cp1x, y: cp1y };
  const p2 = { x: cp2x, y: cp2y };
  const p3 = { x: 1, y: 1 };
  
  // Binary search to find t that gives us the desired x value
  let low = 0;
  let high = 1;
  let mid;
  
  for (let i = 0; i < 20; i++) {
    mid = (low + high) / 2;
    const point = bezierPoint(p0, p1, p2, p3, mid);
    
    if (Math.abs(point.x - t) < 0.001) {
      return point.y;
    } else if (point.x < t) {
      low = mid;
    } else {
      high = mid;
    }
  }
  
  return bezierPoint(p0, p1, p2, p3, mid).y;
}

// Apply Bezier easing to interpolation
export function lerpWithBezierEasing(start, end, t, cp1x, cp1y, cp2x, cp2y) {
  const easedT = bezierEasing(t, cp1x, cp1y, cp2x, cp2y);
  return start + (end - start) * easedT;
}

// Draw Bezier easing curve
export function drawBezierEasingCurve(ctx, cp1x, cp1y, cp2x, cp2y, canvasWidth, canvasHeight) {
  const padding = 50;
  const graphWidth = canvasWidth - padding * 2;
  const graphHeight = canvasHeight - padding * 2;
  
  // Draw axes and grid (similar to easing graph)
  // ... (grid drawing code)
  
  // Draw Bezier curve
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const easedT = bezierEasing(t, cp1x, cp1y, cp2x, cp2y);
    
    const x = padding + graphWidth * t;
    const y = padding + graphHeight * (1 - easedT);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.stroke();
  
  // Draw control points
  ctx.fillStyle = '#ff6b6b';
  ctx.beginPath();
  ctx.arc(padding + graphWidth * cp1x, padding + graphHeight * (1 - cp1y), 6, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(padding + graphWidth * cp2x, padding + graphHeight * (1 - cp2y), 6, 0, Math.PI * 2);
  ctx.fill();
}`,
      explanation: 'Bezier easing uses a cubic Bezier curve to define custom easing functions. This allows for precise control over animation timing, similar to CSS cubic-bezier() functions. We use binary search to map time values.',
      files: [
        {
          name: 'interpolation/BezierEasing.js',
          content: `function bezierPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y
  };
}

export function bezierEasing(t, cp1x, cp1y, cp2x, cp2y) {
  // ... (implementation as shown above)
}

export function lerpWithBezierEasing(start, end, t, cp1x, cp1y, cp2x, cp2y) {
  // ... (implementation as shown above)
}

export function drawBezierEasingCurve(ctx, cp1x, cp1y, cp2x, cp2y, canvasWidth, canvasHeight) {
  // ... (drawing implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 7: Implement Keyframe Animation',
      description: 'Create keyframe system for multi-point animations',
      code: `// animation/Keyframes.js

// Keyframe structure: { time: 0-1, value: number }
export class KeyframeAnimation {
  constructor(keyframes) {
    this.keyframes = keyframes.sort((a, b) => a.time - b.time);
  }
  
  // Get value at specific time
  getValue(t, interpolationType = 'linear') {
    t = Math.max(0, Math.min(1, t));
    
    // Find surrounding keyframes
    let prevKeyframe = this.keyframes[0];
    let nextKeyframe = this.keyframes[this.keyframes.length - 1];
    
    for (let i = 0; i < this.keyframes.length - 1; i++) {
      if (t >= this.keyframes[i].time && t <= this.keyframes[i + 1].time) {
        prevKeyframe = this.keyframes[i];
        nextKeyframe = this.keyframes[i + 1];
        break;
      }
    }
    
    // If at exact keyframe
    if (t === prevKeyframe.time) {
      return prevKeyframe.value;
    }
    if (t === nextKeyframe.time) {
      return nextKeyframe.value;
    }
    
    // Normalize t between keyframes
    const keyframeRange = nextKeyframe.time - prevKeyframe.time;
    const localT = (t - prevKeyframe.time) / keyframeRange;
    
    // Apply interpolation
    let interpolatedT = localT;
    
    switch (interpolationType) {
      case 'easeIn':
        interpolatedT = localT * localT;
        break;
      case 'easeOut':
        interpolatedT = 1 - (1 - localT) * (1 - localT);
        break;
      case 'easeInOut':
        interpolatedT = localT < 0.5
          ? 2 * localT * localT
          : 1 - Math.pow(-2 * localT + 2, 2) / 2;
        break;
    }
    
    return prevKeyframe.value + (nextKeyframe.value - prevKeyframe.value) * interpolatedT;
  }
  
  // Add keyframe
  addKeyframe(time, value) {
    this.keyframes.push({ time, value });
    this.keyframes.sort((a, b) => a.time - b.time);
  }
  
  // Remove keyframe
  removeKeyframe(index) {
    this.keyframes.splice(index, 1);
  }
}

// Draw keyframe animation graph
export function drawKeyframeGraph(ctx, keyframes, t, canvasWidth, canvasHeight) {
  const padding = 50;
  const graphWidth = canvasWidth - padding * 2;
  const graphHeight = canvasHeight - padding * 2;
  
  // Draw axes and grid
  // ... (similar to easing graph)
  
  // Draw keyframe points
  ctx.fillStyle = '#ff6b6b';
  for (const keyframe of keyframes) {
    const x = padding + graphWidth * keyframe.time;
    const y = padding + graphHeight * (1 - keyframe.value);
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw interpolation curve
  const animation = new KeyframeAnimation(keyframes);
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  for (let i = 0; i <= 100; i++) {
    const time = i / 100;
    const value = animation.getValue(time);
    
    const x = padding + graphWidth * time;
    const y = padding + graphHeight * (1 - value);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.stroke();
  
  // Draw current time indicator
  const currentValue = animation.getValue(t);
  const currentX = padding + graphWidth * t;
  const currentY = padding + graphHeight * (1 - currentValue);
  
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(currentX, currentY, 10, 0, Math.PI * 2);
  ctx.fill();
}`,
      explanation: 'Keyframe animation allows defining values at specific times. The system interpolates between keyframes to create smooth animations. This is the foundation of timeline-based animation systems.',
      files: [
        {
          name: 'animation/Keyframes.js',
          content: `export class KeyframeAnimation {
  constructor(keyframes) {
    this.keyframes = keyframes.sort((a, b) => a.time - b.time);
  }
  
  getValue(t, interpolationType = 'linear') {
    // ... (implementation as shown above)
  }
  
  addKeyframe(time, value) {
    this.keyframes.push({ time, value });
    this.keyframes.sort((a, b) => a.time - b.time);
  }
  
  removeKeyframe(index) {
    this.keyframes.splice(index, 1);
  }
}

export function drawKeyframeGraph(ctx, keyframes, t, canvasWidth, canvasHeight) {
  // ... (drawing implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 8: Implement Path Animation',
      description: 'Create animation along a path using curve interpolation',
      code: `// animation/PathAnimation.js

import { bezierCurve } from '../curves/Bezier.js';
import { catmullRomSpline } from '../curves/CatmullRom.js';

// Animate object along a path
export class PathAnimation {
  constructor(pathPoints, pathType = 'bezier') {
    this.pathPoints = pathPoints;
    this.pathType = pathType;
    this.pathCurve = null;
    this.generatePath();
  }
  
  generatePath() {
    if (this.pathType === 'bezier') {
      // Generate Bezier curve points
      this.pathCurve = bezierCurve(this.pathPoints, 100);
    } else if (this.pathType === 'catmullrom') {
      // Generate Catmull-Rom spline points
      this.pathCurve = catmullRomSpline(this.pathPoints, 100);
    } else {
      // Linear path
      this.pathCurve = this.pathPoints;
    }
  }
  
  // Get position along path at time t (0-1)
  getPosition(t) {
    t = Math.max(0, Math.min(1, t));
    const index = Math.floor(t * (this.pathCurve.length - 1));
    return this.pathCurve[index] || this.pathCurve[this.pathCurve.length - 1];
  }
  
  // Get position with easing
  getPositionWithEasing(t, easingType = 'linear') {
    let easedT = t;
    
    switch (easingType) {
      case 'easeIn':
        easedT = t * t;
        break;
      case 'easeOut':
        easedT = 1 - (1 - t) * (1 - t);
        break;
      case 'easeInOut':
        easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        break;
    }
    
    return this.getPosition(easedT);
  }
}

// Draw path animation
export function drawPathAnimation(ctx, pathAnimation, t, canvasWidth, canvasHeight) {
  // Draw path
  ctx.strokeStyle = '#666666';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  if (pathAnimation.pathCurve.length > 0) {
    const first = pathAnimation.pathCurve[0];
    const screenX = first.x * canvasWidth;
    const screenY = first.y * canvasHeight;
    ctx.moveTo(screenX, screenY);
    
    for (let i = 1; i < pathAnimation.pathCurve.length; i++) {
      const point = pathAnimation.pathCurve[i];
      const screenX = point.x * canvasWidth;
      const screenY = point.y * canvasHeight;
      ctx.lineTo(screenX, screenY);
    }
  }
  
  ctx.stroke();
  
  // Draw control points
  ctx.fillStyle = '#ff6b6b';
  for (const point of pathAnimation.pathPoints) {
    const screenX = point.x * canvasWidth;
    const screenY = point.y * canvasHeight;
    ctx.beginPath();
    ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw animated object
  const position = pathAnimation.getPosition(t);
  const screenX = position.x * canvasWidth;
  const screenY = position.y * canvasHeight;
  
  ctx.fillStyle = '#6366f1';
  ctx.beginPath();
  ctx.arc(screenX, screenY, 12, 0, Math.PI * 2);
  ctx.fill();
}`,
      explanation: 'Path animation moves objects along curves. We use Bezier or Catmull-Rom curves to define the path, then sample positions along the curve based on time. This creates smooth motion along complex paths.',
      files: [
        {
          name: 'animation/PathAnimation.js',
          content: `import { bezierCurve } from '../curves/Bezier.js';
import { catmullRomSpline } from '../curves/CatmullRom.js';

export class PathAnimation {
  constructor(pathPoints, pathType = 'bezier') {
    this.pathPoints = pathPoints;
    this.pathType = pathType;
    this.pathCurve = null;
    this.generatePath();
  }
  
  generatePath() {
    // ... (implementation as shown above)
  }
  
  getPosition(t) {
    // ... (implementation as shown above)
  }
  
  getPositionWithEasing(t, easingType = 'linear') {
    // ... (implementation as shown above)
  }
}

export function drawPathAnimation(ctx, pathAnimation, t, canvasWidth, canvasHeight) {
  // ... (drawing implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 9: Connect Controls and Create Render Function',
      description: 'Set up UI controls and main render function',
      code: `// main.js (continued)

import { drawLinearInterpolation } from './interpolation/Linear.js';
import { drawEasingGraph, lerpWithEasing } from './interpolation/Easing.js';
import { drawBezierEasingCurve, lerpWithBezierEasing } from './interpolation/BezierEasing.js';
import { drawKeyframeGraph, KeyframeAnimation } from './animation/Keyframes.js';
import { drawPathAnimation, PathAnimation } from './animation/PathAnimation.js';

// Get UI elements
const interpolationTypeSelect = document.getElementById('interpolationType');
const timeSlider = document.getElementById('time');
const timeValueDisplay = document.getElementById('timeValue');
const playPauseButton = document.getElementById('playPause');

// Animation state
const startPoint = { x: 0.1, y: 0.5 };
const endPoint = { x: 0.9, y: 0.5 };
const keyframes = [
  { time: 0, value: 0.1 },
  { time: 0.5, value: 0.8 },
  { time: 1.0, value: 0.3 }
];
const pathPoints = [
  { x: 0.1, y: 0.5 },
  { x: 0.3, y: 0.8 },
  { x: 0.7, y: 0.2 },
  { x: 0.9, y: 0.6 }
];

// Update time display
timeSlider.addEventListener('input', (e) => {
  currentTime = parseFloat(e.target.value);
  timeValueDisplay.textContent = currentTime.toFixed(2);
  if (!isPlaying) {
    render();
  }
});

// Play/pause button
playPauseButton.addEventListener('click', () => {
  isPlaying = !isPlaying;
  playPauseButton.textContent = isPlaying ? 'Pause' : 'Play';
  if (isPlaying) {
    animationStartTime = performance.now() - currentTime * animationDuration * 1000;
  }
});

// Render function
function render() {
  clear();
  
  const interpolationType = interpolationTypeSelect.value;
  const normalizedTime = currentTime / animationDuration;
  
  switch (interpolationType) {
    case 'linear':
      drawLinearInterpolation(ctx, startPoint, endPoint, normalizedTime, canvas.width, canvas.height);
      break;
      
    case 'easing':
      drawEasingGraph(ctx, 'easeInOut', 2, canvas.width, canvas.height);
      const easedPos = lerpWithEasing(startPoint, endPoint, normalizedTime, 'easeInOut', 2);
      // Draw animated object at eased position
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(easedPos.x * canvas.width, easedPos.y * canvas.height, 12, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'bezierEasing':
      drawBezierEasingCurve(ctx, 0.25, 0.1, 0.25, 1.0, canvas.width, canvas.height);
      const bezierEasedPos = lerpWithBezierEasing(startPoint, endPoint, normalizedTime, 0.25, 0.1, 0.25, 1.0);
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(bezierEasedPos.x * canvas.width, bezierEasedPos.y * canvas.height, 12, 0, Math.PI * 2);
      ctx.fill();
      break;
      
    case 'keyframes':
      drawKeyframeGraph(ctx, keyframes, normalizedTime, canvas.width, canvas.height);
      break;
      
    case 'path':
      const pathAnimation = new PathAnimation(pathPoints, 'bezier');
      drawPathAnimation(ctx, pathAnimation, normalizedTime, canvas.width, canvas.height);
      break;
  }
}

// Initial render
render();`,
      explanation: 'The render function ties everything together. It checks the selected interpolation type and calls the appropriate drawing function. UI controls update the animation state and trigger re-renders.',
      files: [
        {
          name: 'main.js (complete)',
          content: `import { drawLinearInterpolation } from './interpolation/Linear.js';
import { drawEasingGraph, lerpWithEasing } from './interpolation/Easing.js';
import { drawBezierEasingCurve, lerpWithBezierEasing } from './interpolation/BezierEasing.js';
import { drawKeyframeGraph, KeyframeAnimation } from './animation/Keyframes.js';
import { drawPathAnimation, PathAnimation } from './animation/PathAnimation.js';

// ... (full implementation as shown above)`
        }
      ]
    },
    {
      title: 'Step 10: Add Advanced Features',
      description: 'Implement additional features like SLERP, animation timeline, and export',
      code: `// interpolation/SLERP.js

// Spherical Linear Interpolation (for quaternions/rotations)
export function slerp(start, end, t) {
  // Normalize vectors
  const normalize = (v) => {
    const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return { x: v.x / length, y: v.y / length, z: v.z / length };
  };
  
  const v0 = normalize(start);
  const v1 = normalize(end);
  
  // Calculate angle between vectors
  let dot = v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
  dot = Math.max(-1, Math.min(1, dot)); // Clamp to avoid NaN
  
  const theta = Math.acos(dot);
  const sinTheta = Math.sin(theta);
  
  if (Math.abs(sinTheta) < 0.001) {
    // Vectors are parallel, use linear interpolation
    return {
      x: v0.x + (v1.x - v0.x) * t,
      y: v0.y + (v1.y - v0.y) * t,
      z: v0.z + (v1.z - v0.z) * t
    };
  }
  
  const w0 = Math.sin((1 - t) * theta) / sinTheta;
  const w1 = Math.sin(t * theta) / sinTheta;
  
  return {
    x: w0 * v0.x + w1 * v1.x,
    y: w0 * v0.y + w1 * v1.y,
    z: w0 * v0.z + w1 * v1.z
  };
}

// Animation Timeline Class
export class AnimationTimeline {
  constructor() {
    this.animations = [];
    this.currentTime = 0;
    this.duration = 1;
  }
  
  addAnimation(animation, startTime, duration) {
    this.animations.push({ animation, startTime, duration, endTime: startTime + duration });
    this.duration = Math.max(this.duration, startTime + duration);
  }
  
  update(t) {
    this.currentTime = t * this.duration;
    
    for (const item of this.animations) {
      if (this.currentTime >= item.startTime && this.currentTime <= item.endTime) {
        const localT = (this.currentTime - item.startTime) / item.duration;
        item.animation.update(localT);
      }
    }
  }
  
  render(ctx) {
    for (const item of this.animations) {
      if (this.currentTime >= item.startTime && this.currentTime <= item.endTime) {
        item.animation.render(ctx);
      }
    }
  }
}

// Export animation data
export function exportAnimation(keyframes, path) {
  return JSON.stringify({
    keyframes,
    path: path.map(p => ({ x: p.x, y: p.y })),
    duration: animationDuration
  }, null, 2);
}

// Import animation data
export function importAnimation(jsonString) {
  const data = JSON.parse(jsonString);
  return {
    keyframes: data.keyframes,
    path: data.path,
    duration: data.duration || 2.0
  };
}`,
      explanation: 'Advanced features include SLERP for smooth rotation interpolation, a timeline system for managing multiple animations, and export/import functionality for saving and loading animation data.',
      files: [
        {
          name: 'interpolation/SLERP.js',
          content: `export function slerp(start, end, t) {
  // ... (implementation as shown above)
}`
        },
        {
          name: 'animation/Timeline.js',
          content: `export class AnimationTimeline {
  constructor() {
    this.animations = [];
    this.currentTime = 0;
    this.duration = 1;
  }
  
  addAnimation(animation, startTime, duration) {
    // ... (implementation as shown above)
  }
  
  update(t) {
    // ... (implementation as shown above)
  }
  
  render(ctx) {
    // ... (implementation as shown above)
  }
}`
        },
        {
          name: 'utils/Export.js',
          content: `export function exportAnimation(keyframes, path) {
  return JSON.stringify({
    keyframes,
    path: path.map(p => ({ x: p.x, y: p.y })),
    duration: animationDuration
  }, null, 2);
}

export function importAnimation(jsonString) {
  const data = JSON.parse(jsonString);
  return {
    keyframes: data.keyframes,
    path: data.path,
    duration: data.duration || 2.0
  };
}`
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/animation-interpolation"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Animation & Interpolation
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-purple-900">
              Complete Tutorial: Building an Animation & Interpolation Editor
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded">
            <p className="text-purple-900 font-semibold mb-2">📚 What You'll Learn:</p>
            <ul className="list-disc list-inside text-purple-800 space-y-1">
              <li>Setting up a Vite project for animation development</li>
              <li>Creating animation loops with requestAnimationFrame</li>
              <li>Implementing linear interpolation (LERP)</li>
              <li>Building easing functions (easeIn, easeOut, easeInOut)</li>
              <li>Creating Bezier easing for custom animation curves</li>
              <li>Implementing keyframe animation systems</li>
              <li>Building path-based animations</li>
              <li>Adding advanced features like SLERP and timelines</li>
            </ul>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="border-2 border-purple-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleStep(index)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-purple-900">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  {expandedSteps[index] ? (
                    <ChevronUp className="w-5 h-5 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-600" />
                  )}
                </button>

                {expandedSteps[index] && (
                  <div className="p-6 bg-white space-y-4">
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm font-mono">
                        <code>{step.code}</code>
                      </pre>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
                      <p className="text-sm text-purple-900">
                        <span className="font-semibold">💡 Explanation:</span> {step.explanation}
                      </p>
                    </div>

                    {step.files && step.files.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-900 flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Files to Create:
                        </h4>
                        {step.files.map((file, fileIndex) => (
                          <div key={fileIndex} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-purple-600" />
                              <span className="font-mono text-sm font-semibold text-purple-900">{file.name}</span>
                            </div>
                            <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                              <code>{file.content}</code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-2">Next Steps</h3>
                <ul className="list-disc list-inside text-green-800 space-y-1">
                  <li>Add more easing functions (bounce, elastic, back, etc.)</li>
                  <li>Implement animation chaining and sequencing</li>
                  <li>Create a visual timeline editor for keyframes</li>
                  <li>Add animation preview and scrubbing controls</li>
                  <li>Implement animation curves editor (visual Bezier curve editor)</li>
                  <li>Add support for multi-property animations (position, scale, rotation)</li>
                  <li>Create animation presets and templates</li>
                  <li>Add animation export to common formats (JSON, SVG paths)</li>
                  <li>Implement animation blending and transitions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

