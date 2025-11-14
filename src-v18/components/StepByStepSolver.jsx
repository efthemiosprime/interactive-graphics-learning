import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function StepByStepSolver({ steps, explanation }) {
  const [expanded, setExpanded] = useState(true);

  if (!steps || steps.length === 0) {
    return (
      <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
        <p className="text-sm text-indigo-700">{explanation || 'Select an operation to see step-by-step solution'}</p>
      </div>
    );
  }

  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-3 text-left"
      >
        <p className="text-xs font-semibold text-indigo-700 uppercase">
          Step-by-Step Solution {expanded ? `(${steps.length} steps)` : ''}
        </p>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-indigo-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-indigo-600" />
        )}
      </button>

      {expanded && (
        <div className="space-y-3">
          {explanation && (
            <div className="bg-white p-3 rounded border border-indigo-200">
              <p className="text-sm font-medium text-indigo-900">{explanation}</p>
            </div>
          )}
          
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-3 rounded border border-indigo-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  {step.title && (
                    <p className="text-sm font-semibold text-indigo-900 mb-1">{step.title}</p>
                  )}
                  {step.formula && (
                    <p className="text-xs font-mono text-indigo-700 bg-indigo-50 p-2 rounded mb-2">
                      {step.formula}
                    </p>
                  )}
                  {step.description && (
                    <p className="text-sm text-gray-700 mb-1">{step.description}</p>
                  )}
                  {step.calculation && (
                    <p className="text-sm font-mono text-indigo-800 bg-indigo-50 p-2 rounded">
                      {step.calculation}
                    </p>
                  )}
                  {step.result !== undefined && (
                    <p className="text-sm font-semibold text-indigo-900 mt-2">
                      = <span className="text-lg">{typeof step.result === 'number' ? step.result.toFixed(2) : step.result}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

