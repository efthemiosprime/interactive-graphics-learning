// Mathematical concepts used in 2D Engine Tutorial

export const getEngine2DMathConcepts = (module, step) => {
  const concepts = {
    setup: {
      1: [
        {
          name: 'Project Structure',
          description: 'Hierarchical organization: root → modules → classes → methods. See: Vector & Matrix Operations → Matrix Operations (hierarchical structures).'
        },
        {
          name: 'Module System',
          description: 'ES6 modules enable code organization and reusability. See: Vector & Matrix Operations → Matrix Operations (modular mathematics).'
        }
      ],
      2: [
        {
          name: 'Time Measurement',
          description: 'Delta time ensures frame-rate independence. See: Animation & Interpolation → Timing (delta time calculations).'
        },
        {
          name: 'Frame Rate',
          description: 'FPS = frames / time. See: Animation & Interpolation → Timing (frame rate calculations).'
        }
      ],
      3: [
        {
          name: 'Transform Matrices',
          description: '2D transformations use 3×3 matrices. See: 3D Transformations & Projections → Matrix Multiplication (2D transforms).'
        },
        {
          name: 'Coordinate Systems',
          description: 'Local → World → Screen coordinate transformations. See: 3D Transformations & Projections → Coordinate Systems.'
        }
      ],
      4: [
        {
          name: 'Data Structures',
          description: 'Arrays for entity storage, filtering for queries. See: Vector & Matrix Operations → Matrix Operations (data organization).'
        },
        {
          name: 'Set Operations',
          description: 'Entity queries use set filtering. See: Vector & Matrix Operations → Vector Operations (set operations).'
        }
      ],
      5: [
        {
          name: 'Matrix Multiplication',
          description: 'World transforms combine parent and local transforms. See: 3D Transformations & Projections → Matrix Multiplication.'
        },
        {
          name: 'Rotation Matrices',
          description: '2D rotation uses cos/sin transformation. See: 3D Transformations & Projections → Rotation (2D rotation).'
        },
        {
          name: 'Hierarchical Transforms',
          description: 'Parent-child transform composition. See: 3D Transformations & Projections → Matrix Multiplication (transform composition).'
        }
      ],
      6: [
        {
          name: 'Coordinate Conversion',
          description: 'Screen to canvas coordinate transformation. See: 3D Transformations & Projections → Coordinate Transformations.'
        },
        {
          name: 'Point-in-Rectangle',
          description: 'Hit testing uses geometric intersection. See: Vector & Matrix Operations → Vector Operations (geometric tests).'
        }
      ],
      7: [
        {
          name: 'Vector Mathematics',
          description: '2D vectors for positions and directions. See: Vector & Matrix Operations → Vector Operations.'
        },
        {
          name: 'Euclidean Distance',
          description: 'Pythagorean theorem for distance calculation. See: Vector & Matrix Operations → Vector Magnitude.'
        },
        {
          name: 'Linear Interpolation',
          description: 'LERP for smooth transitions. See: Animation & Interpolation → Linear Interpolation (LERP).'
        }
      ],
      8: [
        {
          name: 'Asynchronous Programming',
          description: 'Promises for async operations. See: Vector & Matrix Operations → Matrix Operations (asynchronous operations).'
        },
        {
          name: 'Hash Tables',
          description: 'Map data structure for O(1) lookup. See: Vector & Matrix Operations → Matrix Operations (data structures).'
        }
      ],
      9: [
        {
          name: 'Modulo Arithmetic',
          description: 'frameIndex mod columns calculates column. See: Vector & Matrix Operations → Basic Math Operations (modulo).'
        },
        {
          name: 'Floor Division',
          description: '⌊frameIndex / columns⌋ calculates row. See: Vector & Matrix Operations → Basic Math Operations (floor).'
        },
        {
          name: 'Grid Mapping',
          description: '1D index to 2D grid coordinates. See: 3D Transformations & Projections → Coordinate Transformations.'
        }
      ],
      10: [
        {
          name: 'Color Mathematics',
          description: 'Blend modes perform mathematical operations on RGB values. See: Vector & Matrix Operations → Vector Operations (RGB as 3D vector).'
        },
        {
          name: 'Convolution',
          description: 'Blur uses convolution kernel. See: Vector & Matrix Operations → Matrix Operations (matrix convolution).'
        }
      ]
    },
    core: {
      1: [
        {
          name: 'Coordinate Systems',
          description: 'Canvas uses a 2D coordinate system with origin at top-left. X increases right, Y increases down.'
        },
        {
          name: 'Pixel Resolution',
          description: 'Canvas has internal resolution (width × height pixels) separate from CSS display size.'
        },
        {
          name: 'Aspect Ratio',
          description: 'Ratio of width to height. Maintaining aspect ratio prevents distortion.'
        }
      ],
      2: [
        {
          name: 'Time Measurement',
          description: 'Time is measured in milliseconds or seconds. Delta time measures time between frames.'
        },
        {
          name: 'Frame Rate',
          description: 'Frames per second (FPS) measures animation smoothness. 60 FPS is standard target.'
        },
        {
          name: 'Animation Loop',
          description: 'Continuous cycle of update and render creates illusion of motion.'
        }
      ],
      3: [
        {
          name: 'High-Resolution Timing',
          description: 'performance.now() provides microsecond precision for accurate timing.'
        },
        {
          name: 'Rate Calculation',
          description: 'FPS = frames / time_interval. Calculated over 1-second windows.'
        },
        {
          name: 'Time Clamping',
          description: 'Limiting delta time prevents large jumps from tab switching or lag spikes.'
        }
      ]
    },
    renderer: {
      1: [
        {
          name: 'Geometric Primitives',
          description: 'Basic shapes (rectangles, circles, lines) are building blocks for complex graphics.'
        },
        {
          name: 'Area Calculations',
          description: 'Rectangle area = width × height. Circle area = π × radius².'
        },
        {
          name: 'Coordinate Geometry',
          description: 'Shapes are positioned using (x, y) coordinates in 2D space.'
        }
      ],
      2: [
        {
          name: 'Transformation Matrices',
          description: '2D transformations use 3×3 matrices. Operations combine via matrix multiplication.'
        },
        {
          name: 'Matrix Composition',
          description: 'Multiple transformations combine: M = T × R × S (scale → rotate → translate).'
        },
        {
          name: 'Trigonometric Functions',
          description: 'sin() and cos() used for rotation. Angle measured in radians.'
        },
        {
          name: 'Matrix Stack',
          description: 'Stack data structure saves/restores transformation state for nested transforms.'
        }
      ],
      3: [
        {
          name: 'Bitmap Rendering',
          description: 'Text and images rendered as bitmaps (pixel arrays) on canvas.'
        },
        {
          name: 'Aspect Ratio Preservation',
          description: 'Maintaining width/height ratio prevents image distortion.'
        },
        {
          name: 'Sprite Sheets',
          description: 'Multiple sprites stored in one image. Coordinates calculated from grid position.'
        }
      ]
    },
    scene: {
      1: [
        {
          name: 'Data Structures',
          description: 'Arrays store entity collections. O(1) add, O(n) remove operations.'
        },
        {
          name: 'Object Management',
          description: 'Scene manages entity lifecycle: creation, updates, rendering, destruction.'
        },
        {
          name: 'Separation of Concerns',
          description: 'Scene handles management, Entity handles behavior. Clear responsibilities.'
        }
      ],
      2: [
        {
          name: 'Tree Structures',
          description: 'Parent-child relationships form tree. Each node transforms coordinate system.'
        },
        {
          name: 'Transform Composition',
          description: 'Child transforms combine with parent: world = parent × local.'
        },
        {
          name: 'Hierarchical Rendering',
          description: 'Rendering parent automatically renders children. Enables complex compositions.'
        },
        {
          name: 'Coordinate Space Transformation',
          description: 'Each node defines local coordinate system. Children drawn in parent\'s space.'
        }
      ],
      3: [
        {
          name: 'Spatial Queries',
          description: 'Search entities by position using distance calculations.'
        },
        {
          name: 'Type Queries',
          description: 'Filter entities by class/type using instanceof checks.'
        },
        {
          name: 'Query Optimization',
          description: 'Limit query frequency and scope for performance. Cache results when possible.'
        },
        {
          name: 'Bounding Boxes',
          description: 'Axis-aligned bounding boxes (AABB) used for fast collision detection.'
        }
      ]
    },
    entity: {
      1: [
        {
          name: '2D Vectors',
          description: 'Position represented as (x, y) vector. Vectors have magnitude and direction.'
        },
        {
          name: 'Angles and Rotation',
          description: 'Rotation measured in radians. 0 = right, π/2 = down, π = left, 3π/2 = up.'
        },
        {
          name: 'Scaling',
          description: 'Scale multiplies size. Uniform (sx = sy) or non-uniform (sx ≠ sy) scaling.'
        },
        {
          name: 'Unit Conversion',
          description: 'Degrees to radians: rad = deg × π / 180. Radians to degrees: deg = rad × 180 / π.'
        }
      ],
      2: [
        {
          name: 'Matrix Multiplication',
          description: 'Transform matrices multiply to combine transformations.'
        },
        {
          name: 'Transform Order',
          description: 'Order matters: scale → rotate → translate. Applied in reverse order.'
        },
        {
          name: 'World vs Local Space',
          description: 'Local space relative to entity. World space relative to scene. Transform converts between.'
        },
        {
          name: 'Rotation Composition',
          description: 'Rotations add: world rotation = parent rotation + local rotation.'
        },
        {
          name: 'Scale Composition',
          description: 'Scales multiply: world scale = parent scale × local scale.'
        }
      ],
      3: [
        {
          name: 'Frame-Rate Independence',
          description: 'Movement uses delta time: position += velocity × dt. Ensures consistent speed.'
        },
        {
          name: 'Update Frequency',
          description: 'Update called each frame. Frequency = 1 / delta_time ≈ 60 Hz.'
        },
        {
          name: 'Rendering Pipeline',
          description: 'Render order matters for layering. Entities rendered in scene order.'
        },
        {
          name: 'State Management',
          description: 'Update modifies state, render displays state. Clear separation enables consistency.'
        }
      ]
    },
    input: {
      1: [
        {
          name: 'Coordinate Transformation',
          description: 'Convert screen coordinates (page space) to canvas coordinates (canvas space).'
        },
        {
          name: 'Bounding Rectangle',
          description: 'getBoundingClientRect() provides canvas position and size on page.'
        },
        {
          name: 'Event Coordinates',
          description: 'Mouse events provide clientX/clientY in screen space. Convert to canvas space.'
        }
      ],
      2: [
        {
          name: 'Point-in-Shape Testing',
          description: 'Test if point (x, y) is inside shape. Simple: bounding box. Complex: geometry.'
        },
        {
          name: 'Bounding Box',
          description: 'Axis-aligned rectangle bounds entity. Fast hit testing using coordinate comparisons.'
        },
        {
          name: 'Event Propagation',
          description: 'Click events dispatched to entities. Entity handles its own click logic.'
        },
        {
          name: 'State Tracking',
          description: 'Track mouse state (down, pressed, released) between frames for click detection.'
        }
      ],
      3: [
        {
          name: 'Touch Events',
          description: 'Touch events similar to mouse but support multiple simultaneous touches.'
        },
        {
          name: 'Touch List',
          description: 'TouchList contains all active touches. Each touch has position and identifier.'
        },
        {
          name: 'Multi-Touch Gestures',
          description: 'Multiple touches enable gestures: pinch (zoom), rotate, multi-finger drag.'
        },
        {
          name: 'Event Prevention',
          description: 'preventDefault() stops browser default behavior (scrolling, zooming).'
        }
      ]
    },
    utils: {
      1: [
        {
          name: 'Vector Algebra',
          description: 'Vectors support addition, subtraction, scalar multiplication. Operations component-wise.'
        },
        {
          name: 'Vector Magnitude',
          description: 'Length calculated using Pythagorean theorem: |v| = √(x² + y²).'
        },
        {
          name: 'Unit Vectors',
          description: 'Normalized vectors have length 1. Preserve direction, set magnitude to 1.'
        },
        {
          name: 'Dot Product',
          description: 'Dot product: v₁ · v₂ = x₁x₂ + y₁y₂. Used for angle calculations and projections.'
        }
      ],
      2: [
        {
          name: 'Euclidean Distance',
          description: 'Distance between points: d = √((x₂-x₁)² + (y₂-y₁)²). Uses Pythagorean theorem.'
        },
        {
          name: 'Squared Distance',
          description: 'Distance² avoids sqrt for performance. Use when comparing distances (not absolute).'
        },
        {
          name: 'Inverse Trigonometric Functions',
          description: 'atan2(y, x) calculates angle. Returns angle in radians from origin to point.'
        },
        {
          name: 'Direction Vectors',
          description: 'Normalized vector from source to target gives direction. Used for movement and aiming.'
        }
      ],
      3: [
        {
          name: 'Interpolation',
          description: 'LERP blends between values: result = start + (end - start) × t. Smooth transitions.'
        },
        {
          name: 'Clamping',
          description: 'Clamp value to range [min, max]. Ensures value stays within bounds.'
        },
        {
          name: 'Range Mapping',
          description: 'Map value from one range to another. Linear transformation.'
        },
        {
          name: 'Random Number Generation',
          description: 'Pseudo-random numbers for variety. Uniform distribution in range.'
        },
        {
          name: 'Timing Utilities',
          description: 'Timers track elapsed time. Useful for delays, cooldowns, animations.'
        }
      ]
    },
    assetloader: {
      1: [
        {
          name: 'Promise-Based Asynchronous Operations',
          description: 'Promises handle asynchronous operations. Enables async/await for clean code flow.'
        },
        {
          name: 'Hash Map Data Structure',
          description: 'Map provides O(1) key-value lookup. Used for asset cache storage.'
        },
        {
          name: 'Progress Calculation',
          description: 'Progress = loaded / total. Simple ratio calculation for loading percentage.'
        }
      ],
      2: [
        {
          name: 'Asynchronous Image Loading',
          description: 'Image loading is non-blocking. Browser loads image in background while code continues.'
        },
        {
          name: 'Error Handling',
          description: 'Try/catch blocks handle loading failures. Prevents crashes from missing assets.'
        }
      ],
      3: [
        {
          name: 'Cache Hit/Miss',
          description: 'Cache hit: asset found in memory. Cache miss: asset needs loading.'
        },
        {
          name: 'Memory Management',
          description: 'Cached assets consume memory. Clear cache to free memory when not needed.'
        },
        {
          name: 'Duplicate Prevention',
          description: 'Prevents loading same asset multiple times. Reuses existing Promise if already loading.'
        }
      ],
      4: [
        {
          name: 'Parallel Processing',
          description: 'Multiple assets load simultaneously. Faster than sequential loading.'
        },
        {
          name: 'Promise.all()',
          description: 'Waits for all Promises to resolve. Fails if any Promise rejects.'
        }
      ],
      5: [
        {
          name: 'Progress Tracking',
          description: 'Tracks loading state: total, loaded, failed. Calculates progress percentage.'
        },
        {
          name: 'Percentage Calculation',
          description: 'percentage = (loaded / total) × 100. Simple ratio to percentage conversion.'
        }
      ],
      6: [
        {
          name: 'Asset Pipeline',
          description: 'Complete flow: Load → Cache → Retrieve → Render. Separates loading from usage.'
        }
      ]
    },
    sprite: {
      1: [
        {
          name: 'Inheritance',
          description: 'Sprite extends Entity. Inherits position, rotation, scale, and hierarchy.'
        },
        {
          name: 'Object-Oriented Design',
          description: 'Class-based structure. Encapsulates sprite data and behavior.'
        }
      ],
      2: [
        {
          name: 'Coordinate Transformations',
          description: 'Entity transforms position, rotate, and scale sprite. Applied in world space.'
        },
        {
          name: 'Aspect Ratio',
          description: 'Maintains image proportions. Prevents stretching or squashing.'
        }
      ],
      3: [
        {
          name: 'Modulo Arithmetic',
          description: 'frameIndex % columns calculates column. Used for grid-based sprite sheets.'
        },
        {
          name: 'Integer Division',
          description: 'floor(frameIndex / columns) calculates row. Converts linear index to 2D grid.'
        },
        {
          name: 'Grid Coordinates',
          description: 'Sprite sheet is 2D grid. Frame index maps to (row, column) coordinates.'
        }
      ],
      4: [
        {
          name: 'Time-Based Animation',
          description: 'Animation advances based on elapsed time. Frame changes when threshold reached.'
        },
        {
          name: 'Frame Sequencing',
          description: 'Animation plays frames in sequence. Can skip frames or play in any order.'
        },
        {
          name: 'Delta Time',
          description: 'Time elapsed since last frame. Ensures consistent animation speed regardless of FPS.'
        }
      ],
      5: [
        {
          name: 'State Machine',
          description: 'Animation states are discrete modes. Transitions between states based on conditions.'
        },
        {
          name: 'State Management',
          description: 'Game logic determines current state. State determines which animation plays.'
        }
      ],
      6: [
        {
          name: 'Complete Rendering Pipeline',
          description: 'Load → Create → Configure → Animate → Render. Full sprite lifecycle.'
        },
        {
          name: 'Frame Rate',
          description: 'Animation speed = 1 / speed. Controls how fast animation plays.'
        }
      ]
    },
    effects: {
      1: [
        {
          name: 'Color Mathematics',
          description: 'Colors represented as RGB values (0-1 or 0-255). Blend modes perform mathematical operations on these values. See: Vector & Matrix Operations → Vector Operations (RGB as 3D vector).'
        },
        {
          name: 'Composite Operations',
          description: 'Blend modes determine how new pixels combine with existing pixels. Each mode uses different mathematical formula. See: Vector & Matrix Operations → Vector Operations (component-wise operations).'
        },
        {
          name: 'Pixel Transformations',
          description: 'Filters transform pixel values. Blur averages pixels, color adjustments scale/transform RGB values. See: Vector & Matrix Operations → Matrix Operations (linear transformations).'
        }
      ],
      2: [
        {
          name: 'Color Multiplication',
          description: 'Multiply blend multiplies RGB components: R×R, G×G, B×B. Always results in darker color. See: Vector & Matrix Operations → Vector Operations (component-wise multiplication).'
        },
        {
          name: 'Color Inversion',
          description: 'Screen blend uses complement: 1-color. Inverts, multiplies, inverts again. Results in lighter color. See: Vector & Matrix Operations → Vector Operations (vector subtraction, complement).'
        },
        {
          name: 'Conditional Blending',
          description: 'Overlay uses conditional logic: multiply for dark areas, screen for light areas. Increases contrast. See: Vector & Matrix Operations → Vector Operations (conditional operations).'
        }
      ],
      3: [
        {
          name: 'Convolution',
          description: 'Blur uses convolution kernel. Averages pixel with neighbors. Gaussian blur uses weighted average. See: Vector & Matrix Operations → Matrix Operations (matrix convolution).'
        },
        {
          name: 'Spatial Offset',
          description: 'Shadows offset pixels spatially. shadowOffsetX/Y shifts shadow position relative to object. See: 3D Transformations & Projections → Translation (2D translation).'
        },
        {
          name: 'Gaussian Distribution',
          description: 'Blur uses Gaussian distribution for weighting. Center pixels weighted more than edge pixels. See: Vector & Matrix Operations → Advanced Operations (weighted averages).'
        }
      ],
      4: [
        {
          name: 'Linear Scaling',
          description: 'Brightness multiplies RGB values linearly. Scales color intensity uniformly. See: Vector & Matrix Operations → Vector Operations (scalar multiplication).'
        },
        {
          name: 'Range Expansion',
          description: 'Contrast expands color range around midpoint (0.5). Increases difference between light and dark. See: Animation & Interpolation → Linear Interpolation (range mapping).'
        },
        {
          name: 'Color Space Conversion',
          description: 'Saturation converts RGB to grayscale, then interpolates. Hue rotation converts RGB→HSL→RGB. See: 3D Transformations & Projections → Coordinate Transformations (color space transforms).'
        },
        {
          name: 'Interpolation',
          description: 'Saturation uses linear interpolation between grayscale and color. Controls color intensity. See: Animation & Interpolation → Linear Interpolation (LERP).'
        }
      ],
      5: [
        {
          name: 'Offscreen Rendering',
          description: 'Post-processing uses offscreen canvas. Scene rendered first, then effects applied to result. See: 3D Transformations & Projections → Coordinate Systems (multiple coordinate spaces).'
        },
        {
          name: 'Image Processing',
          description: 'Post-processing treats entire scene as image. Applies effects uniformly to all pixels. See: Vector & Matrix Operations → Matrix Operations (matrix transformations on image data).'
        },
        {
          name: 'Pipeline Architecture',
          description: 'Effects applied in sequence: Render → Effect 1 → Effect 2 → Display. Each stage transforms previous result. See: 3D Transformations & Projections → Matrix Multiplication (composing transformations).'
        }
      ],
      6: [
        {
          name: 'Effect Composition',
          description: 'Multiple effects can be combined. Order matters: blend → filter → post-process. See: 3D Transformations & Projections → Matrix Multiplication (transformation composition).'
        },
        {
          name: 'Performance Optimization',
          description: 'Post-processing cost scales with resolution. Lower resolution = faster processing. See: Vector & Matrix Operations → Matrix Operations (computational complexity).'
        }
      ]
    }
  };

  return concepts[module] && concepts[module][step] ? concepts[module][step] : [];
};

