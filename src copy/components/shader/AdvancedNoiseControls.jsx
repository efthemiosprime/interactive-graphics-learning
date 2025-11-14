export default function AdvancedNoiseControls({
  noiseScale,
  setNoiseScale,
  noiseType,
  setNoiseType,
  fractalOctaves,
  setFractalOctaves,
  fractalLacunarity,
  setFractalLacunarity,
  fractalGain,
  setFractalGain,
  worleyScale,
  setWorleyScale,
  domainWarpStrength,
  setDomainWarpStrength,
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Noise Type
        </label>
        <select
          value={noiseType}
          onChange={(e) => setNoiseType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="fractal">Fractal Noise</option>
          <option value="simplex">Simplex Noise</option>
          <option value="worley">Worley Noise (Voronoi)</option>
          <option value="perlin">Perlin Noise</option>
          <option value="domainWarp">Domain Warping</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Noise Scale: {noiseScale.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={noiseScale}
          onChange={(e) => setNoiseScale(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {noiseType === 'fractal' && (
        <>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Octaves: {fractalOctaves.toFixed(1)}
            </label>
            <input
              type="range"
              min="1"
              max="8"
              step="1"
              value={fractalOctaves}
              onChange={(e) => setFractalOctaves(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lacunarity: {fractalLacunarity.toFixed(2)}
            </label>
            <input
              type="range"
              min="1.0"
              max="4.0"
              step="0.1"
              value={fractalLacunarity}
              onChange={(e) => setFractalLacunarity(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gain: {fractalGain.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={fractalGain}
              onChange={(e) => setFractalGain(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </>
      )}

      {noiseType === 'worley' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Worley Scale: {worleyScale.toFixed(2)}
          </label>
          <input
            type="range"
            min="1.0"
            max="20.0"
            step="0.5"
            value={worleyScale}
            onChange={(e) => setWorleyScale(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      {noiseType === 'domainWarp' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Warp Strength: {domainWarpStrength.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.0"
            max="0.5"
            step="0.01"
            value={domainWarpStrength}
            onChange={(e) => setDomainWarpStrength(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}

