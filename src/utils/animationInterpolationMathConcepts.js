// Mathematical concepts used in Animation & Interpolation

export const getAnimationMathConcepts = (interpolationType) => {
  const concepts = {
    linear: [
      {
        name: 'Linear Functions',
        description: 'Linear interpolation uses linear functions, which have constant rate of change (slope).'
      },
      {
        name: 'Convex Combinations',
        description: 'LERP is a convex combination: lerp(a, b, t) = (1-t) × a + t × b, where t ∈ [0,1].'
      },
      {
        name: 'Parameterization',
        description: 'The parameter t ∈ [0,1] maps the interpolation progress from start to end.'
      },
      {
        name: 'Vector Operations',
        description: 'LERP can be applied component-wise to vectors, interpolating each dimension independently.'
      }
    ],
    easing: [
      {
        name: 'Power Functions',
        description: 'Easing functions use power functions (t^n) to create acceleration and deceleration curves.'
      },
      {
        name: 'Piecewise Functions',
        description: 'Ease In-Out combines two power functions with a piecewise definition at t=0.5.'
      },
      {
        name: 'Function Composition',
        description: 'Easing functions transform the time parameter before interpolation, composing with LERP.'
      },
      {
        name: 'Derivatives',
        description: 'The derivative of easing functions determines acceleration. Higher derivatives indicate stronger acceleration/deceleration.'
      }
    ],
    bezierEasing: [
      {
        name: 'Cubic Bezier Curves',
        description: 'Bezier easing uses cubic Bezier curves, which are parametric curves defined by four control points.'
      },
      {
        name: 'Bernstein Polynomials',
        description: 'Bezier curves use Bernstein basis functions to blend control points.'
      },
      {
        name: 'Monotonic Functions',
        description: 'Valid easing functions must be monotonic (always increasing) to ensure valid time mapping.'
      },
      {
        name: 'Function Approximation',
        description: 'Bezier curves can approximate any smooth function, making them versatile for easing.'
      }
    ],
    slerp: [
      {
        name: 'Spherical Geometry',
        description: 'SLERP operates on the unit sphere, interpolating along great circle arcs.'
      },
      {
        name: 'Trigonometric Functions',
        description: 'SLERP uses sine and cosine functions to maintain constant angular velocity.'
      },
      {
        name: 'Dot Product',
        description: 'The dot product calculates the angle between vectors, essential for SLERP calculations.'
      },
      {
        name: 'Quaternion Algebra',
        description: 'SLERP is fundamental to quaternion interpolation, avoiding gimbal lock in rotations.'
      },
      {
        name: 'Geodesics',
        description: 'SLERP follows geodesics (shortest paths) on the sphere, ensuring optimal interpolation.'
      }
    ],
    keyframes: [
      {
        name: 'Piecewise Interpolation',
        description: 'Keyframe animation uses piecewise interpolation, applying different functions to different time segments.'
      },
      {
        name: 'Time Segmentation',
        description: 'The time domain is divided into segments, each interpolated independently.'
      },
      {
        name: 'Local Parameterization',
        description: 'Each segment uses a local parameter t_local ∈ [0,1] mapped from global time.'
      },
      {
        name: 'Continuity',
        description: 'Keyframe systems can ensure C⁰ (position), C¹ (velocity), or C² (acceleration) continuity at keyframes.'
      }
    ],
    path: [
      {
        name: 'Parametric Curves',
        description: 'Paths are parametric curves, where position is a function of parameter t.'
      },
      {
        name: 'Curve Types',
        description: 'Different curve types (linear, Bezier, Catmull-Rom) provide different smoothness and control properties.'
      },
      {
        name: 'Arc Length',
        description: 'For constant speed, paths must be parameterized by arc length rather than uniform t.'
      },
      {
        name: 'Curvature',
        description: 'Path curvature determines how sharply the path turns, affecting motion dynamics.'
      },
      {
        name: 'Frenet Frame',
        description: 'The Frenet frame (tangent, normal, binormal) describes orientation along a path.'
      }
    ]
  };

  return concepts[interpolationType] || [];
};

