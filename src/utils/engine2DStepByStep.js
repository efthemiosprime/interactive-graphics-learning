// Step-by-step explanations for 2D Engine Tutorial

export const getEngine2DStepByStep = (module, step) => {
  const steps = {
    setup: {
      1: {
        explanation: 'Setting up a Vite.js project provides a modern development environment with fast HMR and optimized builds. We organize code into modules for maintainability.',
        steps: [
          {
            title: 'Step 1: Install Node.js and npm',
            formula: 'Check: node --version && npm --version',
            description: 'Ensure Node.js (v16+) and npm are installed. Vite requires Node.js for the build system.',
            calculation: 'Verify installation with version commands',
            result: 'Node.js and npm ready'
          },
          {
            title: 'Step 2: Create Vite Project',
            formula: 'npm create vite@latest engine2d-tutorial -- --template vanilla',
            description: 'Creates new project directory with vanilla JavaScript template. No framework overhead.',
            calculation: 'Vite scaffolds project structure automatically',
            result: 'Project directory created'
          },
          {
            title: 'Step 3: Install Dependencies',
            formula: 'cd engine2d-tutorial && npm install',
            description: 'Installs Vite and development dependencies. Creates node_modules/ folder.',
            calculation: 'Downloads packages from npm registry',
            result: 'Dependencies installed'
          },
          {
            title: 'Step 4: Create Project Structure',
            formula: 'src/engine2D/ → Core.js, Renderer.js, ...',
            description: 'Organize engine modules in engine2D/ folder. Each module is a separate file.',
            calculation: 'Create directory structure manually or via script',
            result: 'Project structure organized'
          },
          {
            title: 'Step 5: Configure index.html',
            formula: '<canvas id="gameCanvas"></canvas>\n<script type="module" src="/src/main.js"></script>',
            description: 'Add canvas element and module script tag. type="module" enables ES6 imports.',
            calculation: 'HTML structure for canvas rendering',
            result: 'HTML configured'
          },
          {
            title: 'Step 6: Start Development Server',
            formula: 'npm run dev',
            description: 'Starts Vite dev server with HMR. Opens browser automatically.',
            calculation: 'Server runs on http://localhost:5173',
            result: 'Development environment ready'
          }
        ]
      },
      2: {
        explanation: 'The Core module initializes the canvas and creates the game loop. It manages timing, FPS tracking, and provides callbacks for update/render.',
        steps: [
          {
            title: 'Step 1: Create Engine2D Class',
            formula: 'export class Engine2D { constructor(canvas) { ... } }',
            description: 'Define class with canvas parameter. Export for use in other modules.',
            calculation: 'Class structure with constructor',
            result: 'Class defined'
          },
          {
            title: 'Step 2: Initialize Canvas',
            formula: 'this.canvas = canvas;\nthis.ctx = canvas.getContext("2d");',
            description: 'Store canvas reference and get 2D rendering context. Context provides drawing methods.',
            calculation: 'Canvas and context initialized',
            result: 'Rendering context ready'
          },
          {
            title: 'Step 3: Set Canvas Resolution',
            formula: 'canvas.width = 800;\ncanvas.height = 600;',
            description: 'Set internal pixel resolution. Independent of CSS size. Higher = sharper but slower.',
            calculation: '800 × 600 = 480,000 pixels',
            result: 'Resolution set'
          },
          {
            title: 'Step 4: Initialize Timing Variables',
            formula: 'this.lastTime = performance.now();\nthis.fps = 0;',
            description: 'Track last frame time for delta calculation. FPS counter for performance monitoring.',
            calculation: 'High-resolution timestamp stored',
            result: 'Timing initialized'
          },
          {
            title: 'Step 5: Create Game Loop',
            formula: 'loop() { calculateDeltaTime(); update(); render(); requestAnimationFrame(loop); }',
            description: 'Continuous loop: calculate time, update state, render graphics, schedule next frame.',
            calculation: 'Loop runs ~60 times per second',
            result: 'Game loop created'
          },
          {
            title: 'Step 6: Calculate Delta Time',
            formula: 'deltaTime = (now - lastTime) / 1000',
            description: 'Convert milliseconds to seconds. Ensures movement speed is frame-rate independent.',
            calculation: 'Example: (16.67ms) / 1000 = 0.01667s',
            result: 'Delta time calculated'
          },
          {
            title: 'Step 7: Update FPS Counter',
            formula: 'if (fpsTime >= 1.0) { fps = frameCount; frameCount = 0; }',
            description: 'Count frames over 1-second window. Reset counter and update FPS display.',
            calculation: '60 frames / 1 second = 60 FPS',
            result: 'FPS tracked'
          },
          {
            title: 'Step 8: Call Update Callback',
            formula: 'if (this.onUpdate) this.onUpdate(deltaTime);',
            description: 'Call user-defined update function with delta time. User implements game logic here.',
            calculation: 'Callback executed each frame',
            result: 'Game state updated'
          },
          {
            title: 'Step 9: Clear Canvas',
            formula: 'ctx.clearRect(0, 0, width, height);',
            description: 'Erase previous frame. Prepares canvas for new rendering.',
            calculation: 'Clears entire canvas area',
            result: 'Canvas cleared'
          },
          {
            title: 'Step 10: Call Render Callback',
            formula: 'if (this.onRender) this.onRender(ctx);',
            description: 'Call user-defined render function with context. User draws graphics here.',
            calculation: 'Callback executed each frame',
            result: 'Graphics rendered'
          }
        ]
      },
      3: {
        explanation: 'The Renderer module wraps Canvas 2D API with a clean interface. It handles drawing primitives, transformations, and the transform stack.',
        steps: [
          {
            title: 'Step 1: Create Renderer Class',
            formula: 'export class Renderer { constructor(ctx) { this.ctx = ctx; } }',
            description: 'Store canvas context reference. All drawing uses this context.',
            calculation: 'Context stored for drawing operations',
            result: 'Renderer created'
          },
          {
            title: 'Step 2: Implement clear()',
            formula: 'clearRect(0, 0, canvas.width, canvas.height)',
            description: 'Clear entire canvas. Removes all previous drawings.',
            calculation: 'Clears width × height pixels',
            result: 'Canvas cleared'
          },
          {
            title: 'Step 3: Implement fillRect()',
            formula: 'ctx.fillStyle = color;\nctx.fillRect(x, y, width, height);',
            description: 'Set fill color, then draw filled rectangle. Color is CSS color string.',
            calculation: 'Draws rectangle at (x, y) with size (width, height)',
            result: 'Rectangle drawn'
          },
          {
            title: 'Step 4: Implement fillCircle()',
            formula: 'beginPath(); arc(x, y, radius, 0, 2π); fill();',
            description: 'Start path, add arc (full circle), fill. Arc uses radians (0 to 2π).',
            calculation: 'Circle centered at (x, y) with radius',
            result: 'Circle drawn'
          },
          {
            title: 'Step 5: Implement drawText()',
            formula: 'ctx.font = font;\nctx.fillText(text, x, y);',
            description: 'Set font style, then draw text. Font is CSS font string (e.g., "16px Arial").',
            calculation: 'Text rendered at (x, y)',
            result: 'Text drawn'
          },
          {
            title: 'Step 6: Implement Transform Stack',
            formula: 'save(); transform(); draw(); restore();',
            description: 'save() pushes current state, restore() pops. Allows nested transforms.',
            calculation: 'Stack: [state1, state2, ...]',
            result: 'Transform stack managed'
          },
          {
            title: 'Step 7: Implement setTransform()',
            formula: 'translate(x, y); rotate(θ); scale(sx, sy);',
            description: 'Apply transformations in order: translate → rotate → scale. Order matters!',
            calculation: 'Transform matrix: T × R × S',
            result: 'Transform applied'
          },
          {
            title: 'Step 8: Coordinate Transformation',
            formula: 'Local → Transform → World → Screen',
            description: 'Coordinates flow through transform pipeline. Each step modifies coordinate system.',
            calculation: 'Matrix multiplication at each step',
            result: 'Coordinates transformed'
          }
        ]
      },
      4: {
        explanation: 'The Scene module manages all entities in the game world. It provides collection management, update/render loops, and spatial queries.',
        steps: [
          {
            title: 'Step 1: Create Scene Class',
            formula: 'export class Scene { constructor() { this.entities = []; } }',
            description: 'Initialize empty entity array. Array stores all game objects.',
            calculation: 'Empty array created',
            result: 'Scene created'
          },
          {
            title: 'Step 2: Implement add()',
            formula: 'entities.push(entity); entity.scene = this;',
            description: 'Add entity to array and set scene reference. Entity knows its scene.',
            calculation: 'Array length increases by 1',
            result: 'Entity added'
          },
          {
            title: 'Step 3: Implement remove()',
            formula: 'index = entities.indexOf(entity); entities.splice(index, 1);',
            description: 'Find entity index, remove from array. Updates array length.',
            calculation: 'Array length decreases by 1',
            result: 'Entity removed'
          },
          {
            title: 'Step 4: Implement update()',
            formula: 'for (entity of entities) { if (entity.update) entity.update(deltaTime); }',
            description: 'Iterate all entities, call update if method exists. Pass delta time for frame-rate independence.',
            calculation: 'O(n) time complexity, n = entity count',
            result: 'All entities updated'
          },
          {
            title: 'Step 5: Implement render()',
            formula: 'for (entity of entities) { if (entity.onRender) entity.onRender(renderer); }',
            description: 'Iterate all entities, call render if method exists. Pass renderer for drawing.',
            calculation: 'O(n) time complexity',
            result: 'All entities rendered'
          },
          {
            title: 'Step 6: Implement findByPosition()',
            formula: 'entities.filter(e => e.x === x && e.y === y)',
            description: 'Filter entities matching exact position. Returns array of matches.',
            calculation: 'O(n) time complexity',
            result: 'Matching entities found'
          },
          {
            title: 'Step 7: Implement findByType()',
            formula: 'entities.filter(e => e.constructor.name === type)',
            description: 'Filter entities by class name. Uses constructor.name for type checking.',
            calculation: 'O(n) time complexity',
            result: 'Entities of type found'
          },
          {
            title: 'Step 8: Entity Hierarchy',
            formula: 'entity.parent = parent; parent.children.push(entity);',
            description: 'Link entities in parent-child relationships. Enables hierarchical transforms.',
            calculation: 'Tree structure: parent → children',
            result: 'Hierarchy established'
          }
        ]
      },
      5: {
        explanation: 'The Entity module provides transform properties and hierarchical transforms. World transforms combine parent and local transforms using matrix math.',
        steps: [
          {
            title: 'Step 1: Create Entity Class',
            formula: 'export class Entity { constructor(x, y) { this.x = x; this.y = y; ... } }',
            description: 'Initialize position, rotation, scale. Default rotation=0, scale=1.',
            calculation: 'Transform properties initialized',
            result: 'Entity created'
          },
          {
            title: 'Step 2: Initialize Transform Properties',
            formula: 'this.x = x; this.y = y; this.rotation = 0; this.scaleX = 1; this.scaleY = 1;',
            description: 'Set local transform values. These define entity\'s local space.',
            calculation: 'Position, rotation, scale stored',
            result: 'Local transform set'
          },
          {
            title: 'Step 3: Initialize Hierarchy',
            formula: 'this.parent = null; this.children = [];',
            description: 'No parent initially, empty children array. Enables tree structure.',
            calculation: 'Hierarchy pointers initialized',
            result: 'Hierarchy ready'
          },
          {
            title: 'Step 4: Implement addChild()',
            formula: 'children.push(child); child.parent = this;',
            description: 'Add child to array, set child\'s parent. Maintains bidirectional link.',
            calculation: 'Tree structure updated',
            result: 'Child added'
          },
          {
            title: 'Step 5: Calculate World Position (No Parent)',
            formula: 'if (!parent) return this.x;',
            description: 'If no parent, world position equals local position. Base case for recursion.',
            calculation: 'Direct return of local value',
            result: 'World position = local position'
          },
          {
            title: 'Step 6: Calculate World Position (With Parent)',
            formula: 'worldX = parent.worldX + localX × cos(θ) - localY × sin(θ)',
            description: 'Transform local position by parent rotation, then add parent world position.',
            calculation: 'Rotation matrix applied, then translation',
            result: 'World position calculated'
          },
          {
            title: 'Step 7: Calculate World Rotation',
            formula: 'if (parent) return parent.worldRotation + this.rotation;',
            description: 'Sum all parent rotations plus local rotation. Rotations are additive.',
            calculation: 'Cumulative sum of rotations',
            result: 'World rotation calculated'
          },
          {
            title: 'Step 8: Calculate World Scale',
            formula: 'if (parent) return parent.worldScaleX × this.scaleX;',
            description: 'Multiply all parent scales by local scale. Scales are multiplicative.',
            calculation: 'Cumulative product of scales',
            result: 'World scale calculated'
          },
          {
            title: 'Step 9: Transform Matrix Composition',
            formula: 'M_world = M_parent × M_local',
            description: 'Combine transforms using matrix multiplication. Order: parent first, then local.',
            calculation: 'Matrix multiplication combines transforms',
            result: 'World transform matrix'
          }
        ]
      },
      6: {
        explanation: 'The Input module handles mouse and touch events. It converts screen coordinates to canvas coordinates and provides hit testing.',
        steps: [
          {
            title: 'Step 1: Create Input Class',
            formula: 'export class Input { constructor(canvas) { this.canvas = canvas; ... } }',
            description: 'Store canvas reference and initialize mouse state variables.',
            calculation: 'Input system initialized',
            result: 'Input created'
          },
          {
            title: 'Step 2: Initialize Mouse State',
            formula: 'this.mouseX = -1; this.mouseY = -1; this.mouseDown = false;',
            description: 'Set initial mouse position (-1 = off canvas) and button state.',
            calculation: 'State variables initialized',
            result: 'Mouse state ready'
          },
          {
            title: 'Step 3: Setup Mouse Move Listener',
            formula: 'canvas.addEventListener("mousemove", (e) => { calculateCanvasCoords(e); })',
            description: 'Listen for mouse movement. Calculate canvas-relative coordinates.',
            calculation: 'Event listener attached',
            result: 'Mouse tracking active'
          },
          {
            title: 'Step 4: Calculate Canvas Coordinates',
            formula: 'rect = canvas.getBoundingClientRect();\ncanvasX = (e.clientX - rect.left) × scale',
            description: 'Get canvas position on screen, subtract offset, multiply by scale factor.',
            calculation: 'Screen coords → Canvas coords',
            result: 'Canvas coordinates calculated'
          },
          {
            title: 'Step 5: Setup Mouse Down Listener',
            formula: 'canvas.addEventListener("mousedown", (e) => { this.mouseDown = true; })',
            description: 'Set mouseDown flag when button pressed. Tracks button state.',
            calculation: 'Boolean flag set to true',
            result: 'Mouse down detected'
          },
          {
            title: 'Step 6: Setup Mouse Up Listener',
            formula: 'canvas.addEventListener("mouseup", (e) => { this.mouseDown = false; })',
            description: 'Clear mouseDown flag when button released.',
            calculation: 'Boolean flag set to false',
            result: 'Mouse up detected'
          },
          {
            title: 'Step 7: Detect Press/Release',
            formula: 'mousePressed = mouseDown && !prevMouseDown',
            description: 'Press detected when button becomes down. Release detected when becomes up.',
            calculation: 'Edge detection logic',
            result: 'Press/release detected'
          },
          {
            title: 'Step 8: Implement Hit Test',
            formula: 'hit = (x ≥ entity.x) && (x ≤ entity.x + width) && (y ≥ entity.y) && (y ≤ entity.y + height)',
            description: 'Check if point is within entity bounds. Uses point-in-rectangle test.',
            calculation: 'Boolean intersection test',
            result: 'Hit test result'
          }
        ]
      },
      7: {
        explanation: 'The Utils module provides mathematical helpers: vectors, distance, angles, interpolation. These are fundamental for game calculations.',
        steps: [
          {
            title: 'Step 1: Create Vec2 Class',
            formula: 'export class Vec2 { constructor(x, y) { this.x = x; this.y = y; } }',
            description: '2D vector stores x and y components. Represents position or direction.',
            calculation: 'Vector initialized',
            result: 'Vec2 created'
          },
          {
            title: 'Step 2: Implement Vector Addition',
            formula: 'add(other) { return new Vec2(this.x + other.x, this.y + other.y); }',
            description: 'Add corresponding components. Creates new vector (immutable).',
            calculation: '(x₁, y₁) + (x₂, y₂) = (x₁+x₂, y₁+y₂)',
            result: 'Sum vector'
          },
          {
            title: 'Step 3: Implement Vector Length',
            formula: 'length() { return Math.sqrt(this.x² + this.y²); }',
            description: 'Calculate magnitude using Pythagorean theorem. Distance from origin.',
            calculation: '|v| = √(x² + y²)',
            result: 'Vector magnitude'
          },
          {
            title: 'Step 4: Implement Vector Normalization',
            formula: 'normalize() { const len = length(); return new Vec2(x/len, y/len); }',
            description: 'Divide by length to create unit vector. Preserves direction, sets length to 1.',
            calculation: 'v̂ = v / |v|',
            result: 'Unit vector'
          },
          {
            title: 'Step 5: Implement Distance Function',
            formula: 'distance(x1, y1, x2, y2) { dx = x2-x1; dy = y2-y1; return √(dx²+dy²); }',
            description: 'Calculate Euclidean distance between two points using Pythagorean theorem.',
            calculation: 'd = √((x₂-x₁)² + (y₂-y₁)²)',
            result: 'Distance value'
          },
          {
            title: 'Step 6: Implement Angle Function',
            formula: 'angle(x1, y1, x2, y2) { return Math.atan2(y2-y1, x2-x1); }',
            description: 'Calculate angle from point1 to point2 using atan2. Returns radians.',
            calculation: 'θ = atan2(Δy, Δx)',
            result: 'Angle in radians'
          },
          {
            title: 'Step 7: Implement LERP',
            formula: 'lerp(start, end, t) { return start + (end - start) × t; }',
            description: 'Linear interpolation between start and end. t=0 → start, t=1 → end.',
            calculation: 'result = a + (b - a) × t',
            result: 'Interpolated value'
          },
          {
            title: 'Step 8: Implement Clamp',
            formula: 'clamp(value, min, max) { return Math.min(Math.max(value, min), max); }',
            description: 'Constrain value to range [min, max]. Prevents out-of-bounds values.',
            calculation: 'clamp(150, 0, 100) = 100',
            result: 'Clamped value'
          }
        ]
      },
      8: {
        explanation: 'The AssetLoader module handles asynchronous image loading with caching. Uses Promises for async operations and Map for O(1) cache lookup.',
        steps: [
          {
            title: 'Step 1: Create AssetLoader Class',
            formula: 'export class AssetLoader { constructor() { this.cache = new Map(); } }',
            description: 'Initialize Map for asset cache. Map provides O(1) key-value lookup.',
            calculation: 'Empty Map created',
            result: 'AssetLoader created'
          },
          {
            title: 'Step 2: Check Cache',
            formula: 'if (this.cache.has(key)) return this.cache.get(key);',
            description: 'If asset already loaded, return immediately. No download needed.',
            calculation: 'O(1) lookup time',
            result: 'Cached asset returned'
          },
          {
            title: 'Step 3: Create Image Object',
            formula: 'const img = new Image();',
            description: 'Create HTMLImageElement. Browser handles image decoding.',
            calculation: 'Image object created',
            result: 'Image ready for loading'
          },
          {
            title: 'Step 4: Setup Load Handler',
            formula: 'img.onload = () => { cache.set(key, img); resolve(img); };',
            description: 'When image loads, store in cache and resolve promise. Success case.',
            calculation: 'Promise resolves with image',
            result: 'Image loaded'
          },
          {
            title: 'Step 5: Setup Error Handler',
            formula: 'img.onerror = () => { reject(new Error("Failed to load")); };',
            description: 'If load fails, reject promise with error. Failure case.',
            calculation: 'Promise rejects with error',
            result: 'Load failed'
          },
          {
            title: 'Step 6: Start Loading',
            formula: 'img.src = src;',
            description: 'Setting src triggers browser to download image. Async operation starts.',
            calculation: 'HTTP request initiated',
            result: 'Loading started'
          },
          {
            title: 'Step 7: Return Promise',
            formula: 'return new Promise((resolve, reject) => { ... });',
            description: 'Return promise for async/await usage. Caller can await result.',
            calculation: 'Promise returned immediately',
            result: 'Promise available'
          },
          {
            title: 'Step 8: Batch Loading',
            formula: 'Promise.all(promises.map(key => loadImage(key, src)))',
            description: 'Load multiple images concurrently. Promise.all waits for all.',
            calculation: 'Parallel execution',
            result: 'All images loaded'
          }
        ]
      },
      9: {
        explanation: 'The Sprite module extends Entity to add image rendering and animation. It handles sprite sheets, frame calculation, and animation timing.',
        steps: [
          {
            title: 'Step 1: Extend Entity Class',
            formula: 'export class Sprite extends Entity { constructor(x, y, image) { super(x, y); ... } }',
            description: 'Inherit transform properties from Entity. Add sprite-specific properties.',
            calculation: 'Inheritance chain: Sprite → Entity',
            result: 'Sprite class created'
          },
          {
            title: 'Step 2: Initialize Sprite Properties',
            formula: 'this.image = image; this.spriteSheet = null; this.currentFrame = 0;',
            description: 'Store image reference, sprite sheet data, and current frame index.',
            calculation: 'Properties initialized',
            result: 'Sprite initialized'
          },
          {
            title: 'Step 3: Setup Sprite Sheet',
            formula: 'setSpriteSheet(image, frameWidth, frameHeight, columns)',
            description: 'Store sheet dimensions. Calculate frame positions from these values.',
            calculation: 'Sheet metadata stored',
            result: 'Sprite sheet configured'
          },
          {
            title: 'Step 4: Calculate Frame Column',
            formula: 'column = frameIndex % columns',
            description: 'Use modulo to get column index. Wraps around for multi-row sheets.',
            calculation: 'frameIndex=5, columns=4 → column=1',
            result: 'Column calculated'
          },
          {
            title: 'Step 5: Calculate Frame Row',
            formula: 'row = Math.floor(frameIndex / columns)',
            description: 'Use floor division to get row index. Integer division.',
            calculation: 'frameIndex=5, columns=4 → row=1',
            result: 'Row calculated'
          },
          {
            title: 'Step 6: Calculate Source Rectangle',
            formula: 'sx = column × frameWidth; sy = row × frameHeight;',
            description: 'Calculate top-left corner of frame in sprite sheet. Pixel coordinates.',
            calculation: 'Source position in sheet',
            result: 'Source rect calculated'
          },
          {
            title: 'Step 7: Add Animation',
            formula: 'addAnimation(name, frames, speed, loop)',
            description: 'Store animation data: frame sequence, speed (seconds per frame), loop flag.',
            calculation: 'Animation data stored',
            result: 'Animation added'
          },
          {
            title: 'Step 8: Update Animation',
            formula: 'animationTime += deltaTime; if (time >= speed) { frame++; time = 0; }',
            description: 'Accumulate time, advance frame when threshold reached. Reset timer.',
            calculation: 'Frame advances based on time',
            result: 'Animation updated'
          },
          {
            title: 'Step 9: Handle Animation End',
            formula: 'if (frame >= frames.length) { if (loop) frame = 0; else frame = length-1; }',
            description: 'If animation complete, loop or stop at last frame based on loop flag.',
            calculation: 'Frame index managed',
            result: 'Animation loop handled'
          },
          {
            title: 'Step 10: Render Sprite',
            formula: 'drawImage(sheet, sx, sy, w, h, dx, dy, w, h)',
            description: 'Draw frame from sprite sheet. Source rect (sx,sy,w,h) to dest (dx,dy,w,h).',
            calculation: 'Frame rendered at world position',
            result: 'Sprite drawn'
          }
        ]
      },
      10: {
        explanation: 'The Effects module provides blend modes, filters, and post-processing. It wraps Canvas 2D API effects with a clean interface.',
        steps: [
          {
            title: 'Step 1: Create Effects Class',
            formula: 'export class Effects { constructor(ctx) { this.ctx = ctx; } }',
            description: 'Store canvas context. All effects modify context state.',
            calculation: 'Effects system initialized',
            result: 'Effects created'
          },
          {
            title: 'Step 2: Implement Blend Mode',
            formula: 'setBlendMode(mode) { ctx.globalCompositeOperation = mode; }',
            description: 'Set how new pixels combine with existing. Multiply darkens, screen lightens.',
            calculation: 'Blend mode set',
            result: 'Blend mode active'
          },
          {
            title: 'Step 3: Implement Blur Filter',
            formula: 'applyBlur(radius) { ctx.filter = `blur(${radius}px)`; }',
            description: 'Apply Gaussian blur. Higher radius = more blur. Affects all drawing.',
            calculation: 'Blur filter set',
            result: 'Blur applied'
          },
          {
            title: 'Step 4: Implement Drop Shadow',
            formula: 'ctx.shadowOffsetX = x; ctx.shadowBlur = blur; ctx.shadowColor = color;',
            description: 'Set shadow offset, blur radius, and color. Shadow drawn automatically.',
            calculation: 'Shadow properties set',
            result: 'Shadow configured'
          },
          {
            title: 'Step 5: Implement Color Adjustment',
            formula: 'filter = `brightness(${b}) contrast(${c}) saturate(${s})`',
            description: 'Combine multiple filters. Brightness scales RGB, contrast expands range.',
            calculation: 'Filter string built',
            result: 'Color adjustment applied'
          },
          {
            title: 'Step 6: Reset Filters',
            formula: 'ctx.filter = "none"; ctx.shadowBlur = 0;',
            description: 'Clear all filters. Important to prevent affecting other drawings.',
            calculation: 'Filters cleared',
            result: 'State reset'
          },
          {
            title: 'Step 7: Post-Processing Setup',
            formula: 'offscreen = createCanvas(); offscreenCtx.drawImage(sourceCanvas, 0, 0);',
            description: 'Create offscreen canvas, copy scene to it. Scene rendered normally first.',
            calculation: 'Offscreen canvas created',
            result: 'Scene copied'
          },
          {
            title: 'Step 8: Apply Post-Processing',
            formula: 'ctx.filter = effect; ctx.drawImage(offscreen, 0, 0);',
            description: 'Apply effect to offscreen canvas, draw to main canvas. Effect on entire scene.',
            calculation: 'Effect applied to scene',
            result: 'Post-processing complete'
          }
        ]
      }
    },
    core: {
      1: {
        explanation: 'Canvas initialization creates the drawing surface for our 2D engine.',
        steps: [
          {
            title: 'Step 1: Get Canvas Element',
            formula: 'canvas = document.getElementById("gameCanvas")',
            description: 'Retrieve the canvas element from the DOM using its ID',
            calculation: 'The canvas element provides the drawing surface',
            result: 'Canvas element reference'
          },
          {
            title: 'Step 2: Get 2D Context',
            formula: 'ctx = canvas.getContext("2d")',
            description: 'Obtain the 2D rendering context, which provides drawing methods',
            calculation: 'The context is the interface for all drawing operations',
            result: '2D rendering context'
          },
          {
            title: 'Step 3: Set Canvas Resolution',
            formula: 'canvas.width = 800\ncanvas.height = 600',
            description: 'Set the internal pixel resolution (separate from CSS display size)',
            calculation: 'This determines the canvas coordinate system size',
            result: 'Canvas resolution set to 800×600 pixels'
          },
          {
            title: 'Step 4: Verify Initialization',
            formula: 'if (!canvas || !ctx) throw Error',
            description: 'Check that canvas and context were successfully obtained',
            calculation: 'Error handling ensures the engine can start properly',
            result: 'Canvas ready for drawing'
          }
        ]
      },
      2: {
        explanation: 'The game loop continuously updates and renders, creating smooth animation.',
        steps: [
          {
            title: 'Step 1: Initialize Loop State',
            formula: 'isRunning = true\nlastFrameTime = performance.now()',
            description: 'Set running flag and record initial time',
            calculation: 'Tracks engine state and timing',
            result: 'Loop ready to start'
          },
          {
            title: 'Step 2: Calculate Delta Time',
            formula: 'deltaTime = (currentTime - lastFrameTime) / 1000',
            description: 'Calculate time elapsed since last frame in seconds',
            calculation: 'Converts milliseconds to seconds for game logic',
            result: 'Delta time in seconds (≈0.0167s for 60fps)'
          },
          {
            title: 'Step 3: Clamp Delta Time',
            formula: 'deltaTime = min(deltaTime, 0.1)',
            description: 'Prevent large time jumps from tab switching or lag',
            calculation: 'Limits maximum delta time to 100ms',
            result: 'Bounded delta time'
          },
          {
            title: 'Step 4: Clear Canvas',
            formula: 'ctx.clearRect(0, 0, width, height)',
            description: 'Clear previous frame\'s graphics',
            calculation: 'Prepares canvas for new frame',
            result: 'Clean canvas'
          },
          {
            title: 'Step 5: Update Game Logic',
            formula: 'update(deltaTime)',
            description: 'Call update function with delta time for frame-independent movement',
            calculation: 'Game state advances by deltaTime seconds',
            result: 'Updated game state'
          },
          {
            title: 'Step 6: Render Graphics',
            formula: 'render(ctx)',
            description: 'Call render function to draw current frame',
            calculation: 'Graphics drawn to canvas',
            result: 'Rendered frame'
          },
          {
            title: 'Step 7: Schedule Next Frame',
            formula: 'requestAnimationFrame(loop)',
            description: 'Schedule next frame before browser repaint',
            calculation: 'Browser calls loop() before next repaint (≈60fps)',
            result: 'Next frame scheduled'
          }
        ]
      },
      3: {
        explanation: 'Frame timing ensures smooth, consistent animation regardless of frame rate.',
        steps: [
          {
            title: 'Step 1: Track Frame Count',
            formula: 'frameCount++',
            description: 'Increment counter each frame',
            calculation: 'Counts frames in current interval',
            result: 'Frame count incremented'
          },
          {
            title: 'Step 2: Check Update Interval',
            formula: 'if (currentTime - fpsUpdateTime >= 1000)',
            description: 'Check if 1 second has passed since last FPS update',
            calculation: 'Updates FPS counter every second',
            result: 'Update interval reached'
          },
          {
            title: 'Step 3: Calculate FPS',
            formula: 'fps = frameCount',
            description: 'Frames counted in 1-second interval equals FPS',
            calculation: 'fps = frames per second',
            result: 'FPS value (target: 60)'
          },
          {
            title: 'Step 4: Reset Counter',
            formula: 'frameCount = 0\nfpsUpdateTime = currentTime',
            description: 'Reset counter and update timestamp for next interval',
            calculation: 'Prepares for next FPS calculation',
            result: 'Counter reset'
          }
        ]
      }
    },
    renderer: {
      1: {
        explanation: 'Basic shapes are the building blocks of 2D graphics.',
        steps: [
          {
            title: 'Step 1: Set Fill Color',
            formula: 'ctx.fillStyle = color',
            description: 'Set the color for filled shapes',
            calculation: 'Color can be hex (#ffffff), RGB (rgb(255,255,255)), or named (white)',
            result: 'Fill color set'
          },
          {
            title: 'Step 2: Draw Rectangle',
            formula: 'ctx.fillRect(x, y, width, height)',
            description: 'Draw filled rectangle at position (x, y) with given dimensions',
            calculation: 'Rectangle drawn from top-left corner',
            result: 'Rectangle rendered'
          },
          {
            title: 'Step 3: Draw Circle',
            formula: 'ctx.beginPath()\nctx.arc(x, y, radius, 0, 2π)\nctx.fill()',
            description: 'Create circular path and fill it',
            calculation: 'arc() creates path, fill() renders it',
            result: 'Circle rendered'
          }
        ]
      },
      2: {
        explanation: 'Transformations modify the coordinate system, enabling rotation and scaling.',
        steps: [
          {
            title: 'Step 1: Save Current State',
            formula: 'ctx.save()',
            description: 'Push current transformation matrix onto stack',
            calculation: 'Saves current coordinate system',
            result: 'State saved'
          },
          {
            title: 'Step 2: Apply Translation',
            formula: 'ctx.translate(x, y)',
            description: 'Move origin to (x, y)',
            calculation: 'Shifts coordinate system',
            result: 'Origin moved'
          },
          {
            title: 'Step 3: Apply Rotation',
            formula: 'ctx.rotate(angle)',
            description: 'Rotate coordinate system by angle (radians)',
            calculation: 'Rotates around current origin',
            result: 'Coordinate system rotated'
          },
          {
            title: 'Step 4: Apply Scale',
            formula: 'ctx.scale(sx, sy)',
            description: 'Scale coordinate system by sx horizontally, sy vertically',
            calculation: 'Multiplies coordinate values',
            result: 'Coordinate system scaled'
          },
          {
            title: 'Step 5: Draw in Transformed Space',
            formula: 'ctx.fillRect(0, 0, width, height)',
            description: 'Draw shapes in transformed coordinate system',
            calculation: 'Shapes appear transformed',
            result: 'Transformed shape rendered'
          },
          {
            title: 'Step 6: Restore State',
            formula: 'ctx.restore()',
            description: 'Pop transformation matrix from stack',
            calculation: 'Restores previous coordinate system',
            result: 'State restored'
          }
        ]
      },
      3: {
        explanation: 'Text and sprites enable rich graphics beyond basic shapes.',
        steps: [
          {
            title: 'Step 1: Set Font',
            formula: 'ctx.font = "size family"',
            description: 'Set font size and family for text rendering',
            calculation: 'Example: "24px Arial"',
            result: 'Font configured'
          },
          {
            title: 'Step 2: Set Text Color',
            formula: 'ctx.fillStyle = color',
            description: 'Set color for text fill',
            calculation: 'Same as shape fill color',
            result: 'Text color set'
          },
          {
            title: 'Step 3: Draw Text',
            formula: 'ctx.fillText(text, x, y)',
            description: 'Render text at position (x, y)',
            calculation: 'Text drawn with current font and color',
            result: 'Text rendered'
          },
          {
            title: 'Step 4: Load Image',
            formula: 'image = new Image()\nimage.src = "path.png"',
            description: 'Create Image object and set source',
            calculation: 'Image loads asynchronously',
            result: 'Image loading'
          },
          {
            title: 'Step 5: Draw Image',
            formula: 'ctx.drawImage(image, x, y, width, height)',
            description: 'Render image at position with size',
            calculation: 'Image drawn when loaded',
            result: 'Sprite rendered'
          }
        ]
      }
    },
    scene: {
      1: {
        explanation: 'Scene management organizes entities and handles their lifecycle.',
        steps: [
          {
            title: 'Step 1: Create Entity List',
            formula: 'entities = []',
            description: 'Initialize empty array to store entities',
            calculation: 'Array provides O(1) add, O(n) remove',
            result: 'Empty entity list'
          },
          {
            title: 'Step 2: Add Entity',
            formula: 'entities.push(entity)',
            description: 'Add entity to list',
            calculation: 'O(1) operation',
            result: 'Entity added'
          },
          {
            title: 'Step 3: Update All Entities',
            formula: 'for (entity of entities) entity.update(dt)',
            description: 'Call update() on each entity with delta time',
            calculation: 'O(n) where n = entity count',
            result: 'All entities updated'
          },
          {
            title: 'Step 4: Render All Entities',
            formula: 'for (entity of entities) entity.render(renderer)',
            description: 'Call render() on each entity',
            calculation: 'O(n) where n = entity count',
            result: 'All entities rendered'
          }
        ]
      },
      2: {
        explanation: 'Entity hierarchy enables complex object composition through parent-child relationships.',
        steps: [
          {
            title: 'Step 1: Add Child to Parent',
            formula: 'parent.addChild(child)',
            description: 'Establish parent-child relationship',
            calculation: 'Child position becomes relative to parent',
            result: 'Hierarchy established'
          },
          {
            title: 'Step 2: Calculate World Position',
            formula: 'worldPos = parent.worldPos + rotate(localPos, parent.worldRot) × parent.worldScale',
            description: 'Transform local position by parent\'s world transform',
            calculation: 'Accounts for parent translation, rotation, and scale',
            result: 'World position calculated'
          },
          {
            title: 'Step 3: Calculate World Rotation',
            formula: 'worldRot = parent.worldRot + localRot',
            description: 'Add parent and local rotations',
            calculation: 'Rotations combine additively',
            result: 'World rotation calculated'
          },
          {
            title: 'Step 4: Calculate World Scale',
            formula: 'worldScale = parent.worldScale × localScale',
            description: 'Multiply parent and local scales',
            calculation: 'Scales combine multiplicatively',
            result: 'World scale calculated'
          },
          {
            title: 'Step 5: Render Hierarchy',
            formula: 'parent.render() → children.render()',
            description: 'Rendering parent automatically renders children',
            calculation: 'Recursive rendering maintains hierarchy',
            result: 'Hierarchy rendered'
          }
        ]
      },
      3: {
        explanation: 'Entity queries enable finding entities by type, position, or other criteria.',
        steps: [
          {
            title: 'Step 1: Type Query',
            formula: 'entities.filter(e => e instanceof Type)',
            description: 'Filter entities by class/type',
            calculation: 'O(n) where n = entity count',
            result: 'Entities of specified type'
          },
          {
            title: 'Step 2: Calculate Distance',
            formula: 'distance = √((x₂-x₁)² + (y₂-y₁)²)',
            description: 'Calculate Euclidean distance between points',
            calculation: 'Uses Pythagorean theorem',
            result: 'Distance value'
          },
          {
            title: 'Step 3: Spatial Query',
            formula: 'entities.filter(e => distance(e.pos, queryPos) <= radius)',
            description: 'Filter entities within radius of query point',
            calculation: 'O(n) distance calculations',
            result: 'Entities within radius'
          },
          {
            title: 'Step 4: Optimize Query',
            formula: 'Use squared distance: distance² = (x₂-x₁)² + (y₂-y₁)²',
            description: 'Avoid sqrt for performance when comparing distances',
            calculation: 'Compare distance² to radius²',
            result: 'Faster query'
          }
        ]
      }
    },
    entity: {
      1: {
        explanation: 'Transform properties define entity position, orientation, and size.',
        steps: [
          {
            title: 'Step 1: Set Position',
            formula: 'entity.x = x\nentity.y = y',
            description: 'Set entity position in world space',
            calculation: 'Position in pixels',
            result: 'Entity positioned'
          },
          {
            title: 'Step 2: Set Rotation',
            formula: 'entity.rotation = degrees × π / 180',
            description: 'Convert degrees to radians and set rotation',
            calculation: 'Radians used internally (0 to 2π)',
            result: 'Entity rotated'
          },
          {
            title: 'Step 3: Set Scale',
            formula: 'entity.scaleX = sx\nentity.scaleY = sy',
            description: 'Set scale factors (1.0 = normal size)',
            calculation: 'Scale multiplies entity size',
            result: 'Entity scaled'
          }
        ]
      },
      2: {
        explanation: 'World transform combines entity\'s local transform with parent transforms.',
        steps: [
          {
            title: 'Step 1: Check for Parent',
            formula: 'if (entity.parent)',
            description: 'Determine if entity has parent',
            calculation: 'Root entities have no parent',
            result: 'Parent check complete'
          },
          {
            title: 'Step 2: Get Parent World Transform',
            formula: 'parentWorld = parent.getWorldPosition()\nparentRot = parent.getWorldRotation()\nparentScale = parent.getWorldScale()',
            description: 'Recursively get parent\'s world transform',
            calculation: 'May recurse up hierarchy',
            result: 'Parent world transform'
          },
          {
            title: 'Step 3: Transform Local Position',
            formula: 'worldX = parentWorld.x + (localX × cos(parentRot) - localY × sin(parentRot)) × parentScale.x',
            description: 'Apply parent rotation and scale to local position',
            calculation: 'Uses rotation matrix and scale multiplication',
            result: 'Transformed X coordinate'
          },
          {
            title: 'Step 4: Combine Rotations',
            formula: 'worldRot = parentRot + localRot',
            description: 'Add rotations together',
            calculation: 'Rotations are additive',
            result: 'World rotation'
          },
          {
            title: 'Step 5: Combine Scales',
            formula: 'worldScale = parentScale × localScale',
            description: 'Multiply scales together',
            calculation: 'Scales are multiplicative',
            result: 'World scale'
          }
        ]
      },
      3: {
        explanation: 'Update and render lifecycle methods enable entity behavior and graphics.',
        steps: [
          {
            title: 'Step 1: Check Active State',
            formula: 'if (!entity.active) return',
            description: 'Skip update if entity is inactive',
            calculation: 'Early exit optimization',
            result: 'Update skipped if inactive'
          },
          {
            title: 'Step 2: Update Entity Logic',
            formula: 'entity.update(deltaTime)',
            description: 'Call update method with delta time',
            calculation: 'Override in subclass for custom behavior',
            result: 'Entity logic updated'
          },
          {
            title: 'Step 3: Update Children',
            formula: 'for (child of children) child.update(dt)',
            description: 'Recursively update all children',
            calculation: 'Maintains hierarchy',
            result: 'Children updated'
          },
          {
            title: 'Step 4: Check Visibility',
            formula: 'if (!entity.visible) return',
            description: 'Skip render if entity is hidden',
            calculation: 'Early exit optimization',
            result: 'Render skipped if hidden'
          },
          {
            title: 'Step 5: Apply Transform',
            formula: 'renderer.setTransform(worldPos, worldRot, worldScale)',
            description: 'Set renderer transform to entity\'s world transform',
            calculation: 'Transforms coordinate system',
            result: 'Transform applied'
          },
          {
            title: 'Step 6: Render Entity',
            formula: 'entity.onRender(renderer)',
            description: 'Call custom render method',
            calculation: 'Override in subclass for custom graphics',
            result: 'Entity rendered'
          },
          {
            title: 'Step 7: Render Children',
            formula: 'for (child of children) child.render(renderer)',
            description: 'Recursively render all children',
            calculation: 'Maintains hierarchy',
            result: 'Children rendered'
          }
        ]
      }
    },
    input: {
      1: {
        explanation: 'Mouse position tracking converts screen coordinates to canvas coordinates.',
        steps: [
          {
            title: 'Step 1: Get Canvas Bounds',
            formula: 'rect = canvas.getBoundingClientRect()',
            description: 'Get canvas position and size on page',
            calculation: 'Provides offset from page origin',
            result: 'Canvas bounds'
          },
          {
            title: 'Step 2: Listen for Mouse Move',
            formula: 'canvas.addEventListener("mousemove", handler)',
            description: 'Register mouse move event listener',
            calculation: 'Fires continuously as mouse moves',
            result: 'Event listener registered'
          },
          {
            title: 'Step 3: Convert Coordinates',
            formula: 'canvasX = event.clientX - rect.left\ncanvasY = event.clientY - rect.top',
            description: 'Subtract canvas offset from screen coordinates',
            calculation: 'Converts screen space to canvas space',
            result: 'Canvas coordinates'
          },
          {
            title: 'Step 4: Store Position',
            formula: 'mouseX = canvasX\nmouseY = canvasY',
            description: 'Store converted coordinates',
            calculation: 'Available for hit testing',
            result: 'Mouse position tracked'
          }
        ]
      },
      2: {
        explanation: 'Click detection identifies which entity was clicked using hit testing.',
        steps: [
          {
            title: 'Step 1: Track Mouse State',
            formula: 'mouseDown = true on mousedown\nmouseDown = false on mouseup',
            description: 'Track whether mouse button is pressed',
            calculation: 'State persists between frames',
            result: 'Mouse state tracked'
          },
          {
            title: 'Step 2: Detect Press',
            formula: 'mousePressed = mouseDown && !lastMouseDown',
            description: 'Detect frame when mouse was just pressed',
            calculation: 'True only on first frame of press',
            result: 'Press detected'
          },
          {
            title: 'Step 3: Get Entity World Position',
            formula: 'worldPos = entity.getWorldPosition()',
            description: 'Get entity\'s position in world space',
            calculation: 'Accounts for parent transforms',
            result: 'World position'
          },
          {
            title: 'Step 4: Calculate Bounding Box',
            formula: 'left = worldPos.x - halfWidth\nright = worldPos.x + halfWidth\ntop = worldPos.y - halfHeight\nbottom = worldPos.y + halfHeight',
            description: 'Calculate entity bounding box',
            calculation: 'Uses entity size and world scale',
            result: 'Bounding box'
          },
          {
            title: 'Step 5: Test Point in Box',
            formula: 'inside = mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom',
            description: 'Check if mouse position is inside bounding box',
            calculation: 'Simple coordinate comparison',
            result: 'Hit test result'
          },
          {
            title: 'Step 6: Dispatch Click',
            formula: 'if (inside && mousePressed) entity.onClick(mouseX, mouseY)',
            description: 'Call entity\'s click handler if clicked',
            calculation: 'Entity handles its own click logic',
            result: 'Click event dispatched'
          }
        ]
      },
      3: {
        explanation: 'Touch support enables mobile interaction with multi-touch capabilities.',
        steps: [
          {
            title: 'Step 1: Prevent Default',
            formula: 'event.preventDefault()',
            description: 'Stop browser default touch behavior',
            calculation: 'Prevents scrolling and zooming',
            result: 'Default behavior prevented'
          },
          {
            title: 'Step 2: Get Touch List',
            formula: 'touches = event.touches',
            description: 'Get all active touches',
            calculation: 'TouchList contains Touch objects',
            result: 'Touch list'
          },
          {
            title: 'Step 3: Convert Touch Coordinates',
            formula: 'touchX = touch.clientX - rect.left\ntouchY = touch.clientY - rect.top',
            description: 'Convert touch screen coordinates to canvas',
            calculation: 'Same conversion as mouse',
            result: 'Canvas coordinates'
          },
          {
            title: 'Step 4: Store Touch Data',
            formula: 'touches.push({x, y, id})',
            description: 'Store touch position and identifier',
            calculation: 'ID tracks touch across events',
            result: 'Touch data stored'
          },
          {
            title: 'Step 5: Update Mouse Position',
            formula: 'if (touches.length > 0) mouseX = touches[0].x',
            description: 'Use first touch for mouse position',
            calculation: 'Enables mouse code to work with touch',
            result: 'Mouse position synced'
          }
        ]
      }
    },
    utils: {
      1: {
        explanation: 'Vector math provides operations for 2D points, directions, and movement.',
        steps: [
          {
            title: 'Step 1: Create Vector',
            formula: 'v = new Vec2(x, y)',
            description: 'Create vector with x and y components',
            calculation: 'Represents point or direction',
            result: 'Vector created'
          },
          {
            title: 'Step 2: Add Vectors',
            formula: 'v3 = v1.add(v2) = (x1+x2, y1+y2)',
            description: 'Add components separately',
            calculation: 'Used for position + velocity',
            result: 'Sum vector'
          },
          {
            title: 'Step 3: Calculate Length',
            formula: '|v| = √(x² + y²)',
            description: 'Use Pythagorean theorem',
            calculation: 'Distance from origin',
            result: 'Vector length'
          },
          {
            title: 'Step 4: Normalize Vector',
            formula: 'v̂ = v / |v|',
            description: 'Divide by length to get unit vector',
            calculation: 'Preserves direction, sets length to 1',
            result: 'Unit vector'
          }
        ]
      },
      2: {
        explanation: 'Distance and angle calculations enable spatial relationships and movement.',
        steps: [
          {
            title: 'Step 1: Calculate Distance',
            formula: 'd = √((x₂-x₁)² + (y₂-y₁)²)',
            description: 'Euclidean distance using Pythagorean theorem',
            calculation: 'Straight-line distance between points',
            result: 'Distance value'
          },
          {
            title: 'Step 2: Use Squared Distance',
            formula: 'd² = (x₂-x₁)² + (y₂-y₁)²',
            description: 'Avoid sqrt for performance when comparing',
            calculation: 'Compare d² to radius²',
            result: 'Faster comparison'
          },
          {
            title: 'Step 3: Calculate Angle',
            formula: 'θ = atan2(y₂-y₁, x₂-x₁)',
            description: 'Angle from point 1 to point 2',
            calculation: 'Returns radians (-π to π)',
            result: 'Angle in radians'
          },
          {
            title: 'Step 4: Create Direction Vector',
            formula: 'dir = normalize(target - source)',
            description: 'Normalized vector pointing from source to target',
            calculation: 'Unit vector for direction',
            result: 'Direction vector'
          }
        ]
      },
      3: {
        explanation: 'Utility functions provide common operations needed throughout the engine.',
        steps: [
          {
            title: 'Step 1: Linear Interpolation',
            formula: 'lerp(a, b, t) = a + (b - a) × t',
            description: 'Blend between two values',
            calculation: 't=0 gives a, t=1 gives b',
            result: 'Interpolated value'
          },
          {
            title: 'Step 2: Clamp Value',
            formula: 'clamp(x, min, max) = min(max(x, min), max)',
            description: 'Constrain value to range',
            calculation: 'Ensures value stays within bounds',
            result: 'Clamped value'
          },
          {
            title: 'Step 3: Map Range',
            formula: 'map(x, inMin, inMax, outMin, outMax)',
            description: 'Linearly map value from one range to another',
            calculation: 'Linear transformation',
            result: 'Mapped value'
          },
          {
            title: 'Step 4: Random Number',
            formula: 'random(min, max) = min + rand() × (max - min)',
            description: 'Generate random number in range',
            calculation: 'Uniform distribution',
            result: 'Random value'
          }
        ]
      }
    },
    assetloader: {
      1: {
        explanation: 'AssetLoader provides centralized asset management with caching and progress tracking.',
        steps: [
          {
            title: 'Step 1: Create AssetLoader Instance',
            formula: 'const loader = new AssetLoader();',
            description: 'Initialize AssetLoader. Creates empty cache and progress tracker.',
            calculation: 'Creates Map for assets, Map for loading promises',
            result: 'AssetLoader instance ready'
          },
          {
            title: 'Step 2: Understand Cache Structure',
            formula: 'assets = Map<name, Image>',
            description: 'Assets stored in Map for O(1) lookup',
            calculation: 'Key: asset name, Value: loaded image',
            result: 'Empty cache ready'
          }
        ]
      },
      2: {
        explanation: 'Loading single image with Promise-based API and error handling.',
        steps: [
          {
            title: 'Step 1: Check Cache',
            formula: 'if (cache.has(name)) return cached',
            description: 'Check if asset already loaded',
            calculation: 'O(1) lookup in Map',
            result: 'Return cached or continue loading'
          },
          {
            title: 'Step 2: Create Image Object',
            formula: 'const img = new Image();',
            description: 'Create HTMLImageElement',
            calculation: 'Browser creates image object',
            result: 'Image object created'
          },
          {
            title: 'Step 3: Set Source and Load',
            formula: 'img.src = url',
            description: 'Start loading image',
            calculation: 'Browser downloads image asynchronously',
            result: 'Loading started'
          },
          {
            title: 'Step 4: Handle Load Complete',
            formula: 'img.onload = () => cache.set(name, img)',
            description: 'Store in cache when loaded',
            calculation: 'Add to Map, update progress',
            result: 'Image cached and ready'
          }
        ]
      },
      3: {
        explanation: 'Caching prevents duplicate loads and provides instant access to loaded assets.',
        steps: [
          {
            title: 'Step 1: Cache Lookup',
            formula: 'if (assets.has(name)) return assets.get(name)',
            description: 'Check if asset exists in cache',
            calculation: 'O(1) Map lookup',
            result: 'Cached asset or null'
          },
          {
            title: 'Step 2: Prevent Duplicate Loading',
            formula: 'if (loadingPromises.has(name)) return promise',
            description: 'Return existing Promise if already loading',
            calculation: 'Reuse Promise instead of creating new',
            result: 'No duplicate loads'
          },
          {
            title: 'Step 3: Memory Management',
            formula: 'cache.clear() or cache.delete(name)',
            description: 'Remove assets from cache',
            calculation: 'Free memory when not needed',
            result: 'Memory freed'
          }
        ]
      },
      4: {
        explanation: 'Batch loading loads multiple assets in parallel for faster loading.',
        steps: [
          {
            title: 'Step 1: Create Load Promises',
            formula: 'promises = entries.map(([name, src]) => loadImage(name, src))',
            description: 'Create Promise for each asset',
            calculation: 'All start loading simultaneously',
            result: 'Array of Promises'
          },
          {
            title: 'Step 2: Wait for All',
            formula: 'await Promise.all(promises)',
            description: 'Wait for all assets to load',
            calculation: 'Parallel execution, total time = max(load times)',
            result: 'All assets loaded'
          },
          {
            title: 'Step 3: Handle Errors',
            formula: 'try { await Promise.all(...) } catch { handle error }',
            description: 'If any fails, entire batch fails',
            calculation: 'Promise.all rejects on first failure',
            result: 'Error handled or all loaded'
          }
        ]
      },
      5: {
        explanation: 'Progress tracking shows loading status for user feedback.',
        steps: [
          {
            title: 'Step 1: Track Total',
            formula: 'total = number of assets to load',
            description: 'Count total assets',
            calculation: 'Increment on each loadImage() call',
            result: 'Total count'
          },
          {
            title: 'Step 2: Track Loaded',
            formula: 'loaded++ when image.onload fires',
            description: 'Increment when asset loads',
            calculation: 'Count successful loads',
            result: 'Loaded count'
          },
          {
            title: 'Step 3: Calculate Progress',
            formula: 'progress = loaded / total',
            description: 'Calculate completion ratio',
            calculation: 'Simple division, result 0 to 1',
            result: 'Progress percentage'
          },
          {
            title: 'Step 4: Get Status',
            formula: 'status = { total, loaded, failed, progress, isLoading }',
            description: 'Return complete status object',
            calculation: 'Combine all tracking data',
            result: 'Status information'
          }
        ]
      },
      6: {
        explanation: 'Complete AssetLoader workflow: load assets, track progress, use in renderer.',
        steps: [
          {
            title: 'Step 1: Initialize',
            formula: 'const loader = new AssetLoader()',
            description: 'Create loader instance',
            calculation: 'Empty cache and progress tracker',
            result: 'Loader ready'
          },
          {
            title: 'Step 2: Load Assets',
            formula: 'await loader.loadImages({ ... })',
            description: 'Load all required assets',
            calculation: 'Parallel loading, track progress',
            result: 'All assets cached'
          },
          {
            title: 'Step 3: Retrieve Assets',
            formula: 'const image = loader.get("name")',
            description: 'Get cached asset',
            calculation: 'O(1) Map lookup',
            result: 'Image ready to use'
          },
          {
            title: 'Step 4: Use in Renderer',
            formula: 'renderer.drawSprite(image, x, y, w, h)',
            description: 'Render cached image',
            calculation: 'No loading, instant access',
            result: 'Image rendered'
          }
        ]
      }
    },
    sprite: {
      1: {
        explanation: 'Sprite extends Entity with image rendering and animation capabilities.',
        steps: [
          {
            title: 'Step 1: Understand Inheritance',
            formula: 'class Sprite extends Entity',
            description: 'Sprite inherits Entity properties',
            calculation: 'Gets position, rotation, scale, hierarchy',
            result: 'Sprite has Entity features'
          },
          {
            title: 'Step 2: Add Image Property',
            formula: 'this.image = image',
            description: 'Store image reference',
            calculation: 'HTMLImageElement stored',
            result: 'Image ready for rendering'
          }
        ]
      },
      2: {
        explanation: 'Basic sprite renders image at Entity position with transforms applied.',
        steps: [
          {
            title: 'Step 1: Create Sprite',
            formula: 'const sprite = new Sprite(x, y, image)',
            description: 'Initialize with position and image',
            calculation: 'Sets position, stores image, sets dimensions',
            result: 'Sprite created'
          },
          {
            title: 'Step 2: Set Image',
            formula: 'sprite.setImage(image)',
            description: 'Set or change sprite image',
            calculation: 'Updates image, width, height',
            result: 'Image set'
          },
          {
            title: 'Step 3: Apply Transforms',
            formula: 'worldPos = getWorldPosition(), worldScale = getWorldScale()',
            description: 'Calculate world transforms',
            calculation: 'Includes parent transforms',
            result: 'World coordinates'
          },
          {
            title: 'Step 4: Render',
            formula: 'renderer.drawSprite(image, x, y, width, height)',
            description: 'Draw image at world position',
            calculation: 'Applies all transforms',
            result: 'Sprite rendered'
          }
        ]
      },
      3: {
        explanation: 'Sprite sheet stores multiple frames in one image. Calculate frame coordinates from index.',
        steps: [
          {
            title: 'Step 1: Set Sprite Sheet',
            formula: 'setSpriteSheet(image, frameWidth, frameHeight, columns)',
            description: 'Configure sprite sheet parameters',
            calculation: 'Store frame dimensions and grid layout',
            result: 'Sprite sheet configured'
          },
          {
            title: 'Step 2: Calculate Column',
            formula: 'column = frameIndex % columns',
            description: 'Get column position in grid',
            calculation: 'Modulo gives column (0 to columns-1)',
            result: 'Column index'
          },
          {
            title: 'Step 3: Calculate Row',
            formula: 'row = floor(frameIndex / columns)',
            description: 'Get row position in grid',
            calculation: 'Integer division gives row',
            result: 'Row index'
          },
          {
            title: 'Step 4: Calculate Source Coordinates',
            formula: 'sourceX = column × frameWidth\nsourceY = row × frameHeight',
            description: 'Get pixel coordinates in sprite sheet',
            calculation: 'Multiply grid position by frame size',
            result: 'Source rectangle coordinates'
          },
          {
            title: 'Step 5: Draw Frame',
            formula: 'drawImage(image, sourceX, sourceY, frameWidth, frameHeight, destX, destY, destW, destH)',
            description: 'Draw specific frame from sprite sheet',
            calculation: 'Extract frame and render',
            result: 'Frame rendered'
          }
        ]
      },
      4: {
        explanation: 'Animation advances frames based on elapsed time. Controls speed and looping.',
        steps: [
          {
            title: 'Step 1: Accumulate Time',
            formula: 'animationTime += deltaTime',
            description: 'Add frame time to animation timer',
            calculation: 'Continuous time accumulation',
            result: 'Updated animation time'
          },
          {
            title: 'Step 2: Check Speed Threshold',
            formula: 'if (animationTime >= speed)',
            description: 'Check if time to advance frame',
            calculation: 'Compare accumulated time to speed',
            result: 'Ready to advance or not'
          },
          {
            title: 'Step 3: Advance Frame',
            formula: 'currentFrame++',
            description: 'Move to next frame',
            calculation: 'Increment frame index',
            result: 'New frame index'
          },
          {
            title: 'Step 4: Handle Looping',
            formula: 'if (currentFrame >= frames.length) currentFrame = 0',
            description: 'Reset to first frame if looping',
            calculation: 'Wrap around for continuous animation',
            result: 'Frame reset or stopped'
          },
          {
            title: 'Step 5: Get Frame Index',
            formula: 'frameIndex = frames[currentFrame]',
            description: 'Get actual frame from sequence',
            calculation: 'Lookup in frames array',
            result: 'Frame index for sprite sheet'
          }
        ]
      },
      5: {
        explanation: 'Animation states allow switching between different animations based on game logic.',
        steps: [
          {
            title: 'Step 1: Store Animations',
            formula: 'animations[name] = { frames, speed, loop }',
            description: 'Store animation definition',
            calculation: 'Dictionary of animations',
            result: 'Animation stored'
          },
          {
            title: 'Step 2: Switch Animation',
            formula: 'playAnimation(name)',
            description: 'Change to new animation',
            calculation: 'Set currentAnimation, reset frame and time',
            result: 'Animation switched'
          },
          {
            title: 'Step 3: Game Logic Determines State',
            formula: 'if (moving) playAnimation("walk") else playAnimation("idle")',
            description: 'Game state determines animation',
            calculation: 'Conditional logic',
            result: 'Appropriate animation playing'
          }
        ]
      },
      6: {
        explanation: 'Complete sprite workflow: load asset, create sprite, configure animation, update and render.',
        steps: [
          {
            title: 'Step 1: Load Image',
            formula: 'await loader.loadImage("player", "/player.png")',
            description: 'Load sprite image using AssetLoader',
            calculation: 'Async loading, cached when complete',
            result: 'Image loaded and cached'
          },
          {
            title: 'Step 2: Create Sprite',
            formula: 'const sprite = new Sprite(x, y)',
            description: 'Create sprite entity',
            calculation: 'Initialize position and properties',
            result: 'Sprite created'
          },
          {
            title: 'Step 3: Set Image',
            formula: 'sprite.setImage(loader.get("player"))',
            description: 'Set sprite image from cache',
            calculation: 'O(1) cache lookup, set image',
            result: 'Image set'
          },
          {
            title: 'Step 4: Configure Sprite Sheet',
            formula: 'sprite.setSpriteSheet(image, 32, 32, 8)',
            description: 'Set up sprite sheet',
            calculation: 'Store frame dimensions and columns',
            result: 'Sprite sheet ready'
          },
          {
            title: 'Step 5: Add Animations',
            formula: 'sprite.addAnimation("walk", [0,1,2,3], 0.1, true)',
            description: 'Define animation sequences',
            calculation: 'Store in animations dictionary',
            result: 'Animations configured'
          },
          {
            title: 'Step 6: Play Animation',
            formula: 'sprite.playAnimation("walk")',
            description: 'Start animation',
            calculation: 'Set current animation, reset frame',
            result: 'Animation playing'
          },
          {
            title: 'Step 7: Update and Render',
            formula: 'sprite.update(deltaTime); sprite.onRender(renderer)',
            description: 'Advance animation and render',
            calculation: 'Update frame, render current frame',
            result: 'Animated sprite displayed'
          }
        ]
      }
    },
    effects: {
      1: {
        explanation: 'Effects enhance rendering with blend modes, filters, and post-processing.',
        steps: [
          {
            title: 'Step 1: Understand Effects',
            formula: 'Effects = Blend Modes + Filters + Post-Processing',
            description: 'Effects modify how pixels are drawn and combined',
            calculation: 'Three main categories of effects',
            result: 'Effects system ready'
          },
          {
            title: 'Step 2: Create Effects Instance',
            formula: 'const effects = new Effects(ctx)',
            description: 'Initialize Effects with canvas context',
            calculation: 'Stores context reference',
            result: 'Effects instance created'
          }
        ]
      },
      2: {
        explanation: 'Blend modes control how new colors combine with existing colors.',
        steps: [
          {
            title: 'Step 1: Set Blend Mode',
            formula: 'ctx.globalCompositeOperation = "multiply"',
            description: 'Set blend mode before drawing',
            calculation: 'Stored in canvas context',
            result: 'Blend mode set'
          },
          {
            title: 'Step 2: Draw with Blend Mode',
            formula: 'ctx.fillRect(x, y, w, h)',
            description: 'Draw shape. Colors combine using blend mode',
            calculation: 'Blend mode formula applied',
            result: 'Shape drawn with blending'
          },
          {
            title: 'Step 3: Reset Blend Mode',
            formula: 'ctx.globalCompositeOperation = "source-over"',
            description: 'Reset to normal blending',
            calculation: 'Prevents affecting other drawings',
            result: 'Blend mode reset'
          }
        ]
      },
      3: {
        explanation: 'Filters apply visual transformations like blur and shadows.',
        steps: [
          {
            title: 'Step 1: Apply Blur',
            formula: 'ctx.filter = "blur(5px)"',
            description: 'Set blur filter',
            calculation: 'Gaussian blur with 5px radius',
            result: 'Blur filter set'
          },
          {
            title: 'Step 2: Apply Shadow',
            formula: 'ctx.shadowOffsetX = 5\nctx.shadowOffsetY = 5\nctx.shadowBlur = 10',
            description: 'Set shadow properties',
            calculation: 'Offset and blur radius',
            result: 'Shadow configured'
          },
          {
            title: 'Step 3: Draw with Filters',
            formula: 'ctx.fillRect(x, y, w, h)',
            description: 'Draw shape. Filters applied automatically',
            calculation: 'Blur and shadow applied',
            result: 'Shape drawn with effects'
          },
          {
            title: 'Step 4: Reset Filters',
            formula: 'ctx.filter = "none"\nctx.shadowBlur = 0',
            description: 'Reset all filters',
            calculation: 'Prevents affecting other drawings',
            result: 'Filters reset'
          }
        ]
      },
      4: {
        explanation: 'Color adjustments transform RGB values for brightness, contrast, saturation, and hue.',
        steps: [
          {
            title: 'Step 1: Apply Brightness',
            formula: 'ctx.filter = "brightness(1.5)"',
            description: 'Multiply RGB by brightness value',
            calculation: 'result = color × 1.5',
            result: 'Brighter colors'
          },
          {
            title: 'Step 2: Apply Contrast',
            formula: 'ctx.filter = "contrast(1.5)"',
            description: 'Expand color range around midpoint',
            calculation: 'result = (color - 0.5) × 1.5 + 0.5',
            result: 'Higher contrast'
          },
          {
            title: 'Step 3: Apply Saturation',
            formula: 'ctx.filter = "saturate(2.0)"',
            description: 'Interpolate between grayscale and color',
            calculation: 'result = lerp(grayscale, color, 2.0)',
            result: 'More saturated colors'
          },
          {
            title: 'Step 4: Apply Hue Rotation',
            formula: 'ctx.filter = "hue-rotate(90deg)"',
            description: 'Rotate colors around color wheel',
            calculation: 'RGB → HSL → rotate H → RGB',
            result: 'Hue shifted'
          }
        ]
      },
      5: {
        explanation: 'Post-processing applies effects to entire rendered scene.',
        steps: [
          {
            title: 'Step 1: Create Offscreen Canvas',
            formula: 'const offscreen = createOffscreenCanvas(w, h)',
            description: 'Create temporary canvas',
            calculation: 'Same size as scene',
            result: 'Offscreen canvas created'
          },
          {
            title: 'Step 2: Render Scene to Offscreen',
            formula: 'offscreenCtx.drawScene()',
            description: 'Draw entire scene to offscreen',
            calculation: 'Normal rendering without effects',
            result: 'Scene rendered to offscreen'
          },
          {
            title: 'Step 3: Apply Effects',
            formula: 'ctx.filter = "blur(5px)"',
            description: 'Set effects to apply',
            calculation: 'Effects configured',
            result: 'Effects ready'
          },
          {
            title: 'Step 4: Draw Offscreen to Main',
            formula: 'ctx.drawImage(offscreen, 0, 0)',
            description: 'Draw offscreen canvas with effects',
            calculation: 'Effects applied to entire scene',
            result: 'Post-processed scene displayed'
          }
        ]
      },
      6: {
        explanation: 'Complete effects workflow: blend modes, filters, and post-processing.',
        steps: [
          {
            title: 'Step 1: Initialize Effects',
            formula: 'const effects = new Effects(ctx)',
            description: 'Create Effects instance',
            calculation: 'Stores context reference',
            result: 'Effects ready'
          },
          {
            title: 'Step 2: Apply Blend Mode',
            formula: 'effects.setBlendMode(BlendModes.MULTIPLY)',
            description: 'Set blend mode',
            calculation: 'Stored in context',
            result: 'Blend mode set'
          },
          {
            title: 'Step 3: Apply Filters',
            formula: 'effects.applyBlur(5)\neffects.applyDropShadow(5, 5, 10)',
            description: 'Apply multiple filters',
            calculation: 'Filters combined',
            result: 'Filters applied'
          },
          {
            title: 'Step 4: Draw with Effects',
            formula: 'ctx.fillRect(x, y, w, h)',
            description: 'Draw shape. All effects applied',
            calculation: 'Blend + filters applied',
            result: 'Shape drawn with effects'
          },
          {
            title: 'Step 5: Reset Effects',
            formula: 'effects.resetBlendMode()\neffects.resetFilters()',
            description: 'Reset all effects',
            calculation: 'Prevents affecting other drawings',
            result: 'Effects reset'
          }
        ]
      }
    },
    font: {
      1: {
        explanation: 'FontLoader module provides clean API for loading custom fonts. Uses FontFace API to load fonts programmatically and manages font state.',
        steps: [
          {
            title: 'Step 1: Create FontLoader Class',
            formula: 'class FontLoader { constructor() { this.loadedFonts = new Map(); } }',
            description: 'Create FontLoader class with Map to store loaded fonts',
            calculation: 'Map provides O(1) lookup for loaded fonts',
            result: 'FontLoader class created'
          },
          {
            title: 'Step 2: Implement loadFont Method',
            formula: 'async loadFont(name, url, options) { const fontFace = new FontFace(name, `url(${url})`); }',
            description: 'Create FontFace object with name and URL',
            calculation: 'FontFace constructor takes name and font source',
            result: 'FontFace object created'
          },
          {
            title: 'Step 3: Load Font',
            formula: 'await fontFace.load(); document.fonts.add(fontFace);',
            description: 'Load font and add to document.fonts',
            calculation: 'load() returns Promise, resolves when font loaded',
            result: 'Font loaded and available'
          },
          {
            title: 'Step 4: Cache Font',
            formula: 'this.loadedFonts.set(name, fontFace);',
            description: 'Store loaded font in Map for reuse',
            calculation: 'Prevents reloading same font',
            result: 'Font cached'
          },
          {
            title: 'Step 5: Check if Loaded',
            formula: 'if (this.loadedFonts.has(name)) return this.loadedFonts.get(name);',
            description: 'Return cached font if already loaded',
            calculation: 'Avoids duplicate loading',
            result: 'Font returned from cache'
          }
        ]
      },
      2: {
        explanation: 'Load multiple font variants (regular, bold, italic) for complete typography system. Each variant loaded separately with appropriate options.',
        steps: [
          {
            title: 'Step 1: Load Regular Weight',
            formula: 'await fontLoader.loadFont("FontRegular", url, { weight: "400" });',
            description: 'Load regular weight font (400)',
            calculation: 'Weight 400 is normal weight',
            result: 'Regular font loaded'
          },
          {
            title: 'Step 2: Load Bold Weight',
            formula: 'await fontLoader.loadFont("FontBold", url, { weight: "700" });',
            description: 'Load bold weight font (700)',
            calculation: 'Weight 700 is bold',
            result: 'Bold font loaded'
          },
          {
            title: 'Step 3: Load Italic Style',
            formula: 'await fontLoader.loadFont("FontItalic", url, { style: "italic" });',
            description: 'Load italic style font',
            calculation: 'Italic requires separate font file',
            result: 'Italic font loaded'
          },
          {
            title: 'Step 4: Load All Variants',
            formula: 'await Promise.all([loadRegular(), loadBold(), loadItalic()]);',
            description: 'Load all variants in parallel',
            calculation: 'Promise.all loads fonts concurrently',
            result: 'All variants loaded'
          }
        ]
      },
      3: {
        explanation: 'Implement fallback fonts for graceful degradation. If custom font fails to load, use system fonts.',
        steps: [
          {
            title: 'Step 1: Try Load Custom Font',
            formula: 'try { await fontLoader.loadFont("CustomFont", url); }',
            description: 'Attempt to load custom font',
            calculation: 'Font loading may fail',
            result: 'Font loading attempted'
          },
          {
            title: 'Step 2: Handle Errors',
            formula: 'catch (error) { console.warn("Using fallback"); }',
            description: 'Catch loading errors',
            calculation: 'Error indicates font unavailable',
            result: 'Error handled'
          },
          {
            title: 'Step 3: Use Fallback Chain',
            formula: 'ctx.font = "24px CustomFont, Arial, sans-serif";',
            description: 'Specify fallback fonts in font string',
            calculation: 'Browser tries fonts in order',
            result: 'Fallback chain set'
          },
          {
            title: 'Step 4: Check Font Availability',
            formula: 'if (fontLoader.isLoaded("CustomFont")) { useCustom(); } else { useFallback(); }',
            description: 'Check if font loaded before using',
            calculation: 'isLoaded() returns boolean',
            result: 'Font availability checked'
          }
        ]
      },
      4: {
        explanation: 'Track font loading progress for better UX. Show loading screen while fonts load.',
        steps: [
          {
            title: 'Step 1: Initialize Progress',
            formula: 'let loaded = 0; const total = fonts.length;',
            description: 'Track loaded count and total',
            calculation: 'Progress = loaded / total',
            result: 'Progress tracking initialized'
          },
          {
            title: 'Step 2: Show Loading Screen',
            formula: 'showLoadingScreen();',
            description: 'Display loading screen',
            calculation: 'User sees loading state',
            result: 'Loading screen shown'
          },
          {
            title: 'Step 3: Load Fonts with Progress',
            formula: 'fonts.map(async (font) => { await load(); loaded++; });',
            description: 'Load fonts and update progress',
            calculation: 'Increment loaded after each font',
            result: 'Progress updated'
          },
          {
            title: 'Step 4: Wait for All Fonts',
            formula: 'await Promise.all(promises);',
            description: 'Wait for all fonts to load',
            calculation: 'Promise.all waits for all promises',
            result: 'All fonts loaded'
          },
          {
            title: 'Step 5: Hide Loading Screen',
            formula: 'hideLoadingScreen();',
            description: 'Hide loading screen when done',
            calculation: 'All fonts loaded',
            result: 'Loading screen hidden'
          }
        ]
      },
      5: {
        explanation: 'Integrate font loading with renderer. Extend Renderer class with font-aware text drawing methods.',
        steps: [
          {
            title: 'Step 1: Build Font String',
            formula: 'const fontString = `${size}px ${font}, Arial, sans-serif`;',
            description: 'Build font string with size and fallbacks',
            calculation: 'Format: size + font-family',
            result: 'Font string created'
          },
          {
            title: 'Step 2: Set Font Properties',
            formula: 'ctx.font = fontString; ctx.fillStyle = color;',
            description: 'Set font and color',
            calculation: 'Font and color set on context',
            result: 'Font properties set'
          },
          {
            title: 'Step 3: Set Text Alignment',
            formula: 'ctx.textAlign = align; ctx.textBaseline = baseline;',
            description: 'Set text alignment and baseline',
            calculation: 'Controls text positioning',
            result: 'Text alignment set'
          },
          {
            title: 'Step 4: Draw Text',
            formula: 'ctx.fillText(text, x, y);',
            description: 'Draw text at position',
            calculation: 'Text rendered with custom font',
            result: 'Text drawn'
          },
          {
            title: 'Step 5: Measure Text',
            formula: 'const width = ctx.measureText(text).width;',
            description: 'Measure text width',
            calculation: 'measureText() returns TextMetrics',
            result: 'Text width measured'
          }
        ]
      },
      6: {
        explanation: 'Complete integration of font system with game engine. Load fonts at startup, use throughout game.',
        steps: [
          {
            title: 'Step 1: Define Font List',
            formula: 'const fonts = [{ name: "TitleFont", url: "...", weight: "700" }];',
            description: 'Define all game fonts',
            calculation: 'Organize fonts by purpose',
            result: 'Font list defined'
          },
          {
            title: 'Step 2: Initialize Fonts',
            formula: 'await initializeFonts();',
            description: 'Load all fonts before starting game',
            calculation: 'Fonts loaded in parallel',
            result: 'All fonts loaded'
          },
          {
            title: 'Step 3: Start Engine',
            formula: 'engine.start();',
            description: 'Start game engine after fonts loaded',
            calculation: 'Fonts available for rendering',
            result: 'Engine started'
          },
          {
            title: 'Step 4: Use Fonts in Render',
            formula: 'ctx.font = "24px UIFont"; ctx.fillText("Score", x, y);',
            description: 'Use custom fonts in render function',
            calculation: 'Fonts available from FontLoader',
            result: 'Text rendered with custom font'
          }
        ]
      }
    },
    tweening: {
      1: {
        explanation: 'Tween class provides property animation system. Uses interpolation to smoothly animate values from start to end over time with easing functions.',
        steps: [
          {
            title: 'Step 1: Create Tween Class',
            formula: 'class Tween { constructor(target, duration, options) }',
            description: 'Create Tween class with target object, duration, and options',
            calculation: 'Stores target reference and animation parameters',
            result: 'Tween class created'
          },
          {
            title: 'Step 2: Store Start Values',
            formula: 'this.startValues[prop] = target[prop]',
            description: 'Capture current property values when tween starts',
            calculation: 'Preserves starting state for interpolation',
            result: 'Start values stored'
          },
          {
            title: 'Step 3: Calculate Progress',
            formula: 't = Math.min(elapsed / duration, 1)',
            description: 'Calculate interpolation factor t from 0 to 1',
            calculation: 't = 0 at start, t = 1 at end',
            result: 'Progress calculated'
          },
          {
            title: 'Step 4: Apply Easing',
            formula: 't = easing(t)',
            description: 'Transform t with easing function',
            calculation: 'Easing modifies interpolation curve',
            result: 'Eased progress'
          },
          {
            title: 'Step 5: Interpolate Values',
            formula: 'value = start + (end - start) * t',
            description: 'Calculate current value using linear interpolation',
            calculation: 'Smoothly transitions from start to end',
            result: 'Property updated'
          }
        ]
      },
      2: {
        explanation: 'TweenManager centralizes tween lifecycle. Updates all active tweens, removes completed ones, provides helper methods.',
        steps: [
          {
            title: 'Step 1: Create Manager',
            formula: 'class TweenManager { constructor() { this.tweens = []; } }',
            description: 'Create manager with array to store tweens',
            calculation: 'Array tracks all active animations',
            result: 'Manager created'
          },
          {
            title: 'Step 2: Add Tween',
            formula: 'add(tween) { this.tweens.push(tween); }',
            description: 'Add tween to manager array',
            calculation: 'Tween registered for updates',
            result: 'Tween added'
          },
          {
            title: 'Step 3: Update All Tweens',
            formula: 'tweens.forEach(tween => tween.update(time))',
            description: 'Update each active tween',
            calculation: 'All animations progress simultaneously',
            result: 'Tweens updated'
          },
          {
            title: 'Step 4: Remove Completed',
            formula: 'if (tween.isComplete) tweens.splice(i, 1)',
            description: 'Remove completed tweens from array',
            calculation: 'Prevents memory leaks',
            result: 'Completed tweens removed'
          },
          {
            title: 'Step 5: Helper Methods',
            formula: 'to(target, duration, properties)',
            description: 'Create and start tween in one call',
            calculation: 'Convenient shortcut for common pattern',
            result: 'Tween created and started'
          }
        ]
      },
      3: {
        explanation: 'Integrate tweens with entities. Update manager in game loop, animate entity properties, use callbacks for chaining.',
        steps: [
          {
            title: 'Step 1: Create Entity',
            formula: 'const box = new Entity(100, 100)',
            description: 'Create entity to animate',
            calculation: 'Entity has x, y, and other properties',
            result: 'Entity created'
          },
          {
            title: 'Step 2: Update Manager',
            formula: 'tweenManager.update(deltaTime)',
            description: 'Call update in game loop',
            calculation: 'Updates all active tweens',
            result: 'Tweens updated'
          },
          {
            title: 'Step 3: Animate Properties',
            formula: 'tweenManager.to(box, 1000, { x: 400, y: 300 })',
            description: 'Animate entity properties',
            calculation: 'Smoothly moves box to new position',
            result: 'Animation started'
          },
          {
            title: 'Step 4: Use Callbacks',
            formula: 'onComplete: () => { /* next action */ }',
            description: 'Execute code when animation completes',
            calculation: 'Enables chaining and sequencing',
            result: 'Callback registered'
          }
        ]
      },
      4: {
        explanation: 'Chain tweens sequentially or run in parallel. Use repeat for loops, yoyo for back-and-forth motion.',
        steps: [
          {
            title: 'Step 1: Sequential Chain',
            formula: 'tween1.onComplete = () => tween2.start()',
            description: 'Start next tween when previous completes',
            calculation: 'Creates animation sequence',
            result: 'Tweens chained'
          },
          {
            title: 'Step 2: Parallel Animations',
            formula: 'tweenManager.to(obj1, 1000, { x: 400 })\ntweenManager.to(obj2, 1000, { y: 300 })',
            description: 'Start multiple tweens simultaneously',
            calculation: 'All tweens run concurrently',
            result: 'Parallel animations'
          },
          {
            title: 'Step 3: Use Delay',
            formula: 'tweenManager.to(obj, 1000, { x: 400 }, { delay: 500 })',
            description: 'Delay start of animation',
            calculation: 'Starts after delay milliseconds',
            result: 'Delayed animation'
          },
          {
            title: 'Step 4: Repeat',
            formula: 'repeat: 3',
            description: 'Repeat animation N times',
            calculation: 'Animation replays from start',
            result: 'Repeated animation'
          },
          {
            title: 'Step 5: Yoyo',
            formula: 'yoyo: true, repeat: -1',
            description: 'Reverse animation on repeat',
            calculation: 'Creates back-and-forth motion',
            result: 'Oscillating animation'
          }
        ]
      },
      5: {
        explanation: 'Easing functions create natural motion. Linear is constant, quadratic/cubic smooth, elastic springy, bounce bouncy.',
        steps: [
          {
            title: 'Step 1: Linear Easing',
            formula: 'Linear: t',
            description: 'Constant speed animation',
            calculation: 'No acceleration or deceleration',
            result: 'Linear motion'
          },
          {
            title: 'Step 2: Ease In',
            formula: 'EaseInQuad: t * t',
            description: 'Start slow, accelerate',
            calculation: 'Quadratic curve accelerates',
            result: 'Accelerating motion'
          },
          {
            title: 'Step 3: Ease Out',
            formula: 'EaseOutQuad: t * (2 - t)',
            description: 'Start fast, decelerate',
            calculation: 'Quadratic curve decelerates',
            result: 'Decelerating motion'
          },
          {
            title: 'Step 4: Ease In Out',
            formula: 'EaseInOutQuad: t < 0.5 ? 2*t*t : -1 + (4-2*t)*t',
            description: 'Slow start and end, fast middle',
            calculation: 'Combines ease in and out',
            result: 'Smooth motion'
          },
          {
            title: 'Step 5: Elastic & Bounce',
            formula: 'EaseOutElastic: sine wave\nEaseOutBounce: multiple curves',
            description: 'Spring-like or bouncy motion',
            calculation: 'Oscillates or bounces',
            result: 'Playful motion'
          }
        ]
      },
      6: {
        explanation: 'Complete integration: use tweens for all animations. Combine with input, entities, UI for polished game feel.',
        steps: [
          {
            title: 'Step 1: Initialize Manager',
            formula: 'const tweenManager = new TweenManager()',
            description: 'Create manager instance',
            calculation: 'Ready to manage animations',
            result: 'Manager initialized'
          },
          {
            title: 'Step 2: Update in Loop',
            formula: 'engine.onUpdate = (dt) => { tweenManager.update(dt) }',
            description: 'Update manager each frame',
            calculation: 'All tweens progress',
            result: 'Animations running'
          },
          {
            title: 'Step 3: Animate Entities',
            formula: 'tweenManager.to(player, 1000, { x: 400 })',
            description: 'Animate game entities',
            calculation: 'Smooth entity movement',
            result: 'Entities animated'
          },
          {
            title: 'Step 4: Respond to Input',
            formula: 'input.onClick(() => tweenManager.to(button, 200, { scale: 1.2 }))',
            description: 'Start tweens on user input',
            calculation: 'Interactive animations',
            result: 'Responsive animations'
          }
        ]
      }
    }
  };

  return steps[module] && steps[module][step] ? steps[module][step] : null;
};

