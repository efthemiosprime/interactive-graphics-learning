/**
 * Sprite Module - Sprite and Animation System
 * 
 * This module provides:
 * - Sprite entity with image support
 * - Sprite sheet animation
 * - Frame-based animation
 * - Animation state management
 */

import { Entity } from './Entity.js';

export class Sprite extends Entity {
  constructor(x = 0, y = 0, image = null) {
    super(x, y);
    this.image = image;
    this.width = image ? image.width : 32;
    this.height = image ? image.height : 32;
    
    // Sprite sheet properties
    this.spriteSheet = null;
    this.frameWidth = 32;
    this.frameHeight = 32;
    this.currentFrame = 0;
    this.frameCount = 1;
    this.columns = 1;
    
    // Animation properties
    this.animations = {};
    this.currentAnimation = null;
    this.animationSpeed = 0.1; // Frames per second
    this.animationTime = 0;
    this.loop = true;
  }

  /**
   * Set sprite image
   */
  setImage(image) {
    this.image = image;
    if (image) {
      this.width = image.width;
      this.height = image.height;
    }
  }

  /**
   * Set sprite sheet
   */
  setSpriteSheet(image, frameWidth, frameHeight, columns) {
    this.spriteSheet = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.columns = columns;
    this.frameCount = Math.floor((image.width / frameWidth) * (image.height / frameHeight));
  }

  /**
   * Add animation
   */
  addAnimation(name, frames, speed = 0.1, loop = true) {
    this.animations[name] = {
      frames,
      speed,
      loop
    };
  }

  /**
   * Play animation
   */
  playAnimation(name) {
    if (this.animations[name] && this.currentAnimation !== name) {
      this.currentAnimation = name;
      this.currentFrame = 0;
      this.animationTime = 0;
      const anim = this.animations[name];
      this.animationSpeed = anim.speed;
      this.loop = anim.loop;
    }
  }

  /**
   * Stop animation
   */
  stopAnimation() {
    this.currentAnimation = null;
  }

  /**
   * Update sprite (call each frame)
   */
  update(deltaTime) {
    super.update(deltaTime);

    // Update animation
    if (this.currentAnimation && this.spriteSheet) {
      const anim = this.animations[this.currentAnimation];
      this.animationTime += deltaTime;

      if (this.animationTime >= this.animationSpeed) {
        this.animationTime = 0;
        this.currentFrame++;

        if (this.currentFrame >= anim.frames.length) {
          if (this.loop) {
            this.currentFrame = 0;
          } else {
            this.currentFrame = anim.frames.length - 1;
            this.stopAnimation();
          }
        }
      }
    }
  }

  /**
   * Render sprite
   */
  onRender(renderer) {
    if (!this.image && !this.spriteSheet) {
      // Default: draw colored rectangle
      renderer.fillRect(-this.width / 2, -this.height / 2, this.width, this.height, '#ffffff');
      return;
    }

    const worldScale = this.getWorldScale();
    const drawWidth = this.width * worldScale.x;
    const drawHeight = this.height * worldScale.y;

    if (this.spriteSheet && this.currentAnimation) {
      // Draw from sprite sheet
      const anim = this.animations[this.currentAnimation];
      const frameIndex = anim.frames[this.currentFrame];
      const sourceX = (frameIndex % this.columns) * this.frameWidth;
      const sourceY = Math.floor(frameIndex / this.columns) * this.frameHeight;

      renderer.drawSprite(
        this.spriteSheet,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight,
        sourceX,
        sourceY,
        this.frameWidth,
        this.frameHeight
      );
    } else if (this.image) {
      // Draw full image
      renderer.drawSprite(
        this.image,
        -drawWidth / 2,
        -drawHeight / 2,
        drawWidth,
        drawHeight
      );
    }
  }
}

