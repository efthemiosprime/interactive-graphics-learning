/**
 * Renderer Module - Drawing Shapes, Sprites, and Text
 * 
 * This module provides:
 * - Shape drawing (rectangles, circles, lines, polygons)
 * - Sprite rendering
 * - Text rendering with styling
 * - Transform matrix management
 * - Batch rendering optimization
 */

export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.transformStack = [];
  }

  /**
   * Save current transform state
   */
  save() {
    this.ctx.save();
    this.transformStack.push({
      x: 0,
      y: 0,
      rotation: 0,
      scaleX: 1,
      scaleY: 1
    });
  }

  /**
   * Restore previous transform state
   */
  restore() {
    this.ctx.restore();
    this.transformStack.pop();
  }

  /**
   * Set transform (translation, rotation, scale)
   */
  setTransform(x, y, rotation = 0, scaleX = 1, scaleY = 1) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(rotation);
    this.ctx.scale(scaleX, scaleY);
  }

  /**
   * Reset transform
   */
  resetTransform() {
    this.ctx.restore();
  }

  /**
   * Draw filled rectangle
   */
  fillRect(x, y, width, height, color = '#ffffff') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  /**
   * Draw stroked rectangle
   */
  strokeRect(x, y, width, height, color = '#ffffff', lineWidth = 1) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeRect(x, y, width, height);
  }

  /**
   * Draw filled circle
   */
  fillCircle(x, y, radius, color = '#ffffff') {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  /**
   * Draw stroked circle
   */
  strokeCircle(x, y, radius, color = '#ffffff', lineWidth = 1) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  /**
   * Draw line
   */
  drawLine(x1, y1, x2, y2, color = '#ffffff', lineWidth = 1) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  /**
   * Draw polygon
   */
  drawPolygon(points, color = '#ffffff', filled = true) {
    if (points.length < 3) return;

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    
    this.ctx.closePath();

    if (filled) {
      this.ctx.fillStyle = color;
      this.ctx.fill();
    } else {
      this.ctx.strokeStyle = color;
      this.ctx.stroke();
    }
  }

  /**
   * Draw sprite/image
   */
  drawSprite(image, x, y, width, height, sourceX = 0, sourceY = 0, sourceWidth = null, sourceHeight = null) {
    if (!image) return;

    if (sourceWidth && sourceHeight) {
      // Draw from sprite sheet
      this.ctx.drawImage(
        image,
        sourceX, sourceY, sourceWidth, sourceHeight,
        x, y, width, height
      );
    } else {
      // Draw full image
      this.ctx.drawImage(image, x, y, width, height);
    }
  }

  /**
   * Draw text
   */
  drawText(text, x, y, options = {}) {
    const {
      font = '16px sans-serif',
      color = '#ffffff',
      align = 'left',
      baseline = 'top',
      maxWidth = null
    } = options;

    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;

    if (maxWidth) {
      this.ctx.fillText(text, x, y, maxWidth);
    } else {
      this.ctx.fillText(text, x, y);
    }
  }

  /**
   * Clear canvas
   */
  clear(color = '#000000') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

