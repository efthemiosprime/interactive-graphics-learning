// Glossary for Transformation Visualization tutorial

export const getTransformationGlossary = (module, step) => {
  const glossaries = {
    'matrix-operations': {
      1: {
        title: 'Key Terms - Matrix Operations',
        terms: [
          {
            term: 'Matrix',
            definition: 'Rectangular array of numbers arranged in rows and columns',
            example: '[[1, 2], [3, 4]]'
          },
          {
            term: 'Element',
            definition: 'Individual number in a matrix, accessed by row and column indices',
            example: 'matrix[i][j]'
          },
          {
            term: 'Dimension',
            definition: 'Size of matrix: rows × columns',
            example: '2×2, 3×3, 4×4'
          },
          {
            term: 'Matrix Addition',
            definition: 'Element-wise addition of corresponding elements',
            example: 'C[i][j] = A[i][j] + B[i][j]'
          },
          {
            term: 'Matrix Multiplication',
            definition: 'Combining matrices using dot products of rows and columns',
            example: 'C[i][j] = Σ(k) A[i][k] × B[k][j]'
          }
        ]
      }
    },
    'quaternions': {
      1: {
        title: 'Key Terms - Quaternions',
        terms: [
          {
            term: 'Quaternion',
            definition: '4D number q = (w, x, y, z) representing 3D rotation',
            example: 'q = (1, 0, 0, 0) // identity'
          },
          {
            term: 'Unit Quaternion',
            definition: 'Quaternion with length 1: √(w² + x² + y² + z²) = 1',
            example: 'Required for rotation representation'
          },
          {
            term: 'Gimbal Lock',
            definition: 'Problem with Euler angles when two rotation axes align',
            example: 'Occurs when pitch = ±90°'
          },
          {
            term: 'SLERP',
            definition: 'Spherical Linear Interpolation - smooth rotation interpolation',
            example: 'slerp(q1, q2, t) interpolates between quaternions'
          },
          {
            term: 'Quaternion Multiplication',
            definition: 'Composes rotations. Non-commutative: q1 × q2 ≠ q2 × q1',
            example: 'q1 × q2 applies q2 first, then q1'
          }
        ]
      }
    },
    'projection': {
      1: {
        title: 'Key Terms - Projections',
        terms: [
          {
            term: 'Perspective Projection',
            definition: '3D to 2D mapping where distant objects appear smaller',
            example: 'Mimics human vision'
          },
          {
            term: 'Orthographic Projection',
            definition: 'Parallel projection preserving parallel lines, no depth scaling',
            example: 'Used in technical drawings'
          },
          {
            term: 'Field of View (FOV)',
            definition: 'Angle of visible scene, typically 45° to 90°',
            example: 'fov = 45° = π/4 radians'
          },
          {
            term: 'Aspect Ratio',
            definition: 'Width to height ratio: aspect = width / height',
            example: '16:9 = 1.778, 4:3 = 1.333'
          },
          {
            term: 'Perspective Divide',
            definition: 'Divide x, y, z by w component after projection matrix',
            example: 'x\' = x/w, y\' = y/w, z\' = z/w'
          },
          {
            term: 'NDC (Normalized Device Coordinates)',
            definition: 'Coordinates after perspective divide, range [-1, 1]',
            example: 'Standard coordinate system for graphics'
          },
          {
            term: 'Viewport',
            definition: 'Screen region where 3D scene is rendered',
            example: 'Usually entire canvas or window'
          },
          {
            term: 'Near/Far Planes',
            definition: 'Closest and farthest visible distances in 3D scene',
            example: 'near = 0.1, far = 100'
          }
        ]
      }
    }
    // ... more modules
  };

  if (glossaries[module]) {
    if (glossaries[module][step]) {
      return glossaries[module][step];
    } else if (glossaries[module][1]) {
      return glossaries[module][1];
    }
  }
  
  return null;
};

