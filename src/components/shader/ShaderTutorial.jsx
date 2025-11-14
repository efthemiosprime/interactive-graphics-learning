import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Code, FileText, Play } from 'lucide-react';

export default function ShaderTutorial() {
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
npm create vite@latest shader-visualization -- --template vanilla

# Navigate to project directory
cd shader-visualization

# Install dependencies
npm install`,
      explanation: 'Vite is a fast build tool that provides instant server start and hot module replacement. The vanilla template gives you a clean starting point without any framework overhead.',
      files: [
        {
          name: 'package.json',
          content: `{
  "name": "shader-visualization",
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
      description: 'Set up the basic HTML file with a canvas element',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shader Visualization</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      background: #1a1a2e;
      color: #fff;
      font-family: 'Courier New', monospace;
    }
    #canvas {
      border: 2px solid #6366f1;
      border-radius: 8px;
      display: block;
      margin: 20px auto;
    }
    .controls {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background: #16213e;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <h1>Shader Visualization</h1>
  <canvas id="canvas" width="600" height="600"></canvas>
  <div class="controls">
    <!-- Controls will go here -->
  </div>
  <script type="module" src="/main.js"></script>
</body>
</html>`,
      explanation: 'The canvas element is where WebGL will render our shader. We use type="module" to enable ES6 imports in the script tag.',
      files: [
        {
          name: 'index.html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shader Visualization</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <h1>Shader Visualization</h1>
  <canvas id="canvas" width="600" height="600"></canvas>
  <div class="controls">
    <!-- Controls will go here -->
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

// Set clear color (dark blue)
gl.clearColor(0.1, 0.1, 0.2, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

console.log('WebGL initialized successfully!');`,
      explanation: 'WebGL context provides access to the GPU. We set the viewport to match canvas dimensions and clear the screen with a background color.',
      files: [
        {
          name: 'main.js',
          content: `const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  console.error('WebGL not supported');
  alert('WebGL is not supported in your browser');
}

// Set viewport to match canvas size
gl.viewport(0, 0, canvas.width, canvas.height);

// Set clear color (dark blue)
gl.clearColor(0.1, 0.1, 0.2, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

console.log('WebGL initialized successfully!');`
        }
      ]
    },
    {
      title: 'Step 4: Create Vertex Shader',
      description: 'Write a vertex shader that defines the geometry',
      code: `// shaders/vertex.glsl
const vertexShaderSource = \`#version 300 es
in vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
\`;

// Or in JavaScript file:
const vertexShaderSource = \`
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
\`;`,
      explanation: 'The vertex shader runs once per vertex. It takes a 2D position and converts it to clip space coordinates (gl_Position). For a full-screen quad, we\'ll use normalized device coordinates.',
      files: [
        {
          name: 'shaders/vertex.glsl',
          content: `attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`
        }
      ]
    },
    {
      title: 'Step 5: Create Fragment Shader',
      description: 'Write a fragment shader that defines the pixel colors',
      code: `// shaders/fragment.glsl
const fragmentShaderSource = \`
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  // Normalize coordinates to 0-1 range
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  // Create a simple gradient
  vec3 color = vec3(uv.x, uv.y, 0.5);
  
  gl_FragColor = vec4(color, 1.0);
}
\`;`,
      explanation: 'The fragment shader runs once per pixel. gl_FragCoord gives pixel coordinates, which we normalize to 0-1 range (UV coordinates). This creates a simple color gradient.',
      files: [
        {
          name: 'shaders/fragment.glsl',
          content: `precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  // Normalize coordinates to 0-1 range
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  // Create a simple gradient
  vec3 color = vec3(uv.x, uv.y, 0.5);
  
  gl_FragColor = vec4(color, 1.0);
}`
        }
      ]
    },
    {
      title: 'Step 6: Compile and Link Shaders',
      description: 'Create shader program by compiling and linking vertex and fragment shaders',
      code: `// utils/shaderUtils.js
function createShader(gl, type, source) {
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

function createProgram(gl, vertexShader, fragmentShader) {
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

// Usage
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

gl.useProgram(program);`,
      explanation: 'Shaders must be compiled and linked into a program before use. Always check for compilation and linking errors. The program is then activated with gl.useProgram().',
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
}`
        }
      ]
    },
    {
      title: 'Step 7: Create Full-Screen Quad',
      description: 'Set up vertex buffer with a full-screen quad (two triangles)',
      code: `// Create a full-screen quad using two triangles
// Positions in normalized device coordinates (-1 to 1)
const positions = new Float32Array([
  -1, -1,  // Triangle 1: bottom-left
   1, -1,  // bottom-right
  -1,  1,  // top-left
  -1,  1,  // Triangle 2: top-left
   1, -1,  // bottom-right
   1,  1   // top-right
]);

// Create buffer
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

// Set up attribute
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);`,
      explanation: 'A full-screen quad covers the entire canvas. We use two triangles (6 vertices) in normalized device coordinates. The vertex attribute pointer tells WebGL how to read the buffer data.',
      files: [
        {
          name: 'main.js (continued)',
          content: `// Create a full-screen quad
const positions = new Float32Array([
  -1, -1,  1, -1,  -1,  1,  // Triangle 1
  -1,  1,  1, -1,   1,  1   // Triangle 2
]);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);`
        }
      ]
    },
    {
      title: 'Step 8: Set Uniforms and Render',
      description: 'Pass data to shader uniforms and draw the scene',
      code: `// Set uniform values
const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

// Animation loop
let startTime = Date.now();
function render() {
  // Calculate time
  const currentTime = (Date.now() - startTime) / 1000.0;
  gl.uniform1f(timeUniformLocation, currentTime);
  
  // Clear and draw
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  
  requestAnimationFrame(render);
}

render();`,
      explanation: 'Uniforms are values that are the same for all vertices/pixels. We pass resolution and time to the fragment shader. requestAnimationFrame creates a smooth animation loop.',
      files: [
        {
          name: 'main.js (render loop)',
          content: `// Set uniforms
const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

// Animation loop
let startTime = Date.now();
function render() {
  const currentTime = (Date.now() - startTime) / 1000.0;
  
  gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
  gl.uniform1f(timeUniformLocation, currentTime);
  
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  
  requestAnimationFrame(render);
}

render();`
        }
      ]
    },
    {
      title: 'Step 9: Add Interactive Controls',
      description: 'Create UI controls to modify shader parameters in real-time',
      code: `// Add slider controls
function createControl(label, min, max, value, callback) {
  const container = document.createElement('div');
  container.className = 'control-item';
  
  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = min;
  slider.max = max;
  slider.value = value;
  slider.step = 0.01;
  
  const valueDisplay = document.createElement('span');
  valueDisplay.textContent = value.toFixed(2);
  
  slider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    valueDisplay.textContent = val.toFixed(2);
    callback(val);
  });
  
  container.appendChild(labelEl);
  container.appendChild(slider);
  container.appendChild(valueDisplay);
  
  return container;
}

// Example: Color control
const controlsDiv = document.querySelector('.controls');
const redControl = createControl('Red', 0, 1, 0.5, (val) => {
  const colorUniform = gl.getUniformLocation(program, 'u_color');
  gl.uniform3f(colorUniform, val, 0.5, 0.5);
});`,
      explanation: 'Interactive controls let users modify shader parameters in real-time. We create sliders that update uniform values, giving immediate visual feedback.',
      files: [
        {
          name: 'controls.js',
          content: `export function createControl(label, min, max, value, callback) {
  const container = document.createElement('div');
  container.className = 'control-item';
  
  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = min;
  slider.max = max;
  slider.value = value;
  slider.step = 0.01;
  
  const valueDisplay = document.createElement('span');
  valueDisplay.textContent = value.toFixed(2);
  
  slider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    valueDisplay.textContent = val.toFixed(2);
    callback(val);
  });
  
  container.appendChild(labelEl);
  container.appendChild(slider);
  container.appendChild(valueDisplay);
  
  return container;
}`
        }
      ]
    },
    {
      title: 'Step 10: Complete Example - Animated Gradient',
      description: 'Put it all together with a complete working example',
      code: `// Complete main.js
import { createShader, createProgram } from './utils/shaderUtils.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

// Shader sources
const vertexShaderSource = \`
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
\`;

const fragmentShaderSource = \`
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 color = mix(
    vec3(uv.x, uv.y, 0.5),
    u_color,
    0.5
  );
  gl_FragColor = vec4(color, 1.0);
}
\`;

// Initialize
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

// Create quad
const positions = new Float32Array([
  -1, -1,  1, -1,  -1,  1,
  -1,  1,  1, -1,   1,  1
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const positionLoc = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

// Render loop
let startTime = Date.now();
function render() {
  const time = (Date.now() - startTime) / 1000.0;
  
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.useProgram(program);
  
  gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), canvas.width, canvas.height);
  gl.uniform1f(gl.getUniformLocation(program, 'u_time'), time);
  gl.uniform3f(gl.getUniformLocation(program, 'u_color'), 0.5, 0.5, 1.0);
  
  gl.clearColor(0.1, 0.1, 0.2, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  
  requestAnimationFrame(render);
}

render();`,
      explanation: 'This complete example demonstrates all the concepts together. The shader creates an animated gradient that mixes UV-based colors with a uniform color, creating a dynamic visual effect.',
      files: [
        {
          name: 'main.js (complete)',
          content: `import { createShader, createProgram } from './utils/shaderUtils.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

// ... (full code as shown above)`
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Code className="w-8 h-8 text-purple-600" />
        <h2 className="text-2xl font-bold text-purple-900">
          Complete Tutorial: Creating Shader Visualization with Vite + JavaScript
        </h2>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
        <p className="text-blue-900 font-semibold mb-2">📚 What You'll Learn:</p>
        <ul className="list-disc list-inside text-blue-800 space-y-1">
          <li>Setting up a Vite project for shader development</li>
          <li>Initializing WebGL context and rendering pipeline</li>
          <li>Writing vertex and fragment shaders</li>
          <li>Compiling and linking shader programs</li>
          <li>Creating geometry and rendering primitives</li>
          <li>Passing data to shaders via uniforms</li>
          <li>Creating animation loops</li>
          <li>Adding interactive controls</li>
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

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                  <p className="text-sm text-blue-900">
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
              <li>Experiment with different fragment shader code</li>
              <li>Add more uniforms for interactive controls</li>
              <li>Try loading textures and applying them to your shader</li>
              <li>Explore advanced techniques like noise functions and raymarching</li>
              <li>Check out the shader examples in this application for inspiration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

