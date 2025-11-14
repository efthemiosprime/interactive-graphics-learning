import MathConceptsPanel from './shader/MathConceptsPanel';
import GeometricInterpretationPanel from './shader/GeometricInterpretationPanel';
import FormulaReferencePanel from './shader/FormulaReferencePanel';
import StepByStepSolver from './StepByStepSolver';

export default function ShaderEducationalPanels({
  mathConcepts,
  geometricInterpretation,
  formulas,
  explanation
}) {
  return (
    <div className="space-y-6">
      <MathConceptsPanel mathConcepts={mathConcepts} />
      <GeometricInterpretationPanel geometricInterpretation={geometricInterpretation} />
      <FormulaReferencePanel formulas={formulas} />
      {explanation && (
        <StepByStepSolver 
          steps={explanation.steps} 
          explanation={explanation.explanation}
        />
      )}
    </div>
  );
}
