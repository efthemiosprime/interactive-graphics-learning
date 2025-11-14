import BlurControls from './postprocess/BlurControls';
import EdgeControls from './postprocess/EdgeControls';
import VignetteControls from './postprocess/VignetteControls';
import ChromaticControls from './postprocess/ChromaticControls';
import GlitchControls from './postprocess/GlitchControls';
import BloomControls from './postprocess/BloomControls';
import ColorGradingControls from './postprocess/ColorGradingControls';
import AOControls from './postprocess/AOControls';

export default function PostProcessControls({
  postProcessType,
  setPostProcessType,
  useImageForPostProcess,
  setUseImageForPostProcess,
  textureLoaded,
  blurAmount,
  setBlurAmount,
  edgeThreshold,
  setEdgeThreshold,
  vignetteIntensity,
  setVignetteIntensity,
  chromaticAberration,
  setChromaticAberration,
  glitchIntensity,
  setGlitchIntensity,
  bloomIntensity,
  setBloomIntensity,
  bloomThreshold,
  setBloomThreshold,
  colorGradingBrightness,
  setColorGradingBrightness,
  colorGradingContrast,
  setColorGradingContrast,
  colorGradingSaturation,
  setColorGradingSaturation,
  colorGradingTemperature,
  setColorGradingTemperature,
  colorGradingTint,
  setColorGradingTint,
  aoIntensity,
  setAoIntensity,
  aoRadius,
  setAoRadius,
  aoBias,
  setAoBias
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Effect Type
        </label>
        <select
          value={postProcessType}
          onChange={(e) => setPostProcessType(e.target.value)}
          className="w-full p-2 border-2 border-purple-300 rounded-lg"
        >
          <option value="blur">Blur</option>
          <option value="edge">Edge Detection</option>
          <option value="vignette">Vignette</option>
          <option value="chromatic">Chromatic Aberration</option>
          <option value="glitch">Glitch Effect</option>
          <option value="bloom">Bloom</option>
          <option value="colorGrading">Color Grading</option>
          <option value="ao">Ambient Occlusion</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useImageForPostProcess}
            onChange={(e) => setUseImageForPostProcess(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm font-semibold text-gray-700">
            Use Image Texture
          </span>
        </label>
        {useImageForPostProcess && (
          <p className="text-xs text-gray-500 mt-1 ml-6">
            {textureLoaded ? '✓ Image loaded' : 'Loading image...'}
          </p>
        )}
      </div>
      {postProcessType === 'blur' && (
        <BlurControls blurAmount={blurAmount} setBlurAmount={setBlurAmount} />
      )}
      {postProcessType === 'edge' && (
        <EdgeControls edgeThreshold={edgeThreshold} setEdgeThreshold={setEdgeThreshold} />
      )}
      {postProcessType === 'vignette' && (
        <VignetteControls vignetteIntensity={vignetteIntensity} setVignetteIntensity={setVignetteIntensity} />
      )}
      {postProcessType === 'chromatic' && (
        <ChromaticControls chromaticAberration={chromaticAberration} setChromaticAberration={setChromaticAberration} />
      )}
      {postProcessType === 'glitch' && (
        <GlitchControls glitchIntensity={glitchIntensity} setGlitchIntensity={setGlitchIntensity} />
      )}
      {postProcessType === 'bloom' && (
        <BloomControls
          bloomIntensity={bloomIntensity}
          setBloomIntensity={setBloomIntensity}
          bloomThreshold={bloomThreshold}
          setBloomThreshold={setBloomThreshold}
        />
      )}
      {postProcessType === 'colorGrading' && (
        <ColorGradingControls
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
        />
      )}
      {postProcessType === 'ao' && (
        <AOControls
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

