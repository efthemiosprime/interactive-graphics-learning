import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function VisualDecomposition({ decomposition, mode, selectedOperation }) {
  const [expanded, setExpanded] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  // Reset to first step when decomposition changes
  // Use a more comprehensive dependency that includes the actual content
  const decompositionString = JSON.stringify(decomposition?.steps?.map(s => ({ 
    title: s.title, 
    result: s.result, 
    details: s.details 
  })));
  
  useEffect(() => {
    setCurrentStep(0);
  }, [decompositionString]);

  if (!decomposition) {
    return null;
  }
  if (!decomposition.steps || decomposition.steps.length === 0) {
    return null;
  }

  const steps = decomposition.steps;
  const hasMultipleSteps = steps.length > 1;
  
  // Create a unique key based on decomposition content to force re-render
  // Include details and result to catch matrix value changes
  const decompositionKey = JSON.stringify(decomposition.steps.map(s => ({ 
    title: s.title, 
    result: s.result,
    details: s.details 
  })));

  return (
    <div key={decompositionKey} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg shadow-lg p-4 mb-4 border-2 border-purple-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-3 text-left"
      >
        <h3 className="text-lg font-bold text-purple-900">
          Visual Decomposition {expanded && hasMultipleSteps ? `(${steps.length} steps)` : ''}
        </h3>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-purple-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-purple-600" />
        )}
      </button>

      {expanded && (
        <div className="space-y-4">
          {hasMultipleSteps && (
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-3 py-1 bg-purple-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
              >
                ← Prev
              </button>
              <span className="text-sm font-semibold text-purple-800">
                Step {currentStep + 1} of {steps.length}
              </span>
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="px-3 py-1 bg-purple-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
              >
                Next →
              </button>
            </div>
          )}

          {steps.map((step, index) => {
            if (hasMultipleSteps && index !== currentStep) return null;

            // Create a unique key for each step that includes its content
            const stepKey = `${index}-${step.result || ''}-${step.details || ''}`;

            return (
              <div key={stepKey} className="bg-white rounded-lg p-4 border-2 border-purple-200">
                {step.title && (
                  <h4 className="text-md font-semibold text-purple-900 mb-2">{step.title}</h4>
                )}
                {step.description && (
                  <p className="text-sm text-gray-700 mb-3">{step.description}</p>
                )}
                
                {/* SVG Visualization */}
                {step.svg && (
                  <div key={`svg-wrapper-${stepKey}`} className="mb-3">
                    <svg 
                      key={`svg-${stepKey}-${decompositionString}`}
                      width="100%" 
                      height={step.height || 300} 
                      viewBox={step.viewBox || "0 0 300 300"} 
                      className="border-2 border-purple-300 rounded-lg bg-white"
                    >
                      {Array.isArray(step.svg) ? step.svg.map((element, idx) => {
                        // Create a unique key that includes the step key and decomposition string
                        const elementKey = `${stepKey}-${decompositionString}-elem-${idx}`;
                        return React.cloneElement(element, { key: elementKey });
                      }) : step.svg}
                    </svg>
                  </div>
                )}

                {/* Step details */}
                {step.details && (
                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                    <p className="text-sm text-purple-800 whitespace-pre-line font-mono">
                      {step.details}
                    </p>
                  </div>
                )}

                {/* Result */}
                {step.result !== undefined && (
                  <div className="mt-3 pt-3 border-t border-purple-200">
                    <p className="text-sm font-semibold text-purple-900">
                      Result: <span className="text-lg font-mono text-purple-700">
                        {typeof step.result === 'number' 
                          ? step.result.toFixed(2) 
                          : step.result}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {hasMultipleSteps && (
            <div className="flex justify-center gap-2 mt-4">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentStep 
                      ? 'bg-purple-600' 
                      : 'bg-purple-300 hover:bg-purple-400'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

