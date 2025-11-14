// Mathematical concepts for Transformation Visualization tutorial

export const getTransformationMathConcepts = (module, step) => {
  const concepts = {
    'matrix-operations': {
      1: [
        {
          name: 'Linear Algebra',
          description: 'Branch of mathematics dealing with vectors, matrices, and linear transformations. See: Vector & Matrix Operations tutorial.'
        },
        {
          name: 'Matrix Dimensions',
          description: 'The size of a matrix defined by rows × columns. Essential for operations compatibility.'
        }
      ]
    },
    'scaling': {
      1: [
        {
          name: 'Scaling Transformation',
          description: 'Linear transformation that multiplies coordinates by scale factors. See: Vector & Matrix Operations tutorial.'
        },
        {
          name: 'Diagonal Matrices',
          description: 'Scaling matrices are diagonal matrices (non-zero only on diagonal).'
        }
      ]
    },
    'translation': {
      1: [
        {
          name: 'Homogeneous Coordinates',
          description: 'Extended coordinate system using (x, y, z, w) to represent translation as matrix multiplication.'
        },
        {
          name: 'Affine Transformations',
          description: 'Transformations that preserve parallel lines. Translation is an affine transformation.'
        }
      ]
    },
    'rotation': {
      1: [
        {
          name: 'Trigonometry',
          description: 'Uses sin and cos functions to calculate rotation. See: Vector & Matrix Operations tutorial.'
        },
        {
          name: 'Orthogonal Matrices',
          description: 'Rotation matrices are orthogonal (preserve distances and angles). R × Rᵀ = I.'
        }
      ]
    },
    'reflection': {
      1: [
        {
          name: 'Isometry',
          description: 'Reflection preserves distances but flips orientation. Determinant = -1.'
        },
        {
          name: 'Self-Inverse',
          description: 'Reflection is its own inverse: R × R = I, so R⁻¹ = R.'
        }
      ]
    },
    'quaternions': {
      1: [
        {
          name: 'Hypercomplex Numbers',
          description: 'Quaternions extend complex numbers to 4D. They form a division algebra.'
        },
        {
          name: 'Unit Sphere',
          description: 'Unit quaternions lie on 4D unit sphere. Rotations correspond to points on this sphere.'
        },
        {
          name: 'Gimbal Lock',
          description: 'Problem with Euler angles when two axes align. Quaternions avoid this. See: 3D Transformations & Projections tutorial.'
        }
      ],
      2: [
        {
          name: 'Euler Angles',
          description: 'Three rotations around X, Y, Z axes. Can be converted to quaternions. See: 3D Transformations & Projections tutorial.'
        },
        {
          name: 'Axis-Angle Representation',
          description: 'Rotation represented as axis vector and angle. Natural conversion to quaternions.'
        }
      ],
      3: [
        {
          name: 'Matrix Representation',
          description: 'Quaternions can be converted to rotation matrices for use in graphics pipelines.'
        },
        {
          name: 'Orthogonal Matrices',
          description: 'Quaternion-derived matrices are orthogonal (preserve distances).'
        }
      ],
      4: [
        {
          name: 'Quaternion Algebra',
          description: 'Quaternions form a non-commutative division algebra. Multiplication composes rotations.'
        },
        {
          name: 'Group Theory',
          description: 'Unit quaternions form a group under multiplication (SO(3) double cover).'
        }
      ],
      5: [
        {
          name: 'Spherical Geometry',
          description: 'SLERP follows geodesic (shortest path) on 4D unit sphere.'
        },
        {
          name: 'Interpolation',
          description: 'SLERP provides constant angular velocity interpolation. See: Animation & Interpolation tutorial.'
        }
      ]
    },
    'projection': {
      1: [
        {
          name: 'Perspective Geometry',
          description: 'Mathematical model of how 3D objects appear on 2D plane. Uses similar triangles.'
        },
        {
          name: 'Homogeneous Coordinates',
          description: 'Projections use 4D homogeneous coordinates. W component encodes depth.'
        }
      ],
      2: [
        {
          name: 'Field of View',
          description: 'Angle of visible scene. Related to focal length and sensor size.'
        },
        {
          name: 'Aspect Ratio',
          description: 'Width/height ratio. Affects projection matrix to prevent distortion.'
        }
      ],
      3: [
        {
          name: 'Orthographic Projection',
          description: 'Parallel projection preserving parallel lines. No perspective distortion.'
        },
        {
          name: 'View Volume',
          description: 'Bounding box defining visible 3D region. Defined by left, right, top, bottom, near, far planes.'
        }
      ],
      4: [
        {
          name: 'Perspective Divide',
          description: 'Division by w component after projection creates depth scaling effect.'
        },
        {
          name: 'Clip Space',
          description: 'Coordinates after projection, before perspective divide. Range: [-w, w] for each component.'
        }
      ],
      5: [
        {
          name: 'Normalized Device Coordinates',
          description: 'Coordinates after perspective divide. Range: [-1, 1] for x, y, z.'
        },
        {
          name: 'Viewport Mapping',
          description: 'Linear transformation mapping NDC to screen pixel coordinates.'
        }
      ],
      6: [
        {
          name: 'Rendering Pipeline',
          description: 'Complete transformation from object space to screen space. See: 3D Transformations & Projections tutorial.'
        },
        {
          name: 'Matrix Composition',
          description: 'MVP matrix combines model, view, and projection transformations efficiently.'
        }
      ]
    },
    'combined': {
      1: [
        {
          name: 'Matrix Composition',
          description: 'Combining multiple transformations through matrix multiplication.'
        },
        {
          name: 'Transformation Order',
          description: 'Order matters! Rightmost transformation applied first.'
        }
      ]
    }
  };

  if (concepts[module]) {
    if (concepts[module][step]) {
      return concepts[module][step];
    } else if (concepts[module][1]) {
      return concepts[module][1];
    }
  }
  
  return [];
};

