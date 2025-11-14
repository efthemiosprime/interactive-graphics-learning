import { getFragmentShader } from './shaderLoader';

export const getShaderCodeSnippet = (shaderLevel, shaderConcept, state) => {
  // Returns shader code with current values shown in comments
  if (shaderLevel === 'basic') {
    switch (shaderConcept) {
      case 'color':
        return `#version 100
precision mediump float;

uniform vec3 u_color;  // Current: vec3(${state.color.r.toFixed(3)}, ${state.color.g.toFixed(3)}, ${state.color.b.toFixed(3)})

void main() {
  gl_FragColor = vec4(u_color, 1.0);
  // Output: vec4(${state.color.r.toFixed(3)}, ${state.color.g.toFixed(3)}, ${state.color.b.toFixed(3)}, 1.0)
}`;

      case 'uv':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_uvScale;  // Current: ${state.uvScale.toFixed(2)}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv *= u_uvScale;  // Scale: ${state.uvScale.toFixed(2)}
  
  // Create a gradient using UV coordinates
  vec3 color = vec3(uv.x, uv.y, 0.5);
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'time':
        return `#version 100
precision mediump float;

uniform float u_time;  // Current: ${state.time.toFixed(2)}
uniform vec3 u_color;  // Base: vec3(${state.color.r.toFixed(3)}, ${state.color.g.toFixed(3)}, ${state.color.b.toFixed(3)})

void main() {
  // Animate color using time
  float r = u_color.r + sin(u_time) * 0.3;  // Range: ${(state.color.r - 0.3).toFixed(2)} to ${(state.color.r + 0.3).toFixed(2)}
  float g = u_color.g + cos(u_time) * 0.3;  // Range: ${(state.color.g - 0.3).toFixed(2)} to ${(state.color.g + 0.3).toFixed(2)}
  float b = u_color.b + sin(u_time * 1.5) * 0.3;  // Range: ${(state.color.b - 0.3).toFixed(2)} to ${(state.color.b + 0.3).toFixed(2)}
  
  gl_FragColor = vec4(r, g, b, 1.0);
}`;

      case 'gradients':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_gradientType;  // 0 = linear, 1 = radial (Current: ${state.gradientType === 'linear' ? 0 : 1})
uniform vec3 u_gradientStartColor;  // Current: vec3(${state.gradientStartColor.r.toFixed(2)}, ${state.gradientStartColor.g.toFixed(2)}, ${state.gradientStartColor.b.toFixed(2)})
uniform vec3 u_gradientEndColor;  // Current: vec3(${state.gradientEndColor.r.toFixed(2)}, ${state.gradientEndColor.g.toFixed(2)}, ${state.gradientEndColor.b.toFixed(2)})
uniform float u_gradientAngle;  // Current: ${state.gradientAngle.toFixed(2)} radians (${(state.gradientAngle * 180 / Math.PI).toFixed(1)}°)
uniform vec2 u_gradientCenter;  // Current: vec2(${state.gradientCenter.x.toFixed(2)}, ${state.gradientCenter.y.toFixed(2)})
uniform float u_gradientRadius;  // Current: ${state.gradientRadius.toFixed(2)}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color;
  
  if (u_gradientType == 0) {
  // Linear gradient
  vec2 dir = vec2(cos(u_gradientAngle), sin(u_gradientAngle));  // Direction vector
  float t = dot(uv - 0.5, dir) + 0.5;  // Interpolation factor
  t = clamp(t, 0.0, 1.0);
  color = mix(u_gradientStartColor, u_gradientEndColor, t);  // Interpolate colors
} else {
  // Radial gradient
  float dist = length(uv - u_gradientCenter);  // Distance from center
  float t = dist / u_gradientRadius;  // Normalize by radius
  t = clamp(t, 0.0, 1.0);
  color = mix(u_gradientStartColor, u_gradientEndColor, t);  // Interpolate colors
}
  
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'shapes':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_shapeType;  // 0 = circle, 1 = rectangle, 2 = line (Current: ${state.shapeType === 'circle' ? 0 : state.shapeType === 'rectangle' ? 1 : 2})
uniform vec2 u_shapeCenter;  // Current: vec2(${state.shapeCenter.x.toFixed(2)}, ${state.shapeCenter.y.toFixed(2)})
uniform vec2 u_shapeSize;  // Current: vec2(${state.shapeSize.x.toFixed(2)}, ${state.shapeSize.y.toFixed(2)})
uniform vec3 u_shapeColor;  // Current: vec3(${state.shapeColor.r.toFixed(2)}, ${state.shapeColor.g.toFixed(2)}, ${state.shapeColor.b.toFixed(2)})
uniform float u_shapeEdgeSoftness;  // Current: ${state.shapeEdgeSoftness.toFixed(3)}
uniform float u_lineThickness;  // Current: ${state.lineThickness.toFixed(3)}
uniform float u_lineAngle;  // Current: ${state.lineAngle.toFixed(2)} radians (${(state.lineAngle * 180 / Math.PI).toFixed(1)}°)

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);
  float shape = 0.0;
  
  if (u_shapeType == 0) {
  // Circle using distance field
  float dist = length(uv - u_shapeCenter);  // Distance from center: ${state.shapeCenter.x.toFixed(2)}, ${state.shapeCenter.y.toFixed(2)}
  float radius = u_shapeSize.x;  // Radius: ${state.shapeSize.x.toFixed(2)}
  shape = smoothstep(radius + u_shapeEdgeSoftness, radius - u_shapeEdgeSoftness, dist);  // Edge softness: ${state.shapeEdgeSoftness.toFixed(3)}
} else if (u_shapeType == 1) {
  // Rectangle using step functions
  vec2 halfSize = u_shapeSize * 0.5;  // Half size: (${(state.shapeSize.x * 0.5).toFixed(2)}, ${(state.shapeSize.y * 0.5).toFixed(2)})
  vec2 d = abs(uv - u_shapeCenter) - halfSize;
  float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  shape = smoothstep(u_shapeEdgeSoftness, -u_shapeEdgeSoftness, dist);
} else {
  // Line using distance to line segment
    vec2 dir = vec2(cos(u_lineAngle), sin(u_lineAngle));  // Direction: angle ${(state.lineAngle * 180 / Math.PI).toFixed(1)}°
  vec2 toPoint = uv - u_shapeCenter;
  float proj = dot(toPoint, dir);  // Projection onto line direction
  vec2 closestPoint = u_shapeCenter + dir * clamp(proj, -u_shapeSize.x, u_shapeSize.x);  // Clamp to line segment
  float dist = length(uv - closestPoint);  // Distance to line
  shape = smoothstep(u_lineThickness + u_shapeEdgeSoftness, u_lineThickness - u_shapeEdgeSoftness, dist);  // Thickness: ${state.lineThickness.toFixed(3)}
}
  
  color = u_shapeColor * shape;  // Apply shape mask to color
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'colorSpaces':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_colorSpaceMode;  // 0 = HSV, 1 = mixing (Current: ${state.colorSpaceMode === 'hsv' ? 0 : 1})
uniform vec3 u_hsvColor;  // h, s, v (Current: vec3(${state.hsvColor.h.toFixed(2)}, ${state.hsvColor.s.toFixed(2)}, ${state.hsvColor.v.toFixed(2)}))
uniform int u_colorMixMode;  // 0 = additive, 1 = multiply, 2 = screen, 3 = overlay, 4 = subtract (Current: ${state.colorMixMode === 'additive' ? 0 : state.colorMixMode === 'multiply' ? 1 : state.colorMixMode === 'screen' ? 2 : state.colorMixMode === 'overlay' ? 3 : 4})
uniform vec3 u_colorMixColor1;  // Current: vec3(${state.colorMixColor1.r.toFixed(2)}, ${state.colorMixColor1.g.toFixed(2)}, ${state.colorMixColor1.b.toFixed(2)})
uniform vec3 u_colorMixColor2;  // Current: vec3(${state.colorMixColor2.r.toFixed(2)}, ${state.colorMixColor2.g.toFixed(2)}, ${state.colorMixColor2.b.toFixed(2)})
uniform float u_colorMixAmount;  // Current: ${state.colorMixAmount.toFixed(2)}

// Convert HSV to RGB
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Color mixing functions
vec3 additiveBlend(vec3 c1, vec3 c2) { return min(c1 + c2, 1.0); }
vec3 multiplyBlend(vec3 c1, vec3 c2) { return c1 * c2; }
vec3 screenBlend(vec3 c1, vec3 c2) { return 1.0 - (1.0 - c1) * (1.0 - c2); }
vec3 overlayBlend(vec3 c1, vec3 c2) {
  vec3 result;
  result.r = c1.r < 0.5 ? 2.0 * c1.r * c2.r : 1.0 - 2.0 * (1.0 - c1.r) * (1.0 - c2.r);
  result.g = c1.g < 0.5 ? 2.0 * c1.g * c2.g : 1.0 - 2.0 * (1.0 - c1.g) * (1.0 - c2.g);
  result.b = c1.b < 0.5 ? 2.0 * c1.b * c2.b : 1.0 - 2.0 * (1.0 - c1.b) * (1.0 - c2.b);
  return result;
}
vec3 subtractBlend(vec3 c1, vec3 c2) { return max(c1 - c2, 0.0); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);
  
  if (u_colorSpaceMode == 0) {
  // HSV Color Space
  color = hsv2rgb(u_hsvColor);  // Convert HSV to RGB
} else {
  // Color Mixing
  vec3 mixed;
  if (u_colorMixMode == 0) mixed = additiveBlend(u_colorMixColor1, u_colorMixColor2);
  else if (u_colorMixMode == 1) mixed = multiplyBlend(u_colorMixColor1, u_colorMixColor2);
  else if (u_colorMixMode == 2) mixed = screenBlend(u_colorMixColor1, u_colorMixColor2);
  else if (u_colorMixMode == 3) mixed = overlayBlend(u_colorMixColor1, u_colorMixColor2);
  else mixed = subtractBlend(u_colorMixColor1, u_colorMixColor2);
  
  color = mix(u_colorMixColor1, mixed, u_colorMixAmount);  // Blend based on mix amount
}
  
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'coordinateTransformations':
        const transformTypeNames = ['Rotation', 'Translation', 'Scaling', 'Polar Coordinates'];
        const transformTypeMap = { 'rotation': 0, 'translation': 1, 'scaling': 2, 'polar': 3 };
        const transformTypeIndex = transformTypeMap[state.transformType] || 0;
        const angleDeg = (state.transformAngle * 180.0 / Math.PI).toFixed(1);
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_transformType;  // Current: ${transformTypeIndex} (${transformTypeNames[transformTypeIndex]})
uniform float u_transformAngle;  // Current: ${state.transformAngle.toFixed(3)} radians (${angleDeg}°)
uniform vec2 u_transformTranslation;  // Current: (${state.transformTranslation.x.toFixed(2)}, ${state.transformTranslation.y.toFixed(2)})
uniform vec2 u_transformScale;  // Current: (${state.transformScale.x.toFixed(2)}, ${state.transformScale.y.toFixed(2)})
uniform vec2 u_transformCenter;  // Current: (${state.transformCenter.x.toFixed(2)}, ${state.transformCenter.y.toFixed(2)})

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 transformedUV = uv;
  
  if (u_transformType == 0) {
  // Rotation: Rotate UV coordinates around center point
  vec2 centered = uv - u_transformCenter;
  float cosAngle = cos(u_transformAngle);
  float sinAngle = sin(u_transformAngle);
  transformedUV = vec2(
    centered.x * cosAngle - centered.y * sinAngle,
    centered.x * sinAngle + centered.y * cosAngle
  ) + u_transformCenter;
} else if (u_transformType == 1) {
  // Translation: Move UV coordinates
  transformedUV = uv + u_transformTranslation;
} else if (u_transformType == 2) {
  // Scaling: Scale UV coordinates around center point
  vec2 centered = uv - u_transformCenter;
  transformedUV = centered * u_transformScale + u_transformCenter;
} else {
  // Polar coordinates: Convert Cartesian to polar (angle, radius)
  vec2 centered = uv - u_transformCenter;
  float angle = atan(centered.y, centered.x);
  float radius = length(centered);
  transformedUV = vec2(angle / 6.28318 + 0.5, radius * 2.0);
}
  
  // Create a pattern to visualize the transformation
  vec2 pattern = fract(transformedUV * 5.0);
  float checkerboard = mod(floor(pattern.x) + floor(pattern.y), 2.0);
  vec3 color = vec3(checkerboard);
  
  // Add grid lines for better visualization (using smoothstep instead of fwidth for GLSL ES 1.0 compatibility)
  vec2 gridUV = fract(transformedUV * 5.0);
  vec2 gridPos = fract(gridUV);
  float gridLineX = smoothstep(0.48, 0.5, gridPos.x) + smoothstep(0.5, 0.52, gridPos.x);
  float gridLineY = smoothstep(0.48, 0.5, gridPos.y) + smoothstep(0.5, 0.52, gridPos.y);
  float gridLine = clamp(gridLineX + gridLineY, 0.0, 1.0);
  color = mix(color, vec3(0.2), gridLine * 0.8);
  
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'mathOperations':
        const opNames = ['Add', 'Subtract', 'Multiply', 'Divide', 'Power', 'Modulo', 'Absolute', 'Floor', 'Ceiling', 'Minimum', 'Maximum', 'Clamp', 'Mix'];
        const opMap = { 'add': 0, 'subtract': 1, 'multiply': 2, 'divide': 3, 'power': 4, 'modulo': 5, 'abs': 6, 'floor': 7, 'ceil': 8, 'min': 9, 'max': 10, 'clamp': 11, 'mix': 12 };
        const opIndex = opMap[state.mathOperation] || 0;
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_mathOperation;  // Current: ${opIndex} (${opNames[opIndex]})
uniform float u_mathValue1;  // Current: ${state.mathValue1.toFixed(2)}
uniform float u_mathValue2;  // Current: ${state.mathValue2.toFixed(2)}
uniform float u_mathValue3;  // Current: ${state.mathValue3.toFixed(2)} (for clamp/mix)
uniform int u_useImageTexture;  // Current: ${state.useImageForMath ? 1 : 0} (${state.useImageForMath ? 'using image' : 'using values'})
uniform sampler2D u_texture;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float value1 = u_mathValue1;
  float value2 = u_mathValue2;
  float value3 = u_mathValue3;
  
  // If using image texture, sample from texture
  if (u_useImageTexture == 1) {
  vec4 texColor = texture2D(u_texture, uv);
  float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));  // Convert to grayscale
  value1 = gray;
  value2 = gray;
  value3 = gray;
}
  
  float result = 0.0;
  
  if (u_mathOperation == 0) {
  // Add
  result = value1 + value2;
} else if (u_mathOperation == 1) {
  // Subtract
  result = value1 - value2;
} else if (u_mathOperation == 2) {
  // Multiply
  result = value1 * value2;
} else if (u_mathOperation == 3) {
  // Divide
  result = value2 != 0.0 ? value1 / value2 : 0.0;
} else if (u_mathOperation == 4) {
  // Power
  result = pow(value1, value2);
} else if (u_mathOperation == 5) {
  // Modulo
  result = mod(value1, value2);
} else if (u_mathOperation == 6) {
  // Absolute value
  result = abs(value1);
} else if (u_mathOperation == 7) {
  // Floor
  result = floor(value1);
} else if (u_mathOperation == 8) {
  // Ceiling
  result = ceil(value1);
} else if (u_mathOperation == 9) {
  // Minimum
  result = min(value1, value2);
} else if (u_mathOperation == 10) {
  // Maximum
  result = max(value1, value2);
} else if (u_mathOperation == 11) {
  // Clamp
  result = clamp(value1, value2, value3);
} else {
  // Mix (Linear interpolation)
  result = mix(value1, value2, value3);
}
  
  // Visualize result as grayscale (normalize to 0-1 range for display)
  float normalized = (result + 2.0) / 4.0;  // Map [-2, 2] to [0, 1]
  normalized = clamp(normalized, 0.0, 1.0);
  gl_FragColor = vec4(vec3(normalized), 1.0);
}`;

      default:
        return `#version 100
precision mediump float;

uniform vec3 u_color;  // Current: vec3(${state.color.r.toFixed(3)}, ${state.color.g.toFixed(3)}, ${state.color.b.toFixed(3)})

void main() {
  gl_FragColor = vec4(u_color, 1.0);
}`;
    }
  } else if (shaderLevel === 'intermediate') {
    switch (shaderConcept) {
      case 'noise':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;  // Current: ${state.time.toFixed(2)}
uniform float u_noiseScale;  // Current: ${state.noiseScale.toFixed(2)}

// Simple noise function
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv *= u_noiseScale;  // Scale: ${state.noiseScale.toFixed(2)}
  
  float n = noise(uv + u_time * 0.1);  // Time offset: ${(state.time * 0.1).toFixed(2)}
  gl_FragColor = vec4(vec3(n), 1.0);
}`;

      case 'advancedNoise':
        const noiseTypeMap = { 'fractal': 0, 'simplex': 1, 'worley': 2, 'perlin': 3, 'domainWarp': 4 };
        const noiseTypeIndex = noiseTypeMap[state.advancedNoiseType] || 0;
        const noiseTypeName = state.advancedNoiseType || 'fractal';
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;  // Current: ${state.time.toFixed(2)}
uniform float u_noiseScale;  // Current: ${state.noiseScale.toFixed(2)}
uniform int u_noiseType;  // 0=fractal, 1=simplex, 2=worley, 3=perlin, 4=domainWarp (Current: ${noiseTypeIndex} = ${noiseTypeName})
uniform float u_fractalOctaves;  // Current: ${state.fractalOctaves.toFixed(1)}
uniform float u_fractalLacunarity;  // Current: ${state.fractalLacunarity.toFixed(2)}
uniform float u_fractalGain;  // Current: ${state.fractalGain.toFixed(2)}
uniform float u_worleyScale;  // Current: ${state.worleyScale.toFixed(2)}
uniform float u_domainWarpStrength;  // Current: ${state.domainWarpStrength.toFixed(2)}

// Random function
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Gradient function for Perlin noise
vec2 grad(vec2 p) {
  float angle = random(p) * 6.28318;
  return vec2(cos(angle), sin(angle));
}

// Basic noise (used as building block)
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Perlin Noise (gradient noise)
float perlinNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  
  // Get gradients at corners
  vec2 grad00 = grad(i);
  vec2 grad10 = grad(i + vec2(1.0, 0.0));
  vec2 grad01 = grad(i + vec2(0.0, 1.0));
  vec2 grad11 = grad(i + vec2(1.0, 1.0));
  
  // Distance vectors
  vec2 dist00 = f;
  vec2 dist10 = f - vec2(1.0, 0.0);
  vec2 dist01 = f - vec2(0.0, 1.0);
  vec2 dist11 = f - vec2(1.0, 1.0);
  
  // Dot products
  float dot00 = dot(grad00, dist00);
  float dot10 = dot(grad10, dist10);
  float dot01 = dot(grad01, dist01);
  float dot11 = dot(grad11, dist11);
  
  // Smooth interpolation
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  return mix(
    mix(dot00, dot10, u.x),
    mix(dot01, dot11, u.x),
    u.y
  ) * 0.5 + 0.5; // Normalize to [0, 1]
}

// Simplex Noise (simplified 2D version)
float simplexNoise(vec2 st) {
  const float K1 = 0.366025404; // (sqrt(3)-1)/2
  const float K2 = 0.211324865; // (3-sqrt(3))/6
  
  vec2 i = floor(st + (st.x + st.y) * K1);
  vec2 a0 = st - i + (i.x + i.y) * K2;
  
  float m = step(a0.y, a0.x);
  vec2 o1 = vec2(m, 1.0 - m);
  vec2 o2 = vec2(1.0 - m, m);
  
  vec2 a1 = a0 - o1 + K2;
  vec2 a2 = a0 - o2 + 2.0 * K2;
  vec2 a3 = a0 - 1.0 + 3.0 * K2;
  
  vec4 h = max(0.5 - vec4(dot(a0, a0), dot(a1, a1), dot(a2, a2), dot(a3, a3)), 0.0);
  vec4 n = h * h * h * h * vec4(
    dot(a0, grad(i)),
    dot(a1, grad(i + o1)),
    dot(a2, grad(i + o2)),
    dot(a3, grad(i + 1.0))
  );
  
  return dot(n, vec4(70.0)) * 0.5 + 0.5;
}

// Worley Noise (Voronoi/Cellular)
float worleyNoise(vec2 st) {
  vec2 i_st = floor(st);
  vec2 f_st = fract(st);
  
  float min_dist = 1.0;
  
  // Check neighboring cells
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 point = random(i_st + neighbor) * vec2(1.0) + neighbor;
      vec2 diff = neighbor + point - f_st;
      float dist = length(diff);
      min_dist = min(min_dist, dist);
    }
  }
  
  return min_dist;
}

// Fractal Noise (multiple octaves)
float fractalNoise(vec2 st) {
  float value = 0.0;
  float amplitude = 1.0;
  float frequency = 1.0;
  float maxValue = 0.0;
  
  // Use fixed loop bounds (GLSL ES 1.0 requires constant loop bounds)
  float octaveCount = clamp(u_fractalOctaves, 1.0, 8.0);
  
  for (int i = 0; i < 8; i++) {
    if (float(i) >= octaveCount) break;
    value += noise(st * frequency) * amplitude;  // Each octave adds detail
    maxValue += amplitude;
    amplitude *= u_fractalGain;  // Gain: ${state.fractalGain.toFixed(2)}
    frequency *= u_fractalLacunarity;  // Lacunarity: ${state.fractalLacunarity.toFixed(2)}
  }
  
  return maxValue > 0.0 ? value / maxValue : 0.0;
}

// Domain Warping (distorting noise with noise)
vec2 domainWarp(vec2 st) {
  float n1 = noise(st);
  float n2 = noise(st + vec2(5.2, 1.3));
  return st + vec2(n1, n2) * u_domainWarpStrength;  // Warp strength: ${state.domainWarpStrength.toFixed(2)}
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv *= u_noiseScale;  // Scale: ${state.noiseScale.toFixed(2)}
  
  float result = 0.0;
  
  if (u_noiseType == 0) {
    // Fractal Noise - ${state.fractalOctaves.toFixed(1)} octaves
    result = fractalNoise(uv + u_time * 0.1);
  } else if (u_noiseType == 1) {
    // Simplex Noise
    result = simplexNoise(uv * 2.0 + u_time * 0.1);
  } else if (u_noiseType == 2) {
    // Worley Noise - Scale: ${state.worleyScale.toFixed(2)}
    result = worleyNoise(uv * u_worleyScale);
  } else if (u_noiseType == 3) {
    // Perlin Noise
    result = perlinNoise(uv * 2.0 + u_time * 0.1);
  } else {
    // Domain Warping - Strength: ${state.domainWarpStrength.toFixed(2)}
    vec2 warpedUV = domainWarp(uv + u_time * 0.05);
    result = noise(warpedUV * 3.0);
  }
  
  gl_FragColor = vec4(vec3(result), 1.0);
}`;

      case 'patterns':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;  // Current: ${state.time.toFixed(2)}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv *= 10.0;
  
  // Create checkerboard pattern
  vec2 grid = floor(uv);
  float pattern = mod(grid.x + grid.y, 2.0);
  
  // Add animation
  pattern = mod(pattern + u_time * 0.5, 2.0);  // Time factor: ${(state.time * 0.5).toFixed(2)}
  
  gl_FragColor = vec4(vec3(pattern), 1.0);
}`;

      case 'distance':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;  // Current: ${state.time.toFixed(2)}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  
  // Distance from center
  float dist = length(uv);
  
  // Create circular pattern
  float circle = smoothstep(0.3, 0.4, dist) - smoothstep(0.4, 0.5, dist);
  
  // Animate
  float innerRadius = 0.2 + sin(u_time) * 0.1;  // Current: ${(0.2 + Math.sin(state.time) * 0.1).toFixed(3)}
  float outerRadius = 0.4 + cos(u_time) * 0.1;  // Current: ${(0.4 + Math.cos(state.time) * 0.1).toFixed(3)}
  circle = smoothstep(innerRadius, 0.3, dist) - 
         smoothstep(0.3, outerRadius, dist);
  
  gl_FragColor = vec4(vec3(circle), 1.0);
}`;

      case 'displacementMapping':
        const displacementTypeMap = { 'height': 0, 'parallax': 1, 'steepParallax': 2 };
        const displacementTypeIndex = displacementTypeMap[state.displacementType] || 0;
        const displacementTypeName = state.displacementType || 'height';
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;  // Current: ${state.time.toFixed(2)}
uniform int u_displacementType;  // 0=height, 1=parallax, 2=steepParallax (Current: ${displacementTypeIndex} = ${displacementTypeName})
uniform float u_displacementScale;  // Current: ${state.displacementScale.toFixed(2)}
uniform float u_displacementHeight;  // Current: ${state.displacementHeight.toFixed(2)}
uniform int u_useImageTexture;  // ${state.useImageTexture ? '1 (using image)' : '0 (procedural)'}
uniform sampler2D u_texture;

// Simple noise function for procedural height map
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Sample height map (grayscale)
float sampleHeight(vec2 uv) {
  if (u_useImageTexture == 1) {
    vec2 texUV = vec2(uv.x, 1.0 - uv.y);
    vec4 texColor = texture2D(u_texture, texUV);
    return dot(texColor.rgb, vec3(0.299, 0.587, 0.114));  // Grayscale conversion
  } else {
    // Procedural height map using noise
    float n = noise(uv * 5.0 + u_time * 0.1);
    n += noise(uv * 10.0) * 0.5;
    return n;
  }
}

// Height-based displacement
vec2 heightDisplacement(vec2 uv) {
  float height = sampleHeight(uv);
  // Calculate gradient (normal) from height map
  vec2 texelSize = 1.0 / u_resolution;
  float heightL = sampleHeight(uv - vec2(texelSize.x, 0.0));
  float heightR = sampleHeight(uv + vec2(texelSize.x, 0.0));
  float heightD = sampleHeight(uv - vec2(0.0, texelSize.y));
  float heightU = sampleHeight(uv + vec2(0.0, texelSize.y));
  
  vec2 normal = normalize(vec2(heightL - heightR, heightD - heightU));
  return uv + normal * height * u_displacementHeight * u_displacementScale;  // Scale: ${state.displacementScale.toFixed(2)}, Height: ${state.displacementHeight.toFixed(2)}
}

// Parallax mapping
vec2 parallaxMapping(vec2 uv, vec2 viewDir) {
  float height = sampleHeight(uv);
  vec2 parallaxOffset = viewDir.xy * height * u_displacementHeight * u_displacementScale;
  return uv - parallaxOffset;
}

// Steep parallax mapping (with ${8} layers)
vec2 steepParallaxMapping(vec2 uv, vec2 viewDir) {
  const int numLayers = 8;
  float layerDepth = 1.0 / float(numLayers);
  float currentLayerDepth = 0.0;
  
  vec2 P = viewDir.xy * u_displacementHeight * u_displacementScale;
  vec2 deltaUV = P / float(numLayers);
  
  vec2 currentUV = uv;
  float currentDepth = sampleHeight(currentUV);
  
  // Ray march through height layers
  for (int i = 0; i < 8; i++) {
    currentLayerDepth += layerDepth;
    currentUV -= deltaUV;
    currentDepth = sampleHeight(currentUV);
    
    if (currentDepth < currentLayerDepth) break;
  }
  
  // Interpolate between layers
  vec2 prevUV = currentUV + deltaUV;
  float prevDepth = sampleHeight(prevUV) - (currentLayerDepth - layerDepth);
  float nextDepth = currentDepth - currentLayerDepth;
  
  float weight = nextDepth / (nextDepth - prevDepth);
  return mix(currentUV, prevUV, weight);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 viewDir = normalize(vec2(0.5, 0.5) - uv);
  
  vec2 displacedUV = uv;
  
  if (u_displacementType == 0) {
    // Height-based displacement
    displacedUV = heightDisplacement(uv);
  } else if (u_displacementType == 1) {
    // Parallax mapping
    displacedUV = parallaxMapping(uv, viewDir);
  } else {
    // Steep parallax mapping
    displacedUV = steepParallaxMapping(uv, viewDir);
  }
  
  displacedUV = clamp(displacedUV, 0.0, 1.0);
  
  // Sample color at displaced UV
  vec3 color;
  if (u_useImageTexture == 1) {
    vec2 texUV = vec2(displacedUV.x, 1.0 - displacedUV.y);
    color = texture2D(u_texture, texUV).rgb;
  } else {
    float pattern = sampleHeight(displacedUV);
    color = vec3(pattern);
  }
  
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'texture':
        return state.useImageTexture
          ? `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_textureScale;  // Current: ${state.textureScale.toFixed(2)}
uniform vec2 u_textureOffset;  // Current: vec2(${state.textureOffset.x.toFixed(2)}, ${state.textureOffset.y.toFixed(2)})
uniform sampler2D u_texture;  // Image texture sampler

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // Flip Y coordinate (WebGL has origin at bottom-left, images at top-left)
  uv.y = 1.0 - uv.y;
  
  // Apply texture scale (tiling)
  uv *= u_textureScale;  // Scale: ${state.textureScale.toFixed(2)}
  
  // Apply texture offset
  uv += u_textureOffset;  // Offset: (${state.textureOffset.x.toFixed(2)}, ${state.textureOffset.y.toFixed(2)})
  
  // Sample texture at UV coordinates
  vec4 texColor = texture2D(u_texture, uv);
  
  gl_FragColor = texColor;
}`
          : `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_textureScale;  // Current: ${state.textureScale.toFixed(2)}
uniform vec2 u_textureOffset;  // Current: vec2(${state.textureOffset.x.toFixed(2)}, ${state.textureOffset.y.toFixed(2)})

// Procedural checkerboard texture
vec3 checkerboard(vec2 uv) {
  vec2 grid = floor(uv * u_textureScale);  // Scale: ${state.textureScale.toFixed(2)}
  float pattern = mod(grid.x + grid.y, 2.0);
  return vec3(pattern);
}

// Procedural gradient texture
vec3 gradient(vec2 uv) {
  return vec3(uv.x, uv.y, 0.5);
}

// Procedural noise texture (simplified)
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec3 noiseTexture(vec2 uv) {
  float n = random(uv * u_textureScale);
  return vec3(n);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // Apply texture offset
  uv += u_textureOffset;  // Offset: (${state.textureOffset.x.toFixed(2)}, ${state.textureOffset.y.toFixed(2)})
  
  // Sample procedural texture (checkerboard)
  vec3 color = checkerboard(uv);
  
  // Mix with gradient for visual interest
  vec3 grad = gradient(uv);
  color = mix(color, grad, 0.3);
  
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'postprocess':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;  // Current: ${state.time.toFixed(2)}
uniform float u_blurAmount;  // Current: ${state.blurAmount.toFixed(1)}
uniform float u_edgeThreshold;  // Current: ${state.edgeThreshold.toFixed(2)}
uniform float u_vignetteIntensity;  // Current: ${state.vignetteIntensity.toFixed(2)}
uniform float u_chromaticAberration;  // Current: ${state.chromaticAberration.toFixed(3)}
uniform float u_glitchIntensity;  // Current: ${state.glitchIntensity.toFixed(2)}
uniform float u_bloomIntensity;  // Current: ${state.bloomIntensity.toFixed(2)}
uniform float u_bloomThreshold;  // Current: ${state.bloomThreshold.toFixed(2)}
uniform float u_colorGradingBrightness;  // Current: ${state.colorGradingBrightness.toFixed(2)}
uniform float u_colorGradingContrast;  // Current: ${state.colorGradingContrast.toFixed(2)}
uniform float u_colorGradingSaturation;  // Current: ${state.colorGradingSaturation.toFixed(2)}
uniform float u_colorGradingTemperature;  // Current: ${state.colorGradingTemperature.toFixed(2)}
uniform float u_colorGradingTint;  // Current: ${state.colorGradingTint.toFixed(2)}
uniform float u_aoIntensity;  // Current: ${state.aoIntensity.toFixed(2)}
uniform float u_aoRadius;  // Current: ${state.aoRadius.toFixed(3)}
uniform float u_aoBias;  // Current: ${state.aoBias.toFixed(3)}
uniform int u_effectType;  // Current: ${state.postProcessType === 'blur' ? 0 : state.postProcessType === 'edge' ? 1 : state.postProcessType === 'vignette' ? 2 : state.postProcessType === 'chromatic' ? 3 : state.postProcessType === 'glitch' ? 4 : state.postProcessType === 'bloom' ? 5 : state.postProcessType === 'colorGrading' ? 6 : 7}
uniform int u_useImageTexture;
uniform sampler2D u_texture;

// Sample color at offset position
vec3 sampleColor(vec2 uv, vec2 offset) {
  vec2 sampleUV = uv + offset / u_resolution;
  sampleUV = clamp(sampleUV, 0.0, 1.0);
  
  if (u_useImageTexture == 1) {
  // Flip Y coordinate (WebGL has origin at bottom-left, images at top-left)
  vec2 texUV = vec2(sampleUV.x, 1.0 - sampleUV.y);
  return texture2D(u_texture, texUV).rgb;
} else {
  // Create a procedural pattern
  vec2 center = vec2(0.5);
  float dist = length((sampleUV - center) * u_resolution);
  float pattern = sin(dist * 0.1 + u_time) * 0.5 + 0.5;
  
  // Add some variation
  float r = pattern;
  float g = pattern * 0.8 + sin(sampleUV.x * 10.0) * 0.1;
  float b = pattern * 0.6 + cos(sampleUV.y * 10.0) * 0.1;
  
  return vec3(r, g, b);
}
}

// Gaussian blur
vec3 blur(vec2 uv) {
  vec3 color = vec3(0.0);
  float total = 0.0;
  float radius = u_blurAmount;  // Radius: ${state.blurAmount.toFixed(1)}
  
  // Use fixed loop bounds (GLSL ES 1.0 requires constant loop bounds)
  // Sample in a 10x10 grid and scale by blur amount
  for (int x = -5; x <= 5; x++) {
  for (int y = -5; y <= 5; y++) {
    vec2 offset = vec2(float(x), float(y)) * radius * 0.2;
    float dist = length(offset);
    float weight = exp(-(dist * dist) / (2.0 * radius * radius));
    color += sampleColor(uv, offset) * weight;
    total += weight;
  }
}
  
  return color / max(total, 0.001);
}

// Edge detection (Sobel operator)
vec3 edgeDetection(vec2 uv) {
  vec2 texelSize = 1.0 / u_resolution;
  float sampleScale = 50.0; // Scale for better edge detection on procedural pattern
  
  // Sample colors in 3x3 grid
  vec3 tl = sampleColor(uv, vec2(-1.0, -1.0) * texelSize * sampleScale);
  vec3 tm = sampleColor(uv, vec2(0.0, -1.0) * texelSize * sampleScale);
  vec3 tr = sampleColor(uv, vec2(1.0, -1.0) * texelSize * sampleScale);
  vec3 ml = sampleColor(uv, vec2(-1.0, 0.0) * texelSize * sampleScale);
  vec3 mm = sampleColor(uv, vec2(0.0, 0.0) * texelSize * sampleScale);
  vec3 mr = sampleColor(uv, vec2(1.0, 0.0) * texelSize * sampleScale);
  vec3 bl = sampleColor(uv, vec2(-1.0, 1.0) * texelSize * sampleScale);
  vec3 bm = sampleColor(uv, vec2(0.0, 1.0) * texelSize * sampleScale);
  vec3 br = sampleColor(uv, vec2(1.0, 1.0) * texelSize * sampleScale);
  
  // Convert to grayscale for edge detection
  float tl_g = dot(tl, vec3(0.299, 0.587, 0.114));
  float tm_g = dot(tm, vec3(0.299, 0.587, 0.114));
  float tr_g = dot(tr, vec3(0.299, 0.587, 0.114));
  float ml_g = dot(ml, vec3(0.299, 0.587, 0.114));
  float mm_g = dot(mm, vec3(0.299, 0.587, 0.114));
  float mr_g = dot(mr, vec3(0.299, 0.587, 0.114));
  float bl_g = dot(bl, vec3(0.299, 0.587, 0.114));
  float bm_g = dot(bm, vec3(0.299, 0.587, 0.114));
  float br_g = dot(br, vec3(0.299, 0.587, 0.114));
  
  // Sobel operator
  float gx = -tl_g - 2.0*tm_g - tr_g + bl_g + 2.0*bm_g + br_g;
  float gy = -tl_g - 2.0*ml_g - bl_g + tr_g + 2.0*mr_g + br_g;
  float edge = length(vec2(gx, gy));
  
  // Normalize and apply threshold - use smoothstep for better visualization
  edge = smoothstep(u_edgeThreshold * 0.5, u_edgeThreshold * 1.5, edge);  // Threshold: ${state.edgeThreshold.toFixed(2)}
  
  return vec3(edge);
}

// Vignette effect
vec3 applyVignette(vec3 color, vec2 uv) {
  vec2 center = vec2(0.5);
  float dist = length(uv - center);
  float vignette = 1.0 - smoothstep(0.3, 0.8, dist) * u_vignetteIntensity;  // Intensity: ${state.vignetteIntensity.toFixed(2)}
  return color * vignette;
}

// Chromatic aberration
vec3 applyChromaticAberration(vec2 uv) {
  vec2 center = vec2(0.5);
  vec2 offset = (uv - center) * u_chromaticAberration * 100.0;  // Amount: ${state.chromaticAberration.toFixed(3)}
  
  float r = length(sampleColor(uv, vec2(offset.x, 0.0) * 10.0));
  float g = length(sampleColor(uv, vec2(0.0, 0.0) * 10.0));
  float b = length(sampleColor(uv, vec2(-offset.x, 0.0) * 10.0));
  
  return vec3(r, g, b);
}

// Bad TV glitch effect
vec3 applyGlitch(vec2 uv) {
  vec3 color = sampleColor(uv, vec2(0.0));
  
  // Vertical wobble/distortion (like old TV)
  float wobble = sin(uv.y * 20.0 + u_time * 3.0) * u_glitchIntensity * 0.02;
  vec2 wobbledUV = uv + vec2(wobble, 0.0);
  color = sampleColor(wobbledUV, vec2(0.0));
  
  // Horizontal scan lines (flickering)
  float scanLineFreq = u_resolution.y * 0.5;
  float scanLine = sin(wobbledUV.y * scanLineFreq + u_time * 10.0);
  scanLine = smoothstep(0.7, 1.0, abs(scanLine)) * u_glitchIntensity * 0.3 + 1.0;
  color *= scanLine;
  
  // Screen tearing - horizontal bars that shift
  float barHeight = 0.02;
  float barY = floor(wobbledUV.y / barHeight);
  float barRandom = fract(sin(barY * 12.9898 + u_time * 5.0) * 43758.5453);
  float barOffset = (barRandom - 0.5) * u_glitchIntensity * 0.15;
  float barChance = step(0.7, barRandom);
  vec2 tornUV = wobbledUV + vec2(barOffset * barChance, 0.0);
  vec3 tornColor = sampleColor(tornUV, vec2(0.0));
  color = mix(color, tornColor, barChance * u_glitchIntensity * 0.5);
  
  // RGB channel separation (color bleeding)
  float rOffset = sin(wobbledUV.y * 15.0 + u_time * 2.0) * u_glitchIntensity * 0.03;
  float bOffset = sin(wobbledUV.y * 15.0 + u_time * 2.0 + 1.0) * u_glitchIntensity * 0.03;
  float r = sampleColor(wobbledUV, vec2(rOffset, 0.0)).r;
  float g = color.g;
  float b = sampleColor(wobbledUV, vec2(bOffset, 0.0)).b;
  color = vec3(r, g, b);
  
  // Static noise (TV static)
  float staticNoise = fract(sin(dot(wobbledUV + u_time * 0.1, vec2(12.9898, 78.233))) * 43758.5453);
  staticNoise = step(0.95, staticNoise) * u_glitchIntensity * 0.4;
  color += vec3(staticNoise);
  
  // Flickering brightness (like bad signal)
  float flicker = sin(u_time * 20.0 + wobbledUV.y * 10.0);
  flicker = smoothstep(0.8, 1.0, flicker) * u_glitchIntensity * 0.2 + 1.0;
  color *= flicker;
  
  // Horizontal interference bars
  float interference = sin(wobbledUV.y * 100.0 + u_time * 15.0);
  interference = smoothstep(0.9, 1.0, abs(interference)) * u_glitchIntensity * 0.3;
  color += vec3(interference);
  
  return clamp(color, 0.0, 1.0);
}

// Bloom effect
vec3 applyBloom(vec2 uv) {
  vec3 color = sampleColor(uv, vec2(0.0));
  
  // Extract bright areas (above threshold)
  float brightness = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 brightColor = step(u_bloomThreshold, brightness) * color;
  
  // Blur the bright areas
  vec3 bloom = vec3(0.0);
  float total = 0.0;
  float radius = 3.0;
  
  // Use fixed loop bounds for GLSL ES 1.0
  for (int x = -3; x <= 3; x++) {
  for (int y = -3; y <= 3; y++) {
    vec2 offset = vec2(float(x), float(y)) / u_resolution;
    float dist = length(vec2(float(x), float(y)));
    float weight = exp(-(dist * dist) / (2.0 * radius * radius));
    
    vec2 sampleUV = uv + offset;
    sampleUV = clamp(sampleUV, 0.0, 1.0);
    
    vec3 sampleCol = sampleColor(sampleUV, vec2(0.0));
    float sampleBrightness = dot(sampleCol, vec3(0.299, 0.587, 0.114));
    vec3 brightSample = step(u_bloomThreshold, sampleBrightness) * sampleCol;
    
    bloom += brightSample * weight;
    total += weight;
  }
}
  
  bloom /= max(total, 0.001);
  
  // Add bloom to original color
  return color + bloom * u_bloomIntensity;  // Intensity: ${state.bloomIntensity.toFixed(2)}, Threshold: ${state.bloomThreshold.toFixed(2)}
}

// Color grading effect
vec3 applyColorGrading(vec2 uv) {
  vec3 color = sampleColor(uv, vec2(0.0));
  
  // Brightness adjustment
  color += u_colorGradingBrightness;  // Brightness: ${state.colorGradingBrightness.toFixed(2)}
  
  // Contrast adjustment
  color = (color - 0.5) * u_colorGradingContrast + 0.5;  // Contrast: ${state.colorGradingContrast.toFixed(2)}
  
  // Saturation adjustment
  float gray = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(vec3(gray), color, u_colorGradingSaturation);  // Saturation: ${state.colorGradingSaturation.toFixed(2)}
  
  // Color temperature (warm/cool)
  vec3 warm = vec3(1.0, 0.9, 0.7);
  vec3 cool = vec3(0.7, 0.9, 1.0);
  float tempFactor = u_colorGradingTemperature;  // Temperature: ${state.colorGradingTemperature.toFixed(2)}
  if (tempFactor > 0.0) {
  color = mix(color, color * warm, tempFactor);
} else {
  color = mix(color, color * cool, -tempFactor);
}
  
  // Tint adjustment (green/magenta shift)
  vec3 tintShift = vec3(1.0 + u_colorGradingTint * 0.5, 1.0, 1.0 + u_colorGradingTint * 0.5);  // Tint: ${state.colorGradingTint.toFixed(2)}
  if (u_colorGradingTint < 0.0) {
  tintShift = vec3(1.0, 1.0 + abs(u_colorGradingTint) * 0.5, 1.0);
}
  color *= tintShift;
  
  return clamp(color, 0.0, 1.0);
}

// Ambient Occlusion effect (Screen-Space AO)
vec3 applyAmbientOcclusion(vec2 uv) {
  vec3 color = sampleColor(uv, vec2(0.0));
  
  // Get center depth/brightness
  float centerDepth = dot(color, vec3(0.299, 0.587, 0.114));
  
  // Sample directions for AO (8 directions around the pixel)
  vec2 sampleDirections[8];
  sampleDirections[0] = vec2(1.0, 0.0);
  sampleDirections[1] = vec2(0.707, 0.707);
  sampleDirections[2] = vec2(0.0, 1.0);
  sampleDirections[3] = vec2(-0.707, 0.707);
  sampleDirections[4] = vec2(-1.0, 0.0);
  sampleDirections[5] = vec2(-0.707, -0.707);
  sampleDirections[6] = vec2(0.0, -1.0);
  sampleDirections[7] = vec2(0.707, -0.707);
  
  float occlusion = 0.0;
  float samples = 0.0;
  
  // Sample in multiple rings for better quality
  for (int ring = 1; ring <= 3; ring++) {
  float ringRadius = u_aoRadius * float(ring);  // Radius: ${state.aoRadius.toFixed(3)}
  
  for (int i = 0; i < 8; i++) {
    vec2 sampleDir = sampleDirections[i];
    vec2 sampleOffset = sampleDir * ringRadius;
    
    vec3 sampleCol = sampleColor(uv, sampleOffset);
    float sampleDepth = dot(sampleCol, vec3(0.299, 0.587, 0.114));
    
    // Calculate occlusion: if sample is darker than center, it occludes
    float depthDiff = centerDepth - sampleDepth;
    if (depthDiff > u_aoBias) {  // Bias: ${state.aoBias.toFixed(3)}
      // More occlusion for larger depth differences
      float occlude = smoothstep(u_aoBias, u_aoBias + 0.1, depthDiff);
      occlusion += occlude;
    }
    
    samples += 1.0;
  }
}
  
  // Normalize occlusion
  occlusion /= samples;
  
  // Apply AO: darken areas with more occlusion
  float ao = 1.0 - occlusion * u_aoIntensity;  // Intensity: ${state.aoIntensity.toFixed(2)}
  
  return color * ao;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = sampleColor(uv, vec2(0.0));
  
  // 0 = blur, 1 = edge, 2 = vignette, 3 = chromatic, 4 = glitch, 5 = bloom, 6 = color grading, 7 = ambient occlusion
  if (u_effectType == 0) {
  color = blur(uv);
} else if (u_effectType == 1) {
  color = edgeDetection(uv);
} else if (u_effectType == 2) {
  color = applyVignette(color, uv);
} else if (u_effectType == 3) {
  color = applyChromaticAberration(uv);
} else if (u_effectType == 4) {
  color = applyGlitch(uv);
} else if (u_effectType == 5) {
  color = applyBloom(uv);
} else if (u_effectType == 6) {
  color = applyColorGrading(uv);
} else if (u_effectType == 7) {
  color = applyAmbientOcclusion(uv);
}
  
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'stylized':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture;
uniform int u_useImageTexture;  // Current: ${(state.useImageForStylized !== undefined ? state.useImageForStylized : state.useImageTexture) ? 1 : 0}

// Stylized/Cartoon parameters
uniform float u_toonBands;          // Current: ${state.toonBands?.toFixed(1) || '4.0'}
uniform float u_edgeThreshold;     // Current: ${state.stylizedEdgeThreshold?.toFixed(3) || '0.1'}
uniform float u_edgeThickness;      // Current: ${state.stylizedEdgeThickness?.toFixed(3) || '0.02'}
uniform float u_colorQuantization;  // Current: ${state.colorQuantization?.toFixed(1) || '8.0'}
uniform float u_rimPower;           // Current: ${state.rimPower?.toFixed(1) || '2.0'}
uniform float u_specularPower;      // Current: ${state.specularPower?.toFixed(1) || '32.0'}
uniform vec3 u_rimColor;            // Current: vec3(${state.rimColor?.r?.toFixed(2) || '0.5'}, ${state.rimColor?.g?.toFixed(2) || '0.7'}, ${state.rimColor?.b?.toFixed(2) || '1.0'})
uniform vec3 u_specularColor;       // Current: vec3(${state.specularColor?.r?.toFixed(2) || '1.0'}, ${state.specularColor?.g?.toFixed(2) || '1.0'}, ${state.specularColor?.b?.toFixed(2) || '1.0'})

// Helper function for edge detection
float getEdge(vec2 uv, vec2 resolution) {
  vec2 texelSize = 1.0 / resolution;
  
  // Sample surrounding pixels
  float center = dot(texture2D(u_texture, uv).rgb, vec3(0.299, 0.587, 0.114));
  float left = dot(texture2D(u_texture, uv + vec2(-texelSize.x, 0.0)).rgb, vec3(0.299, 0.587, 0.114));
  float right = dot(texture2D(u_texture, uv + vec2(texelSize.x, 0.0)).rgb, vec3(0.299, 0.587, 0.114));
  float top = dot(texture2D(u_texture, uv + vec2(0.0, -texelSize.y)).rgb, vec3(0.299, 0.587, 0.114));
  float bottom = dot(texture2D(u_texture, uv + vec2(0.0, texelSize.y)).rgb, vec3(0.299, 0.587, 0.114));
  
  // Calculate gradient magnitude (Sobel-like)
  float gx = abs(right - left);
  float gy = abs(bottom - top);
  float edge = sqrt(gx * gx + gy * gy);
  
  // Threshold and smooth
  return smoothstep(u_edgeThreshold, u_edgeThreshold + u_edgeThickness, edge);
}

// Color quantization
vec3 quantizeColor(vec3 color, float levels) {
  return floor(color * levels) / levels;
}

// Toon/Cel shading - banded lighting
float toonShade(float intensity, float bands) {
  return floor(intensity * bands) / bands;
}

// Rim lighting calculation
float rimLight(vec2 uv, vec2 resolution) {
  vec2 center = vec2(0.5, 0.5);
  vec2 dir = normalize(uv - center);
  vec2 normal = vec2(-dir.y, dir.x); // Perpendicular to radial direction
  
  // Simple rim calculation based on distance from center
  float dist = length(uv - center);
  float rim = 1.0 - smoothstep(0.3, 0.7, dist);
  return pow(rim, u_rimPower);
}

// Specular highlight
float specularHighlight(vec2 uv, vec2 resolution) {
  vec2 center = vec2(0.5, 0.5);
  vec2 lightDir = normalize(vec2(0.5, 0.5) - uv);
  vec2 viewDir = normalize(center - uv);
  vec2 halfDir = normalize(lightDir + viewDir);
  
  // Simple specular calculation
  float spec = pow(max(0.0, dot(halfDir, normalize(uv - center))), u_specularPower);
  return spec;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  vec3 color;
  
  if (u_useImageTexture == 1) {
    // Sample texture
    color = texture2D(u_texture, uv).rgb;
  } else {
    // Procedural pattern for demonstration
    vec2 st = uv * 5.0;
    float pattern = sin(st.x) * sin(st.y);
    color = vec3(pattern * 0.5 + 0.5);
  }
  
  // Edge detection
  float edge = getEdge(uv, u_resolution);
  
  // Color quantization
  color = quantizeColor(color, u_colorQuantization);
  
  // Calculate lighting intensity (grayscale)
  float intensity = dot(color, vec3(0.299, 0.587, 0.114));
  
  // Apply toon shading
  float toonIntensity = toonShade(intensity, u_toonBands);
  color = color * toonIntensity / max(intensity, 0.001);
  
  // Add rim lighting
  float rim = rimLight(uv, u_resolution);
  color = mix(color, u_rimColor, rim * 0.3);
  
  // Add specular highlight
  float spec = specularHighlight(uv, u_resolution);
  color = mix(color, u_specularColor, spec * 0.5);
  
  // Apply edge outline (darken edges)
  color = mix(color, vec3(0.0), edge * 0.8);
  
  gl_FragColor = vec4(color, 1.0);
}`;

      default:
        return getFragmentShader(shaderLevel, shaderConcept, state.useImageTexture || false);
    }
  } else { // advanced
    switch (shaderConcept) {
      case 'lighting':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;  // Current: ${state.time.toFixed(2)}
uniform float u_lightIntensity;  // Current: ${state.lightIntensity.toFixed(2)}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  
  // Simple Phong-like lighting
  vec3 lightPos = vec3(sin(u_time), cos(u_time), 1.0);  // Light position varies with time
  vec3 normal = normalize(vec3(uv, 1.0));
  
  float diff = max(dot(normal, normalize(lightPos)), 0.0);  // Diffuse component
  vec3 color = vec3(0.2, 0.3, 0.8) * (0.3 + diff * u_lightIntensity);  // Intensity: ${state.lightIntensity.toFixed(2)}
  
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'raymarching':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;  // Current: ${state.time.toFixed(2)}

// Distance function for sphere
float sdSphere(vec3 p, float radius) {
  return length(p) - radius;
}

// Simple raymarching
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  
  vec3 ro = vec3(0.0, 0.0, -3.0);  // Ray origin
  vec3 rd = normalize(vec3(uv, 1.0));  // Ray direction
  
  float t = 0.0;
  for (int i = 0; i < 64; i++) {
  vec3 p = ro + rd * t;
  float d = sdSphere(p, 1.0);
  if (d < 0.01) break;
  t += d;
  if (t > 100.0) break;
}
  
  vec3 color = vec3(1.0 - t * 0.1);
  gl_FragColor = vec4(color, 1.0);
}`;

      default:
        return getFragmentShader(shaderLevel, shaderConcept, state.useImageTexture || false);
    }
  }
};
