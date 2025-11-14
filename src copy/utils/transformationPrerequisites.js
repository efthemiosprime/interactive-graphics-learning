// Prerequisites for Transformation Visualization tutorial

export const getTransformationPrerequisites = (module, step) => {
  const prerequisites = {
    'matrix-operations': {
      1: {
        title: 'Prerequisites for Matrix Operations',
        required: [
          {
            skill: 'Basic JavaScript',
            description: 'Understanding arrays, loops, functions, and object manipulation',
            level: 'Beginner',
            resources: 'MDN JavaScript Guide'
          },
          {
            skill: 'WebGL Basics',
            description: 'Understanding WebGL context, shaders, and rendering pipeline',
            level: 'Intermediate',
            resources: 'MDN WebGL Tutorial'
          },
          {
            skill: 'Linear Algebra Basics',
            description: 'Understanding vectors, matrices, and basic operations',
            level: 'Beginner',
            resources: 'Vector & Matrix Operations tutorial'
          }
        ],
        recommended: [
          {
            skill: 'GLSL Shader Language',
            description: 'Understanding GLSL syntax and matrix types',
            level: 'Helpful',
            resources: 'GLSL documentation'
          }
        ]
      }
    },
    'quaternions': {
      1: {
        title: 'Prerequisites for Quaternions',
        required: [
          {
            skill: '3D Rotations',
            description: 'Understanding Euler angles and rotation matrices',
            level: 'Intermediate',
            resources: 'Rotation module in this tutorial, 3D Transformations & Projections tutorial'
          },
          {
            skill: 'Complex Numbers',
            description: 'Understanding imaginary numbers and complex arithmetic',
            level: 'Helpful',
            resources: 'Basic math background'
          },
          {
            skill: 'Trigonometry',
            description: 'Understanding sin, cos, arccos functions',
            level: 'Intermediate',
            resources: 'Vector & Matrix Operations tutorial'
          }
        ],
        recommended: [
          {
            skill: 'Group Theory',
            description: 'Understanding mathematical groups (optional)',
            level: 'Advanced',
            resources: 'Advanced mathematics'
          }
        ]
      }
    },
    'projection': {
      1: {
        title: 'Prerequisites for Projections',
        required: [
          {
            skill: '3D Coordinates',
            description: 'Understanding 3D coordinate systems and homogeneous coordinates',
            level: 'Intermediate',
            resources: 'Translation module in this tutorial'
          },
          {
            skill: 'Matrix Multiplication',
            description: 'Understanding 4×4 matrix operations',
            level: 'Intermediate',
            resources: 'Matrix Operations module in this tutorial'
          },
          {
            skill: 'Geometry',
            description: 'Understanding similar triangles and perspective',
            level: 'Beginner',
            resources: 'Basic geometry'
          }
        ],
        recommended: [
          {
            skill: 'Camera Systems',
            description: 'Understanding view transformations (optional)',
            level: 'Intermediate',
            resources: '3D Transformations & Projections tutorial'
          }
        ]
      }
    }
    // ... more modules
  };

  if (prerequisites[module]) {
    if (prerequisites[module][step]) {
      return prerequisites[module][step];
    } else if (prerequisites[module][1]) {
      return prerequisites[module][1];
    }
  }
  
  return null;
};

