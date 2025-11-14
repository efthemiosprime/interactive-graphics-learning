// WebGL visualization utilities for Transformation Visualization tutorial

// Cache for WebGL resources
const resourceCache = {
  programs: {},
  buffers: {},
  currentProgram: null
};

// Export function to get transformation matrix for display
export const getTransformationMatrix = (module, step, params = {}) => {
  const {
    scaleX = 1.0,
    scaleY = 1.0,
    translateX = 0,
    translateY = 0,
    rotationAngle = 0,
    reflectionAxis = 'x',
    combinedScale = 1.0,
    combinedRotation = 0,
    combinedTranslateX = 0,
    quaternionW = 1,
    quaternionX = 0,
    quaternionY = 0,
    quaternionZ = 0,
    projectionType = 'perspective',
    fov = Math.PI / 4,
    aspect = 1.0,
    near = 0.1,
    far = 100,
    orthoLeft = -5,
    orthoRight = 5,
    orthoBottom = -5,
    orthoTop = 5,
    orthoNear = -10,
    orthoFar = 10
  } = params;

  if (module === 'scaling') {
    return createScaleMatrix(scaleX, scaleY, 1.0);
  } else if (module === 'translation') {
    return createTranslationMatrix(translateX, translateY, 0);
  } else if (module === 'rotation') {
    const angle = (rotationAngle * Math.PI) / 180;
    return createRotationMatrixZ(angle);
  } else if (module === 'reflection') {
    if (reflectionAxis === 'x') {
      return createReflectionMatrixX();
    } else if (reflectionAxis === 'y') {
      return createReflectionMatrixY();
    } else if (reflectionAxis === 'origin') {
      return createReflectionMatrixOrigin();
    } else {
      // Diagonal reflection
      return createReflectionMatrixDiagonal();
    }
  } else if (module === 'quaternions') {
    const quaternion = { w: quaternionW, x: quaternionX, y: quaternionY, z: quaternionZ };
    return quaternionToMatrix(quaternion);
  } else if (module === 'projection') {
    if (projectionType === 'perspective') {
      return createPerspectiveMatrix(fov, aspect, near, far);
    } else {
      return createOrthographicMatrix(orthoLeft, orthoRight, orthoBottom, orthoTop, orthoNear, orthoFar);
    }
  } else if (module === 'combined') {
    const angle = (combinedRotation * Math.PI) / 180;
    const S = createScaleMatrix(combinedScale, combinedScale, 1.0);
    const R = createRotationMatrixZ(angle);
    const T = createTranslationMatrix(combinedTranslateX, 0, 0);
    return multiplyMatrices(T, multiplyMatrices(R, S));
  }
  
  // Default: identity matrix
  return createIdentityMatrix();
};

function getShapeVertices(shapeType) {
  switch (shapeType) {
    case 'triangle':
      return new Float32Array([
        0.0, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0
      ]);
    case 'circle':
      // Approximate circle with 32 vertices
      const vertices = [];
      const segments = 32;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        vertices.push(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, 0.0);
      }
      return new Float32Array(vertices);
    case 'arrow':
      return new Float32Array([
        0.0, 0.5, 0.0,
        -0.3, 0.0, 0.0,
        -0.1, 0.0, 0.0,
        -0.1, -0.5, 0.0,
        0.1, -0.5, 0.0,
        0.1, 0.0, 0.0,
        0.3, 0.0, 0.0
      ]);
    case 'square':
    default:
      return new Float32Array([
        -0.5, -0.5, 0.0,
         0.5, -0.5, 0.0,
         0.5,  0.5, 0.0,
        -0.5,  0.5, 0.0
      ]);
  }
}

function drawGridAndAxes(gl, width, height) {
  // Disable depth testing for grid so it's always visible
  const depthTestWasEnabled = gl.isEnabled(gl.DEPTH_TEST);
  gl.disable(gl.DEPTH_TEST);
  
  // Create a simple line shader program for grid/axes
  const lineProgramKey = 'grid_axes';
  let lineProgram = resourceCache.programs[lineProgramKey];
  
  if (!lineProgram) {
    const vsSource = `
      attribute vec4 aPosition;
      uniform mat4 uTransform;
      void main() {
        gl_Position = uTransform * aPosition;
      }
    `;
    const fsSource = `
      precision mediump float;
      uniform vec3 uColor;
      void main() {
        gl_FragColor = vec4(uColor, 1.0);
      }
    `;
    lineProgram = initShaderProgram(gl, vsSource, fsSource);
    if (lineProgram) {
      resourceCache.programs[lineProgramKey] = lineProgram;
    }
  }
  
  if (!lineProgram) {
    // Restore depth test state
    if (depthTestWasEnabled) gl.enable(gl.DEPTH_TEST);
    return;
  }
  
  gl.useProgram(lineProgram);
  
  // Create grid lines
  const gridLines = [];
  const gridSize = 10;
  const step = 2.0 / gridSize;
  
  // Vertical lines
  for (let i = -gridSize; i <= gridSize; i++) {
    const x = i * step;
    gridLines.push(x, -1.0, 0.0, x, 1.0, 0.0);
  }
  
  // Horizontal lines
  for (let i = -gridSize; i <= gridSize; i++) {
    const y = i * step;
    gridLines.push(-1.0, y, 0.0, 1.0, y, 0.0);
  }
  
  // Create axes (X and Y)
  const axes = [
    -1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // X-axis
    0.0, -1.0, 0.0, 0.0, 1.0, 0.0  // Y-axis
  ];
  
  // Draw grid lines
  const gridBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(gridLines), gl.STATIC_DRAW);
  
  const positionLocation = gl.getAttribLocation(lineProgram, 'aPosition');
  const colorLocation = gl.getUniformLocation(lineProgram, 'uColor');
  const transformLocation = gl.getUniformLocation(lineProgram, 'uTransform');
  
  if (positionLocation >= 0) {
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    
    // Set grid color (dark gray)
    if (colorLocation) {
      gl.uniform3f(colorLocation, 0.3, 0.3, 0.3);
    }
    
    // Set transform (identity with aspect correction)
    const canvasAspect = width / height;
    const aspectMatrix = createScaleMatrix(1.0 / canvasAspect, 1.0, 1.0);
    if (transformLocation) {
      const flatMatrix = flattenMatrix(aspectMatrix);
      gl.uniformMatrix4fv(transformLocation, false, flatMatrix);
    }
    
    // Draw grid lines - gridLines.length is number of floats, divide by 3 for vertices
    // Each line has 2 vertices, so vertex count is gridLines.length / 3
    gl.drawArrays(gl.LINES, 0, gridLines.length / 3);
  }
  
  // Draw axes
  const axesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, axesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(axes), gl.STATIC_DRAW);
  
  if (positionLocation >= 0) {
    gl.bindBuffer(gl.ARRAY_BUFFER, axesBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    
    // Set axes color (white)
    if (colorLocation) {
      gl.uniform3f(colorLocation, 1.0, 1.0, 1.0);
    }
    
    // Draw axes - axes.length is number of floats, divide by 3 for vertices
    gl.drawArrays(gl.LINES, 0, axes.length / 3);
  }
  
  // Clean up buffers
  gl.deleteBuffer(gridBuffer);
  gl.deleteBuffer(axesBuffer);
  
  // Restore depth test state
  if (depthTestWasEnabled) gl.enable(gl.DEPTH_TEST);
}

export const drawTransformationDemo = (gl, module, step, width, height, params = {}) => {
  const { showGrid = true, showOriginal = true, shapeType = 'square' } = params;
  
  // Clear canvas
  gl.clearColor(0.1, 0.1, 0.15, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  // Basic WebGL setup
  gl.enable(gl.DEPTH_TEST);
  gl.viewport(0, 0, width, height);
  
  // Draw grid and axes if enabled
  if (showGrid) {
    drawGridAndAxes(gl, width, height);
  }
  
  // Get or create shader program
  const programKey = `${module}_${step}`;
  let shaderProgram = resourceCache.programs[programKey];
  
  if (!shaderProgram) {
    const vsSource = getVertexShader(module, step);
    const fsSource = getFragmentShader(module, step);
    shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (shaderProgram) {
      resourceCache.programs[programKey] = shaderProgram;
    }
  }
  
  if (!shaderProgram) {
    console.error('Failed to create shader program');
    return;
  }
  
  // Get shape vertices based on shapeType
  const shapeVertices = getShapeVertices(shapeType);
  
  // Get or create vertex buffer for shape
  const bufferKey = `shape_${shapeType}`;
  let vertexBuffer = resourceCache.buffers[bufferKey];
  if (!vertexBuffer) {
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, shapeVertices, gl.STATIC_DRAW);
    resourceCache.buffers[bufferKey] = vertexBuffer;
  }
  
  // Use shader program
  gl.useProgram(shaderProgram);
  
  // Set up attributes - always bind buffer before setting up attributes
  const positionLocation = gl.getAttribLocation(shaderProgram, 'aPosition');
  if (positionLocation >= 0) {
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
  }
  
  // Get vertex count for the shape
  const getVertexCount = (shapeType) => {
    switch (shapeType) {
      case 'triangle':
        return 3;
      case 'circle':
        return 33; // 32 segments + 1 (closed)
      case 'arrow':
        return 7;
      case 'square':
      default:
        return 4;
    }
  };
  
  const vertexCount = getVertexCount(shapeType);
  const drawMode = gl.TRIANGLE_FAN; // All shapes use TRIANGLE_FAN
  
  // Draw original shape if enabled (with identity transform)
  if (showOriginal) {
    // Ensure buffer is bound
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    if (positionLocation >= 0) {
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    }
    
    const identityMatrix = createIdentityMatrix();
    const canvasAspect = width / height;
    const aspectMatrix = createScaleMatrix(1.0 / canvasAspect, 1.0, 1.0);
    // Push original shape back in z-space so it renders behind transformed shape
    const zOffsetMatrix = createTranslationMatrix(0, 0, -0.01);
    const viewMatrix = multiplyMatrices(aspectMatrix, multiplyMatrices(identityMatrix, zOffsetMatrix));
    
    const transformLocation = gl.getUniformLocation(shaderProgram, 'uTransform');
    const alphaLocation = gl.getUniformLocation(shaderProgram, 'uAlpha');
    const timeLocation = gl.getUniformLocation(shaderProgram, 'uTime');
    const stepLocation = gl.getUniformLocation(shaderProgram, 'uStep');
    
    if (transformLocation) {
      const flatMatrix = flattenMatrix(viewMatrix);
      gl.uniformMatrix4fv(transformLocation, false, flatMatrix);
    }
    
    // Set alpha for semi-transparent original shape (more transparent)
    if (alphaLocation) {
      gl.uniform1f(alphaLocation, 0.2);
    }
    
    // Set other uniforms
    if (timeLocation) {
      gl.uniform1f(timeLocation, Date.now() / 1000.0);
    }
    if (stepLocation) {
      gl.uniform1i(stepLocation, step);
    }
    
    // Draw with reduced opacity for original shape
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendEquation(gl.FUNC_ADD);
    
    // Draw original shape
    gl.drawArrays(drawMode, 0, vertexCount);
  }
  
  // Set uniforms based on module and step for transformed shape
  // First set other uniforms (time, step, etc.) without the transform matrix
  const timeLocation = gl.getUniformLocation(shaderProgram, 'uTime');
  const stepLocation = gl.getUniformLocation(shaderProgram, 'uStep');
  const showGridLocation = gl.getUniformLocation(shaderProgram, 'uShowGrid');
  const showOriginalLocation = gl.getUniformLocation(shaderProgram, 'uShowOriginal');
  
  if (timeLocation) {
    gl.uniform1f(timeLocation, Date.now() / 1000.0);
  }
  if (stepLocation) {
    gl.uniform1i(stepLocation, step);
  }
  if (showGridLocation !== null) {
    gl.uniform1i(showGridLocation, params.showGrid !== false ? 1 : 0);
  }
  if (showOriginalLocation !== null) {
    gl.uniform1i(showOriginalLocation, params.showOriginal !== false ? 1 : 0);
  }
  
  // Get the transformation matrix and apply z-forward offset
  const transformMatrix = getTransformationMatrix(module, step, params);
  const canvasAspect = width / height;
  const aspectMatrix = createScaleMatrix(1.0 / canvasAspect, 1.0, 1.0);
  // Push transformed shape forward in z-space (z=0.01) so it renders on top of original (z=-0.01)
  const zForwardMatrix = createTranslationMatrix(0, 0, 0.01);
  const finalMatrix = multiplyMatrices(aspectMatrix, multiplyMatrices(transformMatrix, zForwardMatrix));
  
  const transformLocationFinal = gl.getUniformLocation(shaderProgram, 'uTransform');
  if (transformLocationFinal) {
    const flatMatrix = flattenMatrix(finalMatrix);
    gl.uniformMatrix4fv(transformLocationFinal, false, flatMatrix);
  }
  
  // Ensure buffer is bound before drawing transformed shape
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  if (positionLocation >= 0) {
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
  }
  
  // Reset alpha to full opacity for transformed shape
  const alphaLocationFinal = gl.getUniformLocation(shaderProgram, 'uAlpha');
  if (alphaLocationFinal) {
    gl.uniform1f(alphaLocationFinal, 1.0);
  }
  
  // Keep blending enabled for transformed shape to render correctly
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  
  // Ensure depth testing is enabled and set depth function
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);
  
  // Draw transformed shape (at z=0.01, in front of original at z=-0.01)
  gl.drawArrays(drawMode, 0, vertexCount);
  
  gl.disable(gl.BLEND);
};

function createReflectionMatrixDiagonal() {
  // Reflection across line y = x
  return [
    [0, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

function getVertexShader(module, step) {
  // Basic vertex shader - can be customized per module/step
  return `
    attribute vec4 aPosition;
    uniform mat4 uTransform;
    
    void main() {
      gl_Position = uTransform * aPosition;
    }
  `;
}

function getFragmentShader(module, step) {
  // Color based on module
  const colors = {
    'matrix-operations': 'vec3(0.2, 0.6, 1.0)', // Blue
    'scaling': 'vec3(0.2, 1.0, 0.6)', // Green
    'translation': 'vec3(1.0, 0.6, 0.2)', // Orange
    'rotation': 'vec3(1.0, 0.2, 0.6)', // Pink
    'reflection': 'vec3(0.6, 0.2, 1.0)', // Purple
    'quaternions': 'vec3(0.2, 0.8, 0.8)', // Cyan
    'projection': 'vec3(0.8, 0.4, 0.2)', // Brown/Orange
    'combined': 'vec3(1.0, 1.0, 0.2)' // Yellow
  };
  
  const color = colors[module] || 'vec3(0.5, 0.5, 0.5)';
  
  return `
    precision mediump float;
    uniform float uTime;
    uniform int uStep;
    uniform int uShowGrid;
    uniform int uShowOriginal;
    uniform float uAlpha;
    
    void main() {
      vec3 baseColor = ${color};
      // Add some visual variation based on step
      float stepFactor = float(uStep) / 6.0;
      vec3 finalColor = baseColor * (0.7 + stepFactor * 0.3);
      float alpha = uAlpha > 0.0 ? uAlpha : 1.0;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;
}

function setUniforms(gl, program, module, step, width, height, params = {}) {
  // Set transformation matrix based on module and step
  const transformLocation = gl.getUniformLocation(program, 'uTransform');
  const timeLocation = gl.getUniformLocation(program, 'uTime');
  const stepLocation = gl.getUniformLocation(program, 'uStep');
  const showGridLocation = gl.getUniformLocation(program, 'uShowGrid');
  const showOriginalLocation = gl.getUniformLocation(program, 'uShowOriginal');
  
  // Use params if provided, otherwise use step-based defaults
  const {
    scaleX,
    scaleY,
    translateX,
    translateY,
    rotationAngle,
    reflectionAxis,
    combinedScale,
    combinedRotation,
    combinedTranslateX,
    quaternionW,
    quaternionX,
    quaternionY,
    quaternionZ,
    projectionType,
    fov,
    aspect,
    near,
    far,
    orthoLeft,
    orthoRight,
    orthoBottom,
    orthoTop,
    orthoNear,
    orthoFar,
    showGrid = true,
    showOriginal = true
  } = params;
  
  // Create transformation matrix based on module/step
  let transformMatrix = createIdentityMatrix();
  
  if (module === 'scaling') {
    if (scaleX !== undefined && scaleY !== undefined) {
      transformMatrix = createScaleMatrix(scaleX, scaleY, 1.0);
    } else {
      const scale = 0.5 + (step / 6.0) * 0.5; // Scale from 0.5 to 1.0
      transformMatrix = createScaleMatrix(scale, scale, 1.0);
    }
  } else if (module === 'translation') {
    if (translateX !== undefined && translateY !== undefined) {
      transformMatrix = createTranslationMatrix(translateX, translateY, 0);
    } else {
      const tx = (step / 6.0) * 0.3 - 0.15; // Translate from -0.15 to 0.15
      transformMatrix = createTranslationMatrix(tx, 0, 0);
    }
  } else if (module === 'rotation') {
    if (rotationAngle !== undefined) {
      const angle = (rotationAngle * Math.PI) / 180;
      transformMatrix = createRotationMatrixZ(angle);
    } else {
      const angle = (step / 6.0) * Math.PI * 2; // Rotate 0 to 2π
      transformMatrix = createRotationMatrixZ(angle);
    }
  } else if (module === 'reflection') {
    if (reflectionAxis) {
      if (reflectionAxis === 'x') {
        transformMatrix = createReflectionMatrixX();
      } else if (reflectionAxis === 'y') {
        transformMatrix = createReflectionMatrixY();
      } else if (reflectionAxis === 'origin') {
        transformMatrix = createReflectionMatrixOrigin();
      } else if (reflectionAxis === 'diagonal') {
        transformMatrix = createReflectionMatrixDiagonal();
      }
    } else {
      if (step <= 2) {
        transformMatrix = createReflectionMatrixX();
      } else if (step <= 4) {
        transformMatrix = createReflectionMatrixY();
      } else {
        transformMatrix = createReflectionMatrixOrigin();
      }
    }
  } else if (module === 'quaternions') {
    if (quaternionW !== undefined && quaternionX !== undefined && quaternionY !== undefined && quaternionZ !== undefined) {
      const quaternion = { w: quaternionW, x: quaternionX, y: quaternionY, z: quaternionZ };
      transformMatrix = quaternionToMatrix(quaternion);
    } else {
      // Default: rotate around Y-axis based on step
      const angle = (step / 6.0) * Math.PI * 2;
      const quaternion = eulerToQuaternion(0, angle, 0);
      transformMatrix = quaternionToMatrix(quaternion);
    }
  } else if (module === 'projection') {
    // For 2D visualization, we'll use a simplified projection
    // In a full 3D implementation, this would be perspective/orthographic
    if (projectionType === 'perspective' && fov !== undefined && aspect !== undefined && near !== undefined && far !== undefined) {
      transformMatrix = createPerspectiveMatrix(fov, aspect, near, far);
    } else if (projectionType === 'orthographic' && orthoLeft !== undefined) {
      transformMatrix = createOrthographicMatrix(orthoLeft, orthoRight, orthoBottom, orthoTop, orthoNear, orthoFar);
    } else {
      // Default: simple perspective-like transformation
      const scale = 0.5 + (step / 6.0) * 0.5;
      transformMatrix = createScaleMatrix(scale, scale, 1.0);
    }
  } else if (module === 'combined') {
    if (combinedScale !== undefined && combinedRotation !== undefined && combinedTranslateX !== undefined) {
      const angle = (combinedRotation * Math.PI) / 180;
      const S = createScaleMatrix(combinedScale, combinedScale, 1.0);
      const R = createRotationMatrixZ(angle);
      const T = createTranslationMatrix(combinedTranslateX, 0, 0);
      transformMatrix = multiplyMatrices(T, multiplyMatrices(R, S));
    } else {
      // Combine transformations
      const scale = 0.7;
      const angle = (step / 6.0) * Math.PI;
      const tx = (step / 6.0) * 0.2;
      const S = createScaleMatrix(scale, scale, 1.0);
      const R = createRotationMatrixZ(angle);
      const T = createTranslationMatrix(tx, 0, 0);
      transformMatrix = multiplyMatrices(T, multiplyMatrices(R, S));
    }
  }
  
  // Apply aspect ratio correction
  const canvasAspect = width / height;
  const aspectMatrix = createScaleMatrix(1.0 / canvasAspect, 1.0, 1.0);
  transformMatrix = multiplyMatrices(aspectMatrix, transformMatrix);
  
  if (transformLocation) {
    const flatMatrix = flattenMatrix(transformMatrix);
    gl.uniformMatrix4fv(transformLocation, false, flatMatrix);
  }
  
  if (timeLocation) {
    gl.uniform1f(timeLocation, Date.now() / 1000.0);
  }
  
  if (stepLocation) {
    gl.uniform1i(stepLocation, step);
  }
  
  if (showGridLocation !== null) {
    gl.uniform1i(showGridLocation, showGrid ? 1 : 0);
  }
  
  if (showOriginalLocation !== null) {
    gl.uniform1i(showOriginalLocation, showOriginal ? 1 : 0);
  }
}

// Matrix helper functions
function createIdentityMatrix() {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

function createScaleMatrix(sx, sy, sz) {
  return [
    [sx, 0, 0, 0],
    [0, sy, 0, 0],
    [0, 0, sz, 0],
    [0, 0, 0, 1]
  ];
}

function createTranslationMatrix(tx, ty, tz) {
  return [
    [1, 0, 0, tx],
    [0, 1, 0, ty],
    [0, 0, 1, tz],
    [0, 0, 0, 1]
  ];
}

function createRotationMatrixZ(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [c, -s, 0, 0],
    [s, c, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

function createReflectionMatrixX() {
  return [
    [1, 0, 0, 0],
    [0, -1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

function createReflectionMatrixY() {
  return [
    [-1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

function createReflectionMatrixOrigin() {
  return [
    [-1, 0, 0, 0],
    [0, -1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

// Quaternion helper functions
function eulerToQuaternion(rx, ry, rz) {
  const cx = Math.cos(rx / 2);
  const sx = Math.sin(rx / 2);
  const cy = Math.cos(ry / 2);
  const sy = Math.sin(ry / 2);
  const cz = Math.cos(rz / 2);
  const sz = Math.sin(rz / 2);
  
  return {
    w: cx * cy * cz + sx * sy * sz,
    x: sx * cy * cz - cx * sy * sz,
    y: cx * sy * cz + sx * cy * sz,
    z: cx * cy * sz - sx * sy * cz
  };
}

function quaternionToMatrix(q) {
  const { w, x, y, z } = q;
  
  return [
    [
      1 - 2*(y*y + z*z),
      2*(x*y - w*z),
      2*(x*z + w*y),
      0
    ],
    [
      2*(x*y + w*z),
      1 - 2*(x*x + z*z),
      2*(y*z - w*x),
      0
    ],
    [
      2*(x*z - w*y),
      2*(y*z + w*x),
      1 - 2*(x*x + y*y),
      0
    ],
    [0, 0, 0, 1]
  ];
}

// Projection helper functions
function createPerspectiveMatrix(fov, aspect, near, far) {
  const f = 1.0 / Math.tan(fov / 2);
  const rangeInv = 1.0 / (near - far);
  
  return [
    [f / aspect, 0, 0, 0],
    [0, f, 0, 0],
    [0, 0, (near + far) * rangeInv, 2 * near * far * rangeInv],
    [0, 0, -1, 0]
  ];
}

function createOrthographicMatrix(left, right, bottom, top, near, far) {
  return [
    [2/(right-left), 0, 0, -(right+left)/(right-left)],
    [0, 2/(top-bottom), 0, -(top+bottom)/(top-bottom)],
    [0, 0, -2/(far-near), -(far+near)/(far-near)],
    [0, 0, 0, 1]
  ];
}

function multiplyMatrices(a, b) {
  const result = [];
  for (let i = 0; i < 4; i++) {
    result[i] = [];
    for (let j = 0; j < 4; j++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function flattenMatrix(matrix) {
  const flat = new Float32Array(16);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      flat[j * 4 + i] = matrix[i][j]; // Column-major for WebGL
    }
  }
  return flat;
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  
  if (!vertexShader || !fragmentShader) {
    return null;
  }
  
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize shader program:', gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  
  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  
  return shader;
}

