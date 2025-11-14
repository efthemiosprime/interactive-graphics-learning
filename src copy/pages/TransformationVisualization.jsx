import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TransformationModuleSelector from '../components/transformation/TransformationModuleSelector';
import TransformationDemo from '../components/transformation/TransformationDemo';
import TransformationEducationalPanels from '../components/transformation/TransformationEducationalPanels';
import TransformationControls from '../components/transformation/TransformationControls';
import TransformationMatrixDisplay from '../components/transformation/TransformationMatrixDisplay';
import TransformationCodeDisplay from '../components/transformation/TransformationCodeDisplay';
import { getTransformationMatrix } from '../utils/transformationUtils';

export default function TransformationVisualization() {
  const [currentModule, setCurrentModule] = useState('matrix-operations');
  const [currentStep, setCurrentStep] = useState(1);
  
  // Matrix operations: 6 steps, Transformations: 6 steps each
  const maxSteps = 6;

  // Interactive control states
  const [scaleX, setScaleX] = useState(1.0);
  const [scaleY, setScaleY] = useState(1.0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [reflectionAxis, setReflectionAxis] = useState('x');
  
  // Quaternion states
  const [quaternionW, setQuaternionW] = useState(1);
  const [quaternionX, setQuaternionX] = useState(0);
  const [quaternionY, setQuaternionY] = useState(0);
  const [quaternionZ, setQuaternionZ] = useState(0);
  
  // Projection states
  const [projectionType, setProjectionType] = useState('perspective');
  const [fov, setFov] = useState(Math.PI / 4); // 45 degrees
  const [aspect, setAspect] = useState(1.0);
  const [near, setNear] = useState(0.1);
  const [far, setFar] = useState(100);
  const [orthoLeft, setOrthoLeft] = useState(-5);
  const [orthoRight, setOrthoRight] = useState(5);
  const [orthoBottom, setOrthoBottom] = useState(-5);
  const [orthoTop, setOrthoTop] = useState(5);
  const [orthoNear, setOrthoNear] = useState(-10);
  const [orthoFar, setOrthoFar] = useState(10);
  
  const [combinedScale, setCombinedScale] = useState(1.0);
  const [combinedRotation, setCombinedRotation] = useState(0);
  const [combinedTranslateX, setCombinedTranslateX] = useState(0);
  
  // Display options
  const [showGrid, setShowGrid] = useState(true);
  const [showOriginal, setShowOriginal] = useState(true);
  const [shapeType, setShapeType] = useState('square');

  // Get current transformation matrix
  const currentMatrix = getTransformationMatrix(
    currentModule,
    currentStep,
    {
      scaleX,
      scaleY,
      translateX,
      translateY,
      rotationAngle,
      reflectionAxis,
      quaternionW,
      quaternionX,
      quaternionY,
      quaternionZ,
      projectionType,
      fov,
      aspect,
      near,
      far,
      orthoLeft,
      orthoRight,
      orthoBottom,
      orthoTop,
      orthoNear,
      orthoFar,
      combinedScale,
      combinedRotation,
      combinedTranslateX
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-blue-900 mb-2">Transformation Visualization</h1>
            <p className="text-blue-700">Learn matrix operations and 2D/3D transformations with interactive WebGL visualizations</p>
          </div>
        </div>

        {/* Module Selector */}
        <TransformationModuleSelector
          currentModule={currentModule}
          setCurrentModule={setCurrentModule}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />

        {/* Main Content Grid */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Left Column - Demo and Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Demo - Full Width */}
            <TransformationDemo
              currentModule={currentModule}
              currentStep={currentStep}
              scaleX={scaleX}
              scaleY={scaleY}
              translateX={translateX}
              translateY={translateY}
              rotationAngle={rotationAngle}
              reflectionAxis={reflectionAxis}
              quaternionW={quaternionW}
              quaternionX={quaternionX}
              quaternionY={quaternionY}
              quaternionZ={quaternionZ}
              projectionType={projectionType}
              fov={fov}
              aspect={aspect}
              near={near}
              far={far}
              orthoLeft={orthoLeft}
              orthoRight={orthoRight}
              orthoBottom={orthoBottom}
              orthoTop={orthoTop}
              orthoNear={orthoNear}
              orthoFar={orthoFar}
              combinedScale={combinedScale}
              combinedRotation={combinedRotation}
              combinedTranslateX={combinedTranslateX}
              showGrid={showGrid}
              showOriginal={showOriginal}
              shapeType={shapeType}
            />

            {/* Step Navigation */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Tutorial Steps</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
                >
                  Previous Step
                </button>
                <span className="text-gray-700 font-semibold">
                  Step {currentStep} of {maxSteps}
                </span>
                <button
                  onClick={() => setCurrentStep(Math.min(maxSteps, currentStep + 1))}
                  disabled={currentStep === maxSteps}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
                >
                  Next Step
                </button>
              </div>
            </div>

            {/* Display Options - Always visible */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">Display Options</h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showGrid"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="showGrid" className="text-sm text-gray-700">
                    Show Grid & Axes
                  </label>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showOriginal"
                    checked={showOriginal}
                    onChange={(e) => setShowOriginal(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="showOriginal" className="text-sm text-gray-700">
                    Show Original Shape
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shape Type
                  </label>
                  <select
                    value={shapeType}
                    onChange={(e) => setShapeType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="square">Square</option>
                    <option value="triangle">Triangle</option>
                    <option value="circle">Circle</option>
                    <option value="arrow">Arrow</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Code Snippet */}
            <TransformationCodeDisplay
              currentModule={currentModule}
              currentStep={currentStep}
            />
          </div>

          {/* Right Column - Matrix Display and Educational Content */}
          <div className="space-y-6">
            {/* Matrix Display */}
            {currentMatrix && (
              <TransformationMatrixDisplay
                matrix={currentMatrix}
                module={currentModule}
                step={currentStep}
              />
            )}

            {/* Interactive Controls - Together with Matrix */}
            {currentModule !== 'matrix-operations' && (
              <TransformationControls
                currentModule={currentModule}
                currentStep={currentStep}
                scaleX={scaleX}
                setScaleX={setScaleX}
                scaleY={scaleY}
                setScaleY={setScaleY}
                translateX={translateX}
                setTranslateX={setTranslateX}
                translateY={translateY}
                setTranslateY={setTranslateY}
                rotationAngle={rotationAngle}
                setRotationAngle={setRotationAngle}
                reflectionAxis={reflectionAxis}
                setReflectionAxis={setReflectionAxis}
                quaternionW={quaternionW}
                setQuaternionW={setQuaternionW}
                quaternionX={quaternionX}
                setQuaternionX={setQuaternionX}
                quaternionY={quaternionY}
                setQuaternionY={setQuaternionY}
                quaternionZ={quaternionZ}
                setQuaternionZ={setQuaternionZ}
                projectionType={projectionType}
                setProjectionType={setProjectionType}
                fov={fov}
                setFov={setFov}
                aspect={aspect}
                setAspect={setAspect}
                near={near}
                setNear={setNear}
                far={far}
                setFar={setFar}
                orthoLeft={orthoLeft}
                setOrthoLeft={setOrthoLeft}
                orthoRight={orthoRight}
                setOrthoRight={setOrthoRight}
                orthoBottom={orthoBottom}
                setOrthoBottom={setOrthoBottom}
                orthoTop={orthoTop}
                setOrthoTop={setOrthoTop}
                orthoNear={orthoNear}
                setOrthoNear={setOrthoNear}
                orthoFar={orthoFar}
                setOrthoFar={setOrthoFar}
                combinedScale={combinedScale}
                setCombinedScale={setCombinedScale}
                combinedRotation={combinedRotation}
                setCombinedRotation={setCombinedRotation}
                combinedTranslateX={combinedTranslateX}
                setCombinedTranslateX={setCombinedTranslateX}
              />
            )}

            {/* Educational Content */}
            <TransformationEducationalPanels
              currentModule={currentModule}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

