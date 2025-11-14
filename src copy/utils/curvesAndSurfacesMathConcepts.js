// Mathematical concepts used in Curves & Surfaces

export const getCurveMathConcepts = (curveType) => {
  const concepts = {
    bezier: [
      {
        name: 'Polynomial Interpolation',
        description: 'Bezier curves use polynomial basis functions to interpolate between control points, creating smooth curves.'
      },
      {
        name: 'Binomial Coefficients',
        description: 'Used in Bernstein basis functions to weight control points. C(n,i) represents combinations.'
      },
      {
        name: 'Parametric Equations',
        description: 'Curves are defined parametrically with parameter t ∈ [0,1], allowing smooth traversal.'
      },
      {
        name: 'Convex Combinations',
        description: 'Bezier curves are convex combinations of control points, ensuring they lie within the convex hull.'
      },
      {
        name: 'De Casteljau\'s Algorithm',
        description: 'Recursive algorithm for evaluating Bezier curves using linear interpolation.'
      }
    ],
    bspline: [
      {
        name: 'Piecewise Polynomials',
        description: 'B-splines are piecewise polynomial functions, with each piece defined on a knot interval.'
      },
      {
        name: 'Recursive Functions',
        description: 'B-spline basis functions are defined recursively, building higher-degree functions from lower-degree ones.'
      },
      {
        name: 'Knot Vectors',
        description: 'Non-decreasing sequences that partition the parameter space and control curve segments.'
      },
      {
        name: 'Local Support',
        description: 'Each basis function has local support, meaning it\'s non-zero only on a finite interval.'
      },
      {
        name: 'Continuity',
        description: 'B-splines provide controlled continuity (C^(k-1) for degree k) at knot locations.'
      }
    ],
    hermite: [
      {
        name: 'Cubic Polynomials',
        description: 'Hermite curves use cubic polynomials to satisfy position and derivative constraints.'
      },
      {
        name: 'Boundary Value Problems',
        description: 'Hermite interpolation solves boundary value problems with specified endpoints and derivatives.'
      },
      {
        name: 'Basis Functions',
        description: 'Four cubic basis functions blend position and tangent information to create smooth curves.'
      },
      {
        name: 'C1 Continuity',
        description: 'Hermite curves naturally provide continuous first derivatives, enabling smooth connections.'
      }
    ],
    catmullrom: [
      {
        name: 'Cardinal Splines',
        description: 'Catmull-Rom splines are a special case of cardinal splines with specific tension values.'
      },
      {
        name: 'Interpolation',
        description: 'Unlike approximation curves, Catmull-Rom splines pass through all control points.'
      },
      {
        name: 'Local Control',
        description: 'Each segment depends on four control points, providing local control while maintaining interpolation.'
      },
      {
        name: 'Tension Parameter',
        description: 'Controls the tightness of the curve, affecting how closely it follows the control points.'
      }
    ],
    nurbs: [
      {
        name: 'Rational Functions',
        description: 'NURBS use rational (ratio of polynomials) basis functions, enabling exact conic representation.'
      },
      {
        name: 'Homogeneous Coordinates',
        description: 'Weights can be interpreted as homogeneous coordinates, enabling projective transformations.'
      },
      {
        name: 'Projective Geometry',
        description: 'NURBS are invariant under projective transformations, essential for perspective rendering.'
      },
      {
        name: 'Conic Sections',
        description: 'NURBS can exactly represent circles, ellipses, parabolas, and hyperbolas using specific weights.'
      },
      {
        name: 'Weighted Averages',
        description: 'NURBS points are weighted averages of control points, with weights controlling influence.'
      }
    ],
    surface: [
      {
        name: 'Tensor Products',
        description: 'Surfaces are created by taking the tensor product of two curve basis functions.'
      },
      {
        name: 'Bivariate Functions',
        description: 'Surfaces are functions of two parameters (u, v), extending curve concepts to 2D.'
      },
      {
        name: 'Surface Patches',
        description: 'Complex surfaces are built from multiple patches with controlled continuity at boundaries.'
      },
      {
        name: 'Isoparametric Curves',
        description: 'Curves on surfaces where one parameter is constant, useful for visualization and analysis.'
      },
      {
        name: 'Cross Product',
        description: 'Surface normals are computed using the cross product of partial derivatives.'
      },
      {
        name: 'Differential Geometry',
        description: 'Surfaces use concepts from differential geometry: tangents, normals, curvature.'
      }
    ]
  };

  return concepts[curveType] || [];
};

