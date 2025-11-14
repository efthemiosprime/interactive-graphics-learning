// Formulas for Animation & Interpolation

export const getAnimationFormulas = (interpolationType, params) => {
  const formulas = {
    linear: {
      title: 'Linear Interpolation Formulas',
      formulas: [
        {
          name: 'Linear Interpolation (LERP)',
          formula: 'lerp(a, b, t) = a + (b - a) × t',
          description: 'Interpolates between two values linearly',
          values: params && params.start && params.end 
            ? `lerp(${params.start.x.toFixed(2)}, ${params.end.x.toFixed(2)}, t) = ${params.start.x.toFixed(2)} + (${params.end.x.toFixed(2)} - ${params.start.x.toFixed(2)}) × t`
            : 'lerp(a, b, t) = a + (b - a) × t'
        },
        {
          name: '2D Linear Interpolation',
          formula: 'lerp2D(p₁, p₂, t) = (lerp(x₁, x₂, t), lerp(y₁, y₂, t))',
          description: 'Interpolates 2D points component-wise',
          values: 'lerp2D(p₁, p₂, t) = (lerp(x₁, x₂, t), lerp(y₁, y₂, t))'
        },
        {
          name: '3D Linear Interpolation',
          formula: 'lerp3D(p₁, p₂, t) = (lerp(x₁, x₂, t), lerp(y₁, y₂, t), lerp(z₁, z₂, t))',
          description: 'Interpolates 3D points component-wise',
          values: 'lerp3D(p₁, p₂, t) = (lerp(x₁, x₂, t), lerp(y₁, y₂, t), lerp(z₁, z₂, t))'
        },
        {
          name: 'Boundary Conditions',
          formula: 'lerp(a, b, 0) = a\nlerp(a, b, 1) = b',
          description: 'At t=0, result equals start; at t=1, result equals end',
          values: 'lerp(a, b, 0) = a, lerp(a, b, 1) = b'
        }
      ]
    },
    easing: {
      title: 'Easing Function Formulas',
      formulas: [
        {
          name: 'Ease In',
          formula: `easeIn(t, n) = t^n`,
          description: 'Starts slow, accelerates',
          values: params && params.power !== undefined 
            ? `easeIn(t, ${params.power}) = t^${params.power}`
            : 'easeIn(t, n) = t^n'
        },
        {
          name: 'Ease Out',
          formula: 'easeOut(t, n) = 1 - (1 - t)^n',
          description: 'Starts fast, decelerates',
          values: params && params.power !== undefined 
            ? `easeOut(t, ${params.power}) = 1 - (1 - t)^${params.power}`
            : 'easeOut(t, n) = 1 - (1 - t)^n'
        },
        {
          name: 'Ease In-Out',
          formula: 'easeInOut(t, n) = { 2^(n-1) × t^n if t < 0.5, 1 - 2^(n-1) × (1-t)^n otherwise }',
          description: 'Accelerates then decelerates',
          values: params && params.power !== undefined 
            ? `easeInOut(t, ${params.power}) = { 2^${params.power - 1} × t^${params.power} if t < 0.5, 1 - 2^${params.power - 1} × (1-t)^${params.power} otherwise }`
            : 'easeInOut(t, n) = { 2^(n-1) × t^n if t < 0.5, 1 - 2^(n-1) × (1-t)^n otherwise }'
        },
        {
          name: 'Power Functions',
          formula: 'n = 1: linear\nn = 2: quadratic\nn = 3: cubic\nn = 4: quartic',
          description: 'Different power values create different acceleration curves',
          values: 'n = 1: linear, n = 2: quadratic, n = 3: cubic, n = 4: quartic'
        }
      ]
    },
    bezierEasing: {
      title: 'Bezier Easing Formulas',
      formulas: [
        {
          name: 'Cubic Bezier Easing',
          formula: 'B(t) = (1-t)³ × P₀ + 3(1-t)²t × P₁ + 3(1-t)t² × P₂ + t³ × P₃',
          description: 'Cubic Bezier curve with endpoints (0,0) and (1,1)',
          values: 'B(t) = (1-t)³ × (0,0) + 3(1-t)²t × P₁ + 3(1-t)t² × P₂ + t³ × (1,1)'
        },
        {
          name: 'Control Points',
          formula: 'P₁ = (x₁, y₁), P₂ = (x₂, y₂)',
          description: 'Two control points define the easing curve shape',
          values: params && params.points 
            ? `P₁ = (${params.points[0].x.toFixed(2)}, ${params.points[0].y.toFixed(2)}), P₂ = (${params.points[1].x.toFixed(2)}, ${params.points[1].y.toFixed(2)})`
            : 'P₁ = (x₁, y₁), P₂ = (x₂, y₂)'
        },
        {
          name: 'Monotonic Constraint',
          formula: 'x₁, x₂ ∈ [0, 1]',
          description: 'X-coordinates must be in [0,1] for valid easing function',
          values: 'x₁, x₂ ∈ [0, 1]'
        }
      ]
    },
    slerp: {
      title: 'Spherical Linear Interpolation Formulas',
      formulas: [
        {
          name: 'SLERP Formula',
          formula: 'slerp(q₁, q₂, t) = (sin((1-t)θ)/sin(θ)) × q₁ + (sin(tθ)/sin(θ)) × q₂',
          description: 'Interpolates along great circle arc on unit sphere',
          values: 'slerp(q₁, q₂, t) = (sin((1-t)θ)/sin(θ)) × q₁ + (sin(tθ)/sin(θ)) × q₂'
        },
        {
          name: 'Angle Calculation',
          formula: 'θ = arccos(q₁ · q₂)',
          description: 'Angle between two unit vectors',
          values: 'θ = arccos(q₁ · q₂)'
        },
        {
          name: 'Constant Angular Velocity',
          formula: 'ω = θ / Δt',
          description: 'SLERP maintains constant angular velocity',
          values: 'ω = θ / Δt (constant)'
        },
        {
          name: 'Quaternion SLERP',
          formula: 'q(t) = slerp(q₁, q₂, t)',
          description: 'Standard method for quaternion interpolation',
          values: 'q(t) = slerp(q₁, q₂, t)'
        }
      ]
    },
    keyframes: {
      title: 'Keyframe Animation Formulas',
      formulas: [
        {
          name: 'Keyframe Definition',
          formula: 'K = {(t₁, v₁), (t₂, v₂), ..., (t_n, v_n)}',
          description: 'Set of time-value pairs',
          values: params && params.keyframes 
            ? `K = {${params.keyframes.map(k => `(${k.time.toFixed(2)}, ${k.value.toFixed(2)})`).join(', ')}}`
            : 'K = {(t₁, v₁), (t₂, v₂), ..., (t_n, v_n)}'
        },
        {
          name: 'Segment Interpolation',
          formula: 'v(t) = lerp(v_i, v_(i+1), (t - t_i) / (t_(i+1) - t_i))',
          description: 'Interpolate between consecutive keyframes',
          values: 'v(t) = lerp(v_i, v_(i+1), (t - t_i) / (t_(i+1) - t_i))'
        },
        {
          name: 'Eased Interpolation',
          formula: 'v(t) = lerp(v_i, v_(i+1), ease((t - t_i) / (t_(i+1) - t_i)))',
          description: 'Apply easing function to local parameter',
          values: 'v(t) = lerp(v_i, v_(i+1), ease((t - t_i) / (t_(i+1) - t_i)))'
        },
        {
          name: 'Extrapolation',
          formula: 'v(t) = v₁ if t < t₁, v_n if t > t_n',
          description: 'Handle values outside keyframe range',
          values: 'v(t) = v₁ if t < t₁, v_n if t > t_n'
        }
      ]
    },
    path: {
      title: 'Path Animation Formulas',
      formulas: [
        {
          name: 'Linear Path',
          formula: 'P(t) = lerp(P_i, P_(i+1), local_t)',
          description: 'Straight line segments between points',
          values: 'P(t) = lerp(P_i, P_(i+1), local_t)'
        },
        {
          name: 'Bezier Path',
          formula: 'P(t) = (1-t)³ × P₀ + 3(1-t)²t × P₁ + 3(1-t)t² × P₂ + t³ × P₃',
          description: 'Cubic Bezier curve through control points',
          values: 'P(t) = (1-t)³ × P₀ + 3(1-t)²t × P₁ + 3(1-t)t² × P₂ + t³ × P₃'
        },
        {
          name: 'Catmull-Rom Path',
          formula: 'P(t) = 0.5 × [2P₁ + (-P₀ + P₂)t + (2P₀ - 5P₁ + 4P₂ - P₃)t² + (-P₀ + 3P₁ - 3P₂ + P₃)t³]',
          description: 'Spline that passes through all points',
          values: 'P(t) = 0.5 × [2P₁ + (-P₀ + P₂)t + (2P₀ - 5P₁ + 4P₂ - P₃)t² + (-P₀ + 3P₁ - 3P₂ + P₃)t³]'
        },
        {
          name: 'Arc Length Parameterization',
          formula: 's(t) = ∫₀ᵗ ||P\'(u)|| du',
          description: 'For constant speed, parameterize by arc length',
          values: 's(t) = ∫₀ᵗ ||P\'(u)|| du'
        }
      ]
    }
  };

  return formulas[interpolationType] || null;
};

