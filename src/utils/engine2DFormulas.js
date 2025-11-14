// Formulas for 2D Engine Tutorial

export const getEngine2DFormulas = (module, step) => {
  const formulas = {
    setup: {
      1: {
        title: 'Project Setup Formulas',
        formulas: [
          {
            name: 'Vite Project Creation',
            formula: 'npm create vite@latest <project-name> -- --template vanilla',
            description: 'Creates new Vite project with vanilla JavaScript template',
            values: 'Project structure initialized'
          },
          {
            name: 'Module Import',
            formula: 'import { ClassName } from "./path/to/Module.js"',
            description: 'ES6 module import syntax for code organization',
            values: 'Enables modular architecture'
          },
          {
            name: 'Module Export',
            formula: 'export class ClassName { ... }',
            description: 'ES6 module export syntax for reusable code',
            values: 'Makes code available for import'
          }
        ]
      },
      2: {
        title: 'Core Module Formulas',
        formulas: [
          {
            name: 'Delta Time',
            formula: 'deltaTime = (currentTime - lastTime) / 1000',
            description: 'Time elapsed since last frame in seconds',
            values: 'Ensures frame-rate independent movement'
          },
          {
            name: 'FPS Calculation',
            formula: 'fps = frameCount / timeInterval',
            description: 'Frames per second calculation',
            values: 'Measures animation smoothness'
          },
          {
            name: 'Game Loop',
            formula: 'loop() { update(dt); render(ctx); requestAnimationFrame(loop); }',
            description: 'Continuous update-render cycle',
            values: 'Creates animation loop'
          }
        ]
      },
      3: {
        title: 'Renderer Module Formulas',
        formulas: [
          {
            name: 'Transform Matrix',
            formula: 'M = T × R × S\n[cos(θ) -sin(θ) x] [sx  0  0]\n[sin(θ)  cos(θ) y] × [ 0 sy  0]\n[  0      0    1] [ 0  0  1]',
            description: 'Combined transform matrix: Translate × Rotate × Scale',
            values: 'Order: Scale → Rotate → Translate'
          },
          {
            name: 'Circle Drawing',
            formula: 'arc(x, y, radius, 0, 2π)',
            description: 'Draw circle using arc function',
            values: 'Full circle: 0 to 2π radians'
          }
        ]
      },
      4: {
        title: 'Scene Module Formulas',
        formulas: [
          {
            name: 'Entity Collection',
            formula: 'entities = [e₁, e₂, ..., eₙ]',
            description: 'Array of all entities in scene',
            values: 'Linear data structure'
          },
          {
            name: 'Entity Query',
            formula: 'findByPosition(x, y) = {e | e.x = x ∧ e.y = y}',
            description: 'Filter entities by position',
            values: 'Set comprehension notation'
          }
        ]
      },
      5: {
        title: 'Entity Module Formulas',
        formulas: [
          {
            name: 'World Position',
            formula: 'worldX = parent.worldX + localX × cos(θ) - localY × sin(θ)\nworldY = parent.worldY + localX × sin(θ) + localY × cos(θ)',
            description: 'Transform local position to world position with rotation',
            values: 'θ = parent rotation angle'
          },
          {
            name: 'World Rotation',
            formula: 'worldRotation = Σ(parent.rotation)',
            description: 'Sum of all parent rotations',
            values: 'Cumulative rotation'
          },
          {
            name: 'World Scale',
            formula: 'worldScale = Π(parent.scale)',
            description: 'Product of all parent scales',
            values: 'Cumulative scaling'
          }
        ]
      },
      6: {
        title: 'Input Module Formulas',
        formulas: [
          {
            name: 'Screen to Canvas Conversion',
            formula: 'canvasX = (screenX - rect.left) × (canvas.width / rect.width)\ncanvasY = (screenY - rect.top) × (canvas.height / rect.height)',
            description: 'Convert screen coordinates to canvas coordinates',
            values: 'Accounts for canvas position and scaling'
          },
          {
            name: 'Hit Test',
            formula: 'hit = (x ≥ entity.x) ∧ (x ≤ entity.x + width) ∧\n       (y ≥ entity.y) ∧ (y ≤ entity.y + height)',
            description: 'Point-in-rectangle test',
            values: 'Boolean result'
          }
        ]
      },
      7: {
        title: 'Utils Module Formulas',
        formulas: [
          {
            name: 'Vector Length',
            formula: '|v| = √(x² + y²)',
            description: 'Euclidean distance (Pythagorean theorem)',
            values: 'Vector magnitude'
          },
          {
            name: 'Vector Normalization',
            formula: 'v̂ = v / |v|',
            description: 'Unit vector (length = 1)',
            values: 'Preserves direction, sets magnitude to 1'
          },
          {
            name: 'Distance',
            formula: 'd = √((x₂ - x₁)² + (y₂ - y₁)²)',
            description: 'Euclidean distance between two points',
            values: 'Pythagorean theorem'
          },
          {
            name: 'Linear Interpolation',
            formula: 'lerp(a, b, t) = a + (b - a) × t',
            description: 'Interpolate between two values',
            values: 't ∈ [0, 1]'
          }
        ]
      },
      8: {
        title: 'AssetLoader Module Formulas',
        formulas: [
          {
            name: 'Promise Resolution',
            formula: 'Promise → resolve(image) | reject(error)',
            description: 'Asynchronous asset loading',
            values: 'Success or failure state'
          },
          {
            name: 'Cache Lookup',
            formula: 'O(1) lookup time',
            description: 'Map data structure provides constant-time access',
            values: 'Hash table performance'
          },
          {
            name: 'Batch Loading',
            formula: 'Promise.all([p₁, p₂, ..., pₙ])',
            description: 'Load multiple assets concurrently',
            values: 'Parallel execution'
          }
        ]
      },
      9: {
        title: 'Sprite Module Formulas',
        formulas: [
          {
            name: 'Frame Index to Grid',
            formula: 'column = frameIndex mod columns\nrow = ⌊frameIndex / columns⌋',
            description: 'Convert 1D frame index to 2D grid coordinates',
            values: 'Modulo and floor division'
          },
          {
            name: 'Source Rectangle',
            formula: 'sx = column × frameWidth\nsy = row × frameHeight',
            description: 'Calculate source rectangle position in sprite sheet',
            values: 'Pixel coordinates'
          },
          {
            name: 'Animation Timing',
            formula: 'if (time ≥ speed) { frame++; time = 0; }',
            description: 'Advance frame when time threshold reached',
            values: 'Frame-based animation'
          }
        ]
      },
      10: {
        title: 'Effects Module Formulas',
        formulas: [
          {
            name: 'Multiply Blend',
            formula: 'result = source × destination',
            description: 'Component-wise multiplication',
            values: 'Darkens colors'
          },
          {
            name: 'Screen Blend',
            formula: 'result = 1 - (1-source) × (1-destination)',
            description: 'Inverse multiply',
            values: 'Lightens colors'
          },
          {
            name: 'Blur Filter',
            formula: 'pixel = Σ(neighbors × weights) / Σ(weights)',
            description: 'Weighted average of neighboring pixels',
            values: 'Gaussian distribution'
          }
        ]
      }
    },
    core: {
      1: {
        title: 'Canvas Initialization Formulas',
        formulas: [
          {
            name: 'Canvas Resolution',
            formula: 'canvas.width = W\ncanvas.height = H',
            description: 'Set internal resolution (pixels)',
            values: 'W = 800, H = 600 (example)'
          },
          {
            name: 'Aspect Ratio',
            formula: 'aspectRatio = width / height',
            description: 'Ratio of width to height',
            values: 'aspectRatio = 800 / 600 = 1.333'
          },
          {
            name: 'Pixel Density',
            formula: 'pixelRatio = devicePixelRatio',
            description: 'Device pixel ratio for high-DPI displays',
            values: 'pixelRatio = 1 (standard), 2 (Retina), 3 (high-DPI)'
          }
        ]
      },
      2: {
        title: 'Game Loop Formulas',
        formulas: [
          {
            name: 'Delta Time',
            formula: 'Δt = (t_current - t_last) / 1000',
            description: 'Time elapsed since last frame (seconds)',
            values: 'Δt ≈ 0.0167s (60fps)'
          },
          {
            name: 'Frame Rate',
            formula: 'FPS = frames / time_interval',
            description: 'Frames per second calculation',
            values: 'FPS = 60 (target)'
          },
          {
            name: 'Frame Time',
            formula: 'frameTime = 1 / FPS',
            description: 'Time per frame',
            values: 'frameTime = 1/60 = 0.0167s'
          },
          {
            name: 'Delta Time Clamping',
            formula: 'Δt_clamped = min(Δt, max_dt)',
            description: 'Prevent large time jumps',
            values: 'max_dt = 0.1s (100ms)'
          }
        ]
      },
      3: {
        title: 'Timing Formulas',
        formulas: [
          {
            name: 'Performance Time',
            formula: 't = performance.now()',
            description: 'High-resolution timestamp (milliseconds)',
            values: 't = current time in ms'
          },
          {
            name: 'FPS Update',
            formula: 'if (t - t_last_fps >= 1000) {\n  fps = frame_count\n  frame_count = 0\n}',
            description: 'Update FPS counter every second',
            values: 'Update interval = 1000ms'
          },
          {
            name: 'Frame Count',
            formula: 'frame_count++',
            description: 'Increment frame counter each frame',
            values: 'frame_count = total frames in interval'
          }
        ]
      }
    },
    renderer: {
      1: {
        title: 'Shape Drawing Formulas',
        formulas: [
          {
            name: 'Rectangle Area',
            formula: 'area = width × height',
            description: 'Area of rectangle',
            values: 'area = 100 × 50 = 5000 pixels²'
          },
          {
            name: 'Circle Area',
            formula: 'area = π × radius²',
            description: 'Area of circle',
            values: 'area = π × 25² ≈ 1963.5 pixels²'
          },
          {
            name: 'Circle Circumference',
            formula: 'circumference = 2 × π × radius',
            description: 'Perimeter of circle',
            values: 'circumference = 2 × π × 25 ≈ 157.08 pixels'
          },
          {
            name: 'Arc Angle',
            formula: 'angle = (endAngle - startAngle)',
            description: 'Angle span of arc',
            values: 'Full circle: angle = 2π radians'
          }
        ]
      },
      2: {
        title: 'Transformation Formulas',
        formulas: [
          {
            name: 'Translation Matrix',
            formula: 'T(x, y) = [1  0  x]\n          [0  1  y]\n          [0  0  1]',
            description: 'Translation transformation matrix',
            values: 'Moves point by (x, y)'
          },
          {
            name: 'Rotation Matrix',
            formula: 'R(θ) = [cos(θ)  -sin(θ)  0]\n        [sin(θ)   cos(θ)  0]\n        [0        0       1]',
            description: 'Rotation transformation matrix',
            values: 'Rotates by angle θ (radians)'
          },
          {
            name: 'Scale Matrix',
            formula: 'S(sx, sy) = [sx  0   0]\n            [0   sy  0]\n            [0   0   1]',
            description: 'Scaling transformation matrix',
            values: 'Scales by sx horizontally, sy vertically'
          },
          {
            name: 'Matrix Composition',
            formula: 'M = T × R × S',
            description: 'Combine transformations (scale → rotate → translate)',
            values: 'Applied in reverse order'
          },
          {
            name: 'Transformed Point',
            formula: 'P\' = M × P',
            description: 'Apply transformation to point',
            values: 'P\' = transformed point'
          }
        ]
      },
      3: {
        title: 'Text and Sprite Formulas',
        formulas: [
          {
            name: 'Text Width',
            formula: 'width = ctx.measureText(text).width',
            description: 'Measure rendered text width',
            values: 'width = pixels'
          },
          {
            name: 'Aspect Ratio Preservation',
            formula: 'height = width × (imageHeight / imageWidth)',
            description: 'Maintain image aspect ratio',
            values: 'height = scaled height'
          },
          {
            name: 'Sprite Sheet Coordinates',
            formula: 'spriteX = (index % cols) × spriteWidth\nspriteY = floor(index / cols) × spriteHeight',
            description: 'Calculate sprite position in sprite sheet',
            values: 'index = sprite index, cols = columns per row'
          }
        ]
      }
    },
    scene: {
      1: {
        title: 'Entity Management Formulas',
        formulas: [
          {
            name: 'Entity Count',
            formula: 'count = entities.length',
            description: 'Number of entities in scene',
            values: 'count = total entities'
          },
          {
            name: 'Add Entity',
            formula: 'entities.push(entity)',
            description: 'Add entity to scene',
            values: 'O(1) operation'
          },
          {
            name: 'Remove Entity',
            formula: 'entities.splice(index, 1)',
            description: 'Remove entity from scene',
            values: 'O(n) operation'
          },
          {
            name: 'Entity Index',
            formula: 'index = entities.indexOf(entity)',
            description: 'Find entity index',
            values: 'index = -1 if not found'
          }
        ]
      },
      2: {
        title: 'Hierarchy Formulas',
        formulas: [
          {
            name: 'World Position',
            formula: 'worldPos = parent.worldPos + rotate(localPos, parent.worldRot) × parent.worldScale',
            description: 'Calculate world position from local position',
            values: 'Accounts for parent transform'
          },
          {
            name: 'World Rotation',
            formula: 'worldRot = parent.worldRot + localRot',
            description: 'Calculate world rotation',
            values: 'Rotations add together'
          },
          {
            name: 'World Scale',
            formula: 'worldScale = parent.worldScale × localScale',
            description: 'Calculate world scale',
            values: 'Scales multiply together'
          },
          {
            name: 'Rotation Transform',
            formula: 'x\' = x × cos(θ) - y × sin(θ)\ny\' = x × sin(θ) + y × cos(θ)',
            description: 'Rotate point by angle θ',
            values: 'θ = rotation angle (radians)'
          }
        ]
      },
      3: {
        title: 'Query Formulas',
        formulas: [
          {
            name: 'Distance Check',
            formula: 'distance = √((x₂ - x₁)² + (y₂ - y₁)²)',
            description: 'Euclidean distance between points',
            values: 'distance = pixels'
          },
          {
            name: 'Squared Distance',
            formula: 'distance² = (x₂ - x₁)² + (y₂ - y₁)²',
            description: 'Squared distance (faster, no sqrt)',
            values: 'Use for comparisons'
          },
          {
            name: 'Radius Check',
            formula: 'inside = distance <= radius',
            description: 'Check if point is within radius',
            values: 'inside = boolean'
          },
          {
            name: 'Bounding Box Check',
            formula: 'inside = x >= minX && x <= maxX && y >= minY && y <= maxY',
            description: 'Check if point is in bounding box',
            values: 'inside = boolean'
          }
        ]
      }
    },
    entity: {
      1: {
        title: 'Transform Formulas',
        formulas: [
          {
            name: 'Position',
            formula: 'P = (x, y)',
            description: 'Entity position in world space',
            values: 'P = position vector'
          },
          {
            name: 'Rotation',
            formula: 'θ = rotation (radians)',
            description: 'Entity rotation angle',
            values: 'θ = 0 to 2π'
          },
          {
            name: 'Scale',
            formula: 'S = (sx, sy)',
            description: 'Entity scale factors',
            values: 'sx, sy = scale multipliers'
          },
          {
            name: 'Degrees to Radians',
            formula: 'radians = degrees × π / 180',
            description: 'Convert angle units',
            values: '180° = π radians'
          }
        ]
      },
      2: {
        title: 'World Transform Formulas',
        formulas: [
          {
            name: 'World Position',
            formula: 'P_world = P_parent + R_parent × S_parent × P_local',
            description: 'World position calculation',
            values: 'P_world = final world position'
          },
          {
            name: 'World Rotation',
            formula: 'θ_world = θ_parent + θ_local',
            description: 'World rotation calculation',
            values: 'Rotations add'
          },
          {
            name: 'World Scale',
            formula: 'S_world = S_parent × S_local',
            description: 'World scale calculation',
            values: 'Scales multiply'
          },
          {
            name: 'Transform Order',
            formula: 'M = T × R × S',
            description: 'Transformation order: scale → rotate → translate',
            values: 'Applied in reverse order'
          }
        ]
      },
      3: {
        title: 'Lifecycle Formulas',
        formulas: [
          {
            name: 'Update Frequency',
            formula: 'updates_per_second = 1 / Δt',
            description: 'Update rate',
            values: '≈ 60 updates/sec (60fps)'
          },
          {
            name: 'Frame-Independent Movement',
            formula: 'position += velocity × Δt',
            description: 'Movement independent of frame rate',
            values: 'velocity = pixels/second'
          },
          {
            name: 'Acceleration',
            formula: 'velocity += acceleration × Δt',
            description: 'Update velocity with acceleration',
            values: 'acceleration = pixels/second²'
          },
          {
            name: 'Render Order',
            formula: 'for each entity: render(entity)',
            description: 'Render all entities each frame',
            values: 'Order matters for layering'
          }
        ]
      }
    },
    input: {
      1: {
        title: 'Coordinate Conversion Formulas',
        formulas: [
          {
            name: 'Screen to Canvas',
            formula: 'canvasX = screenX - canvas.offsetLeft\ncanvasY = screenY - canvas.offsetTop',
            description: 'Convert screen coordinates to canvas coordinates',
            values: 'Accounts for canvas position on page'
          },
          {
            name: 'Bounding Rect',
            formula: 'rect = canvas.getBoundingClientRect()',
            description: 'Get canvas position and size',
            values: 'rect.left, rect.top = position'
          },
          {
            name: 'Coordinate System',
            formula: 'Origin: (0, 0) at top-left\nX: increases right\nY: increases down',
            description: 'Canvas coordinate system',
            values: 'Standard 2D graphics coordinate system'
          }
        ]
      },
      2: {
        title: 'Hit Testing Formulas',
        formulas: [
          {
            name: 'Point in Rectangle',
            formula: 'inside = x >= rect.x && x <= rect.x + rect.width &&\n         y >= rect.y && y <= rect.y + rect.height',
            description: 'Check if point is inside rectangle',
            values: 'inside = boolean'
          },
          {
            name: 'Point in Circle',
            formula: 'distance = √((x - cx)² + (y - cy)²)\ninside = distance <= radius',
            description: 'Check if point is inside circle',
            values: 'inside = boolean'
          },
          {
            name: 'Bounding Box',
            formula: 'left = x - width/2\nright = x + width/2\ntop = y - height/2\nbottom = y + height/2',
            description: 'Calculate bounding box from center',
            values: 'For centered entities'
          }
        ]
      },
      3: {
        title: 'Touch Formulas',
        formulas: [
          {
            name: 'Touch Count',
            formula: 'count = touches.length',
            description: 'Number of active touches',
            values: 'count = 0 to n'
          },
          {
            name: 'Touch Position',
            formula: 'touchX = touch.clientX - rect.left\ntouchY = touch.clientY - rect.top',
            description: 'Convert touch screen coordinates to canvas',
            values: 'Same as mouse conversion'
          },
          {
            name: 'Multi-Touch Distance',
            formula: 'distance = √((x₂ - x₁)² + (y₂ - y₁)²)',
            description: 'Distance between two touches',
            values: 'For pinch/zoom gestures'
          }
        ]
      }
    },
    utils: {
      1: {
        title: 'Vector Formulas',
        formulas: [
          {
            name: 'Vector Addition',
            formula: 'v₁ + v₂ = (x₁ + x₂, y₁ + y₂)',
            description: 'Add two vectors component-wise',
            values: 'Result is new vector'
          },
          {
            name: 'Vector Subtraction',
            formula: 'v₁ - v₂ = (x₁ - x₂, y₁ - y₂)',
            description: 'Subtract two vectors component-wise',
            values: 'Result is new vector'
          },
          {
            name: 'Scalar Multiplication',
            formula: 'v × s = (x × s, y × s)',
            description: 'Multiply vector by scalar',
            values: 'Scales vector magnitude'
          },
          {
            name: 'Vector Length',
            formula: '|v| = √(x² + y²)',
            description: 'Magnitude (length) of vector',
            values: '|v| = distance from origin'
          },
          {
            name: 'Normalization',
            formula: 'v̂ = v / |v|',
            description: 'Unit vector (length = 1)',
            values: 'Preserves direction, sets length to 1'
          },
          {
            name: 'Dot Product',
            formula: 'v₁ · v₂ = x₁ × x₂ + y₁ × y₂',
            description: 'Dot product of two vectors',
            values: 'Scalar result'
          }
        ]
      },
      2: {
        title: 'Distance and Angle Formulas',
        formulas: [
          {
            name: 'Euclidean Distance',
            formula: 'd = √((x₂ - x₁)² + (y₂ - y₁)²)',
            description: 'Distance between two points',
            values: 'd = distance in pixels'
          },
          {
            name: 'Squared Distance',
            formula: 'd² = (x₂ - x₁)² + (y₂ - y₁)²',
            description: 'Squared distance (faster)',
            values: 'Use for comparisons (avoid sqrt)'
          },
          {
            name: 'Angle Calculation',
            formula: 'θ = atan2(y₂ - y₁, x₂ - x₁)',
            description: 'Angle from point 1 to point 2',
            values: 'θ = angle in radians'
          },
          {
            name: 'Angle from Dot Product',
            formula: 'θ = arccos((v₁ · v₂) / (|v₁| × |v₂|))',
            description: 'Angle between two vectors',
            values: 'θ = angle in radians'
          },
          {
            name: 'Direction Vector',
            formula: 'dir = normalize(target - source)',
            description: 'Normalized direction vector',
            values: 'dir = unit vector pointing from source to target'
          }
        ]
      },
      3: {
        title: 'Utility Formulas',
        formulas: [
          {
            name: 'Linear Interpolation',
            formula: 'lerp(a, b, t) = a + (b - a) × t',
            description: 'Interpolate between two values',
            values: 't ∈ [0, 1]'
          },
          {
            name: 'Clamp',
            formula: 'clamp(x, min, max) = min(max(x, min), max)',
            description: 'Clamp value to range',
            values: 'Result ∈ [min, max]'
          },
          {
            name: 'Map Range',
            formula: 'map(x, inMin, inMax, outMin, outMax) = (x - inMin) × (outMax - outMin) / (inMax - inMin) + outMin',
            description: 'Map value from one range to another',
            values: 'Linear mapping'
          },
          {
            name: 'Random Number',
            formula: 'random(min, max) = min + rand() × (max - min)',
            description: 'Random number in range',
            values: 'Result ∈ [min, max)'
          },
          {
            name: 'Timer Progress',
            formula: 'progress = elapsed / duration',
            description: 'Timer progress (0 to 1)',
            values: 'progress ∈ [0, 1]'
          }
        ]
      }
    },
    assetloader: {
      1: {
        title: 'AssetLoader Formulas',
        formulas: [
          {
            name: 'Progress Calculation',
            formula: 'progress = loaded / total',
            description: 'Loading progress from 0 to 1',
            values: 'progress ∈ [0, 1]'
          },
          {
            name: 'Cache Lookup',
            formula: 'O(1) lookup time',
            description: 'Map-based cache provides constant-time access',
            values: 'Time complexity: O(1)'
          }
        ]
      },
      2: {
        title: 'Image Loading Formulas',
        formulas: [
          {
            name: 'Image Loading Promise',
            formula: 'Promise<Image> = loadImage(name, src)',
            description: 'Returns Promise that resolves with Image object',
            values: 'Async operation'
          },
          {
            name: 'Error Rate',
            formula: 'errorRate = failed / total',
            description: 'Percentage of failed loads',
            values: 'errorRate ∈ [0, 1]'
          }
        ]
      },
      3: {
        title: 'Caching Formulas',
        formulas: [
          {
            name: 'Cache Hit Rate',
            formula: 'hitRate = cacheHits / totalRequests',
            description: 'Percentage of requests served from cache',
            values: 'hitRate ∈ [0, 1]'
          },
          {
            name: 'Memory Usage',
            formula: 'memory = Σ(image.width × image.height × 4 bytes)',
            description: 'Total memory used by cached images (RGBA)',
            values: 'Bytes per image'
          }
        ]
      },
      4: {
        title: 'Batch Loading Formulas',
        formulas: [
          {
            name: 'Parallel Loading Time',
            formula: 'time = max(loadTime₁, loadTime₂, ..., loadTimeₙ)',
            description: 'Total time equals slowest asset load',
            values: 'Faster than sequential loading'
          },
          {
            name: 'Sequential Loading Time',
            formula: 'time = Σ(loadTime₁ + loadTime₂ + ... + loadTimeₙ)',
            description: 'Total time equals sum of all load times',
            values: 'Slower than parallel'
          }
        ]
      },
      5: {
        title: 'Progress Tracking Formulas',
        formulas: [
          {
            name: 'Progress Percentage',
            formula: 'percentage = (loaded / total) × 100%',
            description: 'Progress as percentage',
            values: 'percentage ∈ [0, 100]'
          },
          {
            name: 'Remaining Assets',
            formula: 'remaining = total - loaded - failed',
            description: 'Number of assets still loading',
            values: 'remaining ≥ 0'
          }
        ]
      },
      6: {
        title: 'Complete AssetLoader Formulas',
        formulas: [
          {
            name: 'Asset Retrieval',
            formula: 'asset = cache.get(name)',
            description: 'Get cached asset by name',
            values: 'O(1) lookup'
          },
          {
            name: 'Loading Efficiency',
            formula: 'efficiency = loaded / (loaded + failed)',
            description: 'Success rate of loading',
            values: 'efficiency ∈ [0, 1]'
          }
        ]
      }
    },
    sprite: {
      1: {
        title: 'Sprite Formulas',
        formulas: [
          {
            name: 'Sprite Position',
            formula: 'worldPos = entity.position + parent.position',
            description: 'World position including parent transform',
            values: 'Vector addition'
          },
          {
            name: 'Sprite Scale',
            formula: 'worldScale = entity.scale × parent.scale',
            description: 'World scale including parent transform',
            values: 'Component-wise multiplication'
          }
        ]
      },
      2: {
        title: 'Basic Sprite Formulas',
        formulas: [
          {
            name: 'Image Aspect Ratio',
            formula: 'aspectRatio = image.width / image.height',
            description: 'Width to height ratio',
            values: 'Maintains proportions'
          },
          {
            name: 'Scaled Dimensions',
            formula: 'scaledWidth = baseWidth × scaleX\nscaledHeight = baseHeight × scaleY',
            description: 'Sprite size after scaling',
            values: 'Maintains aspect ratio if scaleX = scaleY'
          }
        ]
      },
      3: {
        title: 'Sprite Sheet Formulas',
        formulas: [
          {
            name: 'Frame Column',
            formula: 'column = frameIndex % columns',
            description: 'Column position in sprite sheet',
            values: 'column ∈ [0, columns-1]'
          },
          {
            name: 'Frame Row',
            formula: 'row = floor(frameIndex / columns)',
            description: 'Row position in sprite sheet',
            values: 'row ≥ 0'
          },
          {
            name: 'Source X Coordinate',
            formula: 'sourceX = column × frameWidth',
            description: 'X position of frame in sprite sheet',
            values: 'Pixel coordinate'
          },
          {
            name: 'Source Y Coordinate',
            formula: 'sourceY = row × frameHeight',
            description: 'Y position of frame in sprite sheet',
            values: 'Pixel coordinate'
          },
          {
            name: 'Total Frames',
            formula: 'totalFrames = (imageWidth / frameWidth) × (imageHeight / frameHeight)',
            description: 'Total number of frames in sprite sheet',
            values: 'Integer division'
          }
        ]
      },
      4: {
        title: 'Animation Formulas',
        formulas: [
          {
            name: 'Frame Advance',
            formula: 'if (animationTime ≥ speed) then currentFrame++',
            description: 'Advance frame when time threshold reached',
            values: 'Time-based animation'
          },
          {
            name: 'Animation Time',
            formula: 'animationTime += deltaTime',
            description: 'Accumulate time for animation',
            values: 'Continuous accumulation'
          },
          {
            name: 'Frame Index',
            formula: 'frameIndex = frames[currentFrame]',
            description: 'Get actual frame index from sequence',
            values: 'May skip frames'
          },
          {
            name: 'Animation Duration',
            formula: 'duration = frames.length × speed',
            description: 'Total time for one animation cycle',
            values: 'Seconds'
          }
        ]
      },
      5: {
        title: 'Animation State Formulas',
        formulas: [
          {
            name: 'State Transition',
            formula: 'if (condition) then playAnimation(newState)',
            description: 'Switch animation based on game state',
            values: 'State machine logic'
          },
          {
            name: 'Loop Reset',
            formula: 'if (currentFrame ≥ frames.length) then currentFrame = 0',
            description: 'Reset to first frame for looping',
            values: 'Only if loop = true'
          }
        ]
      },
      6: {
        title: 'Complete Sprite Formulas',
        formulas: [
          {
            name: 'Sprite Rendering',
            formula: 'render(sprite) = drawImage(image, sourceRect, destRect)',
            description: 'Draw sprite frame at world position',
            values: 'Applies all transforms'
          },
          {
            name: 'Animation Frame Rate',
            formula: 'fps = 1 / speed',
            description: 'Frames per second for animation',
            values: 'fps = frames/second'
          }
        ]
      }
    },
    effects: {
      1: {
        title: 'Effects Formulas',
        formulas: [
          {
            name: 'Blend Mode Operation',
            formula: 'result = blend(source, destination)',
            description: 'Blend modes combine source and destination colors. See: Vector & Matrix Operations → Vector Operations (component-wise operations).',
            values: 'Different formulas for each blend mode'
          },
          {
            name: 'Filter Application',
            formula: 'output = filter(input)',
            description: 'Filters transform input colors to output colors. See: Vector & Matrix Operations → Matrix Operations (linear transformations).',
            values: 'Applied per pixel'
          }
        ]
      },
      2: {
        title: 'Blend Mode Formulas',
        formulas: [
          {
            name: 'Multiply Blend',
            formula: 'result = source × destination',
            description: 'Multiplies color components. Darkens image. See: Vector & Matrix Operations → Vector Operations (component-wise multiplication).',
            values: 'Each RGB component multiplied separately'
          },
          {
            name: 'Screen Blend',
            formula: 'result = 1 - (1-source) × (1-destination)',
            description: 'Inverts, multiplies, inverts. Lightens image. See: Vector & Matrix Operations → Vector Operations (vector complement, subtraction).',
            values: 'Mathematical complement of multiply'
          },
          {
            name: 'Overlay Blend',
            formula: 'if (dest < 0.5) result = 2 × multiply\nelse result = 2 × screen - 1',
            description: 'Combines multiply and screen based on destination brightness. See: Vector & Matrix Operations → Vector Operations (conditional operations).',
            values: 'Conditional blend mode'
          }
        ]
      },
      3: {
        title: 'Filter Formulas',
        formulas: [
          {
            name: 'Blur Filter',
            formula: 'pixel = average(neighborhood)',
            description: 'Averages pixel with surrounding pixels. See: Vector & Matrix Operations → Matrix Operations (matrix convolution, weighted averages).',
            values: 'Gaussian distribution weighting'
          },
          {
            name: 'Shadow Offset',
            formula: 'shadowX = x + offsetX\nshadowY = y + offsetY',
            description: 'Shadow position offset from object. See: 3D Transformations & Projections → Translation (2D vector addition).',
            values: 'Pixel coordinates'
          },
          {
            name: 'Shadow Blur',
            formula: 'shadow = blur(shape, blurRadius)',
            description: 'Blur applied to shadow shape. See: Vector & Matrix Operations → Matrix Operations (Gaussian convolution).',
            values: 'Gaussian blur with specified radius'
          }
        ]
      },
      4: {
        title: 'Color Adjustment Formulas',
        formulas: [
          {
            name: 'Brightness',
            formula: 'result = color × brightness',
            description: 'Multiplies color by brightness value. See: Vector & Matrix Operations → Vector Operations (scalar multiplication).',
            values: 'brightness ∈ [0, ∞), 1 = normal'
          },
          {
            name: 'Contrast',
            formula: 'result = (color - 0.5) × contrast + 0.5',
            description: 'Expands or contracts color range around midpoint. See: Animation & Interpolation → Linear Interpolation (range mapping, LERP).',
            values: 'contrast ∈ [0, ∞), 1 = normal'
          },
          {
            name: 'Saturation',
            formula: 'gray = 0.299×R + 0.587×G + 0.114×B\nresult = lerp(gray, color, saturation)',
            description: 'Interpolates between grayscale and color. See: Animation & Interpolation → Linear Interpolation (LERP), Vector & Matrix Operations → Dot Product (grayscale calculation).',
            values: 'saturation ∈ [0, ∞), 1 = normal'
          },
          {
            name: 'Hue Rotation',
            formula: 'RGB → HSL → rotate H → RGB',
            description: 'Converts to HSL, rotates hue, converts back. See: 3D Transformations & Projections → Rotation (coordinate space rotation), Coordinate Transformations (color space transforms).',
            values: 'rotation ∈ [0°, 360°]'
          }
        ]
      },
      5: {
        title: 'Post-Processing Formulas',
        formulas: [
          {
            name: 'Offscreen Rendering',
            formula: 'offscreen = renderScene()',
            description: 'Render scene to offscreen canvas. See: 3D Transformations & Projections → Coordinate Systems (multiple coordinate spaces).',
            values: 'Complete scene rendered'
          },
          {
            name: 'Effect Application',
            formula: 'output = applyEffect(offscreen)',
            description: 'Apply effect to offscreen canvas. See: Vector & Matrix Operations → Matrix Operations (matrix transformations on image data).',
            values: 'Effect transforms entire image'
          },
          {
            name: 'Final Display',
            formula: 'mainCanvas = output',
            description: 'Draw processed result to main canvas. See: 3D Transformations & Projections → Coordinate Transformations (viewport transformation).',
            values: 'Final image displayed'
          }
        ]
      },
      6: {
        title: 'Complete Effects Formulas',
        formulas: [
          {
            name: 'Effect Pipeline',
            formula: 'result = postProcess(applyFilters(blend(draw(), background)))',
            description: 'Complete effect pipeline. See: 3D Transformations & Projections → Matrix Multiplication (composing transformations).',
            values: 'Combines all effect stages'
          },
          {
            name: 'Performance',
            formula: 'cost = renderCost + filterCost × pixelCount',
            description: 'Post-processing cost scales with pixel count. See: Vector & Matrix Operations → Matrix Operations (computational complexity, O(n) operations).',
            values: 'Optimize by reducing resolution or effects'
          }
        ]
      }
    }
  };

  return formulas[module] && formulas[module][step] ? formulas[module][step] : null;
};

