import { RotateCcw } from 'lucide-react';

export default function ControlsPanel({
  mode,
  selectedOperation,
  transform3dType,
  comparisonMode,
  operation2,
  matrixSize, setMatrixSize,
  v1, setV1,
  v2, setV2,
  m1, setM1,
  m2, setM2,
  m1_3x3, setM1_3x3,
  m2_3x3, setM2_3x3,
  m1_4x4, setM1_4x4,
  m2_4x4, setM2_4x4,
  v3d, setV3d,
  v3d_2, setV3d_2,
  rotation3d, setRotation3d,
  translation3d, setTranslation3d,
  scale3d, setScale3d,
  reflectionAxis, setReflectionAxis,
  onOperationChange,
  onTransform3dTypeChange,
  onOperation2Change,
  onReset
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-indigo-900 mb-4">Controls</h2>
      
      {mode !== '3d' && mode !== 'matrix' && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Operation:</label>
          <select
            value={selectedOperation}
            onChange={onOperationChange}
            className="w-full p-2 border-2 border-indigo-300 rounded-lg"
          >
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="dot">Dot Product</option>
            <option value="magnitude">Magnitude</option>
            <option value="normalize">Normalize</option>
            <option value="cross">Cross Product</option>
            <option value="angle2d">Angle Between</option>
            <option value="projection2d">Projection</option>
            <option value="reflection">Reflection</option>
            <option value="perpendicular">Perpendicular</option>
          </select>
        </div>
      )}
      
      {mode === 'matrix' && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Matrix Size:</label>
            <select
              value={matrixSize}
              onChange={(e) => setMatrixSize(e.target.value)}
              className="w-full p-2 border-2 border-indigo-300 rounded-lg"
            >
              <option value="2x2">2×2 Matrix</option>
              <option value="3x3">3×3 Matrix</option>
              <option value="4x4">4×4 Matrix</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Operation:</label>
            <select
              value={selectedOperation}
              onChange={onOperationChange}
              className="w-full p-2 border-2 border-indigo-300 rounded-lg"
            >
              <option value="addition">Addition</option>
              <option value="subtraction">Subtraction</option>
              <option value="multiply">Multiply</option>
              <option value="determinant">Determinant</option>
              <option value="transpose">Transpose</option>
              <option value="apply">Apply to Vector</option>
              <option value="inverse">Inverse</option>
              <option value="eigenvalues">Eigenvalues & Eigenvectors</option>
              <option value="rank">Rank</option>
            </select>
          </div>
        </>
      )}
      
      {mode === '3d' && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Transform:</label>
          <select
            value={transform3dType}
            onChange={onTransform3dTypeChange}
            className="w-full p-2 border-2 border-indigo-300 rounded-lg"
          >
            <option value="rotation">Rotation</option>
            <option value="translation">Translation</option>
            <option value="scale">Scale</option>
          </select>
        </div>
      )}
      
      {mode === 'advanced' && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Operation:</label>
          <select
            value={selectedOperation}
            onChange={onOperationChange}
            className="w-full p-2 border-2 border-indigo-300 rounded-lg"
          >
            <option value="crossproduct3d">3D Cross Product</option>
            <option value="dotproduct3d">3D Dot Product</option>
            <option value="projection">Vector Projection</option>
            <option value="angle">Angle Between</option>
            <option value="magnitude3d">Magnitude</option>
            <option value="normalize3d">Normalize</option>
          </select>
        </div>
      )}
      
      {mode === 'vector' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">V1: ({v1.x}, {v1.y})</label>
            <div className="flex gap-2">
              <input
                type="range"
                min="-10"
                max="10"
                value={v1.x}
                onChange={(e) => setV1({...v1, x: parseInt(e.target.value)})}
                className="flex-1"
              />
              <input
                type="range"
                min="-10"
                max="10"
                value={v1.y}
                onChange={(e) => setV1({...v1, y: parseInt(e.target.value)})}
                className="flex-1"
              />
            </div>
          </div>
          {(selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'dot' || selectedOperation === 'cross' || selectedOperation === 'angle2d' || selectedOperation === 'projection2d') && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">V2: ({v2.x}, {v2.y})</label>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={v2.x}
                  onChange={(e) => setV2({...v2, x: parseInt(e.target.value)})}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={v2.y}
                  onChange={(e) => setV2({...v2, y: parseInt(e.target.value)})}
                  className="flex-1"
                />
              </div>
            </div>
          )}
          {selectedOperation === 'reflection' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Reflection Axis:</label>
              <select
                value={reflectionAxis}
                onChange={(e) => setReflectionAxis(e.target.value)}
                className="w-full p-2 border-2 border-indigo-300 rounded-lg"
              >
                <option value="x">X-Axis</option>
                <option value="y">Y-Axis</option>
              </select>
            </div>
          )}
        </div>
      )}
      
      {mode === 'matrix' && (
        <div className="space-y-4 mb-6">
          {matrixSize === '2x2' ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Matrix M1: [[{m1[0][0].toFixed(1)}, {m1[0][1].toFixed(1)}], [{m1[1][0].toFixed(1)}, {m1[1][1].toFixed(1)}]]
                </label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">M1[0][0] = {m1[0][0].toFixed(1)}</label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={m1[0][0]}
                      onChange={(e) => setM1([[parseFloat(e.target.value), m1[0][1]], [m1[1][0], m1[1][1]]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">M1[0][1] = {m1[0][1].toFixed(1)}</label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={m1[0][1]}
                      onChange={(e) => setM1([[m1[0][0], parseFloat(e.target.value)], [m1[1][0], m1[1][1]]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">M1[1][0] = {m1[1][0].toFixed(1)}</label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={m1[1][0]}
                      onChange={(e) => setM1([[m1[0][0], m1[0][1]], [parseFloat(e.target.value), m1[1][1]]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">M1[1][1] = {m1[1][1].toFixed(1)}</label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={m1[1][1]}
                      onChange={(e) => setM1([[m1[0][0], m1[0][1]], [m1[1][0], parseFloat(e.target.value)]])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              {(selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'multiply') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Matrix M2: [[{m2[0][0].toFixed(1)}, {m2[0][1].toFixed(1)}], [{m2[1][0].toFixed(1)}, {m2[1][1].toFixed(1)}]]
                  </label>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">M2[0][0] = {m2[0][0].toFixed(1)}</label>
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={m2[0][0]}
                        onChange={(e) => setM2([[parseFloat(e.target.value), m2[0][1]], [m2[1][0], m2[1][1]]])}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">M2[0][1] = {m2[0][1].toFixed(1)}</label>
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={m2[0][1]}
                        onChange={(e) => setM2([[m2[0][0], parseFloat(e.target.value)], [m2[1][0], m2[1][1]]])}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">M2[1][0] = {m2[1][0].toFixed(1)}</label>
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={m2[1][0]}
                        onChange={(e) => setM2([[m2[0][0], m2[0][1]], [parseFloat(e.target.value), m2[1][1]]])}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">M2[1][1] = {m2[1][1].toFixed(1)}</label>
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={m2[1][1]}
                        onChange={(e) => setM2([[m2[0][0], m2[0][1]], [m2[1][0], parseFloat(e.target.value)]])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : matrixSize === '3x3' ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Matrix M1: [[{m1_3x3[0][0].toFixed(1)}, {m1_3x3[0][1].toFixed(1)}, {m1_3x3[0][2].toFixed(1)}], [{m1_3x3[1][0].toFixed(1)}, {m1_3x3[1][1].toFixed(1)}, {m1_3x3[1][2].toFixed(1)}], [{m1_3x3[2][0].toFixed(1)}, {m1_3x3[2][1].toFixed(1)}, {m1_3x3[2][2].toFixed(1)}]]
                </label>
                <div className="space-y-2">
                  {[0, 1, 2].map(i => (
                    [0, 1, 2].map(j => (
                      <div key={`m1_${i}_${j}`}>
                        <label className="block text-xs text-gray-600 mb-1">M1[{i}][{j}] = {m1_3x3[i][j].toFixed(1)}</label>
                        <input
                          type="range"
                          min="-5"
                          max="5"
                          step="0.1"
                          value={m1_3x3[i][j]}
                          onChange={(e) => {
                            const newM = m1_3x3.map(row => [...row]);
                            newM[i][j] = parseFloat(e.target.value);
                            setM1_3x3(newM);
                          }}
                          className="w-full"
                        />
                      </div>
                    ))
                  ))}
                </div>
              </div>
              {(selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'multiply') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Matrix M2: [[{m2_3x3[0][0].toFixed(1)}, {m2_3x3[0][1].toFixed(1)}, {m2_3x3[0][2].toFixed(1)}], [{m2_3x3[1][0].toFixed(1)}, {m2_3x3[1][1].toFixed(1)}, {m2_3x3[1][2].toFixed(1)}], [{m2_3x3[2][0].toFixed(1)}, {m2_3x3[2][1].toFixed(1)}, {m2_3x3[2][2].toFixed(1)}]]
                  </label>
                  <div className="space-y-2">
                    {[0, 1, 2].map(i => (
                      [0, 1, 2].map(j => (
                        <div key={`m2_${i}_${j}`}>
                          <label className="block text-xs text-gray-600 mb-1">M2[{i}][{j}] = {m2_3x3[i][j].toFixed(1)}</label>
                          <input
                            type="range"
                            min="-5"
                            max="5"
                            step="0.1"
                            value={m2_3x3[i][j]}
                            onChange={(e) => {
                              const newM = m2_3x3.map(row => [...row]);
                              newM[i][j] = parseFloat(e.target.value);
                              setM2_3x3(newM);
                            }}
                            className="w-full"
                          />
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Matrix M1: [[{m1_4x4[0][0].toFixed(1)}, {m1_4x4[0][1].toFixed(1)}, {m1_4x4[0][2].toFixed(1)}, {m1_4x4[0][3].toFixed(1)}], [{m1_4x4[1][0].toFixed(1)}, {m1_4x4[1][1].toFixed(1)}, {m1_4x4[1][2].toFixed(1)}, {m1_4x4[1][3].toFixed(1)}], [{m1_4x4[2][0].toFixed(1)}, {m1_4x4[2][1].toFixed(1)}, {m1_4x4[2][2].toFixed(1)}, {m1_4x4[2][3].toFixed(1)}], [{m1_4x4[3][0].toFixed(1)}, {m1_4x4[3][1].toFixed(1)}, {m1_4x4[3][2].toFixed(1)}, {m1_4x4[3][3].toFixed(1)}]]
                </label>
                <div className="space-y-2">
                  {[0, 1, 2, 3].map(i => (
                    [0, 1, 2, 3].map(j => (
                      <div key={`m1_${i}_${j}`}>
                        <label className="block text-xs text-gray-600 mb-1">M1[{i}][{j}] = {m1_4x4[i][j].toFixed(1)}</label>
                        <input
                          type="range"
                          min="-5"
                          max="5"
                          step="0.1"
                          value={m1_4x4[i][j]}
                          onChange={(e) => {
                            const newM = m1_4x4.map(row => [...row]);
                            newM[i][j] = parseFloat(e.target.value);
                            setM1_4x4(newM);
                          }}
                          className="w-full"
                        />
                      </div>
                    ))
                  ))}
                </div>
              </div>
              {(selectedOperation === 'addition' || selectedOperation === 'subtraction' || selectedOperation === 'multiply') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Matrix M2: [[{m2_4x4[0][0].toFixed(1)}, {m2_4x4[0][1].toFixed(1)}, {m2_4x4[0][2].toFixed(1)}, {m2_4x4[0][3].toFixed(1)}], [{m2_4x4[1][0].toFixed(1)}, {m2_4x4[1][1].toFixed(1)}, {m2_4x4[1][2].toFixed(1)}, {m2_4x4[1][3].toFixed(1)}], [{m2_4x4[2][0].toFixed(1)}, {m2_4x4[2][1].toFixed(1)}, {m2_4x4[2][2].toFixed(1)}, {m2_4x4[2][3].toFixed(1)}], [{m2_4x4[3][0].toFixed(1)}, {m2_4x4[3][1].toFixed(1)}, {m2_4x4[3][2].toFixed(1)}, {m2_4x4[3][3].toFixed(1)}]]
                  </label>
                  <div className="space-y-2">
                    {[0, 1, 2, 3].map(i => (
                      [0, 1, 2, 3].map(j => (
                        <div key={`m2_${i}_${j}`}>
                          <label className="block text-xs text-gray-600 mb-1">M2[{i}][{j}] = {m2_4x4[i][j].toFixed(1)}</label>
                          <input
                            type="range"
                            min="-5"
                            max="5"
                            step="0.1"
                            value={m2_4x4[i][j]}
                            onChange={(e) => {
                              const newM = m2_4x4.map(row => [...row]);
                              newM[i][j] = parseFloat(e.target.value);
                              setM2_4x4(newM);
                            }}
                            className="w-full"
                          />
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {mode === '3d' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">V1: ({v3d.x}, {v3d.y}, {v3d.z})</label>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">X = {v3d.x}</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={v3d.x}
                  onChange={(e) => setV3d({...v3d, x: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Y = {v3d.y}</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={v3d.y}
                  onChange={(e) => setV3d({...v3d, y: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Z = {v3d.z}</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={v3d.z}
                  onChange={(e) => setV3d({...v3d, z: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          {transform3dType === 'rotation' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rotation (degrees)</label>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">X-axis = {(rotation3d.x * 180 / Math.PI).toFixed(1)}°</label>
                  <input
                    type="range"
                    min={-Math.PI}
                    max={Math.PI}
                    step="0.1"
                    value={rotation3d.x}
                    onChange={(e) => setRotation3d({...rotation3d, x: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Y-axis = {(rotation3d.y * 180 / Math.PI).toFixed(1)}°</label>
                  <input
                    type="range"
                    min={-Math.PI}
                    max={Math.PI}
                    step="0.1"
                    value={rotation3d.y}
                    onChange={(e) => setRotation3d({...rotation3d, y: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Z-axis = {(rotation3d.z * 180 / Math.PI).toFixed(1)}°</label>
                  <input
                    type="range"
                    min={-Math.PI}
                    max={Math.PI}
                    step="0.1"
                    value={rotation3d.z}
                    onChange={(e) => setRotation3d({...rotation3d, z: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
          {transform3dType === 'translation' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Translation</label>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">X = {translation3d.x}</label>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    value={translation3d.x}
                    onChange={(e) => setTranslation3d({...translation3d, x: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Y = {translation3d.y}</label>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    value={translation3d.y}
                    onChange={(e) => setTranslation3d({...translation3d, y: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Z = {translation3d.z}</label>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    value={translation3d.z}
                    onChange={(e) => setTranslation3d({...translation3d, z: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
          {transform3dType === 'scale' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Scale</label>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">X = {scale3d.x.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scale3d.x}
                    onChange={(e) => setScale3d({...scale3d, x: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Y = {scale3d.y.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scale3d.y}
                    onChange={(e) => setScale3d({...scale3d, y: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Z = {scale3d.z.toFixed(1)}</label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={scale3d.z}
                    onChange={(e) => setScale3d({...scale3d, z: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {mode === 'advanced' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">V1: ({v3d.x}, {v3d.y}, {v3d.z})</label>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">X = {v3d.x}</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={v3d.x}
                  onChange={(e) => setV3d({...v3d, x: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Y = {v3d.y}</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={v3d.y}
                  onChange={(e) => setV3d({...v3d, y: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Z = {v3d.z}</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={v3d.z}
                  onChange={(e) => setV3d({...v3d, z: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">V2: ({v3d_2.x}, {v3d_2.y}, {v3d_2.z})</label>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">X = {v3d_2.x}</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={v3d_2.x}
                  onChange={(e) => setV3d_2({...v3d_2, x: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Y = {v3d_2.y}</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={v3d_2.y}
                  onChange={(e) => setV3d_2({...v3d_2, y: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Z = {v3d_2.z}</label>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={v3d_2.z}
                  onChange={(e) => setV3d_2({...v3d_2, z: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {comparisonMode && mode === 'vector' && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Operation 2:</label>
          <select
            value={operation2}
            onChange={onOperation2Change}
            className="w-full p-2 border-2 border-orange-300 rounded-lg"
          >
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="dot">Dot Product</option>
            <option value="magnitude">Magnitude</option>
            <option value="normalize">Normalize</option>
            <option value="cross">Cross Product</option>
            <option value="angle2d">Angle Between</option>
            <option value="projection2d">Projection</option>
            <option value="reflection">Reflection</option>
            <option value="perpendicular">Perpendicular</option>
          </select>
        </div>
      )}
      
      <button
        onClick={onReset}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
      >
        <RotateCcw size={18} /> Reset
      </button>
    </div>
  );
}

