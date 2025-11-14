import React from 'react';
import RotationControls from './RotationControls';
import TranslationControls from './TranslationControls';
import ScalingControls from './ScalingControls';
import ProjectionControls from './ProjectionControls';
import QuaternionControls from './QuaternionControls';
import CameraControls from './CameraControls';

const Transform3DControls = ({
  transformType,
  // Rotation
  rotation,
  setRotation,
  // Translation
  translation,
  setTranslation,
  // Scaling
  scaling,
  setScaling,
  // Projection
  projectionType,
  setProjectionType,
  perspectiveParams,
  setPerspectiveParams,
  orthographicParams,
  setOrthographicParams,
  // Quaternions
  quaternion,
  setQuaternion,
  useQuaternions,
  setUseQuaternions,
  // Camera
  cameraType,
  setCameraType,
  cameraEye,
  setCameraEye,
  cameraTarget,
  setCameraTarget,
  cameraUp,
  setCameraUp
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-4">Transformation Controls</h2>
      
      {transformType === 'rotation' && (
        <RotationControls
          rotation={rotation}
          setRotation={setRotation}
          useQuaternions={useQuaternions}
          setUseQuaternions={setUseQuaternions}
        />
      )}
      
      {transformType === 'translation' && (
        <TranslationControls
          translation={translation}
          setTranslation={setTranslation}
        />
      )}
      
      {transformType === 'scaling' && (
        <ScalingControls
          scaling={scaling}
          setScaling={setScaling}
        />
      )}
      
      {transformType === 'projection' && (
        <ProjectionControls
          projectionType={projectionType}
          setProjectionType={setProjectionType}
          perspectiveParams={perspectiveParams}
          setPerspectiveParams={setPerspectiveParams}
          orthographicParams={orthographicParams}
          setOrthographicParams={setOrthographicParams}
        />
      )}
      
      {transformType === 'quaternions' && (
        <QuaternionControls
          quaternion={quaternion}
          setQuaternion={setQuaternion}
        />
      )}
      
      {transformType === 'camera' && (
        <CameraControls
          cameraType={cameraType}
          setCameraType={setCameraType}
          cameraEye={cameraEye}
          setCameraEye={setCameraEye}
          cameraTarget={cameraTarget}
          setCameraTarget={setCameraTarget}
          cameraUp={cameraUp}
          setCameraUp={setCameraUp}
        />
      )}
    </div>
  );
};

export default Transform3DControls;

