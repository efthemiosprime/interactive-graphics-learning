import React, { useRef, useEffect } from 'react';
import * as curvesUtils from '../../utils/curvesAndSurfaces';

const CurveVisualization = ({
  curveType,
  bezierPoints,
  bezierDegree,
  bSplinePoints,
  bSplineDegree,
  bSplineKnots,
  hermitePoints,
  hermiteTangents,
  catmullRomPoints,
  catmullRomTension,
  nurbsPoints,
  nurbsDegree,
  nurbsKnots,
  surfaceType,
  surfacePoints
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Function to resize canvas for crisp rendering
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set display size (CSS pixels)
      const displayWidth = rect.width;
      const displayHeight = rect.width; // Keep square aspect ratio
      
      // Set internal size (actual pixels) - scale by devicePixelRatio for crisp rendering
      const internalWidth = Math.floor(displayWidth * dpr);
      const internalHeight = Math.floor(displayHeight * dpr);
      
      // Only resize if dimensions changed
      if (canvas.width !== internalWidth || canvas.height !== internalHeight) {
        canvas.width = internalWidth;
        canvas.height = internalHeight;
      }
    };

    // Initial resize
    resizeCanvas();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);

    // Get context and set up scaling for high-DPI rendering
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Scale context to match device pixel ratio (context is reset when canvas.width/height changes)
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    ctx.scale(dpr, dpr);
    
    const rect = canvas.getBoundingClientRect();
    const width = rect.width; // Display width (context is scaled, so use display dimensions)
    const height = rect.width; // Display height (keep square, context is scaled)
    const padding = 40;
    const drawWidth = width - 2 * padding;
    const drawHeight = height - 2 * padding;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * drawWidth;
      const y = padding + (i / 10) * drawHeight;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding);
    ctx.stroke();

    // Convert normalized coordinates (0-1) to canvas coordinates
    const toCanvasX = (x) => padding + x * drawWidth;
    const toCanvasY = (y) => height - padding - y * drawHeight;

    let curvePoints = [];

    if (curveType === 'bezier') {
      curvePoints = curvesUtils.calculateBezierCurve(bezierPoints, bezierDegree, 100);
    } else if (curveType === 'bspline') {
      curvePoints = curvesUtils.calculateBSpline(bSplinePoints, bSplineDegree, bSplineKnots, 100);
    } else if (curveType === 'hermite') {
      curvePoints = curvesUtils.calculateHermiteCurve(hermitePoints, hermiteTangents, 100);
    } else if (curveType === 'catmullrom') {
      curvePoints = curvesUtils.calculateCatmullRomSpline(catmullRomPoints, catmullRomTension, 100);
    } else if (curveType === 'nurbs') {
      curvePoints = curvesUtils.calculateNURBS(nurbsPoints, nurbsDegree, nurbsKnots, 100);
    } else if (curveType === 'surface') {
      // Draw surface wireframe
      curvesUtils.drawBezierSurface(ctx, surfacePoints, toCanvasX, toCanvasY, drawWidth, drawHeight, padding);
      return; // Early return for surfaces
    }

    // Draw control points
    const controlPoints = curveType === 'bezier' ? bezierPoints :
                         curveType === 'bspline' ? bSplinePoints :
                         curveType === 'hermite' ? hermitePoints :
                         curveType === 'catmullrom' ? catmullRomPoints :
                         nurbsPoints;

    ctx.fillStyle = '#8b5cf6';
    controlPoints.forEach((point, index) => {
      const x = toCanvasX(point.x);
      const y = toCanvasY(point.y);
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw point label
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px sans-serif';
      ctx.fillText(`P${index}`, x + 8, y - 8);
      ctx.fillStyle = '#8b5cf6';
    });

    // Draw control polygon
    ctx.strokeStyle = '#c4b5fd';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    controlPoints.forEach((point, index) => {
      const x = toCanvasX(point.x);
      const y = toCanvasY(point.y);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw curve
    if (curvePoints.length > 0) {
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 3;
      ctx.beginPath();
      curvePoints.forEach((point, index) => {
        const x = toCanvasX(point.x);
        const y = toCanvasY(point.y);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }

    // Draw tangent vectors for Hermite curves
    if (curveType === 'hermite') {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      hermitePoints.forEach((point, index) => {
        const startX = toCanvasX(point.x);
        const startY = toCanvasY(point.y);
        const tangent = hermiteTangents[index];
        const endX = startX + tangent.x * drawWidth * 0.2;
        const endY = startY - tangent.y * drawHeight * 0.2;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Arrowhead
        const angle = Math.atan2(startY - endY, endX - startX);
        const arrowLength = 8;
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(
          endX - arrowLength * Math.cos(angle - Math.PI / 6),
          endY + arrowLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(endX, endY);
        ctx.lineTo(
          endX - arrowLength * Math.cos(angle + Math.PI / 6),
          endY + arrowLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [
    curveType,
    bezierPoints,
    bezierDegree,
    bSplinePoints,
    bSplineDegree,
    bSplineKnots,
    hermitePoints,
    hermiteTangents,
    catmullRomPoints,
    catmullRomTension,
    nurbsPoints,
    nurbsDegree,
    nurbsKnots,
    surfaceType,
    surfacePoints
  ]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-4">Visualization</h2>
      <canvas
        ref={canvasRef}
        className="w-full border-2 border-gray-200 rounded-lg"
        style={{ aspectRatio: '1 / 1' }}
      />
    </div>
  );
};

export default CurveVisualization;

