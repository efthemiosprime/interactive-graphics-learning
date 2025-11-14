export const shaderMathConcepts = {
  basic: {
    color: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: 'Vector (3D)',
          description: 'RGB color values are represented as 3D vectors (r, g, b)',
          example: 'vec3 color = vec3(1.0, 0.5, 0.0)',
          usage: 'Color components stored as vector coordinates'
        },
        {
          name: 'Scalar Values',
          description: 'Color components range from 0.0 to 1.0 (normalized)',
          example: 'r = 1.0, g = 0.5, b = 0.0',
          usage: 'Each component is a scalar in [0, 1] range'
        }
      ]
    },
    uv: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: '2D Vector',
          description: 'UV coordinates are 2D vectors representing position in texture space',
          example: 'vec2 uv = gl_FragCoord.xy / u_resolution.xy',
          usage: 'Maps screen coordinates to [0,1]×[0,1] space'
        },
        {
          name: 'Coordinate Transformation',
          description: 'Converting screen coordinates to normalized UV space',
          example: 'uv = screenPos / resolution',
          usage: 'Linear transformation from pixel space to texture space'
        },
        {
          name: 'Scaling',
          description: 'Multiplying UV by scale factor creates tiling/repetition',
          example: 'uv *= scale',
          usage: 'Uniform scaling transformation'
        }
      ]
    },
    time: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: 'Scalar Function',
          description: 'Time is a scalar value that increases continuously',
          example: 'float t = u_time',
          usage: 'Continuous scalar parameter'
        },
        {
          name: 'Trigonometric Functions',
          description: 'sin() and cos() create periodic oscillations',
          example: 'sin(time), cos(time)',
          usage: 'Periodic functions for animation'
        },
        {
          name: 'Function Composition',
          description: 'Combining functions to create complex animations',
          example: 'sin(time * frequency + phase)',
          usage: 'Mathematical function composition'
        }
      ]
    },
    gradients: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: 'Linear Interpolation',
          description: 'Smooth transition between two values using interpolation factor',
          example: 'mix(a, b, t) = a * (1 - t) + b * t',
          usage: 'Creates smooth color transitions in gradients'
        },
        {
          name: 'Dot Product',
          description: 'Measures projection of one vector onto another',
          example: 'dot(vec1, vec2) = vec1.x * vec2.x + vec1.y * vec2.y',
          usage: 'Linear gradients use dot product to measure position along direction'
        },
        {
          name: 'Euclidean Distance',
          description: 'Straight-line distance between two points',
          example: 'length(uv - center) or sqrt((x1-x2)² + (y1-y2)²)',
          usage: 'Radial gradients use distance from center to determine color'
        },
        {
          name: 'Vector Direction',
          description: 'Unit vector representing direction from angle',
          example: 'dir = vec2(cos(angle), sin(angle))',
          usage: 'Converts angle to direction vector for linear gradients'
        },
        {
          name: 'Normalization',
          description: 'Scaling values to [0, 1] range using clamp',
          example: 't = clamp(value, 0.0, 1.0)',
          usage: 'Ensures interpolation factor stays in valid range'
        }
      ]
    },
    shapes: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: 'Euclidean Distance',
          description: 'Straight-line distance between two points in 2D space',
          example: 'dist = length(uv - center) = sqrt((uv.x - center.x)² + (uv.y - center.y)²)',
          usage: 'Circle shapes use Euclidean distance to determine if point is inside circle'
        },
        {
          name: 'Signed Distance Fields (SDF)',
          description: 'Distance function that returns negative values inside shape, positive outside',
          example: 'sdf = dist - radius (negative inside, positive outside)',
          usage: 'Enables efficient shape rendering and boolean operations'
        },
        {
          name: 'Box Distance Function',
          description: 'Distance calculation for axis-aligned rectangles',
          example: 'd = abs(uv - center) - halfSize, dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0)',
          usage: 'Rectangle shapes use box distance for precise edge detection'
        },
        {
          name: 'Smoothstep Function',
          description: 'Smooth interpolation function creating S-curve transition',
          example: 'smoothstep(edge0, edge1, x) = smooth Hermite interpolation',
          usage: 'Creates anti-aliased edges by smoothly transitioning from 0 to 1'
        },
        {
          name: 'Vector Projection',
          description: 'Projecting a point onto a line using dot product',
          example: 'proj = dot(point - lineStart, lineDir)',
          usage: 'Line shapes use projection to find closest point on line segment'
        },
        {
          name: 'Clamp Function',
          description: 'Constrains value to be within specified range',
          example: 'clamp(value, min, max) = max(min, min(max, value))',
          usage: 'Limits line segment projection to valid range, preventing infinite lines'
        },
        {
          name: 'Shape Masking',
          description: 'Binary or smooth field multiplied by color to create shape',
          example: 'color = shapeColor * shapeMask (where mask is 0.0 or 1.0)',
          usage: 'Enables shape rendering on any background and shape composition'
        }
      ]
    },
    colorSpaces: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: 'Cylindrical Coordinates',
          description: 'HSV color space uses cylindrical coordinates (hue = angle, saturation = radius, value = height)',
          example: 'HSV(h, s, v) where h ∈ [0, 360°], s ∈ [0, 1], v ∈ [0, 1]',
          usage: 'HSV color space representation'
        },
        {
          name: 'Coordinate Transformation',
          description: 'Converting between coordinate systems (HSV cylinder to RGB cube)',
          example: 'hsv2rgb(hsv) = geometric transformation',
          usage: 'HSV to RGB conversion'
        },
        {
          name: 'Component-wise Operations',
          description: 'Operations applied independently to each color component (R, G, B)',
          example: 'result.r = operation(c1.r, c2.r), result.g = operation(c1.g, c2.g), result.b = operation(c1.b, c2.b)',
          usage: 'Color mixing operations'
        },
        {
          name: 'Clamp Function',
          description: 'Constrains values to valid range [0, 1]',
          example: 'clamp(value, 0.0, 1.0) = max(0.0, min(1.0, value))',
          usage: 'Prevents color overflow in additive blending'
        },
        {
          name: 'Conditional Operations',
          description: 'Different operations based on condition (used in overlay blending)',
          example: 'result = condition ? operation1 : operation2',
          usage: 'Overlay blending switches between multiply and screen'
        },
        {
          name: 'Linear Interpolation',
          description: 'Smooth transition between two values',
          example: 'mix(a, b, t) = a * (1 - t) + b * t',
          usage: 'Blending between original and mixed colors'
        },
        {
          name: 'Trigonometric Functions',
          description: 'Sine and cosine used in HSV to RGB conversion',
          example: 'cos(hue), sin(hue) for color wheel mapping',
          usage: 'HSV hue to RGB component mapping'
        }
      ]
    },
    mathOperations: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: 'Arithmetic Operations',
          description: 'Basic mathematical operations: addition, subtraction, multiplication, division',
          example: 'a + b, a - b, a * b, a / b',
          usage: 'Fundamental calculations in shaders'
        },
        {
          name: 'Exponentiation',
          description: 'Raising a number to a power',
          example: 'pow(a, b) = a^b',
          usage: 'Creating exponential curves and falloff effects'
        },
        {
          name: 'Modulo Operation',
          description: 'Remainder after division',
          example: 'mod(a, b) = a % b',
          usage: 'Creating repeating patterns and wrapping values'
        },
        {
          name: 'Absolute Value',
          description: 'Distance from zero (always positive)',
          example: 'abs(a) = |a|',
          usage: 'Symmetric operations and distance calculations'
        },
        {
          name: 'Floor and Ceiling',
          description: 'Rounding down or up to nearest integer',
          example: 'floor(a) = ⌊a⌋, ceil(a) = ⌈a⌉',
          usage: 'Quantization and discrete steps'
        },
        {
          name: 'Min and Max Functions',
          description: 'Selecting smaller or larger value',
          example: 'min(a, b), max(a, b)',
          usage: 'Comparisons and boundary selection'
        },
        {
          name: 'Clamp Function',
          description: 'Constraining value to range',
          example: 'clamp(value, min, max) = max(min, min(max, value))',
          usage: 'Keeping values in valid ranges'
        },
        {
          name: 'Linear Interpolation',
          description: 'Smooth transition between two values',
          example: 'mix(a, b, t) = a * (1 - t) + b * t',
          usage: 'Creating smooth transitions and gradients'
        }
      ]
    },
    coordinateTransformations: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: 'Rotation Matrix',
          description: '2×2 matrix that rotates vectors around origin: R(θ) = [cos(θ) -sin(θ); sin(θ) cos(θ)]',
          example: 'rotated = vec2(centered.x * cos(θ) - centered.y * sin(θ), centered.x * sin(θ) + centered.y * cos(θ))',
          usage: 'Rotates UV coordinates around a center point, preserving distances and angles'
        },
        {
          name: 'Trigonometric Functions',
          description: 'Sine and cosine functions calculate rotation components',
          example: 'cos(angle), sin(angle)',
          usage: 'Used in rotation matrix to calculate rotated coordinates'
        },
        {
          name: 'Vector Addition',
          description: 'Adding vectors translates coordinates: translated = uv + offset',
          example: 'transformedUV = uv + vec2(offsetX, offsetY)',
          usage: 'Translation moves UV coordinates uniformly in a direction'
        },
        {
          name: 'Vector Scaling',
          description: 'Multiplying vectors by scalars scales coordinates: scaled = centered * scale',
          example: 'transformedUV = (uv - center) * scale + center',
          usage: 'Scaling stretches or compresses UV coordinates around a center point'
        },
        {
          name: 'Arctangent Function',
          description: 'atan2(y, x) calculates angle from positive x-axis to point (x, y)',
          example: 'angle = atan2(centered.y, centered.x)',
          usage: 'Polar coordinates use atan2 to convert Cartesian to angle (range: [-π, π])'
        },
        {
          name: 'Euclidean Distance',
          description: 'Distance from center point: radius = length(uv - center)',
          example: 'radius = sqrt((uv.x - center.x)² + (uv.y - center.y)²)',
          usage: 'Polar coordinates use distance as radius component'
        },
        {
          name: 'Coordinate System Conversion',
          description: 'Transforming between Cartesian (x, y) and polar (angle, radius) coordinate systems',
          example: 'Cartesian to Polar: angle = atan2(y, x), radius = length(vec2(x, y))',
          usage: 'Polar coordinates enable circular patterns and radial effects'
        },
        {
          name: 'Affine Transformations',
          description: 'Transformations that preserve parallel lines: rotation, translation, scaling',
          example: 'Combined: scale → rotate → translate',
          usage: 'Multiple transformations can be combined to create complex effects'
        }
      ]
    }
  },
  intermediate: {
    noise: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: '2D Vector',
          description: 'Noise input is a 2D position vector',
          example: 'vec2 st = uv * scale',
          usage: 'Position in 2D space'
        },
        {
          name: 'Random Function',
          description: 'Pseudo-random number generation using hash functions',
          example: 'random(st) = fract(sin(dot(st, seed)) * largeNumber)',
          usage: 'Deterministic randomness'
        },
        {
          name: 'Interpolation',
          description: 'Smooth interpolation between random values',
          example: 'mix(a, b, t) or smoothstep()',
          usage: 'Bilinear interpolation for smooth noise'
        },
        {
          name: 'Dot Product',
          description: 'Used in hash function for random value generation',
          example: 'dot(st.xy, vec2(12.9898, 78.233))',
          usage: 'Vector dot product for hashing'
        }
      ]
    },
    patterns: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: '2D Vector',
          description: 'Grid position calculated from UV coordinates',
          example: 'vec2 grid = floor(uv * scale)',
          usage: 'Discrete grid coordinates'
        },
        {
          name: 'Floor Function',
          description: 'Converts continuous values to discrete integers',
          example: 'floor(x)',
          usage: 'Creates grid cells'
        },
        {
          name: 'Modulo Operation',
          description: 'Creates repeating patterns using remainder',
          example: 'mod(value, n)',
          usage: 'Creates alternating patterns (checkerboard)'
        },
        {
          name: 'Arithmetic Operations',
          description: 'Combining grid coordinates for pattern logic',
          example: 'mod(grid.x + grid.y, 2.0)',
          usage: 'Pattern generation through arithmetic'
        }
      ]
    },
    advancedNoise: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: 'Fractal Noise',
          description: 'Summing multiple octaves of noise at different frequencies and amplitudes',
          example: 'fractal = Σ(noise(st * frequency^i) * amplitude^i) for i in [0, octaves)',
          usage: 'Creates detailed, natural-looking patterns with multiple scales'
        },
        {
          name: 'Simplex Noise',
          description: 'Improved version of Perlin noise using simplex grid (triangular)',
          example: 'simplex(st) = gradient interpolation on triangular grid',
          usage: 'Smoother gradients and better computational efficiency than Perlin'
        },
        {
          name: 'Worley Noise (Cellular)',
          description: 'Distance to nearest feature point in a grid',
          example: 'worley(st) = min(distance(st, featurePoints[i]))',
          usage: 'Creates cellular, Voronoi-like patterns'
        },
        {
          name: 'Perlin Noise',
          description: 'Gradient-based noise using grid interpolation',
          example: 'perlin(st) = interpolate(gradients[gridCorners], fractionalPart)',
          usage: 'Classic smooth noise for natural patterns'
        },
        {
          name: 'Domain Warping',
          description: 'Using noise to distort coordinates before sampling',
          example: 'warped = st + noise(st) * strength',
          usage: 'Creates complex, organic patterns by distorting space'
        },
        {
          name: 'Octave Summation',
          description: 'Combining multiple frequency layers with decreasing amplitude',
          example: 'value += noise(st * freq) * amp; freq *= lacunarity; amp *= gain',
          usage: 'Fractal noise uses octaves for multi-scale detail'
        },
        {
          name: 'Lacunarity',
          description: 'Frequency multiplier between octaves',
          example: 'frequency *= lacunarity (typically 2.0)',
          usage: 'Controls spacing between frequency layers'
        },
        {
          name: 'Gain (Persistence)',
          description: 'Amplitude multiplier between octaves',
          example: 'amplitude *= gain (typically 0.5)',
          usage: 'Controls how much each octave contributes'
        }
      ]
    },
    distance: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: '2D Vector',
          description: 'Position vectors in 2D space',
          example: 'vec2 uv, vec2 center',
          usage: 'Point positions'
        },
        {
          name: 'Vector Subtraction',
          description: 'Calculating displacement between points',
          example: 'vec2 diff = uv - center',
          usage: 'Vector difference'
        },
        {
          name: 'Euclidean Distance',
          description: 'Length of vector (distance from origin)',
          example: 'length(vec) or sqrt(dot(vec, vec))',
          usage: 'Distance calculation: dist = length(position - center)'
        },
        {
          name: 'Smoothstep Function',
          description: 'Smooth interpolation with anti-aliasing',
          example: 'smoothstep(edge0, edge1, x)',
          usage: 'Creates smooth transitions'
        }
      ]
    },
    displacementMapping: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: 'Height Map Sampling',
          description: 'Reading height values from texture or procedural noise',
          example: 'height = texture2D(u_texture, uv).r or height = noise(uv)',
          usage: 'Determines surface displacement amount'
        },
        {
          name: 'Gradient Calculation',
          description: 'Calculating partial derivatives to find surface normal',
          example: 'gradient = vec2(height(x+ε) - height(x-ε), height(y+ε) - height(y-ε))',
          usage: 'Used to compute surface normals from height map'
        },
        {
          name: 'Surface Normal',
          description: 'Normal vector perpendicular to surface',
          example: 'normal = normalize(vec3(-gradient.x, -gradient.y, 1.0))',
          usage: 'Defines surface orientation for lighting'
        },
        {
          name: 'Parallax Offset',
          description: 'Shifting UV coordinates based on view direction and height',
          example: 'offset = viewDir.xy / viewDir.z * height * scale',
          usage: 'Creates depth illusion through view-dependent UV shifting'
        },
        {
          name: 'Ray Marching',
          description: 'Stepping along ray to find surface intersection',
          example: 'for (int i = 0; i < steps; i++) { height = sample(uv); if (height > current) break; uv += step; }',
          usage: 'Steep parallax mapping uses ray marching for accurate depth'
        },
        {
          name: 'Linear Interpolation',
          description: 'Smoothing between sampled values',
          example: 'mix(a, b, t) = a * (1 - t) + b * t',
          usage: 'Smooths height transitions and parallax offsets'
        },
        {
          name: 'Displacement Scale',
          description: 'Multiplier controlling displacement strength',
          example: 'displacedUV = uv + offset * scale',
          usage: 'Controls how much the surface is displaced'
        }
      ]
    },
    stylized: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: 'Gradient Magnitude (Edge Detection)',
          description: 'Calculating rate of change in image intensity using Sobel-like operator',
          example: 'gx = abs(right - left), gy = abs(bottom - top), edge = sqrt(gx² + gy²)',
          usage: 'Detects edges by measuring intensity differences between neighboring pixels'
        },
        {
          name: 'Grayscale Conversion',
          description: 'Converting RGB color to single intensity value using luminance weights',
          example: 'gray = dot(color, vec3(0.299, 0.587, 0.114))',
          usage: 'Edge detection works on grayscale for better results'
        },
        {
          name: 'Quantization (Discretization)',
          description: 'Reducing continuous values to discrete levels',
          example: 'quantized = floor(value * levels) / levels',
          usage: 'Creates banded lighting (toon shading) and color posterization'
        },
        {
          name: 'Floor Function',
          description: 'Rounding down to nearest integer',
          example: 'floor(x) = ⌊x⌋',
          usage: 'Used in quantization to create discrete bands'
        },
        {
          name: 'Smoothstep Function',
          description: 'Smooth interpolation with anti-aliasing',
          example: 'smoothstep(edge0, edge1, x)',
          usage: 'Creates smooth edge transitions and thresholding'
        },
        {
          name: 'Power Function',
          description: 'Exponential scaling for rim and specular effects',
          example: 'pow(value, exponent) = value^exponent',
          usage: 'Controls sharpness of rim lighting and specular highlights'
        },
        {
          name: 'Dot Product',
          description: 'Calculating intensity from color vector',
          example: 'intensity = dot(color, vec3(0.299, 0.587, 0.114))',
          usage: 'Converts RGB to grayscale for lighting calculations'
        },
        {
          name: 'Linear Interpolation (Mix)',
          description: 'Blending between colors',
          example: 'mix(color1, color2, factor) = color1 * (1 - factor) + color2 * factor',
          usage: 'Blends rim lighting and specular highlights with base color'
        },
        {
          name: 'Vector Normalization',
          description: 'Converting vector to unit length',
          example: 'normalize(vec) = vec / length(vec)',
          usage: 'Used in rim and specular lighting calculations'
        },
        {
          name: 'Distance Calculation',
          description: 'Euclidean distance from point to center',
          example: 'dist = length(uv - center)',
          usage: 'Used in rim lighting to determine edge distance'
        }
      ]
    },
    texture: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: '2D Vector (UV)',
          description: 'Texture coordinates as 2D vectors',
          example: 'vec2 uv = gl_FragCoord.xy / u_resolution.xy',
          usage: 'Maps screen to texture space [0,1]×[0,1]'
        },
        {
          name: 'Scaling Transformation',
          description: 'Uniform scaling for texture tiling',
          example: 'uv *= u_textureScale',
          usage: 'Creates repeating patterns'
        },
        {
          name: 'Translation Transformation',
          description: 'Adding offset to shift texture position',
          example: 'uv += u_textureOffset',
          usage: 'Shifts texture coordinates'
        },
        {
          name: 'Coordinate Flipping',
          description: 'Flipping Y-axis for coordinate system conversion',
          example: 'uv.y = 1.0 - uv.y',
          usage: 'Converts between coordinate systems'
        },
        {
          name: 'Texture Sampling',
          description: 'Bilinear interpolation for smooth texture lookup',
          example: 'texture2D(sampler, uv)',
          usage: 'Retrieves color at UV coordinates with interpolation'
        }
      ]
    },
    postprocess: {
      blur: {
        title: 'Mathematical Concepts Used - Blur',
      concepts: [
        {
          name: 'Convolution',
          description: 'Mathematical operation combining a kernel with image samples',
          example: 'result = Σ(kernel[i] * sample[i])',
            usage: 'Core operation for blur effect'
        },
        {
          name: 'Gaussian Function',
          description: 'Bell-shaped distribution used for blur weights',
          example: 'G(x) = exp(-x² / (2σ²))',
          usage: 'Creates smooth blur with weighted averaging'
        },
          {
            name: 'Weighted Average',
            description: 'Average with different weights for each sample',
            example: 'avg = Σ(weight[i] * value[i]) / Σ(weight[i])',
            usage: 'Blur combines samples with Gaussian weights'
          },
          {
            name: '2D Sampling',
            description: 'Sampling surrounding pixels in a grid pattern',
            example: 'for (int x = -5; x <= 5; x++) for (int y = -5; y <= 5; y++)',
            usage: 'Iterates through neighboring pixels'
          }
        ]
      },
      edge: {
        title: 'Mathematical Concepts Used - Edge Detection',
        concepts: [
        {
          name: 'Gradient',
          description: 'Vector of partial derivatives indicating direction of change',
          example: '∇f = (∂f/∂x, ∂f/∂y)',
          usage: 'Edge detection calculates gradient magnitude'
        },
          {
            name: 'Sobel Operator',
            description: 'Discrete differentiation operator for edge detection',
            example: 'Gx = [-1 0 1; -2 0 2; -1 0 1]',
            usage: 'Convolution kernel for horizontal/vertical gradients'
          },
          {
            name: 'Gradient Magnitude',
            description: 'Length of gradient vector',
            example: '|∇f| = sqrt(Gx² + Gy²)',
            usage: 'Strength of edge at each pixel'
          },
          {
            name: 'Grayscale Conversion',
            description: 'Converting RGB to single intensity value',
            example: 'gray = dot(color, vec3(0.299, 0.587, 0.114))',
            usage: 'Edge detection works on grayscale for better results'
          },
          {
            name: 'Smoothstep',
            description: 'Smooth interpolation function',
            example: 'smoothstep(edge0, edge1, x)',
            usage: 'Creates smooth edge transitions'
          }
        ]
      },
      vignette: {
        title: 'Mathematical Concepts Used - Vignette',
        concepts: [
        {
          name: 'Distance Function',
          description: 'Distance from point to center',
          example: 'dist = length(uv - center)',
          usage: 'Vignette uses distance for radial darkening'
        },
          {
            name: 'Normalized Coordinates',
            description: 'UV coordinates in [0,1] range',
            example: 'vec2 uv = gl_FragCoord.xy / u_resolution.xy',
            usage: 'Center is at (0.5, 0.5) in normalized space'
        },
        {
          name: 'Smoothstep',
          description: 'Smooth interpolation function',
          example: 'smoothstep(edge0, edge1, x)',
          usage: 'Creates smooth transitions in vignette'
        },
          {
            name: 'Radial Falloff',
            description: 'Darkening based on distance from center',
            example: 'factor = smoothstep(inner, outer, dist)',
            usage: 'Creates circular darkening effect'
          }
        ]
      },
      chromatic: {
        title: 'Mathematical Concepts Used - Chromatic Aberration',
        concepts: [
        {
          name: 'Vector Offset',
          description: 'Spatial displacement for sampling',
          example: 'sampleUV = uv + offset',
          usage: 'Chromatic aberration shifts RGB channels'
        },
          {
            name: 'Channel Separation',
            description: 'Processing RGB channels independently',
            example: 'r = sample(uv + rOffset), g = sample(uv), b = sample(uv + bOffset)',
            usage: 'Each color channel sampled at different offset'
          },
          {
            name: 'Radial Displacement',
            description: 'Offset direction based on distance from center',
            example: 'offset = normalize(uv - center) * amount',
            usage: 'Creates color fringing effect'
          }
        ]
      },
      glitch: {
        title: 'Mathematical Concepts Used - Glitch Effect',
        concepts: [
          {
            name: 'Noise Function',
            description: 'Pseudo-random value generation',
            example: 'noise = fract(sin(dot(uv, seed)) * largeNumber)',
            usage: 'Creates random static and interference'
          },
          {
            name: 'Trigonometric Functions',
            description: 'sin() and cos() for periodic patterns',
            example: 'sin(time * frequency + phase)',
            usage: 'Creates wobble, scan lines, and interference bars'
          },
          {
            name: 'Modulo Operation',
            description: 'Creates repeating patterns',
            example: 'mod(value, period)',
            usage: 'Creates horizontal scan lines'
          },
          {
            name: 'Step Function',
            description: 'Binary threshold function',
            example: 'step(threshold, value)',
            usage: 'Creates sharp transitions for static noise'
          },
          {
            name: 'Vector Displacement',
            description: 'Spatial distortion',
            example: 'wobbledUV = uv + vec2(sin(uv.y * freq), 0.0)',
            usage: 'Creates vertical wobble effect'
          }
        ]
      },
      bloom: {
        title: 'Mathematical Concepts Used - Bloom',
        concepts: [
          {
            name: 'Brightness Extraction',
            description: 'Identifying bright areas above threshold',
            example: 'bright = step(threshold, brightness) * color',
            usage: 'Isolates bright pixels for glow effect'
          },
          {
            name: 'Gaussian Blur',
            description: 'Smooth blur using Gaussian weights',
            example: 'weight = exp(-(dist²) / (2 * radius²))',
            usage: 'Blurs bright areas to create glow'
        },
        {
          name: 'Weighted Average',
            description: 'Combining samples with distance-based weights',
            example: 'bloom = Σ(sample[i] * weight[i]) / Σ(weight[i])',
            usage: 'Creates smooth glow around bright areas'
          },
          {
            name: 'Additive Blending',
            description: 'Adding blurred bright areas to original',
            example: 'result = original + bloom * intensity',
            usage: 'Creates glowing effect'
          }
        ]
      },
      colorGrading: {
        title: 'Mathematical Concepts Used - Color Grading',
        concepts: [
          {
            name: 'Brightness Adjustment',
            description: 'Adding/subtracting constant value',
            example: 'color += brightness',
            usage: 'Linear brightness modification'
          },
          {
            name: 'Contrast Adjustment',
            description: 'Scaling around midpoint (0.5)',
            example: 'color = (color - 0.5) * contrast + 0.5',
            usage: 'Increases/decreases difference from middle gray'
          },
          {
            name: 'Saturation',
            description: 'Mixing with grayscale',
            example: 'color = mix(gray, color, saturation)',
            usage: 'Controls color intensity'
          },
          {
            name: 'Grayscale Conversion',
            description: 'Weighted average of RGB channels',
            example: 'gray = dot(color, vec3(0.299, 0.587, 0.114))',
            usage: 'Luminance calculation for saturation'
          },
          {
            name: 'Color Temperature',
            description: 'Warm/cool color shift',
            example: 'warm = vec3(1.0, 0.9, 0.7), cool = vec3(0.7, 0.9, 1.0)',
            usage: 'Adjusts color balance for temperature'
          },
          {
            name: 'Tint Adjustment',
            description: 'Green/magenta color shift',
            example: 'tintShift = vec3(1.0 + tint, 1.0, 1.0 + tint)',
            usage: 'Fine-tunes color balance'
          }
        ]
      },
      ao: {
        title: 'Mathematical Concepts Used - Ambient Occlusion',
        concepts: [
          {
            name: 'Depth/Brightness Sampling',
            description: 'Converting color to depth value',
            example: 'depth = dot(color, vec3(0.299, 0.587, 0.114))',
            usage: 'Uses brightness as depth proxy'
          },
          {
            name: 'Radial Sampling',
            description: 'Sampling in multiple directions',
            example: 'sampleDirections[8] = [right, up-right, up, ...]',
            usage: 'Tests occlusion from all directions'
          },
          {
            name: 'Depth Difference',
            description: 'Comparing center depth to sample depth',
            example: 'depthDiff = centerDepth - sampleDepth',
            usage: 'Determines if sample occludes center'
          },
          {
            name: 'Occlusion Accumulation',
            description: 'Summing occlusion from all samples',
            example: 'occlusion += smoothstep(bias, bias + range, depthDiff)',
            usage: 'Accumulates occlusion strength'
          },
          {
            name: 'Normalization',
            description: 'Averaging occlusion over all samples',
            example: 'occlusion /= sampleCount',
            usage: 'Normalizes occlusion value'
          },
          {
            name: 'Darkening',
            description: 'Applying occlusion as darkening factor',
            example: 'ao = 1.0 - occlusion * intensity',
            usage: 'Darkens occluded areas'
          }
        ]
      },
      default: {
        title: 'Mathematical Concepts Used - Post-Processing',
        concepts: [
          {
            name: 'Convolution',
            description: 'Mathematical operation combining a kernel with image samples',
            example: 'result = Σ(kernel[i] * sample[i])',
            usage: 'Core operation for many post-processing effects'
          },
          {
            name: '2D Sampling',
            description: 'Sampling surrounding pixels',
            example: 'sampleColor(uv, offset)',
            usage: 'Accessing neighboring pixel values'
          },
          {
            name: 'Vector Operations',
            description: '2D vector math for coordinates and offsets',
            example: 'vec2 uv, vec2 offset',
            usage: 'Spatial calculations in screen space'
        }
      ]
      }
    }
  },
  advanced: {
    lighting: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: '3D Vector',
          description: 'Light position, surface normal, and view direction as 3D vectors',
          example: 'vec3 lightPos, vec3 normal, vec3 viewDir',
          usage: '3D space representation'
        },
        {
          name: 'Vector Normalization',
          description: 'Converting vectors to unit length',
          example: 'normalize(vec)',
          usage: 'Normalized direction vectors'
        },
        {
          name: 'Dot Product',
          description: 'Calculates cosine of angle between vectors',
          example: 'dot(normal, lightDir)',
          usage: 'Lambertian reflection: diffuse = max(dot(n, l), 0)'
        },
        {
          name: 'Vector Reflection',
          description: 'Calculating reflected light direction',
          example: 'reflect(-lightDir, normal)',
          usage: 'Specular reflection calculation'
        },
        {
          name: 'Scalar Multiplication',
          description: 'Scaling light intensity',
          example: 'color * intensity',
          usage: 'Adjusting brightness'
        }
      ]
    },
    raymarching: {
      title: 'Mathematical Concepts Used',
      concepts: [
        {
          name: '3D Vector',
          description: 'Ray origin, direction, and position in 3D space',
          example: 'vec3 origin, vec3 direction, vec3 position',
          usage: '3D space representation'
        },
        {
          name: 'Parametric Equation',
          description: 'Ray as parametric line equation',
          example: 'ray(t) = origin + direction * t',
          usage: 'Represents line in 3D space'
        },
        {
          name: 'Distance Function (SDF)',
          description: 'Signed distance function for shapes',
          example: 'sdSphere(p, r) = length(p) - r',
          usage: 'Distance from point to surface'
        },
        {
          name: 'Vector Operations',
          description: 'Vector addition and scalar multiplication',
          example: 'position = origin + direction * t',
          usage: 'Moving along ray'
        },
        {
          name: 'Euclidean Distance',
          description: 'Distance calculation in 3D space',
          example: 'length(position)',
          usage: 'Distance from origin to point'
        },
        {
          name: 'Iterative Algorithm',
          description: 'Step-by-step marching along ray',
          example: 't += distance; position = origin + direction * t',
          usage: 'Finding surface intersection'
        }
      ]
    }
  }
};

export const getShaderMathConcepts = (level, concept, postProcessType = null) => {
  if (shaderMathConcepts[level] && shaderMathConcepts[level][concept]) {
    // Special handling for postprocess: use postProcessType if provided
    if (concept === 'postprocess' && postProcessType) {
      const postprocessConcepts = shaderMathConcepts[level][concept];
      if (postprocessConcepts[postProcessType]) {
        return postprocessConcepts[postProcessType];
      }
      // Fall back to default if specific type not found
      if (postprocessConcepts.default) {
        return postprocessConcepts.default;
      }
    }
    return shaderMathConcepts[level][concept];
  }
  return null;
};

