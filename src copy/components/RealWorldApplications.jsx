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
          examples: [
            {
              domain: 'Image Processing',
              description: 'Combining image transformations additively. Used in image blending and compositing.',
              example: 'Adding translation matrices: combine multiple translations into one'
            },
            {
              domain: 'Physics',
              description: 'Combining multiple transformation effects. Used in composite systems.',
              example: 'Multiple force transformations acting simultaneously'
            }
          ]
        },
        'subtraction': {
          title: 'Matrix Subtraction - Real-World Applications',
          examples: [
            {
              domain: 'Computer Vision',
              description: 'Finding difference between transformations. Used in motion estimation.',
              example: 'Frame difference: current_frame - previous_frame = motion'
            },
            {
              domain: 'Control Systems',
              description: 'Error calculation in feedback control loops.',
              example: 'Error = desired_state - current_state'
            }
          ]
        },
        'multiply': {
          title: 'Matrix Multiplication - Real-World Applications',
          examples: [
            {
              domain: 'Computer Graphics - Image Transformations',
              description: 'Composing transformations: rotation, scaling, translation. Used in 2D/3D rendering pipelines.',
              example: 'Transform = Translation × Rotation × Scale. Applies transformations in sequence.'
            },
            {
              domain: 'Robotics',
              description: 'Forward kinematics: calculating end-effector position from joint angles using transformation matrices.',
              example: 'Robot arm: Base × Shoulder × Elbow × Wrist = end position'
            },
            {
              domain: 'Machine Learning',
              description: 'Neural networks: each layer applies matrix multiplication. Core operation in deep learning.',
              example: 'y = W × x + b, where W is weight matrix, x is input, b is bias'
            },
            {
              domain: '3D Graphics - Rotations',
              description: 'Composing rotations around different axes. Used in camera control and object orientation.',
              example: 'Final rotation = RotX × RotY × RotZ. Order matters!'
            },
            {
              domain: 'Computer Vision',
              description: 'Homography transformations for perspective correction and image registration.',
              example: 'Mapping one image plane to another using 3×3 transformation matrix'
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
          examples: [
            {
              domain: 'Machine Learning',
              description: 'Transposing weight matrices in backpropagation. Used in gradient computation.',
              example: 'Backprop: error gradient = W^T × output_error'
            },
            {
              domain: 'Linear Algebra',
              description: 'Solving systems: (A^T × A) is symmetric and positive definite, easier to solve.',
              example: 'Least squares: solve (A^T × A) × x = A^T × b'
            },
            {
              domain: 'Computer Graphics',
              description: 'Transforming normals correctly. Normal matrix = (M^-1)^T for proper lighting.',
              example: 'Transformed normal = (M^-1)^T × original_normal'
            }
          ]
        },
        'apply': {
          title: 'Apply Matrix to Vector - Real-World Applications',
          examples: [
            {
              domain: 'Computer Graphics',
              description: 'Transforming vertices, normals, and directions. Core operation in rendering pipeline.',
              example: 'World space vertex = ModelMatrix × local_vertex'
            },
            {
              domain: 'Physics Simulations',
              description: 'Applying transformations to positions, velocities, and forces.',
              example: 'Transformed force = RotationMatrix × force_vector'
            },
            {
              domain: 'Robotics',
              description: 'Transforming coordinates between different reference frames.',
              example: 'End-effector position in world frame = TransformMatrix × local_position'
            }
          ]
        },
        'inverse': {
          title: 'Inverse - Real-World Applications',
          examples: [
            {
              domain: 'Computer Graphics',
              description: 'Inverse transformations: converting from world space back to local space.',
              example: 'Local position = Inverse(ModelMatrix) × world_position'
            },
            {
              domain: 'Robotics - Inverse Kinematics',
              description: 'Finding joint angles to achieve desired end-effector position.',
              example: 'Joint angles = Inverse(KinematicsMatrix) × target_position'
            },
            {
              domain: 'Solving Linear Systems',
              description: 'x = A^-1 × b solves the system Ax = b. Used throughout engineering and science.',
              example: 'Circuit analysis, structural engineering, optimization problems'
            }
          ]
        },
        'eigenvalues': {
          title: 'Eigenvalues & Eigenvectors - Real-World Applications',
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

