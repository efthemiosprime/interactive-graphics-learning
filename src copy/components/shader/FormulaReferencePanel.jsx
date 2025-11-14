import { BookOpen } from 'lucide-react';

export default function FormulaReferencePanel({ formulas }) {
  if (!formulas || !formulas.formulas) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        {formulas.title}
      </h3>
      <div className="space-y-4">
        {formulas.formulas.map((formula, idx) => (
          <div key={idx} className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-900 mb-2">{formula.name}</h4>
            <div className="bg-slate-900 rounded p-3 mb-2">
              <code className="text-sm text-slate-100 font-mono">{formula.formula}</code>
            </div>
            <p className="text-sm text-gray-700 mb-2">{formula.description}</p>
            {formula.example && (
              <div className="bg-slate-800 rounded p-2 mt-2">
                <code className="text-xs text-slate-300 font-mono">{formula.example}</code>
              </div>
            )}
          </div>
        ))}
        {formulas.related && formulas.related.length > 0 && (
          <div className="mt-4 pt-4 border-t border-purple-200">
            <p className="text-xs text-gray-600 mb-2">Related concepts:</p>
            <div className="flex flex-wrap gap-2">
              {formulas.related.map((rel, idx) => (
                <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                  {rel}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

