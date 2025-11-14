export const getShaderGeometricInterpretation = (level, concept) => {
  if (level === 'basic') {
    switch (concept) {
      case 'color':
        return {
          title: 'Color Shader - Uniform Color Output',
          description: 'A solid color shader fills the entire screen with a single color value. Geometrically, this represents a flat, uniform surface with no variation.',
          visualization: 'Uniform Plane',
          details: [
            'Every pixel receives the same color value',
            'Creates a flat, featureless surface',
            'No spatial variation or gradient',
            'Represents the simplest possible visual output',
            'Foundation for more complex shaders'
          ],
          geometricMeaning: 'A uniform color represents a flat plane in color space - all points have identical properties with no spatial relationship.'
        };

      case 'uv':
        return {
          title: 'UV Coordinates - Screen Space Mapping',
          description: 'UV coordinates create a mapping from screen pixels to normalized [0,1] space. This enables spatial relationships and pattern generation.',
          visualization: 'Coordinate Grid',
          details: [
            'UV maps screen position to normalized coordinates',
            'Bottom-left corner: (0, 0)',
            'Top-right corner: (1, 1)',
            'Creates a 2D coordinate system on the screen',
            'Scaling UV creates repeating patterns (tiling)',
            'Enables texture mapping and spatial calculations'
          ],
          geometricMeaning: 'UV coordinates establish a coordinate system on the screen, allowing shaders to create spatial relationships and patterns based on pixel position.'
        };

      case 'time':
        return {
          title: 'Time Animation - Temporal Transformation',
          description: 'Time-based animation creates motion and change over time. Geometrically, this adds a temporal dimension to the 2D screen space.',
          visualization: 'Temporal Wave',
          details: [
            'Time adds a third dimension (temporal) to 2D space',
            'Creates periodic oscillations using sin/cos',
            'Geometrically: waves propagating through time',
            'Each frame represents a slice through time',
            'Animation = sampling a function over time',
            'Creates smooth, continuous transformations'
          ],
          geometricMeaning: 'Time animation transforms static 2D space into dynamic 3D space-time, where each moment represents a different state of the visual system.'
        };

      case 'gradients':
        return {
          title: 'Gradients - Color Interpolation',
          description: 'Gradients create smooth color transitions across space. Linear gradients form color bands along a direction, while radial gradients form concentric color circles.',
          visualization: 'Color Transition',
          details: [
            'Linear gradient: color bands perpendicular to direction vector',
            'Radial gradient: concentric circles centered at a point',
            'Geometrically: scalar field mapping position to color value',
            'Linear: uses dot product to measure position along line',
            'Radial: uses distance to measure position from center',
            'Interpolation factor t determines color blend ratio',
            'Creates smooth, continuous color transitions'
          ],
          geometricMeaning: 'Gradients geometrically represent a scalar field where each point\'s value (interpolation factor) determines its color. Linear gradients create parallel color bands, while radial gradients create circular color rings, both using distance-based calculations to determine color mixing.'
        };

      case 'shapes':
        return {
          title: 'Basic Shapes - Geometric Primitives',
          description: 'Shapes are defined using distance fields - mathematical functions that calculate the distance from any point to the shape\'s surface. This enables precise geometric rendering with smooth edges.',
          visualization: 'Distance Field Visualization',
          details: [
            'Circle: concentric distance rings centered at a point',
            'Rectangle: distance field with sharp corners and straight edges',
            'Line: distance field perpendicular to line direction',
            'Geometrically: each shape defines a scalar field (distance)',
            'Inside shape: distance < threshold (positive mask)',
            'Outside shape: distance > threshold (zero mask)',
            'Edge smoothing: smoothstep creates gradient transition zone',
            'Shape mask: binary or smooth field multiplied by color'
          ],
          geometricMeaning: 'Shapes geometrically represent implicit surfaces defined by distance functions. Circles form concentric rings of equal distance, rectangles form rectangular zones, and lines form parallel bands. The distance field creates a scalar field where each point knows how far it is from the shape, enabling precise geometric rendering and smooth anti-aliasing.'
        };

      case 'colorSpaces':
        return {
          title: 'Color Spaces - Geometric Representation',
          description: 'Color spaces represent colors in different geometric coordinate systems. HSV uses a cylindrical model, while RGB uses a cube. Color mixing operations combine colors using various geometric transformations.',
          visualization: 'Color Space Transformation',
          details: [
            'HSV: Cylindrical coordinate system (hue = angle, saturation = radius, value = height)',
            'RGB: Cubic coordinate system (red, green, blue axes)',
            'HSV to RGB: Geometric transformation from cylinder to cube',
            'Additive blending: Vector addition in RGB space',
            'Multiply blending: Component-wise multiplication',
            'Screen blending: Inverse geometric operation',
            'Overlay blending: Conditional geometric transformation',
            'Color mixing creates new colors in RGB space'
          ],
          geometricMeaning: 'Color spaces geometrically represent colors as points in different coordinate systems. HSV uses a cylindrical model where hue is the angle around the color wheel, saturation is the distance from the center (gray), and value is the height (brightness). RGB uses a cube where each axis represents a primary color. Color mixing operations combine these geometric representations using different mathematical transformations - addition, multiplication, or conditional operations - to create new colors in the RGB space.'
        };

      case 'mathOperations':
        return {
          title: 'Basic Math Operations - Numerical Transformations',
          description: 'Mathematical operations transform numeric values along the number line. Each operation has a geometric interpretation: addition shifts values, multiplication scales them, power creates curves, and interpolation creates smooth transitions.',
          visualization: 'Number Line Transformations',
          details: [
            'Addition: shifts value along number line',
            'Subtraction: shifts value in opposite direction',
            'Multiplication: scales value from origin',
            'Division: creates ratio, scales inversely',
            'Power: creates exponential curves',
            'Modulo: wraps values in repeating cycles',
            'Absolute: reflects negative values to positive',
            'Floor/Ceiling: quantizes to discrete steps',
            'Min/Max: selects boundary values',
            'Clamp: constrains to range segment',
            'Mix: creates linear path between two points'
          ],
          geometricMeaning: 'Mathematical operations geometrically transform values along the number line. Addition and subtraction translate values, multiplication and division scale them, power creates exponential curves, and modulo creates repeating cycles. Floor and ceiling quantize continuous values to discrete steps. Min and max select boundary values, clamp constrains values to a range segment, and mix creates a linear path between two points, enabling smooth transitions and interpolations.'
        };

      case 'coordinateTransformations':
        return {
          title: 'Coordinate Transformations - Space Manipulation',
          description: 'Coordinate transformations manipulate the UV coordinate space itself, creating rotation, translation, scaling, and coordinate system conversions. Geometrically, these represent affine transformations of 2D space.',
          visualization: 'Transformed Coordinate Grid',
          details: [
            'Rotation: rotates entire coordinate grid around a center point, preserving distances and angles',
            'Translation: shifts coordinate grid uniformly in a direction, moving all points by same offset',
            'Scaling: stretches or compresses coordinate grid around a center point, changing distances proportionally',
            'Polar coordinates: converts rectangular grid to circular/radial grid, mapping (x,y) to (angle,radius)',
            'Geometrically: each transformation represents a different way to map screen space',
            'Rotation uses rotation matrix: preserves shape, changes orientation',
            'Translation uses vector addition: preserves shape and orientation, changes position',
            'Scaling uses multiplication: preserves shape proportions if uniform, distorts if non-uniform',
            'Polar conversion: transforms rectangular coordinate system to circular coordinate system',
            'Combined transformations: multiple transformations can be chained together'
          ],
          geometricMeaning: 'Coordinate transformations geometrically represent affine transformations of 2D space. Rotation rotates the entire coordinate system around a pivot point, preserving distances and angles (isometric transformation). Translation shifts the coordinate system uniformly, moving all points by the same vector. Scaling stretches or compresses the coordinate system around a center point, changing distances proportionally. Polar coordinates transform the rectangular Cartesian coordinate system into a circular coordinate system where position is described by angle and radius from a center point. These transformations enable dynamic manipulation of UV space, creating effects like spinning patterns, panning textures, zooming, and radial effects.'
        };

      default:
        return null;
    }
  } else if (level === 'intermediate') {
    switch (concept) {
      case 'noise':
        return {
          title: 'Procedural Noise - Organic Patterns',
          description: 'Noise functions generate pseudo-random patterns that appear natural and organic. Geometrically, noise creates irregular, non-repeating textures.',
          visualization: 'Irregular Surface',
          details: [
            'Noise creates irregular height fields',
            'Each point has random-like but deterministic value',
            'Geometrically: rough, bumpy surface',
            'Smooth interpolation creates continuous variation',
            'Multiple octaves create fractal-like detail',
            'Used to simulate natural phenomena (clouds, terrain, fire)'
          ],
          geometricMeaning: 'Noise generates a continuous but irregular surface in value space, creating the appearance of randomness while maintaining smoothness.'
        };

      case 'patterns':
        return {
          title: 'Pattern Generation - Geometric Tiling',
          description: 'Mathematical patterns create repeating geometric structures. These represent discrete, organized spatial arrangements.',
          visualization: 'Tessellated Grid',
          details: [
            'Patterns create discrete grid cells',
            'Each cell has integer coordinates',
            'Geometrically: tessellation of space',
            'Checkerboard: alternating squares',
            'Stripes: parallel bands',
            'Modulo creates repeating cycles',
            'Floor function creates discrete regions'
          ],
          geometricMeaning: 'Patterns divide space into discrete, repeating units, creating organized geometric structures through mathematical operations on coordinates.'
        };

      case 'distance':
        return {
          title: 'Distance Fields - Radial Geometry',
          description: 'Distance fields calculate distance from points to shapes. Geometrically, this creates concentric circles or spheres around a center point.',
          visualization: 'Concentric Circles',
          details: [
            'Distance creates radial gradients from center',
            'Each distance value forms a circle/sphere',
            'Geometrically: level sets of distance function',
            'Smoothstep creates soft, anti-aliased edges',
            'Distance = radius of circle at that point',
            'Enables smooth shape rendering without polygons'
          ],
          geometricMeaning: 'Distance fields represent space as a scalar field where each point\'s value is its distance to the nearest surface, creating smooth geometric shapes.'
        };

      case 'advancedNoise':
        return {
          title: 'Advanced Noise Functions - Multi-Scale Patterns',
          description: 'Advanced noise functions create complex, natural-looking patterns through multi-scale sampling and coordinate distortion. Geometrically, these represent layered scalar fields with different frequencies.',
          visualization: 'Layered Noise Fields',
          details: [
            'Fractal Noise: multiple layers of noise at different scales (octaves)',
            'Simplex Noise: triangular grid creates smoother gradients than square grid',
            'Worley Noise: cellular patterns defined by distance to feature points',
            'Perlin Noise: classic gradient-based noise on square grid',
            'Domain Warping: distorts coordinate space before sampling, creating organic patterns',
            'Geometrically: each noise type creates a scalar field (height map)',
            'Octaves add detail at multiple scales, creating natural complexity',
            'Lacunarity controls frequency spacing between octaves',
            'Gain controls amplitude decay between octaves'
          ],
          geometricMeaning: 'Advanced noise functions geometrically represent scalar fields (height maps) created through different sampling strategies. Fractal noise layers multiple frequency scales, creating natural detail. Simplex noise uses triangular grids for smoother gradients. Worley noise creates cellular patterns through distance fields. Domain warping distorts the coordinate space itself, creating complex, organic patterns that would be difficult to achieve with simple noise.'
        };

      case 'displacementMapping':
        return {
          title: 'Displacement Mapping - Surface Deformation',
          description: 'Displacement mapping uses height maps to deform surfaces, creating depth and detail. Geometrically, this represents shifting surface points along their normals based on height values.',
          visualization: 'Deformed Surface',
          details: [
            'Height-based: shifts UV coordinates based on height map values',
            'Parallax: view-dependent UV shifting creates depth illusion',
            'Steep Parallax: ray marching finds accurate surface intersection',
            'Geometrically: height map defines a scalar field (elevation)',
            'Surface points are displaced along normal vectors',
            'Parallax creates depth illusion without actual geometry change',
            'Steep parallax uses ray marching for accurate depth perception',
            'Height maps can be from textures or procedural noise'
          ],
          geometricMeaning: 'Displacement mapping geometrically represents deforming a surface based on a height field. Height-based displacement shifts UV coordinates proportionally to height values. Parallax mapping creates view-dependent depth illusion by shifting UV coordinates based on viewing angle and height. Steep parallax mapping uses ray marching to accurately find surface intersections, creating realistic depth perception. The height map acts as a scalar field defining elevation, and the displacement creates the illusion of 3D geometry on a flat surface.'
        };

      case 'stylized':
        return {
          title: 'Stylized/Cartoon Shader - Non-Photorealistic Rendering',
          description: 'Stylized rendering transforms realistic images into cartoon-like, non-photorealistic styles. Geometrically, this represents quantizing continuous lighting and color values into discrete bands, detecting edges, and adding stylized lighting effects.',
          visualization: 'Cartoon-Styled Image',
          details: [
            'Toon/Cel shading: quantizes lighting into discrete bands (like animation cells)',
            'Edge detection: finds boundaries using gradient magnitude (Sobel-like operator)',
            'Color quantization: reduces color depth (posterization effect)',
            'Rim lighting: adds edge glow based on distance from center',
            'Specular highlights: adds stylized shiny spots',
            'Geometrically: transforms continuous scalar fields (lighting, color) into discrete levels',
            'Edge detection creates vector field of intensity gradients',
            'Quantization creates step functions from smooth gradients',
            'Rim lighting uses radial distance to create edge effects'
          ],
          geometricMeaning: 'Stylized rendering geometrically transforms continuous lighting and color fields into discrete, banded representations. Toon shading quantizes the lighting scalar field into discrete bands, creating the characteristic "cel-shaded" look. Edge detection calculates gradient vectors across the image, identifying boundaries where intensity changes rapidly. Color quantization reduces the color space from continuous RGB values to discrete levels, creating a posterization effect. Rim lighting uses radial distance calculations to add edge glow, while specular highlights add localized bright spots. The overall effect transforms smooth, photorealistic gradients into stylized, cartoon-like bands and edges, mimicking traditional animation techniques.'
        };

      case 'texture':
        return {
          title: 'Texture Mapping - Surface Decoration',
          description: 'Texture mapping applies 2D images or patterns to surfaces using UV coordinates. Geometrically, this represents wrapping a flat image around a surface.',
          visualization: 'UV Mapping',
          details: [
            'UV coordinates create a mapping from screen to texture space',
            'Each screen pixel maps to a texture coordinate',
            'Geometrically: projecting 2D texture onto 2D screen',
            'Scaling creates repeating patterns (tiling)',
            'Offset shifts the texture position',
            'Multiple textures can be blended together',
            'Enables realistic surface appearance'
          ],
          geometricMeaning: 'Texture mapping geometrically represents wrapping a 2D image around a surface, where UV coordinates define how each point on the surface corresponds to a point in the texture image.'
        };

      case 'postprocess':
        return {
          title: 'Post-Processing - Image Filtering',
          description: 'Post-processing applies filters to rendered images. Geometrically, this represents sampling and transforming pixel values across the image.',
          visualization: 'Image Filtering',
          details: [
            'Blur: averages nearby pixels in circular/spherical regions',
            'Edge detection: calculates gradient (rate of change)',
            'Geometrically: convolution with kernel matrices',
            'Vignette: radial falloff from center',
            'Chromatic aberration: spatial separation of color channels',
            'Glitch: vector displacement creates spatial distortion (wobble, tearing)',
            'Bloom: extracts bright regions, creates radial glow around them',
            'Color grading: transforms color space (brightness, contrast, saturation)',
            'Ambient occlusion: samples depth in radial directions, darkens occluded areas',
            'Each effect samples multiple pixels and combines them',
            'Creates visual effects without changing geometry'
          ],
          geometricMeaning: 'Post-processing geometrically represents filtering operations on the 2D image plane, where each pixel\'s value is transformed based on its neighbors. Blur uses spatial averaging, edge detection uses gradient vectors, vignette uses radial distance, chromatic aberration uses channel offsets, glitch uses displacement vectors, bloom uses brightness extraction and radial blur, color grading uses color space transformations, and ambient occlusion uses depth sampling in multiple directions to simulate light occlusion.'
        };

      default:
        return null;
    }
  } else { // advanced
    switch (concept) {
      case 'lighting':
        return {
          title: 'Phong Lighting - Surface Illumination',
          description: 'Lighting models simulate how light interacts with surfaces. Geometrically, this creates the appearance of 3D depth and form through shading.',
          visualization: 'Illuminated Surface',
          details: [
            'Normal vectors define surface orientation',
            'Light direction determines illumination angle',
            'Diffuse: brighter when facing light (Lambert\'s law)',
            'Geometrically: cosine of angle between normal and light',
            'Creates depth perception through shading',
            'Ambient provides base illumination',
            'Specular creates highlights on shiny surfaces'
          ],
          geometricMeaning: 'Lighting transforms flat surfaces into 3D-appearing objects by simulating how light rays interact with surface geometry, creating depth through shading gradients.'
        };

      case 'raymarching':
        return {
          title: 'Raymarching - 3D Space Exploration',
          description: 'Raymarching traces rays through 3D space using distance functions. Geometrically, this represents exploring 3D space along straight lines.',
          visualization: 'Ray Tracing',
          details: [
            'Rays are straight lines in 3D space',
            'Each step moves along ray by distance to surface',
            'Geometrically: parametric line equation',
            'Distance function defines implicit surfaces',
            'Marching finds intersection points',
            'Creates smooth shapes without explicit geometry',
            'More flexible than polygon rendering'
          ],
          geometricMeaning: 'Raymarching geometrically represents tracing straight lines through 3D space, using distance functions to find where rays intersect surfaces, enabling rendering of complex implicit shapes.'
        };

      default:
        return null;
    }
  }
};

