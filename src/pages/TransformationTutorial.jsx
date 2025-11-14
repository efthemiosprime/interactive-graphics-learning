import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Code, FileText } from 'lucide-react';

export default function TransformationTutorial() {
  const [expandedSteps, setExpandedSteps] = useState({});
  const [activeTutorial, setActiveTutorial] = useState('2d'); // '2d' or '3d'

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

  const steps3D = [
    {
      title: 'Step 1: Set Up Vite Project',
      description: 'Create a new Vite project with vanilla JavaScript',
      code: `# Create a new Vite project
npm create vite@latest transformation-3d-editor -- --template vanilla

# Navigate to project directory
cd transformation-3d-editor

# Install dependencies
npm install`,
      explanation: 'Vite provides a fast development environment. This sets up a basic vanilla JavaScript project perfect for WebGL-based 3D transformation visualization.',
      files: [
        {
          name: 'package.json',
          content: `{
  "name": "transformation-3d-editor",
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
      description: 'Set up the HTML file with canvas and 3D control panels',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Transformation Visualization Editor</title>
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
  </style>
</head>
<body>
  <div class="container">
    <div>
      <h1>3D Transformation Visualization Editor</h1>
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
    <div class="controls">
      <h2>3D Controls</h2>
      <div class="control-group">
        <label>Scale X: <span id="scaleXValue">1.0</span></label>
        <input type="range" id="scaleX" min="0.1" max="3" step="0.1" value="1">
      </div>
      <div class="control-group">
        <label>Scale Y: <span id="scaleYValue">1.0</span></label>
        <input type="range" id="scaleY" min="0.1" max="3" step="0.1" value="1">
      </div>
      <div class="control-group">
        <label>Scale Z: <span id="scaleZValue">1.0</span></label>
        <input type="range" id="scaleZ" min="0.1" max="3" step="0.1" value="1">
      </div>
      <div class="control-group">
        <label>Rotate X: <span id="rotateXValue">0</span>°</label>
        <input type="range" id="rotateX" min="0" max="360" step="1" value="0">
      </div>
      <div class="control-group">
        <label>Rotate Y: <span id="rotateYValue">0</span>°</label>
        <input type="range" id="rotateY" min="0" max="360" step="1" value="0">
      </div>
      <div class="control-group">
        <label>Rotate Z: <span id="rotateZValue">0</span>°</label>
        <input type="range" id="rotateZ" min="0" max="360" step="1" value="0">
      </div>
      <div class="control-group">
        <label>Translate X: <span id="translateXValue">0</span></label>
        <input type="range" id="translateX" min="-200" max="200" step="1" value="0">
      </div>
      <div class="control-group">
        <label>Translate Y: <span id="translateYValue">0</span></label>
        <input type="range" id="translateY" min="-200" max="200" step="1" value="0">
      </div>
      <div class="control-group">
        <label>Translate Z: <span id="translateZValue">0</span></label>
        <input type="range" id="translateZ" min="-200" max="200" step="1" value="0">
      </div>
    </div>
  </div>
  <script type="module" src="/main.js"></script>
</body>
</html>`,
      explanation: 'The HTML structure includes a canvas for WebGL rendering and a control panel with sliders for 3D transformation parameters (scale, rotation, translation on all three axes).',
      files: [
        {
          name: 'index.html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3D Transformation Visualization Editor</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="container">
    <div>
      <h1>3D Transformation Visualization Editor</h1>
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
    <div class="controls">
      <!-- 3D Controls here -->
    </div>
  </div>
  <script type="module" src="/main.js"></script>
</body>
</html>`
        }
      ]
    },
    {
      title: 'Step 3: Initialize WebGL Context for 3D',
      description: 'Get WebGL context and enable depth testing for 3D rendering',
      code: `// main.js
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  console.error('WebGL not supported');
  alert('WebGL is not supported in your browser');
}

// Set viewport to match canvas size
gl.viewport(0, 0, canvas.width, canvas.height);

// Enable depth testing for 3D
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);

// Set clear color (dark background)
gl.clearColor(0.06, 0.06, 0.12, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

console.log('WebGL initialized for 3D rendering!');`,
      explanation: 'For 3D rendering, we must enable depth testing so objects are drawn in the correct order. We clear both color and depth buffers.',
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
gl.enable(gl.DEPTH_TEST);
gl.depthFunc(gl.LEQUAL);

gl.clearColor(0.06, 0.06, 0.12, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

console.log('WebGL initialized for 3D rendering!');`
        }
      ]
    },
    {
      title: 'Step 4: Create 4x4 Matrix Math Utilities',
      description: 'Implement 4x4 matrix multiplication and 3D transformation matrix creation functions',
      code: `// utils/matrix3D.js

// Multiply two 4x4 matrices
export function multiplyMatrices4x4(a, b) {
  const result = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  
  return result;
}

// Create translation matrix (4x4)
export function translationMatrix3D(tx, ty, tz) {
  return [
    [1, 0, 0, tx],
    [0, 1, 0, ty],
    [0, 0, 1, tz],
    [0, 0, 0, 1]
  ];
}

// Create rotation matrix around X axis
export function rotationXMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [1, 0,  0, 0],
    [0, c, -s, 0],
    [0, s,  c, 0],
    [0, 0,  0, 1]
  ];
}

// Create rotation matrix around Y axis
export function rotationYMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [ c, 0, s, 0],
    [ 0, 1, 0, 0],
    [-s, 0, c, 0],
    [ 0, 0, 0, 1]
  ];
}

// Create rotation matrix around Z axis
export function rotationZMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [c, -s, 0, 0],
    [s,  c, 0, 0],
    [0,  0, 1, 0],
    [0,  0, 0, 1]
  ];
}

// Create scale matrix (4x4)
export function scaleMatrix3D(sx, sy, sz) {
  return [
    [sx, 0,  0,  0],
    [0,  sy, 0,  0],
    [0,  0,  sz, 0],
    [0,  0,  0,  1]
  ];
}

// Create perspective projection matrix
export function perspectiveMatrix(fov, aspect, near, far) {
  const f = 1.0 / Math.tan(fov / 2);
  const rangeInv = 1.0 / (near - far);
  
  return [
    [f / aspect, 0, 0, 0],
    [0, f, 0, 0],
    [0, 0, (near + far) * rangeInv, 2 * near * far * rangeInv],
    [0, 0, -1, 0]
  ];
}`,
      explanation: '3D transformations use 4x4 matrices. We create functions for translation, rotation around each axis, scaling, and perspective projection. Perspective projection creates the 3D depth effect.',
      files: [
        {
          name: 'utils/matrix3D.js',
          content: `export function multiplyMatrices4x4(a, b) {
  const result = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

export function translationMatrix3D(tx, ty, tz) {
  return [[1,0,0,tx], [0,1,0,ty], [0,0,1,tz], [0,0,0,1]];
}

export function rotationXMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [[1,0,0,0], [0,c,-s,0], [0,s,c,0], [0,0,0,1]];
}

export function rotationYMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [[c,0,s,0], [0,1,0,0], [-s,0,c,0], [0,0,0,1]];
}

export function rotationZMatrix(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [[c,-s,0,0], [s,c,0,0], [0,0,1,0], [0,0,0,1]];
}

export function scaleMatrix3D(sx, sy, sz) {
  return [[sx,0,0,0], [0,sy,0,0], [0,0,sz,0], [0,0,0,1]];
}

export function perspectiveMatrix(fov, aspect, near, far) {
  const f = 1.0 / Math.tan(fov / 2);
  const rangeInv = 1.0 / (near - far);
  return [
    [f/aspect, 0, 0, 0],
    [0, f, 0, 0],
    [0, 0, (near+far)*rangeInv, 2*near*far*rangeInv],
    [0, 0, -1, 0]
  ];
}`
        }
      ]
    },
    {
      title: 'Step 5: Create 3D Vertex and Fragment Shaders',
      description: 'Write shaders for rendering 3D shapes with perspective projection',
      code: `// shaders/vertex3D.glsl
attribute vec3 a_position;

uniform mat4 u_modelMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projectionMatrix;

void main() {
  // Apply model, view, and projection transformations
  vec4 position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * vec4(a_position, 1.0);
  gl_Position = position;
}

// shaders/fragment3D.glsl
precision mediump float;

uniform vec4 u_color;

void main() {
  gl_FragColor = u_color;
}`,
      explanation: 'The vertex shader applies model (object transformation), view (camera), and projection (perspective) matrices. We use vec3 for 3D positions and mat4 for 4x4 transformation matrices.',
      files: [
        {
          name: 'shaders/vertex3D.glsl',
          content: `attribute vec3 a_position;

uniform mat4 u_modelMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projectionMatrix;

void main() {
  vec4 position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * vec4(a_position, 1.0);
  gl_Position = position;
}`
        },
        {
          name: 'shaders/fragment3D.glsl',
          content: `precision mediump float;
uniform vec4 u_color;

void main() {
  gl_FragColor = u_color;
}`
        }
      ]
    },
    {
      title: 'Step 6: Compile Shaders and Set Up Camera',
      description: 'Create shader program and set up view and projection matrices',
      code: `// utils/shaderUtils.js (same as 2D, but for 3D)

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

// Helper to convert 4x4 matrix to WebGL format (column-major)
export function matrix4ToWebGL(matrix) {
  return new Float32Array([
    matrix[0][0], matrix[1][0], matrix[2][0], matrix[3][0],
    matrix[0][1], matrix[1][1], matrix[2][1], matrix[3][1],
    matrix[0][2], matrix[1][2], matrix[2][2], matrix[3][2],
    matrix[0][3], matrix[1][3], matrix[2][3], matrix[3][3]
  ]);
}

// Create view matrix (camera looking at origin)
export function lookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
  // Implementation of lookAt matrix
  // This creates a view matrix that positions the camera
  // For simplicity, we'll use a basic implementation
  const f = [centerX - eyeX, centerY - eyeY, centerZ - eyeZ];
  const fLength = Math.sqrt(f[0]*f[0] + f[1]*f[1] + f[2]*f[2]);
  f[0] /= fLength; f[1] /= fLength; f[2] /= fLength;
  
  const s = [f[1]*upZ - f[2]*upY, f[2]*upX - f[0]*upZ, f[0]*upY - f[1]*upX];
  const sLength = Math.sqrt(s[0]*s[0] + s[1]*s[1] + s[2]*s[2]);
  s[0] /= sLength; s[1] /= sLength; s[2] /= sLength;
  
  const u = [s[1]*f[2] - s[2]*f[1], s[2]*f[0] - s[0]*f[2], s[0]*f[1] - s[1]*f[0]];
  
  return [
    [s[0], u[0], -f[0], 0],
    [s[1], u[1], -f[1], 0],
    [s[2], u[2], -f[2], 0],
    [-s[0]*eyeX - s[1]*eyeY - s[2]*eyeZ, -u[0]*eyeX - u[1]*eyeY - u[2]*eyeZ, f[0]*eyeX + f[1]*eyeY + f[2]*eyeZ, 1]
  ];
}`,
      explanation: 'Shader compilation is similar to 2D, but we need matrix4ToWebGL for 4x4 matrices. The lookAt function creates a view matrix that positions the camera in 3D space.',
      files: [
        {
          name: 'utils/shaderUtils3D.js',
          content: `export function createShader(gl, type, source) {
  // ... (same as 2D version)
}

export function createProgram(gl, vertexShader, fragmentShader) {
  // ... (same as 2D version)
}

export function matrix4ToWebGL(matrix) {
  return new Float32Array([
    matrix[0][0], matrix[1][0], matrix[2][0], matrix[3][0],
    matrix[0][1], matrix[1][1], matrix[2][1], matrix[3][1],
    matrix[0][2], matrix[1][2], matrix[2][2], matrix[3][2],
    matrix[0][3], matrix[1][3], matrix[2][3], matrix[3][3]
  ]);
}

export function lookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
  // ... (lookAt implementation)
}`
        }
      ]
    },
    {
      title: 'Step 7: Create 3D Geometry (Cube)',
      description: 'Define vertices and indices for a 3D cube',
      code: `// utils/geometry3D.js

export function createCubeVertices(size = 1.0) {
  const s = size / 2;
  // 8 vertices of a cube
  return new Float32Array([
    // Front face
    -s, -s,  s,   s, -s,  s,   s,  s,  s,  -s,  s,  s,
    // Back face
    -s, -s, -s,  -s,  s, -s,   s,  s, -s,   s, -s, -s,
    // Top face
    -s,  s, -s,  -s,  s,  s,   s,  s,  s,   s,  s, -s,
    // Bottom face
    -s, -s, -s,   s, -s, -s,   s, -s,  s,  -s, -s,  s,
    // Right face
     s, -s, -s,   s,  s, -s,   s,  s,  s,   s, -s,  s,
    // Left face
    -s, -s, -s,  -s, -s,  s,  -s,  s,  s,  -s,  s, -s
  ]);
}

export function createCubeIndices() {
  // Indices for 12 triangles (2 per face)
  return new Uint16Array([
    0,  1,  2,    0,  2,  3,    // Front
    4,  5,  6,    4,  6,  7,    // Back
    8,  9,  10,   8,  10, 11,   // Top
    12, 13, 14,   12, 14, 15,   // Bottom
    16, 17, 18,   16, 18, 19,   // Right
    20, 21, 22,   20, 22, 23    // Left
  ]);
}`,
      explanation: 'We define cube vertices as 3D coordinates. Each face is made of 4 vertices forming 2 triangles. Indices allow us to reuse vertices efficiently.',
      files: [
        {
          name: 'utils/geometry3D.js',
          content: `export function createCubeVertices(size = 1.0) {
  const s = size / 2;
  return new Float32Array([
    -s, -s,  s,   s, -s,  s,   s,  s,  s,  -s,  s,  s,
    -s, -s, -s,  -s,  s, -s,   s,  s, -s,   s, -s, -s,
    -s,  s, -s,  -s,  s,  s,   s,  s,  s,   s,  s, -s,
    -s, -s, -s,   s, -s, -s,   s, -s,  s,  -s, -s,  s,
     s, -s, -s,   s,  s, -s,   s,  s,  s,   s, -s,  s,
    -s, -s, -s,  -s, -s,  s,  -s,  s,  s,  -s,  s, -s
  ]);
}

export function createCubeIndices() {
  return new Uint16Array([
    0,1,2, 0,2,3, 4,5,6, 4,6,7, 8,9,10, 8,10,11,
    12,13,14, 12,14,15, 16,17,18, 16,18,19, 20,21,22, 20,22,23
  ]);
}`
        }
      ]
    },
    {
      title: 'Step 8: Draw 3D Cube with Transformations',
      description: 'Create function to draw cube with model matrix transformations',
      code: `// utils/drawing3D.js

export function drawCube(gl, program, vertices, indices, modelMatrix, viewMatrix, projectionMatrix, color) {
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const modelMatrixLocation = gl.getUniformLocation(program, 'u_modelMatrix');
  const viewMatrixLocation = gl.getUniformLocation(program, 'u_viewMatrix');
  const projectionMatrixLocation = gl.getUniformLocation(program, 'u_projectionMatrix');
  const colorLocation = gl.getUniformLocation(program, 'u_color');
  
  // Set matrices
  gl.uniformMatrix4fv(modelMatrixLocation, false, matrix4ToWebGL(modelMatrix));
  gl.uniformMatrix4fv(viewMatrixLocation, false, matrix4ToWebGL(viewMatrix));
  gl.uniformMatrix4fv(projectionMatrixLocation, false, matrix4ToWebGL(projectionMatrix));
  gl.uniform4f(colorLocation, color[0], color[1], color[2], color[3]);
  
  // Create and bind vertex buffer
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
  
  // Create and bind index buffer
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  
  // Draw cube
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}`,
      explanation: 'We set all three matrices (model, view, projection) as uniforms. The vertex buffer stores 3D positions (3 components), and we use drawElements with indices for efficient rendering.',
      files: [
        {
          name: 'utils/drawing3D.js',
          content: `export function drawCube(gl, program, vertices, indices, modelMatrix, viewMatrix, projectionMatrix, color) {
  // ... (implementation as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 9: Connect 3D Controls to Transformations',
      description: 'Set up event listeners for 3D transformation controls',
      code: `// main.js (continued)

// State for 3D transformations
let transformState3D = {
  scaleX: 1.0,
  scaleY: 1.0,
  scaleZ: 1.0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  translateX: 0,
  translateY: 0,
  translateZ: 0
};

// Get control elements
const scaleXSlider = document.getElementById('scaleX');
const scaleYSlider = document.getElementById('scaleY');
const scaleZSlider = document.getElementById('scaleZ');
const rotateXSlider = document.getElementById('rotateX');
const rotateYSlider = document.getElementById('rotateY');
const rotateZSlider = document.getElementById('rotateZ');
const translateXSlider = document.getElementById('translateX');
const translateYSlider = document.getElementById('translateY');
const translateZSlider = document.getElementById('translateZ');

// Update value displays
function updateDisplay(id, value) {
  document.getElementById(id).textContent = value.toFixed(2);
}

// Event listeners for all 3D controls
scaleXSlider.addEventListener('input', (e) => {
  transformState3D.scaleX = parseFloat(e.target.value);
  updateDisplay('scaleXValue', transformState3D.scaleX);
  render();
});

scaleYSlider.addEventListener('input', (e) => {
  transformState3D.scaleY = parseFloat(e.target.value);
  updateDisplay('scaleYValue', transformState3D.scaleY);
  render();
});

scaleZSlider.addEventListener('input', (e) => {
  transformState3D.scaleZ = parseFloat(e.target.value);
  updateDisplay('scaleZValue', transformState3D.scaleZ);
  render();
});

rotateXSlider.addEventListener('input', (e) => {
  transformState3D.rotateX = parseFloat(e.target.value);
  updateDisplay('rotateXValue', transformState3D.rotateX);
  render();
});

rotateYSlider.addEventListener('input', (e) => {
  transformState3D.rotateY = parseFloat(e.target.value);
  updateDisplay('rotateYValue', transformState3D.rotateY);
  render();
});

rotateZSlider.addEventListener('input', (e) => {
  transformState3D.rotateZ = parseFloat(e.target.value);
  updateDisplay('rotateZValue', transformState3D.rotateZ);
  render();
});

translateXSlider.addEventListener('input', (e) => {
  transformState3D.translateX = parseFloat(e.target.value);
  updateDisplay('translateXValue', transformState3D.translateX);
  render();
});

translateYSlider.addEventListener('input', (e) => {
  transformState3D.translateY = parseFloat(e.target.value);
  updateDisplay('translateYValue', transformState3D.translateY);
  render();
});

translateZSlider.addEventListener('input', (e) => {
  transformState3D.translateZ = parseFloat(e.target.value);
  updateDisplay('translateZValue', transformState3D.translateZ);
  render();
});`,
      explanation: '3D transformations have controls for all three axes. Event listeners update the state and trigger re-rendering. Each transformation (scale, rotate, translate) has X, Y, and Z components.',
      files: [
        {
          name: 'main.js (3D controls)',
          content: `let transformState3D = {
  scaleX: 1.0, scaleY: 1.0, scaleZ: 1.0,
  rotateX: 0, rotateY: 0, rotateZ: 0,
  translateX: 0, translateY: 0, translateZ: 0
};

// ... (event listeners as shown above)`
        }
      ]
    },
    {
      title: 'Step 10: Complete 3D Render Function',
      description: 'Put it all together with complete 3D rendering pipeline',
      code: `// main.js (complete 3D render function)

import { createShader, createProgram, matrix4ToWebGL, lookAt } from './utils/shaderUtils3D.js';
import { multiplyMatrices4x4, translationMatrix3D, rotationXMatrix, rotationYMatrix, rotationZMatrix, scaleMatrix3D, perspectiveMatrix } from './utils/matrix3D.js';
import { createCubeVertices, createCubeIndices } from './utils/geometry3D.js';
import { drawCube } from './utils/drawing3D.js';

// Shader sources
const vertexShaderSource = \`
attribute vec3 a_position;
uniform mat4 u_modelMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_projectionMatrix;

void main() {
  vec4 position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * vec4(a_position, 1.0);
  gl_Position = position;
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

// Create cube geometry
const cubeVertices = createCubeVertices(100);
const cubeIndices = createCubeIndices();

// Set up camera and projection
const fov = Math.PI / 4; // 45 degrees
const aspect = canvas.width / canvas.height;
const near = 0.1;
const far = 1000;
const projectionMatrix = perspectiveMatrix(fov, aspect, near, far);

// Camera position (looking at origin)
const eyeX = 0, eyeY = 0, eyeZ = 300;
const viewMatrix = lookAt(eyeX, eyeY, eyeZ, 0, 0, 0, 0, 1, 0);

function render() {
  // Clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  // Build model matrix: Scale -> Rotate -> Translate
  const scale = scaleMatrix3D(transformState3D.scaleX, transformState3D.scaleY, transformState3D.scaleZ);
  const rotateX = rotationXMatrix(transformState3D.rotateX * Math.PI / 180);
  const rotateY = rotationYMatrix(transformState3D.rotateY * Math.PI / 180);
  const rotateZ = rotationZMatrix(transformState3D.rotateZ * Math.PI / 180);
  const translate = translationMatrix3D(transformState3D.translateX, transformState3D.translateY, transformState3D.translateZ);
  
  // Combine rotations: Z * Y * X
  let rotate = multiplyMatrices4x4(rotateZ, rotateY);
  rotate = multiplyMatrices4x4(rotate, rotateX);
  
  // Combine all: Translate * Rotate * Scale
  let modelMatrix = multiplyMatrices4x4(translate, rotate);
  modelMatrix = multiplyMatrices4x4(modelMatrix, scale);
  
  // Draw cube
  drawCube(gl, program, cubeVertices, cubeIndices, modelMatrix, viewMatrix, projectionMatrix, [0.5, 0.8, 1.0, 1.0]);
}

// Initial render
render();`,
      explanation: 'The complete 3D render function combines all pieces: sets up perspective projection and camera view, builds the model matrix by combining scale, rotations (on all axes), and translation, then renders the cube. The transformation order matters for correct 3D positioning!',
      files: [
        {
          name: 'main.js (complete 3D)',
          content: `import { createShader, createProgram, matrix4ToWebGL, lookAt } from './utils/shaderUtils3D.js';
import { multiplyMatrices4x4, translationMatrix3D, rotationXMatrix, rotationYMatrix, rotationZMatrix, scaleMatrix3D, perspectiveMatrix } from './utils/matrix3D.js';
import { createCubeVertices, createCubeIndices } from './utils/geometry3D.js';
import { drawCube } from './utils/drawing3D.js';

// ... (full implementation as shown above)`
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/transformation-visualization"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Transformation Visualization
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-blue-900">
              Complete Tutorial: Building a Transformation Visualization Editor
            </h1>
          </div>

          {/* Tutorial Type Tabs */}
          <div className="flex gap-2 mb-6 border-b-2 border-blue-200 pb-4">
            <button
              onClick={() => {
                setActiveTutorial('2d');
                setExpandedSteps({});
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTutorial === '2d'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              2D Transformations
            </button>
            <button
              onClick={() => {
                setActiveTutorial('3d');
                setExpandedSteps({});
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTutorial === '3d'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              3D Transformations
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <p className="text-blue-900 font-semibold mb-2">📚 What You'll Learn:</p>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              {activeTutorial === '2d' ? (
                <>
                  <li>Setting up a Vite project for WebGL development</li>
                  <li>Initializing WebGL context and rendering pipeline</li>
                  <li>Implementing matrix math for 2D transformations</li>
                  <li>Writing shaders for rendering shapes</li>
                  <li>Drawing grids, axes, and geometric shapes</li>
                  <li>Applying transformations (scale, rotate, translate)</li>
                  <li>Combining multiple transformations</li>
                  <li>Creating interactive controls for real-time visualization</li>
                </>
              ) : (
                <>
                  <li>Setting up a Vite project for 3D WebGL development</li>
                  <li>Initializing WebGL with depth testing for 3D rendering</li>
                  <li>Implementing 4x4 matrix math for 3D transformations</li>
                  <li>Writing 3D shaders with perspective projection</li>
                  <li>Creating 3D geometry (cubes, spheres, etc.)</li>
                  <li>Setting up camera and view matrices</li>
                  <li>Applying 3D transformations (scale, rotate on all axes, translate)</li>
                  <li>Combining multiple 3D transformations</li>
                  <li>Creating interactive controls for 3D visualization</li>
                </>
              )}
            </ul>
          </div>

          <div className="space-y-4">
            {(activeTutorial === '2d' ? steps : steps3D).map((step, index) => (
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
                  {activeTutorial === '2d' ? (
                    <>
                      <li>Add more shape types (circles, polygons, custom paths)</li>
                      <li>Implement 3D transformations with 4x4 matrices</li>
                      <li>Add animation and interpolation between transformations</li>
                      <li>Create a transformation history/undo system</li>
                      <li>Export/import transformation presets</li>
                      <li>Add more advanced transformations (shear, reflection, etc.)</li>
                      <li>Implement transformation composition and chaining</li>
                    </>
                  ) : (
                    <>
                      <li>Add more 3D shapes (spheres, cylinders, torus, etc.)</li>
                      <li>Implement lighting and shading (Phong, Blinn-Phong)</li>
                      <li>Add texture mapping to 3D objects</li>
                      <li>Create camera controls (orbit, pan, zoom)</li>
                      <li>Add animation and interpolation between 3D transformations</li>
                      <li>Implement quaternion rotations for smooth 3D rotation</li>
                      <li>Add shadow mapping and advanced lighting effects</li>
                      <li>Create a scene graph for complex 3D scenes</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

