import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Code, FileText } from 'lucide-react';

export default function TransformationTutorial() {
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
npm create vite@latest transformation-editor -- --template vanilla

# Navigate to project directory
cd transformation-editor

# Install dependencies
npm install`,
      explanation: 'Vite provides a fast development environment. This sets up a basic vanilla JavaScript project perfect for WebGL-based transformation visualization.',
      files: [
        {
          name: 'package.json',
          content: `{
  "name": "transformation-editor",
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
  <title>Transformation Visualization Editor</title>
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
    input[type="range"] {
      width: 100%;
    }
    input[type="checkbox"] {
      margin-right: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div>
      <h1>Transformation Visualization Editor</h1>
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
    <div class="controls">
      <h2>Controls</h2>
      <div class="control-group">
        <label>
          <input type="checkbox" id="showGrid" checked> Show Grid
        </label>
        <label>
          <input type="checkbox" id="showOriginal" checked> Show Original
        </label>
      </div>
      <div class="control-group">
        <label>Scale X: <span id="scaleXValue">1.0</span></label>
        <input type="range" id="scaleX" min="0.1" max="3" step="0.1" value="1">
      </div>
      <div class="control-group">
        <label>Scale Y: <span id="scaleYValue">1.0</span></label>
        <input type="range" id="scaleY" min="0.1" max="3" step="0.1" value="1">
      </div>
      <div class="control-group">
        <label>Rotation: <span id="rotationValue">0</span>°</label>
        <input type="range" id="rotation" min="0" max="360" step="1" value="0">
      </div>
      <div class="control-group">
        <label>Translate X: <span id="translateXValue">0</span></label>
        <input type="range" id="translateX" min="-200" max="200" step="1" value="0">
      </div>
      <div class="control-group">
        <label>Translate Y: <span id="translateYValue">0</span></label>
        <input type="range" id="translateY" min="-200" max="200" step="1" value="0">
      </div>
    </div>
  </div>
  <script type="module" src="/main.js"></script>
</body>
</html>`,
      explanation: 'The HTML structure includes a canvas for WebGL rendering and a control panel with sliders and checkboxes for interactive transformation parameters.',
      files: [
        {
          name: 'index.html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Transformation Visualization Editor</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="container">
    <div>
      <h1>Transformation Visualization Editor</h1>
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
      title: 'Step 3: Initialize WebGL Context',
      description: 'Get WebGL context and set up basic rendering pipeline',
      code: `// main.js
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  console.error('WebGL not supported');
  alert('WebGL is not supported in your browser');
}

// Set viewport to match canvas size
gl.viewport(0, 0, canvas.width, canvas.height);

// Set clear color (dark background)
gl.clearColor(0.06, 0.06, 0.12, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Enable depth testing for 3D (if needed)
gl.enable(gl.DEPTH_TEST);

console.log('WebGL initialized successfully!');`,
      explanation: 'WebGL context provides access to the GPU. We set the viewport to match canvas dimensions and clear the screen with a dark background color.',
      files: [
        {
          name: 'main.js',
          content: `const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  console.error('WebGL not supported');
  alert('WebGL is not supported in your browser');
}

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.06, 0.06, 0.12, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

console.log('WebGL initialized successfully!');`
        }
      ]
    },
    {
      title: 'Step 4: Create Matrix Math Utilities',
      description: 'Implement matrix multiplication and transformation matrix creation functions',
      code: `// utils/matrix.js

// Multiply two 3x3 matrices
export function multiplyMatrices3x3(a, b) {
  const result = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  
  return result;
}

// Create translation matrix
export function translationMatrix(tx, ty) {
  return [
    [1, 0, tx],
    [0, 1, ty],
    [0, 0, 1]
  ];
}

// Create rotation matrix
export function rotationMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [c, -s, 0],
    [s,  c, 0],
    [0,  0, 1]
  ];
}

// Create scale matrix
export function scaleMatrix(sx, sy) {
  return [
    [sx, 0,  0],
    [0,  sy, 0],
    [0,  0,  1]
  ];
}

// Apply transformation matrix to a 2D point
export function applyTransform(matrix, point) {
  const [x, y] = point;
  return [
    matrix[0][0] * x + matrix[0][1] * y + matrix[0][2],
    matrix[1][0] * x + matrix[1][1] * y + matrix[1][2]
  ];
}`,
      explanation: 'Matrix utilities are essential for transformations. We create functions for translation, rotation, scaling, and matrix multiplication. These matrices are applied to points to transform them.',
      files: [
        {
          name: 'utils/matrix.js',
          content: `export function multiplyMatrices3x3(a, b) {
  const result = [[0,0,0], [0,0,0], [0,0,0]];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

export function translationMatrix(tx, ty) {
  return [[1,0,tx], [0,1,ty], [0,0,1]];
}

export function rotationMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [[c,-s,0], [s,c,0], [0,0,1]];
}

export function scaleMatrix(sx, sy) {
  return [[sx,0,0], [0,sy,0], [0,0,1]];
}

export function applyTransform(matrix, point) {
  const [x, y] = point;
  return [
    matrix[0][0] * x + matrix[0][1] * y + matrix[0][2],
    matrix[1][0] * x + matrix[1][1] * y + matrix[1][2]
  ];
}`
        }
      ]
    },
    {
      title: 'Step 5: Create Vertex and Fragment Shaders',
      description: 'Write shaders for rendering 2D shapes and lines',
      code: `// shaders/vertex.glsl
attribute vec2 a_position;

uniform mat3 u_matrix;

void main() {
  // Apply transformation matrix
  vec3 position = u_matrix * vec3(a_position, 1.0);
  
  // Convert to clip space
  gl_Position = vec4(position.xy, 0.0, 1.0);
}

// shaders/fragment.glsl
precision mediump float;

uniform vec4 u_color;

void main() {
  gl_FragColor = u_color;
}`,
      explanation: 'The vertex shader applies the transformation matrix to each vertex. The fragment shader sets the color. We use mat3 for 2D transformations (3x3 homogeneous coordinates).',
      files: [
        {
          name: 'shaders/vertex.glsl',
          content: `attribute vec2 a_position;
uniform mat3 u_matrix;

void main() {
  vec3 position = u_matrix * vec3(a_position, 1.0);
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`
        },
        {
          name: 'shaders/fragment.glsl',
          content: `precision mediump float;
uniform vec4 u_color;

void main() {
  gl_FragColor = u_color;
}`
        }
      ]
    },
    {
      title: 'Step 6: Compile and Link Shaders',
      description: 'Create functions to compile shaders and create shader program',
      code: `// utils/shaderUtils.js

export function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  
  return shader;
}

export function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  
  return program;
}

// Helper to convert matrix to WebGL format (column-major)
export function matrix3ToWebGL(matrix) {
  return new Float32Array([
    matrix[0][0], matrix[1][0], matrix[2][0],
    matrix[0][1], matrix[1][1], matrix[2][1],
    matrix[0][2], matrix[1][2], matrix[2][2]
  ]);
}`,
      explanation: 'Shader compilation functions are reusable. WebGL matrices are stored in column-major order, so we need a conversion function. The program links vertex and fragment shaders together.',
      files: [
        {
          name: 'utils/shaderUtils.js',
          content: `export function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  
  return shader;
}

export function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  
  return program;
}

export function matrix3ToWebGL(matrix) {
  return new Float32Array([
    matrix[0][0], matrix[1][0], matrix[2][0],
    matrix[0][1], matrix[1][1], matrix[2][1],
    matrix[0][2], matrix[1][2], matrix[2][2]
  ]);
}`
        }
      ]
    },
    {
      title: 'Step 7: Draw Grid and Axes',
      description: 'Create functions to draw coordinate grid and axes',
      code: `// utils/drawing.js

export function drawGrid(gl, program, width, height, cellSize = 50) {
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
  const colorLocation = gl.getUniformLocation(program, 'u_color');
  
  // Identity matrix for grid
  const identity = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  gl.uniformMatrix3fv(matrixLocation, false, matrix3ToWebGL(identity));
  
  // Draw vertical lines
  gl.uniform4f(colorLocation, 0.2, 0.2, 0.3, 1.0);
  for (let x = -width/2; x <= width/2; x += cellSize) {
    const vertices = new Float32Array([
      x, -height/2,
      x, height/2
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINES, 0, 2);
  }
  
  // Draw horizontal lines
  for (let y = -height/2; y <= height/2; y += cellSize) {
    const vertices = new Float32Array([
      -width/2, y,
      width/2, y
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINES, 0, 2);
  }
  
  // Draw axes
  gl.uniform4f(colorLocation, 0.5, 0.5, 0.7, 1.0);
  // X-axis
  const xAxis = new Float32Array([-width/2, 0, width/2, 0]);
  const xBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, xBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, xAxis, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.LINES, 0, 2);
  
  // Y-axis
  const yAxis = new Float32Array([0, -height/2, 0, height/2]);
  const yBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, yBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, yAxis, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.LINES, 0, 2);
}`,
      explanation: 'Drawing the grid helps visualize the coordinate system. We draw lines using WebGL LINE primitives. The grid uses a darker color, while axes are brighter for visibility.',
      files: [
        {
          name: 'utils/drawing.js',
          content: `export function drawGrid(gl, program, width, height, cellSize = 50) {
  // ... (implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 8: Draw Shapes with Transformations',
      description: 'Create functions to draw shapes and apply transformation matrices',
      code: `// utils/drawing.js (continued)

export function drawSquare(gl, program, size, transformMatrix, color) {
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
  const colorLocation = gl.getUniformLocation(program, 'u_color');
  
  // Set transformation matrix
  gl.uniformMatrix3fv(matrixLocation, false, matrix3ToWebGL(transformMatrix));
  gl.uniform4f(colorLocation, color[0], color[1], color[2], color[3]);
  
  // Square vertices (centered at origin)
  const halfSize = size / 2;
  const vertices = new Float32Array([
    -halfSize, -halfSize,  // Bottom-left
     halfSize, -halfSize,  // Bottom-right
     halfSize,  halfSize,  // Top-right
    -halfSize, -halfSize,  // Bottom-left
     halfSize,  halfSize,  // Top-right
    -halfSize,  halfSize   // Top-left
  ]);
  
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

export function drawTriangle(gl, program, size, transformMatrix, color) {
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
  const colorLocation = gl.getUniformLocation(program, 'u_color');
  
  gl.uniformMatrix3fv(matrixLocation, false, matrix3ToWebGL(transformMatrix));
  gl.uniform4f(colorLocation, color[0], color[1], color[2], color[3]);
  
  // Equilateral triangle
  const height = size * Math.sqrt(3) / 2;
  const vertices = new Float32Array([
    0, height / 3,           // Top
    -size / 2, -height * 2 / 3,  // Bottom-left
     size / 2, -height * 2 / 3   // Bottom-right
  ]);
  
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}`,
      explanation: 'We draw shapes by defining vertices and applying transformation matrices. The matrix is passed as a uniform to the shader, which transforms all vertices. We use TRIANGLES primitive for filled shapes.',
      files: [
        {
          name: 'utils/drawing.js (continued)',
          content: `export function drawSquare(gl, program, size, transformMatrix, color) {
  // ... (implementation as shown above)
}

export function drawTriangle(gl, program, size, transformMatrix, color) {
  // ... (implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 9: Connect Controls to Transformations',
      description: 'Set up event listeners to update transformations from UI controls',
      code: `// main.js (continued)

// State for transformations
let transformState = {
  scaleX: 1.0,
  scaleY: 1.0,
  rotation: 0,
  translateX: 0,
  translateY: 0,
  showGrid: true,
  showOriginal: true
};

// Get control elements
const scaleXSlider = document.getElementById('scaleX');
const scaleYSlider = document.getElementById('scaleY');
const rotationSlider = document.getElementById('rotation');
const translateXSlider = document.getElementById('translateX');
const translateYSlider = document.getElementById('translateY');
const showGridCheckbox = document.getElementById('showGrid');
const showOriginalCheckbox = document.getElementById('showOriginal');

// Update value displays
function updateDisplay(id, value) {
  document.getElementById(id).textContent = value.toFixed(2);
}

// Event listeners
scaleXSlider.addEventListener('input', (e) => {
  transformState.scaleX = parseFloat(e.target.value);
  updateDisplay('scaleXValue', transformState.scaleX);
  render();
});

scaleYSlider.addEventListener('input', (e) => {
  transformState.scaleY = parseFloat(e.target.value);
  updateDisplay('scaleYValue', transformState.scaleY);
  render();
});

rotationSlider.addEventListener('input', (e) => {
  transformState.rotation = parseFloat(e.target.value);
  updateDisplay('rotationValue', transformState.rotation);
  render();
});

translateXSlider.addEventListener('input', (e) => {
  transformState.translateX = parseFloat(e.target.value);
  updateDisplay('translateXValue', transformState.translateX);
  render();
});

translateYSlider.addEventListener('input', (e) => {
  transformState.translateY = parseFloat(e.target.value);
  updateDisplay('translateYValue', transformState.translateY);
  render();
});

showGridCheckbox.addEventListener('change', (e) => {
  transformState.showGrid = e.target.checked;
  render();
});

showOriginalCheckbox.addEventListener('change', (e) => {
  transformState.showOriginal = e.target.checked;
  render();
});`,
      explanation: 'Event listeners connect UI controls to transformation state. When controls change, we update the state and trigger a re-render. This creates an interactive transformation editor.',
      files: [
        {
          name: 'main.js (controls)',
          content: `let transformState = {
  scaleX: 1.0,
  scaleY: 1.0,
  rotation: 0,
  translateX: 0,
  translateY: 0,
  showGrid: true,
  showOriginal: true
};

// ... (event listeners as shown above)`
        }
      ]
    },
    {
      title: 'Step 10: Complete Render Function',
      description: 'Put it all together with a complete render function that combines all transformations',
      code: `// main.js (complete render function)

import { createShader, createProgram, matrix3ToWebGL } from './utils/shaderUtils.js';
import { multiplyMatrices3x3, translationMatrix, rotationMatrix, scaleMatrix } from './utils/matrix.js';
import { drawGrid, drawSquare, drawTriangle } from './utils/drawing.js';

// Shader sources
const vertexShaderSource = \`
attribute vec2 a_position;
uniform mat3 u_matrix;

void main() {
  vec3 position = u_matrix * vec3(a_position, 1.0);
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
\`;

const fragmentShaderSource = \`
precision mediump float;
uniform vec4 u_color;

void main() {
  gl_FragColor = u_color;
}
\`;

// Initialize shaders
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program);

function render() {
  // Clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  // Draw grid if enabled
  if (transformState.showGrid) {
    drawGrid(gl, program, canvas.width, canvas.height);
  }
  
  // Build transformation matrix
  // Order: Scale -> Rotate -> Translate
  const scale = scaleMatrix(transformState.scaleX, transformState.scaleY);
  const rotate = rotationMatrix(transformState.rotation * Math.PI / 180);
  const translate = translationMatrix(transformState.translateX, transformState.translateY);
  
  // Combine transformations (right to left: translate * rotate * scale)
  let transform = multiplyMatrices3x3(translate, rotate);
  transform = multiplyMatrices3x3(transform, scale);
  
  // Draw original shape if enabled
  if (transformState.showOriginal) {
    const identity = [[1,0,0], [0,1,0], [0,0,1]];
    drawSquare(gl, program, 100, identity, [0.3, 0.3, 0.5, 0.5]);
  }
  
  // Draw transformed shape
  drawSquare(gl, program, 100, transform, [0.5, 0.8, 1.0, 1.0]);
}

// Initial render
render();`,
      explanation: 'The render function combines all pieces: clears the canvas, draws the grid, builds the transformation matrix by combining scale, rotation, and translation, then draws both original and transformed shapes. The transformation order matters!',
      files: [
        {
          name: 'main.js (complete)',
          content: `import { createShader, createProgram, matrix3ToWebGL } from './utils/shaderUtils.js';
import { multiplyMatrices3x3, translationMatrix, rotationMatrix, scaleMatrix } from './utils/matrix.js';
import { drawGrid, drawSquare, drawTriangle } from './utils/drawing.js';

// ... (full implementation as shown above)`
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">
        Complete Tutorial: Building a Transformation Visualization Editor
      </h2>
      <p className="text-gray-700 mb-6 text-lg">
        Learn how to build a complete transformation visualization editor from scratch using WebGL, Vite, and JavaScript.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <p className="text-blue-900 font-semibold mb-2">📚 What You'll Learn:</p>
        <ul className="list-disc list-inside text-blue-800 space-y-1">
          <li>Setting up a Vite project for WebGL development</li>
          <li>Initializing WebGL context and rendering pipeline</li>
          <li>Implementing matrix math for 2D transformations</li>
          <li>Writing shaders for rendering shapes</li>
          <li>Drawing grids, axes, and geometric shapes</li>
          <li>Applying transformations (scale, rotate, translate)</li>
          <li>Combining multiple transformations</li>
          <li>Creating interactive controls for real-time visualization</li>
        </ul>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="border-2 border-blue-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleStep(index)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                  {index + 1}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-blue-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              {expandedSteps[index] ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-blue-600" />
              )}
            </button>

            {expandedSteps[index] && (
              <div className="p-6 bg-white space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm font-mono">
                    <code>{step.code}</code>
                  </pre>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">💡 Explanation:</span> {step.explanation}
                  </p>
                </div>

                {step.files && step.files.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Files to Create:
                    </h4>
                    {step.files.map((file, fileIndex) => (
                      <div key={fileIndex} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="font-mono text-sm font-semibold text-blue-900">{file.name}</span>
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
              <li>Add more shape types (circles, polygons, custom paths)</li>
              <li>Implement 3D transformations with 4x4 matrices</li>
              <li>Add animation and interpolation between transformations</li>
              <li>Create a transformation history/undo system</li>
              <li>Export/import transformation presets</li>
              <li>Add more advanced transformations (shear, reflection, etc.)</li>
              <li>Implement transformation composition and chaining</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

