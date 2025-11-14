import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Code, FileText } from 'lucide-react';

export default function CurvesAndSurfacesTutorial() {
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
npm create vite@latest curves-surfaces-editor -- --template vanilla

# Navigate to project directory
cd curves-surfaces-editor

# Install dependencies
npm install`,
      explanation: 'Vite provides fast development with hot module replacement. This sets up a basic vanilla JavaScript project perfect for building a curves and surfaces visualization editor.',
      files: [
        {
          name: 'package.json',
          content: `{
  "name": "curves-surfaces-editor",
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
      description: 'Set up the HTML file with canvas and control panels',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Curves & Surfaces Editor</title>
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
    select {
      width: 100%;
      padding: 8px;
      background: #0f0f1e;
      color: #fff;
      border: 1px solid #6366f1;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div>
      <h1>Curves & Surfaces Editor</h1>
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
    <div class="controls">
      <h2>Controls</h2>
      <div class="control-group">
        <label>Curve Type:</label>
        <select id="curveType">
          <option value="bezier">Bezier Curve</option>
          <option value="bspline">B-Spline</option>
          <option value="hermite">Hermite Curve</option>
          <option value="catmullrom">Catmull-Rom Spline</option>
        </select>
      </div>
    </div>
  </div>
  <script type="module" src="/main.js"></script>
</body>
</html>`,
      explanation: 'The HTML structure includes a canvas for rendering curves and a control panel for selecting curve types and adjusting parameters.',
      files: [
        {
          name: 'index.html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Curves & Surfaces Editor</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="container">
    <div>
      <h1>Curves & Surfaces Editor</h1>
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
      title: 'Step 3: Initialize Canvas and Setup',
      description: 'Get canvas context and set up basic drawing utilities',
      code: `// main.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set up coordinate system (origin at center)
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Helper function to convert world coordinates to screen coordinates
function worldToScreen(x, y) {
  return {
    x: centerX + x,
    y: centerY - y // Flip Y axis (screen Y increases downward)
  };
}

// Helper function to draw a point
function drawPoint(x, y, color = '#ffffff', size = 5) {
  const screen = worldToScreen(x, y);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, size, 0, Math.PI * 2);
  ctx.fill();
}

// Helper function to draw a line
function drawLine(x1, y1, x2, y2, color = '#ffffff', width = 1) {
  const start = worldToScreen(x1, y1);
  const end = worldToScreen(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

// Clear canvas
function clear() {
  ctx.fillStyle = '#0f0f1e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw axes
  drawLine(-400, 0, 400, 0, '#333366', 1);
  drawLine(0, -300, 0, 300, '#333366', 1);
}

console.log('Canvas initialized!');`,
      explanation: 'We set up the canvas and create helper functions for drawing. The coordinate system is centered with the origin at the canvas center, and we flip the Y-axis to match mathematical conventions.',
      files: [
        {
          name: 'main.js',
          content: `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function worldToScreen(x, y) {
  return {
    x: centerX + x,
    y: centerY - y
  };
}

function drawPoint(x, y, color = '#ffffff', size = 5) {
  const screen = worldToScreen(x, y);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(screen.x, screen.y, size, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(x1, y1, x2, y2, color = '#ffffff', width = 1) {
  const start = worldToScreen(x1, y1);
  const end = worldToScreen(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

function clear() {
  ctx.fillStyle = '#0f0f1e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawLine(-400, 0, 400, 0, '#333366', 1);
  drawLine(0, -300, 0, 300, '#333366', 1);
}`
        }
      ]
    },
    {
      title: 'Step 4: Implement Bezier Curve',
      description: 'Create Bezier curve calculation and rendering functions',
      code: `// curves/Bezier.js

// Calculate Bernstein basis polynomial
function bernstein(n, i, t) {
  const binomial = (n, k) => {
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let j = 0; j < k; j++) {
      result = result * (n - j) / (j + 1);
    }
    return result;
  };
  
  return binomial(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i);
}

// Calculate point on Bezier curve
export function bezierPoint(controlPoints, t) {
  const n = controlPoints.length - 1;
  let x = 0;
  let y = 0;
  
  for (let i = 0; i <= n; i++) {
    const basis = bernstein(n, i, t);
    x += controlPoints[i].x * basis;
    y += controlPoints[i].y * basis;
  }
  
  return { x, y };
}

// Generate points along Bezier curve
export function bezierCurve(controlPoints, segments = 100) {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    points.push(bezierPoint(controlPoints, t));
  }
  return points;
}

// Draw Bezier curve
export function drawBezier(ctx, controlPoints, segments = 100) {
  const points = bezierCurve(controlPoints, segments);
  
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  const first = points[0];
  ctx.moveTo(first.x, first.y);
  
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  
  ctx.stroke();
  
  // Draw control points
  ctx.fillStyle = '#ff6b6b';
  for (const point of controlPoints) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw control polygon
  ctx.strokeStyle = '#666666';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(controlPoints[0].x, controlPoints[0].y);
  for (let i = 1; i < controlPoints.length; i++) {
    ctx.lineTo(controlPoints[i].x, controlPoints[i].y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}`,
      explanation: 'Bezier curves use Bernstein polynomials to blend control points. The curve passes through the first and last control points and is influenced by the intermediate points. We draw the curve, control points, and control polygon.',
      files: [
        {
          name: 'curves/Bezier.js',
          content: `function bernstein(n, i, t) {
  const binomial = (n, k) => {
    if (k === 0 || k === n) return 1;
    let result = 1;
    for (let j = 0; j < k; j++) {
      result = result * (n - j) / (j + 1);
    }
    return result;
  };
  return binomial(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i);
}

export function bezierPoint(controlPoints, t) {
  const n = controlPoints.length - 1;
  let x = 0;
  let y = 0;
  for (let i = 0; i <= n; i++) {
    const basis = bernstein(n, i, t);
    x += controlPoints[i].x * basis;
    y += controlPoints[i].y * basis;
  }
  return { x, y };
}

export function bezierCurve(controlPoints, segments = 100) {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    points.push(bezierPoint(controlPoints, t));
  }
  return points;
}

export function drawBezier(ctx, controlPoints, segments = 100) {
  // ... (drawing implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 5: Implement B-Spline',
      description: 'Create B-spline curve calculation with knot vectors',
      code: `// curves/BSpline.js

// Calculate B-spline basis function
function bSplineBasis(i, k, t, knots) {
  if (k === 0) {
    return (t >= knots[i] && t < knots[i + 1]) ? 1 : 0;
  }
  
  const denom1 = knots[i + k] - knots[i];
  const denom2 = knots[i + k + 1] - knots[i + 1];
  
  let term1 = 0;
  let term2 = 0;
  
  if (denom1 !== 0) {
    term1 = ((t - knots[i]) / denom1) * bSplineBasis(i, k - 1, t, knots);
  }
  
  if (denom2 !== 0) {
    term2 = ((knots[i + k + 1] - t) / denom2) * bSplineBasis(i + 1, k - 1, t, knots);
  }
  
  return term1 + term2;
}

// Generate knot vector
export function generateKnots(degree, numControlPoints) {
  const knots = [];
  const n = numControlPoints - 1;
  const m = n + degree + 1;
  
  // Clamped uniform knots
  for (let i = 0; i <= m; i++) {
    if (i <= degree) {
      knots.push(0);
    } else if (i >= n + 1) {
      knots.push(n - degree + 1);
    } else {
      knots.push(i - degree);
    }
  }
  
  return knots;
}

// Calculate point on B-spline curve
export function bSplinePoint(controlPoints, degree, t, knots) {
  let x = 0;
  let y = 0;
  
  for (let i = 0; i < controlPoints.length; i++) {
    const basis = bSplineBasis(i, degree, t, knots);
    x += controlPoints[i].x * basis;
    y += controlPoints[i].y * basis;
  }
  
  return { x, y };
}

// Generate B-spline curve
export function bSplineCurve(controlPoints, degree, segments = 100) {
  const knots = generateKnots(degree, controlPoints.length);
  const points = [];
  const tMin = knots[degree];
  const tMax = knots[controlPoints.length];
  
  for (let i = 0; i <= segments; i++) {
    const t = tMin + (tMax - tMin) * (i / segments);
    points.push(bSplinePoint(controlPoints, degree, t, knots));
  }
  
  return points;
}

// Draw B-spline curve
export function drawBSpline(ctx, controlPoints, degree, segments = 100) {
  const points = bSplineCurve(controlPoints, degree, segments);
  
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  const first = points[0];
  ctx.moveTo(first.x, first.y);
  
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  
  ctx.stroke();
  
  // Draw control points
  ctx.fillStyle = '#ff6b6b';
  for (const point of controlPoints) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}`,
      explanation: 'B-splines use basis functions defined by a knot vector. They provide local control - moving a control point only affects a portion of the curve. The degree determines the smoothness, and knots control how the curve segments connect.',
      files: [
        {
          name: 'curves/BSpline.js',
          content: `function bSplineBasis(i, k, t, knots) {
  if (k === 0) {
    return (t >= knots[i] && t < knots[i + 1]) ? 1 : 0;
  }
  const denom1 = knots[i + k] - knots[i];
  const denom2 = knots[i + k + 1] - knots[i + 1];
  let term1 = 0;
  let term2 = 0;
  if (denom1 !== 0) {
    term1 = ((t - knots[i]) / denom1) * bSplineBasis(i, k - 1, t, knots);
  }
  if (denom2 !== 0) {
    term2 = ((knots[i + k + 1] - t) / denom2) * bSplineBasis(i + 1, k - 1, t, knots);
  }
  return term1 + term2;
}

export function generateKnots(degree, numControlPoints) {
  // ... (implementation as shown above)
}

export function bSplinePoint(controlPoints, degree, t, knots) {
  // ... (implementation as shown above)
}

export function bSplineCurve(controlPoints, degree, segments = 100) {
  // ... (implementation as shown above)
}

export function drawBSpline(ctx, controlPoints, degree, segments = 100) {
  // ... (drawing implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 6: Implement Hermite Curve',
      description: 'Create Hermite curve with position and tangent control',
      code: `// curves/Hermite.js

// Hermite basis functions
function hermiteH1(t) {
  return 2 * t * t * t - 3 * t * t + 1;
}

function hermiteH2(t) {
  return -2 * t * t * t + 3 * t * t;
}

function hermiteH3(t) {
  return t * t * t - 2 * t * t + t;
}

function hermiteH4(t) {
  return t * t * t - t * t;
}

// Calculate point on Hermite curve
export function hermitePoint(p0, p1, t0, t1, t) {
  const h1 = hermiteH1(t);
  const h2 = hermiteH2(t);
  const h3 = hermiteH3(t);
  const h4 = hermiteH4(t);
  
  return {
    x: h1 * p0.x + h2 * p1.x + h3 * t0.x + h4 * t1.x,
    y: h1 * p0.y + h2 * p1.y + h3 * t0.y + h4 * t1.y
  };
}

// Generate Hermite curve
export function hermiteCurve(p0, p1, t0, t1, segments = 100) {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    points.push(hermitePoint(p0, p1, t0, t1, t));
  }
  return points;
}

// Draw Hermite curve
export function drawHermite(ctx, p0, p1, t0, t1, segments = 100) {
  const points = hermiteCurve(p0, p1, t0, t1, segments);
  
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  const first = points[0];
  ctx.moveTo(first.x, first.y);
  
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  
  ctx.stroke();
  
  // Draw endpoints
  ctx.fillStyle = '#ff6b6b';
  ctx.beginPath();
  ctx.arc(p0.x, p0.y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(p1.x, p1.y, 5, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw tangent vectors
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.lineTo(p0.x + t0.x * 50, p0.y + t0.y * 50);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p1.x + t1.x * 50, p1.y + t1.y * 50);
  ctx.stroke();
}`,
      explanation: 'Hermite curves interpolate two points with specified tangents. They provide direct control over the curve direction at endpoints, making them useful for animation paths and smooth transitions.',
      files: [
        {
          name: 'curves/Hermite.js',
          content: `function hermiteH1(t) { return 2 * t * t * t - 3 * t * t + 1; }
function hermiteH2(t) { return -2 * t * t * t + 3 * t * t; }
function hermiteH3(t) { return t * t * t - 2 * t * t + t; }
function hermiteH4(t) { return t * t * t - t * t; }

export function hermitePoint(p0, p1, t0, t1, t) {
  const h1 = hermiteH1(t);
  const h2 = hermiteH2(t);
  const h3 = hermiteH3(t);
  const h4 = hermiteH4(t);
  return {
    x: h1 * p0.x + h2 * p1.x + h3 * t0.x + h4 * t1.x,
    y: h1 * p0.y + h2 * p1.y + h3 * t0.y + h4 * t1.y
  };
}

export function hermiteCurve(p0, p1, t0, t1, segments = 100) {
  // ... (implementation as shown above)
}

export function drawHermite(ctx, p0, p1, t0, t1, segments = 100) {
  // ... (drawing implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 7: Implement Catmull-Rom Spline',
      description: 'Create Catmull-Rom spline for smooth interpolation through points',
      code: `// curves/CatmullRom.js

// Catmull-Rom basis matrix
const CATMULL_ROM_MATRIX = [
  [0, 2, 0, 0],
  [-1, 0, 1, 0],
  [2, -5, 4, -1],
  [-1, 3, -3, 1]
];

// Multiply matrix by vector
function matrixVectorMultiply(matrix, vector) {
  return [
    matrix[0][0] * vector[0] + matrix[0][1] * vector[1] + matrix[0][2] * vector[2] + matrix[0][3] * vector[3],
    matrix[1][0] * vector[0] + matrix[1][1] * vector[1] + matrix[1][2] * vector[2] + matrix[1][3] * vector[3],
    matrix[2][0] * vector[0] + matrix[2][1] * vector[1] + matrix[2][2] * vector[2] + matrix[2][3] * vector[3],
    matrix[3][0] * vector[0] + matrix[3][1] * vector[1] + matrix[3][2] * vector[2] + matrix[3][3] * vector[3]
  ];
}

// Calculate point on Catmull-Rom spline segment
export function catmullRomPoint(p0, p1, p2, p3, t, tension = 0.5) {
  const t2 = t * t;
  const t3 = t2 * t;
  
  const tVector = [1, t, t2, t3];
  const coefficients = matrixVectorMultiply(CATMULL_ROM_MATRIX, tVector);
  
  const x = 0.5 * (
    coefficients[0] * p0.x +
    coefficients[1] * p1.x +
    coefficients[2] * p2.x +
    coefficients[3] * p3.x
  );
  
  const y = 0.5 * (
    coefficients[0] * p0.y +
    coefficients[1] * p1.y +
    coefficients[2] * p2.y +
    coefficients[3] * p3.y
  );
  
  return { x, y };
}

// Generate Catmull-Rom spline through all points
export function catmullRomSpline(controlPoints, segments = 100, tension = 0.5) {
  if (controlPoints.length < 2) return [];
  if (controlPoints.length === 2) {
    // Simple line
    return [controlPoints[0], controlPoints[1]];
  }
  
  const points = [];
  
  // For each segment between control points
  for (let i = 0; i < controlPoints.length - 1; i++) {
    const p0 = i > 0 ? controlPoints[i - 1] : controlPoints[i];
    const p1 = controlPoints[i];
    const p2 = controlPoints[i + 1];
    const p3 = i < controlPoints.length - 2 ? controlPoints[i + 2] : controlPoints[i + 1];
    
    // Generate points for this segment
    for (let j = 0; j <= segments; j++) {
      const t = j / segments;
      points.push(catmullRomPoint(p0, p1, p2, p3, t, tension));
    }
  }
  
  return points;
}

// Draw Catmull-Rom spline
export function drawCatmullRom(ctx, controlPoints, segments = 100, tension = 0.5) {
  const points = catmullRomSpline(controlPoints, segments, tension);
  
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  if (points.length > 0) {
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
  }
  
  ctx.stroke();
  
  // Draw control points
  ctx.fillStyle = '#ff6b6b';
  for (const point of controlPoints) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}`,
      explanation: 'Catmull-Rom splines interpolate through all control points, creating smooth curves that pass through each point. They are commonly used in animation and path planning because they naturally create smooth transitions.',
      files: [
        {
          name: 'curves/CatmullRom.js',
          content: `const CATMULL_ROM_MATRIX = [
  [0, 2, 0, 0],
  [-1, 0, 1, 0],
  [2, -5, 4, -1],
  [-1, 3, -3, 1]
];

function matrixVectorMultiply(matrix, vector) {
  // ... (implementation as shown above)
}

export function catmullRomPoint(p0, p1, p2, p3, t, tension = 0.5) {
  // ... (implementation as shown above)
}

export function catmullRomSpline(controlPoints, segments = 100, tension = 0.5) {
  // ... (implementation as shown above)
}

export function drawCatmullRom(ctx, controlPoints, segments = 100, tension = 0.5) {
  // ... (drawing implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 8: Add Interactive Point Manipulation',
      description: 'Implement mouse interaction to drag and modify control points',
      code: `// main.js (continued)

let selectedPoint = null;
let controlPoints = [
  { x: -200, y: -100 },
  { x: -100, y: 100 },
  { x: 100, y: -100 },
  { x: 200, y: 100 }
];

// Convert screen coordinates to world coordinates
function screenToWorld(screenX, screenY) {
  return {
    x: screenX - centerX,
    y: centerY - screenY // Flip Y axis
  };
}

// Check if point is near mouse
function getPointNearMouse(mouseX, mouseY, threshold = 10) {
  const world = screenToWorld(mouseX, mouseY);
  
  for (let i = 0; i < controlPoints.length; i++) {
    const point = controlPoints[i];
    const dx = world.x - point.x;
    const dy = world.y - point.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < threshold) {
      return i;
    }
  }
  
  return null;
}

// Mouse event handlers
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  
  const pointIndex = getPointNearMouse(mouseX, mouseY);
  if (pointIndex !== null) {
    selectedPoint = pointIndex;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (selectedPoint !== null) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const world = screenToWorld(mouseX, mouseY);
    
    controlPoints[selectedPoint].x = world.x;
    controlPoints[selectedPoint].y = world.y;
    
    render();
  }
});

canvas.addEventListener('mouseup', () => {
  selectedPoint = null;
});

canvas.addEventListener('mouseleave', () => {
  selectedPoint = null;
});`,
      explanation: 'Interactive point manipulation allows users to drag control points to modify curves in real-time. We convert between screen and world coordinates and detect when the mouse is near a control point.',
      files: [
        {
          name: 'main.js (interaction)',
          content: `let selectedPoint = null;
let controlPoints = [
  { x: -200, y: -100 },
  { x: -100, y: 100 },
  { x: 100, y: -100 },
  { x: 200, y: 100 }
];

function screenToWorld(screenX, screenY) {
  return {
    x: screenX - centerX,
    y: centerY - screenY
  };
}

function getPointNearMouse(mouseX, mouseY, threshold = 10) {
  // ... (implementation as shown above)
}

// ... (event handlers as shown above)`
        }
      ]
    },
    {
      title: 'Step 9: Create Render Function',
      description: 'Implement main render function that draws the selected curve type',
      code: `// main.js (continued)

import { drawBezier } from './curves/Bezier.js';
import { drawBSpline } from './curves/BSpline.js';
import { drawHermite } from './curves/Hermite.js';
import { drawCatmullRom } from './curves/CatmullRom.js';

const curveTypeSelect = document.getElementById('curveType');

function render() {
  clear();
  
  const curveType = curveTypeSelect.value;
  
  switch (curveType) {
    case 'bezier':
      drawBezier(ctx, controlPoints);
      break;
      
    case 'bspline':
      drawBSpline(ctx, controlPoints, 2); // degree 2
      break;
      
    case 'hermite':
      if (controlPoints.length >= 2) {
        const p0 = controlPoints[0];
        const p1 = controlPoints[controlPoints.length - 1];
        // Use intermediate points as tangents
        const t0 = controlPoints.length > 2 
          ? { x: controlPoints[1].x - p0.x, y: controlPoints[1].y - p0.y }
          : { x: 0, y: 0 };
        const t1 = controlPoints.length > 3
          ? { x: p1.x - controlPoints[controlPoints.length - 2].x, y: p1.y - controlPoints[controlPoints.length - 2].y }
          : { x: 0, y: 0 };
        drawHermite(ctx, p0, p1, t0, t1);
      }
      break;
      
    case 'catmullrom':
      drawCatmullRom(ctx, controlPoints);
      break;
  }
}

// Initial render
render();

// Update on curve type change
curveTypeSelect.addEventListener('change', () => {
  render();
});`,
      explanation: 'The render function clears the canvas, checks the selected curve type, and calls the appropriate drawing function. It handles different curve types and their specific requirements (like Hermite needing tangents).',
      files: [
        {
          name: 'main.js (render)',
          content: `import { drawBezier } from './curves/Bezier.js';
import { drawBSpline } from './curves/BSpline.js';
import { drawHermite } from './curves/Hermite.js';
import { drawCatmullRom } from './curves/CatmullRom.js';

const curveTypeSelect = document.getElementById('curveType');

function render() {
  clear();
  
  const curveType = curveTypeSelect.value;
  
  switch (curveType) {
    case 'bezier':
      drawBezier(ctx, controlPoints);
      break;
    case 'bspline':
      drawBSpline(ctx, controlPoints, 2);
      break;
    case 'hermite':
      // ... (Hermite handling as shown above)
      break;
    case 'catmullrom':
      drawCatmullRom(ctx, controlPoints);
      break;
  }
}

render();

curveTypeSelect.addEventListener('change', () => {
  render();
});`
        }
      ]
    },
    {
      title: 'Step 10: Complete Example with All Curves',
      description: 'Put it all together with a complete working example',
      code: `// Complete main.js
import { drawBezier } from './curves/Bezier.js';
import { drawBSpline } from './curves/BSpline.js';
import { drawHermite } from './curves/Hermite.js';
import { drawCatmullRom } from './curves/CatmullRom.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function worldToScreen(x, y) {
  return { x: centerX + x, y: centerY - y };
}

function screenToWorld(screenX, screenY) {
  return { x: screenX - centerX, y: centerY - screenY };
}

function clear() {
  ctx.fillStyle = '#0f0f1e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#333366';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.stroke();
}

let selectedPoint = null;
let controlPoints = [
  { x: -200, y: -100 },
  { x: -100, y: 100 },
  { x: 100, y: -100 },
  { x: 200, y: 100 }
];

function getPointNearMouse(mouseX, mouseY, threshold = 10) {
  const world = screenToWorld(mouseX, mouseY);
  for (let i = 0; i < controlPoints.length; i++) {
    const point = controlPoints[i];
    const dx = world.x - point.x;
    const dy = world.y - point.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < threshold) {
      return i;
    }
  }
  return null;
}

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const pointIndex = getPointNearMouse(mouseX, mouseY);
  if (pointIndex !== null) {
    selectedPoint = pointIndex;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (selectedPoint !== null) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const world = screenToWorld(mouseX, mouseY);
    controlPoints[selectedPoint].x = world.x;
    controlPoints[selectedPoint].y = world.y;
    render();
  }
});

canvas.addEventListener('mouseup', () => {
  selectedPoint = null;
});

const curveTypeSelect = document.getElementById('curveType');

function render() {
  clear();
  
  const curveType = curveTypeSelect.value;
  
  switch (curveType) {
    case 'bezier':
      drawBezier(ctx, controlPoints);
      break;
    case 'bspline':
      drawBSpline(ctx, controlPoints, 2);
      break;
    case 'hermite':
      if (controlPoints.length >= 2) {
        const p0 = controlPoints[0];
        const p1 = controlPoints[controlPoints.length - 1];
        const t0 = controlPoints.length > 2 
          ? { x: controlPoints[1].x - p0.x, y: controlPoints[1].y - p0.y }
          : { x: 0, y: 0 };
        const t1 = controlPoints.length > 3
          ? { x: p1.x - controlPoints[controlPoints.length - 2].x, y: p1.y - controlPoints[controlPoints.length - 2].y }
          : { x: 0, y: 0 };
        drawHermite(ctx, p0, p1, t0, t1);
      }
      break;
    case 'catmullrom':
      drawCatmullRom(ctx, controlPoints);
      break;
  }
}

curveTypeSelect.addEventListener('change', () => {
  render();
});

render();`,
      explanation: 'This complete example combines all the pieces: coordinate system setup, curve implementations, interactive point manipulation, and rendering. Users can switch between curve types and drag control points to see how different curves behave.',
      files: [
        {
          name: 'main.js (complete)',
          content: `import { drawBezier } from './curves/Bezier.js';
import { drawBSpline } from './curves/BSpline.js';
import { drawHermite } from './curves/Hermite.js';
import { drawCatmullRom } from './curves/CatmullRom.js';

// ... (full implementation as shown above)`
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
            to="/curves-surfaces"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Curves & Surfaces
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-purple-900">
              Complete Tutorial: Building a Curves & Surfaces Editor
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded">
            <p className="text-purple-900 font-semibold mb-2">📚 What You'll Learn:</p>
            <ul className="list-disc list-inside text-purple-800 space-y-1">
              <li>Setting up a Vite project for curve visualization</li>
              <li>Implementing Bezier curves with Bernstein polynomials</li>
              <li>Creating B-splines with knot vectors</li>
              <li>Building Hermite curves with tangent control</li>
              <li>Implementing Catmull-Rom splines for smooth interpolation</li>
              <li>Adding interactive point manipulation</li>
              <li>Creating a coordinate system and drawing utilities</li>
              <li>Building a complete curve editor application</li>
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
                  <li>Implement NURBS (Non-Uniform Rational B-Splines) with weights</li>
                  <li>Add parametric surface rendering (Bezier surfaces, B-spline surfaces)</li>
                  <li>Create curve editing tools (add/remove control points)</li>
                  <li>Implement curve subdivision and refinement algorithms</li>
                  <li>Add curve analysis tools (curvature, tangent, normal visualization)</li>
                  <li>Create curve export/import functionality (SVG, JSON)</li>
                  <li>Add animation along curves (object following path)</li>
                  <li>Implement curve intersection and boolean operations</li>
                  <li>Add 3D curve support and visualization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

