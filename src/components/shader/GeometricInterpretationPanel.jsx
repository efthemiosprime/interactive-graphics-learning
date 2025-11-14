import { Shapes } from 'lucide-react';

export default function GeometricInterpretationPanel({ geometricInterpretation }) {
  if (!geometricInterpretation) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
        <Shapes className="w-5 h-5" />
        {geometricInterpretation.title}
      </h3>
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">
          {geometricInterpretation.description}
        </p>
        
        {geometricInterpretation.details && (
          <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-900 mb-2">Visualization: {geometricInterpretation.visualization}</h4>
            <ul className="space-y-2 mt-3">
              {geometricInterpretation.details.map((detail, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
          <h4 className="font-semibold text-indigo-900 mb-2">Geometric Meaning</h4>
          <p className="text-sm text-gray-700 italic">
            {geometricInterpretation.geometricMeaning}
          </p>
        </div>
      </div>
    </div>
  );
}

