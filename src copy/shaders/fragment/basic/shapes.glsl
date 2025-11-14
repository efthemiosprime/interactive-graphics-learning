#version 100
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
}