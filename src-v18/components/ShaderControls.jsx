import ColorControls from './shader/ColorControls';
import UVControls from './shader/UVControls';
import GradientControls from './shader/GradientControls';
import BasicShapesControls from './shader/BasicShapesControls';
import ColorSpacesControls from './shader/ColorSpacesControls';
import BasicMathOperationsControls from './shader/BasicMathOperationsControls';
import CoordinateTransformationsControls from './shader/CoordinateTransformationsControls';
import NoiseControls from './shader/NoiseControls';
import AdvancedNoiseControls from './shader/AdvancedNoiseControls';
import DisplacementMappingControls from './shader/DisplacementMappingControls';
import StylizedControls from './shader/StylizedControls';
import LightingControls from './shader/LightingControls';
import TextureControls from './shader/TextureControls';
import PostProcessControls from './shader/PostProcessControls';

export default function ShaderControls({
  shaderLevel,
  shaderConcept,
  // Color controls
  color, setColor,
  // UV controls
  uvScale, setUvScale,
  // Gradient controls
  gradientType, setGradientType,
  gradientStartColor, setGradientStartColor,
  gradientEndColor, setGradientEndColor,
  gradientAngle, setGradientAngle,
  gradientCenter, setGradientCenter,
  gradientRadius, setGradientRadius,
  // Basic shapes controls
  shapeType, setShapeType,
  shapeCenter, setShapeCenter,
  shapeSize, setShapeSize,
  shapeColor, setShapeColor,
  shapeEdgeSoftness, setShapeEdgeSoftness,
  lineThickness, setLineThickness,
  lineAngle, setLineAngle,
  // Color spaces controls
  colorSpaceMode, setColorSpaceMode,
  hsvColor, setHsvColor,
  colorMixMode, setColorMixMode,
  colorMixColor1, setColorMixColor1,
  colorMixColor2, setColorMixColor2,
  colorMixAmount, setColorMixAmount,
  // Basic math operations controls
  mathOperation, setMathOperation,
  mathValue1, setMathValue1,
  mathValue2, setMathValue2,
  mathValue3, setMathValue3,
  useImageForMath, setUseImageForMath,
  // Coordinate transformations controls
  transformType, setTransformType,
  transformAngle, setTransformAngle,
  transformTranslation, setTransformTranslation,
  transformScale, setTransformScale,
  transformCenter, setTransformCenter,
  // Noise controls
  noiseScale, setNoiseScale,
  // Advanced noise controls
  advancedNoiseType, setAdvancedNoiseType,
  fractalOctaves, setFractalOctaves,
  fractalLacunarity, setFractalLacunarity,
  fractalGain, setFractalGain,
  worleyScale, setWorleyScale,
  domainWarpStrength, setDomainWarpStrength,
  // Displacement mapping controls
  displacementType, setDisplacementType,
  displacementScale, setDisplacementScale,
  displacementHeight, setDisplacementHeight,
  // Stylized controls
  toonBands, setToonBands,
  stylizedEdgeThreshold, setStylizedEdgeThreshold,
  stylizedEdgeThickness, setStylizedEdgeThickness,
  colorQuantization, setColorQuantization,
  rimPower, setRimPower,
  specularPower, setSpecularPower,
  rimColor, setRimColor,
  specularColor, setSpecularColor,
  useImageForStylized, setUseImageForStylized,
  // Lighting controls
  lightIntensity, setLightIntensity,
  // Texture controls
  useImageTexture, setUseImageTexture,
  textureScale, setTextureScale,
  textureOffset, setTextureOffset,
  textureLoaded,
  // Post-processing controls
  postProcessType, setPostProcessType,
  useImageForPostProcess, setUseImageForPostProcess,
  blurAmount, setBlurAmount,
  edgeThreshold, setEdgeThreshold,
  vignetteIntensity, setVignetteIntensity,
  chromaticAberration, setChromaticAberration,
  glitchIntensity, setGlitchIntensity,
  bloomIntensity, setBloomIntensity,
  bloomThreshold, setBloomThreshold,
  colorGradingBrightness, setColorGradingBrightness,
  colorGradingContrast, setColorGradingContrast,
  colorGradingSaturation, setColorGradingSaturation,
  colorGradingTemperature, setColorGradingTemperature,
  colorGradingTint, setColorGradingTint,
  aoIntensity, setAoIntensity,
  aoRadius, setAoRadius,
  aoBias, setAoBias
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-4">Controls</h2>
      {shaderLevel === 'basic' && shaderConcept === 'color' && (
        <ColorControls color={color} setColor={setColor} />
      )}
      {shaderConcept === 'uv' && (
        <UVControls uvScale={uvScale} setUvScale={setUvScale} />
      )}
      {shaderConcept === 'gradients' && (
        <GradientControls
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
        />
      )}
      {shaderConcept === 'shapes' && (
        <BasicShapesControls
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
        />
      )}
      {shaderConcept === 'colorSpaces' && (
        <ColorSpacesControls
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
        />
      )}
      {shaderConcept === 'mathOperations' && (
        <BasicMathOperationsControls
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
          textureLoaded={textureLoaded}
        />
      )}
      {shaderConcept === 'coordinateTransformations' && (
        <CoordinateTransformationsControls
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
        />
      )}
      {shaderConcept === 'noise' && (
        <NoiseControls noiseScale={noiseScale} setNoiseScale={setNoiseScale} />
      )}
      {shaderConcept === 'advancedNoise' && (
        <AdvancedNoiseControls
          noiseScale={noiseScale}
          setNoiseScale={setNoiseScale}
          noiseType={advancedNoiseType}
          setNoiseType={setAdvancedNoiseType}
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
        />
      )}
      {shaderConcept === 'displacementMapping' && (
        <DisplacementMappingControls
          displacementType={displacementType}
          setDisplacementType={setDisplacementType}
          displacementScale={displacementScale}
          setDisplacementScale={setDisplacementScale}
          displacementHeight={displacementHeight}
          setDisplacementHeight={setDisplacementHeight}
          useImageTexture={useImageTexture}
          setUseImageTexture={setUseImageTexture}
          textureLoaded={textureLoaded}
        />
      )}
      {shaderConcept === 'stylized' && (
        <StylizedControls
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
          textureLoaded={textureLoaded}
        />
      )}
      {shaderConcept === 'lighting' && (
        <LightingControls lightIntensity={lightIntensity} setLightIntensity={setLightIntensity} />
      )}
      {shaderConcept === 'texture' && (
        <TextureControls
          useImageTexture={useImageTexture}
          setUseImageTexture={setUseImageTexture}
          textureScale={textureScale}
          setTextureScale={setTextureScale}
          textureOffset={textureOffset}
          setTextureOffset={setTextureOffset}
          textureLoaded={textureLoaded}
        />
      )}
      {shaderConcept === 'postprocess' && (
        <PostProcessControls
          postProcessType={postProcessType}
          setPostProcessType={setPostProcessType}
          useImageForPostProcess={useImageForPostProcess}
          setUseImageForPostProcess={setUseImageForPostProcess}
          textureLoaded={textureLoaded}
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
      )}
    </div>
  );
}
