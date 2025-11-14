#version 100
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
}