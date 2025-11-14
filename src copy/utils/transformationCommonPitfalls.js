// Common pitfalls for Transformation Visualization tutorial

export const getTransformationCommonPitfalls = (module, step) => {
  const pitfalls = {
    'matrix-operations': {
      1: {
        title: 'Common Matrix Operation Issues',
        pitfalls: [
          {
            issue: 'Dimension mismatch in addition/subtraction',
            cause: 'Trying to add/subtract matrices of different sizes',
            solution: 'Verify matrices have same dimensions before operations',
            prevention: 'Always check dimensions: A.length === B.length && A[0].length === B[0].length'
          },
          {
            issue: 'Wrong order in matrix multiplication',
            cause: 'Matrix multiplication is not commutative: A × B ≠ B × A',
            solution: 'Ensure correct order: result = A × B means apply B first, then A',
            prevention: 'Think of transformations: rightmost matrix applied first'
          },
          {
            issue: 'Index out of bounds',
            cause: 'Accessing matrix elements with invalid indices',
            solution: 'Always check bounds: 0 ≤ i < rows, 0 ≤ j < columns',
            prevention: 'Use proper loop bounds and validate indices'
          }
        ]
      }
    },
    'quaternions': {
      1: {
        title: 'Common Quaternion Issues',
        pitfalls: [
          {
            issue: 'Non-normalized quaternion',
            cause: 'Using quaternion that is not unit length for rotation',
            solution: 'Always normalize quaternion before use: q = q / |q|',
            prevention: 'Normalize after creating or modifying quaternion'
          },
          {
            issue: 'Wrong quaternion multiplication order',
            cause: 'Quaternion multiplication is non-commutative',
            solution: 'q1 × q2 applies q2 first, then q1. Check order carefully.',
            prevention: 'Think: rightmost quaternion applied first'
          },
          {
            issue: 'Gimbal lock confusion',
            cause: 'Thinking quaternions solve all rotation problems',
            solution: 'Quaternions avoid gimbal lock but still require careful handling',
            prevention: 'Understand when to use quaternions vs Euler angles'
          }
        ]
      }
    },
    'projection': {
      1: {
        title: 'Common Projection Issues',
        pitfalls: [
          {
            issue: 'Forgot perspective divide',
            cause: 'Not dividing by w component after perspective projection',
            solution: 'Always divide x, y, z by w after perspective matrix',
            prevention: 'GPU does this automatically, but CPU code must do it manually'
          },
          {
            issue: 'Wrong aspect ratio',
            cause: 'Using incorrect aspect ratio causes distortion',
            solution: 'aspect = width / height. Use actual viewport dimensions.',
            prevention: 'Calculate aspect ratio from actual canvas/viewport size'
          },
          {
            issue: 'Near/far plane issues',
            cause: 'Near plane too close or far plane too far causes precision issues',
            solution: 'Use reasonable values: near > 0, far > near, ratio not too large',
            prevention: 'Keep far/near ratio under 1000 for better precision'
          },
          {
            issue: 'Y-axis not flipped',
            cause: 'Screen Y increases downward, NDC Y increases upward',
            solution: 'Flip Y when mapping NDC to screen: screenY = height - ndcY',
            prevention: 'Always account for coordinate system differences'
          }
        ]
      }
    }
    // ... more modules
  };

  if (pitfalls[module]) {
    if (pitfalls[module][step]) {
      return pitfalls[module][step];
    } else if (pitfalls[module][1]) {
      return pitfalls[module][1];
    }
  }
  
  return null;
};

