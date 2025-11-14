#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_blurAmount;
uniform float u_edgeThreshold;
uniform float u_vignetteIntensity;
uniform float u_chromaticAberration;
uniform float u_glitchIntensity;
uniform float u_bloomIntensity;
uniform float u_bloomThreshold;
uniform float u_colorGradingBrightness;
uniform float u_colorGradingContrast;
uniform float u_colorGradingSaturation;
uniform float u_colorGradingTemperature;
uniform float u_colorGradingTint;
uniform float u_aoIntensity;
uniform float u_aoRadius;
uniform float u_aoBias;
uniform int u_effectType;
uniform int u_useImageTexture;
uniform sampler2D u_texture;

// Sample color at offset position
vec3 sampleColor(vec2 uv, vec2 offset) {
  vec2 sampleUV = uv + offset / u_resolution;
  sampleUV = clamp(sampleUV, 0.0, 1.0);
  
  if (u_useImageTexture == 1) {
    // Flip Y coordinate (WebGL has origin at bottom-left, images at top-left)
    vec2 texUV = vec2(sampleUV.x, 1.0 - sampleUV.y);
    return texture2D(u_texture, texUV).rgb;
  } else {
    // Create a procedural pattern
    vec2 center = vec2(0.5);
    float dist = length((sampleUV - center) * u_resolution);
    float pattern = sin(dist * 0.1 + u_time) * 0.5 + 0.5;
    
    // Add some variation
    float r = pattern;
    float g = pattern * 0.8 + sin(sampleUV.x * 10.0) * 0.1;
    float b = pattern * 0.6 + cos(sampleUV.y * 10.0) * 0.1;
    
    return vec3(r, g, b);
  }
}

// Gaussian blur
vec3 blur(vec2 uv) {
  vec3 color = vec3(0.0);
  float total = 0.0;
  float radius = u_blurAmount;
  
  // Use fixed loop bounds (GLSL ES 1.0 requires constant loop bounds)
  // Sample in a 10x10 grid and scale by blur amount
  for (int x = -5; x <= 5; x++) {
    for (int y = -5; y <= 5; y++) {
      vec2 offset = vec2(float(x), float(y)) * radius * 0.2;
      float dist = length(offset);
      float weight = exp(-(dist * dist) / (2.0 * radius * radius));
      color += sampleColor(uv, offset) * weight;
      total += weight;
    }
  }
  
  return color / max(total, 0.001);
}

// Edge detection (Sobel operator)
vec3 edgeDetection(vec2 uv) {
  vec2 texelSize = 1.0 / u_resolution;
  float sampleScale = 50.0; // Scale for better edge detection on procedural pattern
  
  // Sample colors in 3x3 grid
  vec3 tl = sampleColor(uv, vec2(-1.0, -1.0) * texelSize * sampleScale);
  vec3 tm = sampleColor(uv, vec2(0.0, -1.0) * texelSize * sampleScale);
  vec3 tr = sampleColor(uv, vec2(1.0, -1.0) * texelSize * sampleScale);
  vec3 ml = sampleColor(uv, vec2(-1.0, 0.0) * texelSize * sampleScale);
  vec3 mm = sampleColor(uv, vec2(0.0, 0.0) * texelSize * sampleScale);
  vec3 mr = sampleColor(uv, vec2(1.0, 0.0) * texelSize * sampleScale);
  vec3 bl = sampleColor(uv, vec2(-1.0, 1.0) * texelSize * sampleScale);
  vec3 bm = sampleColor(uv, vec2(0.0, 1.0) * texelSize * sampleScale);
  vec3 br = sampleColor(uv, vec2(1.0, 1.0) * texelSize * sampleScale);
  
  // Convert to grayscale for edge detection
  float tl_g = dot(tl, vec3(0.299, 0.587, 0.114));
  float tm_g = dot(tm, vec3(0.299, 0.587, 0.114));
  float tr_g = dot(tr, vec3(0.299, 0.587, 0.114));
  float ml_g = dot(ml, vec3(0.299, 0.587, 0.114));
  float mm_g = dot(mm, vec3(0.299, 0.587, 0.114));
  float mr_g = dot(mr, vec3(0.299, 0.587, 0.114));
  float bl_g = dot(bl, vec3(0.299, 0.587, 0.114));
  float bm_g = dot(bm, vec3(0.299, 0.587, 0.114));
  float br_g = dot(br, vec3(0.299, 0.587, 0.114));
  
  // Sobel operator
  float gx = -tl_g - 2.0*tm_g - tr_g + bl_g + 2.0*bm_g + br_g;
  float gy = -tl_g - 2.0*ml_g - bl_g + tr_g + 2.0*mr_g + br_g;
  float edge = length(vec2(gx, gy));
  
  // Normalize and apply threshold - use smoothstep for better visualization
  edge = smoothstep(u_edgeThreshold * 0.5, u_edgeThreshold * 1.5, edge);
  
  return vec3(edge);
}

// Vignette effect
vec3 applyVignette(vec3 color, vec2 uv) {
  vec2 center = vec2(0.5);
  float dist = length(uv - center);
  float vignette = 1.0 - smoothstep(0.3, 0.8, dist) * u_vignetteIntensity;
  return color * vignette;
}

// Chromatic aberration
vec3 applyChromaticAberration(vec2 uv) {
  vec2 center = vec2(0.5);
  vec2 offset = (uv - center) * u_chromaticAberration * 100.0;
  
  float r = length(sampleColor(uv, vec2(offset.x, 0.0) * 10.0));
  float g = length(sampleColor(uv, vec2(0.0, 0.0) * 10.0));
  float b = length(sampleColor(uv, vec2(-offset.x, 0.0) * 10.0));
  
  return vec3(r, g, b);
}

// Bad TV glitch effect
vec3 applyGlitch(vec2 uv) {
  vec3 color = sampleColor(uv, vec2(0.0));
  
  // Vertical wobble/distortion (like old TV)
  float wobble = sin(uv.y * 20.0 + u_time * 3.0) * u_glitchIntensity * 0.02;
  vec2 wobbledUV = uv + vec2(wobble, 0.0);
  color = sampleColor(wobbledUV, vec2(0.0));
  
  // Horizontal scan lines (flickering)
  float scanLineFreq = u_resolution.y * 0.5;
  float scanLine = sin(wobbledUV.y * scanLineFreq + u_time * 10.0);
  scanLine = smoothstep(0.7, 1.0, abs(scanLine)) * u_glitchIntensity * 0.3 + 1.0;
  color *= scanLine;
  
  // Screen tearing - horizontal bars that shift
  float barHeight = 0.02;
  float barY = floor(wobbledUV.y / barHeight);
  float barRandom = fract(sin(barY * 12.9898 + u_time * 5.0) * 43758.5453);
  float barOffset = (barRandom - 0.5) * u_glitchIntensity * 0.15;
  float barChance = step(0.7, barRandom);
  vec2 tornUV = wobbledUV + vec2(barOffset * barChance, 0.0);
  vec3 tornColor = sampleColor(tornUV, vec2(0.0));
  color = mix(color, tornColor, barChance * u_glitchIntensity * 0.5);
  
  // RGB channel separation (color bleeding)
  float rOffset = sin(wobbledUV.y * 15.0 + u_time * 2.0) * u_glitchIntensity * 0.03;
  float bOffset = sin(wobbledUV.y * 15.0 + u_time * 2.0 + 1.0) * u_glitchIntensity * 0.03;
  float r = sampleColor(wobbledUV, vec2(rOffset, 0.0)).r;
  float g = color.g;
  float b = sampleColor(wobbledUV, vec2(bOffset, 0.0)).b;
  color = vec3(r, g, b);
  
  // Static noise (TV static)
  float staticNoise = fract(sin(dot(wobbledUV + u_time * 0.1, vec2(12.9898, 78.233))) * 43758.5453);
  staticNoise = step(0.95, staticNoise) * u_glitchIntensity * 0.4;
  color += vec3(staticNoise);
  
  // Flickering brightness (like bad signal)
  float flicker = sin(u_time * 20.0 + wobbledUV.y * 10.0);
  flicker = smoothstep(0.8, 1.0, flicker) * u_glitchIntensity * 0.2 + 1.0;
  color *= flicker;
  
  // Horizontal interference bars
  float interference = sin(wobbledUV.y * 100.0 + u_time * 15.0);
  interference = smoothstep(0.9, 1.0, abs(interference)) * u_glitchIntensity * 0.3;
  color += vec3(interference);
  
  return clamp(color, 0.0, 1.0);
}

// Bloom effect
vec3 applyBloom(vec2 uv) {
  vec3 color = sampleColor(uv, vec2(0.0));
  
  // Extract bright areas (above threshold)
  float brightness = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 brightColor = step(u_bloomThreshold, brightness) * color;
  
  // Blur the bright areas
  vec3 bloom = vec3(0.0);
  float total = 0.0;
  float radius = 3.0;
  
  // Use fixed loop bounds for GLSL ES 1.0
  for (int x = -3; x <= 3; x++) {
    for (int y = -3; y <= 3; y++) {
      vec2 offset = vec2(float(x), float(y)) / u_resolution;
      float dist = length(vec2(float(x), float(y)));
      float weight = exp(-(dist * dist) / (2.0 * radius * radius));
      
      vec2 sampleUV = uv + offset;
      sampleUV = clamp(sampleUV, 0.0, 1.0);
      
      vec3 sampleCol = sampleColor(sampleUV, vec2(0.0));
      float sampleBrightness = dot(sampleCol, vec3(0.299, 0.587, 0.114));
      vec3 brightSample = step(u_bloomThreshold, sampleBrightness) * sampleCol;
      
      bloom += brightSample * weight;
      total += weight;
    }
  }
  
  bloom /= max(total, 0.001);
  
  // Add bloom to original color
  return color + bloom * u_bloomIntensity;
}

// Color grading effect
vec3 applyColorGrading(vec2 uv) {
  vec3 color = sampleColor(uv, vec2(0.0));
  
  // Brightness adjustment
  color += u_colorGradingBrightness;
  
  // Contrast adjustment
  color = (color - 0.5) * u_colorGradingContrast + 0.5;
  
  // Saturation adjustment
  float gray = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(vec3(gray), color, u_colorGradingSaturation);
  
  // Color temperature (warm/cool)
  // Temperature: positive = warm (more red/yellow), negative = cool (more blue)
  vec3 warm = vec3(1.0, 0.9, 0.7);
  vec3 cool = vec3(0.7, 0.9, 1.0);
  float tempFactor = u_colorGradingTemperature;
  if (tempFactor > 0.0) {
    color = mix(color, color * warm, tempFactor);
  } else {
    color = mix(color, color * cool, -tempFactor);
  }
  
  // Tint adjustment (green/magenta shift)
  // Tint: positive = magenta, negative = green
  vec3 tintShift = vec3(1.0 + u_colorGradingTint * 0.5, 1.0, 1.0 + u_colorGradingTint * 0.5);
  if (u_colorGradingTint < 0.0) {
    tintShift = vec3(1.0, 1.0 + abs(u_colorGradingTint) * 0.5, 1.0);
  }
  color *= tintShift;
  
  return clamp(color, 0.0, 1.0);
}

// Ambient Occlusion effect (Screen-Space AO)
vec3 applyAmbientOcclusion(vec2 uv) {
  vec3 color = sampleColor(uv, vec2(0.0));
  
  // Get center depth/brightness
  float centerDepth = dot(color, vec3(0.299, 0.587, 0.114));
  
  // Sample directions for AO (8 directions around the pixel)
  vec2 sampleDirections[8];
  sampleDirections[0] = vec2(1.0, 0.0);
  sampleDirections[1] = vec2(0.707, 0.707);
  sampleDirections[2] = vec2(0.0, 1.0);
  sampleDirections[3] = vec2(-0.707, 0.707);
  sampleDirections[4] = vec2(-1.0, 0.0);
  sampleDirections[5] = vec2(-0.707, -0.707);
  sampleDirections[6] = vec2(0.0, -1.0);
  sampleDirections[7] = vec2(0.707, -0.707);
  
  float occlusion = 0.0;
  float samples = 0.0;
  
  // Sample in multiple rings for better quality
  for (int ring = 1; ring <= 3; ring++) {
    float ringRadius = u_aoRadius * float(ring);
    
    for (int i = 0; i < 8; i++) {
      vec2 sampleDir = sampleDirections[i];
      vec2 sampleOffset = sampleDir * ringRadius;
      
      vec3 sampleCol = sampleColor(uv, sampleOffset);
      float sampleDepth = dot(sampleCol, vec3(0.299, 0.587, 0.114));
      
      // Calculate occlusion: if sample is darker than center, it occludes
      float depthDiff = centerDepth - sampleDepth;
      if (depthDiff > u_aoBias) {
        // More occlusion for larger depth differences
        float occlude = smoothstep(u_aoBias, u_aoBias + 0.1, depthDiff);
        occlusion += occlude;
      }
      
      samples += 1.0;
    }
  }
  
  // Normalize occlusion
  occlusion /= samples;
  
  // Apply AO: darken areas with more occlusion
  float ao = 1.0 - occlusion * u_aoIntensity;
  
  return color * ao;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = sampleColor(uv, vec2(0.0));
  
  // 0 = blur, 1 = edge, 2 = vignette, 3 = chromatic, 4 = glitch, 5 = bloom, 6 = color grading, 7 = ambient occlusion
  if (u_effectType == 0) {
    color = blur(uv);
  } else if (u_effectType == 1) {
    color = edgeDetection(uv);
  } else if (u_effectType == 2) {
    color = applyVignette(color, uv);
  } else if (u_effectType == 3) {
    color = applyChromaticAberration(uv);
  } else if (u_effectType == 4) {
    color = applyGlitch(uv);
  } else if (u_effectType == 5) {
    color = applyBloom(uv);
  } else if (u_effectType == 6) {
    color = applyColorGrading(uv);
  } else if (u_effectType == 7) {
    color = applyAmbientOcclusion(uv);
  }
  
  gl_FragColor = vec4(color, 1.0);
}

