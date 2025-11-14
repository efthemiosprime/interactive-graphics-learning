import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const ShaderReference = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('javascript');

  const sections = {
    javascript: {
      title: 'JavaScript → Shader',
      icon: '🔗',
      content: {
        description: 'Guide on how to pass variables and parameters from JavaScript/React to GLSL shaders using WebGL uniforms.',
        steps: [
          {
            title: '1. Declare Uniform in Shader',
            description: 'Define the uniform variable in your GLSL shader',
            code: `// In fragment shader (.glsl file)
uniform float u_time;
uniform vec3 u_color;
uniform vec2 u_resolution;
uniform sampler2D u_texture;`,
            explanation: 'Uniforms are declared with their type and name. The "u_" prefix is a common convention.'
          },
          {
            title: '2. Get Uniform Location',
            description: 'Get the location of the uniform in your JavaScript code',
            code: `// After creating shader program
const program = initShaderProgram(gl, vertexShader, fragmentShader);

// Get uniform locations
const timeLocation = gl.getUniformLocation(program, 'u_time');
const colorLocation = gl.getUniformLocation(program, 'u_color');
const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
const textureLocation = gl.getUniformLocation(program, 'u_texture');`,
            explanation: 'Uniform locations are retrieved after linking the shader program. Returns null if uniform is not found.'
          },
          {
            title: '3. Set Uniform Values',
            description: 'Set uniform values before drawing',
            code: `// Set float uniform
gl.uniform1f(timeLocation, 0.5);

// Set vec2 uniform (2 floats)
gl.uniform2f(resolutionLocation, 800.0, 600.0);

// Set vec3 uniform (3 floats)
gl.uniform3f(colorLocation, 1.0, 0.5, 0.0);

// Set vec4 uniform (4 floats)
gl.uniform4f(vec4Location, 1.0, 0.5, 0.0, 1.0);

// Set int uniform
gl.uniform1i(textureLocation, 0);  // Texture unit 0

// Set boolean (as int)
gl.uniform1i(useTextureLocation, 1);  // true = 1, false = 0`,
            explanation: 'Use gl.uniform1f/2f/3f/4f for floats, gl.uniform1i for integers. Call before gl.drawArrays() or gl.drawElements().'
          },
          {
            title: '4. Update Uniforms Dynamically',
            description: 'Update uniforms in render loop or when state changes',
            code: `// In React component with useRef for latest values
const timeRef = useRef(0);
const colorRef = useRef({ r: 1.0, g: 0.5, b: 0.0 });

// Update refs when state changes
useEffect(() => {
  timeRef.current = time;
}, [time]);

useEffect(() => {
  colorRef.current = color;
}, [color]);

// In render function (called every frame)
const render = () => {
  // Set uniforms using refs (always has latest values)
  gl.uniform1f(timeLocation, timeRef.current);
  gl.uniform3f(colorLocation, colorRef.current.r, colorRef.current.g, colorRef.current.b);
  
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(render);
};`,
            explanation: 'Use useRef to store latest values for render loop. Update uniforms before each draw call.'
          },
          {
            title: '5. Handle Texture Uniforms',
            description: 'Setting up texture uniforms requires binding textures',
            code: `// Create texture from image
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

// Set texture parameters
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

// Before drawing: bind texture and set uniform
gl.activeTexture(gl.TEXTURE0);  // Activate texture unit 0
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.uniform1i(textureLocation, 0);  // Tell shader to use texture unit 0`,
            explanation: 'Textures must be created, bound to texture units, and the uniform set to the texture unit number.'
          },
          {
            title: '6. React State to Shader Pattern',
            description: 'Complete pattern for React state → WebGL uniforms',
            code: `// 1. State in React component
const [color, setColor] = useState({ r: 1.0, g: 0.5, b: 0.0 });
const [time, setTime] = useState(0);

// 2. Refs for render loop
const colorRef = useRef(color);
const timeRef = useRef(time);

// 3. Update refs when state changes
useEffect(() => {
  colorRef.current = color;
}, [color]);

useEffect(() => {
  timeRef.current = time;
}, [time]);

// 4. Get uniform locations (once, after program creation)
const colorLocation = gl.getUniformLocation(program, 'u_color');
const timeLocation = gl.getUniformLocation(program, 'u_time');

// 5. Set uniforms in render function
const render = () => {
  if (colorLocation) {
    gl.uniform3f(colorLocation, colorRef.current.r, colorRef.current.g, colorRef.current.b);
  }
  if (timeLocation) {
    gl.uniform1f(timeLocation, timeRef.current);
  }
  
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(render);
};`,
            explanation: 'Complete pattern: State → Refs → Uniforms → Draw. Refs ensure render loop always has latest values.'
          }
        ],
        uniformTypes: [
          {
            name: 'gl.uniform1f(location, x)',
            description: 'Set single float uniform',
            example: 'gl.uniform1f(timeLocation, 0.5);'
          },
          {
            name: 'gl.uniform2f(location, x, y)',
            description: 'Set vec2 uniform (2 floats)',
            example: 'gl.uniform2f(resolutionLocation, 800.0, 600.0);'
          },
          {
            name: 'gl.uniform3f(location, x, y, z)',
            description: 'Set vec3 uniform (3 floats)',
            example: 'gl.uniform3f(colorLocation, 1.0, 0.5, 0.0);'
          },
          {
            name: 'gl.uniform4f(location, x, y, z, w)',
            description: 'Set vec4 uniform (4 floats)',
            example: 'gl.uniform4f(rgbaLocation, 1.0, 0.5, 0.0, 1.0);'
          },
          {
            name: 'gl.uniform1i(location, x)',
            description: 'Set single int uniform',
            example: 'gl.uniform1i(textureLocation, 0);'
          },
          {
            name: 'gl.uniform2i(location, x, y)',
            description: 'Set ivec2 uniform (2 ints)',
            example: 'gl.uniform2i(gridLocation, 10, 10);'
          },
          {
            name: 'gl.uniformMatrix2fv(location, transpose, value)',
            description: 'Set mat2 uniform (2×2 matrix)',
            example: 'gl.uniformMatrix2fv(matrixLocation, false, [1,0,0,1]);'
          },
          {
            name: 'gl.uniformMatrix3fv(location, transpose, value)',
            description: 'Set mat3 uniform (3×3 matrix)',
            example: 'gl.uniformMatrix3fv(matrixLocation, false, matrixArray);'
          },
          {
            name: 'gl.uniformMatrix4fv(location, transpose, value)',
            description: 'Set mat4 uniform (4×4 matrix)',
            example: 'gl.uniformMatrix4fv(matrixLocation, false, matrixArray);'
          }
        ],
        bestPractices: [
          'Always check if uniform location is not null before setting',
          'Use useRef for values accessed in render loop (avoids stale closures)',
          'Update uniforms before each draw call, not just when state changes',
          'Cache uniform locations (get once, reuse many times)',
          'Use descriptive uniform names with prefixes (u_ for uniforms, a_ for attributes)',
          'Set texture uniforms to texture unit numbers (0, 1, 2, etc.)',
          'For boolean uniforms, use int (0 = false, 1 = true)',
          'Update refs in useEffect when state changes, not directly in render'
        ]
      }
    },
    fragment: {
      title: 'Fragment Shader',
      icon: '🎨',
      content: {
        description: 'Fragment shaders run once per pixel (fragment) and determine the final color output. They process rasterized fragments and output RGBA color values.',
        structure: `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}`,
        keyPoints: [
          'Runs once per pixel/fragment',
          'Outputs color via gl_FragColor',
          'Can sample textures, perform calculations',
          'Has access to gl_FragCoord (pixel coordinates)',
          'Must set precision (lowp, mediump, highp)'
        ]
      }
    },
    vertex: {
      title: 'Vertex Shader',
      icon: '📐',
      content: {
        description: 'Vertex shaders run once per vertex and transform vertex positions from model space to clip space. They can also pass data to fragment shaders via varyings.',
        structure: `#version 100
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,
        keyPoints: [
          'Runs once per vertex',
          'Outputs position via gl_Position',
          'Receives attributes (per-vertex data)',
          'Can pass data to fragment shader via varyings',
          'Transforms vertices from model to clip space'
        ]
      }
    },
    syntax: {
      title: 'GLSL Syntax & Types',
      icon: '📝',
      content: {
        description: 'GLSL (OpenGL Shading Language) syntax and data types used in WebGL shaders.',
        types: [
          {
            name: 'float',
            description: '32-bit floating point number',
            example: 'float value = 1.5;'
          },
          {
            name: 'int',
            description: '32-bit signed integer',
            example: 'int count = 10;'
          },
          {
            name: 'bool',
            description: 'Boolean value (true/false)',
            example: 'bool isActive = true;'
          },
          {
            name: 'vec2',
            description: '2-component vector (x, y)',
            example: 'vec2 position = vec2(0.5, 0.5);'
          },
          {
            name: 'vec3',
            description: '3-component vector (x, y, z) or (r, g, b)',
            example: 'vec3 color = vec3(1.0, 0.5, 0.0);'
          },
          {
            name: 'vec4',
            description: '4-component vector (x, y, z, w) or (r, g, b, a)',
            example: 'vec4 rgba = vec4(1.0, 0.5, 0.0, 1.0);'
          },
          {
            name: 'mat2',
            description: '2×2 matrix',
            example: 'mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));'
          },
          {
            name: 'sampler2D',
            description: '2D texture sampler',
            example: 'uniform sampler2D u_texture;'
          }
        ],
        qualifiers: [
          {
            name: 'uniform',
            description: 'Constant value passed from CPU, same for all fragments/vertices',
            example: 'uniform float u_time;'
          },
          {
            name: 'attribute',
            description: 'Per-vertex data (vertex shader only)',
            example: 'attribute vec2 a_position;'
          },
          {
            name: 'varying',
            description: 'Data passed from vertex to fragment shader',
            example: 'varying vec2 v_uv;'
          },
          {
            name: 'precision',
            description: 'Sets precision for float operations (lowp, mediump, highp)',
            example: 'precision mediump float;'
          }
        ]
      }
    },
    builtins: {
      title: 'Common Built-in Functions',
      icon: '⚙️',
      content: {
        description: 'Frequently used built-in GLSL functions for shader programming.',
        functions: [
          {
            name: 'mix(a, b, t)',
            description: 'Linear interpolation between two values',
            formula: 'mix(a, b, t) = a * (1 - t) + b * t',
            example: 'color = mix(color1, color2, 0.5);  // Blend 50/50',
            usage: 'Color blending, smooth transitions, gradients'
          },
          {
            name: 'smoothstep(edge0, edge1, x)',
            description: 'Smooth Hermite interpolation with anti-aliasing',
            formula: 'Smooth S-curve from 0 to 1 between edge0 and edge1',
            example: 'edge = smoothstep(0.3, 0.7, dist);  // Smooth edge',
            usage: 'Anti-aliasing, smooth thresholds, soft edges'
          },
          {
            name: 'step(edge, x)',
            description: 'Step function: returns 0.0 if x < edge, else 1.0',
            formula: 'step(edge, x) = x < edge ? 0.0 : 1.0',
            example: 'mask = step(0.5, uv.x);  // Binary mask',
            usage: 'Binary masks, hard thresholds'
          },
          {
            name: 'clamp(x, min, max)',
            description: 'Clamp value to range [min, max]',
            formula: 'clamp(x, min, max) = max(min, min(max, x))',
            example: 'value = clamp(value, 0.0, 1.0);  // Keep in range',
            usage: 'Range limiting, preventing overflow'
          },
          {
            name: 'length(v)',
            description: 'Calculate vector length (magnitude)',
            formula: 'length(v) = sqrt(v.x² + v.y² + ...)',
            example: 'dist = length(uv - center);  // Distance',
            usage: 'Distance calculations, normalization'
          },
          {
            name: 'normalize(v)',
            description: 'Convert vector to unit length (normalize)',
            formula: 'normalize(v) = v / length(v)',
            example: 'dir = normalize(direction);  // Unit vector',
            usage: 'Direction vectors, normal vectors'
          },
          {
            name: 'dot(a, b)',
            description: 'Dot product of two vectors',
            formula: 'dot(a, b) = a.x*b.x + a.y*b.y + a.z*b.z',
            example: 'intensity = dot(normal, lightDir);  // Lighting',
            usage: 'Lighting calculations, projections, angles'
          },
          {
            name: 'cross(a, b)',
            description: 'Cross product of two 3D vectors',
            formula: 'cross(a, b) = perpendicular vector',
            example: 'normal = cross(edge1, edge2);  // Surface normal',
            usage: 'Surface normals, perpendicular vectors'
          },
          {
            name: 'fract(x)',
            description: 'Fractional part of x (x - floor(x))',
            formula: 'fract(x) = x - floor(x)',
            example: 'fraction = fract(uv * 5.0);  // Repeating pattern',
            usage: 'Repeating patterns, tiling'
          },
          {
            name: 'floor(x)',
            description: 'Round down to nearest integer',
            formula: 'floor(x) = ⌊x⌋',
            example: 'cell = floor(uv * 10.0);  // Grid cell',
            usage: 'Discretization, grid patterns'
          },
          {
            name: 'ceil(x)',
            description: 'Round up to nearest integer',
            formula: 'ceil(x) = ⌈x⌉',
            example: 'level = ceil(value);  // Round up',
            usage: 'Quantization, discrete levels'
          },
          {
            name: 'abs(x)',
            description: 'Absolute value',
            formula: 'abs(x) = |x|',
            example: 'distance = abs(position);  // Always positive',
            usage: 'Symmetric operations, distance'
          },
          {
            name: 'min(a, b)',
            description: 'Returns smaller of two values',
            formula: 'min(a, b) = a < b ? a : b',
            example: 'closest = min(dist1, dist2);  // Minimum',
            usage: 'Comparisons, distance fields'
          },
          {
            name: 'max(a, b)',
            description: 'Returns larger of two values',
            formula: 'max(a, b) = a > b ? a : b',
            example: 'furthest = max(dist1, dist2);  // Maximum',
            usage: 'Comparisons, distance fields'
          },
          {
            name: 'pow(x, y)',
            description: 'Raise x to power y',
            formula: 'pow(x, y) = x^y',
            example: 'curve = pow(value, 2.0);  // Square',
            usage: 'Exponential curves, falloff'
          },
          {
            name: 'sqrt(x)',
            description: 'Square root',
            formula: 'sqrt(x) = √x',
            example: 'distance = sqrt(x*x + y*y);  // Distance',
            usage: 'Distance calculations, normalization'
          },
          {
            name: 'sin(x), cos(x), tan(x)',
            description: 'Trigonometric functions (radians)',
            formula: 'sin(angle), cos(angle), tan(angle)',
            example: 'wave = sin(time * 2.0);  // Oscillation',
            usage: 'Oscillations, rotations, waves'
          },
          {
            name: 'atan2(y, x)',
            description: 'Arctangent returning angle in [-π, π]',
            formula: 'angle = atan2(y, x)',
            example: 'angle = atan2(uv.y, uv.x);  // Polar angle',
            usage: 'Polar coordinates, angles'
          },
          {
            name: 'texture2D(sampler, uv)',
            description: 'Sample 2D texture at UV coordinates',
            formula: 'color = texture2D(u_texture, uv)',
            example: 'color = texture2D(u_texture, uv).rgb;  // Sample texture',
            usage: 'Texture sampling, image loading'
          },
          {
            name: 'mod(x, y)',
            description: 'Modulo operation (remainder)',
            formula: 'mod(x, y) = x - y * floor(x/y)',
            example: 'pattern = mod(uv * 5.0, 1.0);  // Repeating',
            usage: 'Repeating patterns, wrapping values'
          }
        ]
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg hover:from-purple-700 hover:to-purple-800 transition-all"
      >
        <div className="flex items-center gap-3">
          <BookOpen size={24} />
          <h2 className="text-xl font-bold">GLSL Shader Reference</h2>
        </div>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

      {isOpen && (
        <div className="p-6">
          {/* Section Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b-2 border-purple-200 pb-4">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeSection === key
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeSection === 'fragment' && (
              <div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  {sections.fragment.icon} Fragment Shader
                </h3>
                <p className="text-gray-700 mb-4 text-lg">
                  {sections.fragment.content.description}
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Key Points:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {sections.fragment.content.keyPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2">Basic Structure:</h4>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{sections.fragment.content.structure}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeSection === 'vertex' && (
              <div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  {sections.vertex.icon} Vertex Shader
                </h3>
                <p className="text-gray-700 mb-4 text-lg">
                  {sections.vertex.content.description}
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Key Points:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {sections.vertex.content.keyPoints.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-800 mb-2">Basic Structure:</h4>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{sections.vertex.content.structure}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeSection === 'syntax' && (
              <div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  {sections.syntax.icon} GLSL Syntax & Types
                </h3>
                <p className="text-gray-700 mb-6 text-lg">
                  {sections.syntax.content.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-purple-800 mb-3 text-xl">Data Types:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections.syntax.content.types.map((type, idx) => (
                      <div key={idx} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h5 className="font-bold text-purple-900 mb-1">{type.name}</h5>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <code className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded block">
                          {type.example}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-800 mb-3 text-xl">Variable Qualifiers:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections.syntax.content.qualifiers.map((qual, idx) => (
                      <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="font-bold text-blue-900 mb-1">{qual.name}</h5>
                        <p className="text-sm text-gray-600 mb-2">{qual.description}</p>
                        <code className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded block">
                          {qual.example}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'javascript' && (
              <div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  {sections.javascript.icon} JavaScript → Shader Guide
                </h3>
                <p className="text-gray-700 mb-6 text-lg">
                  {sections.javascript.content.description}
                </p>
                
                {/* Step-by-Step Guide */}
                <div className="mb-8">
                  <h4 className="font-semibold text-purple-800 mb-4 text-xl">Step-by-Step Guide:</h4>
                  <div className="space-y-6">
                    {sections.javascript.content.steps.map((step, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-lg border-l-4 border-green-500">
                        <h5 className="font-bold text-green-900 text-lg mb-2">{step.title}</h5>
                        <p className="text-gray-700 mb-3">{step.description}</p>
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-2">
                          <code>{step.code}</code>
                        </pre>
                        <p className="text-sm text-gray-600 italic bg-white p-2 rounded">
                          <span className="font-semibold">Note:</span> {step.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Uniform Type Reference */}
                <div className="mb-8">
                  <h4 className="font-semibold text-purple-800 mb-4 text-xl">Uniform Type Functions:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections.javascript.content.uniformTypes.map((type, idx) => (
                      <div key={idx} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h5 className="font-bold text-purple-900 mb-2">
                          <code className="bg-purple-100 px-2 py-1 rounded text-sm">{type.name}</code>
                        </h5>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <code className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded block">
                          {type.example}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Practices */}
                <div>
                  <h4 className="font-semibold text-purple-800 mb-4 text-xl">Best Practices:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    {sections.javascript.content.bestPractices.map((practice, idx) => (
                      <li key={idx} className="text-sm">{practice}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'builtins' && (
              <div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  {sections.builtins.icon} Common Built-in Functions
                </h3>
                <p className="text-gray-700 mb-6 text-lg">
                  {sections.builtins.content.description}
                </p>
                
                <div className="space-y-4">
                  {sections.builtins.content.functions.map((func, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-lg border-l-4 border-purple-500">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-purple-900 text-lg">
                          <code className="bg-purple-100 px-2 py-1 rounded">{func.name}</code>
                        </h4>
                      </div>
                      <p className="text-gray-700 mb-2">{func.description}</p>
                      <div className="bg-gray-800 text-green-400 p-3 rounded mb-2 text-sm font-mono">
                        <div className="font-semibold text-yellow-300 mb-1">Formula:</div>
                        {func.formula}
                      </div>
                      <div className="bg-gray-100 p-3 rounded mb-2 text-sm">
                        <div className="font-semibold text-purple-800 mb-1">Example:</div>
                        <code className="text-gray-800">{func.example}</code>
                      </div>
                      <div className="text-sm text-gray-600 italic">
                        <span className="font-semibold">Usage:</span> {func.usage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShaderReference;

