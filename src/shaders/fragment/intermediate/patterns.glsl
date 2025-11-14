#version 100
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
}