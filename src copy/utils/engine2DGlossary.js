// Glossary of key terms for 2D Engine Tutorial

export const getEngine2DGlossary = (module, step) => {
  const glossaries = {
    setup: {
      1: {
        title: 'Key Terms - Project Setup',
        terms: [
          {
            term: 'Vite.js',
            definition: 'Modern build tool for frontend development. Provides fast dev server and optimized production builds.',
            example: 'npm create vite@latest my-project'
          },
          {
            term: 'ES6 Modules',
            definition: 'JavaScript module system using import/export. Enables code organization and reusability.',
            example: 'export class MyClass { }'
          },
          {
            term: 'npm',
            definition: 'Node Package Manager. Tool for installing and managing JavaScript packages.',
            example: 'npm install package-name'
          },
          {
            term: 'Development Server',
            definition: 'Local server running on your machine for testing. Vite runs on http://localhost:5173',
            example: 'npm run dev'
          }
        ]
      }
    },
    core: {
      1: {
        title: 'Key Terms - Core Module',
        terms: [
          {
            term: 'Canvas',
            definition: 'HTML element providing drawing surface. Resolution-dependent bitmap canvas.',
            example: '<canvas id="gameCanvas"></canvas>'
          },
          {
            term: 'Rendering Context',
            definition: '2D drawing API obtained from canvas. Provides methods for drawing shapes, text, images.',
            example: 'const ctx = canvas.getContext("2d")'
          },
          {
            term: 'Game Loop',
            definition: 'Continuous cycle: update game state → render graphics → repeat. Creates animation.',
            example: 'function loop() { update(); render(); requestAnimationFrame(loop); }'
          },
          {
            term: 'Delta Time',
            definition: 'Time elapsed since last frame. Ensures movement speed is frame-rate independent.',
            example: 'deltaTime = (now - lastTime) / 1000'
          },
          {
            term: 'FPS (Frames Per Second)',
            definition: 'Number of frames rendered per second. 60 FPS is standard target for smooth animation.',
            example: 'fps = frameCount / timeInterval'
          },
          {
            term: 'requestAnimationFrame',
            definition: 'Browser API that schedules next frame render. Syncs with display refresh rate.',
            example: 'requestAnimationFrame(callback)'
          }
        ]
      }
    },
    renderer: {
      1: {
        title: 'Key Terms - Renderer Module',
        terms: [
          {
            term: 'Primitive',
            definition: 'Basic shape: rectangle, circle, line, text. Building blocks of graphics.',
            example: 'fillRect(x, y, width, height)'
          },
          {
            term: 'Transform Stack',
            definition: 'Stack of transformation states. save() pushes, restore() pops. Isolates transforms.',
            example: 'ctx.save(); transform(); draw(); ctx.restore();'
          },
          {
            term: 'Coordinate System',
            definition: 'System for specifying positions. Canvas uses (x, y) with origin at top-left.',
            example: 'x increases right, y increases down'
          },
          {
            term: 'Transform Matrix',
            definition: 'Mathematical representation of transformations. Combines translate, rotate, scale.',
            example: 'M = T × R × S (Translate × Rotate × Scale)'
          },
          {
            term: 'Local Space',
            definition: 'Coordinate system relative to entity. Transformed to world space for rendering.',
            example: 'Entity position relative to itself'
          },
          {
            term: 'World Space',
            definition: 'Global coordinate system. All entities positioned relative to scene origin.',
            example: 'Absolute position in game world'
          }
        ]
      }
    },
    scene: {
      1: {
        title: 'Key Terms - Scene Module',
        terms: [
          {
            term: 'Entity',
            definition: 'Game object that can be updated and rendered. Base unit of game world.',
            example: 'const entity = { x: 100, y: 100, update(), onRender() }'
          },
          {
            term: 'Scene Graph',
            definition: 'Tree structure of entities. Parent-child relationships enable hierarchical transforms.',
            example: 'parent → child1, child2 → grandchild'
          },
          {
            term: 'Spatial Query',
            definition: 'Search for entities by position, type, or other criteria.',
            example: 'scene.findByPosition(x, y)'
          },
          {
            term: 'Update Loop',
            definition: 'Iterates through entities calling update() method. Handles game logic.',
            example: 'for (entity of entities) entity.update(deltaTime)'
          },
          {
            term: 'Render Loop',
            definition: 'Iterates through entities calling render() method. Handles drawing.',
            example: 'for (entity of entities) entity.onRender(renderer)'
          }
        ]
      }
    },
    entity: {
      1: {
        title: 'Key Terms - Entity Module',
        terms: [
          {
            term: 'Transform',
            definition: 'Combination of position, rotation, and scale. Defines entity\'s placement.',
            example: '{ x, y, rotation, scaleX, scaleY }'
          },
          {
            term: 'Local Transform',
            definition: 'Transform relative to parent. Child\'s own position, rotation, scale.',
            example: 'Entity\'s own transform values'
          },
          {
            term: 'World Transform',
            definition: 'Transform in global space. Combines all parent transforms with local transform.',
            example: 'Absolute position after parent transformations'
          },
          {
            term: 'Hierarchy',
            definition: 'Parent-child relationships. Child transforms are relative to parent.',
            example: 'parent.addChild(child)'
          },
          {
            term: 'Matrix Multiplication',
            definition: 'Mathematical operation combining transforms. Order matters!',
            example: 'M_world = M_parent × M_local'
          }
        ]
      }
    },
    input: {
      1: {
        title: 'Key Terms - Input Module',
        terms: [
          {
            term: 'Event Listener',
            definition: 'Function that responds to events (mouse, keyboard, touch).',
            example: 'canvas.addEventListener("mousemove", handler)'
          },
          {
            term: 'Screen Coordinates',
            definition: 'Mouse position relative to browser window. Need conversion to canvas coordinates.',
            example: 'e.clientX, e.clientY'
          },
          {
            term: 'Canvas Coordinates',
            definition: 'Mouse position relative to canvas element. Used for game logic.',
            example: 'Converted from screen coordinates'
          },
          {
            term: 'Hit Testing',
            definition: 'Determining if point (mouse) is within entity bounds. Point-in-rectangle test.',
            example: 'x >= entity.x && x <= entity.x + width'
          },
          {
            term: 'Edge Detection',
            definition: 'Detecting when button state changes (pressed/released). Compares current vs previous state.',
            example: 'mousePressed = mouseDown && !prevMouseDown'
          }
        ]
      }
    },
    utils: {
      1: {
        title: 'Key Terms - Utils Module',
        terms: [
          {
            term: 'Vector',
            definition: '2D quantity with magnitude and direction. Represented as (x, y).',
            example: 'const v = new Vec2(10, 20)'
          },
          {
            term: 'Magnitude',
            definition: 'Length of vector. Calculated using Pythagorean theorem.',
            example: '|v| = √(x² + y²)'
          },
          {
            term: 'Normalization',
            definition: 'Converting vector to unit vector (length = 1). Preserves direction.',
            example: 'v̂ = v / |v|'
          },
          {
            term: 'Euclidean Distance',
            definition: 'Straight-line distance between two points. Uses Pythagorean theorem.',
            example: 'd = √((x₂-x₁)² + (y₂-y₁)²)'
          },
          {
            term: 'Linear Interpolation (LERP)',
            definition: 'Smoothly transitions between two values. Creates smooth animations.',
            example: 'lerp(start, end, t) = start + (end - start) × t'
          },
          {
            term: 'Clamp',
            definition: 'Constrains value to range [min, max]. Prevents out-of-bounds values.',
            example: 'clamp(150, 0, 100) = 100'
          }
        ]
      }
    },
    assetloader: {
      1: {
        title: 'Key Terms - AssetLoader Module',
        terms: [
          {
            term: 'Promise',
            definition: 'JavaScript object representing async operation. Can be pending, fulfilled, or rejected.',
            example: 'new Promise((resolve, reject) => { ... })'
          },
          {
            term: 'async/await',
            definition: 'Syntax for handling Promises. Makes async code look synchronous.',
            example: 'const img = await loader.loadImage("key", "src")'
          },
          {
            term: 'Cache',
            definition: 'Storage for loaded assets. Prevents reloading same asset multiple times.',
            example: 'Map<key, asset>'
          },
          {
            term: 'Batch Loading',
            definition: 'Loading multiple assets concurrently. Uses Promise.all() for parallel execution.',
            example: 'await Promise.all([load1, load2, load3])'
          },
          {
            term: 'CORS (Cross-Origin Resource Sharing)',
            definition: 'Browser security policy. May block loading images from different origins.',
            example: 'img.crossOrigin = "anonymous"'
          }
        ]
      }
    },
    sprite: {
      1: {
        title: 'Key Terms - Sprite Module',
        terms: [
          {
            term: 'Sprite',
            definition: '2D image used in games. Can be static or animated.',
            example: 'const sprite = new Sprite(x, y, image)'
          },
          {
            term: 'Sprite Sheet',
            definition: 'Single image containing multiple frames. Organized in grid layout.',
            example: 'Image with 8×8 grid of 32×32 pixel frames'
          },
          {
            term: 'Frame',
            definition: 'Single image in animation sequence. Sprite sheet contains multiple frames.',
            example: 'Frame 0, Frame 1, Frame 2, ...'
          },
          {
            term: 'Animation',
            definition: 'Sequence of frames played over time. Creates illusion of motion.',
            example: 'sprite.addAnimation("walk", [0,1,2,3], 0.1, true)'
          },
          {
            term: 'Frame Index',
            definition: 'Numeric index of frame in sprite sheet. Used to calculate source rectangle.',
            example: 'frameIndex = 5 → column = 5 % 4 = 1, row = floor(5/4) = 1'
          },
          {
            term: 'Modulo (%)',
            definition: 'Remainder after division. Used to calculate column in grid.',
            example: '5 % 4 = 1 (5 divided by 4 = 1 remainder 1)'
          }
        ]
      }
    },
    effects: {
      1: {
        title: 'Key Terms - Effects Module',
        terms: [
          {
            term: 'Blend Mode',
            definition: 'How new pixels combine with existing pixels. Different modes create different effects.',
            example: 'multiply (darkens), screen (lightens), overlay (contrast)'
          },
          {
            term: 'Filter',
            definition: 'Visual effect applied to drawing. Blur, brightness, contrast, etc.',
            example: 'ctx.filter = "blur(5px) brightness(1.2)"'
          },
          {
            term: 'Post-Processing',
            definition: 'Effects applied to entire rendered scene. Renders to offscreen canvas first.',
            example: 'Render scene → Apply effect → Draw to main canvas'
          },
          {
            term: 'Offscreen Canvas',
            definition: 'Temporary canvas for rendering. Allows effects on entire scene.',
            example: 'const offscreen = document.createElement("canvas")'
          },
          {
            term: 'Composite Operation',
            definition: 'Canvas property controlling blend mode. globalCompositeOperation.',
            example: 'ctx.globalCompositeOperation = "multiply"'
          }
        ]
      }
    }
  };

  // For modules with glossary only for step 1, return step 1's glossary for all steps
  if (glossaries[module]) {
    if (glossaries[module][step]) {
      return glossaries[module][step];
    } else if (glossaries[module][1]) {
      return glossaries[module][1];
    }
  }
  
  return null;
};

