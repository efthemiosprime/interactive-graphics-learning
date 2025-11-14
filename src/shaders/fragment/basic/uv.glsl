#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_uvScale;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv *= u_uvScale;
  
  // Create a gradient using UV coordinates
  vec3 color = vec3(uv.x, uv.y, 0.5);
  gl_FragColor = vec4(color, 1.0);
}