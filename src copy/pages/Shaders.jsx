import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import StepByStepSolver from '../components/StepByStepSolver';
import TheoryModal from '../components/TheoryModal';
import ShaderControls from '../components/ShaderControls';
import ShaderCodeDisplay from '../components/ShaderCodeDisplay';
import ShaderEducationalPanels from '../components/ShaderEducationalPanels';
import { getShaderTheory } from '../utils/shaderTheory';
import { getShaderFormulas } from '../utils/shaderFormulas';
import { getShaderGeometricInterpretation } from '../utils/shaderGeometricInterpretation';
import { getShaderMathConcepts } from '../utils/shaderMathConcepts';
import { getVertexShader, getFragmentShader } from '../utils/shader/shaderLoader';
import { getShaderCodeSnippet } from '../utils/shader/getShaderCodeSnippet';
import { getShaderExplanation } from '../utils/shader/getShaderExplanation';
import ShaderReference from '../components/ShaderReference';
import { createShader, createProgram, createTexture, initShaderProgram } from '../utils/shader/webglUtils';

export default function Shaders() {
  const [shaderLevel, setShaderLevel] = useState('basic'); // basic, intermediate, advanced
  const [shaderType, setShaderType] = useState('fragment'); // fragment, vertex, compute
  const [shaderConcept, setShaderConcept] = useState('color'); // color, uv, noise, lighting, etc.
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const textureRef = useRef(null);

  // Shader parameters
  const [color, setColor] = useState({ r: 1.0, g: 0.5, b: 0.0 });
  const [time, setTime] = useState(0);
  const [uvScale, setUvScale] = useState(1.0);
  const [gradientType, setGradientType] = useState('linear'); // 'linear' or 'radial'
  const [gradientStartColor, setGradientStartColor] = useState({ r: 1.0, g: 0.0, b: 0.0 });
  const [gradientEndColor, setGradientEndColor] = useState({ r: 0.0, g: 0.0, b: 1.0 });
  const [gradientAngle, setGradientAngle] = useState(0.0); // For linear gradient (in radians)
  const [gradientCenter, setGradientCenter] = useState({ x: 0.5, y: 0.5 }); // For radial gradient
  const [gradientRadius, setGradientRadius] = useState(0.5); // For radial gradient
  // Basic shapes controls
  const [shapeType, setShapeType] = useState('circle'); // 'circle', 'rectangle', 'line'
  const [shapeCenter, setShapeCenter] = useState({ x: 0.5, y: 0.5 });
  const [shapeSize, setShapeSize] = useState({ x: 0.2, y: 0.2 }); // Radius for circle, width/height for rectangle
  const [shapeColor, setShapeColor] = useState({ r: 1.0, g: 0.0, b: 0.0 });
  const [shapeEdgeSoftness, setShapeEdgeSoftness] = useState(0.02); // For smoothstep edges
  const [lineThickness, setLineThickness] = useState(0.02); // For line shape
  const [lineAngle, setLineAngle] = useState(0.0); // For line angle in radians
  // Color spaces controls
  const [colorSpaceMode, setColorSpaceMode] = useState('hsv'); // 'hsv', 'mixing'
  const [hsvColor, setHsvColor] = useState({ h: 0.0, s: 1.0, v: 1.0 }); // Hue, Saturation, Value
  const [colorMixMode, setColorMixMode] = useState('additive'); // 'additive', 'multiply', 'screen', 'overlay', 'subtract'
  const [colorMixColor1, setColorMixColor1] = useState({ r: 1.0, g: 0.0, b: 0.0 });
  const [colorMixColor2, setColorMixColor2] = useState({ r: 0.0, g: 0.0, b: 1.0 });
  const [colorMixAmount, setColorMixAmount] = useState(0.5); // Blend amount between colors
  // Basic math operations controls
  const [mathOperation, setMathOperation] = useState('add'); // 'add', 'multiply', 'power', 'modulo', 'abs', 'floor', 'min', 'max', 'clamp', 'mix'
  const [mathValue1, setMathValue1] = useState(0.5);
  const [mathValue2, setMathValue2] = useState(0.5);
  const [mathValue3, setMathValue3] = useState(0.5); // For clamp and mix
  const [useImageForMath, setUseImageForMath] = useState(false); // Use image texture for math operations
  // Coordinate transformations controls
  const [transformType, setTransformType] = useState('rotation'); // 'rotation', 'translation', 'scaling', 'polar'
  const [transformAngle, setTransformAngle] = useState(0.0); // Rotation angle in radians
  const [transformTranslation, setTransformTranslation] = useState({ x: 0.0, y: 0.0 }); // Translation offset
  const [transformScale, setTransformScale] = useState({ x: 1.0, y: 1.0 }); // Scale factors
  const [transformCenter, setTransformCenter] = useState({ x: 0.5, y: 0.5 }); // Center point for rotation/scaling
  const [noiseScale, setNoiseScale] = useState(1.0);
  // Advanced noise controls
  const [advancedNoiseType, setAdvancedNoiseType] = useState('fractal'); // 'fractal', 'simplex', 'worley', 'perlin', 'domainWarp'
  const [fractalOctaves, setFractalOctaves] = useState(4.0);
  const [fractalLacunarity, setFractalLacunarity] = useState(2.0);
  const [fractalGain, setFractalGain] = useState(0.5);
  const [worleyScale, setWorleyScale] = useState(5.0);
  const [domainWarpStrength, setDomainWarpStrength] = useState(0.1);
  // Displacement mapping controls
  const [displacementType, setDisplacementType] = useState('height'); // 'height', 'parallax', 'steepParallax'
  const [displacementScale, setDisplacementScale] = useState(0.1);
  const [displacementHeight, setDisplacementHeight] = useState(0.5);
  // Stylized/Cartoon shader controls
  const [toonBands, setToonBands] = useState(4.0);
  const [stylizedEdgeThreshold, setStylizedEdgeThreshold] = useState(0.1);
  const [stylizedEdgeThickness, setStylizedEdgeThickness] = useState(0.02);
  const [colorQuantization, setColorQuantization] = useState(8.0);
  const [rimPower, setRimPower] = useState(2.0);
  const [specularPower, setSpecularPower] = useState(32.0);
  const [rimColor, setRimColor] = useState({ r: 0.5, g: 0.7, b: 1.0 });
  const [specularColor, setSpecularColor] = useState({ r: 1.0, g: 1.0, b: 1.0 });
  const [useImageForStylized, setUseImageForStylized] = useState(true);
  const [lightIntensity, setLightIntensity] = useState(1.0);
  const [textureScale, setTextureScale] = useState(1.0);
  const [textureOffset, setTextureOffset] = useState({ x: 0.0, y: 0.0 });
  const [useImageTexture, setUseImageTexture] = useState(false);
  const [textureImage, setTextureImage] = useState(null);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [postProcessType, setPostProcessType] = useState('blur');
  const [blurAmount, setBlurAmount] = useState(5.0);
  const [edgeThreshold, setEdgeThreshold] = useState(0.5);
  const [vignetteIntensity, setVignetteIntensity] = useState(0.5);
  const [chromaticAberration, setChromaticAberration] = useState(0.01);
  const [glitchIntensity, setGlitchIntensity] = useState(0.1);
  const [bloomIntensity, setBloomIntensity] = useState(0.5);
  const [bloomThreshold, setBloomThreshold] = useState(0.7);
  const [colorGradingBrightness, setColorGradingBrightness] = useState(0.0);
  const [colorGradingContrast, setColorGradingContrast] = useState(1.0);
  const [colorGradingSaturation, setColorGradingSaturation] = useState(1.0);
  const [colorGradingTemperature, setColorGradingTemperature] = useState(0.0);
  const [colorGradingTint, setColorGradingTint] = useState(0.0);
  const [aoIntensity, setAoIntensity] = useState(0.5);
  const [aoRadius, setAoRadius] = useState(0.02);
  const [aoBias, setAoBias] = useState(0.01);
  const [useImageForPostProcess, setUseImageForPostProcess] = useState(true);
  const [showTheory, setShowTheory] = useState(false);

  // Refs to ensure render function always has latest state values
  const gradientTypeRef = useRef(gradientType);
  const gradientStartColorRef = useRef(gradientStartColor);
  const gradientEndColorRef = useRef(gradientEndColor);
  const gradientAngleRef = useRef(gradientAngle);
  const gradientCenterRef = useRef(gradientCenter);
  const gradientRadiusRef = useRef(gradientRadius);
  // Basic shapes refs
  const shapeTypeRef = useRef(shapeType);
  const shapeCenterRef = useRef(shapeCenter);
  const shapeSizeRef = useRef(shapeSize);
  const shapeColorRef = useRef(shapeColor);
  const shapeEdgeSoftnessRef = useRef(shapeEdgeSoftness);
  const lineThicknessRef = useRef(lineThickness);
  const lineAngleRef = useRef(lineAngle);
  // Color spaces refs
  const colorSpaceModeRef = useRef(colorSpaceMode);
  const hsvColorRef = useRef(hsvColor);
  const colorMixModeRef = useRef(colorMixMode);
  const colorMixColor1Ref = useRef(colorMixColor1);
  const colorMixColor2Ref = useRef(colorMixColor2);
  const colorMixAmountRef = useRef(colorMixAmount);
  // Basic math operations refs
  const mathOperationRef = useRef(mathOperation);
  const mathValue1Ref = useRef(mathValue1);
  const mathValue2Ref = useRef(mathValue2);
  const mathValue3Ref = useRef(mathValue3);
  const useImageForMathRef = useRef(useImageForMath);
  // Coordinate transformations refs
  const transformTypeRef = useRef(transformType);
  const transformAngleRef = useRef(transformAngle);
  const transformTranslationRef = useRef(transformTranslation);
  const transformScaleRef = useRef(transformScale);
  const transformCenterRef = useRef(transformCenter);
  const postProcessTypeRef = useRef(postProcessType);
  const blurAmountRef = useRef(blurAmount);
  const edgeThresholdRef = useRef(edgeThreshold);
  const vignetteIntensityRef = useRef(vignetteIntensity);
  const chromaticAberrationRef = useRef(chromaticAberration);
  const glitchIntensityRef = useRef(glitchIntensity);
  const bloomIntensityRef = useRef(bloomIntensity);
  const bloomThresholdRef = useRef(bloomThreshold);
  const colorGradingBrightnessRef = useRef(colorGradingBrightness);
  const colorGradingContrastRef = useRef(colorGradingContrast);
  const colorGradingSaturationRef = useRef(colorGradingSaturation);
  const colorGradingTemperatureRef = useRef(colorGradingTemperature);
  const colorGradingTintRef = useRef(colorGradingTint);
  const aoIntensityRef = useRef(aoIntensity);
  const aoRadiusRef = useRef(aoRadius);
  const aoBiasRef = useRef(aoBias);
  const useImageForPostProcessRef = useRef(useImageForPostProcess);
  const shaderConceptRef = useRef(shaderConcept);
  // Advanced noise refs
  const noiseScaleRef = useRef(noiseScale);
  const advancedNoiseTypeRef = useRef(advancedNoiseType);
  const fractalOctavesRef = useRef(fractalOctaves);
  const fractalLacunarityRef = useRef(fractalLacunarity);
  const fractalGainRef = useRef(fractalGain);
  const worleyScaleRef = useRef(worleyScale);
  const domainWarpStrengthRef = useRef(domainWarpStrength);
  // Displacement mapping refs
  const displacementTypeRef = useRef(displacementType);
  const displacementScaleRef = useRef(displacementScale);
  const displacementHeightRef = useRef(displacementHeight);
  // Stylized shader refs
  const toonBandsRef = useRef(toonBands);
  const stylizedEdgeThresholdRef = useRef(stylizedEdgeThreshold);
  const stylizedEdgeThicknessRef = useRef(stylizedEdgeThickness);
  const colorQuantizationRef = useRef(colorQuantization);
  const rimPowerRef = useRef(rimPower);
  const specularPowerRef = useRef(specularPower);
  const rimColorRef = useRef(rimColor);
  const specularColorRef = useRef(specularColor);
  const useImageForStylizedRef = useRef(useImageForStylized);

  // Update refs when state changes
  useEffect(() => {
    gradientTypeRef.current = gradientType;
  }, [gradientType]);

  useEffect(() => {
    gradientStartColorRef.current = gradientStartColor;
  }, [gradientStartColor]);

  useEffect(() => {
    gradientEndColorRef.current = gradientEndColor;
  }, [gradientEndColor]);

  useEffect(() => {
    gradientAngleRef.current = gradientAngle;
  }, [gradientAngle]);

  useEffect(() => {
    gradientCenterRef.current = gradientCenter;
  }, [gradientCenter]);

  useEffect(() => {
    gradientRadiusRef.current = gradientRadius;
  }, [gradientRadius]);

  // Basic shapes useEffect hooks
  useEffect(() => {
    shapeTypeRef.current = shapeType;
  }, [shapeType]);

  useEffect(() => {
    shapeCenterRef.current = shapeCenter;
  }, [shapeCenter]);

  useEffect(() => {
    shapeSizeRef.current = shapeSize;
  }, [shapeSize]);

  useEffect(() => {
    shapeColorRef.current = shapeColor;
  }, [shapeColor]);

  useEffect(() => {
    shapeEdgeSoftnessRef.current = shapeEdgeSoftness;
  }, [shapeEdgeSoftness]);

  useEffect(() => {
    lineThicknessRef.current = lineThickness;
  }, [lineThickness]);

  useEffect(() => {
    lineAngleRef.current = lineAngle;
  }, [lineAngle]);

  // Color spaces useEffect hooks
  useEffect(() => {
    colorSpaceModeRef.current = colorSpaceMode;
  }, [colorSpaceMode]);

  useEffect(() => {
    hsvColorRef.current = hsvColor;
  }, [hsvColor]);

  useEffect(() => {
    colorMixModeRef.current = colorMixMode;
  }, [colorMixMode]);

  useEffect(() => {
    colorMixColor1Ref.current = colorMixColor1;
  }, [colorMixColor1]);

  useEffect(() => {
    colorMixColor2Ref.current = colorMixColor2;
  }, [colorMixColor2]);

  useEffect(() => {
    colorMixAmountRef.current = colorMixAmount;
  }, [colorMixAmount]);

  // Basic math operations useEffect hooks
  useEffect(() => {
    mathOperationRef.current = mathOperation;
  }, [mathOperation]);

  useEffect(() => {
    mathValue1Ref.current = mathValue1;
  }, [mathValue1]);

  useEffect(() => {
    mathValue2Ref.current = mathValue2;
  }, [mathValue2]);

  useEffect(() => {
    mathValue3Ref.current = mathValue3;
  }, [mathValue3]);

  useEffect(() => {
    useImageForMathRef.current = useImageForMath;
  }, [useImageForMath]);

  useEffect(() => {
    transformTypeRef.current = transformType;
  }, [transformType]);

  useEffect(() => {
    transformAngleRef.current = transformAngle;
  }, [transformAngle]);

  useEffect(() => {
    transformTranslationRef.current = transformTranslation;
  }, [transformTranslation]);

  useEffect(() => {
    transformScaleRef.current = transformScale;
  }, [transformScale]);

  useEffect(() => {
    transformCenterRef.current = transformCenter;
  }, [transformCenter]);

  useEffect(() => {
    postProcessTypeRef.current = postProcessType;
  }, [postProcessType]);

  useEffect(() => {
    blurAmountRef.current = blurAmount;
  }, [blurAmount]);

  useEffect(() => {
    edgeThresholdRef.current = edgeThreshold;
  }, [edgeThreshold]);

  useEffect(() => {
    vignetteIntensityRef.current = vignetteIntensity;
  }, [vignetteIntensity]);

  useEffect(() => {
    chromaticAberrationRef.current = chromaticAberration;
  }, [chromaticAberration]);

  useEffect(() => {
    glitchIntensityRef.current = glitchIntensity;
  }, [glitchIntensity]);

  useEffect(() => {
    bloomIntensityRef.current = bloomIntensity;
  }, [bloomIntensity]);

  useEffect(() => {
    bloomThresholdRef.current = bloomThreshold;
  }, [bloomThreshold]);

  useEffect(() => {
    colorGradingBrightnessRef.current = colorGradingBrightness;
  }, [colorGradingBrightness]);

  useEffect(() => {
    colorGradingContrastRef.current = colorGradingContrast;
  }, [colorGradingContrast]);

  useEffect(() => {
    colorGradingSaturationRef.current = colorGradingSaturation;
  }, [colorGradingSaturation]);

  useEffect(() => {
    colorGradingTemperatureRef.current = colorGradingTemperature;
  }, [colorGradingTemperature]);

  useEffect(() => {
    colorGradingTintRef.current = colorGradingTint;
  }, [colorGradingTint]);

  useEffect(() => {
    aoIntensityRef.current = aoIntensity;
  }, [aoIntensity]);

  useEffect(() => {
    aoRadiusRef.current = aoRadius;
  }, [aoRadius]);

  useEffect(() => {
    aoBiasRef.current = aoBias;
  }, [aoBias]);

  useEffect(() => {
    useImageForPostProcessRef.current = useImageForPostProcess;
  }, [useImageForPostProcess]);

  useEffect(() => {
    shaderConceptRef.current = shaderConcept;
  }, [shaderConcept]);

  // Advanced noise refs updates
  useEffect(() => {
    noiseScaleRef.current = noiseScale;
  }, [noiseScale]);

  useEffect(() => {
    advancedNoiseTypeRef.current = advancedNoiseType;
  }, [advancedNoiseType]);

  useEffect(() => {
    fractalOctavesRef.current = fractalOctaves;
  }, [fractalOctaves]);

  useEffect(() => {
    fractalLacunarityRef.current = fractalLacunarity;
  }, [fractalLacunarity]);

  useEffect(() => {
    fractalGainRef.current = fractalGain;
  }, [fractalGain]);

  useEffect(() => {
    worleyScaleRef.current = worleyScale;
  }, [worleyScale]);

  useEffect(() => {
    domainWarpStrengthRef.current = domainWarpStrength;
  }, [domainWarpStrength]);

  // Displacement mapping refs updates
  useEffect(() => {
    displacementTypeRef.current = displacementType;
  }, [displacementType]);

  useEffect(() => {
    displacementScaleRef.current = displacementScale;
  }, [displacementScale]);

  useEffect(() => {
    displacementHeightRef.current = displacementHeight;
  }, [displacementHeight]);

  // Stylized shader refs updates
  useEffect(() => {
    toonBandsRef.current = toonBands;
  }, [toonBands]);

  useEffect(() => {
    stylizedEdgeThresholdRef.current = stylizedEdgeThreshold;
  }, [stylizedEdgeThreshold]);

  useEffect(() => {
    stylizedEdgeThicknessRef.current = stylizedEdgeThickness;
  }, [stylizedEdgeThickness]);

  useEffect(() => {
    colorQuantizationRef.current = colorQuantization;
  }, [colorQuantization]);

  useEffect(() => {
    rimPowerRef.current = rimPower;
  }, [rimPower]);

  useEffect(() => {
    specularPowerRef.current = specularPower;
  }, [specularPower]);

  useEffect(() => {
    rimColorRef.current = rimColor;
  }, [rimColor]);

  useEffect(() => {
    specularColorRef.current = specularColor;
  }, [specularColor]);

  useEffect(() => {
    useImageForStylizedRef.current = useImageForStylized;
  }, [useImageForStylized]);

  // Load texture image
  useEffect(() => {
    if ((shaderConcept === 'texture' && useImageTexture) || (shaderConcept === 'postprocess' && useImageForPostProcess) || (shaderConcept === 'displacementMapping' && useImageTexture) || (shaderConcept === 'stylized' && useImageForStylized)) {
      // Clear texture cache when switching to image texture
      if (textureRef.current && glRef.current) {
        glRef.current.deleteTexture(textureRef.current);
        textureRef.current = null;
      }
      
      // Only load if not already loaded
      if (!textureImage || !textureLoaded) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setTextureImage(img);
        setTextureLoaded(true);
      };
      img.onerror = () => {
        console.error('Failed to load texture image');
        setTextureLoaded(false);
      };
      img.src = '/cd7944c9-7e7a-4ac8-b4c0-17e1639fe382.webp';
      }
    } else if (shaderConcept !== 'texture' && shaderConcept !== 'postprocess' && shaderConcept !== 'displacementMapping') {
      setTextureLoaded(false);
      // Clear texture cache when switching away from image texture
      if (textureRef.current && glRef.current) {
        glRef.current.deleteTexture(textureRef.current);
        textureRef.current = null;
      }
    }
  }, [shaderConcept, useImageTexture, useImageForPostProcess, textureImage, textureLoaded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl;
    
    // Cleanup previous program
    if (programRef.current) {
      gl.deleteProgram(programRef.current);
      programRef.current = null;
    }
    
    initShader(gl);

    // Define render function inside useEffect to capture latest refs
  const render = (gl) => {
    if (!programRef.current) return;

    gl.useProgram(programRef.current);

    // Set uniforms (only set if they exist in the shader)
    const resolutionLocation = gl.getUniformLocation(programRef.current, 'u_resolution');
    const timeLocation = gl.getUniformLocation(programRef.current, 'u_time');
    const colorLocation = gl.getUniformLocation(programRef.current, 'u_color');
      const gradientTypeLocation = gl.getUniformLocation(programRef.current, 'u_gradientType');
      const gradientStartColorLocation = gl.getUniformLocation(programRef.current, 'u_gradientStartColor');
      const gradientEndColorLocation = gl.getUniformLocation(programRef.current, 'u_gradientEndColor');
      const gradientAngleLocation = gl.getUniformLocation(programRef.current, 'u_gradientAngle');
      const gradientCenterLocation = gl.getUniformLocation(programRef.current, 'u_gradientCenter');
      const gradientRadiusLocation = gl.getUniformLocation(programRef.current, 'u_gradientRadius');
      const shapeTypeLocation = gl.getUniformLocation(programRef.current, 'u_shapeType');
      const shapeCenterLocation = gl.getUniformLocation(programRef.current, 'u_shapeCenter');
      const shapeSizeLocation = gl.getUniformLocation(programRef.current, 'u_shapeSize');
      const shapeColorLocation = gl.getUniformLocation(programRef.current, 'u_shapeColor');
      const shapeEdgeSoftnessLocation = gl.getUniformLocation(programRef.current, 'u_shapeEdgeSoftness');
      const lineThicknessLocation = gl.getUniformLocation(programRef.current, 'u_lineThickness');
      const lineAngleLocation = gl.getUniformLocation(programRef.current, 'u_lineAngle');
      const colorSpaceModeLocation = gl.getUniformLocation(programRef.current, 'u_colorSpaceMode');
      const hsvColorLocation = gl.getUniformLocation(programRef.current, 'u_hsvColor');
      const colorMixModeLocation = gl.getUniformLocation(programRef.current, 'u_colorMixMode');
      const colorMixColor1Location = gl.getUniformLocation(programRef.current, 'u_colorMixColor1');
      const colorMixColor2Location = gl.getUniformLocation(programRef.current, 'u_colorMixColor2');
      const colorMixAmountLocation = gl.getUniformLocation(programRef.current, 'u_colorMixAmount');
      const mathOperationLocation = gl.getUniformLocation(programRef.current, 'u_mathOperation');
      const mathValue1Location = gl.getUniformLocation(programRef.current, 'u_mathValue1');
      const mathValue2Location = gl.getUniformLocation(programRef.current, 'u_mathValue2');
      const mathValue3Location = gl.getUniformLocation(programRef.current, 'u_mathValue3');
      const useImageForMathLocation = gl.getUniformLocation(programRef.current, 'u_useImageTexture');
      const transformTypeLocation = gl.getUniformLocation(programRef.current, 'u_transformType');
      const transformAngleLocation = gl.getUniformLocation(programRef.current, 'u_transformAngle');
      const transformTranslationLocation = gl.getUniformLocation(programRef.current, 'u_transformTranslation');
      const transformScaleLocation = gl.getUniformLocation(programRef.current, 'u_transformScale');
      const transformCenterLocation = gl.getUniformLocation(programRef.current, 'u_transformCenter');
    const uvScaleLocation = gl.getUniformLocation(programRef.current, 'u_uvScale');
    const noiseScaleLocation = gl.getUniformLocation(programRef.current, 'u_noiseScale');
    const lightIntensityLocation = gl.getUniformLocation(programRef.current, 'u_lightIntensity');
    const textureScaleLocation = gl.getUniformLocation(programRef.current, 'u_textureScale');
    const textureOffsetLocation = gl.getUniformLocation(programRef.current, 'u_textureOffset');
    const textureLocation = gl.getUniformLocation(programRef.current, 'u_texture');
      const blurAmountLocation = gl.getUniformLocation(programRef.current, 'u_blurAmount');
      const edgeThresholdLocation = gl.getUniformLocation(programRef.current, 'u_edgeThreshold');
      const vignetteIntensityLocation = gl.getUniformLocation(programRef.current, 'u_vignetteIntensity');
      const chromaticAberrationLocation = gl.getUniformLocation(programRef.current, 'u_chromaticAberration');
      const glitchIntensityLocation = gl.getUniformLocation(programRef.current, 'u_glitchIntensity');
      const bloomIntensityLocation = gl.getUniformLocation(programRef.current, 'u_bloomIntensity');
      const bloomThresholdLocation = gl.getUniformLocation(programRef.current, 'u_bloomThreshold');
      const colorGradingBrightnessLocation = gl.getUniformLocation(programRef.current, 'u_colorGradingBrightness');
      const colorGradingContrastLocation = gl.getUniformLocation(programRef.current, 'u_colorGradingContrast');
      const colorGradingSaturationLocation = gl.getUniformLocation(programRef.current, 'u_colorGradingSaturation');
      const colorGradingTemperatureLocation = gl.getUniformLocation(programRef.current, 'u_colorGradingTemperature');
      const colorGradingTintLocation = gl.getUniformLocation(programRef.current, 'u_colorGradingTint');
      const aoIntensityLocation = gl.getUniformLocation(programRef.current, 'u_aoIntensity');
      const aoRadiusLocation = gl.getUniformLocation(programRef.current, 'u_aoRadius');
      const aoBiasLocation = gl.getUniformLocation(programRef.current, 'u_aoBias');
      const effectTypeLocation = gl.getUniformLocation(programRef.current, 'u_effectType');
      const useImageTextureLocation = gl.getUniformLocation(programRef.current, 'u_useImageTexture');

    if (resolutionLocation) gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    if (timeLocation) gl.uniform1f(timeLocation, time);
    if (colorLocation) gl.uniform3f(colorLocation, color.r, color.g, color.b);
      if (gradientTypeLocation) gl.uniform1i(gradientTypeLocation, gradientTypeRef.current === 'linear' ? 0 : 1);
      if (gradientStartColorLocation) gl.uniform3f(gradientStartColorLocation, gradientStartColorRef.current.r, gradientStartColorRef.current.g, gradientStartColorRef.current.b);
      if (gradientEndColorLocation) gl.uniform3f(gradientEndColorLocation, gradientEndColorRef.current.r, gradientEndColorRef.current.g, gradientEndColorRef.current.b);
      if (gradientAngleLocation) gl.uniform1f(gradientAngleLocation, gradientAngleRef.current);
      if (gradientCenterLocation) gl.uniform2f(gradientCenterLocation, gradientCenterRef.current.x, gradientCenterRef.current.y);
      if (gradientRadiusLocation) gl.uniform1f(gradientRadiusLocation, gradientRadiusRef.current);
      if (shapeTypeLocation) gl.uniform1i(shapeTypeLocation, shapeTypeRef.current === 'circle' ? 0 : shapeTypeRef.current === 'rectangle' ? 1 : 2);
      if (shapeCenterLocation) gl.uniform2f(shapeCenterLocation, shapeCenterRef.current.x, shapeCenterRef.current.y);
      if (shapeSizeLocation) gl.uniform2f(shapeSizeLocation, shapeSizeRef.current.x, shapeSizeRef.current.y);
      if (shapeColorLocation) gl.uniform3f(shapeColorLocation, shapeColorRef.current.r, shapeColorRef.current.g, shapeColorRef.current.b);
      if (shapeEdgeSoftnessLocation) gl.uniform1f(shapeEdgeSoftnessLocation, shapeEdgeSoftnessRef.current);
      if (lineThicknessLocation) gl.uniform1f(lineThicknessLocation, lineThicknessRef.current);
      if (lineAngleLocation) gl.uniform1f(lineAngleLocation, lineAngleRef.current);
      if (colorSpaceModeLocation) gl.uniform1i(colorSpaceModeLocation, colorSpaceModeRef.current === 'hsv' ? 0 : 1);
      if (hsvColorLocation) gl.uniform3f(hsvColorLocation, hsvColorRef.current.h, hsvColorRef.current.s, hsvColorRef.current.v);
      if (colorMixModeLocation) {
        const modeMap = { 'additive': 0, 'multiply': 1, 'screen': 2, 'overlay': 3, 'subtract': 4 };
        gl.uniform1i(colorMixModeLocation, modeMap[colorMixModeRef.current] || 0);
      }
      if (colorMixColor1Location) gl.uniform3f(colorMixColor1Location, colorMixColor1Ref.current.r, colorMixColor1Ref.current.g, colorMixColor1Ref.current.b);
      if (colorMixColor2Location) gl.uniform3f(colorMixColor2Location, colorMixColor2Ref.current.r, colorMixColor2Ref.current.g, colorMixColor2Ref.current.b);
      if (colorMixAmountLocation) gl.uniform1f(colorMixAmountLocation, colorMixAmountRef.current);
      if (mathOperationLocation) {
        const opMap = { 'add': 0, 'subtract': 1, 'multiply': 2, 'divide': 3, 'power': 4, 'modulo': 5, 'abs': 6, 'floor': 7, 'ceil': 8, 'min': 9, 'max': 10, 'clamp': 11, 'mix': 12 };
        gl.uniform1i(mathOperationLocation, opMap[mathOperationRef.current] || 0);
      }
      if (mathValue1Location) gl.uniform1f(mathValue1Location, mathValue1Ref.current);
      if (mathValue2Location) gl.uniform1f(mathValue2Location, mathValue2Ref.current);
      if (mathValue3Location) gl.uniform1f(mathValue3Location, mathValue3Ref.current);
      if (useImageForMathLocation) gl.uniform1i(useImageForMathLocation, useImageForMathRef.current ? 1 : 0);
      if (transformTypeLocation) {
        const typeMap = { 'rotation': 0, 'translation': 1, 'scaling': 2, 'polar': 3 };
        gl.uniform1i(transformTypeLocation, typeMap[transformTypeRef.current] || 0);
      }
      if (transformAngleLocation) gl.uniform1f(transformAngleLocation, transformAngleRef.current);
      if (transformTranslationLocation) gl.uniform2f(transformTranslationLocation, transformTranslationRef.current.x, transformTranslationRef.current.y);
      if (transformScaleLocation) gl.uniform2f(transformScaleLocation, transformScaleRef.current.x, transformScaleRef.current.y);
      if (transformCenterLocation) gl.uniform2f(transformCenterLocation, transformCenterRef.current.x, transformCenterRef.current.y);
    if (uvScaleLocation) gl.uniform1f(uvScaleLocation, uvScale);
    if (noiseScaleLocation) gl.uniform1f(noiseScaleLocation, noiseScaleRef.current);
    if (lightIntensityLocation) gl.uniform1f(lightIntensityLocation, lightIntensity);
    // Advanced noise uniforms
    const advancedNoiseTypeLocation = gl.getUniformLocation(programRef.current, 'u_noiseType');
    const fractalOctavesLocation = gl.getUniformLocation(programRef.current, 'u_fractalOctaves');
    const fractalLacunarityLocation = gl.getUniformLocation(programRef.current, 'u_fractalLacunarity');
    const fractalGainLocation = gl.getUniformLocation(programRef.current, 'u_fractalGain');
    const worleyScaleLocation = gl.getUniformLocation(programRef.current, 'u_worleyScale');
    const domainWarpStrengthLocation = gl.getUniformLocation(programRef.current, 'u_domainWarpStrength');
    if (advancedNoiseTypeLocation) {
      const typeMap = { 'fractal': 0, 'simplex': 1, 'worley': 2, 'perlin': 3, 'domainWarp': 4 };
      gl.uniform1i(advancedNoiseTypeLocation, typeMap[advancedNoiseTypeRef.current] || 0);
    }
    if (fractalOctavesLocation) gl.uniform1f(fractalOctavesLocation, fractalOctavesRef.current);
    if (fractalLacunarityLocation) gl.uniform1f(fractalLacunarityLocation, fractalLacunarityRef.current);
    if (fractalGainLocation) gl.uniform1f(fractalGainLocation, fractalGainRef.current);
    if (worleyScaleLocation) gl.uniform1f(worleyScaleLocation, worleyScaleRef.current);
    if (domainWarpStrengthLocation) gl.uniform1f(domainWarpStrengthLocation, domainWarpStrengthRef.current);
    // Displacement mapping uniforms
    const displacementTypeLocation = gl.getUniformLocation(programRef.current, 'u_displacementType');
    const displacementScaleLocation = gl.getUniformLocation(programRef.current, 'u_displacementScale');
    const displacementHeightLocation = gl.getUniformLocation(programRef.current, 'u_displacementHeight');
    if (displacementTypeLocation) {
      const typeMap = { 'height': 0, 'parallax': 1, 'steepParallax': 2 };
      gl.uniform1i(displacementTypeLocation, typeMap[displacementTypeRef.current] || 0);
    }
    if (displacementScaleLocation) gl.uniform1f(displacementScaleLocation, displacementScaleRef.current);
    if (displacementHeightLocation) gl.uniform1f(displacementHeightLocation, displacementHeightRef.current);
    // Stylized shader uniforms
    const toonBandsLocation = gl.getUniformLocation(programRef.current, 'u_toonBands');
    const stylizedEdgeThresholdLocation = gl.getUniformLocation(programRef.current, 'u_edgeThreshold');
    const stylizedEdgeThicknessLocation = gl.getUniformLocation(programRef.current, 'u_edgeThickness');
    const colorQuantizationLocation = gl.getUniformLocation(programRef.current, 'u_colorQuantization');
    const rimPowerLocation = gl.getUniformLocation(programRef.current, 'u_rimPower');
    const specularPowerLocation = gl.getUniformLocation(programRef.current, 'u_specularPower');
    const rimColorLocation = gl.getUniformLocation(programRef.current, 'u_rimColor');
    const specularColorLocation = gl.getUniformLocation(programRef.current, 'u_specularColor');
    if (toonBandsLocation) gl.uniform1f(toonBandsLocation, toonBandsRef.current);
    if (stylizedEdgeThresholdLocation) gl.uniform1f(stylizedEdgeThresholdLocation, stylizedEdgeThresholdRef.current);
    if (stylizedEdgeThicknessLocation) gl.uniform1f(stylizedEdgeThicknessLocation, stylizedEdgeThicknessRef.current);
    if (colorQuantizationLocation) gl.uniform1f(colorQuantizationLocation, colorQuantizationRef.current);
    if (rimPowerLocation) gl.uniform1f(rimPowerLocation, rimPowerRef.current);
    if (specularPowerLocation) gl.uniform1f(specularPowerLocation, specularPowerRef.current);
    if (rimColorLocation) gl.uniform3f(rimColorLocation, rimColorRef.current.r, rimColorRef.current.g, rimColorRef.current.b);
    if (specularColorLocation) gl.uniform3f(specularColorLocation, specularColorRef.current.r, specularColorRef.current.g, specularColorRef.current.b);
    if (textureScaleLocation) gl.uniform1f(textureScaleLocation, textureScale);
    if (textureOffsetLocation) gl.uniform2f(textureOffsetLocation, textureOffset.x, textureOffset.y);
      if (blurAmountLocation) gl.uniform1f(blurAmountLocation, blurAmountRef.current);
      if (edgeThresholdLocation) gl.uniform1f(edgeThresholdLocation, edgeThresholdRef.current);
      if (vignetteIntensityLocation) gl.uniform1f(vignetteIntensityLocation, vignetteIntensityRef.current);
      if (chromaticAberrationLocation) gl.uniform1f(chromaticAberrationLocation, chromaticAberrationRef.current);
      if (glitchIntensityLocation) gl.uniform1f(glitchIntensityLocation, glitchIntensityRef.current);
      if (bloomIntensityLocation) gl.uniform1f(bloomIntensityLocation, bloomIntensityRef.current);
      if (bloomThresholdLocation) gl.uniform1f(bloomThresholdLocation, bloomThresholdRef.current);
      if (colorGradingBrightnessLocation) gl.uniform1f(colorGradingBrightnessLocation, colorGradingBrightnessRef.current);
      if (colorGradingContrastLocation) gl.uniform1f(colorGradingContrastLocation, colorGradingContrastRef.current);
      if (colorGradingSaturationLocation) gl.uniform1f(colorGradingSaturationLocation, colorGradingSaturationRef.current);
      if (colorGradingTemperatureLocation) gl.uniform1f(colorGradingTemperatureLocation, colorGradingTemperatureRef.current);
      if (colorGradingTintLocation) gl.uniform1f(colorGradingTintLocation, colorGradingTintRef.current);
      if (aoIntensityLocation) gl.uniform1f(aoIntensityLocation, aoIntensityRef.current);
      if (aoRadiusLocation) gl.uniform1f(aoRadiusLocation, aoRadiusRef.current);
      if (aoBiasLocation) gl.uniform1f(aoBiasLocation, aoBiasRef.current);
      if (effectTypeLocation !== null && shaderConceptRef.current === 'postprocess') {
        // Convert postProcessType string to integer: blur=0, edge=1, vignette=2, chromatic=3, glitch=4, bloom=5, colorGrading=6, ao=7
        const effectTypeMap = { 'blur': 0, 'edge': 1, 'vignette': 2, 'chromatic': 3, 'glitch': 4, 'bloom': 5, 'colorGrading': 6, 'ao': 7 };
        const effectType = effectTypeMap[postProcessTypeRef.current] ?? 0;
        gl.uniform1i(effectTypeLocation, effectType);
      }
      if (useImageTextureLocation !== null) {
        if (shaderConceptRef.current === 'postprocess') {
          gl.uniform1i(useImageTextureLocation, useImageForPostProcessRef.current && textureImage && textureLoaded ? 1 : 0);
        } else if (shaderConceptRef.current === 'displacementMapping') {
          gl.uniform1i(useImageTextureLocation, useImageTexture && textureImage && textureLoaded ? 1 : 0);
        } else if (shaderConceptRef.current === 'stylized') {
          gl.uniform1i(useImageTextureLocation, useImageForStylizedRef.current && textureImage && textureLoaded ? 1 : 0);
        }
      }

      // Handle image texture for texture, postprocess, mathOperations, displacementMapping, and stylized shaders
      if ((shaderConceptRef.current === 'texture' && useImageTexture && textureImage && textureLoaded) ||
          (shaderConceptRef.current === 'postprocess' && useImageForPostProcessRef.current && textureImage && textureLoaded) ||
          (shaderConceptRef.current === 'mathOperations' && useImageForMathRef.current && textureImage && textureLoaded) ||
          (shaderConceptRef.current === 'displacementMapping' && useImageTexture && textureImage && textureLoaded) ||
          (shaderConceptRef.current === 'stylized' && useImageForStylizedRef.current && textureImage && textureLoaded)) {
      // Create texture only once and cache it
      if (!textureRef.current) {
        textureRef.current = createTexture(gl, textureImage);
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
      if (textureLocation) {
        gl.uniform1i(textureLocation, 0);
      }
      } else if (textureRef.current && shaderConceptRef.current !== 'texture' && shaderConceptRef.current !== 'postprocess' && !(shaderConceptRef.current === 'mathOperations' && useImageForMathRef.current) && !(shaderConceptRef.current === 'displacementMapping' && useImageTexture) && !(shaderConceptRef.current === 'stylized' && useImageForStylizedRef.current)) {
      // Clean up texture when not using image texture
      gl.deleteTexture(textureRef.current);
      textureRef.current = null;
    }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

    let animationFrameId;
    const animate = () => {
      setTime(prev => prev + 0.01);
      if (programRef.current) {
        render(gl);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (programRef.current) {
        gl.deleteProgram(programRef.current);
        programRef.current = null;
      }
      if (textureRef.current && gl) {
        gl.deleteTexture(textureRef.current);
        textureRef.current = null;
      }
    };
  }, [shaderConcept, color, uvScale, noiseScale, lightIntensity, textureScale, textureOffset, useImageTexture, textureLoaded, useImageForPostProcess]);

  const initShader = (gl) => {
    const vertexShaderSource = getVertexShader();
    // Determine correct useImageTexture flag based on shader concept
    let useImageFlag = useImageTexture;
    if (shaderConcept === 'stylized') {
      useImageFlag = useImageForStylized;
    } else if (shaderConcept === 'postprocess') {
      useImageFlag = useImageForPostProcess;
    } else if (shaderConcept === 'mathOperations') {
      useImageFlag = useImageForMath;
    }
    const fragmentShaderSource = getFragmentShader(shaderLevel, shaderConcept, useImageFlag);

    const program = initShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) return;

    programRef.current = program;
  };

  // Wrapper functions that call the imported utilities with state
  const getShaderCodeSnippetWrapper = () => {
    return getShaderCodeSnippet(shaderLevel, shaderConcept, {
      color,
      uvScale,
      noiseScale,
      lightIntensity,
      time,
      textureScale,
      textureOffset,
      useImageTexture,
      blurAmount,
      edgeThreshold,
      vignetteIntensity,
      chromaticAberration,
      glitchIntensity,
      bloomIntensity,
      bloomThreshold,
      colorGradingBrightness,
      colorGradingContrast,
      colorGradingSaturation,
      colorGradingTemperature,
      colorGradingTint,
      aoIntensity,
      aoRadius,
      aoBias,
      gradientType,
      gradientStartColor,
      gradientEndColor,
      gradientAngle,
      gradientCenter,
      gradientRadius,
      shapeType,
      shapeCenter,
      shapeSize,
      shapeColor,
      shapeEdgeSoftness,
      lineThickness,
      lineAngle,
      colorSpaceMode,
      hsvColor,
      colorMixMode,
      colorMixColor1,
      colorMixColor2,
      colorMixAmount,
      mathOperation,
      mathValue1,
      mathValue2,
      mathValue3,
      transformType,
      transformAngle,
      transformTranslation,
      transformScale,
      transformCenter,
      postProcessType,
      advancedNoiseType,
      fractalOctaves,
      fractalLacunarity,
      fractalGain,
      worleyScale,
      domainWarpStrength,
      displacementType,
      displacementScale,
      displacementHeight,
      toonBands,
      stylizedEdgeThreshold,
      stylizedEdgeThickness,
      colorQuantization,
      rimPower,
      specularPower,
      rimColor,
      specularColor,
      useImageForStylized
    });
  };

  const getShaderExplanationWrapper = () => {
    return getShaderExplanation(shaderLevel, shaderConcept, {
      color,
      uvScale,
      noiseScale,
      lightIntensity,
      time,
      textureScale,
      textureOffset,
      blurAmount,
      edgeThreshold,
      vignetteIntensity,
      chromaticAberration,
      glitchIntensity,
      bloomIntensity,
      bloomThreshold,
      colorGradingBrightness,
      colorGradingContrast,
      colorGradingSaturation,
      colorGradingTemperature,
      colorGradingTint,
      aoIntensity,
      aoRadius,
      aoBias,
      gradientType,
      gradientStartColor,
      gradientEndColor,
      gradientAngle,
      gradientCenter,
      gradientRadius,
      shapeType,
      shapeCenter,
      shapeSize,
      shapeColor,
      shapeEdgeSoftness,
      lineThickness,
      lineAngle,
      colorSpaceMode,
      hsvColor,
      colorMixMode,
      colorMixColor1,
      colorMixColor2,
      colorMixAmount,
      mathOperation,
      mathValue1,
      mathValue2,
      mathValue3,
      transformType,
      transformAngle,
      transformTranslation,
      transformScale,
      transformCenter,
      postProcessType,
      advancedNoiseType,
      fractalOctaves,
      fractalLacunarity,
      fractalGain,
      worleyScale,
      domainWarpStrength,
      displacementType,
      displacementScale,
      displacementHeight,
      toonBands,
      stylizedEdgeThreshold,
      stylizedEdgeThickness,
      colorQuantization,
      rimPower,
      specularPower,
      rimColor,
      specularColor,
      useImageForStylized
    });
  };

  const explanation = getShaderExplanationWrapper();

  const theory = getShaderTheory(shaderLevel, shaderConcept);
  const formulas = getShaderFormulas(shaderLevel, shaderConcept, {
    color,
    uvScale,
    noiseScale,
    lightIntensity,
    time,
    textureScale,
    textureOffset,
    blurAmount,
    edgeThreshold,
    vignetteIntensity,
    chromaticAberration,
    glitchIntensity,
    bloomIntensity,
    bloomThreshold,
    colorGradingBrightness,
    colorGradingContrast,
    colorGradingSaturation,
    colorGradingTemperature,
    colorGradingTint,
    aoIntensity,
    aoRadius,
    aoBias,
    gradientType,
    gradientStartColor,
    gradientEndColor,
    gradientAngle,
    gradientCenter,
    gradientRadius,
    shapeType,
    shapeCenter,
    shapeSize,
    shapeColor,
    shapeEdgeSoftness,
    lineThickness,
    lineAngle,
    colorSpaceMode,
    hsvColor,
    colorMixMode,
    colorMixColor1,
    colorMixColor2,
    colorMixAmount,
    mathOperation,
    mathValue1,
    mathValue2,
    mathValue3,
    transformType,
    transformAngle,
    transformTranslation,
    transformScale,
    transformCenter,
    advancedNoiseType,
    fractalOctaves,
    fractalLacunarity,
    fractalGain,
    worleyScale,
    domainWarpStrength,
    displacementType,
    displacementScale,
    displacementHeight
  });
  const geometricInterpretation = getShaderGeometricInterpretation(shaderLevel, shaderConcept);
  const mathConcepts = getShaderMathConcepts(
    shaderLevel, 
    shaderConcept, 
    shaderConcept === 'postprocess' ? postProcessType : null
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/" 
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
              <Link 
                to="/shader/glitch-demo" 
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 bg-purple-100 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors"
              >
                🎨 Glitch Demo
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-purple-900 mb-2">Shader Programming</h1>
            <p className="text-purple-700">Learn shader math and programming from basic to advanced</p>
          </div>
        </div>

        {/* Shader Reference */}
        <ShaderReference />

        {/* Level Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Shader Level</h2>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setShaderLevel('basic');
                setShaderConcept('color');
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                shaderLevel === 'basic'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => {
                setShaderLevel('intermediate');
                setShaderConcept('noise');
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                shaderLevel === 'intermediate'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              Intermediate
            </button>
            <button
              onClick={() => {
                setShaderLevel('advanced');
                setShaderConcept('lighting');
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                shaderLevel === 'advanced'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              Advanced
            </button>
          </div>
        </div>

        {/* Concept Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-purple-900">Shader Concept</h2>
            {theory && (
              <button
                onClick={() => setShowTheory(!showTheory)}
                className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                  showTheory
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50'
                }`}
              >
                <HelpCircle size={18} /> Theory
              </button>
            )}
          </div>
          <select
            value={shaderConcept}
            onChange={(e) => setShaderConcept(e.target.value)}
            className="w-full p-3 border-2 border-purple-300 rounded-lg text-lg"
          >
            {shaderLevel === 'basic' && (
              <>
                <option value="color">1. Solid Color</option>
                <option value="mathOperations">2. Basic Math Operations</option>
                <option value="uv">3. UV Coordinates</option>
                <option value="time">4. Time Animation</option>
                <option value="gradients">5. Gradients (Linear & Radial)</option>
                <option value="shapes">6. Basic Shapes</option>
                <option value="colorSpaces">7. Color Spaces & Transformations</option>
                <option value="coordinateTransformations">8. Coordinate Transformations</option>
              </>
            )}
            {shaderLevel === 'intermediate' && (
              <>
                <option value="noise">1. Procedural Noise</option>
                <option value="advancedNoise">2. Advanced Noise Functions</option>
                <option value="patterns">3. Patterns</option>
                <option value="distance">4. Distance Fields</option>
                <option value="texture">5. Textures & Texture Mapping</option>
                <option value="displacementMapping">6. Displacement Mapping</option>
                <option value="stylized">7. Stylized/Cartoon Shader</option>
                <option value="postprocess">8. Post-Processing Effects</option>
              </>
            )}
            {shaderLevel === 'advanced' && (
              <>
                <option value="lighting">1. Lighting (Phong)</option>
                <option value="raymarching">2. Raymarching</option>
              </>
            )}
          </select>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Visualization and Controls */}
          <div className="space-y-6">
            {/* Shader Canvas */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-purple-900 mb-4">Shader Output</h2>
              <canvas
                ref={canvasRef}
                width={600}
                height={600}
                className="w-full border-2 border-purple-300 rounded-lg bg-black"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>

            {/* Controls */}
            <ShaderControls
              shaderLevel={shaderLevel}
              shaderConcept={shaderConcept}
              color={color}
              setColor={setColor}
              uvScale={uvScale}
              setUvScale={setUvScale}
              gradientType={gradientType}
              setGradientType={setGradientType}
              gradientStartColor={gradientStartColor}
              setGradientStartColor={setGradientStartColor}
              gradientEndColor={gradientEndColor}
              setGradientEndColor={setGradientEndColor}
              gradientAngle={gradientAngle}
              setGradientAngle={setGradientAngle}
              gradientCenter={gradientCenter}
              setGradientCenter={setGradientCenter}
              gradientRadius={gradientRadius}
              setGradientRadius={setGradientRadius}
              shapeType={shapeType}
              setShapeType={setShapeType}
              shapeCenter={shapeCenter}
              setShapeCenter={setShapeCenter}
              shapeSize={shapeSize}
              setShapeSize={setShapeSize}
              shapeColor={shapeColor}
              setShapeColor={setShapeColor}
              shapeEdgeSoftness={shapeEdgeSoftness}
              setShapeEdgeSoftness={setShapeEdgeSoftness}
              lineThickness={lineThickness}
              setLineThickness={setLineThickness}
              lineAngle={lineAngle}
              setLineAngle={setLineAngle}
              mathOperation={mathOperation}
              setMathOperation={setMathOperation}
              mathValue1={mathValue1}
              setMathValue1={setMathValue1}
              mathValue2={mathValue2}
              setMathValue2={setMathValue2}
              mathValue3={mathValue3}
              setMathValue3={setMathValue3}
              useImageForMath={useImageForMath}
              setUseImageForMath={setUseImageForMath}
              transformType={transformType}
              setTransformType={setTransformType}
              transformAngle={transformAngle}
              setTransformAngle={setTransformAngle}
              transformTranslation={transformTranslation}
              setTransformTranslation={setTransformTranslation}
              transformScale={transformScale}
              setTransformScale={setTransformScale}
              transformCenter={transformCenter}
              setTransformCenter={setTransformCenter}
              colorSpaceMode={colorSpaceMode}
              setColorSpaceMode={setColorSpaceMode}
              hsvColor={hsvColor}
              setHsvColor={setHsvColor}
              colorMixMode={colorMixMode}
              setColorMixMode={setColorMixMode}
              colorMixColor1={colorMixColor1}
              setColorMixColor1={setColorMixColor1}
              colorMixColor2={colorMixColor2}
              setColorMixColor2={setColorMixColor2}
              colorMixAmount={colorMixAmount}
              setColorMixAmount={setColorMixAmount}
              noiseScale={noiseScale}
              setNoiseScale={setNoiseScale}
              advancedNoiseType={advancedNoiseType}
              setAdvancedNoiseType={setAdvancedNoiseType}
              fractalOctaves={fractalOctaves}
              setFractalOctaves={setFractalOctaves}
              fractalLacunarity={fractalLacunarity}
              setFractalLacunarity={setFractalLacunarity}
              fractalGain={fractalGain}
              setFractalGain={setFractalGain}
              worleyScale={worleyScale}
              setWorleyScale={setWorleyScale}
              domainWarpStrength={domainWarpStrength}
              setDomainWarpStrength={setDomainWarpStrength}
              displacementType={displacementType}
              setDisplacementType={setDisplacementType}
              displacementScale={displacementScale}
              setDisplacementScale={setDisplacementScale}
              displacementHeight={displacementHeight}
              setDisplacementHeight={setDisplacementHeight}
              toonBands={toonBands}
              setToonBands={setToonBands}
              stylizedEdgeThreshold={stylizedEdgeThreshold}
              setStylizedEdgeThreshold={setStylizedEdgeThreshold}
              stylizedEdgeThickness={stylizedEdgeThickness}
              setStylizedEdgeThickness={setStylizedEdgeThickness}
              colorQuantization={colorQuantization}
              setColorQuantization={setColorQuantization}
              rimPower={rimPower}
              setRimPower={setRimPower}
              specularPower={specularPower}
              setSpecularPower={setSpecularPower}
              rimColor={rimColor}
              setRimColor={setRimColor}
              specularColor={specularColor}
              setSpecularColor={setSpecularColor}
              useImageForStylized={useImageForStylized}
              setUseImageForStylized={setUseImageForStylized}
              lightIntensity={lightIntensity}
              setLightIntensity={setLightIntensity}
              useImageTexture={useImageTexture}
              setUseImageTexture={setUseImageTexture}
              textureScale={textureScale}
              setTextureScale={setTextureScale}
              textureOffset={textureOffset}
              setTextureOffset={setTextureOffset}
              textureLoaded={textureLoaded}
              postProcessType={postProcessType}
              setPostProcessType={setPostProcessType}
              useImageForPostProcess={useImageForPostProcess}
              setUseImageForPostProcess={setUseImageForPostProcess}
              blurAmount={blurAmount}
              setBlurAmount={setBlurAmount}
              edgeThreshold={edgeThreshold}
              setEdgeThreshold={setEdgeThreshold}
              vignetteIntensity={vignetteIntensity}
              setVignetteIntensity={setVignetteIntensity}
              chromaticAberration={chromaticAberration}
              setChromaticAberration={setChromaticAberration}
              glitchIntensity={glitchIntensity}
              setGlitchIntensity={setGlitchIntensity}
              bloomIntensity={bloomIntensity}
              setBloomIntensity={setBloomIntensity}
              bloomThreshold={bloomThreshold}
              setBloomThreshold={setBloomThreshold}
              colorGradingBrightness={colorGradingBrightness}
              setColorGradingBrightness={setColorGradingBrightness}
              colorGradingContrast={colorGradingContrast}
              setColorGradingContrast={setColorGradingContrast}
              colorGradingSaturation={colorGradingSaturation}
              setColorGradingSaturation={setColorGradingSaturation}
              colorGradingTemperature={colorGradingTemperature}
              setColorGradingTemperature={setColorGradingTemperature}
              colorGradingTint={colorGradingTint}
              setColorGradingTint={setColorGradingTint}
              aoIntensity={aoIntensity}
              setAoIntensity={setAoIntensity}
              aoRadius={aoRadius}
              setAoRadius={setAoRadius}
              aoBias={aoBias}
              setAoBias={setAoBias}
            />

            {/* Shader Code Display */}
            <ShaderCodeDisplay getShaderCodeSnippet={getShaderCodeSnippetWrapper} />
          </div>

          {/* Right Column - Educational Content */}
          <ShaderEducationalPanels
            mathConcepts={mathConcepts}
            geometricInterpretation={geometricInterpretation}
            formulas={formulas}
            explanation={explanation}
          />
        </div>
      </div>

      {/* Theory Modal */}
      {showTheory && theory && (
        <TheoryModal
          theory={{
            title: theory.title,
            explanation: theory.introduction,
            formula: theory.math?.formula || '',
            applications: theory.concepts?.map(c => c.content).join(' ') || ''
          }}
          mode={shaderLevel}
          selectedOperation={shaderConcept}
          onClose={() => setShowTheory(false)}
        />
      )}
    </div>
  );
}
