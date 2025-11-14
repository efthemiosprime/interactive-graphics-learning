// Theory and explanations for 2D Engine Tutorial

export const getEngine2DTheory = (module, step) => {
  const theories = {
    setup: {
      1: {
        title: 'Step 1: Project Setup with Vite.js',
        description: 'Vite.js is a modern build tool that provides fast development and optimized production builds. We\'ll set up a new project structure for our 2D engine.',
        concepts: [
          {
            name: 'Vite.js Installation',
            description: 'Vite creates a fast development server with Hot Module Replacement (HMR) for instant updates during development.',
            code: 'npm create vite@latest engine2d-tutorial -- --template vanilla\ncd engine2d-tutorial\nnpm install'
          },
          {
            name: 'Project Structure',
            description: 'Organize code into logical modules: engine2D/ for core engine code, src/ for application code, public/ for assets.',
            code: 'engine2d-tutorial/\n  ├── src/\n  │   ├── engine2D/\n  │   │   ├── Core.js\n  │   │   ├── Renderer.js\n  │   │   └── ...\n  │   └── main.js\n  ├── public/\n  └── package.json'
          },
          {
            name: 'ES6 Modules',
            description: 'Use ES6 import/export for modular code organization. Each module exports classes/functions for reuse.',
            code: '// Core.js\nexport class Engine2D { ... }\n\n// main.js\nimport { Engine2D } from "./engine2D/Core.js";'
          }
        ],
        geometricMeaning: 'Project structure creates a hierarchy: root → modules → classes → methods. This organization enables code reuse and maintainability.',
        applications: [
          'Game engine development',
          'Modular architecture',
          'Code organization',
          'Team collaboration'
        ]
      },
      2: {
        title: 'Step 2: Creating the Core Module',
        description: 'The Core module initializes the canvas and manages the game loop. It\'s the foundation that all other modules depend on.',
        concepts: [
          {
            name: 'Canvas Initialization',
            description: 'Create canvas element and get 2D rendering context. Set canvas dimensions for desired resolution.',
            code: 'const canvas = document.createElement("canvas");\nconst ctx = canvas.getContext("2d");\ncanvas.width = 800;\ncanvas.height = 600;'
          },
          {
            name: 'Game Loop',
            description: 'Continuous loop that updates game state and renders graphics. Uses requestAnimationFrame for smooth 60 FPS.',
            code: 'function loop() {\n  update(deltaTime);\n  render(ctx);\n  requestAnimationFrame(loop);\n}'
          },
          {
            name: 'Delta Time',
            description: 'Time elapsed since last frame. Ensures consistent movement regardless of frame rate.',
            code: 'const now = performance.now();\nconst deltaTime = (now - lastTime) / 1000;\nlastTime = now;'
          }
        ],
        geometricMeaning: 'Game loop creates a timeline: Frame 1 → Update → Render → Frame 2 → Update → Render. Delta time measures intervals between frames.',
        applications: [
          'Animation systems',
          'Physics simulation',
          'Game state management',
          'Performance monitoring'
        ]
      },
      3: {
        title: 'Step 3: Creating the Renderer Module',
        description: 'The Renderer module provides drawing functions for shapes, sprites, and text. It wraps Canvas 2D API with a clean interface.',
        concepts: [
          {
            name: 'Drawing Primitives',
            description: 'Basic shapes: rectangles (fillRect), circles (arc), lines (moveTo, lineTo). Each uses canvas context methods.',
            code: 'fillRect(x, y, width, height)\narc(x, y, radius, startAngle, endAngle)\nfillText(text, x, y)'
          },
          {
            name: 'Transform Stack',
            description: 'save() and restore() create a transform stack. Allows nested transformations without affecting parent transforms.',
            code: 'ctx.save();\nctx.translate(x, y);\nctx.rotate(angle);\n// Draw here\nctx.restore();'
          },
          {
            name: 'Coordinate Transformation',
            description: 'Transform matrix applies: scale → rotate → translate. Order matters: transformations are applied right-to-left.',
            code: 'ctx.setTransform(a, b, c, d, e, f);\n// Matrix: [a c e]\n//        [b d f]\n//        [0 0 1]'
          }
        ],
        geometricMeaning: 'Renderer transforms coordinates: Local Space → Transform → World Space → Viewport → Screen. Each transformation modifies the coordinate system.',
        applications: [
          '2D graphics rendering',
          'Sprite drawing',
          'UI rendering',
          'Visual effects'
        ]
      },
      4: {
        title: 'Step 4: Creating the Scene Module',
        description: 'The Scene module manages all entities in the game world. It provides methods to add, remove, update, and render entities.',
        concepts: [
          {
            name: 'Entity Collection',
            description: 'Store entities in an array. Scene iterates through entities for update and render operations.',
            code: 'class Scene {\n  constructor() {\n    this.entities = [];\n  }\n  add(entity) { this.entities.push(entity); }\n}'
          },
          {
            name: 'Entity Hierarchy',
            description: 'Entities can have parent-child relationships. Child transforms are relative to parent.',
            code: 'entity.parent = parentEntity;\nparentEntity.children.push(entity);'
          },
          {
            name: 'Spatial Queries',
            description: 'Find entities by position, type, or other criteria. Useful for collision detection and game logic.',
            code: 'findByPosition(x, y) {\n  return this.entities.filter(e => \n    e.x === x && e.y === y\n  );\n}'
          }
        ],
        geometricMeaning: 'Scene creates a tree structure: Root → Entities → Children. Transform hierarchy: World = Parent Transform × Local Transform.',
        applications: [
          'Game world management',
          'Entity organization',
          'Collision detection',
          'Scene graphs'
        ]
      },
      5: {
        title: 'Step 5: Creating the Entity Module',
        description: 'The Entity module is the base class for all drawable objects. It provides position, rotation, scale, and hierarchical transforms.',
        concepts: [
          {
            name: 'Transform Properties',
            description: 'Position (x, y), rotation (angle in radians), scale (scaleX, scaleY). These define the entity\'s transform.',
            code: 'class Entity {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n    this.rotation = 0;\n    this.scaleX = 1;\n    this.scaleY = 1;\n  }\n}'
          },
          {
            name: 'World Transform',
            description: 'Calculate world position/rotation/scale by combining parent transforms. Recursively applies parent transforms.',
            code: 'getWorldX() {\n  if (this.parent) {\n    return this.parent.getWorldX() + this.x;\n  }\n  return this.x;\n}'
          },
          {
            name: 'Transform Matrix',
            description: 'Convert transform properties to 3×3 matrix. Matrix multiplication combines transforms efficiently.',
            code: '// Transform order: Scale → Rotate → Translate\n// Matrix: T × R × S'
          }
        ],
        geometricMeaning: 'Entity transforms create a transformation chain: Local → Parent → World. Matrix multiplication combines transforms: M_world = M_parent × M_local.',
        applications: [
          'Game objects',
          'Hierarchical transforms',
          'Sprite positioning',
          'Scene graph nodes'
        ]
      },
      6: {
        title: 'Step 6: Creating the Input Module',
        description: 'The Input module handles mouse and touch events. It tracks cursor position, button states, and dispatches events to entities.',
        concepts: [
          {
            name: 'Event Listeners',
            description: 'Attach listeners to canvas for mouse/touch events. Track position, button states, and movement.',
            code: 'canvas.addEventListener("mousemove", (e) => {\n  const rect = canvas.getBoundingClientRect();\n  mouseX = e.clientX - rect.left;\n  mouseY = e.clientY - rect.top;\n});'
          },
          {
            name: 'Coordinate Conversion',
            description: 'Convert screen coordinates to canvas coordinates. Account for canvas position and scaling.',
            code: 'screenToCanvas(screenX, screenY) {\n  const rect = canvas.getBoundingClientRect();\n  return {\n    x: (screenX - rect.left) * (canvas.width / rect.width),\n    y: (screenY - rect.top) * (canvas.height / rect.height)\n  };\n}'
          },
          {
            name: 'Hit Testing',
            description: 'Determine which entity is under the cursor. Check if point is within entity bounds.',
            code: 'hitTest(x, y) {\n  return entities.find(e => \n    x >= e.x && x <= e.x + e.width &&\n    y >= e.y && y <= e.y + e.height\n  );\n}'
          }
        ],
        geometricMeaning: 'Input maps screen coordinates to world coordinates: Screen (px) → Canvas (px) → World (units). Hit testing uses point-in-rectangle geometry.',
        applications: [
          'Mouse interaction',
          'Touch controls',
          'UI elements',
          'Game controls'
        ]
      },
      7: {
        title: 'Step 7: Creating the Utils Module',
        description: 'The Utils module provides mathematical helpers and timing utilities. It includes vector math, distance calculations, and interpolation.',
        concepts: [
          {
            name: 'Vector Math',
            description: '2D vectors for positions and directions. Operations: add, subtract, multiply, length, normalize.',
            code: 'class Vec2 {\n  add(other) { return new Vec2(this.x + other.x, this.y + other.y); }\n  length() { return Math.sqrt(this.x**2 + this.y**2); }\n  normalize() { const len = this.length(); return new Vec2(this.x/len, this.y/len); }\n}'
          },
          {
            name: 'Distance Calculation',
            description: 'Euclidean distance between two points using Pythagorean theorem.',
            code: 'distance(x1, y1, x2, y2) {\n  const dx = x2 - x1;\n  const dy = y2 - y1;\n  return Math.sqrt(dx*dx + dy*dy);\n}'
          },
          {
            name: 'Interpolation',
            description: 'Linear interpolation (LERP) smoothly transitions between values. Used for animations and easing.',
            code: 'lerp(start, end, t) {\n  return start + (end - start) * t;\n}\n// t ∈ [0, 1]'
          }
        ],
        geometricMeaning: 'Vector math operates in 2D space: vectors represent points/directions, distance uses Euclidean geometry, interpolation creates smooth paths.',
        applications: [
          'Movement calculations',
          'Collision detection',
          'Animation easing',
          'Mathematical utilities'
        ]
      },
      8: {
        title: 'Step 8: Creating the AssetLoader Module',
        description: 'The AssetLoader module handles loading and caching of images and other assets. It provides promise-based loading with progress tracking.',
        concepts: [
          {
            name: 'Promise-Based Loading',
            description: 'Use Promises for asynchronous asset loading. Allows chaining and error handling.',
            code: 'loadImage(key, src) {\n  return new Promise((resolve, reject) => {\n    const img = new Image();\n    img.onload = () => resolve(img);\n    img.onerror = reject;\n    img.src = src;\n  });\n}'
          },
          {
            name: 'Asset Caching',
            description: 'Store loaded assets in a Map for instant retrieval. Prevents reloading the same asset.',
            code: 'class AssetLoader {\n  constructor() {\n    this.cache = new Map();\n  }\n  get(key) { return this.cache.get(key); }\n}'
          },
          {
            name: 'Batch Loading',
            description: 'Load multiple assets concurrently using Promise.all. Tracks progress across all assets.',
            code: 'async loadImages(assets) {\n  const promises = Object.entries(assets).map(\n    ([key, src]) => this.loadImage(key, src)\n  );\n  return Promise.all(promises);\n}'
          }
        ],
        geometricMeaning: 'Asset loading creates a dependency graph: Assets → Load → Cache → Use. Promise.all creates parallel loading paths.',
        applications: [
          'Image loading',
          'Resource management',
          'Preloading assets',
          'Memory optimization'
        ]
      },
      9: {
        title: 'Step 9: Creating the Sprite Module',
        description: 'The Sprite module extends Entity to add image rendering and animation. It supports sprite sheets and frame-based animation.',
        concepts: [
          {
            name: 'Sprite Sheets',
            description: 'Single image containing multiple frames. Calculate frame position from frame index and sheet dimensions.',
            code: 'setSpriteSheet(image, frameWidth, frameHeight, columns) {\n  this.frameWidth = frameWidth;\n  this.frameHeight = frameHeight;\n  this.columns = columns;\n}'
          },
          {
            name: 'Frame Calculation',
            description: 'Calculate source rectangle from frame index: column = index % columns, row = floor(index / columns).',
            code: 'getFrameSource(frameIndex) {\n  const col = frameIndex % this.columns;\n  const row = Math.floor(frameIndex / this.columns);\n  return {\n    x: col * this.frameWidth,\n    y: row * this.frameHeight\n  };\n}'
          },
          {
            name: 'Animation Timing',
            description: 'Track animation time and advance frames based on speed. Loop or play once based on animation config.',
            code: 'update(deltaTime) {\n  this.animationTime += deltaTime;\n  if (this.animationTime >= this.speed) {\n    this.currentFrame++;\n    this.animationTime = 0;\n  }\n}'
          }
        ],
        geometricMeaning: 'Sprite sheets map 2D grid to 1D frame sequence: (col, row) → frameIndex. Animation creates temporal sequence: Frame 1 → Frame 2 → Frame 3.',
        applications: [
          'Character animation',
          'Sprite rendering',
          'Frame-based animation',
          'Game graphics'
        ]
      },
      10: {
        title: 'Step 10: Creating the Effects Module',
        description: 'The Effects module provides blend modes, filters, and post-processing capabilities. It wraps Canvas 2D API effects with a clean interface.',
        concepts: [
          {
            name: 'Blend Modes',
            description: 'Control how new pixels combine with existing pixels. Set globalCompositeOperation before drawing.',
            code: 'setBlendMode(mode) {\n  this.ctx.globalCompositeOperation = mode;\n}\n// Modes: multiply, screen, overlay, etc.'
          },
          {
            name: 'Canvas Filters',
            description: 'Apply visual effects: blur, brightness, contrast, saturation. Filters affect all drawing until reset.',
            code: 'applyBlur(radius) {\n  this.ctx.filter = `blur(${radius}px)`;\n}\napplyColorAdjustment({brightness, contrast}) {\n  this.ctx.filter = `brightness(${brightness}) contrast(${contrast})`;\n}'
          },
          {
            name: 'Post-Processing',
            description: 'Render scene to offscreen canvas, apply effects, then draw to main canvas. Allows effects on entire scene.',
            code: 'applyPostProcess(sourceCanvas, filterString) {\n  const tempCanvas = createOffscreenCanvas();\n  tempCtx.drawImage(sourceCanvas, 0, 0);\n  this.ctx.filter = filterString;\n  this.ctx.drawImage(tempCanvas, 0, 0);\n}'
          }
        ],
        geometricMeaning: 'Effects transform pixel values: Blend modes combine colors mathematically, filters transform RGB values, post-processing applies effects to entire image.',
        applications: [
          'Visual effects',
          'UI styling',
          'Atmospheric effects',
          'Post-processing pipelines'
        ]
      }
    },
    core: {
      1: {
        title: 'Step 1: Canvas Initialization',
        description: 'The canvas element is the foundation of our 2D engine. It provides a drawing surface where we render all graphics.',
        concepts: [
          {
            name: 'HTML Canvas Element',
            description: 'The <canvas> element provides a resolution-dependent bitmap canvas for rendering graphics.',
            code: '<canvas id="gameCanvas"></canvas>'
          },
          {
            name: '2D Rendering Context',
            description: 'getContext("2d") returns a CanvasRenderingContext2D object that provides methods for drawing shapes, text, and images.',
            code: 'const ctx = canvas.getContext("2d");'
          },
          {
            name: 'Canvas Resolution',
            description: 'Canvas has two sizes: CSS size (display) and internal resolution (pixels). Setting width/height sets the internal resolution.',
            code: 'canvas.width = 800;\ncanvas.height = 600;'
          }
        ],
        geometricMeaning: 'The canvas creates a coordinate system with origin (0,0) at top-left. X increases right, Y increases down.',
        applications: [
          'Game rendering',
          'Interactive graphics',
          'Data visualization',
          'Animation systems'
        ]
      },
      2: {
        title: 'Step 2: Main Game Loop',
        description: 'The game loop continuously updates game state and renders graphics. It runs at the display refresh rate (typically 60fps).',
        concepts: [
          {
            name: 'requestAnimationFrame',
            description: 'requestAnimationFrame schedules a callback before the next repaint, ensuring smooth 60fps animation.',
            code: 'function loop() {\n  update();\n  render();\n  requestAnimationFrame(loop);\n}'
          },
          {
            name: 'Update-Render Cycle',
            description: 'Each frame: 1) Update game logic, 2) Clear canvas, 3) Render graphics, 4) Schedule next frame.',
            code: 'loop() {\n  update(deltaTime);\n  ctx.clearRect(0, 0, width, height);\n  render(ctx);\n  requestAnimationFrame(loop);\n}'
          },
          {
            name: 'Delta Time',
            description: 'Delta time (dt) is the time elapsed since last frame. Used for frame-rate independent movement.',
            code: 'deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds'
          }
        ],
        geometricMeaning: 'The game loop creates a continuous cycle of updates and renders, creating the illusion of motion and interactivity.',
        applications: [
          'Game engines',
          'Animation systems',
          'Real-time simulations',
          'Interactive applications'
        ]
      },
      3: {
        title: 'Step 3: Frame Timing',
        description: 'Accurate timing is crucial for smooth animations. Delta time ensures consistent movement regardless of frame rate.',
        concepts: [
          {
            name: 'Performance API',
            description: 'performance.now() provides high-resolution timestamps for accurate timing measurements.',
            code: 'const currentTime = performance.now();'
          },
          {
            name: 'FPS Calculation',
            description: 'Frames per second is calculated by counting frames over a 1-second window.',
            code: 'if (time - lastFPSUpdate >= 1000) {\n  fps = frameCount;\n  frameCount = 0;\n}'
          },
          {
            name: 'Delta Time Clamping',
            description: 'Large delta times (from tab switching) are clamped to prevent game-breaking jumps.',
            code: 'deltaTime = Math.min(deltaTime, 0.1); // Max 100ms'
          }
        ],
        geometricMeaning: 'Time flows continuously, but we sample it at discrete intervals (frames). Delta time measures the interval size.',
        applications: [
          'Frame-rate independent movement',
          'Physics simulations',
          'Animation timing',
          'Performance monitoring'
        ]
      }
    },
    renderer: {
      1: {
        title: 'Step 1: Basic Shape Drawing',
        description: 'The renderer provides methods to draw basic shapes: rectangles, circles, lines, and polygons.',
        concepts: [
          {
            name: 'Rectangle Drawing',
            description: 'fillRect() draws a filled rectangle. strokeRect() draws just the outline.',
            code: 'ctx.fillRect(x, y, width, height);\nctx.strokeRect(x, y, width, height);'
          },
          {
            name: 'Circle Drawing',
            description: 'arc() creates a circular path. Use fill() or stroke() to render it.',
            code: 'ctx.beginPath();\nctx.arc(x, y, radius, 0, Math.PI * 2);\nctx.fill();'
          },
          {
            name: 'Coordinate System',
            description: 'Canvas uses pixel coordinates. Origin (0,0) is top-left corner.',
            code: '// X increases right, Y increases down'
          }
        ],
        geometricMeaning: 'Shapes are drawn using geometric primitives. Each shape has position, size, and style properties.',
        applications: [
          'UI elements',
          'Game sprites',
          'Debug visualization',
          'Shape rendering'
        ]
      },
      2: {
        title: 'Step 2: Transformations',
        description: 'Transformations (translate, rotate, scale) allow drawing shapes at different positions, orientations, and sizes.',
        concepts: [
          {
            name: 'Transform Matrix',
            description: 'Canvas uses a 2D transformation matrix. Operations modify this matrix.',
            code: 'ctx.save(); // Save current matrix\nctx.translate(x, y);\nctx.rotate(angle);\nctx.scale(sx, sy);\n// Draw here\nctx.restore(); // Restore matrix'
          },
          {
            name: 'Matrix Stack',
            description: 'save() pushes current matrix onto stack, restore() pops it. Enables nested transformations.',
            code: 'ctx.save(); // Push\n// ... transformations\nctx.restore(); // Pop'
          },
          {
            name: 'Transform Order',
            description: 'Transformations are applied in reverse order: scale → rotate → translate.',
            code: 'ctx.translate(x, y);\nctx.rotate(angle);\nctx.scale(sx, sy);\n// Applied as: scale, then rotate, then translate'
          }
        ],
        geometricMeaning: 'Transformations modify the coordinate system. Objects drawn after transformation appear transformed.',
        applications: [
          'Object positioning',
          'Rotation and scaling',
          'Camera systems',
          'Hierarchical rendering'
        ]
      },
      3: {
        title: 'Step 3: Text and Sprites',
        description: 'Text rendering and sprite drawing enable rich graphics. Text uses fonts and styles, sprites use images.',
        concepts: [
          {
            name: 'Text Rendering',
            description: 'fillText() draws text. Font, color, alignment, and baseline can be customized.',
            code: 'ctx.font = "24px Arial";\nctx.fillStyle = "#ffffff";\nctx.fillText("Hello", x, y);'
          },
          {
            name: 'Sprite Drawing',
            description: 'drawImage() draws images. Can draw full image or portion (sprite sheet).',
            code: 'ctx.drawImage(image, x, y, width, height);\n// Or from sprite sheet:\nctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);'
          },
          {
            name: 'Image Loading',
            description: 'Images must be loaded before drawing. Use Image object and onload callback.',
            code: 'const img = new Image();\nimg.onload = () => ctx.drawImage(img, 0, 0);\nimg.src = "sprite.png";'
          }
        ],
        geometricMeaning: 'Text and sprites are rendered as bitmaps on the canvas. Position and size determine their appearance.',
        applications: [
          'UI text',
          'Game sprites',
          'Character rendering',
          'Texture mapping'
        ]
      }
    },
    scene: {
      1: {
        title: 'Step 1: Entity Management',
        description: 'The Scene manages all entities in the game. It provides methods to add, remove, and query entities.',
        concepts: [
          {
            name: 'Entity List',
            description: 'Scene maintains an array of all entities. Entities can be added or removed dynamically.',
            code: 'class Scene {\n  constructor() {\n    this.entities = [];\n  }\n  add(entity) {\n    this.entities.push(entity);\n  }\n}'
          },
          {
            name: 'Entity Lifecycle',
            description: 'Entities are created, added to scene, updated each frame, rendered, and eventually removed.',
            code: 'scene.add(new Entity());\n// In game loop:\nscene.update(deltaTime);\nscene.render(renderer);'
          },
          {
            name: 'Separation of Concerns',
            description: 'Scene handles management, Entity handles behavior. Clear separation enables modularity.',
            code: '// Scene: "What entities exist?"\n// Entity: "How does this entity behave?"'
          }
        ],
        geometricMeaning: 'Scene is a container for entities. It organizes them spatially and temporally.',
        applications: [
          'Game object management',
          'Level organization',
          'Entity queries',
          'Scene transitions'
        ]
      },
      2: {
        title: 'Step 2: Entity Hierarchy',
        description: 'Entities can have parent-child relationships, creating a hierarchy. Children inherit parent transforms.',
        concepts: [
          {
            name: 'Parent-Child Relationship',
            description: 'Child entities are positioned relative to their parent. Moving parent moves all children.',
            code: 'parent.addChild(child);\n// Child position is relative to parent'
          },
          {
            name: 'Transform Inheritance',
            description: 'Child transforms are combined with parent transforms. World position = parent world + local position.',
            code: 'worldPos = parent.worldPos + localPos\nworldRot = parent.worldRot + localRot\nworldScale = parent.worldScale * localScale'
          },
          {
            name: 'Hierarchical Rendering',
            description: 'Rendering parent automatically renders all children. Enables complex object composition.',
            code: 'parent.render() {\n  // Render parent\n  for (child of children) {\n    child.render();\n  }\n}'
          }
        ],
        geometricMeaning: 'Hierarchy creates a tree structure. Each node transforms its local coordinate system for children.',
        applications: [
          'Character with parts',
          'UI hierarchies',
          'Complex objects',
          'Scene organization'
        ]
      },
      3: {
        title: 'Step 3: Entity Queries',
        description: 'Scene provides methods to find entities by type, position, or other criteria. Essential for game logic.',
        concepts: [
          {
            name: 'Type Queries',
            description: 'Find all entities of a specific type (e.g., all enemies, all collectibles).',
            code: 'const enemies = scene.findByType(Enemy);'
          },
          {
            name: 'Spatial Queries',
            description: 'Find entities at or near a position. Uses distance calculations.',
            code: 'const nearby = scene.findByPosition(x, y, radius);'
          },
          {
            name: 'Query Optimization',
            description: 'Queries iterate through entities. For performance, limit query frequency and scope.',
            code: '// Cache results, query only when needed'
          }
        ],
        geometricMeaning: 'Queries search the entity space. Type queries filter by class, spatial queries filter by position.',
        applications: [
          'Collision detection',
          'AI targeting',
          'Pickup detection',
          'Area effects'
        ]
      }
    },
    entity: {
      1: {
        title: 'Step 1: Transform Properties',
        description: 'Entities have position (x, y), rotation, and scale. These define where and how the entity appears.',
        concepts: [
          {
            name: 'Position',
            description: 'Position (x, y) defines entity location in world space. Units are typically pixels.',
            code: 'entity.x = 100;\nentity.y = 200;'
          },
          {
            name: 'Rotation',
            description: 'Rotation is stored in radians. 0 = right, π/2 = down, π = left, 3π/2 = up.',
            code: 'entity.rotation = Math.PI / 4; // 45 degrees'
          },
          {
            name: 'Scale',
            description: 'Scale multiplies entity size. scaleX and scaleY allow non-uniform scaling.',
            code: 'entity.scaleX = 2.0; // Double width\nentity.scaleY = 1.0; // Normal height'
          }
        ],
        geometricMeaning: 'Transform properties define a local coordinate system. Objects are drawn in this space.',
        applications: [
          'Object positioning',
          'Rotation and scaling',
          'Animation',
          'Transform hierarchies'
        ]
      },
      2: {
        title: 'Step 2: World Transform Calculation',
        description: 'World transform combines entity\'s local transform with parent transforms. Used for rendering.',
        concepts: [
          {
            name: 'Transform Composition',
            description: 'World transform = parent world transform × local transform. Applied in order: scale → rotate → translate.',
            code: 'worldPos = parent.worldPos + rotate(localPos, parent.worldRot) * parent.worldScale'
          },
          {
            name: 'Rotation Composition',
            description: 'Rotations add: world rotation = parent rotation + local rotation.',
            code: 'worldRot = parent.worldRot + localRot'
          },
          {
            name: 'Scale Composition',
            description: 'Scales multiply: world scale = parent scale × local scale.',
            code: 'worldScale = parent.worldScale * localScale'
          }
        ],
        geometricMeaning: 'World transform places entity in global space. It accounts for all parent transformations.',
        applications: [
          'Hierarchical transforms',
          'Camera systems',
          'Complex object positioning',
          'Scene graph rendering'
        ]
      },
      3: {
        title: 'Step 3: Update and Render Lifecycle',
        description: 'Entities have update() and render() methods called each frame. Override to implement behavior.',
        concepts: [
          {
            name: 'Update Method',
            description: 'update(deltaTime) is called each frame. Use for game logic, movement, AI, etc.',
            code: 'update(deltaTime) {\n  this.x += this.velocityX * deltaTime;\n  this.y += this.velocityY * deltaTime;\n}'
          },
          {
            name: 'Render Method',
            description: 'render(renderer) is called each frame. Use for drawing graphics.',
            code: 'render(renderer) {\n  renderer.fillCircle(0, 0, 10, "#ff0000");\n}'
          },
          {
            name: 'Lifecycle Order',
            description: 'Order: 1) Update all entities, 2) Render all entities. Ensures consistent state.',
            code: '// Game loop:\nscene.update(deltaTime);\nscene.render(renderer);'
          }
        ],
        geometricMeaning: 'Update modifies state, render displays state. Separation enables clear game logic.',
        applications: [
          'Game object behavior',
          'Animation systems',
          'Rendering pipeline',
          'Entity systems'
        ]
      }
    },
    input: {
      1: {
        title: 'Step 1: Mouse Position Tracking',
        description: 'Track mouse position relative to canvas. Convert screen coordinates to canvas coordinates.',
        concepts: [
          {
            name: 'Coordinate Conversion',
            description: 'Mouse events provide screen coordinates. Subtract canvas offset to get canvas coordinates.',
            code: 'const rect = canvas.getBoundingClientRect();\nconst x = event.clientX - rect.left;\nconst y = event.clientY - rect.top;'
          },
          {
            name: 'Mouse Move Event',
            description: 'mousemove event fires continuously as mouse moves. Update position each time.',
            code: 'canvas.addEventListener("mousemove", (e) => {\n  mouseX = e.clientX - rect.left;\n  mouseY = e.clientY - rect.top;\n});'
          },
          {
            name: 'Coordinate System',
            description: 'Canvas coordinates: (0,0) at top-left. X increases right, Y increases down.',
            code: '// Screen to canvas conversion accounts for canvas position'
          }
        ],
        geometricMeaning: 'Mouse position is a point in canvas space. Used for hit testing and interaction.',
        applications: [
          'Mouse hover detection',
          'Click detection',
          'Drag and drop',
          'UI interaction'
        ]
      },
      2: {
        title: 'Step 2: Click Detection',
        description: 'Detect mouse clicks and determine which entity was clicked. Use bounding box or shape tests.',
        concepts: [
          {
            name: 'Mouse Down/Up Events',
            description: 'mousedown fires when button pressed, mouseup when released. Track state between frames.',
            code: 'let mouseDown = false;\ncanvas.addEventListener("mousedown", () => mouseDown = true);\ncanvas.addEventListener("mouseup", () => mouseDown = false);'
          },
          {
            name: 'Hit Testing',
            description: 'Test if point is inside entity bounds. Simple: bounding box. Complex: shape geometry.',
            code: 'function isPointInRect(x, y, rect) {\n  return x >= rect.x && x <= rect.x + rect.width &&\n         y >= rect.y && y <= rect.y + rect.height;\n}'
          },
          {
            name: 'Event Dispatch',
            description: 'When click detected, dispatch event to entity. Entity handles its own click logic.',
            code: 'if (isMouseOver(entity) && mousePressed) {\n  entity.onClick(mouseX, mouseY);\n}'
          }
        ],
        geometricMeaning: 'Click detection tests point-in-shape. Determines which entity receives the click event.',
        applications: [
          'Button clicks',
          'Object selection',
          'UI interaction',
          'Game input'
        ]
      },
      3: {
        title: 'Step 3: Touch Support',
        description: 'Touch events work similarly to mouse but support multiple touches. Essential for mobile devices.',
        concepts: [
          {
            name: 'Touch Events',
            description: 'touchstart, touchmove, touchend provide touch information. Multiple touches possible.',
            code: 'canvas.addEventListener("touchstart", (e) => {\n  const touch = e.touches[0];\n  // Handle touch\n});'
          },
          {
            name: 'Touch List',
            description: 'e.touches contains all active touches. Each touch has clientX, clientY, and identifier.',
            code: 'for (let touch of e.touches) {\n  const x = touch.clientX - rect.left;\n  const y = touch.clientY - rect.top;\n}'
          },
          {
            name: 'Prevent Default',
            description: 'preventDefault() stops browser default touch behavior (scrolling, zooming).',
            code: 'e.preventDefault();'
          }
        ],
        geometricMeaning: 'Touch events provide multiple points of contact. Each touch is tracked independently.',
        applications: [
          'Mobile games',
          'Multi-touch gestures',
          'Touch controls',
          'Mobile UI'
        ]
      }
    },
    utils: {
      1: {
        title: 'Step 1: Vector Math',
        description: 'Vectors represent 2D points and directions. Vector math enables movement, distance, and angle calculations.',
        concepts: [
          {
            name: 'Vector Representation',
            description: 'Vector has x and y components. Can represent position, velocity, direction, etc.',
            code: 'class Vec2 {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n}'
          },
          {
            name: 'Vector Addition',
            description: 'Adding vectors combines their components. Used for movement: position += velocity.',
            code: 'add(other) {\n  return new Vec2(this.x + other.x, this.y + other.y);\n}'
          },
          {
            name: 'Vector Length',
            description: 'Length (magnitude) calculated using Pythagorean theorem: √(x² + y²).',
            code: 'length() {\n  return Math.sqrt(this.x * this.x + this.y * this.y);\n}'
          },
          {
            name: 'Normalization',
            description: 'Normalize vector to unit length (length = 1). Preserves direction, sets magnitude to 1.',
            code: 'normalize() {\n  const len = this.length();\n  return new Vec2(this.x / len, this.y / len);\n}'
          }
        ],
        geometricMeaning: 'Vectors represent arrows in 2D space. Length is distance, direction is angle.',
        applications: [
          'Movement and velocity',
          'Direction calculations',
          'Distance measurements',
          'Force and acceleration'
        ]
      },
      2: {
        title: 'Step 2: Distance and Angle Calculations',
        description: 'Calculate distance between points and angles between vectors. Essential for collision detection and AI.',
        concepts: [
          {
            name: 'Distance Formula',
            description: 'Euclidean distance: √((x₂-x₁)² + (y₂-y₁)²). Uses Pythagorean theorem.',
            code: 'function distance(x1, y1, x2, y2) {\n  const dx = x2 - x1;\n  const dy = y2 - y1;\n  return Math.sqrt(dx * dx + dy * dy);\n}'
          },
          {
            name: 'Squared Distance',
            description: 'Distance² avoids sqrt for performance. Use when comparing distances (not absolute).',
            code: 'function distanceSquared(x1, y1, x2, y2) {\n  const dx = x2 - x1;\n  const dy = y2 - y1;\n  return dx * dx + dy * dy;\n}'
          },
          {
            name: 'Angle Calculation',
            description: 'atan2(y, x) calculates angle from origin to point. Returns angle in radians.',
            code: 'function angle(x1, y1, x2, y2) {\n  return Math.atan2(y2 - y1, x2 - x1);\n}'
          },
          {
            name: 'Dot Product',
            description: 'Dot product: x₁×x₂ + y₁×y₂. Used for angle between vectors and projections.',
            code: 'dot(other) {\n  return this.x * other.x + this.y * other.y;\n}'
          }
        ],
        geometricMeaning: 'Distance measures separation, angle measures direction. Together they describe spatial relationships.',
        applications: [
          'Collision detection',
          'AI pathfinding',
          'Distance-based effects',
          'Direction calculations'
        ]
      },
      3: {
        title: 'Step 3: Utility Functions',
        description: 'Helper functions for common operations: interpolation, clamping, random numbers, timing.',
        concepts: [
          {
            name: 'Linear Interpolation',
            description: 'LERP blends between two values: result = start + (end - start) × t.',
            code: 'function lerp(start, end, t) {\n  return start + (end - start) * t;\n}'
          },
          {
            name: 'Clamping',
            description: 'Clamp value to range [min, max]. Ensures value stays within bounds.',
            code: 'function clamp(value, min, max) {\n  return Math.min(Math.max(value, min), max);\n}'
          },
          {
            name: 'Random Numbers',
            description: 'Generate random numbers in range. Useful for variety and procedural generation.',
            code: 'function random(min, max) {\n  return Math.random() * (max - min) + min;\n}'
          },
          {
            name: 'Timer Utility',
            description: 'Timer tracks elapsed time. Useful for delays, cooldowns, animations.',
            code: 'class Timer {\n  constructor(duration) {\n    this.duration = duration;\n    this.elapsed = 0;\n  }\n}'
          }
        ],
        geometricMeaning: 'Utility functions provide common mathematical operations needed throughout the engine.',
        applications: [
          'Animation timing',
          'Value constraints',
          'Procedural generation',
          'Game mechanics'
        ]
      }
    },
    assetloader: {
      1: {
        title: 'Step 1: AssetLoader Introduction',
        description: 'AssetLoader manages loading and caching of images and other assets. It provides promise-based loading with progress tracking and automatic caching.',
        concepts: [
          {
            name: 'Asset Management',
            description: 'Centralized system for loading and accessing game assets. Prevents duplicate loading and provides consistent API.',
            code: 'const loader = new AssetLoader();'
          },
          {
            name: 'Promise-Based Loading',
            description: 'Uses Promises for asynchronous loading. Enables async/await syntax for clean code.',
            code: 'await loader.loadImage("player", "/sprites/player.png");'
          },
          {
            name: 'Asset Caching',
            description: 'Loaded assets are stored in memory. Subsequent requests return instantly without re-downloading.',
            code: 'const image = loader.get("player"); // Returns cached image'
          },
          {
            name: 'Progress Tracking',
            description: 'Tracks loading progress for multiple assets. Useful for loading screens.',
            code: 'const progress = loader.getProgress(); // 0 to 1'
          }
        ],
        geometricMeaning: 'AssetLoader acts as a bridge between file system and game engine. Assets flow from storage → cache → renderer.',
        applications: [
          'Game asset loading',
          'Loading screens',
          'Resource management',
          'Performance optimization'
        ]
      },
      2: {
        title: 'Step 2: Loading Single Image',
        description: 'Load a single image asset with error handling. The image is cached automatically for future use.',
        concepts: [
          {
            name: 'Image Loading',
            description: 'loadImage() creates a Promise that resolves when image loads. Handles errors automatically.',
            code: 'await loader.loadImage("player", "/sprites/player.png");'
          },
          {
            name: 'Error Handling',
            description: 'Failed loads are tracked. getStatus() shows failed count. Prevents crashes from missing assets.',
            code: 'try {\n  await loader.loadImage("player", "/player.png");\n} catch (error) {\n  console.error("Failed to load");\n}'
          },
          {
            name: 'Image Object',
            description: 'Returns HTMLImageElement. Can be used directly with canvas drawImage() or Renderer.drawSprite().',
            code: 'const image = await loader.loadImage("player", "/player.png");\nrenderer.drawSprite(image, x, y, w, h);'
          }
        ],
        geometricMeaning: 'Image loading is asynchronous. The image object represents the loaded bitmap data.',
        applications: [
          'Sprite loading',
          'Texture loading',
          'Background images',
          'UI elements'
        ]
      },
      3: {
        title: 'Step 3: Asset Caching',
        description: 'Loaded assets are automatically cached. Multiple requests for same asset return instantly without re-downloading.',
        concepts: [
          {
            name: 'Cache Lookup',
            description: 'Before loading, AssetLoader checks if asset already exists in cache. Returns immediately if found.',
            code: 'if (this.assets.has(name)) {\n  return Promise.resolve(this.assets.get(name));\n}'
          },
          {
            name: 'Memory Management',
            description: 'Assets stored in Map for O(1) lookup. Can clear cache to free memory.',
            code: 'loader.clear(); // Remove all cached assets'
          },
          {
            name: 'Duplicate Prevention',
            description: 'If asset is already loading, returns existing Promise instead of starting new load.',
            code: 'if (this.loadingPromises.has(name)) {\n  return this.loadingPromises.get(name);\n}'
          }
        ],
        geometricMeaning: 'Caching creates a memory-resident asset pool. Assets flow: Storage → Cache → Renderer.',
        applications: [
          'Performance optimization',
          'Memory management',
          'Asset reuse',
          'Loading optimization'
        ]
      },
      4: {
        title: 'Step 4: Batch Loading',
        description: 'Load multiple assets at once using loadImages(). All assets load in parallel for faster loading.',
        concepts: [
          {
            name: 'Batch Loading',
            description: 'loadImages() accepts object with name:src pairs. Returns object with name:asset pairs.',
            code: 'const assets = await loader.loadImages({\n  player: "/player.png",\n  enemy: "/enemy.png"\n});'
          },
          {
            name: 'Parallel Loading',
            description: 'All images load simultaneously. Faster than sequential loading.',
            code: 'const promises = entries.map(([name, src]) => \n  this.loadImage(name, src)\n);\nawait Promise.all(promises);'
          },
          {
            name: 'Error Handling',
            description: 'If any asset fails, entire batch fails. Use try/catch to handle errors.',
            code: 'try {\n  await loader.loadImages({...});\n} catch (error) {\n  // Handle failure\n}'
          }
        ],
        geometricMeaning: 'Batch loading creates multiple parallel data streams from storage to cache.',
        applications: [
          'Level loading',
          'Character loading',
          'UI asset loading',
          'Preloading'
        ]
      },
      5: {
        title: 'Step 5: Progress Tracking',
        description: 'Track loading progress for multiple assets. Useful for displaying loading bars and progress indicators.',
        concepts: [
          {
            name: 'Progress Calculation',
            description: 'Progress = loaded / total. Returns value from 0 to 1.',
            code: 'getProgress() {\n  return this.loadProgress.loaded / this.loadProgress.total;\n}'
          },
          {
            name: 'Status Object',
            description: 'getStatus() returns object with total, loaded, failed, progress, and isLoading flag.',
            code: 'const status = loader.getStatus();\n// { total: 10, loaded: 7, failed: 0, progress: 0.7, isLoading: true }'
          },
          {
            name: 'Loading Screen',
            description: 'Use progress to update loading screen UI. Show percentage and progress bar.',
            code: 'const progress = loader.getProgress();\ndrawProgressBar(progress * 100);'
          }
        ],
        geometricMeaning: 'Progress represents completion ratio. Visualized as progress bar from 0% to 100%.',
        applications: [
          'Loading screens',
          'Progress indicators',
          'Asset preloading',
          'User feedback'
        ]
      },
      6: {
        title: 'Step 6: Complete AssetLoader Usage',
        description: 'Complete example of using AssetLoader in a game. Load assets, track progress, and use in renderer.',
        concepts: [
          {
            name: 'Initialization',
            description: 'Create AssetLoader instance. Usually one per game or scene.',
            code: 'const loader = new AssetLoader();'
          },
          {
            name: 'Loading Phase',
            description: 'Load all required assets before game starts. Show loading screen during this phase.',
            code: 'await loader.loadImages({\n  player: "/sprites/player.png",\n  background: "/bg.png"\n});'
          },
          {
            name: 'Usage Phase',
            description: 'Retrieve cached assets and use in renderer. No loading happens here.',
            code: 'const playerImage = loader.get("player");\nrenderer.drawSprite(playerImage, x, y, w, h);'
          }
        ],
        geometricMeaning: 'AssetLoader bridges asset storage and game rendering. Assets flow: Load → Cache → Render.',
        applications: [
          'Game initialization',
          'Scene loading',
          'Asset management',
          'Performance optimization'
        ]
      }
    },
    sprite: {
      1: {
        title: 'Step 1: Sprite Introduction',
        description: 'Sprite extends Entity with image rendering and animation capabilities. Combines Entity transforms with image display.',
        concepts: [
          {
            name: 'Sprite Entity',
            description: 'Sprite extends Entity, inheriting position, rotation, scale, and hierarchy. Adds image rendering.',
            code: 'class Sprite extends Entity {\n  constructor(x, y, image) { ... }\n}'
          },
          {
            name: 'Image Rendering',
            description: 'Sprite renders an image at its position. Image can be full image or sprite sheet frame.',
            code: 'sprite.setImage(image);\nsprite.onRender(renderer);'
          },
          {
            name: 'Sprite Sheets',
            description: 'Multiple frames stored in one image. Sprite can display specific frame from sheet.',
            code: 'sprite.setSpriteSheet(image, frameWidth, frameHeight, columns);'
          },
          {
            name: 'Animation',
            description: 'Sprite can animate through frames. Supports multiple animation states (idle, walk, jump).',
            code: 'sprite.addAnimation("walk", [0,1,2,3], 0.1);\nsprite.playAnimation("walk");'
          }
        ],
        geometricMeaning: 'Sprite is positioned entity with image. Animation cycles through frames over time.',
        applications: [
          'Character sprites',
          'Animated objects',
          'Game entities',
          'Visual effects'
        ]
      },
      2: {
        title: 'Step 2: Basic Sprite',
        description: 'Create sprite with image. Sprite renders image at its position with Entity transforms applied.',
        concepts: [
          {
            name: 'Sprite Creation',
            description: 'Create sprite with position and optional image. Image can be set later.',
            code: 'const sprite = new Sprite(100, 100, image);\n// Or:\nconst sprite = new Sprite(100, 100);\nsprite.setImage(image);'
          },
          {
            name: 'Image Setting',
            description: 'setImage() sets the sprite image. Updates width/height to match image dimensions.',
            code: 'sprite.setImage(image);\n// sprite.width = image.width\n// sprite.height = image.height'
          },
          {
            name: 'Rendering',
            description: 'onRender() draws sprite image. Applies Entity transforms (position, rotation, scale).',
            code: 'onRender(renderer) {\n  renderer.drawSprite(this.image, x, y, width, height);\n}'
          }
        ],
        geometricMeaning: 'Sprite is image positioned in world space. Entity transforms position, rotate, and scale the image.',
        applications: [
          'Static sprites',
          'Background elements',
          'UI sprites',
          'Decorative objects'
        ]
      },
      3: {
        title: 'Step 3: Sprite Sheet',
        description: 'Use sprite sheet to store multiple frames in one image. Sprite displays specific frame from sheet.',
        concepts: [
          {
            name: 'Sprite Sheet Setup',
            description: 'setSpriteSheet() configures sprite sheet. Specifies frame size and columns.',
            code: 'sprite.setSpriteSheet(image, 32, 32, 8);\n// 32x32 frames, 8 columns'
          },
          {
            name: 'Frame Calculation',
            description: 'Calculate source coordinates from frame index. Uses modulo and division.',
            code: 'sourceX = (frameIndex % columns) * frameWidth;\nsourceY = floor(frameIndex / columns) * frameHeight;'
          },
          {
            name: 'Frame Rendering',
            description: 'Draw specific frame using drawImage() with source rectangle.',
            code: 'ctx.drawImage(image, sourceX, sourceY, frameWidth, frameHeight, x, y, w, h);'
          }
        ],
        geometricMeaning: 'Sprite sheet is grid of frames. Frame index maps to grid coordinates.',
        applications: [
          'Character animations',
          'Tile sets',
          'Particle effects',
          'UI elements'
        ]
      },
      4: {
        title: 'Step 4: Animation System',
        description: 'Animate sprite through frames. Control animation speed, looping, and frame sequence.',
        concepts: [
          {
            name: 'Animation Timing',
            description: 'Animation updates based on deltaTime. Frame changes when animationTime exceeds speed.',
            code: 'animationTime += deltaTime;\nif (animationTime >= speed) {\n  currentFrame++;\n  animationTime = 0;\n}'
          },
          {
            name: 'Frame Sequence',
            description: 'Animation uses array of frame indices. Can skip frames or play in any order.',
            code: 'addAnimation("walk", [0,1,2,3], 0.1);\n// Frames 0,1,2,3 at 0.1s per frame'
          },
          {
            name: 'Looping',
            description: 'Looping animations restart at frame 0. Non-looping stop at last frame.',
            code: 'if (currentFrame >= frames.length) {\n  if (loop) currentFrame = 0;\n  else currentFrame = frames.length - 1;\n}'
          }
        ],
        geometricMeaning: 'Animation is time-based frame sequence. Time progresses → frame advances.',
        applications: [
          'Character movement',
          'Idle animations',
          'Attack animations',
          'Environmental effects'
        ]
      },
      5: {
        title: 'Step 5: Animation States',
        description: 'Manage multiple animations (idle, walk, jump). Switch between states based on game logic.',
        concepts: [
          {
            name: 'Animation Dictionary',
            description: 'Store multiple animations in object. Each has name, frames, speed, and loop flag.',
            code: 'this.animations = {\n  idle: { frames: [0], speed: 0.1, loop: true },\n  walk: { frames: [1,2,3,4], speed: 0.1, loop: true }\n};'
          },
          {
            name: 'State Switching',
            description: 'playAnimation() switches to new animation. Resets frame and timing.',
            code: 'playAnimation(name) {\n  this.currentAnimation = name;\n  this.currentFrame = 0;\n  this.animationTime = 0;\n}'
          },
          {
            name: 'State Management',
            description: 'Game logic determines which animation to play. Example: if moving, play "walk".',
            code: 'if (velocity.x !== 0) {\n  sprite.playAnimation("walk");\n} else {\n  sprite.playAnimation("idle");\n}'
          }
        ],
        geometricMeaning: 'Animation states are discrete modes. State machine transitions between animations.',
        applications: [
          'Character state machines',
          'Enemy behaviors',
          'Interactive objects',
          'Dynamic animations'
        ]
      },
      6: {
        title: 'Step 6: Complete Sprite Usage',
        description: 'Complete example: Load image with AssetLoader, create sprite, set up animation, and render.',
        concepts: [
          {
            name: 'Asset Loading',
            description: 'Load sprite image using AssetLoader. Wait for loading to complete.',
            code: 'const loader = new AssetLoader();\nawait loader.loadImage("player", "/player.png");'
          },
          {
            name: 'Sprite Creation',
            description: 'Create sprite and set image from AssetLoader cache.',
            code: 'const sprite = new Sprite(100, 100);\nsprite.setImage(loader.get("player"));'
          },
          {
            name: 'Animation Setup',
            description: 'Configure sprite sheet and add animations. Play initial animation.',
            code: 'sprite.setSpriteSheet(image, 32, 32, 8);\nsprite.addAnimation("walk", [0,1,2,3], 0.1);\nsprite.playAnimation("walk");'
          },
          {
            name: 'Update and Render',
            description: 'Update sprite each frame (advances animation). Render in scene.',
            code: 'sprite.update(deltaTime);\nsprite.onRender(renderer);'
          }
        ],
        geometricMeaning: 'Complete sprite pipeline: Load → Create → Configure → Animate → Render.',
        applications: [
          'Animated characters',
          'Game entities',
          'Visual effects',
          'Interactive sprites'
        ]
      }
    },
    effects: {
      1: {
        title: 'Step 1: Effects & Shaders Introduction',
        description: 'Effects enhance rendering with blend modes, filters, and post-processing. Blend modes control how colors combine, filters apply visual effects, and post-processing modifies the final image.',
        concepts: [
          {
            name: 'Blend Modes',
            description: 'Control how new pixels combine with existing pixels. Different modes create different visual effects (multiply darkens, screen lightens, overlay combines both).',
            code: 'ctx.globalCompositeOperation = "multiply";'
          },
          {
            name: 'Canvas Filters',
            description: 'Apply visual effects like blur, brightness, contrast, saturation. Filters are applied to all drawing operations until reset.',
            code: 'ctx.filter = "blur(5px)";'
          },
          {
            name: 'Shadows',
            description: 'Create drop shadows and glow effects using shadowOffsetX, shadowOffsetY, shadowBlur, and shadowColor properties.',
            code: 'ctx.shadowBlur = 10;\nctx.shadowColor = "rgba(0,0,0,0.5)";'
          },
          {
            name: 'Post-Processing',
            description: 'Render scene to offscreen canvas, apply effects, then draw to main canvas. Allows effects on entire scene.',
            code: 'const offscreen = createOffscreenCanvas();\n// Draw scene\n// Apply effects\nctx.drawImage(offscreen, 0, 0);'
          }
        ],
        geometricMeaning: 'Effects modify pixel colors and positions. Blend modes combine colors mathematically, filters transform colors, shadows offset and blur pixels.',
        applications: [
          'Visual effects',
          'UI styling',
          'Atmospheric effects',
          'Post-processing pipelines'
        ]
      },
      2: {
        title: 'Step 2: Blend Modes',
        description: 'Blend modes control how new drawing operations combine with existing canvas content. Each mode uses different mathematical operations.',
        concepts: [
          {
            name: 'Multiply Blend',
            description: 'Multiplies source and destination colors. Darkens image. Formula: result = source × destination.',
            code: 'ctx.globalCompositeOperation = "multiply";'
          },
          {
            name: 'Screen Blend',
            description: 'Inverts, multiplies, then inverts again. Lightens image. Formula: result = 1 - (1-source) × (1-destination).',
            code: 'ctx.globalCompositeOperation = "screen";'
          },
          {
            name: 'Overlay Blend',
            description: 'Combines multiply and screen. Darkens dark areas, lightens light areas. Increases contrast.',
            code: 'ctx.globalCompositeOperation = "overlay";'
          },
          {
            name: 'Other Blend Modes',
            description: 'Darken, Lighten, Color Dodge, Color Burn, Hard Light, Soft Light, Difference, Exclusion.',
            code: 'ctx.globalCompositeOperation = "darken"; // or "lighten", "difference", etc.'
          }
        ],
        geometricMeaning: 'Blend modes mathematically combine color values. Multiply = darker, Screen = lighter, Overlay = contrast enhancement.',
        applications: [
          'Color mixing',
          'Lighting effects',
          'Texture blending',
          'Visual styling'
        ]
      },
      3: {
        title: 'Step 3: Filters - Blur & Shadow',
        description: 'Filters apply visual transformations. Blur softens edges, shadows create depth, glow creates light effects.',
        concepts: [
          {
            name: 'Blur Filter',
            description: 'Applies Gaussian blur. Smooths edges and creates depth-of-field effect. Higher values = more blur.',
            code: 'ctx.filter = "blur(5px)";'
          },
          {
            name: 'Drop Shadow',
            description: 'Creates shadow behind object. Uses shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor.',
            code: 'ctx.shadowOffsetX = 5;\nctx.shadowOffsetY = 5;\nctx.shadowBlur = 10;\nctx.shadowColor = "rgba(0,0,0,0.5)";'
          },
          {
            name: 'Glow Effect',
            description: 'Creates glowing effect. Uses shadowBlur with zero offset and colored shadow.',
            code: 'ctx.shadowBlur = 20;\nctx.shadowColor = "rgba(255,255,255,0.8)";'
          },
          {
            name: 'Filter Reset',
            description: 'Reset filters to none. Important to reset after applying filters to prevent affecting other drawings.',
            code: 'ctx.filter = "none";\nctx.shadowBlur = 0;'
          }
        ],
        geometricMeaning: 'Blur averages nearby pixels. Shadows offset and blur pixels. Glow is shadow with zero offset.',
        applications: [
          'Depth effects',
          'UI shadows',
          'Light effects',
          'Atmospheric rendering'
        ]
      },
      4: {
        title: 'Step 4: Color Adjustments',
        description: 'Color filters adjust brightness, contrast, saturation, and hue. Transform colors without changing geometry.',
        concepts: [
          {
            name: 'Brightness',
            description: 'Multiplies color values. 0 = black, 1 = normal, >1 = brighter. Formula: result = color × brightness.',
            code: 'ctx.filter = "brightness(1.5)";'
          },
          {
            name: 'Contrast',
            description: 'Adjusts difference between light and dark. 0 = gray, 1 = normal, >1 = more contrast.',
            code: 'ctx.filter = "contrast(1.5)";'
          },
          {
            name: 'Saturation',
            description: 'Controls color intensity. 0 = grayscale, 1 = normal, >1 = more saturated.',
            code: 'ctx.filter = "saturate(2.0)";'
          },
          {
            name: 'Hue Rotate',
            description: 'Rotates colors around color wheel. 0° = no change, 360° = full rotation.',
            code: 'ctx.filter = "hue-rotate(90deg)";'
          },
          {
            name: 'Combined Filters',
            description: 'Can combine multiple filters. Space-separated list of filter functions.',
            code: 'ctx.filter = "brightness(1.2) contrast(1.1) saturate(1.5)";'
          }
        ],
        geometricMeaning: 'Color adjustments transform RGB values. Brightness scales values, contrast expands range, saturation affects color intensity, hue rotates color wheel.',
        applications: [
          'Color correction',
          'Mood effects',
          'Time-of-day lighting',
          'Visual styling'
        ]
      },
      5: {
        title: 'Step 5: Post-Processing',
        description: 'Post-processing applies effects to entire rendered scene. Render to offscreen canvas, apply effects, then draw to main canvas.',
        concepts: [
          {
            name: 'Offscreen Canvas',
            description: 'Create temporary canvas for rendering scene. Allows applying effects to entire scene at once.',
            code: 'const offscreen = document.createElement("canvas");\noffscreen.width = width;\noffscreen.height = height;'
          },
          {
            name: 'Render to Offscreen',
            description: 'Draw entire scene to offscreen canvas. Scene is rendered normally without effects.',
            code: 'const offscreenCtx = offscreen.getContext("2d");\n// Draw scene to offscreenCtx'
          },
          {
            name: 'Apply Effects',
            description: 'Apply filters or effects to offscreen canvas. Effects applied to entire scene.',
            code: 'ctx.filter = "blur(5px)";\nctx.drawImage(offscreen, 0, 0);'
          },
          {
            name: 'Post-Processing Pipeline',
            description: 'Can chain multiple post-processing effects. Render → Effect 1 → Effect 2 → Display.',
            code: '// Render scene\n// Apply blur\n// Apply color adjustment\n// Draw to screen'
          }
        ],
        geometricMeaning: 'Post-processing transforms entire image. Scene rendered first, then effects applied to result.',
        applications: [
          'Screen-space effects',
          'Atmospheric effects',
          'Color grading',
          'Visual polish'
        ]
      },
      6: {
        title: 'Step 6: Complete Effects Usage',
        description: 'Complete example combining blend modes, filters, and post-processing. Use Effects class for organized effect management.',
        concepts: [
          {
            name: 'Effects Class',
            description: 'Wrapper class for effect operations. Provides organized API for blend modes, filters, and post-processing.',
            code: 'const effects = new Effects(ctx);'
          },
          {
            name: 'Blend Mode Usage',
            description: 'Set blend mode before drawing. Reset after use to prevent affecting other drawings.',
            code: 'effects.setBlendMode(BlendModes.MULTIPLY);\nctx.fillRect(x, y, w, h);\neffects.resetBlendMode();'
          },
          {
            name: 'Filter Usage',
            description: 'Apply filters before drawing. Reset filters after use.',
            code: 'effects.applyBlur(5);\nctx.fillRect(x, y, w, h);\neffects.resetFilters();'
          },
          {
            name: 'Post-Processing Usage',
            description: 'Create offscreen canvas, render scene, apply effects, draw to main canvas.',
            code: 'const offscreen = effects.createOffscreenCanvas(w, h);\n// Render scene\n// Apply effects\neffects.applyPostProcessing(offscreen, mainCanvas, effectFn);'
          }
        ],
        geometricMeaning: 'Complete effects pipeline: Set blend mode → Draw → Apply filters → Post-process → Display.',
        applications: [
          'Complete visual effects',
          'Professional rendering',
          'Game graphics',
          'Interactive applications'
        ]
      }
    },
    font: {
      1: {
        title: 'Step 1: Font Loader Module',
        description: 'The FontLoader module provides a clean API for loading custom fonts dynamically. It uses the FontFace API to load font files and manages font state.',
        concepts: [
          {
            name: 'FontFace API',
            description: 'Browser API for loading fonts programmatically. Creates FontFace objects that can be added to document.fonts.',
            code: 'const fontFace = new FontFace("MyFont", "url(/fonts/font.woff2)");\nawait fontFace.load();\ndocument.fonts.add(fontFace);'
          },
          {
            name: 'Font Loading Promise',
            description: 'FontFace.load() returns a Promise that resolves when font is loaded. Allows async/await pattern.',
            code: 'const fontFace = new FontFace("MyFont", "url(/fonts/font.woff2)");\nawait fontFace.load(); // Wait for font to load'
          },
          {
            name: 'Font Caching',
            description: 'Store loaded fonts in Map to avoid reloading. Check if font already loaded before loading again.',
            code: 'if (this.loadedFonts.has(name)) {\n  return this.loadedFonts.get(name);\n}'
          },
          {
            name: 'Font Options',
            description: 'FontFace accepts options: weight (100-900), style (normal/italic), display (swap/block/fallback).',
            code: 'new FontFace("MyFont", "url(...)", {\n  weight: "700",\n  style: "normal",\n  display: "swap"\n})'
          }
        ],
        geometricMeaning: 'Font loading is asynchronous. FontLoader manages loading state and provides synchronous access to loaded fonts.',
        applications: [
          'Custom typography',
          'Game UI fonts',
          'Dynamic font loading',
          'Font management'
        ]
      },
      2: {
        title: 'Step 2: Loading Multiple Fonts',
        description: 'Load multiple font variants (regular, bold, italic) for complete typography system. Each variant is loaded separately.',
        concepts: [
          {
            name: 'Font Variants',
            description: 'Different weights and styles are separate font files. Load each variant with appropriate options.',
            code: 'await fontLoader.loadFont("FontRegular", url, { weight: "400" });\nawait fontLoader.loadFont("FontBold", url, { weight: "700" });'
          },
          {
            name: 'Font Weight',
            description: 'Weight ranges from 100 (thin) to 900 (black). Common: 400 (normal), 700 (bold).',
            code: 'weight: "400" // normal\nweight: "700" // bold'
          },
          {
            name: 'Font Style',
            description: 'Style can be "normal" or "italic". Italic requires separate font file.',
            code: 'style: "normal" // regular\nstyle: "italic" // italic'
          },
          {
            name: 'Parallel Loading',
            description: 'Load multiple fonts in parallel using Promise.all for faster loading.',
            code: 'await Promise.all([\n  fontLoader.loadFont("Font1", url1),\n  fontLoader.loadFont("Font2", url2)\n]);'
          }
        ],
        geometricMeaning: 'Multiple fonts create typography hierarchy. Different weights/styles provide visual variety.',
        applications: [
          'Typography system',
          'UI design',
          'Text styling',
          'Visual hierarchy'
        ]
      },
      3: {
        title: 'Step 3: Font Loading with Fallbacks',
        description: 'Implement fallback fonts for graceful degradation. If custom font fails to load, use system fonts.',
        concepts: [
          {
            name: 'Font Fallback Chain',
            description: 'CSS font-family provides fallback chain. Browser tries fonts in order until one is available.',
            code: 'font-family: CustomFont, Arial, sans-serif;'
          },
          {
            name: 'Error Handling',
            description: 'Wrap font loading in try-catch. If loading fails, fallback to system fonts.',
            code: 'try {\n  await fontLoader.loadFont("CustomFont", url);\n} catch (error) {\n  // Use fallback font\n}'
          },
          {
            name: 'Font Availability Check',
            description: 'Check if font loaded before using. Use isLoaded() method to verify.',
            code: 'if (fontLoader.isLoaded("CustomFont")) {\n  ctx.font = "24px CustomFont";\n} else {\n  ctx.font = "24px Arial";\n}'
          },
          {
            name: 'Graceful Degradation',
            description: 'Design works with or without custom fonts. Fallbacks ensure text always displays.',
            code: 'ctx.font = "24px CustomFont, Arial, sans-serif";'
          }
        ],
        geometricMeaning: 'Fallback chain provides redundancy. If primary font unavailable, secondary font used.',
        applications: [
          'Robust font loading',
          'Cross-browser compatibility',
          'Error handling',
          'User experience'
        ]
      },
      4: {
        title: 'Step 4: Font Loading Progress',
        description: 'Track font loading progress for better UX. Show loading screen while fonts load.',
        concepts: [
          {
            name: 'Loading Progress',
            description: 'Track number of fonts loaded vs total. Update UI as fonts load.',
            code: 'let loaded = 0;\nconst total = fonts.length;\nloaded++;\nconsole.log(`Loaded ${loaded}/${total}`);'
          },
          {
            name: 'Loading Screen',
            description: 'Show loading screen while fonts load. Hide when all fonts loaded.',
            code: 'showLoadingScreen();\nawait loadFonts();\nhideLoadingScreen();'
          },
          {
            name: 'Promise.all',
            description: 'Load all fonts in parallel. Promise.all waits for all fonts to load.',
            code: 'await Promise.all(fonts.map(font => fontLoader.loadFont(...)));'
          },
          {
            name: 'Error Handling per Font',
            description: 'Handle errors per font. One font failure doesn\'t stop others from loading.',
            code: 'promises.map(async (font) => {\n  try {\n    await fontLoader.loadFont(...);\n  } catch (error) {\n    console.error("Failed:", error);\n  }\n})'
          }
        ],
        geometricMeaning: 'Progress tracking provides feedback. Users see loading state, improving perceived performance.',
        applications: [
          'Loading screens',
          'Progress indicators',
          'User feedback',
          'Performance perception'
        ]
      },
      5: {
        title: 'Step 5: Using Fonts in Renderer',
        description: 'Integrate font loading with renderer. Extend Renderer class with font-aware text drawing methods.',
        concepts: [
          {
            name: 'Font String Format',
            description: 'Canvas font property format: "size font-family". Include fallbacks in font-family.',
            code: 'ctx.font = "24px CustomFont, Arial, sans-serif";'
          },
          {
            name: 'Text Drawing Options',
            description: 'Text drawing needs: font, size, color, alignment, baseline. Group in options object.',
            code: 'drawText(text, x, y, {\n  font: "CustomFont",\n  size: 24,\n  color: "#fff",\n  align: "left"\n})'
          },
          {
            name: 'Text Measurement',
            description: 'measureText() returns TextMetrics with width. Useful for layout and centering.',
            code: 'const metrics = ctx.measureText("Hello");\nconst width = metrics.width;'
          },
          {
            name: 'Context State',
            description: 'Save/restore context state when changing font. Prevents affecting other drawings.',
            code: 'ctx.save();\nctx.font = "24px CustomFont";\nctx.fillText(...);\nctx.restore();'
          }
        ],
        geometricMeaning: 'Font integration enables typography. Text rendering combines font, size, and positioning.',
        applications: [
          'Text rendering',
          'UI text',
          'Typography',
          'Text layout'
        ]
      },
      6: {
        title: 'Step 6: Complete Font System Integration',
        description: 'Complete integration of font system with game engine. Load fonts at startup, use throughout game.',
        concepts: [
          {
            name: 'Initialization Order',
            description: 'Load fonts before starting engine. Ensures fonts available when rendering starts.',
            code: 'await initializeFonts();\nengine.start();'
          },
          {
            name: 'Font Organization',
            description: 'Organize fonts by purpose: TitleFont, BodyFont, UIFont. Clear naming convention.',
            code: 'const fonts = [\n  { name: "TitleFont", url: "...", weight: "700" },\n  { name: "UIFont", url: "...", weight: "400" }\n];'
          },
          {
            name: 'Font Usage in Game',
            description: 'Use different fonts for different UI elements. TitleFont for titles, UIFont for UI.',
            code: 'ctx.font = "48px TitleFont"; // Title\nctx.font = "24px UIFont"; // UI text'
          },
          {
            name: 'Complete System',
            description: 'FontLoader + Renderer + Engine integration. Complete typography system for games.',
            code: 'FontLoader → Load fonts\nRenderer → Draw text\nEngine → Use in game loop'
          }
        ],
        geometricMeaning: 'Complete font system provides typography foundation. Fonts loaded once, used throughout game.',
        applications: [
          'Complete typography system',
          'Game UI',
          'Text rendering',
          'Professional games'
        ]
      }
    },
    tweening: {
      1: {
        title: 'Step 1: Tween Class Module',
        description: 'Tweening (in-betweening) smoothly animates properties from start to end values over time. The Tween class provides a flexible animation system with easing functions, callbacks, and control methods.',
        concepts: [
          {
            name: 'Interpolation',
            description: 'Tweening uses linear interpolation: value = start + (end - start) * t, where t ranges from 0 to 1. The easing function modifies t to create different animation curves.',
            code: 'value = start + (end - start) * easing(t)'
          },
          {
            name: 'Easing Functions',
            description: 'Easing functions modify the interpolation factor t to create natural motion. Linear (t) is constant speed, EaseIn starts slow, EaseOut ends slow, EaseInOut combines both.',
            code: 'Linear: t\nEaseInQuad: t * t\nEaseOutQuad: t * (2 - t)'
          },
          {
            name: 'Property Animation',
            description: 'Tweens can animate any numeric property of an object. Multiple properties animate simultaneously, creating complex animations from simple code.',
            code: 'tween.to(box, 1000, { x: 400, y: 300, width: 100 })'
          },
          {
            name: 'Time-based Animation',
            description: 'Tweens use elapsed time (Date.now()) rather than frame count, ensuring consistent speed regardless of frame rate. Duration is in milliseconds.',
            code: 'const elapsed = currentTime - startTime;\nconst t = Math.min(elapsed / duration, 1);'
          }
        ],
        geometricMeaning: 'Tweening creates smooth curves between points. Easing functions transform the linear path (straight line) into curves (quadratic, cubic, elastic, bounce) that feel natural.',
        applications: [
          'UI animations',
          'Character movement',
          'Camera transitions',
          'Visual effects'
        ]
      },
      2: {
        title: 'Step 2: Tween Manager',
        description: 'TweenManager centralizes tween lifecycle management. It updates all active tweens each frame, removes completed ones, and provides convenient helper methods for common animation patterns.',
        concepts: [
          {
            name: 'Centralized Management',
            description: 'A single manager tracks all active tweens, updates them efficiently, and cleans up completed animations. This prevents memory leaks and simplifies code.',
            code: 'tweenManager.update(deltaTime);\n// Updates all active tweens'
          },
          {
            name: 'Helper Methods',
            description: 'to(), from(), and fromTo() provide convenient shortcuts. to() animates from current to target, from() animates from target to current, fromTo() specifies both.',
            code: 'tweenManager.to(obj, 1000, { x: 400 });\ntweenManager.from(obj, 1000, { x: 0 });'
          },
          {
            name: 'Lifecycle Management',
            description: 'The manager automatically removes completed tweens from its array. Pause/resume methods control all tweens simultaneously for game pause functionality.',
            code: 'tweenManager.pause(); // Pause all\ntweenManager.resume(); // Resume all'
          },
          {
            name: 'Memory Management',
            description: 'Completed tweens are removed from the array to prevent memory buildup. The manager iterates backwards to safely remove items during iteration.',
            code: 'for (let i = tweens.length - 1; i >= 0; i--) {\n  if (tweens[i].isComplete) {\n    tweens.splice(i, 1);\n  }\n}'
          }
        ],
        geometricMeaning: 'TweenManager organizes animations in a collection. Like managing multiple moving points, the manager coordinates all animations to run simultaneously and efficiently.',
        applications: [
          'Game-wide animation control',
          'Pause/resume functionality',
          'Batch animation management',
          'Performance optimization'
        ]
      },
      3: {
        title: 'Step 3: Using Tweens with Entities',
        description: 'Tweens integrate seamlessly with entities, animating position, scale, rotation, and other properties. Update the tween manager in the game loop to drive animations.',
        concepts: [
          {
            name: 'Entity Integration',
            description: 'Tweens modify entity properties directly. Since entities are objects, tweens can animate x, y, rotation, scale, alpha, or any numeric property.',
            code: 'tweenManager.to(entity, 1000, {\n  x: 400,\n  y: 300,\n  rotation: Math.PI\n});'
          },
          {
            name: 'Game Loop Integration',
            description: 'Call tweenManager.update() in the game update loop. Pass deltaTime or use Date.now() internally. Tweens update before entity rendering.',
            code: 'engine.onUpdate = (deltaTime) => {\n  tweenManager.update(deltaTime);\n  entity.update(deltaTime);\n};'
          },
          {
            name: 'Callback Integration',
            description: 'onComplete callbacks trigger actions when animations finish. Chain animations by starting the next tween in the previous onComplete callback.',
            code: 'tweenManager.to(box, 1000, { x: 400 }, {\n  onComplete: () => {\n    // Start next animation\n  }\n});'
          },
          {
            name: 'Multiple Properties',
            description: 'A single tween can animate multiple properties simultaneously. All properties use the same duration and easing, creating synchronized animations.',
            code: 'tweenManager.to(box, 1000, {\n  x: 400,\n  y: 300,\n  width: 100,\n  height: 100\n});'
          }
        ],
        geometricMeaning: 'Tweens transform entities through space and properties. Like animating a point along a path, tweens smoothly move entities from one state to another.',
        applications: [
          'Character movement',
          'UI transitions',
          'Camera following',
          'Object transformations'
        ]
      },
      4: {
        title: 'Step 4: Chaining and Sequencing Tweens',
        description: 'Chain tweens by starting the next in the previous onComplete callback. Use delays for parallel animations. Repeat and yoyo options create looping animations.',
        concepts: [
          {
            name: 'Sequential Chaining',
            description: 'Start the next tween in the previous onComplete callback. This creates a sequence where each animation waits for the previous to complete.',
            code: 'tween1.onComplete = () => {\n  tween2.start();\n};'
          },
          {
            name: 'Parallel Animations',
            description: 'Start multiple tweens simultaneously, or use delay to stagger them. All tweens run concurrently, animating different properties or objects.',
            code: 'tweenManager.to(obj1, 1000, { x: 400 });\ntweenManager.to(obj2, 1000, { y: 300 }, { delay: 200 });'
          },
          {
            name: 'Repeat',
            description: 'Repeat option replays the animation N times. Set repeat to -1 for infinite loops. Each repeat restarts from the beginning.',
            code: 'tweenManager.to(box, 1000, { x: 400 }, {\n  repeat: 3 // Repeat 3 times\n});'
          },
          {
            name: 'Yoyo',
            description: 'Yoyo reverses the animation on repeat, creating back-and-forth motion. Combined with repeat: -1, creates infinite ping-pong animations.',
            code: 'tweenManager.to(box, 1000, { x: 400 }, {\n  repeat: -1,\n  yoyo: true // Back and forth\n});'
          }
        ],
        geometricMeaning: 'Chaining creates animation paths: sequential (one after another) or parallel (simultaneous). Yoyo creates oscillating motion, like a pendulum swinging back and forth.',
        applications: [
          'Complex animation sequences',
          'UI state transitions',
          'Character action chains',
          'Visual effect sequences'
        ]
      },
      5: {
        title: 'Step 5: Advanced Easing Functions',
        description: 'Easing functions create natural motion. Linear is constant speed, quadratic/cubic create smooth acceleration, elastic creates spring-like motion, bounce creates bouncy landings.',
        concepts: [
          {
            name: 'Ease In',
            description: 'EaseIn functions start slow and accelerate. EaseInQuad uses t², creating gentle acceleration. Higher powers (cubic, quart) create stronger acceleration.',
            code: 'EaseInQuad: t * t\nEaseInCubic: t * t * t'
          },
          {
            name: 'Ease Out',
            description: 'EaseOut functions start fast and decelerate. EaseOutQuad uses t*(2-t), creating smooth deceleration. Perfect for objects coming to rest.',
            code: 'EaseOutQuad: t * (2 - t)\nEaseOutCubic: --t * t * t + 1'
          },
          {
            name: 'Ease In Out',
            description: 'EaseInOut combines both: slow start, fast middle, slow end. Creates smooth, natural motion for most animations.',
            code: 'EaseInOutQuad: t < 0.5 ? 2*t*t : -1 + (4-2*t)*t'
          },
          {
            name: 'Elastic & Bounce',
            description: 'Elastic creates spring-like overshoot. Bounce creates bouncy landings with multiple bounces. Both add character and playfulness to animations.',
            code: 'EaseOutElastic: Uses sine wave with exponential decay\nEaseOutBounce: Multiple quadratic curves'
          },
          {
            name: 'Custom Easing',
            description: 'Create custom easing functions by defining a function that takes t (0-1) and returns a modified t. Allows complete control over animation curves.',
            code: 'function customEasing(t) {\n  return t * t * (3 - 2 * t);\n}'
          }
        ],
        geometricMeaning: 'Easing functions transform the interpolation curve. Linear is a straight line, quadratic is a parabola, cubic is S-shaped, elastic oscillates, bounce has multiple peaks.',
        applications: [
          'Natural character movement',
          'UI element animations',
          'Visual feedback',
          'Polished game feel'
        ]
      },
      6: {
        title: 'Step 6: Complete Tweening System Integration',
        description: 'Integrate tweens throughout the game: animate player movement, enemy behaviors, UI transitions, camera movements. Combine with other systems for rich, interactive animations.',
        concepts: [
          {
            name: 'Game Integration',
            description: 'Use tweens for all animated elements: characters, enemies, UI, camera, effects. Update tweenManager in the main game loop alongside other systems.',
            code: 'engine.onUpdate = (deltaTime) => {\n  tweenManager.update(deltaTime);\n  scene.update(deltaTime);\n};'
          },
          {
            name: 'Interactive Animations',
            description: 'Start tweens in response to player input, game events, or conditions. Combine with callbacks to create responsive, dynamic animations.',
            code: 'input.onClick(() => {\n  tweenManager.to(button, 200, { scale: 1.2 });\n});'
          },
          {
            name: 'Performance',
            description: 'TweenManager efficiently updates all tweens. Completed tweens are automatically removed. Use delays and sequencing to avoid too many simultaneous tweens.',
            code: '// Efficient: tweens auto-cleanup\n// Avoid: creating thousands of tweens'
          },
          {
            name: 'Combining Systems',
            description: 'Tweens work with entities, input, scenes, and other systems. Animate entity properties, respond to input with tweens, create scene transitions.',
            code: '// Tween entity position\n// Tween camera following player\n// Tween UI on game state change'
          }
        ],
        geometricMeaning: 'Tweening system orchestrates all animations in the game. Like a conductor coordinating musicians, the tween manager coordinates all moving elements to create a cohesive, animated experience.',
        applications: [
          'Complete game animations',
          'Polished user experience',
          'Dynamic visual feedback',
          'Professional game feel'
        ]
      }
    }
  };

  return theories[module] && theories[module][step] ? theories[module][step] : null;
};

