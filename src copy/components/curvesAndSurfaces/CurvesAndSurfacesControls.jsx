import React from 'react';
import BezierControls from './BezierControls';
import BSplineControls from './BSplineControls';
import HermiteControls from './HermiteControls';
import CatmullRomControls from './CatmullRomControls';
import NURBSControls from './NURBSControls';
import SurfaceControls from './SurfaceControls';

const CurvesAndSurfacesControls = ({
  curveType,
  // Bezier
  bezierPoints,
  setBezierPoints,
  bezierDegree,
  setBezierDegree,
  // B-Spline
  bSplinePoints,
  setBSplinePoints,
  bSplineDegree,
  setBSplineDegree,
  bSplineKnots,
  setBSplineKnots,
  // Hermite
  hermitePoints,
  setHermitePoints,
  hermiteTangents,
  setHermiteTangents,
  // Catmull-Rom
  catmullRomPoints,
  setCatmullRomPoints,
  catmullRomTension,
  setCatmullRomTension,
  // NURBS
  nurbsPoints,
  setNurbsPoints,
  nurbsDegree,
  setNurbsDegree,
  nurbsKnots,
  setNurbsKnots,
  // Surface
  surfaceType,
  setSurfaceType,
  surfacePoints,
  setSurfacePoints
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-4">Curve Controls</h2>
      
      {curveType === 'bezier' && (
        <BezierControls
          points={bezierPoints}
          setPoints={setBezierPoints}
          degree={bezierDegree}
          setDegree={setBezierDegree}
        />
      )}
      
      {curveType === 'bspline' && (
        <BSplineControls
          points={bSplinePoints}
          setPoints={setBSplinePoints}
          degree={bSplineDegree}
          setDegree={setBSplineDegree}
          knots={bSplineKnots}
          setKnots={setBSplineKnots}
        />
      )}
      
      {curveType === 'hermite' && (
        <HermiteControls
          points={hermitePoints}
          setPoints={setHermitePoints}
          tangents={hermiteTangents}
          setTangents={setHermiteTangents}
        />
      )}
      
      {curveType === 'catmullrom' && (
        <CatmullRomControls
          points={catmullRomPoints}
          setPoints={setCatmullRomPoints}
          tension={catmullRomTension}
          setTension={setCatmullRomTension}
        />
      )}
      
      {curveType === 'nurbs' && (
        <NURBSControls
          points={nurbsPoints}
          setPoints={setNurbsPoints}
          degree={nurbsDegree}
          setDegree={setNurbsDegree}
          knots={nurbsKnots}
          setKnots={setNurbsKnots}
        />
      )}
      
      {curveType === 'surface' && (
        <SurfaceControls
          surfaceType={surfaceType}
          setSurfaceType={setSurfaceType}
          points={surfacePoints}
          setPoints={setSurfacePoints}
        />
      )}
    </div>
  );
};

export default CurvesAndSurfacesControls;

