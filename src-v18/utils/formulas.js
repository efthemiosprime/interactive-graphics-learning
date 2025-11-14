// Formula definitions for Interactive Formula Explorer

export const getVectorAdditionFormula = (v1, v2) => {
  return {
    formula: `v₁ + v₂ = (v₁ₓ + v₂ₓ, v₁ᵧ + v₂ᵧ)`,
    parts: [
      {
        id: 'v1',
        name: 'Vector v₁',
        text: 'v₁',
        startIndex: 0,
        description: 'The first vector in the addition operation',
        example: `v₁ = (${v1.x}, ${v1.y})`,
        geometric: 'Represents a direction and magnitude in 2D space. Visualized as an arrow from origin.'
      },
      {
        id: 'plus',
        name: 'Addition Operator',
        text: '+',
        startIndex: 4,
        description: 'Adds corresponding components of vectors',
        example: 'Component-wise addition',
        geometric: 'Geometrically, this places the tail of v₂ at the head of v₁, creating a new vector.'
      },
      {
        id: 'v2',
        name: 'Vector v₂',
        text: 'v₂',
        startIndex: 6,
        description: 'The second vector in the addition operation',
        example: `v₂ = (${v2.x}, ${v2.y})`,
        geometric: 'Represents a direction and magnitude in 2D space. Visualized as an arrow from origin.'
      },
      {
        id: 'v1x',
        name: 'v₁ₓ - x-component of v₁',
        text: 'v₁ₓ',
        startIndex: 12,
        description: 'The x-coordinate (horizontal component) of the first vector',
        example: `v₁ₓ = ${v1.x}`,
        geometric: 'Horizontal displacement from origin'
      },
      {
        id: 'v2x',
        name: 'v₂ₓ - x-component of v₂',
        text: 'v₂ₓ',
        startIndex: 16,
        description: 'The x-coordinate (horizontal component) of the second vector',
        example: `v₂ₓ = ${v2.x}`,
        geometric: 'Horizontal displacement from origin'
      },
      {
        id: 'v1y',
        name: 'v₁ᵧ - y-component of v₁',
        text: 'v₁ᵧ',
        startIndex: 24,
        description: 'The y-coordinate (vertical component) of the first vector',
        example: `v₁ᵧ = ${v1.y}`,
        geometric: 'Vertical displacement from origin'
      },
      {
        id: 'v2y',
        name: 'v₂ᵧ - y-component of v₂',
        text: 'v₂ᵧ',
        startIndex: 28,
        description: 'The y-coordinate (vertical component) of the second vector',
        example: `v₂ᵧ = ${v2.y}`,
        geometric: 'Vertical displacement from origin'
      }
    ]
  };
};

export const getDotProductFormula = (v1, v2) => {
  return {
    formula: `a · b = aₓbₓ + aᵧbᵧ`,
    parts: [
      {
        id: 'a',
        name: 'Vector a',
        text: 'a',
        startIndex: 0,
        description: 'The first vector in the dot product',
        example: `a = (${v1.x}, ${v1.y})`,
        geometric: 'Represents direction and magnitude in space'
      },
      {
        id: 'dot',
        name: 'Dot Product Operator',
        text: '·',
        startIndex: 2,
        description: 'Dot product operator (also called scalar product)',
        example: 'Measures how much two vectors point in the same direction',
        geometric: 'Geometrically: a · b = |a| × |b| × cos(θ), where θ is the angle between vectors'
      },
      {
        id: 'b',
        name: 'Vector b',
        text: 'b',
        startIndex: 4,
        description: 'The second vector in the dot product',
        example: `b = (${v2.x}, ${v2.y})`,
        geometric: 'Represents direction and magnitude in space'
      },
      {
        id: 'ax',
        name: 'aₓ - x-component of a',
        text: 'aₓ',
        startIndex: 8,
        description: 'The x-coordinate of vector a',
        example: `aₓ = ${v1.x}`,
        geometric: 'Horizontal component'
      },
      {
        id: 'bx',
        name: 'bₓ - x-component of b',
        text: 'bₓ',
        startIndex: 10,
        description: 'The x-coordinate of vector b',
        example: `bₓ = ${v2.x}`,
        geometric: 'Horizontal component'
      },
      {
        id: 'ay',
        name: 'aᵧ - y-component of a',
        text: 'aᵧ',
        startIndex: 14,
        description: 'The y-coordinate of vector a',
        example: `aᵧ = ${v1.y}`,
        geometric: 'Vertical component'
      },
      {
        id: 'by',
        name: 'bᵧ - y-component of b',
        text: 'bᵧ',
        startIndex: 16,
        description: 'The y-coordinate of vector b',
        example: `bᵧ = ${v2.y}`,
        geometric: 'Vertical component'
      }
    ]
  };
};

export const getMagnitudeFormula = (v1) => {
  return {
    formula: `|v| = √(vₓ² + vᵧ²)`,
    parts: [
      {
        id: 'v',
        name: 'Vector v',
        text: 'v',
        startIndex: 2,
        description: 'The vector whose magnitude we are calculating',
        example: `v = (${v1.x}, ${v1.y})`,
        geometric: 'Represents direction and magnitude in space'
      },
      {
        id: 'magnitude',
        name: 'Magnitude Operator',
        text: '|v|',
        startIndex: 0,
        description: 'The magnitude (length) of vector v',
        example: `|v| = ${Math.sqrt(v1.x * v1.x + v1.y * v1.y).toFixed(2)}`,
        geometric: 'The distance from origin to the point. Always positive. Also called the norm or length.'
      },
      {
        id: 'sqrt',
        name: 'Square Root',
        text: '√',
        startIndex: 6,
        description: 'Square root function',
        example: 'Undoes squaring operation',
        geometric: 'Finds the side length of a square with given area'
      },
      {
        id: 'vx2',
        name: 'vₓ² - x-component squared',
        text: 'vₓ²',
        startIndex: 8,
        description: 'Square of the x-component',
        example: `vₓ² = ${v1.x}² = ${v1.x * v1.x}`,
        geometric: 'Area of a square with side length equal to x-component'
      },
      {
        id: 'vy2',
        name: 'vᵧ² - y-component squared',
        text: 'vᵧ²',
        startIndex: 13,
        description: 'Square of the y-component',
        example: `vᵧ² = ${v1.y}² = ${v1.y * v1.y}`,
        geometric: 'Area of a square with side length equal to y-component'
      },
      {
        id: 'plus',
        name: 'Addition',
        text: '+',
        startIndex: 12,
        description: 'Adds the squared components',
        example: 'Sum of squares',
        geometric: 'This is the Pythagorean theorem! Creates a right triangle.'
      }
    ]
  };
};

export const getCrossProductFormula = (v1, v2) => {
  return {
    formula: `a × b = aₓbᵧ - aᵧbₓ`,
    parts: [
      {
        id: 'a',
        name: 'Vector a',
        text: 'a',
        startIndex: 0,
        description: 'The first vector in the cross product',
        example: `a = (${v1.x}, ${v1.y})`,
        geometric: 'Represents direction and magnitude'
      },
      {
        id: 'cross',
        name: 'Cross Product Operator',
        text: '×',
        startIndex: 2,
        description: 'Cross product operator (in 2D, gives a scalar)',
        example: 'Measures perpendicular component',
        geometric: 'In 2D: gives signed area of parallelogram formed by vectors. Positive if b is counterclockwise from a.'
      },
      {
        id: 'b',
        name: 'Vector b',
        text: 'b',
        startIndex: 4,
        description: 'The second vector in the cross product',
        example: `b = (${v2.x}, ${v2.y})`,
        geometric: 'Represents direction and magnitude'
      },
      {
        id: 'axby',
        name: 'aₓbᵧ',
        text: 'aₓbᵧ',
        startIndex: 8,
        description: 'Multiply x-component of a by y-component of b',
        example: `${v1.x} × ${v2.y} = ${v1.x * v2.y}`,
        geometric: 'Part of the area calculation'
      },
      {
        id: 'aybx',
        name: 'aᵧbₓ',
        text: 'aᵧbₓ',
        startIndex: 14,
        description: 'Multiply y-component of a by x-component of b',
        example: `${v1.y} × ${v2.x} = ${v1.y * v2.x}`,
        geometric: 'Part of the area calculation'
      },
      {
        id: 'minus',
        name: 'Subtraction',
        text: '-',
        startIndex: 13,
        description: 'Subtracts the second product from the first',
        example: 'Gives signed area',
        geometric: 'The sign indicates orientation (clockwise vs counterclockwise)'
      }
    ]
  };
};

export const getMatrixMultiplyFormula = (matrixSize) => {
  if (matrixSize === '2x2') {
    return {
      formula: `C[i][j] = Σₖ A[i][k] × B[k][j]`,
      parts: [
        {
          id: 'C',
          name: 'Result Matrix C',
          text: 'C',
          startIndex: 0,
          description: 'The resulting matrix from multiplication',
          example: 'C = A × B',
          geometric: 'Represents the composition of two linear transformations'
        },
        {
          id: 'ij',
          name: 'Element Position',
          text: '[i][j]',
          startIndex: 1,
          description: 'The element at row i, column j',
          example: 'i is row index, j is column index',
          geometric: 'Position in the matrix grid'
        },
        {
          id: 'sigma',
          name: 'Summation',
          text: 'Σₖ',
          startIndex: 10,
          description: 'Sum over all values of k',
          example: 'For 2×2: k goes from 0 to 1',
          geometric: 'Adds up products across one row and one column'
        },
        {
          id: 'A',
          name: 'Matrix A',
          text: 'A',
          startIndex: 13,
          description: 'The first matrix',
          example: 'Left matrix in multiplication',
          geometric: 'First transformation to apply'
        },
        {
          id: 'B',
          name: 'Matrix B',
          text: 'B',
          startIndex: 21,
          description: 'The second matrix',
          example: 'Right matrix in multiplication',
          geometric: 'Second transformation to apply'
        },
        {
          id: 'mult',
          name: 'Multiplication',
          text: '×',
          startIndex: 20,
          description: 'Matrix multiplication',
          example: 'Not element-wise!',
          geometric: 'Composes transformations: first apply B, then apply A'
        }
      ]
    };
  }
  return null;
};

export const getDeterminantFormula = (matrixSize) => {
  if (matrixSize === '2x2') {
    return {
      formula: `det(M) = ad - bc`,
      parts: [
        {
          id: 'det',
          name: 'Determinant',
          text: 'det',
          startIndex: 0,
          description: 'Determinant function',
          example: 'Measures how much matrix scales area/volume',
          geometric: 'If det = 0, matrix collapses space to lower dimension. If det < 0, matrix flips orientation.'
        },
        {
          id: 'M',
          name: 'Matrix M',
          text: 'M',
          startIndex: 4,
          description: 'The matrix whose determinant we calculate',
          example: '2×2 matrix',
          geometric: 'Represents a linear transformation'
        },
        {
          id: 'ad',
          name: 'Main Diagonal Product',
          text: 'ad',
          startIndex: 10,
          description: 'Product of top-left and bottom-right elements',
          example: 'a × d',
          geometric: 'Part of area scaling calculation'
        },
        {
          id: 'bc',
          name: 'Anti-Diagonal Product',
          text: 'bc',
          startIndex: 15,
          description: 'Product of top-right and bottom-left elements',
          example: 'b × c',
          geometric: 'Part of area scaling calculation'
        },
        {
          id: 'minus',
          name: 'Subtraction',
          text: '-',
          startIndex: 13,
          description: 'Subtracts anti-diagonal from main diagonal',
          example: 'Gives signed area scaling factor',
          geometric: 'The sign indicates if orientation is preserved (positive) or flipped (negative)'
        }
      ]
    };
  }
  return null;
};

export const getProjectionFormula = (v1, v2) => {
  return {
    formula: `proj_b(a) = (a·b / |b|²) × b`,
    parts: [
      {
        id: 'proj',
        name: 'Projection',
        text: 'proj',
        startIndex: 0,
        description: 'Projection of vector a onto vector b',
        example: 'Finds component of a in direction of b',
        geometric: 'Drops perpendicular from tip of a to line through b. Result is parallel to b.'
      },
      {
        id: 'a',
        name: 'Vector a',
        text: 'a',
        startIndex: 6,
        description: 'The vector being projected',
        example: `a = (${v1.x}, ${v1.y})`,
        geometric: 'Original vector'
      },
      {
        id: 'b',
        name: 'Vector b',
        text: 'b',
        startIndex: 8,
        description: 'The vector onto which we project',
        example: `b = (${v2.x}, ${v2.y})`,
        geometric: 'Direction vector'
      },
      {
        id: 'dot',
        name: 'Dot Product',
        text: 'a·b',
        startIndex: 12,
        description: 'Dot product of a and b',
        example: 'Measures alignment',
        geometric: 'Larger when vectors point in similar directions'
      },
      {
        id: 'magb',
        name: '|b|²',
        text: '|b|²',
        startIndex: 16,
        description: 'Squared magnitude of b',
        example: 'Normalization factor',
        geometric: 'Area of square with side length equal to |b|'
      },
      {
        id: 'scalar',
        name: 'Scalar',
        text: '(a·b / |b|²)',
        startIndex: 12,
        description: 'Scalar multiplier',
        example: 'How much of b we need',
        geometric: 'Tells us how many "b units" fit in the projection'
      }
    ]
  };
};

export const getVectorSubtractionFormula = (v1, v2) => {
  return {
    formula: `v₁ - v₂ = (v₁ₓ - v₂ₓ, v₁ᵧ - v₂ᵧ)`,
    parts: [
      { id: 'v1', text: 'v₁', description: `Vector 1: (${v1.x}, ${v1.y})` },
      { id: 'v2', text: 'v₂', description: `Vector 2: (${v2.x}, ${v2.y})` },
      { id: 'v1x', text: 'v₁ₓ', description: `X-component of Vector 1: ${v1.x}` },
      { id: 'v2x', text: 'v₂ₓ', description: `X-component of Vector 2: ${v2.x}` },
      { id: 'v1y', text: 'v₁ᵧ', description: `Y-component of Vector 1: ${v1.y}` },
      { id: 'v2y', text: 'v₂ᵧ', description: `Y-component of Vector 2: ${v2.y}` },
    ]
  };
};

export const getNormalizeFormula = (v) => {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y);
  return {
    formula: `v̂ = v / |v|`,
    parts: [
      { id: 'vhat', text: 'v̂', description: 'Unit vector (normalized)' },
      { id: 'v', text: 'v', description: `Original vector: (${v.x}, ${v.y})` },
      { id: 'mag', text: '|v|', description: `Magnitude: ${mag.toFixed(2)}` },
    ]
  };
};

export const getAngleFormula = (v1, v2) => {
  return {
    formula: `θ = arccos((a·b) / (|a| × |b|))`,
    parts: [
      { id: 'theta', text: 'θ', description: 'Angle between vectors' },
      { id: 'dot', text: 'a·b', description: 'Dot product' },
      { id: 'maga', text: '|a|', description: `Magnitude of a: ${Math.sqrt(v1.x*v1.x + v1.y*v1.y).toFixed(2)}` },
      { id: 'magb', text: '|b|', description: `Magnitude of b: ${Math.sqrt(v2.x*v2.x + v2.y*v2.y).toFixed(2)}` },
    ]
  };
};

export const get3DDotProductFormula = (v1, v2) => {
  return {
    formula: `a · b = aₓbₓ + aᵧbᵧ + aᵧbᵧ`,
    parts: [
      { id: 'a', text: 'a', description: `Vector 1: (${v1.x}, ${v1.y}, ${v1.z})` },
      { id: 'b', text: 'b', description: `Vector 2: (${v2.x}, ${v2.y}, ${v2.z})` },
      { id: 'axbx', text: 'aₓbₓ', description: `X components: ${v1.x} × ${v2.x}` },
      { id: 'ayby', text: 'aᵧbᵧ', description: `Y components: ${v1.y} × ${v2.y}` },
      { id: 'azbz', text: 'aᵧbᵧ', description: `Z components: ${v1.z} × ${v2.z}` },
    ]
  };
};

export const get3DCrossProductFormula = (v1, v2) => {
  return {
    formula: `a × b = (aᵧbᵧ - aᵧbᵧ, aᵧbₓ - aₓbᵧ, aₓbᵧ - aᵧbₓ)`,
    parts: [
      { id: 'a', text: 'a', description: `Vector 1: (${v1.x}, ${v1.y}, ${v1.z})` },
      { id: 'b', text: 'b', description: `Vector 2: (${v2.x}, ${v2.y}, ${v2.z})` },
      { id: 'xcomp', text: 'aᵧbᵧ - aᵧbᵧ', description: 'X-component calculation' },
      { id: 'ycomp', text: 'aᵧbₓ - aₓbᵧ', description: 'Y-component calculation' },
      { id: 'zcomp', text: 'aₓbᵧ - aᵧbₓ', description: 'Z-component calculation' },
    ]
  };
};

export const get3DMagnitudeFormula = (v) => {
  return {
    formula: `|v| = √(vₓ² + vᵧ² + vᵧ²)`,
    parts: [
      { id: 'v', text: 'v', description: `Vector: (${v.x}, ${v.y}, ${v.z})` },
      { id: 'vx', text: 'vₓ', description: `X-component: ${v.x}` },
      { id: 'vy', text: 'vᵧ', description: `Y-component: ${v.y}` },
      { id: 'vz', text: 'vᵧ', description: `Z-component: ${v.z}` },
    ]
  };
};

export const getMatrixAdditionFormula = (matrixSize) => {
  return {
    formula: `C = A + B where C[i][j] = A[i][j] + B[i][j]`,
    parts: [
      { id: 'C', text: 'C', description: 'Result matrix' },
      { id: 'A', text: 'A', description: 'First matrix' },
      { id: 'B', text: 'B', description: 'Second matrix' },
      { id: 'ij', text: '[i][j]', description: 'Element at row i, column j' },
    ]
  };
};

export const getMatrixSubtractionFormula = (matrixSize) => {
  return {
    formula: `C = A - B where C[i][j] = A[i][j] - B[i][j]`,
    parts: [
      { id: 'C', text: 'C', description: 'Result matrix' },
      { id: 'A', text: 'A', description: 'First matrix' },
      { id: 'B', text: 'B', description: 'Second matrix' },
      { id: 'ij', text: '[i][j]', description: 'Element at row i, column j' },
    ]
  };
};

export const getTransposeFormula = (matrixSize) => {
  return {
    formula: `Mᵀ[i][j] = M[j][i]`,
    parts: [
      { id: 'MT', text: 'Mᵀ', description: 'Transpose of matrix M' },
      { id: 'M', text: 'M', description: 'Original matrix' },
      { id: 'ij', text: '[i][j]', description: 'Element at row i, column j' },
      { id: 'ji', text: '[j][i]', description: 'Swapped indices' },
    ]
  };
};

export const getMatrixApplyFormula = (matrixSize) => {
  return {
    formula: `v' = M × v`,
    parts: [
      { id: 'vprime', text: "v'", description: 'Transformed vector' },
      { id: 'M', text: 'M', description: 'Transformation matrix' },
      { id: 'v', text: 'v', description: 'Original vector' },
    ]
  };
};

export const get3DRotationFormula = () => {
  return {
    formula: `v' = Rₓ(θₓ) × Rᵧ(θᵧ) × Rᵧ(θᵧ) × v`,
    parts: [
      { id: 'vprime', text: "v'", description: 'Rotated vector' },
      { id: 'Rx', text: 'Rₓ', description: 'Rotation matrix around X-axis' },
      { id: 'Ry', text: 'Rᵧ', description: 'Rotation matrix around Y-axis' },
      { id: 'Rz', text: 'Rᵧ', description: 'Rotation matrix around Z-axis' },
      { id: 'v', text: 'v', description: 'Original vector' },
    ]
  };
};

export const get3DTranslationFormula = () => {
  return {
    formula: `v' = v + t`,
    parts: [
      { id: 'vprime', text: "v'", description: 'Translated vector' },
      { id: 'v', text: 'v', description: 'Original vector' },
      { id: 't', text: 't', description: 'Translation vector' },
    ]
  };
};

export const get3DScaleFormula = () => {
  return {
    formula: `v' = (sₓ × vₓ, sᵧ × vᵧ, sᵧ × vᵧ)`,
    parts: [
      { id: 'vprime', text: "v'", description: 'Scaled vector' },
      { id: 'sx', text: 'sₓ', description: 'X scale factor' },
      { id: 'sy', text: 'sᵧ', description: 'Y scale factor' },
      { id: 'sz', text: 'sᵧ', description: 'Z scale factor' },
      { id: 'vx', text: 'vₓ', description: 'X component' },
      { id: 'vy', text: 'vᵧ', description: 'Y component' },
      { id: 'vz', text: 'vᵧ', description: 'Z component' },
    ]
  };
};

export const get3x3DeterminantFormula = () => {
  return {
    formula: `det(M) = a(ei-fh) - b(di-fg) + c(dh-eg)`,
    parts: [
      { id: 'det', text: 'det', description: 'Determinant' },
      { id: 'M', text: 'M', description: '3×3 matrix' },
      { id: 'a', text: 'a', description: 'M[0][0]' },
      { id: 'b', text: 'b', description: 'M[0][1]' },
      { id: 'c', text: 'c', description: 'M[0][2]' },
      { id: 'd', text: 'd', description: 'M[1][0]' },
      { id: 'e', text: 'e', description: 'M[1][1]' },
      { id: 'f', text: 'f', description: 'M[1][2]' },
      { id: 'g', text: 'g', description: 'M[2][0]' },
      { id: 'h', text: 'h', description: 'M[2][1]' },
      { id: 'i', text: 'i', description: 'M[2][2]' },
    ]
  };
};

