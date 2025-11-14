// Utility functions for curves and surfaces calculations

// Binomial coefficient for Bezier curves
export const binomial = (n, k) => {
  if (k > n || k < 0) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1);
  }
  return result;
};

// Bernstein basis function for Bezier curves
export const bernstein = (n, i, t) => {
  return binomial(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i);
};

// Calculate Bezier curve points
export const calculateBezierCurve = (controlPoints, degree, numPoints) => {
  const points = [];
  const n = degree;
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    let x = 0;
    let y = 0;
    
    for (let j = 0; j <= n; j++) {
      const basis = bernstein(n, j, t);
      x += controlPoints[j].x * basis;
      y += controlPoints[j].y * basis;
    }
    
    points.push({ x, y });
  }
  
  return points;
};

// B-spline basis function
export const bSplineBasis = (i, k, t, knots) => {
  if (k === 0) {
    return (t >= knots[i] && t < knots[i + 1]) ? 1 : 0;
  }
  
  const denom1 = knots[i + k] - knots[i];
  const denom2 = knots[i + k + 1] - knots[i + 1];
  
  let term1 = 0;
  let term2 = 0;
  
  if (denom1 !== 0) {
    term1 = ((t - knots[i]) / denom1) * bSplineBasis(i, k - 1, t, knots);
  }
  
  if (denom2 !== 0) {
    term2 = ((knots[i + k + 1] - t) / denom2) * bSplineBasis(i + 1, k - 1, t, knots);
  }
  
  return term1 + term2;
};

// Calculate B-spline curve points
export const calculateBSpline = (controlPoints, degree, knots, numPoints) => {
  const points = [];
  const k = degree;
  const n = controlPoints.length - 1;
  const knotMin = knots[k];
  const knotMax = knots[n + 1];
  
  for (let i = 0; i <= numPoints; i++) {
    const t = knotMin + (i / numPoints) * (knotMax - knotMin);
    let x = 0;
    let y = 0;
    
    for (let j = 0; j <= n; j++) {
      const basis = bSplineBasis(j, k, t, knots);
      x += controlPoints[j].x * basis;
      y += controlPoints[j].y * basis;
    }
    
    points.push({ x, y });
  }
  
  return points;
};

// Hermite basis functions
export const hermiteBasis = (t) => {
  const t2 = t * t;
  const t3 = t2 * t;
  
  return {
    h00: 2 * t3 - 3 * t2 + 1,
    h10: t3 - 2 * t2 + t,
    h01: -2 * t3 + 3 * t2,
    h11: t3 - t2
  };
};

// Calculate Hermite curve points
export const calculateHermiteCurve = (points, tangents, numPoints) => {
  const points_result = [];
  const p0 = points[0];
  const p1 = points[1];
  const t0 = tangents[0];
  const t1 = tangents[1];
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const basis = hermiteBasis(t);
    
    const x = p0.x * basis.h00 + t0.x * basis.h10 + p1.x * basis.h01 + t1.x * basis.h11;
    const y = p0.y * basis.h00 + t0.y * basis.h10 + p1.y * basis.h01 + t1.y * basis.h11;
    
    points_result.push({ x, y });
  }
  
  return points_result;
};

// Calculate Catmull-Rom spline points
export const calculateCatmullRomSpline = (points, tension, numPoints) => {
  const points_result = [];
  const tau = tension;
  
  // Need at least 4 points for Catmull-Rom
  if (points.length < 4) {
    return points_result;
  }
  
  // Calculate segments between points
  for (let seg = 0; seg < points.length - 3; seg++) {
    const p0 = points[seg];
    const p1 = points[seg + 1];
    const p2 = points[seg + 2];
    const p3 = points[seg + 3];
    
    for (let i = 0; i < numPoints / (points.length - 3); i++) {
      const t = i / (numPoints / (points.length - 3));
      const t2 = t * t;
      const t3 = t2 * t;
      
      // Catmull-Rom matrix
      const x = 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
      );
      
      const y = 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
      );
      
      points_result.push({ x, y });
    }
  }
  
  return points_result;
};

// NURBS basis function (weighted B-spline)
export const nurbsBasis = (i, k, t, knots, weights) => {
  const bSpline = bSplineBasis(i, k, t, knots);
  const weight = weights[i];
  
  // Calculate denominator (sum of weighted basis functions)
  let denominator = 0;
  for (let j = 0; j < weights.length; j++) {
    denominator += weights[j] * bSplineBasis(j, k, t, knots);
  }
  
  if (denominator === 0) return 0;
  return (weight * bSpline) / denominator;
};

// Calculate NURBS curve points
export const calculateNURBS = (controlPoints, degree, knots, numPoints) => {
  const points = [];
  const k = degree;
  const n = controlPoints.length - 1;
  const weights = controlPoints.map(p => p.w || 1);
  const knotMin = knots[k];
  const knotMax = knots[n + 1];
  
  for (let i = 0; i <= numPoints; i++) {
    const t = knotMin + (i / numPoints) * (knotMax - knotMin);
    let x = 0;
    let y = 0;
    
    for (let j = 0; j <= n; j++) {
      const basis = nurbsBasis(j, k, t, knots, weights);
      x += controlPoints[j].x * basis;
      y += controlPoints[j].y * basis;
    }
    
    points.push({ x, y });
  }
  
  return points;
};

// Draw Bezier surface wireframe
export const drawBezierSurface = (ctx, controlPoints, toCanvasX, toCanvasY, drawWidth, drawHeight, padding) => {
  const numSegments = 20;
  
  // Draw control points
  ctx.fillStyle = '#8b5cf6';
  controlPoints.forEach((row, rowIndex) => {
    row.forEach((point, colIndex) => {
      const x = toCanvasX(point.x);
      const y = toCanvasY(point.y);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  });
  
  // Draw control grid
  ctx.strokeStyle = '#c4b5fd';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  
  // Rows
  controlPoints.forEach((row) => {
    ctx.beginPath();
    row.forEach((point, colIndex) => {
      const x = toCanvasX(point.x);
      const y = toCanvasY(point.y);
      if (colIndex === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  });
  
  // Columns
  for (let col = 0; col < controlPoints[0].length; col++) {
    ctx.beginPath();
    controlPoints.forEach((row, rowIndex) => {
      const point = row[col];
      const x = toCanvasX(point.x);
      const y = toCanvasY(point.y);
      if (rowIndex === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  }
  
  ctx.setLineDash([]);
  
  // Draw surface wireframe (simplified - just draw isoparametric curves)
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2;
  
  // Draw u-direction curves (v constant)
  for (let v = 0; v <= numSegments; v++) {
    const vNorm = v / numSegments;
    ctx.beginPath();
    for (let u = 0; u <= numSegments; u++) {
      const uNorm = u / numSegments;
      // Simplified: interpolate control points
      const point = interpolateBezierSurface(controlPoints, uNorm, vNorm);
      const x = toCanvasX(point.x);
      const y = toCanvasY(point.y);
      if (u === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }
  
  // Draw v-direction curves (u constant)
  for (let u = 0; u <= numSegments; u++) {
    const uNorm = u / numSegments;
    ctx.beginPath();
    for (let v = 0; v <= numSegments; v++) {
      const vNorm = v / numSegments;
      const point = interpolateBezierSurface(controlPoints, uNorm, vNorm);
      const x = toCanvasX(point.x);
      const y = toCanvasY(point.y);
      if (v === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }
};

// Interpolate point on Bezier surface
const interpolateBezierSurface = (controlPoints, u, v) => {
  const n = controlPoints.length - 1;
  const m = controlPoints[0].length - 1;
  
  let x = 0;
  let y = 0;
  let z = 0;
  
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      const basisI = bernstein(n, i, u);
      const basisJ = bernstein(m, j, v);
      const point = controlPoints[i][j];
      x += point.x * basisI * basisJ;
      y += point.y * basisI * basisJ;
      z += point.z * basisI * basisJ;
    }
  }
  
  return { x, y, z };
};

