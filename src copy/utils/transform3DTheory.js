// Theory and explanations for 3D Transformations

export const getTransformTheory = (transformType) => {
  const theories = {
    rotation: {
      title: '3D Rotation',
      description: 'Rotation transforms points around an axis in 3D space. Rotations are represented using rotation matrices.',
      concepts: [
        {
          name: 'Rotation Matrices',
          description: 'Rotation matrices are orthogonal matrices (determinant = 1) that preserve distances and angles. Each axis has its own rotation matrix.',
          formula: 'R_x(θ) = [[1, 0, 0], [0, cos(θ), -sin(θ)], [0, sin(θ), cos(θ)]]'
        },
        {
          name: 'Euler Angles',
          description: 'Euler angles represent rotations as three separate rotations around X, Y, and Z axes. Order matters (ZYX is common).',
          formula: 'R = R_z(γ) × R_y(β) × R_x(α)'
        },
        {
          name: 'Gimbal Lock',
          description: 'When two rotation axes align, one degree of freedom is lost. This is why quaternions are preferred for smooth rotations.',
          formula: 'Occurs when β = ±90° in ZYX Euler angles'
        }
      ],
      geometricMeaning: 'Rotation preserves distances and angles. Points rotate around an axis, creating a circular path.',
      applications: [
        'Camera rotation in 3D games',
        'Object orientation in 3D modeling',
        'Animation of rotating objects',
        'View transformations in graphics pipelines'
      ]
    },
    translation: {
      title: '3D Translation',
      description: 'Translation moves points by a constant offset in 3D space. Unlike rotation and scale, translation requires homogeneous coordinates (4x4 matrices).',
      concepts: [
        {
          name: 'Translation Matrix',
          description: 'Translation is represented as a 4x4 matrix using homogeneous coordinates. The translation vector is in the last column.',
          formula: 'T(tx, ty, tz) = [[1, 0, 0, tx], [0, 1, 0, ty], [0, 0, 1, tz], [0, 0, 0, 1]]'
        },
        {
          name: 'Homogeneous Coordinates',
          description: 'Adding a fourth coordinate (w=1) allows translation to be represented as matrix multiplication, enabling composition of transformations.',
          formula: '[x\', y\', z\', 1] = T × [x, y, z, 1]'
        },
        {
          name: 'Composition',
          description: 'Multiple translations can be combined by matrix multiplication. Order matters: T1 × T2 applies T2 first, then T1.',
          formula: 'T_combined = T1 × T2'
        }
      ],
      geometricMeaning: 'Translation moves all points by the same vector, preserving shape and orientation.',
      applications: [
        'Moving objects in 3D space',
        'Camera positioning',
        'Animation paths',
        'Scene graph transformations'
      ]
    },
    scaling: {
      title: '3D Scaling',
      description: 'Scaling changes the size of objects. Uniform scaling preserves shape, while non-uniform scaling can distort objects.',
      concepts: [
        {
          name: 'Scale Matrix',
          description: 'Scaling multiplies each coordinate by a scale factor. Can be uniform (same factor) or non-uniform (different factors).',
          formula: 'S(sx, sy, sz) = [[sx, 0, 0], [0, sy, 0], [0, 0, sz]]'
        },
        {
          name: 'Uniform Scaling',
          description: 'When sx = sy = sz, the object scales proportionally, preserving shape and angles.',
          formula: 'S(s, s, s) = s × I'
        },
        {
          name: 'Non-Uniform Scaling',
          description: 'Different scale factors stretch or compress along different axes, changing shape.',
          formula: 'S(sx, sy, sz) where sx ≠ sy ≠ sz'
        }
      ],
      geometricMeaning: 'Scaling changes distances from origin. Uniform scaling preserves angles, non-uniform scaling distorts them.',
      applications: [
        'Resizing objects',
        'Creating stretched/compressed effects',
        'Viewport transformations',
        'Model scaling in 3D software'
      ]
    },
    projection: {
      title: '3D Projection',
      description: 'Projection maps 3D points to 2D screen coordinates. Two main types: perspective (realistic) and orthographic (parallel).',
      concepts: [
        {
          name: 'Perspective Projection',
          description: 'Objects farther away appear smaller. Creates realistic depth perception. Uses a frustum (truncated pyramid).',
          formula: 'x\' = (x × f) / (z × aspect), y\' = (y × f) / z, where f = 1/tan(FOV/2)'
        },
        {
          name: 'Orthographic Projection',
          description: 'All parallel lines remain parallel. No perspective distortion. Objects maintain size regardless of distance.',
          formula: 'x\' = x, y\' = y (after normalization to viewport)'
        },
        {
          name: 'View Frustum',
          description: 'The visible region in 3D space. Defined by near/far planes and field of view (perspective) or view volume (orthographic).',
          formula: 'Perspective: frustum pyramid. Orthographic: rectangular box.'
        }
      ],
      geometricMeaning: 'Projection flattens 3D space onto a 2D plane. Perspective creates depth illusion through size variation.',
      applications: [
        '3D rendering pipelines',
        'Camera systems in games',
        'CAD software (orthographic)',
        'Architectural visualization (perspective)'
      ]
    },
    quaternions: {
      title: 'Quaternions',
      description: 'Quaternions represent rotations using 4 numbers (w, x, y, z). They avoid gimbal lock and enable smooth interpolation.',
      concepts: [
        {
          name: 'Quaternion Structure',
          description: 'A quaternion q = w + xi + yj + zk, where i² = j² = k² = ijk = -1. For rotations, |q| = 1 (unit quaternion).',
          formula: 'q = w + xi + yj + zk, where w² + x² + y² + z² = 1'
        },
        {
          name: 'Rotation Quaternion',
          description: 'A rotation by angle θ around axis (ax, ay, az) is: q = [cos(θ/2), ax·sin(θ/2), ay·sin(θ/2), az·sin(θ/2)]',
          formula: 'q = [cos(θ/2), n·sin(θ/2)] where n is normalized axis'
        },
        {
          name: 'Spherical Linear Interpolation (SLERP)',
          description: 'Smoothly interpolates between two rotations, following the shortest path on the unit sphere.',
          formula: 'slerp(q1, q2, t) = (sin((1-t)Ω)/sin(Ω))q1 + (sin(tΩ)/sin(Ω))q2, where Ω = arccos(q1·q2)'
        }
      ],
      geometricMeaning: 'Quaternions represent rotations as points on a 4D unit sphere. SLERP follows great circle arcs.',
      applications: [
        'Smooth camera rotation',
        'Character animation',
        'Avoiding gimbal lock',
        'Interpolating rotations'
      ]
    },
    camera: {
      title: 'Camera Systems',
      description: 'Camera systems define how 3D scenes are viewed. Includes view matrix (look-at) and projection matrix.',
      concepts: [
        {
          name: 'Look-At Matrix',
          description: 'Creates a view matrix from camera position (eye), target point, and up vector. Defines camera orientation.',
          formula: 'z = normalize(eye - target), x = normalize(up × z), y = z × x'
        },
        {
          name: 'View Matrix',
          description: 'Transforms world coordinates to camera coordinates. Inverse of camera transformation.',
          formula: 'V = [[x.x, x.y, x.z, -dot(x,eye)], [y.x, y.y, y.z, -dot(y,eye)], [z.x, z.y, z.z, -dot(z,eye)], [0,0,0,1]]'
        },
        {
          name: 'Camera Types',
          description: 'FPS: first-person shooter (yaw/pitch). Orbit: rotates around target. Free: unrestricted movement.',
          formula: 'FPS: yaw around Y, pitch around X. Orbit: spherical coordinates around target.'
        }
      ],
      geometricMeaning: 'Camera defines a coordinate system with origin at eye, looking toward target, with up direction.',
      applications: [
        '3D game cameras',
        'Scene navigation',
        'Architectural walkthroughs',
        '3D modeling software'
      ]
    }
  };

  return theories[transformType] || null;
};

