import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import * as math from '../utils/math';

export default function BasisVectorsVisualization({ mode, selectedOperation, m1, m2, m1_3x3, m2_3x3, m1_4x4, m2_4x4, matrixSize, transform3dType, rotation3d, translation3d, scale3d }) {
  const [expanded, setExpanded] = useState(true);

  const getMatrix = () => {
    if (mode === 'matrix') {
      const currentM1 = matrixSize === '4x4' ? m1_4x4 : matrixSize === '3x3' ? m1_3x3 : m1;
      const currentM2 = matrixSize === '4x4' ? m2_4x4 : matrixSize === '3x3' ? m2_3x3 : m2;
      
      // For operations that combine matrices, use the result
      let resultMatrix = currentM1;
      if (selectedOperation === 'addition') {
        resultMatrix = math.matrixAdd(currentM1, currentM2);
      } else if (selectedOperation === 'subtraction') {
        resultMatrix = math.matrixSubtract(currentM1, currentM2);
      } else if (selectedOperation === 'multiply') {
        resultMatrix = math.matrixMultiply(currentM1, currentM2);
      } else if (selectedOperation === 'apply') {
        // For apply operation, use M1
        resultMatrix = currentM1;
      } else if (selectedOperation === 'transpose') {
        resultMatrix = math.transpose(currentM1);
      } else if (selectedOperation === 'inverse') {
        const inv = math.inverseMatrix2D(currentM1);
        if (inv) {
          resultMatrix = inv;
        } else {
          return null; // Matrix is singular, can't visualize
        }
      } else if (selectedOperation === 'eigenvalues') {
        // For eigenvalues, visualize the original matrix transformation
        // Eigenvectors will be shown separately if needed
        resultMatrix = currentM1;
      } else if (selectedOperation === 'rank') {
        // For rank, visualize the original matrix transformation
        resultMatrix = currentM1;
      }
      
      return { matrix: resultMatrix, size: matrixSize };
    } else if (mode === '3d') {
      if (transform3dType === 'rotation') {
        let rotMatrix = math.rotationX(rotation3d.x);
        rotMatrix = math.multiplyMatrices3D(rotMatrix, math.rotationY(rotation3d.y));
        rotMatrix = math.multiplyMatrices3D(rotMatrix, math.rotationZ(rotation3d.z));
        return { matrix: rotMatrix, size: '3x3', type: 'rotation' };
      } else if (transform3dType === 'translation') {
        // Create 4x4 translation matrix
        const transMatrix = [
          [1, 0, 0, translation3d.x],
          [0, 1, 0, translation3d.y],
          [0, 0, 1, translation3d.z],
          [0, 0, 0, 1]
        ];
        return { matrix: transMatrix, size: '4x4', type: 'translation' };
      } else if (transform3dType === 'scale') {
        // Create 3x3 scale matrix
        const scaleMatrix = [
          [scale3d.x, 0, 0],
          [0, scale3d.y, 0],
          [0, 0, scale3d.z]
        ];
        return { matrix: scaleMatrix, size: '3x3', type: 'scale' };
      }
    }
    return null;
  };

  const matrixData = getMatrix();

  // Don't show for determinant and rank operations in matrix mode (they're scalars, not transformations)
  // Don't show for eigenvalues operation (eigenvectors are shown separately)
  if (!matrixData || (mode === 'matrix' && (selectedOperation === 'determinant' || selectedOperation === 'eigenvalues' || selectedOperation === 'rank'))) {
    return null;
  }

  const { matrix, size, type } = matrixData;

  const project3D = (v) => {
    const s = 25;
    const centerX = 150;
    const centerY = 150;
    const x = (v.x - v.z) * Math.cos(Math.PI / 6) * s;
    const y = v.y * s - (v.x + v.z) * Math.sin(Math.PI / 6) * s;
    return {x: centerX + x, y: centerY - y};
  };

  if (size === '2x2') {
    // 2D basis vectors visualization
    const basisI = { x: 1, y: 0 };
    const basisJ = { x: 0, y: 1 };
    
    const transformedI = math.matrixApplyToVector(matrix, basisI);
    const transformedJ = math.matrixApplyToVector(matrix, basisJ);

    const scale = 30;
    const centerX = 150;
    const centerY = 150;

    return (
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-lg p-4 mb-4 border-2 border-blue-200">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full mb-3 text-left"
        >
          <h3 className="text-lg font-bold text-blue-900">
            Basis Vectors Transformation
          </h3>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-blue-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-blue-600" />
          )}
        </button>

        {expanded && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
              <p className="text-sm text-gray-700 mb-3">
                A matrix transforms the standard basis vectors <strong>î</strong> (1,0) and <strong>ĵ</strong> (0,1) 
                into the columns of the matrix. This shows how the matrix distorts space.
              </p>
              
              <svg width="100%" height="300" viewBox="0 0 300 300" className="border-2 border-blue-300 rounded-lg bg-white">
                {/* Grid */}
                {Array.from({length: 11}).map((_, i) => (
                  <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
                    <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
                    <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
                  </g>
                ))}
                
                {/* Axes */}
                <line x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />
                <line x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />
                
                {/* Original basis vectors */}
                <line x1={centerX} y1={centerY} x2={centerX + basisI.x * scale} y2={centerY - basisI.y * scale} 
                      stroke="#10b981" strokeWidth="3" />
                <text x={centerX + basisI.x * scale + 5} y={centerY - basisI.y * scale - 5} 
                      fontSize="12" fill="#10b981" fontWeight="bold">î</text>
                
                <line x1={centerX} y1={centerY} x2={centerX + basisJ.x * scale} y2={centerY - basisJ.y * scale} 
                      stroke="#3b82f6" strokeWidth="3" />
                <text x={centerX + basisJ.x * scale + 5} y={centerY - basisJ.y * scale - 5} 
                      fontSize="12" fill="#3b82f6" fontWeight="bold">ĵ</text>
                
                {/* Transformed basis vectors */}
                <line x1={centerX} y1={centerY} x2={centerX + transformedI.x * scale} y2={centerY - transformedI.y * scale} 
                      stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" opacity="0.7" />
                <text x={centerX + transformedI.x * scale + 5} y={centerY - transformedI.y * scale - 5} 
                      fontSize="11" fill="#10b981" fontWeight="bold">M(î)</text>
                
                <line x1={centerX} y1={centerY} x2={centerX + transformedJ.x * scale} y2={centerY - transformedJ.y * scale} 
                      stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" opacity="0.7" />
                <text x={centerX + transformedJ.x * scale + 5} y={centerY - transformedJ.y * scale - 5} 
                      fontSize="11" fill="#3b82f6" fontWeight="bold">M(ĵ)</text>
                
                {/* Unit square */}
                <polygon 
                  points={`${centerX},${centerY} ${centerX + basisI.x * scale},${centerY - basisI.y * scale} ${centerX + basisI.x * scale + basisJ.x * scale},${centerY - basisI.y * scale - basisJ.y * scale} ${centerX + basisJ.x * scale},${centerY - basisJ.y * scale}`}
                  fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3"
                />
                
                {/* Transformed unit square */}
                <polygon 
                  points={`${centerX},${centerY} ${centerX + transformedI.x * scale},${centerY - transformedI.y * scale} ${centerX + transformedI.x * scale + transformedJ.x * scale},${centerY - transformedI.y * scale - transformedJ.y * scale} ${centerX + transformedJ.x * scale},${centerY - transformedJ.y * scale}`}
                  fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="2"
                />
              </svg>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="font-mono">î = (1, 0) → M(î) = ({transformedI.x.toFixed(2)}, {transformedI.y.toFixed(2)})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="font-mono">ĵ = (0, 1) → M(ĵ) = ({transformedJ.x.toFixed(2)}, {transformedJ.y.toFixed(2)})</span>
                </div>
                <p className="text-gray-600 mt-2">
                  The unit square (dashed) is transformed into a parallelogram (solid) showing how the matrix distorts space.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else if (size === '3x3' || size === '4x4') {
    // 3D basis vectors visualization
    const basisI = { x: 1, y: 0, z: 0 };
    const basisJ = { x: 0, y: 1, z: 0 };
    const basisK = { x: 0, y: 0, z: 1 };

    let transformedI, transformedJ, transformedK;
    
    if (size === '3x3') {
      transformedI = math.applyMatrix3D(matrix, basisI);
      transformedJ = math.applyMatrix3D(matrix, basisJ);
      transformedK = math.applyMatrix3D(matrix, basisK);
    } else {
      // 4x4 matrix (homogeneous coordinates) - extract 3x3 part for visualization
      // For translation matrices, we visualize the linear part (first 3x3)
      const linearPart = [
        [matrix[0][0], matrix[0][1], matrix[0][2]],
        [matrix[1][0], matrix[1][1], matrix[1][2]],
        [matrix[2][0], matrix[2][1], matrix[2][2]]
      ];
      transformedI = math.applyMatrix3D(linearPart, basisI);
      transformedJ = math.applyMatrix3D(linearPart, basisJ);
      transformedK = math.applyMatrix3D(linearPart, basisK);
    }

    return (
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-lg p-4 mb-4 border-2 border-blue-200">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full mb-3 text-left"
        >
          <h3 className="text-lg font-bold text-blue-900">
            Basis Vectors Transformation {type && `(${type})`}
          </h3>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-blue-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-blue-600" />
          )}
        </button>

        {expanded && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
              <p className="text-sm text-gray-700 mb-3">
                A matrix transforms the standard basis vectors <strong>î</strong> (1,0,0), <strong>ĵ</strong> (0,1,0), 
                and <strong>k̂</strong> (0,0,1) into the columns of the matrix. This shows how the matrix distorts 3D space.
              </p>
              
              <svg width="100%" height="300" viewBox="0 0 300 300" className="border-2 border-blue-300 rounded-lg bg-white">
                {/* Grid lines */}
                {Array.from({length: 11}).map((_, i) => (
                  <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
                    <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
                    <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
                  </g>
                ))}
                
                {/* Original basis vectors */}
                <line x1="150" y1="150" x2={project3D(basisI).x} y2={project3D(basisI).y} 
                      stroke="#10b981" strokeWidth="3" />
                <circle cx={project3D(basisI).x} cy={project3D(basisI).y} r="4" fill="#10b981" />
                <text x={project3D(basisI).x + 5} y={project3D(basisI).y - 5} fontSize="11" fill="#10b981" fontWeight="bold">î</text>
                
                <line x1="150" y1="150" x2={project3D(basisJ).x} y2={project3D(basisJ).y} 
                      stroke="#3b82f6" strokeWidth="3" />
                <circle cx={project3D(basisJ).x} cy={project3D(basisJ).y} r="4" fill="#3b82f6" />
                <text x={project3D(basisJ).x + 5} y={project3D(basisJ).y - 5} fontSize="11" fill="#3b82f6" fontWeight="bold">ĵ</text>
                
                <line x1="150" y1="150" x2={project3D(basisK).x} y2={project3D(basisK).y} 
                      stroke="#8b5cf6" strokeWidth="3" />
                <circle cx={project3D(basisK).x} cy={project3D(basisK).y} r="4" fill="#8b5cf6" />
                <text x={project3D(basisK).x + 5} y={project3D(basisK).y - 5} fontSize="11" fill="#8b5cf6" fontWeight="bold">k̂</text>
                
                {/* Transformed basis vectors */}
                <line x1="150" y1="150" x2={project3D(transformedI).x} y2={project3D(transformedI).y} 
                      stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" opacity="0.7" />
                <circle cx={project3D(transformedI).x} cy={project3D(transformedI).y} r="3" fill="#10b981" opacity="0.7" />
                <text x={project3D(transformedI).x + 5} y={project3D(transformedI).y - 5} fontSize="10" fill="#10b981" fontWeight="bold">M(î)</text>
                
                <line x1="150" y1="150" x2={project3D(transformedJ).x} y2={project3D(transformedJ).y} 
                      stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" opacity="0.7" />
                <circle cx={project3D(transformedJ).x} cy={project3D(transformedJ).y} r="3" fill="#3b82f6" opacity="0.7" />
                <text x={project3D(transformedJ).x + 5} y={project3D(transformedJ).y - 5} fontSize="10" fill="#3b82f6" fontWeight="bold">M(ĵ)</text>
                
                <line x1="150" y1="150" x2={project3D(transformedK).x} y2={project3D(transformedK).y} 
                      stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" opacity="0.7" />
                <circle cx={project3D(transformedK).x} cy={project3D(transformedK).y} r="3" fill="#8b5cf6" opacity="0.7" />
                <text x={project3D(transformedK).x + 5} y={project3D(transformedK).y - 5} fontSize="10" fill="#8b5cf6" fontWeight="bold">M(k̂)</text>
              </svg>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="font-mono">î = (1,0,0) → M(î) = ({transformedI.x.toFixed(2)}, {transformedI.y.toFixed(2)}, {transformedI.z.toFixed(2)})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="font-mono">ĵ = (0,1,0) → M(ĵ) = ({transformedJ.x.toFixed(2)}, {transformedJ.y.toFixed(2)}, {transformedJ.z.toFixed(2)})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="font-mono">k̂ = (0,0,1) → M(k̂) = ({transformedK.x.toFixed(2)}, {transformedK.y.toFixed(2)}, {transformedK.z.toFixed(2)})</span>
                </div>
                <p className="text-gray-600 mt-2">
                  The matrix transforms the standard basis vectors, showing how it rotates, scales, or skews 3D space.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

