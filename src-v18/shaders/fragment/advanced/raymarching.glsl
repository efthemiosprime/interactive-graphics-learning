#version 100
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
}