import React, { useRef, useEffect, useState } from 'react';
import * as engine2DUtils from '../../utils/engine2DUtils';

const Engine2DDemo = ({ currentModule, currentStep }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 });
  const [mouseDown, setMouseDown] = useState(false);
  const [clickedEntity, setClickedEntity] = useState(null);
  const imageRef = useRef(null);
  const fontRef = useRef(null);

  // Load image for AssetLoader and Sprite modules
  useEffect(() => {
    if (currentModule === 'assetloader' || currentModule === 'sprite') {
      if (!imageRef.current) {
        engine2DUtils.setImageLoadProgress(0, 'loading');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          imageRef.current = img;
          engine2DUtils.setCachedImage(img);
          engine2DUtils.setImageLoadProgress(1, 'loaded');
        };
        img.onerror = () => {
          engine2DUtils.setImageLoadProgress(0, 'error');
        };
        img.src = '/cd7944c9-7e7a-4ac8-b4c0-17e1639fe382.webp';
      } else {
        engine2DUtils.setCachedImage(imageRef.current);
        engine2DUtils.setImageLoadProgress(1, 'loaded');
      }
    }
  }, [currentModule]);

  // Load fonts for Font module
  useEffect(() => {
    if (currentModule === 'font') {
      // Check if font is already loaded
      if (document.fonts.check('16px McQueenDisplay')) {
        engine2DUtils.setFontLoadProgress(1, 'loaded', 1, 1);
        fontRef.current = true;
        return;
      }

      // Load the font
      engine2DUtils.setFontLoadProgress(0, 'loading', 0, 1);
      const fontFace = new FontFace(
        'McQueenDisplay',
        'url(/fonts/McQueenDisplay-Regular.woff2) format("woff2"), url(/fonts/McQueenDisplay-Regular.woff) format("woff")',
        {
          weight: '400',
          style: 'normal',
          display: 'swap'
        }
      );

      fontFace.load()
        .then(() => {
          document.fonts.add(fontFace);
          engine2DUtils.setFontLoadProgress(1, 'loaded', 1, 1);
          fontRef.current = true;
        })
        .catch((error) => {
          console.error('Failed to load font:', error);
          engine2DUtils.setFontLoadProgress(0, 'error', 0, 1);
          fontRef.current = false;
        });
    }
  }, [currentModule]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Function to resize canvas for crisp rendering
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set display size (CSS pixels)
      const displayWidth = rect.width;
      const displayHeight = rect.height;
      
      // Set internal size (actual pixels) - scale by devicePixelRatio for crisp rendering
      const internalWidth = Math.floor(displayWidth * dpr);
      const internalHeight = Math.floor(displayHeight * dpr);
      
      // Only resize if dimensions changed
      if (canvas.width !== internalWidth || canvas.height !== internalHeight) {
        canvas.width = internalWidth;
        canvas.height = internalHeight;
        
        // Scale context to match device pixel ratio
        // Reset transform first to avoid compounding
        const ctx = canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        ctx.scale(dpr, dpr);
      }
    };

    // Initial resize
    resizeCanvas();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);

    // Check if this demo needs animation
    const needsAnimation = engine2DUtils.needsAnimation(currentModule, currentStep);
    
    // For Input module, always animate to track mouse
    // For AssetLoader, Sprite, Font, and Tweening, animate to show loading/animation
    const shouldAnimate = needsAnimation || currentModule === 'input' || 
                          currentModule === 'assetloader' || currentModule === 'sprite' ||
                          currentModule === 'font' || currentModule === 'tweening';

    // Mouse event handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Mouse coordinates are in display pixels, which match our scaled context
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseDown = (e) => {
      setMouseDown(true);
      const rect = canvas.getBoundingClientRect();
      // Mouse coordinates are in display pixels, which match our scaled context
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check which entity was clicked (for step 2 and 3)
      if (currentModule === 'input' && (currentStep === 2 || currentStep === 3)) {
        if (currentStep === 2) {
          // Check if clicked in button area
          if (x >= 100 && x <= 300 && y >= 100 && y <= 200) {
            setClickedEntity('button');
            setTimeout(() => setClickedEntity(null), 300);
          }
        } else if (currentStep === 3) {
          // Check if clicked in entity areas
          if (x >= 50 && x <= 150 && y >= 80 && y <= 180) {
            setClickedEntity('entity1');
            setTimeout(() => setClickedEntity(null), 300);
          } else if (x >= 250 && x <= 350 && y >= 80 && y <= 180) {
            setClickedEntity('entity2');
            setTimeout(() => setClickedEntity(null), 300);
          }
        }
      }
    };

    const handleMouseUp = () => {
      setMouseDown(false);
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1, y: -1 });
      setMouseDown(false);
    };

    // Add event listeners for Input module
    if (currentModule === 'input') {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    const draw = () => {
      // Resize canvas if needed (handles window resize)
      resizeCanvas();
      
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const width = rect.width; // Display width (context is scaled, so use display dimensions)
      const height = rect.height; // Display height (context is scaled, so use display dimensions)
      
      // Clear canvas
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, width, height);

      // Draw demo based on module and step
      engine2DUtils.drawModuleDemo(
        ctx, 
        currentModule, 
        currentStep, 
        width, 
        height,
        mousePos,
        mouseDown,
        clickedEntity
      );

      // Continue animation if needed
      if (shouldAnimate) {
        animationFrameRef.current = requestAnimationFrame(draw);
      }
    };

    // Start drawing
    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (currentModule === 'input') {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [currentModule, currentStep, mousePos, mouseDown, clickedEntity]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-4">Live Demo</h2>
      <canvas
        ref={canvasRef}
        className="w-full border-2 border-gray-200 rounded-lg bg-gray-900"
        style={{ height: '400px' }}
      />
      <p className="text-sm text-gray-600 mt-2">
        Interactive demonstration of the current module and step
      </p>
    </div>
  );
};

export default Engine2DDemo;

