// Theory and explanations for Animation & Interpolation

export const getAnimationTheory = (interpolationType) => {
  const theories = {
    linear: {
      title: 'Linear Interpolation (LERP)',
      description: 'Linear interpolation is the simplest form of interpolation. It creates a straight line between two points, moving at a constant rate.',
      concepts: [
        {
          name: 'Linear Interpolation Formula',
          description: 'LERP blends two values proportionally based on a parameter t ∈ [0, 1]. When t=0, result equals start; when t=1, result equals end.',
          formula: 'lerp(a, b, t) = a + (b - a) × t'
        },
        {
          name: 'Constant Velocity',
          description: 'Linear interpolation produces constant velocity motion. The rate of change is uniform across the entire interpolation.',
          formula: 'v = (b - a) / Δt (constant)'
        },
        {
          name: '2D/3D Extension',
          description: 'LERP can be applied component-wise to vectors, interpolating each component independently.',
          formula: 'lerp2D(p₁, p₂, t) = (lerp(x₁, x₂, t), lerp(y₁, y₂, t))'
        }
      ],
      geometricMeaning: 'Linear interpolation creates a straight line segment between two points. The interpolated point moves uniformly along this line.',
      applications: [
        'Simple animations',
        'Color blending',
        'Position interpolation',
        'Basic tweening',
        'UI transitions'
      ]
    },
    easing: {
      title: 'Easing Functions',
      description: 'Easing functions modify the interpolation rate to create natural-looking motion. They accelerate or decelerate the animation.',
      concepts: [
        {
          name: 'Ease In',
          description: 'Starts slow and accelerates. Creates a "pulling away" effect.',
          formula: 'easeIn(t, n) = t^n'
        },
        {
          name: 'Ease Out',
          description: 'Starts fast and decelerates. Creates a "coming to rest" effect.',
          formula: 'easeOut(t, n) = 1 - (1 - t)^n'
        },
        {
          name: 'Ease In-Out',
          description: 'Combines ease in and ease out. Accelerates in the first half, decelerates in the second.',
          formula: 'easeInOut(t, n) = { 2^(n-1) × t^n if t < 0.5, 1 - 2^(n-1) × (1-t)^n otherwise }'
        },
        {
          name: 'Power Parameter',
          description: 'The power parameter (n) controls the strength of the easing effect. Higher values create more pronounced acceleration/deceleration.',
          formula: 'n = 1: linear, n = 2: quadratic, n = 3: cubic, etc.'
        }
      ],
      geometricMeaning: 'Easing functions modify the time parameter before interpolation, creating non-linear motion curves. The curve shape determines acceleration/deceleration.',
      applications: [
        'UI animations',
        'Character movement',
        'Camera transitions',
        'Object motion',
        'Smooth transitions'
      ]
    },
    bezierEasing: {
      title: 'Bezier Easing',
      description: 'Bezier easing uses cubic Bezier curves to define custom easing functions. This provides precise control over acceleration and deceleration.',
      concepts: [
        {
          name: 'Cubic Bezier Easing',
          description: 'Uses a cubic Bezier curve with endpoints (0,0) and (1,1) and two control points to define the easing function.',
          formula: 'B(t) = (1-t)³ × P₀ + 3(1-t)²t × P₁ + 3(1-t)t² × P₂ + t³ × P₃'
        },
        {
          name: 'Control Points',
          description: 'The two control points define the curve shape. X-coordinates control timing, Y-coordinates control value progression.',
          formula: 'P₁ = (x₁, y₁), P₂ = (x₂, y₂) where x₁, x₂ ∈ [0, 1]'
        },
        {
          name: 'CSS cubic-bezier',
          description: 'Bezier easing is the basis for CSS cubic-bezier() function, allowing precise animation timing control.',
          formula: 'cubic-bezier(x₁, y₁, x₂, y₂)'
        }
      ],
      geometricMeaning: 'The Bezier curve defines how the time parameter is transformed. Steeper curves mean faster changes, flatter curves mean slower changes.',
      applications: [
        'CSS animations',
        'Web animations',
        'Custom easing curves',
        'Precise timing control',
        'Designer-friendly animation tools'
      ]
    },
    slerp: {
      title: 'Spherical Linear Interpolation (SLERP)',
      description: 'SLERP interpolates between two unit vectors on a sphere, maintaining constant angular velocity. Essential for quaternion and rotation interpolation.',
      concepts: [
        {
          name: 'SLERP Formula',
          description: 'Interpolates along the shortest arc on a sphere, maintaining constant angular velocity.',
          formula: 'slerp(q₁, q₂, t) = (sin((1-t)θ)/sin(θ)) × q₁ + (sin(tθ)/sin(θ)) × q₂'
        },
        {
          name: 'Angle Calculation',
          description: 'The angle θ between vectors is calculated using the dot product.',
          formula: 'θ = arccos(q₁ · q₂)'
        },
        {
          name: 'Constant Angular Velocity',
          description: 'SLERP maintains constant angular velocity, ensuring smooth rotation without speed variations.',
          formula: 'ω = θ / Δt (constant)'
        },
        {
          name: 'Quaternion Interpolation',
          description: 'SLERP is the standard method for interpolating quaternions, avoiding gimbal lock and ensuring smooth rotations.',
          formula: 'q(t) = slerp(q₁, q₂, t)'
        }
      ],
      geometricMeaning: 'SLERP interpolates along the great circle arc between two points on a sphere. This ensures the shortest rotation path with constant angular speed.',
      applications: [
        'Quaternion interpolation',
        'Camera rotations',
        'Character orientation',
        'Smooth rotation animations',
        '3D object rotations'
      ]
    },
    keyframes: {
      title: 'Keyframe Animation',
      description: 'Keyframe animation defines values at specific times. Interpolation fills in values between keyframes, creating smooth animations.',
      concepts: [
        {
          name: 'Keyframe Definition',
          description: 'Keyframes specify values at specific times. The animation system interpolates between consecutive keyframes.',
          formula: 'K = {(t₁, v₁), (t₂, v₂), ..., (t_n, v_n)}'
        },
        {
          name: 'Segment Interpolation',
          description: 'For time t between keyframes (t_i, t_(i+1)), interpolate between v_i and v_(i+1) using local parameter.',
          formula: 'v(t) = lerp(v_i, v_(i+1), (t - t_i) / (t_(i+1) - t_i))'
        },
        {
          name: 'Easing Between Keyframes',
          description: 'Each segment can use different easing functions, allowing complex animation curves.',
          formula: 'v(t) = lerp(v_i, v_(i+1), ease((t - t_i) / (t_(i+1) - t_i)))'
        },
        {
          name: 'Extrapolation',
          description: 'Values before the first keyframe or after the last can be clamped, repeated, or extrapolated.',
          formula: 'v(t) = v₁ if t < t₁, v_n if t > t_n'
        }
      ],
      geometricMeaning: 'Keyframes define control points on a time-value curve. Interpolation creates smooth curves between these points.',
      applications: [
        'Character animation',
        'Property animations',
        'Timeline-based animation',
        'Motion graphics',
        'UI animations'
      ]
    },
    path: {
      title: 'Path Animation',
      description: 'Path animation moves objects along predefined paths. The path can be linear segments, Bezier curves, or splines.',
      concepts: [
        {
          name: 'Path Definition',
          description: 'A path is defined by a sequence of control points. The path type determines how points are connected.',
          formula: 'Path = {P₀, P₁, P₂, ..., P_n}'
        },
        {
          name: 'Linear Path',
          description: 'Connects points with straight line segments. Simple but creates sharp corners.',
          formula: 'P(t) = lerp(P_i, P_(i+1), local_t)'
        },
        {
          name: 'Bezier Path',
          description: 'Uses Bezier curves to create smooth paths through control points.',
          formula: 'P(t) = Bezier(P_i, P_(i+1), P_(i+2), P_(i+3), local_t)'
        },
        {
          name: 'Catmull-Rom Path',
          description: 'Creates smooth paths that pass through all control points, ideal for camera paths.',
          formula: 'P(t) = CatmullRom(P_(i-1), P_i, P_(i+1), P_(i+2), local_t)'
        },
        {
          name: 'Arc Length Parameterization',
          description: 'For constant speed, paths should be parameterized by arc length rather than uniform t.',
          formula: 's(t) = ∫₀ᵗ ||P\'(u)|| du'
        }
      ],
      geometricMeaning: 'Path animation moves objects along curves defined by control points. The path type determines smoothness and whether it passes through points.',
      applications: [
        'Camera paths',
        'Character movement',
        'Particle systems',
        'UI element motion',
        'Vehicle paths'
      ]
    }
  };

  return theories[interpolationType] || null;
};

