import React from 'react';

const Engine2DModuleSelector = ({ currentModule, setCurrentModule, currentStep, setCurrentStep }) => {
  const modules = [
    { id: 'setup', name: '0. Project Setup', description: 'Vite.js setup & project structure' },
    { id: 'core', name: '1. Core', description: 'Canvas initialization & main loop' },
    { id: 'renderer', name: '2. Renderer', description: 'Drawing shapes, sprites & text' },
    { id: 'scene', name: '3. Scene', description: 'Entity management & hierarchy' },
    { id: 'entity', name: '4. Entity', description: 'Base class for drawable objects' },
    { id: 'input', name: '5. Input', description: 'Mouse/touch event handling' },
    { id: 'utils', name: '6. Utils', description: 'Math helpers & timing tools' },
    { id: 'assetloader', name: '7. AssetLoader', description: 'Load images & textures' },
    { id: 'sprite', name: '8. Sprite', description: 'Sprite & animation system' },
    { id: 'effects', name: '9. Effects & Shaders', description: 'Blend modes, filters & post-processing' },
    { id: 'font', name: '10. Font Loader', description: 'Load & use custom fonts' },
    { id: 'tweening', name: '11. Tweening & Animation', description: 'Smooth property animations & easing' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-purple-900 mb-4">Engine Modules</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => {
              setCurrentModule(module.id);
              setCurrentStep(1);
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentModule === module.id
                ? 'border-purple-600 bg-purple-50 text-purple-900'
                : 'border-gray-200 hover:border-purple-300 text-gray-700'
            }`}
          >
            <div className="font-semibold mb-1">{module.name}</div>
            <div className="text-xs text-gray-600">{module.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Engine2DModuleSelector;

