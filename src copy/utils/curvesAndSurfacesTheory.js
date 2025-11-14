// Theory and explanations for Curves & Surfaces

export const getCurveTheory = (curveType) => {
  const theories = {
    bezier: {
      title: 'Bezier Curves',
      description: 'Bezier curves are parametric curves defined by control points. They are widely used in computer graphics, animation, and font design. The curve passes through the first and last control points and is influenced by intermediate control points.',
      concepts: [
        {
          name: 'Bernstein Basis Functions',
          description: 'Bezier curves use Bernstein polynomials as basis functions. These polynomials blend the control points to create smooth curves.',
          formula: 'B_i^n(t) = C(n,i) × t^i × (1-t)^(n-i)'
        },
        {
          name: 'De Casteljau\'s Algorithm',
          description: 'A recursive algorithm for evaluating Bezier curves by repeatedly interpolating between control points.',
          formula: 'P_i^r(t) = (1-t) × P_i^(r-1)(t) + t × P_(i+1)^(r-1)(t)'
        },
        {
          name: 'Convex Hull Property',
          description: 'Bezier curves always lie within the convex hull of their control points. This ensures predictable behavior.',
          formula: 'Curve(t) ∈ ConvexHull(P_0, P_1, ..., P_n)'
        },
        {
          name: 'Affine Invariance',
          description: 'Applying an affine transformation to control points produces the same result as applying it to the curve.',
          formula: 'T(Bezier(P)) = Bezier(T(P))'
        }
      ],
      geometricMeaning: 'Bezier curves create smooth, predictable curves. The degree determines how many control points influence the curve. Higher degrees allow more complex shapes but require more computation.',
      applications: [
        'Font design (TrueType, PostScript)',
        'Path animation in graphics software',
        'UI design (rounded corners, smooth paths)',
        'CAD systems for curve modeling',
        'Image editing tools (pen tool, paths)'
      ]
    },
    bspline: {
      title: 'B-Splines',
      description: 'B-splines (basis splines) are more flexible than Bezier curves. They use a knot vector to control the influence of each control point, allowing local control and continuity control.',
      concepts: [
        {
          name: 'B-Spline Basis Functions',
          description: 'Recursive basis functions defined by the knot vector. They determine how much each control point influences the curve at a given parameter value.',
          formula: 'N_i,k(t) = (t - t_i)/(t_(i+k) - t_i) × N_i,k-1(t) + (t_(i+k+1) - t)/(t_(i+k+1) - t_(i+1)) × N_(i+1),k-1(t)'
        },
        {
          name: 'Knot Vector',
          description: 'A non-decreasing sequence of parameter values that controls the curve segments and continuity.',
          formula: 'T = [t_0, t_1, ..., t_(n+k+1)]'
        },
        {
          name: 'Local Control',
          description: 'Moving a control point only affects a local region of the curve, unlike Bezier curves where all points affect the entire curve.',
          formula: 'P_i affects curve on [t_i, t_(i+k+1)]'
        },
        {
          name: 'Continuity',
          description: 'B-splines of degree k have C^(k-1) continuity at knots. Uniform knots give C^(k-1) continuity everywhere.',
          formula: 'C^(k-1) continuity for degree k B-spline'
        }
      ],
      geometricMeaning: 'B-splines provide local control and can represent complex curves with fewer control points than Bezier curves. The knot vector determines where curve segments join and their smoothness.',
      applications: [
        'CAD/CAM systems',
        '3D modeling software',
        'Animation paths',
        'Data interpolation',
        'Surface modeling'
      ]
    },
    hermite: {
      title: 'Hermite Curves',
      description: 'Hermite curves are defined by two endpoints and their tangent vectors. They provide direct control over the curve\'s direction at the endpoints, making them useful for connecting curve segments smoothly.',
      concepts: [
        {
          name: 'Hermite Basis Functions',
          description: 'Cubic polynomials that blend position and tangent information to create smooth curves.',
          formula: 'H_00(t) = 2t³ - 3t² + 1\nH_10(t) = t³ - 2t² + t\nH_01(t) = -2t³ + 3t²\nH_11(t) = t³ - t²'
        },
        {
          name: 'Hermite Curve Equation',
          description: 'The curve is a weighted sum of endpoints and tangents using Hermite basis functions.',
          formula: 'P(t) = P_0 × H_00(t) + T_0 × H_10(t) + P_1 × H_01(t) + T_1 × H_11(t)'
        },
        {
          name: 'C1 Continuity',
          description: 'Hermite curves naturally provide C1 continuity (continuous first derivative) at endpoints when connecting segments.',
          formula: 'P\'(0) = T_0, P\'(1) = T_1'
        }
      ],
      geometricMeaning: 'Hermite curves give direct control over both position and direction at endpoints. This makes them ideal for creating smooth transitions between curve segments.',
      applications: [
        'Keyframe animation',
        'Path planning',
        'Spline interpolation',
        'Font design',
        'Connecting curve segments'
      ]
    },
    catmullrom: {
      title: 'Catmull-Rom Splines',
      description: 'Catmull-Rom splines are a type of cubic Hermite spline that interpolate all control points. They are commonly used in animation and path planning because they pass through all control points.',
      concepts: [
        {
          name: 'Interpolation Property',
          description: 'Unlike Bezier curves, Catmull-Rom splines pass through all control points, making them intuitive for path design.',
          formula: 'P(t_i) = P_i for all control points'
        },
        {
          name: 'Cardinal Spline',
          description: 'Catmull-Rom is a special case of cardinal splines with tension parameter. Tension controls the tightness of the curve.',
          formula: 'Cardinal spline with tension τ'
        },
        {
          name: 'Local Control',
          description: 'Each segment is influenced by four control points, providing local control while maintaining interpolation.',
          formula: 'Segment i uses P_(i-1), P_i, P_(i+1), P_(i+2)'
        }
      ],
      geometricMeaning: 'Catmull-Rom splines create smooth curves that pass through all control points. The tension parameter controls how tightly the curve follows the control points.',
      applications: [
        'Camera paths in games',
        'Character animation',
        'Path planning',
        'Motion graphics',
        'Spline-based animation'
      ]
    },
    nurbs: {
      title: 'NURBS (Non-Uniform Rational B-Splines)',
      description: 'NURBS are a generalization of B-splines that add weights to control points. They can represent both polynomial curves (B-splines) and conic sections (circles, ellipses) exactly.',
      concepts: [
        {
          name: 'Rational B-Splines',
          description: 'NURBS use weighted B-spline basis functions, allowing exact representation of conic sections.',
          formula: 'R_i,k(t) = (w_i × N_i,k(t)) / Σ(w_j × N_j,k(t))'
        },
        {
          name: 'Weights',
          description: 'Each control point has a weight. Higher weights pull the curve closer to that point. Equal weights reduce to B-splines.',
          formula: 'P(t) = Σ(w_i × P_i × N_i,k(t)) / Σ(w_i × N_i,k(t))'
        },
        {
          name: 'Projective Invariance',
          description: 'NURBS are invariant under projective transformations, making them ideal for perspective rendering.',
          formula: 'Projective transform preserves NURBS representation'
        },
        {
          name: 'Conic Sections',
          description: 'NURBS can exactly represent circles, ellipses, parabolas, and hyperbolas using specific weight values.',
          formula: 'Circle: weights = [1, cos(θ/2), 1, cos(θ/2), ...]'
        }
      ],
      geometricMeaning: 'NURBS combine the flexibility of B-splines with the ability to represent conic sections exactly. Weights provide additional control over curve shape.',
      applications: [
        'CAD systems (industry standard)',
        '3D modeling software',
        'Automotive design',
        'Aerospace engineering',
        'Precise geometric modeling'
      ]
    },
    surface: {
      title: 'Parametric Surfaces',
      description: 'Parametric surfaces extend curve concepts to 2D surfaces. They are defined by two parameters (u, v) and a grid of control points. Bezier and NURBS surfaces are the most common.',
      concepts: [
        {
          name: 'Tensor Product Surfaces',
          description: 'Surfaces are created by taking the tensor product of two curve basis functions.',
          formula: 'S(u,v) = Σ_i Σ_j P_i,j × B_i^m(u) × B_j^n(v)'
        },
        {
          name: 'Surface Patches',
          description: 'Complex surfaces are built from multiple patches. Continuity between patches is controlled by boundary conditions.',
          formula: 'C^k continuity at patch boundaries'
        },
        {
          name: 'Isoparametric Curves',
          description: 'Curves on the surface where one parameter is constant. These help visualize and understand surface structure.',
          formula: 'C_u(v) = S(u_0, v), C_v(u) = S(u, v_0)'
        },
        {
          name: 'Surface Normals',
          description: 'Normal vectors are computed from partial derivatives, essential for lighting and rendering.',
          formula: 'N = (∂S/∂u) × (∂S/∂v) / ||(∂S/∂u) × (∂S/∂v)||'
        }
      ],
      geometricMeaning: 'Parametric surfaces extend curve concepts to create smooth 3D surfaces. They are fundamental to 3D modeling, allowing precise control over surface shape.',
      applications: [
        '3D modeling and animation',
        'CAD/CAM systems',
        'Industrial design',
        'Character modeling',
        'Surface reconstruction'
      ]
    }
  };

  return theories[curveType] || null;
};

