export const getShaderFormulas = (level, concept, values = {}) => {
  const { 
    color = { r: 1.0, g: 0.5, b: 0.0 }, 
    uvScale = 1.0, 
    noiseScale = 1.0, 
    lightIntensity = 1.0, 
    time = 0, 
    textureScale = 1.0, 
    textureOffset = { x: 0.0, y: 0.0 }, 
    blurAmount = 5.0, 
    edgeThreshold = 0.5, 
    vignetteIntensity = 0.5, 
    chromaticAberration = 0.01,
    glitchIntensity = 0.1,
    bloomIntensity = 0.5,
    bloomThreshold = 0.7,
    colorGradingBrightness = 0.0,
    colorGradingContrast = 1.0,
    colorGradingSaturation = 1.0,
    colorGradingTemperature = 0.0,
    colorGradingTint = 0.0,
    aoIntensity = 0.5,
    aoRadius = 0.02,
    aoBias = 0.01,
    gradientType = 'linear',
    gradientStartColor = { r: 1.0, g: 0.0, b: 0.0 },
    gradientEndColor = { r: 0.0, g: 0.0, b: 1.0 },
    gradientAngle = 0.0,
    gradientCenter = { x: 0.5, y: 0.5 },
    gradientRadius = 0.5,
    shapeType = 'circle',
    shapeCenter = { x: 0.5, y: 0.5 },
    shapeSize = { x: 0.2, y: 0.2 },
    shapeColor = { r: 1.0, g: 0.0, b: 0.0 },
    shapeEdgeSoftness = 0.02,
    lineThickness = 0.02,
    lineAngle = 0.0,
    colorSpaceMode = 'hsv',
    hsvColor = { h: 0.0, s: 1.0, v: 1.0 },
    colorMixMode = 'additive',
    colorMixColor1 = { r: 1.0, g: 0.0, b: 0.0 },
    colorMixColor2 = { r: 0.0, g: 0.0, b: 1.0 },
    colorMixAmount = 0.5,
    mathOperation = 'add',
    mathValue1 = 0.5,
    mathValue2 = 0.5,
    mathValue3 = 0.5,
    transformType = 'rotation',
    transformAngle = 0.0,
    transformTranslation = { x: 0.0, y: 0.0 },
    transformScale = { x: 1.0, y: 1.0 },
    transformCenter = { x: 0.5, y: 0.5 },
    advancedNoiseType = 'fractal',
    fractalOctaves = 4,
    fractalLacunarity = 2.0,
    fractalGain = 0.5,
    worleyScale = 5.0,
    domainWarpStrength = 0.1,
    displacementType = 'height',
    displacementScale = 0.1,
    displacementHeight = 0.5,
    toonBands = 4.0,
    stylizedEdgeThreshold = 0.1,
    stylizedEdgeThickness = 0.02,
    colorQuantization = 8.0,
    rimPower = 2.0,
    specularPower = 32.0,
    rimColor = { r: 0.5, g: 0.7, b: 1.0 },
    specularColor = { r: 1.0, g: 1.0, b: 1.0 }
  } = values;

  if (level === 'basic') {
    switch (concept) {
      case 'color':
        return {
          title: 'Color Shader Formulas',
          formulas: [
            {
              name: 'RGBA Output',
              formula: 'gl_FragColor = vec4(r, g, b, a)',
              description: 'Sets the fragment color using red, green, blue, and alpha components (0.0 to 1.0)',
              example: `gl_FragColor = vec4(${color.r.toFixed(2)}, ${color.g.toFixed(2)}, ${color.b.toFixed(2)}, 1.0)`
            },
            {
              name: 'Color from Uniform',
              formula: 'gl_FragColor = vec4(u_color, alpha)',
              description: 'Uses uniform variable passed from CPU',
              example: `gl_FragColor = vec4(u_color, 1.0)  // u_color = vec3(${color.r.toFixed(2)}, ${color.g.toFixed(2)}, ${color.b.toFixed(2)})`
            }
          ],
          related: ['UV Coordinates', 'Time Animation']
        };

      case 'uv':
        return {
          title: 'UV Coordinate Formulas',
          formulas: [
            {
              name: 'UV Calculation',
              formula: 'uv = gl_FragCoord.xy / u_resolution.xy',
              description: 'Normalize pixel coordinates to [0, 1] range',
              example: 'uv = gl_FragCoord.xy / u_resolution.xy  // Maps screen to [0,1]×[0,1]'
            },
            {
              name: 'UV Scaling',
              formula: 'uv_scaled = uv * scale',
              description: 'Multiply UV to create repeating patterns',
              example: `uv *= ${uvScale.toFixed(2)}  // Creates ${uvScale.toFixed(2)} repetitions`
            },
            {
              name: 'UV Centering',
              formula: 'uv_centered = (uv - 0.5) * 2.0',
              description: 'Center UV coordinates around origin [-1, 1]',
              example: 'uv = (uv - 0.5) * 2.0  // Maps to [-1,1]×[-1,1]'
            }
          ],
          related: ['Color', 'Patterns', 'Noise']
        };

      case 'time':
        return {
          title: 'Time Animation Formulas',
          formulas: [
            {
              name: 'Sine Wave',
              formula: 'value = base + sin(time * frequency) * amplitude',
              description: 'Creates smooth oscillation using sine',
              example: `r = ${color.r.toFixed(2)} + sin(${time.toFixed(2)} * 1.0) * 0.3  // Range: [${(color.r - 0.3).toFixed(2)}, ${(color.r + 0.3).toFixed(2)}]`
            },
            {
              name: 'Cosine Wave',
              formula: 'value = base + cos(time * frequency) * amplitude',
              description: 'Creates smooth oscillation using cosine (90° phase shift)',
              example: `g = ${color.g.toFixed(2)} + cos(${time.toFixed(2)} * 1.0) * 0.3`
            },
            {
              name: 'Combined Waves',
              formula: 'value = sin(time) + cos(time * 2.0)',
              description: 'Combine multiple frequencies for complex patterns',
              example: `b = ${color.b.toFixed(2)} + sin(${time.toFixed(2)} * 1.5) * 0.3`
            }
          ],
          related: ['Color', 'UV Coordinates', 'Patterns']
        };

      case 'gradients':
        return {
          title: 'Gradient Formulas',
          formulas: [
            {
              name: 'Linear Gradient - Direction Vector',
              formula: 'dir = vec2(cos(angle), sin(angle))',
              description: 'Convert angle to direction vector',
              example: `dir = vec2(cos(${gradientAngle.toFixed(2)}), sin(${gradientAngle.toFixed(2)}))  // Angle: ${(gradientAngle * 180 / Math.PI).toFixed(1)}°`
            },
            {
              name: 'Linear Gradient - Interpolation Factor',
              formula: 't = dot(uv - 0.5, dir) + 0.5',
              description: 'Calculate position along gradient line using dot product',
              example: `t = dot(uv - 0.5, dir) + 0.5  // Range: [0, 1]`
            },
            {
              name: 'Radial Gradient - Distance',
              formula: 'dist = length(uv - center)',
              description: 'Calculate distance from center point',
              example: `dist = length(uv - vec2(${gradientCenter.x.toFixed(2)}, ${gradientCenter.y.toFixed(2)}))`
            },
            {
              name: 'Radial Gradient - Interpolation Factor',
              formula: 't = dist / radius',
              description: 'Normalize distance by radius to get interpolation factor',
              example: `t = dist / ${gradientRadius.toFixed(2)}  // Radius: ${gradientRadius.toFixed(2)}`
            },
            {
              name: 'Color Mixing',
              formula: 'color = mix(startColor, endColor, clamp(t, 0.0, 1.0))',
              description: 'Interpolate between start and end colors',
              example: `color = mix(vec3(${gradientStartColor.r.toFixed(2)}, ${gradientStartColor.g.toFixed(2)}, ${gradientStartColor.b.toFixed(2)}), vec3(${gradientEndColor.r.toFixed(2)}, ${gradientEndColor.g.toFixed(2)}, ${gradientEndColor.b.toFixed(2)}), t)`
            }
          ],
          related: ['UV Coordinates', 'Color', 'Distance Fields']
        };

      case 'shapes':
        return {
          title: 'Basic Shapes Formulas',
          formulas: [
            {
              name: 'Circle - Distance Calculation',
              formula: 'dist = length(uv - center)',
              description: 'Calculate Euclidean distance from point to circle center',
              example: `dist = length(uv - vec2(${shapeCenter.x.toFixed(2)}, ${shapeCenter.y.toFixed(2)}))  // Center: (${shapeCenter.x.toFixed(2)}, ${shapeCenter.y.toFixed(2)})`
            },
            {
              name: 'Circle - Shape Mask',
              formula: 'shape = smoothstep(radius + softness, radius - softness, dist)',
              description: 'Create smooth circle mask using smoothstep for anti-aliasing',
              example: `shape = smoothstep(${(shapeSize.x + shapeEdgeSoftness).toFixed(3)}, ${(shapeSize.x - shapeEdgeSoftness).toFixed(3)}, dist)  // Radius: ${shapeSize.x.toFixed(2)}, Softness: ${shapeEdgeSoftness.toFixed(3)}`
            },
            {
              name: 'Rectangle - Box Distance',
              formula: 'd = abs(uv - center) - halfSize',
              description: 'Calculate distance to rectangle edges',
              example: `d = abs(uv - vec2(${shapeCenter.x.toFixed(2)}, ${shapeCenter.y.toFixed(2)})) - vec2(${(shapeSize.x * 0.5).toFixed(2)}, ${(shapeSize.y * 0.5).toFixed(2)})`
            },
            {
              name: 'Rectangle - Signed Distance',
              formula: 'dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0)',
              description: 'Calculate signed distance field for rectangle (negative inside, positive outside)',
              example: `dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0)  // Size: (${shapeSize.x.toFixed(2)}, ${shapeSize.y.toFixed(2)})`
            },
            {
              name: 'Line - Direction Vector',
              formula: 'dir = vec2(cos(angle), sin(angle))',
              description: 'Convert angle to normalized direction vector',
              example: `dir = vec2(cos(${lineAngle.toFixed(2)}), sin(${lineAngle.toFixed(2)}))  // Angle: ${(lineAngle * 180 / Math.PI).toFixed(1)}°`
            },
            {
              name: 'Line - Closest Point',
              formula: 'closestPoint = center + dir * clamp(dot(uv - center, dir), -length, length)',
              description: 'Find closest point on line segment to pixel position',
              example: `closestPoint = vec2(${shapeCenter.x.toFixed(2)}, ${shapeCenter.y.toFixed(2)}) + dir * clamp(proj, -${shapeSize.x.toFixed(2)}, ${shapeSize.x.toFixed(2)})`
            },
            {
              name: 'Line - Distance to Line',
              formula: 'dist = length(uv - closestPoint)',
              description: 'Calculate perpendicular distance from pixel to line',
              example: `dist = length(uv - closestPoint)  // Thickness: ${lineThickness.toFixed(3)}`
            },
            {
              name: 'Edge Smoothing',
              formula: 'shape = smoothstep(edge0, edge1, dist)',
              description: 'Create smooth transition at shape edges for anti-aliasing',
              example: `shape = smoothstep(${shapeEdgeSoftness.toFixed(3)}, -${shapeEdgeSoftness.toFixed(3)}, dist)  // Softness: ${shapeEdgeSoftness.toFixed(3)}`
            },
            {
              name: 'Shape Color Application',
              formula: 'color = shapeColor * shape',
              description: 'Multiply shape color by mask to render shape',
              example: `color = vec3(${shapeColor.r.toFixed(2)}, ${shapeColor.g.toFixed(2)}, ${shapeColor.b.toFixed(2)}) * shape`
            }
          ],
          related: ['UV Coordinates', 'Distance Fields', 'Gradients']
        };

      case 'colorSpaces':
        return {
          title: 'Color Spaces & Transformations Formulas',
          formulas: [
            {
              name: 'HSV to RGB Conversion',
              formula: 'hsv2rgb(hsv) = geometric transformation using hexagonal color wheel',
              description: 'Convert HSV cylindrical coordinates to RGB cube coordinates',
              example: `hsv2rgb(vec3(${hsvColor.h.toFixed(2)}, ${hsvColor.s.toFixed(2)}, ${hsvColor.v.toFixed(2)}))`
            },
            {
              name: 'HSV Hue Mapping',
              formula: 'K = vec4(1.0, 2/3, 1/3, 3.0), p = abs(fract(h.xxx + K.xyz) * 6.0 - K.www)',
              description: 'Map hue to RGB components using hexagonal color wheel',
              example: `Hue: ${(hsvColor.h * 360).toFixed(1)}° maps to RGB components`
            },
            {
              name: 'Additive Blending',
              formula: 'result = min(c1 + c2, 1.0)',
              description: 'Add colors together, clamping to prevent overflow (like light sources)',
              example: `additiveBlend(vec3(${colorMixColor1.r.toFixed(2)}, ${colorMixColor1.g.toFixed(2)}, ${colorMixColor1.b.toFixed(2)}), vec3(${colorMixColor2.r.toFixed(2)}, ${colorMixColor2.g.toFixed(2)}, ${colorMixColor2.b.toFixed(2)}))`
            },
            {
              name: 'Multiply Blending',
              formula: 'result = c1 * c2',
              description: 'Multiply color components (darkens image)',
              example: `multiplyBlend(color1, color2)  // Darkens: ${colorMixMode === 'multiply' ? 'Yes' : 'No'}`
            },
            {
              name: 'Screen Blending',
              formula: 'result = 1.0 - (1.0 - c1) * (1.0 - c2)',
              description: 'Inverse multiply (lightens image)',
              example: `screenBlend(color1, color2)  // Lightens: ${colorMixMode === 'screen' ? 'Yes' : 'No'}`
            },
            {
              name: 'Overlay Blending',
              formula: 'result = c1 < 0.5 ? 2 * c1 * c2 : 1 - 2 * (1 - c1) * (1 - c2)',
              description: 'Combines multiply (dark areas) and screen (bright areas)',
              example: `overlayBlend(color1, color2)  // Contrast enhancement: ${colorMixMode === 'overlay' ? 'Yes' : 'No'}`
            },
            {
              name: 'Subtract Blending',
              formula: 'result = max(c1 - c2, 0.0)',
              description: 'Subtract second color from first (creates darker result)',
              example: `subtractBlend(color1, color2)  // Darkens: ${colorMixMode === 'subtract' ? 'Yes' : 'No'}`
            },
            {
              name: 'Color Mix Interpolation',
              formula: 'color = mix(c1, blended, amount)',
              description: 'Interpolate between original and blended color',
              example: `mix(color1, mixed, ${colorMixAmount.toFixed(2)})  // Blend: ${(colorMixAmount * 100).toFixed(0)}%`
            }
          ],
          related: ['Color', 'Gradients', 'Post-Processing']
        };

      case 'mathOperations':
        return {
          title: 'Basic Math Operations Formulas',
          formulas: [
            {
              name: 'Addition',
              formula: 'result = a + b',
              description: 'Adds two values together',
              example: `result = ${mathValue1.toFixed(2)} + ${mathValue2.toFixed(2)} = ${(mathValue1 + mathValue2).toFixed(2)}`
            },
            {
              name: 'Subtraction',
              formula: 'result = a - b',
              description: 'Subtracts second value from first',
              example: `result = ${mathValue1.toFixed(2)} - ${mathValue2.toFixed(2)} = ${(mathValue1 - mathValue2).toFixed(2)}`
            },
            {
              name: 'Multiplication',
              formula: 'result = a * b',
              description: 'Multiplies two values',
              example: `result = ${mathValue1.toFixed(2)} × ${mathValue2.toFixed(2)} = ${(mathValue1 * mathValue2).toFixed(2)}`
            },
            {
              name: 'Division',
              formula: 'result = a / b',
              description: 'Divides first value by second (with zero check)',
              example: `result = ${mathValue1.toFixed(2)} ÷ ${mathValue2.toFixed(2)} = ${mathValue2 !== 0 ? (mathValue1 / mathValue2).toFixed(2) : 'undefined'}`
            },
            {
              name: 'Power',
              formula: 'result = pow(a, b)',
              description: 'Raises first value to the power of second',
              example: `result = ${mathValue1.toFixed(2)}^${mathValue2.toFixed(2)} = ${Math.pow(mathValue1, mathValue2).toFixed(2)}`
            },
            {
              name: 'Modulo',
              formula: 'result = mod(a, b)',
              description: 'Returns remainder after division',
              example: `result = ${mathValue1.toFixed(2)} mod ${mathValue2.toFixed(2)} = ${(mathValue1 % mathValue2).toFixed(2)}`
            },
            {
              name: 'Absolute Value',
              formula: 'result = abs(a)',
              description: 'Returns distance from zero (always positive)',
              example: `result = |${mathValue1.toFixed(2)}| = ${Math.abs(mathValue1).toFixed(2)}`
            },
            {
              name: 'Floor',
              formula: 'result = floor(a)',
              description: 'Rounds down to nearest integer',
              example: `result = floor(${mathValue1.toFixed(2)}) = ${Math.floor(mathValue1)}`
            },
            {
              name: 'Ceiling',
              formula: 'result = ceil(a)',
              description: 'Rounds up to nearest integer',
              example: `result = ceil(${mathValue1.toFixed(2)}) = ${Math.ceil(mathValue1)}`
            },
            {
              name: 'Minimum',
              formula: 'result = min(a, b)',
              description: 'Returns the smaller of two values',
              example: `result = min(${mathValue1.toFixed(2)}, ${mathValue2.toFixed(2)}) = ${Math.min(mathValue1, mathValue2).toFixed(2)}`
            },
            {
              name: 'Maximum',
              formula: 'result = max(a, b)',
              description: 'Returns the larger of two values',
              example: `result = max(${mathValue1.toFixed(2)}, ${mathValue2.toFixed(2)}) = ${Math.max(mathValue1, mathValue2).toFixed(2)}`
            },
            {
              name: 'Clamp',
              formula: 'result = clamp(value, min, max)',
              description: 'Constrains value between min and max',
              example: `result = clamp(${mathValue1.toFixed(2)}, ${mathValue2.toFixed(2)}, ${mathValue3.toFixed(2)}) = ${Math.max(mathValue2, Math.min(mathValue3, mathValue1)).toFixed(2)}`
            },
            {
              name: 'Mix (Linear Interpolation)',
              formula: 'result = mix(a, b, t) = a * (1 - t) + b * t',
              description: 'Interpolates between two values based on factor t',
              example: `result = mix(${mathValue1.toFixed(2)}, ${mathValue2.toFixed(2)}, ${mathValue3.toFixed(2)}) = ${(mathValue1 * (1 - mathValue3) + mathValue2 * mathValue3).toFixed(2)}`
            }
          ],
          related: ['UV Coordinates', 'Gradients', 'Color Spaces']
        };

      case 'coordinateTransformations':
        return {
          title: 'Coordinate Transformations Formulas',
          formulas: [
            {
              name: 'Rotation - Rotation Matrix',
              formula: 'R(θ) = [cos(θ) -sin(θ); sin(θ) cos(θ)]',
              description: '2D rotation matrix using cosine and sine of angle',
              example: `R(${(transformAngle * 180 / Math.PI).toFixed(1)}°) = [cos(${transformAngle.toFixed(3)}), -sin(${transformAngle.toFixed(3)}); sin(${transformAngle.toFixed(3)}), cos(${transformAngle.toFixed(3)})]`
            },
            {
              name: 'Rotation - Apply Transformation',
              formula: 'centered = uv - center\nrotated = vec2(centered.x * cos(θ) - centered.y * sin(θ), centered.x * sin(θ) + centered.y * cos(θ))\ntransformedUV = rotated + center',
              description: 'Rotate UV coordinates around center point',
              example: `Center: (${transformCenter.x.toFixed(2)}, ${transformCenter.y.toFixed(2)}), Angle: ${(transformAngle * 180 / Math.PI).toFixed(1)}°`
            },
            {
              name: 'Translation',
              formula: 'transformedUV = uv + offset',
              description: 'Move UV coordinates by adding offset vector',
              example: `transformedUV = uv + vec2(${transformTranslation.x.toFixed(2)}, ${transformTranslation.y.toFixed(2)})`
            },
            {
              name: 'Scaling - Apply Transformation',
              formula: 'centered = uv - center\nscaled = centered * scale\ntransformedUV = scaled + center',
              description: 'Scale UV coordinates around center point',
              example: `Center: (${transformCenter.x.toFixed(2)}, ${transformCenter.y.toFixed(2)}), Scale: (${transformScale.x.toFixed(2)}, ${transformScale.y.toFixed(2)})`
            },
            {
              name: 'Polar Coordinates - Angle',
              formula: 'angle = atan2(y, x)',
              description: 'Calculate angle from center using atan2 (range: [-π, π])',
              example: `angle = atan2(uv.y - ${transformCenter.y.toFixed(2)}, uv.x - ${transformCenter.x.toFixed(2)})`
            },
            {
              name: 'Polar Coordinates - Radius',
              formula: 'radius = length(uv - center)',
              description: 'Calculate distance from center point',
              example: `radius = length(uv - vec2(${transformCenter.x.toFixed(2)}, ${transformCenter.y.toFixed(2)}))`
            },
            {
              name: 'Polar Coordinates - Conversion',
              formula: 'polarUV = vec2(angle / 2π + 0.5, radius * scale)',
              description: 'Convert polar coordinates to UV space for visualization',
              example: 'polarUV = vec2(angle / 6.28318 + 0.5, radius * 2.0)'
            }
          ],
          related: ['UV Coordinates', 'Basic Shapes', 'Gradients']
        };

      default:
        return null;
    }
  } else if (level === 'intermediate') {
    switch (concept) {
      case 'noise':
        return {
          title: 'Procedural Noise Formulas',
          formulas: [
            {
              name: 'Random Function',
              formula: 'random(st) = fract(sin(dot(st, seed)) * largeNumber)',
              description: 'Hash function to generate pseudo-random values',
              example: 'random(st) = fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123)'
            },
            {
              name: 'Value Noise',
              formula: 'noise = mix(corners, smooth interpolation)',
              description: 'Interpolate random values at grid points',
              example: `noise = mix(a, b, smoothstep(0.0, 1.0, f.x))  // Scale: ${noiseScale.toFixed(2)}`
            },
            {
              name: 'Bilinear Interpolation',
              formula: 'noise = mix(mix(a, b, u.x), mix(c, d, u.x), u.y)',
              description: 'Smooth 2D interpolation between four corner values',
              example: 'noise = mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y'
            }
          ],
          related: ['UV Coordinates', 'Patterns', 'Distance Fields']
        };

      case 'patterns':
        return {
          title: 'Pattern Generation Formulas',
          formulas: [
            {
              name: 'Grid Creation',
              formula: 'grid = floor(uv * scale)',
              description: 'Create discrete grid cells',
              example: 'grid = floor(uv * 10.0)  // 10×10 grid'
            },
            {
              name: 'Checkerboard',
              formula: 'pattern = mod(grid.x + grid.y, 2.0)',
              description: 'Alternate pattern based on grid position',
              example: `pattern = mod(grid.x + grid.y, 2.0)  // 0 or 1`
            },
            {
              name: 'Animated Pattern',
              formula: 'pattern = mod(grid.x + grid.y + time, 2.0)',
              description: 'Animate pattern using time',
              example: `pattern = mod(grid.x + grid.y + ${time.toFixed(2)} * 0.5, 2.0)`
            }
          ],
          related: ['UV Coordinates', 'Time Animation', 'Distance Fields']
        };

        case 'distance':
          return {
            title: 'Distance Field Formulas',
            formulas: [
              {
                name: 'Euclidean Distance',
                formula: 'dist = length(position - center)',
                description: 'Calculate distance from point to center',
                example: 'dist = length(uv - vec2(0.5, 0.5))'
              },
              {
                name: 'Smoothstep',
                formula: 'smooth = smoothstep(edge0, edge1, x)',
                description: 'Smooth interpolation with anti-aliasing',
                example: 'circle = smoothstep(0.3, 0.4, dist) - smoothstep(0.4, 0.5, dist)'
              },
              {
                name: 'Animated Circle',
                formula: 'radius = base + sin(time) * amplitude',
                description: 'Animate radius using time',
                example: `innerRadius = 0.2 + sin(${time.toFixed(2)}) * 0.1  // Current: ${(0.2 + Math.sin(time) * 0.1).toFixed(3)}`
              }
            ],
            related: ['UV Coordinates', 'Time Animation', 'Raymarching']
          };

        case 'advancedNoise':
          return {
            title: 'Advanced Noise Functions Formulas',
            formulas: [
              {
                name: 'Fractal Noise Summation',
                formula: 'fractal = Σ(noise(st * frequency^i) * amplitude^i) for i in [0, octaves)',
                description: 'Sum multiple octaves of noise with increasing frequency and decreasing amplitude',
                example: `fractal = Σ(noise(st * ${fractalLacunarity.toFixed(1)}^i) * ${fractalGain.toFixed(2)}^i) for ${fractalOctaves} octaves`
              },
              {
                name: 'Perlin Noise Interpolation',
                formula: 'perlin = interpolate(gradients[gridCorners], fractionalPart)',
                description: 'Interpolate gradient values at grid corners',
                example: 'perlin = smoothstep interpolation of corner gradients'
              },
              {
                name: 'Simplex Noise Skewing',
                formula: 'skew = (x + y) * F; unskew = (x + y) * G',
                description: 'Transform square grid to triangular (simplex) grid',
                example: 'F = (sqrt(3.0) - 1.0) / 2.0; G = (3.0 - sqrt(3.0)) / 6.0'
              },
              {
                name: 'Worley Noise Distance',
                formula: 'worley = min(distance(st, featurePoints[i]))',
                description: 'Distance to nearest feature point in grid',
                example: `worley = min(distance(st, featurePoints[i])) * ${worleyScale.toFixed(1)}`
              },
              {
                name: 'Domain Warping Offset',
                formula: 'warped = st + noise(st) * strength',
                description: 'Distort coordinates using noise before sampling',
                example: `warped = st + noise(st) * ${domainWarpStrength.toFixed(2)}`
              },
              {
                name: 'Octave Frequency',
                formula: 'frequency = baseFrequency * lacunarity^octave',
                description: 'Frequency increases exponentially with octave',
                example: `frequency = 1.0 * ${fractalLacunarity.toFixed(1)}^octave`
              },
              {
                name: 'Octave Amplitude',
                formula: 'amplitude = baseAmplitude * gain^octave',
                description: 'Amplitude decreases exponentially with octave',
                example: `amplitude = 1.0 * ${fractalGain.toFixed(2)}^octave`
              }
            ],
            related: ['Procedural Noise', 'Patterns', 'Distance Fields']
          };

        case 'displacementMapping':
          return {
            title: 'Displacement Mapping Formulas',
            formulas: [
              {
                name: 'Height Map Sampling',
                formula: 'height = texture2D(u_texture, uv).r or height = noise(uv)',
                description: 'Sample height value from texture or procedural noise',
                example: `height = texture2D(u_texture, uv).r * ${displacementHeight.toFixed(2)}`
              },
              {
                name: 'Normal Calculation from Height Map',
                formula: 'normal = normalize(vec3(-gradient.x, -gradient.y, 1.0))',
                description: 'Calculate surface normal from height gradient',
                example: 'gradient = vec2(height(x+ε) - height(x-ε), height(y+ε) - height(y-ε))'
              },
              {
                name: 'Parallax Offset',
                formula: 'offset = viewDir.xy / viewDir.z * height * scale',
                description: 'Shift UV coordinates based on view direction and height',
                example: `offset = viewDir.xy / viewDir.z * height * ${displacementScale.toFixed(2)}`
              },
              {
                name: 'Steep Parallax Ray Marching',
                formula: 'for (int i = 0; i < steps; i++) { height = sample(uv); if (height > current) break; uv += step; }',
                description: 'Step along ray to find accurate surface intersection',
                example: 'uv += viewDir.xy * stepSize; currentHeight += stepSize'
              },
              {
                name: 'Height-based Displacement',
                formula: 'displacedUV = uv + offset * scale',
                description: 'Simple UV displacement based on height',
                example: `displacedUV = uv + offset * ${displacementScale.toFixed(2)}`
              },
              {
                name: 'Gradient Calculation',
                formula: 'gradient = vec2(height(x+ε) - height(x-ε), height(y+ε) - height(y-ε))',
                description: 'Calculate partial derivatives for normal calculation',
                example: 'gradient = vec2((height(x+0.01) - height(x-0.01)) / 0.02, (height(y+0.01) - height(y-0.01)) / 0.02)'
              }
            ],
            related: ['Textures & Texture Mapping', 'Advanced Noise Functions', 'Lighting']
          };

        case 'stylized':
          return {
            title: 'Stylized/Cartoon Shader Formulas',
            formulas: [
              {
                name: 'Grayscale Conversion',
                formula: 'gray = dot(color, vec3(0.299, 0.587, 0.114))',
                description: 'Convert RGB to grayscale using luminance weights',
                example: `gray = dot(color, vec3(0.299, 0.587, 0.114))  // Luminance calculation`
              },
              {
                name: 'Edge Detection - Gradient Magnitude',
                formula: 'gx = abs(right - left)\ngy = abs(bottom - top)\nedge = sqrt(gx² + gy²)',
                description: 'Calculate edge strength using Sobel-like operator',
                example: `edge = sqrt(gx * gx + gy * gy)  // Threshold: ${stylizedEdgeThreshold.toFixed(3)}`
              },
              {
                name: 'Edge Thresholding',
                formula: 'edge = smoothstep(threshold, threshold + thickness, edge)',
                description: 'Smooth thresholding for edge detection',
                example: `edge = smoothstep(${stylizedEdgeThreshold.toFixed(3)}, ${(stylizedEdgeThreshold + stylizedEdgeThickness).toFixed(3)}, edge)`
              },
              {
                name: 'Color Quantization',
                formula: 'quantized = floor(color * levels) / levels',
                description: 'Reduce color depth to discrete levels',
                example: `quantized = floor(color * ${colorQuantization.toFixed(1)}) / ${colorQuantization.toFixed(1)}`
              },
              {
                name: 'Toon Shading',
                formula: 'toonIntensity = floor(intensity * bands) / bands',
                description: 'Quantize lighting into discrete bands',
                example: `toonIntensity = floor(intensity * ${toonBands.toFixed(1)}) / ${toonBands.toFixed(1)}`
              },
              {
                name: 'Rim Lighting',
                formula: 'rim = pow(1.0 - smoothstep(inner, outer, dist), power)',
                description: 'Calculate rim lighting based on distance from center',
                example: `rim = pow(1.0 - smoothstep(0.3, 0.7, dist), ${rimPower.toFixed(1)})`
              },
              {
                name: 'Specular Highlight',
                formula: 'spec = pow(max(0.0, dot(halfDir, normal)), power)',
                description: 'Calculate specular highlight intensity',
                example: `spec = pow(max(0.0, dot(halfDir, normal)), ${specularPower.toFixed(1)})`
              },
              {
                name: 'Color Blending',
                formula: 'result = mix(baseColor, effectColor, factor)',
                description: 'Blend rim lighting and specular with base color',
                example: `result = mix(color, rimColor, rim * 0.3)  // Rim color: vec3(${rimColor.r.toFixed(2)}, ${rimColor.g.toFixed(2)}, ${rimColor.b.toFixed(2)})`
              },
              {
                name: 'Edge Outline Application',
                formula: 'finalColor = mix(color, vec3(0.0), edge * 0.8)',
                description: 'Apply edge outline by darkening edges',
                example: 'finalColor = mix(color, vec3(0.0), edge * 0.8)  // Darken edges'
              }
            ],
            related: ['Post-Processing Effects', 'Color Spaces', 'Lighting']
          };

        case 'texture':
          return {
            title: 'Texture Mapping Formulas',
            formulas: [
              {
                name: 'UV Calculation',
                formula: 'uv = gl_FragCoord.xy / u_resolution.xy',
                description: 'Normalize screen coordinates to [0, 1] range',
                example: 'uv = gl_FragCoord.xy / u_resolution.xy  // Maps screen to [0,1]×[0,1]'
              },
              {
                name: 'Texture Scaling',
                formula: 'uv_scaled = uv * u_textureScale',
                description: 'Scale UV to tile/repeat texture',
                example: `uv *= ${textureScale.toFixed(2)}  // Creates ${textureScale.toFixed(2)} repetitions`
              },
              {
                name: 'Texture Offset',
                formula: 'uv_offset = uv + u_textureOffset',
                description: 'Shift texture position',
                example: `uv += vec2(${textureOffset.x.toFixed(2)}, ${textureOffset.y.toFixed(2)})  // Shifts texture`
              },
              {
                name: 'Texture Sampling',
                formula: 'color = texture2D(sampler, uv)',
                description: 'Sample color from texture at UV coordinates',
                example: 'color = texture2D(u_texture, uv_offset)'
              },
              {
                name: 'Procedural Texture',
                formula: 'pattern = mod(floor(uv * scale), 2.0)',
                description: 'Generate texture pattern programmatically',
                example: `checkerboard = mod(floor(uv * ${textureScale.toFixed(2)}), 2.0)`
              }
            ],
            related: ['UV Coordinates', 'Patterns', 'Noise']
          };

        case 'postprocess':
          return {
            title: 'Post-Processing Formulas',
            formulas: [
              {
                name: 'Gaussian Blur',
                formula: 'blur = Σ(Gaussian(x,y) * sample(x,y)) / Σ(Gaussian(x,y))',
                description: 'Weighted average using Gaussian distribution',
                example: `weight = exp(-(x² + y²) / (2 * ${blurAmount.toFixed(1)}²))  // Radius: ${blurAmount.toFixed(1)}`
              },
              {
                name: 'Sobel Edge Detection',
                formula: 'edge = length(vec2(gx, gy))\ngx = -tl - 2*tm - tr + bl + 2*bm + br',
                description: 'Calculate gradient magnitude using Sobel operator',
                example: `edge = length(vec2(gx, gy)) > ${edgeThreshold.toFixed(2)}  // Threshold: ${edgeThreshold.toFixed(2)}`
              },
              {
                name: 'Vignette',
                formula: 'vignette = 1.0 - smoothstep(inner, outer, dist) * intensity',
                description: 'Radial darkening based on distance from center',
                example: `vignette = 1.0 - smoothstep(0.3, 0.8, dist) * ${vignetteIntensity.toFixed(2)}  // Intensity: ${vignetteIntensity.toFixed(2)}`
              },
              {
                name: 'Chromatic Aberration',
                formula: 'rgb = sample(uv + offset) for each channel',
                description: 'Shift RGB channels to create color separation',
                example: `offset = (uv - center) * ${chromaticAberration.toFixed(3)} * 100.0  // Amount: ${chromaticAberration.toFixed(3)}`
              },
              {
                name: 'Glitch - Vertical Wobble',
                formula: 'wobbledUV = uv + vec2(sin(uv.y * freq + time), 0.0) * intensity',
                description: 'Creates vertical distortion using sine wave',
                example: `wobble = sin(uv.y * 15.0 + ${time.toFixed(2)} * 2.0) * ${glitchIntensity.toFixed(2)}  // Intensity: ${glitchIntensity.toFixed(2)}`
              },
              {
                name: 'Glitch - Static Noise',
                formula: 'noise = fract(sin(dot(uv + time, seed)) * largeNumber)',
                description: 'Pseudo-random noise for TV static effect',
                example: `static = step(0.95, fract(sin(dot(uv + ${time.toFixed(2)} * 0.1, vec2(12.9898, 78.233))) * 43758.5453)) * ${glitchIntensity.toFixed(2)}`
              },
              {
                name: 'Bloom - Brightness Extraction',
                formula: 'bright = step(threshold, brightness) * color',
                description: 'Extract pixels above brightness threshold',
                example: `bright = step(${bloomThreshold.toFixed(2)}, dot(color, vec3(0.299, 0.587, 0.114))) * color  // Threshold: ${bloomThreshold.toFixed(2)}`
              },
              {
                name: 'Bloom - Additive Blending',
                formula: 'result = original + blur(bright) * intensity',
                description: 'Add blurred bright areas to create glow',
                example: `bloom = blur(brightPixels) * ${bloomIntensity.toFixed(2)}  // Intensity: ${bloomIntensity.toFixed(2)}\nresult = color + bloom`
              },
              {
                name: 'Color Grading - Brightness',
                formula: 'color = color + brightness',
                description: 'Linear brightness adjustment',
                example: `color += ${colorGradingBrightness.toFixed(2)}  // Brightness: ${colorGradingBrightness.toFixed(2)}`
              },
              {
                name: 'Color Grading - Contrast',
                formula: 'color = (color - 0.5) * contrast + 0.5',
                description: 'Scale around midpoint (0.5)',
                example: `color = (color - 0.5) * ${colorGradingContrast.toFixed(2)} + 0.5  // Contrast: ${colorGradingContrast.toFixed(2)}`
              },
              {
                name: 'Color Grading - Saturation',
                formula: 'gray = dot(color, vec3(0.299, 0.587, 0.114))\ncolor = mix(gray, color, saturation)',
                description: 'Mix with grayscale to control color intensity',
                example: `gray = dot(color, vec3(0.299, 0.587, 0.114))\ncolor = mix(vec3(gray), color, ${colorGradingSaturation.toFixed(2)})  // Saturation: ${colorGradingSaturation.toFixed(2)}`
              },
              {
                name: 'Color Grading - Temperature',
                formula: 'warm = vec3(1.0, 0.9, 0.7), cool = vec3(0.7, 0.9, 1.0)\ncolor = mix(color, color * (temp > 0 ? warm : cool), abs(temp))',
                description: 'Warm/cool color shift',
                example: `tempFactor = ${colorGradingTemperature.toFixed(2)}\ncolor = mix(color, color * (tempFactor > 0.0 ? vec3(1.0, 0.9, 0.7) : vec3(0.7, 0.9, 1.0)), abs(tempFactor))`
              },
              {
                name: 'Ambient Occlusion - Depth Sampling',
                formula: 'depth = dot(color, vec3(0.299, 0.587, 0.114))',
                description: 'Convert color to depth/brightness value',
                example: `centerDepth = dot(color, vec3(0.299, 0.587, 0.114))  // Grayscale as depth proxy`
              },
              {
                name: 'Ambient Occlusion - Occlusion Calculation',
                formula: 'occlusion += smoothstep(bias, bias + range, depthDiff)',
                description: 'Accumulate occlusion from surrounding samples',
                example: `depthDiff = centerDepth - sampleDepth\nif (depthDiff > ${aoBias.toFixed(3)}) occlusion += smoothstep(${aoBias.toFixed(3)}, ${aoBias.toFixed(3)} + 0.1, depthDiff)  // Bias: ${aoBias.toFixed(3)}`
              },
              {
                name: 'Ambient Occlusion - Darkening',
                formula: 'ao = 1.0 - occlusion * intensity\ncolor = color * ao',
                description: 'Apply occlusion as darkening factor',
                example: `ao = 1.0 - occlusion * ${aoIntensity.toFixed(2)}  // Intensity: ${aoIntensity.toFixed(2)}\ncolor *= ao`
              }
            ],
            related: ['UV Coordinates', 'Distance Fields', 'Texture Sampling', 'Noise', 'Lighting']
          };

        default:
          return null;
    }
  } else { // advanced
    switch (concept) {
      case 'lighting':
        return {
          title: 'Lighting Model Formulas',
          formulas: [
            {
              name: 'Normal Vector',
              formula: 'normal = normalize(surfaceNormal)',
              description: 'Normalize surface normal to unit length',
              example: 'normal = normalize(vec3(uv, 1.0))'
            },
            {
              name: 'Diffuse Reflection (Lambert)',
              formula: 'diffuse = max(dot(normal, lightDir), 0.0)',
              description: 'Lambertian reflection - brighter when facing light',
              example: `diffuse = max(dot(normal, normalize(lightPos)), 0.0)  // Intensity: ${lightIntensity.toFixed(2)}`
            },
            {
              name: 'Phong Lighting',
              formula: 'color = ambient + diffuse * lightIntensity + specular',
              description: 'Combine ambient, diffuse, and specular components',
              example: `color = vec3(0.2) + diffuse * ${lightIntensity.toFixed(2)} + specular`
            },
            {
              name: 'Specular Highlight',
              formula: 'specular = pow(max(dot(reflectDir, viewDir), 0.0), shininess)',
              description: 'Calculate specular reflection for shiny surfaces',
              example: 'specular = pow(max(dot(reflect(-lightDir, normal), viewDir), 0.0), 32.0)'
            }
          ],
          related: ['UV Coordinates', 'Distance Fields', 'Raymarching']
        };

      case 'raymarching':
        return {
          title: 'Raymarching Formulas',
          formulas: [
            {
              name: 'Ray Equation',
              formula: 'ray(t) = origin + direction * t',
              description: 'Parametric ray representation',
              example: 'ray = vec3(0.0, 0.0, -3.0) + normalize(vec3(uv, 1.0)) * t'
            },
            {
              name: 'Sphere SDF',
              formula: 'sdSphere(p, r) = length(p) - r',
              description: 'Signed distance function for sphere',
              example: 'distance = length(position) - 1.0'
            },
            {
              name: 'Raymarching Step',
              formula: 't += sdf(position)\nposition = origin + direction * t',
              description: 'Step forward by distance to surface',
              example: 't += sdSphere(ro + rd * t, 1.0)'
            },
            {
              name: 'Surface Detection',
              formula: 'if (distance < epsilon) hit = true',
              description: 'Check if close enough to surface',
              example: 'if (distance < 0.01) break;  // Hit surface'
            }
          ],
          related: ['Distance Fields', 'Lighting', 'UV Coordinates']
        };

      default:
        return null;
    }
  }
};

