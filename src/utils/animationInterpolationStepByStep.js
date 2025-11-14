// Step-by-step explanations for Animation & Interpolation

export const getAnimationStepByStep = (interpolationType, params) => {
  if (!params) return null;
  
  const steps = {
    linear: {
      explanation: 'Linear interpolation creates a straight line between two points, moving at constant velocity.',
      steps: [
        {
          title: 'Step 1: Define Start and End Points',
          formula: `Start: (${params.start && params.start.x !== undefined ? params.start.x.toFixed(2) : 'x₁'}, ${params.start && params.start.y !== undefined ? params.start.y.toFixed(2) : 'y₁'}), End: (${params.end && params.end.x !== undefined ? params.end.x.toFixed(2) : 'x₂'}, ${params.end && params.end.y !== undefined ? params.end.y.toFixed(2) : 'y₂'})`,
          description: 'Identify the starting and ending points for interpolation',
          calculation: 'These points define the interpolation range',
          result: 'Two points that bound the interpolation'
        },
        {
          title: 'Step 2: Normalize Time Parameter',
          formula: 't ∈ [0, 1]',
          description: 'Convert time to normalized parameter t, where t=0 is start and t=1 is end',
          calculation: 't = (current_time - start_time) / (end_time - start_time)',
          result: 'Normalized time parameter between 0 and 1'
        },
        {
          title: 'Step 3: Apply Linear Interpolation',
          formula: 'lerp(a, b, t) = a + (b - a) × t',
          description: 'Calculate interpolated value using linear formula',
          calculation: params.start && params.end 
            ? `x = ${params.start.x.toFixed(2)} + (${params.end.x.toFixed(2)} - ${params.start.x.toFixed(2)}) × t\ny = ${params.start.y.toFixed(2)} + (${params.end.y.toFixed(2)} - ${params.start.y.toFixed(2)}) × t`
            : 'x = x₁ + (x₂ - x₁) × t, y = y₁ + (y₂ - y₁) × t',
          result: 'Interpolated point at time t'
        },
        {
          title: 'Step 4: Verify Boundary Conditions',
          formula: 'lerp(a, b, 0) = a, lerp(a, b, 1) = b',
          description: 'Check that interpolation matches endpoints at boundaries',
          calculation: 'At t=0: result equals start point\nAt t=1: result equals end point',
          result: 'Interpolation correctly maps boundaries'
        },
        {
          title: 'Step 5: Constant Velocity',
          formula: 'v = (b - a) / Δt',
          description: 'Linear interpolation produces constant velocity motion',
          calculation: 'The rate of change is uniform across the entire interpolation',
          result: 'Smooth, constant-speed motion'
        }
      ]
    },
    easing: {
      explanation: 'Easing functions modify the interpolation rate to create natural acceleration and deceleration.',
      steps: [
        {
          title: 'Step 1: Choose Easing Type',
          formula: `Type: ${params.type || 'easeIn'}`,
          description: `Select the easing type: ${params.type || 'easeIn'} (starts slow), easeOut (ends slow), or easeInOut (both)`,
          calculation: 'The type determines acceleration/deceleration pattern',
          result: `Easing type: ${params.type || 'easeIn'}`
        },
        {
          title: 'Step 2: Apply Power Function',
          formula: params.type === 'easeIn' 
            ? `easeIn(t, ${params.power !== undefined ? params.power : 'n'}) = t^${params.power !== undefined ? params.power : 'n'}`
            : params.type === 'easeOut'
            ? `easeOut(t, ${params.power !== undefined ? params.power : 'n'}) = 1 - (1-t)^${params.power !== undefined ? params.power : 'n'}`
            : `easeInOut(t, ${params.power !== undefined ? params.power : 'n'})`,
          description: `Apply power function with power ${params.power !== undefined ? params.power : 'n'} to transform time parameter`,
          calculation: `Transform t using ${params.type || 'easeIn'} function with power ${params.power !== undefined ? params.power : 'n'}`,
          result: 'Eased time parameter'
        },
        {
          title: 'Step 3: Apply to Interpolation',
          formula: 'value = lerp(start, end, eased_t)',
          description: 'Use the eased time parameter in linear interpolation',
          calculation: 'The eased parameter creates non-linear motion',
          result: 'Interpolated value with easing applied'
        },
        {
          title: 'Step 4: Understand Acceleration',
          formula: 'Acceleration = d²(ease(t))/dt²',
          description: 'The second derivative determines acceleration. Higher powers create stronger acceleration/deceleration',
          calculation: `Power ${params.power !== undefined ? params.power : 'n'} creates ${params.power !== undefined && params.power > 1 ? 'strong' : 'moderate'} acceleration effect`,
          result: 'Natural-looking motion with acceleration/deceleration'
        }
      ]
    },
    bezierEasing: {
      explanation: 'Bezier easing uses cubic Bezier curves to define custom easing functions with precise control.',
      steps: [
        {
          title: 'Step 1: Define Control Points',
          formula: `P₁ = (${params.points && params.points[0] ? params.points[0].x.toFixed(2) : 'x₁'}, ${params.points && params.points[0] ? params.points[0].y.toFixed(2) : 'y₁'}), P₂ = (${params.points && params.points[1] ? params.points[1].x.toFixed(2) : 'x₂'}, ${params.points && params.points[1] ? params.points[1].y.toFixed(2) : 'y₂'})`,
          description: 'Set two control points that define the Bezier curve shape',
          calculation: 'X-coordinates control timing, Y-coordinates control value progression',
          result: 'Control points defining easing curve'
        },
        {
          title: 'Step 2: Calculate Bezier Curve',
          formula: 'B(t) = (1-t)³ × (0,0) + 3(1-t)²t × P₁ + 3(1-t)t² × P₂ + t³ × (1,1)',
          description: 'Evaluate cubic Bezier curve with endpoints (0,0) and (1,1)',
          calculation: 'For each t, calculate the Bezier curve value',
          result: 'Eased time parameter from Bezier curve'
        },
        {
          title: 'Step 3: Apply to Interpolation',
          formula: 'value = lerp(start, end, B(t))',
          description: 'Use Bezier curve output as eased time parameter',
          calculation: 'The Bezier curve transforms t into eased_t',
          result: 'Interpolated value with Bezier easing'
        },
        {
          title: 'Step 4: Verify Monotonicity',
          formula: 'dB/dt ≥ 0 for all t',
          description: 'Ensure the Bezier curve is monotonic (always increasing) for valid easing',
          calculation: 'Check that Y-coordinates of control points create increasing curve',
          result: 'Valid easing function'
        }
      ]
    },
    slerp: {
      explanation: 'Spherical linear interpolation maintains constant angular velocity when interpolating rotations.',
      steps: [
        {
          title: 'Step 1: Normalize Vectors',
          formula: 'q₁_normalized = q₁ / ||q₁||, q₂_normalized = q₂ / ||q₂||',
          description: 'Ensure both vectors are unit length (magnitude = 1)',
          calculation: 'Divide each component by vector magnitude',
          result: 'Unit vectors ready for SLERP'
        },
        {
          title: 'Step 2: Calculate Dot Product',
          formula: 'dot = q₁ · q₂',
          description: 'Calculate dot product to find angle between vectors',
          calculation: `dot = ${params.start && params.start.x !== undefined ? params.start.x.toFixed(2) : 'x₁'} × ${params.end && params.end.x !== undefined ? params.end.x.toFixed(2) : 'x₂'} + ${params.start && params.start.y !== undefined ? params.start.y.toFixed(2) : 'y₁'} × ${params.end && params.end.y !== undefined ? params.end.y.toFixed(2) : 'y₂'} + ${params.start && params.start.z !== undefined ? params.start.z.toFixed(2) : 'z₁'} × ${params.end && params.end.z !== undefined ? params.end.z.toFixed(2) : 'z₂'}`,
          result: 'Dot product value'
        },
        {
          title: 'Step 3: Calculate Angle',
          formula: 'θ = arccos(dot)',
          description: 'Find the angle between vectors using inverse cosine',
          calculation: 'Angle determines the arc length for interpolation',
          result: 'Angle between vectors in radians'
        },
        {
          title: 'Step 4: Apply SLERP Formula',
          formula: 'slerp(q₁, q₂, t) = (sin((1-t)θ)/sin(θ)) × q₁ + (sin(tθ)/sin(θ)) × q₂',
          description: 'Calculate weighted combination using sine functions',
          calculation: 'Weights ensure constant angular velocity along great circle arc',
          result: 'Interpolated unit vector'
        },
        {
          title: 'Step 5: Constant Angular Velocity',
          formula: 'ω = θ / Δt',
          description: 'SLERP maintains constant angular velocity, ensuring smooth rotation',
          calculation: 'Angular speed remains constant throughout interpolation',
          result: 'Smooth rotation without speed variations'
        }
      ]
    },
    keyframes: {
      explanation: 'Keyframe animation defines values at specific times, with interpolation filling in between.',
      steps: [
        {
          title: 'Step 1: Define Keyframes',
          formula: `K = {${params.keyframes ? params.keyframes.map(k => `(${k.time.toFixed(2)}, ${k.value.toFixed(2)})`).join(', ') : '(t₁, v₁), (t₂, v₂), ...'}}`,
          description: 'Create keyframes as time-value pairs',
          calculation: 'Each keyframe specifies a value at a specific time',
          result: 'Set of keyframes defining animation'
        },
        {
          title: 'Step 2: Find Surrounding Keyframes',
          formula: 'Find i such that t_i ≤ t ≤ t_(i+1)',
          description: 'Locate the two keyframes that bracket the current time',
          calculation: 'Search through sorted keyframes to find the segment containing t',
          result: 'Keyframes k_i and k_(i+1) surrounding current time'
        },
        {
          title: 'Step 3: Calculate Local Parameter',
          formula: 'local_t = (t - t_i) / (t_(i+1) - t_i)',
          description: 'Convert global time to local parameter in [0,1] for the segment',
          calculation: 'Map time from [t_i, t_(i+1)] to [0, 1]',
          result: 'Local parameter for segment interpolation'
        },
        {
          title: 'Step 4: Apply Easing (if specified)',
          formula: `eased_t = ${params.interpolation || 'linear'}(local_t)`,
          description: `Apply ${params.interpolation || 'linear'} easing function to local parameter`,
          calculation: 'Transform local_t using easing function',
          result: 'Eased local parameter'
        },
        {
          title: 'Step 5: Interpolate Between Keyframes',
          formula: 'v(t) = lerp(v_i, v_(i+1), eased_t)',
          description: 'Linearly interpolate between keyframe values using eased parameter',
          calculation: 'Blend values from surrounding keyframes',
          result: 'Interpolated value at time t'
        }
      ]
    },
    path: {
      explanation: 'Path animation moves objects along predefined paths using various curve types.',
      steps: [
        {
          title: 'Step 1: Define Path Points',
          formula: `Path = {${params.points ? params.points.map((p, i) => `P${i}`).join(', ') : 'P₀, P₁, P₂, ...'}}`,
          description: `Create ${params.points ? params.points.length : 'n'} control points defining the path`,
          calculation: 'Points specify positions the object should pass through or near',
          result: 'Path control points'
        },
        {
          title: 'Step 2: Choose Path Type',
          formula: `Type: ${params.pathType || 'linear'}`,
          description: `Select path type: ${params.pathType || 'linear'} (straight segments), bezier (smooth curves), or catmullrom (interpolating spline)`,
          calculation: 'Path type determines how points are connected',
          result: `Path type: ${params.pathType || 'linear'}`
        },
        {
          title: 'Step 3: Calculate Path Position',
          formula: params.pathType === 'linear'
            ? 'P(t) = lerp(P_i, P_(i+1), local_t)'
            : params.pathType === 'bezier'
            ? 'P(t) = Bezier(P₀, P₁, P₂, P₃, t)'
            : 'P(t) = CatmullRom(P_(i-1), P_i, P_(i+1), P_(i+2), local_t)',
          description: `Evaluate path at parameter t using ${params.pathType || 'linear'} interpolation`,
          calculation: 'Calculate position along path for given t',
          result: 'Position on path at time t'
        },
        {
          title: 'Step 4: Handle Multiple Segments',
          formula: 'For linear: segment i = floor(t × (n-1))',
          description: 'Determine which path segment contains the current parameter',
          calculation: 'Map global t to segment index and local parameter',
          result: 'Correct segment and local parameter'
        },
        {
          title: 'Step 5: Arc Length Parameterization (Optional)',
          formula: 's(t) = ∫₀ᵗ ||P\'(u)|| du',
          description: 'For constant speed, parameterize by arc length instead of uniform t',
          calculation: 'Precompute arc length table and use it for constant-speed motion',
          result: 'Constant-speed path animation'
        }
      ]
    }
  };

  return steps[interpolationType] || null;
};

