// Formulas for Curves & Surfaces

export const getCurveFormulas = (curveType, params) => {
  const formulas = {
    bezier: {
      title: 'Bezier Curve Formulas',
      formulas: [
        {
          name: 'Bezier Curve Definition',
          formula: 'P(t) = Σ(i=0 to n) P_i × B_i^n(t)',
          description: 'Bezier curve as weighted sum of control points using Bernstein basis functions',
          values: params && params.numPoints ? `P(t) = Σ(i=0 to ${params.numPoints - 1}) P_i × B_i^${params.degree}(t)` : 'P(t) = Σ(i=0 to n) P_i × B_i^n(t)'
        },
        {
          name: 'Bernstein Basis Function',
          formula: 'B_i^n(t) = C(n,i) × t^i × (1-t)^(n-i)',
          description: 'Bernstein polynomial of degree n, index i',
          values: 'B_i^n(t) = C(n,i) × t^i × (1-t)^(n-i)'
        },
        {
          name: 'Binomial Coefficient',
          formula: 'C(n,i) = n! / (i! × (n-i)!)',
          description: 'Number of ways to choose i items from n',
          values: 'C(n,i) = n! / (i! × (n-i)!)'
        },
        {
          name: 'First Derivative',
          formula: 'P\'(t) = n × Σ(i=0 to n-1) (P_(i+1) - P_i) × B_i^(n-1)(t)',
          description: 'Derivative of Bezier curve (also a Bezier curve)',
          values: params && params.degree ? `P'(t) = ${params.degree} × Σ(i=0 to ${params.degree - 1}) (P_(i+1) - P_i) × B_i^${params.degree - 1}(t)` : 'P\'(t) = n × Σ(i=0 to n-1) (P_(i+1) - P_i) × B_i^(n-1)(t)'
        }
      ]
    },
    bspline: {
      title: 'B-Spline Formulas',
      formulas: [
        {
          name: 'B-Spline Curve Definition',
          formula: 'P(t) = Σ(i=0 to n) P_i × N_i,k(t)',
          description: 'B-spline curve as weighted sum using B-spline basis functions',
          values: params && params.numPoints ? `P(t) = Σ(i=0 to ${params.numPoints - 1}) P_i × N_i,${params.degree}(t)` : 'P(t) = Σ(i=0 to n) P_i × N_i,k(t)'
        },
        {
          name: 'B-Spline Basis Function (Recursive)',
          formula: 'N_i,k(t) = (t - t_i)/(t_(i+k) - t_i) × N_i,k-1(t) + (t_(i+k+1) - t)/(t_(i+k+1) - t_(i+1)) × N_(i+1),k-1(t)',
          description: 'Recursive definition of B-spline basis functions',
          values: 'N_i,k(t) = (t - t_i)/(t_(i+k) - t_i) × N_i,k-1(t) + (t_(i+k+1) - t)/(t_(i+k+1) - t_(i+1)) × N_(i+1),k-1(t)'
        },
        {
          name: 'Basis Function (k=0)',
          formula: 'N_i,0(t) = {1 if t_i ≤ t < t_(i+1), 0 otherwise}',
          description: 'Base case for recursive definition',
          values: 'N_i,0(t) = {1 if t_i ≤ t < t_(i+1), 0 otherwise}'
        },
        {
          name: 'Knot Vector Requirements',
          formula: 't_0 ≤ t_1 ≤ ... ≤ t_(n+k+1)',
          description: 'Knot vector must be non-decreasing',
          values: 't_0 ≤ t_1 ≤ ... ≤ t_(n+k+1)'
        }
      ]
    },
    hermite: {
      title: 'Hermite Curve Formulas',
      formulas: [
        {
          name: 'Hermite Curve Definition',
          formula: 'P(t) = P_0 × H_00(t) + T_0 × H_10(t) + P_1 × H_01(t) + T_1 × H_11(t)',
          description: 'Hermite curve blending endpoints and tangents',
          values: 'P(t) = P_0 × H_00(t) + T_0 × H_10(t) + P_1 × H_01(t) + T_1 × H_11(t)'
        },
        {
          name: 'Hermite Basis Functions',
          formula: 'H_00(t) = 2t³ - 3t² + 1\nH_10(t) = t³ - 2t² + t\nH_01(t) = -2t³ + 3t²\nH_11(t) = t³ - t²',
          description: 'Cubic Hermite basis functions',
          values: 'H_00(t) = 2t³ - 3t² + 1\nH_10(t) = t³ - 2t² + t\nH_01(t) = -2t³ + 3t²\nH_11(t) = t³ - t²'
        },
        {
          name: 'Boundary Conditions',
          formula: 'P(0) = P_0, P(1) = P_1\nP\'(0) = T_0, P\'(1) = T_1',
          description: 'Curve passes through endpoints with specified tangents',
          values: 'P(0) = P_0, P(1) = P_1\nP\'(0) = T_0, P\'(1) = T_1'
        }
      ]
    },
    catmullrom: {
      title: 'Catmull-Rom Spline Formulas',
      formulas: [
        {
          name: 'Catmull-Rom Curve',
          formula: 'P(t) = 0.5 × [2P_1 + (-P_0 + P_2)t + (2P_0 - 5P_1 + 4P_2 - P_3)t² + (-P_0 + 3P_1 - 3P_2 + P_3)t³]',
          description: 'Catmull-Rom interpolation between P_1 and P_2 using four control points',
          values: 'P(t) = 0.5 × [2P_1 + (-P_0 + P_2)t + (2P_0 - 5P_1 + 4P_2 - P_3)t² + (-P_0 + 3P_1 - 3P_2 + P_3)t³]'
        },
        {
          name: 'Cardinal Spline (General)',
          formula: 'P(t) = P_1 + s × (P_2 - P_0)t + [2s(P_0 - P_1) + s(P_2 - P_0) + (2-s)(P_2 - P_1)]t² + [s(P_1 - P_2) + (s-2)(P_2 - P_1)]t³',
          description: 'General cardinal spline with tension parameter s',
          values: 'P(t) = P_1 + s × (P_2 - P_0)t + [2s(P_0 - P_1) + s(P_2 - P_0) + (2-s)(P_2 - P_1)]t² + [s(P_1 - P_2) + (s-2)(P_2 - P_1)]t³'
        },
        {
          name: 'Interpolation Property',
          formula: 'P(0) = P_1, P(1) = P_2',
          description: 'Curve passes through middle control points',
          values: 'P(0) = P_1, P(1) = P_2'
        }
      ]
    },
    nurbs: {
      title: 'NURBS Formulas',
      formulas: [
        {
          name: 'NURBS Curve Definition',
          formula: 'P(t) = Σ(i=0 to n) (w_i × P_i × N_i,k(t)) / Σ(i=0 to n) (w_i × N_i,k(t))',
          description: 'NURBS curve with weighted control points',
          values: params && params.numPoints ? `P(t) = Σ(i=0 to ${params.numPoints - 1}) (w_i × P_i × N_i,${params.degree}(t)) / Σ(i=0 to ${params.numPoints - 1}) (w_i × N_i,${params.degree}(t))` : 'P(t) = Σ(i=0 to n) (w_i × P_i × N_i,k(t)) / Σ(i=0 to n) (w_i × N_i,k(t))'
        },
        {
          name: 'Rational B-Spline Basis',
          formula: 'R_i,k(t) = (w_i × N_i,k(t)) / Σ(j=0 to n) (w_j × N_j,k(t))',
          description: 'Rational B-spline basis function',
          values: 'R_i,k(t) = (w_i × N_i,k(t)) / Σ(j=0 to n) (w_j × N_j,k(t))'
        },
        {
          name: 'Weight Effect',
          formula: 'w_i > 1: curve pulled toward P_i\nw_i < 1: curve pushed away from P_i\nw_i = 1: standard B-spline',
          description: 'How weights affect curve shape',
          values: 'w_i > 1: curve pulled toward P_i\nw_i < 1: curve pushed away from P_i\nw_i = 1: standard B-spline'
        },
        {
          name: 'Circle Representation',
          formula: 'Circle: weights = [1, cos(θ/2), 1, cos(θ/2), ...]',
          description: 'Exact circle representation using specific weights',
          values: 'Circle: weights = [1, cos(θ/2), 1, cos(θ/2), ...]'
        }
      ]
    },
    surface: {
      title: 'Parametric Surface Formulas',
      formulas: [
        {
          name: 'Bezier Surface Definition',
          formula: 'S(u,v) = Σ(i=0 to m) Σ(j=0 to n) P_i,j × B_i^m(u) × B_j^n(v)',
          description: 'Tensor product Bezier surface',
          values: 'S(u,v) = Σ(i=0 to m) Σ(j=0 to n) P_i,j × B_i^m(u) × B_j^n(v)'
        },
        {
          name: 'Partial Derivatives',
          formula: '∂S/∂u = m × Σ(i=0 to m-1) Σ(j=0 to n) (P_(i+1),j - P_i,j) × B_i^(m-1)(u) × B_j^n(v)\n∂S/∂v = n × Σ(i=0 to m) Σ(j=0 to n-1) (P_i,(j+1) - P_i,j) × B_i^m(u) × B_j^(n-1)(v)',
          description: 'Partial derivatives for surface normals',
          values: '∂S/∂u = m × Σ(i=0 to m-1) Σ(j=0 to n) (P_(i+1),j - P_i,j) × B_i^(m-1)(u) × B_j^n(v)\n∂S/∂v = n × Σ(i=0 to m) Σ(j=0 to n-1) (P_i,(j+1) - P_i,j) × B_i^m(u) × B_j^(n-1)(v)'
        },
        {
          name: 'Surface Normal',
          formula: 'N(u,v) = (∂S/∂u) × (∂S/∂v) / ||(∂S/∂u) × (∂S/∂v)||',
          description: 'Normal vector for lighting calculations',
          values: 'N(u,v) = (∂S/∂u) × (∂S/∂v) / ||(∂S/∂u) × (∂S/∂v)||'
        },
        {
          name: 'NURBS Surface',
          formula: 'S(u,v) = Σ(i=0 to m) Σ(j=0 to n) (w_i,j × P_i,j × N_i,k(u) × N_j,l(v)) / Σ(i=0 to m) Σ(j=0 to n) (w_i,j × N_i,k(u) × N_j,l(v))',
          description: 'NURBS surface extension',
          values: 'S(u,v) = Σ(i=0 to m) Σ(j=0 to n) (w_i,j × P_i,j × N_i,k(u) × N_j,l(v)) / Σ(i=0 to m) Σ(j=0 to n) (w_i,j × N_i,k(u) × N_j,l(v))'
        }
      ]
    }
  };

  return formulas[curveType] || null;
};

