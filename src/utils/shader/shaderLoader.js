/**
 * Shader loader utility for loading external GLSL shader files
 * Uses Vite's static ?raw imports for build-time optimization
 */

// Import vertex shader
import vertexShaderSource from '../../shaders/vertex.glsl?raw';

// Import fragment shaders - Basic level
import colorShader from '../../shaders/fragment/basic/color.glsl?raw';
import uvShader from '../../shaders/fragment/basic/uv.glsl?raw';
import timeShader from '../../shaders/fragment/basic/time.glsl?raw';
import gradientsShader from '../../shaders/fragment/basic/gradients.glsl?raw';
import shapesShader from '../../shaders/fragment/basic/shapes.glsl?raw';
import colorSpacesShader from '../../shaders/fragment/basic/colorSpaces.glsl?raw';
import mathOperationsShader from '../../shaders/fragment/basic/mathOperations.glsl?raw';
import mathOperationsImageShader from '../../shaders/fragment/basic/mathOperations-image.glsl?raw';
import coordinateTransformationsShader from '../../shaders/fragment/basic/coordinateTransformations.glsl?raw';

// Import fragment shaders - Intermediate level
import noiseShader from '../../shaders/fragment/intermediate/noise.glsl?raw';
import advancedNoiseShader from '../../shaders/fragment/intermediate/advancedNoise.glsl?raw';
import patternsShader from '../../shaders/fragment/intermediate/patterns.glsl?raw';
import distanceShader from '../../shaders/fragment/intermediate/distance.glsl?raw';
import displacementMappingShader from '../../shaders/fragment/intermediate/displacementMapping.glsl?raw';
import stylizedShader from '../../shaders/fragment/intermediate/stylized.glsl?raw';
import textureImageShader from '../../shaders/fragment/texture-image.glsl?raw';
import textureProceduralShader from '../../shaders/fragment/texture-procedural.glsl?raw';
import postprocessShader from '../../shaders/fragment/postprocess-image.glsl?raw';

// Import fragment shaders - Advanced level
import lightingShader from '../../shaders/fragment/advanced/lighting.glsl?raw';
import raymarchingShader from '../../shaders/fragment/advanced/raymarching.glsl?raw';

// Fallback to existing function for shaders not yet externalized
import { getFragmentShader as getFragmentShaderFallback } from './getFragmentShader';

/**
 * Shader registry mapping concepts to their source code
 */
const shaderRegistry = {
  basic: {
    color: colorShader,
    uv: uvShader,
    time: timeShader,
    gradients: gradientsShader,
    shapes: shapesShader,
    colorSpaces: colorSpacesShader,
    mathOperations: mathOperationsShader,
    'mathOperations-image': mathOperationsImageShader,
    coordinateTransformations: coordinateTransformationsShader,
  },
  intermediate: {
    noise: noiseShader,
    advancedNoise: advancedNoiseShader,
    patterns: patternsShader,
    distance: distanceShader,
    displacementMapping: displacementMappingShader,
    stylized: stylizedShader,
    'texture-image': textureImageShader,
    'texture-procedural': textureProceduralShader,
    postprocess: postprocessShader,
  },
  advanced: {
    lighting: lightingShader,
    raymarching: raymarchingShader,
  },
};

/**
 * Get vertex shader source
 * @returns {string} - Vertex shader source code
 */
export function getVertexShader() {
  return vertexShaderSource;
}

/**
 * Get fragment shader source for a specific concept
 * @param {string} shaderLevel - 'basic', 'intermediate', or 'advanced'
 * @param {string} shaderConcept - The shader concept name
 * @param {boolean} useImageTexture - Whether to use image texture variant
 * @returns {string} - Fragment shader source code
 */
export function getFragmentShader(shaderLevel, shaderConcept, useImageTexture = false) {
  // Handle special cases with conditional loading
  let registryKey = shaderConcept;
  
  if (shaderConcept === 'texture') {
    registryKey = useImageTexture ? 'texture-image' : 'texture-procedural';
    shaderLevel = 'intermediate';
  } else if (shaderConcept === 'postprocess') {
    // Postprocess shader handles both image and procedural internally
    registryKey = 'postprocess';
    shaderLevel = 'intermediate';
  } else if (shaderConcept === 'mathOperations' && useImageTexture) {
    registryKey = 'mathOperations-image';
  }
  
  // Try to get from registry
  const shader = shaderRegistry[shaderLevel]?.[registryKey];
  
  if (shader) {
    return shader;
  }
  
  // Fallback to existing function for shaders not yet externalized
  console.warn(`Shader ${shaderLevel}/${shaderConcept} not found in registry, using fallback`);
  return getFragmentShaderFallback(shaderLevel, shaderConcept, useImageTexture);
}
