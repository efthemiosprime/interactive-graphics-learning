import React, { useEffect, useRef } from 'react';
import { drawTransformationDemo } from '../../utils/transformationUtils';

const TransformationDemo = ({
  currentModule,
  currentStep,
  scaleX,
  scaleY,
  translateX,
  translateY,
  rotationAngle,
  reflectionAxis,
  quaternionW,
  quaternionX,
  quaternionY,
  quaternionZ,
  projectionType,
  fov,
  aspect,
  near,
  far,
  orthoLeft,
  orthoRight,
  orthoBottom,
  orthoTop,
  orthoNear,
  orthoFar,
  combinedScale,
  combinedRotation,
  combinedTranslateX,
  showGrid,
  showOriginal,
  shapeType
}) => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const moduleRef = useRef(currentModule);
  const stepRef = useRef(currentStep);
  const paramsRef = useRef({});

  // Update refs when props change
  useEffect(() => {
    moduleRef.current = currentModule;
    stepRef.current = currentStep;
      paramsRef.current = {
        scaleX,
        scaleY,
        translateX,
        translateY,
        rotationAngle,
        reflectionAxis,
        quaternionW,
        quaternionX,
        quaternionY,
        quaternionZ,
        projectionType,
        fov,
        aspect,
        near,
        far,
        orthoLeft,
        orthoRight,
        orthoBottom,
        orthoTop,
        orthoNear,
        orthoFar,
        combinedScale,
        combinedRotation,
        combinedTranslateX,
        showGrid,
        showOriginal,
        shapeType
      };
  }, [
    currentModule,
    currentStep,
    scaleX,
    scaleY,
    translateX,
    translateY,
    rotationAngle,
    reflectionAxis,
    quaternionW,
    quaternionX,
    quaternionY,
    quaternionZ,
    projectionType,
    fov,
    aspect,
    near,
    far,
    orthoLeft,
    orthoRight,
    orthoBottom,
    orthoTop,
    orthoNear,
    orthoFar,
    combinedScale,
    combinedRotation,
    combinedTranslateX,
    showGrid,
    showOriginal,
    shapeType
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl;

    // Function to resize canvas
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.floor(rect.width * dpr);
      const displayHeight = Math.floor(rect.height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    };

    // Initial resize
    resizeCanvas();

    // Render function
    const render = () => {
      if (!glRef.current) return;

      resizeCanvas();
      const width = canvas.width;
      const height = canvas.height;

      // Draw demo with current module and step
      drawTransformationDemo(
        glRef.current,
        moduleRef.current,
        stepRef.current,
        width,
        height,
        paramsRef.current
      );

      // Continue animation loop
      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    // Start animation loop
    render();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []); // Empty deps - only run once on mount

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4">Live Visualization</h2>
      <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  );
};

export default TransformationDemo;

