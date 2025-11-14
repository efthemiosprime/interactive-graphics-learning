import React from 'react';

const TransformationModuleSelector = ({
  currentModule,
  setCurrentModule,
  currentStep,
  setCurrentStep
}) => {
  const modules = [
    { 
      id: 'matrix-operations', 
      name: 'Matrix Operations', 
      description: 'Addition, subtraction, multiplication',
      icon: '🔢'
    },
    { 
      id: 'scaling', 
      name: 'Scaling', 
      description: 'Uniform and non-uniform scaling',
      icon: '📏'
    },
    { 
      id: 'translation', 
      name: 'Translation', 
      description: 'Moving objects in 2D/3D space',
      icon: '↔️'
    },
    { 
      id: 'rotation', 
      name: 'Rotation', 
      description: '2D and 3D rotations',
      icon: '🔄'
    },
    { 
      id: 'reflection', 
      name: 'Reflection', 
      description: 'Mirror transformations',
      icon: '🪞'
    },
    { 
      id: 'quaternions', 
      name: 'Quaternions', 
      description: '3D rotation without gimbal lock',
      icon: '🌀'
    },
    { 
      id: 'projection', 
      name: 'Projections', 
      description: 'Perspective and orthographic',
      icon: '📐'
    },
    { 
      id: 'combined', 
      name: 'Combined Transformations', 
      description: 'Multiple transformations together',
      icon: '🔀'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Select Module</h2>
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
                ? 'border-blue-600 bg-blue-50 text-blue-900'
                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="text-2xl mb-2">{module.icon}</div>
            <div className="font-semibold text-sm mb-1">{module.name}</div>
            <div className="text-xs text-gray-600">{module.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransformationModuleSelector;

