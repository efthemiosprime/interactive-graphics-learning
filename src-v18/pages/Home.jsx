import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
            Math & Graphics Learning Platform
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Interactive visualizations and explanations for vector math, matrix operations, and shader programming
          </p>
        </div>

        {/* Table of Contents */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Vector & Matrix Operations Card */}
          <Link
            to="/vector-matrix"
            className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-indigo-300"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-indigo-900 mb-3 group-hover:text-indigo-700 transition-colors">
                  Vector & Matrix Operations
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Master fundamental mathematical operations including vector addition, dot products, cross products, 
                  matrix multiplication, determinants, eigenvalues, and more. Interactive visualizations help you 
                  understand the math behind linear algebra.
                </p>
                <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-4 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            {/* Features List */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  2D & 3D Vector Operations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  2×2, 3×3, and 4×4 Matrix Operations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  Eigenvalues & Eigenvectors
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  Step-by-Step Solvers & Visualizations
                </li>
              </ul>
            </div>
          </Link>

          {/* Shader Programming Card */}
          <Link
            to="/shaders"
            className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-300"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-purple-900 mb-3 group-hover:text-purple-700 transition-colors">
                  Shader Programming & Math
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Learn shader programming from basics to advanced techniques. Understand the mathematics behind 
                  graphics programming, including UV coordinates, procedural generation, lighting models, and 
                  raymarching. Live WebGL shaders with interactive controls.
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-4 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            {/* Features List */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Basic to Advanced Shader Concepts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Live WebGL Shader Rendering
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Procedural Generation & Noise
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Lighting Models & Raymarching
                </li>
              </ul>
            </div>
          </Link>
        </div>

        {/* Additional Info Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-indigo-500">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Platform</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            This interactive learning platform combines mathematical theory with visual programming to help you 
            understand complex concepts through hands-on exploration. Each section includes:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Interactive Visualizations</h4>
              <p className="text-sm text-gray-600">See math in action with real-time graphics</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Step-by-Step Explanations</h4>
              <p className="text-sm text-gray-600">Detailed breakdowns of every calculation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💻</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Code Examples</h4>
              <p className="text-sm text-gray-600">JavaScript and GLSL code snippets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

