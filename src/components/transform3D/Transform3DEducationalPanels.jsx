import React from 'react';
import MathConceptsPanel from '../shader/MathConceptsPanel';
import FormulaReferencePanel from '../shader/FormulaReferencePanel';
import StepByStepSolver from '../StepByStepSolver';
import Transform3DCodeDisplay from './Transform3DCodeDisplay';
import { getTransformMathConcepts } from '../../utils/transform3DMathConcepts';
import { getTransformFormulas } from '../../utils/transform3DFormulas';
import { getTransformTheory } from '../../utils/transform3DTheory';
import { getTransformStepByStep } from '../../utils/transform3DStepByStep';

const Transform3DEducationalPanels = ({
  transformType,
  rotation,
  translation,
  scaling,
  perspectiveParams,
  orthographicParams,
  quaternion,
  cameraEye,
  cameraTarget,
  cameraUp
}) => {
  const theory = getTransformTheory(transformType);
  const mathConcepts = getTransformMathConcepts(transformType);
  
  // Get formulas with current parameter values
  let formulaParams = null;
  if (transformType === 'rotation') {
    formulaParams = { rx: rotation.x, ry: rotation.y, rz: rotation.z };
  } else if (transformType === 'translation') {
    formulaParams = { tx: translation.x, ty: translation.y, tz: translation.z };
  } else if (transformType === 'scaling') {
    formulaParams = { sx: scaling.x, sy: scaling.y, sz: scaling.z };
  } else if (transformType === 'projection') {
    formulaParams = { ...perspectiveParams, ...orthographicParams, projectionType: perspectiveParams ? 'perspective' : 'orthographic' };
  } else if (transformType === 'camera') {
    formulaParams = { eye: cameraEye, target: cameraTarget, up: cameraUp };
  } else if (transformType === 'quaternions') {
    formulaParams = { w: quaternion.w, x: quaternion.x, y: quaternion.y, z: quaternion.z };
  }
  
  const formulas = getTransformFormulas(transformType, formulaParams);
  
  // Get step-by-step explanation
  let stepByStepParams = null;
  if (transformType === 'rotation') {
    stepByStepParams = { rx: rotation.x, ry: rotation.y, rz: rotation.z };
  } else if (transformType === 'translation') {
    stepByStepParams = { tx: translation.x, ty: translation.y, tz: translation.z };
  } else if (transformType === 'scaling') {
    stepByStepParams = { sx: scaling.x, sy: scaling.y, sz: scaling.z };
  } else if (transformType === 'projection') {
    // Determine projection type based on which params exist
    const projectionType = perspectiveParams && perspectiveParams.fov !== undefined ? 'perspective' : 'orthographic';
    stepByStepParams = { 
      projectionType: projectionType,
      ...(projectionType === 'perspective' ? perspectiveParams : {}),
      ...(projectionType === 'orthographic' ? orthographicParams : {})
    };
  } else if (transformType === 'quaternions') {
    stepByStepParams = { w: quaternion.w, x: quaternion.x, y: quaternion.y, z: quaternion.z };
  } else if (transformType === 'camera') {
    stepByStepParams = { eye: cameraEye, target: cameraTarget, up: cameraUp };
  }
  
  const stepByStep = getTransformStepByStep(transformType, stepByStepParams);

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
                <code className="text-sm bg-gray-800 text-green-400 p-2 rounded block">{concept.formula}</code>
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
            <div className="mt-4">
              <h4 className="font-semibold text-purple-900 mb-2">Applications</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {theory.applications.map((app, idx) => (
                  <li key={idx}>{app}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Mathematical Concepts */}
      {mathConcepts && (
        <MathConceptsPanel
          mathConcepts={mathConcepts}
        />
      )}

      {/* Formula Reference */}
      {formulas && (
        <FormulaReferencePanel
          formulas={formulas}
        />
      )}

      {/* Step-by-Step Panel */}
      {stepByStep && (
        <StepByStepSolver
          steps={stepByStep.steps}
          explanation={stepByStep.explanation}
        />
      )}

      {/* Code Snippet */}
      <Transform3DCodeDisplay
        transformType={transformType}
        rotation={rotation}
        translation={translation}
        scaling={scaling}
        perspectiveParams={perspectiveParams}
        orthographicParams={orthographicParams}
        cameraEye={cameraEye}
      />
    </div>
  );
};

export default Transform3DEducationalPanels;

