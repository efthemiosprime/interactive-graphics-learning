#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_displacementType; // 0 = height-based, 1 = parallax, 2 = steep parallax
uniform float u_displacementScale;
uniform float u_displacementHeight;
uniform int u_useImageTexture;
uniform sampler2D u_texture;

// Random function for procedural height map
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Sample height map (grayscale)
float sampleHeight(vec2 uv) {
  if (u_useImageTexture == 1) {
    // Flip Y coordinate (WebGL has origin at bottom-left, images at top-left)
    vec2 texUV = vec2(uv.x, 1.0 - uv.y);
    vec4 texColor = texture2D(u_texture, texUV);
    // Convert to grayscale for height
    return dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  } else {
    // Procedural height map using noise
    float n = noise(uv * 5.0 + u_time * 0.1);
    // Add some variation
    n += noise(uv * 10.0) * 0.5;
    return n;
  }
}

// Height-based displacement
vec2 heightDisplacement(vec2 uv) {
  float height = sampleHeight(uv);
  // Calculate gradient (normal) from height map
  vec2 texelSize = 1.0 / u_resolution;
  float heightL = sampleHeight(uv - vec2(texelSize.x, 0.0));
  float heightR = sampleHeight(uv + vec2(texelSize.x, 0.0));
  float heightD = sampleHeight(uv - vec2(0.0, texelSize.y));
  float heightU = sampleHeight(uv + vec2(0.0, texelSize.y));
  
  // Calculate normal from height differences
  vec2 normal = normalize(vec2(heightL - heightR, heightD - heightU));
  
  // Displace UV along normal direction
  return uv + normal * height * u_displacementHeight * u_displacementScale;
}

// Parallax mapping (simple)
vec2 parallaxMapping(vec2 uv, vec2 viewDir) {
  float height = sampleHeight(uv);
  // Offset UV based on view direction and height
  vec2 parallaxOffset = viewDir.xy * height * u_displacementHeight * u_displacementScale;
  return uv - parallaxOffset;
}

// Steep parallax mapping (improved parallax with multiple layers)
vec2 steepParallaxMapping(vec2 uv, vec2 viewDir) {
  const int numLayers = 8;
  float layerDepth = 1.0 / float(numLayers);
  float currentLayerDepth = 0.0;
  
  vec2 P = viewDir.xy * u_displacementHeight * u_displacementScale;
  vec2 deltaUV = P / float(numLayers);
  
  vec2 currentUV = uv;
  float currentDepth = sampleHeight(currentUV);
  
  // Ray march through height layers
  for (int i = 0; i < 8; i++) {
    currentLayerDepth += layerDepth;
    currentUV -= deltaUV;
    currentDepth = sampleHeight(currentUV);
    
    if (currentDepth < currentLayerDepth) {
      break;
    }
  }
  
  // Interpolate between layers for smoother result
  vec2 prevUV = currentUV + deltaUV;
  float prevDepth = sampleHeight(prevUV) - (currentLayerDepth - layerDepth);
  float nextDepth = currentDepth - currentLayerDepth;
  
  float weight = nextDepth / (nextDepth - prevDepth);
  return mix(currentUV, prevUV, weight);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // Calculate view direction (simplified - assumes camera is looking straight down)
  // In a real 3D scene, this would come from the camera position
  vec2 viewDir = normalize(vec2(0.5, 0.5) - uv);
  
  vec2 displacedUV = uv;
  
  if (u_displacementType == 0) {
    // Height-based displacement
    displacedUV = heightDisplacement(uv);
  } else if (u_displacementType == 1) {
    // Simple parallax mapping
    displacedUV = parallaxMapping(uv, viewDir);
  } else {
    // Steep parallax mapping
    displacedUV = steepParallaxMapping(uv, viewDir);
  }
  
  // Clamp to valid UV range
  displacedUV = clamp(displacedUV, 0.0, 1.0);
  
  // Sample color at displaced UV
  vec3 color;
  if (u_useImageTexture == 1) {
    vec2 texUV = vec2(displacedUV.x, 1.0 - displacedUV.y);
    color = texture2D(u_texture, texUV).rgb;
  } else {
    // Procedural color pattern
    float pattern = sampleHeight(displacedUV);
    color = vec3(pattern);
    
    // Add some color variation
    float r = pattern;
    float g = pattern * 0.8 + sin(displacedUV.x * 10.0) * 0.1;
    float b = pattern * 0.6 + cos(displacedUV.y * 10.0) * 0.1;
    color = vec3(r, g, b);
  }
  
  gl_FragColor = vec4(color, 1.0);
}

