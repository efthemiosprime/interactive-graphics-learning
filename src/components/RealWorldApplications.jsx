import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Globe } from 'lucide-react';

export default function RealWorldApplications({ mode, selectedOperation, transform3dType, v1, v2, v3d, v3d_2, m1, m2, m1_3x3, m2_3x3, matrixSize }) {
  const [expanded, setExpanded] = useState(true);

  const applicationData = useMemo(() => {
    const getApplications = () => {
    if (mode === 'vector') {
      const applications = {
        'addition': {
          title: 'Vector Addition - Real-World Applications',
          examples: [
            {
              domain: 'Physics - Forces',
              description: 'When multiple forces act on an object, their vector sum determines the net force and resulting motion.',
              example: 'Pushing a box: horizontal force + vertical force = diagonal motion'
            },
            {
              domain: 'Navigation',
              description: 'Combining velocity vectors to find resultant velocity. Used in aviation and maritime navigation.',
              example: 'Plane velocity + wind velocity = actual ground speed and direction'
            },
            {
              domain: 'Computer Graphics',
              description: 'Combining translation vectors to move objects in 2D/3D space.',
              example: 'Moving a sprite: position + velocity = new position'
            }
          ]
        },
        'subtraction': {
          title: 'Vector Subtraction - Real-World Applications',
          examples: [
            {
              domain: 'Physics - Relative Motion',
              description: 'Finding relative velocity between two moving objects.',
              example: 'Car A velocity - Car B velocity = relative velocity of A with respect to B'
            },
            {
              domain: 'Navigation',
              description: 'Calculating displacement or change in position.',
              example: 'Final position - initial position = displacement vector'
            },
            {
              domain: 'Game Development',
              description: 'Finding direction from one point to another.',
              example: 'Target position - player position = direction vector for AI pathfinding'
            }
          ]
        },
        'dot': {
          title: 'Dot Product - Real-World Applications',
          examples: [
            {
              domain: 'Physics - Work Done',
              description: 'Work = Force · Displacement. The dot product calculates work done when a force moves an object.',
              example: `Work = F · d = ||F|| × ||d|| × cos(θ). If force and displacement are parallel, work is maximum.`
            },
            {
              domain: 'Computer Graphics - Lighting',
              description: 'Used in Phong lighting model to calculate how much light hits a surface. Determines brightness based on angle between light direction and surface normal.',
              example: 'Light intensity = LightDirection · SurfaceNormal. Perpendicular = bright, parallel = dark.'
            },
            {
              domain: 'Machine Learning',
              description: 'Cosine similarity uses dot product to measure similarity between vectors. Used in recommendation systems and NLP.',
              example: 'Similarity = (A · B) / (||A|| × ||B||). Higher value = more similar.'
            },
            {
              domain: 'Signal Processing',
              description: 'Correlation between signals. Used in filtering, pattern recognition, and audio processing.',
              example: 'Cross-correlation uses dot product to find how similar two signals are at different time offsets.'
            }
          ]
        },
        'magnitude': {
          title: 'Magnitude - Real-World Applications',
          examples: [
            {
              domain: 'Physics - Speed',
              description: 'Magnitude of velocity vector gives speed (scalar). Distance traveled per unit time.',
              example: 'Speed = ||velocity||. Car moving at (60, 80) km/h has speed √(60² + 80²) = 100 km/h'
            },
            {
              domain: 'Distance Calculation',
              description: 'Distance between two points in space. Used in GPS, mapping, and pathfinding.',
              example: 'Distance = ||point2 - point1||. Used to find shortest path.'
            },
            {
              domain: 'Game Development',
              description: 'Distance checks for collision detection, AI behavior, and game mechanics.',
              example: 'If ||enemy - player|| < attack_range, enemy attacks'
            }
          ]
        },
        'normalize': {
          title: 'Normalize - Real-World Applications',
          examples: [
            {
              domain: 'Computer Graphics',
              description: 'Normalized vectors represent pure directions. Used for lighting calculations, camera directions, and surface normals.',
              example: 'Light direction, camera forward vector, and surface normals are typically normalized.'
            },
            {
              domain: 'Game Development',
              description: 'Direction vectors for movement, aiming, and AI behavior are normalized to ensure consistent speed.',
              example: 'Normalized direction × speed = velocity vector with desired speed'
            },
            {
              domain: 'Physics Simulations',
              description: 'Unit vectors represent directions without magnitude. Used in force calculations and constraints.',
              example: 'Force = magnitude × normalized_direction'
            }
          ]
        },
        'cross': {
          title: 'Cross Product - Real-World Applications',
          examples: [
            {
              domain: 'Physics - Torque',
              description: 'Torque = r × F, where r is position vector and F is force. Measures rotational force.',
              example: 'Opening a door: position from hinge × applied force = torque (rotational effect)'
            },
            {
              domain: 'Computer Graphics - Surface Normals',
              description: 'Cross product of two edge vectors gives surface normal. Essential for lighting, shading, and culling.',
              example: 'Normal = edge1 × edge2. Used to determine which way a surface faces.'
            },
            {
              domain: 'Navigation',
              description: 'Determining orientation and handedness. Used in coordinate system transformations.',
              example: 'Right-hand rule: thumb = first vector, index = second vector, middle = cross product'
            },
            {
              domain: 'Area Calculation',
              description: 'Magnitude of cross product gives area of parallelogram. Used in computational geometry.',
              example: 'Area of triangle = 0.5 × ||v1 × v2||'
            }
          ]
        },
        'angle2d': {
          title: 'Angle Between Vectors - Real-World Applications',
          examples: [
            {
              domain: 'Robotics',
              description: 'Calculating joint angles and orientations. Used in inverse kinematics and motion planning.',
              example: 'Angle between arm segments determines robot pose and reachability'
            },
            {
              domain: 'Computer Vision',
              description: 'Measuring orientation of objects, edges, and features in images.',
              example: 'Edge detection: angle between gradient vectors indicates edge orientation'
            },
            {
              domain: 'Navigation',
              description: 'Calculating heading changes and turning angles.',
              example: 'Angle between current heading and target direction = turn angle needed'
            }
          ]
        },
        'projection2d': {
          title: 'Vector Projection - Real-World Applications',
          examples: [
            {
              domain: 'Physics - Component Forces',
              description: 'Decomposing forces into components along axes. Used in mechanics and engineering.',
              example: 'Force on inclined plane: project weight vector onto plane direction and perpendicular direction'
            },
            {
              domain: 'Computer Graphics',
              description: 'Projecting 3D points onto 2D screen. Used in rendering pipelines.',
              example: '3D to 2D projection: project world coordinates onto camera view plane'
            },
            {
              domain: 'Signal Processing',
              description: 'Projecting signals onto basis functions. Used in Fourier analysis and compression.',
              example: 'Finding component of signal in specific frequency band'
            }
          ]
        },
        'reflection': {
          title: 'Reflection - Real-World Applications',
          examples: [
            {
              domain: 'Computer Graphics',
              description: 'Mirror reflections, specular highlights, and realistic lighting.',
              example: 'Reflecting light ray off surface: R = I - 2(I·N)N, where N is surface normal'
            },
            {
              domain: 'Physics - Optics',
              description: 'Light reflection off surfaces. Used in ray tracing and optical simulations.',
              example: 'Angle of incidence = angle of reflection'
            },
            {
              domain: 'Game Development',
              description: 'Bouncing projectiles, ricochets, and mirror mechanics.',
              example: 'Ball bouncing off wall: reflect velocity vector across wall normal'
            }
          ]
        },
        'perpendicular': {
          title: 'Perpendicular Vector - Real-World Applications',
          examples: [
            {
              domain: 'Computer Graphics',
              description: 'Finding tangent and bitangent vectors for normal mapping and texture coordinates.',
              example: 'Given normal N, find tangent T and bitangent B = N × T'
            },
            {
              domain: 'Physics',
              description: 'Decomposing forces into parallel and perpendicular components.',
              example: 'Force perpendicular to motion = centripetal force (circular motion)'
            },
            {
              domain: 'Geometry',
              description: 'Constructing coordinate systems and finding orthogonal directions.',
              example: 'Building local coordinate frame from surface normal'
            }
          ]
        }
      };

      return applications[selectedOperation] || applications['addition'];
    } else if (mode === 'matrix') {
      const applications = {
        'addition': {
          title: 'Matrix Addition - Real-World Applications',
          why: 'Matrix addition combines transformations that happen simultaneously or independently. Unlike multiplication (which composes transformations), addition adds effects together element-wise.',
          examples: [
            {
              domain: 'Image Processing - Blending Effects',
              description: 'WHY: When applying multiple image filters or effects simultaneously, you add their transformation matrices. Each filter modifies pixel values independently, so addition combines these independent changes.',
              example: 'Brightness filter matrix + Contrast filter matrix = Combined effect. Each pixel value gets modified by both filters additively.'
            },
            {
              domain: 'Data Analysis - Combining Datasets',
              description: 'WHY: When you have multiple data sources with the same structure (same dimensions), matrix addition combines them. Useful for aggregating measurements, combining sensor readings, or merging statistical data.',
              example: 'Monthly sales data (12×12 matrix) + Quarterly bonuses (12×12 matrix) = Total compensation matrix. Each cell adds corresponding values from both sources.'
            },
            {
              domain: 'Physics - Superposition Principle',
              description: 'WHY: In physics, when multiple forces or fields act independently, their effects add up. Matrix addition represents this superposition - each transformation matrix represents one effect, and adding them gives the combined result.',
              example: 'Electric field from charge 1 (matrix) + Electric field from charge 2 (matrix) = Total electric field. Each field contributes independently to the final result.'
            },
            {
              domain: 'Computer Graphics - Layered Transformations',
              description: 'WHY: When multiple independent transformations need to be combined (not composed), addition is used. For example, combining base position with multiple offset adjustments.',
              example: 'Base position matrix + Offset 1 + Offset 2 = Final position. Each offset adds to the base position independently.'
            },
            {
              domain: 'Signal Processing - Noise Addition',
              description: 'WHY: Adding noise to signals is done element-wise. Each sample gets noise added independently, which is exactly what matrix addition does.',
              example: 'Clean signal matrix + Noise matrix = Noisy signal. Each frequency component gets noise added independently.'
            }
          ]
        },
        'subtraction': {
          title: 'Matrix Subtraction - Real-World Applications',
          why: 'Matrix subtraction finds the difference or change between two matrices. It\'s essential for measuring changes, computing errors, and finding deltas in systems.',
          examples: [
            {
              domain: 'Computer Vision - Motion Detection',
              description: 'WHY: To detect movement between video frames, subtract the previous frame from the current frame. The resulting difference matrix highlights what changed - moving objects appear as non-zero values.',
              example: 'Current frame matrix - Previous frame matrix = Motion matrix. Non-zero regions indicate movement, zero regions are static.'
            },
            {
              domain: 'Control Systems - Error Calculation',
              description: 'WHY: Feedback control systems need to know the error between desired and actual states. Matrix subtraction gives this error, which is then used to adjust the system.',
              example: 'Desired position matrix - Current position matrix = Error matrix. Controller uses error to generate correction signals.'
            },
            {
              domain: 'Data Analysis - Change Detection',
              description: 'WHY: Comparing datasets over time requires finding differences. Matrix subtraction shows exactly what changed and by how much, which is crucial for trend analysis.',
              example: 'Sales this month - Sales last month = Change matrix. Positive values show growth, negative show decline in specific categories.'
            },
            {
              domain: 'Image Processing - Background Subtraction',
              description: 'WHY: To isolate foreground objects, subtract the background image from the current image. This is fundamental in surveillance, object tracking, and green screen effects.',
              example: 'Current image - Background image = Foreground mask. Objects that moved or appeared show up clearly.'
            },
            {
              domain: 'Financial Analysis - Profit/Loss',
              description: 'WHY: Calculating profit requires subtracting costs from revenue. When data is organized in matrices (e.g., by product and time), matrix subtraction gives profit/loss matrices.',
              example: 'Revenue matrix - Cost matrix = Profit matrix. Each cell shows profit/loss for specific product-time combinations.'
            },
            {
              domain: 'Physics - Velocity Change',
              description: 'WHY: Acceleration is the change in velocity over time. Subtracting velocity matrices at different times gives acceleration, which is fundamental in dynamics.',
              example: 'Velocity at time t2 - Velocity at time t1 = Acceleration matrix. Shows how velocity changed in each direction.'
            }
          ]
        },
        'multiply': {
          title: 'Matrix Multiplication - Real-World Applications',
          why: 'Matrix multiplication composes transformations sequentially. Unlike addition (which combines independent effects), multiplication chains operations where each transformation acts on the result of the previous one. This is why order matters!',
          examples: [
            {
              domain: 'Computer Graphics - Composing Transformations',
              description: 'WHY: To apply multiple transformations (rotate, then scale, then translate), you multiply their matrices. Each transformation matrix modifies coordinates, and multiplying chains these modifications. Order matters: Rotate×Scale×Translate ≠ Translate×Rotate×Scale.',
              example: 'Final transform = Translation × Rotation × Scale. First rotates around origin, then scales, then translates. Reversing order gives different result!'
            },
            {
              domain: 'Robotics - Forward Kinematics',
              description: 'WHY: Robot arms have multiple joints. Each joint has a transformation matrix. Multiplying these matrices in sequence (from base to end-effector) gives the final position. This is forward kinematics - calculating end position from joint angles.',
              example: 'End position = BaseTransform × Shoulder × Elbow × Wrist. Each matrix transforms coordinates from one joint frame to the next.'
            },
            {
              domain: 'Machine Learning - Neural Networks',
              description: 'WHY: Neural networks process data through layers. Each layer applies a linear transformation (matrix multiplication) followed by a nonlinearity. The matrix contains learned weights that transform input features into output features.',
              example: 'Layer output = WeightMatrix × Input + Bias. Each row of weights computes one output neuron as weighted sum of inputs. Deep networks chain many such multiplications.'
            },
            {
              domain: '3D Graphics - Camera Control',
              description: 'WHY: To rotate an object around multiple axes, multiply rotation matrices. Each rotation matrix rotates around one axis. Multiplying them combines rotations, but order matters because rotations don\'t commute.',
              example: 'Final rotation = RotX(30°) × RotY(45°) × RotZ(15°). First rotates around Z, then Y, then X. Different order = different final orientation!'
            },
            {
              domain: 'Computer Vision - Perspective Correction',
              description: 'WHY: To correct perspective distortion (like making a photo of a document look like it was taken from above), use a homography matrix. This 3×3 matrix transforms image coordinates to correct perspective.',
              example: 'Corrected point = HomographyMatrix × Original point. Maps one plane to another, correcting for camera angle.'
            },
            {
              domain: 'Economics - Input-Output Models',
              description: 'WHY: Economic systems have industries that produce outputs using inputs from other industries. Matrix multiplication models how outputs flow through the economy - each industry\'s output becomes input for others.',
              example: 'Final outputs = TechnologyMatrix × Initial inputs. Shows how goods flow through production chains.'
            }
          ]
        },
        'determinant': {
          title: 'Determinant - Real-World Applications',
          examples: [
            {
              domain: 'Area/Volume Scaling',
              description: 'Determinant measures how much a transformation scales area (2D) or volume (3D).',
              example: 'If det(M) = 2, the transformation doubles the area/volume. Used in integration and change of variables.'
            },
            {
              domain: 'Invertibility Check',
              description: 'If det(M) = 0, matrix is singular (not invertible). Used to check if transformation can be reversed.',
              example: 'In solving linear systems: if det(A) = 0, system has no unique solution'
            },
            {
              domain: 'Orientation Preservation',
              description: 'Sign of determinant indicates if transformation preserves (positive) or reverses (negative) orientation.',
              example: 'det > 0: preserves handedness, det < 0: mirrors/flips space'
            },
            {
              domain: 'Computer Graphics',
              description: 'Culling and visibility: negative determinant indicates back-facing polygons.',
              example: 'Back-face culling: if det(edge_vectors) < 0, polygon faces away from camera'
            },
            {
              domain: 'Physics',
              description: 'Jacobian determinant in coordinate transformations. Used in fluid dynamics and field theory.',
              example: 'Change of variables in integrals: dxdy = |det(J)| dudv'
            }
          ]
        },
        'transpose': {
          title: 'Transpose - Real-World Applications',
          why: 'Transpose flips rows and columns. This is crucial when you need to switch between row and column representations, solve systems of equations, or correctly transform vectors that represent directions (like normals) rather than positions.',
          examples: [
            {
              domain: 'Machine Learning - Backpropagation',
              description: 'WHY: In neural network training, backpropagation propagates errors backward. Forward pass uses W×x, but backward pass needs to reverse this. Transposing the weight matrix W^T allows errors to flow backward correctly through the network.',
              example: 'Forward: output = W × input. Backward: input_error = W^T × output_error. Transpose reverses the transformation direction.'
            },
            {
              domain: 'Linear Algebra - Least Squares',
              description: 'WHY: When solving overdetermined systems (more equations than unknowns), multiply both sides by A^T. This creates (A^T×A) which is symmetric and positive definite, making it much easier to solve. This is the normal equation.',
              example: 'Solve Ax=b. Multiply by A^T: (A^T×A)×x = A^T×b. Now (A^T×A) is square and symmetric - solvable!'
            },
            {
              domain: 'Computer Graphics - Normal Transformation',
              description: 'WHY: When you transform a 3D object, normals (perpendicular vectors) don\'t transform the same way as positions. If you transform a normal with the same matrix as positions, it becomes incorrect. You must use (M^-1)^T to transform normals correctly for proper lighting.',
              example: 'Transformed normal = (ModelMatrix^-1)^T × original_normal. Ensures normals stay perpendicular to surfaces after transformation.'
            },
            {
              domain: 'Data Science - Covariance Matrices',
              description: 'WHY: Covariance matrices are symmetric (cov(X,Y) = cov(Y,X)). Transpose helps verify symmetry and is used in Principal Component Analysis. Also, when converting between row and column data representations.',
              example: 'Covariance matrix C must satisfy C = C^T. Transpose helps verify and work with symmetric properties.'
            },
            {
              domain: 'Signal Processing - Correlation',
              description: 'WHY: Cross-correlation between signals uses transpose. When correlating signal A with signal B, you transpose one to align dimensions correctly for the correlation operation.',
              example: 'Correlation = A × B^T. Transpose aligns signals for proper correlation calculation.'
            },
            {
              domain: 'Database Operations - Data Transformation',
              description: 'WHY: Sometimes data is stored row-wise but needed column-wise (or vice versa). Transpose switches between these representations, which is essential for data analysis and visualization.',
              example: 'If data has samples as rows and features as columns, transpose gives features as rows and samples as columns - useful for certain analyses.'
            }
          ]
        },
        'apply': {
          title: 'Apply Matrix to Vector - Real-World Applications',
          why: 'Applying a matrix to a vector transforms that vector according to the matrix\'s transformation. This is the fundamental operation that actually uses transformation matrices - it takes a point/direction and moves/rotates/scales it. This is what makes matrices useful - they transform vectors!',
          examples: [
            {
              domain: 'Computer Graphics - Vertex Transformation',
              description: 'WHY: Every 3D model has vertices in local coordinates. To display them on screen, you must transform them through multiple coordinate spaces: local → world → view → screen. Each transformation is a matrix multiplication with the vertex vector.',
              example: 'Screen vertex = ProjectionMatrix × ViewMatrix × ModelMatrix × local_vertex. Each matrix transforms the vertex to the next coordinate space.'
            },
            {
              domain: 'Physics Simulations - Force Transformation',
              description: 'WHY: Forces act in specific directions. When objects rotate, forces need to be transformed to the new coordinate system. Matrix multiplication rotates the force vector to match the object\'s orientation.',
              example: 'Force in rotated frame = RotationMatrix × force_in_original_frame. Ensures force direction matches object orientation.'
            },
            {
              domain: 'Robotics - Coordinate Frame Transformation',
              description: 'WHY: Robot parts exist in different coordinate frames (base frame, joint frames, end-effector frame). To know where the end-effector is relative to the base, transform coordinates through the chain of frames using transformation matrices.',
              example: 'Position in world frame = BaseTransform × Joint1Transform × Joint2Transform × local_position. Chains transformations through robot structure.'
            },
            {
              domain: 'Game Development - Object Movement',
              description: 'WHY: Game objects have positions and orientations. When applying movement (translation) or rotation, you multiply the transformation matrix with the object\'s position vector. This is how objects move and rotate in games.',
              example: 'New position = TranslationMatrix × current_position. Moves object by the translation amount.'
            },
            {
              domain: 'Navigation - Coordinate Conversion',
              description: 'WHY: GPS coordinates, map coordinates, and local coordinates are different systems. Transformation matrices convert between them. Applying the matrix to a position vector transforms it from one coordinate system to another.',
              example: 'Map coordinates = TransformationMatrix × GPS_coordinates. Converts between coordinate systems for navigation.'
            },
            {
              domain: 'Image Processing - Point Transformation',
              description: 'WHY: To apply geometric transformations to images (rotate, scale, skew), you transform each pixel\'s coordinates. The transformation matrix defines how coordinates map from source to destination.',
              example: 'New pixel position = TransformMatrix × original_pixel_position. Maps pixels to new locations for rotation/scaling.'
            }
          ]
        },
        'inverse': {
          title: 'Inverse - Real-World Applications',
          why: 'The inverse matrix undoes a transformation. If matrix M transforms A to B, then M^-1 transforms B back to A. This is essential for reversing transformations, solving equations, and finding "backward" solutions.',
          examples: [
            {
              domain: 'Computer Graphics - Coordinate Space Conversion',
              description: 'WHY: Objects are defined in local space but exist in world space. To find an object\'s local coordinates from world coordinates (e.g., for collision detection relative to object), use the inverse transformation matrix.',
              example: 'Local position = Inverse(ModelMatrix) × world_position. Converts world coordinates back to object\'s local coordinate system.'
            },
            {
              domain: 'Robotics - Inverse Kinematics',
              description: 'WHY: Forward kinematics: given joint angles, find end-effector position (uses matrix multiplication). Inverse kinematics: given desired end-effector position, find joint angles (uses inverse matrix). This is how robots know how to move to reach a target.',
              example: 'Joint angles = Inverse(KinematicsMatrix) × target_position. Solves: "What angles do I need to reach this position?"'
            },
            {
              domain: 'Solving Linear Systems - Ax = b',
              description: 'WHY: Many problems reduce to solving Ax = b. If A is invertible, the solution is x = A^-1 × b. This appears everywhere: circuit analysis (Ohm\'s law), structural engineering (force balance), economics (supply/demand), etc.',
              example: 'Circuit: ResistanceMatrix × Current = Voltage. Solve: Current = Inverse(ResistanceMatrix) × Voltage.'
            },
            {
              domain: 'Cryptography - Decryption',
              description: 'WHY: Some encryption methods use matrix multiplication. If encryption multiplies by matrix E, decryption multiplies by E^-1. The inverse matrix is the decryption key.',
              example: 'Encrypted = EncryptionMatrix × Plaintext. Decrypted = Inverse(EncryptionMatrix) × Encrypted.'
            },
            {
              domain: 'Image Processing - Undoing Transformations',
              description: 'WHY: After applying a transformation (rotation, scaling), you might need to undo it or apply the opposite transformation. The inverse matrix does exactly this - it reverses the transformation.',
              example: 'Original image = Inverse(TransformMatrix) × transformed_image. Reverses geometric transformations.'
            },
            {
              domain: 'Physics - Reference Frame Conversion',
              description: 'WHY: To convert coordinates from frame B back to frame A, use the inverse of the transformation from A to B. This is fundamental in physics when working with multiple reference frames.',
              example: 'Position in frame A = Inverse(Transform_A_to_B) × position_in_frame_B. Converts coordinates back to original frame.'
            }
          ]
        },
        'eigenvalues': {
          title: 'Eigenvalues & Eigenvectors - Real-World Applications',
          why: 'Eigenvectors are special directions that don\'t change direction when a matrix transforms them - they only get scaled by their eigenvalue. This reveals the "natural" directions and scaling factors of a transformation, which is fundamental for understanding data structure, system behavior, and finding optimal representations.',
          examples: [
            {
              domain: 'Principal Component Analysis (PCA)',
              description: 'Eigenvectors of covariance matrix identify principal directions of data variation. Used for dimensionality reduction and feature extraction.',
              example: 'Data compression: project onto eigenvectors with largest eigenvalues'
            },
            {
              domain: 'Quantum Mechanics',
              description: 'Eigenvalues represent energy levels, eigenvectors represent quantum states. Schrödinger equation: Hψ = Eψ',
              example: 'Energy levels of atoms and molecules are eigenvalues of Hamiltonian operator'
            },
            {
              domain: 'Structural Engineering',
              description: 'Eigenvalues determine natural frequencies of vibration. Eigenvectors show mode shapes.',
              example: 'Bridge resonance: eigenvalues = natural frequencies, eigenvectors = vibration modes'
            },
            {
              domain: 'Machine Learning',
              description: 'Eigenvalue decomposition for dimensionality reduction, feature extraction, and understanding data structure.',
              example: 'SVD (Singular Value Decomposition) uses eigenvalues to find optimal low-rank approximation'
            },
            {
              domain: 'Image Processing',
              description: 'Eigenfaces for face recognition. Eigenvectors capture principal variations in face images.',
              example: 'Face recognition: represent faces as linear combinations of eigenfaces'
            },
            {
              domain: 'Google PageRank',
              description: 'PageRank algorithm uses eigenvector of web link matrix to rank pages.',
              example: 'Principal eigenvector gives page importance scores'
            }
          ]
        },
        'rank': {
          title: 'Matrix Rank - Real-World Applications',
          why: 'Rank tells you the true dimensionality of a matrix - how many independent rows/columns it has. This reveals redundancy, determines if systems are solvable, and identifies the minimum information needed to represent the data. Low rank means data can be compressed; full rank means all dimensions are independent.',
          examples: [
            {
              domain: 'Solving Linear Systems',
              description: 'Rank determines if a system has solutions. rank(A) = rank([A|b]) means system is consistent. rank(A) = n means unique solution.',
              example: 'System Ax = b: if rank(A) < rank([A|b]), no solution. If rank(A) = n, unique solution.'
            },
            {
              domain: 'Machine Learning - Dimensionality',
              description: 'Rank reveals true dimensionality of data. Low-rank matrices indicate redundant features or correlations.',
              example: 'PCA: rank of covariance matrix determines number of principal components needed'
            },
            {
              domain: 'Image Compression',
              description: 'Low-rank approximation compresses images by keeping only principal components. SVD uses rank to reduce storage.',
              example: 'Rank-k approximation: keep k largest singular values, discard others → compressed image'
            },
            {
              domain: 'Control Systems',
              description: 'Rank determines controllability and observability. Full rank ensures system can be controlled and observed.',
              example: 'Controllability matrix rank = n means system is fully controllable'
            },
            {
              domain: 'Network Analysis',
              description: 'Rank of adjacency matrix reveals network structure and connectivity properties.',
              example: 'Rank indicates number of independent paths or communities in network'
            },
            {
              domain: 'Signal Processing',
              description: 'Rank separation in matrices helps separate signals from noise. Used in array processing and beamforming.',
              example: 'Low-rank signal + high-rank noise: use rank to separate them'
            }
          ]
        }
      };

      return applications[selectedOperation] || applications['addition'];
    } else if (mode === '3d') {
      const applications = {
        'rotation': {
          title: '3D Rotation - Real-World Applications',
          examples: [
            {
              domain: 'Computer Graphics',
              description: 'Rotating 3D objects, cameras, and lights. Essential for 3D rendering and animation.',
              example: 'Camera control: rotate view around X/Y axes for looking around'
            },
            {
              domain: 'Robotics',
              description: 'Controlling robot joints and end-effector orientation. Used in industrial automation.',
              example: 'Robot wrist rotation: rotate end-effector to align with target orientation'
            },
            {
              domain: 'Game Development',
              description: 'Character rotation, camera control, and object orientation.',
              example: 'Player rotation: rotate character model based on input direction'
            },
            {
              domain: 'Aerospace',
              description: 'Aircraft attitude control: pitch, roll, and yaw rotations.',
              example: 'Flight simulation: Euler angles control aircraft orientation'
            },
            {
              domain: 'Virtual Reality',
              description: 'Head tracking and orientation. Rotating virtual world based on head movement.',
              example: 'VR headset: rotation matrix transforms virtual scene based on head orientation'
            }
          ]
        },
        'translation': {
          title: '3D Translation - Real-World Applications',
          examples: [
            {
              domain: 'Computer Graphics',
              description: 'Moving objects in 3D space. Positioning models, cameras, and lights.',
              example: 'Moving character: translate position by velocity × time'
            },
            {
              domain: 'Robotics',
              description: 'Moving robot end-effector to target position.',
              example: 'Pick and place: translate gripper to object location'
            },
            {
              domain: 'Game Development',
              description: 'Object positioning, camera movement, and world navigation.',
              example: 'Player movement: translate position based on input and speed'
            },
            {
              domain: 'Architecture',
              description: 'Positioning building elements in 3D space. CAD and BIM applications.',
              example: 'Placing structural elements at specific coordinates'
            }
          ]
        },
        'scale': {
          title: '3D Scaling - Real-World Applications',
          examples: [
            {
              domain: 'Computer Graphics',
              description: 'Resizing 3D models. Uniform scaling preserves shape, non-uniform creates distortion.',
              example: 'Character scaling: scale model to match different character sizes'
            },
            {
              domain: '3D Printing',
              description: 'Scaling models to fit print bed or adjust size.',
              example: 'Scale model by 2x to double the printed size'
            },
            {
              domain: 'Animation',
              description: 'Squash and stretch effects. Non-uniform scaling for cartoon physics.',
              example: 'Ball bounce: scale Y-axis down on impact (squash), then back up (stretch)'
            },
            {
              domain: 'Medical Imaging',
              description: 'Zooming and scaling medical scans for analysis.',
              example: 'Scale CT scan to fit display or focus on specific region'
            }
          ]
        }
      };

      return applications[transform3dType] || applications['rotation'];
    } else if (mode === 'advanced') {
      const applications = {
        'crossproduct3d': {
          title: '3D Cross Product - Real-World Applications',
          examples: [
            {
              domain: 'Physics - Torque',
              description: 'Torque = r × F. Measures rotational force around an axis.',
              example: 'Wrench turning bolt: position vector × applied force = torque magnitude and axis'
            },
            {
              domain: 'Computer Graphics - Surface Normals',
              description: 'Calculating surface normals from triangle vertices. Essential for lighting and shading.',
              example: 'Normal = (v2 - v1) × (v3 - v1). Points perpendicular to surface.'
            },
            {
              domain: 'Aerospace',
              description: 'Angular momentum and rotational dynamics. L = r × p (angular momentum).',
              example: 'Satellite rotation: position × momentum = angular momentum vector'
            },
            {
              domain: 'Robotics',
              description: 'Determining orientation and constructing coordinate frames.',
              example: 'Building orthonormal basis: X × Y = Z (right-handed coordinate system)'
            },
            {
              domain: 'Computational Geometry',
              description: 'Determining orientation (clockwise/counterclockwise), point-in-polygon tests.',
              example: 'Triangle orientation: cross product sign indicates winding order'
            }
          ]
        },
        'dotproduct3d': {
          title: '3D Dot Product - Real-World Applications',
          examples: [
            {
              domain: 'Computer Graphics - Lighting',
              description: 'Phong lighting model: LightIntensity = LightDirection · SurfaceNormal. Determines how bright a surface appears.',
              example: 'Lambertian shading: brightness = max(0, LightDir · Normal). Perpendicular = brightest.'
            },
            {
              domain: 'Physics - Work',
              description: 'Work done = Force · Displacement. Measures energy transfer.',
              example: 'Pushing box up ramp: work = force_vector · displacement_vector'
            },
            {
              domain: 'Machine Learning',
              description: 'Cosine similarity for measuring vector similarity. Used in recommendation systems and embeddings.',
              example: 'Similarity = (A · B) / (||A|| × ||B||). Used in word embeddings and collaborative filtering.'
            },
            {
              domain: 'Computer Vision',
              description: 'Feature matching and descriptor comparison. Used in object recognition.',
              example: 'Matching SIFT features: higher dot product = more similar features'
            }
          ]
        },
        'projection': {
          title: 'Vector Projection - Real-World Applications',
          examples: [
            {
              domain: 'Physics',
              description: 'Decomposing forces into components. Used in mechanics and engineering.',
              example: 'Force on inclined plane: project weight onto plane direction (sliding) and perpendicular (normal force)'
            },
            {
              domain: 'Computer Graphics',
              description: '3D to 2D projection. Projecting world coordinates onto camera view plane.',
              example: 'Perspective projection: project 3D point onto 2D screen coordinates'
            },
            {
              domain: 'Signal Processing',
              description: 'Projecting signals onto basis functions. Used in Fourier analysis and compression.',
              example: 'Fourier transform: project signal onto sine/cosine basis functions'
            },
            {
              domain: 'Machine Learning',
              description: 'Principal Component Analysis (PCA): project data onto principal directions.',
              example: 'Dimensionality reduction: project high-dimensional data onto lower-dimensional subspace'
            }
          ]
        },
        'angle': {
          title: 'Angle Between 3D Vectors - Real-World Applications',
          examples: [
            {
              domain: 'Robotics',
              description: 'Calculating joint angles and orientations. Used in inverse kinematics.',
              example: 'Robot arm: angle between arm segments determines joint configuration'
            },
            {
              domain: 'Computer Vision',
              description: 'Measuring orientation of objects and features in 3D space.',
              example: 'Object pose estimation: angle between object axes and camera axes'
            },
            {
              domain: 'Aerospace',
              description: 'Calculating angles between velocity vector and desired direction.',
              example: 'Navigation: angle between current heading and target direction'
            }
          ]
        },
        'magnitude3d': {
          title: '3D Magnitude - Real-World Applications',
          examples: [
            {
              domain: 'Physics - Speed',
              description: 'Magnitude of 3D velocity vector gives speed. Distance traveled per unit time.',
              example: 'Rocket velocity (100, 200, 50) m/s has speed √(100² + 200² + 50²) = 229 m/s'
            },
            {
              domain: 'Distance Calculation',
              description: '3D distance between points. Used in GPS, pathfinding, and spatial analysis.',
              example: 'Distance between two 3D points = ||point2 - point1||'
            },
            {
              domain: 'Game Development',
              description: '3D distance checks for collision detection, AI behavior, and game mechanics.',
              example: 'If ||enemy_position - player_position|| < attack_range, enemy attacks'
            }
          ]
        },
        'normalize3d': {
          title: '3D Normalize - Real-World Applications',
          examples: [
            {
              domain: 'Computer Graphics',
              description: 'Normalized vectors for directions: light direction, camera forward, surface normals.',
              example: 'All direction vectors normalized to ensure consistent calculations'
            },
            {
              domain: 'Game Development',
              description: 'Normalized direction vectors for movement, aiming, and AI behavior.',
              example: 'Movement: normalized_direction × speed = velocity with desired magnitude'
            },
            {
              domain: 'Physics Simulations',
              description: 'Unit vectors represent pure directions. Used in force calculations.',
              example: 'Force = magnitude × normalized_direction_vector'
            }
          ]
        }
      };

      return applications[selectedOperation] || applications['crossproduct3d'];
    }
    return null;
  };

    return getApplications();
  }, [mode, selectedOperation, transform3dType]);

  if (!applicationData) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg shadow-lg p-4 mb-4 border-2 border-rose-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-3 text-left"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-rose-600" />
          <h3 className="text-lg font-bold text-rose-900">
            Real-World Applications
          </h3>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-rose-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-rose-600" />
        )}
      </button>

      {expanded && (
        <div className="bg-white rounded-lg p-4 border-2 border-rose-200">
          <h4 className="text-md font-semibold text-rose-900 mb-3">{applicationData.title}</h4>
          
          {applicationData.why && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded">
              <p className="text-sm font-semibold text-blue-900 mb-1">Why is this operation needed?</p>
              <p className="text-sm text-blue-800 leading-relaxed">{applicationData.why}</p>
            </div>
          )}
          
          <div className="space-y-4">
            {applicationData.examples.map((app, index) => (
              <div key={index} className="bg-rose-50 rounded-lg p-4 border border-rose-200">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-rose-900 mb-1">{app.domain}</h5>
                    <p className="text-xs text-gray-700 mb-2 leading-relaxed">{app.description}</p>
                    <div className="bg-white p-2 rounded border border-rose-200">
                      <p className="text-xs font-mono text-rose-800">{app.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

