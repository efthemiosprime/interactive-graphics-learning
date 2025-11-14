// Formulas for 3D Transformations

export const getTransformFormulas = (transformType, params) => {
  const formulas = {
    rotation: {
      title: 'Rotation Formulas',
      formulas: [
        {
          name: 'Rotation Matrix X-axis',
          formula: 'R_x(θ) = [[1, 0, 0], [0, cos(θ), -sin(θ)], [0, sin(θ), cos(θ)]]',
          description: 'Rotates around X-axis by angle θ',
          values: params && params.rx !== undefined ? `R_x(${(params.rx * 180 / Math.PI).toFixed(2)}°)` : 'R_x(θ)'
        },
        {
          name: 'Rotation Matrix Y-axis',
          formula: 'R_y(θ) = [[cos(θ), 0, sin(θ)], [0, 1, 0], [-sin(θ), 0, cos(θ)]]',
          description: 'Rotates around Y-axis by angle θ',
          values: params && params.ry !== undefined ? `R_y(${(params.ry * 180 / Math.PI).toFixed(2)}°)` : 'R_y(θ)'
        },
        {
          name: 'Rotation Matrix Z-axis',
          formula: 'R_z(θ) = [[cos(θ), -sin(θ), 0], [sin(θ), cos(θ), 0], [0, 0, 1]]',
          description: 'Rotates around Z-axis by angle θ',
          values: params && params.rz !== undefined ? `R_z(${(params.rz * 180 / Math.PI).toFixed(2)}°)` : 'R_z(θ)'
        },
        {
          name: 'Combined Rotation (ZYX Euler)',
          formula: 'R = R_z(γ) × R_y(β) × R_x(α)',
          description: 'Combines rotations in ZYX order',
          values: params && params.rx !== undefined && params.ry !== undefined && params.rz !== undefined
            ? `R = R_z(${(params.rz * 180 / Math.PI).toFixed(2)}°) × R_y(${(params.ry * 180 / Math.PI).toFixed(2)}°) × R_x(${(params.rx * 180 / Math.PI).toFixed(2)}°)` 
            : 'R = R_z(γ) × R_y(β) × R_x(α)'
        },
        {
          name: 'Apply Rotation to Vector',
          formula: 'v\' = R × v',
          description: 'Transforms vector v by rotation matrix R',
          values: 'v\' = R × v'
        }
      ]
    },
    translation: {
      title: 'Translation Formulas',
      formulas: [
        {
          name: 'Translation Matrix',
          formula: 'T(tx, ty, tz) = [[1, 0, 0, tx], [0, 1, 0, ty], [0, 0, 1, tz], [0, 0, 0, 1]]',
          description: '4x4 homogeneous translation matrix',
          values: params && params.tx !== undefined && params.ty !== undefined && params.tz !== undefined 
            ? `T(${params.tx.toFixed(2)}, ${params.ty.toFixed(2)}, ${params.tz.toFixed(2)})` 
            : 'T(tx, ty, tz)'
        },
        {
          name: 'Apply Translation',
          formula: '[x\', y\', z\', 1] = T × [x, y, z, 1]',
          description: 'Translates point using homogeneous coordinates',
          values: '[x\', y\', z\', 1] = T × [x, y, z, 1]'
        },
        {
          name: 'Combined Translations',
          formula: 'T_combined = T1 × T2',
          description: 'Compose multiple translations',
          values: 'T_combined = T1 × T2'
        }
      ]
    },
    scaling: {
      title: 'Scaling Formulas',
      formulas: [
        {
          name: 'Scale Matrix',
          formula: 'S(sx, sy, sz) = [[sx, 0, 0], [0, sy, 0], [0, 0, sz]]',
          description: '3x3 scale matrix (non-uniform)',
          values: params && params.sx !== undefined && params.sy !== undefined && params.sz !== undefined
            ? `S(${params.sx.toFixed(2)}, ${params.sy.toFixed(2)}, ${params.sz.toFixed(2)})` 
            : 'S(sx, sy, sz)'
        },
        {
          name: 'Uniform Scaling',
          formula: 'S(s) = s × I',
          description: 'When sx = sy = sz = s',
          values: params && params.sx !== undefined && params.sx === params.sy && params.sy === params.sz 
            ? `S(${params.sx.toFixed(2)})` 
            : 'S(s)'
        },
        {
          name: 'Apply Scaling',
          formula: 'v\' = S × v',
          description: 'Scales vector v by scale matrix S',
          values: 'v\' = S × v'
        }
      ]
    },
    projection: {
      title: 'Projection Formulas',
      formulas: [
        {
          name: 'Perspective Projection',
          formula: 'x\' = (x × f) / (z × aspect), y\' = (y × f) / z, f = 1/tan(FOV/2)',
          description: 'Perspective projection with field of view',
          values: params && params.fov !== undefined && params.aspect !== undefined
            ? `f = ${(1 / Math.tan(params.fov / 2)).toFixed(4)}, aspect = ${params.aspect.toFixed(2)}` 
            : 'f = 1/tan(FOV/2)'
        },
        {
          name: 'Orthographic Projection',
          formula: 'x\' = (2x - (left+right)) / (right-left), y\' = (2y - (bottom+top)) / (top-bottom)',
          description: 'Orthographic (parallel) projection',
          values: params && params.left !== undefined && params.right !== undefined && params.bottom !== undefined && params.top !== undefined
            ? `left=${params.left.toFixed(1)}, right=${params.right.toFixed(1)}, bottom=${params.bottom.toFixed(1)}, top=${params.top.toFixed(1)}` 
            : 'Orthographic bounds'
        },
        {
          name: 'Perspective Matrix',
          formula: 'P = [[f/aspect, 0, 0, 0], [0, f, 0, 0], [0, 0, (n+f)/(n-f), 2nf/(n-f)], [0, 0, -1, 0]]',
          description: '4x4 perspective projection matrix',
          values: 'P = perspective(FOV, aspect, near, far)'
        }
      ]
    },
    quaternions: {
      title: 'Quaternion Formulas',
      formulas: [
        {
          name: 'Rotation Quaternion',
          formula: 'q = [cos(θ/2), ax·sin(θ/2), ay·sin(θ/2), az·sin(θ/2)]',
          description: 'Quaternion from axis-angle representation',
          values: 'q = [w, x, y, z] where |q| = 1'
        },
        {
          name: 'Quaternion Multiplication',
          formula: 'q1 × q2 = [w1w2 - v1·v2, w1v2 + w2v1 + v1×v2]',
          description: 'Compose rotations using quaternion multiplication',
          values: 'q_result = q1 × q2'
        },
        {
          name: 'SLERP (Spherical Linear Interpolation)',
          formula: 'slerp(q1, q2, t) = (sin((1-t)Ω)/sin(Ω))q1 + (sin(tΩ)/sin(Ω))q2',
          description: 'Smooth interpolation between quaternions',
          values: 'Ω = arccos(q1·q2)'
        }
      ]
    },
    camera: {
      title: 'Camera Formulas',
      formulas: [
        {
          name: 'Look-At Direction',
          formula: 'z = normalize(eye - target)',
          description: 'Forward vector (camera looks along -z)',
          values: params && params.eye && params.eye.x !== undefined && params.eye.y !== undefined && params.eye.z !== undefined
            ? `z = normalize(${params.eye.x.toFixed(2)}, ${params.eye.y.toFixed(2)}, ${params.eye.z.toFixed(2)} - target)` 
            : 'z = normalize(eye - target)'
        },
        {
          name: 'Right Vector',
          formula: 'x = normalize(up × z)',
          description: 'Right vector (camera\'s right side)',
          values: 'x = normalize(up × z)'
        },
        {
          name: 'Up Vector',
          formula: 'y = z × x',
          description: 'Up vector (camera\'s up direction)',
          values: 'y = z × x'
        },
        {
          name: 'View Matrix',
          formula: 'V = [[x.x, x.y, x.z, -dot(x,eye)], [y.x, y.y, y.z, -dot(y,eye)], [z.x, z.y, z.z, -dot(z,eye)], [0,0,0,1]]',
          description: 'View matrix from look-at calculation',
          values: 'V = lookAt(eye, target, up)'
        }
      ]
    }
  };

  return formulas[transformType] || { title: 'Formulas', formulas: [] };
};

