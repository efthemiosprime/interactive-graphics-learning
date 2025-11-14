/**
 * Core Module - Engine Initialization and Main Loop
 * 
 * This module handles:
 * - Canvas initialization
 * - Main game loop (update/render cycle)
 * - Frame timing and delta time calculation
 * - Engine lifecycle management
 */

export class Engine2D {
  constructor(canvasId, options = {}) {
    // Get canvas element
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      throw new Error(`Canvas with id "${canvasId}" not found`);
    }

    // Get 2D rendering context
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      throw new Error('2D context not supported');
    }

    // Set canvas size
    this.canvas.width = options.width || 800;
    this.canvas.height = options.height || 600;

    // Engine state
    this.isRunning = false;
    this.lastFrameTime = 0;
    this.deltaTime = 0;
    this.fps = 0;
    this.frameCount = 0;
    this.fpsUpdateTime = 0;

    // Callbacks
    this.updateCallback = null;
    this.renderCallback = null;

    // Bind methods
    this.loop = this.loop.bind(this);
  }

  /**
   * Start the engine
   */
  start() {
    if (this.isRunning) {
      console.warn('Engine is already running');
      return;
    }

    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.loop();
  }

  /**
   * Stop the engine
   */
  stop() {
    this.isRunning = false;
  }

  /**
   * Main game loop
   * Uses requestAnimationFrame for smooth 60fps rendering
   */
  loop(currentTime) {
    if (!this.isRunning) return;

    // Calculate delta time (time since last frame in seconds)
    this.deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;

    // Clamp delta time to prevent large jumps
    this.deltaTime = Math.min(this.deltaTime, 0.1); // Max 100ms

    // Update FPS counter
    this.updateFPS(currentTime);

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Call update callback
    if (this.updateCallback) {
      this.updateCallback(this.deltaTime);
    }

    // Call render callback
    if (this.renderCallback) {
      this.renderCallback(this.ctx);
    }

    // Continue loop
    requestAnimationFrame(this.loop);
  }

  /**
   * Update FPS counter
   */
  updateFPS(currentTime) {
    this.frameCount++;
    
    if (currentTime - this.fpsUpdateTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.fpsUpdateTime = currentTime;
    }
  }

  /**
   * Set update callback
   */
  onUpdate(callback) {
    this.updateCallback = callback;
  }

  /**
   * Set render callback
   */
  onRender(callback) {
    this.renderCallback = callback;
  }

  /**
   * Get current FPS
   */
  getFPS() {
    return this.fps;
  }

  /**
   * Get delta time
   */
  getDeltaTime() {
    return this.deltaTime;
  }
}

