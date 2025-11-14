import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { createShader, createProgram } from '../../utils/shader/webglUtils';

// Vertex shader
const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = a_position * 0.5 + 0.5;
}
`;

// Fragment shader with parallax scrolling - renders shapes and text directly
const fragmentShaderSource = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_scrollOffset; // Normalized scroll position (0 to 1)
uniform float u_parallaxSpeed1; // Background layer speed
uniform float u_parallaxSpeed2; // Middle layer speed
uniform float u_parallaxSpeed3; // Foreground layer speed
varying vec2 v_uv;

// Helper function to draw a circle
float circle(vec2 uv, vec2 center, float radius, float smoothness) {
  float dist = distance(uv, center);
  return smoothstep(radius + smoothness, radius - smoothness, dist);
}

// Helper function to draw a rectangle
float rectangle(vec2 uv, vec2 center, vec2 size, float smoothness) {
  vec2 d = abs(uv - center) - size * 0.5;
  float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  return smoothstep(smoothness, 0.0, dist);
}

// Draw text-like pattern (simplified - using shapes)
float drawText(vec2 uv, vec2 pos, float size) {
  // Simple letter-like shapes
  float result = 0.0;
  
  // Draw "L" shape
  result = max(result, rectangle(uv, pos + vec2(0.0, -size * 0.3), vec2(size * 0.1, size * 0.6), 0.01));
  result = max(result, rectangle(uv, pos + vec2(size * 0.15, -size * 0.45), vec2(size * 0.3, size * 0.1), 0.01));
  
  return result;
}

// Layer 1 - Background shapes
vec3 drawLayer1(vec2 uv, float scrollOffset) {
  vec3 color = vec3(0.05, 0.05, 0.1); // Dark background
  
  // Apply parallax offset
  float parallaxY = scrollOffset * u_parallaxSpeed1;
  vec2 layerUV = uv;
  layerUV.y += parallaxY * 0.5; // Move slower
  
  // Large background circles
  for (int i = 0; i < 5; i++) {
    float y = float(i) / 5.0 + 0.1;
    float radius = 0.15 + sin(float(i)) * 0.05;
    float x = 0.2 + mod(float(i), 2.0) * 0.6;
    
    vec2 center = vec2(x, mod(y + parallaxY, 1.0));
    float circleShape = circle(layerUV, center, radius, 0.02);
    color = mix(color, vec3(0.1, 0.1, 0.2), circleShape * 0.3);
  }
  
  // Grid (simplified for GLSL ES 1.00 compatibility)
  vec2 gridUV = layerUV * 10.0;
  vec2 gridFract = fract(gridUV);
  vec2 gridDist = abs(gridFract - 0.5);
  float gridLine = min(gridDist.x, gridDist.y);
  color = mix(color, vec3(0.4, 0.4, 0.6), smoothstep(0.45, 0.5, gridLine) * 0.1);
  
  return color;
}

// Layer 2 - Middle shapes and text
vec3 drawLayer2(vec2 uv, float scrollOffset) {
  vec3 color = vec3(0.0);
  
  // Apply parallax offset
  float parallaxY = scrollOffset * u_parallaxSpeed2;
  vec2 layerUV = uv;
  layerUV.y += parallaxY * 0.3;
  
  // Medium circles
  for (int i = 0; i < 8; i++) {
    float y = float(i) / 8.0 + 0.15;
    float size = 0.06 + cos(float(i)) * 0.02;
    float x = 0.3 + mod(float(i), 3.0) * 0.25;
    
    vec2 center = vec2(x, mod(y + parallaxY, 1.0));
    float circleShape = circle(layerUV, center, size, 0.01);
    color = mix(color, vec3(0.4, 0.6, 1.0), circleShape * 0.4);
    
    // Text label
    vec2 textPos = center + vec2(0.0, 0.08);
    float text = drawText(layerUV, textPos, 0.05);
    color = mix(color, vec3(0.8, 0.8, 1.0), text * 0.6);
  }
  
  // Rectangles
  for (int i = 0; i < 6; i++) {
    float y = float(i) / 6.0 + 0.2;
    float rectSize = 0.08;
    float x = 0.15 + mod(float(i), 2.0) * 0.7;
    
    vec2 center = vec2(x, mod(y + parallaxY, 1.0));
    float rectShape = rectangle(layerUV, center, vec2(rectSize), 0.01);
    color = mix(color, vec3(0.6, 0.4, 1.0), rectShape * 0.3);
  }
  
  return color;
}

// Layer 3 - Foreground shapes and text
vec3 drawLayer3(vec2 uv, float scrollOffset) {
  vec3 color = vec3(0.0);
  
  // Apply parallax offset
  float parallaxY = scrollOffset * u_parallaxSpeed3;
  vec2 layerUV = uv;
  layerUV.y += parallaxY * 0.1; // Move fastest
  
  // Foreground circles
  for (int i = 0; i < 10; i++) {
    float y = float(i) / 10.0 + 0.1;
    float size = 0.04 + sin(float(i) * 0.5) * 0.015;
    float x = 0.1 + mod(float(i), 4.0) * 0.25;
    
    vec2 center = vec2(x, mod(y + parallaxY, 1.0));
    float circleShape = circle(layerUV, center, size, 0.01);
    color = mix(color, vec3(1.0, 0.8, 0.4), circleShape * 0.6);
    
    // Text label
    vec2 textPos = center + vec2(0.0, 0.05);
    float text = drawText(layerUV, textPos, 0.06);
    color = mix(color, vec3(1.0, 1.0, 1.0), text * 0.9);
  }
  
  // Foreground rectangles
  for (int i = 0; i < 7; i++) {
    float y = float(i) / 7.0 + 0.15;
    float rectSize = 0.06;
    float x = 0.2 + mod(float(i), 3.0) * 0.3;
    
    vec2 center = vec2(x, mod(y + parallaxY, 1.0));
    float rectShape = rectangle(layerUV, center, vec2(rectSize), 0.01);
    color = mix(color, vec3(1.0, 0.6, 0.4), rectShape * 0.5);
    
    // Text inside
    float text = drawText(layerUV, center, 0.04);
    color = mix(color, vec3(1.0, 1.0, 1.0), text * 0.8);
  }
  
  // Large title text
  for (int i = 0; i < 3; i++) {
    float y = 0.2 + float(i) * 0.3;
    vec2 titlePos = vec2(0.5, mod(y + parallaxY, 1.0));
    
    // Draw "PARALLAX" text pattern
    for (int j = 0; j < 8; j++) {
      float charX = 0.3 + float(j) * 0.05;
      vec2 charPos = vec2(charX, titlePos.y);
      float text = drawText(layerUV, charPos, 0.12);
      color = mix(color, vec3(1.0, 1.0, 1.0), text * 0.9);
    }
  }
  
  return color;
}

void main() {
  vec2 uv = v_uv;
  
  // Convert to screen coordinates (0,0 at top-left)
  vec2 screenUV = vec2(uv.x, 1.0 - uv.y);
  
  // Draw layers with parallax
  vec3 layer1 = drawLayer1(screenUV, u_scrollOffset);
  vec3 layer2 = drawLayer2(screenUV, u_scrollOffset);
  vec3 layer3 = drawLayer3(screenUV, u_scrollOffset);
  
  // Composite layers (foreground over background)
  vec3 finalColor = layer1;
  finalColor = mix(finalColor, layer2, length(layer2));
  finalColor = mix(finalColor, layer3, length(layer3));
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function ParallaxDemo() {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const containerRef = useRef(null);
  const [time, setTime] = useState(0);
  const [contentCaptured, setContentCaptured] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [easedScrollY, setEasedScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [parallaxSpeed1, setParallaxSpeed1] = useState(0.3); // Background - slowest
  const [parallaxSpeed2, setParallaxSpeed2] = useState(0.6); // Middle - medium
  const [parallaxSpeed3, setParallaxSpeed3] = useState(1.0); // Foreground - fastest
  const targetScrollYRef = useRef(0);
  const animationFrameRef = useRef(null);

  // Initialize WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl;

    // Set canvas size to match viewport with device pixel ratio
    const resizeCanvas = () => {
      if (!canvas) return;
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      const internalWidth = Math.floor(displayWidth * devicePixelRatio);
      const internalHeight = Math.floor(displayHeight * devicePixelRatio);
      
      if (canvas.width !== internalWidth || canvas.height !== internalHeight) {
        canvas.width = internalWidth;
        canvas.height = internalHeight;
        canvas.style.width = displayWidth + 'px';
        canvas.style.height = displayHeight + 'px';
        gl.viewport(0, 0, internalWidth, internalHeight);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const mediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    const handleDPRChange = () => {
      resizeCanvas();
    };
    mediaQuery.addEventListener('change', handleDPRChange);

    // Create shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    programRef.current = program;

    // Set up geometry (full screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Set up attributes
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      mediaQuery.removeEventListener('change', handleDPRChange);
    };
  }, []);

  // Mark content as ready (we're rendering directly in shader now)
  useEffect(() => {
    setContentCaptured(true);
  }, []);

  // Handle scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      
      setScrollY(scrollTop);
      setScrollProgress(progress);
      targetScrollYRef.current = progress;
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll easing
  useEffect(() => {
    const animate = () => {
      const current = easedScrollY;
      const target = targetScrollYRef.current;
      const diff = target - current;
      
      if (Math.abs(diff) > 0.001) {
        setEasedScrollY(current + diff * 0.1);
      } else {
        setEasedScrollY(target);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [easedScrollY]);

  // Render loop
  useEffect(() => {
    const gl = glRef.current;
    const program = programRef.current;

    if (!gl || !program || !contentCaptured) return;

    const render = () => {
      gl.useProgram(program);

      // Set uniforms
      const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
      const timeLocation = gl.getUniformLocation(program, 'u_time');
      const scrollOffsetLocation = gl.getUniformLocation(program, 'u_scrollOffset');
      const parallaxSpeed1Location = gl.getUniformLocation(program, 'u_parallaxSpeed1');
      const parallaxSpeed2Location = gl.getUniformLocation(program, 'u_parallaxSpeed2');
      const parallaxSpeed3Location = gl.getUniformLocation(program, 'u_parallaxSpeed3');

      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform1f(scrollOffsetLocation, easedScrollY);
      gl.uniform1f(parallaxSpeed1Location, parallaxSpeed1);
      gl.uniform1f(parallaxSpeed2Location, parallaxSpeed2);
      gl.uniform1f(parallaxSpeed3Location, parallaxSpeed3);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const animationFrame = () => {
      render();
      requestAnimationFrame(animationFrame);
    };
    animationFrame();
  }, [time, easedScrollY, contentCaptured, parallaxSpeed1, parallaxSpeed2, parallaxSpeed3]);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.016);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Custom Scrollbar Styles */}
      <style>{`
        .parallax-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .parallax-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
        }
        .parallax-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #60a5fa 0%, #a855f7 100%);
          border-radius: 6px;
          border: 2px solid rgba(0, 0, 0, 0.2);
        }
        .parallax-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #3b82f6 0%, #9333ea 100%);
        }
        .parallax-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #60a5fa rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* WebGL Canvas - Fixed full screen */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* Scrollable Content Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 pointer-events-auto parallax-scrollbar overflow-y-auto"
        style={{
          scrollBehavior: 'smooth',
        }}
      >
        {/* Content with layers */}
        <div
          className="relative"
          style={{
            minHeight: '300vh', // Make it scrollable
            width: '100%',
          }}
        >
          {/* Content is rendered directly in WebGL shader */}
        </div>
      </div>

      {/* Controls Panel */}
      <div className="fixed top-8 right-8 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-purple-500/30 max-w-xs">
        <h3 className="text-xl font-bold text-white mb-4">Parallax Controls</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Background Speed: {parallaxSpeed1.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={parallaxSpeed1}
              onChange={(e) => setParallaxSpeed1(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Middle Speed: {parallaxSpeed2.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={parallaxSpeed2}
              onChange={(e) => setParallaxSpeed2(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Foreground Speed: {parallaxSpeed3.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={parallaxSpeed3}
              onChange={(e) => setParallaxSpeed3(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="fixed bottom-8 right-8 z-50 pointer-events-none"
        style={{ opacity: contentCaptured ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-purple-500/30">
          <div className="w-48 mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-xs font-medium">Scroll Progress</span>
              <span className="text-purple-300 text-xs">{Math.round(scrollProgress * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            {scrollProgress < 0.95 ? (
              <div className="animate-bounce">
                <svg 
                  className="w-6 h-6 text-purple-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </div>
            ) : (
              <div className="text-purple-400 text-xs font-medium">
                End of content
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed top-8 left-8 z-50">
        <Link 
          to="/shaders" 
          className="inline-flex items-center gap-2 text-purple-200 hover:text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shaders
        </Link>
      </div>

    </div>
  );
}

