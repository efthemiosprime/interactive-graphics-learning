// 3D Transformation Matrix Utilities

/**
 * Create a 4x4 identity matrix
 */
export const identity4x4 = () => [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
];

/**
 * Create a 3x3 rotation matrix around X-axis
 */
export const rotationX = (angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    [1, 0, 0],
    [0, cos, -sin],
    [0, sin, cos]
  ];
};

/**
 * Create a 3x3 rotation matrix around Y-axis
 */
export const rotationY = (angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    [cos, 0, sin],
    [0, 1, 0],
    [-sin, 0, cos]
  ];
};

/**
 * Create a 3x3 rotation matrix around Z-axis
 */
export const rotationZ = (angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    [cos, -sin, 0],
    [sin, cos, 0],
    [0, 0, 1]
  ];
};

/**
 * Create a 4x4 translation matrix
 */
export const translation = (tx, ty, tz) => [
  [1, 0, 0, tx],
  [0, 1, 0, ty],
  [0, 0, 1, tz],
  [0, 0, 0, 1]
];

/**
 * Create a 3x3 scale matrix
 */
export const scale = (sx, sy, sz) => [
  [sx, 0, 0],
  [0, sy, 0],
  [0, 0, sz]
];

/**
 * Create a 4x4 scale matrix
 */
export const scale4x4 = (sx, sy, sz) => [
  [sx, 0, 0, 0],
  [0, sy, 0, 0],
  [0, 0, sz, 0],
  [0, 0, 0, 1]
];

/**
 * Multiply two 3x3 matrices
 */
export const multiply3x3 = (a, b) => {
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

/**
 * Multiply two 4x4 matrices
 */
export const multiply4x4 = (a, b) => {
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

/**
 * Apply a 3x3 matrix to a 3D vector
 */
export const applyMatrix3D = (m, v) => ({
  x: m[0][0] * v.x + m[0][1] * v.y + m[0][2] * v.z,
  y: m[1][0] * v.x + m[1][1] * v.y + m[1][2] * v.z,
  z: m[2][0] * v.x + m[2][1] * v.y + m[2][2] * v.z
});

/**
 * Apply a 4x4 matrix to a 3D vector (homogeneous coordinates)
 */
export const applyMatrix4D = (m, v) => {
  const w = m[3][0] * v.x + m[3][1] * v.y + m[3][2] * v.z + m[3][3];
  return {
    x: (m[0][0] * v.x + m[0][1] * v.y + m[0][2] * v.z + m[0][3]) / w,
    y: (m[1][0] * v.x + m[1][1] * v.y + m[1][2] * v.z + m[1][3]) / w,
    z: (m[2][0] * v.x + m[2][1] * v.y + m[2][2] * v.z + m[2][3]) / w
  };
};

/**
 * Combine rotations (Euler angles) - ZYX order
 */
export const combineRotations = (rx, ry, rz) => {
  let combined = rotationX(rx);
  combined = multiply3x3(combined, rotationY(ry));
  combined = multiply3x3(combined, rotationZ(rz));
  return combined;
};

/**
 * Create a look-at matrix (camera)
 */
export const lookAt = (eye, target, up) => {
  const z = normalize({
    x: eye.x - target.x,
    y: eye.y - target.y,
    z: eye.z - target.z
  });
  const x = normalize(cross(up, z));
  const y = cross(z, x);
  
  return [
    [x.x, x.y, x.z, -dot(x, eye)],
    [y.x, y.y, y.z, -dot(y, eye)],
    [z.x, z.y, z.z, -dot(z, eye)],
    [0, 0, 0, 1]
  ];
};

/**
 * Create a perspective projection matrix
 */
export const perspective = (fov, aspect, near, far) => {
  const f = 1.0 / Math.tan(fov / 2);
  const rangeInv = 1.0 / (near - far);
  
  return [
    [f / aspect, 0, 0, 0],
    [0, f, 0, 0],
    [0, 0, (near + far) * rangeInv, 2 * near * far * rangeInv],
    [0, 0, -1, 0]
  ];
};

/**
 * Create an orthographic projection matrix
 */
export const orthographic = (left, right, bottom, top, near, far) => {
  const lr = 1 / (left - right);
  const bt = 1 / (bottom - top);
  const nf = 1 / (near - far);
  
  return [
    [-2 * lr, 0, 0, (left + right) * lr],
    [0, -2 * bt, 0, (bottom + top) * bt],
    [0, 0, 2 * nf, (near + far) * nf],
    [0, 0, 0, 1]
  ];
};

/**
 * Helper functions
 */
const normalize = (v) => {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  return mag === 0 ? { x: 0, y: 0, z: 0 } : { x: v.x / mag, y: v.y / mag, z: v.z / mag };
};

const cross = (a, b) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x
});

const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;

/**
 * Convert Euler angles to quaternion (for smooth rotations)
 */
export const eulerToQuaternion = (rx, ry, rz) => {
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
};

/**
 * Convert quaternion to rotation matrix
 */
export const quaternionToMatrix = (q) => {
  const { w, x, y, z } = q;
  return [
    [1 - 2*(y*y + z*z), 2*(x*y - w*z), 2*(x*z + w*y)],
    [2*(x*y + w*z), 1 - 2*(x*x + z*z), 2*(y*z - w*x)],
    [2*(x*z - w*y), 2*(y*z + w*x), 1 - 2*(x*x + y*y)]
  ];
};

/**
 * Project 3D point to 2D screen coordinates (isometric projection)
 */
export const project3D = (v, centerX = 0, centerY = 0, scale = 1) => {
  const s = scale;
  const x = (v.x - v.z) * Math.cos(Math.PI / 6) * s;
  const y = v.y * s - (v.x + v.z) * Math.sin(Math.PI / 6) * s;
  return { x: centerX + x, y: centerY - y };
};

