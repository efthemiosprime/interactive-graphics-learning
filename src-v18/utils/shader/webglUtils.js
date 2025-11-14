/**
 * WebGL utility functions for shader compilation and texture creation
 */

/**
 * Creates a WebGL shader from source code
 * @param {WebGLRenderingContext} gl - WebGL context
 * @param {number} type - Shader type (gl.VERTEX_SHADER or gl.FRAGMENT_SHADER)
 * @param {string} source - Shader source code
 * @returns {WebGLShader|null} Compiled shader or null on error
 */
export const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

/**
 * Creates a WebGL program from vertex and fragment shaders
 * @param {WebGLRenderingContext} gl - WebGL context
 * @param {WebGLShader} vertexShader - Compiled vertex shader
 * @param {WebGLShader} fragmentShader - Compiled fragment shader
 * @returns {WebGLProgram|null} Linked program or null on error
 */
export const createProgram = (gl, vertexShader, fragmentShader) => {
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
};

/**
 * Creates a WebGL texture from an image
 * @param {WebGLRenderingContext} gl - WebGL context
 * @param {HTMLImageElement} image - Image element to create texture from
 * @returns {WebGLTexture} Created texture
 */
export const createTexture = (gl, image) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  
  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  
  // Upload image to texture
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  
  return texture;
};

/**
 * Initializes a shader program with vertex buffer setup
 * @param {WebGLRenderingContext} gl - WebGL context
 * @param {string} vertexShaderSource - Vertex shader source code
 * @param {string} fragmentShaderSource - Fragment shader source code
 * @returns {WebGLProgram|null} Initialized program or null on error
 */
export const initShaderProgram = (gl, vertexShaderSource, fragmentShaderSource) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  if (!vertexShader || !fragmentShader) return null;

  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) return null;

  // Setup vertex buffer
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  return program;
};

