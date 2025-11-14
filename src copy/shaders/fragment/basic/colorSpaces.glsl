#version 100
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
}