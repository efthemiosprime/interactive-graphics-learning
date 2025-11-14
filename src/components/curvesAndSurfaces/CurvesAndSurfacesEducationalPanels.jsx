import React from 'react';
import StepByStepSolver from '../StepByStepSolver';
import { getCurveTheory } from '../../utils/curvesAndSurfacesTheory';
import { getCurveFormulas } from '../../utils/curvesAndSurfacesFormulas';
import { getCurveMathConcepts } from '../../utils/curvesAndSurfacesMathConcepts';
import { getCurveStepByStep } from '../../utils/curvesAndSurfacesStepByStep';
import CurvesAndSurfacesCodeDisplay from './CurvesAndSurfacesCodeDisplay';

const CurvesAndSurfacesEducationalPanels = ({
  curveType,
  bezierPoints,
  bezierDegree,
  bSplinePoints,
  bSplineDegree,
  hermitePoints,
  hermiteTangents,
  catmullRomPoints,
  nurbsPoints,
  surfacePoints
}) => {
  const theory = getCurveTheory(curveType);
  const mathConcepts = getCurveMathConcepts(curveType);
  
  // Get formulas with current parameter values
  let formulaParams = null;
  if (curveType === 'bezier') {
    formulaParams = { degree: bezierDegree, numPoints: bezierPoints.length };
  } else if (curveType === 'bspline') {
    formulaParams = { degree: bSplineDegree, numPoints: bSplinePoints.length };
  } else if (curveType === 'hermite') {
    formulaParams = { numPoints: hermitePoints.length };
  } else if (curveType === 'catmullrom') {
    formulaParams = { numPoints: catmullRomPoints.length };
  } else if (curveType === 'nurbs') {
    formulaParams = { degree: nurbsDegree, numPoints: nurbsPoints.length };
  }
  
  const formulas = getCurveFormulas(curveType, formulaParams);
  
  // Get step-by-step explanation (use same params as formulas)
  const stepByStep = getCurveStepByStep(curveType, formulaParams);

  return (
    <div className="space-y-6">
      {/* Theory Panel */}
      {theory && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-purple-900 mb-4">Theory</h3>
          <p className="text-gray-700 mb-4">{theory.description}</p>
          
          <div className="space-y-4">
            {theory.concepts && theory.concepts.map((concept, idx) => (
              <div key={idx} className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">{concept.name}</h4>
                <p className="text-gray-700 mb-2">{concept.description}</p>
                {concept.formula && (
                  <pre className="text-sm bg-gray-800 text-green-400 p-2 rounded block overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                    <code>{concept.formula}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>

          {theory.geometricMeaning && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Geometric Meaning</h4>
              <p className="text-gray-700">{theory.geometricMeaning}</p>
            </div>
          )}

          {theory.applications && (
            <div className="mt-4 bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Applications</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {theory.applications.map((app, idx) => (
                  <li key={idx}>{app}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Mathematical Concepts Panel */}
      {mathConcepts && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-purple-900 mb-4">Mathematical Concepts Used</h3>
          <div className="space-y-3">
            {mathConcepts.map((concept, idx) => (
              <div key={idx} className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-1">{concept.name}</h4>
                <p className="text-sm text-gray-700">{concept.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formulas Panel */}
      {formulas && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-purple-900 mb-4">{formulas.title}</h3>
          <div className="space-y-4">
            {formulas.formulas && formulas.formulas.map((formula, idx) => (
              <div key={idx} className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">{formula.name}</h4>
                <p className="text-gray-700 mb-2">{formula.description}</p>
                <pre className="text-sm bg-gray-800 text-green-400 p-2 rounded block overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                  <code>{formula.formula}</code>
                </pre>
                {formula.values && (
                  <p className="text-sm text-purple-700 mt-2 font-mono">{formula.values}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step-by-Step Panel */}
      {stepByStep && (
        <StepByStepSolver
          steps={stepByStep.steps}
          explanation={stepByStep.explanation}
        />
      )}

      {/* Code Display */}
      <CurvesAndSurfacesCodeDisplay curveType={curveType} />
    </div>
  );
};

export default CurvesAndSurfacesEducationalPanels;

