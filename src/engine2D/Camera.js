/**
 * Camera Module - Viewport and Camera System
 * 
 * This module provides:
 * - Camera position and zoom
 * - Viewport transformation
 * - Screen-to-world coordinate conversion
 * - Camera following/following entities
 */

export class Camera {
  constructor(x = 0, y = 0, zoom = 1) {
    this.x = x;
    this.y = y;
    this.zoom = zoom;
    this.target = null; // Entity to follow
    this.followSpeed = 0.1; // Lerp speed for following
    this.bounds = null; // {minX, minY, maxX, maxY}
  }

  /**
   * Set camera position
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.applyBounds();
  }

  /**
   * Set zoom level
   */
  setZoom(zoom) {
    this.zoom = Math.max(0.1, Math.min(5, zoom)); // Clamp between 0.1 and 5
  }

  /**
   * Set camera bounds
   */
  setBounds(minX, minY, maxX, maxY) {
    this.bounds = { minX, minY, maxX, maxY };
    this.applyBounds();
  }

  /**
   * Apply bounds to camera position
   */
  applyBounds() {
    if (!this.bounds) return;

    const viewportWidth = window.innerWidth / this.zoom;
    const viewportHeight = window.innerHeight / this.zoom;

    this.x = Math.max(
      this.bounds.minX + viewportWidth / 2,
      Math.min(this.bounds.maxX - viewportWidth / 2, this.x)
    );
    this.y = Math.max(
      this.bounds.minY + viewportHeight / 2,
      Math.min(this.bounds.maxY - viewportHeight / 2, this.y)
    );
  }

  /**
   * Set target entity to follow
   */
  follow(entity) {
    this.target = entity;
  }

  /**
   * Stop following
   */
  unfollow() {
    this.target = null;
  }

  /**
   * Update camera (call each frame)
   */
  update(deltaTime) {
    if (this.target) {
      const targetPos = this.target.getWorldPosition();
      // Smoothly follow target
      this.x += (targetPos.x - this.x) * this.followSpeed;
      this.y += (targetPos.y - this.y) * this.followSpeed;
      this.applyBounds();
    }
  }

  /**
   * Apply camera transform to renderer
   */
  apply(renderer) {
    const centerX = renderer.ctx.canvas.width / 2;
    const centerY = renderer.ctx.canvas.height / 2;
    
    renderer.ctx.save();
    renderer.ctx.translate(centerX, centerY);
    renderer.ctx.scale(this.zoom, this.zoom);
    renderer.ctx.translate(-this.x, -this.y);
  }

  /**
   * Remove camera transform from renderer
   */
  unapply(renderer) {
    renderer.ctx.restore();
  }

  /**
   * Convert screen coordinates to world coordinates
   */
  screenToWorld(screenX, screenY, canvasWidth, canvasHeight) {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    
    const worldX = (screenX - centerX) / this.zoom + this.x;
    const worldY = (screenY - centerY) / this.zoom + this.y;
    
    return { x: worldX, y: worldY };
  }

  /**
   * Convert world coordinates to screen coordinates
   */
  worldToScreen(worldX, worldY, canvasWidth, canvasHeight) {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    
    const screenX = (worldX - this.x) * this.zoom + centerX;
    const screenY = (worldY - this.y) * this.zoom + centerY;
    
    return { x: screenX, y: screenY };
  }
}

