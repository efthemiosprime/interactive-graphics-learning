// Code snippets for 2D Engine Tutorial

export const getEngine2DCodeSnippet = (module, step) => {
  const snippets = {
    setup: {
      1: `// Step 1: Project Setup with Vite.js

// 1. Create new Vite project
// Run in terminal:
npm create vite@latest engine2d-tutorial -- --template vanilla
cd engine2d-tutorial
npm install

// 2. Project structure
engine2d-tutorial/
  ├── src/
  │   ├── engine2D/
  │   │   ├── Core.js
  │   │   ├── Renderer.js
  │   │   ├── Scene.js
  │   │   ├── Entity.js
  │   │   ├── Input.js
  │   │   ├── Utils.js
  │   │   ├── AssetLoader.js
  │   │   ├── Sprite.js
  │   │   └── Effects.js
  │   └── main.js
  ├── public/
  │   └── (assets folder)
  ├── index.html
  └── package.json

// 3. Update index.html
<!DOCTYPE html>
<html>
<head>
  <title>2D Engine Tutorial</title>
</head>
<body>
  <canvas id="gameCanvas"></canvas>
  <script type="module" src="/src/main.js"></script>
</body>
</html>

// 4. ES6 Module Example
// src/engine2D/Core.js
export class Engine2D {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }
}

// src/main.js
import { Engine2D } from './engine2D/Core.js';
const canvas = document.getElementById('gameCanvas');
const engine = new Engine2D(canvas);`,

      2: `// Step 2: Creating the Core Module
// File: src/engine2D/Core.js

export class Engine2D {
  constructor(canvas) {
    // Initialize canvas
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Set canvas resolution
    this.canvas.width = 800;
    this.canvas.height = 600;
    
    // Game state
    this.isRunning = false;
    this.lastTime = performance.now();
    this.fps = 0;
    this.frameCount = 0;
    this.fpsTime = 0;
    
    // Callbacks
    this.onUpdate = null;
    this.onRender = null;
  }
  
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop();
  }
  
  stop() {
    this.isRunning = false;
  }
  
  loop() {
    if (!this.isRunning) return;
    
    // Calculate delta time
    const now = performance.now();
    const deltaTime = (now - this.lastTime) / 1000; // Convert to seconds
    this.lastTime = now;
    
    // Update FPS
    this.frameCount++;
    this.fpsTime += deltaTime;
    if (this.fpsTime >= 1.0) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.fpsTime = 0;
    }
    
    // Update game state
    if (this.onUpdate) {
      this.onUpdate(deltaTime);
    }
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render
    if (this.onRender) {
      this.onRender(this.ctx);
    }
    
    // Continue loop
    requestAnimationFrame(() => this.loop());
  }
}

// Usage in main.js
import { Engine2D } from './engine2D/Core.js';

const canvas = document.getElementById('gameCanvas');
const engine = new Engine2D(canvas);

engine.onUpdate = (deltaTime) => {
  // Update game logic here
  console.log('Delta time:', deltaTime);
};

engine.onRender = (ctx) => {
  // Render graphics here
  ctx.fillStyle = '#4ade80';
  ctx.fillRect(100, 100, 50, 50);
};

engine.start();`,

      3: `// Step 3: Creating the Renderer Module
// File: src/engine2D/Renderer.js

export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }
  
  // Clear canvas
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
  
  // Draw rectangle
  fillRect(x, y, width, height, color = '#000000') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }
  
  // Draw circle
  fillCircle(x, y, radius, color = '#000000') {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  // Draw text
  drawText(text, x, y, color = '#000000', font = '16px Arial') {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y);
  }
  
  // Draw sprite/image
  drawSprite(image, x, y, width, height) {
    this.ctx.drawImage(image, x, y, width, height);
  }
  
  // Transform stack
  save() {
    this.ctx.save();
  }
  
  restore() {
    this.ctx.restore();
  }
  
  // Set transform
  setTransform(x, y, rotation, scaleX = 1, scaleY = 1) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.scale(scaleX, scaleY);
  }
  
  // Reset transform
  resetTransform() {
    this.ctx.restore();
  }
}

// Usage
import { Renderer } from './engine2D/Renderer.js';

const renderer = new Renderer(ctx);

// Draw shapes
renderer.fillRect(100, 100, 50, 50, '#ef4444');
renderer.fillCircle(200, 200, 30, '#3b82f6');

// Transform example
renderer.save();
renderer.setTransform(150, 150, Math.PI / 4, 2, 2);
renderer.fillRect(0, 0, 25, 25, '#4ade80');
renderer.restore();`,

      4: `// Step 4: Creating the Scene Module
// File: src/engine2D/Scene.js

export class Scene {
  constructor() {
    this.entities = [];
  }
  
  // Add entity
  add(entity) {
    this.entities.push(entity);
    entity.scene = this;
  }
  
  // Remove entity
  remove(entity) {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
      entity.scene = null;
    }
  }
  
  // Update all entities
  update(deltaTime) {
    for (const entity of this.entities) {
      if (entity.update) {
        entity.update(deltaTime);
      }
    }
  }
  
  // Render all entities
  render(renderer) {
    for (const entity of this.entities) {
      if (entity.onRender) {
        entity.onRender(renderer);
      }
    }
  }
  
  // Find by position
  findByPosition(x, y) {
    return this.entities.filter(entity => 
      entity.x === x && entity.y === y
    );
  }
  
  // Find by type
  findByType(type) {
    return this.entities.filter(entity => 
      entity.constructor.name === type
    );
  }
  
  // Clear all entities
  clear() {
    this.entities = [];
  }
}

// Usage
import { Scene } from './engine2D/Scene.js';
import { Renderer } from './engine2D/Renderer.js';

const scene = new Scene();
const renderer = new Renderer(ctx);

// Add entities
const entity1 = { x: 100, y: 100, onRender: (r) => r.fillRect(100, 100, 50, 50) };
const entity2 = { x: 200, y: 200, onRender: (r) => r.fillCircle(200, 200, 25) };

scene.add(entity1);
scene.add(entity2);

// Update and render
scene.update(deltaTime);
scene.render(renderer);`,

      5: `// Step 5: Creating the Entity Module
// File: src/engine2D/Entity.js

export class Entity {
  constructor(x = 0, y = 0) {
    // Transform properties
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    
    // Hierarchy
    this.parent = null;
    this.children = [];
    this.scene = null;
  }
  
  // Add child
  addChild(child) {
    if (child.parent) {
      child.parent.removeChild(child);
    }
    this.children.push(child);
    child.parent = this;
  }
  
  // Remove child
  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
      child.parent = null;
    }
  }
  
  // Get world position
  getWorldX() {
    if (this.parent) {
      const parentWorldX = this.parent.getWorldX();
      const cos = Math.cos(this.parent.rotation);
      const sin = Math.sin(this.parent.rotation);
      return parentWorldX + this.x * cos - this.y * sin;
    }
    return this.x;
  }
  
  getWorldY() {
    if (this.parent) {
      const parentWorldY = this.parent.getWorldY();
      const cos = Math.cos(this.parent.rotation);
      const sin = Math.sin(this.parent.rotation);
      return parentWorldY + this.x * sin + this.y * cos;
    }
    return this.y;
  }
  
  // Get world rotation
  getWorldRotation() {
    if (this.parent) {
      return this.parent.getWorldRotation() + this.rotation;
    }
    return this.rotation;
  }
  
  // Get world scale
  getWorldScaleX() {
    if (this.parent) {
      return this.parent.getWorldScaleX() * this.scaleX;
    }
    return this.scaleX;
  }
  
  getWorldScaleY() {
    if (this.parent) {
      return this.parent.getWorldScaleY() * this.scaleY;
    }
    return this.scaleY;
  }
}

// Usage
import { Entity } from './engine2D/Entity.js';

const parent = new Entity(100, 100);
const child = new Entity(50, 50);

parent.addChild(child);

// Child's world position = parent position + child local position
console.log('World X:', child.getWorldX()); // 150
console.log('World Y:', child.getWorldY()); // 150`,

      6: `// Step 6: Creating the Input Module
// File: src/engine2D/Input.js

export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    
    // Mouse state
    this.mouseX = -1;
    this.mouseY = -1;
    this.mouseDown = false;
    this.mousePressed = false;
    this.mouseReleased = false;
    
    // Previous frame state
    this.prevMouseDown = false;
    
    // Setup event listeners
    this.setupListeners();
  }
  
  setupListeners() {
    // Mouse move
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = (e.clientX - rect.left) * (this.canvas.width / rect.width);
      this.mouseY = (e.clientY - rect.top) * (this.canvas.height / rect.height);
    });
    
    // Mouse down
    this.canvas.addEventListener('mousedown', (e) => {
      this.mouseDown = true;
    });
    
    // Mouse up
    this.canvas.addEventListener('mouseup', (e) => {
      this.mouseDown = false;
    });
    
    // Mouse leave
    this.canvas.addEventListener('mouseleave', (e) => {
      this.mouseDown = false;
      this.mouseX = -1;
      this.mouseY = -1;
    });
  }
  
  // Update input state (call each frame)
  update() {
    // Detect press/release
    this.mousePressed = this.mouseDown && !this.prevMouseDown;
    this.mouseReleased = !this.mouseDown && this.prevMouseDown;
    
    // Update previous state
    this.prevMouseDown = this.mouseDown;
  }
  
  // Convert screen to canvas coordinates
  screenToCanvas(screenX, screenY) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (screenX - rect.left) * (this.canvas.width / rect.width),
      y: (screenY - rect.top) * (this.canvas.height / rect.height)
    };
  }
  
  // Hit test
  hitTest(x, y, entity) {
    return x >= entity.x && 
           x <= entity.x + (entity.width || 0) &&
           y >= entity.y && 
           y <= entity.y + (entity.height || 0);
  }
}

// Usage
import { Input } from './engine2D/Input.js';

const input = new Input(canvas);

// In game loop
input.update();

if (input.mousePressed) {
  console.log('Mouse clicked at:', input.mouseX, input.mouseY);
}`,

      7: `// Step 7: Creating the Utils Module
// File: src/engine2D/Utils.js

// Vector class
export class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  add(other) {
    return new Vec2(this.x + other.x, this.y + other.y);
  }
  
  subtract(other) {
    return new Vec2(this.x - other.x, this.y - other.y);
  }
  
  multiply(scalar) {
    return new Vec2(this.x * scalar, this.y * scalar);
  }
  
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  
  normalize() {
    const len = this.length();
    if (len === 0) return new Vec2(0, 0);
    return new Vec2(this.x / len, this.y / len);
  }
  
  distance(other) {
    return this.subtract(other).length();
  }
}

// Distance between two points
export function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// Angle between two points
export function angle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

// Linear interpolation
export function lerp(start, end, t) {
  return start + (end - start) * t;
}

// Clamp value
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Map value from one range to another
export function map(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Usage
import { Vec2, distance, lerp, clamp } from './engine2D/Utils.js';

// Vector operations
const v1 = new Vec2(10, 20);
const v2 = new Vec2(5, 10);
const sum = v1.add(v2); // Vec2(15, 30)

// Distance
const dist = distance(0, 0, 3, 4); // 5

// Interpolation
const value = lerp(0, 100, 0.5); // 50

// Clamp
const clamped = clamp(150, 0, 100); // 100`,

      8: `// Step 8: Creating the AssetLoader Module
// File: src/engine2D/AssetLoader.js

export class AssetLoader {
  constructor() {
    this.cache = new Map();
    this.loading = new Map();
  }
  
  // Load single image
  async loadImage(key, src) {
    // Return cached if exists
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    // Return existing promise if loading
    if (this.loading.has(key)) {
      return this.loading.get(key);
    }
    
    // Create new promise
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        this.cache.set(key, img);
        this.loading.delete(key);
        resolve(img);
      };
      
      img.onerror = () => {
        this.loading.delete(key);
        reject(new Error(\`Failed to load image: \${src}\`));
      };
      
      img.src = src;
    });
    
    this.loading.set(key, promise);
    return promise;
  }
  
  // Load multiple images
  async loadImages(assets) {
    const promises = Object.entries(assets).map(([key, src]) => 
      this.loadImage(key, src)
    );
    return Promise.all(promises);
  }
  
  // Get cached asset
  get(key) {
    return this.cache.get(key);
  }
  
  // Check if asset exists
  has(key) {
    return this.cache.has(key);
  }
  
  // Clear cache
  clear() {
    this.cache.clear();
  }
}

// Usage
import { AssetLoader } from './engine2D/AssetLoader.js';

const loader = new AssetLoader();

// Load single image
try {
  const image = await loader.loadImage('player', '/sprites/player.png');
  console.log('Loaded:', image.width, 'x', image.height);
} catch (error) {
  console.error('Error:', error);
}

// Load multiple images
await loader.loadImages({
  player: '/sprites/player.png',
  enemy: '/sprites/enemy.png',
  background: '/sprites/background.png'
});

// Use cached image
const playerImage = loader.get('player');`,

      9: `// Step 9: Creating the Sprite Module
// File: src/engine2D/Sprite.js
import { Entity } from './Entity.js';

export class Sprite extends Entity {
  constructor(x = 0, y = 0, image = null) {
    super(x, y);
    this.image = image;
    this.spriteSheet = null;
    this.frameWidth = 0;
    this.frameHeight = 0;
    this.columns = 0;
    this.currentFrame = 0;
    this.animations = {};
    this.currentAnimation = null;
    this.animationTime = 0;
  }
  
  // Set image
  setImage(image) {
    this.image = image;
  }
  
  // Set sprite sheet
  setSpriteSheet(image, frameWidth, frameHeight, columns) {
    this.spriteSheet = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.columns = columns;
  }
  
  // Add animation
  addAnimation(name, frames, speed, loop = true) {
    this.animations[name] = {
      frames,
      speed,
      loop
    };
  }
  
  // Play animation
  playAnimation(name) {
    if (this.animations[name]) {
      this.currentAnimation = name;
      this.currentFrame = 0;
      this.animationTime = 0;
    }
  }
  
  // Update animation
  update(deltaTime) {
    if (!this.currentAnimation) return;
    
    const anim = this.animations[this.currentAnimation];
    this.animationTime += deltaTime;
    
    if (this.animationTime >= anim.speed) {
      this.currentFrame++;
      this.animationTime = 0;
      
      if (this.currentFrame >= anim.frames.length) {
        if (anim.loop) {
          this.currentFrame = 0;
        } else {
          this.currentFrame = anim.frames.length - 1;
        }
      }
    }
  }
  
  // Render
  onRender(renderer) {
    if (!this.image && !this.spriteSheet) return;
    
    const ctx = renderer.ctx;
    const worldX = this.getWorldX();
    const worldY = this.getWorldY();
    const worldRotation = this.getWorldRotation();
    const worldScaleX = this.getWorldScaleX();
    const worldScaleY = this.getWorldScaleY();
    
    ctx.save();
    ctx.translate(worldX, worldY);
    ctx.rotate(worldRotation);
    ctx.scale(worldScaleX, worldScaleY);
    
    if (this.spriteSheet) {
      const anim = this.animations[this.currentAnimation];
      const frameIndex = anim ? anim.frames[this.currentFrame] : this.currentFrame;
      const col = frameIndex % this.columns;
      const row = Math.floor(frameIndex / this.columns);
      const sx = col * this.frameWidth;
      const sy = row * this.frameHeight;
      
      ctx.drawImage(
        this.spriteSheet,
        sx, sy, this.frameWidth, this.frameHeight,
        -this.frameWidth / 2, -this.frameHeight / 2,
        this.frameWidth, this.frameHeight
      );
    } else if (this.image) {
      ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
    }
    
    ctx.restore();
  }
}

// Usage
import { Sprite } from './engine2D/Sprite.js';
import { AssetLoader } from './engine2D/AssetLoader.js';

const loader = new AssetLoader();
await loader.loadImage('playerSheet', '/sprites/player-sheet.png');

const sprite = new Sprite(100, 100);
sprite.setSpriteSheet(loader.get('playerSheet'), 32, 32, 8);
sprite.addAnimation('walk', [0, 1, 2, 3], 0.1, true);
sprite.playAnimation('walk');

// In update loop
sprite.update(deltaTime);`,

      10: `// Step 10: Creating the Effects Module
// File: src/engine2D/Effects.js

export const BlendModes = {
  SOURCE_OVER: 'source-over',
  MULTIPLY: 'multiply',
  SCREEN: 'screen',
  OVERLAY: 'overlay',
  // ... more modes
};

export class Effects {
  constructor(ctx) {
    this.ctx = ctx;
    this.currentFilter = 'none';
  }
  
  // Set blend mode
  setBlendMode(mode) {
    this.ctx.globalCompositeOperation = mode;
  }
  
  // Reset blend mode
  resetBlendMode() {
    this.ctx.globalCompositeOperation = BlendModes.SOURCE_OVER;
  }
  
  // Apply blur
  applyBlur(radius) {
    this.currentFilter = \`blur(\${radius}px)\`;
    this.ctx.filter = this.currentFilter;
  }
  
  // Apply drop shadow
  applyDropShadow(offsetX, offsetY, blur, color) {
    this.ctx.shadowOffsetX = offsetX;
    this.ctx.shadowOffsetY = offsetY;
    this.ctx.shadowBlur = blur;
    this.ctx.shadowColor = color;
  }
  
  // Apply glow
  applyGlow(blur, color) {
    this.applyDropShadow(0, 0, blur, color);
  }
  
  // Apply color adjustments
  applyColorAdjustment(options = {}) {
    const {
      brightness = 1,
      contrast = 1,
      saturate = 1,
      hueRotate = 0
    } = options;
    
    let filterString = '';
    if (brightness !== 1) filterString += \`brightness(\${brightness}) \`;
    if (contrast !== 1) filterString += \`contrast(\${contrast}) \`;
    if (saturate !== 1) filterString += \`saturate(\${saturate}) \`;
    if (hueRotate !== 0) filterString += \`hue-rotate(\${hueRotate}deg) \`;
    
    this.currentFilter = filterString.trim();
    this.ctx.filter = this.currentFilter;
  }
  
  // Reset all filters
  resetFilters() {
    this.ctx.filter = 'none';
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = 'transparent';
    this.currentFilter = 'none';
  }
  
  // Post-processing
  applyPostProcess(sourceCanvas, filterString) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = sourceCanvas.width;
    tempCanvas.height = sourceCanvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCtx.drawImage(sourceCanvas, 0, 0);
    
    this.ctx.filter = filterString;
    this.ctx.drawImage(tempCanvas, 0, 0);
    this.ctx.filter = 'none';
  }
}

// Usage
import { Effects, BlendModes } from './engine2D/Effects.js';

const effects = new Effects(ctx);

// Blend mode
effects.setBlendMode(BlendModes.MULTIPLY);
ctx.fillRect(100, 100, 50, 50);
effects.resetBlendMode();

// Filters
effects.applyBlur(5);
ctx.fillRect(200, 200, 50, 50);
effects.resetFilters();

// Color adjustment
effects.applyColorAdjustment({
  brightness: 1.2,
  contrast: 1.1,
  saturation: 1.5
});
ctx.fillRect(300, 300, 50, 50);
effects.resetFilters();`
    },
    core: {
      1: `// Step 1: Canvas Initialization
// HTML: <canvas id="gameCanvas"></canvas>

// Get canvas element
const canvas = document.getElementById('gameCanvas');
if (!canvas) {
  throw new Error('Canvas element not found');
}

// Get 2D rendering context
const ctx = canvas.getContext('2d');
if (!ctx) {
  throw new Error('2D context not supported');
}

// Set canvas resolution (internal pixel size)
canvas.width = 800;
canvas.height = 600;

// Optional: Set CSS size for display
canvas.style.width = '800px';
canvas.style.height = '600px';

console.log('Canvas initialized:', canvas.width, 'x', canvas.height);`,
      2: `// Step 2: Main Game Loop
class Engine2D {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 800;
    this.canvas.height = 600;
    
    this.isRunning = false;
    this.lastFrameTime = 0;
    this.deltaTime = 0;
    
    // Bind loop method
    this.loop = this.loop.bind(this);
  }
  
  start() {
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.loop();
  }
  
  stop() {
    this.isRunning = false;
  }
  
  loop(currentTime) {
    if (!this.isRunning) return;
    
    // Calculate delta time (seconds)
    this.deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;
    
    // Clamp delta time
    this.deltaTime = Math.min(this.deltaTime, 0.1);
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update game logic
    this.update(this.deltaTime);
    
    // Render graphics
    this.render(this.ctx);
    
    // Continue loop
    requestAnimationFrame(this.loop);
  }
  
  update(deltaTime) {
    // Override in subclass
  }
  
  render(ctx) {
    // Override in subclass
  }
}

// Usage
const engine = new Engine2D('gameCanvas');
engine.start();`,
      3: `// Step 3: Frame Timing and FPS
class Engine2D {
  constructor(canvasId) {
    // ... previous code ...
    this.fps = 0;
    this.frameCount = 0;
    this.fpsUpdateTime = 0;
  }
  
  loop(currentTime) {
    if (!this.isRunning) return;
    
    this.deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;
    this.deltaTime = Math.min(this.deltaTime, 0.1);
    
    // Update FPS counter
    this.updateFPS(currentTime);
    
    // Clear and render
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update(this.deltaTime);
    this.render(this.ctx);
    
    requestAnimationFrame(this.loop);
  }
  
  updateFPS(currentTime) {
    this.frameCount++;
    
    // Update FPS every second
    if (currentTime - this.fpsUpdateTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.fpsUpdateTime = currentTime;
      
      // Optional: Display FPS
      console.log('FPS:', this.fps);
    }
  }
  
  getFPS() {
    return this.fps;
  }
  
  getDeltaTime() {
    return this.deltaTime;
  }
}`,
      4: `// Step 4: Complete Core Module
// See: src/engine2D/Core.js for full implementation

import { Engine2D } from './engine2D/Core.js';

const engine = new Engine2D('gameCanvas', {
  width: 800,
  height: 600
});

engine.onUpdate((deltaTime) => {
  // Game logic here
  console.log('Delta time:', deltaTime);
});

engine.onRender((ctx) => {
  // Rendering here
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(100, 100, 50, 50);
});

engine.start();`
    },
    renderer: {
      1: `// Step 1: Basic Shape Drawing
class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }
  
  // Draw filled rectangle
  fillRect(x, y, width, height, color = '#ffffff') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }
  
  // Draw stroked rectangle
  strokeRect(x, y, width, height, color = '#ffffff', lineWidth = 1) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeRect(x, y, width, height);
  }
  
  // Draw filled circle
  fillCircle(x, y, radius, color = '#ffffff') {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  // Draw stroked circle
  strokeCircle(x, y, radius, color = '#ffffff', lineWidth = 1) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }
  
  // Draw line
  drawLine(x1, y1, x2, y2, color = '#ffffff', lineWidth = 1) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
}

// Usage
const renderer = new Renderer(ctx);
renderer.fillRect(100, 100, 150, 100, '#4ade80');
renderer.fillCircle(300, 200, 50, '#60a5fa');`,
      2: `// Step 2: Transformations
class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.transformStack = [];
  }
  
  // Save current transform state
  save() {
    this.ctx.save();
  }
  
  // Restore previous transform state
  restore() {
    this.ctx.restore();
  }
  
  // Set transform (translation, rotation, scale)
  setTransform(x, y, rotation = 0, scaleX = 1, scaleY = 1) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.scale(scaleX, scaleY);
  }
  
  // Reset transform
  resetTransform() {
    this.ctx.restore();
  }
  
  // Draw with transform
  drawTransformed(callback) {
    this.ctx.save();
    callback();
    this.ctx.restore();
  }
}

// Usage
renderer.setTransform(400, 300, Math.PI / 4, 2, 2);
renderer.fillRect(-25, -25, 50, 50, '#a78bfa');
renderer.resetTransform();`,
      3: `// Step 3: Text and Sprites
class Renderer {
  // ... previous methods ...
  
  // Draw text
  drawText(text, x, y, options = {}) {
    const {
      font = '16px sans-serif',
      color = '#ffffff',
      align = 'left',
      baseline = 'top'
    } = options;
    
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;
    this.ctx.fillText(text, x, y);
  }
  
  // Draw sprite/image
  drawSprite(image, x, y, width, height) {
    if (!image) return;
    this.ctx.drawImage(image, x, y, width, height);
  }
  
  // Draw from sprite sheet
  drawSpriteSheet(image, x, y, width, height, 
                  sourceX, sourceY, sourceWidth, sourceHeight) {
    this.ctx.drawImage(
      image,
      sourceX, sourceY, sourceWidth, sourceHeight,
      x, y, width, height
    );
  }
}

// Load and draw image
const image = new Image();
image.onload = () => {
  renderer.drawSprite(image, 100, 100, 200, 150);
};
image.src = 'sprite.png';

// Draw text
renderer.drawText('Hello Engine!', 400, 300, {
  font: '32px Arial',
  color: '#fbbf24',
  align: 'center'
});`
    },
    scene: {
      1: `// Step 1: Entity Management
class Scene {
  constructor() {
    this.entities = [];
  }
  
  // Add entity to scene
  add(entity) {
    if (this.entities.indexOf(entity) === -1) {
      this.entities.push(entity);
    }
    return entity;
  }
  
  // Remove entity from scene
  remove(entity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
    return entity;
  }
  
  // Clear all entities
  clear() {
    this.entities = [];
  }
  
  // Update all entities
  update(deltaTime) {
    for (const entity of this.entities) {
      entity.update(deltaTime);
    }
  }
  
  // Render all entities
  render(renderer) {
    for (const entity of this.entities) {
      entity.render(renderer);
    }
  }
}

// Usage
const scene = new Scene();
scene.add(new Entity(100, 100));
scene.add(new Entity(200, 200));`,
      2: `// Step 2: Entity Hierarchy
class Scene {
  // ... previous methods ...
  
  update(deltaTime) {
    // Update root entities (those without parents)
    for (const entity of this.entities) {
      if (!entity.parent) {
        entity.update(deltaTime);
      }
    }
  }
  
  render(renderer) {
    // Render root entities (those without parents)
    for (const entity of this.entities) {
      if (!entity.parent) {
        entity.render(renderer);
      }
    }
  }
}

// Entity with hierarchy support
class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.parent = null;
    this.children = [];
  }
  
  addChild(entity) {
    if (entity.parent) {
      entity.parent.removeChild(entity);
    }
    entity.parent = this;
    this.children.push(entity);
    return entity;
  }
  
  removeChild(entity) {
    const index = this.children.indexOf(entity);
    if (index !== -1) {
      this.children.splice(index, 1);
      entity.parent = null;
    }
  }
}

// Usage
const parent = new Entity(400, 300);
const child1 = new Entity(50, 0);
const child2 = new Entity(-50, 0);
parent.addChild(child1);
parent.addChild(child2);
scene.add(parent);`,
      3: `// Step 3: Entity Queries
class Scene {
  // ... previous methods ...
  
  // Find entities by type
  findByType(type) {
    return this.entities.filter(entity => entity instanceof type);
  }
  
  // Find entities at position
  findByPosition(x, y, radius = 0) {
    return this.entities.filter(entity => {
      const pos = entity.getWorldPosition();
      const dx = pos.x - x;
      const dy = pos.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= radius;
    });
  }
  
  // Get all entities
  getAll() {
    return [...this.entities];
  }
}

// Usage
// Find all enemies
const enemies = scene.findByType(Enemy);

// Find entities near point
const nearby = scene.findByPosition(400, 300, 100);

// Get all entities
const all = scene.getAll();`
    },
    entity: {
      1: `// Step 1: Transform Properties
class Entity {
  constructor(x = 0, y = 0) {
    // Position
    this.x = x;
    this.y = y;
    
    // Rotation (radians)
    this.rotation = 0;
    
    // Scale
    this.scaleX = 1;
    this.scaleY = 1;
  }
  
  // Set position
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  
  // Set rotation (degrees, converted to radians)
  setRotation(degrees) {
    this.rotation = degrees * Math.PI / 180;
  }
  
  // Set scale
  setScale(x, y = x) {
    this.scaleX = x;
    this.scaleY = y;
  }
}

// Usage
const entity = new Entity(100, 200);
entity.setRotation(45); // 45 degrees
entity.setScale(2, 1); // Double width, normal height`,
      2: `// Step 2: World Transform Calculation
class Entity {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.parent = null;
  }
  
  // Get world position
  getWorldPosition() {
    if (this.parent) {
      const parentWorld = this.parent.getWorldPosition();
      const parentRotation = this.parent.getWorldRotation();
      const parentScale = this.parent.getWorldScale();
      
      // Transform local position
      const cos = Math.cos(parentRotation);
      const sin = Math.sin(parentRotation);
      
      const worldX = parentWorld.x + 
        (this.x * parentScale.x * cos - this.y * parentScale.y * sin);
      const worldY = parentWorld.y + 
        (this.x * parentScale.x * sin + this.y * parentScale.y * cos);
      
      return { x: worldX, y: worldY };
    }
    return { x: this.x, y: this.y };
  }
  
  // Get world rotation
  getWorldRotation() {
    if (this.parent) {
      return this.parent.getWorldRotation() + this.rotation;
    }
    return this.rotation;
  }
  
  // Get world scale
  getWorldScale() {
    if (this.parent) {
      const parentScale = this.parent.getWorldScale();
      return {
        x: parentScale.x * this.scaleX,
        y: parentScale.y * this.scaleY
      };
    }
    return { x: this.scaleX, y: this.scaleY };
  }
}`,
      3: `// Step 3: Update and Render Lifecycle
class Entity {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.visible = true;
    this.active = true;
    this.children = [];
  }
  
  // Update entity
  update(deltaTime) {
    if (!this.active) return;
    
    // Update children
    for (const child of this.children) {
      child.update(deltaTime);
    }
  }
  
  // Render entity
  render(renderer) {
    if (!this.visible) return;
    
    // Save renderer state
    renderer.save();
    
    // Apply transform
    const worldPos = this.getWorldPosition();
    const worldRot = this.getWorldRotation();
    const worldScale = this.getWorldScale();
    
    renderer.setTransform(
      worldPos.x,
      worldPos.y,
      worldRot,
      worldScale.x,
      worldScale.y
    );
    
    // Render this entity
    this.onRender(renderer);
    
    // Render children
    for (const child of this.children) {
      child.render(renderer);
    }
    
    // Restore renderer state
    renderer.restore();
  }
  
  // Override for custom rendering
  onRender(renderer) {
    renderer.fillRect(-10, -10, 20, 20, '#ffffff');
  }
}

// Usage in game loop
scene.update(deltaTime);
scene.render(renderer);`
    },
    input: {
      1: `// Step 1: Mouse Position Tracking
class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouseX = 0;
    this.mouseY = 0;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Track mouse position
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
  }
  
  getMousePosition() {
    return { x: this.mouseX, y: this.mouseY };
  }
}

// Usage
const input = new Input(canvas);
const mousePos = input.getMousePosition();
console.log('Mouse:', mousePos.x, mousePos.y);`,
      2: `// Step 2: Click Detection
class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.mousePressed = false;
    this.lastMouseDown = false;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // ... mouse move code ...
    
    this.canvas.addEventListener('mousedown', (e) => {
      this.mouseDown = true;
      this.mousePressed = true;
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
    
    this.canvas.addEventListener('mouseup', () => {
      this.mouseDown = false;
    });
  }
  
  update() {
    this.mousePressed = false;
  }
  
  // Check if mouse is over entity
  isMouseOver(entity) {
    const pos = entity.getWorldPosition();
    const scale = entity.getWorldScale();
    const halfWidth = 10 * scale.x;
    const halfHeight = 10 * scale.y;
    
    return (
      this.mouseX >= pos.x - halfWidth &&
      this.mouseX <= pos.x + halfWidth &&
      this.mouseY >= pos.y - halfHeight &&
      this.mouseY <= pos.y + halfHeight
    );
  }
}

// Usage in game loop
input.update();
if (input.mousePressed) {
  // Check which entity was clicked
  for (const entity of scene.getAll()) {
    if (input.isMouseOver(entity)) {
      entity.onClick(input.mouseX, input.mouseY);
    }
  }
}`,
      3: `// Step 3: Touch Support
class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouseX = 0;
    this.mouseY = 0;
    this.touches = [];
    this.touchDown = false;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // ... mouse events ...
    
    // Touch events
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.touchDown = true;
      this.updateTouches(e.touches);
    });
    
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.updateTouches(e.touches);
    });
    
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.touchDown = false;
      this.updateTouches(e.touches);
    });
  }
  
  updateTouches(touchList) {
    this.touches = [];
    const rect = this.canvas.getBoundingClientRect();
    
    for (let i = 0; i < touchList.length; i++) {
      const touch = touchList[i];
      this.touches.push({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
        id: touch.identifier
      });
    }
    
    // Update mouse position from first touch
    if (this.touches.length > 0) {
      this.mouseX = this.touches[0].x;
      this.mouseY = this.touches[0].y;
    }
  }
  
  getTouches() {
    return [...this.touches];
  }
}`,
      4: `// Step 4: Complete Input Module
// See: src/engine2D/Input.js for full implementation

import { Input } from './engine2D/Input.js';

const input = new Input(canvas);

// In game loop
input.update();

// Check for clicks
if (input.mousePressed) {
  const entities = scene.findByPosition(
    input.mouseX, 
    input.mouseY, 
    50
  );
  
  entities.forEach(entity => {
    if (entity.onClick) {
      entity.onClick(input.mouseX, input.mouseY);
    }
  });
}`
    },
    utils: {
      1: `// Step 1: Vector Math
class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  // Add another vector
  add(other) {
    return new Vec2(this.x + other.x, this.y + other.y);
  }
  
  // Subtract another vector
  subtract(other) {
    return new Vec2(this.x - other.x, this.y - other.y);
  }
  
  // Multiply by scalar
  multiply(scalar) {
    return new Vec2(this.x * scalar, this.y * scalar);
  }
  
  // Calculate length
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  
  // Normalize vector
  normalize() {
    const len = this.length();
    if (len === 0) return new Vec2(0, 0);
    return this.divide(len);
  }
  
  // Calculate dot product
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  
  // Calculate distance to another vector
  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

// Usage
const v1 = new Vec2(3, 4);
const v2 = new Vec2(1, 2);
const sum = v1.add(v2);
const length = v1.length();
const normalized = v1.normalize();`,
      2: `// Step 2: Distance and Angle Calculations
// Calculate distance between two points
function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// Calculate squared distance (faster, no sqrt)
function distanceSquared(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}

// Calculate angle between two points
function angle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

// Usage
const dist = distance(0, 0, 3, 4); // 5
const ang = angle(0, 0, 1, 1); // π/4 radians (45 degrees)

// Compare distances (use squared for performance)
if (distanceSquared(x1, y1, x2, y2) < radius * radius) {
  // Point is within radius
}`,
      3: `// Step 3: Utility Functions
// Linear interpolation
function lerp(start, end, t) {
  return start + (end - start) * t;
}

// Clamp value between min and max
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Map value from one range to another
function map(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Convert degrees to radians
function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

// Convert radians to degrees
function radToDeg(radians) {
  return radians * 180 / Math.PI;
}

// Random number between min and max
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Random integer between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Timer utility
class Timer {
  constructor(duration) {
    this.duration = duration;
    this.elapsed = 0;
    this.finished = false;
  }
  
  update(deltaTime) {
    if (!this.finished) {
      this.elapsed += deltaTime;
      if (this.elapsed >= this.duration) {
        this.elapsed = this.duration;
        this.finished = true;
      }
    }
  }
  
  reset() {
    this.elapsed = 0;
    this.finished = false;
  }
  
  getProgress() {
    return Math.min(this.elapsed / this.duration, 1);
  }
}

// Usage
const value = lerp(0, 100, 0.5); // 50
const clamped = clamp(150, 0, 100); // 100
const mapped = map(50, 0, 100, 0, 1000); // 500
const timer = new Timer(5.0); // 5 second timer`,
      4: `// Step 4: Complete Utils Module
// See: src/engine2D/Utils.js for full implementation

import { Vec2, distance, angle, lerp, clamp, Timer } from './engine2D/Utils.js';

// Vector operations
const position = new Vec2(100, 200);
const velocity = new Vec2(50, -30);
const newPosition = position.add(velocity.multiply(deltaTime));

// Distance calculation
const dist = distance(0, 0, 3, 4);

// Interpolation
const smoothValue = lerp(startValue, endValue, t);

// Timer
const cooldown = new Timer(2.0);
cooldown.update(deltaTime);
if (cooldown.finished) {
  // Cooldown complete
}`
    },
    assetloader: {
      1: `// Step 1: AssetLoader Introduction
import { AssetLoader } from './engine2D/AssetLoader.js';

// Create AssetLoader instance
const loader = new AssetLoader();

// AssetLoader provides:
// - Promise-based loading
// - Automatic caching
// - Progress tracking
// - Error handling`,

      2: `// Step 2: Loading Single Image
import { AssetLoader } from './engine2D/AssetLoader.js';

const loader = new AssetLoader();

// Load single image
try {
  const image = await loader.loadImage('player', '/sprites/player.png');
  console.log('Image loaded:', image.width, 'x', image.height);
} catch (error) {
  console.error('Failed to load image:', error);
}

// Use loaded image
const playerImage = loader.get('player');
if (playerImage) {
  renderer.drawSprite(playerImage, 100, 100, 64, 64);
}`,

      3: `// Step 3: Asset Caching
import { AssetLoader } from './engine2D/AssetLoader.js';

const loader = new AssetLoader();

// First load - downloads image
await loader.loadImage('player', '/sprites/player.png');

// Second request - returns cached image instantly
const cachedImage = loader.get('player'); // No download!

// Check if asset is cached
if (loader.has('player')) {
  console.log('Player sprite is cached');
}

// Clear cache to free memory
loader.clear();`,

      4: `// Step 4: Batch Loading
import { AssetLoader } from './engine2D/AssetLoader.js';

const loader = new AssetLoader();

// Load multiple images at once
try {
  const assets = await loader.loadImages({
    player: '/sprites/player.png',
    enemy: '/sprites/enemy.png',
    background: '/sprites/background.png',
    ui: '/sprites/ui.png'
  });
  
  console.log('All assets loaded:', assets);
} catch (error) {
  console.error('Some assets failed to load:', error);
}

// All assets are now cached
const player = loader.get('player');
const enemy = loader.get('enemy');`,

      5: `// Step 5: Progress Tracking
import { AssetLoader } from './engine2D/AssetLoader.js';

const loader = new AssetLoader();

// Start loading assets
const loadPromise = loader.loadImages({
  player: '/sprites/player.png',
  enemy: '/sprites/enemy.png',
  background: '/sprites/background.png'
});

// Check progress periodically
const checkProgress = setInterval(() => {
  const status = loader.getStatus();
  const progress = loader.getProgress();
  
  console.log(\`Loading: \${Math.floor(progress * 100)}%\`);
  console.log(\`Loaded: \${status.loaded}, Failed: \${status.failed}, Total: \${status.total}\`);
  
  if (!status.isLoading) {
    clearInterval(checkProgress);
    console.log('Loading complete!');
  }
}, 100);

await loadPromise;`,

      6: `// Step 6: Complete AssetLoader Usage
import { AssetLoader } from './engine2D/AssetLoader.js';
import { Renderer } from './engine2D/Renderer.js';

// Initialize
const loader = new AssetLoader();
const renderer = new Renderer(ctx);

// Loading phase - show loading screen
async function loadAssets() {
  try {
    await loader.loadImages({
      player: '/sprites/player.png',
      background: '/sprites/bg.png',
      ui: '/sprites/ui.png'
    });
    console.log('All assets loaded!');
  } catch (error) {
    console.error('Loading failed:', error);
  }
}

// Usage phase - render game
function render() {
  const playerImage = loader.get('player');
  const bgImage = loader.get('background');
  
  if (bgImage) {
    renderer.drawSprite(bgImage, 0, 0, 800, 600);
  }
  
  if (playerImage) {
    renderer.drawSprite(playerImage, 100, 100, 64, 64);
  }
}

// Start game
await loadAssets();
render();`
    },
    sprite: {
      1: `// Step 1: Sprite Introduction
import { Sprite } from './engine2D/Sprite.js';
import { AssetLoader } from './engine2D/AssetLoader.js';

// Sprite extends Entity with image support
// Features:
// - Image rendering
// - Sprite sheet support
// - Frame-based animation
// - Animation states

const loader = new AssetLoader();
await loader.loadImage('player', '/sprites/player.png');

const sprite = new Sprite(100, 100, loader.get('player'));`,

      2: `// Step 2: Basic Sprite
import { Sprite } from './engine2D/Sprite.js';
import { AssetLoader } from './engine2D/AssetLoader.js';

const loader = new AssetLoader();
await loader.loadImage('player', '/sprites/player.png');

// Create sprite with image
const sprite = new Sprite(100, 100, loader.get('player'));

// Or create and set image later
const sprite2 = new Sprite(200, 200);
sprite2.setImage(loader.get('player'));

// Sprite inherits Entity properties
sprite.x = 150; // Position
sprite.rotation = Math.PI / 4; // Rotation
sprite.scaleX = 2.0; // Scale
sprite.scaleY = 2.0;

// Render sprite
sprite.onRender(renderer);`,

      3: `// Step 3: Sprite Sheet
import { Sprite } from './engine2D/Sprite.js';
import { AssetLoader } from './engine2D/AssetLoader.js';

const loader = new AssetLoader();
await loader.loadImage('playerSheet', '/sprites/player-sheet.png');

const sprite = new Sprite(100, 100);

// Set sprite sheet
// Parameters: image, frameWidth, frameHeight, columns
sprite.setSpriteSheet(
  loader.get('playerSheet'),
  32,  // frame width
  32,  // frame height
  8    // columns per row
);

// Sprite sheet frames are calculated:
// column = frameIndex % columns
// row = floor(frameIndex / columns)
// sourceX = column * frameWidth
// sourceY = row * frameHeight

// Render current frame
sprite.onRender(renderer);`,

      4: `// Step 4: Animation System
import { Sprite } from './engine2D/Sprite.js';
import { AssetLoader } from './engine2D/AssetLoader.js';

const loader = new AssetLoader();
await loader.loadImage('playerSheet', '/sprites/player-sheet.png');

const sprite = new Sprite(100, 100);
sprite.setSpriteSheet(loader.get('playerSheet'), 32, 32, 8);

// Add animation
// Parameters: name, frames array, speed (seconds per frame), loop
sprite.addAnimation('walk', [0, 1, 2, 3], 0.1, true);

// Play animation
sprite.playAnimation('walk');

// Update sprite each frame (advances animation)
function update(deltaTime) {
  sprite.update(deltaTime);
  sprite.onRender(renderer);
}

// Animation timing:
// animationTime += deltaTime
// if (animationTime >= speed) {
//   currentFrame++
//   animationTime = 0
// }`,

      5: `// Step 5: Animation States
import { Sprite } from './engine2D/Sprite.js';
import { AssetLoader } from './engine2D/AssetLoader.js';

const loader = new AssetLoader();
await loader.loadImage('playerSheet', '/sprites/player-sheet.png');

const sprite = new Sprite(100, 100);
sprite.setSpriteSheet(loader.get('playerSheet'), 32, 32, 8);

// Add multiple animations
sprite.addAnimation('idle', [0], 0.1, true);
sprite.addAnimation('walk', [1, 2, 3, 4], 0.1, true);
sprite.addAnimation('jump', [5], 0.1, false);
sprite.addAnimation('attack', [6, 7], 0.15, false);

// Game logic determines which animation to play
function updateSprite(velocity, isJumping, isAttacking) {
  if (isAttacking) {
    sprite.playAnimation('attack');
  } else if (isJumping) {
    sprite.playAnimation('jump');
  } else if (velocity.x !== 0 || velocity.y !== 0) {
    sprite.playAnimation('walk');
  } else {
    sprite.playAnimation('idle');
  }
  
  sprite.update(deltaTime);
}`,

      6: `// Step 6: Complete Sprite Usage
import { Sprite } from './engine2D/Sprite.js';
import { AssetLoader } from './engine2D/AssetLoader.js';
import { Scene } from './engine2D/Scene.js';
import { Renderer } from './engine2D/Renderer.js';

// Initialize
const loader = new AssetLoader();
const scene = new Scene();
const renderer = new Renderer(ctx);

// Load assets
await loader.loadImage('playerSheet', '/sprites/player-sheet.png');

// Create sprite
const player = new Sprite(400, 300);
player.setImage(loader.get('playerSheet'));
player.setSpriteSheet(loader.get('playerSheet'), 32, 32, 8);

// Setup animations
player.addAnimation('idle', [0], 0.1, true);
player.addAnimation('walk', [1, 2, 3, 4], 0.1, true);
player.playAnimation('idle');

// Add to scene
scene.add(player);

// Game loop
function gameLoop(deltaTime) {
  // Update
  scene.update(deltaTime);
  
  // Render
  renderer.clear();
  scene.render(renderer);
  
  requestAnimationFrame(() => gameLoop(deltaTime));
}

gameLoop(0);`
    },
    effects: {
      1: `// Step 1: Effects & Shaders Introduction
import { Effects, BlendModes } from './engine2D/Effects.js';

// Effects enhance rendering with:
// - Blend modes (multiply, screen, overlay)
// - Filters (blur, shadow, glow, color)
// - Post-processing effects

const effects = new Effects(ctx);`,

      2: `// Step 2: Blend Modes
import { Effects, BlendModes } from './engine2D/Effects.js';

const effects = new Effects(ctx);

// Multiply blend - darkens colors
effects.setBlendMode(BlendModes.MULTIPLY);
ctx.fillStyle = '#3b82f6';
ctx.fillRect(100, 100, 100, 100);
effects.resetBlendMode();

// Screen blend - lightens colors
effects.setBlendMode(BlendModes.SCREEN);
ctx.fillStyle = '#3b82f6';
ctx.fillRect(200, 100, 100, 100);
effects.resetBlendMode();

// Overlay blend - increases contrast
effects.setBlendMode(BlendModes.OVERLAY);
ctx.fillStyle = '#3b82f6';
ctx.fillRect(300, 100, 100, 100);
effects.resetBlendMode();`,

      3: `// Step 3: Filters - Blur & Shadow
import { Effects } from './engine2D/Effects.js';

const effects = new Effects(ctx);

// Blur filter
effects.applyBlur(5);
ctx.fillStyle = '#4ade80';
ctx.fillRect(50, 50, 100, 100);
effects.resetFilters();

// Drop shadow
effects.applyDropShadow(5, 5, 10, 'rgba(0,0,0,0.5)');
ctx.fillStyle = '#fbbf24';
ctx.fillRect(200, 50, 100, 100);
effects.resetFilters();

// Glow effect
effects.applyGlow(20, 'rgba(255,255,255,0.8)');
ctx.fillStyle = '#a78bfa';
ctx.fillRect(350, 50, 100, 100);
effects.resetFilters();`,

      4: `// Step 4: Color Adjustments
import { Effects } from './engine2D/Effects.js';

const effects = new Effects(ctx);

// Brightness
effects.applyBrightness(1.5);
ctx.fillStyle = '#ef4444';
ctx.fillRect(50, 50, 100, 100);
effects.resetFilters();

// Contrast
effects.applyContrast(1.5);
ctx.fillStyle = '#ef4444';
ctx.fillRect(200, 50, 100, 100);
effects.resetFilters();

// Saturation
effects.applySaturation(2.0);
ctx.fillStyle = '#ef4444';
ctx.fillRect(350, 50, 100, 100);
effects.resetFilters();

// Hue rotation
effects.applyHueRotate(90);
ctx.fillStyle = '#ef4444';
ctx.fillRect(50, 200, 100, 100);
effects.resetFilters();

// Combined color adjustments
effects.applyColorAdjustment({
  brightness: 1.2,
  contrast: 1.1,
  saturation: 1.5,
  hueRotate: 45
});
ctx.fillStyle = '#ef4444';
ctx.fillRect(200, 200, 100, 100);
effects.resetFilters();`,

      5: `// Step 5: Post-Processing
import { Effects } from './engine2D/Effects.js';

const effects = new Effects(ctx);

// Create offscreen canvas
const offscreen = effects.createOffscreenCanvas(800, 600);
const offscreenCtx = offscreen.getContext('2d');

// Render scene to offscreen
offscreenCtx.fillStyle = '#1e293b';
offscreenCtx.fillRect(0, 0, 800, 600);

// Draw scene elements
offscreenCtx.fillStyle = '#4ade80';
offscreenCtx.fillRect(50, 50, 100, 100);
offscreenCtx.fillStyle = '#60a5fa';
offscreenCtx.fillRect(200, 50, 100, 100);
offscreenCtx.fillStyle = '#fbbf24';
offscreenCtx.fillRect(350, 50, 100, 100);

// Apply post-processing effect (blur)
ctx.filter = 'blur(5px)';
ctx.drawImage(offscreen, 0, 0);
ctx.filter = 'none';

// Or use Effects class
effects.applyPostProcessing(offscreen, mainCanvas, (ctx, width, height) => {
  ctx.filter = 'blur(5px)';
});`,

      6: `// Step 6: Complete Effects Usage
import { Effects, BlendModes } from './engine2D/Effects.js';

const effects = new Effects(ctx);

// Blend mode example
effects.setBlendMode(BlendModes.MULTIPLY);
ctx.fillStyle = '#3b82f6';
ctx.fillRect(100, 100, 100, 100);
effects.resetBlendMode();

// Filter example
effects.applyBlur(5);
effects.applyDropShadow(5, 5, 10, 'rgba(0,0,0,0.5)');
ctx.fillStyle = '#fbbf24';
ctx.fillRect(200, 100, 100, 100);
effects.resetFilters();

// Color adjustment example
effects.applyColorAdjustment({
  brightness: 1.2,
  contrast: 1.1,
  saturation: 1.5
});
ctx.fillStyle = '#ef4444';
ctx.fillRect(300, 100, 100, 100);
effects.resetFilters();

// Post-processing example
const offscreen = effects.createOffscreenCanvas(800, 600);
// Render scene to offscreen
effects.applyPostProcessing(offscreen, mainCanvas, (ctx) => {
  ctx.filter = 'blur(3px) brightness(1.1)';
});`
    },
    font: {
      1: `// Step 1: Font Loader Module
// File: src/engine2D/FontLoader.js

export class FontLoader {
  constructor() {
    this.loadedFonts = new Map();
    this.loadingPromises = new Map();
  }

  /**
   * Load a font from a URL
   * @param {string} name - Font name identifier
   * @param {string} url - URL to font file (.ttf, .woff, .woff2, etc.)
   * @param {Object} options - Font options (weight, style, etc.)
   * @returns {Promise<FontFace>}
   */
  async loadFont(name, url, options = {}) {
    // Check if already loaded
    if (this.loadedFonts.has(name)) {
      return this.loadedFonts.get(name);
    }

    // Check if currently loading
    if (this.loadingPromises.has(name)) {
      return this.loadingPromises.get(name);
    }

    // Create font face
    const fontFace = new FontFace(
      name,
      \`url(\${url})\`,
      {
        weight: options.weight || 'normal',
        style: options.style || 'normal',
        display: options.display || 'swap'
      }
    );

    // Load font
    const loadPromise = fontFace.load().then(() => {
      // Add to document fonts
      document.fonts.add(fontFace);
      this.loadedFonts.set(name, fontFace);
      this.loadingPromises.delete(name);
      return fontFace;
    }).catch((error) => {
      this.loadingPromises.delete(name);
      throw error;
    });

    this.loadingPromises.set(name, loadPromise);
    return loadPromise;
  }

  /**
   * Check if font is loaded
   * @param {string} name - Font name
   * @returns {boolean}
   */
  isLoaded(name) {
    return this.loadedFonts.has(name);
  }

  /**
   * Get loaded font
   * @param {string} name - Font name
   * @returns {FontFace|null}
   */
  get(name) {
    return this.loadedFonts.get(name) || null;
  }
}

// Usage
import { FontLoader } from './engine2D/FontLoader.js';

const fontLoader = new FontLoader();
await fontLoader.loadFont('CustomFont', '/fonts/custom-font.woff2');`,

      2: `// Step 2: Loading Multiple Fonts
import { FontLoader } from './engine2D/FontLoader.js';

const fontLoader = new FontLoader();

// Load multiple fonts
async function loadAllFonts() {
  try {
    // Load regular weight
    await fontLoader.loadFont('CustomFont', '/fonts/custom-regular.woff2', {
      weight: '400',
      style: 'normal'
    });

    // Load bold weight
    await fontLoader.loadFont('CustomFontBold', '/fonts/custom-bold.woff2', {
      weight: '700',
      style: 'normal'
    });

    // Load italic style
    await fontLoader.loadFont('CustomFontItalic', '/fonts/custom-italic.woff2', {
      weight: '400',
      style: 'italic'
    });

    console.log('All fonts loaded!');
  } catch (error) {
    console.error('Failed to load fonts:', error);
  }
}

// Load fonts before using
await loadAllFonts();

// Now fonts are available
ctx.font = '24px CustomFont';
ctx.fillText('Hello World', 100, 100);`,

      3: `// Step 3: Font Loading with Fallbacks
import { FontLoader } from './engine2D/FontLoader.js';

const fontLoader = new FontLoader();

// Load font with fallback
async function loadFontWithFallback() {
  try {
    await fontLoader.loadFont('GameFont', '/fonts/game-font.woff2');
  } catch (error) {
    console.warn('Custom font failed to load, using fallback');
  }
}

await loadFontWithFallback();

// Use font with fallback chain
// If GameFont fails to load, browser will use Arial, then sans-serif
ctx.font = '24px GameFont, Arial, sans-serif';
ctx.fillText('Score: 1000', 50, 50);

// Check if font loaded before using
if (fontLoader.isLoaded('GameFont')) {
  ctx.font = '24px GameFont';
} else {
  ctx.font = '24px Arial'; // Fallback
}
ctx.fillText('Custom font text', 100, 100);`,

      4: `// Step 4: Font Loading Progress
import { FontLoader } from './engine2D/FontLoader.js';

const fontLoader = new FontLoader();

// Load fonts with progress tracking
async function loadFontsWithProgress() {
  const fontsToLoad = [
    { name: 'TitleFont', url: '/fonts/title.woff2' },
    { name: 'BodyFont', url: '/fonts/body.woff2' },
    { name: 'UIFont', url: '/fonts/ui.woff2' }
  ];

  let loaded = 0;
  const total = fontsToLoad.length;

  // Load all fonts
  const promises = fontsToLoad.map(async (font) => {
    try {
      await fontLoader.loadFont(font.name, font.url);
      loaded++;
      console.log(\`Loaded \${font.name} (\${loaded}/\${total})\`);
    } catch (error) {
      console.error(\`Failed to load \${font.name}:\`, error);
    }
  });

  await Promise.all(promises);
  console.log('All fonts loaded!');
}

// Show loading screen while fonts load
function showLoadingScreen() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText('Loading fonts...', 100, 100);
}

showLoadingScreen();
await loadFontsWithProgress();
// Hide loading screen and start game`,

      5: `// Step 5: Using Fonts in Renderer
import { FontLoader } from './engine2D/FontLoader.js';
import { Renderer } from './engine2D/Renderer.js';

const fontLoader = new FontLoader();
const renderer = new Renderer(canvas);

// Load fonts
await fontLoader.loadFont('GameFont', '/fonts/game-font.woff2');
await fontLoader.loadFont('UIFont', '/fonts/ui-font.woff2');

// Extend Renderer with font support
class FontRenderer extends Renderer {
  /**
   * Draw text with custom font
   * @param {string} text - Text to draw
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {Object} options - Text options
   */
  drawText(text, x, y, options = {}) {
    const {
      font = 'UIFont',
      size = 16,
      color = '#000',
      align = 'left',
      baseline = 'top'
    } = options;

    // Build font string: size + font name + fallbacks
    const fontString = \`\${size}px \${font}, Arial, sans-serif\`;
    
    this.ctx.save();
    this.ctx.font = fontString;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;
    this.ctx.fillText(text, x, y);
    this.ctx.restore();
  }

  /**
   * Measure text width
   * @param {string} text - Text to measure
   * @param {string} font - Font name
   * @param {number} size - Font size
   * @returns {number} Text width in pixels
   */
  measureText(text, font = 'UIFont', size = 16) {
    this.ctx.save();
    this.ctx.font = \`\${size}px \${font}, Arial, sans-serif\`;
    const width = this.ctx.measureText(text).width;
    this.ctx.restore();
    return width;
  }
}

// Usage
const fontRenderer = new FontRenderer(canvas);

fontRenderer.drawText('Score: 1000', 50, 50, {
  font: 'UIFont',
  size: 24,
  color: '#fff',
  align: 'left'
});

const textWidth = fontRenderer.measureText('Hello', 'GameFont', 32);`,

      6: `// Step 6: Complete Font System Integration
import { FontLoader } from './engine2D/FontLoader.js';
import { Engine2D } from './engine2D/Core.js';
import { Renderer } from './engine2D/Renderer.js';

// Initialize engine
const canvas = document.getElementById('gameCanvas');
const engine = new Engine2D(canvas);
const renderer = new Renderer(canvas);
const fontLoader = new FontLoader();

// Load all game fonts
async function initializeFonts() {
  const fonts = [
    { name: 'TitleFont', url: '/fonts/title.woff2', weight: '700' },
    { name: 'BodyFont', url: '/fonts/body.woff2', weight: '400' },
    { name: 'UIFont', url: '/fonts/ui.woff2', weight: '400' },
    { name: 'UIFontBold', url: '/fonts/ui-bold.woff2', weight: '700' }
  ];

  await Promise.all(
    fonts.map(font => 
      fontLoader.loadFont(font.name, font.url, { weight: font.weight })
    )
  );
}

// Initialize fonts before starting engine
await initializeFonts();

// Game state
let score = 0;
let health = 100;

// Render function with custom fonts
engine.onRender = (ctx) => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw game content
  ctx.fillStyle = '#4ade80';
  ctx.fillRect(100, 100, 50, 50);

  // Draw UI with custom fonts
  ctx.save();
  
  // Score
  ctx.font = '24px UIFontBold, Arial, sans-serif';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'left';
  ctx.fillText(\`Score: \${score}\`, 20, 30);

  // Health
  ctx.font = '20px UIFont, Arial, sans-serif';
  ctx.fillText(\`Health: \${health}\`, 20, 60);

  // Title
  ctx.font = '48px TitleFont, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('My Game', canvas.width / 2, 100);

  ctx.restore();
};

// Start engine
engine.start();`
    },
    tweening: {
    1: `// Step 1: Tween Class Module
// File: src/engine2D/Tween.js

export class Tween {
  constructor(target, duration, options = {}) {
    this.target = target;
    this.duration = duration;
    this.startTime = null;
    this.isRunning = false;
    this.isPaused = false;
    this.isComplete = false;
    
    // Properties to animate
    this.properties = options.properties || {};
    
    // Start values (will be set when tween starts)
    this.startValues = {};
    
    // End values
    this.endValues = {};
    
    // Easing function
    this.easing = options.easing || Tween.Easing.Linear;
    
    // Callbacks
    this.onComplete = options.onComplete || null;
    this.onUpdate = options.onUpdate || null;
    this.onStart = options.onStart || null;
    
    // Delay before starting
    this.delay = options.delay || 0;
    
    // Repeat count (-1 for infinite)
    this.repeat = options.repeat || 0;
    this.repeatCount = 0;
    
    // Yoyo (reverse on repeat)
    this.yoyo = options.yoyo || false;
    this.isReversed = false;
  }
  
  start() {
    if (this.isRunning) return;
    
    // Store start values
    for (const prop in this.properties) {
      this.startValues[prop] = this.target[prop] !== undefined 
        ? this.target[prop] 
        : 0;
      this.endValues[prop] = this.properties[prop];
    }
    
    this.startTime = Date.now() + this.delay;
    this.isRunning = true;
    this.isComplete = false;
    
    if (this.onStart) {
      this.onStart();
    }
    
    return this;
  }
  
  update(currentTime) {
    if (!this.isRunning || this.isPaused || this.isComplete) {
      return;
    }
    
    // Check delay
    if (currentTime < this.startTime) {
      return;
    }
    
    // Calculate elapsed time
    const elapsed = currentTime - this.startTime;
    let t = Math.min(elapsed / this.duration, 1);
    
    // Apply easing
    t = this.easing(t);
    
    // Handle yoyo
    if (this.yoyo && this.isReversed) {
      t = 1 - t;
    }
    
    // Update properties
    for (const prop in this.properties) {
      const start = this.startValues[prop];
      const end = this.endValues[prop];
      this.target[prop] = start + (end - start) * t;
    }
    
    // Call update callback
    if (this.onUpdate) {
      this.onUpdate(t, this.target);
    }
    
    // Check if complete
    if (t >= 1) {
      if (this.repeat > 0 && this.repeatCount < this.repeat) {
        // Repeat
        this.repeatCount++;
        this.isReversed = this.yoyo ? !this.isReversed : false;
        this.startTime = currentTime;
      } else {
        // Complete
        this.isComplete = true;
        this.isRunning = false;
        
        if (this.onComplete) {
          this.onComplete();
        }
      }
    }
  }
  
  pause() {
    this.isPaused = true;
    return this;
  }
  
  resume() {
    if (this.isPaused && this.isRunning) {
      const pausedTime = Date.now() - this.pauseTime;
      this.startTime += pausedTime;
      this.isPaused = false;
    }
    return this;
  }
  
  stop() {
    this.isRunning = false;
    this.isComplete = true;
    return this;
  }
  
  reset() {
    this.startTime = null;
    this.isRunning = false;
    this.isPaused = false;
    this.isComplete = false;
    this.repeatCount = 0;
    this.isReversed = false;
    return this;
  }
  
  // Static easing functions
  static Easing = {
    Linear: (t) => t,
    
    // Ease In
    EaseInQuad: (t) => t * t,
    EaseInCubic: (t) => t * t * t,
    EaseInQuart: (t) => t * t * t * t,
    EaseInQuint: (t) => t * t * t * t * t,
    
    // Ease Out
    EaseOutQuad: (t) => t * (2 - t),
    EaseOutCubic: (t) => --t * t * t + 1,
    EaseOutQuart: (t) => 1 - --t * t * t * t,
    EaseOutQuint: (t) => 1 + --t * t * t * t * t,
    
    // Ease In Out
    EaseInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    EaseInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    
    // Elastic
    EaseInElastic: (t) => {
      if (t === 0 || t === 1) return t;
      const p = 0.3;
      const s = p / 4;
      return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - s) * (2 * Math.PI) / p);
    },
    
    EaseOutElastic: (t) => {
      if (t === 0 || t === 1) return t;
      const p = 0.3;
      const s = p / 4;
      return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
    },
    
    // Bounce
    EaseOutBounce: (t) => {
      if (t < 1 / 2.75) {
        return 7.5625 * t * t;
      } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
      } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
      } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      }
    },
    
    EaseInBounce: (t) => {
      return 1 - Tween.Easing.EaseOutBounce(1 - t);
    }
  };
}`,
    2: `// Step 2: Tween Manager
// File: src/engine2D/TweenManager.js

import { Tween } from './Tween.js';

export class TweenManager {
  constructor() {
    this.tweens = [];
    this.paused = false;
  }
  
  add(tween) {
    this.tweens.push(tween);
    return tween;
  }
  
  create(target, duration, properties, options = {}) {
    const tween = new Tween(target, duration, {
      properties,
      ...options
    });
    this.add(tween);
    return tween;
  }
  
  update(deltaTime) {
    if (this.paused) return;
    
    const currentTime = Date.now();
    
    // Update all active tweens
    for (let i = this.tweens.length - 1; i >= 0; i--) {
      const tween = this.tweens[i];
      tween.update(currentTime);
      
      // Remove completed tweens
      if (tween.isComplete && !tween.isRunning) {
        this.tweens.splice(i, 1);
      }
    }
  }
  
  remove(tween) {
    const index = this.tweens.indexOf(tween);
    if (index > -1) {
      this.tweens.splice(index, 1);
    }
    return this;
  }
  
  removeAll() {
    this.tweens = [];
    return this;
  }
  
  pause() {
    this.paused = true;
    this.tweens.forEach(tween => tween.pause());
    return this;
  }
  
  resume() {
    this.paused = false;
    this.tweens.forEach(tween => tween.resume());
    return this;
  }
  
  // Helper methods for common tweens
  to(target, duration, properties, options = {}) {
    return this.create(target, duration, properties, options).start();
  }
  
  from(target, duration, properties, options = {}) {
    // Store current values
    const currentValues = {};
    for (const prop in properties) {
      currentValues[prop] = target[prop] !== undefined ? target[prop] : 0;
    }
    
    // Set target to start values
    for (const prop in properties) {
      target[prop] = properties[prop];
    }
    
    // Tween from start to current
    return this.create(target, duration, currentValues, options).start();
  }
  
  fromTo(target, duration, fromValues, toValues, options = {}) {
    // Set initial values
    for (const prop in fromValues) {
      target[prop] = fromValues[prop];
    }
    
    // Tween to end values
    return this.create(target, duration, toValues, options).start();
  }
}`,
    3: `// Step 3: Using Tweens with Entities
// File: src/main.js

import { Engine2D } from './engine2D/Core.js';
import { Entity } from './engine2D/Entity.js';
import { TweenManager } from './engine2D/TweenManager.js';
import { Tween } from './engine2D/Tween.js';

const canvas = document.getElementById('gameCanvas');
const engine = new Engine2D(canvas);
const tweenManager = new TweenManager();

// Create an entity
const box = new Entity(100, 100);
box.width = 50;
box.height = 50;

// Update function - update tweens
engine.onUpdate = (deltaTime) => {
  tweenManager.update(deltaTime);
  
  // Update entities
  box.update(deltaTime);
};

// Render function
engine.onRender = (ctx) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw box
  ctx.fillStyle = '#4ade80';
  ctx.fillRect(box.x, box.y, box.width, box.height);
};

// Animate box position
tweenManager.to(box, 1000, {
  x: 400,
  y: 300
}, {
  easing: Tween.Easing.EaseOutQuad,
  onComplete: () => {
    console.log('Animation complete!');
  }
});

// Animate box scale
tweenManager.to(box, 500, {
  width: 100,
  height: 100
}, {
  easing: Tween.Easing.EaseInOutCubic,
  delay: 1000
});

engine.start();`,
    4: `// Step 4: Chaining and Sequencing Tweens
// File: src/main.js

import { TweenManager } from './engine2D/TweenManager.js';
import { Tween } from './engine2D/Tween.js';

const tweenManager = new TweenManager();

// Chain multiple tweens
const box = { x: 0, y: 0, width: 50, height: 50 };

// Sequence: move right, then down, then scale
tweenManager.to(box, 1000, { x: 200 }, {
  easing: Tween.Easing.EaseOutQuad,
  onComplete: () => {
    // Start next tween when first completes
    tweenManager.to(box, 1000, { y: 200 }, {
      easing: Tween.Easing.EaseOutQuad,
      onComplete: () => {
        tweenManager.to(box, 500, { width: 100, height: 100 }, {
          easing: Tween.Easing.EaseInOutCubic
        });
      }
    });
  }
});

// Or use delay for parallel animations
tweenManager.to(box, 1000, { x: 200 });
tweenManager.to(box, 1000, { y: 200 }, { delay: 500 });
tweenManager.to(box, 500, { width: 100 }, { delay: 1000 });

// Repeat animation
tweenManager.to(box, 1000, { x: 400 }, {
  easing: Tween.Easing.EaseInOutQuad,
  repeat: 3, // Repeat 3 times
  onComplete: () => {
    console.log('Repeated animation complete');
  }
});

// Yoyo effect (back and forth)
tweenManager.to(box, 1000, { x: 400 }, {
  easing: Tween.Easing.EaseInOutQuad,
  repeat: -1, // Infinite
  yoyo: true
});`,
    5: `// Step 5: Advanced Easing Functions
// File: src/main.js

import { TweenManager } from './engine2D/TweenManager.js';
import { Tween } from './engine2D/Tween.js';

const tweenManager = new TweenManager();

const ball = { x: 100, y: 100 };

// Different easing examples
const easings = [
  { name: 'Linear', func: Tween.Easing.Linear },
  { name: 'EaseInQuad', func: Tween.Easing.EaseInQuad },
  { name: 'EaseOutQuad', func: Tween.Easing.EaseOutQuad },
  { name: 'EaseInOutQuad', func: Tween.Easing.EaseInOutQuad },
  { name: 'EaseOutBounce', func: Tween.Easing.EaseOutBounce },
  { name: 'EaseOutElastic', func: Tween.Easing.EaseOutElastic }
];

easings.forEach((easing, i) => {
  const obj = { x: 100, y: 100 + i * 60 };
  
  tweenManager.to(obj, 2000, { x: 500 }, {
    easing: easing.func,
    delay: i * 200
  });
});

// Custom easing function
function customEasing(t) {
  // Custom cubic bezier-like curve
  return t * t * (3 - 2 * t);
}

tweenManager.to(ball, 1000, { x: 400 }, {
  easing: customEasing
});

// Easing with callbacks for visual feedback
tweenManager.to(ball, 1000, { y: 300 }, {
  easing: Tween.Easing.EaseOutBounce,
  onUpdate: (progress, target) => {
    console.log(\`Progress: \${(progress * 100).toFixed(1)}%\`);
    console.log(\`Y position: \${target.y.toFixed(1)}\`);
  },
  onComplete: () => {
    console.log('Bounce animation complete!');
  }
});`,
    6: `// Step 6: Complete Tweening System Integration
// File: src/main.js

import { Engine2D } from './engine2D/Core.js';
import { Entity } from './engine2D/Entity.js';
import { TweenManager } from './engine2D/TweenManager.js';
import { Tween } from './engine2D/Tween.js';

const canvas = document.getElementById('gameCanvas');
const engine = new Engine2D(canvas);
const tweenManager = new TweenManager();

// Game entities
const player = new Entity(100, 100);
player.width = 40;
player.height = 40;

const enemy = new Entity(400, 100);
enemy.width = 40;
enemy.height = 40;

// Update function
engine.onUpdate = (deltaTime) => {
  // Update tween manager
  tweenManager.update(deltaTime);
  
  // Update entities
  player.update(deltaTime);
  enemy.update(deltaTime);
};

// Render function
engine.onRender = (ctx) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw player
  ctx.fillStyle = '#4ade80';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  
  // Draw enemy
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
};

// Animate player movement
function animatePlayer() {
  tweenManager.to(player, 1000, {
    x: 300,
    y: 200
  }, {
    easing: Tween.Easing.EaseOutQuad,
    onComplete: () => {
      // Move back
      tweenManager.to(player, 1000, {
        x: 100,
        y: 100
      }, {
        easing: Tween.Easing.EaseInQuad,
        onComplete: animatePlayer // Loop
      });
    }
  });
}

// Animate enemy with bounce
tweenManager.to(enemy, 1500, {
  y: 300
}, {
  easing: Tween.Easing.EaseOutBounce,
  repeat: -1,
  yoyo: true
});

// Start player animation
animatePlayer();

// Start engine
engine.start();`
    }
  };

  return snippets[module] && snippets[module][step] ? snippets[module][step] : null;
};

