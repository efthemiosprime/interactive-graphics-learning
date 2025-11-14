#version 100
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
}

