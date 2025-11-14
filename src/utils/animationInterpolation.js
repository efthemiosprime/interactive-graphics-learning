// Utility functions for Animation & Interpolation calculations

// Linear interpolation
export const lerp = (start, end, t) => {
  return start + (end - start) * t;
};

// Linear interpolation for 2D points
export const lerp2D = (start, end, t) => {
  return {
    x: lerp(start.x, end.x, t),
    y: lerp(start.y, end.y, t)
  };
};

// Easing functions
export const easeIn = (t, power = 2) => {
  return Math.pow(t, power);
};

export const easeOut = (t, power = 2) => {
  return 1 - Math.pow(1 - t, power);
};

export const easeInOut = (t, power = 2) => {
  return t < 0.5
    ? Math.pow(2 * t, power) / 2
    : 1 - Math.pow(2 * (1 - t), power) / 2;
};

export const easeOutIn = (t, power = 2) => {
  return t < 0.5
    ? (1 - Math.pow(1 - 2 * t, power)) / 2
    : (1 + Math.pow(2 * t - 1, power)) / 2;
};

// Bezier easing (cubic Bezier)
export const bezierEasing = (t, p1, p2) => {
  // Cubic Bezier with endpoints (0,0) and (1,1) and control points p1, p2
  const t2 = t * t;
  const t3 = t2 * t;
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  
  return 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3;
};

// Spherical linear interpolation (SLERP) for unit vectors
export const slerp = (start, end, t) => {
  // Normalize vectors
  const normalize = (v) => {
    const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return len > 0 ? { x: v.x / len, y: v.y / len, z: v.z / len } : v;
  };
  
  const v0 = normalize(start);
  const v1 = normalize(end);
  
  // Calculate dot product
  let dot = v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
  
  // Clamp dot product to avoid numerical errors
  dot = Math.max(-1, Math.min(1, dot));
  
  // Calculate angle
  const theta = Math.acos(dot);
  const sinTheta = Math.sin(theta);
  
  if (Math.abs(sinTheta) < 1e-6) {
    // Vectors are parallel, use linear interpolation
    return lerp2D({ x: v0.x, y: v0.y }, { x: v1.x, y: v1.y }, t);
  }
  
  // SLERP formula
  const w0 = Math.sin((1 - t) * theta) / sinTheta;
  const w1 = Math.sin(t * theta) / sinTheta;
  
  return {
    x: w0 * v0.x + w1 * v1.x,
    y: w0 * v0.y + w1 * v1.y,
    z: w0 * v0.z + w1 * v1.z
  };
};

// Keyframe interpolation
export const interpolateKeyframes = (keyframes, t, interpolation = 'linear') => {
  // Sort keyframes by time
  const sorted = [...keyframes].sort((a, b) => a.time - b.time);
  
  // Find surrounding keyframes
  if (t <= sorted[0].time) return sorted[0].value;
  if (t >= sorted[sorted.length - 1].time) return sorted[sorted.length - 1].value;
  
  for (let i = 0; i < sorted.length - 1; i++) {
    if (t >= sorted[i].time && t <= sorted[i + 1].time) {
      const k0 = sorted[i];
      const k1 = sorted[i + 1];
      const localT = (t - k0.time) / (k1.time - k0.time);
      
      // Apply easing
      let easedT = localT;
      if (interpolation === 'easeIn') {
        easedT = easeIn(localT);
      } else if (interpolation === 'easeOut') {
        easedT = easeOut(localT);
      } else if (interpolation === 'easeInOut') {
        easedT = easeInOut(localT);
      }
      
      return lerp(k0.value, k1.value, easedT);
    }
  }
  
  return sorted[sorted.length - 1].value;
};

// Path interpolation
export const interpolatePath = (points, t, pathType = 'linear') => {
  if (pathType === 'linear') {
    const segmentLength = 1 / (points.length - 1);
    const segmentIndex = Math.floor(t / segmentLength);
    const localT = (t % segmentLength) / segmentLength;
    const clampedIndex = Math.min(segmentIndex, points.length - 2);
    
    return lerp2D(points[clampedIndex], points[clampedIndex + 1], localT);
  } else if (pathType === 'bezier') {
    // Use Bezier curve through all points
    // Simplified: use first 4 points for cubic Bezier
    if (points.length < 4) return points[0];
    
    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    
    const p0 = points[0];
    const p1 = points[1];
    const p2 = points[2];
    const p3 = points[3];
    
    return {
      x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
      y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y
    };
  } else if (pathType === 'catmullrom') {
    // Catmull-Rom spline
    if (points.length < 4) return points[0];
    
    const segmentLength = 1 / (points.length - 3);
    const segmentIndex = Math.floor(t / segmentLength);
    const localT = (t % segmentLength) / segmentLength;
    const clampedIndex = Math.min(segmentIndex, points.length - 4);
    
    const p0 = points[clampedIndex];
    const p1 = points[clampedIndex + 1];
    const p2 = points[clampedIndex + 2];
    const p3 = points[clampedIndex + 3];
    
    const t2 = localT * localT;
    const t3 = t2 * localT;
    
    return {
      x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * localT + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
      y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * localT + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
    };
  }
  
  return points[0];
};

// Drawing functions
export const drawLinearInterpolation = (ctx, start, end, t, toCanvasX, toCanvasY) => {
  // Draw line
  ctx.strokeStyle = '#c4b5fd';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(toCanvasX(start.x), toCanvasY(start.y));
  ctx.lineTo(toCanvasX(end.x), toCanvasY(end.y));
  ctx.stroke();
  
  // Draw start point
  ctx.fillStyle = '#8b5cf6';
  ctx.beginPath();
  ctx.arc(toCanvasX(start.x), toCanvasY(start.y), 6, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw end point
  ctx.fillStyle = '#6366f1';
  ctx.beginPath();
  ctx.arc(toCanvasX(end.x), toCanvasY(end.y), 6, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw interpolated point
  const interpolated = lerp2D(start, end, t);
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(toCanvasX(interpolated.x), toCanvasY(interpolated.y), 8, 0, Math.PI * 2);
  ctx.fill();
};

export const drawEasingFunction = (ctx, easingType, power, t, toCanvasX, toCanvasY, drawWidth, drawHeight, padding) => {
  // Draw easing curve
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  for (let i = 0; i <= 100; i++) {
    const localT = i / 100;
    let easedT;
    
    if (easingType === 'easeIn') {
      easedT = easeIn(localT, power);
    } else if (easingType === 'easeOut') {
      easedT = easeOut(localT, power);
    } else if (easingType === 'easeInOut') {
      easedT = easeInOut(localT, power);
    } else {
      easedT = easeOutIn(localT, power);
    }
    
    const x = toCanvasX(localT);
    const y = toCanvasY(easedT);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
  
  // Draw current point
  let currentEasedT;
  if (easingType === 'easeIn') {
    currentEasedT = easeIn(t, power);
  } else if (easingType === 'easeOut') {
    currentEasedT = easeOut(t, power);
  } else if (easingType === 'easeInOut') {
    currentEasedT = easeInOut(t, power);
  } else {
    currentEasedT = easeOutIn(t, power);
  }
  
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(toCanvasX(t), toCanvasY(currentEasedT), 8, 0, Math.PI * 2);
  ctx.fill();
};

export const drawBezierEasing = (ctx, points, t, toCanvasX, toCanvasY, drawWidth, drawHeight, padding) => {
  // Draw Bezier curve
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  for (let i = 0; i <= 100; i++) {
    const localT = i / 100;
    const easedT = bezierEasing(localT, points[0], points[1]);
    
    const x = toCanvasX(localT);
    const y = toCanvasY(easedT);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
  
  // Draw control points
  ctx.fillStyle = '#8b5cf6';
  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(toCanvasX(point.x), toCanvasY(point.y), 6, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Draw current point
  const currentEasedT = bezierEasing(t, points[0], points[1]);
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(toCanvasX(t), toCanvasY(currentEasedT), 8, 0, Math.PI * 2);
  ctx.fill();
};

export const drawSlerp = (ctx, start, end, t, toCanvasX, toCanvasY, drawWidth, drawHeight, padding) => {
  // Draw unit circle
  const centerX = drawWidth / 2 + padding;
  const centerY = drawHeight / 2 + padding;
  const radius = Math.min(drawWidth, drawHeight) / 2 - 20;
  
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  // Normalize vectors
  const normalize = (v) => {
    const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return len > 0 ? { x: v.x / len, y: v.y / len, z: v.z / len } : v;
  };
  
  const v0 = normalize(start);
  const v1 = normalize(end);
  
  // Draw start vector
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + v0.x * radius, centerY - v0.y * radius);
  ctx.stroke();
  
  // Draw end vector
  ctx.strokeStyle = '#6366f1';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + v1.x * radius, centerY - v1.y * radius);
  ctx.stroke();
  
  // Draw interpolated vector
  const interpolated = slerp(start, end, t);
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + interpolated.x * radius, centerY - interpolated.y * radius);
  ctx.stroke();
  
  // Draw point
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(centerX + interpolated.x * radius, centerY - interpolated.y * radius, 8, 0, Math.PI * 2);
  ctx.fill();
};

export const drawKeyframeAnimation = (ctx, keyframes, interpolation, t, toCanvasX, toCanvasY, drawWidth, drawHeight, padding) => {
  // Sort keyframes
  const sorted = [...keyframes].sort((a, b) => a.time - b.time);
  
  // Draw keyframe points
  ctx.fillStyle = '#8b5cf6';
  sorted.forEach((kf) => {
    ctx.beginPath();
    ctx.arc(toCanvasX(kf.time), toCanvasY(kf.value), 6, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Draw interpolation curve
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  for (let i = 0; i <= 100; i++) {
    const localT = i / 100;
    const value = interpolateKeyframes(sorted, localT, interpolation);
    
    const x = toCanvasX(localT);
    const y = toCanvasY(value);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
  
  // Draw current point
  const currentValue = interpolateKeyframes(sorted, t, interpolation);
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(toCanvasX(t), toCanvasY(currentValue), 8, 0, Math.PI * 2);
  ctx.fill();
};

export const drawPathAnimation = (ctx, points, pathType, t, toCanvasX, toCanvasY) => {
  // Draw path
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  
  if (pathType === 'linear') {
    ctx.beginPath();
    points.forEach((point, index) => {
      const x = toCanvasX(point.x);
      const y = toCanvasY(point.y);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  } else if (pathType === 'bezier') {
    // Draw Bezier curve
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const localT = i / 100;
      const point = interpolatePath(points, localT, 'bezier');
      const x = toCanvasX(point.x);
      const y = toCanvasY(point.y);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  } else if (pathType === 'catmullrom') {
    // Draw Catmull-Rom spline
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const localT = i / 100;
      const point = interpolatePath(points, localT, 'catmullrom');
      const x = toCanvasX(point.x);
      const y = toCanvasY(point.y);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }
  
  // Draw control points
  ctx.fillStyle = '#8b5cf6';
  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(toCanvasX(point.x), toCanvasY(point.y), 6, 0, Math.PI * 2);
    ctx.fill();
  });
  
  // Draw current position
  const currentPoint = interpolatePath(points, t, pathType);
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(toCanvasX(currentPoint.x), toCanvasY(currentPoint.y), 8, 0, Math.PI * 2);
  ctx.fill();
};

