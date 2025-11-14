// Code snippets for Animation & Interpolation

export const getAnimationCodeSnippet = (interpolationType) => {
  const snippets = {
    linear: `// Linear Interpolation (LERP)
function lerp(start, end, t) {
  return start + (end - start) * t;
}

// 2D Linear Interpolation
function lerp2D(start, end, t) {
  return {
    x: lerp(start.x, end.x, t),
    y: lerp(start.y, end.y, t)
  };
}

// Usage
const start = { x: 0.1, y: 0.1 };
const end = { x: 0.9, y: 0.9 };
const interpolated = lerp2D(start, end, 0.5); // Middle point

// Animation loop
function animate() {
  const t = (Date.now() - startTime) / duration; // Normalize to [0, 1]
  const currentPos = lerp2D(start, end, t);
  // Update object position
  requestAnimationFrame(animate);
}`,
    easing: `// Easing Functions
function easeIn(t, power = 2) {
  return Math.pow(t, power);
}

function easeOut(t, power = 2) {
  return 1 - Math.pow(1 - t, power);
}

function easeInOut(t, power = 2) {
  if (t < 0.5) {
    return Math.pow(2 * t, power) / 2;
  } else {
    return 1 - Math.pow(2 * (1 - t), power) / 2;
  }
}

// Apply easing to interpolation
function easedLerp(start, end, t, easingType, power) {
  let easedT;
  
  switch(easingType) {
    case 'easeIn':
      easedT = easeIn(t, power);
      break;
    case 'easeOut':
      easedT = easeOut(t, power);
      break;
    case 'easeInOut':
      easedT = easeInOut(t, power);
      break;
    default:
      easedT = t;
  }
  
  return lerp(start, end, easedT);
}

// Usage
const value = easedLerp(0, 100, 0.5, 'easeOut', 2);`,
    bezierEasing: `// Bezier Easing (Cubic Bezier)
function bezierEasing(t, p1, p2) {
  // Cubic Bezier with endpoints (0,0) and (1,1)
  const t2 = t * t;
  const t3 = t2 * t;
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  
  return 3 * mt2 * t * p1.y + 
         3 * mt * t2 * p2.y + 
         t3;
}

// Apply Bezier easing
function bezierLerp(start, end, t, p1, p2) {
  const easedT = bezierEasing(t, p1, p2);
  return lerp(start, end, easedT);
}

// Usage
const p1 = { x: 0.25, y: 0.1 };
const p2 = { x: 0.25, y: 1.0 };
const value = bezierLerp(0, 100, 0.5, p1, p2);

// CSS equivalent: cubic-bezier(0.25, 0.1, 0.25, 1.0)`,
    slerp: `// Spherical Linear Interpolation (SLERP)
function slerp(start, end, t) {
  // Normalize vectors
  const normalize = (v) => {
    const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    return len > 0 
      ? { x: v.x / len, y: v.y / len, z: v.z / len }
      : v;
  };
  
  const v0 = normalize(start);
  const v1 = normalize(end);
  
  // Calculate dot product
  let dot = v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
  dot = Math.max(-1, Math.min(1, dot)); // Clamp
  
  // Calculate angle
  const theta = Math.acos(dot);
  const sinTheta = Math.sin(theta);
  
  if (Math.abs(sinTheta) < 1e-6) {
    // Vectors parallel, use linear interpolation
    return {
      x: lerp(v0.x, v1.x, t),
      y: lerp(v0.y, v1.y, t),
      z: lerp(v0.z, v1.z, t)
    };
  }
  
  // SLERP formula
  const w0 = Math.sin((1 - t) * theta) / sinTheta;
  const w1 = Math.sin(t * theta) / sinTheta;
  
  return {
    x: w0 * v0.x + w1 * v1.x,
    y: w0 * v0.y + w1 * v1.y,
    z: w0 * v0.z + w1 * v1.z
  };
}

// Usage for quaternion rotation
const q1 = { w: 1, x: 0, y: 0, z: 0 };
const q2 = { w: 0, x: 0, y: 1, z: 0 };
const interpolated = slerp(q1, q2, 0.5);`,
    keyframes: `// Keyframe Animation
function interpolateKeyframes(keyframes, t, interpolation = 'linear') {
  // Sort keyframes by time
  const sorted = [...keyframes].sort((a, b) => a.time - b.time);
  
  // Handle boundaries
  if (t <= sorted[0].time) return sorted[0].value;
  if (t >= sorted[sorted.length - 1].time) {
    return sorted[sorted.length - 1].value;
  }
  
  // Find surrounding keyframes
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
}

// Usage
const keyframes = [
  { time: 0, value: 0 },
  { time: 0.5, value: 100 },
  { time: 1.0, value: 50 }
];

const value = interpolateKeyframes(keyframes, 0.25, 'easeOut');`,
    path: `// Path Animation
function interpolatePath(points, t, pathType = 'linear') {
  if (pathType === 'linear') {
    const segmentLength = 1 / (points.length - 1);
    const segmentIndex = Math.floor(t / segmentLength);
    const localT = (t % segmentLength) / segmentLength;
    const clampedIndex = Math.min(segmentIndex, points.length - 2);
    
    return lerp2D(points[clampedIndex], points[clampedIndex + 1], localT);
  } else if (pathType === 'bezier') {
    // Cubic Bezier through points
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
      x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * localT + 
                (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + 
                (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
      y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * localT + 
                (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + 
                (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3)
    };
  }
  
  return points[0];
}

// Usage
const path = [
  { x: 0.1, y: 0.5 },
  { x: 0.3, y: 0.8 },
  { x: 0.7, y: 0.2 },
  { x: 0.9, y: 0.6 }
];

const position = interpolatePath(path, 0.5, 'catmullrom');`
  };

  return snippets[interpolationType] || null;
};

