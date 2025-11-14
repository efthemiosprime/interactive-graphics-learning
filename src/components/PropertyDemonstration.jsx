import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react';
import * as math from '../utils/math';

export default function PropertyDemonstration({ mode, selectedOperation, v1, v2, m1, m2, m1_3x3, m2_3x3, m1_4x4, m2_4x4, matrixSize, transform3dType, v3d, v3d_2, rotation3d, translation3d, scale3d }) {
  const [expanded, setExpanded] = useState(true);

  const getProperties = () => {
    if (mode === 'vector') {
      switch (selectedOperation) {
        case 'addition':
          // Commutative: v1 + v2 = v2 + v1
          const add1 = math.add(v1, v2);
          const add2 = math.add(v2, v1);
          const isCommutative = Math.abs(add1.x - add2.x) < 0.01 && Math.abs(add1.y - add2.y) < 0.01;
          
          // Associative: (v1 + v2) + v3 = v1 + (v2 + v3) - need a third vector
          const v3 = { x: 1, y: 1 };
          const assoc1 = math.add(math.add(v1, v2), v3);
          const assoc2 = math.add(v1, math.add(v2, v3));
          const isAssociative = Math.abs(assoc1.x - assoc2.x) < 0.01 && Math.abs(assoc1.y - assoc2.y) < 0.01;
          
          // Identity: v + 0 = v
          const zero = { x: 0, y: 0 };
          const identity = math.add(v1, zero);
          const hasIdentity = Math.abs(identity.x - v1.x) < 0.01 && Math.abs(identity.y - v1.y) < 0.01;

          return [
            {
              name: 'Commutative Property',
              formula: 'a + b = b + a',
              demonstration: `(${v1.x}, ${v1.y}) + (${v2.x}, ${v2.y}) = (${add1.x.toFixed(2)}, ${add1.y.toFixed(2)})\n(${v2.x}, ${v2.y}) + (${v1.x}, ${v1.y}) = (${add2.x.toFixed(2)}, ${add2.y.toFixed(2)})`,
              holds: isCommutative,
              description: 'The order of addition does not matter'
            },
            {
              name: 'Associative Property',
              formula: '(a + b) + c = a + (b + c)',
              demonstration: `((${v1.x}, ${v1.y}) + (${v2.x}, ${v2.y})) + (${v3.x}, ${v3.y}) = (${assoc1.x.toFixed(2)}, ${assoc1.y.toFixed(2)})\n(${v1.x}, ${v1.y}) + ((${v2.x}, ${v2.y}) + (${v3.x}, ${v3.y})) = (${assoc2.x.toFixed(2)}, ${assoc2.y.toFixed(2)})`,
              holds: isAssociative,
              description: 'Grouping does not affect the result'
            },
            {
              name: 'Identity Element',
              formula: 'a + 0 = a',
              demonstration: `(${v1.x}, ${v1.y}) + (0, 0) = (${identity.x.toFixed(2)}, ${identity.y.toFixed(2)})`,
              holds: hasIdentity,
              description: 'Adding zero vector leaves the vector unchanged'
            }
          ];

        case 'subtraction':
          // Non-commutative: v1 - v2 ≠ v2 - v1
          const sub1 = math.subtract(v1, v2);
          const sub2 = math.subtract(v2, v1);
          const isNotCommutative = Math.abs(sub1.x - sub2.x) > 0.01 || Math.abs(sub1.y - sub2.y) > 0.01;

          return [
            {
              name: 'Non-Commutative Property',
              formula: 'a - b ≠ b - a',
              demonstration: `(${v1.x}, ${v1.y}) - (${v2.x}, ${v2.y}) = (${sub1.x.toFixed(2)}, ${sub1.y.toFixed(2)})\n(${v2.x}, ${v2.y}) - (${v1.x}, ${v1.y}) = (${sub2.x.toFixed(2)}, ${sub2.y.toFixed(2)})`,
              holds: isNotCommutative,
              description: 'The order matters in subtraction'
            },
            {
              name: 'Anti-commutative',
              formula: 'a - b = -(b - a)',
              demonstration: `(${v1.x}, ${v1.y}) - (${v2.x}, ${v2.y}) = (${sub1.x.toFixed(2)}, ${sub1.y.toFixed(2)})\n-(${v2.x}, ${v2.y}) - (${v1.x}, ${v1.y}) = (${-sub2.x.toFixed(2)}, ${-sub2.y.toFixed(2)})`,
              holds: Math.abs(sub1.x + sub2.x) < 0.01 && Math.abs(sub1.y + sub2.y) < 0.01,
              description: 'Subtraction is anti-commutative'
            }
          ];

        case 'dotproduct':
          // Commutative: v1 · v2 = v2 · v1
          const dot1 = math.dotProduct(v1, v2);
          const dot2 = math.dotProduct(v2, v1);
          const dotCommutative = Math.abs(dot1 - dot2) < 0.01;

          // Distributive: v1 · (v2 + v3) = v1 · v2 + v1 · v3
          const v3_dot = { x: 1, y: 1 };
          const dist1 = math.dotProduct(v1, math.add(v2, v3_dot));
          const dist2 = math.dotProduct(v1, v2) + math.dotProduct(v1, v3_dot);
          const isDistributive = Math.abs(dist1 - dist2) < 0.01;

          return [
            {
              name: 'Commutative Property',
              formula: 'a · b = b · a',
              demonstration: `(${v1.x}, ${v1.y}) · (${v2.x}, ${v2.y}) = ${dot1.toFixed(2)}\n(${v2.x}, ${v2.y}) · (${v1.x}, ${v1.y}) = ${dot2.toFixed(2)}`,
              holds: dotCommutative,
              description: 'The order does not matter for dot product'
            },
            {
              name: 'Distributive Property',
              formula: 'a · (b + c) = a · b + a · c',
              demonstration: `(${v1.x}, ${v1.y}) · ((${v2.x}, ${v2.y}) + (${v3_dot.x}, ${v3_dot.y})) = ${dist1.toFixed(2)}\n(${v1.x}, ${v1.y}) · (${v2.x}, ${v2.y}) + (${v1.x}, ${v1.y}) · (${v3_dot.x}, ${v3_dot.y}) = ${dist2.toFixed(2)}`,
              holds: isDistributive,
              description: 'Dot product distributes over addition'
            }
          ];

        default:
          return [];
      }
    } else if (mode === 'matrix') {
      const currentM1 = matrixSize === '4x4' ? m1_4x4 : matrixSize === '3x3' ? m1_3x3 : m1;
      const currentM2 = matrixSize === '4x4' ? m2_4x4 : matrixSize === '3x3' ? m2_3x3 : m2;

      switch (selectedOperation) {
        case 'addition':
          // Commutative: M1 + M2 = M2 + M1
          const matAdd1 = math.matrixAdd(currentM1, currentM2);
          const matAdd2 = math.matrixAdd(currentM2, currentM1);
          const matCommutative = JSON.stringify(matAdd1.map(r => r.map(x => Math.round(x * 100)))) === 
                                 JSON.stringify(matAdd2.map(r => r.map(x => Math.round(x * 100))));

          // Identity: M + 0 = M
          const zeroMatrix = currentM1.map(row => row.map(() => 0));
          const matIdentity = math.matrixAdd(currentM1, zeroMatrix);
          const hasMatIdentity = JSON.stringify(currentM1.map(r => r.map(x => Math.round(x * 100)))) === 
                                JSON.stringify(matIdentity.map(r => r.map(x => Math.round(x * 100))));

          return [
            {
              name: 'Commutative Property',
              formula: 'A + B = B + A',
              demonstration: `Matrix addition is commutative\nA + B = B + A`,
              holds: matCommutative,
              description: 'The order of addition does not matter'
            },
            {
              name: 'Identity Element',
              formula: 'A + 0 = A',
              demonstration: `Adding zero matrix leaves matrix unchanged`,
              holds: hasMatIdentity,
              description: 'Zero matrix is the identity for addition'
            }
          ];

        case 'multiply':
          // Non-commutative: M1 × M2 ≠ M2 × M1
          const matMult1 = math.matrixMultiply(currentM1, currentM2);
          const matMult2 = math.matrixMultiply(currentM2, currentM1);
          const matNotCommutative = JSON.stringify(matMult1.map(r => r.map(x => Math.round(x * 100)))) !== 
                                    JSON.stringify(matMult2.map(r => r.map(x => Math.round(x * 100))));

          // Associative: (A × B) × C = A × (B × C) - would need a third matrix
          // Identity: A × I = A
          const identityMatrix = matrixSize === '3x3' 
            ? [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
            : matrixSize === '4x4'
            ? [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
            : [[1, 0], [0, 1]];
          const matMultIdentity = math.matrixMultiply(currentM1, identityMatrix);
          const hasMultIdentity = JSON.stringify(currentM1.map(r => r.map(x => Math.round(x * 100)))) === 
                                 JSON.stringify(matMultIdentity.map(r => r.map(x => Math.round(x * 100))));

          return [
            {
              name: 'Non-Commutative Property',
              formula: 'A × B ≠ B × A',
              demonstration: `Matrix multiplication is NOT commutative\nA × B ≠ B × A`,
              holds: matNotCommutative,
              description: 'The order matters in matrix multiplication'
            },
            {
              name: 'Identity Element',
              formula: 'A × I = A',
              demonstration: `Multiplying by identity matrix leaves matrix unchanged`,
              holds: hasMultIdentity,
              description: 'Identity matrix is the identity for multiplication'
            }
          ];

        case 'determinant':
          // Multiplicative: det(A × B) = det(A) × det(B)
          if (matrixSize === '2x2' || matrixSize === '3x3') {
            const det1 = math.determinant(currentM1);
            const det2 = math.determinant(currentM2);
            const multAB = math.matrixMultiply(currentM1, currentM2);
            const detMult = math.determinant(multAB);
            const detProduct = det1 * det2;
            const isMultiplicative = Math.abs(detMult - detProduct) < 0.01;

            return [
              {
                name: 'Multiplicative Property',
                formula: 'det(A × B) = det(A) × det(B)',
                demonstration: `det(A) = ${det1.toFixed(2)}, det(B) = ${det2.toFixed(2)}\ndet(A × B) = ${detMult.toFixed(2)}\ndet(A) × det(B) = ${detProduct.toFixed(2)}`,
                holds: isMultiplicative,
                description: 'Determinant of product equals product of determinants'
              }
            ];
          }
          return [];

        case 'eigenvalues':
          // Eigenvalue properties
          if (matrixSize === '2x2' || matrixSize === '3x3') {
            const eigenvals = matrixSize === '2x2' 
              ? math.eigenvalues2x2(currentM1)
              : math.eigenvalues3x3(currentM1);
            
            // Sum of eigenvalues = trace
            const trace = matrixSize === '2x2'
              ? currentM1[0][0] + currentM1[1][1]
              : currentM1[0][0] + currentM1[1][1] + currentM1[2][2];
            const sumEigenvals = eigenvals.reduce((sum, ev) => sum + ev.real, 0);
            const traceProperty = Math.abs(sumEigenvals - trace) < 0.01;

            // Product of eigenvalues = determinant
            const det = math.determinant(currentM1);
            const productEigenvals = eigenvals.reduce((prod, ev) => prod * ev.real, 1);
            const detProperty = Math.abs(productEigenvals - det) < 0.01;

            const properties = [];
            
            if (traceProperty) {
              properties.push({
                name: 'Trace Property',
                formula: 'λ₁ + λ₂ + ... = trace(M)',
                demonstration: `Sum of eigenvalues = ${sumEigenvals.toFixed(2)}\nTrace = ${trace.toFixed(2)}`,
                holds: traceProperty,
                description: 'Sum of eigenvalues equals the trace of the matrix'
              });
            }

            if (detProperty && !eigenvals.some(ev => ev.complex)) {
              properties.push({
                name: 'Determinant Property',
                formula: 'λ₁ × λ₂ × ... = det(M)',
                demonstration: `Product of eigenvalues = ${productEigenvals.toFixed(2)}\nDeterminant = ${det.toFixed(2)}`,
                holds: detProperty,
                description: 'Product of eigenvalues equals the determinant'
              });
            }

            return properties;
          }
          return [];

        case 'rank':
          // Rank properties
          const rank1 = math.matrixRank(currentM1);
          const rank2 = math.matrixRank(currentM2);
          
          // Rank of product: rank(A × B) ≤ min(rank(A), rank(B))
          const multAB = math.matrixMultiply(currentM1, currentM2);
          const rankMult = math.matrixRank(multAB);
          const rankProductProperty = rankMult <= Math.min(rank1, rank2);
          
          // Rank of sum: rank(A + B) ≤ rank(A) + rank(B)
          const sumAB = math.matrixAdd(currentM1, currentM2);
          const rankSum = math.matrixRank(sumAB);
          const rankSumProperty = rankSum <= rank1 + rank2;
          
          // Rank and determinant: rank = n if and only if det ≠ 0 (for square matrices)
          const det = math.determinant(currentM1);
          const rankDetProperty = (matrixSize === '2x2' || matrixSize === '3x3') 
            ? ((det !== 0 && rank1 === (matrixSize === '2x2' ? 2 : 3)) || (det === 0 && rank1 < (matrixSize === '2x2' ? 2 : 3)))
            : null;
          
          const properties = [];
          
          properties.push({
            name: 'Rank of Product',
            formula: 'rank(A × B) ≤ min(rank(A), rank(B))',
            demonstration: `rank(A) = ${rank1}, rank(B) = ${rank2}\nrank(A × B) = ${rankMult}\nmin(${rank1}, ${rank2}) = ${Math.min(rank1, rank2)}`,
            holds: rankProductProperty,
            description: 'Rank of product is at most the minimum of individual ranks'
          });
          
          properties.push({
            name: 'Rank of Sum',
            formula: 'rank(A + B) ≤ rank(A) + rank(B)',
            demonstration: `rank(A) = ${rank1}, rank(B) = ${rank2}\nrank(A + B) = ${rankSum}\n${rank1} + ${rank2} = ${rank1 + rank2}`,
            holds: rankSumProperty,
            description: 'Rank of sum is at most the sum of individual ranks'
          });
          
          if (rankDetProperty !== null) {
            properties.push({
              name: 'Rank and Determinant',
              formula: 'rank(M) = n if and only if det(M) ≠ 0',
              demonstration: `rank = ${rank1}, det = ${det.toFixed(2)}\n${det !== 0 ? 'det ≠ 0 → full rank' : 'det = 0 → rank < n'}`,
              holds: rankDetProperty,
              description: 'For square matrices, full rank equals non-zero determinant'
            });
          }
          
          return properties;

        default:
          return [];
      }
    } else if (mode === '3d') {
      switch (transform3dType) {
        case 'rotation':
          // Rotation matrices are orthogonal: R^T = R^-1
          const rotMatrix = math.rotationX(rotation3d.x);
          const rotMatrixT = math.transpose3x3(rotMatrix);
          const rotMatrixInv = math.inverseMatrix3x3(rotMatrix);
          const isOrthogonal = JSON.stringify(rotMatrixT.map(r => r.map(x => Math.round(x * 100)))) === 
                              JSON.stringify(rotMatrixInv.map(r => r.map(x => Math.round(x * 100))));

          // Composition: R1(R2(v)) = (R1×R2)(v)
          const rot1 = math.rotationX(rotation3d.x);
          const rot2 = math.rotationY(rotation3d.y);
          const composed = math.multiplyMatrices3D(rot1, rot2);
          const result1 = math.applyMatrix3D(rot1, math.applyMatrix3D(rot2, v3d));
          const result2 = math.applyMatrix3D(composed, v3d);
          const isComposition = Math.abs(result1.x - result2.x) < 0.01 && 
                               Math.abs(result1.y - result2.y) < 0.01 && 
                               Math.abs(result1.z - result2.z) < 0.01;

          return [
            {
              name: 'Orthogonal Property',
              formula: 'R^T = R^-1',
              demonstration: `Rotation matrices are orthogonal\nTranspose equals inverse`,
              holds: isOrthogonal,
              description: 'Rotation matrices preserve lengths and angles'
            },
            {
              name: 'Composition Property',
              formula: 'R1(R2(v)) = (R1×R2)(v)',
              demonstration: `Composing rotations is equivalent to multiplying matrices`,
              holds: isComposition,
              description: 'Rotation composition is associative'
            }
          ];

        case 'translation':
          // Translation is additive: T1(T2(v)) = T1+T2(v)
          const trans1 = math.translation3D(translation3d.x, translation3d.y, translation3d.z);
          const trans2 = math.translation3D(1, 1, 1);
          const transComposed = math.matrixMultiply4x4(trans1, trans2);
          const transResult1 = math.matrixApplyToVector4D(trans1, math.matrixApplyToVector4D(trans2, v3d));
          const transResult2 = math.matrixApplyToVector4D(transComposed, v3d);
          const isTransComposition = Math.abs(transResult1.x - transResult2.x) < 0.01 && 
                                    Math.abs(transResult1.y - transResult2.y) < 0.01 && 
                                    Math.abs(transResult1.z - transResult2.z) < 0.01;

          return [
            {
              name: 'Additive Property',
              formula: 'T1(T2(v)) = (T1+T2)(v)',
              demonstration: `Translation composition is additive`,
              holds: isTransComposition,
              description: 'Translations add together when composed'
            }
          ];

        case 'scale':
          // Scaling is multiplicative: S1(S2(v)) = (S1×S2)(v)
          const scale1 = math.scale3D(scale3d.x, scale3d.y, scale3d.z);
          const scale2 = math.scale3D(2, 2, 2);
          const scaleComposed = math.multiplyMatrices3D(scale1, scale2);
          const scaleResult1 = math.applyMatrix3D(scale1, math.applyMatrix3D(scale2, v3d));
          const scaleResult2 = math.applyMatrix3D(scaleComposed, v3d);
          const isScaleComposition = Math.abs(scaleResult1.x - scaleResult2.x) < 0.01 && 
                                    Math.abs(scaleResult1.y - scaleResult2.y) < 0.01 && 
                                    Math.abs(scaleResult1.z - scaleResult2.z) < 0.01;

          return [
            {
              name: 'Multiplicative Property',
              formula: 'S1(S2(v)) = (S1×S2)(v)',
              demonstration: `Scaling composition is multiplicative`,
              holds: isScaleComposition,
              description: 'Scales multiply together when composed'
            }
          ];

        default:
          return [];
      }
    } else if (mode === 'advanced') {
      switch (selectedOperation) {
        case 'crossproduct3d':
          // Anti-commutative: a × b = -(b × a)
          const cross1 = math.crossProduct3D(v3d, v3d_2);
          const cross2 = math.crossProduct3D(v3d_2, v3d);
          const isAntiCommutative = Math.abs(cross1.x + cross2.x) < 0.01 && 
                                   Math.abs(cross1.y + cross2.y) < 0.01 && 
                                   Math.abs(cross1.z + cross2.z) < 0.01;

          // Self-product: a × a = 0
          const selfCross = math.crossProduct3D(v3d, v3d);
          const isSelfZero = Math.abs(selfCross.x) < 0.01 && 
                            Math.abs(selfCross.y) < 0.01 && 
                            Math.abs(selfCross.z) < 0.01;

          // Distributive: a × (b + c) = a × b + a × c
          const v3_adv = { x: 1, y: 1, z: 1 };
          const vSum = { x: v3d_2.x + v3_adv.x, y: v3d_2.y + v3_adv.y, z: v3d_2.z + v3_adv.z };
          const distCross1 = math.crossProduct3D(v3d, vSum);
          const crossProd1 = math.crossProduct3D(v3d, v3d_2);
          const crossProd2 = math.crossProduct3D(v3d, v3_adv);
          const distCross2 = { x: crossProd1.x + crossProd2.x, y: crossProd1.y + crossProd2.y, z: crossProd1.z + crossProd2.z };
          const isDistributive = Math.abs(distCross1.x - distCross2.x) < 0.01 && 
                                Math.abs(distCross1.y - distCross2.y) < 0.01 && 
                                Math.abs(distCross1.z - distCross2.z) < 0.01;

          return [
            {
              name: 'Anti-Commutative Property',
              formula: 'a × b = -(b × a)',
              demonstration: `(${v3d.x}, ${v3d.y}, ${v3d.z}) × (${v3d_2.x}, ${v3d_2.y}, ${v3d_2.z}) = (${cross1.x.toFixed(2)}, ${cross1.y.toFixed(2)}, ${cross1.z.toFixed(2)})\n(${v3d_2.x}, ${v3d_2.y}, ${v3d_2.z}) × (${v3d.x}, ${v3d.y}, ${v3d.z}) = (${cross2.x.toFixed(2)}, ${cross2.y.toFixed(2)}, ${cross2.z.toFixed(2)})`,
              holds: isAntiCommutative,
              description: 'Cross product is anti-commutative'
            },
            {
              name: 'Self-Product Property',
              formula: 'a × a = 0',
              demonstration: `(${v3d.x}, ${v3d.y}, ${v3d.z}) × (${v3d.x}, ${v3d.y}, ${v3d.z}) = (${selfCross.x.toFixed(2)}, ${selfCross.y.toFixed(2)}, ${selfCross.z.toFixed(2)})`,
              holds: isSelfZero,
              description: 'Cross product of a vector with itself is zero'
            },
            {
              name: 'Distributive Property',
              formula: 'a × (b + c) = a × b + a × c',
              demonstration: `Cross product distributes over addition`,
              holds: isDistributive,
              description: 'Cross product is distributive over vector addition'
            }
          ];

        case 'dotproduct3d':
          // Commutative: a · b = b · a
          const dot3d1 = math.dotProduct3D(v3d, v3d_2);
          const dot3d2 = math.dotProduct3D(v3d_2, v3d);
          const dot3dCommutative = Math.abs(dot3d1 - dot3d2) < 0.01;

          // Distributive: a · (b + c) = a · b + a · c
          const v3_dot3d = { x: 1, y: 1, z: 1 };
          const vSumDot = { x: v3d_2.x + v3_dot3d.x, y: v3d_2.y + v3_dot3d.y, z: v3d_2.z + v3_dot3d.z };
          const distDot3d1 = math.dotProduct3D(v3d, vSumDot);
          const distDot3d2 = math.dotProduct3D(v3d, v3d_2) + math.dotProduct3D(v3d, v3_dot3d);
          const isDistributive3d = Math.abs(distDot3d1 - distDot3d2) < 0.01;

          return [
            {
              name: 'Commutative Property',
              formula: 'a · b = b · a',
              demonstration: `(${v3d.x}, ${v3d.y}, ${v3d.z}) · (${v3d_2.x}, ${v3d_2.y}, ${v3d_2.z}) = ${dot3d1.toFixed(2)}\n(${v3d_2.x}, ${v3d_2.y}, ${v3d_2.z}) · (${v3d.x}, ${v3d.y}, ${v3d.z}) = ${dot3d2.toFixed(2)}`,
              holds: dot3dCommutative,
              description: 'The order does not matter for dot product'
            },
            {
              name: 'Distributive Property',
              formula: 'a · (b + c) = a · b + a · c',
              demonstration: `Dot product distributes over addition`,
              holds: isDistributive3d,
              description: 'Dot product is distributive over vector addition'
            }
          ];

        case 'magnitude3d':
          // Non-negative: ||v|| ≥ 0
          const mag = math.magnitude3D(v3d);
          const isNonNegative = mag >= 0;

          // Homogeneity: ||k·v|| = |k|·||v||
          const k = 2;
          const scaledV = { x: v3d.x * k, y: v3d.y * k, z: v3d.z * k };
          const magScaled = math.magnitude3D(scaledV);
          const magK = Math.abs(k) * mag;
          const isHomogeneous = Math.abs(magScaled - magK) < 0.01;

          return [
            {
              name: 'Non-Negative Property',
              formula: '||v|| ≥ 0',
              demonstration: `Magnitude of (${v3d.x}, ${v3d.y}, ${v3d.z}) = ${mag.toFixed(2)}`,
              holds: isNonNegative,
              description: 'Magnitude is always non-negative'
            },
            {
              name: 'Homogeneity Property',
              formula: '||k·v|| = |k|·||v||',
              demonstration: `||${k}·(${v3d.x}, ${v3d.y}, ${v3d.z})|| = ${magScaled.toFixed(2)}\n|${k}|·${mag.toFixed(2)} = ${magK.toFixed(2)}`,
              holds: isHomogeneous,
              description: 'Scaling a vector scales its magnitude proportionally'
            }
          ];

        default:
          return [];
      }
    }
    return [];
  };

  const properties = getProperties();

  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-4 mb-4 border-2 border-green-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-3 text-left"
      >
        <h3 className="text-lg font-bold text-green-900">
          Property Demonstration {expanded ? `(${properties.length} properties)` : ''}
        </h3>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-green-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-green-600" />
        )}
      </button>

      {expanded && (
        <div className="space-y-3">
          {properties.map((prop, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border-2 border-green-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {prop.holds ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-md font-semibold text-green-900">{prop.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      prop.holds 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {prop.holds ? 'Holds' : 'Does not hold'}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-green-800 bg-green-50 p-2 rounded mb-2">
                    {prop.formula}
                  </p>
                  <p className="text-xs text-gray-700 mb-2 whitespace-pre-line font-mono">
                    {prop.demonstration}
                  </p>
                  <p className="text-xs text-gray-600 italic">
                    {prop.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

