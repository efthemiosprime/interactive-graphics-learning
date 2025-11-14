// Step-by-step explanations for Transformation Visualization tutorial

export const getTransformationStepByStep = (module, step) => {
  const steps = {
    'matrix-operations': {
      1: {
        explanation: 'Understanding matrices is the foundation for all transformation operations. We\'ll learn how to create, access, and manipulate matrices.',
        steps: [
          {
            title: 'Step 1: Define Matrix Structure',
            formula: 'M = [[a, b], [c, d]]',
            description: 'A matrix is a 2D array of numbers. Each element has a position (row, column).',
            calculation: 'For 2×2 matrix: 2 rows, 2 columns. Example: [[1, 2], [3, 4]]',
            result: 'Matrix structure defined with 4 elements'
          },
          {
            title: 'Step 2: Access Elements',
            formula: 'element = matrix[row][column]',
            description: 'Access elements using zero-based indices. First index is row, second is column.',
            calculation: 'For M = [[1, 2], [3, 4]]: M[0][0] = 1, M[0][1] = 2, M[1][0] = 3, M[1][1] = 4',
            result: 'Element accessed successfully'
          },
          {
            title: 'Step 3: Identity Matrix',
            formula: 'I = [[1, 0], [0, 1]]',
            description: 'Identity matrix has 1s on diagonal, 0s elsewhere. Multiplying by identity returns original matrix.',
            calculation: 'I × M = M for any matrix M',
            result: 'Identity matrix preserves original matrix'
          }
        ]
      },
      2: {
        explanation: 'Matrix addition combines two matrices element by element. Both matrices must have the same dimensions.',
        steps: [
          {
            title: 'Step 1: Verify Dimensions Match',
            formula: 'rows(A) = rows(B) AND cols(A) = cols(B)',
            description: 'Check that both matrices have same number of rows and columns.',
            calculation: 'A: 2×2, B: 2×2 → Match ✓',
            result: 'Dimensions verified'
          },
          {
            title: 'Step 2: Add Corresponding Elements',
            formula: 'C[i][j] = A[i][j] + B[i][j]',
            description: 'For each position, add the corresponding elements from both matrices.',
            calculation: 'Example: A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]]\nC[0][0] = 1 + 5 = 6\nC[0][1] = 2 + 6 = 8\nC[1][0] = 3 + 7 = 10\nC[1][1] = 4 + 8 = 12',
            result: 'C = [[6, 8], [10, 12]]'
          },
          {
            title: 'Step 3: Verify Result Dimensions',
            formula: 'dim(C) = dim(A) = dim(B)',
            description: 'Result matrix has same dimensions as input matrices.',
            calculation: 'C is 2×2, same as A and B',
            result: 'Result dimensions correct'
          }
        ]
      },
      3: {
        explanation: 'Matrix subtraction finds the difference between two matrices element by element.',
        steps: [
          {
            title: 'Step 1: Verify Dimensions Match',
            formula: 'rows(A) = rows(B) AND cols(A) = cols(B)',
            description: 'Both matrices must have same dimensions.',
            calculation: 'A: 2×2, B: 2×2 → Match ✓',
            result: 'Dimensions verified'
          },
          {
            title: 'Step 2: Subtract Corresponding Elements',
            formula: 'C[i][j] = A[i][j] - B[i][j]',
            description: 'For each position, subtract B element from A element.',
            calculation: 'Example: A = [[5, 6], [7, 8]], B = [[1, 2], [3, 4]]\nC[0][0] = 5 - 1 = 4\nC[0][1] = 6 - 2 = 4\nC[1][0] = 7 - 3 = 4\nC[1][1] = 8 - 4 = 4',
            result: 'C = [[4, 4], [4, 4]]'
          }
        ]
      },
      4: {
        explanation: 'Scalar multiplication multiplies every element of a matrix by a single number (scalar).',
        steps: [
          {
            title: 'Step 1: Multiply Each Element',
            formula: 'B[i][j] = k × A[i][j]',
            description: 'Multiply every element in the matrix by the scalar value.',
            calculation: 'Example: A = [[1, 2], [3, 4]], k = 2\nB[0][0] = 2 × 1 = 2\nB[0][1] = 2 × 2 = 4\nB[1][0] = 2 × 3 = 6\nB[1][1] = 2 × 4 = 8',
            result: 'B = [[2, 4], [6, 8]]'
          },
          {
            title: 'Step 2: Geometric Interpretation',
            formula: 'Scaling transformation by factor k',
            description: 'Scalar multiplication scales the transformation uniformly.',
            calculation: 'k = 2 means double the size in all directions',
            result: 'Transformation scaled'
          }
        ]
      },
      5: {
        explanation: 'Matrix multiplication combines two transformations. Order matters! A × B means apply B first, then A.',
        steps: [
          {
            title: 'Step 1: Verify Dimension Compatibility',
            formula: 'cols(A) = rows(B)',
            description: 'Number of columns in A must equal number of rows in B.',
            calculation: 'A: 2×2 (2 cols), B: 2×2 (2 rows) → Compatible ✓\nResult will be 2×2',
            result: 'Dimensions compatible'
          },
          {
            title: 'Step 2: Calculate Each Element',
            formula: 'C[i][j] = Σ(k) A[i][k] × B[k][j]',
            description: 'Each element is the dot product of row i from A and column j from B.',
            calculation: 'Example: A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]]\nC[0][0] = A[0][0]×B[0][0] + A[0][1]×B[1][0] = 1×5 + 2×7 = 5 + 14 = 19\nC[0][1] = A[0][0]×B[0][1] + A[0][1]×B[1][1] = 1×6 + 2×8 = 6 + 16 = 22\nC[1][0] = A[1][0]×B[0][0] + A[1][1]×B[1][0] = 3×5 + 4×7 = 15 + 28 = 43\nC[1][1] = A[1][0]×B[0][1] + A[1][1]×B[1][1] = 3×6 + 4×8 = 18 + 32 = 50',
            result: 'C = [[19, 22], [43, 50]]'
          },
          {
            title: 'Step 3: Understand Order',
            formula: 'A × B ≠ B × A (in general)',
            description: 'Matrix multiplication is NOT commutative. Order matters!',
            calculation: 'A × B = [[19, 22], [43, 50]]\nB × A = [[23, 34], [31, 46]]\nThese are different!',
            result: 'Order affects result'
          }
        ]
      },
      6: {
        explanation: 'Implementing matrix multiplication efficiently requires nested loops and proper indexing.',
        steps: [
          {
            title: 'Step 1: Initialize Result Matrix',
            formula: 'result = new Array(rowsA)',
            description: 'Create result matrix with correct number of rows.',
            calculation: 'rowsA = 2 → result = [undefined, undefined]',
            result: 'Result matrix initialized'
          },
          {
            title: 'Step 2: Outer Loop - Rows',
            formula: 'for (let i = 0; i < rowsA; i++)',
            description: 'Iterate through each row of result matrix.',
            calculation: 'i = 0, 1 (for 2×2 matrix)',
            result: 'Row iteration set up'
          },
          {
            title: 'Step 3: Middle Loop - Columns',
            formula: 'for (let j = 0; j < colsB; j++)',
            description: 'Iterate through each column of result matrix.',
            calculation: 'j = 0, 1 (for 2×2 result)',
            result: 'Column iteration set up'
          },
          {
            title: 'Step 4: Inner Loop - Dot Product',
            formula: 'sum += A[i][k] × B[k][j]',
            description: 'Calculate dot product: sum of products of corresponding elements.',
            calculation: 'For i=0, j=0: k=0: 1×5=5, k=1: 2×7=14, sum=19',
            result: 'Dot product calculated'
          },
          {
            title: 'Step 5: Store Result',
            formula: 'result[i][j] = sum',
            description: 'Store the calculated sum in result matrix.',
            calculation: 'result[0][0] = 19',
            result: 'Element stored'
          }
        ]
      }
    },
    'scaling': {
      1: {
        explanation: 'Scaling transforms objects by multiplying coordinates. Uniform scaling preserves shape, non-uniform changes it.',
        steps: [
          {
            title: 'Step 1: Define Scale Factors',
            formula: 'sx, sy, sz (scale factors for x, y, z axes)',
            description: 'Determine how much to scale in each direction.',
            calculation: 'Uniform: sx = sy = sz = 2 (double size)\nNon-uniform: sx = 2, sy = 1, sz = 1 (stretch x-axis)',
            result: 'Scale factors defined'
          },
          {
            title: 'Step 2: Apply to Coordinates',
            formula: 'x\' = sx × x, y\' = sy × y, z\' = sz × z',
            description: 'Multiply each coordinate by its scale factor.',
            calculation: 'Point (3, 4, 5) with scale (2, 2, 2):\nx\' = 2 × 3 = 6\ny\' = 2 × 4 = 8\nz\' = 2 × 5 = 10',
            result: 'Scaled point: (6, 8, 10)'
          },
          {
            title: 'Step 3: Create Scaling Matrix',
            formula: 'S = [[sx, 0, 0], [0, sy, 0], [0, 0, sz]]',
            description: 'Scaling matrix has scale factors on diagonal, zeros elsewhere.',
            calculation: 'For sx=2, sy=3: S = [[2, 0, 0], [0, 3, 0], [0, 0, 1]]',
            result: 'Scaling matrix created'
          }
        ]
      },
      2: {
        explanation: 'Implementing scaling transformation in code requires matrix creation and multiplication.',
        steps: [
          {
            title: 'Step 1: Create Scaling Matrix Function',
            formula: 'function createScaleMatrix(sx, sy, sz)',
            description: 'Function to generate scaling matrix from scale factors.',
            calculation: 'Returns 3×3 or 4×4 matrix with scale factors on diagonal',
            result: 'Function defined'
          },
          {
            title: 'Step 2: Apply to Vertices',
            formula: 'newVertex = scaleMatrix × vertex',
            description: 'Multiply each vertex by scaling matrix.',
            calculation: 'For vertex [x, y, z] and scale [2, 2, 2]:\n[x\', y\', z\'] = [[2,0,0],[0,2,0],[0,0,2]] × [x, y, z]',
            result: 'Vertices scaled'
          }
        ]
      }
      // Steps 3-6 would continue with WebGL implementation, uniform vs non-uniform, etc.
    },
    'translation': {
      1: {
        explanation: 'Translation moves objects by adding offsets to coordinates. Requires homogeneous coordinates for matrix representation.',
        steps: [
          {
            title: 'Step 1: Define Translation Vector',
            formula: 't = [tx, ty, tz]',
            description: 'Vector representing how far to move in each direction.',
            calculation: 't = [5, 3, 0] means move 5 units right, 3 units up',
            result: 'Translation vector defined'
          },
          {
            title: 'Step 2: Apply to Coordinates',
            formula: 'x\' = x + tx, y\' = y + ty, z\' = z + tz',
            description: 'Add translation components to each coordinate.',
            calculation: 'Point (2, 4, 1) with translation (5, 3, 0):\nx\' = 2 + 5 = 7\ny\' = 4 + 3 = 7\nz\' = 1 + 0 = 1',
            result: 'Translated point: (7, 7, 1)'
          },
          {
            title: 'Step 3: Create Translation Matrix (2D)',
            formula: 'T = [[1, 0, tx], [0, 1, ty], [0, 0, 1]]',
            description: '2D translation matrix using homogeneous coordinates.',
            calculation: 'For tx=5, ty=3: T = [[1, 0, 5], [0, 1, 3], [0, 0, 1]]',
            result: 'Translation matrix created'
          },
          {
            title: 'Step 4: Create Translation Matrix (3D)',
            formula: 'T = [[1,0,0,tx], [0,1,0,ty], [0,0,1,tz], [0,0,0,1]]',
            description: '3D translation matrix using 4×4 homogeneous coordinates.',
            calculation: 'For tx=5, ty=3, tz=2: T = [[1,0,0,5], [0,1,0,3], [0,0,1,2], [0,0,0,1]]',
            result: '3D translation matrix created'
          }
        ]
      }
      // More steps for translation...
    },
    'rotation': {
      1: {
        explanation: 'Rotation rotates objects around an axis by an angle. Requires trigonometry (sin, cos).',
        steps: [
          {
            title: 'Step 1: Define Rotation Angle',
            formula: 'θ (theta) in radians',
            description: 'Angle to rotate. Convert degrees to radians: radians = degrees × π/180.',
            calculation: '45° = 45 × π/180 = π/4 ≈ 0.785 radians',
            result: 'Angle defined'
          },
          {
            title: 'Step 2: Calculate Trig Values',
            formula: 'cos(θ), sin(θ)',
            description: 'Compute cosine and sine of rotation angle.',
            calculation: 'For θ = π/4:\ncos(π/4) = √2/2 ≈ 0.707\nsin(π/4) = √2/2 ≈ 0.707',
            result: 'Trigonometric values calculated'
          },
          {
            title: 'Step 3: Create 2D Rotation Matrix',
            formula: 'R = [[cos(θ), -sin(θ)], [sin(θ), cos(θ)]]',
            description: '2D rotation matrix rotates around z-axis (perpendicular to xy-plane).',
            calculation: 'For θ = π/4: R = [[0.707, -0.707], [0.707, 0.707]]',
            result: '2D rotation matrix created'
          },
          {
            title: 'Step 4: Apply Rotation',
            formula: '[x\', y\'] = R × [x, y]',
            description: 'Multiply point by rotation matrix.',
            calculation: 'Point (1, 0) rotated 90°:\n[x\', y\'] = [[0, -1], [1, 0]] × [1, 0] = [0, 1]',
            result: 'Point rotated'
          }
        ]
      }
      // More steps for 3D rotation, axis rotations...
    },
    'reflection': {
      1: {
        explanation: 'Reflection mirrors objects across a line (2D) or plane (3D).',
        steps: [
          {
            title: 'Step 1: Define Reflection Axis/Plane',
            formula: 'Line: ax + by + c = 0 or Plane: ax + by + cz + d = 0',
            description: 'Mathematical equation of reflection line or plane.',
            calculation: 'Reflect across x-axis: y = 0\nReflect across y-axis: x = 0',
            result: 'Reflection axis/plane defined'
          },
          {
            title: 'Step 2: Create Reflection Matrix (2D)',
            formula: 'Reflect across x-axis: [[1, 0], [0, -1]]\nReflect across y-axis: [[-1, 0], [0, 1]]',
            description: 'Reflection matrices flip coordinates across axes.',
            calculation: 'Reflect (3, 4) across x-axis:\n[x\', y\'] = [[1, 0], [0, -1]] × [3, 4] = [3, -4]',
            result: 'Reflection matrix created'
          }
        ]
      }
    },
    'combined': {
      1: {
        explanation: 'Combined transformations apply multiple transformations in sequence. Order matters!',
        steps: [
          {
            title: 'Step 1: Define Transformation Order',
            formula: 'T_final = T1 × T2 × T3 × ...',
            description: 'Rightmost transformation applied first, leftmost applied last.',
            calculation: 'Scale then Rotate: T = R × S\nRotate then Scale: T = S × R\nThese give different results!',
            result: 'Order determined'
          },
          {
            title: 'Step 2: Multiply Transformation Matrices',
            formula: 'T_combined = T_translate × T_rotate × T_scale',
            description: 'Multiply matrices in reverse order of application.',
            calculation: 'To apply Scale → Rotate → Translate:\nT = T_translate × T_rotate × T_scale',
            result: 'Matrices multiplied'
          },
          {
            title: 'Step 3: Apply Combined Transformation',
            formula: 'point\' = T_combined × point',
            description: 'Single matrix multiplication applies all transformations.',
            calculation: 'Instead of 3 separate multiplications, use 1 combined matrix',
            result: 'Transformation applied efficiently'
          }
        ]
      }
    },
    'quaternions': {
      1: {
        explanation: 'Quaternions are 4D numbers that represent 3D rotations efficiently, avoiding gimbal lock.',
        steps: [
          {
            title: 'Step 1: Understand Quaternion Structure',
            formula: 'q = (w, x, y, z) = w + xi + yj + zk',
            description: 'Quaternion has 4 components: scalar w and vector (x, y, z).',
            calculation: 'Example: q = (1, 0, 0, 0) is identity (no rotation)',
            result: 'Quaternion structure understood'
          },
          {
            title: 'Step 2: Normalize Quaternion',
            formula: 'q_normalized = q / |q| where |q| = √(w² + x² + y² + z²)',
            description: 'For rotation, quaternion must be unit length.',
            calculation: 'q = (1, 1, 1, 1), |q| = √4 = 2\nq_normalized = (0.5, 0.5, 0.5, 0.5)',
            result: 'Quaternion normalized'
          },
          {
            title: 'Step 3: Interpret Components',
            formula: 'Axis = normalize(x, y, z), Angle = 2×arccos(w)',
            description: 'Quaternion encodes rotation axis and angle.',
            calculation: 'q = (cos(30°), sin(30°)×1, 0, 0)\nAxis = (1, 0, 0), Angle = 60°',
            result: 'Rotation axis and angle extracted'
          }
        ]
      },
      2: {
        explanation: 'Convert Euler angles (pitch, yaw, roll) to quaternion representation.',
        steps: [
          {
            title: 'Step 1: Convert Each Axis Rotation',
            formula: 'qx = (cos(rx/2), sin(rx/2), 0, 0)\nqy = (cos(ry/2), 0, sin(ry/2), 0)\nqz = (cos(rz/2), 0, 0, sin(rz/2))',
            description: 'Create quaternion for rotation around each axis.',
            calculation: 'rx = 90°: qx = (cos(45°), sin(45°), 0, 0) = (0.707, 0.707, 0, 0)',
            result: 'Axis quaternions created'
          },
          {
            title: 'Step 2: Combine Quaternions',
            formula: 'q_final = qz × qy × qx',
            description: 'Multiply quaternions in order (Z, Y, X).',
            calculation: 'For rx=90°, ry=0°, rz=0°:\nq = qz × qy × qx = (0.707, 0.707, 0, 0)',
            result: 'Combined quaternion created'
          }
        ]
      },
      3: {
        explanation: 'Convert quaternion to 3×3 rotation matrix for use in graphics.',
        steps: [
          {
            title: 'Step 1: Extract Components',
            formula: 'q = (w, x, y, z)',
            description: 'Get quaternion components.',
            calculation: 'q = (0.707, 0.707, 0, 0)',
            result: 'Components extracted'
          },
          {
            title: 'Step 2: Calculate Matrix Elements',
            formula: 'R[0][0] = 1 - 2(y² + z²)\nR[0][1] = 2(xy - wz)\nR[0][2] = 2(xz + wy)\n...',
            description: 'Use quaternion-to-matrix formula.',
            calculation: 'For q = (0.707, 0.707, 0, 0):\nR[0][0] = 1 - 2(0 + 0) = 1\nR[0][1] = 2(0 - 0) = 0\nR[0][2] = 2(0 + 0) = 0\nR[1][0] = 2(0 + 0) = 0\nR[1][1] = 1 - 2(0.5 + 0) = 0\nR[1][2] = 2(0 - 0.5) = -1\n...',
            result: 'Rotation matrix: [[1,0,0],[0,0,-1],[0,1,0]]'
          }
        ]
      },
      4: {
        explanation: 'Multiply quaternions to compose rotations. Order matters!',
        steps: [
          {
            title: 'Step 1: Multiply Components',
            formula: 'q1 × q2 = (w1w2 - x1x2 - y1y2 - z1z2,\n           w1x2 + x1w2 + y1z2 - z1y2,\n           w1y2 - x1z2 + y1w2 + z1x2,\n           w1z2 + x1y2 - y1x2 + z1w2)',
            description: 'Quaternion multiplication formula.',
            calculation: 'q1 = (1, 0, 0, 0), q2 = (0.707, 0.707, 0, 0)\nw = 1×0.707 - 0×0.707 - 0×0 - 0×0 = 0.707\nx = 1×0.707 + 0×0.707 + 0×0 - 0×0 = 0.707\n...',
            result: 'q1 × q2 = (0.707, 0.707, 0, 0)'
          },
          {
            title: 'Step 2: Normalize Result',
            formula: 'q_result = q_result / |q_result|',
            description: 'Ensure result is unit quaternion.',
            calculation: '|q_result| = 1 (already normalized)',
            result: 'Quaternion multiplied and normalized'
          }
        ]
      },
      5: {
        explanation: 'Smoothly interpolate between two rotations using SLERP.',
        steps: [
          {
            title: 'Step 1: Calculate Dot Product',
            formula: 'dot = q1·q2 = w1w2 + x1x2 + y1y2 + z1z2',
            description: 'Find angle between quaternions.',
            calculation: 'q1 = (1, 0, 0, 0), q2 = (0.707, 0.707, 0, 0)\ndot = 1×0.707 + 0×0.707 + 0×0 + 0×0 = 0.707',
            result: 'Dot product calculated'
          },
          {
            title: 'Step 2: Calculate Angle',
            formula: 'θ = arccos(dot)',
            description: 'Angle between quaternions on 4D sphere.',
            calculation: 'θ = arccos(0.707) = 45° = π/4 radians',
            result: 'Angle calculated'
          },
          {
            title: 'Step 3: Interpolate',
            formula: 'slerp(q1, q2, t) = (sin((1-t)θ)/sin(θ))×q1 + (sin(tθ)/sin(θ))×q2',
            description: 'Interpolate along shortest path on sphere.',
            calculation: 'For t = 0.5:\ns1 = sin(22.5°)/sin(45°) = 0.382/0.707 = 0.541\ns2 = sin(22.5°)/sin(45°) = 0.541\nslerp = 0.541×q1 + 0.541×q2',
            result: 'Smooth interpolation calculated'
          }
        ]
      },
      6: {
        explanation: 'Implement quaternion rotations in WebGL for real-time graphics.',
        steps: [
          {
            title: 'Step 1: Convert Quaternion to Matrix',
            formula: 'matrix = quaternionToMatrix(quaternion)',
            description: 'Convert quaternion to 4×4 rotation matrix.',
            calculation: 'q = (w, x, y, z) → 4×4 matrix',
            result: 'Matrix created'
          },
          {
            title: 'Step 2: Upload to GPU',
            formula: 'gl.uniformMatrix4fv(location, false, matrix)',
            description: 'Send matrix to vertex shader.',
            calculation: 'Matrix uploaded as uniform',
            result: 'GPU ready'
          },
          {
            title: 'Step 3: Apply in Shader',
            formula: 'gl_Position = uProjection × uView × uRotation × aPosition',
            description: 'Apply rotation matrix in vertex shader.',
            calculation: 'All vertices rotated simultaneously',
            result: 'Rotation applied'
          }
        ]
      }
    },
    'projection': {
      1: {
        explanation: 'Projections map 3D coordinates to 2D screen space. Perspective creates depth illusion, orthographic preserves parallel lines.',
        steps: [
          {
            title: 'Step 1: Understand Perspective',
            formula: 'x\' = (x × near) / z\ny\' = (y × near) / z',
            description: 'Objects farther (larger z) appear smaller.',
            calculation: 'Point (10, 10, 10) with near=1:\nx\' = (10 × 1) / 10 = 1\ny\' = (10 × 1) / 10 = 1',
            result: 'Perspective projection calculated'
          },
          {
            title: 'Step 2: Understand Orthographic',
            formula: 'x\' = x, y\' = y',
            description: 'No depth scaling, parallel lines stay parallel.',
            calculation: 'Point (10, 10, 10):\nx\' = 10, y\' = 10 (no change)',
            result: 'Orthographic projection calculated'
          }
        ]
      },
      2: {
        explanation: 'Create perspective projection matrix using field of view and aspect ratio.',
        steps: [
          {
            title: 'Step 1: Calculate Focal Length',
            formula: 'f = 1 / tan(fov / 2)',
            description: 'Focal length from field of view angle.',
            calculation: 'fov = 45° = π/4\nf = 1 / tan(π/8) = 1 / 0.414 = 2.414',
            result: 'Focal length calculated'
          },
          {
            title: 'Step 2: Build Matrix',
            formula: 'P = [[f/aspect, 0, 0, 0],\n     [0, f, 0, 0],\n     [0, 0, (n+f)/(n-f), 2nf/(n-f)],\n     [0, 0, -1, 0]]',
            description: 'Create 4×4 perspective matrix.',
            calculation: 'For fov=45°, aspect=1, near=0.1, far=100:\nf = 2.414\nP[0][0] = 2.414/1 = 2.414\nP[1][1] = 2.414\nP[2][2] = (0.1+100)/(0.1-100) = -1.002\nP[2][3] = 2×0.1×100/(0.1-100) = -0.2002',
            result: 'Perspective matrix created'
          }
        ]
      },
      3: {
        explanation: 'Create orthographic projection matrix using bounding box.',
        steps: [
          {
            title: 'Step 1: Define View Volume',
            formula: 'left, right, bottom, top, near, far',
            description: 'Bounding box defining visible region.',
            calculation: 'left=-5, right=5, bottom=-5, top=5, near=-10, far=10',
            result: 'View volume defined'
          },
          {
            title: 'Step 2: Build Matrix',
            formula: 'P = [[2/(r-l), 0, 0, -(r+l)/(r-l)],\n     [0, 2/(t-b), 0, -(t+b)/(t-b)],\n     [0, 0, -2/(f-n), -(f+n)/(f-n)],\n     [0, 0, 0, 1]]',
            description: 'Create orthographic projection matrix.',
            calculation: 'P[0][0] = 2/(5-(-5)) = 0.2\nP[0][3] = -(5+(-5))/(5-(-5)) = 0\nP[1][1] = 2/(5-(-5)) = 0.2\nP[2][2] = -2/(10-(-10)) = -0.1',
            result: 'Orthographic matrix created'
          }
        ]
      },
      4: {
        explanation: 'After projection matrix, divide by w component to get final screen coordinates.',
        steps: [
          {
            title: 'Step 1: Apply Projection Matrix',
            formula: '[x, y, z, w] = P × [x, y, z, 1]',
            description: 'Multiply point by projection matrix.',
            calculation: 'Point (0, 0, -5) with perspective:\n[x, y, z, w] = [0, 0, -5.01, 5]',
            result: 'Projected to homogeneous coordinates'
          },
          {
            title: 'Step 2: Perspective Divide',
            formula: 'x\' = x/w, y\' = y/w, z\' = z/w',
            description: 'Divide by w component.',
            calculation: 'x\' = 0/5 = 0\ny\' = 0/5 = 0\nz\' = -5.01/5 = -1.002',
            result: 'Final NDC coordinates: (0, 0, -1.002)'
          }
        ]
      },
      5: {
        explanation: 'Map normalized device coordinates to screen pixels.',
        steps: [
          {
            title: 'Step 1: NDC Range',
            formula: 'NDC: x ∈ [-1, 1], y ∈ [-1, 1]',
            description: 'Normalized device coordinates after projection.',
            calculation: 'Point in NDC: (0.5, -0.5, 0)',
            result: 'NDC coordinates'
          },
          {
            title: 'Step 2: Map to Screen',
            formula: 'screenX = (ndcX + 1) × width / 2\nscreenY = (1 - ndcY) × height / 2',
            description: 'Convert NDC to pixel coordinates.',
            calculation: 'For width=800, height=600:\nscreenX = (0.5 + 1) × 800 / 2 = 600\nscreenY = (1 - (-0.5)) × 600 / 2 = 450',
            result: 'Screen coordinates: (600, 450)'
          }
        ]
      },
      6: {
        explanation: 'Combine model, view, and projection matrices for complete 3D rendering pipeline.',
        steps: [
          {
            title: 'Step 1: Create MVP Matrix',
            formula: 'MVP = Projection × View × Model',
            description: 'Multiply matrices in reverse order of application.',
            calculation: 'M = Model matrix\nV = View (camera) matrix\nP = Projection matrix\nMVP = P × V × M',
            result: 'MVP matrix created'
          },
          {
            title: 'Step 2: Apply in Shader',
            formula: 'gl_Position = uMVP × aPosition',
            description: 'Single matrix multiplication transforms vertex.',
            calculation: 'Vertex transformed from object space → camera space → clip space',
            result: 'Vertex ready for rendering'
          }
        ]
      }
    }
  };

  if (steps[module]) {
    if (steps[module][step]) {
      return steps[module][step];
    } else if (steps[module][1]) {
      return steps[module][1];
    }
  }
  
  return null;
};

