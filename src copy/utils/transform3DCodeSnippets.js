// JavaScript code snippets for 3D Transformations

export const getTransformCodeSnippet = (transformType, params) => {
  const snippets = {
    rotation: {
      title: 'Rotation Code',
      code: `// Create rotation matrices for each axis
const rotationX = (angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    [1, 0, 0],
    [0, cos, -sin],
    [0, sin, cos]
  ];
};

const rotationY = (angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    [cos, 0, sin],
    [0, 1, 0],
    [-sin, 0, cos]
  ];
};

const rotationZ = (angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [
    [cos, -sin, 0],
    [sin, cos, 0],
    [0, 0, 1]
  ];
};

// Combine rotations (ZYX Euler order)
const combineRotations = (rx, ry, rz) => {
  let combined = rotationX(rx);
  combined = multiplyMatrices3D(combined, rotationY(ry));
  combined = multiplyMatrices3D(combined, rotationZ(rz));
  return combined;
};

// Apply rotation to a 3D vector
const applyRotation = (matrix, vector) => ({
  x: matrix[0][0] * vector.x + matrix[0][1] * vector.y + matrix[0][2] * vector.z,
  y: matrix[1][0] * vector.x + matrix[1][1] * vector.y + matrix[1][2] * vector.z,
  z: matrix[2][0] * vector.x + matrix[2][1] * vector.y + matrix[2][2] * vector.z
});

// Usage
const rotationMatrix = combineRotations(
  ${params && params.rx !== undefined ? (params.rx * 180 / Math.PI).toFixed(2) : '0'} * Math.PI / 180, // X rotation
  ${params && params.ry !== undefined ? (params.ry * 180 / Math.PI).toFixed(2) : '0'} * Math.PI / 180, // Y rotation
  ${params && params.rz !== undefined ? (params.rz * 180 / Math.PI).toFixed(2) : '0'} * Math.PI / 180  // Z rotation
);
const rotatedVector = applyRotation(rotationMatrix, { x: 1, y: 0, z: 0 });`
    },
    translation: {
      title: 'Translation Code',
      code: `// Create 4x4 translation matrix (homogeneous coordinates)
const translation = (tx, ty, tz) => [
  [1, 0, 0, tx],
  [0, 1, 0, ty],
  [0, 0, 1, tz],
  [0, 0, 0, 1]
];

// Apply translation to a 3D point
const applyTranslation = (matrix, point) => {
  const w = matrix[3][0] * point.x + matrix[3][1] * point.y + 
            matrix[3][2] * point.z + matrix[3][3];
  return {
    x: (matrix[0][0] * point.x + matrix[0][1] * point.y + 
        matrix[0][2] * point.z + matrix[0][3]) / w,
    y: (matrix[1][0] * point.x + matrix[1][1] * point.y + 
        matrix[1][2] * point.z + matrix[1][3]) / w,
    z: (matrix[2][0] * point.x + matrix[2][1] * point.y + 
        matrix[2][2] * point.z + matrix[2][3]) / w
  };
};

// Usage
const translationMatrix = translation(
  ${params && params.tx !== undefined ? params.tx.toFixed(2) : '0'}, // X translation
  ${params && params.ty !== undefined ? params.ty.toFixed(2) : '0'}, // Y translation
  ${params && params.tz !== undefined ? params.tz.toFixed(2) : '0'}  // Z translation
);
const translatedPoint = applyTranslation(translationMatrix, { x: 1, y: 1, z: 1 });`
    },
    scaling: {
      title: 'Scaling Code',
      code: `// Create 3x3 scale matrix
const scale = (sx, sy, sz) => [
  [sx, 0, 0],
  [0, sy, 0],
  [0, 0, sz]
];

// Apply scaling to a 3D vector
const applyScaling = (matrix, vector) => ({
  x: matrix[0][0] * vector.x + matrix[0][1] * vector.y + matrix[0][2] * vector.z,
  y: matrix[1][0] * vector.x + matrix[1][1] * vector.y + matrix[1][2] * vector.z,
  z: matrix[2][0] * vector.x + matrix[2][1] * vector.y + matrix[2][2] * vector.z
});

// Usage
const scaleMatrix = scale(
  ${params && params.sx !== undefined ? params.sx.toFixed(2) : '1'}, // X scale
  ${params && params.sy !== undefined ? params.sy.toFixed(2) : '1'}, // Y scale
  ${params && params.sz !== undefined ? params.sz.toFixed(2) : '1'}  // Z scale
);
const scaledVector = applyScaling(scaleMatrix, { x: 1, y: 1, z: 1 });

// Uniform scaling (all axes same)
const uniformScale = (s) => scale(s, s, s);`
    },
    projection: {
      title: 'Projection Code',
      code: `// Perspective projection matrix
const perspective = (fov, aspect, near, far) => {
  const f = 1.0 / Math.tan(fov / 2);
  const rangeInv = 1.0 / (near - far);
  
  return [
    [f / aspect, 0, 0, 0],
    [0, f, 0, 0],
    [0, 0, (near + far) * rangeInv, 2 * near * far * rangeInv],
    [0, 0, -1, 0]
  ];
};

// Orthographic projection matrix
const orthographic = (left, right, bottom, top, near, far) => {
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

// Apply projection to a 3D point
const applyProjection = (matrix, point) => {
  const w = matrix[3][0] * point.x + matrix[3][1] * point.y + 
            matrix[3][2] * point.z + matrix[3][3];
  return {
    x: (matrix[0][0] * point.x + matrix[0][1] * point.y + 
        matrix[0][2] * point.z + matrix[0][3]) / w,
    y: (matrix[1][0] * point.x + matrix[1][1] * point.y + 
        matrix[1][2] * point.z + matrix[1][3]) / w,
    z: (matrix[2][0] * point.x + matrix[2][1] * point.y + 
        matrix[2][2] * point.z + matrix[2][3]) / w
  };
};

// Usage - Perspective
${params && params.fov !== undefined && params.aspect !== undefined && params.near !== undefined && params.far !== undefined ? `const perspectiveMatrix = perspective(
  ${params.fov.toFixed(4)}, // FOV in radians
  ${params.aspect.toFixed(2)}, // Aspect ratio
  ${params.near.toFixed(2)}, // Near plane
  ${params.far.toFixed(2)}  // Far plane
);` : 'const perspectiveMatrix = perspective(Math.PI / 4, 1.0, 0.1, 100);'}

// Usage - Orthographic
${params && params.left !== undefined && params.right !== undefined && params.bottom !== undefined && params.top !== undefined && params.near !== undefined && params.far !== undefined ? `const orthographicMatrix = orthographic(
  ${params.left.toFixed(1)}, // Left
  ${params.right.toFixed(1)}, // Right
  ${params.bottom.toFixed(1)}, // Bottom
  ${params.top.toFixed(1)}, // Top
  ${params.near.toFixed(1)}, // Near
  ${params.far.toFixed(1)}  // Far
);` : 'const orthographicMatrix = orthographic(-5, 5, -5, 5, -10, 10);'}`
    },
    quaternions: {
      title: 'Quaternion Code',
      code: `// Convert Euler angles to quaternion
const eulerToQuaternion = (rx, ry, rz) => {
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

// Convert quaternion to rotation matrix
const quaternionToMatrix = (q) => {
  const { w, x, y, z } = q;
  return [
    [1 - 2*(y*y + z*z), 2*(x*y - w*z), 2*(x*z + w*y)],
    [2*(x*y + w*z), 1 - 2*(x*x + z*z), 2*(y*z - w*x)],
    [2*(x*z - w*y), 2*(y*z + w*x), 1 - 2*(x*x + y*y)]
  ];
};

// Quaternion multiplication (compose rotations)
const multiplyQuaternions = (q1, q2) => {
  return {
    w: q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z,
    x: q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,
    y: q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,
    z: q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w
  };
};

// Spherical Linear Interpolation (SLERP)
const slerp = (q1, q2, t) => {
  const dot = q1.w * q2.w + q1.x * q2.x + q1.y * q2.y + q1.z * q2.z;
  const omega = Math.acos(Math.max(-1, Math.min(1, dot)));
  const sinOmega = Math.sin(omega);
  
  if (Math.abs(sinOmega) < 0.0001) {
    // Quaternions are very close, use linear interpolation
    return {
      w: q1.w + t * (q2.w - q1.w),
      x: q1.x + t * (q2.x - q1.x),
      y: q1.y + t * (q2.y - q1.y),
      z: q1.z + t * (q2.z - q1.z)
    };
  }
  
  const s1 = Math.sin((1 - t) * omega) / sinOmega;
  const s2 = Math.sin(t * omega) / sinOmega;
  
  return {
    w: s1 * q1.w + s2 * q2.w,
    x: s1 * q1.x + s2 * q2.x,
    y: s1 * q1.y + s2 * q2.y,
    z: s1 * q1.z + s2 * q2.z
  };
};

// Usage
const quaternion = { w: 1, x: 0, y: 0, z: 0 }; // Identity quaternion
const rotationMatrix = quaternionToMatrix(quaternion);
const rotatedVector = applyRotation(rotationMatrix, { x: 1, y: 0, z: 0 });`
    },
    camera: {
      title: 'Camera Code',
      code: `// Calculate look-at view matrix
const lookAt = (eye, target, up) => {
  // Forward vector (camera looks along -z)
  const z = normalize({
    x: eye.x - target.x,
    y: eye.y - target.y,
    z: eye.z - target.z
  });
  
  // Right vector
  const x = normalize(cross(up, z));
  
  // Up vector
  const y = cross(z, x);
  
  return [
    [x.x, x.y, x.z, -dot(x, eye)],
    [y.x, y.y, y.z, -dot(y, eye)],
    [z.x, z.y, z.z, -dot(z, eye)],
    [0, 0, 0, 1]
  ];
};

// Helper functions
const normalize = (v) => {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  return mag === 0 ? { x: 0, y: 0, z: 0 } : 
    { x: v.x / mag, y: v.y / mag, z: v.z / mag };
};

const cross = (a, b) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x
});

const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;

// Usage
${params && params.eye && params.eye.x !== undefined && params.eye.y !== undefined && params.eye.z !== undefined ? `const viewMatrix = lookAt(
  { x: ${params.eye.x.toFixed(2)}, y: ${params.eye.y.toFixed(2)}, z: ${params.eye.z.toFixed(2)} }, // Eye position
  { x: 0, y: 0, z: 0 }, // Target (looking at origin)
  { x: 0, y: 1, z: 0 }  // Up vector
);` : `const viewMatrix = lookAt(
  { x: 5, y: 5, z: 5 }, // Eye position
  { x: 0, y: 0, z: 0 }, // Target (looking at origin)
  { x: 0, y: 1, z: 0 }  // Up vector
);`}

// Apply view matrix to transform world coordinates to camera space
const cameraSpacePoint = applyMatrix4D(viewMatrix, worldPoint);`
    }
  };

  return snippets[transformType] || { title: 'Code Snippet', code: '// No code available for this transformation type' };
};

