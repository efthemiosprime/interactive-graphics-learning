// Debugging tips for 2D Engine Tutorial

export const getEngine2DDebuggingTips = (module, step) => {
  const tips = {
    setup: {
      1: {
        title: 'Debugging Tips - Project Setup',
        tips: [
          {
            tip: 'Check Browser Console',
            description: 'Always check browser console (F12) for errors. Most issues show error messages.',
            example: 'Open DevTools → Console tab'
          },
          {
            tip: 'Verify File Paths',
            description: 'Import errors often caused by wrong file paths. Check relative paths carefully.',
            example: 'import { Class } from "./engine2D/Core.js" (not "./Core.js")'
          },
          {
            tip: 'Check Module Type',
            description: 'Ensure script tag has type="module". Required for ES6 imports.',
            example: '<script type="module" src="/src/main.js"></script>'
          },
          {
            tip: 'Verify Vite Server Running',
            description: 'Make sure dev server is running. Check terminal for errors.',
            example: 'npm run dev should show "Local: http://localhost:5173"'
          }
        ]
      }
    },
    core: {
      1: {
        title: 'Debugging Tips - Core Module',
        tips: [
          {
            tip: 'Add Console Logs',
            description: 'Log deltaTime, FPS, and loop execution to verify game loop is running.',
            example: 'console.log("Delta:", deltaTime, "FPS:", fps)'
          },
          {
            tip: 'Check Callbacks Set',
            description: 'Verify onUpdate and onRender callbacks are set before calling start().',
            example: 'if (!engine.onRender) console.error("onRender not set!")'
          },
          {
            tip: 'Monitor Performance',
            description: 'Use browser Performance tab to identify bottlenecks.',
            example: 'Chrome DevTools → Performance → Record'
          },
          {
            tip: 'Verify Canvas Size',
            description: 'Check canvas.width and canvas.height match expected values.',
            example: 'console.log("Canvas:", canvas.width, "x", canvas.height)'
          }
        ]
      }
    },
    renderer: {
      1: {
        title: 'Debugging Tips - Renderer Module',
        tips: [
          {
            tip: 'Check Coordinates',
            description: 'Verify shapes are drawn within canvas bounds. Negative or too large coordinates won\'t show.',
            example: 'console.log("Drawing at:", x, y, "Canvas:", canvas.width, canvas.height)'
          },
          {
            tip: 'Verify Fill Style',
            description: 'Check fillStyle is set and color is visible (not same as background).',
            example: 'console.log("Fill style:", ctx.fillStyle)'
          },
          {
            tip: 'Inspect Transform Stack',
            description: 'Log transform state to debug coordinate issues.',
            example: 'Check currentTransform matrix'
          },
          {
            tip: 'Test Each Drawing Method',
            description: 'Test each drawing method separately. Isolate the problem.',
            example: 'Test fillRect alone, then add other methods'
          }
        ]
      }
    },
    scene: {
      1: {
        title: 'Debugging Tips - Scene Module',
        tips: [
          {
            tip: 'Log Entity Count',
            description: 'Verify entities are added/removed correctly. Check array length.',
            example: 'console.log("Entities:", scene.entities.length)'
          },
          {
            tip: 'Check Update/Render Order',
            description: 'Ensure update() called before render(). Wrong order causes issues.',
            example: 'Log "Updating" and "Rendering" to verify order'
          },
          {
            tip: 'Verify Entity Methods',
            description: 'Check entities have update() and onRender() methods before adding.',
            example: 'if (!entity.update) console.warn("Entity missing update method")'
          },
          {
            tip: 'Test Queries',
            description: 'Test spatial queries with known entity positions.',
            example: 'Add entity at (100, 100), query (100, 100), verify result'
          }
        ]
      }
    },
    entity: {
      1: {
        title: 'Debugging Tips - Entity Module',
        tips: [
          {
            tip: 'Log Transform Values',
            description: 'Log local and world transforms to verify calculations.',
            example: 'console.log("Local:", x, y, "World:", getWorldX(), getWorldY())'
          },
          {
            tip: 'Check Parent Chain',
            description: 'Verify parent-child relationships. Circular references cause infinite loops.',
            example: 'Log parent chain: entity → parent → grandparent'
          },
          {
            tip: 'Test Simple Cases First',
            description: 'Test entity without parent first, then add parent. Isolate issues.',
            example: 'Test standalone entity, then add to parent'
          },
          {
            tip: 'Verify Rotation Units',
            description: 'Ensure rotation is in radians. Degrees won\'t work correctly.',
            example: 'console.log("Rotation (rad):", rotation, "deg:", rotation * 180 / Math.PI)'
          }
        ]
      }
    },
    input: {
      1: {
        title: 'Debugging Tips - Input Module',
        tips: [
          {
            tip: 'Log Mouse Coordinates',
            description: 'Log mouseX and mouseY to verify coordinate conversion.',
            example: 'console.log("Mouse:", mouseX, mouseY)'
          },
          {
            tip: 'Check Event Listeners',
            description: 'Verify event listeners are attached. Check canvas element exists.',
            example: 'console.log("Canvas:", canvas, "Listeners:", canvas.onmousemove)'
          },
          {
            tip: 'Test Coordinate Conversion',
            description: 'Test screenToCanvas() with known screen coordinates.',
            example: 'Log screen coords and converted canvas coords'
          },
          {
            tip: 'Verify Hit Test Logic',
            description: 'Test hit test with entity at known position. Draw debug rectangle.',
            example: 'Draw rectangle at entity bounds, verify mouse inside'
          }
        ]
      }
    },
    utils: {
      1: {
        title: 'Debugging Tips - Utils Module',
        tips: [
          {
            tip: 'Check Vector Length',
            description: 'Log vector length before normalizing. Zero length causes division by zero.',
            example: 'console.log("Length:", v.length())'
          },
          {
            tip: 'Verify Distance Formula',
            description: 'Test distance() with known points (e.g., (0,0) to (3,4) = 5).',
            example: 'console.assert(distance(0,0,3,4) === 5)'
          },
          {
            tip: 'Check LERP Parameter',
            description: 'Verify t is in [0, 1] range. Values outside range cause extrapolation.',
            example: 'console.log("LERP t:", t, "clamped:", clamp(t, 0, 1))'
          },
          {
            tip: 'Test Angle Calculation',
            description: 'Test angle() with known angles (e.g., (0,0) to (1,0) = 0 radians).',
            example: 'console.log("Angle:", angle(0,0,1,0), "expected: 0")'
          }
        ]
      }
    },
    assetloader: {
      1: {
        title: 'Debugging Tips - AssetLoader Module',
        tips: [
          {
            tip: 'Check Image Paths',
            description: 'Verify image paths are correct. Use absolute paths from public folder.',
            example: 'console.log("Loading:", src)'
          },
          {
            tip: 'Handle Loading Errors',
            description: 'Add error handlers to see why images fail to load.',
            example: 'img.onerror = (e) => console.error("Failed:", src, e)'
          },
          {
            tip: 'Verify Cache',
            description: 'Check cache contains loaded images. Log cache keys.',
            example: 'console.log("Cache keys:", Array.from(cache.keys()))'
          },
          {
            tip: 'Monitor Loading Progress',
            description: 'Log loading progress to identify slow-loading assets.',
            example: 'console.log("Loaded:", loaded, "/", total)'
          }
        ]
      }
    },
    sprite: {
      1: {
        title: 'Debugging Tips - Sprite Module',
        tips: [
          {
            tip: 'Log Frame Calculation',
            description: 'Log frame index, column, row to verify sprite sheet calculations.',
            example: 'console.log("Frame:", frameIndex, "Col:", col, "Row:", row)'
          },
          {
            tip: 'Check Animation State',
            description: 'Log current animation, frame, and time to debug animation issues.',
            example: 'console.log("Anim:", currentAnimation, "Frame:", currentFrame)'
          },
          {
            tip: 'Verify Sprite Sheet Setup',
            description: 'Check frameWidth, frameHeight, columns match actual sprite sheet.',
            example: 'console.log("Sheet:", frameWidth, frameHeight, columns)'
          },
          {
            tip: 'Test Frame Rendering',
            description: 'Render single frame first, then test animation.',
            example: 'Set currentFrame manually, verify correct frame displays'
          }
        ]
      }
    },
    effects: {
      1: {
        title: 'Debugging Tips - Effects Module',
        tips: [
          {
            tip: 'Check Filter String',
            description: 'Log filter string to verify it\'s formatted correctly.',
            example: 'console.log("Filter:", ctx.filter)'
          },
          {
            tip: 'Verify Blend Mode',
            description: 'Check globalCompositeOperation is set correctly.',
            example: 'console.log("Blend mode:", ctx.globalCompositeOperation)'
          },
          {
            tip: 'Test Effects Individually',
            description: 'Test each effect separately. Isolate which effect causes issues.',
            example: 'Test blur alone, then add other effects'
          },
          {
            tip: 'Monitor Performance',
            description: 'Measure FPS with/without effects. Effects can be expensive.',
            example: 'Log FPS before/after applying effects'
          }
        ]
      }
    }
  };

  // For modules with debugging tips only for step 1, return step 1's tips for all steps
  if (tips[module]) {
    if (tips[module][step]) {
      return tips[module][step];
    } else if (tips[module][1]) {
      return tips[module][1];
    }
  }
  
  return null;
};

