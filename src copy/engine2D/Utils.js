/**
 * Utils Module - Math Helpers and Timing Tools
 * 
 * This module provides:
 * - Vector math operations
 * - Distance calculations
 * - Angle calculations
 * - Timing utilities
 * - Random number generation
 * - Clamping and interpolation
 */

export class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * Add another vector
   */
  add(other) {
    return new Vec2(this.x + other.x, this.y + other.y);
  }

  /**
   * Subtract another vector
   */
  subtract(other) {
    return new Vec2(this.x - other.x, this.y - other.y);
  }

  /**
   * Multiply by scalar
   */
  multiply(scalar) {
    return new Vec2(this.x * scalar, this.y * scalar);
  }

  /**
   * Divide by scalar
   */
  divide(scalar) {
    return new Vec2(this.x / scalar, this.y / scalar);
  }

  /**
   * Calculate length (magnitude)
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Calculate squared length (faster, no sqrt)
   */
  lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Normalize vector (make it unit length)
   */
  normalize() {
    const len = this.length();
    if (len === 0) return new Vec2(0, 0);
    return this.divide(len);
  }

  /**
   * Calculate dot product
   */
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Calculate distance to another vector
   */
  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculate angle to another vector
   */
  angleTo(other) {
    return Math.atan2(other.y - this.y, other.x - this.x);
  }
}

/**
 * Calculate distance between two points
 */
export function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate angle between two points
 */
export function angle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * Linear interpolation
 */
export function lerp(start, end, t) {
  return start + (end - start) * t;
}

/**
 * Clamp value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map value from one range to another
 */
export function map(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

/**
 * Convert degrees to radians
 */
export function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

/**
 * Convert radians to degrees
 */
export function radToDeg(radians) {
  return radians * 180 / Math.PI;
}

/**
 * Random number between min and max
 */
export function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Random integer between min and max (inclusive)
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Timer utility
 */
export class Timer {
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

