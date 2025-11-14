// Step-by-step explanations for 3D Transformations

export const getTransformStepByStep = (transformType, params) => {
  if (!params) return null;
  
  const steps = {
    rotation: {
      explanation: 'Rotation transforms points around an axis in 3D space. We combine rotations around X, Y, and Z axes using Euler angles (ZYX order).',
      steps: [
        {
          title: 'Step 1: Create Rotation Matrix for X-axis',
          formula: `R_x(${params.rx !== undefined ? (params.rx * 180 / Math.PI).toFixed(2) : '0'}°) = [[1, 0, 0], [0, cos(${params.rx !== undefined ? (params.rx * 180 / Math.PI).toFixed(2) : '0'}°), -sin(${params.rx !== undefined ? (params.rx * 180 / Math.PI).toFixed(2) : '0'}°)], [0, sin(${params.rx !== undefined ? (params.rx * 180 / Math.PI).toFixed(2) : '0'}°), cos(${params.rx !== undefined ? (params.rx * 180 / Math.PI).toFixed(2) : '0'}°)]]`,
          description: `Rotate around X-axis by ${params.rx !== undefined ? (params.rx * 180 / Math.PI).toFixed(2) : '0'} degrees (pitch)`,
          calculation: params.rx !== undefined ? `cos(${(params.rx * 180 / Math.PI).toFixed(2)}°) = ${Math.cos(params.rx).toFixed(4)}, sin(${(params.rx * 180 / Math.PI).toFixed(2)}°) = ${Math.sin(params.rx).toFixed(4)}` : 'No rotation',
          result: params.rx !== undefined ? `R_x = [[1, 0, 0], [0, ${Math.cos(params.rx).toFixed(4)}, ${-Math.sin(params.rx).toFixed(4)}], [0, ${Math.sin(params.rx).toFixed(4)}, ${Math.cos(params.rx).toFixed(4)}]]` : 'Identity matrix'
        },
        {
          title: 'Step 2: Create Rotation Matrix for Y-axis',
          formula: `R_y(${params.ry !== undefined ? (params.ry * 180 / Math.PI).toFixed(2) : '0'}°) = [[cos(${params.ry !== undefined ? (params.ry * 180 / Math.PI).toFixed(2) : '0'}°), 0, sin(${params.ry !== undefined ? (params.ry * 180 / Math.PI).toFixed(2) : '0'}°)], [0, 1, 0], [-sin(${params.ry !== undefined ? (params.ry * 180 / Math.PI).toFixed(2) : '0'}°), 0, cos(${params.ry !== undefined ? (params.ry * 180 / Math.PI).toFixed(2) : '0'}°)]]`,
          description: `Rotate around Y-axis by ${params.ry !== undefined ? (params.ry * 180 / Math.PI).toFixed(2) : '0'} degrees (yaw)`,
          calculation: params.ry !== undefined ? `cos(${(params.ry * 180 / Math.PI).toFixed(2)}°) = ${Math.cos(params.ry).toFixed(4)}, sin(${(params.ry * 180 / Math.PI).toFixed(2)}°) = ${Math.sin(params.ry).toFixed(4)}` : 'No rotation',
          result: params.ry !== undefined ? `R_y = [[${Math.cos(params.ry).toFixed(4)}, 0, ${Math.sin(params.ry).toFixed(4)}], [0, 1, 0], [${-Math.sin(params.ry).toFixed(4)}, 0, ${Math.cos(params.ry).toFixed(4)}]]` : 'Identity matrix'
        },
        {
          title: 'Step 3: Create Rotation Matrix for Z-axis',
          formula: `R_z(${params.rz !== undefined ? (params.rz * 180 / Math.PI).toFixed(2) : '0'}°) = [[cos(${params.rz !== undefined ? (params.rz * 180 / Math.PI).toFixed(2) : '0'}°), -sin(${params.rz !== undefined ? (params.rz * 180 / Math.PI).toFixed(2) : '0'}°), 0], [sin(${params.rz !== undefined ? (params.rz * 180 / Math.PI).toFixed(2) : '0'}°), cos(${params.rz !== undefined ? (params.rz * 180 / Math.PI).toFixed(2) : '0'}°), 0], [0, 0, 1]]`,
          description: `Rotate around Z-axis by ${params.rz !== undefined ? (params.rz * 180 / Math.PI).toFixed(2) : '0'} degrees (roll)`,
          calculation: params.rz !== undefined ? `cos(${(params.rz * 180 / Math.PI).toFixed(2)}°) = ${Math.cos(params.rz).toFixed(4)}, sin(${(params.rz * 180 / Math.PI).toFixed(2)}°) = ${Math.sin(params.rz).toFixed(4)}` : 'No rotation',
          result: params.rz !== undefined ? `R_z = [[${Math.cos(params.rz).toFixed(4)}, ${-Math.sin(params.rz).toFixed(4)}, 0], [${Math.sin(params.rz).toFixed(4)}, ${Math.cos(params.rz).toFixed(4)}, 0], [0, 0, 1]]` : 'Identity matrix'
        },
        {
          title: 'Step 4: Combine Rotations (ZYX Euler Order)',
          formula: 'R_combined = R_z × R_y × R_x',
          description: 'Multiply rotation matrices in ZYX order. Order matters: we apply X rotation first, then Y, then Z.',
          calculation: 'Matrix multiplication: R_z × (R_y × R_x)',
          result: 'The combined rotation matrix transforms points in a single operation'
        },
        {
          title: 'Step 5: Apply to Vector',
          formula: 'v\' = R_combined × v',
          description: 'Multiply the combined rotation matrix by the original vector to get the rotated vector',
          calculation: 'For vector v = (x, y, z), compute: v\' = R_combined × [x, y, z]ᵀ',
          result: 'The result is the rotated vector in 3D space'
        }
      ]
    },
    translation: {
      explanation: 'Translation moves points by a constant offset in 3D space. We use homogeneous coordinates (4x4 matrices) to combine translation with other transformations.',
      steps: [
        {
          title: 'Step 1: Create Translation Matrix',
          formula: `T(${params.tx !== undefined ? params.tx.toFixed(2) : '0'}, ${params.ty !== undefined ? params.ty.toFixed(2) : '0'}, ${params.tz !== undefined ? params.tz.toFixed(2) : '0'}) = [[1, 0, 0, ${params.tx !== undefined ? params.tx.toFixed(2) : '0'}], [0, 1, 0, ${params.ty !== undefined ? params.ty.toFixed(2) : '0'}], [0, 0, 1, ${params.tz !== undefined ? params.tz.toFixed(2) : '0'}], [0, 0, 0, 1]]`,
          description: 'Create a 4x4 homogeneous translation matrix with translation values in the last column',
          calculation: `Translation vector: (${params.tx !== undefined ? params.tx.toFixed(2) : '0'}, ${params.ty !== undefined ? params.ty.toFixed(2) : '0'}, ${params.tz !== undefined ? params.tz.toFixed(2) : '0'})`,
          result: `T = [[1, 0, 0, ${params.tx !== undefined ? params.tx.toFixed(2) : '0'}], [0, 1, 0, ${params.ty !== undefined ? params.ty.toFixed(2) : '0'}], [0, 0, 1, ${params.tz !== undefined ? params.tz.toFixed(2) : '0'}], [0, 0, 0, 1]]`
        },
        {
          title: 'Step 2: Convert Point to Homogeneous Coordinates',
          formula: 'P_homogeneous = [x, y, z, 1]',
          description: 'Add a fourth coordinate (w=1) to convert 3D point to homogeneous coordinates',
          calculation: 'For point P = (x, y, z), create P_h = [x, y, z, 1]',
          result: 'Homogeneous representation allows translation via matrix multiplication'
        },
        {
          title: 'Step 3: Apply Translation Matrix',
          formula: 'P\' = T × P_homogeneous',
          description: 'Multiply translation matrix by homogeneous point',
          calculation: `[x', y', z', 1] = T × [x, y, z, 1]`,
          result: `x' = x + ${params.tx !== undefined ? params.tx.toFixed(2) : '0'}, y' = y + ${params.ty !== undefined ? params.ty.toFixed(2) : '0'}, z' = z + ${params.tz !== undefined ? params.tz.toFixed(2) : '0'}`
        },
        {
          title: 'Step 4: Extract 3D Coordinates',
          formula: 'P\' = (x\', y\', z\')',
          description: 'Extract the first three coordinates from the result (w remains 1)',
          calculation: 'Discard the w coordinate to get the translated 3D point',
          result: 'The translated point in 3D space'
        }
      ]
    },
    scaling: {
      explanation: 'Scaling multiplies coordinates by scale factors. Uniform scaling preserves shape, while non-uniform scaling can stretch or compress along axes.',
      steps: [
        {
          title: 'Step 1: Create Scaling Matrix',
          formula: `S(${params.sx !== undefined ? params.sx.toFixed(2) : '1'}, ${params.sy !== undefined ? params.sy.toFixed(2) : '1'}, ${params.sz !== undefined ? params.sz.toFixed(2) : '1'}) = [[${params.sx !== undefined ? params.sx.toFixed(2) : '1'}, 0, 0], [0, ${params.sy !== undefined ? params.sy.toFixed(2) : '1'}, 0], [0, 0, ${params.sz !== undefined ? params.sz.toFixed(2) : '1'}]]`,
          description: 'Create a 3x3 diagonal matrix with scale factors on the diagonal',
          calculation: `Scale factors: X = ${params.sx !== undefined ? params.sx.toFixed(2) : '1'}, Y = ${params.sy !== undefined ? params.sy.toFixed(2) : '1'}, Z = ${params.sz !== undefined ? params.sz.toFixed(2) : '1'}`,
          result: `S = [[${params.sx !== undefined ? params.sx.toFixed(2) : '1'}, 0, 0], [0, ${params.sy !== undefined ? params.sy.toFixed(2) : '1'}, 0], [0, 0, ${params.sz !== undefined ? params.sz.toFixed(2) : '1'}]]`
        },
        {
          title: 'Step 2: Apply Scaling to Vector',
          formula: 'v\' = S × v',
          description: 'Multiply scaling matrix by the original vector',
          calculation: `[x', y', z'] = S × [x, y, z]`,
          result: `x' = ${params.sx !== undefined ? params.sx.toFixed(2) : '1'} × x, y' = ${params.sy !== undefined ? params.sy.toFixed(2) : '1'} × y, z' = ${params.sz !== undefined ? params.sz.toFixed(2) : '1'} × z`
        },
        {
          title: 'Step 3: Interpret Results',
          formula: 'Scale factor > 1: enlargement, < 1: reduction, < 0: reflection',
          description: 'Understand what the scale factors mean',
          calculation: params.sx !== undefined && params.sy !== undefined && params.sz !== undefined 
            ? `X: ${params.sx.toFixed(2)} ${params.sx > 1 ? '(enlarged)' : params.sx < 1 && params.sx > 0 ? '(reduced)' : '(reflected)'}, Y: ${params.sy.toFixed(2)} ${params.sy > 1 ? '(enlarged)' : params.sy < 1 && params.sy > 0 ? '(reduced)' : '(reflected)'}, Z: ${params.sz.toFixed(2)} ${params.sz > 1 ? '(enlarged)' : params.sz < 1 && params.sz > 0 ? '(reduced)' : '(reflected)'}`
            : 'Scale factors determine size changes',
          result: 'Scaled vector with new dimensions'
        }
      ]
    },
    projection: {
      explanation: params && params.projectionType === 'perspective' 
        ? 'Perspective projection creates realistic depth by making distant objects appear smaller. It uses a field of view (FOV) and clipping planes.'
        : 'Orthographic projection preserves parallel lines and true distances, useful for technical drawings and isometric views.',
      steps: params && params.projectionType === 'perspective' ? [
        {
          title: 'Step 1: Calculate Perspective Projection Matrix',
          formula: `P_perspective = [[cot(FOV/2)/aspect, 0, 0, 0], [0, cot(FOV/2), 0, 0], [0, 0, (far+near)/(near-far), 2×far×near/(near-far)], [0, 0, -1, 0]]`,
          description: 'Create perspective projection matrix using field of view and aspect ratio',
          calculation: `FOV = ${params.fov !== undefined ? (params.fov * 180 / Math.PI).toFixed(2) : '45'}°, aspect = ${params.aspect !== undefined ? params.aspect.toFixed(2) : '1.0'}, near = ${params.near !== undefined ? params.near.toFixed(2) : '0.1'}, far = ${params.far !== undefined ? params.far.toFixed(2) : '100'}`,
          result: 'Perspective matrix transforms 3D points to normalized device coordinates'
        },
        {
          title: 'Step 2: Apply Projection to Point',
          formula: 'P\' = P_perspective × P',
          description: 'Multiply projection matrix by homogeneous 3D point',
          calculation: '[x\', y\', z\', w\'] = P_perspective × [x, y, z, 1]',
          result: 'Projected point in clip space'
        },
        {
          title: 'Step 3: Perspective Divide',
          formula: 'P_NDC = (x\'/w\', y\'/w\', z\'/w\')',
          description: 'Divide by w coordinate to get normalized device coordinates (NDC)',
          calculation: 'This step creates the perspective effect where distant objects appear smaller',
          result: 'Point in normalized device coordinates [-1, 1] range'
        },
        {
          title: 'Step 4: Viewport Transformation',
          formula: 'P_screen = (NDC + 1) / 2 × viewport_size',
          description: 'Transform from NDC to screen coordinates',
          calculation: 'Map from [-1, 1] range to [0, viewport_width/height]',
          result: 'Final screen coordinates for rendering'
        }
      ] : [
        {
          title: 'Step 1: Create Orthographic Projection Matrix',
          formula: `P_ortho = [[2/(right-left), 0, 0, -(right+left)/(right-left)], [0, 2/(top-bottom), 0, -(top+bottom)/(top-bottom)], [0, 0, -2/(far-near), -(far+near)/(far-near)], [0, 0, 0, 1]]`,
          description: 'Create orthographic projection matrix using viewing volume bounds',
          calculation: `left = ${params.left !== undefined ? params.left.toFixed(2) : '-5'}, right = ${params.right !== undefined ? params.right.toFixed(2) : '5'}, bottom = ${params.bottom !== undefined ? params.bottom.toFixed(2) : '-5'}, top = ${params.top !== undefined ? params.top.toFixed(2) : '5'}, near = ${params.near !== undefined ? params.near.toFixed(2) : '-10'}, far = ${params.far !== undefined ? params.far.toFixed(2) : '10'}`,
          result: 'Orthographic matrix maps viewing volume to normalized device coordinates'
        },
        {
          title: 'Step 2: Apply Projection',
          formula: 'P\' = P_ortho × P',
          description: 'Multiply orthographic matrix by homogeneous 3D point',
          calculation: '[x\', y\', z\', 1] = P_ortho × [x, y, z, 1]',
          result: 'Projected point in normalized device coordinates'
        },
        {
          title: 'Step 3: No Perspective Divide',
          formula: 'P_NDC = (x\', y\', z\')',
          description: 'Orthographic projection doesn\'t require perspective divide (w = 1)',
          calculation: 'Direct mapping without depth scaling',
          result: 'Point in normalized device coordinates [-1, 1] range'
        },
        {
          title: 'Step 4: Viewport Transformation',
          formula: 'P_screen = (NDC + 1) / 2 × viewport_size',
          description: 'Transform from NDC to screen coordinates',
          calculation: 'Map from [-1, 1] range to [0, viewport_width/height]',
          result: 'Final screen coordinates for rendering'
        }
      ]
    },
    quaternions: {
      explanation: 'Quaternions represent rotations using 4D numbers (w, x, y, z). They avoid gimbal lock and provide smooth interpolation, making them ideal for animations.',
      steps: [
        {
          title: 'Step 1: Quaternion Representation',
          formula: `q = ${params.w !== undefined ? params.w.toFixed(4) : '1'} + ${params.x !== undefined ? params.x.toFixed(4) : '0'}i + ${params.y !== undefined ? params.y.toFixed(4) : '0'}j + ${params.z !== undefined ? params.z.toFixed(4) : '0'}k`,
          description: 'Quaternion has scalar part (w) and vector part (x, y, z)',
          calculation: `q = (w, x, y, z) = (${params.w !== undefined ? params.w.toFixed(4) : '1'}, ${params.x !== undefined ? params.x.toFixed(4) : '0'}, ${params.y !== undefined ? params.y.toFixed(4) : '0'}, ${params.z !== undefined ? params.z.toFixed(4) : '0'})`,
          result: `Quaternion: (${params.w !== undefined ? params.w.toFixed(4) : '1'}, ${params.x !== undefined ? params.x.toFixed(4) : '0'}, ${params.y !== undefined ? params.y.toFixed(4) : '0'}, ${params.z !== undefined ? params.z.toFixed(4) : '0'})`
        },
        {
          title: 'Step 2: Normalize Quaternion',
          formula: 'q_normalized = q / ||q||',
          description: 'Ensure quaternion has unit length for rotation',
          calculation: `||q|| = √(w² + x² + y² + z²) = √(${params.w !== undefined ? params.w.toFixed(4) : '1'}² + ${params.x !== undefined ? params.x.toFixed(4) : '0'}² + ${params.y !== undefined ? params.y.toFixed(4) : '0'}² + ${params.z !== undefined ? params.z.toFixed(4) : '0'}²)`,
          result: 'Normalized quaternion represents a valid rotation'
        },
        {
          title: 'Step 3: Convert to Rotation Matrix',
          formula: 'R = [[1-2(y²+z²), 2(xy-wz), 2(xz+wy)], [2(xy+wz), 1-2(x²+z²), 2(yz-wx)], [2(xz-wy), 2(yz+wx), 1-2(x²+y²)]]',
          description: 'Convert quaternion to 3x3 rotation matrix',
          calculation: 'Matrix elements computed from quaternion components',
          result: 'Rotation matrix equivalent to quaternion rotation'
        },
        {
          title: 'Step 4: Apply Rotation',
          formula: 'v\' = R × v',
          description: 'Apply rotation matrix to vector',
          calculation: 'Multiply rotation matrix by original vector',
          result: 'Rotated vector in 3D space'
        },
        {
          title: 'Step 5: Advantages of Quaternions',
          formula: 'Smooth interpolation: q(t) = slerp(q1, q2, t)',
          description: 'Quaternions enable smooth spherical linear interpolation (slerp)',
          calculation: 'No gimbal lock, efficient composition, smooth animation',
          result: 'Ideal for camera rotations and character animations'
        }
      ]
    },
    camera: {
      explanation: 'Camera systems define how 3D scenes are viewed. The look-at matrix creates a view transformation from eye position, target point, and up vector.',
      steps: [
        {
          title: 'Step 1: Define Camera Parameters',
          formula: `Eye: (${params.eye && params.eye.x !== undefined ? params.eye.x.toFixed(2) : '5'}, ${params.eye && params.eye.y !== undefined ? params.eye.y.toFixed(2) : '5'}, ${params.eye && params.eye.z !== undefined ? params.eye.z.toFixed(2) : '5'}), Target: (${params.target && params.target.x !== undefined ? params.target.x.toFixed(2) : '0'}, ${params.target && params.target.y !== undefined ? params.target.y.toFixed(2) : '0'}, ${params.target && params.target.z !== undefined ? params.target.z.toFixed(2) : '0'}), Up: (${params.up && params.up.x !== undefined ? params.up.x.toFixed(2) : '0'}, ${params.up && params.up.y !== undefined ? params.up.y.toFixed(2) : '1'}, ${params.up && params.up.z !== undefined ? params.up.z.toFixed(2) : '0'})`,
          description: 'Define camera position (eye), where it\'s looking (target), and up direction',
          calculation: 'These three vectors define the camera\'s orientation in 3D space',
          result: 'Camera coordinate system definition'
        },
        {
          title: 'Step 2: Calculate Forward Vector',
          formula: 'forward = normalize(target - eye)',
          description: 'Direction the camera is facing (normalized)',
          calculation: `forward = normalize((${params.target && params.target.x !== undefined ? params.target.x.toFixed(2) : '0'}, ${params.target && params.target.y !== undefined ? params.target.y.toFixed(2) : '0'}, ${params.target && params.target.z !== undefined ? params.target.z.toFixed(2) : '0'}) - (${params.eye && params.eye.x !== undefined ? params.eye.x.toFixed(2) : '5'}, ${params.eye && params.eye.y !== undefined ? params.eye.y.toFixed(2) : '5'}, ${params.eye && params.eye.z !== undefined ? params.eye.z.toFixed(2) : '5'}))`,
          result: 'Normalized forward direction vector'
        },
        {
          title: 'Step 3: Calculate Right Vector',
          formula: 'right = normalize(cross(forward, up))',
          description: 'Right direction perpendicular to forward and up',
          calculation: 'Cross product of forward and up vectors, then normalized',
          result: 'Right direction vector'
        },
        {
          title: 'Step 4: Recalculate Up Vector',
          formula: 'up\' = cross(right, forward)',
          description: 'Ensure up vector is perpendicular to forward and right',
          calculation: 'Cross product ensures orthonormal basis',
          result: 'Corrected up direction vector'
        },
        {
          title: 'Step 5: Create Look-At Matrix',
          formula: 'M_view = [[right.x, right.y, right.z, -dot(right, eye)], [up\'.x, up\'.y, up\'.z, -dot(up\', eye)], [-forward.x, -forward.y, -forward.z, dot(forward, eye)], [0, 0, 0, 1]]',
          description: 'Build view matrix from camera basis vectors',
          calculation: 'Matrix transforms world coordinates to camera coordinates',
          result: 'View transformation matrix'
        },
        {
          title: 'Step 6: Apply View Transformation',
          formula: 'P_camera = M_view × P_world',
          description: 'Transform world coordinates to camera space',
          calculation: 'All objects are now relative to camera position and orientation',
          result: 'Scene in camera coordinate system, ready for projection'
        }
      ]
    }
  };

  return steps[transformType] || null;
};

