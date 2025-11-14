import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Code, FileText } from 'lucide-react';

export default function Engine2DCompleteTutorial() {
  const [expandedSteps, setExpandedSteps] = useState({});

  const toggleStep = (stepIndex) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  const steps = [
    {
      title: 'Step 1: Set Up Vite Project',
      description: 'Create a new Vite project and set up the basic structure',
      code: `# Create a new Vite project
npm create vite@latest engine2d -- --template vanilla

# Navigate to project directory
cd engine2d

# Install dependencies
npm install`,
      explanation: 'Vite provides fast development with hot module replacement. We use vanilla JavaScript to build the engine from scratch without framework overhead.',
      files: [
        {
          name: 'package.json',
          content: `{
  "name": "engine2d",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}`
        }
      ]
    },
    {
      title: 'Step 2: Create HTML Structure',
      description: 'Set up the HTML file with canvas element',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2D Game Engine</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #1a1a2e;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: 'Courier New', monospace;
    }
    #gameCanvas {
      border: 2px solid #6366f1;
      border-radius: 8px;
      background: #0f0f1e;
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas" width="800" height="600"></canvas>
  <script type="module" src="/main.js"></script>
</body>
</html>`,
        explanation: 'The canvas element is where we will render our game. We set up basic styling and include the main JavaScript file.',
      files: [
        {
          name: 'index.html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2D Game Engine</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <canvas id="gameCanvas" width="800" height="600"></canvas>
  <script type="module" src="/main.js"></script>
</body>
</html>`
        }
      ]
    },
    {
      title: 'Step 3: Create Core Engine Class',
      description: 'Initialize canvas, set up game loop, and create the core engine structure',
      code: `// engine/Core.js
export class Core {
  constructor(canvasId, width, height) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    
    this.running = false;
    this.lastTime = 0;
    this.deltaTime = 0;
    
    // Game loop callback
    this.updateCallback = null;
    this.renderCallback = null;
  }
  
  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.gameLoop();
  }
  
  stop() {
    this.running = false;
  }
  
  gameLoop = (currentTime = 0) => {
    if (!this.running) return;
    
    // Calculate delta time
    this.deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
    this.lastTime = currentTime;
    
    // Update game logic
    if (this.updateCallback) {
      this.updateCallback(this.deltaTime);
    }
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render game
    if (this.renderCallback) {
      this.renderCallback(this.ctx);
    }
    
    // Continue loop
    requestAnimationFrame(this.gameLoop);
  }
  
  onUpdate(callback) {
    this.updateCallback = callback;
  }
  
  onRender(callback) {
    this.renderCallback = callback;
  }
}`,
      explanation: 'The Core class manages the canvas, game loop, and timing. It uses requestAnimationFrame for smooth 60fps rendering and calculates deltaTime for frame-independent updates.',
      files: [
        {
          name: 'engine/Core.js',
          content: `export class Core {
  constructor(canvasId, width, height) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    
    this.running = false;
    this.lastTime = 0;
    this.deltaTime = 0;
    
    this.updateCallback = null;
    this.renderCallback = null;
  }
  
  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.gameLoop();
  }
  
  stop() {
    this.running = false;
  }
  
  gameLoop = (currentTime = 0) => {
    if (!this.running) return;
    
    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
    
    if (this.updateCallback) {
      this.updateCallback(this.deltaTime);
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.renderCallback) {
      this.renderCallback(this.ctx);
    }
    
    requestAnimationFrame(this.gameLoop);
  }
  
  onUpdate(callback) {
    this.updateCallback = callback;
  }
  
  onRender(callback) {
    this.renderCallback = callback;
  }
}`
        }
      ]
    },
    {
      title: 'Step 4: Create Renderer Class',
      description: 'Implement drawing functions for shapes, sprites, and text',
      code: `// engine/Renderer.js
export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }
  
  // Draw rectangle
  drawRect(x, y, width, height, color = '#ffffff', fill = true) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    
    if (fill) {
      this.ctx.fillRect(x, y, width, height);
    } else {
      this.ctx.strokeRect(x, y, width, height);
    }
    
    this.ctx.restore();
  }
  
  // Draw circle
  drawCircle(x, y, radius, color = '#ffffff', fill = true) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    
    if (fill) {
      this.ctx.fill();
    } else {
      this.ctx.stroke();
    }
    
    this.ctx.restore();
  }
  
  // Draw image/sprite
  drawImage(image, x, y, width, height) {
    if (image && image.complete) {
      this.ctx.drawImage(image, x, y, width || image.width, height || image.height);
    }
  }
  
  // Draw text
  drawText(text, x, y, font = '16px Arial', color = '#ffffff', align = 'left') {
    this.ctx.save();
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.fillText(text, x, y);
    this.ctx.restore();
  }
  
  // Clear canvas
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}`,
      explanation: 'The Renderer class provides a clean API for drawing operations. It wraps Canvas 2D context methods and manages state with save/restore to prevent style bleeding.',
      files: [
        {
          name: 'engine/Renderer.js',
          content: `export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }
  
  drawRect(x, y, width, height, color = '#ffffff', fill = true) {
    // ... (implementation as shown above)
  }
  
  drawCircle(x, y, radius, color = '#ffffff', fill = true) {
    // ... (implementation as shown above)
  }
  
  drawImage(image, x, y, width, height) {
    // ... (implementation as shown above)
  }
  
  drawText(text, x, y, font = '16px Arial', color = '#ffffff', align = 'left') {
    // ... (implementation as shown above)
  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}`
        }
      ]
    },
    {
      title: 'Step 5: Create Entity Base Class',
      description: 'Create a base class for all game objects with position, rotation, and scale',
      code: `// engine/Entity.js
export class Entity {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.visible = true;
    this.active = true;
    
    // Children for hierarchy
    this.children = [];
    this.parent = null;
  }
  
  // Update method (override in subclasses)
  update(deltaTime) {
    if (!this.active) return;
    
    // Update children
    for (const child of this.children) {
      child.update(deltaTime);
    }
  }
  
  // Render method (override in subclasses)
  render(renderer) {
    if (!this.visible) return;
    
    renderer.ctx.save();
    
    // Apply transformations
    renderer.ctx.translate(this.x, this.y);
    renderer.ctx.rotate(this.rotation);
    renderer.ctx.scale(this.scaleX, this.scaleY);
    
    // Render this entity (override in subclasses)
    this.onRender(renderer);
    
    // Render children
    for (const child of this.children) {
      child.render(renderer);
    }
    
    renderer.ctx.restore();
  }
  
  // Override this in subclasses
  onRender(renderer) {
    // Default: draw a small circle
    renderer.drawCircle(0, 0, 5, '#ffffff');
  }
  
  // Add child entity
  addChild(entity) {
    entity.parent = this;
    this.children.push(entity);
  }
  
  // Remove child entity
  removeChild(entity) {
    const index = this.children.indexOf(entity);
    if (index > -1) {
      this.children[index].parent = null;
      this.children.splice(index, 1);
    }
  }
  
  // Get world position (accounting for parent transforms)
  getWorldX() {
    return this.parent ? this.parent.getWorldX() + this.x : this.x;
  }
  
  getWorldY() {
    return this.parent ? this.parent.getWorldY() + this.y : this.y;
  }
}`,
      explanation: 'Entity is the base class for all game objects. It provides position, rotation, scale, visibility, and a parent-child hierarchy system for complex scenes.',
      files: [
        {
          name: 'engine/Entity.js',
          content: `export class Entity {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.visible = true;
    this.active = true;
    this.children = [];
    this.parent = null;
  }
  
  update(deltaTime) {
    if (!this.active) return;
    for (const child of this.children) {
      child.update(deltaTime);
    }
  }
  
  render(renderer) {
    if (!this.visible) return;
    
    renderer.ctx.save();
    renderer.ctx.translate(this.x, this.y);
    renderer.ctx.rotate(this.rotation);
    renderer.ctx.scale(this.scaleX, this.scaleY);
    
    this.onRender(renderer);
    
    for (const child of this.children) {
      child.render(renderer);
    }
    
    renderer.ctx.restore();
  }
  
  onRender(renderer) {
    renderer.drawCircle(0, 0, 5, '#ffffff');
  }
  
  addChild(entity) {
    entity.parent = this;
    this.children.push(entity);
  }
  
  removeChild(entity) {
    const index = this.children.indexOf(entity);
    if (index > -1) {
      this.children[index].parent = null;
      this.children.splice(index, 1);
    }
  }
  
  getWorldX() {
    return this.parent ? this.parent.getWorldX() + this.x : this.x;
  }
  
  getWorldY() {
    return this.parent ? this.parent.getWorldY() + this.y : this.y;
  }
}`
        }
      ]
    },
    {
      title: 'Step 6: Create Scene Manager',
      description: 'Implement scene management for organizing game entities',
      code: `// engine/Scene.js
import { Entity } from './Entity.js';

export class Scene {
  constructor() {
    this.entities = [];
    this.toAdd = [];
    this.toRemove = [];
  }
  
  // Add entity to scene
  add(entity) {
    this.toAdd.push(entity);
  }
  
  // Remove entity from scene
  remove(entity) {
    this.toRemove.push(entity);
  }
  
  // Update all entities
  update(deltaTime) {
    // Process additions
    for (const entity of this.toAdd) {
      this.entities.push(entity);
    }
    this.toAdd = [];
    
    // Process removals
    for (const entity of this.toRemove) {
      const index = this.entities.indexOf(entity);
      if (index > -1) {
        this.entities.splice(index, 1);
      }
    }
    this.toRemove = [];
    
    // Update all entities
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
  
  // Clear all entities
  clear() {
    this.entities = [];
    this.toAdd = [];
    this.toRemove = [];
  }
  
  // Find entities by type or condition
  find(predicate) {
    return this.entities.filter(predicate);
  }
}`,
      explanation: 'Scene manages all entities in the game. It handles adding/removing entities safely (deferred to avoid modifying array during iteration) and provides query methods.',
      files: [
        {
          name: 'engine/Scene.js',
          content: `import { Entity } from './Entity.js';

export class Scene {
  constructor() {
    this.entities = [];
    this.toAdd = [];
    this.toRemove = [];
  }
  
  add(entity) {
    this.toAdd.push(entity);
  }
  
  remove(entity) {
    this.toRemove.push(entity);
  }
  
  update(deltaTime) {
    for (const entity of this.toAdd) {
      this.entities.push(entity);
    }
    this.toAdd = [];
    
    for (const entity of this.toRemove) {
      const index = this.entities.indexOf(entity);
      if (index > -1) {
        this.entities.splice(index, 1);
      }
    }
    this.toRemove = [];
    
    for (const entity of this.entities) {
      entity.update(deltaTime);
    }
  }
  
  render(renderer) {
    for (const entity of this.entities) {
      entity.render(renderer);
    }
  }
  
  clear() {
    this.entities = [];
    this.toAdd = [];
    this.toRemove = [];
  }
  
  find(predicate) {
    return this.entities.filter(predicate);
  }
}`
        }
      ]
    },
    {
      title: 'Step 7: Create Input Manager',
      description: 'Implement mouse and keyboard input handling',
      code: `// engine/Input.js
export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    
    // Mouse state
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.mousePressed = false;
    this.mouseReleased = false;
    
    // Keyboard state
    this.keys = {};
    this.keysPressed = {};
    this.keysReleased = {};
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Mouse events
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
    
    this.canvas.addEventListener('mousedown', () => {
      this.mouseDown = true;
      this.mousePressed = true;
    });
    
    this.canvas.addEventListener('mouseup', () => {
      this.mouseDown = false;
      this.mouseReleased = true;
    });
    
    // Keyboard events
    window.addEventListener('keydown', (e) => {
      if (!this.keys[e.key]) {
        this.keysPressed[e.key] = true;
      }
      this.keys[e.key] = true;
    });
    
    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
      this.keysReleased[e.key] = true;
    });
  }
  
  // Update (call at end of frame to reset pressed/released)
  update() {
    this.mousePressed = false;
    this.mouseReleased = false;
    this.keysPressed = {};
    this.keysReleased = {};
  }
  
  // Check if key is currently held
  isKeyDown(key) {
    return this.keys[key] === true;
  }
  
  // Check if key was just pressed this frame
  isKeyPressed(key) {
    return this.keysPressed[key] === true;
  }
  
  // Check if key was just released this frame
  isKeyReleased(key) {
    return this.keysReleased[key] === true;
  }
  
  // Check if mouse is down
  isMouseDown() {
    return this.mouseDown;
  }
  
  // Check if mouse was just pressed
  isMousePressed() {
    return this.mousePressed;
  }
  
  // Check if mouse was just released
  isMouseReleased() {
    return this.mouseReleased;
  }
}`,
      explanation: 'Input manager tracks mouse and keyboard state. It distinguishes between held keys (isKeyDown) and frame-specific events (isKeyPressed/isKeyReleased) for responsive controls.',
      files: [
        {
          name: 'engine/Input.js',
          content: `export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.mousePressed = false;
    this.mouseReleased = false;
    this.keys = {};
    this.keysPressed = {};
    this.keysReleased = {};
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // ... (event listener setup as shown above)
  }
  
  update() {
    this.mousePressed = false;
    this.mouseReleased = false;
    this.keysPressed = {};
    this.keysReleased = {};
  }
  
  // ... (input checking methods as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 8: Create Utility Functions',
      description: 'Implement math helpers and utility functions',
      code: `// engine/Utils.js
export class Utils {
  // Linear interpolation
  static lerp(start, end, t) {
    return start + (end - start) * t;
  }
  
  // Clamp value between min and max
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  // Distance between two points
  static distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  // Check if point is inside rectangle
  static pointInRect(px, py, rx, ry, rw, rh) {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
  }
  
  // Check if two rectangles intersect
  static rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }
  
  // Random number between min and max
  static random(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // Random integer between min and max (inclusive)
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Convert degrees to radians
  static degToRad(degrees) {
    return degrees * Math.PI / 180;
  }
  
  // Convert radians to degrees
  static radToDeg(radians) {
    return radians * 180 / Math.PI;
  }
  
  // Angle between two points
  static angle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }
}`,
      explanation: 'Utils provides common math and helper functions used throughout the engine. These include interpolation, collision detection, random numbers, and angle calculations.',
      files: [
        {
          name: 'engine/Utils.js',
          content: `export class Utils {
  static lerp(start, end, t) {
    return start + (end - start) * t;
  }
  
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  static distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  // ... (other utility methods as shown above)
}`
        }
      ]
    },
    {
      title: 'Step 9: Create Asset Loader',
      description: 'Implement image and asset loading system',
      code: `// engine/AssetLoader.js
export class AssetLoader {
  constructor() {
    this.images = new Map();
    this.loading = new Map();
  }
  
  // Load an image
  async loadImage(name, src) {
    // Return cached image if already loaded
    if (this.images.has(name)) {
      return this.images.get(name);
    }
    
    // Return existing promise if already loading
    if (this.loading.has(name)) {
      return this.loading.get(name);
    }
    
    // Create new promise for loading
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.images.set(name, img);
        this.loading.delete(name);
        resolve(img);
      };
      img.onerror = () => {
        this.loading.delete(name);
        reject(new Error(\`Failed to load image: \${src}\`));
      };
      img.src = src;
    });
    
    this.loading.set(name, promise);
    return promise;
  }
  
  // Load multiple images
  async loadImages(assets) {
    const promises = Object.entries(assets).map(([name, src]) => 
      this.loadImage(name, src)
    );
    return Promise.all(promises);
  }
  
  // Get loaded image
  getImage(name) {
    return this.images.get(name);
  }
  
  // Check if image is loaded
  hasImage(name) {
    return this.images.has(name);
  }
}`,
      explanation: 'AssetLoader manages image loading and caching. It prevents duplicate loads and provides async loading with promises. Images are cached for reuse.',
      files: [
        {
          name: 'engine/AssetLoader.js',
          content: `export class AssetLoader {
  constructor() {
    this.images = new Map();
    this.loading = new Map();
  }
  
  async loadImage(name, src) {
    if (this.images.has(name)) {
      return this.images.get(name);
    }
    
    if (this.loading.has(name)) {
      return this.loading.get(name);
    }
    
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.images.set(name, img);
        this.loading.delete(name);
        resolve(img);
      };
      img.onerror = () => {
        this.loading.delete(name);
        reject(new Error(\`Failed to load image: \${src}\`));
      };
      img.src = src;
    });
    
    this.loading.set(name, promise);
    return promise;
  }
  
  async loadImages(assets) {
    const promises = Object.entries(assets).map(([name, src]) => 
      this.loadImage(name, src)
    );
    return Promise.all(promises);
  }
  
  getImage(name) {
    return this.images.get(name);
  }
  
  hasImage(name) {
    return this.images.has(name);
  }
}`
        }
      ]
    },
    {
      title: 'Step 10: Put It All Together',
      description: 'Create main.js that initializes and runs the engine',
      code: `// main.js
import { Core } from './engine/Core.js';
import { Renderer } from './engine/Renderer.js';
import { Scene } from './engine/Scene.js';
import { Entity } from './engine/Entity.js';
import { Input } from './engine/Input.js';
import { AssetLoader } from './engine/AssetLoader.js';

// Create engine instance
const core = new Core('gameCanvas', 800, 600);
const renderer = new Renderer(core.ctx);
const scene = new Scene();
const input = new Input(core.canvas);
const assets = new AssetLoader();

// Example: Create a simple entity
class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.speed = 100; // pixels per second
  }
  
  update(deltaTime) {
    super.update(deltaTime);
    
    // Move with arrow keys
    if (input.isKeyDown('ArrowLeft')) {
      this.x -= this.speed * deltaTime;
    }
    if (input.isKeyDown('ArrowRight')) {
      this.x += this.speed * deltaTime;
    }
    if (input.isKeyDown('ArrowUp')) {
      this.y -= this.speed * deltaTime;
    }
    if (input.isKeyDown('ArrowDown')) {
      this.y += this.speed * deltaTime;
    }
  }
  
  onRender(renderer) {
    renderer.drawCircle(0, 0, 20, '#00ff00');
  }
}

// Initialize game
async function init() {
  // Load assets
  await assets.loadImages({
    player: '/assets/player.png' // Optional: load sprite
  });
  
  // Create player
  const player = new Player(400, 300);
  scene.add(player);
  
  // Set up game loop
  core.onUpdate((deltaTime) => {
    input.update();
    scene.update(deltaTime);
  });
  
  core.onRender(() => {
    scene.render(renderer);
  });
  
  // Start engine
  core.start();
}

// Start the game
init();`,
      explanation: 'The main.js file ties everything together. It creates engine instances, sets up the game loop, and initializes the game. This is where you create your game entities and scenes.',
      files: [
        {
          name: 'main.js',
          content: `import { Core } from './engine/Core.js';
import { Renderer } from './engine/Renderer.js';
import { Scene } from './engine/Scene.js';
import { Entity } from './engine/Entity.js';
import { Input } from './engine/Input.js';
import { AssetLoader } from './engine/AssetLoader.js';

// ... (full implementation as shown above)`
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/engine2d-tutorial"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to 2D Engine Tutorial
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-purple-900">
              Complete Tutorial: Building a 2D Game Engine
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6 rounded">
            <p className="text-purple-900 font-semibold mb-2">📚 What You'll Learn:</p>
            <ul className="list-disc list-inside text-purple-800 space-y-1">
              <li>Setting up a Vite project for game development</li>
              <li>Creating a core engine with game loop and timing</li>
              <li>Building a renderer for drawing shapes and sprites</li>
              <li>Implementing entity-component architecture</li>
              <li>Creating scene management system</li>
              <li>Handling mouse and keyboard input</li>
              <li>Loading and managing game assets</li>
              <li>Building a complete, extensible game engine</li>
            </ul>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="border-2 border-purple-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleStep(index)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-purple-900">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  {expandedSteps[index] ? (
                    <ChevronUp className="w-5 h-5 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-600" />
                  )}
                </button>

                {expandedSteps[index] && (
                  <div className="p-6 bg-white space-y-4">
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm font-mono">
                        <code>{step.code}</code>
                      </pre>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
                      <p className="text-sm text-purple-900">
                        <span className="font-semibold">💡 Explanation:</span> {step.explanation}
                      </p>
                    </div>

                    {step.files && step.files.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-900 flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Files to Create:
                        </h4>
                        {step.files.map((file, fileIndex) => (
                          <div key={fileIndex} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-purple-600" />
                              <span className="font-mono text-sm font-semibold text-purple-900">{file.name}</span>
                            </div>
                            <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                              <code>{file.content}</code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-500 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-2">Next Steps</h3>
                <ul className="list-disc list-inside text-green-800 space-y-1">
                  <li>Add sprite animation system with sprite sheets</li>
                  <li>Implement collision detection (AABB, circle, polygon)</li>
                  <li>Create a physics system with velocity and acceleration</li>
                  <li>Add camera system for scrolling and following</li>
                  <li>Implement particle systems for visual effects</li>
                  <li>Add audio system for sound effects and music</li>
                  <li>Create a UI system for menus and HUD</li>
                  <li>Implement state management for game states (menu, play, pause)</li>
                  <li>Add tweening library for smooth animations</li>
                  <li>Optimize rendering with object pooling and spatial partitioning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

