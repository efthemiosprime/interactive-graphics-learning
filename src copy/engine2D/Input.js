/**
 * Input Module - Handle Mouse/Touch Events and Dispatch to Entities
 * 
 * This module provides:
 * - Mouse position tracking
 * - Click/touch detection
 * - Event dispatching to entities
 * - Input state management
 */

export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.mousePressed = false;
    this.mouseReleased = false;
    this.lastMouseDown = false;

    // Touch support
    this.touches = [];
    this.touchDown = false;

    // Event listeners
    this.setupEventListeners();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Mouse events
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.mouseDown = true;
      this.mousePressed = true;
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseup', () => {
      this.mouseDown = false;
      this.mouseReleased = true;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouseDown = false;
    });

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

  /**
   * Update touch positions
   */
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

  /**
   * Update input state (call at end of frame)
   */
  update() {
    this.mousePressed = false;
    this.mouseReleased = false;
  }

  /**
   * Check if mouse is over entity
   */
  isMouseOver(entity) {
    const pos = entity.getWorldPosition();
    const scale = entity.getWorldScale();
    
    // Simple bounding box check (assuming entity is 20x20 by default)
    const halfWidth = 10 * scale.x;
    const halfHeight = 10 * scale.y;
    
    return (
      this.mouseX >= pos.x - halfWidth &&
      this.mouseX <= pos.x + halfWidth &&
      this.mouseY >= pos.y - halfHeight &&
      this.mouseY <= pos.y + halfHeight
    );
  }

  /**
   * Dispatch click event to entity
   */
  dispatchClick(entity, x, y) {
    if (entity.onClick) {
      entity.onClick(x, y);
    }
  }

  /**
   * Get mouse position
   */
  getMousePosition() {
    return { x: this.mouseX, y: this.mouseY };
  }

  /**
   * Get touches
   */
  getTouches() {
    return [...this.touches];
  }
}

