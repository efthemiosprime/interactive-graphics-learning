#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_transformType; // 0 = rotation, 1 = translation, 2 = scaling, 3 = polar
uniform float u_transformAngle; // Rotation angle in radians
uniform vec2 u_transformTranslation; // Translation offset
uniform vec2 u_transformScale; // Scale factors
uniform vec2 u_transformCenter; // Center point for rotation/scaling

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 transformedUV = uv;
  
  if (u_transformType == 0) {
  // Rotation: Rotate UV coordinates around center point
  vec2 centered = uv - u_transformCenter;
  float cosAngle = cos(u_transformAngle);
  float sinAngle = sin(u_transformAngle);
  transformedUV = vec2(
    centered.x * cosAngle - centered.y * sinAngle,
    centered.x * sinAngle + centered.y * cosAngle
  ) + u_transformCenter;
} else if (u_transformType == 1) {
  // Translation: Move UV coordinates
  transformedUV = uv + u_transformTranslation;
} else if (u_transformType == 2) {
  // Scaling: Scale UV coordinates around center point
  vec2 centered = uv - u_transformCenter;
  transformedUV = centered * u_transformScale + u_transformCenter;
} else {
  // Polar coordinates: Convert Cartesian to polar (angle, radius)
  vec2 centered = uv - u_transformCenter;
  float angle = atan(centered.y, centered.x);
  float radius = length(centered);
  // Visualize as color: angle -> hue, radius -> brightness
  transformedUV = vec2(angle / 6.28318 + 0.5, radius * 2.0);
}
  
  // Create a pattern to visualize the transformation
  vec2 pattern = fract(transformedUV * 5.0);
  float checkerboard = mod(floor(pattern.x) + floor(pattern.y), 2.0);
  vec3 color = vec3(checkerboard);
  
  // Add grid lines for better visualization (using smoothstep instead of fwidth for GLSL ES 1.0 compatibility)
  vec2 gridUV = fract(transformedUV * 5.0);
  vec2 gridPos = fract(gridUV);
  float gridLineX = smoothstep(0.48, 0.5, gridPos.x) + smoothstep(0.5, 0.52, gridPos.x);
  float gridLineY = smoothstep(0.48, 0.5, gridPos.y) + smoothstep(0.5, 0.52, gridPos.y);
  float gridLine = clamp(gridLineX + gridLineY, 0.0, 1.0);
  color = mix(color, vec3(0.2), gridLine * 0.8);
  
  gl_FragColor = vec4(color, 1.0);
}