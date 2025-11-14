import { Code } from 'lucide-react';

export default function ShaderCodeDisplay({ getShaderCodeSnippet }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
        <Code className="w-5 h-5" />
        Shader Code (with current values)
      </h2>
      <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm text-slate-100 font-mono whitespace-pre-wrap">
          <code>{getShaderCodeSnippet()}</code>
        </pre>
      </div>
      <div className="mt-3 text-xs text-gray-600 italic">
        💡 Values in comments reflect current slider settings
      </div>
    </div>
  );
}

