// Mathematical Concepts for 3D Transformations

export const getTransformMathConcepts = (transformType) => {
  const concepts = {
    rotation: {
      title: 'Mathematical Concepts - Rotation',
      concepts: [
        {
          name: 'Orthogonal Matrices',
          description: 'Rotation matrices are orthogonal: R^T × R = I. This preserves distances and angles.',
          formula: 'R^T × R = I (Identity matrix)'
        },
        {
          name: 'Determinant',
          description: 'Rotation matrices have determinant = 1 (preserves orientation) or -1 (reflects).',
          formula: 'det(R) = 1'
        },
        {
          name: 'Euler Angles',
          description: 'Three angles (α, β, γ) representing rotations around X, Y, Z axes. Order matters.',
          formula: 'R = R_z(γ) × R_y(β) × R_x(α)'
        },
        {
          name: 'Gimbal Lock',
          description: 'Loss of one degree of freedom when two rotation axes align (β = ±90°).',
          formula: 'Occurs when β = ±90° in ZYX order'
        },
        {
          name: 'Composition',
          description: 'Multiple rotations combine via matrix multiplication. Order matters: R1 × R2 applies R2 first.',
          formula: 'R_combined = R1 × R2'
        }
      ]
    },
    translation: {
      title: 'Mathematical Concepts - Translation',
      concepts: [
        {
          name: 'Homogeneous Coordinates',
          description: 'Adding w=1 coordinate allows translation as matrix multiplication. Enables composition.',
          formula: '[x, y, z, 1] → homogeneous coordinates'
        },
        {
          name: 'Affine Transformation',
          description: 'Translation is an affine transformation: preserves lines and parallelism, but not distances from origin.',
          formula: 'T(v) = v + t (vector addition)'
        },
        {
          name: 'Matrix Composition',
          description: 'Translations compose via matrix multiplication. Order matters: T1 × T2 applies T2 first.',
          formula: 'T_combined = T1 × T2'
        },
        {
          name: 'Inverse Translation',
          description: 'Inverse translation moves by negative vector: T^(-1)(tx, ty, tz) = T(-tx, -ty, -tz).',
          formula: 'T^(-1) = T(-tx, -ty, -tz)'
        }
      ]
    },
    scaling: {
      title: 'Mathematical Concepts - Scaling',
      concepts: [
        {
          name: 'Linear Transformation',
          description: 'Scaling is a linear transformation: S(av + bw) = aS(v) + bS(w).',
          formula: 'S(av + bw) = aS(v) + bS(w)'
        },
        {
          name: 'Uniform Scaling',
          description: 'When sx = sy = sz, scaling is uniform. Preserves angles and shape.',
          formula: 'S(s, s, s) = s × I'
        },
        {
          name: 'Non-Uniform Scaling',
          description: 'Different scale factors stretch/compress along axes. Changes shape but preserves lines.',
          formula: 'S(sx, sy, sz) where sx ≠ sy ≠ sz'
        },
        {
          name: 'Inverse Scaling',
          description: 'Inverse scaling uses reciprocal factors: S^(-1)(sx, sy, sz) = S(1/sx, 1/sy, 1/sz).',
          formula: 'S^(-1) = S(1/sx, 1/sy, 1/sz)'
        },
        {
          name: 'Volume Scaling',
          description: 'Volume scales by product of scale factors: V\' = sx × sy × sz × V.',
          formula: 'V\' = det(S) × V = sx × sy × sz × V'
        }
      ]
    },
    projection: {
      title: 'Mathematical Concepts - Projection',
      concepts: [
        {
          name: 'Perspective Division',
          description: 'Perspective projection divides by z (depth). Objects farther away appear smaller.',
          formula: 'x\' = x/z, y\' = y/z (after scaling by focal length)'
        },
        {
          name: 'Field of View (FOV)',
          description: 'Angle defining visible cone. Larger FOV = wider view, more distortion.',
          formula: 'FOV = 2 × arctan(height / (2 × focal_length))'
        },
        {
          name: 'Aspect Ratio',
          description: 'Width/height ratio. Must match viewport to avoid distortion.',
          formula: 'aspect = width / height'
        },
        {
          name: 'Near/Far Planes',
          description: 'Clipping planes. Objects outside [near, far] are clipped (not rendered).',
          formula: 'near ≤ z ≤ far'
        },
        {
          name: 'View Frustum',
          description: 'Truncated pyramid (perspective) or box (orthographic) defining visible region.',
          formula: 'Frustum = {points where near ≤ z ≤ far and in view cone}'
        }
      ]
    },
    quaternions: {
      title: 'Mathematical Concepts - Quaternions',
      concepts: [
        {
          name: 'Unit Quaternion',
          description: 'Quaternion with magnitude 1. Represents rotation without scaling.',
          formula: '|q| = √(w² + x² + y² + z²) = 1'
        },
        {
          name: 'Quaternion Conjugate',
          description: 'Conjugate reverses rotation: q* = [w, -x, -y, -z]. q × q* = [1, 0, 0, 0].',
          formula: 'q* = [w, -x, -y, -z]'
        },
        {
          name: 'Quaternion Inverse',
          description: 'For unit quaternions, inverse equals conjugate: q^(-1) = q*.',
          formula: 'q^(-1) = q* (for unit quaternions)'
        },
        {
          name: 'SLERP',
          description: 'Spherical Linear Interpolation follows shortest path on unit sphere. Smooth rotation interpolation.',
          formula: 'slerp(q1, q2, t) = (sin((1-t)Ω)/sin(Ω))q1 + (sin(tΩ)/sin(Ω))q2'
        },
        {
          name: 'Quaternion to Matrix',
          description: 'Convert quaternion to rotation matrix for use in graphics pipelines.',
          formula: 'R = quaternionToMatrix(q)'
        }
      ]
    },
    camera: {
      title: 'Mathematical Concepts - Camera',
      concepts: [
        {
          name: 'Camera Coordinate System',
          description: 'Right-handed system: x=right, y=up, z=backward (camera looks along -z).',
          formula: 'x = right, y = up, z = -forward'
        },
        {
          name: 'Look-At Calculation',
          description: 'Compute orthonormal basis from eye, target, and up vectors.',
          formula: 'z = normalize(eye - target), x = normalize(up × z), y = z × x'
        },
        {
          name: 'View Matrix',
          description: 'Transforms world coordinates to camera coordinates. Inverse of camera transformation.',
          formula: 'V = [[x.x, x.y, x.z, -dot(x,eye)], [y.x, y.y, y.z, -dot(y,eye)], [z.x, z.y, z.z, -dot(z,eye)], [0,0,0,1]]'
        },
        {
          name: 'Camera Types',
          description: 'FPS: yaw (Y-axis) + pitch (X-axis). Orbit: spherical coordinates around target.',
          formula: 'FPS: R = R_y(yaw) × R_x(pitch). Orbit: spherical coordinates (r, θ, φ)'
        }
      ]
    }
  };

  return concepts[transformType] || { title: 'Mathematical Concepts', concepts: [] };
};

