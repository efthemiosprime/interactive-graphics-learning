export const getShaderExplanation = (shaderLevel, shaderConcept, state) => {
  if (shaderLevel === 'basic') {
    switch (shaderConcept) {
      case 'color':
        return {
          title: 'Basic Color Shader',
          explanation: 'The simplest shader - outputs a solid color. This demonstrates the basic structure of a fragment shader.',
          steps: [
            {
              title: 'Shader Structure',
              formula: 'gl_FragColor = vec4(r, g, b, a)',
              calculation: 'Set the output color using RGBA values',
              result: `Color: (${state.color.r.toFixed(2)}, ${state.color.g.toFixed(2)}, ${state.color.b.toFixed(2)}, 1.0)`
            }
          ]
        };
      case 'uv':
        return {
          title: 'UV Coordinates',
          explanation: 'UV coordinates map screen position to shader calculations. Used for textures, gradients, and patterns.',
          steps: [
            {
              title: 'Calculate UV',
              formula: 'uv = gl_FragCoord.xy / u_resolution.xy',
              calculation: 'Normalize screen coordinates to [0, 1] range',
              result: 'UV ranges from (0,0) to (1,1)'
            },
            {
              title: 'Apply Scale',
              formula: 'uv *= u_uvScale',
              calculation: `Scale UV by ${state.uvScale.toFixed(2)}`,
              result: 'Creates repeating patterns'
            }
          ]
        };
      case 'time':
        return {
          title: 'Time-Based Animation',
          explanation: 'Using time uniform to create animated effects. Time increases continuously, creating smooth animations.',
          steps: [
            {
              title: 'Time Uniform',
              formula: 'uniform float u_time',
              calculation: 'Time value passed from CPU to GPU',
              result: `Current time: ${state.time.toFixed(2)}`
            },
            {
              title: 'Animate Color',
              formula: 'color = baseColor + sin(time) * amplitude',
              calculation: 'Use trigonometric functions for smooth oscillation',
              result: 'Creates pulsing/oscillating effects'
            }
          ]
        };
      case 'gradients':
        return {
          title: 'Gradients (Linear & Radial)',
          explanation: 'Gradients create smooth color transitions. Linear gradients transition along a direction, radial gradients transition outward from a center point.',
          steps: [
            {
              title: 'Gradient Type',
              formula: state.gradientType === 'linear' ? 'Linear Gradient' : 'Radial Gradient',
              calculation: 'Choose gradient style',
              result: `Type: ${state.gradientType}`
            },
            {
              title: state.gradientType === 'linear' ? 'Direction Vector' : 'Distance Calculation',
              formula: state.gradientType === 'linear' 
                ? `dir = vec2(cos(${state.gradientAngle.toFixed(2)}), sin(${state.gradientAngle.toFixed(2)}))`
                : `dist = length(uv - vec2(${state.gradientCenter.x.toFixed(2)}, ${state.gradientCenter.y.toFixed(2)}))`,
              calculation: state.gradientType === 'linear'
                ? 'Convert angle to direction vector'
                : 'Calculate distance from center',
              result: state.gradientType === 'linear'
                ? `Angle: ${(state.gradientAngle * 180 / Math.PI).toFixed(1)}°`
                : `Center: (${state.gradientCenter.x.toFixed(2)}, ${state.gradientCenter.y.toFixed(2)})`
            },
            {
              title: 'Interpolation Factor',
              formula: state.gradientType === 'linear'
                ? 't = dot(uv - 0.5, dir) + 0.5'
                : `t = dist / ${state.gradientRadius.toFixed(2)}`,
              calculation: 'Calculate position along gradient',
              result: 'Range: [0, 1]'
            },
            {
              title: 'Color Mixing',
              formula: `mix(vec3(${state.gradientStartColor.r.toFixed(2)}, ${state.gradientStartColor.g.toFixed(2)}, ${state.gradientStartColor.b.toFixed(2)}), vec3(${state.gradientEndColor.r.toFixed(2)}, ${state.gradientEndColor.g.toFixed(2)}, ${state.gradientEndColor.b.toFixed(2)}), t)`,
              calculation: 'Interpolate between start and end colors',
              result: 'Smooth color transition'
            }
          ]
        };
      case 'shapes':
        return {
          title: 'Basic Shapes',
          explanation: 'Shapes are created using distance fields and step functions. Circles use Euclidean distance, rectangles use box distance, and lines use distance to line segments.',
          steps: [
            {
              title: 'Shape Type',
              formula: `Type: ${state.shapeType}`,
              calculation: 'Select shape to render',
              result: state.shapeType === 'circle' ? 'Circle' : state.shapeType === 'rectangle' ? 'Rectangle' : 'Line'
            },
            {
              title: state.shapeType === 'circle' ? 'Circle Distance' : state.shapeType === 'rectangle' ? 'Rectangle Distance' : 'Line Distance',
              formula: state.shapeType === 'circle'
                ? `dist = length(uv - vec2(${state.shapeCenter.x.toFixed(2)}, ${state.shapeCenter.y.toFixed(2)}))`
                : state.shapeType === 'rectangle'
                ? `d = abs(uv - vec2(${state.shapeCenter.x.toFixed(2)}, ${state.shapeCenter.y.toFixed(2)})) - vec2(${(state.shapeSize.x * 0.5).toFixed(2)}, ${(state.shapeSize.y * 0.5).toFixed(2)})`
                : `closestPoint = center + dir * clamp(dot(uv - center, dir), -length, length)`,
              calculation: 'Calculate distance to shape',
              result: state.shapeType === 'circle' 
                ? `Radius: ${state.shapeSize.x.toFixed(2)}`
                : state.shapeType === 'rectangle'
                ? `Size: (${state.shapeSize.x.toFixed(2)}, ${state.shapeSize.y.toFixed(2)})`
                : `Length: ${state.shapeSize.x.toFixed(2)}, Angle: ${(state.lineAngle * 180 / Math.PI).toFixed(1)}°`
            },
            {
              title: 'Edge Smoothing',
              formula: `shape = smoothstep(radius + ${state.shapeEdgeSoftness.toFixed(3)}, radius - ${state.shapeEdgeSoftness.toFixed(3)}, dist)`,
              calculation: 'Create smooth edges using smoothstep',
              result: `Edge softness: ${state.shapeEdgeSoftness.toFixed(3)}`
            },
            {
              title: 'Apply Color',
              formula: `color = vec3(${state.shapeColor.r.toFixed(2)}, ${state.shapeColor.g.toFixed(2)}, ${state.shapeColor.b.toFixed(2)}) * shape`,
              calculation: 'Multiply color by shape mask',
              result: 'Shape rendered with specified color'
            }
          ]
        };
      case 'colorSpaces':
        return {
          title: 'Color Spaces & Transformations',
          explanation: state.colorSpaceMode === 'hsv' 
            ? 'HSV (Hue, Saturation, Value) is an alternative color space that separates color information from brightness. More intuitive for color manipulation than RGB.'
            : 'Color mixing combines two colors using different blending modes. Each mode produces different visual effects useful for compositing and color manipulation.',
          steps: state.colorSpaceMode === 'hsv' ? [
            {
              title: 'HSV Color Space',
              formula: `HSV(${(state.hsvColor.h * 360).toFixed(1)}°, ${(state.hsvColor.s * 100).toFixed(0)}%, ${(state.hsvColor.v * 100).toFixed(0)}%)`,
              calculation: 'Hue = color wheel position, Saturation = color intensity, Value = brightness',
              result: `Hue: ${(state.hsvColor.h * 360).toFixed(1)}°, Saturation: ${(state.hsvColor.s * 100).toFixed(0)}%, Value: ${(state.hsvColor.v * 100).toFixed(0)}%`
            },
            {
              title: 'HSV to RGB Conversion',
              formula: 'hsv2rgb(hsv) using geometric transformation',
              calculation: 'Convert HSV cylindrical coordinates to RGB cube coordinates',
              result: 'RGB color displayed on screen'
            }
          ] : [
            {
              title: 'Color Mixing Mode',
              formula: `Mode: ${state.colorMixMode}`,
              calculation: 'Select blending algorithm',
              result: state.colorMixMode === 'additive' ? 'Adds colors (like light)' : 
                      state.colorMixMode === 'multiply' ? 'Multiplies colors (darkens)' :
                      state.colorMixMode === 'screen' ? 'Inverse multiply (lightens)' :
                      state.colorMixMode === 'overlay' ? 'Combines multiply and screen' : 'Subtracts colors'
            },
            {
              title: 'Apply Blending',
              formula: `mixed = ${state.colorMixMode}Blend(color1, color2)`,
              calculation: `Apply ${state.colorMixMode} blending to combine colors`,
              result: 'Blended color result'
            },
            {
              title: 'Mix Amount',
              formula: `color = mix(color1, mixed, ${state.colorMixAmount.toFixed(2)})`,
              calculation: 'Interpolate between original and blended color',
              result: `Blend ratio: ${(state.colorMixAmount * 100).toFixed(0)}%`
            }
          ]
        };
      case 'coordinateTransformations':
        return {
          title: 'Coordinate Transformations',
          explanation: state.transformType === 'rotation'
            ? 'Rotation transforms UV coordinates by rotating them around a center point using a rotation matrix. This is useful for creating spinning effects and patterns.'
            : state.transformType === 'translation'
            ? 'Translation moves UV coordinates by adding an offset vector. This shifts the entire coordinate space, useful for panning effects.'
            : state.transformType === 'scaling'
            ? 'Scaling transforms UV coordinates by multiplying them by scale factors around a center point. Non-uniform scaling allows stretching in different directions.'
            : 'Polar coordinates convert Cartesian (x, y) coordinates to polar (angle, radius) representation. This creates circular patterns and radial effects.',
          steps: [
            {
              title: 'Transformation Type',
              formula: `Type: ${state.transformType}`,
              explanation: state.transformType === 'rotation'
                ? 'Rotation uses a 2D rotation matrix to rotate coordinates around a center point.'
                : state.transformType === 'translation'
                ? 'Translation adds an offset vector to move coordinates.'
                : state.transformType === 'scaling'
                ? 'Scaling multiplies coordinates by scale factors around a center point.'
                : 'Polar conversion transforms (x, y) to (angle, radius) using atan2 and length.'
            },
            {
              title: 'Transformation Parameters',
              formula: state.transformType === 'rotation'
                ? `Angle: ${(state.transformAngle * 180.0 / Math.PI).toFixed(1)}°, Center: (${state.transformCenter.x.toFixed(2)}, ${state.transformCenter.y.toFixed(2)})`
                : state.transformType === 'translation'
                ? `Translation: (${state.transformTranslation.x.toFixed(2)}, ${state.transformTranslation.y.toFixed(2)})`
                : state.transformType === 'scaling'
                ? `Scale: (${state.transformScale.x.toFixed(2)}, ${state.transformScale.y.toFixed(2)}), Center: (${state.transformCenter.x.toFixed(2)}, ${state.transformCenter.y.toFixed(2)})`
                : `Center: (${state.transformCenter.x.toFixed(2)}, ${state.transformCenter.y.toFixed(2)})`,
              explanation: 'These parameters control how the transformation is applied to the UV coordinates.'
            },
            {
              title: 'Visualization',
              formula: 'Checkerboard pattern with grid lines',
              explanation: 'A checkerboard pattern with grid lines helps visualize how the coordinate transformation affects the UV space.'
            }
          ]
        };

      case 'mathOperations':
        const getMathResult = () => {
          switch(state.mathOperation) {
            case 'add': return state.mathValue1 + state.mathValue2;
            case 'subtract': return state.mathValue1 - state.mathValue2;
            case 'multiply': return state.mathValue1 * state.mathValue2;
            case 'divide': return state.mathValue2 !== 0 ? state.mathValue1 / state.mathValue2 : 0;
            case 'power': return Math.pow(state.mathValue1, state.mathValue2);
            case 'modulo': return state.mathValue1 % state.mathValue2;
            case 'abs': return Math.abs(state.mathValue1);
            case 'floor': return Math.floor(state.mathValue1);
            case 'ceil': return Math.ceil(state.mathValue1);
            case 'min': return Math.min(state.mathValue1, state.mathValue2);
            case 'max': return Math.max(state.mathValue1, state.mathValue2);
            case 'clamp': return Math.max(state.mathValue2, Math.min(state.mathValue3, state.mathValue1));
            case 'mix': return state.mathValue1 * (1 - state.mathValue3) + state.mathValue2 * state.mathValue3;
            default: return 0;
          }
        };
        return {
          title: 'Basic Math Operations',
          explanation: 'Mathematical operations are fundamental building blocks in shader programming. They manipulate numeric values to create patterns, transformations, and effects.',
          steps: [
            {
              title: 'Operation Type',
              formula: `Operation: ${state.mathOperation}`,
              calculation: 'Select mathematical operation to perform',
              result: `Performing ${state.mathOperation} operation`
            },
            {
              title: 'Input Values',
              formula: state.mathOperation === 'abs' || state.mathOperation === 'floor' || state.mathOperation === 'ceil' 
                ? `Value: ${state.mathValue1.toFixed(2)}`
                : state.mathOperation === 'clamp' || state.mathOperation === 'mix'
                ? `Value1: ${state.mathValue1.toFixed(2)}, Value2: ${state.mathValue2.toFixed(2)}, Value3: ${state.mathValue3.toFixed(2)}`
                : `Value1: ${state.mathValue1.toFixed(2)}, Value2: ${state.mathValue2.toFixed(2)}`,
              calculation: 'Input values for the operation',
              result: 'Values ready for computation'
            },
            {
              title: 'Result',
              formula: `result = ${getMathResult().toFixed(2)}`,
              calculation: 'Mathematical operation result',
              result: `Output: ${getMathResult().toFixed(2)}`
            },
            {
              title: 'Visualization',
              formula: 'normalized = (result + 2.0) / 4.0',
              calculation: 'Map result to grayscale color [0, 1]',
              result: 'Displayed as grayscale intensity'
            }
          ]
        };
      default:
        return null;
    }
  } else if (shaderLevel === 'intermediate') {
    switch (shaderConcept) {
      case 'noise':
        return {
          title: 'Procedural Noise',
          explanation: 'Noise functions generate random-looking patterns. Used for textures, clouds, terrain, and organic effects.',
          steps: [
            {
              title: 'Random Function',
              formula: 'random(st) = fract(sin(dot(st, seed)) * largeNumber)',
              calculation: 'Generate pseudo-random value from coordinates',
              result: 'Deterministic but appears random'
            },
            {
              title: 'Interpolate Noise',
              formula: 'noise = mix(corners, smooth interpolation)',
              calculation: 'Smooth interpolation between random values',
              result: 'Creates continuous noise pattern'
            }
          ]
        };
      case 'advancedNoise':
        const noiseTypeName = state.advancedNoiseType || 'fractal';
        const noiseExplanations = {
          fractal: {
            title: 'Fractal Noise',
            explanation: `Fractal noise combines multiple octaves (layers) of noise at different frequencies and amplitudes. Each octave adds detail at a smaller scale.`,
            steps: [
              {
                title: 'Octave Layering',
                formula: `fractalNoise = Σ(noise(uv * frequency) * amplitude)`,
                calculation: `Sum ${state.fractalOctaves.toFixed(1)} octaves with increasing frequency and decreasing amplitude`,
                result: `Each octave adds detail: frequency *= ${state.fractalLacunarity.toFixed(2)}, amplitude *= ${state.fractalGain.toFixed(2)}`
              },
              {
                title: 'Lacunarity',
                formula: `frequency *= ${state.fractalLacunarity.toFixed(2)}`,
                calculation: 'Controls spacing between octave frequencies',
                result: 'Higher values = more detail variation'
              },
              {
                title: 'Gain',
                formula: `amplitude *= ${state.fractalGain.toFixed(2)}`,
                calculation: 'Controls how much each octave contributes',
                result: 'Lower values = smoother, higher values = more contrast'
              }
            ]
          },
          simplex: {
            title: 'Simplex Noise',
            explanation: 'Simplex noise is an improved version of Perlin noise with better computational properties and visual quality. Uses a triangular grid instead of square.',
            steps: [
              {
                title: 'Triangular Grid',
                formula: 'Use triangular grid for better distribution',
                calculation: 'Sample noise at vertices of triangular cells',
                result: 'More uniform noise distribution'
              },
              {
                title: 'Gradient Contribution',
                formula: 'result = Σ(dot(gradient, distance) * falloff)',
                calculation: 'Weight contributions by distance falloff',
                result: 'Smooth, high-quality noise pattern'
              }
            ]
          },
          worley: {
            title: 'Worley Noise (Voronoi)',
            explanation: 'Worley noise creates cellular/Voronoi patterns by finding the distance to the nearest feature point. Produces cell-like structures.',
            steps: [
              {
                title: 'Feature Points',
                formula: 'point = random(cell) + cell_offset',
                calculation: `Generate random point in each cell with scale ${state.worleyScale.toFixed(2)}`,
                result: 'Feature point per cell'
              },
              {
                title: 'Distance Calculation',
                formula: 'min_dist = min(distance(uv, point[i]))',
                calculation: 'Find distance to nearest feature point',
                result: 'Cellular pattern with cell boundaries'
              }
            ]
          },
          perlin: {
            title: 'Perlin Noise',
            explanation: 'Perlin noise uses gradient vectors at grid points and interpolates dot products. Classic smooth noise algorithm.',
            steps: [
              {
                title: 'Gradient Vectors',
                formula: 'gradient = random_angle → (cos(angle), sin(angle))',
                calculation: 'Generate random gradient vector at each grid point',
                result: 'Direction vector for interpolation'
              },
              {
                title: 'Dot Product',
                formula: 'dot(gradient, distance_vector)',
                calculation: 'Calculate influence of each gradient',
                result: 'Smooth interpolation between gradients'
              }
            ]
          },
          domainWarp: {
            title: 'Domain Warping',
            explanation: 'Domain warping distorts the sampling coordinates using noise itself, creating complex, organic patterns.',
            steps: [
              {
                title: 'Warp Calculation',
                formula: `warpedUV = uv + noise(uv) * ${state.domainWarpStrength.toFixed(2)}`,
                calculation: 'Distort UV coordinates using noise',
                result: 'Warped coordinate space'
              },
              {
                title: 'Sample Warped Space',
                formula: 'result = noise(warpedUV * scale)',
                calculation: 'Sample noise in the warped space',
                result: 'Complex, flowing patterns'
              }
            ]
          }
        };
        return noiseExplanations[noiseTypeName] || noiseExplanations.fractal;
      case 'patterns':
        return {
          title: 'Pattern Generation',
          explanation: 'Mathematical patterns using floor, mod, and other functions. Creates geometric patterns programmatically.',
          steps: [
            {
              title: 'Grid Pattern',
              formula: 'grid = floor(uv * scale)',
              calculation: 'Create discrete grid cells',
              result: 'Each cell has integer coordinates'
            },
            {
              title: 'Checkerboard',
              formula: 'pattern = mod(grid.x + grid.y, 2.0)',
              calculation: 'Alternate pattern based on grid position',
              result: 'Creates checkerboard effect'
            }
          ]
        };
      case 'distance':
        return {
          title: 'Distance Fields',
          explanation: 'Distance functions calculate distance from shapes. Used for smooth shapes, outlines, and effects.',
          steps: [
            {
              title: 'Distance from Center',
              formula: 'dist = length(uv - center)',
              calculation: 'Euclidean distance from point',
              result: 'Creates circular gradient'
            },
            {
              title: 'Smoothstep',
              formula: 'circle = smoothstep(inner, outer, dist)',
              calculation: 'Smooth transition between values',
              result: 'Creates anti-aliased edges'
            }
          ]
        };
      case 'displacementMapping':
        const displacementTypeName = state.displacementType || 'height';
        const displacementExplanations = {
          height: {
            title: 'Height-based Displacement',
            explanation: `Height-based displacement uses a grayscale height map to offset UV coordinates along surface normals, creating depth perception.`,
            steps: [
              {
                title: 'Sample Height Map',
                formula: `height = sampleHeight(uv)`,
                calculation: `Read grayscale value from height map (${state.useImageTexture ? 'image texture' : 'procedural noise'})`,
                result: `Height value in [0, 1] range`
              },
              {
                title: 'Calculate Surface Normal',
                formula: 'normal = normalize(gradient(height))',
                calculation: 'Compute normal from height differences in neighboring pixels',
                result: 'Direction vector perpendicular to surface'
              },
              {
                title: 'Displace UV Coordinates',
                formula: `displacedUV = uv + normal * height * ${state.displacementHeight.toFixed(2)} * ${state.displacementScale.toFixed(2)}`,
                calculation: 'Offset UV along normal direction based on height',
                result: 'Creates depth effect by shifting sampling coordinates'
              }
            ]
          },
          parallax: {
            title: 'Parallax Mapping',
            explanation: 'Parallax mapping creates a fake depth effect by offsetting UV coordinates based on view direction and height. Simulates parallax without actual geometry.',
            steps: [
              {
                title: 'Calculate View Direction',
                formula: 'viewDir = normalize(center - uv)',
                calculation: 'Direction from pixel to view center',
                result: '2D view direction vector'
              },
              {
                title: 'Sample Height',
                formula: 'height = sampleHeight(uv)',
                calculation: 'Get height value from height map',
                result: 'Height in [0, 1] range'
              },
              {
                title: 'Calculate Parallax Offset',
                formula: `offset = viewDir.xy * height * ${state.displacementHeight.toFixed(2)} * ${state.displacementScale.toFixed(2)}`,
                calculation: 'Offset UV based on view direction and height',
                result: 'Creates parallax effect - closer areas shift more'
              },
              {
                title: 'Apply Displacement',
                formula: 'displacedUV = uv - offset',
                calculation: 'Subtract offset to shift sampling point',
                result: 'Fake depth perception'
              }
            ]
          },
          steepParallax: {
            title: 'Steep Parallax Mapping',
            explanation: 'Steep parallax mapping improves parallax by ray marching through multiple height layers, providing more accurate depth perception for steep surfaces.',
            steps: [
              {
                title: 'Ray March Setup',
                formula: 'deltaUV = viewDir.xy * height * scale / numLayers',
                calculation: `Divide displacement into ${8} layers`,
                result: 'Step size for ray marching'
              },
              {
                title: 'Ray March Through Layers',
                formula: 'for each layer: sample height, compare with layer depth',
                calculation: 'Step through height layers until intersection found',
                result: 'Find correct sampling depth'
              },
              {
                title: 'Interpolate Between Layers',
                formula: 'weight = nextDepth / (nextDepth - prevDepth)',
                calculation: 'Smooth interpolation between adjacent layers',
                result: 'More accurate depth perception'
              }
            ]
          }
        };
        return displacementExplanations[displacementTypeName] || displacementExplanations.height;
      case 'texture':
        return {
          title: 'Texture Mapping',
          explanation: 'Texture mapping applies images or procedural patterns to surfaces using UV coordinates. Textures can be scaled, offset, and tiled.',
          steps: [
            {
              title: 'Calculate UV Coordinates',
              formula: 'uv = gl_FragCoord.xy / u_resolution.xy',
              calculation: 'Normalize screen coordinates to [0, 1]',
              result: 'UV ranges from (0,0) to (1,1)'
            },
            {
              title: 'Apply Texture Scale',
              formula: 'uv_scaled = uv * u_textureScale',
              calculation: `Scale UV by ${state.textureScale.toFixed(2)} to tile texture`,
              result: 'Creates repeating pattern'
            },
            {
              title: 'Apply Texture Offset',
              formula: 'uv_offset = uv + u_textureOffset',
              calculation: `Offset UV by (${state.textureOffset.x.toFixed(2)}, ${state.textureOffset.y.toFixed(2)})`,
              result: 'Shifts texture position'
            },
            {
              title: 'Sample Texture',
              formula: 'color = texture(uv_offset)',
              calculation: 'Look up color from texture at UV coordinates',
              result: 'Applies texture to surface'
            }
          ]
        };
      case 'postprocess':
        return {
          title: 'Post-Processing Effects',
          explanation: 'Post-processing effects are applied to rendered images to create visual enhancements like blur, edge detection, vignette, and chromatic aberration.',
          steps: [
            {
              title: 'Sample Color',
              formula: 'sampleColor(uv, offset)',
              calculation: 'Sample color from framebuffer at offset position',
              result: 'Gets color data for processing'
            },
            {
              title: 'Apply Effect',
              formula: state.postProcessType === 'blur' 
                ? `blur(uv) with radius ${state.blurAmount.toFixed(1)}`
                : state.postProcessType === 'edge'
                ? `edgeDetection(uv) with threshold ${state.edgeThreshold.toFixed(2)}`
                : state.postProcessType === 'vignette'
                ? `applyVignette(color, uv) with intensity ${state.vignetteIntensity.toFixed(2)}`
                : `applyChromaticAberration(uv) with amount ${state.chromaticAberration.toFixed(3)}`,
              calculation: `Apply ${state.postProcessType} effect to the image`,
              result: 'Creates visual enhancement effect'
            }
          ]
        };
      default:
        return null;
    }
  } else {
    switch (shaderConcept) {
      case 'lighting':
        return {
          title: 'Phong Lighting Model',
          explanation: 'Simulates how light interacts with surfaces. Combines ambient, diffuse, and specular components.',
          steps: [
            {
              title: 'Normal Vector',
              formula: 'normal = normalize(surfaceNormal)',
              calculation: 'Direction perpendicular to surface',
              result: 'Defines surface orientation'
            },
            {
              title: 'Diffuse Lighting',
              formula: 'diffuse = max(dot(normal, lightDir), 0.0)',
              calculation: 'Lambertian reflection - brighter when facing light',
              result: `Intensity: ${state.lightIntensity.toFixed(2)}`
            },
            {
              title: 'Final Color',
              formula: 'color = ambient + diffuse * state.lightIntensity',
              calculation: 'Combine lighting components',
              result: 'Realistic surface shading'
            }
          ]
        };
      case 'raymarching':
        return {
          title: 'Raymarching / SDF Rendering',
          explanation: 'Advanced technique for rendering complex shapes. Uses distance functions to find surface intersections.',
          steps: [
            {
              title: 'Ray Setup',
              formula: 'ray = origin + direction * t',
              calculation: 'Parametric ray equation',
              result: 'Represents line in 3D space'
            },
            {
              title: 'Distance Function',
              formula: 'd = sdSphere(position, radius)',
              calculation: 'Calculate distance to nearest surface',
              result: 'SDF (Signed Distance Function)'
            },
            {
              title: 'March Along Ray',
              formula: 't += distance; position = origin + direction * t',
              calculation: 'Step forward by distance amount',
              result: 'Efficiently finds surface intersection'
            }
          ]
        };
      default:
        return null;
    }
  }
};
