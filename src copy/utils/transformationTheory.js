// Theory content for Transformation Visualization tutorial

export const getTransformationTheory = (module, step) => {
  const theories = {
    'matrix-operations': {
      1: {
        title: 'Step 1: Understanding Matrices',
        description: 'Matrices are rectangular arrays of numbers arranged in rows and columns. They are fundamental to linear transformations in computer graphics.',
        concepts: [
          {
            name: 'Matrix Structure',
            description: 'A matrix is defined by its dimensions: rows × columns. A 2×2 matrix has 2 rows and 2 columns.',
            formula: 'M = [a b; c d] = [[a, b], [c, d]]'
          },
          {
            name: 'Matrix Elements',
            description: 'Each number in a matrix is called an element. Elements are accessed by row and column indices (0-based).',
            code: 'matrix[row][column]'
          }
        ],
        geometricMeaning: 'Matrices represent linear transformations. Each transformation (rotation, scaling, translation) can be represented as a matrix.',
        applications: [
          '2D/3D graphics transformations',
          'Computer vision',
          'Machine learning',
          'Physics simulations'
        ]
      },
      2: {
        title: 'Step 2: Matrix Addition',
        description: 'Matrix addition is performed element-wise. Two matrices must have the same dimensions to be added.',
        concepts: [
          {
            name: 'Addition Rule',
            description: 'Add corresponding elements: C[i][j] = A[i][j] + B[i][j]',
            formula: 'C = A + B where C[i][j] = A[i][j] + B[i][j]'
          }
        ],
        geometricMeaning: 'Matrix addition represents combining transformations. The result is a new transformation that applies both effects.',
        applications: [
          'Combining translation vectors',
          'Adding transformation offsets',
          'Blending transformations'
        ]
      },
      3: {
        title: 'Step 3: Matrix Subtraction',
        description: 'Matrix subtraction is performed element-wise, similar to addition.',
        concepts: [
          {
            name: 'Subtraction Rule',
            description: 'Subtract corresponding elements: C[i][j] = A[i][j] - B[i][j]',
            formula: 'C = A - B where C[i][j] = A[i][j] - B[i][j]'
          }
        ],
        geometricMeaning: 'Matrix subtraction finds the difference between transformations. Useful for inverse operations.',
        applications: [
          'Finding inverse transformations',
          'Calculating differences',
          'Undoing transformations'
        ]
      },
      4: {
        title: 'Step 4: Matrix Multiplication - Scalar',
        description: 'Multiplying a matrix by a scalar multiplies every element by that scalar.',
        concepts: [
          {
            name: 'Scalar Multiplication',
            description: 'Multiply each element by the scalar: B[i][j] = k × A[i][j]',
            formula: 'B = k × A where B[i][j] = k × A[i][j]'
          }
        ],
        geometricMeaning: 'Scalar multiplication scales the transformation uniformly. Used for scaling transformations.',
        applications: [
          'Uniform scaling',
          'Intensity adjustments',
          'Amplifying transformations'
        ]
      },
      5: {
        title: 'Step 5: Matrix Multiplication - Matrix',
        description: 'Matrix multiplication combines two transformations. Order matters! A × B ≠ B × A in general.',
        concepts: [
          {
            name: 'Multiplication Rule',
            description: 'C[i][j] = sum of A[i][k] × B[k][j] for all k',
            formula: 'C = A × B where C[i][j] = Σ(k) A[i][k] × B[k][j]'
          },
          {
            name: 'Dimension Requirement',
            description: 'For A × B, number of columns in A must equal number of rows in B.',
            code: 'A: m×n, B: n×p → Result: m×p'
          }
        ],
        geometricMeaning: 'Matrix multiplication composes transformations. The result applies B first, then A.',
        applications: [
          'Combining rotations, scales, translations',
          'Transforming coordinate systems',
          '3D graphics pipeline'
        ]
      },
      6: {
        title: 'Step 6: Matrix Multiplication Implementation',
        description: 'Implementing matrix multiplication efficiently in JavaScript and WebGL.',
        concepts: [
          {
            name: 'JavaScript Implementation',
            description: 'Nested loops iterate through rows and columns, computing dot products.',
            code: 'for (let i = 0; i < rows; i++) {\n  for (let j = 0; j < cols; j++) {\n    result[i][j] = dotProduct(A[i], B[j]);\n  }\n}'
          },
          {
            name: 'WebGL Implementation',
            description: 'Use GLSL matrix types and built-in multiplication operators.',
            code: 'mat4 result = matrixA * matrixB;'
          }
        ],
        geometricMeaning: 'Efficient matrix multiplication is crucial for real-time graphics performance.',
        applications: [
          'GPU-accelerated transformations',
          'Real-time 3D rendering',
          'Animation systems'
        ]
      }
    },
    'scaling': {
      1: {
        title: 'Step 1: Understanding Scaling',
        description: 'Scaling transforms objects by multiplying their coordinates. Can be uniform (same in all axes) or non-uniform (different per axis).',
        concepts: [
          {
            name: 'Uniform Scaling',
            description: 'All dimensions scaled by the same factor. Preserves shape, changes size.',
            formula: 'x\' = s×x, y\' = s×y, z\' = s×z (where s is the scale factor)'
          },
          {
            name: 'Non-Uniform Scaling',
            description: 'Different scale factors for each axis. Changes shape and size.',
            formula: 'x\' = sx×x, y\' = sy×y, z\' = sz×z'
          },
          {
            name: 'Scaling Matrix (2D)',
            description: '2D scaling matrix with scale factors on diagonal.',
            formula: 'S = [[sx, 0], [0, sy]]'
          },
          {
            name: 'Scaling Matrix (3D)',
            description: '3D scaling matrix using homogeneous coordinates.',
            formula: 'S = [[sx, 0, 0, 0], [0, sy, 0, 0], [0, 0, sz, 0], [0, 0, 0, 1]]'
          }
        ],
        geometricMeaning: 'Scaling multiplies distances from the origin. Objects grow or shrink while maintaining their relative positions. Scale factor > 1 enlarges, < 1 shrinks, < 0 reflects.',
        applications: [
          'Zoom effects',
          'Resizing objects',
          'Perspective corrections',
          'UI scaling'
        ]
      },
      2: {
        title: 'Step 2: Implementing Scaling in JavaScript',
        description: 'Create functions to generate scaling matrices and apply them to points.',
        concepts: [
          {
            name: '2D Scaling Matrix Function',
            description: 'Function that creates 2D scaling matrix from scale factors.',
            code: 'function createScale2D(sx, sy) {\n  return [[sx, 0], [0, sy]];\n}'
          },
          {
            name: '3D Scaling Matrix Function',
            description: 'Function that creates 3D scaling matrix using homogeneous coordinates.',
            code: 'function createScale3D(sx, sy, sz) {\n  return [\n    [sx, 0, 0, 0],\n    [0, sy, 0, 0],\n    [0, 0, sz, 0],\n    [0, 0, 0, 1]\n  ];\n}'
          }
        ],
        geometricMeaning: 'Scaling matrices are diagonal matrices. Multiplying a point by scaling matrix scales each coordinate independently.',
        applications: [
          'Object resizing',
          'Camera zoom',
          'UI element scaling'
        ]
      },
      3: {
        title: 'Step 3: Applying Scaling to Vertices',
        description: 'Multiply each vertex of an object by the scaling matrix to resize it.',
        concepts: [
          {
            name: 'Scale Single Point',
            description: 'Apply scaling matrix to a single point.',
            code: 'const scaledPoint = matrixMultiply(scaleMatrix, point);'
          },
          {
            name: 'Scale All Vertices',
            description: 'Loop through all vertices and apply scaling.',
            code: 'for (let vertex of vertices) {\n  scaledVertices.push(matrixMultiply(scaleMatrix, vertex));\n}'
          }
        ],
        geometricMeaning: 'Each vertex is transformed independently. The object maintains its shape if scaling is uniform.',
        applications: [
          'Mesh scaling',
          'Sprite resizing',
          'Model transformations'
        ]
      },
      4: {
        title: 'Step 4: Uniform vs Non-Uniform Scaling',
        description: 'Understand the difference between uniform and non-uniform scaling and when to use each.',
        concepts: [
          {
            name: 'Uniform Scaling',
            description: 'Same scale factor for all axes. Preserves angles and proportions.',
            formula: 'sx = sy = sz = s'
          },
          {
            name: 'Non-Uniform Scaling',
            description: 'Different scale factors. Changes proportions, can create distortion.',
            formula: 'sx ≠ sy or sy ≠ sz'
          }
        ],
        geometricMeaning: 'Uniform scaling preserves shape (similarity transformation). Non-uniform scaling creates affine transformation that can distort.',
        applications: [
          'Zoom: uniform',
          'Stretching: non-uniform',
          'Squashing effects: non-uniform'
        ]
      },
      5: {
        title: 'Step 5: Scaling Around a Point',
        description: 'Scale objects around a specific point (pivot) rather than the origin.',
        concepts: [
          {
            name: 'Scaling Around Pivot',
            description: 'Translate to origin, scale, translate back.',
            formula: 'T = T_translate × S × T_translate_inverse'
          },
          {
            name: 'Matrix Composition',
            description: 'Combine translation and scaling matrices.',
            code: 'const pivot = [px, py, pz];\nconst T1 = createTranslate(-pivot[0], -pivot[1], -pivot[2]);\nconst S = createScale(sx, sy, sz);\nconst T2 = createTranslate(pivot[0], pivot[1], pivot[2]);\nconst result = matrixMultiply(T2, matrixMultiply(S, T1));'
          }
        ],
        geometricMeaning: 'Scaling around a pivot point keeps that point fixed while scaling everything else relative to it.',
        applications: [
          'UI element scaling around center',
          'Model scaling around pivot',
          'Animation scaling'
        ]
      },
      6: {
        title: 'Step 6: WebGL Scaling Implementation',
        description: 'Implement scaling in WebGL using shaders and matrix uniforms.',
        concepts: [
          {
            name: 'GLSL Scaling',
            description: 'Apply scaling matrix in vertex shader.',
            code: 'uniform mat4 uScaleMatrix;\nattribute vec4 aPosition;\nvoid main() {\n  gl_Position = uScaleMatrix * aPosition;\n}'
          },
          {
            name: 'JavaScript Setup',
            description: 'Create and upload scaling matrix to GPU.',
            code: 'const scaleMatrix = createScale3D(2.0, 2.0, 2.0);\ngl.uniformMatrix4fv(uScaleMatrixLocation, false, flattenMatrix(scaleMatrix));'
          }
        ],
        geometricMeaning: 'GPU-accelerated scaling allows real-time transformation of thousands of vertices efficiently.',
        applications: [
          'Real-time 3D graphics',
          'Particle systems',
          'Dynamic mesh deformation'
        ]
      }
    },
    'translation': {
      1: {
        title: 'Step 1: Understanding Translation',
        description: 'Translation moves objects by adding offsets to coordinates. Requires homogeneous coordinates for matrix representation.',
        concepts: [
          {
            name: 'Translation Vector',
            description: 'Vector representing displacement in each direction.',
            formula: 't = [tx, ty, tz]'
          },
          {
            name: 'Coordinate Addition',
            description: 'Add translation components to coordinates.',
            formula: 'x\' = x + tx, y\' = y + ty, z\' = z + tz'
          },
          {
            name: 'Why Homogeneous Coordinates?',
            description: 'Translation cannot be represented as matrix multiplication in standard coordinates. Homogeneous coordinates solve this.',
            formula: 'Use 4D coordinates [x, y, z, 1] for 3D transformations'
          }
        ],
        geometricMeaning: 'Translation moves every point by the same amount. All points maintain their relative positions.',
        applications: [
          'Moving objects',
          'Camera positioning',
          'UI element placement'
        ]
      },
      2: {
        title: 'Step 2: Translation Matrix (2D)',
        description: 'Create 2D translation matrix using homogeneous coordinates (3×3 matrix).',
        concepts: [
          {
            name: '2D Translation Matrix',
            description: 'Matrix that translates 2D points.',
            formula: 'T = [[1, 0, tx], [0, 1, ty], [0, 0, 1]]'
          },
          {
            name: 'Matrix Structure',
            description: 'Identity matrix with translation in last column.',
            code: 'function createTranslate2D(tx, ty) {\n  return [[1, 0, tx], [0, 1, ty], [0, 0, 1]];\n}'
          }
        ],
        geometricMeaning: 'The 3×3 matrix allows translation to be combined with other transformations through matrix multiplication.',
        applications: [
          '2D sprite movement',
          'UI element positioning',
          '2D game object placement'
        ]
      },
      3: {
        title: 'Step 3: Translation Matrix (3D)',
        description: 'Create 3D translation matrix using 4×4 homogeneous coordinates.',
        concepts: [
          {
            name: '3D Translation Matrix',
            description: '4×4 matrix for 3D translation.',
            formula: 'T = [[1,0,0,tx], [0,1,0,ty], [0,0,1,tz], [0,0,0,1]]'
          },
          {
            name: 'Homogeneous Coordinates',
            description: 'Convert 3D point [x,y,z] to homogeneous [x,y,z,1] for matrix multiplication.',
            code: 'function createTranslate3D(tx, ty, tz) {\n  return [\n    [1, 0, 0, tx],\n    [0, 1, 0, ty],\n    [0, 0, 1, tz],\n    [0, 0, 0, 1]\n  ];\n}'
          }
        ],
        geometricMeaning: 'The 4th component (w=1) allows translation to be represented as matrix multiplication, enabling composition with other transformations.',
        applications: [
          '3D object positioning',
          'Camera movement',
          'Scene graph transformations'
        ]
      },
      4: {
        title: 'Step 4: Applying Translation',
        description: 'Multiply points by translation matrix to move them.',
        concepts: [
          {
            name: 'Translate Point',
            description: 'Apply translation matrix to a point.',
            code: 'const point = [x, y, z, 1]; // Homogeneous\nconst translated = matrixMultiply(translateMatrix, point);\n// Extract 3D: [translated[0], translated[1], translated[2]]'
          },
          {
            name: 'Translate All Vertices',
            description: 'Apply translation to entire object.',
            code: 'for (let vertex of vertices) {\n  const homogeneous = [...vertex, 1];\n  const translated = matrixMultiply(T, homogeneous);\n  translatedVertices.push([translated[0], translated[1], translated[2]]);\n}'
          }
        ],
        geometricMeaning: 'Every vertex moves by the same amount, preserving object shape and orientation.',
        applications: [
          'Object movement',
          'Animation',
          'Scene navigation'
        ]
      },
      5: {
        title: 'Step 5: Inverse Translation',
        description: 'Undo translation by applying inverse translation matrix.',
        concepts: [
          {
            name: 'Inverse Translation Matrix',
            description: 'Negate translation components.',
            formula: 'T⁻¹ = [[1,0,0,-tx], [0,1,0,-ty], [0,0,1,-tz], [0,0,0,1]]'
          },
          {
            name: 'Undo Translation',
            description: 'Apply inverse to return to original position.',
            code: 'const inverseT = createTranslate3D(-tx, -ty, -tz);\nconst original = matrixMultiply(inverseT, translated);'
          }
        ],
        geometricMeaning: 'Inverse translation moves object back to original position by negating the translation vector.',
        applications: [
          'Animation reversals',
          'Undo operations',
          'Coordinate system transformations'
        ]
      },
      6: {
        title: 'Step 6: WebGL Translation',
        description: 'Implement translation in WebGL shaders.',
        concepts: [
          {
            name: 'Vertex Shader Translation',
            description: 'Apply translation matrix in vertex shader.',
            code: 'uniform mat4 uTranslateMatrix;\nattribute vec4 aPosition;\nvoid main() {\n  gl_Position = uTranslateMatrix * aPosition;\n}'
          },
          {
            name: 'Upload Matrix',
            description: 'Send translation matrix to GPU.',
            code: 'const translateMatrix = createTranslate3D(5.0, 3.0, 0.0);\ngl.uniformMatrix4fv(uTranslateLocation, false, flattenMatrix(translateMatrix));'
          }
        ],
        geometricMeaning: 'GPU handles translation for all vertices in parallel, enabling efficient real-time movement.',
        applications: [
          'Real-time object movement',
          'Dynamic scene updates',
          'Particle systems'
        ]
      }
    },
    'rotation': {
      1: {
        title: 'Step 1: Understanding Rotation',
        description: 'Rotation rotates objects around an axis by an angle. Requires trigonometry (sin, cos).',
        concepts: [
          {
            name: 'Rotation Angle',
            description: 'Angle measured in radians. Positive = counterclockwise (right-hand rule).',
            formula: 'θ (theta) in radians, where 2π = 360°'
          },
          {
            name: '2D Rotation',
            description: 'Rotation in 2D is around z-axis (perpendicular to xy-plane).',
            formula: 'x\' = x×cos(θ) - y×sin(θ)\ny\' = x×sin(θ) + y×cos(θ)'
          },
          {
            name: 'Rotation Matrix (2D)',
            description: '2×2 matrix for 2D rotation.',
            formula: 'R = [[cos(θ), -sin(θ)], [sin(θ), cos(θ)]]'
          }
        ],
        geometricMeaning: 'Rotation preserves distances and angles. Points rotate around origin in circular paths.',
        applications: [
          'Object orientation',
          'Camera rotation',
          'Animation'
        ]
      },
      2: {
        title: 'Step 2: 2D Rotation Implementation',
        description: 'Implement 2D rotation using rotation matrix.',
        concepts: [
          {
            name: 'Create Rotation Matrix',
            description: 'Function to generate 2D rotation matrix.',
            code: 'function createRotate2D(angle) {\n  const c = Math.cos(angle);\n  const s = Math.sin(angle);\n  return [[c, -s], [s, c]];\n}'
          },
          {
            name: 'Apply Rotation',
            description: 'Rotate a point using matrix multiplication.',
            code: 'const rotated = matrixMultiply(rotateMatrix, point);'
          }
        ],
        geometricMeaning: 'Matrix multiplication rotates point around origin. Each point follows circular path.',
        applications: [
          'Sprite rotation',
          'UI element rotation',
          '2D game mechanics'
        ]
      },
      3: {
        title: 'Step 3: 3D Rotation Around Axes',
        description: '3D rotation can occur around X, Y, or Z axis. Each has its own rotation matrix.',
        concepts: [
          {
            name: 'Rotation Around X-Axis',
            description: 'Rotates around x-axis (pitch).',
            formula: 'Rx = [[1, 0, 0, 0], [0, cos(θ), -sin(θ), 0], [0, sin(θ), cos(θ), 0], [0, 0, 0, 1]]'
          },
          {
            name: 'Rotation Around Y-Axis',
            description: 'Rotates around y-axis (yaw).',
            formula: 'Ry = [[cos(θ), 0, sin(θ), 0], [0, 1, 0, 0], [-sin(θ), 0, cos(θ), 0], [0, 0, 0, 1]]'
          },
          {
            name: 'Rotation Around Z-Axis',
            description: 'Rotates around z-axis (roll).',
            formula: 'Rz = [[cos(θ), -sin(θ), 0, 0], [sin(θ), cos(θ), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]'
          }
        ],
        geometricMeaning: 'Each axis rotation affects two coordinates. X-axis affects y and z, Y-axis affects x and z, Z-axis affects x and y.',
        applications: [
          'Camera control (pitch/yaw/roll)',
          'Object orientation',
          '3D animation'
        ]
      },
      4: {
        title: 'Step 4: Combining Rotations',
        description: 'Combine multiple rotations by multiplying rotation matrices. Order matters!',
        concepts: [
          {
            name: 'Euler Angles',
            description: 'Three rotations around X, Y, Z axes in sequence.',
            formula: 'R = Rz × Ry × Rx (applied in reverse order)'
          },
          {
            name: 'Gimbal Lock',
            description: 'Problem with Euler angles when two axes align. Use quaternions to avoid.',
            code: '// Problem: When pitch = ±90°, yaw and roll become ambiguous'
          }
        ],
        geometricMeaning: 'Combined rotations create complex 3D orientations. Order determines final orientation.',
        applications: [
          'Camera systems',
          'Character animation',
          'Spacecraft orientation'
        ]
      },
      5: {
        title: 'Step 5: Rotation Around Arbitrary Axis',
        description: 'Rotate around any axis (not just x, y, z) using Rodrigues\' rotation formula.',
        concepts: [
          {
            name: 'Rodrigues\' Formula',
            description: 'Rotate around unit vector axis by angle.',
            formula: 'R = I + sin(θ)×K + (1-cos(θ))×K²\nwhere K is skew-symmetric matrix of axis'
          },
          {
            name: 'Axis-Angle Representation',
            description: 'Represent rotation as axis vector and angle.',
            code: 'function rotateAroundAxis(axis, angle) {\n  // Normalize axis\n  // Apply Rodrigues\' formula\n  // Return rotation matrix\n}'
          }
        ],
        geometricMeaning: 'Arbitrary axis rotation allows rotation around any direction, not just coordinate axes.',
        applications: [
          'Complex 3D rotations',
          'Physics simulations',
          'Animation systems'
        ]
      },
      6: {
        title: 'Step 6: WebGL Rotation',
        description: 'Implement rotation in WebGL using shaders.',
        concepts: [
          {
            name: 'Vertex Shader Rotation',
            description: 'Apply rotation matrix in vertex shader.',
            code: 'uniform mat4 uRotateMatrix;\nattribute vec4 aPosition;\nvoid main() {\n  gl_Position = uRotateMatrix * aPosition;\n}'
          },
          {
            name: 'Animated Rotation',
            description: 'Update rotation angle each frame for animation.',
            code: 'let angle = 0;\nfunction animate() {\n  angle += 0.01;\n  const rotateMatrix = createRotateY(angle);\n  gl.uniformMatrix4fv(uRotateLocation, false, flattenMatrix(rotateMatrix));\n  requestAnimationFrame(animate);\n}'
          }
        ],
        geometricMeaning: 'GPU rotates all vertices simultaneously, enabling smooth real-time rotation of complex models.',
        applications: [
          'Real-time 3D rotation',
          'Animated objects',
          'Interactive 3D scenes'
        ]
      }
    },
    'reflection': {
      1: {
        title: 'Step 1: Understanding Reflection',
        description: 'Reflection mirrors objects across a line (2D) or plane (3D). Flips coordinates.',
        concepts: [
          {
            name: 'Reflection Across X-Axis',
            description: 'Flips y-coordinate, keeps x unchanged.',
            formula: 'x\' = x, y\' = -y'
          },
          {
            name: 'Reflection Across Y-Axis',
            description: 'Flips x-coordinate, keeps y unchanged.',
            formula: 'x\' = -x, y\' = y'
          },
          {
            name: 'Reflection Matrix (2D)',
            description: '2×2 matrices for axis reflections.',
            formula: 'Reflect X: [[1, 0], [0, -1]]\nReflect Y: [[-1, 0], [0, 1]]\nReflect Origin: [[-1, 0], [0, -1]]'
          }
        ],
        geometricMeaning: 'Reflection creates mirror image. Distances preserved but orientation flipped.',
        applications: [
          'Mirror effects',
          'Symmetry',
          'UI reflections'
        ]
      },
      2: {
        title: 'Step 2: Reflection Across Arbitrary Line',
        description: 'Reflect across any line in 2D using rotation and axis reflection.',
        concepts: [
          {
            name: 'Reflection Algorithm',
            description: 'Rotate line to axis, reflect, rotate back.',
            formula: 'R = R(-θ) × Reflect_axis × R(θ)'
          },
          {
            name: 'Line Equation',
            description: 'Line through origin: y = mx or ax + by = 0.',
            code: 'function reflectAcrossLine(m) {\n  const angle = Math.atan(m);\n  const R = createRotate2D(-angle);\n  const ReflectY = [[-1, 0], [0, 1]];\n  const R_inv = createRotate2D(angle);\n  return matrixMultiply(R_inv, matrixMultiply(ReflectY, R));\n}'
          }
        ],
        geometricMeaning: 'Arbitrary line reflection uses rotation to align line with axis, reflects, then rotates back.',
        applications: [
          'Advanced mirroring',
          'Symmetry operations',
          'Geometric transformations'
        ]
      },
      3: {
        title: 'Step 3: 3D Reflection',
        description: 'Reflect across planes in 3D space.',
        concepts: [
          {
            name: 'Reflection Across XY-Plane',
            description: 'Flips z-coordinate.',
            formula: '[[1,0,0,0], [0,1,0,0], [0,0,-1,0], [0,0,0,1]]'
          },
          {
            name: 'Reflection Across Arbitrary Plane',
            description: 'Use plane normal vector to create reflection matrix.',
            formula: 'R = I - 2×n×nᵀ\nwhere n is unit normal vector'
          }
        ],
        geometricMeaning: '3D reflection creates mirror image across plane. Preserves distances, flips orientation.',
        applications: [
          '3D mirror effects',
          'Symmetry in 3D',
          'Reflection mapping'
        ]
      },
      4: {
        title: 'Step 4: Implementing Reflection',
        description: 'Code implementation of reflection transformations.',
        concepts: [
          {
            name: '2D Axis Reflection',
            description: 'Simple reflection across coordinate axes.',
            code: 'function reflectX2D() {\n  return [[1, 0], [0, -1]];\n}\nfunction reflectY2D() {\n  return [[-1, 0], [0, 1]];\n}'
          },
          {
            name: 'Apply Reflection',
            description: 'Multiply points by reflection matrix.',
            code: 'const reflected = matrixMultiply(reflectMatrix, point);'
          }
        ],
        geometricMeaning: 'Reflection matrices are orthogonal (preserve distances) but have determinant -1 (flip orientation).',
        applications: [
          'Mirror effects',
          'Symmetry operations',
          'UI reflections'
        ]
      },
      5: {
        title: 'Step 5: Reflection Properties',
        description: 'Understand mathematical properties of reflections.',
        concepts: [
          {
            name: 'Reflection is Its Own Inverse',
            description: 'Reflecting twice returns to original.',
            formula: 'R × R = I, so R⁻¹ = R'
          },
          {
            name: 'Determinant',
            description: 'Reflection matrices have determinant -1.',
            formula: 'det(R) = -1'
          },
          {
            name: 'Preserves Distances',
            description: 'Reflection is an isometry - preserves distances.',
            formula: '|R×p1 - R×p2| = |p1 - p2|'
          }
        ],
        geometricMeaning: 'Reflections preserve shape and size but flip orientation. Two reflections can create rotation.',
        applications: [
          'Geometric proofs',
          'Symmetry groups',
          'Transformation composition'
        ]
      },
      6: {
        title: 'Step 6: WebGL Reflection',
        description: 'Implement reflection in WebGL.',
        concepts: [
          {
            name: 'Vertex Shader Reflection',
            description: 'Apply reflection matrix in shader.',
            code: 'uniform mat4 uReflectMatrix;\nattribute vec4 aPosition;\nvoid main() {\n  gl_Position = uReflectMatrix * aPosition;\n}'
          },
          {
            name: 'Mirror Effect',
            description: 'Combine reflection with other transformations.',
            code: 'const reflectMatrix = reflectX3D();\nconst combined = matrixMultiply(translateMatrix, reflectMatrix);'
          }
        ],
        geometricMeaning: 'GPU reflection enables real-time mirror effects and symmetry operations.',
        applications: [
          'Real-time mirrors',
          'Water reflections',
          'Symmetrical rendering'
        ]
      }
    },
    'combined': {
      1: {
        title: 'Step 1: Understanding Combined Transformations',
        description: 'Multiple transformations applied in sequence. Order matters! Rightmost transformation applied first.',
        concepts: [
          {
            name: 'Transformation Order',
            description: 'Matrix multiplication order is reverse of application order.',
            formula: 'To apply: Scale → Rotate → Translate\nMatrix: T × R × S'
          },
          {
            name: 'Why Order Matters',
            description: 'Different orders produce different results.',
            code: 'T × R × S ≠ S × R × T\n(Translate then Rotate then Scale) ≠ (Scale then Rotate then Translate)'
          }
        ],
        geometricMeaning: 'Each transformation affects the coordinate system. Order determines how transformations interact.',
        applications: [
          'Complex object transformations',
          'Hierarchical scene graphs',
          'Animation systems'
        ]
      },
      2: {
        title: 'Step 2: Matrix Composition',
        description: 'Combine transformation matrices through multiplication.',
        concepts: [
          {
            name: 'Compose Transformations',
            description: 'Multiply matrices in reverse order of application.',
            code: 'const scale = createScale3D(2, 2, 2);\nconst rotate = createRotateY(Math.PI/4);\nconst translate = createTranslate3D(5, 0, 0);\nconst combined = matrixMultiply(translate, matrixMultiply(rotate, scale));'
          },
          {
            name: 'Efficient Composition',
            description: 'Pre-compute combined matrix to avoid multiple multiplications.',
            code: '// Instead of: transform(scale(rotate(point)))\n// Use: transform(combinedMatrix × point)'
          }
        ],
        geometricMeaning: 'Single combined matrix applies all transformations at once, more efficient than sequential application.',
        applications: [
          'Performance optimization',
          'Complex transformations',
          'Scene graph rendering'
        ]
      },
      3: {
        title: 'Step 3: Common Transformation Sequences',
        description: 'Learn common patterns for combining transformations.',
        concepts: [
          {
            name: 'Scale-Rotate-Translate (SRT)',
            description: 'Common order: scale first, rotate, then translate.',
            formula: 'T_final = T × R × S'
          },
          {
            name: 'Local vs World Space',
            description: 'Transformations can be in local (object) or world (scene) space.',
            code: '// Local: Scale → Rotate → Translate (object space)\n// World: Apply world transform after local'
          }
        ],
        geometricMeaning: 'SRT order allows scaling and rotation around object center, then positioning in world.',
        applications: [
          '3D model positioning',
          'Sprite transformations',
          'UI element layout'
        ]
      },
      4: {
        title: 'Step 4: Transformation Hierarchy',
        description: 'Build transformation hierarchies for complex scenes.',
        concepts: [
          {
            name: 'Parent-Child Transforms',
            description: 'Child transformations are relative to parent.',
            formula: 'WorldTransform = ParentTransform × LocalTransform'
          },
          {
            name: 'Scene Graph',
            description: 'Tree structure of transformations.',
            code: 'class TransformNode {\n  constructor() {\n    this.localMatrix = identity();\n    this.children = [];\n  }\n  getWorldMatrix() {\n    if (this.parent) {\n      return matrixMultiply(this.parent.getWorldMatrix(), this.localMatrix);\n    }\n    return this.localMatrix;\n  }\n}'
          }
        ],
        geometricMeaning: 'Hierarchical transforms allow complex scenes where objects move relative to parents.',
        applications: [
          'Character rigging',
          'Vehicle systems',
          'UI hierarchies'
        ]
      },
      5: {
        title: 'Step 5: Optimizing Combined Transformations',
        description: 'Techniques for efficient transformation computation.',
        concepts: [
          {
            name: 'Cache Combined Matrices',
            description: 'Pre-compute and cache combined matrices.',
            code: 'let cachedMatrix = null;\nif (dirty) {\n  cachedMatrix = matrixMultiply(T, matrixMultiply(R, S));\n  dirty = false;\n}'
          },
          {
            name: 'Matrix Stack',
            description: 'Use matrix stack (push/pop) for nested transformations.',
            code: 'matrixStack.push(currentMatrix);\ncurrentMatrix = matrixMultiply(currentMatrix, newTransform);\n// ... render ...\ncurrentMatrix = matrixStack.pop();'
          }
        ],
        geometricMeaning: 'Caching and matrix stacks avoid redundant calculations in complex scenes.',
        applications: [
          'Performance optimization',
          'Complex scene rendering',
          'Real-time graphics'
        ]
      },
      6: {
        title: 'Step 6: WebGL Combined Transformations',
        description: 'Implement combined transformations in WebGL efficiently.',
        concepts: [
          {
            name: 'Single Combined Matrix',
            description: 'Upload one combined matrix instead of multiple.',
            code: 'const modelMatrix = matrixMultiply(translate, matrixMultiply(rotate, scale));\ngl.uniformMatrix4fv(uModelMatrixLocation, false, flattenMatrix(modelMatrix));'
          },
          {
            name: 'Model-View-Projection',
            description: 'Combine model, view (camera), and projection matrices.',
            formula: 'MVP = Projection × View × Model'
          },
          {
            name: 'Vertex Shader',
            description: 'Apply combined transformation in shader.',
            code: 'uniform mat4 uMVP;\nattribute vec4 aPosition;\nvoid main() {\n  gl_Position = uMVP * aPosition;\n}'
          }
        ],
        geometricMeaning: 'Single MVP matrix transforms vertices from object space through camera space to screen space.',
        applications: [
          '3D rendering pipeline',
          'Real-time graphics',
          'Game engines'
        ]
      }
    },
    'quaternions': {
      1: {
        title: 'Step 1: Understanding Quaternions',
        description: 'Quaternions are 4D numbers (w, x, y, z) that represent 3D rotations. They avoid gimbal lock and enable smooth interpolation.',
        concepts: [
          {
            name: 'Quaternion Structure',
            description: 'Quaternion q = w + xi + yj + zk, where i² = j² = k² = ijk = -1',
            formula: 'q = (w, x, y, z) = w + xi + yj + zk'
          },
          {
            name: 'Unit Quaternion',
            description: 'For rotation, quaternion must be normalized: w² + x² + y² + z² = 1',
            formula: '|q| = √(w² + x² + y² + z²) = 1'
          },
          {
            name: 'Why Quaternions?',
            description: 'Avoid gimbal lock, smooth interpolation (SLERP), efficient composition',
            code: '// No gimbal lock, unlike Euler angles'
          }
        ],
        geometricMeaning: 'Quaternions represent rotations as 4D unit vectors. The axis of rotation is (x, y, z) and the angle is encoded in w.',
        applications: [
          '3D game engines',
          'Animation systems',
          'Robotics',
          'Computer graphics'
        ]
      },
      2: {
        title: 'Step 2: Converting Euler Angles to Quaternions',
        description: 'Convert familiar Euler angles (pitch, yaw, roll) to quaternion representation.',
        concepts: [
          {
            name: 'Euler to Quaternion',
            description: 'Convert rotations around X, Y, Z axes to quaternion.',
            formula: 'q = qz × qy × qx\nwhere each qi represents rotation around axis i'
          },
          {
            name: 'Axis-Angle to Quaternion',
            description: 'Convert axis-angle representation to quaternion.',
            formula: 'q = (cos(θ/2), sin(θ/2)×n)\nwhere n is unit axis vector, θ is angle'
          }
        ],
        geometricMeaning: 'Euler angles are converted to quaternions by composing rotations around each axis, then combining them.',
        applications: [
          'Converting user input (Euler) to internal representation (quaternion)',
          'Animation keyframes',
          'Camera systems'
        ]
      },
      3: {
        title: 'Step 3: Quaternion to Rotation Matrix',
        description: 'Convert quaternion to 3×3 rotation matrix for use in graphics pipelines.',
        concepts: [
          {
            name: 'Quaternion to Matrix Formula',
            description: 'Convert quaternion (w, x, y, z) to rotation matrix.',
            formula: 'R = [[1-2(y²+z²), 2(xy-wz), 2(xz+wy)],\n     [2(xy+wz), 1-2(x²+z²), 2(yz-wx)],\n     [2(xz-wy), 2(yz+wx), 1-2(x²+y²)]]'
          },
          {
            name: 'Matrix Properties',
            description: 'Result is orthogonal matrix (preserves distances and angles).',
            code: 'R × Rᵀ = I (identity matrix)'
          }
        ],
        geometricMeaning: 'The quaternion encodes rotation axis and angle. The matrix applies this rotation to 3D vectors.',
        applications: [
          'GPU rendering (matrices are faster than quaternions)',
          'Combining with other transformations',
          'Graphics pipeline'
        ]
      },
      4: {
        title: 'Step 4: Quaternion Multiplication',
        description: 'Compose rotations by multiplying quaternions. Order matters!',
        concepts: [
          {
            name: 'Quaternion Multiplication',
            description: 'Multiply two quaternions to combine rotations.',
            formula: 'q1 × q2 = (w1w2 - x1x2 - y1y2 - z1z2,\n           w1x2 + x1w2 + y1z2 - z1y2,\n           w1y2 - x1z2 + y1w2 + z1x2,\n           w1z2 + x1y2 - y1x2 + z1w2)'
          },
          {
            name: 'Order Matters',
            description: 'q1 × q2 applies q2 first, then q1 (right to left).',
            code: 'q1 × q2 ≠ q2 × q1 (non-commutative)'
          }
        ],
        geometricMeaning: 'Quaternion multiplication composes rotations. More efficient than matrix multiplication for rotations only.',
        applications: [
          'Combining multiple rotations',
          'Hierarchical rotations',
          'Animation blending'
        ]
      },
      5: {
        title: 'Step 5: Spherical Linear Interpolation (SLERP)',
        description: 'Smoothly interpolate between two rotations using quaternions.',
        concepts: [
          {
            name: 'SLERP Formula',
            description: 'Interpolate between quaternions q1 and q2 by parameter t (0 to 1).',
            formula: 'slerp(q1, q2, t) = (sin((1-t)θ)/sin(θ))×q1 + (sin(tθ)/sin(θ))×q2\nwhere θ = arccos(q1·q2)'
          },
          {
            name: 'Why SLERP?',
            description: 'Linear interpolation of quaternions doesn\'t produce constant angular velocity. SLERP does.',
            code: '// SLERP maintains constant rotation speed'
          }
        ],
        geometricMeaning: 'SLERP follows the shortest path on the 4D unit sphere, producing smooth rotation interpolation.',
        applications: [
          'Animation keyframes',
          'Camera smoothing',
          'Character rotation',
          'Smooth transitions'
        ]
      },
      6: {
        title: 'Step 6: WebGL Quaternion Implementation',
        description: 'Implement quaternion rotations in WebGL shaders.',
        concepts: [
          {
            name: 'Convert to Matrix in JavaScript',
            description: 'Convert quaternion to matrix on CPU, upload to GPU.',
            code: 'const matrix = quaternionToMatrix(quaternion);\ngl.uniformMatrix4fv(location, false, flattenMatrix(matrix));'
          },
          {
            name: 'GLSL Quaternion Support',
            description: 'Some WebGL 2.0 implementations support quaternions, but matrices are more common.',
            code: '// Usually convert to matrix for compatibility'
          }
        ],
        geometricMeaning: 'GPU receives rotation matrix derived from quaternion. Quaternion math happens on CPU for flexibility.',
        applications: [
          'Real-time 3D graphics',
          'Smooth camera rotation',
          'Character animation',
          'Physics simulations'
        ]
      }
    },
    'projection': {
      1: {
        title: 'Step 1: Understanding Projections',
        description: 'Projections map 3D coordinates to 2D screen space. Two main types: perspective (realistic) and orthographic (parallel).',
        concepts: [
          {
            name: 'Perspective Projection',
            description: 'Objects farther away appear smaller. Mimics human vision.',
            formula: 'x\' = (x × near) / z\ny\' = (y × near) / z'
          },
          {
            name: 'Orthographic Projection',
            description: 'Parallel projection, no perspective distortion. Objects same size regardless of distance.',
            formula: 'x\' = x\ny\' = y\n(no z scaling)'
          },
          {
            name: 'Why Projections?',
            description: '3D scenes must be projected to 2D screen. Different projections for different purposes.',
            code: '// Perspective: games, realistic rendering\n// Orthographic: technical drawings, UI'
          }
        ],
        geometricMeaning: 'Perspective projection creates depth illusion through foreshortening. Orthographic preserves parallel lines.',
        applications: [
          '3D rendering',
          'Camera systems',
          'Technical visualization',
          'Isometric games'
        ]
      },
      2: {
        title: 'Step 2: Perspective Projection Matrix',
        description: 'Create perspective projection matrix using field of view, aspect ratio, and near/far planes.',
        concepts: [
          {
            name: 'Perspective Matrix',
            description: '4×4 matrix for perspective projection.',
            formula: 'P = [[f/aspect, 0, 0, 0],\n     [0, f, 0, 0],\n     [0, 0, (n+f)/(n-f), 2nf/(n-f)],\n     [0, 0, -1, 0]]\nwhere f = 1/tan(fov/2)'
          },
          {
            name: 'Parameters',
            description: 'fov = field of view (angle), aspect = width/height, n = near plane, f = far plane',
            code: 'perspective(fov, aspect, near, far)'
          }
        ],
        geometricMeaning: 'Matrix transforms 3D points to homogeneous coordinates. Perspective divide (w component) creates depth effect.',
        applications: [
          '3D games',
          'Virtual reality',
          'Architectural visualization',
          'Cinematic rendering'
        ]
      },
      3: {
        title: 'Step 3: Orthographic Projection Matrix',
        description: 'Create orthographic projection matrix using bounding box (left, right, top, bottom, near, far).',
        concepts: [
          {
            name: 'Orthographic Matrix',
            description: '4×4 matrix for orthographic projection.',
            formula: 'P = [[2/(r-l), 0, 0, -(r+l)/(r-l)],\n     [0, 2/(t-b), 0, -(t+b)/(t-b)],\n     [0, 0, -2/(f-n), -(f+n)/(f-n)],\n     [0, 0, 0, 1]]'
          },
          {
            name: 'Bounding Box',
            description: 'Defines view volume: left, right, top, bottom, near, far planes.',
            code: 'orthographic(left, right, bottom, top, near, far)'
          }
        ],
        geometricMeaning: 'Orthographic matrix scales and translates coordinates to fit viewport. No perspective distortion.',
        applications: [
          'Technical drawings',
          'Isometric games',
          'UI rendering',
          'CAD software'
        ]
      },
      4: {
        title: 'Step 4: Perspective Divide',
        description: 'After projection matrix, divide by w component to get final 2D coordinates.',
        concepts: [
          {
            name: 'Perspective Divide',
            description: 'Divide x, y, z by w component after matrix multiplication.',
            formula: 'x\' = x/w, y\' = y/w, z\' = z/w'
          },
          {
            name: 'Why Divide?',
            description: 'Perspective matrix sets w = -z. Dividing creates depth scaling effect.',
            code: '// Objects farther (larger z) become smaller'
          }
        ],
        geometricMeaning: 'Perspective divide creates the depth illusion. Objects with larger z (farther) become smaller after division.',
        applications: [
          '3D rendering pipeline',
          'Depth perception',
          'Realistic graphics'
        ]
      },
      5: {
        title: 'Step 5: Viewport Transformation',
        description: 'Map normalized device coordinates (-1 to 1) to screen pixel coordinates.',
        concepts: [
          {
            name: 'Viewport Mapping',
            description: 'Map from NDC [-1, 1] to screen [0, width] × [0, height].',
            formula: 'screenX = (ndcX + 1) × width / 2\nscreenY = (1 - ndcY) × height / 2'
          },
          {
            name: 'Y-Axis Flip',
            description: 'Screen Y increases downward, NDC Y increases upward. Must flip.',
            code: 'screenY = height - (ndcY + 1) × height / 2'
          }
        ],
        geometricMeaning: 'Viewport transformation scales and translates normalized coordinates to actual screen pixels.',
        applications: [
          'Rendering pipeline',
          'Multi-viewport rendering',
          'Split-screen games'
        ]
      },
      6: {
        title: 'Step 6: WebGL Projection Implementation',
        description: 'Implement projections in WebGL using projection matrices.',
        concepts: [
          {
            name: 'MVP Matrix',
            description: 'Model-View-Projection: combine all transformations.',
            formula: 'MVP = Projection × View × Model'
          },
          {
            name: 'Vertex Shader',
            description: 'Apply MVP matrix, GPU handles perspective divide automatically.',
            code: 'gl_Position = uMVP * aPosition;\n// GPU divides by w automatically'
          }
        ],
        geometricMeaning: 'Single MVP matrix transforms vertices from object space through camera space to screen space.',
        applications: [
          '3D rendering pipeline',
          'Real-time graphics',
          'Game engines',
          'WebGL/OpenGL applications'
        ]
      }
    }
  };

  // Fallback logic: return step 1 if step doesn't exist
  if (theories[module]) {
    if (theories[module][step]) {
      return theories[module][step];
    } else if (theories[module][1]) {
      return theories[module][1];
    }
  }
  
  return null;
};

