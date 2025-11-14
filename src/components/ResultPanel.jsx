import StepByStepSolver from './StepByStepSolver';
import FormulaExplorer from './FormulaExplorer';
import VisualDecomposition from './VisualDecomposition';
import PropertyDemonstration from './PropertyDemonstration';
import BasisVectorsVisualization from './BasisVectorsVisualization';
import ConceptConnectionsGraph from './ConceptConnectionsGraph';
import FormulaReferencePanel from './FormulaReferencePanel';
import GeometricInterpretation from './GeometricInterpretation';
import RealWorldApplications from './RealWorldApplications';
import CodeSnippets from './CodeSnippets';

export default function ResultPanel({ result, details, steps, explanation, renderMatrix, formulaData, visualDecomposition, mode, selectedOperation, onFormulaPartHover, onFormulaPartClick, v1, v2, m1, m2, m1_3x3, m2_3x3, m1_4x4, m2_4x4, matrixSize, transform3dType, v3d, v3d_2, rotation3d, translation3d, scale3d }) {
  const isVectorResult = (r) => r && typeof r === 'object' && r.x !== undefined && r.y !== undefined;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-indigo-900 mb-4">Result</h2>
      <div className="space-y-4">
        <CodeSnippets
          mode={mode}
          selectedOperation={selectedOperation}
          transform3dType={transform3dType}
          v1={v1}
          v2={v2}
          v3d={v3d}
          v3d_2={v3d_2}
          m1={m1}
          m2={m2}
          m1_3x3={m1_3x3}
          m2_3x3={m2_3x3}
          matrixSize={matrixSize}
          rotation3d={rotation3d}
          translation3d={translation3d}
          scale3d={scale3d}
        />
        <FormulaReferencePanel
          mode={mode}
          selectedOperation={selectedOperation}
          transform3dType={transform3dType}
          v1={v1}
          v2={v2}
          v3d={v3d}
          v3d_2={v3d_2}
          m1={m1}
          m2={m2}
          m1_3x3={m1_3x3}
          m2_3x3={m2_3x3}
          matrixSize={matrixSize}
        />
        {/* Render VisualDecomposition FIRST so it appears at the top */}
        {visualDecomposition ? (() => {
          // Create a unique key based on matrix values to force re-render when matrix changes
          // Include the actual matrix values in the key so React detects changes
          const getMatrixKey = () => {
            if (mode === 'matrix') {
              const currentM1 = matrixSize === '4x4' ? m1_4x4 : matrixSize === '3x3' ? m1_3x3 : m1;
              // Create a hash of the matrix values to ensure key changes when values change
              const matrixHash = JSON.stringify(currentM1);
              // Also include a hash of the decomposition steps to catch any changes
              const decompositionHash = JSON.stringify(visualDecomposition.steps?.map(s => ({
                title: s.title,
                result: s.result,
                details: s.details
              })));
              return `${selectedOperation}-${matrixSize}-${matrixHash}-${decompositionHash}`;
            }
            return `${selectedOperation}-${mode}`;
          };
          return (
            <VisualDecomposition
              key={getMatrixKey()}
              decomposition={visualDecomposition}
              mode={mode}
              selectedOperation={selectedOperation}
            />
          );
        })() : null}
        
        <GeometricInterpretation
          mode={mode}
          selectedOperation={selectedOperation}
          transform3dType={transform3dType}
          v1={v1}
          v2={v2}
          v3d={v3d}
          v3d_2={v3d_2}
          m1={m1}
          m2={m2}
          m1_3x3={m1_3x3}
          m2_3x3={m2_3x3}
          matrixSize={matrixSize}
        />
        <RealWorldApplications
          mode={mode}
          selectedOperation={selectedOperation}
          transform3dType={transform3dType}
          v1={v1}
          v2={v2}
          v3d={v3d}
          v3d_2={v3d_2}
          m1={m1}
          m2={m2}
          m1_3x3={m1_3x3}
          m2_3x3={m2_3x3}
          matrixSize={matrixSize}
        />
        <ConceptConnectionsGraph
          mode={mode}
          selectedOperation={selectedOperation}
          transform3dType={transform3dType}
        />
        <BasisVectorsVisualization
          mode={mode}
          selectedOperation={selectedOperation}
          m1={m1}
          m2={m2}
          m1_3x3={m1_3x3}
          m2_3x3={m2_3x3}
          m1_4x4={m1_4x4}
          m2_4x4={m2_4x4}
          matrixSize={matrixSize}
          transform3dType={transform3dType}
          rotation3d={rotation3d}
          translation3d={translation3d}
          scale3d={scale3d}
        />
        <PropertyDemonstration
          mode={mode}
          selectedOperation={selectedOperation}
          v1={v1}
          v2={v2}
          m1={m1}
          m2={m2}
          m1_3x3={m1_3x3}
          m2_3x3={m2_3x3}
          m1_4x4={m1_4x4}
          m2_4x4={m2_4x4}
          matrixSize={matrixSize}
          transform3dType={transform3dType}
          v3d={v3d}
          v3d_2={v3d_2}
          rotation3d={rotation3d}
          translation3d={translation3d}
          scale3d={scale3d}
        />
        {formulaData && (
          <FormulaExplorer
            formula={formulaData.formula}
            parts={formulaData.parts}
            onPartHover={onFormulaPartHover}
            onPartClick={onFormulaPartClick}
          />
        )}
        {steps ? (
          <StepByStepSolver steps={steps} explanation={explanation} />
        ) : (
          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
            <p className="text-xs font-semibold text-indigo-700 uppercase mb-2">Step-by-Step Calculation</p>
            <p className="text-sm text-indigo-700 whitespace-pre-line font-mono leading-relaxed">
              {details || 'Select an operation'}
            </p>
          </div>
        )}
        <div className="border-t-2 border-indigo-300 pt-4">
          <p className="text-xs font-semibold text-indigo-700 uppercase mb-2">Final Answer</p>
          {result && result.eigenvalues && result.eigenvectors ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-indigo-800 mb-1">Eigenvalues:</p>
                <div className="space-y-1">
                  {result.eigenvalues.map((ev, idx) => (
                    <p key={idx} className="text-lg font-mono text-indigo-900">
                      λ{idx + 1} = {ev.complex 
                        ? `${ev.real.toFixed(3)}${ev.imag >= 0 ? '+' : ''}${ev.imag.toFixed(3)}i`
                        : ev.real.toFixed(3)}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-800 mb-1">Eigenvectors:</p>
                <div className="space-y-1">
                  {result.eigenvectors.map((vec, idx) => (
                    <p key={idx} className="text-lg font-mono text-indigo-900">
                      v{idx + 1} = {vec 
                        ? `(${vec.x.toFixed(3)}, ${vec.y.toFixed(3)}${vec.z !== undefined ? `, ${vec.z.toFixed(3)}` : ''})`
                        : 'N/A (complex eigenvalue)'}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-2xl font-mono font-bold text-indigo-900">
              {result === null || result === undefined
                ? <p>No Result</p>
                : isVectorResult(result)
                ? <p>({result.x.toFixed(2)}, {result.y.toFixed(2)}{result.z !== undefined ? `, ${result.z.toFixed(2)}` : ''})</p>
                : typeof result === 'number'
                ? <p>{result.toFixed(2)}</p>
                : Array.isArray(result)
                ? renderMatrix(result)
                : <p>No Result</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

