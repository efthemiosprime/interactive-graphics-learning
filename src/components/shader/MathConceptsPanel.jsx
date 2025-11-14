import { BookOpen } from 'lucide-react';

export default function MathConceptsPanel({ mathConcepts }) {
  if (!mathConcepts || !mathConcepts.concepts) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        {mathConcepts.title}
      </h3>
      <div className="space-y-4">
        {mathConcepts.concepts.map((concept, idx) => (
          <div key={idx} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-900 mb-2">{concept.name}</h4>
            <p className="text-sm text-gray-700 mb-2">{concept.description}</p>
            <div className="bg-slate-900 rounded p-2 mb-2">
              <code className="text-xs text-slate-100 font-mono">{concept.example}</code>
            </div>
            <p className="text-xs text-gray-600 italic">Usage: {concept.usage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

