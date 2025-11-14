#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_noiseScale;
uniform int u_noiseType; // 0 = fractal, 1 = simplex, 2 = worley, 3 = perlin, 4 = domainWarp
uniform float u_fractalOctaves;
uniform float u_fractalLacunarity;
uniform float u_fractalGain;
uniform float u_worleyScale;
uniform float u_domainWarpStrength;

// Random function
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Gradient function for Perlin noise
vec2 grad(vec2 p) {
  float angle = random(p) * 6.28318;
  return vec2(cos(angle), sin(angle));
}

// Basic noise (used as building block)
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

// Perlin Noise (gradient noise)
float perlinNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  
  // Get gradients at corners
  vec2 grad00 = grad(i);
  vec2 grad10 = grad(i + vec2(1.0, 0.0));
  vec2 grad01 = grad(i + vec2(0.0, 1.0));
  vec2 grad11 = grad(i + vec2(1.0, 1.0));
  
  // Distance vectors
  vec2 dist00 = f;
  vec2 dist10 = f - vec2(1.0, 0.0);
  vec2 dist01 = f - vec2(0.0, 1.0);
  vec2 dist11 = f - vec2(1.0, 1.0);
  
  // Dot products
  float dot00 = dot(grad00, dist00);
  float dot10 = dot(grad10, dist10);
  float dot01 = dot(grad01, dist01);
  float dot11 = dot(grad11, dist11);
  
  // Smooth interpolation
  vec2 u = f * f * (3.0 - 2.0 * f);
  
  return mix(
    mix(dot00, dot10, u.x),
    mix(dot01, dot11, u.x),
    u.y
  ) * 0.5 + 0.5; // Normalize to [0, 1]
}

// Simplex Noise (simplified 2D version)
float simplexNoise(vec2 st) {
  // Simplified Simplex noise - using a triangular grid approximation
  const float K1 = 0.366025404; // (sqrt(3)-1)/2
  const float K2 = 0.211324865; // (3-sqrt(3))/6
  
  vec2 i = floor(st + (st.x + st.y) * K1);
  vec2 a0 = st - i + (i.x + i.y) * K2;
  
  float m = step(a0.y, a0.x);
  vec2 o1 = vec2(m, 1.0 - m);
  vec2 o2 = vec2(1.0 - m, m);
  
  vec2 a1 = a0 - o1 + K2;
  vec2 a2 = a0 - o2 + 2.0 * K2;
  vec2 a3 = a0 - 1.0 + 3.0 * K2;
  
  vec4 h = max(0.5 - vec4(dot(a0, a0), dot(a1, a1), dot(a2, a2), dot(a3, a3)), 0.0);
  vec4 n = h * h * h * h * vec4(
    dot(a0, grad(i)),
    dot(a1, grad(i + o1)),
    dot(a2, grad(i + o2)),
    dot(a3, grad(i + 1.0))
  );
  
  return dot(n, vec4(70.0)) * 0.5 + 0.5;
}

// Worley Noise (Voronoi/Cellular)
float worleyNoise(vec2 st) {
  vec2 i_st = floor(st);
  vec2 f_st = fract(st);
  
  float min_dist = 1.0;
  
  // Check neighboring cells
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 point = random(i_st + neighbor) * vec2(1.0) + neighbor;
      vec2 diff = neighbor + point - f_st;
      float dist = length(diff);
      min_dist = min(min_dist, dist);
    }
  }
  
  return min_dist;
}

// Fractal Noise (multiple octaves)
float fractalNoise(vec2 st) {
  float value = 0.0;
  float amplitude = 1.0;
  float frequency = 1.0;
  float maxValue = 0.0;
  
  // Use fixed loop bounds (GLSL ES 1.0 requires constant loop bounds)
  // Scale octaves to fit within 8 iterations
  float octaveCount = clamp(u_fractalOctaves, 1.0, 8.0);
  
  for (int i = 0; i < 8; i++) {
    if (float(i) >= octaveCount) break;
    value += noise(st * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= u_fractalGain;
    frequency *= u_fractalLacunarity;
  }
  
  return maxValue > 0.0 ? value / maxValue : 0.0;
}

// Domain Warping (distorting noise with noise)
vec2 domainWarp(vec2 st) {
  float n1 = noise(st);
  float n2 = noise(st + vec2(5.2, 1.3));
  return st + vec2(n1, n2) * u_domainWarpStrength;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv *= u_noiseScale;
  
  float result = 0.0;
  
  if (u_noiseType == 0) {
    // Fractal Noise
    result = fractalNoise(uv + u_time * 0.1);
  } else if (u_noiseType == 1) {
    // Simplex Noise
    result = simplexNoise(uv * 2.0 + u_time * 0.1);
  } else if (u_noiseType == 2) {
    // Worley Noise
    result = worleyNoise(uv * u_worleyScale);
  } else if (u_noiseType == 3) {
    // Perlin Noise
    result = perlinNoise(uv * 2.0 + u_time * 0.1);
  } else {
    // Domain Warping
    vec2 warpedUV = domainWarp(uv + u_time * 0.05);
    result = noise(warpedUV * 3.0);
  }
  
  gl_FragColor = vec4(vec3(result), 1.0);
}

