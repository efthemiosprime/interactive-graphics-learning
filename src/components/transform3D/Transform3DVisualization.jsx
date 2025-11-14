import React, { useRef, useEffect } from 'react';
import * as transform3D from '../../utils/transform3D';

const Transform3DVisualization = ({
  transformType,
  rotation,
  translation,
  scaling,
  projectionType,
  perspectiveParams,
  orthographicParams,
  quaternion,
  cameraEye,
  cameraTarget,
  cameraUp
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);

    // Define a 3D cube
    const cubeVertices = [
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 }
    ];

    // Apply transformations
    let transformedVertices = cubeVertices.map(v => ({ ...v }));

    if (transformType === 'rotation') {
      const rotMatrix = transform3D.combineRotations(rotation.x, rotation.y, rotation.z);
      transformedVertices = transformedVertices.map(v => transform3D.applyMatrix3D(rotMatrix, v));
    } else if (transformType === 'translation') {
      const transMatrix = transform3D.translation(translation.x, translation.y, translation.z);
      transformedVertices = transformedVertices.map(v => transform3D.applyMatrix4D(transMatrix, v));
    } else if (transformType === 'scaling') {
      const scaleMatrix = transform3D.scale(scaling.x, scaling.y, scaling.z);
      transformedVertices = transformedVertices.map(v => transform3D.applyMatrix3D(scaleMatrix, v));
    } else if (transformType === 'quaternions') {
      // Convert quaternion to rotation matrix and apply
      const quatMatrix = transform3D.quaternionToMatrix(quaternion);
      transformedVertices = transformedVertices.map(v => transform3D.applyMatrix3D(quatMatrix, v));
    } else if (transformType === 'camera') {
      // Apply camera view transformation (look-at)
      const viewMatrix = transform3D.lookAt(cameraEye, cameraTarget, cameraUp);
      transformedVertices = transformedVertices.map(v => transform3D.applyMatrix4D(viewMatrix, v));
    }

    // Apply projection based on transform type
    let projectedVertices;
    if (transformType === 'projection') {
      // Use the selected projection type
      if (projectionType === 'perspective') {
        const projMatrix = transform3D.perspective(
          perspectiveParams.fov,
          perspectiveParams.aspect,
          perspectiveParams.near,
          perspectiveParams.far
        );
        transformedVertices = transformedVertices.map(v => transform3D.applyMatrix4D(projMatrix, v));
        // For perspective, we need to handle the perspective divide
        projectedVertices = transformedVertices.map(v => {
          // Scale to screen coordinates
          const scale = 50;
          return {
            x: centerX + v.x * scale,
            y: centerY - v.y * scale
          };
        });
      } else {
        const projMatrix = transform3D.orthographic(
          orthographicParams.left,
          orthographicParams.right,
          orthographicParams.bottom,
          orthographicParams.top,
          orthographicParams.near,
          orthographicParams.far
        );
        transformedVertices = transformedVertices.map(v => transform3D.applyMatrix4D(projMatrix, v));
        // For orthographic, use isometric projection
        projectedVertices = transformedVertices.map(v => transform3D.project3D(v, centerX, centerY, 50));
      }
    } else {
      // For all other transform types, use isometric projection
      projectedVertices = transformedVertices.map(v => transform3D.project3D(v, centerX, centerY, 50));
    }

    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    const axes = [
      { start: { x: 0, y: 0, z: 0 }, end: { x: 3, y: 0, z: 0 }, color: '#ff0000' }, // X - Red
      { start: { x: 0, y: 0, z: 0 }, end: { x: 0, y: 3, z: 0 }, color: '#00ff00' }, // Y - Green
      { start: { x: 0, y: 0, z: 0 }, end: { x: 0, y: 0, z: 3 }, color: '#0000ff' }  // Z - Blue
    ];

    axes.forEach(axis => {
      const start2D = transform3D.project3D(axis.start, centerX, centerY, 50);
      const end2D = transform3D.project3D(axis.end, centerX, centerY, 50);
      ctx.strokeStyle = axis.color;
      ctx.beginPath();
      ctx.moveTo(start2D.x, start2D.y);
      ctx.lineTo(end2D.x, end2D.y);
      ctx.stroke();
    });

    // Draw cube edges
    ctx.strokeStyle = '#4a9eff';
    ctx.lineWidth = 2;
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Front face
      [4, 5], [5, 6], [6, 7], [7, 4], // Back face
      [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
    ];

    edges.forEach(([i, j]) => {
      const v1 = projectedVertices[i];
      const v2 = projectedVertices[j];
      ctx.beginPath();
      ctx.moveTo(v1.x, v1.y);
      ctx.lineTo(v2.x, v2.y);
      ctx.stroke();
    });

    // Draw vertices
    ctx.fillStyle = '#ffffff';
    projectedVertices.forEach(v => {
      ctx.beginPath();
      ctx.arc(v.x, v.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.fillText('X', projectedVertices[1].x + 5, projectedVertices[1].y);
    ctx.fillText('Y', projectedVertices[3].x + 5, projectedVertices[3].y);
    ctx.fillText('Z', projectedVertices[4].x + 5, projectedVertices[4].y);

  }, [transformType, rotation, translation, scaling, projectionType, perspectiveParams, orthographicParams, quaternion, cameraEye, cameraTarget, cameraUp]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-purple-900 mb-4">3D Visualization</h2>
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="w-full border-2 border-purple-300 rounded-lg bg-gray-900"
      />
      <div className="mt-4 text-sm text-gray-600">
        <p>Red = X-axis, Green = Y-axis, Blue = Z-axis</p>
        <p>White dots = cube vertices, Blue lines = cube edges</p>
      </div>
    </div>
  );
};

export default Transform3DVisualization;

