import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Engine2DModuleSelector from '../components/engine2D/Engine2DModuleSelector';
import Engine2DDemo from '../components/engine2D/Engine2DDemo';
import Engine2DEducationalPanels from '../components/engine2D/Engine2DEducationalPanels';
import Engine2DCodeDisplay from '../components/engine2D/Engine2DCodeDisplay';

export default function Engine2DTutorial() {
  const [currentModule, setCurrentModule] = useState('setup');
  const [currentStep, setCurrentStep] = useState(1);
  
  // Setup module has 10 steps (project setup + 9 modules), others have 6
  const maxSteps = currentModule === 'setup' ? 10 : 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-purple-900 mb-2">2D Engine Tutorial</h1>
            <p className="text-purple-700">Build a complete 2D game engine from scratch - step by step</p>
          </div>
        </div>

        {/* Module Selector */}
        <Engine2DModuleSelector
          currentModule={currentModule}
          setCurrentModule={setCurrentModule}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />

        {/* Live Demo - Full Width */}
        <div className="mb-8">
          <Engine2DDemo
            currentModule={currentModule}
            currentStep={currentStep}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Code */}
          <div className="space-y-6">
            {/* Step Navigation */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-purple-900 mb-4">Tutorial Steps</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700"
                >
                  Previous Step
                </button>
                <span className="text-gray-700 font-semibold">
                  Step {currentStep} of {maxSteps}
                </span>
                <button
                  onClick={() => setCurrentStep(Math.min(maxSteps, currentStep + 1))}
                  disabled={currentStep === maxSteps}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700"
                >
                  Next Step
                </button>
              </div>
            </div>

            {/* Implementation Code */}
            <Engine2DCodeDisplay
              currentModule={currentModule}
              currentStep={currentStep}
            />
          </div>

          {/* Right Column - Educational Content */}
          <div>
            <Engine2DEducationalPanels
              currentModule={currentModule}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

