/**
 * Entity Module - Base Class for All Drawable Objects
 * 
 * This module provides:
 * - Position, rotation, scale properties
 * - Transform matrix calculation
 * - Parent-child hierarchy
 * - Update and render lifecycle
 */

export class Entity {
  constructor(x = 0, y = 0) {
    // Transform properties
    this.x = x;
    this.y = y;
    this.rotation = 0; // radians
    this.scaleX = 1;
    this.scaleY = 1;

    // Hierarchy
    this.parent = null;
    this.children = [];

    // Visibility and active state
    this.visible = true;
    this.active = true;

    // Custom properties
    this.data = {};
  }

  /**
   * Add child entity
   */
  addChild(entity) {
    if (entity.parent) {
      entity.parent.removeChild(entity);
    }
    entity.parent = this;
    this.children.push(entity);
    return entity;
  }

  /**
   * Remove child entity
   */
  removeChild(entity) {
    const index = this.children.indexOf(entity);
    if (index !== -1) {
      this.children.splice(index, 1);
      entity.parent = null;
    }
    return entity;
  }

  /**
   * Get world position (accounting for parent transforms)
   */
  getWorldPosition() {
    if (this.parent) {
      const parentWorld = this.parent.getWorldPosition();
      const parentRotation = this.parent.getWorldRotation();
      const parentScale = this.parent.getWorldScale();

      // Transform local position by parent's world transform
      const cos = Math.cos(parentRotation);
      const sin = Math.sin(parentRotation);
      
      const worldX = parentWorld.x + (this.x * parentScale.x * cos - this.y * parentScale.y * sin);
      const worldY = parentWorld.y + (this.x * parentScale.x * sin + this.y * parentScale.y * cos);

      return { x: worldX, y: worldY };
    }
    return { x: this.x, y: this.y };
  }

  /**
   * Get world rotation
   */
  getWorldRotation() {
    if (this.parent) {
      return this.parent.getWorldRotation() + this.rotation;
    }
    return this.rotation;
  }

  /**
   * Get world scale
   */
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

  /**
   * Update entity (override in subclasses)
   */
  update(deltaTime) {
    if (!this.active) return;

    // Update children
    for (const child of this.children) {
      child.update(deltaTime);
    }
  }

  /**
   * Render entity (override in subclasses)
   */
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

    // Render this entity (override in subclasses)
    this.onRender(renderer);

    // Render children
    for (const child of this.children) {
      child.render(renderer);
    }

    // Restore renderer state
    renderer.restore();
  }

  /**
   * Override this method to implement custom rendering
   */
  onRender(renderer) {
    // Default: draw a simple rectangle
    renderer.fillRect(-10, -10, 20, 20, '#ffffff');
  }

  /**
   * Set position
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Set rotation (in degrees, converted to radians)
   */
  setRotation(degrees) {
    this.rotation = degrees * Math.PI / 180;
  }

  /**
   * Set scale
   */
  setScale(x, y = x) {
    this.scaleX = x;
    this.scaleY = y;
  }
}

