#version 100
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
}