export const shaderTheoryContent = {
  basic: {
    color: {
      title: 'Basic Color Shader',
      introduction: 'The simplest fragment shader outputs a solid color. This demonstrates the fundamental structure of GLSL shaders.',
      concepts: [
        {
          title: 'Fragment Shader Basics',
          content: 'A fragment shader runs once per pixel (fragment) and determines the final color. The `gl_FragColor` variable is the output that sets the pixel color.'
        },
        {
          title: 'RGBA Color Model',
          content: 'Colors in shaders use RGBA (Red, Green, Blue, Alpha) values ranging from 0.0 to 1.0. Alpha controls transparency, where 1.0 is fully opaque.'
        },
        {
          title: 'Uniform Variables',
          content: 'Uniforms are values passed from the CPU (JavaScript) to the GPU (shader). They remain constant across all fragments in a single draw call, allowing you to control shader behavior without recompiling.'
        }
      ],
      math: {
        formula: 'gl_FragColor = vec4(r, g, b, a)',
        explanation: 'Sets the output color using a 4-component vector. Each component ranges from 0.0 to 1.0.'
      }
    },
    uv: {
      title: 'UV Coordinates',
      introduction: 'UV coordinates map screen space to normalized coordinates, enabling texture mapping, gradients, and pattern generation.',
      concepts: [
        {
          title: 'Screen Space to UV Space',
          content: 'UV coordinates normalize screen positions to [0, 1] range. gl_FragCoord.xy gives pixel coordinates, which we divide by resolution to get UV.'
        },
        {
          title: 'UV Scaling',
          content: 'Multiplying UV by a scale factor creates repeating patterns. Higher scales create more repetitions, useful for tiling textures or creating grids.'
        },
        {
          title: 'Coordinate Systems',
          content: 'UV coordinates typically start at (0,0) in the bottom-left corner and go to (1,1) in the top-right, though this can vary by graphics API.'
        }
      ],
      math: {
        formula: 'uv = gl_FragCoord.xy / u_resolution.xy\nuv_scaled = uv * scale',
        explanation: 'Normalize pixel coordinates by dividing by resolution, then scale to create repeating patterns.'
      }
    },
    time: {
      title: 'Time-Based Animation',
      introduction: 'Using time as a uniform enables smooth, continuous animations. Time increases monotonically, creating predictable oscillatory effects.',
      concepts: [
        {
          title: 'Trigonometric Functions',
          content: 'sin() and cos() create smooth, periodic oscillations. They output values between -1 and 1, perfect for creating pulsing or rotating effects.'
        },
        {
          title: 'Animation Principles',
          content: 'By combining time with trigonometric functions, you can create various effects: pulsing (sin), rotation (sin/cos pairs), and complex waveforms.'
        },
        {
          title: 'Frequency and Amplitude',
          content: 'Multiplying time changes frequency (speed), while multiplying the result changes amplitude (range). Example: sin(time * 2.0) oscillates twice as fast.'
        }
      ],
      math: {
        formula: 'color = baseColor + sin(time * frequency) * amplitude\ncolor = baseColor + cos(time * frequency) * amplitude',
        explanation: 'Use trigonometric functions to oscillate color values around a base color, creating animated effects.'
      }
    },
    gradients: {
      title: 'Gradients (Linear & Radial)',
      introduction: 'Gradients create smooth color transitions between two or more colors. Linear gradients transition along a direction, while radial gradients transition outward from a center point.',
      concepts: [
        {
          title: 'Linear Gradients',
          content: 'Linear gradients transition colors along a straight line. The direction is defined by an angle, and colors interpolate smoothly using the mix() function based on position along that line.'
        },
        {
          title: 'Radial Gradients',
          content: 'Radial gradients transition colors outward from a center point in circular or elliptical patterns. The distance from the center determines the interpolation factor.'
        },
        {
          title: 'Color Interpolation',
          content: 'The mix() function linearly interpolates between two colors: mix(color1, color2, t) where t ranges from 0.0 (color1) to 1.0 (color2). This creates smooth transitions.'
        },
        {
          title: 'Dot Product for Linear Gradients',
          content: 'For linear gradients, the dot product between the position vector and direction vector determines how far along the gradient line a pixel is, creating the interpolation factor.'
        },
        {
          title: 'Distance for Radial Gradients',
          content: 'For radial gradients, the Euclidean distance from the center point determines the interpolation factor. Pixels closer to center use start color, farther pixels use end color.'
        }
      ],
      math: {
        formula: 'Linear: t = dot(uv - center, direction) + 0.5\nRadial: t = length(uv - center) / radius\ncolor = mix(startColor, endColor, clamp(t, 0.0, 1.0))',
        explanation: 'Calculate interpolation factor t based on position (dot product for linear, distance for radial), then mix colors smoothly.'
      }
    },
    shapes: {
      title: 'Basic Shapes',
      introduction: 'Shapes are fundamental building blocks in shader programming. They are created using distance fields and step functions, enabling precise geometric rendering with smooth or hard edges.',
      concepts: [
        {
          title: 'Distance Fields',
          content: 'Distance fields calculate the distance from a point to the nearest surface of a shape. For circles, this is simply the Euclidean distance from the center. Distance fields enable smooth shapes and anti-aliasing.'
        },
        {
          title: 'Circle Rendering',
          content: 'Circles use the Euclidean distance formula: dist = length(uv - center). When dist < radius, the point is inside the circle. smoothstep() creates smooth edges by interpolating between inside and outside.'
        },
        {
          title: 'Rectangle Rendering',
          content: 'Rectangles use box distance functions. We calculate the distance from a point to the nearest edge of the rectangle by subtracting half-size from absolute position differences. This creates sharp corners with optional smoothing.'
        },
        {
          title: 'Line Rendering',
          content: 'Lines are rendered by finding the closest point on the line segment to each pixel, then calculating the distance to that point. The line direction is defined by an angle, and the thickness determines how wide the line appears.'
        },
        {
          title: 'Edge Smoothing',
          content: 'smoothstep(edge0, edge1, x) creates smooth transitions. For shapes, we use it to create anti-aliased edges. The softness parameter controls the transition width - smaller values create sharper edges, larger values create softer, more blurred edges.'
        },
        {
          title: 'Shape Masking',
          content: 'Shapes create a mask (0.0 = outside, 1.0 = inside) that is multiplied by the shape color. This allows shapes to be rendered on any background and enables shape composition.'
        }
      ],
      math: {
        formula: 'Circle: dist = length(uv - center), shape = smoothstep(radius + softness, radius - softness, dist)\nRectangle: d = abs(uv - center) - halfSize, dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0)\nLine: closestPoint = center + dir * clamp(dot(uv - center, dir), -length, length), dist = length(uv - closestPoint)',
        explanation: 'Each shape type uses a different distance calculation. Circles use Euclidean distance, rectangles use box distance, and lines use distance to line segments. smoothstep creates smooth edges.'
      }
    },
    colorSpaces: {
      title: 'Color Spaces & Transformations',
      introduction: 'Color spaces provide different ways to represent and manipulate colors. HSV separates color information from brightness, making it more intuitive for color manipulation. Color mixing modes enable various compositing effects.',
      concepts: [
        {
          title: 'HSV Color Space',
          content: 'HSV (Hue, Saturation, Value) represents colors in a cylindrical coordinate system. Hue is the color wheel position (0-360°), Saturation controls color intensity (0-100%), and Value controls brightness (0-100%). This separation makes it easier to adjust colors independently.'
        },
        {
          title: 'HSV to RGB Conversion',
          content: 'Converting HSV to RGB requires geometric transformation. The hue is mapped to RGB components using trigonometric functions, saturation controls color purity, and value scales brightness. The conversion uses a hexagonal color wheel model.'
        },
        {
          title: 'Additive Blending',
          content: 'Additive blending adds colors together, simulating light sources. When two colored lights combine, their RGB values are added. Useful for creating glowing effects and simulating multiple light sources.'
        },
        {
          title: 'Multiply Blending',
          content: 'Multiply blending multiplies color components, resulting in darker colors. White (1.0) preserves the base color, black (0.0) makes it black. Useful for shadows, darkening effects, and color filtering.'
        },
        {
          title: 'Screen Blending',
          content: 'Screen blending is the inverse of multiply - it lightens images. The formula is 1 - (1 - c1) * (1 - c2), which inverts, multiplies, and inverts again. Useful for lightening effects and simulating light passing through colored filters.'
        },
        {
          title: 'Overlay Blending',
          content: 'Overlay combines multiply and screen blending based on the base color. Dark areas (< 0.5) use multiply (darken), bright areas (>= 0.5) use screen (lighten). Creates contrast enhancement and dramatic color effects.'
        },
        {
          title: 'Subtract Blending',
          content: 'Subtract blending subtracts one color from another, creating darker results. Useful for creating shadows, removing color casts, and creating high-contrast effects. Values are clamped to prevent negative results.'
        }
      ],
      math: {
        formula: 'HSV to RGB: hsv2rgb(hsv) using hexagonal color wheel transformation\nAdditive: result = min(c1 + c2, 1.0)\nMultiply: result = c1 * c2\nScreen: result = 1.0 - (1.0 - c1) * (1.0 - c2)\nOverlay: result = c1 < 0.5 ? 2 * c1 * c2 : 1 - 2 * (1 - c1) * (1 - c2)\nSubtract: result = max(c1 - c2, 0.0)',
        explanation: 'Each blending mode uses different mathematical operations to combine colors. HSV conversion uses geometric transformations to map cylindrical coordinates to RGB cube coordinates.'
      }
    },
    mathOperations: {
      title: 'Basic Math Operations',
      introduction: 'Mathematical operations are the foundation of shader programming. They manipulate numeric values to create patterns, transformations, and visual effects. Understanding these operations is essential before moving to more complex concepts.',
      concepts: [
        {
          title: 'Arithmetic Operations',
          content: 'Basic arithmetic (add, subtract, multiply, divide) performs fundamental calculations. Addition combines values, subtraction finds differences, multiplication scales values, and division creates ratios. These operations are used throughout shaders for transformations and calculations.'
        },
        {
          title: 'Power and Modulo',
          content: 'Power (exponentiation) raises a number to a power, useful for creating exponential curves and falloff effects. Modulo returns the remainder after division, essential for creating repeating patterns and wrapping values.'
        },
        {
          title: 'Absolute Value',
          content: 'Absolute value returns the distance from zero, always positive. Useful for symmetric operations, distance calculations, and ensuring non-negative values.'
        },
        {
          title: 'Floor and Ceiling',
          content: 'Floor rounds down to the nearest integer, ceiling rounds up. These are used for quantization, creating discrete steps, and grid-based calculations.'
        },
        {
          title: 'Min and Max',
          content: 'Min returns the smaller value, max returns the larger. Used for clamping, comparisons, and selecting between values based on conditions.'
        },
        {
          title: 'Clamp Function',
          content: 'Clamp constrains a value between a minimum and maximum. Essential for keeping values in valid ranges (e.g., colors between 0 and 1) and preventing overflow.'
        },
        {
          title: 'Mix (Linear Interpolation)',
          content: 'Mix performs linear interpolation between two values based on an interpolation factor. When t=0, returns first value; when t=1, returns second value; t=0.5 returns halfway between. Fundamental for smooth transitions, gradients, and blending.'
        }
      ],
      math: {
        formula: 'Add: a + b\nSubtract: a - b\nMultiply: a * b\nDivide: a / b\nPower: pow(a, b)\nModulo: mod(a, b)\nAbsolute: abs(a)\nFloor: floor(a)\nCeiling: ceil(a)\nMin: min(a, b)\nMax: max(a, b)\nClamp: clamp(value, min, max)\nMix: mix(a, b, t) = a * (1 - t) + b * t',
        explanation: 'Each operation performs a specific mathematical transformation. Arithmetic operations combine values, functions modify single values, and utility functions constrain or interpolate values.'
      }
    },
    coordinateTransformations: {
      title: 'Coordinate Transformations',
      introduction: 'Coordinate transformations manipulate UV coordinates to create rotation, translation, scaling, and coordinate system conversions. These transformations are fundamental for creating dynamic effects, patterns, and visual manipulations.',
      concepts: [
        {
          title: 'Rotation',
          content: 'Rotation transforms coordinates by rotating them around a center point using a 2D rotation matrix. The rotation matrix uses cosine and sine of the angle to rotate vectors. Rotation preserves distances and angles, making it an isometric transformation.'
        },
        {
          title: 'Translation',
          content: 'Translation moves coordinates by adding an offset vector. This shifts the entire coordinate space without changing shape or size. Translation is the simplest transformation and is often combined with rotation and scaling.'
        },
        {
          title: 'Scaling',
          content: 'Scaling multiplies coordinates by scale factors around a center point. Uniform scaling (same x and y) preserves shapes, while non-uniform scaling stretches objects. Scaling can be used to zoom in/out or create distortion effects.'
        },
        {
          title: 'Polar Coordinates',
          content: 'Polar coordinates convert Cartesian (x, y) coordinates to polar (angle, radius) representation. The angle is calculated using atan2(y, x), and the radius is the distance from the center. Polar coordinates are useful for circular patterns, radial effects, and rotational symmetries.'
        },
        {
          title: 'Transformation Matrices',
          content: 'Transformations can be represented as matrices. A 2D rotation matrix is [cos(θ) -sin(θ); sin(θ) cos(θ)]. Matrix multiplication combines multiple transformations efficiently. In GLSL, we can use mat2 for 2D transformations or perform the operations directly.'
        },
        {
          title: 'Combining Transformations',
          content: 'Multiple transformations can be combined by applying them in sequence. The order matters: rotation then translation produces different results than translation then rotation. Typically, transformations are applied: scale → rotate → translate.'
        }
      ],
      math: {
        formula: 'Rotation: R(θ) = [cos(θ) -sin(θ); sin(θ) cos(θ)]\nRotated = R(θ) × (UV - Center) + Center\nTranslation: Translated = UV + Offset\nScaling: Scaled = (UV - Center) × Scale + Center\nPolar: Angle = atan2(y, x), Radius = length(UV - Center)',
        explanation: 'Rotation uses a rotation matrix to rotate coordinates around a center. Translation adds an offset vector. Scaling multiplies coordinates by scale factors. Polar conversion uses atan2 for angle and length for radius.'
      }
    }
  },
  intermediate: {
    noise: {
      title: 'Procedural Noise',
      introduction: 'Noise functions generate pseudo-random patterns that appear organic and natural. They\'re deterministic (same input = same output) but look random.',
      concepts: [
        {
          title: 'Random Function',
          content: 'The random function uses a hash-like approach: it takes coordinates, applies a dot product with a seed vector, multiplies by a large number, and takes the fractional part. This creates pseudo-random values.'
        },
        {
          title: 'Value Noise',
          content: 'Value noise interpolates random values at grid points. We assign random values to integer coordinates, then smoothly interpolate between them using smoothstep or similar functions.'
        },
        {
          title: 'Applications',
          content: 'Noise is used for clouds, terrain generation, textures, fire effects, and any organic-looking patterns. Multiple octaves of noise create more complex patterns.'
        }
      ],
      math: {
        formula: 'random(st) = fract(sin(dot(st, seed)) * largeNumber)\nnoise = interpolate(random(corners))',
        explanation: 'Generate pseudo-random values at grid points, then interpolate smoothly between them to create continuous noise.'
      }
    },
    patterns: {
      title: 'Pattern Generation',
      introduction: 'Mathematical patterns use floor, mod, and other functions to create geometric designs programmatically.',
      concepts: [
        {
          title: 'Grid Generation',
          content: 'floor(uv * scale) creates discrete grid cells. Each cell has integer coordinates, enabling pattern-based logic.'
        },
        {
          title: 'Modulo Operation',
          content: 'mod(value, n) creates repeating patterns. mod(grid.x + grid.y, 2) alternates between 0 and 1, creating checkerboard patterns.'
        },
        {
          title: 'Pattern Variations',
          content: 'Combining floor, mod, and arithmetic operations can create stripes, checkerboards, hexagons, and other geometric patterns.'
        }
      ],
      math: {
        formula: 'grid = floor(uv * scale)\npattern = mod(grid.x + grid.y, 2.0)',
        explanation: 'Create a grid, then use modulo to alternate values, creating repeating geometric patterns.'
      }
    },
    distance: {
      title: 'Distance Fields (SDF)',
      introduction: 'Distance fields calculate the distance from a point to the nearest surface. They enable smooth shapes, outlines, and anti-aliased rendering.',
      concepts: [
        {
          title: 'Euclidean Distance',
          content: 'length(position - center) calculates the straight-line distance. This creates circular gradients centered at a point.'
        },
        {
          title: 'Smoothstep Function',
          content: 'smoothstep(edge0, edge1, x) creates a smooth transition between 0 and 1. It\'s essential for anti-aliasing and creating soft edges.'
        },
        {
          title: 'Signed Distance Functions',
          content: 'SDFs return positive distances outside shapes and negative inside. This enables efficient shape rendering and boolean operations.'
        }
      ],
      math: {
        formula: 'dist = length(uv - center)\ncircle = smoothstep(inner, outer, dist) - smoothstep(outer, outer+blur, dist)',
        explanation: 'Calculate distance from center, then use smoothstep to create smooth circular shapes with anti-aliased edges.'
      }
    },
    texture: {
      title: 'Textures & Texture Mapping',
      introduction: 'Texture mapping applies images or procedural patterns to surfaces using UV coordinates. Textures can be scaled, offset, tiled, and combined to create complex visual effects.',
      concepts: [
        {
          title: 'UV Coordinates',
          content: 'UV coordinates map screen space to texture space. They range from [0,1] and allow precise control over how textures are applied to surfaces.'
        },
        {
          title: 'Texture Scaling',
          content: 'Multiplying UV by a scale factor creates texture tiling. Higher scales create more repetitions, useful for creating seamless patterns.'
        },
        {
          title: 'Texture Offset',
          content: 'Adding an offset to UV coordinates shifts the texture position. This allows scrolling textures or positioning them precisely.'
        },
        {
          title: 'Procedural Textures',
          content: 'Textures can be generated procedurally using mathematical functions. Common patterns include checkerboards, gradients, noise, and patterns.'
        },
        {
          title: 'Texture Sampling',
          content: 'Sampling a texture at UV coordinates retrieves the color at that point. Interpolation between texels creates smooth results.'
        }
      ],
      math: {
        formula: 'uv = gl_FragCoord.xy / u_resolution.xy\nuv_scaled = uv * u_textureScale\nuv_offset = uv_scaled + u_textureOffset\ncolor = texture2D(sampler, uv_offset)',
        explanation: 'Calculate UV, scale for tiling, apply offset for positioning, then sample texture color at final UV coordinates.'
      }
    },
    postprocess: {
      title: 'Post-Processing Effects',
      introduction: 'Post-processing applies effects to already-rendered images. These effects run after the main rendering pass, modifying pixel colors based on spatial relationships and mathematical filters.',
      concepts: [
        {
          title: 'Convolution',
          content: 'Convolution combines a kernel (small matrix) with image samples. Each output pixel is a weighted sum of neighboring pixels, enabling effects like blur and edge detection.'
        },
        {
          title: 'Gaussian Blur',
          content: 'Gaussian blur uses a bell-shaped weight distribution. Pixels closer to the center contribute more, creating smooth, natural-looking blur effects.'
        },
        {
          title: 'Edge Detection',
          content: 'Edge detection calculates the gradient (rate of change) in pixel values. The Sobel operator uses convolution kernels to detect edges by measuring intensity changes.'
        },
        {
          title: 'Vignette',
          content: 'Vignette darkens image edges using distance from center. It creates a radial falloff effect, drawing attention to the center of the image.'
        },
        {
          title: 'Chromatic Aberration',
          content: 'Chromatic aberration shifts RGB channels by different amounts, creating color fringing. This simulates lens distortion effects.'
        },
        {
          title: 'Glitch Effects',
          content: 'Glitch effects simulate digital artifacts and signal interference. They use noise functions, trigonometric waves, and vector displacement to create visual distortions like screen tearing, static, wobble, and color separation.'
        },
        {
          title: 'Bloom',
          content: 'Bloom creates a glowing effect around bright areas. It extracts bright pixels above a threshold, blurs them using Gaussian weights, then adds the blurred result back to the original image. This simulates light bleeding and camera lens effects.'
        },
        {
          title: 'Color Grading',
          content: 'Color grading adjusts image appearance through brightness, contrast, saturation, color temperature, and tint. It\'s used for artistic color correction and mood setting, similar to photo editing filters.'
        },
        {
          title: 'Ambient Occlusion (AO)',
          content: 'Ambient occlusion simulates how ambient light is blocked in crevices and corners. Screen-space AO samples surrounding pixels, compares their depth/brightness to the center pixel, and darkens areas where surrounding pixels are darker, creating realistic depth and shadow.'
        }
      ],
      math: {
        formula: 'blur = Σ(Gaussian(x,y) * sample(x,y)) / Σ(Gaussian(x,y))\nedge = length(gradient)\nvignette = 1.0 - smoothstep(inner, outer, dist) * intensity\nbloom = extractBright + blur(bright) * intensity\ncolorGrading = adjustBrightness(adjustContrast(adjustSaturation(color)))\nao = 1.0 - occlusion * intensity',
        explanation: 'Post-processing uses convolution for blur, gradient calculation for edges, distance-based functions for vignette, brightness extraction and blur for bloom, color transformations for grading, and depth sampling for ambient occlusion.'
      }
    }
  },
  advanced: {
    lighting: {
      title: 'Phong Lighting Model',
      introduction: 'The Phong lighting model simulates how light interacts with surfaces by combining ambient, diffuse, and specular components.',
      concepts: [
        {
          title: 'Surface Normals',
          content: 'A normal vector is perpendicular to a surface. It defines the surface orientation, crucial for calculating how light reflects.'
        },
        {
          title: 'Diffuse Reflection (Lambertian)',
          content: 'Diffuse reflection follows Lambert\'s cosine law: brightness = max(dot(normal, lightDir), 0). Surfaces facing the light are brighter.'
        },
        {
          title: 'Ambient Component',
          content: 'Ambient light simulates indirect illumination. It provides a base brightness so surfaces aren\'t completely black when not directly lit.'
        },
        {
          title: 'Specular Highlights',
          content: 'Specular highlights create shiny reflections. They depend on the viewing angle and light direction, creating bright spots on reflective surfaces.'
        }
      ],
      math: {
        formula: 'diffuse = max(dot(normal, lightDir), 0.0)\nambient = ambientColor\nspecular = pow(max(dot(reflectDir, viewDir), 0.0), shininess)\nfinalColor = ambient + diffuse * lightColor + specular * specularColor',
        explanation: 'Combine ambient (base), diffuse (facing light), and specular (reflection) components to create realistic lighting.'
      }
    },
    raymarching: {
      title: 'Raymarching / SDF Rendering',
      introduction: 'Raymarching uses distance functions to efficiently render complex shapes. It\'s more flexible than traditional polygon rendering.',
      concepts: [
        {
          title: 'Ray Equation',
          content: 'A ray is defined parametrically: ray(t) = origin + direction * t. We march along this ray, stepping forward by the distance to the nearest surface.'
        },
        {
          title: 'Signed Distance Functions',
          content: 'SDFs return the distance to the nearest surface. For a sphere: sdSphere(p) = length(p) - radius. Negative values mean inside the shape.'
        },
        {
          title: 'Marching Algorithm',
          content: 'Start at ray origin, calculate distance to surface, step forward by that distance. Repeat until close enough to surface or max iterations reached.'
        },
        {
          title: 'Advantages',
          content: 'Raymarching enables smooth shapes, easy boolean operations, and complex geometry without meshes. It\'s computationally expensive but very flexible.'
        }
      ],
      math: {
        formula: 'ray(t) = origin + direction * t\ndistance = sdf(position)\nposition = origin + direction * accumulatedDistance',
        explanation: 'March along ray by stepping forward by the distance to nearest surface. When distance < epsilon, we\'ve hit the surface.'
      }
    }
  }
};

export const getShaderTheory = (level, concept) => {
  return shaderTheoryContent[level]?.[concept] || null;
};

