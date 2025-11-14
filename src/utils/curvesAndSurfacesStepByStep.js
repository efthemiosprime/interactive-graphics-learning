// Step-by-step explanations for Curves & Surfaces

export const getCurveStepByStep = (curveType, params) => {
  if (!params) return null;
  
  const steps = {
    bezier: {
      explanation: 'Bezier curves are created by blending control points using Bernstein basis functions. The curve passes through the first and last control points and is influenced by intermediate points.',
      steps: [
        {
          title: 'Step 1: Understand Control Points',
          formula: `Degree ${params.degree !== undefined ? params.degree : 'n'} Bezier curve requires ${params.degree !== undefined ? params.degree + 1 : 'n+1'} control points`,
          description: `A Bezier curve of degree ${params.degree !== undefined ? params.degree : 'n'} uses ${params.degree !== undefined ? params.degree + 1 : 'n+1'} control points: P₀, P₁, ..., P_${params.degree !== undefined ? params.degree : 'n'}`,
          calculation: `Current curve has ${params.numPoints !== undefined ? params.numPoints : 'n+1'} control points`,
          result: 'Control points define the shape of the curve'
        },
        {
          title: 'Step 2: Calculate Bernstein Basis Functions',
          formula: `B_i^${params.degree !== undefined ? params.degree : 'n'}(t) = C(${params.degree !== undefined ? params.degree : 'n'}, i) × t^i × (1-t)^(${params.degree !== undefined ? params.degree : 'n'}-i)`,
          description: 'Bernstein polynomials blend the control points. Each basis function determines how much each control point influences the curve at parameter t.',
          calculation: `For t = 0.5, calculate B_i^${params.degree !== undefined ? params.degree : 'n'}(0.5) for each i from 0 to ${params.degree !== undefined ? params.degree : 'n'}`,
          result: 'Basis functions sum to 1, ensuring the curve is a convex combination of control points'
        },
        {
          title: 'Step 3: Evaluate Curve at Parameter t',
          formula: `P(t) = Σ(i=0 to ${params.degree !== undefined ? params.degree : 'n'}) P_i × B_i^${params.degree !== undefined ? params.degree : 'n'}(t)`,
          description: 'Multiply each control point by its corresponding Bernstein basis function and sum the results',
          calculation: `For t = 0.5: P(0.5) = P₀×B₀(0.5) + P₁×B₁(0.5) + ... + P_${params.degree !== undefined ? params.degree : 'n'}×B_${params.degree !== undefined ? params.degree : 'n'}(0.5)`,
          result: 'The resulting point lies on the Bezier curve'
        },
        {
          title: 'Step 4: Generate Curve Points',
          formula: 'Sample t from 0 to 1 to generate curve points',
          description: 'Evaluate the curve at multiple t values (e.g., t = 0, 0.01, 0.02, ..., 1.0) to create a smooth curve',
          calculation: 'For each t value, calculate P(t) using the formula above',
          result: 'A series of points that form the Bezier curve'
        },
        {
          title: 'Step 5: Properties',
          formula: 'Curve passes through P₀ and P_n, lies within convex hull',
          description: 'Bezier curves have important properties: they pass through endpoints and always stay within the convex hull of control points',
          calculation: 'P(0) = P₀, P(1) = P_n, and all points P(t) are inside the convex hull',
          result: 'Predictable and smooth curve behavior'
        }
      ]
    },
    bspline: {
      explanation: 'B-splines use a knot vector to control curve segments and continuity. They provide local control, meaning moving one control point only affects a local region of the curve.',
      steps: [
        {
          title: 'Step 1: Understand Knot Vector',
          formula: `Knot vector: T = [t₀, t₁, ..., t_${params.numPoints !== undefined && params.degree !== undefined ? params.numPoints + params.degree : 'n+k'}]`,
          description: `The knot vector partitions the parameter space. For degree ${params.degree !== undefined ? params.degree : 'k'} with ${params.numPoints !== undefined ? params.numPoints : 'n+1'} control points, we need ${params.numPoints !== undefined && params.degree !== undefined ? params.numPoints + params.degree + 1 : 'n+k+1'} knots`,
          calculation: 'Knots determine where curve segments join and their smoothness',
          result: 'Knot vector defines the parameter intervals for each curve segment'
        },
        {
          title: 'Step 2: Calculate B-Spline Basis Functions',
          formula: `N_i,${params.degree !== undefined ? params.degree : 'k'}(t) = (t - t_i)/(t_(i+${params.degree !== undefined ? params.degree : 'k'}) - t_i) × N_i,${params.degree !== undefined ? params.degree - 1 : 'k-1'}(t) + (t_(i+${params.degree !== undefined ? params.degree + 1 : 'k+1'}) - t)/(t_(i+${params.degree !== undefined ? params.degree + 1 : 'k+1'}) - t_(i+1)) × N_(i+1),${params.degree !== undefined ? params.degree - 1 : 'k-1'}(t)`,
          description: 'B-spline basis functions are calculated recursively. They have local support, meaning each function is non-zero only on a finite interval.',
          calculation: 'Start with degree 0 (step functions), then build up to higher degrees',
          result: 'Basis functions that blend control points locally'
        },
        {
          title: 'Step 3: Evaluate Curve at Parameter t',
          formula: `P(t) = Σ(i=0 to ${params.numPoints !== undefined ? params.numPoints - 1 : 'n'}) P_i × N_i,${params.degree !== undefined ? params.degree : 'k'}(t)`,
          description: 'Multiply each control point by its corresponding B-spline basis function and sum',
          calculation: `For a given t, only ${params.degree !== undefined ? params.degree + 1 : 'k+1'} basis functions are non-zero, so only ${params.degree !== undefined ? params.degree + 1 : 'k+1'} control points influence the result`,
          result: 'Point on the B-spline curve'
        },
        {
          title: 'Step 4: Local Control Property',
          formula: `Moving P_i affects curve on [t_i, t_(i+${params.degree !== undefined ? params.degree + 1 : 'k+1'})]`,
          description: 'Unlike Bezier curves, moving a control point only affects a local region of the curve',
          calculation: `Control point P_i influences the curve only between knots t_i and t_(i+${params.degree !== undefined ? params.degree + 1 : 'k+1'})`,
          result: 'Local control allows fine-tuning without affecting the entire curve'
        },
        {
          title: 'Step 5: Continuity',
          formula: `C^${params.degree !== undefined ? params.degree - 1 : 'k-1'} continuity at knots`,
          description: `A B-spline of degree ${params.degree !== undefined ? params.degree : 'k'} has C^${params.degree !== undefined ? params.degree - 1 : 'k-1'} continuity (smooth up to the ${params.degree !== undefined ? params.degree - 1 : 'k-1'}th derivative)`,
          calculation: 'Higher degree means smoother curves but less local control',
          result: 'Smooth curves with controlled continuity'
        }
      ]
    },
    hermite: {
      explanation: 'Hermite curves are defined by two endpoints and their tangent vectors. They provide direct control over both position and direction at the endpoints.',
      steps: [
        {
          title: 'Step 1: Define Endpoints and Tangents',
          formula: 'P₀, P₁ (endpoints), T₀, T₁ (tangent vectors)',
          description: 'Hermite curves require two points (P₀, P₁) and two tangent vectors (T₀, T₁)',
          calculation: 'P₀ and P₁ define where the curve starts and ends, T₀ and T₁ define the direction at those points',
          result: 'Four parameters fully define a cubic Hermite curve'
        },
        {
          title: 'Step 2: Hermite Basis Functions',
          formula: 'H₀₀(t) = 2t³ - 3t² + 1\nH₁₀(t) = t³ - 2t² + t\nH₀₁(t) = -2t³ + 3t²\nH₁₁(t) = t³ - t²',
          description: 'Four cubic polynomials that blend position and tangent information',
          calculation: 'These functions ensure P(0) = P₀, P(1) = P₁, P\'(0) = T₀, P\'(1) = T₁',
          result: 'Basis functions that satisfy boundary conditions'
        },
        {
          title: 'Step 3: Evaluate Curve',
          formula: 'P(t) = P₀ × H₀₀(t) + T₀ × H₁₀(t) + P₁ × H₀₁(t) + T₁ × H₁₁(t)',
          description: 'Weighted sum of endpoints and tangents using Hermite basis functions',
          calculation: 'For t = 0.5, calculate each basis function and multiply by corresponding point/tangent',
          result: 'Point on the Hermite curve'
        },
        {
          title: 'Step 4: Verify Boundary Conditions',
          formula: 'P(0) = P₀, P(1) = P₁, P\'(0) = T₀, P\'(1) = T₁',
          description: 'The curve passes through endpoints with specified tangents',
          calculation: 'At t=0: H₀₀=1, others=0, so P(0)=P₀. At t=1: H₀₁=1, others=0, so P(1)=P₁',
          result: 'Curve matches specified endpoints and directions'
        },
        {
          title: 'Step 5: Connecting Curves',
          formula: 'For C¹ continuity: T₁ of first curve = T₀ of second curve',
          description: 'To connect two Hermite curves smoothly, ensure the tangent at the end of the first equals the tangent at the start of the second',
          calculation: 'Set T₁ of curve 1 equal to T₀ of curve 2',
          result: 'Smoothly connected curve segments'
        }
      ]
    },
    catmullrom: {
      explanation: 'Catmull-Rom splines interpolate all control points, meaning the curve passes through every point. They are commonly used for camera paths and animation.',
      steps: [
        {
          title: 'Step 1: Understand Interpolation',
          formula: 'Curve passes through all control points P₀, P₁, P₂, ..., P_n',
          description: `Unlike Bezier curves, Catmull-Rom splines pass through all ${params.numPoints !== undefined ? params.numPoints : 'n+1'} control points`,
          calculation: 'Each segment interpolates between two consecutive control points',
          result: 'Intuitive curve that follows the control points'
        },
        {
          title: 'Step 2: Four-Point Segments',
          formula: 'Segment between P₁ and P₂ uses P₀, P₁, P₂, P₃',
          description: 'Each curve segment is defined by four consecutive control points',
          calculation: 'The segment from P₁ to P₂ is influenced by P₀ (before) and P₃ (after)',
          result: 'Smooth transitions between segments'
        },
        {
          title: 'Step 3: Catmull-Rom Formula',
          formula: 'P(t) = 0.5 × [2P₁ + (-P₀ + P₂)t + (2P₀ - 5P₁ + 4P₂ - P₃)t² + (-P₀ + 3P₁ - 3P₂ + P₃)t³]',
          description: 'Cubic polynomial that interpolates P₁ and P₂, with tangents determined by neighboring points',
          calculation: 'For t=0, P(0)=P₁. For t=1, P(1)=P₂. Tangents depend on P₀ and P₃',
          result: 'Smooth interpolating curve segment'
        },
        {
          title: 'Step 4: Generate Full Spline',
          formula: 'Evaluate segments: [P₀,P₁,P₂,P₃], [P₁,P₂,P₃,P₄], ..., [P_(n-3),P_(n-2),P_(n-1),P_n]',
          description: `For ${params.numPoints !== undefined ? params.numPoints : 'n+1'} points, generate ${params.numPoints !== undefined ? params.numPoints - 3 : 'n-2'} segments`,
          calculation: 'Each segment uses four consecutive points, with segments overlapping by two points',
          result: 'Complete spline passing through all control points'
        },
        {
          title: 'Step 5: Tension Parameter',
          formula: 'Tension controls tightness: τ = 0.5 (default), lower = tighter, higher = looser',
          description: 'The tension parameter (if used) controls how tightly the curve follows the control points',
          calculation: 'Default Catmull-Rom uses τ = 0.5. Adjusting tension changes the curve shape',
          result: 'Customizable curve tightness'
        }
      ]
    },
    nurbs: {
      explanation: 'NURBS (Non-Uniform Rational B-Splines) extend B-splines by adding weights to control points. They can exactly represent conic sections like circles and ellipses.',
      steps: [
        {
          title: 'Step 1: Understand Weights',
          formula: `Each control point P_i has a weight w_i`,
          description: `NURBS add weights to B-splines. ${params.numPoints !== undefined ? params.numPoints : 'n+1'} control points have ${params.numPoints !== undefined ? params.numPoints : 'n+1'} corresponding weights`,
          calculation: 'Higher weights pull the curve closer to that control point',
          result: 'Weights provide additional control over curve shape'
        },
        {
          title: 'Step 2: Rational B-Spline Basis',
          formula: `R_i,${params.degree !== undefined ? params.degree : 'k'}(t) = (w_i × N_i,${params.degree !== undefined ? params.degree : 'k'}(t)) / Σ(j=0 to ${params.numPoints !== undefined ? params.numPoints - 1 : 'n'}) (w_j × N_j,${params.degree !== undefined ? params.degree : 'k'}(t))`,
          description: 'Rational basis functions are weighted B-spline basis functions divided by the sum of all weighted basis functions',
          calculation: 'The denominator ensures the basis functions sum to 1 (partition of unity)',
          result: 'Rational basis functions for NURBS'
        },
        {
          title: 'Step 3: Evaluate NURBS Curve',
          formula: `P(t) = Σ(i=0 to ${params.numPoints !== undefined ? params.numPoints - 1 : 'n'}) P_i × R_i,${params.degree !== undefined ? params.degree : 'k'}(t)`,
          description: 'Multiply each control point by its rational basis function and sum',
          calculation: 'For each t, calculate all rational basis functions, then compute weighted sum',
          result: 'Point on the NURBS curve'
        },
        {
          title: 'Step 4: Weight Effects',
          formula: 'w_i > 1: curve pulled toward P_i\nw_i = 1: standard B-spline\nw_i < 1: curve pushed away from P_i',
          description: 'Weights control how much each point influences the curve',
          calculation: 'Equal weights (all w_i = 1) reduce NURBS to standard B-splines',
          result: 'Flexible curve control through weights'
        },
        {
          title: 'Step 5: Conic Sections',
          formula: 'Circles: weights = [1, cos(θ/2), 1, cos(θ/2), ...]',
          description: 'NURBS can exactly represent circles, ellipses, parabolas, and hyperbolas using specific weight values',
          calculation: 'For a circle, use specific weight patterns based on the arc angle',
          result: 'Exact representation of conic sections, impossible with polynomial curves'
        }
      ]
    },
    surface: {
      explanation: 'Parametric surfaces extend curve concepts to 2D. They are defined by two parameters (u, v) and a grid of control points.',
      steps: [
        {
          title: 'Step 1: Control Point Grid',
          formula: `Surface defined by (m+1) × (n+1) control points P_i,j`,
          description: 'Surfaces use a 2D grid of control points. For a Bezier surface, typically 4×4 or higher grids are used',
          calculation: 'Each control point has coordinates (x, y, z) defining a 3D position',
          result: 'Control point grid defines surface shape'
        },
        {
          title: 'Step 2: Tensor Product Surface',
          formula: `S(u,v) = Σ(i=0 to m) Σ(j=0 to n) P_i,j × B_i^m(u) × B_j^n(v)`,
          description: 'Surface is created by taking the tensor product (outer product) of two curve basis functions',
          calculation: 'For each (u, v), evaluate basis functions in both u and v directions, then combine',
          result: 'Point on the parametric surface'
        },
        {
          title: 'Step 3: Isoparametric Curves',
          formula: 'C_u(v) = S(u₀, v), C_v(u) = S(u, v₀)',
          description: 'Curves on the surface where one parameter is constant. These help visualize surface structure',
          calculation: 'Fix u = u₀ to get a curve in v direction, or fix v = v₀ to get a curve in u direction',
          result: 'Grid of curves that form the surface'
        },
        {
          title: 'Step 4: Surface Normals',
          formula: 'N(u,v) = (∂S/∂u) × (∂S/∂v) / ||(∂S/∂u) × (∂S/∂v)||',
          description: 'Normal vectors are computed from partial derivatives, essential for lighting and rendering',
          calculation: 'Calculate partial derivatives, take cross product, then normalize',
          result: 'Surface normal for each point, used in shading calculations'
        },
        {
          title: 'Step 5: Surface Patches',
          formula: 'Complex surfaces built from multiple patches with C^k continuity',
          description: 'Large surfaces are created by joining multiple patches. Continuity at boundaries ensures smooth surfaces',
          calculation: 'Match boundary control points and derivatives for smooth connections',
          result: 'Complex smooth surfaces from simple patches'
        }
      ]
    }
  };

  return steps[curveType] || null;
};

