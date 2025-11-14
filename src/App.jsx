import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Zap, ArrowLeft } from 'lucide-react';
import TheoryModal from './components/TheoryModal';
import ModeSelector from './components/ModeSelector';
import ControlsPanel from './components/ControlsPanel';
import ResultPanel from './components/ResultPanel';
import * as math from './utils/math';
import { getCurrentTheory } from './utils/theory';
import * as formulas from './utils/formulas';
import * as decomposition from './utils/decomposition';
import Home from './pages/Home';
import Shaders from './pages/Shaders';
import ShadersTutorial from './pages/ShadersTutorial';
import Transform3D from './pages/Transform3D';
import CurvesAndSurfaces from './pages/CurvesAndSurfaces';
import CurvesAndSurfacesTutorial from './pages/CurvesAndSurfacesTutorial';
import AnimationInterpolation from './pages/AnimationInterpolation';
import AnimationInterpolationTutorial from './pages/AnimationInterpolationTutorial';
import Engine2DTutorial from './pages/Engine2DTutorial';
import Engine2DCompleteTutorial from './pages/Engine2DCompleteTutorial';
import TransformationVisualization from './pages/TransformationVisualization';
import TransformationTutorial from './pages/TransformationTutorial';
import GlitchDemo from './pages/shader/GlitchDemo';
import GlitchDemoTest from './pages/shader/GlitchDemoTest';
import ParallaxDemo from './pages/shader/ParallaxDemo';

function VectorMatrixOperations() {
  const [mode, setMode] = useState('vector');
  const [selectedOperation, setSelectedOperation] = useState('addition');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [operation2, setOperation2] = useState('subtraction');
  const [showTheory, setShowTheory] = useState(false);
  const [v1, setV1] = useState({x: 3, y: 4});
  const [v2, setV2] = useState({x: 2, y: 1});
  const [matrixSize, setMatrixSize] = useState('2x2');
  const [m1, setM1] = useState([[1, 0], [0, 1]]);
  const [m2, setM2] = useState([[1, 1], [0, 1]]);
  const [m1_3x3, setM1_3x3] = useState([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  const [m2_3x3, setM2_3x3] = useState([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  const [m1_4x4, setM1_4x4] = useState([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
  const [m2_4x4, setM2_4x4] = useState([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
  const [v3d, setV3d] = useState({x: 2, y: 3, z: 1});
  const [v3d_2, setV3d_2] = useState({x: 1, y: 2, z: 3});
  const [rotation3d, setRotation3d] = useState({x: 0, y: 0, z: 0});
  const [translation3d, setTranslation3d] = useState({x: 0, y: 0, z: 0});
  const [scale3d, setScale3d] = useState({x: 1, y: 1, z: 1});
  const [transform3dType, setTransform3dType] = useState('rotation');
  const [reflectionAxis, setReflectionAxis] = useState('x');


  const combineRotations3D = () => {
    let combined = math.rotationX(rotation3d.x);
    combined = math.multiplyMatrices3D(combined, math.rotationY(rotation3d.y));
    combined = math.multiplyMatrices3D(combined, math.rotationZ(rotation3d.z));
    return combined;
  };

  const isVectorResult = (r) => r && typeof r === 'object' && r.x !== undefined && r.y !== undefined;

  let result = null, explanation = '', result2 = null, explanation2 = '', details = '', steps = null, formulaData = null, visualDecomposition = null;
  const [highlightedPart, setHighlightedPart] = useState(null);
  
  if (mode === 'vector') {
    switch(selectedOperation) {
      case 'addition': 
        result = math.add(v1, v2); 
        explanation = `Vector Addition: Add corresponding components`;
        formulaData = formulas.getVectorAdditionFormula(v1, v2);
        visualDecomposition = decomposition.getVectorAdditionDecomposition(v1, v2, result);
        steps = [
          {
            title: 'Add x-coordinates',
            formula: `x = v₁ₓ + v₂ₓ`,
            calculation: `${v1.x} + ${v2.x}`,
            result: result.x
          },
          {
            title: 'Add y-coordinates',
            formula: `y = v₁ᵧ + v₂ᵧ`,
            calculation: `${v1.y} + ${v2.y}`,
            result: result.y
          },
          {
            title: 'Final Result',
            description: `The sum of vectors V1 and V2`,
            calculation: `(${v1.x}, ${v1.y}) + (${v2.x}, ${v2.y})`,
            result: `(${result.x}, ${result.y})`
          }
        ];
        break;
      case 'subtraction': 
        result = math.subtract(v1, v2); 
        explanation = `(${v1.x}, ${v1.y}) - (${v2.x}, ${v2.y}) = (${result.x}, ${result.y})`;
        formulaData = formulas.getVectorSubtractionFormula(v1, v2);
        visualDecomposition = decomposition.getVectorSubtractionDecomposition(v1, v2, result);
        details = `Step 1: Subtract the first numbers (x-coordinates)\n${v1.x} - ${v2.x} = ${result.x}\n\nStep 2: Subtract the second numbers (y-coordinates)\n${v1.y} - ${v2.y} = ${result.y}\n\nAnswer: (${result.x}, ${result.y})`;
        break;
      case 'dot': 
        result = math.dotProduct(v1, v2); 
        const dotX = v1.x * v2.x;
        const dotY = v1.y * v2.y;
        explanation = `Dot Product: Measures how much two vectors point in the same direction`;
        formulaData = formulas.getDotProductFormula(v1, v2);
        visualDecomposition = decomposition.getDotProductDecomposition(v1, v2, result);
        steps = [
          {
            title: 'Multiply x-components',
            formula: `v₁ₓ × v₂ₓ`,
            calculation: `${v1.x} × ${v2.x}`,
            result: dotX
          },
          {
            title: 'Multiply y-components',
            formula: `v₁ᵧ × v₂ᵧ`,
            calculation: `${v1.y} × ${v2.y}`,
            result: dotY
          },
          {
            title: 'Sum the products',
            formula: `a · b = aₓbₓ + aᵧbᵧ`,
            calculation: `${dotX} + ${dotY}`,
            result: result
          }
        ];
        break;
      case 'magnitude': 
        result = math.magnitude(v1); 
        const xSquared = v1.x * v1.x;
        const ySquared = v1.y * v1.y;
        const sumSquared = xSquared + ySquared;
        explanation = `Magnitude: The length (or size) of the vector`;
        formulaData = formulas.getMagnitudeFormula(v1);
        visualDecomposition = decomposition.getMagnitudeDecomposition(v1, result);
        steps = [
          {
            title: 'Square the x-component',
            formula: `vₓ²`,
            calculation: `${v1.x}² = ${xSquared}`,
            result: xSquared
          },
          {
            title: 'Square the y-component',
            formula: `vᵧ²`,
            calculation: `${v1.y}² = ${ySquared}`,
            result: ySquared
          },
          {
            title: 'Sum the squares',
            formula: `vₓ² + vᵧ²`,
            calculation: `${xSquared} + ${ySquared}`,
            result: sumSquared
          },
          {
            title: 'Take the square root',
            formula: `|v| = √(vₓ² + vᵧ²)`,
            calculation: `√${sumSquared}`,
            result: result.toFixed(2)
          }
        ];
        break;
      case 'normalize': 
        result = math.normalize(v1); 
        const mag = math.magnitude(v1);
        explanation = `(${v1.x}, ${v1.y}) / ${mag.toFixed(2)} = (${result.x.toFixed(2)}, ${result.y.toFixed(2)})`;
        formulaData = formulas.getNormalizeFormula(v1);
        details = `Step 1: Find the magnitude (length)\n√(${v1.x}² + ${v1.y}²) = ${mag.toFixed(2)}\n\nStep 2: Divide x by the magnitude\n${v1.x} ÷ ${mag.toFixed(2)} = ${result.x.toFixed(2)}\n\nStep 3: Divide y by the magnitude\n${v1.y} ÷ ${mag.toFixed(2)} = ${result.y.toFixed(2)}\n\nAnswer: (${result.x.toFixed(2)}, ${result.y.toFixed(2)})`;
        break;
      case 'cross': 
        result = math.crossProductZ(v1, v2); 
        explanation = `Cross Product: Measures perpendicular component and signed area`;
        formulaData = formulas.getCrossProductFormula(v1, v2);
        details = `Step 1: Multiply x of first by y of second\n${v1.x} × ${v2.y} = ${v1.x * v2.y}\n\nStep 2: Multiply y of first by x of second\n${v1.y} × ${v2.x} = ${v1.y * v2.x}\n\nStep 3: Subtract step 2 from step 1\n${v1.x * v2.y} - ${v1.y * v2.x} = ${result}`;
        break;
      case 'angle2d':
        result = math.angleBetween2D(v1, v2) * 180 / Math.PI;
        explanation = `Angle between V1 and V2 = ${result.toFixed(2)}°`;
        formulaData = formulas.getAngleFormula(v1, v2);
        details = `Step 1: Calculate dot product\n${v1.x} × ${v2.x} + ${v1.y} × ${v2.y} = ${math.dotProduct(v1, v2)}\n\nStep 2: Calculate magnitude of V1\n√(${v1.x}² + ${v1.y}²) = ${math.magnitude(v1).toFixed(2)}\n\nStep 3: Calculate magnitude of V2\n√(${v2.x}² + ${v2.y}²) = ${math.magnitude(v2).toFixed(2)}\n\nStep 4: Apply angle formula\narccos(${math.dotProduct(v1, v2)} / (${math.magnitude(v1).toFixed(2)} × ${math.magnitude(v2).toFixed(2)})) = ${result.toFixed(2)}°`;
        break;
      case 'projection2d':
        result = math.projection2D(v1, v2);
        const projDot2D = math.dotProduct(v1, v2);
        const projMagSq2D = math.dotProduct(v2, v2);
        const projScalar2D = projDot2D / projMagSq2D;
        explanation = `Project V1 onto V2 = (${result.x.toFixed(2)}, ${result.y.toFixed(2)})`;
        formulaData = formulas.getProjectionFormula(v1, v2);
        details = `Step 1: Calculate dot product\n${v1.x} × ${v2.x} + ${v1.y} × ${v2.y} = ${projDot2D}\n\nStep 2: Calculate |V2|²\n${v2.x}² + ${v2.y}² = ${projMagSq2D}\n\nStep 3: Calculate scalar\n${projDot2D} ÷ ${projMagSq2D} = ${projScalar2D.toFixed(2)}\n\nStep 4: Multiply V2 by scalar\n(${projScalar2D.toFixed(2)} × ${v2.x}, ${projScalar2D.toFixed(2)} × ${v2.y}) = (${result.x.toFixed(2)}, ${result.y.toFixed(2)})`;
        break;
      case 'reflection':
        result = math.reflect(v1, reflectionAxis);
        explanation = `Reflect V1 across ${reflectionAxis.toUpperCase()}-axis = (${result.x}, ${result.y})`;
        details = reflectionAxis === 'x' ? `Reflection across X-axis\nOriginal: (${v1.x}, ${v1.y})\nFlip Y-coordinate: (${v1.x}, -${v1.y}) = (${result.x}, ${result.y})` : `Reflection across Y-axis\nOriginal: (${v1.x}, ${v1.y})\nFlip X-coordinate: (-${v1.x}, ${v1.y}) = (${result.x}, ${result.y})`;
        break;
      case 'perpendicular':
        result = math.perpendicular(v1);
        explanation = `Perpendicular to V1 (90° rotation) = (${result.x}, ${result.y})`;
        details = `Rotate 90° counterclockwise\nOriginal: (${v1.x}, ${v1.y})\nFormula: (-y, x)\nResult: (-${v1.y}, ${v1.x}) = (${result.x}, ${result.y})\n\nMagnitude is preserved: |V1| = ${math.magnitude(v1).toFixed(2)}, |Perpendicular| = ${math.magnitude(result).toFixed(2)}`;
        break;
      default: result = null;
    }
  } else if (mode === 'matrix') {
    const currentM1 = matrixSize === '4x4' ? m1_4x4 : matrixSize === '3x3' ? m1_3x3 : m1;
    const currentM2 = matrixSize === '4x4' ? m2_4x4 : matrixSize === '3x3' ? m2_3x3 : m2;
    const currentV = matrixSize === '4x4' || matrixSize === '3x3' ? v3d : v1;
    
    switch(selectedOperation) {
      case 'addition': 
        result = math.matrixAdd(currentM1, currentM2); 
        explanation = `Add corresponding elements in each matrix`;
        formulaData = formulas.getMatrixAdditionFormula(matrixSize);
        if (matrixSize === '2x2' || matrixSize === '3x3') {
          visualDecomposition = decomposition.getMatrixAdditionDecomposition(currentM1, currentM2, result, matrixSize);
          if (matrixSize === '2x2') {
            steps = [
            {
              title: 'Add top-left elements',
              formula: `C[0][0] = A[0][0] + B[0][0]`,
              calculation: `${currentM1[0][0]} + ${currentM2[0][0]}`,
              result: result[0][0]
            },
            {
              title: 'Add top-right elements',
              formula: `C[0][1] = A[0][1] + B[0][1]`,
              calculation: `${currentM1[0][1]} + ${currentM2[0][1]}`,
              result: result[0][1]
            },
            {
              title: 'Add bottom-left elements',
              formula: `C[1][0] = A[1][0] + B[1][0]`,
              calculation: `${currentM1[1][0]} + ${currentM2[1][0]}`,
              result: result[1][0]
            },
            {
              title: 'Add bottom-right elements',
              formula: `C[1][1] = A[1][1] + B[1][1]`,
              calculation: `${currentM1[1][1]} + ${currentM2[1][1]}`,
              result: result[1][1]
            }
          ];
          } else if (matrixSize === '3x3') {
            steps = [
              {
                title: 'Add Row 0 elements',
                formula: `C[0][j] = A[0][j] + B[0][j]`,
                calculation: `Row 0: [${currentM1[0][0]}+${currentM2[0][0]}, ${currentM1[0][1]}+${currentM2[0][1]}, ${currentM1[0][2]}+${currentM2[0][2]}]`,
                result: `[${result[0][0]}, ${result[0][1]}, ${result[0][2]}]`
              },
              {
                title: 'Add Row 1 elements',
                formula: `C[1][j] = A[1][j] + B[1][j]`,
                calculation: `Row 1: [${currentM1[1][0]}+${currentM2[1][0]}, ${currentM1[1][1]}+${currentM2[1][1]}, ${currentM1[1][2]}+${currentM2[1][2]}]`,
                result: `[${result[1][0]}, ${result[1][1]}, ${result[1][2]}]`
              },
              {
                title: 'Add Row 2 elements',
                formula: `C[2][j] = A[2][j] + B[2][j]`,
                calculation: `Row 2: [${currentM1[2][0]}+${currentM2[2][0]}, ${currentM1[2][1]}+${currentM2[2][1]}, ${currentM1[2][2]}+${currentM2[2][2]}]`,
                result: `[${result[2][0]}, ${result[2][1]}, ${result[2][2]}]`
              }
            ];
          }
        } else {
          details = matrixSize === '4x4' 
            ? `Step 1: M1[0][0] + M2[0][0] = ${currentM1[0][0]} + ${currentM2[0][0]} = ${result[0][0]}\nStep 2: M1[0][1] + M2[0][1] = ${currentM1[0][1]} + ${currentM2[0][1]} = ${result[0][1]}\n... (and so on for all 16 elements)`
            : `Step 1: M1[0][0] + M2[0][0] = ${currentM1[0][0]} + ${currentM2[0][0]} = ${result[0][0]}\nStep 2: M1[0][1] + M2[0][1] = ${currentM1[0][1]} + ${currentM2[0][1]} = ${result[0][1]}\nStep 3: M1[0][2] + M2[0][2] = ${currentM1[0][2]} + ${currentM2[0][2]} = ${result[0][2]}\n... (and so on for all 9 elements)`;
        }
        break;
      case 'subtraction': 
        result = math.matrixSubtract(currentM1, currentM2); 
        explanation = `Subtract corresponding elements in each matrix`;
        formulaData = formulas.getMatrixSubtractionFormula(matrixSize);
        if (matrixSize === '2x2' || matrixSize === '3x3') {
          visualDecomposition = decomposition.getMatrixSubtractionDecomposition(currentM1, currentM2, result, matrixSize);
          if (matrixSize === '2x2') {
            steps = [
            {
              title: 'Subtract top-left elements',
              formula: `C[0][0] = A[0][0] - B[0][0]`,
              calculation: `${currentM1[0][0]} - ${currentM2[0][0]}`,
              result: result[0][0]
            },
            {
              title: 'Subtract top-right elements',
              formula: `C[0][1] = A[0][1] - B[0][1]`,
              calculation: `${currentM1[0][1]} - ${currentM2[0][1]}`,
              result: result[0][1]
            },
            {
              title: 'Subtract bottom-left elements',
              formula: `C[1][0] = A[1][0] - B[1][0]`,
              calculation: `${currentM1[1][0]} - ${currentM2[1][0]}`,
              result: result[1][0]
            },
            {
              title: 'Subtract bottom-right elements',
              formula: `C[1][1] = A[1][1] - B[1][1]`,
              calculation: `${currentM1[1][1]} - ${currentM2[1][1]}`,
              result: result[1][1]
            }
          ];
          } else if (matrixSize === '3x3') {
            steps = [
              {
                title: 'Subtract Row 0 elements',
                formula: `C[0][j] = A[0][j] - B[0][j]`,
                calculation: `Row 0: [${currentM1[0][0]}-${currentM2[0][0]}, ${currentM1[0][1]}-${currentM2[0][1]}, ${currentM1[0][2]}-${currentM2[0][2]}]`,
                result: `[${result[0][0]}, ${result[0][1]}, ${result[0][2]}]`
              },
              {
                title: 'Subtract Row 1 elements',
                formula: `C[1][j] = A[1][j] - B[1][j]`,
                calculation: `Row 1: [${currentM1[1][0]}-${currentM2[1][0]}, ${currentM1[1][1]}-${currentM2[1][1]}, ${currentM1[1][2]}-${currentM2[1][2]}]`,
                result: `[${result[1][0]}, ${result[1][1]}, ${result[1][2]}]`
              },
              {
                title: 'Subtract Row 2 elements',
                formula: `C[2][j] = A[2][j] - B[2][j]`,
                calculation: `Row 2: [${currentM1[2][0]}-${currentM2[2][0]}, ${currentM1[2][1]}-${currentM2[2][1]}, ${currentM1[2][2]}-${currentM2[2][2]}]`,
                result: `[${result[2][0]}, ${result[2][1]}, ${result[2][2]}]`
              }
            ];
          }
        } else {
          details = matrixSize === '4x4' 
            ? `Step 1: M1[0][0] - M2[0][0] = ${currentM1[0][0]} - ${currentM2[0][0]} = ${result[0][0]}\nStep 2: M1[0][1] - M2[0][1] = ${currentM1[0][1]} - ${currentM2[0][1]} = ${result[0][1]}\n... (and so on for all 16 elements)`
            : `Step 1: M1[0][0] - M2[0][0] = ${currentM1[0][0]} - ${currentM2[0][0]} = ${result[0][0]}\nStep 2: M1[0][1] - M2[0][1] = ${currentM1[0][1]} - ${currentM2[0][1]} = ${result[0][1]}\n... (and so on for all 9 elements)`;
        }
        break;
      case 'multiply': 
        result = math.matrixMultiply(currentM1, currentM2);
        if (matrixSize === '2x2' || matrixSize === '3x3') {
          visualDecomposition = decomposition.getMatrixMultiplyDecomposition(currentM1, currentM2, result, matrixSize);
          if (matrixSize === '2x2') {
          const elem00 = currentM1[0][0]*currentM2[0][0] + currentM1[0][1]*currentM2[1][0];
          const elem01 = currentM1[0][0]*currentM2[0][1] + currentM1[0][1]*currentM2[1][1];
          const elem10 = currentM1[1][0]*currentM2[0][0] + currentM1[1][1]*currentM2[1][0];
          const elem11 = currentM1[1][0]*currentM2[0][1] + currentM1[1][1]*currentM2[1][1];
          explanation = `Matrix Multiplication: Multiply rows of M1 by columns of M2`;
          formulaData = formulas.getMatrixMultiplyFormula(matrixSize);
          visualDecomposition = decomposition.getMatrixMultiplyDecomposition(currentM1, currentM2, result, matrixSize);
          steps = [
            {
              title: 'Calculate result[0][0] (top-left)',
              formula: `Row 0 of M1 · Column 0 of M2`,
              calculation: `(${currentM1[0][0]}×${currentM2[0][0]}) + (${currentM1[0][1]}×${currentM2[1][0]}) = ${currentM1[0][0]*currentM2[0][0]} + ${currentM1[0][1]*currentM2[1][0]}`,
              result: elem00
            },
            {
              title: 'Calculate result[0][1] (top-right)',
              formula: `Row 0 of M1 · Column 1 of M2`,
              calculation: `(${currentM1[0][0]}×${currentM2[0][1]}) + (${currentM1[0][1]}×${currentM2[1][1]}) = ${currentM1[0][0]*currentM2[0][1]} + ${currentM1[0][1]*currentM2[1][1]}`,
              result: elem01
            },
            {
              title: 'Calculate result[1][0] (bottom-left)',
              formula: `Row 1 of M1 · Column 0 of M2`,
              calculation: `(${currentM1[1][0]}×${currentM2[0][0]}) + (${currentM1[1][1]}×${currentM2[1][0]}) = ${currentM1[1][0]*currentM2[0][0]} + ${currentM1[1][1]*currentM2[1][0]}`,
              result: elem10
            },
            {
              title: 'Calculate result[1][1] (bottom-right)',
              formula: `Row 1 of M1 · Column 1 of M2`,
              calculation: `(${currentM1[1][0]}×${currentM2[0][1]}) + (${currentM1[1][1]}×${currentM2[1][1]}) = ${currentM1[1][0]*currentM2[0][1]} + ${currentM1[1][1]*currentM2[1][1]}`,
              result: elem11
            }
          ];
          } else if (matrixSize === '3x3') {
            const elem00 = currentM1[0][0]*currentM2[0][0] + currentM1[0][1]*currentM2[1][0] + currentM1[0][2]*currentM2[2][0];
            const elem01 = currentM1[0][0]*currentM2[0][1] + currentM1[0][1]*currentM2[1][1] + currentM1[0][2]*currentM2[2][1];
            const elem02 = currentM1[0][0]*currentM2[0][2] + currentM1[0][1]*currentM2[1][2] + currentM1[0][2]*currentM2[2][2];
            const elem10 = currentM1[1][0]*currentM2[0][0] + currentM1[1][1]*currentM2[1][0] + currentM1[1][2]*currentM2[2][0];
            const elem11 = currentM1[1][0]*currentM2[0][1] + currentM1[1][1]*currentM2[1][1] + currentM1[1][2]*currentM2[2][1];
            const elem12 = currentM1[1][0]*currentM2[0][2] + currentM1[1][1]*currentM2[1][2] + currentM1[1][2]*currentM2[2][2];
            const elem20 = currentM1[2][0]*currentM2[0][0] + currentM1[2][1]*currentM2[1][0] + currentM1[2][2]*currentM2[2][0];
            const elem21 = currentM1[2][0]*currentM2[0][1] + currentM1[2][1]*currentM2[1][1] + currentM1[2][2]*currentM2[2][1];
            const elem22 = currentM1[2][0]*currentM2[0][2] + currentM1[2][1]*currentM2[1][2] + currentM1[2][2]*currentM2[2][2];
            explanation = `Matrix Multiplication: Multiply rows of M1 by columns of M2`;
            formulaData = formulas.getMatrixMultiplyFormula(matrixSize);
            steps = [
              {
                title: 'Calculate Row 0',
                formula: `Row 0 of M1 · Columns 0,1,2 of M2`,
                calculation: `[${elem00}, ${elem01}, ${elem02}]`,
                result: `[${elem00.toFixed(2)}, ${elem01.toFixed(2)}, ${elem02.toFixed(2)}]`
              },
              {
                title: 'Calculate Row 1',
                formula: `Row 1 of M1 · Columns 0,1,2 of M2`,
                calculation: `[${elem10}, ${elem11}, ${elem12}]`,
                result: `[${elem10.toFixed(2)}, ${elem11.toFixed(2)}, ${elem12.toFixed(2)}]`
              },
              {
                title: 'Calculate Row 2',
                formula: `Row 2 of M1 · Columns 0,1,2 of M2`,
                calculation: `[${elem20}, ${elem21}, ${elem22}]`,
                result: `[${elem20.toFixed(2)}, ${elem21.toFixed(2)}, ${elem22.toFixed(2)}]`
              }
            ];
          }
        } else {
          explanation = `Multiply rows of M1 by columns of M2`;
          details = matrixSize === '4x4' 
            ? `For each element result[i][j], sum M1[i][k] × M2[k][j] for k=0 to 3.\nExample - result[0][0] = ${currentM1[0][0]}×${currentM2[0][0]} + ${currentM1[0][1]}×${currentM2[1][0]} + ${currentM1[0][2]}×${currentM2[2][0]} + ${currentM1[0][3]}×${currentM2[3][0]} = ${result[0][0].toFixed(2)}`
            : `For each element result[i][j], sum M1[i][k] × M2[k][j] for k=0 to 2.\nExample - result[0][0] = ${currentM1[0][0]}×${currentM2[0][0]} + ${currentM1[0][1]}×${currentM2[1][0]} + ${currentM1[0][2]}×${currentM2[2][0]} = ${result[0][0].toFixed(2)}`;
        }
        break;
      case 'determinant': 
        result = math.determinant(currentM1); 
        if (matrixSize === '2x2' || matrixSize === '3x3') {
          explanation = `Determinant: Measures how much the matrix scales area/volume`;
          formulaData = formulas.getDeterminantFormula(matrixSize);
          visualDecomposition = decomposition.getDeterminantDecomposition(currentM1, result, matrixSize);
          if (matrixSize === '2x2') {
            const ad = currentM1[0][0] * currentM1[1][1];
            const bc = currentM1[0][1] * currentM1[1][0];
            steps = [
            {
              title: 'Multiply main diagonal (top-left × bottom-right)',
              formula: `a × d`,
              calculation: `${currentM1[0][0]} × ${currentM1[1][1]}`,
              result: ad
            },
            {
              title: 'Multiply anti-diagonal (top-right × bottom-left)',
              formula: `b × c`,
              calculation: `${currentM1[0][1]} × ${currentM1[1][0]}`,
              result: bc
            },
            {
              title: 'Subtract anti-diagonal from main diagonal',
              formula: `det(M) = ad - bc`,
              calculation: `${ad} - ${bc}`,
              result: result.toFixed(2)
            }
          ];
          } else if (matrixSize === '3x3') {
            const a = currentM1[0][0], b = currentM1[0][1], c = currentM1[0][2];
            const d = currentM1[1][0], e = currentM1[1][1], f = currentM1[1][2];
            const g = currentM1[2][0], h = currentM1[2][1], i = currentM1[2][2];
            const ei_fh = e*i - f*h;
            const di_fg = d*i - f*g;
            const dh_eg = d*h - e*g;
            steps = [
            {
              title: 'Calculate cofactor for a₁₁',
              formula: `a × det([[e,f],[h,i]])`,
              calculation: `${a} × (${e}×${i} - ${f}×${h}) = ${a} × ${ei_fh}`,
              result: a * ei_fh
            },
            {
              title: 'Calculate cofactor for a₁₂',
              formula: `-b × det([[d,f],[g,i]])`,
              calculation: `-${b} × (${d}×${i} - ${f}×${g}) = -${b} × ${di_fg}`,
              result: -b * di_fg
            },
            {
              title: 'Calculate cofactor for a₁₃',
              formula: `c × det([[d,e],[g,h]])`,
              calculation: `${c} × (${d}×${h} - ${e}×${g}) = ${c} × ${dh_eg}`,
              result: c * dh_eg
            },
            {
              title: 'Sum all cofactors',
              formula: `det = a(ei-fh) - b(di-fg) + c(dh-eg)`,
              calculation: `${a * ei_fh} - ${b * di_fg} + ${c * dh_eg}`,
              result: result.toFixed(2)
            }
          ];
          }
        } else {
          explanation = `det(M) calculated using cofactor expansion`;
          details = `For a 4×4 matrix, the determinant is calculated using cofactor expansion along the first row:\ndet = a₁₁C₁₁ - a₁₂C₁₂ + a₁₃C₁₃ - a₁₄C₁₄\nwhere Cᵢⱼ are the cofactors (determinants of 3×3 minors).\nResult: ${result.toFixed(2)}`;
        }
        break;
      case 'transpose': 
        result = math.transpose(currentM1); 
        explanation = `Flip rows and columns`;
        formulaData = formulas.getTransposeFormula(matrixSize);
        if (matrixSize === '2x2') {
          steps = [
            {
              title: 'Element [0][0] stays the same',
              formula: `Mᵀ[0][0] = M[0][0]`,
              calculation: `${currentM1[0][0]}`,
              result: result[0][0]
            },
            {
              title: 'Element [0][1] becomes [1][0]',
              formula: `Mᵀ[1][0] = M[0][1]`,
              calculation: `${currentM1[0][1]}`,
              result: result[1][0]
            },
            {
              title: 'Element [1][0] becomes [0][1]',
              formula: `Mᵀ[0][1] = M[1][0]`,
              calculation: `${currentM1[1][0]}`,
              result: result[0][1]
            },
            {
              title: 'Element [1][1] stays the same',
              formula: `Mᵀ[1][1] = M[1][1]`,
              calculation: `${currentM1[1][1]}`,
              result: result[1][1]
            }
          ];
        } else {
          details = matrixSize === '4x4' 
            ? `Rows become columns and columns become rows.\nRow 0 becomes column 0, Row 1 becomes column 1, Row 2 becomes column 2, Row 3 becomes column 3.`
            : `Rows become columns and columns become rows.\nRow 0 becomes column 0, Row 1 becomes column 1, Row 2 becomes column 2.`;
        }
        break;
      case 'apply': 
        result = math.matrixApplyToVector(currentM1, currentV); 
        explanation = `Apply matrix M1 to vector`;
        formulaData = formulas.getMatrixApplyFormula(matrixSize);
        if (matrixSize === '2x2') {
          const xCalc = currentM1[0][0]*currentV.x + currentM1[0][1]*currentV.y;
          const yCalc = currentM1[1][0]*currentV.x + currentM1[1][1]*currentV.y;
          steps = [
            {
              title: 'Calculate x-coordinate',
              formula: `x' = M[0][0]×vₓ + M[0][1]×vᵧ`,
              calculation: `${currentM1[0][0]}×${currentV.x} + ${currentM1[0][1]}×${currentV.y} = ${currentM1[0][0]*currentV.x} + ${currentM1[0][1]*currentV.y}`,
              result: result.x.toFixed(2)
            },
            {
              title: 'Calculate y-coordinate',
              formula: `y' = M[1][0]×vₓ + M[1][1]×vᵧ`,
              calculation: `${currentM1[1][0]}×${currentV.x} + ${currentM1[1][1]}×${currentV.y} = ${currentM1[1][0]*currentV.x} + ${currentM1[1][1]*currentV.y}`,
              result: result.y.toFixed(2)
            }
          ];
        } else {
          details = matrixSize === '4x4' 
            ? `For x: ${currentM1[0][0]}×${currentV.x} + ${currentM1[0][1]}×${currentV.y} + ${currentM1[0][2]}×${currentV.z || 0} + ${currentM1[0][3]}×1 = ${result.x.toFixed(2)}\nFor y: ${currentM1[1][0]}×${currentV.x} + ${currentM1[1][1]}×${currentV.y} + ${currentM1[1][2]}×${currentV.z || 0} + ${currentM1[1][3]}×1 = ${result.y.toFixed(2)}\nFor z: ${currentM1[2][0]}×${currentV.x} + ${currentM1[2][1]}×${currentV.y} + ${currentM1[2][2]}×${currentV.z || 0} + ${currentM1[2][3]}×1 = ${result.z.toFixed(2)}`
            : `For x: ${currentM1[0][0]}×${currentV.x} + ${currentM1[0][1]}×${currentV.y} + ${currentM1[0][2]}×${currentV.z || 0} = ${result.x.toFixed(2)}\nFor y: ${currentM1[1][0]}×${currentV.x} + ${currentM1[1][1]}×${currentV.y} + ${currentM1[1][2]}×${currentV.z || 0} = ${result.y.toFixed(2)}\nFor z: ${currentM1[2][0]}×${currentV.x} + ${currentM1[2][1]}×${currentV.y} + ${currentM1[2][2]}×${currentV.z || 0} = ${result.z.toFixed(2)}`;
        }
        break;
      case 'inverse': 
        result = math.inverseMatrix2D(currentM1); 
        const det = math.determinant(currentM1);
        explanation = result ? `Matrix can be flipped (inverse exists)` : `Matrix cannot be flipped`;
        if (matrixSize === '2x2' || matrixSize === '3x3') {
          visualDecomposition = decomposition.getInverseDecomposition(currentM1, result, matrixSize);
        }
        if (matrixSize === '4x4') {
          details = result ? `Determinant = ${det.toFixed(2)} (not zero, so inverse exists)` : `Determinant = ${det.toFixed(5)} (too close to zero)\n\nWhen determinant = 0, the matrix cannot be inverted!`;
        } else if (matrixSize === '3x3') {
          details = result ? `Determinant = ${det.toFixed(2)} (not zero, so inverse exists)` : `Determinant = ${det.toFixed(5)} (too close to zero)\n\nWhen determinant = 0, the matrix cannot be inverted!`;
        } else {
          details = result ? `Determinant = ${det.toFixed(2)} (not zero, so inverse exists)\n\nInverse = 1/${det.toFixed(2)} × [[${currentM1[1][1]}, ${-currentM1[0][1]}], [${-currentM1[1][0]}, ${currentM1[0][0]}]]` : `Determinant = ${det.toFixed(5)} (too close to zero)\n\nWhen determinant = 0, the matrix cannot be inverted!`;
        }
        break;
      case 'eigenvalues':
        if (matrixSize === '2x2') {
          const eigenvals = math.eigenvalues2x2(currentM1);
          const eigenvecs = eigenvals.map(ev => math.eigenvector2x2(currentM1, ev));
          result = { eigenvalues: eigenvals, eigenvectors: eigenvecs };
          
          explanation = `Eigenvalues and eigenvectors of the matrix`;
          const trace = currentM1[0][0] + currentM1[1][1];
          const det2x2 = currentM1[0][0] * currentM1[1][1] - currentM1[0][1] * currentM1[1][0];
          const disc = trace * trace - 4 * det2x2;
          
          steps = [
            {
              title: 'Characteristic equation',
              formula: 'det(M - λI) = 0',
              calculation: `det([[${currentM1[0][0]}-λ, ${currentM1[0][1]}], [${currentM1[1][0]}, ${currentM1[1][1]}-λ]]) = 0`,
              result: `λ² - ${trace}λ + ${det2x2} = 0`
            },
            {
              title: 'Calculate discriminant',
              formula: 'Δ = trace² - 4×det',
              calculation: `${trace}² - 4×${det2x2} = ${disc}`,
              result: disc.toFixed(2)
            }
          ];
          
          if (disc >= 0) {
            const sqrtDisc = Math.sqrt(disc);
            steps.push({
              title: 'Calculate eigenvalues',
              formula: 'λ = (trace ± √Δ) / 2',
              calculation: `λ = (${trace} ± ${sqrtDisc.toFixed(2)}) / 2`,
              result: `λ₁ = ${eigenvals[0].real.toFixed(2)}, λ₂ = ${eigenvals[1].real.toFixed(2)}`
            });
            
            eigenvecs.forEach((vec, idx) => {
              if (vec) {
                steps.push({
                  title: `Eigenvector for λ${idx + 1}`,
                  formula: `(M - λ${idx + 1}I)v = 0`,
                  calculation: `Solve for v`,
                  result: `(${vec.x.toFixed(3)}, ${vec.y.toFixed(3)})`
                });
              }
            });
          } else {
            steps.push({
              title: 'Complex eigenvalues',
              formula: 'λ = (trace ± i√(-Δ)) / 2',
              calculation: `Complex eigenvalues`,
              result: `λ₁ = ${eigenvals[0].real.toFixed(2)} + ${eigenvals[0].imag.toFixed(2)}i, λ₂ = ${eigenvals[1].real.toFixed(2)} - ${eigenvals[1].imag.toFixed(2)}i`
            });
          }
          
          details = `Eigenvalues: ${eigenvals.map(ev => ev.complex ? `${ev.real.toFixed(2)}${ev.imag >= 0 ? '+' : ''}${ev.imag.toFixed(2)}i` : ev.real.toFixed(2)).join(', ')}\n\nEigenvectors: ${eigenvecs.map((vec, idx) => vec ? `v${idx + 1} = (${vec.x.toFixed(3)}, ${vec.y.toFixed(3)})` : 'N/A').join(', ')}`;
        } else if (matrixSize === '3x3') {
          const eigenvals = math.eigenvalues3x3(currentM1);
          const eigenvecs = eigenvals.map(ev => math.eigenvector3x3(currentM1, ev));
          result = { eigenvalues: eigenvals, eigenvectors: eigenvecs };
          
          explanation = `Eigenvalues and eigenvectors of the 3×3 matrix`;
          const trace3x3 = currentM1[0][0] + currentM1[1][1] + currentM1[2][2];
          
          steps = [
            {
              title: 'Characteristic polynomial',
              formula: 'det(M - λI) = 0',
              calculation: `Solve -λ³ + trace×λ² - sum_of_minors×λ + det = 0`,
              result: `Trace = ${trace3x3.toFixed(2)}`
            },
            {
              title: 'Find eigenvalues',
              formula: 'Using Newton\'s method',
              calculation: `Solving cubic equation`,
              result: `λ₁ = ${eigenvals[0].real.toFixed(2)}${eigenvals[0].complex ? ` + ${eigenvals[0].imag.toFixed(2)}i` : ''}, λ₂ = ${eigenvals[1].real.toFixed(2)}${eigenvals[1].complex ? ` + ${eigenvals[1].imag.toFixed(2)}i` : ''}, λ₃ = ${eigenvals[2].real.toFixed(2)}${eigenvals[2].complex ? ` + ${eigenvals[2].imag.toFixed(2)}i` : ''}`
            }
          ];
          
          eigenvecs.forEach((vec, idx) => {
            if (vec) {
              steps.push({
                title: `Eigenvector for λ${idx + 1}`,
                formula: `(M - λ${idx + 1}I)v = 0`,
                calculation: `Solve for v`,
                result: `(${vec.x.toFixed(3)}, ${vec.y.toFixed(3)}, ${vec.z.toFixed(3)})`
              });
            }
          });
          
          details = `Eigenvalues: ${eigenvals.map(ev => ev.complex ? `${ev.real.toFixed(2)}${ev.imag >= 0 ? '+' : ''}${ev.imag.toFixed(2)}i` : ev.real.toFixed(2)).join(', ')}\n\nEigenvectors: ${eigenvecs.map((vec, idx) => vec ? `v${idx + 1} = (${vec.x.toFixed(3)}, ${vec.y.toFixed(3)}, ${vec.z.toFixed(3)})` : 'N/A').join(', ')}`;
        } else {
          explanation = `Eigenvalues & Eigenvectors only available for 2×2 and 3×3 matrices`;
          details = `Please select 2×2 or 3×3 matrix size`;
        }
        break;
      case 'rank':
        const rank = math.matrixRank(currentM1);
        result = rank;
        explanation = `Rank of the matrix: ${rank}`;
        
        if (matrixSize === '2x2') {
          const det = math.determinant(currentM1);
          steps = [
            {
              title: 'Calculate determinant',
              formula: 'det(M) = a·d - b·c',
              calculation: `${currentM1[0][0]}×${currentM1[1][1]} - ${currentM1[0][1]}×${currentM1[1][0]} = ${det.toFixed(2)}`,
              result: det.toFixed(2)
            },
            {
              title: 'Determine rank',
              formula: 'rank = number of linearly independent rows/columns',
              calculation: det !== 0 
                ? 'det ≠ 0 → All rows/columns are independent'
                : 'det = 0 → Rows/columns are linearly dependent',
              result: det !== 0 ? 'rank = 2' : 'rank = 1 or 0'
            },
            {
              title: 'Check for zero rows',
              formula: 'If all elements in a row are zero, rank decreases',
              calculation: `Row 0: [${currentM1[0][0]}, ${currentM1[0][1]}]\nRow 1: [${currentM1[1][0]}, ${currentM1[1][1]}]`,
              result: rank === 0 ? 'rank = 0 (zero matrix)' : `rank = ${rank}`
            }
          ];
          details = `Rank = ${rank}\n\nRank is the number of linearly independent rows (or columns).\nFor a 2×2 matrix:\n- rank = 2 if det ≠ 0 (full rank)\n- rank = 1 if one row is a multiple of the other\n- rank = 0 if all elements are zero`;
        } else if (matrixSize === '3x3') {
          const det = math.determinant(currentM1);
          steps = [
            {
              title: 'Calculate determinant',
              formula: 'det(M) = calculated using cofactor expansion',
              calculation: `det = ${det.toFixed(2)}`,
              result: det.toFixed(2)
            },
            {
              title: 'Use Gaussian elimination',
              formula: 'Reduce matrix to row echelon form',
              calculation: 'Count number of non-zero rows after elimination',
              result: `rank = ${rank}`
            },
            {
              title: 'Interpret result',
              formula: 'rank = number of linearly independent rows',
              calculation: det !== 0 
                ? 'det ≠ 0 → rank = 3 (full rank)'
                : 'det = 0 → rank < 3 (linearly dependent rows)',
              result: `rank = ${rank}`
            }
          ];
          details = `Rank = ${rank}\n\nRank is the number of linearly independent rows (or columns).\nFor a 3×3 matrix:\n- rank = 3 if det ≠ 0 (full rank)\n- rank = 2 if two rows are independent\n- rank = 1 if all rows are multiples of one row\n- rank = 0 if all elements are zero`;
        } else if (matrixSize === '4x4') {
          steps = [
            {
              title: 'Use Gaussian elimination',
              formula: 'Reduce matrix to row echelon form',
              calculation: 'Count number of non-zero rows after elimination',
              result: `rank = ${rank}`
            },
            {
              title: 'Interpret result',
              formula: 'rank = number of linearly independent rows',
              calculation: `Maximum possible rank = 4`,
              result: `rank = ${rank}`
            }
          ];
          details = `Rank = ${rank}\n\nRank is the number of linearly independent rows (or columns).\nFor a 4×4 matrix:\n- Maximum rank = 4 (full rank)\n- rank < 4 indicates linear dependence`;
        }
        break;
      default: result = null;
    }
  } else if (mode === '3d') {
    if (transform3dType === 'rotation') {
      const rotMatrix = combineRotations3D();
      result = math.applyMatrix3D(rotMatrix, v3d);
      explanation = `Rotate vector around X, Y, and Z axes`;
      formulaData = formulas.get3DRotationFormula();
      steps = [
        {
          title: 'Original point',
          description: `Starting position`,
          calculation: `(${v3d.x}, ${v3d.y}, ${v3d.z})`,
          result: `(${v3d.x}, ${v3d.y}, ${v3d.z})`
        },
        {
          title: 'Rotation angles',
          description: `Angles around each axis`,
          calculation: `X: ${(rotation3d.x * 180 / Math.PI).toFixed(1)}°, Y: ${(rotation3d.y * 180 / Math.PI).toFixed(1)}°, Z: ${(rotation3d.z * 180 / Math.PI).toFixed(1)}°`,
          result: `(${(rotation3d.x * 180 / Math.PI).toFixed(1)}°, ${(rotation3d.y * 180 / Math.PI).toFixed(1)}°, ${(rotation3d.z * 180 / Math.PI).toFixed(1)}°)`
        },
        {
          title: 'After rotation',
          description: `Transformed coordinates`,
          calculation: `Apply rotation matrices`,
          result: `(${result.x.toFixed(2)}, ${result.y.toFixed(2)}, ${result.z.toFixed(2)})`
        }
      ];
    } else if (transform3dType === 'translation') {
      result = {x: v3d.x + translation3d.x, y: v3d.y + translation3d.y, z: v3d.z + translation3d.z};
      explanation = `Move the point by (${translation3d.x}, ${translation3d.y}, ${translation3d.z})`;
      formulaData = formulas.get3DTranslationFormula();
      steps = [
        {
          title: 'Translate x-coordinate',
          formula: `x' = x + tₓ`,
          calculation: `${v3d.x} + ${translation3d.x}`,
          result: result.x
        },
        {
          title: 'Translate y-coordinate',
          formula: `y' = y + tᵧ`,
          calculation: `${v3d.y} + ${translation3d.y}`,
          result: result.y
        },
        {
          title: 'Translate z-coordinate',
          formula: `z' = z + tᵧ`,
          calculation: `${v3d.z} + ${translation3d.z}`,
          result: result.z
        }
      ];
    } else if (transform3dType === 'scale') {
      result = {x: v3d.x * scale3d.x, y: v3d.y * scale3d.y, z: v3d.z * scale3d.z};
      explanation = `Resize the point by (${scale3d.x}, ${scale3d.y}, ${scale3d.z})`;
      formulaData = formulas.get3DScaleFormula();
      steps = [
        {
          title: 'Scale x-coordinate',
          formula: `x' = sₓ × x`,
          calculation: `${scale3d.x} × ${v3d.x}`,
          result: result.x
        },
        {
          title: 'Scale y-coordinate',
          formula: `y' = sᵧ × y`,
          calculation: `${scale3d.y} × ${v3d.y}`,
          result: result.y
        },
        {
          title: 'Scale z-coordinate',
          formula: `z' = sᵧ × z`,
          calculation: `${scale3d.z} × ${v3d.z}`,
          result: result.z
        }
      ];
    }
  } else if (mode === 'advanced') {
    switch(selectedOperation) {
      case 'crossproduct3d': 
        result = math.crossProduct3D(v3d, v3d_2); 
        explanation = `3D Cross Product`;
        formulaData = formulas.get3DCrossProductFormula(v3d, v3d_2);
        steps = [
          {
            title: 'Calculate x-component',
            formula: `x = aᵧbᵧ - aᵧbᵧ`,
            calculation: `(${v3d.y} × ${v3d_2.z}) - (${v3d.z} × ${v3d_2.y}) = ${v3d.y * v3d_2.z} - ${v3d.z * v3d_2.y}`,
            result: result.x.toFixed(2)
          },
          {
            title: 'Calculate y-component',
            formula: `y = aᵧbₓ - aₓbᵧ`,
            calculation: `(${v3d.z} × ${v3d_2.x}) - (${v3d.x} × ${v3d_2.z}) = ${v3d.z * v3d_2.x} - ${v3d.x * v3d_2.z}`,
            result: result.y.toFixed(2)
          },
          {
            title: 'Calculate z-component',
            formula: `z = aₓbᵧ - aᵧbₓ`,
            calculation: `(${v3d.x} × ${v3d_2.y}) - (${v3d.y} × ${v3d_2.x}) = ${v3d.x * v3d_2.y} - ${v3d.y * v3d_2.x}`,
            result: result.z.toFixed(2)
          }
        ];
        break;
      case 'dotproduct3d': 
        result = math.dotProduct3D(v3d, v3d_2);
        const angle = math.angleBetween(v3d, v3d_2) * 180 / Math.PI;
        const dotX3D = v3d.x * v3d_2.x;
        const dotY3D = v3d.y * v3d_2.y;
        const dotZ3D = v3d.z * v3d_2.z;
        explanation = `3D Dot Product`;
        formulaData = formulas.get3DDotProductFormula(v3d, v3d_2);
        steps = [
          {
            title: 'Multiply x-components',
            formula: `aₓ × bₓ`,
            calculation: `${v3d.x} × ${v3d_2.x}`,
            result: dotX3D
          },
          {
            title: 'Multiply y-components',
            formula: `aᵧ × bᵧ`,
            calculation: `${v3d.y} × ${v3d_2.y}`,
            result: dotY3D
          },
          {
            title: 'Multiply z-components',
            formula: `aᵧ × bᵧ`,
            calculation: `${v3d.z} × ${v3d_2.z}`,
            result: dotZ3D
          },
          {
            title: 'Sum all products',
            formula: `a · b = aₓbₓ + aᵧbᵧ + aᵧbᵧ`,
            calculation: `${dotX3D} + ${dotY3D} + ${dotZ3D}`,
            result: result.toFixed(2)
          }
        ];
        break;
      case 'projection': 
        result = math.vectorProjection(v3d, v3d_2); 
        const projDot = math.dotProduct3D(v3d, v3d_2);
        const projMagSq = math.dotProduct3D(v3d_2, v3d_2);
        const projScalar = projDot / projMagSq;
        explanation = `Project vector 1 onto vector 2`;
        steps = [
          {
            title: 'Calculate dot product',
            formula: `a · b`,
            calculation: `(${v3d.x} × ${v3d_2.x}) + (${v3d.y} × ${v3d_2.y}) + (${v3d.z} × ${v3d_2.z}) = ${projDot.toFixed(2)}`,
            result: projDot.toFixed(2)
          },
          {
            title: 'Calculate magnitude squared of v2',
            formula: `|b|²`,
            calculation: `${v3d_2.x}² + ${v3d_2.y}² + ${v3d_2.z}² = ${projMagSq.toFixed(2)}`,
            result: projMagSq.toFixed(2)
          },
          {
            title: 'Calculate scalar multiplier',
            formula: `scalar = (a·b) / |b|²`,
            calculation: `${projDot.toFixed(2)} ÷ ${projMagSq.toFixed(2)} = ${projScalar.toFixed(2)}`,
            result: projScalar.toFixed(2)
          },
          {
            title: 'Multiply v2 by scalar',
            formula: `proj = scalar × b`,
            calculation: `${projScalar.toFixed(2)} × (${v3d_2.x}, ${v3d_2.y}, ${v3d_2.z})`,
            result: `(${result.x.toFixed(2)}, ${result.y.toFixed(2)}, ${result.z.toFixed(2)})`
          }
        ];
        break;
      case 'angle': 
        result = math.angleBetween(v3d, v3d_2) * 180 / Math.PI; 
        const dot = math.dotProduct3D(v3d, v3d_2);
        const magA = math.magnitude3D(v3d);
        const magB = math.magnitude3D(v3d_2);
        const cosTheta = dot / (magA * magB);
        explanation = `Find angle between two 3D vectors`;
        steps = [
          {
            title: 'Calculate dot product',
            formula: `a · b`,
            calculation: `(${v3d.x} × ${v3d_2.x}) + (${v3d.y} × ${v3d_2.y}) + (${v3d.z} × ${v3d_2.z}) = ${dot.toFixed(2)}`,
            result: dot.toFixed(2)
          },
          {
            title: 'Calculate magnitude of v1',
            formula: `|a|`,
            calculation: `√(${v3d.x}² + ${v3d.y}² + ${v3d.z}²) = ${magA.toFixed(2)}`,
            result: magA.toFixed(2)
          },
          {
            title: 'Calculate magnitude of v2',
            formula: `|b|`,
            calculation: `√(${v3d_2.x}² + ${v3d_2.y}² + ${v3d_2.z}²) = ${magB.toFixed(2)}`,
            result: magB.toFixed(2)
          },
          {
            title: 'Calculate cosine of angle',
            formula: `cos(θ) = (a·b) / (|a| × |b|)`,
            calculation: `${dot.toFixed(2)} ÷ (${magA.toFixed(2)} × ${magB.toFixed(2)}) = ${cosTheta.toFixed(4)}`,
            result: cosTheta.toFixed(4)
          },
          {
            title: 'Take inverse cosine',
            formula: `θ = arccos(cos(θ))`,
            calculation: `arccos(${cosTheta.toFixed(4)})`,
            result: `${result.toFixed(2)}°`
          }
        ];
        break;
      case 'magnitude3d': 
        result = math.magnitude3D(v3d); 
        const xSq3D = v3d.x * v3d.x;
        const ySq3D = v3d.y * v3d.y;
        const zSq3D = v3d.z * v3d.z;
        const sumSq3D = xSq3D + ySq3D + zSq3D;
        explanation = `Find length of 3D vector`;
        formulaData = formulas.get3DMagnitudeFormula(v3d);
        steps = [
          {
            title: 'Square x-component',
            formula: `vₓ²`,
            calculation: `${v3d.x}² = ${xSq3D}`,
            result: xSq3D
          },
          {
            title: 'Square y-component',
            formula: `vᵧ²`,
            calculation: `${v3d.y}² = ${ySq3D}`,
            result: ySq3D
          },
          {
            title: 'Square z-component',
            formula: `vᵧ²`,
            calculation: `${v3d.z}² = ${zSq3D}`,
            result: zSq3D
          },
          {
            title: 'Sum the squares',
            formula: `vₓ² + vᵧ² + vᵧ²`,
            calculation: `${xSq3D} + ${ySq3D} + ${zSq3D}`,
            result: sumSq3D
          },
          {
            title: 'Take the square root',
            formula: `|v| = √(vₓ² + vᵧ² + vᵧ²)`,
            calculation: `√${sumSq3D}`,
            result: result.toFixed(2)
          }
        ];
        break;
      case 'normalize3d': 
        result = math.normalize3D(v3d); 
        const mag3d = math.magnitude3D(v3d);
        explanation = `Make the vector unit length (size 1)`;
        details = `Step 1 - Find magnitude: √(${v3d.x}² + ${v3d.y}² + ${v3d.z}²) = ${mag3d.toFixed(2)}\n\nStep 2 - Divide x: ${v3d.x} ÷ ${mag3d.toFixed(2)} = ${result.x.toFixed(2)}\nStep 3 - Divide y: ${v3d.y} ÷ ${mag3d.toFixed(2)} = ${result.y.toFixed(2)}\nStep 4 - Divide z: ${v3d.z} ÷ ${mag3d.toFixed(2)} = ${result.z.toFixed(2)}`;
        break;
      default: result = null;
    }
  }

  if (comparisonMode && mode === 'vector') {
    switch(operation2) {
      case 'addition': result2 = math.add(v1, v2); explanation2 = `(${v1.x}, ${v1.y}) + (${v2.x}, ${v2.y}) = (${result2.x}, ${result2.y})`; break;
      case 'subtraction': result2 = math.subtract(v1, v2); explanation2 = `(${v1.x}, ${v1.y}) - (${v2.x}, ${v2.y}) = (${result2.x}, ${result2.y})`; break;
      case 'dot': result2 = math.dotProduct(v1, v2); explanation2 = `Dot product = ${result2}`; break;
      case 'magnitude': result2 = math.magnitude(v1); explanation2 = `Magnitude = ${result2.toFixed(2)}`; break;
      case 'normalize': result2 = math.normalize(v1); explanation2 = `Unit vector = (${result2.x.toFixed(2)}, ${result2.y.toFixed(2)})`; break;
      case 'cross': result2 = math.crossProductZ(v1, v2); explanation2 = `Cross product = ${result2}`; break;
      case 'angle2d': result2 = math.angleBetween2D(v1, v2) * 180 / Math.PI; explanation2 = `Angle = ${result2.toFixed(2)}°`; break;
      case 'projection2d': result2 = math.projection2D(v1, v2); explanation2 = `Projection = (${result2.x.toFixed(2)}, ${result2.y.toFixed(2)})`; break;
      case 'reflection': result2 = math.reflect(v1, reflectionAxis); explanation2 = `Reflection = (${result2.x}, ${result2.y})`; break;
      case 'perpendicular': result2 = math.perpendicular(v1); explanation2 = `Perpendicular = (${result2.x}, ${result2.y})`; break;
      default: result2 = null;
    }
  }

  const renderMatrix = (matrix) => (
    <div className="inline-block border-2 border-gray-700 p-2 bg-indigo-50">
      <div className="flex flex-col gap-1">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((val, j) => (
              <div key={j} className="w-12 text-center text-sm font-mono">{typeof val === 'number' ? val.toFixed(2) : val}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const scale = 30;
  const centerX = 150;
  const centerY = 150;

  const project3D = (v) => {
    const s = 25;
    const x = (v.x - v.z) * Math.cos(Math.PI / 6) * s;
    const y = v.y * s - (v.x + v.z) * Math.sin(Math.PI / 6) * s;
    return {x: centerX + x, y: centerY - y};
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">Vector & Matrix Operations</h1>
            <p className="text-indigo-700">Master vector, matrix, 3D, and advanced math</p>
          </div>
          <Link 
            to="/shaders" 
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Shaders
          </Link>
        </div>

        <ModeSelector
          mode={mode}
          comparisonMode={comparisonMode}
          showTheory={showTheory}
          onModeChange={(m) => {
            setMode(m);
            if (m === '3d') setTransform3dType('rotation');
            else if (m === 'advanced') setSelectedOperation('crossproduct3d');
            else setSelectedOperation('addition');
            setComparisonMode(false);
          }}
          onComparisonToggle={() => setComparisonMode(!comparisonMode)}
          onTheoryToggle={() => setShowTheory(!showTheory)}
        />

        {/* Visualization and Controls Row - Side by Side (70/30) */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-10 mb-8">
          {/* Visualization - 70% width (7 columns) */}
          <div className="lg:col-span-7">
          {mode === 'vector' && !comparisonMode && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Visualization</h2>
              <svg width="100%" height="400" viewBox="0 0 300 300" className="border-2 border-indigo-300 rounded-lg bg-indigo-50">
                {[...Array(7)].map((_, i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" stroke="#e0e7ff" strokeWidth="1" />)}
                {[...Array(7)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 50} x2="300" y2={i * 50} stroke="#e0e7ff" strokeWidth="1" />)}
                <line x1="150" y1="0" x2="150" y2="300" stroke="#6366f1" strokeWidth="2" />
                <line x1="0" y1="150" x2="300" y2="150" stroke="#6366f1" strokeWidth="2" />

                {selectedOperation === 'angle2d' && (
                  <>
                    {/* V1 */}
                    <line x1="150" y1="150" x2={150 + v1.x * scale} y2={150 - v1.y * scale} stroke="#ec4899" strokeWidth="3" />
                    <circle cx={150 + v1.x * scale} cy={150 - v1.y * scale} r="5" fill="#ec4899" />
                    
                    {/* V2 */}
                    <line x1="150" y1="150" x2={150 + v2.x * scale} y2={150 - v2.y * scale} stroke="#10b981" strokeWidth="3" />
                    <circle cx={150 + v2.x * scale} cy={150 - v2.y * scale} r="5" fill="#10b981" />
                    
                    {/* Arc between vectors */}
                    {(() => {
                      const angle1 = Math.atan2(v1.y, v1.x);
                      const angle2 = Math.atan2(v2.y, v2.x);
                      const arcRadius = 30;
                      const startAngle = Math.min(angle1, angle2);
                      const endAngle = Math.max(angle1, angle2);
                      const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
                      
                      const x1 = 150 + arcRadius * Math.cos(startAngle);
                      const y1 = 150 - arcRadius * Math.sin(startAngle);
                      const x2 = 150 + arcRadius * Math.cos(endAngle);
                      const y2 = 150 - arcRadius * Math.sin(endAngle);
                      
                      const pathD = `M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 ${largeArc} 1 ${x2} ${y2}`;
                      const midAngle = (startAngle + endAngle) / 2;
                      const textRadius = arcRadius + 15;
                      const angle = math.angleBetween2D(v1, v2) * 180 / Math.PI;
                      
                      return (
                        <>
                          <path d={pathD} stroke="#f59e0b" strokeWidth="2" fill="none" />
                          <text x={150 + textRadius * Math.cos(midAngle)} y={150 - textRadius * Math.sin(midAngle)} fontSize="12" fill="#f59e0b" fontWeight="bold" textAnchor="middle">{angle.toFixed(0)}°</text>
                        </>
                      );
                    })()}
                    
                    <text x="160" y="20" fontSize="12" fill="#6366f1" fontWeight="bold">Y</text>
                    <text x="280" y="160" fontSize="12" fill="#6366f1" fontWeight="bold">X</text>
                    <text x={160 + v1.x * scale} y={140 - v1.y * scale} fontSize="11" fill="#ec4899" fontWeight="bold">V1</text>
                    <text x={160 + v2.x * scale} y={140 - v2.y * scale} fontSize="11" fill="#10b981" fontWeight="bold">V2</text>
                  </>
                )}

                {selectedOperation === 'projection2d' && (
                  <>
                    {/* V1 */}
                    <line x1="150" y1="150" x2={150 + v1.x * scale} y2={150 - v1.y * scale} stroke="#ec4899" strokeWidth="3" />
                    <circle cx={150 + v1.x * scale} cy={150 - v1.y * scale} r="5" fill="#ec4899" />
                    
                    {/* V2 */}
                    <line x1="150" y1="150" x2={150 + v2.x * scale} y2={150 - v2.y * scale} stroke="#10b981" strokeWidth="3" />
                    <circle cx={150 + v2.x * scale} cy={150 - v2.y * scale} r="5" fill="#10b981" />
                    
                    {/* Projection */}
                    {(() => {
                      const proj = math.projection2D(v1, v2);
                      const projX = 150 + proj.x * scale;
                      const projY = 150 - proj.y * scale;
                      const v1X = 150 + v1.x * scale;
                      const v1Y = 150 - v1.y * scale;
                      
                      return (
                        <>
                          {/* Projection vector */}
                          <line x1="150" y1="150" x2={projX} y2={projY} stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" />
                          <circle cx={projX} cy={projY} r="4" fill="#f59e0b" />
                          
                          {/* Perpendicular line from V1 to projection */}
                          <line x1={v1X} y1={v1Y} x2={projX} y2={projY} stroke="#a78bfa" strokeWidth="1" strokeDasharray="2,2" />
                          
                          <text x={projX - 10} y={projY + 15} fontSize="11" fill="#f59e0b" fontWeight="bold">Proj</text>
                        </>
                      );
                    })()}
                    
                    <text x="160" y="20" fontSize="12" fill="#6366f1" fontWeight="bold">Y</text>
                    <text x="280" y="160" fontSize="12" fill="#6366f1" fontWeight="bold">X</text>
                    <text x={160 + v1.x * scale} y={140 - v1.y * scale} fontSize="11" fill="#ec4899" fontWeight="bold">V1</text>
                    <text x={160 + v2.x * scale} y={140 - v2.y * scale} fontSize="11" fill="#10b981" fontWeight="bold">V2</text>
                  </>
                )}

                {selectedOperation === 'reflection' && (
                  <>
                    {/* Reflection axis */}
                    {reflectionAxis === 'x' ? (
                      <line x1="0" y1="150" x2="300" y2="150" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5,5" />
                    ) : (
                      <line x1="150" y1="0" x2="150" y2="300" stroke="#a78bfa" strokeWidth="2" strokeDasharray="5,5" />
                    )}
                    
                    {/* Original V1 */}
                    <line x1="150" y1="150" x2={150 + v1.x * scale} y2={150 - v1.y * scale} stroke="#ec4899" strokeWidth="3" />
                    <circle cx={150 + v1.x * scale} cy={150 - v1.y * scale} r="5" fill="#ec4899" />
                    <text x={160 + v1.x * scale} y={140 - v1.y * scale} fontSize="10" fill="#ec4899" fontWeight="bold">V1</text>
                    
                    {/* Reflected V1 */}
                    {(() => {
                      const reflected = math.reflect(v1, reflectionAxis);
                      return (
                        <>
                          <line x1="150" y1="150" x2={150 + reflected.x * scale} y2={150 - reflected.y * scale} stroke="#06b6d4" strokeWidth="3" />
                          <circle cx={150 + reflected.x * scale} cy={150 - reflected.y * scale} r="5" fill="#06b6d4" />
                          <text x={160 + reflected.x * scale} y={140 - reflected.y * scale} fontSize="10" fill="#06b6d4" fontWeight="bold">V1'</text>
                        </>
                      );
                    })()}
                    
                    <text x="160" y="20" fontSize="12" fill="#6366f1" fontWeight="bold">Y</text>
                    <text x="280" y="160" fontSize="12" fill="#6366f1" fontWeight="bold">X</text>
                    <text x="155" y="165" fontSize="9" fill="#a78bfa" fontWeight="bold">{reflectionAxis.toUpperCase()}-axis</text>
                  </>
                )}

                {selectedOperation === 'perpendicular' && (
                  <>
                    {/* Original V1 */}
                    <line x1="150" y1="150" x2={150 + v1.x * scale} y2={150 - v1.y * scale} stroke="#ec4899" strokeWidth="3" />
                    <circle cx={150 + v1.x * scale} cy={150 - v1.y * scale} r="5" fill="#ec4899" />
                    <text x={160 + v1.x * scale} y={140 - v1.y * scale} fontSize="11" fill="#ec4899" fontWeight="bold">V1</text>
                    
                    {/* Perpendicular vector */}
                    {(() => {
                      const perp = math.perpendicular(v1);
                      return (
                        <>
                          <line x1="150" y1="150" x2={150 + perp.x * scale} y2={150 - perp.y * scale} stroke="#f59e0b" strokeWidth="3" />
                          <circle cx={150 + perp.x * scale} cy={150 - perp.y * scale} r="5" fill="#f59e0b" />
                          <text x={160 + perp.x * scale} y={140 - perp.y * scale} fontSize="11" fill="#f59e0b" fontWeight="bold">V⊥</text>
                        </>
                      );
                    })()}
                    
                    {/* Right angle indicator */}
                    <line x1="150" y1="150" x2="165" y2="150" stroke="#666" strokeWidth="1" />
                    <line x1="165" y1="150" x2="165" y2="165" stroke="#666" strokeWidth="1" />
                    <line x1="165" y1="165" x2="150" y2="165" stroke="#666" strokeWidth="1" />
                    
                    <text x="160" y="20" fontSize="12" fill="#6366f1" fontWeight="bold">Y</text>
                    <text x="280" y="160" fontSize="12" fill="#6366f1" fontWeight="bold">X</text>
                  </>
                )}

                {(selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'dot' || selectedOperation === 'cross' || selectedOperation === 'magnitude' || selectedOperation === 'normalize') && (
                  <>
                    <line x1="150" y1="150" x2={150 + v1.x * scale} y2={150 - v1.y * scale} stroke="#ec4899" strokeWidth="3" />
                    <circle cx={150 + v1.x * scale} cy={150 - v1.y * scale} r="5" fill="#ec4899" />
                    {(selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'dot' || selectedOperation === 'cross') && (
                      <>
                        <line x1="150" y1="150" x2={150 + v2.x * scale} y2={150 - v2.y * scale} stroke="#10b981" strokeWidth="3" />
                        <circle cx={150 + v2.x * scale} cy={150 - v2.y * scale} r="5" fill="#10b981" />
                      </>
                    )}
                    {isVectorResult(result) && (selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'normalize') && (
                      <>
                        <line x1="150" y1="150" x2={150 + result.x * scale} y2={150 - result.y * scale} stroke="#f59e0b" strokeWidth="3" strokeDasharray="5,5" />
                        <circle cx={150 + result.x * scale} cy={150 - result.y * scale} r="5" fill="#f59e0b" />
                      </>
                    )}
                    <text x="160" y="20" fontSize="12" fill="#6366f1" fontWeight="bold">Y</text>
                    <text x="280" y="160" fontSize="12" fill="#6366f1" fontWeight="bold">X</text>
                    <text x={160 + v1.x * scale} y={140 - v1.y * scale} fontSize="11" fill="#ec4899" fontWeight="bold">V1</text>
                    {(selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'dot' || selectedOperation === 'cross') && <text x={160 + v2.x * scale} y={140 - v2.y * scale} fontSize="11" fill="#10b981" fontWeight="bold">V2</text>}
                    {isVectorResult(result) && (selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'normalize') && <text x={160 + result.x * scale} y={140 - result.y * scale} fontSize="11" fill="#f59e0b" fontWeight="bold">R</text>}
                  </>
                )}
              </svg>
            </div>
          )}

          {mode === 'vector' && comparisonMode && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Comparison Visualization</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs font-semibold text-indigo-600 mb-2">Operation 1</p>
                  <svg width="100%" height="160" viewBox="0 0 200 200" className="border border-indigo-300 rounded bg-indigo-50">
                    {[...Array(5)].map((_, i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="200" stroke="#e0e7ff" strokeWidth="1" />)}
                    {[...Array(5)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 50} x2="200" y2={i * 50} stroke="#e0e7ff" strokeWidth="1" />)}
                    <line x1="100" y1="0" x2="100" y2="200" stroke="#6366f1" strokeWidth="1" />
                    <line x1="0" y1="100" x2="200" y2="100" stroke="#6366f1" strokeWidth="1" />
                    <line x1="100" y1="100" x2={100 + v1.x * 20} y2={100 - v1.y * 20} stroke="#ec4899" strokeWidth="2" />
                    <circle cx={100 + v1.x * 20} cy={100 - v1.y * 20} r="4" fill="#ec4899" />
                    <line x1="100" y1="100" x2={100 + v2.x * 20} y2={100 - v2.y * 20} stroke="#10b981" strokeWidth="2" />
                    <circle cx={100 + v2.x * 20} cy={100 - v2.y * 20} r="4" fill="#10b981" />
                    {isVectorResult(result) && (selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'normalize') && (
                      <>
                        <line x1="100" y1="100" x2={100 + result.x * 20} y2={100 - result.y * 20} stroke="#f59e0b" strokeWidth="2" strokeDasharray="3" />
                        <circle cx={100 + result.x * 20} cy={100 - result.y * 20} r="4" fill="#f59e0b" />
                      </>
                    )}
                  </svg>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-orange-600 mb-2">Operation 2</p>
                  <svg width="100%" height="160" viewBox="0 0 200 200" className="border border-orange-300 rounded bg-orange-50">
                    {[...Array(5)].map((_, i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="200" stroke="#fed7aa" strokeWidth="1" />)}
                    {[...Array(5)].map((_, i) => <line key={`h${i}`} x1="0" y1={i * 50} x2="200" y2={i * 50} stroke="#fed7aa" strokeWidth="1" />)}
                    <line x1="100" y1="0" x2="100" y2="200" stroke="#ea580c" strokeWidth="1" />
                    <line x1="0" y1="100" x2="200" y2="100" stroke="#ea580c" strokeWidth="1" />
                    <line x1="100" y1="100" x2={100 + v1.x * 20} y2={100 - v1.y * 20} stroke="#ec4899" strokeWidth="2" />
                    <circle cx={100 + v1.x * 20} cy={100 - v1.y * 20} r="4" fill="#ec4899" />
                    <line x1="100" y1="100" x2={100 + v2.x * 20} y2={100 - v2.y * 20} stroke="#10b981" strokeWidth="2" />
                    <circle cx={100 + v2.x * 20} cy={100 - v2.y * 20} r="4" fill="#10b981" />
                    {isVectorResult(result2) && (operation2 === 'addition' || operation2 === 'subtraction' || operation2 === 'normalize') && (
                      <>
                        <line x1="100" y1="100" x2={100 + result2.x * 20} y2={100 - result2.y * 20} stroke="#f59e0b" strokeWidth="2" strokeDasharray="3" />
                        <circle cx={100 + result2.x * 20} cy={100 - result2.y * 20} r="4" fill="#f59e0b" />
                      </>
                    )}
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-indigo-600 mb-2">Square Transform 1</p>
                  <svg width="100%" height="160" viewBox="0 0 200 200" className="border border-indigo-300 rounded bg-indigo-50">
                    <polygon points="100,100 120,100 120,120 100,120" fill="rgba(255,0,0,0.2)" stroke="#ff0000" strokeWidth="2" />
                    {isVectorResult(result) && (selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'normalize') && (
                      <polygon points={`100,100 ${100 + result.x * 10},${100 - result.y * 10} ${100 + result.x * 10 + 20},${100 - result.y * 10} 120,100`} fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3" />
                    )}
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-semibold text-orange-600 mb-2">Square Transform 2</p>
                  <svg width="100%" height="160" viewBox="0 0 200 200" className="border border-orange-300 rounded bg-orange-50">
                    <polygon points="100,100 120,100 120,120 100,120" fill="rgba(255,0,0,0.2)" stroke="#ff0000" strokeWidth="2" />
                    {isVectorResult(result2) && (operation2 === 'addition' || operation2 === 'subtraction' || operation2 === 'normalize') && (
                      <polygon points={`100,100 ${100 + result2.x * 10},${100 - result2.y * 10} ${100 + result2.x * 10 + 20},${100 - result2.y * 10} 120,100`} fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3" />
                    )}
                  </svg>
                </div>
              </div>
            </div>
          )}

          {mode === '3d' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">3D Visualization</h2>
              <svg width="100%" height="400" viewBox="0 0 300 300" className="border-2 border-indigo-300 rounded-lg bg-indigo-50">
                <line x1="150" y1="150" x2="220" y2="100" stroke="#6366f1" strokeWidth="2" />
                <line x1="150" y1="150" x2="150" y2="50" stroke="#6366f1" strokeWidth="2" />
                <line x1="150" y1="150" x2="100" y2="180" stroke="#6366f1" strokeWidth="2" />
                <text x="225" y="95" fontSize="11" fill="#6366f1">X</text>
                <text x="145" y="45" fontSize="11" fill="#6366f1">Y</text>
                <text x="85" y="190" fontSize="11" fill="#6366f1">Z</text>
                
                {(() => {
                  const size = 2.5;
                  const square = [{x: 0, y: 0, z: 0}, {x: size, y: 0, z: 0}, {x: size, y: size, z: 0}, {x: 0, y: size, z: 0}];
                  const projected = square.map(p => project3D(p));
                  const pointsStr = projected.map(p => `${p.x},${p.y}`).join(' ');
                  return (
                    <>
                      <polygon points={pointsStr} fill="rgba(255,0,0,0.15)" stroke="#ff0000" strokeWidth="2" />
                      <text x="155" y="175" fontSize="9" fontWeight="bold" fill="#ff0000">Original</text>
                    </>
                  );
                })()}
                
                {(() => {
                  const size = 2.5;
                  const square = [{x: 0, y: 0, z: 0}, {x: size, y: 0, z: 0}, {x: size, y: size, z: 0}, {x: 0, y: size, z: 0}];
                  
                  let transformed = square.map(p => {
                    let t = {...p};
                    
                    if (transform3dType === 'rotation') {
                      const rotMatrix = combineRotations3D();
                      t = math.applyMatrix3D(rotMatrix, t);
                    } else if (transform3dType === 'translation') {
                      t.x += translation3d.x;
                      t.y += translation3d.y;
                      t.z += translation3d.z;
                    } else if (transform3dType === 'scale') {
                      t.x *= scale3d.x;
                      t.y *= scale3d.y;
                      t.z *= scale3d.z;
                    }
                    
                    return t;
                  });
                  
                  const projected = transformed.map(p => project3D(p));
                  const pointsStr = projected.map(p => `${p.x},${p.y}`).join(' ');
                  return (
                    <>
                      <polygon points={pointsStr} fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" />
                      <text x="155" y="195" fontSize="9" fontWeight="bold" fill="#3b82f6">Transformed</text>
                    </>
                  );
                })()}
                
                <line x1="150" y1="150" x2={project3D(v3d).x} y2={project3D(v3d).y} stroke="#ec4899" strokeWidth="3" />
                <circle cx={project3D(v3d).x} cy={project3D(v3d).y} r="5" fill="#ec4899" />
                <text x={project3D(v3d).x + 5} y={project3D(v3d).y - 5} fontSize="11" fill="#ec4899" fontWeight="bold">V</text>
              </svg>
            </div>
          )}

          {mode === 'matrix' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Visualization</h2>
              {matrixSize === '2x2' ? (
                <svg width="100%" height="400" viewBox="0 0 300 300" className="border-2 border-gray-200 rounded mb-4 bg-gray-50">
                  {Array.from({length: 11}).map((_, i) => (<g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5"><line x1={i * 30} y1="0" x2={i * 30} y2="300" /><line x1="0" y1={i * 30} x2="300" y2={i * 30} /></g>))}
                  <line x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />
                  <line x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />
                  <text x="270" y="20" fontSize="12" fill="#999">X</text>
                  <text x="135" y="15" fontSize="12" fill="#999">Y</text>
                  
                  <polygon points={`${centerX},${centerY} ${centerX + 50},${centerY} ${centerX + 50},${centerY - 50} ${centerX},${centerY - 50}`} fill="rgba(255,0,0,0.2)" stroke="#ff0000" strokeWidth="3" />
                  <text x={centerX - 40} y={centerY + 30} fontSize="12" fontWeight="bold" fill="#ff0000">Original</text>
                  
                  {selectedOperation !== 'determinant' && selectedOperation !== 'inverse' && (
                    <>
                      {typeof result === 'object' && Array.isArray(result) && result.length === 2 ? (
                        <polygon points={`${centerX},${centerY} ${centerX + result[0][0] * 50},${centerY - result[1][0] * 50} ${centerX + result[0][0] * 50 + result[0][1] * 50},${centerY - result[1][0] * 50 - result[1][1] * 50} ${centerX + result[0][1] * 50},${centerY - result[1][1] * 50}`} fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="3" />
                      ) : (
                        <polygon points={`${centerX},${centerY} ${centerX + m1[0][0] * 50},${centerY - m1[1][0] * 50} ${centerX + m1[0][0] * 50 + m1[0][1] * 50},${centerY - m1[1][0] * 50 - m1[1][1] * 50} ${centerX + m1[0][1] * 50},${centerY - m1[1][1] * 50}`} fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="3" />
                      )}
                      <text x={centerX + 60} y={centerY + 30} fontSize="12" fontWeight="bold" fill="#3b82f6">Transformed</text>
                    </>
                  )}
                </svg>
              ) : matrixSize === '4x4' ? (
                <svg width="100%" height="400" viewBox="0 0 300 300" className="border-2 border-indigo-300 rounded-lg bg-indigo-50">
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
                  <text x="270" y="20" fontSize="12" fill="#999">X</text>
                  <text x="135" y="15" fontSize="12" fill="#999">Y</text>
                  
                  {/* Original coordinate axes */}
                  <g stroke="#ff0000" strokeWidth="2">
                    <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                          x2={project3D({x: 2, y: 0, z: 0}).x} y2={project3D({x: 2, y: 0, z: 0}).y} />
                    <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                          x2={project3D({x: 0, y: 2, z: 0}).x} y2={project3D({x: 0, y: 2, z: 0}).y} />
                    <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                          x2={project3D({x: 0, y: 0, z: 2}).x} y2={project3D({x: 0, y: 0, z: 2}).y} />
                  </g>
                  <text x={project3D({x: 2.2, y: 0, z: 0}).x} y={project3D({x: 2.2, y: 0, z: 0}).y} fontSize="10" fill="#ff0000" fontWeight="bold">X</text>
                  <text x={project3D({x: 0, y: 2.2, z: 0}).x} y={project3D({x: 0, y: 2.2, z: 0}).y} fontSize="10" fill="#ff0000" fontWeight="bold">Y</text>
                  <text x={project3D({x: 0, y: 0, z: 2.2}).x} y={project3D({x: 0, y: 0, z: 2.2}).y} fontSize="10" fill="#ff0000" fontWeight="bold">Z</text>
                  
                  {/* Original unit cube */}
                  {(() => {
                    const size = 1.5;
                    const cube = [
                      {x: 0, y: 0, z: 0}, {x: size, y: 0, z: 0}, {x: size, y: size, z: 0}, {x: 0, y: size, z: 0},
                      {x: 0, y: 0, z: size}, {x: size, y: 0, z: size}, {x: size, y: size, z: size}, {x: 0, y: size, z: size}
                    ];
                    const projected = cube.map(p => project3D(p));
                    const faces = [
                      [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
                      [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5]
                    ];
                    return (
                      <>
                        {faces.map((face, i) => {
                          const points = face.map(idx => `${projected[idx].x},${projected[idx].y}`).join(' ');
                          return (
                            <polygon key={`face-${i}`} points={points} fill="rgba(255,0,0,0.1)" stroke="#ff0000" strokeWidth="1.5" />
                          );
                        })}
                        <text x="20" y="280" fontSize="11" fontWeight="bold" fill="#ff0000">Original</text>
                      </>
                    );
                  })()}
                  
                  {/* Transformed coordinate axes and cube */}
                  {selectedOperation !== 'determinant' && selectedOperation !== 'inverse' && (() => {
                    const currentM = selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'multiply' 
                      ? (selectedOperation === 'multiply' ? math.matrixMultiply(m1_4x4, m2_4x4) 
                         : selectedOperation === 'addition' ? math.matrixAdd(m1_4x4, m2_4x4)
                         : math.matrixSubtract(m1_4x4, m2_4x4))
                      : m1_4x4;
                    
                    const transformPoint = (p) => math.matrixApplyToVector4D(currentM, p);
                    
                    // Transformed axes
                    const origAxes = [
                      {x: 2, y: 0, z: 0}, {x: 0, y: 2, z: 0}, {x: 0, y: 0, z: 2}
                    ];
                    const transformedAxes = origAxes.map(transformPoint);
                    
                    // Transformed cube
                    const size = 1.5;
                    const cube = [
                      {x: 0, y: 0, z: 0}, {x: size, y: 0, z: 0}, {x: size, y: size, z: 0}, {x: 0, y: size, z: 0},
                      {x: 0, y: 0, z: size}, {x: size, y: 0, z: size}, {x: size, y: size, z: size}, {x: 0, y: size, z: size}
                    ];
                    const transformedCube = cube.map(transformPoint);
                    const projectedCube = transformedCube.map(p => project3D(p));
                    const faces = [
                      [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
                      [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5]
                    ];
                    
                    return (
                      <>
                        {/* Transformed axes */}
                        <g stroke="#3b82f6" strokeWidth="2">
                          <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                                x2={project3D(transformedAxes[0]).x} y2={project3D(transformedAxes[0]).y} />
                          <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                                x2={project3D(transformedAxes[1]).x} y2={project3D(transformedAxes[1]).y} />
                          <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                                x2={project3D(transformedAxes[2]).x} y2={project3D(transformedAxes[2]).y} />
                        </g>
                        
                        {/* Transformed cube */}
                        {faces.map((face, i) => {
                          const points = face.map(idx => `${projectedCube[idx].x},${projectedCube[idx].y}`).join(' ');
                          return (
                            <polygon key={`transformed-face-${i}`} points={points} fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" />
                          );
                        })}
                        <text x="20" y="295" fontSize="11" fontWeight="bold" fill="#3b82f6">Transformed</text>
                      </>
                    );
                  })()}
                  
                  {/* Show vector transformation if apply operation */}
                  {selectedOperation === 'apply' && typeof result === 'object' && result.x !== undefined && (
                    <>
                      <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                            x2={project3D(v3d).x} y2={project3D(v3d).y} stroke="#ec4899" strokeWidth="3" />
                      <circle cx={project3D(v3d).x} cy={project3D(v3d).y} r="5" fill="#ec4899" />
                      <text x={project3D(v3d).x + 5} y={project3D(v3d).y - 5} fontSize="11" fill="#ec4899" fontWeight="bold">V</text>
                      
                      <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                            x2={project3D(result).x} y2={project3D(result).y} stroke="#f59e0b" strokeWidth="3" />
                      <circle cx={project3D(result).x} cy={project3D(result).y} r="5" fill="#f59e0b" />
                      <text x={project3D(result).x + 5} y={project3D(result).y - 5} fontSize="11" fill="#f59e0b" fontWeight="bold">M·V</text>
                    </>
                  )}
                </svg>
              ) : (
                <svg width="100%" height="400" viewBox="0 0 300 300" className="border-2 border-indigo-300 rounded-lg bg-indigo-50">
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
                  <text x="270" y="20" fontSize="12" fill="#999">X</text>
                  <text x="135" y="15" fontSize="12" fill="#999">Y</text>
                  
                  {/* Original coordinate axes */}
                  <g stroke="#ff0000" strokeWidth="2">
                    <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                          x2={project3D({x: 2, y: 0, z: 0}).x} y2={project3D({x: 2, y: 0, z: 0}).y} />
                    <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                          x2={project3D({x: 0, y: 2, z: 0}).x} y2={project3D({x: 0, y: 2, z: 0}).y} />
                    <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                          x2={project3D({x: 0, y: 0, z: 2}).x} y2={project3D({x: 0, y: 0, z: 2}).y} />
                  </g>
                  <text x={project3D({x: 2.2, y: 0, z: 0}).x} y={project3D({x: 2.2, y: 0, z: 0}).y} fontSize="10" fill="#ff0000" fontWeight="bold">X</text>
                  <text x={project3D({x: 0, y: 2.2, z: 0}).x} y={project3D({x: 0, y: 2.2, z: 0}).y} fontSize="10" fill="#ff0000" fontWeight="bold">Y</text>
                  <text x={project3D({x: 0, y: 0, z: 2.2}).x} y={project3D({x: 0, y: 0, z: 2.2}).y} fontSize="10" fill="#ff0000" fontWeight="bold">Z</text>
                  
                  {/* Original unit cube */}
                  {(() => {
                    const size = 1.5;
                    const cube = [
                      {x: 0, y: 0, z: 0}, {x: size, y: 0, z: 0}, {x: size, y: size, z: 0}, {x: 0, y: size, z: 0},
                      {x: 0, y: 0, z: size}, {x: size, y: 0, z: size}, {x: size, y: size, z: size}, {x: 0, y: size, z: size}
                    ];
                    const projected = cube.map(p => project3D(p));
                    const faces = [
                      [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
                      [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5]
                    ];
                    return (
                      <>
                        {faces.map((face, i) => {
                          const points = face.map(idx => `${projected[idx].x},${projected[idx].y}`).join(' ');
                          return (
                            <polygon key={`face-${i}`} points={points} fill="rgba(255,0,0,0.1)" stroke="#ff0000" strokeWidth="1.5" />
                          );
                        })}
                        <text x="20" y="280" fontSize="11" fontWeight="bold" fill="#ff0000">Original</text>
                      </>
                    );
                  })()}
                  
                  {/* Transformed coordinate axes and cube */}
                  {selectedOperation !== 'determinant' && selectedOperation !== 'inverse' && (() => {
                    const currentM = selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'multiply' 
                      ? (selectedOperation === 'multiply' ? math.matrixMultiply(m1_3x3, m2_3x3) 
                         : selectedOperation === 'addition' ? math.matrixAdd(m1_3x3, m2_3x3)
                         : math.matrixSubtract(m1_3x3, m2_3x3))
                      : m1_3x3;
                    
                    const transformPoint = (p) => math.matrixApplyToVector3D(currentM, p);
                    
                    // Transformed axes
                    const origAxes = [
                      {x: 2, y: 0, z: 0}, {x: 0, y: 2, z: 0}, {x: 0, y: 0, z: 2}
                    ];
                    const transformedAxes = origAxes.map(transformPoint);
                    
                    // Transformed cube
                    const size = 1.5;
                    const cube = [
                      {x: 0, y: 0, z: 0}, {x: size, y: 0, z: 0}, {x: size, y: size, z: 0}, {x: 0, y: size, z: 0},
                      {x: 0, y: 0, z: size}, {x: size, y: 0, z: size}, {x: size, y: size, z: size}, {x: 0, y: size, z: size}
                    ];
                    const transformedCube = cube.map(transformPoint);
                    const projectedCube = transformedCube.map(p => project3D(p));
                    const faces = [
                      [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
                      [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5]
                    ];
                    
                    return (
                      <>
                        {/* Transformed axes */}
                        <g stroke="#3b82f6" strokeWidth="2">
                          <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                                x2={project3D(transformedAxes[0]).x} y2={project3D(transformedAxes[0]).y} />
                          <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                                x2={project3D(transformedAxes[1]).x} y2={project3D(transformedAxes[1]).y} />
                          <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                                x2={project3D(transformedAxes[2]).x} y2={project3D(transformedAxes[2]).y} />
                        </g>
                        
                        {/* Transformed cube */}
                        {faces.map((face, i) => {
                          const points = face.map(idx => `${projectedCube[idx].x},${projectedCube[idx].y}`).join(' ');
                          return (
                            <polygon key={`transformed-face-${i}`} points={points} fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" />
                          );
                        })}
                        <text x="20" y="295" fontSize="11" fontWeight="bold" fill="#3b82f6">Transformed</text>
                      </>
                    );
                  })()}
                  
                  {/* Show vector transformation if apply operation */}
                  {selectedOperation === 'apply' && typeof result === 'object' && result.x !== undefined && (
                    <>
                      <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                            x2={project3D(v3d).x} y2={project3D(v3d).y} stroke="#ec4899" strokeWidth="3" />
                      <circle cx={project3D(v3d).x} cy={project3D(v3d).y} r="5" fill="#ec4899" />
                      <text x={project3D(v3d).x + 5} y={project3D(v3d).y - 5} fontSize="11" fill="#ec4899" fontWeight="bold">V</text>
                      
                      <line x1={project3D({x: 0, y: 0, z: 0}).x} y1={project3D({x: 0, y: 0, z: 0}).y} 
                            x2={project3D(result).x} y2={project3D(result).y} stroke="#f59e0b" strokeWidth="3" />
                      <circle cx={project3D(result).x} cy={project3D(result).y} r="5" fill="#f59e0b" />
                      <text x={project3D(result).x + 5} y={project3D(result).y - 5} fontSize="11" fill="#f59e0b" fontWeight="bold">M·V</text>
                    </>
                  )}
                </svg>
              )}
            </div>
          )}

          {mode === 'advanced' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">3D Advanced Visualization</h2>
              <svg width="100%" height="400" viewBox="0 0 300 300" className="border-2 border-indigo-300 rounded-lg bg-indigo-50">
                <line x1="150" y1="150" x2="220" y2="100" stroke="#6366f1" strokeWidth="2" />
                <line x1="150" y1="150" x2="150" y2="50" stroke="#6366f1" strokeWidth="2" />
                <line x1="150" y1="150" x2="100" y2="180" stroke="#6366f1" strokeWidth="2" />
                <text x="225" y="95" fontSize="11" fill="#6366f1">X</text>
                <text x="145" y="45" fontSize="11" fill="#6366f1">Y</text>
                <text x="85" y="190" fontSize="11" fill="#6366f1">Z</text>
                
                {(() => {
                  const size = 2;
                  const square = [{x: 0, y: 0, z: 0}, {x: size, y: 0, z: 0}, {x: size, y: size, z: 0}, {x: 0, y: size, z: 0}];
                  const projected = square.map(p => project3D(p));
                  const pointsStr = projected.map(p => `${p.x},${p.y}`).join(' ');
                  return (
                    <>
                      <polygon points={pointsStr} fill="rgba(255,0,0,0.15)" stroke="#ff0000" strokeWidth="1" strokeDasharray="2" />
                    </>
                  );
                })()}
                
                {isVectorResult(result) && (
                  (() => {
                    const size = 2;
                    const square = [{x: 0, y: 0, z: 0}, {x: size, y: 0, z: 0}, {x: size, y: size, z: 0}, {x: 0, y: size, z: 0}];
                    const transformed = square.map(p => ({
                      x: p.x + result.x * 0.3,
                      y: p.y + result.y * 0.3,
                      z: p.z + (result.z || 0) * 0.3
                    }));
                    const projected = transformed.map(p => project3D(p));
                    const pointsStr = projected.map(p => `${p.x},${p.y}`).join(' ');
                    return (
                      <>
                        <polygon points={pointsStr} fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2" />
                      </>
                    );
                  })()
                )}
                
                <line x1="150" y1="150" x2={project3D(v3d).x} y2={project3D(v3d).y} stroke="#ec4899" strokeWidth="3" />
                <circle cx={project3D(v3d).x} cy={project3D(v3d).y} r="5" fill="#ec4899" />
                <text x={project3D(v3d).x + 5} y={project3D(v3d).y - 5} fontSize="11" fill="#ec4899" fontWeight="bold">V1</text>
                
                <line x1="150" y1="150" x2={project3D(v3d_2).x} y2={project3D(v3d_2).y} stroke="#10b981" strokeWidth="3" />
                <circle cx={project3D(v3d_2).x} cy={project3D(v3d_2).y} r="5" fill="#10b981" />
                <text x={project3D(v3d_2).x + 5} y={project3D(v3d_2).y - 5} fontSize="11" fill="#10b981" fontWeight="bold">V2</text>
                
                {isVectorResult(result) && (
                  <>
                    <line x1="150" y1="150" x2={project3D(result).x} y2={project3D(result).y} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5" />
                    <circle cx={project3D(result).x} cy={project3D(result).y} r="4" fill="#f59e0b" />
                    <text x={project3D(result).x + 5} y={project3D(result).y - 5} fontSize="10" fill="#f59e0b" fontWeight="bold">R</text>
                  </>
                )}
              </svg>
            </div>
          )}
          </div>

          {/* Controls - 30% width (3 columns) */}
          <div className="lg:col-span-3">
          <ControlsPanel
            mode={mode}
            selectedOperation={selectedOperation}
            transform3dType={transform3dType}
            comparisonMode={comparisonMode}
            operation2={operation2}
            matrixSize={matrixSize} setMatrixSize={setMatrixSize}
            v1={v1} setV1={setV1}
            v2={v2} setV2={setV2}
            m1={m1} setM1={setM1}
            m2={m2} setM2={setM2}
            m1_3x3={m1_3x3} setM1_3x3={setM1_3x3}
            m2_3x3={m2_3x3} setM2_3x3={setM2_3x3}
            m1_4x4={m1_4x4} setM1_4x4={setM1_4x4}
            m2_4x4={m2_4x4} setM2_4x4={setM2_4x4}
            v3d={v3d} setV3d={setV3d}
            v3d_2={v3d_2} setV3d_2={setV3d_2}
            rotation3d={rotation3d} setRotation3d={setRotation3d}
            translation3d={translation3d} setTranslation3d={setTranslation3d}
            scale3d={scale3d} setScale3d={setScale3d}
            reflectionAxis={reflectionAxis} setReflectionAxis={setReflectionAxis}
            onOperationChange={(e) => setSelectedOperation(e.target.value)}
            onTransform3dTypeChange={(e) => setTransform3dType(e.target.value)}
            onOperation2Change={(e) => setOperation2(e.target.value)}
            onReset={() => {
              setV1({x: 3, y: 4});
              setV2({x: 2, y: 1});
              setM1([[1, 0], [0, 1]]);
              setM2([[1, 1], [0, 1]]);
              setM1_3x3([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
              setM2_3x3([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
              setM1_4x4([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
              setM2_4x4([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
              setV3d({x: 2, y: 3, z: 1});
              setV3d_2({x: 1, y: 2, z: 3});
              setRotation3d({x: 0, y: 0, z: 0});
              setTranslation3d({x: 0, y: 0, z: 0});
              setScale3d({x: 1, y: 1, z: 1});
              setTransform3dType('rotation');
              setComparisonMode(false);
            }}
          />
          </div>
        </div>

        {/* Result Panel - Full Width Below */}
        <div className="mb-8">
          <ResultPanel 
            result={result} 
            details={details} 
            steps={steps} 
            explanation={explanation} 
            renderMatrix={renderMatrix}
            formulaData={formulaData}
            visualDecomposition={visualDecomposition}
            mode={mode}
            selectedOperation={selectedOperation}
            onFormulaPartHover={(part) => setHighlightedPart(part)}
            onFormulaPartClick={(part) => setHighlightedPart(part)}
            v1={v1}
            v2={v2}
            m1={m1}
            m2={m2}
            m1_3x3={m1_3x3}
            m2_3x3={m2_3x3}
            m1_4x4={m1_4x4}
            m2_4x4={m2_4x4}
            matrixSize={matrixSize}
            transform3dType={transform3dType}
            v3d={v3d}
            v3d_2={v3d_2}
            rotation3d={rotation3d}
            translation3d={translation3d}
            scale3d={scale3d}
          />

          {comparisonMode && (
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-xl font-bold text-orange-900 mb-4">Comparison</h2>
              <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded mb-4">
                <p className="text-lg font-mono text-orange-900 mb-2">{isVectorResult(result2) ? `(${result2.x.toFixed(2)}, ${result2.y.toFixed(2)})` : typeof result2 === 'number' ? result2.toFixed(2) : 'No Result'}</p>
                <p className="text-sm text-orange-700">{explanation2}</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                <h3 className="font-semibold text-green-900 mb-2">Difference</h3>
                <div className="text-sm text-green-800">
                  {typeof result === 'number' && typeof result2 === 'number' && <p>Value difference: {Math.abs(result - result2).toFixed(2)}</p>}
                  {isVectorResult(result) && isVectorResult(result2) && <p>({Math.abs(result.x - result2.x).toFixed(2)}, {Math.abs(result.y - result2.y).toFixed(2)})</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showTheory && getCurrentTheory(mode, selectedOperation) && (
        <TheoryModal
          theory={getCurrentTheory(mode, selectedOperation)}
          mode={mode}
          selectedOperation={selectedOperation}
          onClose={() => setShowTheory(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  console.log('App component rendering, checking routes...');
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vector-matrix" element={<VectorMatrixOperations />} />
      <Route path="/shaders" element={<Shaders />} />
      <Route path="/shaders/tutorial" element={<ShadersTutorial />} />
      <Route path="/transform3d" element={<Transform3D />} />
      <Route path="/curves-surfaces/tutorials" element={<CurvesAndSurfacesTutorial />} />
      <Route path="/curves-surfaces" element={<CurvesAndSurfaces />} />
      <Route path="/animation-interpolation/tutorials" element={<AnimationInterpolationTutorial />} />
      <Route path="/animation-interpolation" element={<AnimationInterpolation />} />
      <Route path="/engine2d-tutorial/complete" element={<Engine2DCompleteTutorial />} />
      <Route path="/engine2d-tutorial" element={<Engine2DTutorial />} />
      <Route path="/transformation-visualization" element={<TransformationVisualization />} />
      <Route path="/transformation-visualization/tutorials" element={<TransformationTutorial />} />
      <Route path="/shader/glitch-demo" element={<GlitchDemo />} />
      <Route path="/shaders/glitch-demo" element={<GlitchDemo />} />
      <Route path="/shader/glitch-demo-test" element={<GlitchDemoTest />} />
      <Route path="/shader/parallax-demo" element={<ParallaxDemo />} />
      <Route path="/shaders/parallax-demo" element={<ParallaxDemo />} />
      {/* Catch-all for debugging */}
      <Route path="*" element={
        <div className="p-8">
          <h1>404 - Route not found</h1>
          <p>Current path: {window.location.pathname}</p>
          <p>Available routes:</p>
          <ul>
            <li>/</li>
            <li>/shaders</li>
            <li>/shader/glitch-demo</li>
            <li>/shader/glitch-demo-test</li>
          </ul>
        </div>
      } />
    </Routes>
  );
}