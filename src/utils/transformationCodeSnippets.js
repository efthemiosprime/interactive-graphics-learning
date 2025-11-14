// Code snippets for Transformation Visualization tutorial

export const getTransformationCodeSnippet = (module, step) => {
  const snippets = {
    'matrix-operations': {
      1: `// Step 1: Create a Matrix in JavaScript
// 2×2 Matrix
const matrix2x2 = [
  [1, 0],
  [0, 1]
];

// 3×3 Matrix
const matrix3x3 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
];

// 4×4 Matrix (for 3D transformations)
const matrix4x4 = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
];

// Accessing elements
const element = matrix2x2[0][1]; // Gets element at row 0, column 1`,
      2: `// Step 2: Matrix Addition
function matrixAdd(A, B) {
  const rows = A.length;
  const cols = A[0].length;
  const result = [];
  
  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      result[i][j] = A[i][j] + B[i][j];
    }
  }
  
  return result;
}

// Example usage
const A = [[1, 2], [3, 4]];
const B = [[5, 6], [7, 8]];
const C = matrixAdd(A, B); // [[6, 8], [10, 12]]`,
      3: `// Step 3: Matrix Subtraction
function matrixSubtract(A, B) {
  const rows = A.length;
  const cols = A[0].length;
  const result = [];
  
  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      result[i][j] = A[i][j] - B[i][j];
    }
  }
  
  return result;
}

// Example usage
const A = [[5, 6], [7, 8]];
const B = [[1, 2], [3, 4]];
const C = matrixSubtract(A, B); // [[4, 4], [4, 4]]`,
      4: `// Step 4: Scalar Multiplication
function matrixScalarMultiply(matrix, scalar) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];
  
  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      result[i][j] = matrix[i][j] * scalar;
    }
  }
  
  return result;
}

// Example usage
const A = [[1, 2], [3, 4]];
const scaled = matrixScalarMultiply(A, 2); // [[2, 4], [6, 8]]`,
      5: `// Step 5: Matrix Multiplication
function matrixMultiply(A, B) {
  const rowsA = A.length;
  const colsA = A[0].length;
  const colsB = B[0].length;
  const result = [];
  
  for (let i = 0; i < rowsA; i++) {
    result[i] = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += A[i][k] * B[k][j];
      }
      result[i][j] = sum;
    }
  }
  
  return result;
}

// Example usage
const A = [[1, 2], [3, 4]];
const B = [[5, 6], [7, 8]];
const C = matrixMultiply(A, B); // [[19, 22], [43, 50]]`,
      6: `// Step 6: WebGL Matrix Operations
// Vertex Shader (GLSL):
attribute vec4 aPosition;
uniform mat4 uMatrixA;
uniform mat4 uMatrixB;

void main() {
  // Matrix multiplication in GLSL
  mat4 result = uMatrixA * uMatrixB;
  
  // Scalar multiplication
  mat4 scaled = result * 2.0;
  
  // Apply transformation
  gl_Position = scaled * aPosition;
}

// Fragment Shader:
precision mediump float;
void main() {
  gl_FragColor = vec4(0.2, 0.6, 1.0, 1.0);
}

// JavaScript Setup:
function initWebGL(canvas) {
  const gl = canvas.getContext('webgl');
  if (!gl) {
    console.error('WebGL not supported');
    return null;
  }
  
  // Create shader program
  const shaderProgram = createShaderProgram(gl, vsSource, fsSource);
  
  // Create matrices
  const matrixA = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
  
  const matrixB = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 1
  ];
  
  // Upload to GPU
  const uMatrixALocation = gl.getUniformLocation(shaderProgram, 'uMatrixA');
  const uMatrixBLocation = gl.getUniformLocation(shaderProgram, 'uMatrixB');
  
  gl.uniformMatrix4fv(uMatrixALocation, false, matrixA);
  gl.uniformMatrix4fv(uMatrixBLocation, false, matrixB);
  
  return gl;
}

// Helper: Flatten matrix for WebGL (column-major order)
function flattenMatrix(matrix) {
  const flat = new Float32Array(16);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      flat[j * 4 + i] = matrix[i][j]; // Column-major
    }
  }
  return flat;
}`
    },
    'scaling': {
      1: `// Step 1: Create Scaling Matrices
// 2D Scaling Matrix
function createScale2D(sx, sy) {
  return [
    [sx, 0],
    [0, sy]
  ];
}

// 3D Scaling Matrix (Homogeneous Coordinates)
function createScale3D(sx, sy, sz) {
  return [
    [sx, 0, 0, 0],
    [0, sy, 0, 0],
    [0, 0, sz, 0],
    [0, 0, 0, 1]
  ];
}

// Example: Uniform scaling (double size)
const uniformScale = createScale3D(2, 2, 2);

// Example: Non-uniform scaling (stretch x-axis)
const stretchX = createScale3D(2, 1, 1);

// Example: Scale down (half size)
const shrink = createScale3D(0.5, 0.5, 0.5);`,
      2: `// Step 2: Apply Scaling to Points
function applyScale2D(point, scaleMatrix) {
  // point is [x, y]
  const [x, y] = point;
  const [sx, sy] = [scaleMatrix[0][0], scaleMatrix[1][1]];
  
  return [
    sx * x,
    sy * y
  ];
}

function applyScale3D(point, scaleMatrix) {
  // point is [x, y, z]
  const [x, y, z] = point;
  const [sx, sy, sz] = [
    scaleMatrix[0][0],
    scaleMatrix[1][1],
    scaleMatrix[2][2]
  ];
  
  return [
    sx * x,
    sy * y,
    sz * z
  ];
}

// Using matrix multiplication (more general)
function applyScaleMatrix(point, scaleMatrix) {
  // Convert to homogeneous coordinates
  const homogeneous = [...point, 1];
  
  // Multiply by scale matrix
  const result = matrixMultiply(scaleMatrix, homogeneous);
  
  // Extract 3D coordinates
  return [result[0], result[1], result[2]];
}

// Example usage
const point = [3, 4, 5];
const scale = createScale3D(2, 2, 2);
const scaled = applyScaleMatrix(point, scale);
// Result: [6, 8, 10]`,
      3: `// Step 3: Scale All Vertices of an Object
function scaleObject(vertices, sx, sy, sz) {
  const scaleMatrix = createScale3D(sx, sy, sz);
  const scaledVertices = [];
  
  for (let vertex of vertices) {
    // Convert to homogeneous coordinates
    const homogeneous = [...vertex, 1];
    
    // Apply scaling
    const transformed = matrixMultiply(scaleMatrix, homogeneous);
    
    // Extract 3D coordinates
    scaledVertices.push([
      transformed[0],
      transformed[1],
      transformed[2]
    ]);
  }
  
  return scaledVertices;
}

// Example: Cube vertices
const cubeVertices = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], // Front face
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]      // Back face
];

// Scale cube to double size
const scaledCube = scaleObject(cubeVertices, 2, 2, 2);`,
      4: `// Step 4: Uniform vs Non-Uniform Scaling
// Uniform Scaling - preserves shape
function uniformScale(point, factor) {
  return createScale3D(factor, factor, factor);
}

// Non-Uniform Scaling - changes shape
function nonUniformScale(point, sx, sy, sz) {
  return createScale3D(sx, sy, sz);
}

// Example: Stretch a sphere into an ellipsoid
function stretchSphere(sphereVertices, stretchX, stretchY, stretchZ) {
  const scaleMatrix = createScale3D(stretchX, stretchY, stretchZ);
  return scaleObject(sphereVertices, stretchX, stretchY, stretchZ);
}

// Check if scaling is uniform
function isUniformScale(scaleMatrix) {
  const sx = scaleMatrix[0][0];
  const sy = scaleMatrix[1][1];
  const sz = scaleMatrix[2][2];
  return sx === sy && sy === sz;
}`,
      5: `// Step 5: Scaling Around a Pivot Point
function scaleAroundPivot(vertices, pivot, sx, sy, sz) {
  // Step 1: Translate to origin (move pivot to origin)
  const T1 = createTranslate3D(-pivot[0], -pivot[1], -pivot[2]);
  
  // Step 2: Scale
  const S = createScale3D(sx, sy, sz);
  
  // Step 3: Translate back
  const T2 = createTranslate3D(pivot[0], pivot[1], pivot[2]);
  
  // Combine: T2 × S × T1
  const combined = matrixMultiply(T2, matrixMultiply(S, T1));
  
  // Apply to all vertices
  const scaledVertices = [];
  for (let vertex of vertices) {
    const homogeneous = [...vertex, 1];
    const transformed = matrixMultiply(combined, homogeneous);
    scaledVertices.push([transformed[0], transformed[1], transformed[2]]);
  }
  
  return scaledVertices;
}

// Example: Scale object around its center
function getCenter(vertices) {
  let sumX = 0, sumY = 0, sumZ = 0;
  for (let v of vertices) {
    sumX += v[0];
    sumY += v[1];
    sumZ += v[2];
  }
  const count = vertices.length;
  return [sumX / count, sumY / count, sumZ / count];
}

const center = getCenter(cubeVertices);
const scaledAroundCenter = scaleAroundPivot(cubeVertices, center, 2, 2, 2);`,
      6: `// Step 6: WebGL Scaling Implementation
// Vertex Shader:
attribute vec4 aPosition;
uniform mat4 uScaleMatrix;
uniform mat4 uModelViewProjection;

void main() {
  // Apply scaling, then model-view-projection
  vec4 scaledPosition = uScaleMatrix * aPosition;
  gl_Position = uModelViewProjection * scaledPosition;
}

// JavaScript:
function setupScaling(gl, shaderProgram, sx, sy, sz) {
  // Create scaling matrix
  const scaleMatrix = createScale3D(sx, sy, sz);
  
  // Flatten for WebGL (column-major)
  const flatMatrix = flattenMatrix(scaleMatrix);
  
  // Get uniform location
  const uScaleLocation = gl.getUniformLocation(shaderProgram, 'uScaleMatrix');
  
  // Upload to GPU
  gl.uniformMatrix4fv(uScaleLocation, false, flatMatrix);
}

// Animated scaling
let scaleFactor = 1.0;
function animateScale(gl, shaderProgram) {
  scaleFactor += 0.01;
  const scale = 1.0 + Math.sin(scaleFactor) * 0.5; // Pulse between 0.5 and 1.5
  setupScaling(gl, shaderProgram, scale, scale, scale);
  requestAnimationFrame(() => animateScale(gl, shaderProgram));
}`
    },
    'translation': {
      1: `// Step 1: Understanding Translation
// Translation moves points by adding offsets
function translatePoint(point, tx, ty, tz) {
  return [
    point[0] + tx,
    point[1] + ty,
    point[2] + tz
  ];
}

// Example
const point = [2, 4, 1];
const translated = translatePoint(point, 5, 3, 0);
// Result: [7, 7, 1]`,
      2: `// Step 2: Create 2D Translation Matrix
function createTranslate2D(tx, ty) {
  return [
    [1, 0, tx],
    [0, 1, ty],
    [0, 0, 1]
  ];
}

// Apply translation using matrix multiplication
function translate2D(point, tx, ty) {
  const translateMatrix = createTranslate2D(tx, ty);
  const homogeneous = [...point, 1]; // [x, y, 1]
  
  const result = matrixMultiply(translateMatrix, homogeneous);
  return [result[0], result[1]]; // Extract 2D coordinates
}

// Example
const point2D = [3, 4];
const translated2D = translate2D(point2D, 5, 3);
// Result: [8, 7]`,
      3: `// Step 3: Create 3D Translation Matrix
function createTranslate3D(tx, ty, tz) {
  return [
    [1, 0, 0, tx],
    [0, 1, 0, ty],
    [0, 0, 1, tz],
    [0, 0, 0, 1]
  ];
}

// Apply 3D translation
function translate3D(point, tx, ty, tz) {
  const translateMatrix = createTranslate3D(tx, ty, tz);
  const homogeneous = [...point, 1]; // [x, y, z, 1]
  
  const result = matrixMultiply(translateMatrix, homogeneous);
  return [result[0], result[1], result[2]]; // Extract 3D coordinates
}

// Example
const point3D = [2, 4, 1];
const translated3D = translate3D(point3D, 5, 3, 2);
// Result: [7, 7, 3]`,
      4: `// Step 4: Translate All Vertices
function translateObject(vertices, tx, ty, tz) {
  const translateMatrix = createTranslate3D(tx, ty, tz);
  const translatedVertices = [];
  
  for (let vertex of vertices) {
    const homogeneous = [...vertex, 1];
    const transformed = matrixMultiply(translateMatrix, homogeneous);
    translatedVertices.push([
      transformed[0],
      transformed[1],
      transformed[2]
    ]);
  }
  
  return translatedVertices;
}

// Example: Move entire object
const objectVertices = [
  [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]
];
const movedObject = translateObject(objectVertices, 5, 3, 0);`,
      5: `// Step 5: Inverse Translation
function createTranslate3DInverse(tx, ty, tz) {
  // Inverse translation: negate translation components
  return createTranslate3D(-tx, -ty, -tz);
}

// Undo translation
function undoTranslation(translatedPoint, tx, ty, tz) {
  const inverseMatrix = createTranslate3DInverse(tx, ty, tz);
  const homogeneous = [...translatedPoint, 1];
  
  const result = matrixMultiply(inverseMatrix, homogeneous);
  return [result[0], result[1], result[2]];
}

// Example
const original = [2, 4, 1];
const translated = translate3D(original, 5, 3, 0); // [7, 7, 1]
const restored = undoTranslation(translated, 5, 3, 0); // [2, 4, 1]`,
      6: `// Step 6: WebGL Translation
// Vertex Shader:
attribute vec4 aPosition;
uniform mat4 uTranslateMatrix;
uniform mat4 uModelViewProjection;

void main() {
  // Apply translation, then model-view-projection
  vec4 translatedPosition = uTranslateMatrix * aPosition;
  gl_Position = uModelViewProjection * translatedPosition;
}

// JavaScript:
function setupTranslation(gl, shaderProgram, tx, ty, tz) {
  const translateMatrix = createTranslate3D(tx, ty, tz);
  const flatMatrix = flattenMatrix(translateMatrix);
  
  const uTranslateLocation = gl.getUniformLocation(shaderProgram, 'uTranslateMatrix');
  gl.uniformMatrix4fv(uTranslateLocation, false, flatMatrix);
}

// Animated translation
let time = 0;
function animateTranslation(gl, shaderProgram) {
  time += 0.01;
  const tx = Math.sin(time) * 2.0; // Oscillate x
  const ty = Math.cos(time) * 2.0; // Oscillate y
  setupTranslation(gl, shaderProgram, tx, ty, 0);
  requestAnimationFrame(() => animateTranslation(gl, shaderProgram));
}`
    },
    'rotation': {
      1: `// Step 1: 2D Rotation
function createRotate2D(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [c, -s],
    [s, c]
  ];
}

// Convert degrees to radians
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

// Rotate a 2D point
function rotate2D(point, angle) {
  const rotateMatrix = createRotate2D(angle);
  return matrixMultiply(rotateMatrix, point);
}

// Example: Rotate point (1, 0) by 90 degrees
const point = [1, 0];
const angle = degToRad(90);
const rotated = rotate2D(point, angle);
// Result: [0, 1] (rotated 90° counterclockwise)`,
      2: `// Step 2: 2D Rotation Implementation
function rotatePoint2D(point, angle) {
  const [x, y] = point;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  
  // Direct calculation (more efficient)
  return [
    x * c - y * s,
    x * s + y * c
  ];
}

// Rotate around arbitrary point (not origin)
function rotateAroundPoint2D(point, pivot, angle) {
  // Translate to origin
  const translated = [point[0] - pivot[0], point[1] - pivot[1]];
  
  // Rotate
  const rotated = rotatePoint2D(translated, angle);
  
  // Translate back
  return [
    rotated[0] + pivot[0],
    rotated[1] + pivot[1]
  ];
}

// Example
const point = [3, 4];
const pivot = [1, 1];
const rotated = rotateAroundPoint2D(point, pivot, degToRad(90));`,
      3: `// Step 3: 3D Rotation Around Axes
function createRotateX(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [1, 0, 0, 0],
    [0, c, -s, 0],
    [0, s, c, 0],
    [0, 0, 0, 1]
  ];
}

function createRotateY(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [c, 0, s, 0],
    [0, 1, 0, 0],
    [-s, 0, c, 0],
    [0, 0, 0, 1]
  ];
}

function createRotateZ(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [c, -s, 0, 0],
    [s, c, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

// Example: Rotate around Y-axis (yaw)
const point = [1, 0, 0];
const rotateY = createRotateY(degToRad(90));
const homogeneous = [...point, 1];
const rotated = matrixMultiply(rotateY, homogeneous);
// Result: [0, 0, -1] (rotated 90° around Y-axis)`,
      4: `// Step 4: Combining Rotations (Euler Angles)
function createRotateEuler(rx, ry, rz) {
  // Order: Z, Y, X (applied in reverse: X, Y, Z)
  const Rx = createRotateX(rx);
  const Ry = createRotateY(ry);
  const Rz = createRotateZ(rz);
  
  // Combine: Rz × Ry × Rx
  return matrixMultiply(Rz, matrixMultiply(Ry, Rx));
}

// Example: Pitch 30°, Yaw 45°, Roll 0°
const pitch = degToRad(30);
const yaw = degToRad(45);
const roll = degToRad(0);
const combinedRotation = createRotateEuler(pitch, yaw, roll);

// Apply to point
function rotate3D(point, rx, ry, rz) {
  const rotationMatrix = createRotateEuler(rx, ry, rz);
  const homogeneous = [...point, 1];
  const result = matrixMultiply(rotationMatrix, homogeneous);
  return [result[0], result[1], result[2]];
}`,
      5: `// Step 5: Rotation Around Arbitrary Axis (Rodrigues' Formula)
function normalize(vector) {
  const [x, y, z] = vector;
  const length = Math.sqrt(x*x + y*y + z*z);
  if (length === 0) return [0, 0, 0];
  return [x/length, y/length, z/length];
}

function rotateAroundAxis(point, axis, angle) {
  // Normalize axis
  const [ax, ay, az] = normalize(axis);
  
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const t = 1 - c;
  
  // Rodrigues' rotation formula
  const rotationMatrix = [
    [
      t*ax*ax + c,
      t*ax*ay - s*az,
      t*ax*az + s*ay,
      0
    ],
    [
      t*ax*ay + s*az,
      t*ay*ay + c,
      t*ay*az - s*ax,
      0
    ],
    [
      t*ax*az - s*ay,
      t*ay*az + s*ax,
      t*az*az + c,
      0
    ],
    [0, 0, 0, 1]
  ];
  
  const homogeneous = [...point, 1];
  const result = matrixMultiply(rotationMatrix, homogeneous);
  return [result[0], result[1], result[2]];
}

// Example: Rotate around axis [1, 1, 1] by 90°
const point = [1, 0, 0];
const axis = [1, 1, 1];
const rotated = rotateAroundAxis(point, axis, degToRad(90));`,
      6: `// Step 6: WebGL Rotation
// Vertex Shader:
attribute vec4 aPosition;
uniform mat4 uRotateMatrix;
uniform mat4 uModelViewProjection;

void main() {
  // Apply rotation, then model-view-projection
  vec4 rotatedPosition = uRotateMatrix * aPosition;
  gl_Position = uModelViewProjection * rotatedPosition;
}

// JavaScript:
function setupRotation(gl, shaderProgram, rx, ry, rz) {
  const rotationMatrix = createRotateEuler(rx, ry, rz);
  const flatMatrix = flattenMatrix(rotationMatrix);
  
  const uRotateLocation = gl.getUniformLocation(shaderProgram, 'uRotateMatrix');
  gl.uniformMatrix4fv(uRotateLocation, false, flatMatrix);
}

// Animated rotation
let rotationY = 0;
function animateRotation(gl, shaderProgram) {
  rotationY += 0.01;
  setupRotation(gl, shaderProgram, 0, rotationY, 0);
  requestAnimationFrame(() => animateRotation(gl, shaderProgram));
}`
    },
    'reflection': {
      1: `// Step 1: Reflection Across Axes
function reflectX2D() {
  return [
    [1, 0],
    [0, -1]
  ];
}

function reflectY2D() {
  return [
    [-1, 0],
    [0, 1]
  ];
}

function reflectOrigin2D() {
  return [
    [-1, 0],
    [0, -1]
  ];
}

// 3D Reflection
function reflectX3D() {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, -1, 0],
    [0, 0, 0, 1]
  ];
}

function reflectY3D() {
  return [
    [1, 0, 0, 0],
    [0, -1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

function reflectZ3D() {
  return [
    [-1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

// Example: Reflect point across x-axis
const point = [3, 4];
const reflected = matrixMultiply(reflectX2D(), point);
// Result: [3, -4]`,
      2: `// Step 2: Reflection Across Arbitrary Line
function reflectAcrossLine2D(point, lineSlope) {
  // Line through origin: y = mx
  const angle = Math.atan(lineSlope);
  
  // Rotate line to x-axis
  const R = createRotate2D(-angle);
  
  // Reflect across x-axis
  const ReflectX = reflectX2D();
  
  // Rotate back
  const R_inv = createRotate2D(angle);
  
  // Combine: R_inv × ReflectX × R
  const combined = matrixMultiply(R_inv, matrixMultiply(ReflectX, R));
  
  return matrixMultiply(combined, point);
}

// Example: Reflect across line y = x (45° line)
const point = [3, 4];
const reflected = reflectAcrossLine2D(point, 1); // slope = 1`,
      3: `// Step 3: 3D Reflection Across Plane
function reflectAcrossPlane(point, normal) {
  // Normalize plane normal
  const [nx, ny, nz] = normalize(normal);
  
  // Reflection matrix: I - 2×n×nᵀ
  const reflectionMatrix = [
    [
      1 - 2*nx*nx,
      -2*nx*ny,
      -2*nx*nz,
      0
    ],
    [
      -2*nx*ny,
      1 - 2*ny*ny,
      -2*ny*nz,
      0
    ],
    [
      -2*nx*nz,
      -2*ny*nz,
      1 - 2*nz*nz,
      0
    ],
    [0, 0, 0, 1]
  ];
  
  const homogeneous = [...point, 1];
  const result = matrixMultiply(reflectionMatrix, homogeneous);
  return [result[0], result[1], result[2]];
}

// Example: Reflect across XY-plane (normal = [0, 0, 1])
const point = [3, 4, 5];
const reflected = reflectAcrossPlane(point, [0, 0, 1]);
// Result: [3, 4, -5]`,
      4: `// Step 4: Apply Reflection to Object
function reflectObject(vertices, reflectionMatrix) {
  const reflectedVertices = [];
  
  for (let vertex of vertices) {
    const homogeneous = [...vertex, 1];
    const reflected = matrixMultiply(reflectionMatrix, homogeneous);
    reflectedVertices.push([
      reflected[0],
      reflected[1],
      reflected[2]
    ]);
  }
  
  return reflectedVertices;
}

// Example: Mirror object across YZ-plane
const objectVertices = [
  [1, 0, 0], [-1, 0, 0], [0, 1, 0]
];
const reflectMatrix = reflectX3D();
const mirrored = reflectObject(objectVertices, reflectMatrix);`,
      5: `// Step 5: Reflection Properties
// Reflection is its own inverse
function verifyReflectionInverse() {
  const R = reflectX2D();
  const R_squared = matrixMultiply(R, R);
  const identity = [[1, 0], [0, 1]];
  
  // R × R should equal identity
  console.log('R × R = I:', 
    R_squared[0][0] === identity[0][0] &&
    R_squared[0][1] === identity[0][1] &&
    R_squared[1][0] === identity[1][0] &&
    R_squared[1][1] === identity[1][1]
  );
}

// Check determinant (should be -1)
function getDeterminant2D(matrix) {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

const det = getDeterminant2D(reflectX2D());
console.log('Determinant:', det); // Should be -1`,
      6: `// Step 6: WebGL Reflection
// Vertex Shader:
attribute vec4 aPosition;
uniform mat4 uReflectMatrix;
uniform mat4 uModelViewProjection;

void main() {
  vec4 reflectedPosition = uReflectMatrix * aPosition;
  gl_Position = uModelViewProjection * reflectedPosition;
}

// JavaScript:
function setupReflection(gl, shaderProgram, axis) {
  let reflectMatrix;
  if (axis === 'x') {
    reflectMatrix = reflectX3D();
  } else if (axis === 'y') {
    reflectMatrix = reflectY3D();
  } else if (axis === 'z') {
    reflectMatrix = reflectZ3D();
  }
  
  const flatMatrix = flattenMatrix(reflectMatrix);
  const uReflectLocation = gl.getUniformLocation(shaderProgram, 'uReflectMatrix');
  gl.uniformMatrix4fv(uReflectLocation, false, flatMatrix);
}`
    },
    'combined': {
      1: `// Step 1: Understanding Order
// Order matters! Rightmost transformation applied first

// Example: Scale then Rotate then Translate
function createSRT(sx, sy, sz, rx, ry, rz, tx, ty, tz) {
  const S = createScale3D(sx, sy, sz);
  const R = createRotateEuler(rx, ry, rz);
  const T = createTranslate3D(tx, ty, tz);
  
  // Multiply in reverse order: T × R × S
  return matrixMultiply(T, matrixMultiply(R, S));
}

// Example: Different orders produce different results
const point = [1, 0, 0];

// Order 1: Scale → Rotate → Translate
const SRT = createSRT(2, 2, 2, 0, degToRad(90), 0, 5, 0, 0);
const result1 = matrixMultiply(SRT, [...point, 1]);

// Order 2: Translate → Rotate → Scale
const TRS = matrixMultiply(
  createScale3D(2, 2, 2),
  matrixMultiply(
    createRotateEuler(0, degToRad(90), 0),
    createTranslate3D(5, 0, 0)
  )
);
const result2 = matrixMultiply(TRS, [...point, 1]);

// result1 ≠ result2!`,
      2: `// Step 2: Matrix Composition
function composeTransformations(transformations) {
  // Transformations array in order of application
  // Returns combined matrix (rightmost first)
  let combined = transformations[transformations.length - 1];
  
  for (let i = transformations.length - 2; i >= 0; i--) {
    combined = matrixMultiply(combined, transformations[i]);
  }
  
  return combined;
}

// Example: Scale → Rotate → Translate
const transformations = [
  createScale3D(2, 2, 2),
  createRotateEuler(0, degToRad(45), 0),
  createTranslate3D(5, 0, 0)
];

const combined = composeTransformations(transformations);

// Apply to point
function transformPoint(point, combinedMatrix) {
  const homogeneous = [...point, 1];
  const result = matrixMultiply(combinedMatrix, homogeneous);
  return [result[0], result[1], result[2]];
}`,
      3: `// Step 3: SRT (Scale-Rotate-Translate) Pattern
class Transform {
  constructor() {
    this.scale = [1, 1, 1];
    this.rotation = [0, 0, 0];
    this.translation = [0, 0, 0];
    this.dirty = true;
    this.cachedMatrix = null;
  }
  
  setScale(sx, sy, sz) {
    this.scale = [sx, sy, sz];
    this.dirty = true;
  }
  
  setRotation(rx, ry, rz) {
    this.rotation = [rx, ry, rz];
    this.dirty = true;
  }
  
  setTranslation(tx, ty, tz) {
    this.translation = [tx, ty, tz];
    this.dirty = true;
  }
  
  getMatrix() {
    if (this.dirty || !this.cachedMatrix) {
      const S = createScale3D(this.scale[0], this.scale[1], this.scale[2]);
      const R = createRotateEuler(this.rotation[0], this.rotation[1], this.rotation[2]);
      const T = createTranslate3D(this.translation[0], this.translation[1], this.translation[2]);
      
      this.cachedMatrix = matrixMultiply(T, matrixMultiply(R, S));
      this.dirty = false;
    }
    
    return this.cachedMatrix;
  }
}

// Usage
const transform = new Transform();
transform.setScale(2, 2, 2);
transform.setRotation(0, degToRad(45), 0);
transform.setTranslation(5, 0, 0);

const matrix = transform.getMatrix();`,
      4: `// Step 4: Transformation Hierarchy
class TransformNode {
  constructor() {
    this.localMatrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    this.parent = null;
    this.children = [];
  }
  
  setLocalMatrix(matrix) {
    this.localMatrix = matrix;
  }
  
  getWorldMatrix() {
    if (this.parent) {
      return matrixMultiply(this.parent.getWorldMatrix(), this.localMatrix);
    }
    return this.localMatrix;
  }
  
  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }
}

// Example: Parent-child relationship
const parent = new TransformNode();
parent.setLocalMatrix(createTranslate3D(5, 0, 0));

const child = new TransformNode();
child.setLocalMatrix(createRotateEuler(0, degToRad(45), 0));

parent.addChild(child);

// Child's world matrix = parent's world × child's local
const childWorldMatrix = child.getWorldMatrix();`,
      5: `// Step 5: Matrix Stack for Nested Transformations
class MatrixStack {
  constructor() {
    this.stack = [];
    this.current = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  }
  
  push() {
    // Save current matrix
    this.stack.push(this.current.map(row => [...row]));
  }
  
  pop() {
    if (this.stack.length > 0) {
      this.current = this.stack.pop();
    }
  }
  
  multiply(matrix) {
    this.current = matrixMultiply(this.current, matrix);
  }
  
  getCurrent() {
    return this.current;
  }
}

// Usage: Render hierarchical scene
const matrixStack = new MatrixStack();

function renderNode(node) {
  matrixStack.push();
  matrixStack.multiply(node.localMatrix);
  
  // Render node with current matrix
  const worldMatrix = matrixStack.getCurrent();
  renderWithMatrix(node, worldMatrix);
  
  // Render children
  for (let child of node.children) {
    renderNode(child);
  }
  
  matrixStack.pop();
}`,
      6: `// Step 6: WebGL Combined Transformations (MVP)
// Vertex Shader:
attribute vec4 aPosition;
uniform mat4 uModelMatrix;      // Object transformation
uniform mat4 uViewMatrix;        // Camera transformation
uniform mat4 uProjectionMatrix; // Perspective/Orthographic

void main() {
  // Model-View-Projection: Projection × View × Model
  mat4 mvp = uProjectionMatrix * uViewMatrix * uModelMatrix;
  gl_Position = mvp * aPosition;
}

// JavaScript: Setup MVP matrices
function setupMVP(gl, shaderProgram, modelMatrix, viewMatrix, projectionMatrix) {
  // Calculate MVP = P × V × M
  const mvp = matrixMultiply(
    projectionMatrix,
    matrixMultiply(viewMatrix, modelMatrix)
  );
  
  const flatMVP = flattenMatrix(mvp);
  const uMVPLocation = gl.getUniformLocation(shaderProgram, 'uMVP');
  gl.uniformMatrix4fv(uMVPLocation, false, flatMVP);
}

// Or upload separately and multiply in shader (more flexible)
function setupMatrices(gl, shaderProgram, model, view, projection) {
  gl.uniformMatrix4fv(
    gl.getUniformLocation(shaderProgram, 'uModelMatrix'),
    false,
    flattenMatrix(model)
  );
  gl.uniformMatrix4fv(
    gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
    false,
    flattenMatrix(view)
  );
  gl.uniformMatrix4fv(
    gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    false,
    flattenMatrix(projection)
  );
}

// Create perspective projection
function createPerspective(fov, aspect, near, far) {
  const f = 1.0 / Math.tan(fov / 2);
  const rangeInv = 1.0 / (near - far);
  
  return [
    [f / aspect, 0, 0, 0],
    [0, f, 0, 0],
    [0, 0, (near + far) * rangeInv, 2 * near * far * rangeInv],
    [0, 0, -1, 0]
  ];
}`
    },
    'quaternions': {
      1: `// Step 1: Create Quaternion
// Quaternion structure: q = (w, x, y, z)
function createQuaternion(w, x, y, z) {
  return { w, x, y, z };
}

// Identity quaternion (no rotation)
const identity = createQuaternion(1, 0, 0, 0);

// Normalize quaternion (required for rotation)
function normalizeQuaternion(q) {
  const length = Math.sqrt(q.w*q.w + q.x*q.x + q.y*q.y + q.z*q.z);
  if (length === 0) return { w: 1, x: 0, y: 0, z: 0 };
  return {
    w: q.w / length,
    x: q.x / length,
    y: q.y / length,
    z: q.z / length
  };
}

// Example: Create quaternion for 90° rotation around X-axis
const angle = Math.PI / 2; // 90 degrees
const q = normalizeQuaternion({
  w: Math.cos(angle / 2),
  x: Math.sin(angle / 2),
  y: 0,
  z: 0
});`,
      2: `// Step 2: Convert Euler Angles to Quaternion
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

// Example: Convert 90° rotation around X-axis
const quaternion = eulerToQuaternion(Math.PI/2, 0, 0);
// Result: { w: 0.707, x: 0.707, y: 0, z: 0 }`,
      3: `// Step 3: Convert Quaternion to Rotation Matrix
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

// Example: Convert quaternion to matrix
const q = { w: 0.707, x: 0.707, y: 0, z: 0 };
const matrix = quaternionToMatrix(q);
// Result: 4×4 rotation matrix`,
      4: `// Step 4: Quaternion Multiplication (Compose Rotations)
function multiplyQuaternions(q1, q2) {
  return {
    w: q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z,
    x: q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,
    y: q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,
    z: q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w
  };
}

// Example: Compose two rotations
const q1 = eulerToQuaternion(Math.PI/2, 0, 0); // Rotate X
const q2 = eulerToQuaternion(0, Math.PI/2, 0); // Rotate Y
const combined = multiplyQuaternions(q2, q1); // Apply q1 first, then q2`,
      5: `// Step 5: Spherical Linear Interpolation (SLERP)
function slerp(q1, q2, t) {
  // Calculate dot product
  let dot = q1.w * q2.w + q1.x * q2.x + q1.y * q2.y + q1.z * q2.z;
  
  // If dot < 0, negate one quaternion for shorter path
  if (dot < 0) {
    q2 = { w: -q2.w, x: -q2.x, y: -q2.y, z: -q2.z };
    dot = -dot;
  }
  
  // If quaternions are very close, use linear interpolation
  if (dot > 0.9995) {
    return {
      w: q1.w + t * (q2.w - q1.w),
      x: q1.x + t * (q2.x - q1.x),
      y: q1.y + t * (q2.y - q1.y),
      z: q1.z + t * (q2.z - q1.z)
    };
  }
  
  // Calculate angle
  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega);
  
  const s1 = Math.sin((1 - t) * omega) / sinOmega;
  const s2 = Math.sin(t * omega) / sinOmega;
  
  return {
    w: s1 * q1.w + s2 * q2.w,
    x: s1 * q1.x + s2 * q2.x,
    y: s1 * q1.y + s2 * q2.y,
    z: s1 * q1.z + s2 * q2.z
  };
}

// Example: Interpolate between two rotations
const q1 = eulerToQuaternion(0, 0, 0);
const q2 = eulerToQuaternion(0, Math.PI, 0);
const interpolated = slerp(q1, q2, 0.5); // Halfway between`,
      6: `// Step 6: WebGL Quaternion Implementation
// Vertex Shader:
attribute vec4 aPosition;
uniform mat4 uModelViewProjection;
uniform mat4 uRotationMatrix; // From quaternion

void main() {
  // Apply rotation, then model-view-projection
  vec4 rotatedPosition = uRotationMatrix * aPosition;
  gl_Position = uModelViewProjection * rotatedPosition;
}

// JavaScript:
function setupQuaternionRotation(gl, shaderProgram, quaternion) {
  // Convert quaternion to matrix
  const rotationMatrix = quaternionToMatrix(quaternion);
  
  // Flatten for WebGL (column-major)
  const flatMatrix = flattenMatrix(rotationMatrix);
  
  // Upload to GPU
  const uRotationLocation = gl.getUniformLocation(shaderProgram, 'uRotationMatrix');
  gl.uniformMatrix4fv(uRotationLocation, false, flatMatrix);
}

// Animated quaternion rotation
let quaternion = { w: 1, x: 0, y: 0, z: 0 };
function animateQuaternion(gl, shaderProgram) {
  // Update quaternion (e.g., rotate around Y-axis)
  const angle = Date.now() / 1000;
  quaternion = eulerToQuaternion(0, angle, 0);
  setupQuaternionRotation(gl, shaderProgram, quaternion);
  requestAnimationFrame(() => animateQuaternion(gl, shaderProgram));
}`
    },
    'projection': {
      1: `// Step 1: Understanding Projections
// Perspective: Objects farther appear smaller
function perspectiveProjection(x, y, z, near) {
  return {
    x: (x * near) / z,
    y: (y * near) / z
  };
}

// Orthographic: No depth scaling
function orthographicProjection(x, y, z) {
  return { x, y }; // Ignore z
}

// Example: Perspective projection
const point3D = { x: 10, y: 10, z: 10 };
const projected = perspectiveProjection(point3D.x, point3D.y, point3D.z, 1);
// Result: { x: 1, y: 1 } (scaled down by z)`,
      2: `// Step 2: Create Perspective Projection Matrix
function createPerspective(fov, aspect, near, far) {
  const f = 1.0 / Math.tan(fov / 2);
  const rangeInv = 1.0 / (near - far);
  
  return [
    [f / aspect, 0, 0, 0],
    [0, f, 0, 0],
    [0, 0, (near + far) * rangeInv, 2 * near * far * rangeInv],
    [0, 0, -1, 0]
  ];
}

// Example: 45° field of view, square aspect, near=0.1, far=100
const fov = Math.PI / 4; // 45 degrees
const aspect = 1.0;
const near = 0.1;
const far = 100;
const perspectiveMatrix = createPerspective(fov, aspect, near, far);`,
      3: `// Step 3: Create Orthographic Projection Matrix
function createOrthographic(left, right, bottom, top, near, far) {
  return [
    [2/(right-left), 0, 0, -(right+left)/(right-left)],
    [0, 2/(top-bottom), 0, -(top+bottom)/(top-bottom)],
    [0, 0, -2/(far-near), -(far+near)/(far-near)],
    [0, 0, 0, 1]
  ];
}

// Example: Orthographic projection
const orthographicMatrix = createOrthographic(-5, 5, -5, 5, -10, 10);`,
      4: `// Step 4: Perspective Divide
function perspectiveDivide(point) {
  // After projection matrix, point has w component
  // Divide x, y, z by w to get final coordinates
  if (point.w === 0) return point; // Avoid division by zero
  
  return {
    x: point.x / point.w,
    y: point.y / point.w,
    z: point.z / point.w,
    w: 1
  };
}

// Example: Apply projection and divide
const point = { x: 0, y: 0, z: -5, w: 1 };
const projected = matrixMultiply(perspectiveMatrix, [point.x, point.y, point.z, point.w]);
// projected = [0, 0, -5.01, 5]
const divided = perspectiveDivide({ x: projected[0], y: projected[1], z: projected[2], w: projected[3] });
// Result: { x: 0, y: 0, z: -1.002, w: 1 }`,
      5: `// Step 5: Viewport Transformation
function viewportTransform(ndcX, ndcY, width, height) {
  // Map from NDC [-1, 1] to screen [0, width] × [0, height]
  const screenX = (ndcX + 1) * width / 2;
  const screenY = (1 - ndcY) * height / 2; // Flip Y-axis
  
  return { x: screenX, y: screenY };
}

// Example: Convert NDC to screen coordinates
const ndc = { x: 0.5, y: -0.5 };
const screen = viewportTransform(ndc.x, ndc.y, 800, 600);
// Result: { x: 600, y: 450 }`,
      6: `// Step 6: WebGL Projection Implementation
// Vertex Shader:
attribute vec4 aPosition;
uniform mat4 uModelMatrix;      // Object transformation
uniform mat4 uViewMatrix;       // Camera transformation
uniform mat4 uProjectionMatrix; // Projection

void main() {
  // Model-View-Projection: Projection × View × Model
  mat4 mvp = uProjectionMatrix * uViewMatrix * uModelMatrix;
  gl_Position = mvp * aPosition;
  // GPU automatically performs perspective divide (w component)
}

// JavaScript: Setup MVP
function setupMVP(gl, shaderProgram, model, view, projection) {
  // Calculate MVP = P × V × M
  const mvp = matrixMultiply(
    projection,
    matrixMultiply(view, model)
  );
  
  const flatMVP = flattenMatrix(mvp);
  const uMVPLocation = gl.getUniformLocation(shaderProgram, 'uMVP');
  gl.uniformMatrix4fv(uMVPLocation, false, flatMVP);
}

// Or upload separately (more flexible)
function setupMatrices(gl, shaderProgram, model, view, projection) {
  gl.uniformMatrix4fv(
    gl.getUniformLocation(shaderProgram, 'uModelMatrix'),
    false,
    flattenMatrix(model)
  );
  gl.uniformMatrix4fv(
    gl.getUniformLocation(shaderProgram, 'uViewMatrix'),
    false,
    flattenMatrix(view)
  );
  gl.uniformMatrix4fv(
    gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    false,
    flattenMatrix(projection)
  );
}`
    }
  };

  if (snippets[module]) {
    if (snippets[module][step]) {
      return snippets[module][step];
    } else if (snippets[module][1]) {
      return snippets[module][1];
    }
  }
  
  return null;
};

