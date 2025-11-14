/**
 * Scene Module - Manage Drawable Entities and Their Hierarchy
 * 
 * This module provides:
 * - Entity management (add/remove)
 * - Scene hierarchy
 * - Update and render all entities
 * - Entity queries (find by type, position, etc.)
 */

export class Scene {
  constructor() {
    this.entities = [];
    this.root = null;
  }

  /**
   * Add entity to scene
   */
  add(entity) {
    if (this.entities.indexOf(entity) === -1) {
      this.entities.push(entity);
      if (!entity.parent) {
        if (!this.root) {
          this.root = entity;
        }
      }
    }
    return entity;
  }

  /**
   * Remove entity from scene
   */
  remove(entity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
      if (entity.parent) {
        entity.parent.removeChild(entity);
      }
      if (this.root === entity) {
        this.root = null;
      }
    }
    return entity;
  }

  /**
   * Clear all entities
   */
  clear() {
    this.entities = [];
    this.root = null;
  }

  /**
   * Update all entities
   */
  update(deltaTime) {
    // Update root entities (those without parents)
    for (const entity of this.entities) {
      if (!entity.parent) {
        entity.update(deltaTime);
      }
    }
  }

  /**
   * Render all entities
   */
  render(renderer) {
    // Render root entities (those without parents)
    for (const entity of this.entities) {
      if (!entity.parent) {
        entity.render(renderer);
      }
    }
  }

  /**
   * Find entities by type
   */
  findByType(type) {
    return this.entities.filter(entity => entity instanceof type);
  }

  /**
   * Find entities at position
   */
  findByPosition(x, y, radius = 0) {
    return this.entities.filter(entity => {
      const pos = entity.getWorldPosition();
      const dx = pos.x - x;
      const dy = pos.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= radius;
    });
  }

  /**
   * Get all entities
   */
  getAll() {
    return [...this.entities];
  }
}

