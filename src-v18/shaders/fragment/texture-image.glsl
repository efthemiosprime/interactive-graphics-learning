#version 100
precision mediump float;

uniform vec2 u_resolution;
uniform float u_textureScale;
uniform vec2 u_textureOffset;
uniform sampler2D u_texture;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // Flip Y coordinate (WebGL has origin at bottom-left, images at top-left)
  uv.y = 1.0 - uv.y;
  
  // Apply texture scale (tiling)
  uv *= u_textureScale;
  
  // Apply texture offset
  uv += u_textureOffset;
  
  // Sample texture at UV coordinates
  vec4 texColor = texture2D(u_texture, uv);
  
  gl_FragColor = texColor;
}

