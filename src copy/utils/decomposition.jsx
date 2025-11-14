import React from 'react';
import * as math from './math';

// Helper function to create SVG elements as JSX
const createSVG = (elements) => elements;

// Visual decomposition generators for different operations
export const getVectorAdditionDecomposition = (v1, v2, result) => {
  const scale = 20;
  const centerX = 150;
  const centerY = 150;

  return {
    steps: [
      {
        title: 'Step 1: Decompose V1 into components',
        description: 'Vector V1 can be broken down into its x and y components',
        svg: createSVG([
          // Grid
          ...Array.from({length: 11}).map((_, i) => (
            <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
            </g>
          )),
          // Axes
          <line key="axis-x" x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="axis-y" x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          // V1 vector
          <line key="v1" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#ec4899" strokeWidth="3" />,
          <circle key="v1-end" cx={centerX + v1.x * scale} cy={centerY - v1.y * scale} r="5" fill="#ec4899" />,
          // X component
          <line key="v1-x" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY} stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />,
          <text key="v1-x-label" x={centerX + v1.x * scale / 2} y={centerY + 15} fontSize="12" fill="#3b82f6" fontWeight="bold">v₁ₓ = {v1.x}</text>,
          // Y component
          <line key="v1-y" x1={centerX + v1.x * scale} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />,
          <text key="v1-y-label" x={centerX + v1.x * scale + 10} y={centerY - v1.y * scale / 2} fontSize="12" fill="#10b981" fontWeight="bold">v₁ᵧ = {v1.y}</text>,
          // Labels
          <text key="v1-label" x={centerX + v1.x * scale + 5} y={centerY - v1.y * scale - 5} fontSize="11" fill="#ec4899" fontWeight="bold">V1</text>,
        ]),
        viewBox: "0 0 300 300",
        height: 300,
        details: `V1 = (${v1.x}, ${v1.y})\nX-component: ${v1.x}\nY-component: ${v1.y}`,
      },
      {
        title: 'Step 2: Decompose V2 into components',
        description: 'Vector V2 can also be broken down into its x and y components',
        svg: createSVG([
          // Grid
          ...Array.from({length: 11}).map((_, i) => (
            <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
            </g>
          )),
          // Axes
          <line key="axis-x" x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="axis-y" x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          // V2 vector
          <line key="v2" x1={centerX} y1={centerY} x2={centerX + v2.x * scale} y2={centerY - v2.y * scale} stroke="#10b981" strokeWidth="3" />,
          <circle key="v2-end" cx={centerX + v2.x * scale} cy={centerY - v2.y * scale} r="5" fill="#10b981" />,
          // X component
          <line key="v2-x" x1={centerX} y1={centerY} x2={centerX + v2.x * scale} y2={centerY} stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />,
          <text key="v2-x-label" x={centerX + v2.x * scale / 2} y={centerY + 15} fontSize="12" fill="#3b82f6" fontWeight="bold">v₂ₓ = {v2.x}</text>,
          // Y component
          <line key="v2-y" x1={centerX + v2.x * scale} y1={centerY} x2={centerX + v2.x * scale} y2={centerY - v2.y * scale} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />,
          <text key="v2-y-label" x={centerX + v2.x * scale + 10} y={centerY - v2.y * scale / 2} fontSize="12" fill="#f59e0b" fontWeight="bold">v₂ᵧ = {v2.y}</text>,
          // Labels
          <text key="v2-label" x={centerX + v2.x * scale + 5} y={centerY - v2.y * scale - 5} fontSize="11" fill="#10b981" fontWeight="bold">V2</text>,
        ]),
        viewBox: "0 0 300 300",
        height: 300,
        details: `V2 = (${v2.x}, ${v2.y})\nX-component: ${v2.x}\nY-component: ${v2.y}`,
      },
      {
        title: 'Step 3: Combine components',
        description: 'Add corresponding components: x-components together, y-components together',
        svg: createSVG([
          // Grid
          ...Array.from({length: 11}).map((_, i) => (
            <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
            </g>
          )),
          // Axes
          <line key="axis-x" x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="axis-y" x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          // V1 components
          <line key="v1-x" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY} stroke="#ec4899" strokeWidth="2" strokeDasharray="3,3" />,
          <line key="v1-y" x1={centerX + v1.x * scale} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#ec4899" strokeWidth="2" strokeDasharray="3,3" />,
          // V2 components (starting from V1 end)
          <line key="v2-x" x1={centerX + v1.x * scale} y1={centerY - v1.y * scale} x2={centerX + (v1.x + v2.x) * scale} y2={centerY - v1.y * scale} stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />,
          <line key="v2-y" x1={centerX + (v1.x + v2.x) * scale} y1={centerY - v1.y * scale} x2={centerX + (v1.x + v2.x) * scale} y2={centerY - (v1.y + v2.y) * scale} stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />,
          // Result vector
          <line key="result" x1={centerX} y1={centerY} x2={centerX + result.x * scale} y2={centerY - result.y * scale} stroke="#f59e0b" strokeWidth="4" />,
          <circle key="result-end" cx={centerX + result.x * scale} cy={centerY - result.y * scale} r="6" fill="#f59e0b" />,
          // Combined X component
          <line key="combined-x" x1={centerX} y1={centerY} x2={centerX + result.x * scale} y2={centerY} stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />,
          <text key="combined-x-label" x={centerX + result.x * scale / 2} y={centerY + 20} fontSize="12" fill="#3b82f6" fontWeight="bold">v₁ₓ + v₂ₓ = {v1.x} + {v2.x} = {result.x}</text>,
          // Combined Y component
          <line key="combined-y" x1={centerX + result.x * scale} y1={centerY} x2={centerX + result.x * scale} y2={centerY - result.y * scale} stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" />,
          <text key="combined-y-label" x={centerX + result.x * scale + 10} y={centerY - result.y * scale / 2} fontSize="12" fill="#8b5cf6" fontWeight="bold">v₁ᵧ + v₂ᵧ = {v1.y} + {v2.y} = {result.y}</text>,
          // Labels
          <text key="result-label" x={centerX + result.x * scale + 5} y={centerY - result.y * scale - 5} fontSize="12" fill="#f59e0b" fontWeight="bold">V1 + V2</text>,
        ]),
        viewBox: "0 0 300 300",
        height: 300,
        details: `Combining components:\nX: ${v1.x} + ${v2.x} = ${result.x}\nY: ${v1.y} + ${v2.y} = ${result.y}\n\nResult: (${result.x}, ${result.y})`,
        result: `(${result.x}, ${result.y})`,
      },
    ],
  };
};

export const getDotProductDecomposition = (v1, v2, result) => {
  const scale = 20;
  const centerX = 150;
  const centerY = 150;
  const projection = math.projection2D(v1, v2);
  const projLength = math.magnitude(projection);

  return {
    steps: [
      {
        title: 'Step 1: Visualize the vectors',
        description: 'Two vectors V1 and V2 with an angle θ between them',
        svg: createSVG([
          // Grid
          ...Array.from({length: 11}).map((_, i) => (
            <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
            </g>
          )),
          // Axes
          <line key="axis-x" x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="axis-y" x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          // V2 (reference vector)
          <line key="v2" x1={centerX} y1={centerY} x2={centerX + v2.x * scale} y2={centerY - v2.y * scale} stroke="#10b981" strokeWidth="3" />,
          <circle key="v2-end" cx={centerX + v2.x * scale} cy={centerY - v2.y * scale} r="5" fill="#10b981" />,
          // V1
          <line key="v1" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#ec4899" strokeWidth="3" />,
          <circle key="v1-end" cx={centerX + v1.x * scale} cy={centerY - v1.y * scale} r="5" fill="#ec4899" />,
          // Labels
          <text key="v1-label" x={centerX + v1.x * scale + 5} y={centerY - v1.y * scale - 5} fontSize="11" fill="#ec4899" fontWeight="bold">V1</text>,
          <text key="v2-label" x={centerX + v2.x * scale + 5} y={centerY - v2.y * scale - 5} fontSize="11" fill="#10b981" fontWeight="bold">V2</text>,
        ]),
        viewBox: "0 0 300 300",
        height: 300,
        details: `V1 = (${v1.x}, ${v1.y})\nV2 = (${v2.x}, ${v2.y})`,
      },
      {
        title: 'Step 2: Project V1 onto V2',
        description: 'The dot product is related to the projection of V1 onto V2',
        svg: createSVG([
          // Grid
          ...Array.from({length: 11}).map((_, i) => (
            <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
            </g>
          )),
          // Axes
          <line key="axis-x" x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="axis-y" x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          // V2 (reference)
          <line key="v2" x1={centerX} y1={centerY} x2={centerX + v2.x * scale} y2={centerY - v2.y * scale} stroke="#10b981" strokeWidth="3" />,
          <circle key="v2-end" cx={centerX + v2.x * scale} cy={centerY - v2.y * scale} r="5" fill="#10b981" />,
          // V1
          <line key="v1" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#ec4899" strokeWidth="2" strokeDasharray="3,3" />,
          // Projection
          <line key="projection" x1={centerX} y1={centerY} x2={centerX + projection.x * scale} y2={centerY - projection.y * scale} stroke="#3b82f6" strokeWidth="4" />,
          <circle key="proj-end" cx={centerX + projection.x * scale} cy={centerY - projection.y * scale} r="5" fill="#3b82f6" />,
          // Perpendicular line
          <line key="perp" x1={centerX + projection.x * scale} y1={centerY - projection.y * scale} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />,
          // Labels
          <text key="v2-label" x={centerX + v2.x * scale + 5} y={centerY - v2.y * scale - 5} fontSize="11" fill="#10b981" fontWeight="bold">V2</text>,
          <text key="proj-label" x={centerX + projection.x * scale / 2} y={centerY - projection.y * scale / 2 - 10} fontSize="11" fill="#3b82f6" fontWeight="bold">proj</text>,
        ]),
        viewBox: "0 0 300 300",
        height: 300,
        details: `Projection of V1 onto V2:\nproj = (${projection.x.toFixed(2)}, ${projection.y.toFixed(2)})\nLength = ${projLength.toFixed(2)}`,
      },
      {
        title: 'Step 3: Calculate dot product',
        description: 'Dot product = |V1| × |V2| × cos(θ) = sum of component products',
        svg: createSVG([
          // Grid
          ...Array.from({length: 11}).map((_, i) => (
            <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
            </g>
          )),
          // Axes
          <line key="axis-x" x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="axis-y" x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          // V1 with components
          <line key="v1-x" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY} stroke="#ec4899" strokeWidth="2" strokeDasharray="3,3" />,
          <line key="v1-y" x1={centerX + v1.x * scale} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#ec4899" strokeWidth="2" strokeDasharray="3,3" />,
          <line key="v1" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#ec4899" strokeWidth="3" />,
          // V2 with components
          <line key="v2-x" x1={centerX} y1={centerY} x2={centerX + v2.x * scale} y2={centerY} stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />,
          <line key="v2-y" x1={centerX + v2.x * scale} y1={centerY} x2={centerX + v2.x * scale} y2={centerY - v2.y * scale} stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />,
          <line key="v2" x1={centerX} y1={centerY} x2={centerX + v2.x * scale} y2={centerY - v2.y * scale} stroke="#10b981" strokeWidth="3" />,
          // Labels
          <text key="v1x-label" x={centerX + v1.x * scale / 2} y={centerY + 15} fontSize="11" fill="#ec4899" fontWeight="bold">v₁ₓ = {v1.x}</text>,
          <text key="v1y-label" x={centerX + v1.x * scale + 10} y={centerY - v1.y * scale / 2} fontSize="11" fill="#ec4899" fontWeight="bold">v₁ᵧ = {v1.y}</text>,
          <text key="v2x-label" x={centerX + v2.x * scale / 2} y={centerY + 25} fontSize="11" fill="#10b981" fontWeight="bold">v₂ₓ = {v2.x}</text>,
          <text key="v2y-label" x={centerX + v2.x * scale + 10} y={centerY - v2.y * scale / 2} fontSize="11" fill="#10b981" fontWeight="bold">v₂ᵧ = {v2.y}</text>,
          // Result text
          <text key="result-text" x={centerX} y={50} fontSize="14" fill="#f59e0b" fontWeight="bold">
            V1 · V2 = v₁ₓv₂ₓ + v₁ᵧv₂ᵧ
          </text>,
          <text key="result-calc" x={centerX} y={70} fontSize="12" fill="#8b5cf6" fontWeight="bold">
            = {v1.x}×{v2.x} + {v1.y}×{v2.y} = {result.toFixed(2)}
          </text>,
        ]),
        viewBox: "0 0 300 300",
        height: 300,
        details: `Component-wise multiplication:\nv₁ₓ × v₂ₓ = ${v1.x} × ${v2.x} = ${(v1.x * v2.x).toFixed(2)}\nv₁ᵧ × v₂ᵧ = ${v1.y} × ${v2.y} = ${(v1.y * v2.y).toFixed(2)}\n\nSum: ${(v1.x * v2.x).toFixed(2)} + ${(v1.y * v2.y).toFixed(2)} = ${result.toFixed(2)}`,
        result: result.toFixed(2),
      },
    ],
  };
};

export const getMagnitudeDecomposition = (v1, result) => {
  const scale = 20;
  const centerX = 150;
  const centerY = 150;
  const xSquared = v1.x * v1.x;
  const ySquared = v1.y * v1.y;

  return {
    steps: [
      {
        title: 'Step 1: Visualize the vector',
        description: 'Vector V with its x and y components',
        svg: createSVG([
          // Grid
          ...Array.from({length: 11}).map((_, i) => (
            <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
            </g>
          )),
          // Axes
          <line key="axis-x" x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="axis-y" x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          // Vector
          <line key="v" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#ec4899" strokeWidth="4" />,
          <circle key="v-end" cx={centerX + v1.x * scale} cy={centerY - v1.y * scale} r="6" fill="#ec4899" />,
          // X component
          <line key="v-x" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY} stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />,
          <text key="v-x-label" x={centerX + v1.x * scale / 2} y={centerY + 15} fontSize="12" fill="#3b82f6" fontWeight="bold">vₓ = {v1.x}</text>,
          // Y component
          <line key="v-y" x1={centerX + v1.x * scale} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />,
          <text key="v-y-label" x={centerX + v1.x * scale + 10} y={centerY - v1.y * scale / 2} fontSize="12" fill="#10b981" fontWeight="bold">vᵧ = {v1.y}</text>,
          // Right angle indicator
          <path key="right-angle" d={`M ${centerX + v1.x * scale - 5},${centerY} L ${centerX + v1.x * scale - 5},${centerY - 5} L ${centerX + v1.x * scale},${centerY - 5}`} stroke="#666" strokeWidth="2" fill="none" />,
          // Labels
          <text key="v-label" x={centerX + v1.x * scale + 5} y={centerY - v1.y * scale - 5} fontSize="12" fill="#ec4899" fontWeight="bold">V</text>,
        ]),
        viewBox: "0 0 300 300",
        height: 300,
        details: `V = (${v1.x}, ${v1.y})\nX-component: ${v1.x}\nY-component: ${v1.y}`,
      },
      {
        title: 'Step 2: Apply Pythagorean theorem',
        description: 'The magnitude is the hypotenuse of a right triangle formed by the components',
        svg: createSVG([
          // Grid
          ...Array.from({length: 11}).map((_, i) => (
            <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
            </g>
          )),
          // Axes
          <line key="axis-x" x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="axis-y" x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          // Right triangle
          <line key="base" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY} stroke="#3b82f6" strokeWidth="3" />,
          <line key="height" x1={centerX + v1.x * scale} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#10b981" strokeWidth="3" />,
          <line key="hypotenuse" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#ec4899" strokeWidth="4" />,
          // Right angle indicator
          <path key="right-angle" d={`M ${centerX + v1.x * scale - 8},${centerY} L ${centerX + v1.x * scale - 8},${centerY - 8} L ${centerX + v1.x * scale},${centerY - 8}`} stroke="#666" strokeWidth="2" fill="none" />,
          // Labels
          <text key="base-label" x={centerX + v1.x * scale / 2} y={centerY + 20} fontSize="12" fill="#3b82f6" fontWeight="bold">vₓ = {v1.x}</text>,
          <text key="height-label" x={centerX + v1.x * scale + 15} y={centerY - v1.y * scale / 2} fontSize="12" fill="#10b981" fontWeight="bold">vᵧ = {v1.y}</text>,
          <text key="hyp-label" x={centerX + v1.x * scale / 2 - 20} y={centerY - v1.y * scale / 2} fontSize="12" fill="#ec4899" fontWeight="bold">|V| = ?</text>,
          // Formula
          <text key="formula" x={centerX} y={50} fontSize="14" fill="#8b5cf6" fontWeight="bold">
            |V| = √(vₓ² + vᵧ²)
          </text>,
        ]),
        viewBox: "0 0 300 300",
        height: 300,
        details: `Pythagorean theorem:\n|V|² = vₓ² + vᵧ²\n|V|² = ${v1.x}² + ${v1.y}²\n|V|² = ${xSquared} + ${ySquared} = ${(xSquared + ySquared).toFixed(2)}`,
      },
      {
        title: 'Step 3: Calculate the magnitude',
        description: 'Take the square root to get the final magnitude',
        svg: createSVG([
          // Grid
          ...Array.from({length: 11}).map((_, i) => (
            <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
            </g>
          )),
          // Axes
          <line key="axis-x" x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="axis-y" x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          // Vector with magnitude shown
          <line key="v" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#ec4899" strokeWidth="4" />,
          <circle key="v-end" cx={centerX + v1.x * scale} cy={centerY - v1.y * scale} r="6" fill="#ec4899" />,
          // Magnitude arc
          <path key="magnitude-arc" d={`M ${centerX + 10},${centerY} A 30,30 0 0,1 ${centerX + v1.x * scale - 10},${centerY - v1.y * scale + 10}`} stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="3,3" />,
          // Calculation text
          <text key="calc-text" x={centerX} y={50} fontSize="14" fill="#8b5cf6" fontWeight="bold">
            |V| = √({xSquared} + {ySquared})
          </text>,
          <text key="result-text" x={centerX} y={75} fontSize="16" fill="#f59e0b" fontWeight="bold">
            |V| = {result.toFixed(2)}
          </text>,
          // Labels
          <text key="v-label" x={centerX + v1.x * scale + 5} y={centerY - v1.y * scale - 5} fontSize="12" fill="#ec4899" fontWeight="bold">V</text>,
          <text key="mag-label" x={centerX + v1.x * scale / 2 - 15} y={centerY - v1.y * scale / 2 - 15} fontSize="11" fill="#f59e0b" fontWeight="bold">|V|</text>,
        ]),
        viewBox: "0 0 300 300",
        height: 300,
        details: `Final calculation:\n|V| = √(${xSquared} + ${ySquared})\n|V| = √${(xSquared + ySquared).toFixed(2)}\n|V| = ${result.toFixed(2)}`,
        result: result.toFixed(2),
      },
    ],
  };
};

export const getVectorSubtractionDecomposition = (v1, v2, result) => {
  const scale = 20;
  const centerX = 150;
  const centerY = 150;

  return {
    steps: [
      {
        title: 'Step 1: Visualize V1 and V2',
        description: 'Two vectors: V1 (minuend) and V2 (subtrahend)',
        svg: createSVG([
          ...Array.from({length: 11}).map((_, i) => (
            <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
            </g>
          )),
          <line key="axis-x" x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="axis-y" x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="v1" x1={centerX} y1={centerY} x2={centerX + v1.x * scale} y2={centerY - v1.y * scale} stroke="#ec4899" strokeWidth="3" />,
          <circle key="v1-end" cx={centerX + v1.x * scale} cy={centerY - v1.y * scale} r="5" fill="#ec4899" />,
          <line key="v2" x1={centerX} y1={centerY} x2={centerX + v2.x * scale} y2={centerY - v2.y * scale} stroke="#10b981" strokeWidth="3" />,
          <circle key="v2-end" cx={centerX + v2.x * scale} cy={centerY - v2.y * scale} r="5" fill="#10b981" />,
          <text key="v1-label" x={centerX + v1.x * scale + 5} y={centerY - v1.y * scale - 5} fontSize="11" fill="#ec4899" fontWeight="bold">V1</text>,
          <text key="v2-label" x={centerX + v2.x * scale + 5} y={centerY - v2.y * scale - 5} fontSize="11" fill="#10b981" fontWeight="bold">V2</text>,
        ]),
        viewBox: "0 0 300 300",
        height: 300,
        details: `V1 = (${v1.x}, ${v1.y})\nV2 = (${v2.x}, ${v2.y})`,
      },
      {
        title: 'Step 2: Subtract components',
        description: 'Subtract corresponding components: x-components and y-components separately',
        svg: createSVG([
          ...Array.from({length: 11}).map((_, i) => (
            <g key={`grid-${i}`} stroke="#e0e0e0" strokeWidth="0.5">
              <line x1={i * 30} y1="0" x2={i * 30} y2="300" />
              <line x1="0" y1={i * 30} x2="300" y2={i * 30} />
            </g>
          )),
          <line key="axis-x" x1={centerX} y1="0" x2={centerX} y2="300" stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="axis-y" x1="0" y1={centerY} x2="300" y2={centerY} stroke="#999" strokeWidth="1" strokeDasharray="4" />,
          <line key="result" x1={centerX} y1={centerY} x2={centerX + result.x * scale} y2={centerY - result.y * scale} stroke="#f59e0b" strokeWidth="4" />,
          <circle key="result-end" cx={centerX + result.x * scale} cy={centerY - result.y * scale} r="6" fill="#f59e0b" />,
          <line key="x-comp" x1={centerX} y1={centerY} x2={centerX + result.x * scale} y2={centerY} stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />,
          <text key="x-label" x={centerX + result.x * scale / 2} y={centerY + 20} fontSize="12" fill="#3b82f6" fontWeight="bold">v₁ₓ - v₂ₓ = {v1.x} - {v2.x} = {result.x}</text>,
          <line key="y-comp" x1={centerX + result.x * scale} y1={centerY} x2={centerX + result.x * scale} y2={centerY - result.y * scale} stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" />,
          <text key="y-label" x={centerX + result.x * scale + 10} y={centerY - result.y * scale / 2} fontSize="12" fill="#8b5cf6" fontWeight="bold">v₁ᵧ - v₂ᵧ = {v1.y} - {v2.y} = {result.y}</text>,
          <text key="result-label" x={centerX + result.x * scale + 5} y={centerY - result.y * scale - 5} fontSize="12" fill="#f59e0b" fontWeight="bold">V1 - V2</text>,
        ]),
        viewBox: "0 0 300 300",
        height: 300,
        details: `Component-wise subtraction:\nX: ${v1.x} - ${v2.x} = ${result.x}\nY: ${v1.y} - ${v2.y} = ${result.y}\n\nResult: (${result.x}, ${result.y})`,
        result: `(${result.x}, ${result.y})`,
      },
    ],
  };
};

export const getMatrixAdditionDecomposition = (m1, m2, result, matrixSize) => {
  if (matrixSize === '2x2') {
    return {
      steps: [
        {
          title: 'Step 1: Visualize the matrices',
          description: 'Two 2×2 matrices to be added element-wise',
          details: `Matrix A:\n[${m1[0][0]}, ${m1[0][1]}]\n[${m1[1][0]}, ${m1[1][1]}]\n\nMatrix B:\n[${m2[0][0]}, ${m2[0][1]}]\n[${m2[1][0]}, ${m2[1][1]}]`,
        },
        {
          title: 'Step 2: Add corresponding elements',
          description: 'Each element in the result is the sum of corresponding elements from A and B',
          details: `Result[0][0] = A[0][0] + B[0][0] = ${m1[0][0]} + ${m2[0][0]} = ${result[0][0]}\nResult[0][1] = A[0][1] + B[0][1] = ${m1[0][1]} + ${m2[0][1]} = ${result[0][1]}\nResult[1][0] = A[1][0] + B[1][0] = ${m1[1][0]} + ${m2[1][0]} = ${result[1][0]}\nResult[1][1] = A[1][1] + B[1][1] = ${m1[1][1]} + ${m2[1][1]} = ${result[1][1]}`,
          result: `[[${result[0][0]}, ${result[0][1]}], [${result[1][0]}, ${result[1][1]}]]`,
        },
      ],
    };
  } else if (matrixSize === '3x3') {
    return {
      steps: [
        {
          title: 'Step 1: Visualize the matrices',
          description: 'Two 3×3 matrices to be added element-wise',
          details: `Matrix A:\n[${m1[0][0]}, ${m1[0][1]}, ${m1[0][2]}]\n[${m1[1][0]}, ${m1[1][1]}, ${m1[1][2]}]\n[${m1[2][0]}, ${m1[2][1]}, ${m1[2][2]}]\n\nMatrix B:\n[${m2[0][0]}, ${m2[0][1]}, ${m2[0][2]}]\n[${m2[1][0]}, ${m2[1][1]}, ${m2[1][2]}]\n[${m2[2][0]}, ${m2[2][1]}, ${m2[2][2]}]`,
        },
        {
          title: 'Step 2: Add corresponding elements (Row 0)',
          description: 'Add elements in the first row',
          details: `Result[0][0] = A[0][0] + B[0][0] = ${m1[0][0]} + ${m2[0][0]} = ${result[0][0]}\nResult[0][1] = A[0][1] + B[0][1] = ${m1[0][1]} + ${m2[0][1]} = ${result[0][1]}\nResult[0][2] = A[0][2] + B[0][2] = ${m1[0][2]} + ${m2[0][2]} = ${result[0][2]}`,
        },
        {
          title: 'Step 3: Add corresponding elements (Row 1)',
          description: 'Add elements in the second row',
          details: `Result[1][0] = A[1][0] + B[1][0] = ${m1[1][0]} + ${m2[1][0]} = ${result[1][0]}\nResult[1][1] = A[1][1] + B[1][1] = ${m1[1][1]} + ${m2[1][1]} = ${result[1][1]}\nResult[1][2] = A[1][2] + B[1][2] = ${m1[1][2]} + ${m2[1][2]} = ${result[1][2]}`,
        },
        {
          title: 'Step 4: Add corresponding elements (Row 2)',
          description: 'Add elements in the third row',
          details: `Result[2][0] = A[2][0] + B[2][0] = ${m1[2][0]} + ${m2[2][0]} = ${result[2][0]}\nResult[2][1] = A[2][1] + B[2][1] = ${m1[2][1]} + ${m2[2][1]} = ${result[2][1]}\nResult[2][2] = A[2][2] + B[2][2] = ${m1[2][2]} + ${m2[2][2]} = ${result[2][2]}`,
        },
      ],
    };
  }
  return null;
};

export const getMatrixSubtractionDecomposition = (m1, m2, result, matrixSize) => {
  if (matrixSize === '2x2') {
    return {
      steps: [
        {
          title: 'Step 1: Visualize the matrices',
          description: 'Two 2×2 matrices to be subtracted element-wise',
          details: `Matrix A:\n[${m1[0][0]}, ${m1[0][1]}]\n[${m1[1][0]}, ${m1[1][1]}]\n\nMatrix B:\n[${m2[0][0]}, ${m2[0][1]}]\n[${m2[1][0]}, ${m2[1][1]}]`,
        },
        {
          title: 'Step 2: Subtract corresponding elements',
          description: 'Each element in the result is the difference of corresponding elements from A and B',
          details: `Result[0][0] = A[0][0] - B[0][0] = ${m1[0][0]} - ${m2[0][0]} = ${result[0][0]}\nResult[0][1] = A[0][1] - B[0][1] = ${m1[0][1]} - ${m2[0][1]} = ${result[0][1]}\nResult[1][0] = A[1][0] - B[1][0] = ${m1[1][0]} - ${m2[1][0]} = ${result[1][0]}\nResult[1][1] = A[1][1] - B[1][1] = ${m1[1][1]} - ${m2[1][1]} = ${result[1][1]}`,
          result: `[[${result[0][0]}, ${result[0][1]}], [${result[1][0]}, ${result[1][1]}]]`,
        },
      ],
    };
  } else if (matrixSize === '3x3') {
    return {
      steps: [
        {
          title: 'Step 1: Visualize the matrices',
          description: 'Two 3×3 matrices to be subtracted element-wise',
          details: `Matrix A:\n[${m1[0][0]}, ${m1[0][1]}, ${m1[0][2]}]\n[${m1[1][0]}, ${m1[1][1]}, ${m1[1][2]}]\n[${m1[2][0]}, ${m1[2][1]}, ${m1[2][2]}]\n\nMatrix B:\n[${m2[0][0]}, ${m2[0][1]}, ${m2[0][2]}]\n[${m2[1][0]}, ${m2[1][1]}, ${m2[1][2]}]\n[${m2[2][0]}, ${m2[2][1]}, ${m2[2][2]}]`,
        },
        {
          title: 'Step 2: Subtract corresponding elements (Row 0)',
          description: 'Subtract elements in the first row',
          details: `Result[0][0] = A[0][0] - B[0][0] = ${m1[0][0]} - ${m2[0][0]} = ${result[0][0]}\nResult[0][1] = A[0][1] - B[0][1] = ${m1[0][1]} - ${m2[0][1]} = ${result[0][1]}\nResult[0][2] = A[0][2] - B[0][2] = ${m1[0][2]} - ${m2[0][2]} = ${result[0][2]}`,
        },
        {
          title: 'Step 3: Subtract corresponding elements (Row 1)',
          description: 'Subtract elements in the second row',
          details: `Result[1][0] = A[1][0] - B[1][0] = ${m1[1][0]} - ${m2[1][0]} = ${result[1][0]}\nResult[1][1] = A[1][1] - B[1][1] = ${m1[1][1]} - ${m2[1][1]} = ${result[1][1]}\nResult[1][2] = A[1][2] - B[1][2] = ${m1[1][2]} - ${m2[1][2]} = ${result[1][2]}`,
        },
        {
          title: 'Step 4: Subtract corresponding elements (Row 2)',
          description: 'Subtract elements in the third row',
          details: `Result[2][0] = A[2][0] - B[2][0] = ${m1[2][0]} - ${m2[2][0]} = ${result[2][0]}\nResult[2][1] = A[2][1] - B[2][1] = ${m1[2][1]} - ${m2[2][1]} = ${result[2][1]}\nResult[2][2] = A[2][2] - B[2][2] = ${m1[2][2]} - ${m2[2][2]} = ${result[2][2]}`,
        },
      ],
    };
  }
  return null;
};

export const getMatrixMultiplyDecomposition = (m1, m2, result, matrixSize) => {
  if (matrixSize === '2x2') {
    const elem00 = m1[0][0]*m2[0][0] + m1[0][1]*m2[1][0];
    const elem01 = m1[0][0]*m2[0][1] + m1[0][1]*m2[1][1];
    const elem10 = m1[1][0]*m2[0][0] + m1[1][1]*m2[1][0];
    const elem11 = m1[1][0]*m2[0][1] + m1[1][1]*m2[1][1];
    
    return {
      steps: [
        {
          title: 'Step 1: Visualize the matrices',
          description: 'Matrix multiplication: rows of first matrix × columns of second matrix',
          details: `Matrix A:\n[${m1[0][0]}, ${m1[0][1]}]\n[${m1[1][0]}, ${m1[1][1]}]\n\nMatrix B:\n[${m2[0][0]}, ${m2[0][1]}]\n[${m2[1][0]}, ${m2[1][1]}]`,
        },
        {
          title: 'Step 2: Calculate result[0][0]',
          description: 'Row 0 of A · Column 0 of B',
          details: `(${m1[0][0]} × ${m2[0][0]}) + (${m1[0][1]} × ${m2[1][0]}) = ${m1[0][0]*m2[0][0]} + ${m1[0][1]*m2[1][0]} = ${elem00}`,
          result: elem00,
        },
        {
          title: 'Step 3: Calculate result[0][1]',
          description: 'Row 0 of A · Column 1 of B',
          details: `(${m1[0][0]} × ${m2[0][1]}) + (${m1[0][1]} × ${m2[1][1]}) = ${m1[0][0]*m2[0][1]} + ${m1[0][1]*m2[1][1]} = ${elem01}`,
          result: elem01,
        },
        {
          title: 'Step 4: Calculate result[1][0]',
          description: 'Row 1 of A · Column 0 of B',
          details: `(${m1[1][0]} × ${m2[0][0]}) + (${m1[1][1]} × ${m2[1][0]}) = ${m1[1][0]*m2[0][0]} + ${m1[1][1]*m2[1][0]} = ${elem10}`,
          result: elem10,
        },
        {
          title: 'Step 5: Calculate result[1][1]',
          description: 'Row 1 of A · Column 1 of B',
          details: `(${m1[1][0]} × ${m2[0][1]}) + (${m1[1][1]} × ${m2[1][1]}) = ${m1[1][0]*m2[0][1]} + ${m1[1][1]*m2[1][1]} = ${elem11}`,
          result: elem11,
        },
      ],
    };
  } else if (matrixSize === '3x3') {
    // Calculate each element
    const elem00 = m1[0][0]*m2[0][0] + m1[0][1]*m2[1][0] + m1[0][2]*m2[2][0];
    const elem01 = m1[0][0]*m2[0][1] + m1[0][1]*m2[1][1] + m1[0][2]*m2[2][1];
    const elem02 = m1[0][0]*m2[0][2] + m1[0][1]*m2[1][2] + m1[0][2]*m2[2][2];
    const elem10 = m1[1][0]*m2[0][0] + m1[1][1]*m2[1][0] + m1[1][2]*m2[2][0];
    const elem11 = m1[1][0]*m2[0][1] + m1[1][1]*m2[1][1] + m1[1][2]*m2[2][1];
    const elem12 = m1[1][0]*m2[0][2] + m1[1][1]*m2[1][2] + m1[1][2]*m2[2][2];
    const elem20 = m1[2][0]*m2[0][0] + m1[2][1]*m2[1][0] + m1[2][2]*m2[2][0];
    const elem21 = m1[2][0]*m2[0][1] + m1[2][1]*m2[1][1] + m1[2][2]*m2[2][1];
    const elem22 = m1[2][0]*m2[0][2] + m1[2][1]*m2[1][2] + m1[2][2]*m2[2][2];
    
    return {
      steps: [
        {
          title: 'Step 1: Visualize the matrices',
          description: 'Matrix multiplication: rows of first matrix × columns of second matrix',
          details: `Matrix A:\n[${m1[0][0]}, ${m1[0][1]}, ${m1[0][2]}]\n[${m1[1][0]}, ${m1[1][1]}, ${m1[1][2]}]\n[${m1[2][0]}, ${m1[2][1]}, ${m1[2][2]}]\n\nMatrix B:\n[${m2[0][0]}, ${m2[0][1]}, ${m2[0][2]}]\n[${m2[1][0]}, ${m2[1][1]}, ${m2[1][2]}]\n[${m2[2][0]}, ${m2[2][1]}, ${m2[2][2]}]`,
        },
        {
          title: 'Step 2: Calculate Row 0 elements',
          description: 'Row 0 of A · Columns 0, 1, 2 of B',
          details: `result[0][0] = (${m1[0][0]}×${m2[0][0]}) + (${m1[0][1]}×${m2[1][0]}) + (${m1[0][2]}×${m2[2][0]}) = ${elem00}\nresult[0][1] = (${m1[0][0]}×${m2[0][1]}) + (${m1[0][1]}×${m2[1][1]}) + (${m1[0][2]}×${m2[2][1]}) = ${elem01}\nresult[0][2] = (${m1[0][0]}×${m2[0][2]}) + (${m1[0][1]}×${m2[1][2]}) + (${m1[0][2]}×${m2[2][2]}) = ${elem02}`,
        },
        {
          title: 'Step 3: Calculate Row 1 elements',
          description: 'Row 1 of A · Columns 0, 1, 2 of B',
          details: `result[1][0] = (${m1[1][0]}×${m2[0][0]}) + (${m1[1][1]}×${m2[1][0]}) + (${m1[1][2]}×${m2[2][0]}) = ${elem10}\nresult[1][1] = (${m1[1][0]}×${m2[0][1]}) + (${m1[1][1]}×${m2[1][1]}) + (${m1[1][2]}×${m2[2][1]}) = ${elem11}\nresult[1][2] = (${m1[1][0]}×${m2[0][2]}) + (${m1[1][1]}×${m2[1][2]}) + (${m1[1][2]}×${m2[2][2]}) = ${elem12}`,
        },
        {
          title: 'Step 4: Calculate Row 2 elements',
          description: 'Row 2 of A · Columns 0, 1, 2 of B',
          details: `result[2][0] = (${m1[2][0]}×${m2[0][0]}) + (${m1[2][1]}×${m2[1][0]}) + (${m1[2][2]}×${m2[2][0]}) = ${elem20}\nresult[2][1] = (${m1[2][0]}×${m2[0][1]}) + (${m1[2][1]}×${m2[1][1]}) + (${m1[2][2]}×${m2[2][1]}) = ${elem21}\nresult[2][2] = (${m1[2][0]}×${m2[0][2]}) + (${m1[2][1]}×${m2[1][2]}) + (${m1[2][2]}×${m2[2][2]}) = ${elem22}`,
        },
      ],
    };
  }
  return null;
};

export const getDeterminantDecomposition = (m1, result, matrixSize) => {
  if (matrixSize === '2x2') {
    const ad = m1[0][0] * m1[1][1];
    const bc = m1[0][1] * m1[1][0];
    
    return {
      steps: [
        {
          title: 'Step 1: Visualize the matrix',
          description: '2×2 matrix for determinant calculation',
          details: `Matrix M:\n[${m1[0][0]}, ${m1[0][1]}]\n[${m1[1][0]}, ${m1[1][1]}]`,
        },
        {
          title: 'Step 2: Multiply main diagonal',
          description: 'Top-left × Bottom-right',
          details: `a × d = ${m1[0][0]} × ${m1[1][1]} = ${ad}`,
          result: ad,
        },
        {
          title: 'Step 3: Multiply anti-diagonal',
          description: 'Top-right × Bottom-left',
          details: `b × c = ${m1[0][1]} × ${m1[1][0]} = ${bc}`,
          result: bc,
        },
        {
          title: 'Step 4: Subtract',
          description: 'Main diagonal - Anti-diagonal',
          details: `det(M) = ad - bc = ${ad} - ${bc} = ${result.toFixed(2)}`,
          result: result.toFixed(2),
        },
      ],
    };
  } else if (matrixSize === '3x3') {
    const a = m1[0][0], b = m1[0][1], c = m1[0][2];
    const d = m1[1][0], e = m1[1][1], f = m1[1][2];
    const g = m1[2][0], h = m1[2][1], i = m1[2][2];
    
    const ei_fh = e*i - f*h;
    const di_fg = d*i - f*g;
    const dh_eg = d*h - e*g;
    
    const cofactor_a = a * ei_fh;
    const cofactor_b = -b * di_fg;
    const cofactor_c = c * dh_eg;
    
    return {
      steps: [
        {
          title: 'Step 1: Visualize the matrix',
          description: '3×3 matrix for determinant calculation using cofactor expansion',
          details: `Matrix M:\n[${a}, ${b}, ${c}]\n[${d}, ${e}, ${f}]\n[${g}, ${h}, ${i}]`,
        },
        {
          title: 'Step 2: Calculate cofactor for a₁₁',
          description: 'a × det([[e,f],[h,i]])',
          details: `Cofactor = ${a} × (${e}×${i} - ${f}×${h}) = ${a} × ${ei_fh} = ${cofactor_a}`,
          result: cofactor_a,
        },
        {
          title: 'Step 3: Calculate cofactor for a₁₂',
          description: '-b × det([[d,f],[g,i]])',
          details: `Cofactor = -${b} × (${d}×${i} - ${f}×${g}) = -${b} × ${di_fg} = ${cofactor_b}`,
          result: cofactor_b,
        },
        {
          title: 'Step 4: Calculate cofactor for a₁₃',
          description: 'c × det([[d,e],[g,h]])',
          details: `Cofactor = ${c} × (${d}×${h} - ${e}×${g}) = ${c} × ${dh_eg} = ${cofactor_c}`,
          result: cofactor_c,
        },
        {
          title: 'Step 5: Sum all cofactors',
          description: 'det(M) = cofactor₁₁ + cofactor₁₂ + cofactor₁₃',
          details: `det(M) = ${cofactor_a} + ${cofactor_b} + ${cofactor_c} = ${result.toFixed(2)}`,
          result: result.toFixed(2),
        },
      ],
    };
  }
  return null;
};

