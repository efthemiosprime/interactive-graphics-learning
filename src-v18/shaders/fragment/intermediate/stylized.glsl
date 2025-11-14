#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture;
uniform int u_useImageTexture;

// Stylized/Cartoon parameters
uniform float u_toonBands;          // Number of lighting bands (quantization levels)
uniform float u_edgeThreshold;     // Edge detection threshold
uniform float u_edgeThickness;      // Edge line thickness
uniform float u_colorQuantization;  // Color quantization levels
uniform float u_rimPower;           // Rim lighting power
uniform float u_specularPower;      // Specular highlight power
uniform vec3 u_rimColor;            // Rim light color
uniform vec3 u_specularColor;       // Specular highlight color

// Helper function for edge detection
float getEdge(vec2 uv, vec2 resolution) {
  vec2 texelSize = 1.0 / resolution;
  
  // Flip Y coordinate for texture sampling (WebGL has origin at bottom-left, images at top-left)
  vec2 texUV = vec2(uv.x, 1.0 - uv.y);
  
  // Sample surrounding pixels
  float center = dot(texture2D(u_texture, texUV).rgb, vec3(0.299, 0.587, 0.114));
  float left = dot(texture2D(u_texture, texUV + vec2(-texelSize.x, 0.0)).rgb, vec3(0.299, 0.587, 0.114));
  float right = dot(texture2D(u_texture, texUV + vec2(texelSize.x, 0.0)).rgb, vec3(0.299, 0.587, 0.114));
  float top = dot(texture2D(u_texture, texUV + vec2(0.0, -texelSize.y)).rgb, vec3(0.299, 0.587, 0.114));
  float bottom = dot(texture2D(u_texture, texUV + vec2(0.0, texelSize.y)).rgb, vec3(0.299, 0.587, 0.114));
  
  // Calculate gradient magnitude (Sobel-like)
  float gx = abs(right - left);
  float gy = abs(bottom - top);
  float edge = sqrt(gx * gx + gy * gy);
  
  // Threshold and smooth
  return smoothstep(u_edgeThreshold, u_edgeThreshold + u_edgeThickness, edge);
}

// Color quantization
vec3 quantizeColor(vec3 color, float levels) {
  return floor(color * levels) / levels;
}

// Toon/Cel shading - banded lighting
float toonShade(float intensity, float bands) {
  return floor(intensity * bands) / bands;
}

// Rim lighting calculation
float rimLight(vec2 uv, vec2 resolution) {
  vec2 center = vec2(0.5, 0.5);
  vec2 dir = normalize(uv - center);
  vec2 normal = vec2(-dir.y, dir.x); // Perpendicular to radial direction
  
  // Simple rim calculation based on distance from center
  float dist = length(uv - center);
  float rim = 1.0 - smoothstep(0.3, 0.7, dist);
  return pow(rim, u_rimPower);
}

// Specular highlight
float specularHighlight(vec2 uv, vec2 resolution) {
  vec2 center = vec2(0.5, 0.5);
  vec2 lightDir = normalize(vec2(0.5, 0.5) - uv);
  vec2 viewDir = normalize(center - uv);
  vec2 halfDir = normalize(lightDir + viewDir);
  
  // Simple specular calculation
  float spec = pow(max(0.0, dot(halfDir, normalize(uv - center))), u_specularPower);
  return spec;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  vec3 color;
  
  if (u_useImageTexture == 1) {
    // Flip Y coordinate (WebGL has origin at bottom-left, images at top-left)
    vec2 texUV = vec2(uv.x, 1.0 - uv.y);
    // Sample texture
    color = texture2D(u_texture, texUV).rgb;
  } else {
    // Procedural pattern for demonstration
    vec2 st = uv * 5.0;
    float pattern = sin(st.x) * sin(st.y);
    color = vec3(pattern * 0.5 + 0.5);
  }
  
  // Edge detection
  float edge = getEdge(uv, u_resolution);
  
  // Color quantization
  color = quantizeColor(color, u_colorQuantization);
  
  // Calculate lighting intensity (grayscale)
  float intensity = dot(color, vec3(0.299, 0.587, 0.114));
  
  // Apply toon shading
  float toonIntensity = toonShade(intensity, u_toonBands);
  color = color * toonIntensity / max(intensity, 0.001);
  
  // Add rim lighting
  float rim = rimLight(uv, u_resolution);
  color = mix(color, u_rimColor, rim * 0.3);
  
  // Add specular highlight
  float spec = specularHighlight(uv, u_resolution);
  color = mix(color, u_specularColor, spec * 0.5);
  
  // Apply edge outline (darken edges)
  color = mix(color, vec3(0.0), edge * 0.8);
  
  gl_FragColor = vec4(color, 1.0);
}

