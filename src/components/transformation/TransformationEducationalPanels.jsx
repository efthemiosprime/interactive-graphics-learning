import React from 'react';
import StepByStepSolver from '../StepByStepSolver';
import { getTransformationTheory } from '../../utils/transformationTheory';
import { getTransformationFormulas } from '../../utils/transformationFormulas';
import { getTransformationMathConcepts } from '../../utils/transformationMathConcepts';
import { getTransformationStepByStep } from '../../utils/transformationStepByStep';
import { getTransformationPrerequisites } from '../../utils/transformationPrerequisites';
import { getTransformationCommonPitfalls } from '../../utils/transformationCommonPitfalls';
import { getTransformationGlossary } from '../../utils/transformationGlossary';
import { getTransformationBestPractices } from '../../utils/transformationBestPractices';
import { getTransformationDebuggingTips } from '../../utils/transformationDebuggingTips';

const TransformationEducationalPanels = ({
  currentModule,
  currentStep
}) => {
  const theory = getTransformationTheory(currentModule, currentStep);
  const mathConcepts = getTransformationMathConcepts(currentModule, currentStep);
  const formulas = getTransformationFormulas(currentModule, currentStep);
  const stepByStep = getTransformationStepByStep(currentModule, currentStep);
  const prerequisites = getTransformationPrerequisites(currentModule, currentStep);
  const pitfalls = getTransformationCommonPitfalls(currentModule, currentStep);
  const glossary = getTransformationGlossary(currentModule, currentStep);
  const bestPractices = getTransformationBestPractices(currentModule, currentStep);
  const debuggingTips = getTransformationDebuggingTips(currentModule, currentStep);

  return (
    <div className="space-y-6">
      {/* Theory Panel */}
      {theory && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">{theory.title}</h3>
          <p className="text-gray-700 mb-4">{theory.description}</p>
          
          <div className="space-y-4">
            {theory.concepts && theory.concepts.map((concept, idx) => (
              <div key={idx} className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">{concept.name}</h4>
                <p className="text-gray-700 mb-2">{concept.description}</p>
                {concept.formula && (
                  <pre className="text-sm bg-gray-800 text-green-400 p-2 rounded block overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                    <code>{concept.formula}</code>
                  </pre>
                )}
                {concept.code && (
                  <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded block overflow-x-auto mt-2" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                    <code>{concept.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>

          {theory.geometricMeaning && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">How It Works</h4>
              <p className="text-gray-700">{theory.geometricMeaning}</p>
            </div>
          )}

          {theory.applications && (
            <div className="mt-4 bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Use Cases</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {theory.applications.map((app, idx) => (
                  <li key={idx}>{app}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Prerequisites Panel */}
      {prerequisites && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">{prerequisites.title}</h3>
          
          {prerequisites.required && prerequisites.required.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-red-700 mb-2">Required Knowledge:</h4>
              <div className="space-y-3">
                {prerequisites.required.map((req, idx) => (
                  <div key={idx} className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                    <h5 className="font-semibold text-red-900 mb-1">{req.skill}</h5>
                    <p className="text-sm text-gray-700 mb-1">{req.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-red-600 font-medium">Level: {req.level}</span>
                      {req.resources && <span className="text-gray-600">• {req.resources}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {prerequisites.recommended && prerequisites.recommended.length > 0 && (
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Recommended (Optional):</h4>
              <div className="space-y-2">
                {prerequisites.recommended.map((rec, idx) => (
                  <div key={idx} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                    <h5 className="font-semibold text-blue-900 mb-1">{rec.skill}</h5>
                    <p className="text-sm text-gray-700 mb-1">{rec.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-blue-600 font-medium">Level: {rec.level}</span>
                      {rec.resources && <span className="text-gray-600">• {rec.resources}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mathematical Concepts Panel */}
      {mathConcepts && mathConcepts.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Mathematical Concepts Used</h3>
          <div className="space-y-3">
            {mathConcepts.map((concept, idx) => (
              <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-1">{concept.name}</h4>
                <p className="text-sm text-gray-700">{concept.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formulas Panel */}
      {formulas && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">{formulas.title}</h3>
          <div className="space-y-4">
            {formulas.formulas && formulas.formulas.map((formula, idx) => (
              <div key={idx} className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">{formula.name}</h4>
                <p className="text-gray-700 mb-2">{formula.description}</p>
                <pre className="text-sm bg-gray-800 text-green-400 p-2 rounded block overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                  <code>{formula.formula}</code>
                </pre>
                {formula.values && (
                  <p className="text-sm text-blue-700 mt-2 font-mono">{formula.values}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Pitfalls Panel */}
      {pitfalls && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">{pitfalls.title}</h3>
          <div className="space-y-4">
            {pitfalls.pitfalls && pitfalls.pitfalls.map((pitfall, idx) => (
              <div key={idx} className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-900 mb-2">⚠️ {pitfall.issue}</h4>
                <div className="mb-2">
                  <span className="text-xs font-semibold text-yellow-800">Cause:</span>
                  <p className="text-sm text-gray-700">{pitfall.cause}</p>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-semibold text-green-800">Solution:</span>
                  <p className="text-sm text-gray-700">{pitfall.solution}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-800">Prevention:</span>
                  <p className="text-sm text-gray-700">{pitfall.prevention}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Glossary Panel */}
      {glossary && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">{glossary.title}</h3>
          <div className="space-y-3">
            {glossary.terms && glossary.terms.map((term, idx) => (
              <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-1">{term.term}</h4>
                <p className="text-sm text-gray-700 mb-2">{term.definition}</p>
                {term.example && (
                  <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded block overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                    <code>{term.example}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices Panel */}
      {bestPractices && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">{bestPractices.title}</h3>
          <div className="space-y-3">
            {bestPractices.practices && bestPractices.practices.map((practice, idx) => (
              <div key={idx} className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-900 mb-1">✓ {practice.practice}</h4>
                <p className="text-sm text-gray-700 mb-2">{practice.description}</p>
                {practice.example && (
                  <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded block overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                    <code>{practice.example}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Debugging Tips Panel */}
      {debuggingTips && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">{debuggingTips.title}</h3>
          <div className="space-y-3">
            {debuggingTips.tips && debuggingTips.tips.map((tip, idx) => (
              <div key={idx} className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-900 mb-1">🔍 {tip.tip}</h4>
                <p className="text-sm text-gray-700 mb-2">{tip.description}</p>
                {tip.example && (
                  <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded block overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
                    <code>{tip.example}</code>
                  </pre>
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
    </div>
  );
};

export default TransformationEducationalPanels;

