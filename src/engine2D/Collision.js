/**
 * Collision Module - Collision Detection System
 * 
 * This module provides:
 * - AABB (Axis-Aligned Bounding Box) collision
 * - Circle collision detection
 * - Point-in-shape tests
 * - Collision response helpers
 */

export class Collision {
  /**
   * Check AABB collision between two rectangles
   * @param {Object} rect1 - {x, y, width, height}
   * @param {Object} rect2 - {x, y, width, height}
   * @returns {boolean} True if colliding
   */
  static aabb(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  /**
   * Check circle collision
   * @param {Object} circle1 - {x, y, radius}
   * @param {Object} circle2 - {x, y, radius}
   * @returns {boolean} True if colliding
   */
  static circle(circle1, circle2) {
    const dx = circle2.x - circle1.x;
    const dy = circle2.y - circle1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle1.radius + circle2.radius;
  }

  /**
   * Check point in rectangle
   * @param {number} x - Point x
   * @param {number} y - Point y
   * @param {Object} rect - {x, y, width, height}
   * @returns {boolean} True if point is inside
   */
  static pointInRect(x, y, rect) {
    return (
      x >= rect.x &&
      x <= rect.x + rect.width &&
      y >= rect.y &&
      y <= rect.y + rect.height
    );
  }

  /**
   * Check point in circle
   * @param {number} x - Point x
   * @param {number} y - Point y
   * @param {Object} circle - {x, y, radius}
   * @returns {boolean} True if point is inside
   */
  static pointInCircle(x, y, circle) {
    const dx = x - circle.x;
    const dy = y - circle.y;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
  }

  /**
   * Get collision info for AABB
   * @param {Object} rect1 - {x, y, width, height}
   * @param {Object} rect2 - {x, y, width, height}
   * @returns {Object|null} Collision info or null
   */
  static getAABBInfo(rect1, rect2) {
    if (!this.aabb(rect1, rect2)) return null;

    const overlapX = Math.min(
      rect1.x + rect1.width - rect2.x,
      rect2.x + rect2.width - rect1.x
    );
    const overlapY = Math.min(
      rect1.y + rect1.height - rect2.y,
      rect2.y + rect2.height - rect1.y
    );

    return {
      colliding: true,
      overlapX,
      overlapY,
      normalX: rect1.x < rect2.x ? -1 : 1,
      normalY: rect1.y < rect2.y ? -1 : 1
    };
  }

  /**
   * Separate two AABBs (push them apart)
   * @param {Object} rect1 - {x, y, width, height}
   * @param {Object} rect2 - {x, y, width, height}
   * @returns {Object} Separation info
   */
  static separateAABB(rect1, rect2) {
    const info = this.getAABBInfo(rect1, rect2);
    if (!info) return null;

    // Push rect1 out of rect2
    if (info.overlapX < info.overlapY) {
      return {
        x: info.normalX * info.overlapX,
        y: 0
      };
    } else {
      return {
        x: 0,
        y: info.normalY * info.overlapY
      };
    }
  }
}

