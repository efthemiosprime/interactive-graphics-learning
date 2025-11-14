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

// Fragment shader with glitch effect
const fragmentShaderSource = `
precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform vec2 u_textureResolution;
uniform float u_time;
uniform float u_glitchIntensity;
uniform vec2 u_scrollOffset;
varying vec2 v_uv;

// Random function
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Glitch effect
vec3 applyGlitch(vec2 uv, sampler2D tex) {
  vec2 glitchUV = uv;
  
  // Vertical wobble/distortion
  float wobble = sin(uv.y * 10.0 + u_time * 2.0) * u_glitchIntensity * 0.01;
  glitchUV.x += wobble;
  
  // Horizontal scan lines
  float scanLine = step(0.98, fract(uv.y * 200.0 + u_time * 5.0));
  vec3 color = texture2D(tex, glitchUV).rgb;
  color += scanLine * vec3(0.1, 0.1, 0.1) * u_glitchIntensity;
  
  // Screen tearing (horizontal bars that shift)
  float tear = step(0.95, random(vec2(floor(uv.y * 50.0), floor(u_time * 10.0))));
  glitchUV.x += tear * sin(u_time * 20.0) * u_glitchIntensity * 0.05;
  color = texture2D(tex, glitchUV).rgb;
  
  // RGB channel separation (color bleeding)
  float offset = sin(u_time * 3.0) * u_glitchIntensity * 0.01;
  float r = texture2D(tex, glitchUV + vec2(offset, 0.0)).r;
  float g = texture2D(tex, glitchUV).g;
  float b = texture2D(tex, glitchUV - vec2(offset, 0.0)).b;
  color = mix(color, vec3(r, g, b), u_glitchIntensity * 0.5);
  
  // Static noise
  float noise = random(uv + u_time) * u_glitchIntensity * 0.1;
  color += noise;
  
  // Flickering brightness
  float flicker = 0.8 + 0.2 * sin(u_time * 30.0);
  color *= flicker;
  
  // Horizontal interference bars
  float interference = step(0.9, random(vec2(floor(uv.y * 30.0), floor(u_time * 5.0))));
  color += interference * vec3(0.2, 0.0, 0.2) * u_glitchIntensity;
  
  return color;
}

void main() {
  vec2 uv = v_uv;
  
  // Canvas is fixed at viewport height (100vh)
  // Texture contains the full page height (taller than viewport)
  // We need to map viewport Y to texture Y based on scroll position
  
  // Apply scroll offset to UV coordinates
  // u_scrollOffset.y is normalized scroll position (0 to 1)
  // 0 = top of content, 1 = bottom of content
  float scrollOffsetY = u_scrollOffset.y;
  
  // Calculate aspect ratios
  float screenAspect = u_resolution.x / u_resolution.y;
  float textureAspect = u_textureResolution.x / u_textureResolution.y;
  
  // Calculate how the viewport maps to texture
  // Viewport height in texture space: viewportHeight / textureHeight
  float viewportHeightInTexture = u_resolution.y / u_textureResolution.y;
  float viewportWidthInTexture = u_resolution.x / u_textureResolution.x;
  
  // Calculate how much we can scroll (difference between texture height and viewport height)
  float scrollableRange = max(0.0, 1.0 - viewportHeightInTexture);
  
  // Map screen Y (0 to 1) to texture Y
  // In WebGL, uv.y goes from 0 (bottom) to 1 (top)
  // We want: when scrollOffsetY = 0 (at top), see top of texture
  //          when scrollOffsetY = 1 (at bottom), see bottom of texture
  // As we scroll down (scrollOffsetY increases), sample texture further down
  // Convert uv.y from WebGL coordinates (0=bottom, 1=top) to screen coordinates (0=top, 1=bottom)
  float screenY = 1.0 - uv.y; // Convert: 0=top, 1=bottom
  float textureY = scrollOffsetY * scrollableRange + screenY * viewportHeightInTexture;
  
  // X coordinate: map 1:1 since capture canvas width matches WebGL canvas width
  // This preserves aspect ratio automatically
  float textureX = uv.x;
  
  // Clamp coordinates to prevent repeating
  float clampedX = clamp(textureX, 0.0, 1.0);
  float clampedY = clamp(textureY, 0.0, 1.0);
  
  // Final UV coordinates - ensure they're exactly in [0,1] range
  vec2 finalUV = vec2(clampedX, clampedY);
  
  // Render texture directly
  vec3 color = texture2D(u_texture, finalUV).rgb;
  gl_FragColor = vec4(color, 1.0);
}
`;

export default function GlitchDemo() {
  console.log('GlitchDemo component initializing...');
  
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const textureRef = useRef(null);
  const contentRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const [glitchIntensity, setGlitchIntensity] = useState(0.3);
  const [time, setTime] = useState(0);
  const [contentCaptured, setContentCaptured] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [easedScrollY, setEasedScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
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

    // Set canvas size to match viewport (100vh) with device pixel ratio for better quality
    // Canvas is fixed at viewport height, texture scrolls within it
    const resizeCanvas = () => {
      if (!canvas) return;
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Calculate display size (CSS pixels)
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      // Calculate internal size (actual pixels) - scale by devicePixelRatio for crisp rendering
      const internalWidth = Math.floor(displayWidth * devicePixelRatio);
      const internalHeight = Math.floor(displayHeight * devicePixelRatio);
      
      // Only resize if dimensions changed (avoids unnecessary work)
      if (canvas.width !== internalWidth || canvas.height !== internalHeight) {
        // Set internal resolution higher for better quality on retina/high-DPI displays
        canvas.width = internalWidth;
        canvas.height = internalHeight;
        
        // Set display size to viewport size (CSS pixels)
        canvas.style.width = displayWidth + 'px';
        canvas.style.height = displayHeight + 'px';
        
        // Update viewport to match internal resolution
        gl.viewport(0, 0, internalWidth, internalHeight);
      }
    };

    // Initial resize
    resizeCanvas();
    
    // Handle window resize and devicePixelRatio changes
    window.addEventListener('resize', resizeCanvas);
    
    // Also listen for devicePixelRatio changes (e.g., when moving between displays)
    const mediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    const handleDPRChange = () => {
      resizeCanvas();
    };
    mediaQuery.addEventListener('change', handleDPRChange);

    // Create shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
      console.error('Failed to create shaders');
      return;
    }
    
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      console.error('Failed to create program');
      return;
    }
    
    programRef.current = program;

    // Create quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW);

    // Setup attributes
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Create texture
    const texture = gl.createTexture();
    textureRef.current = texture;

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      mediaQuery.removeEventListener('change', handleDPRChange);
      if (textureRef.current && gl) {
        gl.deleteTexture(textureRef.current);
      }
    };
  }, []);

  // Capture page content to canvas - only once or when content changes
  useEffect(() => {
    const captureContent = async () => {
      const captureCanvas = captureCanvasRef.current;
      const content = contentRef.current;
      if (!captureCanvas || !content) return;

      // Wait for images to load
      const images = content.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails
          setTimeout(resolve, 2000); // Timeout after 2 seconds
        });
      });
      await Promise.all(imagePromises);

      const ctx = captureCanvas.getContext('2d', { 
        alpha: false,
        desynchronized: false,
        willReadFrequently: false
      });
      
      // Enable high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      const rect = content.getBoundingClientRect();
      
      // Capture full page width and height with device pixel ratio for better quality
      // Use devicePixelRatio to capture at higher resolution for retina/high-DPI displays
      const devicePixelRatio = window.devicePixelRatio || 1;
      const contentWidth = window.innerWidth;
      const contentHeight = Math.max(rect.height, content.scrollHeight);
      
      // Canvas dimensions: scale by devicePixelRatio for better quality
      // But limit to reasonable max to avoid memory issues
      // IMPORTANT: Match WebGL canvas width exactly to preserve aspect ratio
      const webglCanvas = canvasRef.current;
      const webglWidth = webglCanvas ? webglCanvas.width : window.innerWidth * devicePixelRatio;
      const webglHeight = webglCanvas ? webglCanvas.height : window.innerHeight * devicePixelRatio;
      const maxWidth = 3840; // 4K width limit
      const maxHeight = 8192; // Reasonable height limit
      
      // Match capture canvas width to WebGL canvas width to preserve aspect ratio
      let canvasWidth = Math.min(webglWidth, maxWidth);
      
      // Calculate canvas height to preserve aspect ratio EXACTLY
      // CRITICAL: The aspect ratio of the canvas MUST match the aspect ratio of the content EXACTLY
      // canvasWidth/canvasHeight = contentWidth/contentHeight
      // Therefore: canvasHeight = canvasWidth * contentHeight / contentWidth
      // Calculate ideal height first (without rounding)
      const idealCanvasHeight = (canvasWidth * contentHeight) / contentWidth;
      
      // Round to nearest integer for canvas dimensions
      let canvasHeight = Math.round(idealCanvasHeight);
      
      // Still respect max height limit
      canvasHeight = Math.min(canvasHeight, maxHeight);
      
      // CRITICAL: If height was capped or rounded, recalculate width to maintain EXACT aspect ratio
      // This ensures canvasWidth/canvasHeight = contentWidth/contentHeight exactly
      if (canvasHeight !== idealCanvasHeight) {
        // Recalculate width based on the actual (possibly capped/rounded) height
        // to ensure aspect ratio is preserved exactly
        const recalculatedWidth = (canvasHeight * contentWidth) / contentHeight;
        canvasWidth = Math.round(recalculatedWidth);
        canvasWidth = Math.min(canvasWidth, maxWidth);
        
        // Final height calculation with the recalculated width to ensure exact match
        canvasHeight = Math.round((canvasWidth * contentHeight) / contentWidth);
        canvasHeight = Math.min(canvasHeight, maxHeight);
      }
      
      // Final verification: ensure aspect ratios match exactly
      let finalCanvasAspect = canvasWidth / canvasHeight;
      let finalContentAspect = contentWidth / contentHeight;
      let aspectError = Math.abs(finalCanvasAspect - finalContentAspect);
      
      // If there's still a mismatch after all calculations, log a warning
      if (aspectError > 0.0001) {
        console.warn('Aspect ratio still not exact after calculations:', {
          canvasWidth,
          canvasHeight,
          contentWidth,
          contentHeight,
          canvasAspect: finalCanvasAspect,
          contentAspect: finalContentAspect,
          error: aspectError
        });
      }
      
      // Calculate content aspect ratio for logging
      const contentAspectRatio = contentWidth / contentHeight;
      
      console.log('Canvas dimensions:', {
        canvasWidth,
        canvasHeight,
        contentWidth,
        contentHeight,
        contentAspectRatio,
        calculatedHeight: canvasWidth / contentAspectRatio,
        expectedHeight: contentHeight * devicePixelRatio,
        devicePixelRatio,
        canvasAspectRatio: finalCanvasAspect,
        contentAspectRatioCheck: finalContentAspect,
        aspectRatioError: aspectError
      });
      
      // Don't recreate canvas if dimensions haven't changed
      if (captureCanvas.width !== canvasWidth || captureCanvas.height !== canvasHeight) {
        captureCanvas.width = canvasWidth;
        captureCanvas.height = canvasHeight;
        // Reset transform and scale context by devicePixelRatio
        // This allows us to work in logical pixels when drawing
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
      
      // Verify aspect ratio is preserved after canvas setup
      if (aspectError > 0.0001) {
        console.warn('Aspect ratio mismatch!', {
          canvasAspect: finalCanvasAspect,
          contentAspect: finalContentAspect,
          difference: aspectError,
          canvasWidth,
          canvasHeight,
          contentWidth,
          contentHeight
        });
      }
      
      // Clear canvas with black background (to match shader default)
      // Use logical pixel coordinates since we're scaling the context by devicePixelRatio
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasWidth / devicePixelRatio, canvasHeight / devicePixelRatio);
      
      try {
        // Declare variables at the top of try block for proper scope
        let headerRect = null;
        const header = content.querySelector('.bg-gradient-to-r');
        
        // Content should start at top of page (position: absolute, top: 0)
        // So we use rect.top as the offset - if content is at top, rect.top should be 0
        // But we need to ensure content starts at canvas Y=0
        const contentTopOffset = rect.top; // This is the offset from viewport top
        const actualContentWidth = Math.max(rect.width, window.innerWidth);
        const actualContentHeight = Math.max(rect.height, content.scrollHeight);
        
        // Calculate scaling factors - preserve aspect ratio by using the same scale for X and Y
        // Since we scale the context by devicePixelRatio, we work in logical pixels
        // Canvas logical size = canvasWidth / devicePixelRatio
        // Content logical size = actualContentWidth (from getBoundingClientRect)
        const logicalCanvasWidth = canvasWidth / devicePixelRatio;
        const logicalCanvasHeight = canvasHeight / devicePixelRatio;
        
        // CRITICAL: Verify that logical canvas dimensions preserve aspect ratio EXACTLY
        // logicalCanvasWidth/logicalCanvasHeight should equal actualContentWidth/actualContentHeight
        const contentAspectForScale = actualContentWidth / actualContentHeight;
        const logicalCanvasAspect = logicalCanvasWidth / logicalCanvasHeight;
        
        // If aspect ratios don't match exactly (due to rounding), recalculate logicalCanvasHeight
        // to ensure perfect aspect ratio match
        let finalLogicalCanvasHeight = logicalCanvasHeight;
        const aspectError = Math.abs(logicalCanvasAspect - contentAspectForScale);
        if (aspectError > 0.0001) {
          // Recalculate logical canvas height to match content aspect ratio exactly
          finalLogicalCanvasHeight = logicalCanvasWidth / contentAspectForScale;
          console.warn('Recalculating logical canvas height to preserve aspect ratio:', {
            originalLogicalCanvasHeight: logicalCanvasHeight,
            correctedLogicalCanvasHeight: finalLogicalCanvasHeight,
            aspectError,
            logicalCanvasAspect,
            contentAspectForScale
          });
        }
        
        // CRITICAL: Use the EXACT same scale for both X and Y to prevent any stretching
        // Calculate based on width since width is guaranteed to match WebGL canvas
        // This scale converts from logical content pixels to logical canvas pixels
        const uniformScale = logicalCanvasWidth / actualContentWidth;
        const scaleX = uniformScale;
        const scaleY = uniformScale; // MUST be identical to scaleX - no exceptions!
        
        // Verify that using uniformScale with the corrected height would give the same result
        const scaleYFromCorrectedHeight = finalLogicalCanvasHeight / actualContentHeight;
        if (Math.abs(scaleY - scaleYFromCorrectedHeight) > 0.000001) {
          console.warn('Scale Y verification failed:', {
            scaleY,
            scaleYFromCorrectedHeight,
            difference: Math.abs(scaleY - scaleYFromCorrectedHeight),
            finalLogicalCanvasHeight,
            actualContentHeight
          });
        }
        
        // Verify: canvasWidth/canvasHeight should equal actualContentWidth/actualContentHeight (aspect ratio preserved)
        const canvasAspectRatio = logicalCanvasWidth / logicalCanvasHeight;
        const contentAspectRatio = actualContentWidth / actualContentHeight;
        
        console.log('Scaling factors:', {
          canvasWidth,
          canvasHeight,
          logicalCanvasWidth,
          logicalCanvasHeight,
          actualContentWidth,
          actualContentHeight,
          canvasAspectRatio,
          contentAspectRatio,
          aspectRatioMatch: Math.abs(canvasAspectRatio - contentAspectRatio) < 0.0001,
          aspectRatioError: Math.abs(canvasAspectRatio - contentAspectRatio),
          scaleX,
          scaleY,
          scaleXEqualsScaleY: scaleX === scaleY,
          scaleDifference: Math.abs(scaleX - scaleY),
          devicePixelRatio
        });
        
        // Verify that scaleX and scaleY are truly identical
        if (Math.abs(scaleX - scaleY) > 0.000001) {
          console.error('CRITICAL: scaleX and scaleY are not identical!', {
            scaleX,
            scaleY,
            difference: Math.abs(scaleX - scaleY)
          });
        }
        
        // Verify aspect ratios match
        if (Math.abs(canvasAspectRatio - contentAspectRatio) > 0.0001) {
          console.warn('Aspect ratio mismatch in scaling calculation!', {
            canvasAspectRatio,
            contentAspectRatio,
            error: Math.abs(canvasAspectRatio - contentAspectRatio)
          });
        }
        
        console.log('Capture debug:', {
          rectTop: rect.top,
          contentTopOffset,
          canvasHeight,
          contentHeight: content.scrollHeight,
          viewportHeight: window.innerHeight
        });
        
        // Helper function to get computed style
        const getStyle = (element, property) => {
          const computed = window.getComputedStyle(element);
          return computed.getPropertyValue(property);
        };
        
        // Helper function to draw rounded rectangle
        const drawRoundedRect = (x, y, width, height, radius) => {
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.fill();
        };
        
        // Draw header with gradient - ensure it starts at Y=0
        if (header) {
          headerRect = header.getBoundingClientRect();
          // Force header to start at canvas Y=0 (it's the first element)
          const headerY = 0;
          const headerHeight = headerRect.height * scaleY;
          
          // Draw gradient background (simplified - solid color for now)
          ctx.fillStyle = '#581c87';
          ctx.fillRect(0, headerY, captureCanvas.width, headerHeight);
          
          // Draw header text elements - position relative to header start (Y=0)
          const headerTexts = header.querySelectorAll('h1, p, a');
          headerTexts.forEach((textEl) => {
            const textRect = textEl.getBoundingClientRect();
            // Calculate text position relative to header top (not content top)
            // textRect.top - headerRect.top gives offset within header
            const textY = headerY + (textRect.top - headerRect.top) * scaleY;
            const textX = (textRect.left - rect.left) * scaleX;
            const computedStyle = window.getComputedStyle(textEl);
            const fontSize = parseFloat(computedStyle.fontSize) * scaleY;
            const fontFamily = computedStyle.fontFamily;
            const fontWeight = computedStyle.fontWeight;
            const color = computedStyle.color;
            
            ctx.fillStyle = color;
            ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
            ctx.fillText(textEl.textContent || '', textX, textY + fontSize);
          });
        }
        
        // Draw controls section - position right after header
        const controls = content.querySelector('.bg-white\\/90') || content.querySelector('.backdrop-blur-sm');
        if (controls) {
          const controlsRect = controls.getBoundingClientRect();
          
          // Calculate controls Y position: right after header (which starts at Y=0)
          let controlsY;
          if (headerRect) {
            // Header ends at headerHeight, controls start right after (no gap)
            controlsY = headerRect.height * scaleY;
          } else {
            // Fallback: use relative positioning
            controlsY = (controlsRect.top - rect.top) * scaleY;
          }
          
          const controlsHeight = controlsRect.height * scaleY;
          const controlsX = (controlsRect.left - rect.left) * scaleX;
          const controlsWidth = controlsRect.width * scaleX;
          
          // Draw semi-transparent white background
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fillRect(controlsX, controlsY, controlsWidth, controlsHeight);
          
          // Draw control text - position relative to controls start
          const controlTexts = controls.querySelectorAll('h2, label, p');
          controlTexts.forEach((textEl) => {
            const textRect = textEl.getBoundingClientRect();
            // Calculate text position relative to controls top
            const textY = controlsY + (textRect.top - controlsRect.top) * scaleY;
            const textX = (textRect.left - rect.left) * scaleX;
            const computedStyle = window.getComputedStyle(textEl);
            const fontSize = parseFloat(computedStyle.fontSize) * scaleY;
            const fontFamily = computedStyle.fontFamily;
            const fontWeight = computedStyle.fontWeight;
            const color = computedStyle.color;
            
            ctx.fillStyle = color;
            ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
            ctx.fillText(textEl.textContent || '', textX, textY + fontSize);
          });
        }
        
        // Draw content sections with text and images in DOM order
        // Calculate starting Y position after header and controls
        let contentStartY = 0;
        if (headerRect) contentStartY += headerRect.height * scaleY;
        if (controls) {
          const controlsRect = controls.getBoundingClientRect();
          contentStartY += controlsRect.height * scaleY;
        }
        
        const sections = content.querySelectorAll('.bg-white');
        sections.forEach((section, index) => {
          const sectionRect = section.getBoundingClientRect();
          // Map content Y position to canvas Y position
          const sectionX = (sectionRect.left - rect.left) * scaleX;
          // Position sections after header and controls
          let sectionY;
          if (headerRect && controls) {
            const controlsRect = controls.getBoundingClientRect();
            // Calculate section Y relative to controls end
            sectionY = contentStartY + (sectionRect.top - controlsRect.bottom) * scaleY;
          } else if (headerRect) {
            sectionY = contentStartY + (sectionRect.top - headerRect.bottom) * scaleY;
          } else {
            sectionY = (sectionRect.top - rect.top) * scaleY;
          }
          const sectionWidth = sectionRect.width * scaleX;
          const sectionHeight = sectionRect.height * scaleY;
          
          // Get computed styles for section
          const sectionStyle = window.getComputedStyle(section);
          const bgColor = sectionStyle.backgroundColor;
          const borderRadius = parseFloat(sectionStyle.borderRadius) * scaleY;
          
          // Draw section background with rounded corners
          ctx.fillStyle = bgColor || '#ffffff';
          if (borderRadius > 0) {
            drawRoundedRect(sectionX, sectionY, sectionWidth, sectionHeight, borderRadius);
          } else {
            ctx.fillRect(sectionX, sectionY, sectionWidth, sectionHeight);
          }
          
          // Draw shadow if present
          const boxShadow = sectionStyle.boxShadow;
          if (boxShadow && boxShadow !== 'none') {
            // Simplified shadow - just draw a darker rectangle offset
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(sectionX + 2 * scaleX, sectionY + 2 * scaleY, sectionWidth, sectionHeight);
            // Redraw background on top
            ctx.fillStyle = bgColor || '#ffffff';
            if (borderRadius > 0) {
              drawRoundedRect(sectionX, sectionY, sectionWidth, sectionHeight, borderRadius);
            } else {
              ctx.fillRect(sectionX, sectionY, sectionWidth, sectionHeight);
            }
          }
          
          // Draw heading with actual styles
          const heading = section.querySelector('h2');
          if (heading) {
            const headingRect = heading.getBoundingClientRect();
            const headingX = (headingRect.left - rect.left) * scaleX;
            // Position relative to section start, not content top
            const headingY = sectionY + (headingRect.top - sectionRect.top) * scaleY;
            const headingStyle = window.getComputedStyle(heading);
            const fontSize = parseFloat(headingStyle.fontSize) * scaleY;
            const fontFamily = headingStyle.fontFamily;
            const fontWeight = headingStyle.fontWeight;
            const color = headingStyle.color;
            
            ctx.fillStyle = color;
            ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
            const headingText = heading.textContent || '';
            ctx.fillText(headingText, headingX, headingY + fontSize);
          }
          
          // Draw all child elements in DOM order (text, images, lists, etc.)
          // Position children relative to section start, not content top
          const children = Array.from(section.children);
          children.forEach((child) => {
            const childRect = child.getBoundingClientRect();
            const childHeight = childRect.height * scaleY;
            
            if (child.tagName === 'H2') {
              // Already drawn above
              return;
            } else if (child.tagName === 'PRE') {
              // Draw pre/code blocks with monospace font and background
              const preRect = child.getBoundingClientRect();
              const preX = (preRect.left - rect.left) * scaleX;
              const preY = sectionY + (preRect.top - sectionRect.top) * scaleY;
              const preStyle = window.getComputedStyle(child);
              const preBgColor = preStyle.backgroundColor || '#f3f4f6';
              const preWidth = preRect.width * scaleX;
              const preHeight = preRect.height * scaleY;
              
              // Draw background
              ctx.fillStyle = preBgColor;
              const borderRadius = parseFloat(preStyle.borderRadius) * scaleY || 0;
              if (borderRadius > 0) {
                drawRoundedRect(preX, preY, preWidth, preHeight, borderRadius);
              } else {
                ctx.fillRect(preX, preY, preWidth, preHeight);
              }
              
              // Draw code content
              const codeElement = child.querySelector('code') || child;
              const codeStyle = window.getComputedStyle(codeElement);
              const codeText = codeElement.textContent || '';
              const codeColor = codeStyle.color || '#000000';
              const codeFontFamily = codeStyle.fontFamily || 'monospace';
              const codeFontSize = parseFloat(codeStyle.fontSize) * scaleY || parseFloat(preStyle.fontSize) * scaleY || 14 * scaleY;
              const codeFontWeight = codeStyle.fontWeight || 'normal';
              
              ctx.fillStyle = codeColor;
              ctx.font = `${codeFontWeight} ${codeFontSize}px ${codeFontFamily}`;
              
              // Draw text line by line (preserve line breaks)
              const lines = codeText.split('\n');
              const lineHeight = codeFontSize * 1.2;
              const paddingX = parseFloat(preStyle.paddingLeft || '16px') * scaleX;
              const paddingY = parseFloat(preStyle.paddingTop || '16px') * scaleY;
              
              lines.forEach((line, index) => {
                const lineY = preY + paddingY + (index + 1) * lineHeight;
                ctx.fillText(line, preX + paddingX, lineY);
              });
            } else if (child.tagName === 'P') {
              // Draw paragraph text with actual styles, handling inline code elements
              // Position relative to section, not content top
              const pStyle = window.getComputedStyle(child);
              const pX = (childRect.left - rect.left) * scaleX;
              // Calculate Y relative to section start
              const pY = sectionY + (childRect.top - sectionRect.top) * scaleY;
              const fontSize = parseFloat(pStyle.fontSize) * scaleY;
              const fontFamily = pStyle.fontFamily;
              const fontWeight = pStyle.fontWeight;
              const color = pStyle.color;
              const lineHeight = parseFloat(pStyle.lineHeight) * scaleY || fontSize * 1.2;
              const maxWidth = childRect.width * scaleX;
              
              // Draw paragraph handling inline elements (code, strong, em, etc.)
              let currentX = pX;
              let currentY = pY + fontSize;
              
              // Function to draw text with specific styles
              const drawTextWithStyle = (text, style, x, y) => {
                ctx.fillStyle = style.color || color;
                ctx.font = `${style.fontWeight || fontWeight} ${style.fontSize || fontSize}px ${style.fontFamily || fontFamily}`;
                
                // Handle background for code elements
                if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') {
                  const metrics = ctx.measureText(text);
                  const bgX = x;
                  const bgY = y - fontSize;
                  const bgWidth = metrics.width;
                  const bgHeight = fontSize * 1.2;
                  
                  ctx.fillStyle = style.backgroundColor;
                  ctx.fillRect(bgX, bgY, bgWidth, bgHeight);
                }
                
                ctx.fillStyle = style.color || color;
                ctx.fillText(text, x, y);
                return ctx.measureText(text).width;
              };
              
              // Traverse child nodes to handle inline elements
              const processNode = (node, startX, startY) => {
                let x = startX;
                let y = startY;
                
                if (node.nodeType === 3) { // TEXT_NODE
                  // Text node - draw word by word with wrapping
                  const text = node.textContent || '';
                  const words = text.split(' ');
                  let line = '';
                  
                  words.forEach((word) => {
                    const testLine = line + (line ? ' ' : '') + word;
                    const testMetrics = ctx.measureText(testLine);
                    if (testMetrics.width > maxWidth && line.length > 0) {
                      ctx.fillText(line, x, y);
                      line = word;
                      y += lineHeight;
                      x = pX; // Reset to left margin
                    } else {
                      line = testLine;
                    }
                  });
                  
                  if (line.length > 0) {
                    ctx.fillText(line, x, y);
                    x += ctx.measureText(line).width;
                  }
                  
                  return { x, y };
                } else if (node.nodeType === 1) { // ELEMENT_NODE
                  const element = node;
                  const tagName = element.tagName;
                  
                  if (tagName === 'CODE') {
                    // Handle inline code element
                    const codeStyle = window.getComputedStyle(element);
                    const codeText = element.textContent || '';
                    const codeColor = codeStyle.color || color;
                    const codeBgColor = codeStyle.backgroundColor;
                    const codeFontFamily = codeStyle.fontFamily || 'monospace';
                    const codeFontSize = parseFloat(codeStyle.fontSize) * scaleY || fontSize;
                    const codeFontWeight = codeStyle.fontWeight || fontWeight;
                    
                    // Check if code fits on current line
                    ctx.font = `${codeFontWeight} ${codeFontSize}px ${codeFontFamily}`;
                    const codeMetrics = ctx.measureText(codeText);
                    
                    if (x + codeMetrics.width > pX + maxWidth && x > pX) {
                      // Move to next line
                      y += lineHeight;
                      x = pX;
                    }
                    
                    // Draw background if present
                    if (codeBgColor && codeBgColor !== 'rgba(0, 0, 0, 0)' && codeBgColor !== 'transparent') {
                      const padding = parseFloat(codeStyle.paddingLeft || '0') * scaleX;
                      const bgX = x - padding;
                      const bgY = y - codeFontSize;
                      const bgWidth = codeMetrics.width + (padding * 2);
                      const bgHeight = codeFontSize * 1.2;
                      
                      ctx.fillStyle = codeBgColor;
                      ctx.fillRect(bgX, bgY, bgWidth, bgHeight);
                    }
                    
                    // Draw code text
                    ctx.fillStyle = codeColor;
                    ctx.font = `${codeFontWeight} ${codeFontSize}px ${codeFontFamily}`;
                    ctx.fillText(codeText, x, y);
                    x += codeMetrics.width;
                    
                    return { x, y };
                  } else if (tagName === 'STRONG' || tagName === 'B') {
                    // Handle bold text
                    const strongStyle = window.getComputedStyle(element);
                    const strongText = element.textContent || '';
                    const strongFontWeight = strongStyle.fontWeight || 'bold';
                    
                    ctx.font = `${strongFontWeight} ${fontSize}px ${fontFamily}`;
                    const strongMetrics = ctx.measureText(strongText);
                    
                    if (x + strongMetrics.width > pX + maxWidth && x > pX) {
                      y += lineHeight;
                      x = pX;
                    }
                    
                    ctx.fillStyle = color;
                    ctx.fillText(strongText, x, y);
                    x += strongMetrics.width;
                    
                    return { x, y };
                  } else if (tagName === 'EM' || tagName === 'I') {
                    // Handle italic text
                    const emStyle = window.getComputedStyle(element);
                    const emText = element.textContent || '';
                    const emFontStyle = emStyle.fontStyle || 'italic';
                    
                    ctx.font = `${emFontStyle} ${fontSize}px ${fontFamily}`;
                    const emMetrics = ctx.measureText(emText);
                    
                    if (x + emMetrics.width > pX + maxWidth && x > pX) {
                      y += lineHeight;
                      x = pX;
                    }
                    
                    ctx.fillStyle = color;
                    ctx.fillText(emText, x, y);
                    x += emMetrics.width;
                    
                    return { x, y };
                  } else {
                    // Other inline elements - process children
                    let currentX = x;
                    let currentY = y;
                    Array.from(element.childNodes).forEach((childNode) => {
                      const result = processNode(childNode, currentX, currentY);
                      currentX = result.x;
                      currentY = result.y;
                    });
                    return { x: currentX, y: currentY };
                  }
                }
                
                return { x, y };
              };
              
              // Set default font for paragraph
              ctx.fillStyle = color;
              ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
              
              // Process all child nodes of the paragraph
              Array.from(child.childNodes).forEach((node) => {
                const result = processNode(node, currentX, currentY);
                currentX = result.x;
                currentY = result.y;
              });
            } else if (child.tagName === 'IMG') {
              // Draw image at its actual position with rounded corners if needed
              if (child.complete && child.naturalWidth > 0) {
                try {
                  const imgRect = child.getBoundingClientRect();
                  const imgX = (imgRect.left - rect.left) * scaleX;
                  // Position relative to section start, not content top
                  const imgY = sectionY + (imgRect.top - sectionRect.top) * scaleY;
                  // Use uniform scale for both dimensions (scaleX === scaleY)
                  const imgWidth = imgRect.width * scaleX;
                  const imgHeight = imgRect.height * scaleY; // scaleY === scaleX, so this preserves aspect ratio
                  const imgStyle = window.getComputedStyle(child);
                  const borderRadius = parseFloat(imgStyle.borderRadius) * scaleY;
                  
                  if (borderRadius > 0) {
                    // Draw image with rounded corners
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(imgX + borderRadius, imgY);
                    ctx.lineTo(imgX + imgWidth - borderRadius, imgY);
                    ctx.quadraticCurveTo(imgX + imgWidth, imgY, imgX + imgWidth, imgY + borderRadius);
                    ctx.lineTo(imgX + imgWidth, imgY + imgHeight - borderRadius);
                    ctx.quadraticCurveTo(imgX + imgWidth, imgY + imgHeight, imgX + imgWidth - borderRadius, imgY + imgHeight);
                    ctx.lineTo(imgX + borderRadius, imgY + imgHeight);
                    ctx.quadraticCurveTo(imgX, imgY + imgHeight, imgX, imgY + imgHeight - borderRadius);
                    ctx.lineTo(imgX, imgY + borderRadius);
                    ctx.quadraticCurveTo(imgX, imgY, imgX + borderRadius, imgY);
                    ctx.closePath();
                    ctx.clip();
                    ctx.drawImage(child, imgX, imgY, imgWidth, imgHeight);
                    ctx.restore();
                  } else {
                    ctx.drawImage(child, imgX, imgY, imgWidth, imgHeight);
                  }
                } catch (e) {
                  console.warn('Could not draw image:', e);
                }
              }
            } else if (child.tagName === 'UL' || child.tagName === 'OL') {
              // Draw list with actual styles
              const listStyle = window.getComputedStyle(child);
              const listX = (childRect.left - rect.left) * scaleX;
              // Position relative to section start, not content top
              const listY = sectionY + (childRect.top - sectionRect.top) * scaleY;
              const fontSize = parseFloat(listStyle.fontSize) * scaleY;
              const fontFamily = listStyle.fontFamily;
              const fontWeight = listStyle.fontWeight;
              const color = listStyle.color;
              const lineHeight = parseFloat(listStyle.lineHeight) * scaleY || fontSize * 1.5;
              
              ctx.fillStyle = color;
              ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
              
              const listItems = child.querySelectorAll('li');
              let currentY = listY + fontSize;
              listItems.forEach((li) => {
                const liStyle = window.getComputedStyle(li);
                const liColor = liStyle.color || color;
                ctx.fillStyle = liColor;
                
                const listText = '• ' + (li.textContent || '');
                const words = listText.split(' ');
                let line = '';
                const maxWidth = childRect.width * scaleX;
                
                words.forEach((word) => {
                  const testLine = line + word + ' ';
                  const metrics = ctx.measureText(testLine);
                  if (metrics.width > maxWidth && line.length > 0) {
                    ctx.fillText(line, listX, currentY);
                    line = word + ' ';
                    currentY += lineHeight;
                  } else {
                    line = testLine;
                  }
                });
                if (line.length > 0) {
                  ctx.fillText(line, listX, currentY);
                  currentY += lineHeight;
                }
                currentY += 2 * scaleY; // Space between list items
              });
            } else if (child.tagName === 'DIV') {
              // Handle nested divs (like flex containers with images)
              const nestedImgs = child.querySelectorAll('img');
              nestedImgs.forEach((img) => {
                if (img.complete && img.naturalWidth > 0) {
                  try {
                    const imgRect = img.getBoundingClientRect();
                    const imgX = (imgRect.left - rect.left) * scaleX;
                    // Position relative to section start, not content top
                    const imgY = sectionY + (imgRect.top - sectionRect.top) * scaleY;
                    const imgWidth = imgRect.width * scaleX;
                    const imgHeight = imgRect.height * scaleY;
                    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
                  } catch (e) {
                    console.warn('Could not draw nested image:', e);
                  }
                }
              });
              
              // Also draw text in nested divs
              const nestedText = child.querySelectorAll('p');
              nestedText.forEach((p) => {
                const pRect = p.getBoundingClientRect();
                const pX = (pRect.left - rect.left) * scaleX;
                // Position relative to section start, not content top
                const pY = sectionY + (pRect.top - sectionRect.top) * scaleY;
                const pStyle = window.getComputedStyle(p);
                const fontSize = parseFloat(pStyle.fontSize) * scaleY;
                const fontFamily = pStyle.fontFamily;
                const fontWeight = pStyle.fontWeight;
                const color = pStyle.color;
                const lineHeight = parseFloat(pStyle.lineHeight) * scaleY || fontSize * 1.2;
                
                ctx.fillStyle = color;
                ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
                
                const text = p.textContent || '';
                const words = text.split(' ');
                let line = '';
                const maxWidth = pRect.width * scaleX;
                let textY = pY + fontSize;
                
                words.forEach((word) => {
                  const testLine = line + word + ' ';
                  const metrics = ctx.measureText(testLine);
                  if (metrics.width > maxWidth && line.length > 0) {
                    ctx.fillText(line, pX, textY);
                    line = word + ' ';
                    textY += lineHeight;
                  } else {
                    line = testLine;
                  }
                });
                if (line.length > 0) {
                  ctx.fillText(line, pX, textY);
                }
              });
            }
          });
        });
        
        setContentCaptured(true);
        
        // Resize WebGL canvas to viewport size (100vh)
        if (canvasRef.current && glRef.current) {
          const gl = glRef.current;
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          gl.viewport(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        
        // Signal that texture needs update (will be picked up by animation loop)
        if (glRef.current && textureRef.current) {
          const gl = glRef.current;
          const texture = textureRef.current;
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, captureCanvas);
          // CRITICAL: Use CLAMP_TO_EDGE to prevent repeating - must be set after texImage2D
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          
          // Enable anisotropic filtering if available
          const ext = gl.getExtension('EXT_texture_filter_anisotropic');
          if (ext) {
            const maxAnisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(maxAnisotropy, 4.0));
          }
          
          // Verify texture dimensions match canvas dimensions
          console.log('Texture dimensions:', captureCanvas.width, 'x', captureCanvas.height);
          console.log('Canvas dimensions:', canvasRef.current?.width, 'x', canvasRef.current?.height);
        }
      } catch (error) {
        console.error('Error capturing content:', error);
      }
    };

    // Capture after a delay to ensure content is rendered
    const timeoutId = setTimeout(captureContent, 1000);
    
    // Debounce resize to avoid excessive captures
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(captureContent, 500);
    };
    
    window.addEventListener('load', captureContent);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('load', captureContent);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    let animationFrameId;
    const gl = glRef.current;
    const program = programRef.current;
    const texture = textureRef.current;
    const captureCanvas = captureCanvasRef.current;

    if (!gl || !program || !texture || !captureCanvas || !contentCaptured) return;

    // Track texture state - texture is updated in captureContent, so we just bind it here
    let lastCanvasWidth = captureCanvas.width;
    let lastCanvasHeight = captureCanvas.height;

    const render = () => {
      // Only update time if needed (currently not used since glitch is disabled)
      // setTime(prev => prev + 0.016); // ~60fps

      // Check if canvas changed (shouldn't happen often)
      const canvasChanged = captureCanvas.width !== lastCanvasWidth || 
                           captureCanvas.height !== lastCanvasHeight;
      
      if (canvasChanged) {
        // Canvas size changed, update texture
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, captureCanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        
        // Enable anisotropic filtering if available for better quality
        const ext = gl.getExtension('EXT_texture_filter_anisotropic');
        if (ext) {
          const maxAnisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(maxAnisotropy, 4.0));
        }
        
        lastCanvasWidth = captureCanvas.width;
        lastCanvasHeight = captureCanvas.height;
      } else {
        // Just bind the existing texture - no need to update every frame
        gl.bindTexture(gl.TEXTURE_2D, texture);
      }

      gl.useProgram(program);

      // Set uniforms
      const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
      const textureResolutionLocation = gl.getUniformLocation(program, 'u_textureResolution');
      const timeLocation = gl.getUniformLocation(program, 'u_time');
      const glitchIntensityLocation = gl.getUniformLocation(program, 'u_glitchIntensity');
      const scrollOffsetLocation = gl.getUniformLocation(program, 'u_scrollOffset');
      const textureLocation = gl.getUniformLocation(program, 'u_texture');

      gl.uniform2f(resolutionLocation, canvasRef.current.width, canvasRef.current.height);
      gl.uniform2f(textureResolutionLocation, captureCanvas.width, captureCanvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform1f(glitchIntensityLocation, glitchIntensity);
      
      // Get scroll position from canvas container
      // Calculate normalized scroll based on content height vs viewport height
      // Use eased scroll position for smooth animation
      const contentHeight = contentRef.current ? contentRef.current.scrollHeight : window.innerHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = Math.max(0, contentHeight - viewportHeight);
      // Normalize eased scroll: 0 = at top, 1 = at bottom
      // When easedScrollY = 0, normalizedScrollY = 0 (show top of content)
      // When easedScrollY = maxScroll, normalizedScrollY = 1 (show bottom of content)
      const normalizedScrollY = maxScroll > 0 ? easedScrollY / maxScroll : 0;
      
      // Pass eased scroll offset to shader (normalized 0-1)
      gl.uniform2f(scrollOffsetLocation, 0, normalizedScrollY);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      
      // Ensure texture parameters are set to prevent repeating
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      
      gl.uniform1i(textureLocation, 0);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [time, glitchIntensity, contentCaptured, easedScrollY]);

  // Smooth scroll interpolation using refs to avoid dependency issues
  const easedScrollYRef = useRef(0);
  
  useEffect(() => {
    if (!contentCaptured) return;

    let isAnimating = true;
    
    const animate = () => {
      if (!isAnimating) return;
      
      const current = easedScrollYRef.current;
      const target = targetScrollYRef.current;
      const diff = target - current;
      
      // If difference is very small, snap to target and stop
      if (Math.abs(diff) < 0.1) {
        easedScrollYRef.current = target;
        setEasedScrollY(target);
        isAnimating = false;
        animationFrameRef.current = null;
        return;
      }
      
      // Interpolate with easing - use a factor for smooth but responsive easing
      // Factor of 0.1 gives smooth easing (higher = faster, lower = slower)
      const factor = 0.1;
      const eased = current + diff * factor;
      easedScrollYRef.current = eased;
      setEasedScrollY(eased);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation if not already running
    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      isAnimating = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [contentCaptured]);
  
  // Update ref when easedScrollY changes externally
  useEffect(() => {
    easedScrollYRef.current = easedScrollY;
  }, [easedScrollY]);

  // Track scroll position from canvas container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      
      // Calculate scroll progress (0 to 1)
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollProgress(progress);
      
      setScrollY(scrollTop);
      targetScrollYRef.current = scrollTop; // Update target for easing
      
      // Restart animation if it stopped
      if (animationFrameRef.current === null && contentCaptured) {
        const animate = () => {
          const current = easedScrollYRef.current;
          const target = targetScrollYRef.current;
          const diff = target - current;
          
          if (Math.abs(diff) < 0.1) {
            easedScrollYRef.current = target;
            setEasedScrollY(target);
            animationFrameRef.current = null;
            return;
          }
          
          const factor = 0.1;
          const eased = current + diff * factor;
          easedScrollYRef.current = eased;
          setEasedScrollY(eased);
          
          animationFrameRef.current = requestAnimationFrame(animate);
        };
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [contentCaptured]);

  // Debug: Log when component renders
  console.log('GlitchDemo rendering', { contentCaptured, glitchIntensity });

  try {
    return (
    <div className="bg-black relative" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Custom Scrollbar Styles */}
      <style>{`
        .glitch-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .glitch-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
        }
        .glitch-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7 0%, #6366f1 100%);
          border-radius: 6px;
          border: 2px solid rgba(0, 0, 0, 0.2);
        }
        .glitch-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9333ea 0%, #4f46e5 100%);
        }
        /* Firefox scrollbar */
        .glitch-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #a855f7 rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* 
        CANVAS 1: Hidden capture canvas (Canvas 2D)
        - Used to capture DOM content as an image
        - Hidden from view (className="hidden")
        - Full page dimensions (width × full height)
        - This canvas is drawn to using Canvas 2D API, then used as a WebGL texture
      */}
      <canvas
        ref={captureCanvasRef}
        className="hidden"
      />

      {/* Scrollable container - canvas stays 100vh, texture scrolls inside */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 pointer-events-auto glitch-scrollbar"
        style={{ 
          opacity: contentCaptured ? 1 : 0,
          overflow: 'auto',
          width: '100%',
          height: '100%'
        }}
      >
        {/* 
          CANVAS 2: WebGL rendering canvas
          - Displays the shader output (what user sees)
          - Fixed at viewport height (100vh)
          - Samples from capture canvas texture
          - Sticky so it stays visible while scrolling
        */}
        <canvas
          ref={canvasRef}
          className="w-full sticky top-0"
          style={{ display: 'block', width: '100%', height: '100vh' }}
        />
        {/* Spacer to enable scrolling - matches content height */}
        <div style={{ 
          height: contentRef.current ? `${contentRef.current.scrollHeight}px` : '100vh',
          width: '1px'
        }} />
      </div>

      {/* Scroll Indicator */}
      <div 
        className="fixed bottom-8 right-8 z-50 pointer-events-none"
        style={{ opacity: contentCaptured ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-purple-500/30">
          {/* Scroll Progress Bar */}
          <div className="w-48 mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-xs font-medium">Scroll Progress</span>
              <span className="text-purple-300 text-xs">{Math.round(scrollProgress * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>
          
          {/* Scroll Arrow Indicator */}
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

      {/* Hidden content used for capture only - not visible */}
      <div 
        ref={contentRef} 
        className="relative z-0 pointer-events-none" 
        style={{ 
          minHeight: '100vh',
          visibility: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white px-4 py-2 mb-2">
          <Link 
            to="/shaders" 
            className="inline-flex items-center gap-1 text-purple-200 hover:text-white mb-1 text-xs"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Shaders
          </Link>
          <h1 className="text-2xl font-bold mb-0.5">Glitch Effect Demo</h1>
          <p className="text-purple-200 text-xs mb-0.5">Scroll to see the glitch effect applied to the page content</p>
          <p className="text-purple-300 text-xs leading-tight">This page demonstrates a full-screen WebGL shader overlay with a "bad TV" glitch effect.</p>
        </div>

        {/* Controls */}
        <div className="bg-white/90 backdrop-blur-sm p-6 mb-8 sticky top-0 z-20 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Control Panel</h2>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Glitch Intensity: {glitchIntensity.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={glitchIntensity}
              onChange={(e) => setGlitchIntensity(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-2">
              Adjust the slider to control the strength of the glitch effect. Higher values create more intense distortion.
            </p>
          </div>
        </div>

        {/* Documentation Content */}
        <div className="max-w-4xl mx-auto px-8 pb-16 space-y-8">
          {/* Overview Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This page demonstrates a full-screen WebGL shader overlay that captures the page content as a texture and applies a "bad TV" glitch effect in real-time. The implementation uses two canvases: a hidden Canvas 2D for capturing DOM content, and a WebGL canvas for rendering the shader effect. The canvas is scrollable, allowing the texture to scroll within a fixed viewport while maintaining smooth easing animations.
            </p>
            <img
              src="/cd7944c9-7e7a-4ac8-b4c0-17e1639fe382.webp"
              alt="Demo"
              className="rounded-lg shadow-lg mb-6"
              style={{ width: '400px', height: '600px', objectFit: 'cover' }}
            />
          </div>

          {/* Math Behind Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Math Behind</h2>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">1. Aspect Ratio Preservation</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              To prevent stretching, the capture canvas dimensions must exactly match the content's aspect ratio:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`canvasWidth / canvasHeight = contentWidth / contentHeight

Therefore:
canvasHeight = (canvasWidth × contentHeight) / contentWidth`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              This ensures a 1:1 pixel mapping without distortion. The canvas width matches the WebGL canvas width (scaled by devicePixelRatio for high-DPI displays), and the height is calculated to preserve the exact aspect ratio.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">2. Uniform Scaling</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              When drawing content to the capture canvas, we use uniform scaling to preserve aspect ratio:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`logicalCanvasWidth = canvasWidth / devicePixelRatio
logicalCanvasHeight = canvasHeight / devicePixelRatio

uniformScale = logicalCanvasWidth / actualContentWidth
scaleX = uniformScale
scaleY = uniformScale  // MUST be identical to scaleX`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              By using the same scale factor for both X and Y dimensions, we ensure that content is scaled proportionally without any vertical or horizontal stretching.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">3. Coordinate Transformation</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Elements are positioned on the canvas using scaled coordinates:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`// Position calculation
canvasX = (elementRect.left - contentRect.left) × scaleX
canvasY = (elementRect.top - contentRect.top) × scaleY

// Size calculation
canvasWidth = elementRect.width × scaleX
canvasHeight = elementRect.height × scaleY`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              All measurements from <code className="bg-gray-200 px-1 rounded">getBoundingClientRect()</code> are in logical pixels, which are then scaled to match the capture canvas dimensions (in physical pixels, accounting for devicePixelRatio).
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">4. Texture Coordinate Mapping</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              In the shader, screen coordinates are mapped to texture coordinates:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`// Viewport dimensions in texture space
viewportHeightInTexture = resolution.y / textureResolution.y
viewportWidthInTexture = resolution.x / textureResolution.x

// Scrollable range
scrollableRange = max(0.0, 1.0 - viewportHeightInTexture)

// Map screen Y to texture Y
screenY = 1.0 - uv.y  // Convert WebGL coords (0=bottom) to screen (0=top)
textureY = scrollOffsetY × scrollableRange + screenY × viewportHeightInTexture

// X maps 1:1 since widths match
textureX = uv.x`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              This mapping allows the texture to scroll within the fixed viewport, showing different portions of the captured content as the user scrolls.
            </p>
          </div>

          {/* Shader Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Shader</h2>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Fragment Shader Overview</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The fragment shader processes each pixel of the captured texture, applying multiple glitch effects simultaneously. It uses GLSL (OpenGL Shading Language) functions to manipulate UV coordinates, sample colors, and combine effects.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Glitch Effects Breakdown</h3>
            
            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4">1. Vertical Wobble</h4>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`float wobble = sin(uv.y * 10.0 + u_time * 2.0) * u_glitchIntensity * 0.02;
vec2 wobbleUV = uv + vec2(0.0, wobble);`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Uses <code className="bg-gray-200 px-1 rounded">sin()</code> to create a wave-like vertical distortion. The frequency is controlled by multiplying <code className="bg-gray-200 px-1 rounded">uv.y</code> by 10.0, and animation is driven by <code className="bg-gray-200 px-1 rounded">u_time</code>.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4">2. Horizontal Scan Lines</h4>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`float scanLine = sin(uv.y * 200.0) * u_glitchIntensity * 0.15;
color += scanLine * vec3(0.1, 0.1, 0.1);`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Creates horizontal lines that simulate CRT monitor artifacts. High frequency (200.0) creates thin lines across the screen.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4">3. Screen Tearing</h4>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`float tear = step(0.98, random(vec2(floor(uv.y * 50.0), floor(u_time * 10.0))));
float tearOffset = (random(vec2(floor(uv.y * 50.0), floor(u_time * 10.0) + 1.0)) - 0.5) * 0.08;
vec2 tearUV = glitchUV + vec2(tearOffset * tear, 0.0);`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Uses <code className="bg-gray-200 px-1 rounded">step()</code> and random functions to create horizontal shifts at random Y positions, simulating screen tearing artifacts.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4">4. RGB Channel Separation</h4>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`float offset = sin(u_time * 3.0) * u_glitchIntensity * 0.01;
float r = texture2D(tex, glitchUV + vec2(offset, 0.0)).r;
float g = texture2D(tex, glitchUV).g;
float b = texture2D(tex, glitchUV - vec2(offset, 0.0)).b;
color = mix(color, vec3(r, g, b), u_glitchIntensity * 0.5);`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Samples red, green, and blue channels at slightly offset positions, then combines them to create chromatic aberration (color bleeding) effects.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4">5. Static Noise</h4>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`float noise = random(uv + u_time) * u_glitchIntensity * 0.15;
color += noise;`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Adds random pixel interference using a pseudo-random function that varies with UV coordinates and time.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4">6. Flickering Brightness</h4>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`float flicker = 0.7 + 0.3 * sin(u_time * 30.0);
color *= flicker;`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Rapidly modulates brightness using a high-frequency sine wave to simulate signal loss and flickering.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4">7. Horizontal Interference Bars</h4>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`float interference = step(0.9, random(vec2(floor(uv.y * 30.0), floor(u_time * 5.0))));
color += interference * vec3(0.3, 0.0, 0.3) * u_glitchIntensity;`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Creates horizontal interference bars using <code className="bg-gray-200 px-1 rounded">step()</code> to threshold random values, creating distinct horizontal bands.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Key GLSL Functions Used</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><code className="bg-gray-200 px-1 rounded">sin()</code> / <code className="bg-gray-200 px-1 rounded">cos()</code> - Trigonometric functions for wave patterns</li>
              <li><code className="bg-gray-200 px-1 rounded">step()</code> - Creates sharp transitions (0 or 1 based on threshold)</li>
              <li><code className="bg-gray-200 px-1 rounded">mix()</code> - Linear interpolation between two values</li>
              <li><code className="bg-gray-200 px-1 rounded">fract()</code> - Returns fractional part (for repeating patterns)</li>
              <li><code className="bg-gray-200 px-1 rounded">floor()</code> - Rounds down to nearest integer</li>
              <li><code className="bg-gray-200 px-1 rounded">texture2D()</code> - Samples texture at UV coordinates</li>
              <li><code className="bg-gray-200 px-1 rounded">clamp()</code> - Constrains value to range [0, 1]</li>
            </ul>
          </div>

          {/* Scrollable Canvas Shader Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Making the Canvas Scrollable</h2>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Architecture Overview</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The implementation uses a two-canvas system to create a scrollable shader effect:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-3 mb-6">
              <li><strong>Capture Canvas (Canvas 2D)</strong> - Hidden canvas that captures the entire page content as a texture. This canvas has dimensions matching the full content height, preserving aspect ratio.</li>
              <li><strong>WebGL Canvas</strong> - Fixed at viewport height (100vh) that displays the shader. This canvas samples from the capture canvas texture and scrolls the texture within the fixed viewport.</li>
            </ol>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Scroll Implementation</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The scroll functionality is achieved through several key mechanisms:
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4">1. Scroll Container Setup</h4>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`<div style={{ overflow: 'auto', width: '100%', height: '100%' }}>
  <canvas style={{ height: '100vh', position: 'sticky', top: 0 }} />
  <div style={{ height: contentHeight + 'px' }} /> {/* Spacer */}
</div>`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The container has <code className="bg-gray-200 px-1 rounded">overflow: auto</code> to enable scrolling. The canvas is positioned <code className="bg-gray-200 px-1 rounded">sticky</code> at the top, keeping it fixed in the viewport. A spacer div matches the content height, enabling scrolling.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4">2. Scroll Position Tracking</h4>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    setScrollY(scrollY);
    targetScrollYRef.current = scrollY;
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The scroll position is tracked using <code className="bg-gray-200 px-1 rounded">window.scrollY</code> and stored in state. A ref stores the target scroll position for the easing animation.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4">3. Normalized Scroll Offset</h4>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`const contentHeight = contentRef.current.scrollHeight;
const viewportHeight = window.innerHeight;
const maxScroll = Math.max(0, contentHeight - viewportHeight);
const normalizedScrollY = maxScroll > 0 ? easedScrollY / maxScroll : 0;

// Pass to shader
gl.uniform2f(scrollOffsetLocation, 0, normalizedScrollY);`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The scroll position is normalized to a 0-1 range, where 0 represents the top of the content and 1 represents the bottom. This normalized value is passed to the shader as a uniform.
            </p>

            <h4 className="text-xl font-semibold text-gray-700 mb-2 mt-4">4. Shader Texture Mapping</h4>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`// Calculate scrollable range
float scrollableRange = max(0.0, 1.0 - viewportHeightInTexture);

// Map screen Y to texture Y based on scroll position
float screenY = 1.0 - uv.y;  // Convert to screen coordinates
float textureY = scrollOffsetY * scrollableRange + screenY * viewportHeightInTexture;

// Sample texture at calculated position
vec3 color = texture2D(u_texture, vec2(uv.x, textureY)).rgb;`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The shader calculates which portion of the texture to display based on the scroll offset. As the user scrolls, different parts of the captured content are sampled and displayed in the fixed viewport.
            </p>

            <img
              src="/cd7944c9-7e7a-4ac8-b4c0-17e1639fe382.webp"
              alt="Demo"
              className="rounded-lg shadow-lg mb-6"
              style={{ width: '400px', height: '600px', objectFit: 'cover' }}
            />
          </div>

          {/* Easing When Scrolling Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Easing When Scrolling</h2>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Why Easing?</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Without easing, the scroll position updates instantly, which can feel jarring. Easing creates smooth, natural-feeling animations that gradually approach the target scroll position, making the scrolling experience more pleasant and polished.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Easing Function</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The implementation uses an ease-out cubic function for smooth deceleration:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// t: progress from 0 to 1
// Returns: eased value from 0 to 1`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              This function starts fast and slows down as it approaches the target, creating a natural deceleration effect. The cubic curve provides a smooth, pleasing animation.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Animation Loop</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The easing animation runs continuously using <code className="bg-gray-200 px-1 rounded">requestAnimationFrame</code>:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`const animate = () => {
  const current = easedScrollYRef.current;
  const target = targetScrollYRef.current;
  const diff = target - current;
  
  // If difference is small, snap to target
  if (Math.abs(diff) < 0.5) {
    setEasedScrollY(target);
    return;
  }
  
  // Calculate eased interpolation
  const progress = Math.min(1, Math.abs(diff) / 100); // Normalize
  const easedProgress = easeOutCubic(progress);
  const newValue = current + diff * easedProgress * 0.1; // 10% per frame
  
  setEasedScrollY(newValue);
  animationFrameRef.current = requestAnimationFrame(animate);
};`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The animation loop:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>Calculates the difference between current and target scroll positions</li>
              <li>If the difference is very small (&lt; 0.5px), snaps directly to the target</li>
              <li>Otherwise, calculates an eased interpolation using the cubic function</li>
              <li>Updates the eased scroll position by 10% of the difference per frame</li>
              <li>Continues animating until the target is reached</li>
            </ol>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Mathematical Explanation</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The easing function uses cubic interpolation:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`easeOutCubic(t) = 1 - (1 - t)³

Where:
- t = progress (0 to 1)
- (1 - t) = remaining progress
- (1 - t)³ = cubic deceleration
- 1 - (1 - t)³ = eased value`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The cubic function creates a smooth curve where:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>At t=0: returns 0 (start position)</li>
              <li>At t=0.5: returns ~0.875 (fast initial movement)</li>
              <li>At t=1: returns 1 (end position)</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              This means the animation moves quickly at the start and slows down as it approaches the target, creating a natural deceleration effect.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">Integration with Shader</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The eased scroll position is passed to the shader in the render loop:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg mb-3 overflow-x-auto" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
              <code className="text-sm" style={{ fontFamily: 'monospace' }}>
{`// In render loop
const normalizedScrollY = maxScroll > 0 ? easedScrollY / maxScroll : 0;
gl.uniform2f(scrollOffsetLocation, 0, normalizedScrollY);`}
              </code>
            </pre>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The shader uses this eased value to smoothly transition the texture position, creating a fluid scrolling experience even when the user scrolls quickly or stops abruptly.
            </p>

            <img
              src="/cd7944c9-7e7a-4ac8-b4c0-17e1639fe382.webp"
              alt="Demo"
              className="rounded-lg shadow-lg mb-6"
              style={{ width: '400px', height: '600px', objectFit: 'cover' }}
            />
          </div>

          {/* Conclusion Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Conclusion</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              This implementation demonstrates how WebGL shaders can be used to create immersive, interactive visual effects on web pages. By combining:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Precise mathematical calculations for aspect ratio preservation</li>
              <li>GPU-accelerated fragment shaders for real-time effects</li>
              <li>Scrollable texture mapping for dynamic content display</li>
              <li>Smooth easing animations for polished user experience</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We can create effects that would be impossible or too slow with traditional web technologies. The glitch effect showcased here is just one example of the creative possibilities unlocked by shader programming in web development.
            </p>
          </div>
        </div>
      </div>
    </div>
    );
  } catch (error) {
    console.error('Error in GlitchDemo render:', error);
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Error Loading Glitch Demo</h1>
        <p className="text-red-400">Error: {error.message}</p>
        <pre className="mt-4 text-sm bg-gray-900 p-4 rounded overflow-auto">
          {error.stack}
        </pre>
        <Link 
          to="/shaders" 
          className="inline-flex items-center gap-2 text-purple-200 hover:text-white mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shaders
        </Link>
      </div>
    );
  }
}
