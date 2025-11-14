import { HelpCircle } from 'lucide-react';

export default function ModeSelector({ mode, comparisonMode, showTheory, onModeChange, onComparisonToggle, onTheoryToggle }) {
  return (
    <div className="mb-6 flex gap-2 flex-wrap">
      {['vector', 'matrix', '3d', 'advanced'].map(m => (
        <button
          key={m}
          onClick={() => {
            onModeChange(m);
            if (m === '3d') {
              // Will be handled by parent
            } else if (m === 'advanced') {
              // Will be handled by parent
            } else {
              // Will be handled by parent
            }
          }}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            mode === m
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'
          }`}
        >
          {m === '3d' ? '3D Transform' : m.charAt(0).toUpperCase() + m.slice(1)}
        </button>
      ))}
      {mode !== '3d' && (
        <button
          onClick={onComparisonToggle}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            comparisonMode
              ? 'bg-orange-600 text-white'
              : 'bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50'
          }`}
        >
          📊 Comparison
        </button>
      )}
      <button
        onClick={onTheoryToggle}
        className={`px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
          showTheory
            ? 'bg-green-600 text-white'
            : 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50'
        }`}
      >
        <HelpCircle size={18} /> Theory
      </button>
    </div>
  );
}

