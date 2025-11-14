#version 100
precision mediump float;

uniform float u_time;
uniform vec3 u_color;

void main() {
  // Animate color using time
  float r = u_color.r + sin(u_time) * 0.3;
  float g = u_color.g + cos(u_time) * 0.3;
  float b = u_color.b + sin(u_time * 1.5) * 0.3;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}