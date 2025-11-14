// Code snippets for Curves & Surfaces

export const getCurveCodeSnippet = (curveType) => {
  const snippets = {
    bezier: `// Calculate Bezier curve point
function calculateBezier(controlPoints, t) {
  const n = controlPoints.length - 1;
  let x = 0, y = 0;
  
  for (let i = 0; i <= n; i++) {
    const basis = bernstein(n, i, t);
    x += controlPoints[i].x * basis;
    y += controlPoints[i].y * basis;
  }
  
  return { x, y };
}

// Bernstein basis function
function bernstein(n, i, t) {
  return binomial(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i);
}

// Binomial coefficient
function binomial(n, k) {
  if (k > n || k < 0) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1);
  }
  return result;
}`,
    bspline: `// Calculate B-spline curve point
function calculateBSpline(controlPoints, degree, knots, t) {
  const k = degree;
  const n = controlPoints.length - 1;
  let x = 0, y = 0;
  
  for (let j = 0; j <= n; j++) {
    const basis = bSplineBasis(j, k, t, knots);
    x += controlPoints[j].x * basis;
    y += controlPoints[j].y * basis;
  }
  
  return { x, y };
}

// B-spline basis function (recursive)
function bSplineBasis(i, k, t, knots) {
  if (k === 0) {
    return (t >= knots[i] && t < knots[i + 1]) ? 1 : 0;
  }
  
  const denom1 = knots[i + k] - knots[i];
  const denom2 = knots[i + k + 1] - knots[i + 1];
  
  let term1 = 0, term2 = 0;
  
  if (denom1 !== 0) {
    term1 = ((t - knots[i]) / denom1) * bSplineBasis(i, k - 1, t, knots);
  }
  
  if (denom2 !== 0) {
    term2 = ((knots[i + k + 1] - t) / denom2) * bSplineBasis(i + 1, k - 1, t, knots);
  }
  
  return term1 + term2;
}`,
    hermite: `// Calculate Hermite curve point
function calculateHermite(p0, p1, t0, t1, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  
  // Hermite basis functions
  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;
  
  const x = p0.x * h00 + t0.x * h10 + p1.x * h01 + t1.x * h11;
  const y = p0.y * h00 + t0.y * h10 + p1.y * h01 + t1.y * h11;
  
  return { x, y };
}

// Usage
const point = calculateHermite(
  { x: 0.2, y: 0.2 },  // P0
  { x: 0.8, y: 0.8 },  // P1
  { x: 0.3, y: 0.1 },  // T0
  { x: 0.1, y: -0.3 }, // T1
  0.5                   // t
);`,
    catmullrom: `// Calculate Catmull-Rom spline point
function calculateCatmullRom(p0, p1, p2, p3, t, tension) {
  const tau = tension;
  const t2 = t * t;
  const t3 = t2 * t;
  
  // Catmull-Rom matrix coefficients
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
  
  return { x, y };
}

// Generate full spline from control points
function generateCatmullRomSpline(points, tension, numSegments) {
  const curve = [];
  
  for (let i = 0; i < points.length - 3; i++) {
    for (let j = 0; j < numSegments; j++) {
      const t = j / numSegments;
      const point = calculateCatmullRom(
        points[i],
        points[i + 1],
        points[i + 2],
        points[i + 3],
        t,
        tension
      );
      curve.push(point);
    }
  }
  
  return curve;
}`,
    nurbs: `// Calculate NURBS curve point
function calculateNURBS(controlPoints, degree, knots, t) {
  const k = degree;
  const n = controlPoints.length - 1;
  const weights = controlPoints.map(p => p.w || 1);
  
  let x = 0, y = 0;
  let denominator = 0;
  
  // Calculate weighted sum
  for (let j = 0; j <= n; j++) {
    const basis = bSplineBasis(j, k, t, knots);
    const weightedBasis = weights[j] * basis;
    x += controlPoints[j].x * weightedBasis;
    y += controlPoints[j].y * weightedBasis;
    denominator += weightedBasis;
  }
  
  // Normalize by denominator
  if (denominator !== 0) {
    x /= denominator;
    y /= denominator;
  }
  
  return { x, y };
}

// Rational B-spline basis function
function rationalBSplineBasis(i, k, t, knots, weights) {
  const bSpline = bSplineBasis(i, k, t, knots);
  const weight = weights[i];
  
  // Calculate denominator
  let denominator = 0;
  for (let j = 0; j < weights.length; j++) {
    denominator += weights[j] * bSplineBasis(j, k, t, knots);
  }
  
  return denominator !== 0 ? (weight * bSpline) / denominator : 0;
}`,
    surface: `// Calculate point on Bezier surface
function calculateBezierSurface(controlPoints, u, v) {
  const m = controlPoints.length - 1;
  const n = controlPoints[0].length - 1;
  
  let x = 0, y = 0, z = 0;
  
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      const basisI = bernstein(m, i, u);
      const basisJ = bernstein(n, j, v);
      const point = controlPoints[i][j];
      
      x += point.x * basisI * basisJ;
      y += point.y * basisI * basisJ;
      z += point.z * basisI * basisJ;
    }
  }
  
  return { x, y, z };
}

// Calculate surface normal
function calculateSurfaceNormal(controlPoints, u, v) {
  // Calculate partial derivatives
  const du = calculatePartialDerivativeU(controlPoints, u, v);
  const dv = calculatePartialDerivativeV(controlPoints, u, v);
  
  // Cross product for normal
  const normal = {
    x: du.y * dv.z - du.z * dv.y,
    y: du.z * dv.x - du.x * dv.z,
    z: du.x * dv.y - du.y * dv.x
  };
  
  // Normalize
  const length = Math.sqrt(normal.x**2 + normal.y**2 + normal.z**2);
  return {
    x: normal.x / length,
    y: normal.y / length,
    z: normal.z / length
  };
}`
  };

  return snippets[curveType] || null;
};

