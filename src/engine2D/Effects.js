/**
 * Effects Module - Blend Modes, Filters, and Post-Processing
 * 
 * This module provides:
 * - Blend modes (Multiply, Screen, Overlay, etc.)
 * - Canvas filters (Blur, Drop Shadow, Glow, Color Adjustment)
 * - Post-processing effects
 * - Composite operations
 */

export class Effects {
  constructor(ctx) {
    this.ctx = ctx;
  }

  /**
   * Set blend mode
   * @param {string} mode - Blend mode (multiply, screen, overlay, etc.)
   */
  setBlendMode(mode) {
    this.ctx.globalCompositeOperation = mode;
  }

  /**
   * Reset blend mode to default
   */
  resetBlendMode() {
    this.ctx.globalCompositeOperation = 'source-over';
  }

  /**
   * Apply blur filter
   * @param {number} radius - Blur radius in pixels
   */
  applyBlur(radius) {
    this.ctx.filter = `blur(${radius}px)`;
  }

  /**
   * Apply drop shadow
   * @param {number} offsetX - Shadow X offset
   * @param {number} offsetY - Shadow Y offset
   * @param {number} blur - Shadow blur radius
   * @param {string} color - Shadow color
   */
  applyDropShadow(offsetX, offsetY, blur, color = 'rgba(0,0,0,0.5)') {
    this.ctx.shadowOffsetX = offsetX;
    this.ctx.shadowOffsetY = offsetY;
    this.ctx.shadowBlur = blur;
    this.ctx.shadowColor = color;
  }

  /**
   * Apply glow effect
   * @param {number} radius - Glow radius
   * @param {string} color - Glow color
   */
  applyGlow(radius, color = 'rgba(255,255,255,0.8)') {
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = radius;
    this.ctx.shadowColor = color;
  }

  /**
   * Apply brightness adjustment
   * @param {number} value - Brightness value (0 = black, 1 = normal, >1 = brighter)
   */
  applyBrightness(value) {
    this.ctx.filter = `brightness(${value})`;
  }

  /**
   * Apply contrast adjustment
   * @param {number} value - Contrast value (0 = no contrast, 1 = normal, >1 = more contrast)
   */
  applyContrast(value) {
    this.ctx.filter = `contrast(${value})`;
  }

  /**
   * Apply saturation adjustment
   * @param {number} value - Saturation value (0 = grayscale, 1 = normal, >1 = more saturated)
   */
  applySaturation(value) {
    this.ctx.filter = `saturate(${value})`;
  }

  /**
   * Apply hue rotation
   * @param {number} degrees - Hue rotation in degrees
   */
  applyHueRotate(degrees) {
    this.ctx.filter = `hue-rotate(${degrees}deg)`;
  }

  /**
   * Apply color adjustment (brightness, contrast, saturation)
   * @param {Object} options - {brightness, contrast, saturation}
   */
  applyColorAdjustment(options = {}) {
    const filters = [];
    if (options.brightness !== undefined) {
      filters.push(`brightness(${options.brightness})`);
    }
    if (options.contrast !== undefined) {
      filters.push(`contrast(${options.contrast})`);
    }
    if (options.saturation !== undefined) {
      filters.push(`saturate(${options.saturation})`);
    }
    if (options.hueRotate !== undefined) {
      filters.push(`hue-rotate(${options.hueRotate}deg)`);
    }
    this.ctx.filter = filters.join(' ');
  }

  /**
   * Reset all filters
   */
  resetFilters() {
    this.ctx.filter = 'none';
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = 'transparent';
  }

  /**
   * Create offscreen canvas for post-processing
   * @param {number} width - Canvas width
   * @param {number} height - Canvas height
   * @returns {HTMLCanvasElement} Offscreen canvas
   */
  createOffscreenCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  /**
   * Apply post-processing effect
   * @param {HTMLCanvasElement} sourceCanvas - Source canvas
   * @param {HTMLCanvasElement} targetCanvas - Target canvas
   * @param {Function} effectFunction - Effect function to apply
   */
  applyPostProcessing(sourceCanvas, targetCanvas, effectFunction) {
    const sourceCtx = sourceCanvas.getContext('2d');
    const targetCtx = targetCanvas.getContext('2d');
    
    // Copy source to target
    targetCtx.drawImage(sourceCanvas, 0, 0);
    
    // Apply effect
    if (effectFunction) {
      effectFunction(targetCtx, targetCanvas.width, targetCanvas.height);
    }
  }
}

/**
 * Blend Mode Utilities
 */
export const BlendModes = {
  NORMAL: 'source-over',
  MULTIPLY: 'multiply',
  SCREEN: 'screen',
  OVERLAY: 'overlay',
  DARKEN: 'darken',
  LIGHTEN: 'lighten',
  COLOR_DODGE: 'color-dodge',
  COLOR_BURN: 'color-burn',
  HARD_LIGHT: 'hard-light',
  SOFT_LIGHT: 'soft-light',
  DIFFERENCE: 'difference',
  EXCLUSION: 'exclusion'
};

