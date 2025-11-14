// Formulas for Transformation Visualization tutorial

export const getTransformationFormulas = (module, step) => {
  const formulas = {
    'matrix-operations': {
      1: {
        title: 'Matrix Fundamentals',
        formulas: [
          {
            name: '2×2 Matrix',
            formula: 'M = [[a, b], [c, d]]',
            description: 'A 2×2 matrix with elements a, b, c, d',
            values: 'a, b, c, d ∈ ℝ'
          },
          {
            name: '3×3 Matrix',
            formula: 'M = [[a, b, c], [d, e, f], [g, h, i]]',
            description: 'A 3×3 matrix for 2D transformations',
            values: '9 elements arranged in 3 rows and 3 columns'
          },
          {
            name: '4×4 Matrix',
            formula: 'M = [[m00, m01, m02, m03], [m10, m11, m12, m13], [m20, m21, m22, m23], [m30, m31, m32, m33]]',
            description: 'A 4×4 matrix for 3D transformations (homogeneous coordinates)',
            values: '16 elements for 3D transformations'
          }
        ]
      },
      2: {
        title: 'Matrix Addition Formulas',
        formulas: [
          {
            name: 'Element-wise Addition',
            formula: 'C[i][j] = A[i][j] + B[i][j]',
            description: 'Add corresponding elements from two matrices',
            values: 'For all i, j where 0 ≤ i < rows, 0 ≤ j < columns'
          },
          {
            name: '2×2 Example',
            formula: '[[a, b], [c, d]] + [[e, f], [g, h]] = [[a+e, b+f], [c+g, d+h]]',
            description: 'Adding two 2×2 matrices',
            values: 'Example: [[1,2],[3,4]] + [[5,6],[7,8]] = [[6,8],[10,12]]'
          },
          {
            name: 'Dimension Requirement',
            formula: 'dim(A) = dim(B)',
            description: 'Both matrices must have same dimensions',
            values: 'A: m×n, B: m×n → Result: m×n'
          }
        ]
      },
      3: {
        title: 'Matrix Subtraction Formulas',
        formulas: [
          {
            name: 'Element-wise Subtraction',
            formula: 'C[i][j] = A[i][j] - B[i][j]',
            description: 'Subtract corresponding elements',
            values: 'For all i, j'
          },
          {
            name: '2×2 Example',
            formula: '[[a, b], [c, d]] - [[e, f], [g, h]] = [[a-e, b-f], [c-g, d-h]]',
            description: 'Subtracting two 2×2 matrices',
            values: 'Example: [[5,6],[7,8]] - [[1,2],[3,4]] = [[4,4],[4,4]]'
          }
        ]
      },
      4: {
        title: 'Scalar Multiplication Formulas',
        formulas: [
          {
            name: 'Scalar Multiplication',
            formula: 'B[i][j] = k × A[i][j]',
            description: 'Multiply each element by scalar',
            values: 'k ∈ ℝ, for all i, j'
          },
          {
            name: '2×2 Example',
            formula: 'k × [[a, b], [c, d]] = [[k×a, k×b], [k×c, k×d]]',
            description: 'Multiplying matrix by scalar',
            values: 'Example: 2 × [[1,2],[3,4]] = [[2,4],[6,8]]'
          }
        ]
      },
      5: {
        title: 'Matrix Multiplication Formulas',
        formulas: [
          {
            name: 'Matrix Multiplication',
            formula: 'C[i][j] = Σ(k=0 to n-1) A[i][k] × B[k][j]',
            description: 'Dot product of row i from A and column j from B',
            values: 'A: m×n, B: n×p → Result: m×p'
          },
          {
            name: '2×2 Example',
            formula: '[[a,b],[c,d]] × [[e,f],[g,h]] = [[a×e+b×g, a×f+b×h], [c×e+d×g, c×f+d×h]]',
            description: 'Multiplying two 2×2 matrices',
            values: 'Example: [[1,2],[3,4]] × [[5,6],[7,8]] = [[19,22],[43,50]]'
          },
          {
            name: 'Dimension Compatibility',
            formula: 'cols(A) = rows(B)',
            description: 'Number of columns in A must equal number of rows in B',
            values: 'Required for multiplication to be defined'
          }
        ]
      },
      6: {
        title: 'WebGL Matrix Formulas',
        formulas: [
          {
            name: 'Column-Major Order',
            formula: 'flat[j×4 + i] = matrix[i][j]',
            description: 'WebGL uses column-major order (different from row-major)',
            values: 'i = row, j = column'
          },
          {
            name: 'Matrix Upload',
            formula: 'gl.uniformMatrix4fv(location, transpose, matrix)',
            description: 'Upload matrix to GPU uniform',
            values: 'transpose = false (already column-major)'
          }
        ]
      }
    },
    'scaling': {
      1: {
        title: 'Scaling Formulas',
        formulas: [
          {
            name: '2D Scaling',
            formula: 'x\' = sx × x, y\' = sy × y',
            description: 'Multiply coordinates by scale factors',
            values: 'sx, sy ∈ ℝ (scale factors)'
          },
          {
            name: '3D Scaling',
            formula: 'x\' = sx × x, y\' = sy × y, z\' = sz × z',
            description: '3D scaling with separate factors per axis',
            values: 'sx, sy, sz ∈ ℝ'
          },
          {
            name: 'Scaling Matrix (2D)',
            formula: 'S = [[sx, 0], [0, sy]]',
            description: '2D scaling matrix',
            values: 'Scale factors on diagonal'
          },
          {
            name: 'Scaling Matrix (3D)',
            formula: 'S = [[sx,0,0,0], [0,sy,0,0], [0,0,sz,0], [0,0,0,1]]',
            description: '3D scaling matrix (homogeneous)',
            values: 'Scale factors on diagonal, w=1 preserved'
          }
        ]
      },
      2: {
        title: 'Scaling Implementation Formulas',
        formulas: [
          {
            name: 'Uniform Scaling',
            formula: 'sx = sy = sz = s',
            description: 'Same scale factor for all axes',
            values: 'Preserves shape, changes size'
          },
          {
            name: 'Non-Uniform Scaling',
            formula: 'sx ≠ sy or sy ≠ sz',
            description: 'Different scale factors',
            values: 'Changes shape and size'
          }
        ]
      },
      3: {
        title: 'Scaling Application Formulas',
        formulas: [
          {
            name: 'Scale Point',
            formula: '[x\', y\', z\'] = S × [x, y, z, 1]',
            description: 'Apply scaling matrix to point',
            values: 'Using homogeneous coordinates'
          },
          {
            name: 'Scale All Vertices',
            formula: 'V\'[i] = S × V[i] for all vertices i',
            description: 'Apply scaling to entire object',
            values: 'Each vertex transformed independently'
          }
        ]
      },
      4: {
        title: 'Uniform vs Non-Uniform',
        formulas: [
          {
            name: 'Uniform Scale Check',
            formula: 'sx = sy = sz',
            description: 'Check if scaling is uniform',
            values: 'True = uniform, False = non-uniform'
          },
          {
            name: 'Area/Volume Scaling',
            formula: 'Area\' = sx × sy × Area\nVolume\' = sx × sy × sz × Volume',
            description: 'How scaling affects area and volume',
            values: 'Area scales by product, volume by product of all factors'
          }
        ]
      },
      5: {
        title: 'Scaling Around Pivot',
        formulas: [
          {
            name: 'Pivot Scaling Matrix',
            formula: 'T = T_translate(pivot) × S × T_translate(-pivot)',
            description: 'Scale around pivot point',
            values: 'Translate to origin, scale, translate back'
          },
          {
            name: 'Step-by-Step',
            formula: '1. Translate by -pivot\n2. Scale\n3. Translate by +pivot',
            description: 'Three-step process',
            values: 'Combined into single matrix'
          }
        ]
      },
      6: {
        title: 'WebGL Scaling Formulas',
        formulas: [
          {
            name: 'Shader Scaling',
            formula: 'gl_Position = uModelViewProjection × uScaleMatrix × aPosition',
            description: 'Apply scaling in vertex shader',
            values: 'GPU-accelerated transformation'
          }
        ]
      }
    },
    'translation': {
      1: {
        title: 'Translation Formulas',
        formulas: [
          {
            name: '2D Translation',
            formula: 'x\' = x + tx, y\' = y + ty',
            description: 'Add translation components to coordinates',
            values: 'tx, ty ∈ ℝ (translation offsets)'
          },
          {
            name: '3D Translation',
            formula: 'x\' = x + tx, y\' = y + ty, z\' = z + tz',
            description: '3D translation',
            values: 'tx, ty, tz ∈ ℝ'
          },
          {
            name: 'Translation Matrix (2D)',
            formula: 'T = [[1, 0, tx], [0, 1, ty], [0, 0, 1]]',
            description: '2D translation using homogeneous coordinates',
            values: 'Identity matrix with translation in last column'
          },
          {
            name: 'Translation Matrix (3D)',
            formula: 'T = [[1,0,0,tx], [0,1,0,ty], [0,0,1,tz], [0,0,0,1]]',
            description: '3D translation matrix',
            values: '4×4 homogeneous coordinates'
          }
        ]
      },
      2: {
        title: '2D Translation Matrix',
        formulas: [
          {
            name: 'Matrix Structure',
            formula: 'T = [[1, 0, tx], [0, 1, ty], [0, 0, 1]]',
            description: '3×3 matrix for 2D translation',
            values: 'Last column contains translation, bottom row is [0,0,1]'
          },
          {
            name: 'Why 3×3?',
            formula: 'Homogeneous coordinates: [x, y, 1]',
            description: 'Extra dimension allows translation as matrix multiplication',
            values: 'w=1 for points, w=0 for vectors'
          }
        ]
      },
      3: {
        title: '3D Translation Matrix',
        formulas: [
          {
            name: 'Matrix Structure',
            formula: 'T = [[1,0,0,tx], [0,1,0,ty], [0,0,1,tz], [0,0,0,1]]',
            description: '4×4 matrix for 3D translation',
            values: 'Last column contains translation, bottom row is [0,0,0,1]'
          },
          {
            name: 'Homogeneous Coordinates',
            formula: 'Point: [x, y, z, 1]\nVector: [x, y, z, 0]',
            description: 'w=1 for points (affected by translation), w=0 for vectors (not affected)',
            values: 'Distinguishes points from directions'
          }
        ]
      },
      4: {
        title: 'Translation Application',
        formulas: [
          {
            name: 'Translate Point',
            formula: '[x\', y\', z\', 1] = T × [x, y, z, 1]',
            description: 'Apply translation matrix',
            values: 'Using homogeneous coordinates'
          },
          {
            name: 'Translate Object',
            formula: 'V\'[i] = T × V[i] for all vertices',
            description: 'Translate all vertices by same amount',
            values: 'Preserves shape and orientation'
          }
        ]
      },
      5: {
        title: 'Inverse Translation',
        formulas: [
          {
            name: 'Inverse Translation Matrix',
            formula: 'T⁻¹ = [[1,0,0,-tx], [0,1,0,-ty], [0,0,1,-tz], [0,0,0,1]]',
            description: 'Inverse translation negates translation components',
            values: 'T × T⁻¹ = I (identity matrix)'
          },
          {
            name: 'Undo Translation',
            formula: 'Original = T⁻¹ × Translated',
            description: 'Apply inverse to return to original position',
            values: 'T⁻¹ × T = I'
          }
        ]
      },
      6: {
        title: 'WebGL Translation',
        formulas: [
          {
            name: 'Shader Translation',
            formula: 'gl_Position = uModelViewProjection × uTranslateMatrix × aPosition',
            description: 'Apply translation in vertex shader',
            values: 'GPU handles all vertices in parallel'
          }
        ]
      }
    },
    'rotation': {
      1: {
        title: 'Rotation Formulas',
        formulas: [
          {
            name: '2D Rotation',
            formula: 'x\' = x×cos(θ) - y×sin(θ)\ny\' = x×sin(θ) + y×cos(θ)',
            description: 'Rotate point around origin by angle θ',
            values: 'θ in radians, positive = counterclockwise'
          },
          {
            name: '2D Rotation Matrix',
            formula: 'R = [[cos(θ), -sin(θ)], [sin(θ), cos(θ)]]',
            description: '2×2 rotation matrix',
            values: 'Determinant = 1 (preserves area)'
          },
          {
            name: 'Angle Conversion',
            formula: 'radians = degrees × π / 180',
            description: 'Convert degrees to radians',
            values: 'JavaScript Math functions use radians'
          }
        ]
      },
      2: {
        title: '2D Rotation Implementation',
        formulas: [
          {
            name: 'Rotation Around Origin',
            formula: '[x\', y\'] = R × [x, y]',
            description: 'Matrix multiplication rotates point',
            values: 'R is 2×2 rotation matrix'
          },
          {
            name: 'Rotation Around Point',
            formula: '1. Translate by -pivot\n2. Rotate\n3. Translate by +pivot',
            description: 'Rotate around arbitrary point',
            values: 'T(pivot) × R × T(-pivot)'
          }
        ]
      },
      3: {
        title: '3D Rotation Around Axes',
        formulas: [
          {
            name: 'Rotation Around X-Axis (Pitch)',
            formula: 'Rx = [[1,0,0,0], [0,cos(θ),-sin(θ),0], [0,sin(θ),cos(θ),0], [0,0,0,1]]',
            description: 'Rotates around x-axis, affects y and z',
            values: 'Used for pitch (up/down)'
          },
          {
            name: 'Rotation Around Y-Axis (Yaw)',
            formula: 'Ry = [[cos(θ),0,sin(θ),0], [0,1,0,0], [-sin(θ),0,cos(θ),0], [0,0,0,1]]',
            description: 'Rotates around y-axis, affects x and z',
            values: 'Used for yaw (left/right)'
          },
          {
            name: 'Rotation Around Z-Axis (Roll)',
            formula: 'Rz = [[cos(θ),-sin(θ),0,0], [sin(θ),cos(θ),0,0], [0,0,1,0], [0,0,0,1]]',
            description: 'Rotates around z-axis, affects x and y',
            values: 'Used for roll (tilt)'
          }
        ]
      },
      4: {
        title: 'Combining Rotations',
        formulas: [
          {
            name: 'Euler Angles',
            formula: 'R = Rz × Ry × Rx',
            description: 'Combine rotations around X, Y, Z axes',
            values: 'Applied in reverse order: X first, then Y, then Z'
          },
          {
            name: 'Gimbal Lock',
            formula: 'When pitch = ±90°, yaw and roll become ambiguous',
            description: 'Problem with Euler angles',
            values: 'Solution: Use quaternions'
          }
        ]
      },
      5: {
        title: 'Rotation Around Arbitrary Axis',
        formulas: [
          {
            name: 'Rodrigues\' Rotation Formula',
            formula: 'R = I + sin(θ)×K + (1-cos(θ))×K²',
            description: 'Rotate around unit vector axis',
            values: 'K is skew-symmetric matrix of axis vector'
          },
          {
            name: 'Axis Normalization',
            formula: 'n̂ = n / |n|',
            description: 'Normalize axis vector to unit length',
            values: 'Required for Rodrigues\' formula'
          }
        ]
      },
      6: {
        title: 'WebGL Rotation',
        formulas: [
          {
            name: 'Shader Rotation',
            formula: 'gl_Position = uModelViewProjection × uRotateMatrix × aPosition',
            description: 'Apply rotation in vertex shader',
            values: 'GPU rotates all vertices simultaneously'
          }
        ]
      }
    },
    'reflection': {
      1: {
        title: 'Reflection Formulas',
        formulas: [
          {
            name: 'Reflection Across X-Axis',
            formula: 'x\' = x, y\' = -y',
            description: 'Flip y-coordinate',
            values: 'Matrix: [[1,0],[0,-1]]'
          },
          {
            name: 'Reflection Across Y-Axis',
            formula: 'x\' = -x, y\' = y',
            description: 'Flip x-coordinate',
            values: 'Matrix: [[-1,0],[0,1]]'
          },
          {
            name: 'Reflection Matrix (2D)',
            formula: 'Reflect X: [[1,0],[0,-1]]\nReflect Y: [[-1,0],[0,1]]\nReflect Origin: [[-1,0],[0,-1]]',
            description: '2D reflection matrices',
            values: 'Determinant = -1 (flips orientation)'
          }
        ]
      },
      2: {
        title: 'Reflection Across Arbitrary Line',
        formulas: [
          {
            name: 'Line Reflection',
            formula: 'R = R(-θ) × Reflect_axis × R(θ)',
            description: 'Rotate line to axis, reflect, rotate back',
            values: 'θ = angle of line'
          },
          {
            name: 'Line Through Origin',
            formula: 'y = m×x or ax + by = 0',
            description: 'Line equation',
            values: 'm = slope = tan(θ)'
          }
        ]
      },
      3: {
        title: '3D Reflection',
        formulas: [
          {
            name: 'Reflection Across Plane',
            formula: 'R = I - 2×n×nᵀ',
            description: 'Reflect across plane with normal n',
            values: 'n is unit normal vector'
          },
          {
            name: 'Plane Normal',
            formula: 'n = [nx, ny, nz] where |n| = 1',
            description: 'Unit vector perpendicular to plane',
            values: 'Normalized: n = planeNormal / |planeNormal|'
          }
        ]
      },
      4: {
        title: 'Reflection Properties',
        formulas: [
          {
            name: 'Reflection is Self-Inverse',
            formula: 'R × R = I, so R⁻¹ = R',
            description: 'Reflecting twice returns to original',
            values: 'R is its own inverse'
          },
          {
            name: 'Determinant',
            formula: 'det(R) = -1',
            description: 'Reflection matrices have negative determinant',
            values: 'Indicates orientation flip'
          },
          {
            name: 'Preserves Distances',
            formula: '|R×p1 - R×p2| = |p1 - p2|',
            description: 'Reflection is an isometry',
            values: 'Distances unchanged'
          }
        ]
      },
      5: {
        title: 'Reflection Implementation',
        formulas: [
          {
            name: 'Apply Reflection',
            formula: '[x\', y\', z\'] = R × [x, y, z, 1]',
            description: 'Multiply point by reflection matrix',
            values: 'Using homogeneous coordinates'
          }
        ]
      },
      6: {
        title: 'WebGL Reflection',
        formulas: [
          {
            name: 'Shader Reflection',
            formula: 'gl_Position = uModelViewProjection × uReflectMatrix × aPosition',
            description: 'Apply reflection in vertex shader',
            values: 'GPU handles reflection for all vertices'
          }
        ]
      }
    },
    'combined': {
      1: {
        title: 'Combined Transformation Formulas',
        formulas: [
          {
            name: 'Transformation Order',
            formula: 'To apply: T1 → T2 → T3\nMatrix: T3 × T2 × T1',
            description: 'Rightmost transformation applied first',
            values: 'Order matters! T × R × S ≠ S × R × T'
          },
          {
            name: 'SRT Order',
            formula: 'T_final = T_translate × T_rotate × T_scale',
            description: 'Scale-Rotate-Translate (common pattern)',
            values: 'Scale first, rotate, then translate'
          }
        ]
      },
      2: {
        title: 'Matrix Composition',
        formulas: [
          {
            name: 'Combine Transformations',
            formula: 'T_combined = T1 × T2 × T3 × ...',
            description: 'Multiply matrices in reverse order of application',
            values: 'Single matrix applies all transformations'
          },
          {
            name: 'Efficiency',
            formula: 'One matrix multiplication vs. multiple',
            description: 'Pre-compute combined matrix for performance',
            values: 'O(n) vs O(n×m) where n=vertices, m=transformations'
          }
        ]
      },
      3: {
        title: 'SRT Pattern',
        formulas: [
          {
            name: 'SRT Matrix',
            formula: 'M = T × R × S',
            description: 'Scale-Rotate-Translate combined',
            values: 'Common pattern in 3D graphics'
          },
          {
            name: 'Local vs World',
            formula: 'WorldTransform = ParentTransform × LocalTransform',
            description: 'Hierarchical transformations',
            values: 'Child transforms relative to parent'
          }
        ]
      },
      4: {
        title: 'Transformation Hierarchy',
        formulas: [
          {
            name: 'World Matrix',
            formula: 'M_world = M_parent × M_local',
            description: 'Combine parent and local transforms',
            values: 'Recursive: M_world = M_grandparent × M_parent × M_local'
          },
          {
            name: 'Scene Graph',
            formula: 'Tree structure: Root → Parent → Child → ...',
            description: 'Hierarchical organization',
            values: 'Each node has local transform'
          }
        ]
      },
      5: {
        title: 'Optimization Formulas',
        formulas: [
          {
            name: 'Matrix Caching',
            formula: 'Cache M_combined if transformations unchanged',
            description: 'Avoid recomputing if inputs haven\'t changed',
            values: 'Dirty flag pattern'
          },
          {
            name: 'Matrix Stack',
            formula: 'push(M), multiply(T), render, pop()',
            description: 'Save/restore transformation state',
            values: 'Enables nested transformations'
          }
        ]
      },
      6: {
        title: 'WebGL MVP Formulas',
        formulas: [
          {
            name: 'Model-View-Projection',
            formula: 'MVP = P × V × M',
            description: 'Projection × View × Model',
            values: 'Transforms from object space to screen space'
          },
          {
            name: 'Perspective Projection',
            formula: 'P = [[f/aspect,0,0,0], [0,f,0,0], [0,0,(n+f)/(n-f),2nf/(n-f)], [0,0,-1,0]]\nwhere f = 1/tan(fov/2)',
            description: 'Perspective projection matrix',
            values: 'fov = field of view, aspect = width/height, n = near, f = far'
          },
          {
            name: 'Orthographic Projection',
            formula: 'P = [[2/(r-l),0,0,-(r+l)/(r-l)], [0,2/(t-b),0,-(t+b)/(t-b)], [0,0,-2/(f-n),-(f+n)/(f-n)], [0,0,0,1]]',
            description: 'Orthographic projection matrix',
            values: 'l,r = left/right, t,b = top/bottom, n,f = near/far'
          }
        ]
      }
    },
    'quaternions': {
      1: {
        title: 'Quaternion Fundamentals',
        formulas: [
          {
            name: 'Quaternion Structure',
            formula: 'q = (w, x, y, z) = w + xi + yj + zk',
            description: '4D number with scalar w and vector (x, y, z)',
            values: 'i² = j² = k² = ijk = -1'
          },
          {
            name: 'Unit Quaternion',
            formula: '|q| = √(w² + x² + y² + z²) = 1',
            description: 'Required for rotation representation',
            values: 'Normalized quaternion'
          },
          {
            name: 'Identity Quaternion',
            formula: 'q_identity = (1, 0, 0, 0)',
            description: 'Represents no rotation',
            values: 'w=1, x=y=z=0'
          }
        ]
      },
      2: {
        title: 'Euler to Quaternion Conversion',
        formulas: [
          {
            name: 'Axis-Angle to Quaternion',
            formula: 'q = (cos(θ/2), sin(θ/2)×nx, sin(θ/2)×ny, sin(θ/2)×nz)',
            description: 'Convert axis-angle to quaternion',
            values: 'n is unit axis vector, θ is rotation angle'
          },
          {
            name: 'Euler Angles to Quaternion',
            formula: 'q = qz × qy × qx\nwhere qi = (cos(ri/2), sin(ri/2)×axis_i)',
            description: 'Combine rotations around X, Y, Z axes',
            values: 'rx, ry, rz are Euler angles'
          }
        ]
      },
      3: {
        title: 'Quaternion to Matrix',
        formulas: [
          {
            name: 'Quaternion to Rotation Matrix',
            formula: 'R = [[1-2(y²+z²), 2(xy-wz), 2(xz+wy)],\n     [2(xy+wz), 1-2(x²+z²), 2(yz-wx)],\n     [2(xz-wy), 2(yz+wx), 1-2(x²+y²)]]',
            description: 'Convert quaternion to 3×3 rotation matrix',
            values: 'Result is orthogonal matrix'
          },
          {
            name: '4×4 Homogeneous Matrix',
            formula: 'Add [0, 0, 0, 1] as bottom row and [0, 0, 0, 0]ᵀ as last column',
            description: 'For use with homogeneous coordinates',
            values: '4×4 matrix for WebGL'
          }
        ]
      },
      4: {
        title: 'Quaternion Multiplication',
        formulas: [
          {
            name: 'Quaternion Product',
            formula: 'q1 × q2 = (w1w2 - x1x2 - y1y2 - z1z2,\n           w1x2 + x1w2 + y1z2 - z1y2,\n           w1y2 - x1z2 + y1w2 + z1x2,\n           w1z2 + x1y2 - y1x2 + z1w2)',
            description: 'Compose rotations by multiplying quaternions',
            values: 'Non-commutative: q1 × q2 ≠ q2 × q1'
          },
          {
            name: 'Order',
            formula: 'q1 × q2 applies q2 first, then q1',
            description: 'Rightmost quaternion applied first',
            values: 'Same as matrix multiplication order'
          }
        ]
      },
      5: {
        title: 'Spherical Linear Interpolation (SLERP)',
        formulas: [
          {
            name: 'SLERP Formula',
            formula: 'slerp(q1, q2, t) = (sin((1-t)θ)/sin(θ))×q1 + (sin(tθ)/sin(θ))×q2',
            description: 'Interpolate between quaternions',
            values: 'θ = arccos(q1·q2), t ∈ [0, 1]'
          },
          {
            name: 'Dot Product',
            formula: 'q1·q2 = w1w2 + x1x2 + y1y2 + z1z2',
            description: 'Angle between quaternions on 4D sphere',
            values: 'Used to calculate interpolation angle'
          }
        ]
      },
      6: {
        title: 'WebGL Quaternion Formulas',
        formulas: [
          {
            name: 'Quaternion to Matrix',
            formula: 'matrix = quaternionToMatrix(quaternion)',
            description: 'Convert quaternion to matrix for GPU',
            values: 'CPU: quaternion math, GPU: matrix math'
          }
        ]
      }
    },
    'projection': {
      1: {
        title: 'Projection Fundamentals',
        formulas: [
          {
            name: 'Perspective Projection',
            formula: 'x\' = (x × near) / z\ny\' = (y × near) / z',
            description: 'Objects farther (larger z) appear smaller',
            values: 'Creates depth illusion'
          },
          {
            name: 'Orthographic Projection',
            formula: 'x\' = x\ny\' = y',
            description: 'No depth scaling, parallel lines preserved',
            values: 'No perspective distortion'
          }
        ]
      },
      2: {
        title: 'Perspective Projection Matrix',
        formulas: [
          {
            name: 'Perspective Matrix',
            formula: 'P = [[f/aspect, 0, 0, 0],\n     [0, f, 0, 0],\n     [0, 0, (n+f)/(n-f), 2nf/(n-f)],\n     [0, 0, -1, 0]]',
            description: '4×4 perspective projection matrix',
            values: 'f = 1/tan(fov/2), n = near, f = far'
          },
          {
            name: 'Field of View',
            formula: 'fov = 2×arctan(height / (2×distance))',
            description: 'Angle of visible scene',
            values: 'Typically 45° to 90°'
          }
        ]
      },
      3: {
        title: 'Orthographic Projection Matrix',
        formulas: [
          {
            name: 'Orthographic Matrix',
            formula: 'P = [[2/(r-l), 0, 0, -(r+l)/(r-l)],\n     [0, 2/(t-b), 0, -(t+b)/(t-b)],\n     [0, 0, -2/(f-n), -(f+n)/(f-n)],\n     [0, 0, 0, 1]]',
            description: '4×4 orthographic projection matrix',
            values: 'l,r = left/right, t,b = top/bottom, n,f = near/far'
          }
        ]
      },
      4: {
        title: 'Perspective Divide',
        formulas: [
          {
            name: 'Perspective Divide',
            formula: 'x\' = x/w, y\' = y/w, z\' = z/w',
            description: 'Divide by w component after projection',
            values: 'Creates depth scaling effect'
          },
          {
            name: 'W Component',
            formula: 'w = -z (after perspective matrix)',
            description: 'W component encodes depth',
            values: 'Dividing by w scales by 1/z'
          }
        ]
      },
      5: {
        title: 'Viewport Transformation',
        formulas: [
          {
            name: 'NDC to Screen',
            formula: 'screenX = (ndcX + 1) × width / 2\nscreenY = (1 - ndcY) × height / 2',
            description: 'Map normalized coordinates to pixels',
            values: 'NDC: [-1, 1], Screen: [0, width] × [0, height]'
          },
          {
            name: 'Y-Axis Flip',
            formula: 'screenY = height - (ndcY + 1) × height / 2',
            description: 'Flip Y-axis (screen Y increases downward)',
            values: 'Required for correct orientation'
          }
        ]
      },
      6: {
        title: 'MVP Matrix',
        formulas: [
          {
            name: 'Model-View-Projection',
            formula: 'MVP = P × V × M',
            description: 'Combine all transformations',
            values: 'P = Projection, V = View (camera), M = Model'
          },
          {
            name: 'Complete Pipeline',
            formula: 'Object Space → Model → World Space → View → Camera Space → Projection → Clip Space → Divide → NDC → Viewport → Screen',
            description: 'Full 3D rendering pipeline',
            values: 'Each step transforms coordinates'
          }
        ]
      }
    }
  };

  if (formulas[module]) {
    if (formulas[module][step]) {
      return formulas[module][step];
    } else if (formulas[module][1]) {
      return formulas[module][1];
    }
  }
  
  return null;
};

