#version 100
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
}