#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform int u_mathOperation; // 0=add, 1=subtract, 2=multiply, 3=divide, 4=power, 5=modulo, 6=abs, 7=floor, 8=ceil, 9=min, 10=max, 11=clamp, 12=mix
uniform float u_mathValue1;
uniform float u_mathValue2;
uniform float u_mathValue3; // For clamp and mix
uniform int u_useImageTexture; // 0 = use values, 1 = use image
uniform sampler2D u_texture;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float value1 = u_mathValue1;
  float value2 = u_mathValue2;
  float value3 = u_mathValue3;
  
  // If using image texture, sample from texture
  if (u_useImageTexture == 1) {
  vec4 texColor = texture2D(u_texture, uv);
  // Use grayscale value from texture
  float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  value1 = gray;
  value2 = gray;
  value3 = gray;
}
  
  float result = 0.0;
  
  if (u_mathOperation == 0) {
  // Add
  result = value1 + value2;
} else if (u_mathOperation == 1) {
  // Subtract
  result = value1 - value2;
} else if (u_mathOperation == 2) {
  // Multiply
  result = value1 * value2;
} else if (u_mathOperation == 3) {
  // Divide
  result = value2 != 0.0 ? value1 / value2 : 0.0;
} else if (u_mathOperation == 4) {
  // Power
  result = pow(value1, value2);
} else if (u_mathOperation == 5) {
  // Modulo
  result = mod(value1, value2);
} else if (u_mathOperation == 6) {
  // Absolute value
  result = abs(value1);
} else if (u_mathOperation == 7) {
  // Floor
  result = floor(value1);
} else if (u_mathOperation == 8) {
  // Ceiling
  result = ceil(value1);
} else if (u_mathOperation == 9) {
  // Minimum
  result = min(value1, value2);
} else if (u_mathOperation == 10) {
  // Maximum
  result = max(value1, value2);
} else if (u_mathOperation == 11) {
  // Clamp
  result = clamp(value1, value2, value3);
} else {
  // Mix (Linear interpolation)
  result = mix(value1, value2, value3);
}
  
  // Visualize result as grayscale (normalize to 0-1 range for display)
  float normalized = (result + 2.0) / 4.0; // Map [-2, 2] to [0, 1]
  normalized = clamp(normalized, 0.0, 1.0);
  gl_FragColor = vec4(vec3(normalized), 1.0);
}