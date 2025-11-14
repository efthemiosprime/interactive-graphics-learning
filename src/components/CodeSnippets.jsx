import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code } from 'lucide-react';

export default function CodeSnippets({ mode, selectedOperation, transform3dType, v1, v2, v3d, v3d_2, m1, m2, m1_3x3, m2_3x3, matrixSize, rotation3d, translation3d, scale3d }) {
  const [expanded, setExpanded] = useState(true);

  const getCodeSnippet = () => {
    if (mode === 'vector') {
      const snippets = {
        'addition': {
          title: 'Vector Addition',
          code: `// Vector Addition
function addVectors(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y
  };
}

// Example usage
const v1 = { x: ${v1.x}, y: ${v1.y} };
const v2 = { x: ${v2.x}, y: ${v2.y} };
const result = addVectors(v1, v2);
console.log(result); // { x: ${(v1.x + v2.x).toFixed(2)}, y: ${(v1.y + v2.y).toFixed(2)} }`,
          description: 'Add corresponding components of two vectors'
        },
        'subtraction': {
          title: 'Vector Subtraction',
          code: `// Vector Subtraction
function subtractVectors(v1, v2) {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y
  };
}

// Example usage
const v1 = { x: ${v1.x}, y: ${v1.y} };
const v2 = { x: ${v2.x}, y: ${v2.y} };
const result = subtractVectors(v1, v2);
console.log(result); // { x: ${(v1.x - v2.x).toFixed(2)}, y: ${(v1.y - v2.y).toFixed(2)} }`,
          description: 'Subtract corresponding components'
        },
        'dot': {
          title: 'Dot Product',
          code: `// Dot Product (Scalar Product)
function dotProduct(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

// Example usage
const v1 = { x: ${v1.x}, y: ${v1.y} };
const v2 = { x: ${v2.x}, y: ${v2.y} };
const result = dotProduct(v1, v2);
console.log(result); // ${(v1.x * v2.x + v1.y * v2.y).toFixed(2)}

// Geometric interpretation: ||v1|| × ||v2|| × cos(θ)`,
          description: 'Returns a scalar value representing projection'
        },
        'magnitude': {
          title: 'Vector Magnitude',
          code: `// Vector Magnitude (Length)
function magnitude(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

// Example usage
const v = { x: ${v1.x}, y: ${v1.y} };
const mag = magnitude(v);
console.log(mag); // ${Math.sqrt(v1.x * v1.x + v1.y * v1.y).toFixed(2)}

// Alternative: using Math.hypot
function magnitudeHypot(v) {
  return Math.hypot(v.x, v.y);
}`,
          description: 'Calculate the length/distance of a vector'
        },
        'normalize': {
          title: 'Vector Normalization',
          code: `// Normalize Vector (Unit Vector)
function normalize(v) {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y);
  if (mag === 0) return { x: 0, y: 0 };
  return {
    x: v.x / mag,
    y: v.y / mag
  };
}

// Example usage
const v = { x: ${v1.x}, y: ${v1.y} };
const unit = normalize(v);
console.log(unit); // Unit vector with length = 1
console.log(magnitude(unit)); // 1.0`,
          description: 'Scale vector to unit length (length = 1)'
        },
        'cross': {
          title: 'Cross Product (2D)',
          code: `// Cross Product (2D - returns scalar z-component)
function crossProduct2D(v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
}

// Example usage
const v1 = { x: ${v1.x}, y: ${v1.y} };
const v2 = { x: ${v2.x}, y: ${v2.y} };
const result = crossProduct2D(v1, v2);
console.log(result); // ${(v1.x * v2.y - v1.y * v2.x).toFixed(2)}

// Geometric meaning: signed area of parallelogram`,
          description: 'Returns signed area of parallelogram'
        },
        'angle2d': {
          title: 'Angle Between Vectors',
          code: `// Angle Between Two Vectors
function angleBetween(v1, v2) {
  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  return Math.acos(dot / (mag1 * mag2));
}

// Example usage
const v1 = { x: ${v1.x}, y: ${v1.y} };
const v2 = { x: ${v2.x}, y: ${v2.y} };
const angle = angleBetween(v1, v2);
console.log(angle); // ${Math.acos((v1.x * v2.x + v1.y * v2.y) / (Math.sqrt(v1.x * v1.x + v1.y * v1.y) * Math.sqrt(v2.x * v2.x + v2.y * v2.y))).toFixed(4)} radians
console.log(angle * 180 / Math.PI); // Convert to degrees`,
          description: 'Calculate angle in radians between two vectors'
        },
        'projection2d': {
          title: 'Vector Projection',
          code: `// Project Vector v onto Vector onto
function project(v, onto) {
  const dot = v.x * onto.x + v.y * onto.y;
  const ontoMagSq = onto.x * onto.x + onto.y * onto.y;
  if (ontoMagSq === 0) return { x: 0, y: 0 };
  const scalar = dot / ontoMagSq;
  return {
    x: onto.x * scalar,
    y: onto.y * scalar
  };
}

// Example usage
const v = { x: ${v1.x}, y: ${v1.y} };
const onto = { x: ${v2.x}, y: ${v2.y} };
const proj = project(v, onto);
console.log(proj); // Component of v along onto`,
          description: 'Project one vector onto another'
        },
        'reflection': {
          title: 'Vector Reflection',
          code: `// Reflect Vector across axis
function reflect(v, axis) {
  if (axis === 'x') {
    return { x: v.x, y: -v.y };
  } else if (axis === 'y') {
    return { x: -v.x, y: v.y };
  }
  return v;
}

// Example usage
const v = { x: ${v1.x}, y: ${v1.y} };
const reflectedX = reflect(v, 'x');
console.log(reflectedX); // { x: ${v1.x}, y: ${-v1.y} }`,
          description: 'Reflect vector across x or y axis'
        },
        'perpendicular': {
          title: 'Perpendicular Vector',
          code: `// Find Perpendicular Vector (rotate 90°)
function perpendicular(v) {
  return { x: -v.y, y: v.x };
}

// Example usage
const v = { x: ${v1.x}, y: ${v1.y} };
const perp = perpendicular(v);
console.log(perp); // { x: ${-v1.y}, y: ${v1.x} }

// Verify: dot product should be 0
const dot = v.x * perp.x + v.y * perp.y;
console.log(dot); // 0 (perpendicular)`,
          description: 'Get vector perpendicular to given vector'
        }
      };

      return snippets[selectedOperation] || snippets['addition'];
    } else if (mode === 'matrix') {
      const currentM1 = matrixSize === '3x3' ? m1_3x3 : m1;
      const currentM2 = matrixSize === '3x3' ? m2_3x3 : m2;
      
      const snippets = {
        'addition': {
          title: 'Matrix Addition',
          code: matrixSize === '2x2'
            ? `// Matrix Addition (2×2)
function matrixAdd(a, b) {
  return [
    [a[0][0] + b[0][0], a[0][1] + b[0][1]],
    [a[1][0] + b[1][0], a[1][1] + b[1][1]]
  ];
}

// Example usage
const m1 = [[${currentM1[0][0]}, ${currentM1[0][1]}], [${currentM1[1][0]}, ${currentM1[1][1]}]];
const m2 = [[${currentM2[0][0]}, ${currentM2[0][1]}], [${currentM2[1][0]}, ${currentM2[1][1]}]];
const result = matrixAdd(m1, m2);
console.log(result);`
            : `// Matrix Addition (${matrixSize})
function matrixAdd(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];
  
  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      result[i][j] = a[i][j] + b[i][j];
    }
  }
  return result;
}

// Example usage
const m1 = [/* ${matrixSize} matrix */];
const m2 = [/* ${matrixSize} matrix */];
const result = matrixAdd(m1, m2);`,
          description: 'Add corresponding elements of two matrices'
        },
        'subtraction': {
          title: 'Matrix Subtraction',
          code: `// Matrix Subtraction
function matrixSubtract(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];
  
  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      result[i][j] = a[i][j] - b[i][j];
    }
  }
  return result;
}

// Example usage
const m1 = [/* ${matrixSize} matrix */];
const m2 = [/* ${matrixSize} matrix */];
const result = matrixSubtract(m1, m2);`,
          description: 'Subtract corresponding elements'
        },
        'multiply': {
          title: 'Matrix Multiplication',
          code: matrixSize === '2x2'
            ? `// Matrix Multiplication (2×2)
function matrixMultiply(a, b) {
  return [
    [
      a[0][0] * b[0][0] + a[0][1] * b[1][0],
      a[0][0] * b[0][1] + a[0][1] * b[1][1]
    ],
    [
      a[1][0] * b[0][0] + a[1][1] * b[1][0],
      a[1][0] * b[0][1] + a[1][1] * b[1][1]
    ]
  ];
}

// Example usage
const m1 = [[${currentM1[0][0]}, ${currentM1[0][1]}], [${currentM1[1][0]}, ${currentM1[1][1]}]];
const m2 = [[${currentM2[0][0]}, ${currentM2[0][1]}], [${currentM2[1][0]}, ${currentM2[1][1]}]];
const result = matrixMultiply(m1, m2);`
            : `// Matrix Multiplication (${matrixSize})
function matrixMultiply(a, b) {
  const rows = a.length;
  const cols = b[0].length;
  const n = a[0].length;
  const result = [];
  
  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      result[i][j] = 0;
      for (let k = 0; k < n; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

// Example usage
const m1 = [/* ${matrixSize} matrix */];
const m2 = [/* ${matrixSize} matrix */];
const result = matrixMultiply(m1, m2);`,
          description: 'Row × Column multiplication'
        },
        'determinant': {
          title: 'Matrix Determinant',
          code: matrixSize === '2x2'
            ? `// Determinant (2×2)
function determinant2x2(m) {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

// Example usage
const m = [[${currentM1[0][0]}, ${currentM1[0][1]}], [${currentM1[1][0]}, ${currentM1[1][1]}]];
const det = determinant2x2(m);
console.log(det); // ${(currentM1[0][0] * currentM1[1][1] - currentM1[0][1] * currentM1[1][0]).toFixed(2)}`
            : matrixSize === '3x3'
            ? `// Determinant (3×3) - Cofactor Expansion
function determinant3x3(m) {
  const a = m[0][0], b = m[0][1], c = m[0][2];
  const d = m[1][0], e = m[1][1], f = m[1][2];
  const g = m[2][0], h = m[2][1], i = m[2][2];
  
  return a * (e * i - f * h) 
       - b * (d * i - f * g) 
       + c * (d * h - e * g);
}

// Example usage
const m = [/* 3×3 matrix */];
const det = determinant3x3(m);`
            : `// Determinant (4×4) - Cofactor Expansion
function determinant4x4(m) {
  // Expand along first row
  let det = 0;
  for (let j = 0; j < 4; j++) {
    const cofactor = getCofactor4x4(m, 0, j);
    det += m[0][j] * cofactor * (j % 2 === 0 ? 1 : -1);
  }
  return det;
}

function getCofactor4x4(m, row, col) {
  // Calculate 3×3 minor
  const minor = [];
  let mi = 0;
  for (let i = 0; i < 4; i++) {
    if (i === row) continue;
    minor[mi] = [];
    let mj = 0;
    for (let j = 0; j < 4; j++) {
      if (j === col) continue;
      minor[mi][mj] = m[i][j];
      mj++;
    }
    mi++;
  }
  return determinant3x3(minor);
}`,
          description: 'Calculate determinant (scalar value)'
        },
        'transpose': {
          title: 'Matrix Transpose',
          code: `// Matrix Transpose
function transpose(m) {
  const rows = m.length;
  const cols = m[0].length;
  const result = [];
  
  for (let j = 0; j < cols; j++) {
    result[j] = [];
    for (let i = 0; i < rows; i++) {
      result[j][i] = m[i][j];
    }
  }
  return result;
}

// Example usage
const m = [/* ${matrixSize} matrix */];
const mT = transpose(m);
console.log(mT); // Rows and columns swapped`,
          description: 'Swap rows and columns'
        },
        'apply': {
          title: 'Apply Matrix to Vector',
          code: matrixSize === '2x2'
            ? `// Apply 2×2 Matrix to 2D Vector
function applyMatrix2D(m, v) {
  return {
    x: m[0][0] * v.x + m[0][1] * v.y,
    y: m[1][0] * v.x + m[1][1] * v.y
  };
}

// Example usage
const m = [[${currentM1[0][0]}, ${currentM1[0][1]}], [${currentM1[1][0]}, ${currentM1[1][1]}]];
const v = { x: ${v1.x}, y: ${v1.y} };
const result = applyMatrix2D(m, v);
console.log(result);`
            : `// Apply ${matrixSize} Matrix to Vector
function applyMatrix3D(m, v) {
  return {
    x: m[0][0] * v.x + m[0][1] * v.y + m[0][2] * v.z,
    y: m[1][0] * v.x + m[1][1] * v.y + m[1][2] * v.z,
    z: m[2][0] * v.x + m[2][1] * v.y + m[2][2] * v.z
  };
}

// Example usage
const m = [/* ${matrixSize} matrix */];
const v = { x: ${v3d.x}, y: ${v3d.y}, z: ${v3d.z} };
const result = applyMatrix3D(m, v);`,
          description: 'Transform vector using matrix'
        },
        'inverse': {
          title: 'Matrix Inverse',
          code: matrixSize === '2x2'
            ? `// Matrix Inverse (2×2)
function inverse2x2(m) {
  const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  if (Math.abs(det) < 1e-10) return null; // Singular matrix
  
  const invDet = 1 / det;
  return [
    [m[1][1] * invDet, -m[0][1] * invDet],
    [-m[1][0] * invDet, m[0][0] * invDet]
  ];
}

// Example usage
const m = [[${currentM1[0][0]}, ${currentM1[0][1]}], [${currentM1[1][0]}, ${currentM1[1][1]}]];
const inv = inverse2x2(m);
if (inv) {
  console.log(inv);
} else {
  console.log('Matrix is singular (not invertible)');
}`
            : `// Matrix Inverse (${matrixSize}) - Using Adjugate
function inverse(m) {
  const det = determinant(m);
  if (Math.abs(det) < 1e-10) return null;
  
  const adj = adjugate(m);
  const invDet = 1 / det;
  return adj.map(row => row.map(val => val * invDet));
}

function adjugate(m) {
  // Calculate cofactor matrix and transpose
  const n = m.length;
  const adj = [];
  for (let i = 0; i < n; i++) {
    adj[i] = [];
    for (let j = 0; j < n; j++) {
      adj[i][j] = getCofactor(m, j, i); // Transpose
    }
  }
  return adj;
}`,
          description: 'Calculate inverse matrix (if det ≠ 0)'
        },
        'eigenvalues': {
          title: 'Eigenvalues & Eigenvectors',
          code: matrixSize === '2x2'
            ? `// Eigenvalues (2×2)
function eigenvalues2x2(m) {
  const a = m[0][0], b = m[0][1];
  const c = m[1][0], d = m[1][1];
  
  const trace = a + d;
  const det = a * d - b * c;
  const disc = trace * trace - 4 * det;
  
  if (disc < 0) {
    // Complex eigenvalues
    const real = trace / 2;
    const imag = Math.sqrt(-disc) / 2;
    return [
      { real, imag, complex: true },
      { real, imag: -imag, complex: true }
    ];
  }
  
  const sqrtDisc = Math.sqrt(disc);
  return [
    { real: (trace + sqrtDisc) / 2, imag: 0, complex: false },
    { real: (trace - sqrtDisc) / 2, imag: 0, complex: false }
  ];
}

// Eigenvector for given eigenvalue
function eigenvector2x2(m, eigenvalue) {
  const lambda = eigenvalue.real;
  const a = m[0][0] - lambda;
  const b = m[0][1];
  const c = m[1][0];
  const d = m[1][1] - lambda;
  
  if (Math.abs(b) > 1e-10) {
    const v = { x: b, y: -a };
    const mag = Math.sqrt(v.x * v.x + v.y * v.y);
    return { x: v.x / mag, y: v.y / mag };
  }
  return { x: 1, y: 0 };
}`
            : `// Eigenvalues (3×3) - Using Characteristic Polynomial
function eigenvalues3x3(m) {
  // Solve det(M - λI) = 0
  // Characteristic polynomial: -λ³ + trace×λ² - sum_of_minors×λ + det = 0
  const trace = m[0][0] + m[1][1] + m[2][2];
  // Use Newton's method or other numerical method
  // ... (implementation uses iterative approach)
}

// Eigenvector for given eigenvalue
function eigenvector3x3(m, eigenvalue) {
  // Solve (M - λI)v = 0
  // Use cross product of rows to find null space
  // ... (implementation)
}`,
          description: 'Find eigenvalues and eigenvectors'
        },
        'rank': {
          title: 'Matrix Rank',
          code: `// Matrix Rank using Gaussian Elimination
function matrixRank(m) {
  if (!m || m.length === 0) return 0;
  
  const rows = m.length;
  const cols = m[0].length;
  const matrix = m.map(row => [...row]); // Copy
  
  let rank = 0;
  let row = 0;
  let col = 0;
  
  // Gaussian elimination
  while (row < rows && col < cols) {
    // Find pivot
    let pivotRow = row;
    while (pivotRow < rows && Math.abs(matrix[pivotRow][col]) < 1e-10) {
      pivotRow++;
    }
    
    if (pivotRow < rows) {
      // Swap rows if needed
      if (pivotRow !== row) {
        [matrix[row], matrix[pivotRow]] = [matrix[pivotRow], matrix[row]];
      }
      
      // Eliminate below pivot
      const pivot = matrix[row][col];
      for (let i = row + 1; i < rows; i++) {
        if (Math.abs(matrix[i][col]) > 1e-10) {
          const factor = matrix[i][col] / pivot;
          for (let j = col; j < cols; j++) {
            matrix[i][j] -= factor * matrix[row][j];
          }
        }
      }
      
      rank++;
      row++;
    }
    col++;
  }
  
  return rank;
}

// Example usage
const m = [/* ${matrixSize} matrix */];
const rank = matrixRank(m);
console.log(rank); // Number of linearly independent rows`,
          description: 'Calculate rank using Gaussian elimination'
        }
      };

      return snippets[selectedOperation] || snippets['addition'];
    } else if (mode === '3d') {
      const snippets = {
        'rotation': {
          title: '3D Rotation',
          code: `// 3D Rotation Matrices
function rotationX(angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    [1, 0, 0],
    [0, cos, -sin],
    [0, sin, cos]
  ];
}

function rotationY(angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    [cos, 0, sin],
    [0, 1, 0],
    [-sin, 0, cos]
  ];
}

function rotationZ(angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    [cos, -sin, 0],
    [sin, cos, 0],
    [0, 0, 1]
  ];
}

// Compose rotations
function combineRotations(rx, ry, rz) {
  let rot = rotationX(rx);
  rot = multiply3x3(rot, rotationY(ry));
  rot = multiply3x3(rot, rotationZ(rz));
  return rot;
}

// Apply rotation to vector
function rotate3D(v, rx, ry, rz) {
  const rot = combineRotations(rx, ry, rz);
  return applyMatrix3D(rot, v);
}

// Example usage
const v = { x: ${v3d.x}, y: ${v3d.y}, z: ${v3d.z} };
const rotated = rotate3D(v, ${rotation3d ? rotation3d.x.toFixed(2) : 0}, ${rotation3d ? rotation3d.y.toFixed(2) : 0}, ${rotation3d ? rotation3d.z.toFixed(2) : 0});`,
          description: 'Rotate vector around X, Y, Z axes'
        },
        'translation': {
          title: '3D Translation',
          code: `// 3D Translation (using 4×4 homogeneous matrix)
function translation3D(tx, ty, tz) {
  return [
    [1, 0, 0, tx],
    [0, 1, 0, ty],
    [0, 0, 1, tz],
    [0, 0, 0, 1]
  ];
}

// Apply translation to vector
function translate3D(v, tx, ty, tz) {
  return {
    x: v.x + tx,
    y: v.y + ty,
    z: v.z + tz
  };
}

// Example usage
const v = { x: ${v3d.x}, y: ${v3d.y}, z: ${v3d.z} };
const translated = translate3D(v, ${translation3d ? translation3d.x : 0}, ${translation3d ? translation3d.y : 0}, ${translation3d ? translation3d.z : 0});
console.log(translated);`,
          description: 'Move point in 3D space'
        },
        'scale': {
          title: '3D Scaling',
          code: `// 3D Scaling Matrix
function scale3D(sx, sy, sz) {
  return [
    [sx, 0, 0],
    [0, sy, 0],
    [0, 0, sz]
  ];
}

// Apply scaling to vector
function scaleVector3D(v, sx, sy, sz) {
  return {
    x: v.x * sx,
    y: v.y * sy,
    z: v.z * sz
  };
}

// Example usage
const v = { x: ${v3d.x}, y: ${v3d.y}, z: ${v3d.z} };
const scaled = scaleVector3D(v, ${scale3d ? scale3d.x : 1}, ${scale3d ? scale3d.y : 1}, ${scale3d ? scale3d.z : 1});
console.log(scaled);

// Uniform scaling
function uniformScale(v, s) {
  return scaleVector3D(v, s, s, s);
}`,
          description: 'Scale vector in 3D space'
        }
      };

      return snippets[transform3dType] || snippets['rotation'];
    } else if (mode === 'advanced') {
      const snippets = {
        'crossproduct3d': {
          title: '3D Cross Product',
          code: `// 3D Cross Product
function crossProduct3D(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}

// Example usage
const a = { x: ${v3d.x}, y: ${v3d.y}, z: ${v3d.z} };
const b = { x: ${v3d_2.x}, y: ${v3d_2.y}, z: ${v3d_2.z} };
const result = crossProduct3D(a, b);
console.log(result); // Perpendicular to both a and b

// Properties:
// - a × b = -(b × a) (anti-commutative)
// - a × a = 0 (self-product is zero)
// - ||a × b|| = ||a|| × ||b|| × sin(θ)`,
          description: 'Returns vector perpendicular to both input vectors'
        },
        'dotproduct3d': {
          title: '3D Dot Product',
          code: `// 3D Dot Product
function dotProduct3D(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

// Example usage
const a = { x: ${v3d.x}, y: ${v3d.y}, z: ${v3d.z} };
const b = { x: ${v3d_2.x}, y: ${v3d_2.y}, z: ${v3d_2.z} };
const result = dotProduct3D(a, b);
console.log(result); // ${(v3d.x * v3d_2.x + v3d.y * v3d_2.y + v3d.z * v3d_2.z).toFixed(2)}

// Geometric interpretation:
// a · b = ||a|| × ||b|| × cos(θ)
// Used for: work, lighting, similarity`,
          description: 'Scalar product of 3D vectors'
        },
        'projection': {
          title: '3D Vector Projection',
          code: `// Project Vector v onto Vector onto
function project3D(v, onto) {
  const dot = v.x * onto.x + v.y * onto.y + v.z * onto.z;
  const ontoMagSq = onto.x * onto.x + onto.y * onto.y + onto.z * onto.z;
  if (ontoMagSq === 0) return { x: 0, y: 0, z: 0 };
  
  const scalar = dot / ontoMagSq;
  return {
    x: onto.x * scalar,
    y: onto.y * scalar,
    z: onto.z * scalar
  };
}

// Example usage
const v = { x: ${v3d.x}, y: ${v3d.y}, z: ${v3d.z} };
const onto = { x: ${v3d_2.x}, y: ${v3d_2.y}, z: ${v3d_2.z} };
const proj = project3D(v, onto);
console.log(proj); // Component of v along onto`,
          description: 'Project one 3D vector onto another'
        },
        'angle': {
          title: 'Angle Between 3D Vectors',
          code: `// Angle Between 3D Vectors
function angleBetween3D(a, b) {
  const dot = a.x * b.x + a.y * b.y + a.z * b.z;
  const magA = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
  const magB = Math.sqrt(b.x * b.x + b.y * b.y + b.z * b.z);
  return Math.acos(dot / (magA * magB));
}

// Example usage
const a = { x: ${v3d.x}, y: ${v3d.y}, z: ${v3d.z} };
const b = { x: ${v3d_2.x}, y: ${v3d_2.y}, z: ${v3d_2.z} };
const angle = angleBetween3D(a, b);
console.log(angle); // Radians
console.log(angle * 180 / Math.PI); // Degrees`,
          description: 'Calculate angle between two 3D vectors'
        },
        'magnitude3d': {
          title: '3D Magnitude',
          code: `// 3D Vector Magnitude
function magnitude3D(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

// Example usage
const v = { x: ${v3d.x}, y: ${v3d.y}, z: ${v3d.z} };
const mag = magnitude3D(v);
console.log(mag); // ${Math.sqrt(v3d.x * v3d.x + v3d.y * v3d.y + v3d.z * v3d.z).toFixed(2)}

// Alternative using Math.hypot
function magnitude3DHypot(v) {
  return Math.hypot(v.x, v.y, v.z);
}`,
          description: 'Calculate length of 3D vector'
        },
        'normalize3d': {
          title: '3D Normalize',
          code: `// Normalize 3D Vector
function normalize3D(v) {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  if (mag === 0) return { x: 0, y: 0, z: 0 };
  return {
    x: v.x / mag,
    y: v.y / mag,
    z: v.z / mag
  };
}

// Example usage
const v = { x: ${v3d.x}, y: ${v3d.y}, z: ${v3d.z} };
const unit = normalize3D(v);
console.log(unit); // Unit vector
console.log(magnitude3D(unit)); // 1.0`,
          description: 'Scale 3D vector to unit length'
        }
      };

      return snippets[selectedOperation] || snippets['crossproduct3d'];
    }
    return null;
  };

  const snippetData = getCodeSnippet();

  if (!snippetData) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg shadow-lg p-4 mb-4 border-2 border-slate-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-3 text-left"
      >
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-bold text-slate-900">
            JavaScript Code Snippet
          </h3>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-slate-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-600" />
        )}
      </button>

      {expanded && (
        <div className="bg-white rounded-lg p-4 border-2 border-slate-200">
          <h4 className="text-md font-semibold text-slate-900 mb-2">{snippetData.title}</h4>
          <p className="text-xs text-gray-600 mb-3 italic">{snippetData.description}</p>
          
          <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-slate-100 font-mono whitespace-pre-wrap">
              <code>{snippetData.code}</code>
            </pre>
          </div>
          
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
            <span>💡</span>
            <span>Copy and paste this code into your JavaScript project</span>
          </div>
        </div>
      )}
    </div>
  );
}

