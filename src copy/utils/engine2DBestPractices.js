// Best practices and tips for 2D Engine Tutorial

export const getEngine2DBestPractices = (module, step) => {
  const practices = {
    setup: {
      1: {
        title: 'Best Practices - Project Setup',
        practices: [
          {
            practice: 'Organize Code by Module',
            description: 'Keep each module in separate file. Makes code easier to find and maintain.',
            example: 'src/engine2D/Core.js, Renderer.js, Scene.js'
          },
          {
            practice: 'Use Consistent Naming',
            description: 'Follow naming conventions: Classes start with capital, methods camelCase.',
            example: 'class Engine2D { start() { } }'
          },
          {
            practice: 'Version Control',
            description: 'Use Git to track changes. Commit after each working module.',
            example: 'git add . && git commit -m "Add Core module"'
          },
          {
            practice: 'Test Frequently',
            description: 'Test each module as you build it. Don\'t wait until the end.',
            example: 'Create simple test after each module'
          }
        ]
      }
    },
    core: {
      1: {
        title: 'Best Practices - Core Module',
        practices: [
          {
            practice: 'Always Use Delta Time',
            description: 'Never hardcode movement speeds. Always multiply by deltaTime for frame-rate independence.',
            example: 'position += velocity * deltaTime (not position += velocity)'
          },
          {
            practice: 'Clamp Delta Time',
            description: 'Limit deltaTime to prevent large jumps from tab switching or lag.',
            example: 'deltaTime = Math.min(deltaTime, 0.1) // Max 100ms'
          },
          {
            practice: 'Separate Update and Render',
            description: 'Keep game logic (update) separate from drawing (render). Easier to debug.',
            example: 'update() handles logic, render() handles drawing'
          },
          {
            practice: 'Monitor Performance',
            description: 'Track FPS to identify performance issues early.',
            example: 'Display FPS counter, optimize if FPS drops below 30'
          }
        ]
      }
    },
    renderer: {
      1: {
        title: 'Best Practices - Renderer Module',
        practices: [
          {
            practice: 'Use Transform Stack',
            description: 'Always use save()/restore() to isolate transforms. Prevents affecting other drawings.',
            example: 'ctx.save(); transform(); draw(); ctx.restore();'
          },
          {
            practice: 'Batch Drawing Operations',
            description: 'Group similar drawing operations. Reduces state changes.',
            example: 'Draw all rectangles, then all circles, then all text'
          },
          {
            practice: 'Set Style Before Drawing',
            description: 'Set fillStyle/strokeStyle before drawing. Don\'t assume previous state.',
            example: 'ctx.fillStyle = color; ctx.fillRect(x, y, w, h);'
          },
          {
            practice: 'Clear Canvas Each Frame',
            description: 'Always clear canvas at start of render. Prevents ghosting.',
            example: 'ctx.clearRect(0, 0, canvas.width, canvas.height)'
          }
        ]
      }
    },
    scene: {
      1: {
        title: 'Best Practices - Scene Module',
        practices: [
          {
            practice: 'Update Before Render',
            description: 'Always call update() before render(). Ensures state is current.',
            example: 'scene.update(deltaTime); scene.render(renderer);'
          },
          {
            practice: 'Remove Dead Entities',
            description: 'Remove entities when destroyed. Prevents memory leaks.',
            example: 'if (entity.isDead) scene.remove(entity)'
          },
          {
            practice: 'Use Spatial Data Structures',
            description: 'For many entities, use spatial partitioning (grid, quadtree) for better performance.',
            example: 'Grid for collision detection, quadtree for large scenes'
          },
          {
            practice: 'Keep Entity Count Reasonable',
            description: 'Limit number of active entities. Too many = performance issues.',
            example: 'Aim for < 1000 entities, optimize if needed'
          }
        ]
      }
    },
    entity: {
      1: {
        title: 'Best Practices - Entity Module',
        practices: [
          {
            practice: 'Use Radians for Rotation',
            description: 'Always use radians, not degrees. JavaScript Math functions expect radians.',
            example: 'rotation = angleInDegrees * Math.PI / 180'
          },
          {
            practice: 'Cache World Transforms',
            description: 'Calculate world transforms once per frame, cache result. Avoids repeated calculations.',
            example: 'const worldX = entity.getWorldX(); // Cache this'
          },
          {
            practice: 'Limit Hierarchy Depth',
            description: 'Deep hierarchies can be slow. Keep depth reasonable (< 5 levels).',
            example: 'Avoid: grandparent → parent → child → grandchild → great-grandchild'
          },
          {
            practice: 'Use Transform Order Consistently',
            description: 'Always apply transforms in same order: Scale → Rotate → Translate.',
            example: 'Consistent order prevents confusion'
          }
        ]
      }
    },
    input: {
      1: {
        title: 'Best Practices - Input Module',
        practices: [
          {
            practice: 'Update Input Each Frame',
            description: 'Call input.update() every frame to detect press/release events.',
            example: 'input.update(); if (input.mousePressed) { ... }'
          },
          {
            practice: 'Convert Coordinates Properly',
            description: 'Always convert screen to canvas coordinates. Account for canvas position and scaling.',
            example: 'Use getBoundingClientRect() and scale factor'
          },
          {
            practice: 'Handle Edge Cases',
            description: 'Handle mouse leaving canvas, window losing focus, etc.',
            example: 'Reset state on mouseleave, handle blur events'
          },
          {
            practice: 'Use Hit Testing Efficiently',
            description: 'Only test entities that could be hit. Use spatial queries to limit tests.',
            example: 'Test entities near mouse position, not all entities'
          }
        ]
      }
    },
    utils: {
      1: {
        title: 'Best Practices - Utils Module',
        practices: [
          {
            practice: 'Check for Zero Length',
            description: 'Always check vector length before normalizing. Prevents division by zero.',
            example: 'if (len === 0) return new Vec2(0, 0);'
          },
          {
            practice: 'Use Immutable Vectors',
            description: 'Vector operations return new vectors. Prevents accidental mutations.',
            example: 'const sum = v1.add(v2); // v1 unchanged'
          },
          {
            practice: 'Clamp Interpolation Parameter',
            description: 'Always clamp t to [0, 1] in LERP. Prevents extrapolation.',
            example: 't = Math.max(0, Math.min(1, t))'
          },
          {
            practice: 'Cache Expensive Calculations',
            description: 'Cache results of expensive operations (distance, angle) if used multiple times.',
            example: 'const dist = distance(a, b); // Cache if used multiple times'
          }
        ]
      }
    },
    assetloader: {
      1: {
        title: 'Best Practices - AssetLoader Module',
        practices: [
          {
            practice: 'Preload Critical Assets',
            description: 'Load essential assets before game starts. Show loading screen.',
            example: 'await loader.loadImages({ player, background })'
          },
          {
            practice: 'Handle Loading Errors',
            description: 'Always handle errors. Show user-friendly message if asset fails.',
            example: 'try { await loader.loadImage(...) } catch (e) { showError(e) }'
          },
          {
            practice: 'Use Consistent Keys',
            description: 'Use constants for asset keys. Prevents typos and makes refactoring easier.',
            example: 'const ASSETS = { PLAYER: "player", ENEMY: "enemy" }'
          },
          {
            practice: 'Monitor Loading Progress',
            description: 'Show loading progress to user. Improves perceived performance.',
            example: 'Display progress bar during asset loading'
          }
        ]
      }
    },
    sprite: {
      1: {
        title: 'Best Practices - Sprite Module',
        practices: [
          {
            practice: 'Call update() Each Frame',
            description: 'Always call sprite.update(deltaTime) in game loop. Advances animation.',
            example: 'sprite.update(deltaTime); sprite.onRender(renderer);'
          },
          {
            practice: 'Use Consistent Frame Sizes',
            description: 'All frames in sprite sheet should be same size. Makes calculations easier.',
            example: '32×32 pixels for all frames'
          },
          {
            practice: 'Optimize Animation Speed',
            description: 'Adjust animation speed based on gameplay. Faster for action, slower for idle.',
            example: 'walk: 0.1s/frame, idle: 0.2s/frame'
          },
          {
            practice: 'Reuse Sprite Sheets',
            description: 'Use same sprite sheet for multiple animations. Reduces memory usage.',
            example: 'One sheet for all character animations'
          }
        ]
      }
    },
    effects: {
      1: {
        title: 'Best Practices - Effects Module',
        practices: [
          {
            practice: 'Reset Filters After Use',
            description: 'Always reset filters/blend modes. Prevents affecting other drawings.',
            example: 'effects.setBlendMode(...); draw(); effects.resetBlendMode();'
          },
          {
            practice: 'Limit Post-Processing',
            description: 'Post-processing is expensive. Use sparingly, optimize resolution.',
            example: 'Use lower resolution for post-processing canvas'
          },
          {
            practice: 'Combine Filters Efficiently',
            description: 'Combine multiple filters in one filter string. More efficient than multiple calls.',
            example: 'filter = "blur(5px) brightness(1.2)" (not separate calls)'
          },
          {
            practice: 'Test Performance Impact',
            description: 'Measure FPS with/without effects. Optimize if performance drops.',
            example: 'Profile effects, remove if FPS drops below 30'
          }
        ]
      }
    }
  };

  // For modules with best practices only for step 1, return step 1's practices for all steps
  if (practices[module]) {
    if (practices[module][step]) {
      return practices[module][step];
    } else if (practices[module][1]) {
      return practices[module][1];
    }
  }
  
  return null;
};

