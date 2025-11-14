// Best practices for Transformation Visualization tutorial

export const getTransformationBestPractices = (module, step) => {
  const practices = {
    'matrix-operations': {
      1: {
        title: 'Best Practices - Matrix Operations',
        practices: [
          {
            practice: 'Validate Dimensions',
            description: 'Always check matrix dimensions before operations to prevent errors',
            example: 'if (A.length !== B.length || A[0].length !== B[0].length) throw new Error("Dimension mismatch")'
          },
          {
            practice: 'Use Typed Arrays for Performance',
            description: 'Use Float32Array for better performance in WebGL operations',
            example: 'const matrix = new Float32Array([1, 0, 0, 1, 0, 0, 0, 0, 1])'
          },
          {
            practice: 'Cache Matrix Calculations',
            description: 'Cache frequently used matrix multiplications to avoid redundant calculations',
            example: 'const cachedTransform = matrixMultiply(scale, rotate)'
          }
        ]
      }
    }
    // ... more modules
  };

  if (practices[module]) {
    if (practices[module][step]) {
      return practices[module][step];
    } else if (practices[module][1]) {
      return practices[module][1];
    }
  }
  
  return null;
};

