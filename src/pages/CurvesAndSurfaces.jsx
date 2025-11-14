import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CurvesAndSurfacesControls from '../components/curvesAndSurfaces/CurvesAndSurfacesControls';
import CurveVisualization from '../components/curvesAndSurfaces/CurveVisualization';
import CurvesAndSurfacesEducationalPanels from '../components/curvesAndSurfaces/CurvesAndSurfacesEducationalPanels';

export default function CurvesAndSurfaces() {
  const [curveType, setCurveType] = useState('bezier');
  
  // Bezier Curve state
  const [bezierPoints, setBezierPoints] = useState([
    { x: 0.1, y: 0.1 },
    { x: 0.3, y: 0.8 },
    { x: 0.7, y: 0.2 },
    { x: 0.9, y: 0.9 }
  ]);
  const [bezierDegree, setBezierDegree] = useState(3);
  
  // B-Spline state
  const [bSplinePoints, setBSplinePoints] = useState([
    { x: 0.1, y: 0.2 },
    { x: 0.3, y: 0.7 },
    { x: 0.5, y: 0.3 },
    { x: 0.7, y: 0.8 },
    { x: 0.9, y: 0.4 }
  ]);
  const [bSplineDegree, setBSplineDegree] = useState(2);
  const [bSplineKnots, setBSplineKnots] = useState([0, 0, 0, 1, 2, 3, 3, 3]);
  
  // Hermite Curve state
  const [hermitePoints, setHermitePoints] = useState([
    { x: 0.2, y: 0.2 }, // P0
    { x: 0.8, y: 0.8 }  // P1
  ]);
  const [hermiteTangents, setHermiteTangents] = useState([
    { x: 0.3, y: 0.1 }, // T0
    { x: 0.1, y: -0.3 } // T1
  ]);
  
  // Catmull-Rom Spline state
  const [catmullRomPoints, setCatmullRomPoints] = useState([
    { x: 0.1, y: 0.5 },
    { x: 0.3, y: 0.8 },
    { x: 0.5, y: 0.2 },
    { x: 0.7, y: 0.9 },
    { x: 0.9, y: 0.4 }
  ]);
  const [catmullRomTension, setCatmullRomTension] = useState(0.5);
  
  // NURBS state
  const [nurbsPoints, setNurbsPoints] = useState([
    { x: 0.1, y: 0.2, w: 1 },
    { x: 0.3, y: 0.7, w: 1 },
    { x: 0.5, y: 0.3, w: 1 },
    { x: 0.7, y: 0.8, w: 1 },
    { x: 0.9, y: 0.4, w: 1 }
  ]);
  const [nurbsDegree, setNurbsDegree] = useState(2);
  const [nurbsKnots, setNurbsKnots] = useState([0, 0, 0, 1, 2, 3, 3, 3]);
  
  // Parametric Surface state
  const [surfaceType, setSurfaceType] = useState('bezier');
  const [surfacePoints, setSurfacePoints] = useState([
    // 4x4 grid for Bezier surface
    [{ x: 0, y: 0, z: 0 }, { x: 0.33, y: 0, z: 0.2 }, { x: 0.67, y: 0, z: 0.1 }, { x: 1, y: 0, z: 0 }],
    [{ x: 0, y: 0.33, z: 0.1 }, { x: 0.33, y: 0.33, z: 0.5 }, { x: 0.67, y: 0.33, z: 0.4 }, { x: 1, y: 0.33, z: 0.2 }],
    [{ x: 0, y: 0.67, z: 0.2 }, { x: 0.33, y: 0.67, z: 0.4 }, { x: 0.67, y: 0.67, z: 0.6 }, { x: 1, y: 0.67, z: 0.3 }],
    [{ x: 0, y: 1, z: 0 }, { x: 0.33, y: 1, z: 0.1 }, { x: 0.67, y: 1, z: 0.2 }, { x: 1, y: 1, z: 0 }]
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-purple-900 mb-2">Curves & Surfaces</h1>
            <p className="text-purple-700">Learn parametric curves, splines, and surface modeling</p>
          </div>
        </div>

        {/* Tutorial Link */}
        <div className="mb-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg shadow-lg p-6 border-2 border-purple-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-purple-900 mb-2">📚 Complete Tutorial</h2>
              <p className="text-purple-700">Learn how to build a curves and surfaces editor from scratch using Vite and JavaScript</p>
            </div>
            <Link
              to="/curves-surfaces/tutorials"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            >
              View Tutorial →
            </Link>
          </div>
        </div>

        {/* Curve Type Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Curve/Surface Type</h2>
          <select
            value={curveType}
            onChange={(e) => setCurveType(e.target.value)}
            className="w-full p-3 border-2 border-purple-300 rounded-lg text-lg"
          >
            <option value="bezier">1. Bezier Curves</option>
            <option value="bspline">2. B-Splines</option>
            <option value="hermite">3. Hermite Curves</option>
            <option value="catmullrom">4. Catmull-Rom Splines</option>
            <option value="nurbs">5. NURBS</option>
            <option value="surface">6. Parametric Surfaces</option>
          </select>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Left Column - Visualization and Controls */}
          <div className="space-y-6">
            {/* Curve Visualization */}
            <CurveVisualization
              curveType={curveType}
              bezierPoints={bezierPoints}
              bezierDegree={bezierDegree}
              bSplinePoints={bSplinePoints}
              bSplineDegree={bSplineDegree}
              bSplineKnots={bSplineKnots}
              hermitePoints={hermitePoints}
              hermiteTangents={hermiteTangents}
              catmullRomPoints={catmullRomPoints}
              catmullRomTension={catmullRomTension}
              nurbsPoints={nurbsPoints}
              nurbsDegree={nurbsDegree}
              nurbsKnots={nurbsKnots}
              surfaceType={surfaceType}
              surfacePoints={surfacePoints}
            />

            {/* Controls */}
            <CurvesAndSurfacesControls
              curveType={curveType}
              bezierPoints={bezierPoints}
              setBezierPoints={setBezierPoints}
              bezierDegree={bezierDegree}
              setBezierDegree={setBezierDegree}
              bSplinePoints={bSplinePoints}
              setBSplinePoints={setBSplinePoints}
              bSplineDegree={bSplineDegree}
              setBSplineDegree={setBSplineDegree}
              bSplineKnots={bSplineKnots}
              setBSplineKnots={setBSplineKnots}
              hermitePoints={hermitePoints}
              setHermitePoints={setHermitePoints}
              hermiteTangents={hermiteTangents}
              setHermiteTangents={setHermiteTangents}
              catmullRomPoints={catmullRomPoints}
              setCatmullRomPoints={setCatmullRomPoints}
              catmullRomTension={catmullRomTension}
              setCatmullRomTension={setCatmullRomTension}
              nurbsPoints={nurbsPoints}
              setNurbsPoints={setNurbsPoints}
              nurbsDegree={nurbsDegree}
              setNurbsDegree={setNurbsDegree}
              nurbsKnots={nurbsKnots}
              setNurbsKnots={setNurbsKnots}
              surfaceType={surfaceType}
              setSurfaceType={setSurfaceType}
              surfacePoints={surfacePoints}
              setSurfacePoints={setSurfacePoints}
            />
          </div>

          {/* Right Column - Educational Content */}
          <div>
            <CurvesAndSurfacesEducationalPanels
              curveType={curveType}
              bezierPoints={bezierPoints}
              bezierDegree={bezierDegree}
              bSplinePoints={bSplinePoints}
              bSplineDegree={bSplineDegree}
              hermitePoints={hermitePoints}
              hermiteTangents={hermiteTangents}
              catmullRomPoints={catmullRomPoints}
              nurbsPoints={nurbsPoints}
              surfacePoints={surfacePoints}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

