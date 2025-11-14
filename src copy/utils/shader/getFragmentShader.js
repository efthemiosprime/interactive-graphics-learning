export const getFragmentShader = (shaderLevel, shaderConcept, useImageTexture) => {
  if (shaderLevel === 'basic') {
    switch (shaderConcept) {
      case 'color':
        return `#version 100
precision mediump float;

uniform vec3 u_color;

void main() {
  gl_FragColor = vec4(u_color, 1.0);
}`;

      case 'uv':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_uvScale;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv *= u_uvScale;
  
  // Create a gradient using UV coordinates
  vec3 color = vec3(uv.x, uv.y, 0.5);
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'time':
        return `#version 100
precision mediump float;

uniform float u_time;
uniform vec3 u_color;

void main() {
  // Animate color using time
  float r = u_color.r + sin(u_time) * 0.3;
  float g = u_color.g + cos(u_time) * 0.3;
  float b = u_color.b + sin(u_time * 1.5) * 0.3;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}`;

      case 'gradients':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_gradientType; // 0 = linear, 1 = radial
uniform vec3 u_gradientStartColor;
uniform vec3 u_gradientEndColor;
uniform float u_gradientAngle;
uniform vec2 u_gradientCenter;
uniform float u_gradientRadius;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color;
  
  if (u_gradientType == 0) {
  // Linear gradient
  vec2 dir = vec2(cos(u_gradientAngle), sin(u_gradientAngle));
  float t = dot(uv - 0.5, dir) + 0.5;
  t = clamp(t, 0.0, 1.0);
  color = mix(u_gradientStartColor, u_gradientEndColor, t);
} else {
  // Radial gradient
  float dist = length(uv - u_gradientCenter);
  float t = dist / u_gradientRadius;
  t = clamp(t, 0.0, 1.0);
  color = mix(u_gradientStartColor, u_gradientEndColor, t);
}
  
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'shapes':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_shapeType; // 0 = circle, 1 = rectangle, 2 = line
uniform vec2 u_shapeCenter;
uniform vec2 u_shapeSize;
uniform vec3 u_shapeColor;
uniform float u_shapeEdgeSoftness;
uniform float u_lineThickness;
uniform float u_lineAngle;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);
  float shape = 0.0;
  
  if (u_shapeType == 0) {
  // Circle using distance field
  float dist = length(uv - u_shapeCenter);
  float radius = u_shapeSize.x;
  shape = smoothstep(radius + u_shapeEdgeSoftness, radius - u_shapeEdgeSoftness, dist);
} else if (u_shapeType == 1) {
  // Rectangle using step functions
  vec2 halfSize = u_shapeSize * 0.5;
  vec2 d = abs(uv - u_shapeCenter) - halfSize;
  float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  shape = smoothstep(u_shapeEdgeSoftness, -u_shapeEdgeSoftness, dist);
} else {
  // Line using distance to line segment
  vec2 dir = vec2(cos(u_lineAngle), sin(u_lineAngle));
  vec2 toPoint = uv - u_shapeCenter;
  float proj = dot(toPoint, dir);
  vec2 closestPoint = u_shapeCenter + dir * clamp(proj, -u_shapeSize.x, u_shapeSize.x);
  float dist = length(uv - closestPoint);
  shape = smoothstep(u_lineThickness + u_shapeEdgeSoftness, u_lineThickness - u_shapeEdgeSoftness, dist);
}
  
  color = u_shapeColor * shape;
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'colorSpaces':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_colorSpaceMode; // 0 = HSV, 1 = mixing
uniform vec3 u_hsvColor; // h, s, v
uniform int u_colorMixMode; // 0 = additive, 1 = multiply, 2 = screen, 3 = overlay, 4 = subtract
uniform vec3 u_colorMixColor1;
uniform vec3 u_colorMixColor2;
uniform float u_colorMixAmount;

// Convert HSV to RGB
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Additive blending (like light sources)
vec3 additiveBlend(vec3 c1, vec3 c2) {
  return min(c1 + c2, 1.0);
}

// Multiply blending (darkens)
vec3 multiplyBlend(vec3 c1, vec3 c2) {
  return c1 * c2;
}

// Screen blending (lightens)
vec3 screenBlend(vec3 c1, vec3 c2) {
  return 1.0 - (1.0 - c1) * (1.0 - c2);
}

// Overlay blending
vec3 overlayBlend(vec3 c1, vec3 c2) {
  vec3 result;
  result.r = c1.r < 0.5 ? 2.0 * c1.r * c2.r : 1.0 - 2.0 * (1.0 - c1.r) * (1.0 - c2.r);
  result.g = c1.g < 0.5 ? 2.0 * c1.g * c2.g : 1.0 - 2.0 * (1.0 - c1.g) * (1.0 - c2.g);
  result.b = c1.b < 0.5 ? 2.0 * c1.b * c2.b : 1.0 - 2.0 * (1.0 - c1.b) * (1.0 - c2.b);
  return result;
}

// Subtract blending
vec3 subtractBlend(vec3 c1, vec3 c2) {
  return max(c1 - c2, 0.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.0);
  
  if (u_colorSpaceMode == 0) {
  // HSV Color Space
  vec3 hsv = u_hsvColor;
  color = hsv2rgb(hsv);
} else {
  // Color Mixing
  vec3 c1 = u_colorMixColor1;
  vec3 c2 = u_colorMixColor2;
  vec3 mixed;
  
  if (u_colorMixMode == 0) {
    mixed = additiveBlend(c1, c2);
  } else if (u_colorMixMode == 1) {
    mixed = multiplyBlend(c1, c2);
  } else if (u_colorMixMode == 2) {
    mixed = screenBlend(c1, c2);
  } else if (u_colorMixMode == 3) {
    mixed = overlayBlend(c1, c2);
  } else {
    mixed = subtractBlend(c1, c2);
  }
  
  // Blend between original and mixed based on mix amount
  color = mix(c1, mixed, u_colorMixAmount);
}
  
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'mathOperations':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_mathOperation; // 0=add, 1=subtract, 2=multiply, 3=divide, 4=power, 5=modulo, 6=abs, 7=floor, 8=ceil, 9=min, 10=max, 11=clamp, 12=mix
uniform float u_mathValue1;
uniform float u_mathValue2;
uniform float u_mathValue3; // For clamp and mix
uniform int u_useImageTexture; // 0 = use values, 1 = use image
uniform sampler2D u_texture;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float value1 = u_mathValue1;
  float value2 = u_mathValue2;
  float value3 = u_mathValue3;
  
  // If using image texture, sample from texture
  if (u_useImageTexture == 1) {
  vec4 texColor = texture2D(u_texture, uv);
  // Use grayscale value from texture
  float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
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
  float normalized = (result + 2.0) / 4.0; // Map [-2, 2] to [0, 1]
  normalized = clamp(normalized, 0.0, 1.0);
  gl_FragColor = vec4(vec3(normalized), 1.0);
}`;

      case 'coordinateTransformations':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_transformType; // 0 = rotation, 1 = translation, 2 = scaling, 3 = polar
uniform float u_transformAngle; // Rotation angle in radians
uniform vec2 u_transformTranslation; // Translation offset
uniform vec2 u_transformScale; // Scale factors
uniform vec2 u_transformCenter; // Center point for rotation/scaling

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
  // Visualize as color: angle -> hue, radius -> brightness
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

      default:
        return `#version 100
precision mediump float;

uniform vec3 u_color;

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
uniform float u_time;
uniform float u_noiseScale;

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
  uv *= u_noiseScale;
  
  float n = noise(uv + u_time * 0.1);
  gl_FragColor = vec4(vec3(n), 1.0);
}`;

      case 'patterns':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv *= 10.0;
  
  // Create checkerboard pattern
  vec2 grid = floor(uv);
  float pattern = mod(grid.x + grid.y, 2.0);
  
  // Add animation
  pattern = mod(pattern + u_time * 0.5, 2.0);
  
  gl_FragColor = vec4(vec3(pattern), 1.0);
}`;

      case 'distance':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  
  // Distance from center
  float dist = length(uv);
  
  // Create circular pattern
  float circle = smoothstep(0.3, 0.4, dist) - smoothstep(0.4, 0.5, dist);
  
  // Animate
  circle = smoothstep(0.2 + sin(u_time) * 0.1, 0.3, dist) - 
         smoothstep(0.3, 0.4 + cos(u_time) * 0.1, dist);
  
  gl_FragColor = vec4(vec3(circle), 1.0);
}`;

      case 'texture':
        return useImageTexture
          ? `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_textureScale;
uniform vec2 u_textureOffset;
uniform sampler2D u_texture;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // Flip Y coordinate (WebGL has origin at bottom-left, images at top-left)
  uv.y = 1.0 - uv.y;
  
  // Apply texture scale (tiling)
  uv *= u_textureScale;
  
  // Apply texture offset
  uv += u_textureOffset;
  
  // Sample texture at UV coordinates
  vec4 texColor = texture2D(u_texture, uv);
  
  gl_FragColor = texColor;
}`
          : `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_textureScale;
uniform vec2 u_textureOffset;

// Procedural checkerboard texture
vec3 checkerboard(vec2 uv) {
  vec2 grid = floor(uv * u_textureScale);
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
  uv += u_textureOffset;
  
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
uniform float u_time;
uniform float u_blurAmount;
uniform float u_edgeThreshold;
uniform float u_vignetteIntensity;
uniform float u_chromaticAberration;
uniform float u_glitchIntensity;
uniform float u_bloomIntensity;
uniform float u_bloomThreshold;
uniform float u_colorGradingBrightness;
uniform float u_colorGradingContrast;
uniform float u_colorGradingSaturation;
uniform float u_colorGradingTemperature;
uniform float u_colorGradingTint;
uniform float u_aoIntensity;
uniform float u_aoRadius;
uniform float u_aoBias;
uniform int u_effectType;
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
  float radius = u_blurAmount;
  
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
  edge = smoothstep(u_edgeThreshold * 0.5, u_edgeThreshold * 1.5, edge);
  
  return vec3(edge);
}

// Vignette effect
vec3 applyVignette(vec3 color, vec2 uv) {
  vec2 center = vec2(0.5);
  float dist = length(uv - center);
  float vignette = 1.0 - smoothstep(0.3, 0.8, dist) * u_vignetteIntensity;
  return color * vignette;
}

// Chromatic aberration
vec3 applyChromaticAberration(vec2 uv) {
  vec2 center = vec2(0.5);
  vec2 offset = (uv - center) * u_chromaticAberration * 100.0;
  
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
  return color + bloom * u_bloomIntensity;
}

// Color grading effect
vec3 applyColorGrading(vec2 uv) {
  vec3 color = sampleColor(uv, vec2(0.0));
  
  // Brightness adjustment
  color += u_colorGradingBrightness;
  
  // Contrast adjustment
  color = (color - 0.5) * u_colorGradingContrast + 0.5;
  
  // Saturation adjustment
  float gray = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(vec3(gray), color, u_colorGradingSaturation);
  
  // Color temperature (warm/cool)
  // Temperature: positive = warm (more red/yellow), negative = cool (more blue)
  vec3 warm = vec3(1.0, 0.9, 0.7);
  vec3 cool = vec3(0.7, 0.9, 1.0);
  float tempFactor = u_colorGradingTemperature;
  if (tempFactor > 0.0) {
  color = mix(color, color * warm, tempFactor);
} else {
  color = mix(color, color * cool, -tempFactor);
}
  
  // Tint adjustment (green/magenta shift)
  // Tint: positive = magenta, negative = green
  vec3 tintShift = vec3(1.0 + u_colorGradingTint * 0.5, 1.0, 1.0 + u_colorGradingTint * 0.5);
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
  float ringRadius = u_aoRadius * float(ring);
  
  for (int i = 0; i < 8; i++) {
    vec2 sampleDir = sampleDirections[i];
    vec2 sampleOffset = sampleDir * ringRadius;
    
    vec3 sampleCol = sampleColor(uv, sampleOffset);
    float sampleDepth = dot(sampleCol, vec3(0.299, 0.587, 0.114));
    
    // Calculate occlusion: if sample is darker than center, it occludes
    float depthDiff = centerDepth - sampleDepth;
    if (depthDiff > u_aoBias) {
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
  float ao = 1.0 - occlusion * u_aoIntensity;
  
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

      default:
        return `#version 100
precision mediump float;

uniform vec3 u_color;

void main() {
  gl_FragColor = vec4(u_color, 1.0);
}`;
    }
  } else { // advanced
    switch (shaderConcept) {
      case 'lighting':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_lightIntensity;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  
  // Simple Phong-like lighting
  vec3 lightPos = vec3(sin(u_time), cos(u_time), 1.0);
  vec3 normal = normalize(vec3(uv, 1.0));
  
  float diff = max(dot(normal, normalize(lightPos)), 0.0);
  vec3 color = vec3(0.2, 0.3, 0.8) * (0.3 + diff * u_lightIntensity);
  
  gl_FragColor = vec4(color, 1.0);
}`;

      case 'raymarching':
        return `#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

// Distance function for sphere
float sdSphere(vec3 p, float radius) {
  return length(p) - radius;
}

// Simple raymarching
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  
  vec3 ro = vec3(0.0, 0.0, -3.0);
  vec3 rd = normalize(vec3(uv, 1.0));
  
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
        return `#version 100
precision mediump float;

uniform vec3 u_color;

void main() {
  gl_FragColor = vec4(u_color, 1.0);
}`;
    }
  }
};
