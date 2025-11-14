import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function GlitchDemoTest() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Link 
        to="/shaders" 
        className="inline-flex items-center gap-2 text-purple-200 hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shaders
      </Link>
      <h1 className="text-4xl font-bold mb-2">Glitch Effect Demo - TEST</h1>
      <p className="text-purple-200">If you can see this, the route is working!</p>
    </div>
  );
}

