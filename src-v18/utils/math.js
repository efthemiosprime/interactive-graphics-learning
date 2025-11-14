// 2D Vector Operations
export const add = (a, b) => ({x: a.x + b.x, y: a.y + b.y});
export const subtract = (a, b) => ({x: a.x - b.x, y: a.y - b.y});
export const magnitude = (v) => Math.sqrt(v.x * v.x + v.y * v.y);
export const normalize = (v) => {
  const mag = magnitude(v);
  return mag === 0 ? {x: 0, y: 0} : {x: v.x / mag, y: v.y / mag};
};
export const dotProduct = (a, b) => a.x * b.x + a.y * b.y;
export const crossProductZ = (a, b) => a.x * b.y - a.y * b.x;
export const angleBetween2D = (a, b) => {
  const dot = dotProduct(a, b);
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return Math.acos(Math.max(-1, Math.min(1, dot / (magA * magB))));
};
export const projection2D = (v, onto) => {
  const dot = dotProduct(v, onto);
  const ontoMagSq = dotProduct(onto, onto);
  if (ontoMagSq === 0) return {x: 0, y: 0};
  const scalar = dot / ontoMagSq;
  return {x: onto.x * scalar, y: onto.y * scalar};
};
export const reflect = (v, axis) => {
  if (axis === 'x') return {x: v.x, y: -v.y};
  return {x: -v.x, y: v.y};
};
export const perpendicular = (v) => ({x: -v.y, y: v.x});

// 3D Vector Operations
export const magnitude3D = (v) => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
export const normalize3D = (v) => {
  const mag = magnitude3D(v);
  return mag === 0 ? {x: 0, y: 0, z: 0} : {x: v.x / mag, y: v.y / mag, z: v.z / mag};
};
export const dotProduct3D = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
export const crossProduct3D = (a, b) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x
});
export const vectorProjection = (v, onto) => {
  const dot = dotProduct3D(v, onto);
  const ontoMagSq = dotProduct3D(onto, onto);
  if (ontoMagSq === 0) return {x: 0, y: 0, z: 0};
  const scalar = dot / ontoMagSq;
  return {x: onto.x * scalar, y: onto.y * scalar, z: onto.z * scalar};
};
export const angleBetween = (a, b) => {
  const dot = dotProduct3D(a, b);
  const magA = magnitude3D(a);
  const magB = magnitude3D(b);
  if (magA === 0 || magB === 0) return 0;
  return Math.acos(Math.max(-1, Math.min(1, dot / (magA * magB))));
};

// Matrix Operations (2x2)
export const matrixAdd = (a, b) => {
  if (a.length === 4) {
    return matrixAdd4x4(a, b);
  }
  if (a.length === 3) {
    return matrixAdd3x3(a, b);
  }
  return [
    [a[0][0] + b[0][0], a[0][1] + b[0][1]],
    [a[1][0] + b[1][0], a[1][1] + b[1][1]]
  ];
};
export const matrixSubtract = (a, b) => {
  if (a.length === 4) {
    return matrixSubtract4x4(a, b);
  }
  if (a.length === 3) {
    return matrixSubtract3x3(a, b);
  }
  return [
    [a[0][0] - b[0][0], a[0][1] - b[0][1]],
    [a[1][0] - b[1][0], a[1][1] - b[1][1]]
  ];
};
export const matrixMultiply = (a, b) => {
  if (a.length === 4) {
    return matrixMultiply4x4(a, b);
  }
  if (a.length === 3) {
    return matrixMultiply3x3(a, b);
  }
  return [
    [a[0][0]*b[0][0] + a[0][1]*b[1][0], a[0][0]*b[0][1] + a[0][1]*b[1][1]],
    [a[1][0]*b[0][0] + a[1][1]*b[1][0], a[1][0]*b[0][1] + a[1][1]*b[1][1]]
  ];
};
export const determinant = (a) => {
  if (a.length === 4) {
    return determinant4x4(a);
  }
  if (a.length === 3) {
    return determinant3x3(a);
  }
  return a[0][0] * a[1][1] - a[0][1] * a[1][0];
};
export const transpose = (a) => {
  if (a.length === 4) {
    return transpose4x4(a);
  }
  if (a.length === 3) {
    return transpose3x3(a);
  }
  return [[a[0][0], a[1][0]], [a[0][1], a[1][1]]];
};
export const matrixApplyToVector = (m, v) => {
  if (m.length === 4) {
    return matrixApplyToVector4D(m, v);
  }
  if (m.length === 3) {
    return matrixApplyToVector3D(m, v);
  }
  return {
    x: m[0][0] * v.x + m[0][1] * v.y,
    y: m[1][0] * v.x + m[1][1] * v.y
  };
};
export const inverseMatrix2D = (a) => {
  if (a.length === 4) {
    return inverseMatrix4x4(a);
  }
  if (a.length === 3) {
    return inverseMatrix3x3(a);
  }
  const det = determinant(a);
  if (Math.abs(det) < 0.0001) return null;
  return [[a[1][1] / det, -a[0][1] / det], [-a[1][0] / det, a[0][0] / det]];
};

// Matrix Operations (3x3)
export const matrixAdd3x3 = (a, b) => [
  [a[0][0] + b[0][0], a[0][1] + b[0][1], a[0][2] + b[0][2]],
  [a[1][0] + b[1][0], a[1][1] + b[1][1], a[1][2] + b[1][2]],
  [a[2][0] + b[2][0], a[2][1] + b[2][1], a[2][2] + b[2][2]]
];
export const matrixSubtract3x3 = (a, b) => [
  [a[0][0] - b[0][0], a[0][1] - b[0][1], a[0][2] - b[0][2]],
  [a[1][0] - b[1][0], a[1][1] - b[1][1], a[1][2] - b[1][2]],
  [a[2][0] - b[2][0], a[2][1] - b[2][1], a[2][2] - b[2][2]]
];
export const matrixMultiply3x3 = (a, b) => {
  const result = Array(3).fill(null).map(() => Array(3).fill(0));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
};
export const determinant3x3 = (a) => {
  return a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) -
         a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) +
         a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
};
export const transpose3x3 = (a) => [
  [a[0][0], a[1][0], a[2][0]],
  [a[0][1], a[1][1], a[2][1]],
  [a[0][2], a[1][2], a[2][2]]
];
export const matrixApplyToVector3D = (m, v) => ({
  x: m[0][0] * v.x + m[0][1] * v.y + m[0][2] * (v.z || 0),
  y: m[1][0] * v.x + m[1][1] * v.y + m[1][2] * (v.z || 0),
  z: m[2][0] * v.x + m[2][1] * v.y + m[2][2] * (v.z || 0)
});
export const inverseMatrix3x3 = (a) => {
  const det = determinant3x3(a);
  if (Math.abs(det) < 0.0001) return null;
  
  const invDet = 1 / det;
  return [
    [
      (a[1][1] * a[2][2] - a[1][2] * a[2][1]) * invDet,
      (a[0][2] * a[2][1] - a[0][1] * a[2][2]) * invDet,
      (a[0][1] * a[1][2] - a[0][2] * a[1][1]) * invDet
    ],
    [
      (a[1][2] * a[2][0] - a[1][0] * a[2][2]) * invDet,
      (a[0][0] * a[2][2] - a[0][2] * a[2][0]) * invDet,
      (a[0][2] * a[1][0] - a[0][0] * a[1][2]) * invDet
    ],
    [
      (a[1][0] * a[2][1] - a[1][1] * a[2][0]) * invDet,
      (a[0][1] * a[2][0] - a[0][0] * a[2][1]) * invDet,
      (a[0][0] * a[1][1] - a[0][1] * a[1][0]) * invDet
    ]
  ];
};

// Matrix Operations (4x4)
export const matrixAdd4x4 = (a, b) => [
  [a[0][0] + b[0][0], a[0][1] + b[0][1], a[0][2] + b[0][2], a[0][3] + b[0][3]],
  [a[1][0] + b[1][0], a[1][1] + b[1][1], a[1][2] + b[1][2], a[1][3] + b[1][3]],
  [a[2][0] + b[2][0], a[2][1] + b[2][1], a[2][2] + b[2][2], a[2][3] + b[2][3]],
  [a[3][0] + b[3][0], a[3][1] + b[3][1], a[3][2] + b[3][2], a[3][3] + b[3][3]]
];
export const matrixSubtract4x4 = (a, b) => [
  [a[0][0] - b[0][0], a[0][1] - b[0][1], a[0][2] - b[0][2], a[0][3] - b[0][3]],
  [a[1][0] - b[1][0], a[1][1] - b[1][1], a[1][2] - b[1][2], a[1][3] - b[1][3]],
  [a[2][0] - b[2][0], a[2][1] - b[2][1], a[2][2] - b[2][2], a[2][3] - b[2][3]],
  [a[3][0] - b[3][0], a[3][1] - b[3][1], a[3][2] - b[3][2], a[3][3] - b[3][3]]
];
export const matrixMultiply4x4 = (a, b) => {
  const result = Array(4).fill(null).map(() => Array(4).fill(0));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
};
export const determinant4x4 = (a) => {
  // Use cofactor expansion along first row
  const minor = (row, col) => {
    const m = [];
    for (let i = 0; i < 3; i++) {
      m[i] = [];
      let rIdx = i < row ? i : i + 1;
      for (let j = 0; j < 3; j++) {
        let cIdx = j < col ? j : j + 1;
        m[i][j] = a[rIdx][cIdx];
      }
    }
    return determinant3x3(m);
  };
  
  return a[0][0] * minor(0, 0) - a[0][1] * minor(0, 1) + a[0][2] * minor(0, 2) - a[0][3] * minor(0, 3);
};
export const transpose4x4 = (a) => [
  [a[0][0], a[1][0], a[2][0], a[3][0]],
  [a[0][1], a[1][1], a[2][1], a[3][1]],
  [a[0][2], a[1][2], a[2][2], a[3][2]],
  [a[0][3], a[1][3], a[2][3], a[3][3]]
];
export const matrixApplyToVector4D = (m, v) => {
  // For 4x4 matrices, typically used with homogeneous coordinates (w=1)
  const w = v.w !== undefined ? v.w : 1;
  const x = m[0][0] * v.x + m[0][1] * v.y + m[0][2] * (v.z || 0) + m[0][3] * w;
  const y = m[1][0] * v.x + m[1][1] * v.y + m[1][2] * (v.z || 0) + m[1][3] * w;
  const z = m[2][0] * v.x + m[2][1] * v.y + m[2][2] * (v.z || 0) + m[2][3] * w;
  const wOut = m[3][0] * v.x + m[3][1] * v.y + m[3][2] * (v.z || 0) + m[3][3] * w;
  
  // If w != 1, divide by w (perspective division)
  if (Math.abs(wOut) > 0.0001 && wOut !== 1) {
    return {x: x / wOut, y: y / wOut, z: z / wOut, w: 1};
  }
  return {x, y, z, w: wOut};
};
export const inverseMatrix4x4 = (a) => {
  const det = determinant4x4(a);
  if (Math.abs(det) < 0.0001) return null;
  
  // Compute adjugate matrix (transpose of cofactor matrix)
  const cofactor = (row, col) => {
    const minor = [];
    for (let i = 0; i < 3; i++) {
      minor[i] = [];
      let rIdx = i < row ? i : i + 1;
      for (let j = 0; j < 3; j++) {
        let cIdx = j < col ? j : j + 1;
        minor[i][j] = a[rIdx][cIdx];
      }
    }
    const sign = (row + col) % 2 === 0 ? 1 : -1;
    return sign * determinant3x3(minor);
  };
  
  const adjugate = Array(4).fill(null).map(() => Array(4).fill(0));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      adjugate[j][i] = cofactor(i, j); // Transpose
    }
  }
  
  const invDet = 1 / det;
  return adjugate.map(row => row.map(val => val * invDet));
};

// 3D Transformations
export const rotationX = (angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [[1, 0, 0], [0, cos, -sin], [0, sin, cos]];
};
export const rotationY = (angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [[cos, 0, sin], [0, 1, 0], [-sin, 0, cos]];
};
export const rotationZ = (angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [[cos, -sin, 0], [sin, cos, 0], [0, 0, 1]];
};
export const multiplyMatrices3D = (a, b) => {
  const result = Array(3).fill(null).map(() => Array(3).fill(0));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
};
export const applyMatrix3D = (m, v) => ({
  x: m[0][0] * v.x + m[0][1] * v.y + m[0][2] * v.z,
  y: m[1][0] * v.x + m[1][1] * v.y + m[1][2] * v.z,
  z: m[2][0] * v.x + m[2][1] * v.y + m[2][2] * v.z
});

// Eigenvalues and Eigenvectors
export const eigenvalues2x2 = (m) => {
  // For 2x2 matrix [[a, b], [c, d]]
  // Characteristic equation: λ² - (a+d)λ + (ad - bc) = 0
  const a = m[0][0];
  const b = m[0][1];
  const c = m[1][0];
  const d = m[1][1];
  
  const trace = a + d;
  const det = a * d - b * c;
  
  // λ = (trace ± √(trace² - 4*det)) / 2
  const discriminant = trace * trace - 4 * det;
  
  if (discriminant < 0) {
    // Complex eigenvalues (return real and imaginary parts)
    const real = trace / 2;
    const imag = Math.sqrt(-discriminant) / 2;
    return [
      { real, imag, complex: true },
      { real, imag: -imag, complex: true }
    ];
  }
  
  const sqrtDisc = Math.sqrt(discriminant);
  return [
    { real: (trace + sqrtDisc) / 2, imag: 0, complex: false },
    { real: (trace - sqrtDisc) / 2, imag: 0, complex: false }
  ];
};

export const eigenvector2x2 = (m, eigenvalue) => {
  // Solve (M - λI)v = 0
  const lambda = eigenvalue.real;
  const a = m[0][0] - lambda;
  const b = m[0][1];
  const c = m[1][0];
  const d = m[1][1] - lambda;
  
  // If complex eigenvalue, return null
  if (eigenvalue.complex) {
    return null;
  }
  
  // Find non-zero solution
  let v = null;
  
  if (Math.abs(b) > 1e-10 || Math.abs(a) > 1e-10) {
    // Use first row: a*x + b*y = 0
    if (Math.abs(b) > 1e-10) {
      v = { x: b, y: -a };
    } else {
      v = { x: 1, y: 0 };
    }
  } else if (Math.abs(c) > 1e-10 || Math.abs(d) > 1e-10) {
    // Use second row: c*x + d*y = 0
    if (Math.abs(d) > 1e-10) {
      v = { x: d, y: -c };
    } else {
      v = { x: 0, y: 1 };
    }
  } else {
    // Matrix is λI, any vector works
    v = { x: 1, y: 0 };
  }
  
  // Normalize
  const mag = Math.sqrt(v.x * v.x + v.y * v.y);
  if (mag > 1e-10) {
    return { x: v.x / mag, y: v.y / mag };
  }
  return { x: 1, y: 0 };
};

export const eigenvalues3x3 = (m) => {
  // For 3x3 matrix, solve det(M - λI) = 0
  // Characteristic polynomial: -λ³ + trace*λ² - sum_of_minors*λ + det = 0
  
  const a = m[0][0], b = m[0][1], c = m[0][2];
  const d = m[1][0], e = m[1][1], f = m[1][2];
  const g = m[2][0], h = m[2][1], i = m[2][2];
  
  const trace = a + e + i;
  
  // Sum of 2x2 principal minors
  const minorSum = (a * e - b * d) + (a * i - c * g) + (e * i - f * h);
  
  const det = determinant3x3(m);
  
  // Use Newton's method to find one real root
  let lambda1 = trace / 3;
  for (let iter = 0; iter < 100; iter++) {
    const lambda2 = lambda1 * lambda1;
    const lambda3 = lambda2 * lambda1;
    const f = -lambda3 + trace * lambda2 - minorSum * lambda1 + det;
    const fPrime = -3 * lambda2 + 2 * trace * lambda1 - minorSum;
    if (Math.abs(fPrime) < 1e-10) break;
    const newLambda = lambda1 - f / fPrime;
    if (Math.abs(newLambda - lambda1) < 1e-10) break;
    lambda1 = newLambda;
  }
  
  // Factor out (λ - lambda1) to get quadratic
  // For cubic: -λ³ + c₂λ² - c₁λ + c₀ = -(λ - λ₁)(λ² + pλ + q)
  // After factoring, solve quadratic for remaining eigenvalues
  // Simplified: use trace and determinant relationships
  const remainingTrace = trace - lambda1;
  const remainingDet = det / lambda1; // Approximate
  
  const disc = remainingTrace * remainingTrace - 4 * remainingDet;
  if (disc < 0) {
    const real = remainingTrace / 2;
    const imag = Math.sqrt(-disc) / 2;
    return [
      { real: lambda1, imag: 0, complex: false },
      { real, imag, complex: true },
      { real, imag: -imag, complex: true }
    ];
  }
  
  const sqrtDisc = Math.sqrt(disc);
  return [
    { real: lambda1, imag: 0, complex: false },
    { real: (remainingTrace + sqrtDisc) / 2, imag: 0, complex: false },
    { real: (remainingTrace - sqrtDisc) / 2, imag: 0, complex: false }
  ];
};

export const eigenvector3x3 = (m, eigenvalue) => {
  const lambda = eigenvalue.real;
  
  if (eigenvalue.complex) {
    return null;
  }
  
  // Solve (M - λI)v = 0
  const a = m[0][0] - lambda;
  const b = m[0][1];
  const c = m[0][2];
  const d = m[1][0];
  const e = m[1][1] - lambda;
  const f = m[1][2];
  const g = m[2][0];
  const h = m[2][1];
  const i = m[2][2] - lambda;
  
  // Use cross product of two rows to find null space
  const row1 = { x: a, y: b, z: c };
  const row2 = { x: d, y: e, z: f };
  const row3 = { x: g, y: h, z: i };
  
  // Try cross products
  let v = crossProduct3D(row1, row2);
  let mag = magnitude3D(v);
  
  if (mag < 1e-10) {
    v = crossProduct3D(row1, row3);
    mag = magnitude3D(v);
  }
  
  if (mag < 1e-10) {
    v = crossProduct3D(row2, row3);
    mag = magnitude3D(v);
  }
  
  if (mag < 1e-10) {
    // All rows are linearly dependent, use standard basis
    v = { x: 1, y: 0, z: 0 };
    mag = 1;
  }
  
  return normalize3D(v);
};

// Matrix Rank
export const matrixRank = (m) => {
  // Rank is the number of linearly independent rows/columns
  // Use Gaussian elimination to find rank
  
  if (!m || m.length === 0) return 0;
  
  const rows = m.length;
  const cols = m[0].length;
  
  // Create a copy to avoid modifying original
  const matrix = m.map(row => [...row]);
  
  let rank = 0;
  let row = 0;
  let col = 0;
  
  // Gaussian elimination
  while (row < rows && col < cols) {
    // Find pivot (non-zero element)
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
};

export const matrixRank2x2 = (m) => {
  return matrixRank(m);
};

export const matrixRank3x3 = (m) => {
  return matrixRank(m);
};

export const matrixRank4x4 = (m) => {
  return matrixRank(m);
};

