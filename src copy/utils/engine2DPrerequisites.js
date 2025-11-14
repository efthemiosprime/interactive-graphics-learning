// Prerequisites and beginner guidance for 2D Engine Tutorial

export const getEngine2DPrerequisites = (module, step) => {
  const prerequisites = {
    setup: {
      1: {
        title: 'Prerequisites for Project Setup',
        required: [
          {
            skill: 'Basic JavaScript Knowledge',
            description: 'Understanding of variables, functions, objects, arrays, and ES6 syntax (const, let, arrow functions)',
            level: 'Beginner',
            resources: 'MDN JavaScript Guide, JavaScript.info'
          },
          {
            skill: 'Node.js & npm Basics',
            description: 'Node.js installed (v16+), understanding of npm commands (install, run)',
            level: 'Beginner',
            resources: 'nodejs.org, npm documentation'
          },
          {
            skill: 'Command Line Basics',
            description: 'Basic terminal/command prompt usage (cd, ls/dir, running commands)',
            level: 'Beginner',
            resources: 'Command line tutorial'
          },
          {
            skill: 'Text Editor',
            description: 'Code editor (VS Code recommended) with syntax highlighting',
            level: 'Beginner',
            resources: 'VS Code documentation'
          }
        ],
        recommended: [
          {
            skill: 'ES6 Modules',
            description: 'Understanding import/export syntax',
            level: 'Helpful',
            resources: 'MDN: ES6 Modules'
          },
          {
            skill: 'Git Basics',
            description: 'Version control for saving progress',
            level: 'Optional',
            resources: 'Git tutorial'
          }
        ]
      }
    },
    core: {
      1: {
        title: 'Prerequisites for Core Module',
        required: [
          {
            skill: 'HTML Canvas Basics',
            description: 'Understanding of HTML <canvas> element and getContext("2d")',
            level: 'Beginner',
            resources: 'MDN Canvas API'
          },
          {
            skill: 'JavaScript Classes',
            description: 'Class syntax, constructor, methods, this keyword',
            level: 'Beginner',
            resources: 'MDN: Classes'
          },
          {
            skill: 'requestAnimationFrame',
            description: 'Understanding of animation loops and requestAnimationFrame',
            level: 'Beginner',
            resources: 'MDN: requestAnimationFrame'
          }
        ],
        recommended: [
          {
            skill: 'Performance API',
            description: 'performance.now() for high-resolution timing',
            level: 'Helpful',
            resources: 'MDN: Performance API'
          }
        ]
      }
    },
    renderer: {
      1: {
        title: 'Prerequisites for Renderer Module',
        required: [
          {
            skill: 'Canvas 2D API',
            description: 'Basic drawing methods: fillRect, arc, fillText, drawImage',
            level: 'Beginner',
            resources: 'MDN: Canvas 2D API'
          },
          {
            skill: 'Coordinate Systems',
            description: 'Understanding 2D coordinates (x, y), origin at top-left',
            level: 'Beginner',
            resources: 'Coordinate system basics'
          }
        ],
        recommended: [
          {
            skill: 'Transform Matrices',
            description: 'Understanding translate, rotate, scale operations',
            level: 'Helpful',
            resources: '3D Transformations tutorial'
          }
        ]
      }
    },
    scene: {
      1: {
        title: 'Prerequisites for Scene Module',
        required: [
          {
            skill: 'Arrays & Loops',
            description: 'Array methods: push, filter, forEach, for...of loops',
            level: 'Beginner',
            resources: 'MDN: Array methods'
          },
          {
            skill: 'Object-Oriented Concepts',
            description: 'Objects, properties, methods, references',
            level: 'Beginner',
            resources: 'JavaScript objects tutorial'
          }
        ]
      }
    },
    entity: {
      1: {
        title: 'Prerequisites for Entity Module',
        required: [
          {
            skill: 'Trigonometry Basics',
            description: 'sin, cos functions, radians vs degrees, rotation',
            level: 'Beginner',
            resources: 'Math tutorial: Trigonometry'
          },
          {
            skill: 'Matrix Math',
            description: 'Understanding 2D transformations (translate, rotate, scale)',
            level: 'Intermediate',
            resources: '3D Transformations tutorial'
          }
        ],
        recommended: [
          {
            skill: 'Recursion',
            description: 'Understanding recursive function calls for parent-child traversal',
            level: 'Helpful',
            resources: 'Recursion tutorial'
          }
        ]
      }
    },
    input: {
      1: {
        title: 'Prerequisites for Input Module',
        required: [
          {
            skill: 'Event Listeners',
            description: 'addEventListener, event objects, event types',
            level: 'Beginner',
            resources: 'MDN: Event Listeners'
          },
          {
            skill: 'DOM Methods',
            description: 'getBoundingClientRect() for element positioning',
            level: 'Beginner',
            resources: 'MDN: Element.getBoundingClientRect'
          }
        ]
      }
    },
    utils: {
      1: {
        title: 'Prerequisites for Utils Module',
        required: [
          {
            skill: 'Vector Math',
            description: '2D vectors, addition, magnitude, normalization',
            level: 'Beginner',
            resources: 'Vector & Matrix Operations tutorial'
          },
          {
            skill: 'Pythagorean Theorem',
            description: 'Distance calculation: √(x² + y²)',
            level: 'Beginner',
            resources: 'Math tutorial: Distance'
          },
          {
            skill: 'Linear Interpolation',
            description: 'LERP formula: start + (end - start) × t',
            level: 'Beginner',
            resources: 'Animation & Interpolation tutorial'
          }
        ]
      }
    },
    assetloader: {
      1: {
        title: 'Prerequisites for AssetLoader Module',
        required: [
          {
            skill: 'Promises & async/await',
            description: 'Promise creation, .then(), async/await syntax',
            level: 'Intermediate',
            resources: 'MDN: Promises, async/await'
          },
          {
            skill: 'Map Data Structure',
            description: 'Map.set(), Map.get(), Map.has() methods',
            level: 'Beginner',
            resources: 'MDN: Map'
          }
        ],
        recommended: [
          {
            skill: 'Error Handling',
            description: 'try/catch blocks, error handling',
            level: 'Helpful',
            resources: 'MDN: try/catch'
          }
        ]
      }
    },
    sprite: {
      1: {
        title: 'Prerequisites for Sprite Module',
        required: [
          {
            skill: 'Class Inheritance',
            description: 'extends keyword, super() call, method overriding',
            level: 'Intermediate',
            resources: 'MDN: Inheritance'
          },
          {
            skill: 'Modulo & Floor Division',
            description: '% operator, Math.floor() for grid calculations',
            level: 'Beginner',
            resources: 'Basic Math Operations tutorial'
          },
          {
            skill: 'Image Drawing',
            description: 'drawImage() with source and destination rectangles',
            level: 'Beginner',
            resources: 'MDN: CanvasRenderingContext2D.drawImage'
          }
        ]
      }
    },
    effects: {
      1: {
        title: 'Prerequisites for Effects Module',
        required: [
          {
            skill: 'Canvas Composite Operations',
            description: 'globalCompositeOperation property, blend modes',
            level: 'Intermediate',
            resources: 'MDN: globalCompositeOperation'
          },
          {
            skill: 'CSS Filters',
            description: 'filter property: blur(), brightness(), contrast()',
            level: 'Beginner',
            resources: 'MDN: filter'
          }
        ]
      }
    }
  };

  // For modules with prerequisites only for step 1, return step 1's prerequisites for all steps
  if (prerequisites[module]) {
    if (prerequisites[module][step]) {
      return prerequisites[module][step];
    } else if (prerequisites[module][1]) {
      return prerequisites[module][1];
    }
  }
  
  return null;
};

