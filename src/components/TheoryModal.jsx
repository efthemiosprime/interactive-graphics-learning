import { X } from 'lucide-react';

export default function TheoryModal({ theory, mode, selectedOperation, onClose }) {
  if (!theory) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{theory.title}</h2>
            <p className="text-green-100 text-sm mt-1">{mode.charAt(0).toUpperCase() + mode.slice(1)} - {selectedOperation}</p>
          </div>
          <button onClick={onClose} className="hover:bg-green-600 p-1 rounded transition">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-5">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Explanation</h3>
            <p className="text-gray-700 leading-relaxed">{theory.explanation}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Formula</h3>
            <div className="bg-gray-100 p-4 rounded font-mono text-sm whitespace-pre-wrap text-gray-800 border-l-4 border-green-600">
              {theory.formula}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Real-World Applications</h3>
            <p className="text-gray-700">{theory.applications}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

