// Common pitfalls and troubleshooting for 2D Engine Tutorial

export const getEngine2DCommonPitfalls = (module, step) => {
  const pitfalls = {
    setup: {
      1: {
        title: 'Common Setup Issues',
        pitfalls: [
          {
            issue: 'Vite command not found',
            cause: 'Node.js or npm not installed, or not in PATH',
            solution: 'Install Node.js from nodejs.org, verify with: node --version && npm --version',
            prevention: 'Always verify Node.js installation before starting'
          },
          {
            issue: 'Module import errors',
            cause: 'Missing .js extension or incorrect path',
            solution: 'Always include .js extension: import { Class } from "./Module.js"',
            prevention: 'Use absolute paths or verify relative paths are correct'
          },
          {
            issue: 'Canvas not displaying',
            cause: 'Canvas element not in HTML or script not loading',
            solution: 'Check index.html has <canvas> element and script tag with type="module"',
            prevention: 'Verify HTML structure matches tutorial exactly'
          }
        ]
      },
      2: {
        title: 'Common Core Module Issues',
        pitfalls: [
          {
            issue: 'Game loop not running',
            cause: 'forgot to call engine.start() or isRunning flag not set',
            solution: 'Ensure engine.start() is called after setting up callbacks',
            prevention: 'Always call start() after configuration'
          },
          {
            issue: 'Movement speed varies with FPS',
            cause: 'Not using deltaTime for movement calculations',
            solution: 'Multiply movement by deltaTime: position += velocity * deltaTime',
            prevention: 'Always use deltaTime for time-based calculations'
          },
          {
            issue: 'Canvas is blank',
            cause: 'onRender callback not set or not clearing canvas',
            solution: 'Set onRender callback and clear canvas each frame: ctx.clearRect(0, 0, w, h)',
            prevention: 'Always clear canvas before drawing'
          },
          {
            issue: 'Performance issues',
            cause: 'Too many operations per frame or inefficient rendering',
            solution: 'Profile with browser dev tools, optimize rendering, limit entity count',
            prevention: 'Monitor FPS, optimize early'
          }
        ]
      },
      3: {
        title: 'Common Renderer Module Issues',
        pitfalls: [
          {
            issue: 'Shapes not appearing',
            cause: 'fillStyle not set before drawing, or coordinates outside canvas',
            solution: 'Set fillStyle before drawing, check coordinates are within canvas bounds',
            prevention: 'Always set fillStyle/strokeStyle before drawing'
          },
          {
            issue: 'Transform affects everything',
            cause: 'Not using save()/restore() to isolate transforms',
            solution: 'Wrap transforms: ctx.save(); transform(); draw(); ctx.restore();',
            prevention: 'Always use transform stack (save/restore)'
          },
          {
            issue: 'Text not visible',
            cause: 'Font not set or text color matches background',
            solution: 'Set ctx.font and ctx.fillStyle before fillText()',
            prevention: 'Configure text properties before drawing'
          },
          {
            issue: 'Images not loading',
            cause: 'Image not loaded before drawing, or wrong path',
            solution: 'Wait for image.onload before drawing, verify image path',
            prevention: 'Use AssetLoader or wait for image load event'
          }
        ]
      },
      4: {
        title: 'Common Scene Module Issues',
        pitfalls: [
          {
            issue: 'Entities not updating',
            cause: 'update() method not called or entity.update not defined',
            solution: 'Call scene.update(deltaTime) in game loop, ensure entities have update method',
            prevention: 'Always call scene.update() before scene.render()'
          },
          {
            issue: 'Entities not rendering',
            cause: 'render() method not called or entity.onRender not defined',
            solution: 'Call scene.render(renderer) in game loop, ensure entities have onRender method',
            prevention: 'Always call scene.render() after scene.update()'
          },
          {
            issue: 'Memory leak from entities',
            cause: 'Entities not removed when destroyed, references kept',
            solution: 'Call scene.remove(entity) when entity is destroyed, clear references',
            prevention: 'Always remove entities from scene when done'
          },
          {
            issue: 'Query returns wrong results',
            cause: 'Filter logic incorrect or entities not in scene',
            solution: 'Verify filter conditions, ensure entities are added to scene',
            prevention: 'Test queries with known entity states'
          }
        ]
      },
      5: {
        title: 'Common Entity Module Issues',
        pitfalls: [
          {
            issue: 'Child position wrong',
            cause: 'World transform calculation incorrect or parent transform not applied',
            solution: 'Verify getWorldX/Y calculations, ensure parent transforms are applied',
            prevention: 'Test with simple parent-child relationships first'
          },
          {
            issue: 'Rotation not working',
            cause: 'Using degrees instead of radians, or rotation not applied',
            solution: 'Convert degrees to radians: radians = degrees * Math.PI / 180',
            prevention: 'Always use radians for rotation'
          },
          {
            issue: 'Scale makes everything huge/tiny',
            cause: 'Scale value too large/small or not resetting scale',
            solution: 'Use scale values around 1.0 (1.0 = normal), reset scale when done',
            prevention: 'Start with scale = 1.0, adjust incrementally'
          },
          {
            issue: 'Transform order matters',
            cause: 'Applying transforms in wrong order',
            solution: 'Order: Scale → Rotate → Translate (applied right-to-left)',
            prevention: 'Always apply transforms in correct order'
          }
        ]
      },
      6: {
        title: 'Common Input Module Issues',
        pitfalls: [
          {
            issue: 'Mouse coordinates wrong',
            cause: 'Not accounting for canvas position or scaling',
            solution: 'Use getBoundingClientRect() and scale factor: (x - rect.left) * scale',
            prevention: 'Always convert screen to canvas coordinates'
          },
          {
            issue: 'Click not detected',
            cause: 'mousePressed not checked or update() not called',
            solution: 'Call input.update() each frame, check input.mousePressed',
            prevention: 'Always call input.update() in game loop'
          },
          {
            issue: 'Hit test not working',
            cause: 'Bounds check logic incorrect or entity bounds not set',
            solution: 'Verify hit test formula, ensure entities have width/height',
            prevention: 'Test hit test with known positions'
          },
          {
            issue: 'Mouse leaves canvas but state persists',
            cause: 'Not handling mouseleave event',
            solution: 'Reset mouse state on mouseleave: mouseX = -1, mouseDown = false',
            prevention: 'Always handle mouseleave event'
          }
        ]
      },
      7: {
        title: 'Common Utils Module Issues',
        pitfalls: [
          {
            issue: 'Division by zero in normalize()',
            cause: 'Vector length is 0 (zero vector)',
            solution: 'Check length before dividing: if (len === 0) return new Vec2(0, 0)',
            prevention: 'Always check for zero length before normalization'
          },
          {
            issue: 'Distance calculation wrong',
            cause: 'Using wrong formula or not taking square root',
            solution: 'Use: Math.sqrt((x2-x1)² + (y2-y1)²)',
            prevention: 'Verify distance formula matches tutorial'
          },
          {
            issue: 'LERP value out of range',
            cause: 't parameter not clamped to [0, 1]',
            solution: 'Clamp t: t = Math.max(0, Math.min(1, t))',
            prevention: 'Always clamp interpolation parameter'
          },
          {
            issue: 'Angle calculation wrong',
            cause: 'Using wrong atan2 parameters or expecting degrees',
            solution: 'Use: Math.atan2(y2-y1, x2-x1) returns radians',
            prevention: 'Remember atan2(y, x) order and radians'
          }
        ]
      },
      8: {
        title: 'Common AssetLoader Issues',
        pitfalls: [
          {
            issue: 'Image loads but not displayed',
            cause: 'Drawing before image loads or using wrong image reference',
            solution: 'Wait for load: await loader.loadImage(), then use loader.get()',
            prevention: 'Always await image loading before using'
          },
          {
            issue: 'CORS error loading images',
            cause: 'Loading from different origin without CORS headers',
            solution: 'Set img.crossOrigin = "anonymous" or serve from same origin',
            prevention: 'Use crossOrigin for external images'
          },
          {
            issue: 'Cache not working',
            cause: 'Using different keys or cache cleared',
            solution: 'Use consistent keys, verify cache.has() before loading',
            prevention: 'Use constants for asset keys'
          },
          {
            issue: 'Promise.all fails if one image fails',
            cause: 'One image fails, entire batch fails',
            solution: 'Use Promise.allSettled() or handle individual errors',
            prevention: 'Handle errors for each image separately'
          }
        ]
      },
      9: {
        title: 'Common Sprite Module Issues',
        pitfalls: [
          {
            issue: 'Animation not playing',
            cause: 'update() not called or animation not set up',
            solution: 'Call sprite.update(deltaTime) each frame, verify animation added',
            prevention: 'Always call update() in game loop'
          },
          {
            issue: 'Wrong frame displayed',
            cause: 'Frame calculation incorrect (column/row wrong)',
            solution: 'Verify: col = frameIndex % columns, row = floor(frameIndex / columns)',
            prevention: 'Test frame calculation with known values'
          },
          {
            issue: 'Animation too fast/slow',
            cause: 'Speed value wrong (should be seconds per frame)',
            solution: 'Lower speed = faster animation, higher speed = slower',
            prevention: 'Start with speed around 0.1 seconds per frame'
          },
          {
            issue: 'Sprite sheet not displaying',
            cause: 'setSpriteSheet() not called or wrong dimensions',
            solution: 'Call setSpriteSheet() with correct frameWidth, frameHeight, columns',
            prevention: 'Verify sprite sheet dimensions match actual image'
          }
        ]
      },
      10: {
        title: 'Common Effects Module Issues',
        pitfalls: [
          {
            issue: 'Blend mode affects everything',
            cause: 'Not resetting blend mode after use',
            solution: 'Reset: ctx.globalCompositeOperation = "source-over"',
            prevention: 'Always reset blend mode after drawing'
          },
          {
            issue: 'Filter not working',
            cause: 'Filter string incorrect or not applied before drawing',
            solution: 'Set ctx.filter before drawing, verify filter syntax',
            prevention: 'Apply filter before drawing operations'
          },
          {
            issue: 'Shadow appears on everything',
            cause: 'Shadow properties not reset after use',
            solution: 'Reset: shadowBlur = 0, shadowColor = "transparent"',
            prevention: 'Always reset shadow properties'
          },
          {
            issue: 'Post-processing too slow',
            cause: 'Processing full-resolution canvas or too many effects',
            solution: 'Reduce resolution, limit effects, use lower-quality filters',
            prevention: 'Optimize post-processing for performance'
          }
        ]
      }
    }
  };

  // For modules with pitfalls only for step 1, return step 1's pitfalls for all steps
  if (pitfalls[module]) {
    if (pitfalls[module][step]) {
      return pitfalls[module][step];
    } else if (pitfalls[module][1]) {
      return pitfalls[module][1];
    }
  }
  
  return null;
};

