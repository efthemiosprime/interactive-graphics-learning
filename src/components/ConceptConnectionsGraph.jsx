import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Network } from 'lucide-react';

export default function ConceptConnectionsGraph({ mode, selectedOperation, transform3dType }) {
  const [expanded, setExpanded] = useState(true);

  const getConceptGraph = () => {
    if (mode === 'vector') {
      const concepts = {
        'addition': {
          name: 'Vector Addition',
          related: ['subtraction', 'dotproduct', 'magnitude', 'normalize'],
          description: 'Component-wise addition'
        },
        'subtraction': {
          name: 'Vector Subtraction',
          related: ['addition', 'dotproduct', 'magnitude'],
          description: 'Component-wise subtraction'
        },
        'dotproduct': {
          name: 'Dot Product',
          related: ['addition', 'magnitude', 'angle2d', 'projection2d'],
          description: 'Scalar product of vectors'
        },
        'magnitude': {
          name: 'Magnitude',
          related: ['dotproduct', 'normalize', 'addition', 'subtraction'],
          description: 'Length of vector'
        },
        'normalize': {
          name: 'Normalize',
          related: ['magnitude', 'addition'],
          description: 'Unit vector'
        },
        'cross': {
          name: 'Cross Product',
          related: ['dotproduct', 'magnitude'],
          description: 'Perpendicular vector'
        },
        'angle2d': {
          name: 'Angle Between',
          related: ['dotproduct', 'magnitude'],
          description: 'Angle calculation'
        },
        'projection2d': {
          name: 'Projection',
          related: ['dotproduct', 'magnitude'],
          description: 'Vector projection'
        },
        'reflection': {
          name: 'Reflection',
          related: ['projection2d', 'dotproduct'],
          description: 'Reflect across axis'
        },
        'perpendicular': {
          name: 'Perpendicular',
          related: ['cross', 'dotproduct'],
          description: 'Perpendicular vector'
        }
      };

      return {
        current: concepts[selectedOperation] || concepts['addition'],
        all: concepts
      };
    } else if (mode === 'matrix') {
      const concepts = {
        'addition': {
          name: 'Matrix Addition',
          related: ['subtraction', 'multiply', 'transpose'],
          description: 'Element-wise addition'
        },
        'subtraction': {
          name: 'Matrix Subtraction',
          related: ['addition', 'multiply'],
          description: 'Element-wise subtraction'
        },
        'multiply': {
          name: 'Matrix Multiplication',
          related: ['addition', 'determinant', 'inverse', 'transpose', 'apply', 'eigenvalues'],
          description: 'Row × Column multiplication'
        },
        'determinant': {
          name: 'Determinant',
          related: ['multiply', 'inverse', 'eigenvalues'],
          description: 'Scalar value'
        },
        'transpose': {
          name: 'Transpose',
          related: ['multiply', 'addition', 'inverse'],
          description: 'Flip rows and columns'
        },
        'apply': {
          name: 'Apply to Vector',
          related: ['multiply', 'transpose', 'eigenvalues'],
          description: 'Transform vector'
        },
        'inverse': {
          name: 'Inverse',
          related: ['multiply', 'determinant'],
          description: 'Inverse matrix'
        },
        'eigenvalues': {
          name: 'Eigenvalues & Eigenvectors',
          related: ['determinant', 'multiply', 'apply', 'rank'],
          description: 'Invariant directions and scaling'
        },
        'rank': {
          name: 'Matrix Rank',
          related: ['determinant', 'eigenvalues', 'inverse'],
          description: 'Dimension of transformation'
        }
      };

      return {
        current: concepts[selectedOperation] || concepts['addition'],
        all: concepts
      };
    } else if (mode === '3d') {
      const concepts = {
        'rotation': {
          name: 'Rotation',
          related: ['translation', 'scale'],
          description: 'Rotate around axes'
        },
        'translation': {
          name: 'Translation',
          related: ['rotation', 'scale'],
          description: 'Move in space'
        },
        'scale': {
          name: 'Scale',
          related: ['rotation', 'translation'],
          description: 'Resize object'
        }
      };

      return {
        current: concepts[transform3dType] || concepts['rotation'],
        all: concepts
      };
    } else if (mode === 'advanced') {
      const concepts = {
        'crossproduct3d': {
          name: '3D Cross Product',
          related: ['dotproduct3d', 'magnitude3d', 'projection'],
          description: 'Perpendicular vector'
        },
        'dotproduct3d': {
          name: '3D Dot Product',
          related: ['crossproduct3d', 'magnitude3d', 'angle', 'projection'],
          description: 'Scalar product'
        },
        'projection': {
          name: 'Vector Projection',
          related: ['dotproduct3d', 'magnitude3d'],
          description: 'Project onto vector'
        },
        'angle': {
          name: 'Angle Between',
          related: ['dotproduct3d', 'magnitude3d'],
          description: 'Angle calculation'
        },
        'magnitude3d': {
          name: '3D Magnitude',
          related: ['dotproduct3d', 'normalize3d'],
          description: 'Length of 3D vector'
        },
        'normalize3d': {
          name: 'Normalize 3D',
          related: ['magnitude3d', 'dotproduct3d'],
          description: 'Unit vector'
        }
      };

      return {
        current: concepts[selectedOperation] || concepts['crossproduct3d'],
        all: concepts
      };
    }
    return null;
  };

  const graphData = getConceptGraph();

  if (!graphData) {
    return null;
  }

  const { current, all } = graphData;
  const relatedConcepts = current.related.map(key => all[key]).filter(Boolean);

  // Create nodes and edges for visualization
  const nodes = [
    { id: 'current', label: current.name, type: 'current' },
    ...relatedConcepts.map((concept, idx) => ({
      id: `related-${idx}`,
      label: concept.name,
      type: 'related'
    }))
  ];

  const edges = relatedConcepts.map((_, idx) => ({
    from: 'current',
    to: `related-${idx}`
  }));

  // Simple SVG graph layout
  const centerX = 150;
  const centerY = 150;
  const radius = 80;
  const nodeRadius = 30;

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-lg p-4 mb-4 border-2 border-orange-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-3 text-left"
      >
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-bold text-orange-900">
            Concept Connections
          </h3>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-orange-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-orange-600" />
        )}
      </button>

      {expanded && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-orange-200">
            <p className="text-sm text-gray-700 mb-4">
              <strong className="text-orange-900">{current.name}</strong> is connected to these related concepts:
            </p>
            
            <svg width="100%" height="300" viewBox="0 0 300 300" className="border-2 border-orange-300 rounded-lg bg-white">
              {/* Center node (current concept) */}
              <circle
                cx={centerX}
                cy={centerY}
                r={nodeRadius}
                fill="#f97316"
                stroke="#ea580c"
                strokeWidth="3"
                className="drop-shadow-md"
              />
              <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fill="white"
                fontWeight="bold"
                className="pointer-events-none"
              >
                {current.name.split(' ')[0]}
              </text>
              
              {/* Related nodes */}
              {relatedConcepts.map((concept, idx) => {
                const angle = (idx * 2 * Math.PI) / relatedConcepts.length - Math.PI / 2;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                
                return (
                  <g key={idx}>
                    {/* Edge */}
                    <line
                      x1={centerX}
                      y1={centerY}
                      x2={x}
                      y2={y}
                      stroke="#fb923c"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      opacity="0.6"
                    />
                    
                    {/* Node */}
                    <circle
                      cx={x}
                      cy={y}
                      r={nodeRadius - 5}
                      fill="#fed7aa"
                      stroke="#f97316"
                      strokeWidth="2"
                      className="drop-shadow-sm"
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="9"
                      fill="#9a3412"
                      fontWeight="semibold"
                      className="pointer-events-none"
                    >
                      {concept.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
                <span className="font-semibold text-orange-900">Current Concept: {current.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-orange-200 rounded-full border-2 border-orange-400"></div>
                <span className="text-gray-700">Related Concepts</span>
              </div>
              
              <div className="mt-3 pt-3 border-t border-orange-200">
                <p className="text-xs font-semibold text-orange-800 mb-2">Connections:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {relatedConcepts.map((concept, idx) => (
                    <div key={idx} className="bg-orange-50 p-2 rounded border border-orange-200">
                      <p className="font-semibold text-orange-900">{concept.name}</p>
                      <p className="text-gray-600 text-xs">{concept.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

