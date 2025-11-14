import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

export default function FormulaReferencePanel({ mode, selectedOperation, transform3dType, v1, v2, v3d, v3d_2, m1, m2, m1_3x3, m2_3x3, matrixSize }) {
  const [expanded, setExpanded] = useState(true);

  const getFormulas = () => {
    if (mode === 'vector') {
      const formulas = {
        'addition': {
          title: 'Vector Addition',
          formula: 'v₁ + v₂ = (v₁ₓ + v₂ₓ, v₁ᵧ + v₂ᵧ)',
          description: 'Add corresponding components',
          example: `(${v1.x}, ${v1.y}) + (${v2.x}, ${v2.y}) = (${v1.x + v2.x}, ${v1.y + v2.y})`
        },
        'subtraction': {
          title: 'Vector Subtraction',
          formula: 'v₁ - v₂ = (v₁ₓ - v₂ₓ, v₁ᵧ - v₂ᵧ)',
          description: 'Subtract corresponding components',
          example: `(${v1.x}, ${v1.y}) - (${v2.x}, ${v2.y}) = (${v1.x - v2.x}, ${v1.y - v2.y})`
        },
        'dotproduct': {
          title: 'Dot Product',
          formula: 'v₁ · v₂ = v₁ₓ·v₂ₓ + v₁ᵧ·v₂ᵧ',
          description: 'Scalar product of vectors',
          example: `(${v1.x}, ${v1.y}) · (${v2.x}, ${v2.y}) = ${v1.x * v2.x} + ${v1.y * v2.y} = ${v1.x * v2.x + v1.y * v2.y}`
        },
        'magnitude': {
          title: 'Magnitude',
          formula: '||v|| = √(vₓ² + vᵧ²)',
          description: 'Length of vector',
          example: `||(${v1.x}, ${v1.y})|| = √(${v1.x}² + ${v1.y}²) = √${v1.x * v1.x + v1.y * v1.y} = ${Math.sqrt(v1.x * v1.x + v1.y * v1.y).toFixed(2)}`
        },
        'normalize': {
          title: 'Normalize',
          formula: 'û = v / ||v||',
          description: 'Unit vector (length = 1)',
          example: `û = (${v1.x}, ${v1.y}) / ${Math.sqrt(v1.x * v1.x + v1.y * v1.y).toFixed(2)}`
        },
        'cross': {
          title: 'Cross Product (2D)',
          formula: 'v₁ × v₂ = v₁ₓ·v₂ᵧ - v₁ᵧ·v₂ₓ',
          description: 'Z-component of 3D cross product',
          example: `(${v1.x}, ${v1.y}) × (${v2.x}, ${v2.y}) = ${v1.x * v2.y} - ${v1.y * v2.x} = ${v1.x * v2.y - v1.y * v2.x}`
        },
        'angle2d': {
          title: 'Angle Between Vectors',
          formula: 'θ = arccos((v₁·v₂) / (||v₁||·||v₂||))',
          description: 'Angle in radians',
          example: `θ = arccos(${(v1.x * v2.x + v1.y * v2.y).toFixed(2)} / (${Math.sqrt(v1.x * v1.x + v1.y * v1.y).toFixed(2)} × ${Math.sqrt(v2.x * v2.x + v2.y * v2.y).toFixed(2)}))`
        },
        'projection2d': {
          title: 'Vector Projection',
          formula: 'projᵥ(u) = ((u·v) / ||v||²) · v',
          description: 'Project u onto v',
          example: `projᵥ(u) = ((${v1.x * v2.x + v1.y * v2.y}) / ${v2.x * v2.x + v2.y * v2.y}) · (${v2.x}, ${v2.y})`
        }
      };

      return formulas[selectedOperation] || formulas['addition'];
    } else if (mode === 'matrix') {
      const currentM1 = matrixSize === '3x3' ? m1_3x3 : m1;
      const currentM2 = matrixSize === '3x3' ? m2_3x3 : m2;
      
      const formulas = {
        'addition': {
          title: 'Matrix Addition',
          formula: matrixSize === '2x2' 
            ? 'C = A + B\nC[i][j] = A[i][j] + B[i][j]'
            : matrixSize === '3x3'
            ? 'C = A + B\nC[i][j] = A[i][j] + B[i][j] (for all i, j)'
            : 'C = A + B\nElement-wise addition',
          description: 'Add corresponding elements',
          example: matrixSize === '2x2'
            ? `[${currentM1[0][0]}, ${currentM1[0][1]}] + [${currentM2[0][0]}, ${currentM2[0][1]}] = [${currentM1[0][0] + currentM2[0][0]}, ${currentM1[0][1] + currentM2[0][1]}]\n[${currentM1[1][0]}, ${currentM1[1][1]}]   [${currentM2[1][0]}, ${currentM2[1][1]}]   [${currentM1[1][0] + currentM2[1][0]}, ${currentM1[1][1] + currentM2[1][1]}]`
            : 'Add each corresponding element'
        },
        'subtraction': {
          title: 'Matrix Subtraction',
          formula: 'C = A - B\nC[i][j] = A[i][j] - B[i][j]',
          description: 'Subtract corresponding elements',
          example: 'Subtract each corresponding element'
        },
        'multiply': {
          title: 'Matrix Multiplication',
          formula: matrixSize === '2x2'
            ? 'C = A × B\nC[i][j] = Σₖ A[i][k] × B[k][j]'
            : 'C = A × B\nC[i][j] = Σₖ A[i][k] × B[k][j] (k = 0 to n-1)',
          description: 'Row × Column multiplication',
          example: matrixSize === '2x2'
            ? `C[0][0] = A[0][0]×B[0][0] + A[0][1]×B[1][0]\nC[0][1] = A[0][0]×B[0][1] + A[0][1]×B[1][1]\nC[1][0] = A[1][0]×B[0][0] + A[1][1]×B[1][0]\nC[1][1] = A[1][0]×B[0][1] + A[1][1]×B[1][1]`
            : 'Each element = sum of row × column products'
        },
        'determinant': {
          title: 'Determinant',
          formula: matrixSize === '2x2'
            ? 'det(A) = a·d - b·c\n= A[0][0]×A[1][1] - A[0][1]×A[1][0]'
            : matrixSize === '3x3'
            ? 'det(A) = a(ei-fh) - b(di-fg) + c(dh-eg)\nUsing cofactor expansion'
            : 'det(A) = Calculated using cofactor expansion',
          description: 'Scalar value measuring volume scaling',
          example: matrixSize === '2x2'
            ? `det = ${currentM1[0][0]}×${currentM1[1][1]} - ${currentM1[0][1]}×${currentM1[1][0]} = ${currentM1[0][0] * currentM1[1][1] - currentM1[0][1] * currentM1[1][0]}`
            : 'Calculate using cofactor expansion'
        },
        'transpose': {
          title: 'Matrix Transpose',
          formula: 'Aᵀ[i][j] = A[j][i]',
          description: 'Flip rows and columns',
          example: 'Rows become columns, columns become rows'
        },
        'apply': {
          title: 'Apply Matrix to Vector',
          formula: matrixSize === '2x2'
            ? 'v\' = M × v\nv\'ₓ = M[0][0]×vₓ + M[0][1]×vᵧ\nv\'ᵧ = M[1][0]×vₓ + M[1][1]×vᵧ'
            : 'v\' = M × v\nEach component = matrix row · vector',
          description: 'Transform vector using matrix',
          example: 'Multiply matrix by vector (as column)'
        },
        'inverse': {
          title: 'Matrix Inverse',
          formula: matrixSize === '2x2'
            ? 'A⁻¹ = (1/det(A)) × [[d, -b], [-c, a]]'
            : 'A⁻¹ = (1/det(A)) × adj(A)',
          description: 'Inverse matrix (if det ≠ 0)',
          example: 'Only exists if determinant ≠ 0'
        },
        'eigenvalues': {
          title: 'Eigenvalues & Eigenvectors',
          formula: matrixSize === '2x2'
            ? 'det(M - λI) = 0\nλ² - trace(M)×λ + det(M) = 0\n(M - λI)v = 0'
            : 'det(M - λI) = 0\n-λ³ + trace(M)×λ² - sum_of_minors×λ + det(M) = 0\n(M - λI)v = 0',
          description: 'Eigenvalues are roots of characteristic polynomial. Eigenvectors are null space of (M - λI)',
          example: matrixSize === '2x2'
            ? 'For 2×2: Solve quadratic equation\nFor each eigenvalue λ, solve (M - λI)v = 0'
            : 'For 3×3: Solve cubic equation\nFor each eigenvalue λ, solve (M - λI)v = 0'
        },
        'rank': {
          title: 'Matrix Rank',
          formula: 'rank(M) = number of linearly independent rows\n= number of linearly independent columns\n= dimension of column space\n= dimension of row space',
          description: 'Rank is the maximum number of linearly independent rows (or columns)',
          example: matrixSize === '2x2'
            ? 'For 2×2: rank = 2 if det ≠ 0, rank = 1 if one row is multiple of other, rank = 0 if zero matrix'
            : matrixSize === '3x3'
            ? 'For 3×3: rank = 3 if det ≠ 0, rank < 3 if rows are linearly dependent'
            : 'For 4×4: Use Gaussian elimination to find number of independent rows'
        }
      };

      return formulas[selectedOperation] || formulas['addition'];
    } else if (mode === '3d') {
      const formulas = {
        'rotation': {
          title: '3D Rotation',
          formula: 'R = R_x(θ_x) × R_y(θ_y) × R_z(θ_z)\nv\' = R × v',
          description: 'Rotate around X, Y, Z axes',
          example: 'Compose rotation matrices around each axis'
        },
        'translation': {
          title: '3D Translation',
          formula: 'v\' = v + t\nv\'_x = v_x + t_x\nv\'_y = v_y + t_y\nv\'_z = v_z + t_z',
          description: 'Move point in space',
          example: `(${v3d.x}, ${v3d.y}, ${v3d.z}) + (tx, ty, tz)`
        },
        'scale': {
          title: '3D Scaling',
          formula: 'v\' = S × v\nv\'_x = s_x × v_x\nv\'_y = s_y × v_y\nv\'_z = s_z × v_z',
          description: 'Resize object',
          example: `(${v3d.x}, ${v3d.y}, ${v3d.z}) × (sx, sy, sz)`
        }
      };

      return formulas[transform3dType] || formulas['rotation'];
    } else if (mode === 'advanced') {
      const formulas = {
        'crossproduct3d': {
          title: '3D Cross Product',
          formula: 'a × b = (a_y·b_z - a_z·b_y, a_z·b_x - a_x·b_z, a_x·b_y - a_y·b_x)',
          description: 'Perpendicular vector',
          example: `(${v3d.x}, ${v3d.y}, ${v3d.z}) × (${v3d_2.x}, ${v3d_2.y}, ${v3d_2.z})`
        },
        'dotproduct3d': {
          title: '3D Dot Product',
          formula: 'a · b = a_x·b_x + a_y·b_y + a_z·b_z',
          description: 'Scalar product',
          example: `(${v3d.x}, ${v3d.y}, ${v3d.z}) · (${v3d_2.x}, ${v3d_2.y}, ${v3d_2.z}) = ${v3d.x * v3d_2.x + v3d.y * v3d_2.y + v3d.z * v3d_2.z}`
        },
        'projection': {
          title: 'Vector Projection',
          formula: 'projᵥ(u) = ((u·v) / ||v||²) · v',
          description: 'Project u onto v',
          example: 'Scalar projection times unit vector'
        },
        'angle': {
          title: 'Angle Between Vectors',
          formula: 'θ = arccos((u·v) / (||u||·||v||))',
          description: 'Angle in radians',
          example: 'Using dot product and magnitudes'
        },
        'magnitude3d': {
          title: '3D Magnitude',
          formula: '||v|| = √(vₓ² + vᵧ² + vᵧ²)',
          description: 'Length of 3D vector',
          example: `||(${v3d.x}, ${v3d.y}, ${v3d.z})|| = √(${v3d.x}² + ${v3d.y}² + ${v3d.z}²)`
        },
        'normalize3d': {
          title: '3D Normalize',
          formula: 'û = v / ||v||',
          description: 'Unit vector (length = 1)',
          example: 'Divide vector by its magnitude'
        }
      };

      return formulas[selectedOperation] || formulas['crossproduct3d'];
    }
    return null;
  };

  const formulaData = getFormulas();

  if (!formulaData) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg shadow-lg p-4 mb-4 border-2 border-teal-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-3 text-left"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg font-bold text-teal-900">
            Formula Reference
          </h3>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-teal-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-teal-600" />
        )}
      </button>

      {expanded && (
        <div className="bg-white rounded-lg p-4 border-2 border-teal-200">
          <h4 className="text-md font-semibold text-teal-900 mb-2">{formulaData.title}</h4>
          <p className="text-xs text-gray-600 mb-3 italic">{formulaData.description}</p>
          
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-300 mb-3">
            <p className="text-sm font-mono text-teal-900 whitespace-pre-line leading-relaxed">
              {formulaData.formula}
            </p>
          </div>

          {formulaData.example && (
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-1">Example:</p>
              <p className="text-xs font-mono text-gray-800 whitespace-pre-line">
                {formulaData.example}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

