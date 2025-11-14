import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Transform3DControls from '../components/transform3D/Transform3DControls';
import Transform3DVisualization from '../components/transform3D/Transform3DVisualization';
import Transform3DEducationalPanels from '../components/transform3D/Transform3DEducationalPanels';
import Transform3DCodeDisplay from '../components/transform3D/Transform3DCodeDisplay';

export default function Transform3D() {
  const [transformType, setTransformType] = useState('rotation');
  const [activeTab, setActiveTab] = useState('visualization'); // 'visualization' or 'code'
  
  // Rotation state
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [useQuaternions, setUseQuaternions] = useState(false);
  
  // Translation state
  const [translation, setTranslation] = useState({ x: 0, y: 0, z: 0 });
  
  // Scaling state
  const [scaling, setScaling] = useState({ x: 1, y: 1, z: 1 });
  
  // Projection state
  const [projectionType, setProjectionType] = useState('perspective');
  const [perspectiveParams, setPerspectiveParams] = useState({
    fov: Math.PI / 4, // 45 degrees
    aspect: 1.0,
    near: 0.1,
    far: 100
  });
  const [orthographicParams, setOrthographicParams] = useState({
    left: -5,
    right: 5,
    bottom: -5,
    top: 5,
    near: -10,
    far: 10
  });
  
  // Quaternion state
  const [quaternion, setQuaternion] = useState({ w: 1, x: 0, y: 0, z: 0 });
  
  // Camera state
  const [cameraType, setCameraType] = useState('orbit');
  const [cameraEye, setCameraEye] = useState({ x: 5, y: 5, z: 5 });
  const [cameraTarget, setCameraTarget] = useState({ x: 0, y: 0, z: 0 });
  const [cameraUp, setCameraUp] = useState({ x: 0, y: 1, z: 0 });

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
            <h1 className="text-4xl font-bold text-purple-900 mb-2">3D Transformations & Projections</h1>
            <p className="text-purple-700">Learn 3D transformations, projections, and camera systems</p>
          </div>
        </div>

        {/* Transform Type Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Transformation Type</h2>
          <select
            value={transformType}
            onChange={(e) => setTransformType(e.target.value)}
            className="w-full p-3 border-2 border-purple-300 rounded-lg text-lg"
          >
            <option value="rotation">1. Rotation</option>
            <option value="translation">2. Translation</option>
            <option value="scaling">3. Scaling</option>
            <option value="projection">4. Projection</option>
            <option value="quaternions">5. Quaternions</option>
            <option value="camera">6. Camera Systems</option>
          </select>
        </div>

        {/* Main Content Grid - 3D Visualization and Controls Side by Side */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-10 mb-8">
          {/* 3D Visualization/Code Tabs - 70% width (7 columns) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Tabs */}
              <div className="flex gap-2 mb-4 border-b-2 border-purple-200 pb-4">
                <button
                  onClick={() => setActiveTab('visualization')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'visualization'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  3D Visualization
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'code'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  Code Snippet (with current values)
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'visualization' && (
                <div>
                  <Transform3DVisualization
                    transformType={transformType}
                    rotation={rotation}
                    translation={translation}
                    scaling={scaling}
                    projectionType={projectionType}
                    perspectiveParams={perspectiveParams}
                    orthographicParams={orthographicParams}
                    quaternion={quaternion}
                    cameraEye={cameraEye}
                    cameraTarget={cameraTarget}
                    cameraUp={cameraUp}
                  />
                </div>
              )}

              {activeTab === 'code' && (
                <div>
                  <Transform3DCodeDisplay
                    transformType={transformType}
                    rotation={rotation}
                    translation={translation}
                    scaling={scaling}
                    perspectiveParams={perspectiveParams}
                    orthographicParams={orthographicParams}
                    cameraEye={cameraEye}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Transformation Controls - 30% width (3 columns) */}
          <div className="lg:col-span-3">
            <Transform3DControls
              transformType={transformType}
              rotation={rotation}
              setRotation={setRotation}
              translation={translation}
              setTranslation={setTranslation}
              scaling={scaling}
              setScaling={setScaling}
              projectionType={projectionType}
              setProjectionType={setProjectionType}
              perspectiveParams={perspectiveParams}
              setPerspectiveParams={setPerspectiveParams}
              orthographicParams={orthographicParams}
              setOrthographicParams={setOrthographicParams}
              quaternion={quaternion}
              setQuaternion={setQuaternion}
              useQuaternions={useQuaternions}
              setUseQuaternions={setUseQuaternions}
              cameraType={cameraType}
              setCameraType={setCameraType}
              cameraEye={cameraEye}
              setCameraEye={setCameraEye}
              cameraTarget={cameraTarget}
              setCameraTarget={setCameraTarget}
              cameraUp={cameraUp}
              setCameraUp={setCameraUp}
            />
          </div>
        </div>

        {/* Educational Content - Full Width Below */}
        <div className="mb-8">
          <Transform3DEducationalPanels
              transformType={transformType}
              rotation={rotation}
              translation={translation}
              scaling={scaling}
              perspectiveParams={perspectiveParams}
              orthographicParams={orthographicParams}
              quaternion={quaternion}
              cameraEye={cameraEye}
              cameraTarget={cameraTarget}
              cameraUp={cameraUp}
            />
        </div>
      </div>
    </div>
  );
}

