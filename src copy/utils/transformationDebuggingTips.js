// Debugging tips for Transformation Visualization tutorial

export const getTransformationDebuggingTips = (module, step) => {
  const tips = {
    'matrix-operations': {
      1: {
        title: 'Debugging Tips - Matrix Operations',
        tips: [
          {
            tip: 'Log Matrix Dimensions',
            description: 'Always log matrix dimensions to verify compatibility',
            example: 'console.log("A:", A.length, "x", A[0].length, "B:", B.length, "x", B[0].length)'
          },
          {
            tip: 'Print Matrices',
            description: 'Print matrices in readable format to verify values',
            example: 'console.table(matrix) // Shows matrix in table format'
          },
          {
            tip: 'Test with Identity Matrix',
            description: 'Test operations with identity matrix to verify correctness',
            example: 'const I = [[1, 0], [0, 1]]; const result = matrixMultiply(A, I) // Should equal A'
          }
        ]
      }
    }
    // ... more modules
  };

  if (tips[module]) {
    if (tips[module][step]) {
      return tips[module][step];
    } else if (tips[module][1]) {
      return tips[module][1];
    }
  }
  
  return null;
};

