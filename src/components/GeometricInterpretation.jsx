import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shapes } from 'lucide-react';

export default function GeometricInterpretation({ mode, selectedOperation, transform3dType, v1, v2, v3d, v3d_2, m1, m2, m1_3x3, m2_3x3, matrixSize }) {
  const [expanded, setExpanded] = useState(true);

  const getGeometricInterpretation = () => {
    if (mode === 'vector') {
      const interpretations = {
        'addition': {
          title: 'Vector Addition - Tip-to-Tail Method',
          description: 'Geometrically, adding two vectors means placing the tail of the second vector at the head of the first vector. The sum is the vector from the origin to the tip of the second vector.',
          visualization: 'Triangle Law',
          details: [
            'Start with vector v₁ from origin',
            'Place tail of v₂ at tip of v₁',
            'Resultant vector connects origin to tip of v₂',
            'Forms a triangle: origin → v₁ tip → v₂ tip'
          ],
          geometricMeaning: 'The sum represents the combined displacement or force when both vectors act together.'
        },
        'subtraction': {
          title: 'Vector Subtraction - Reverse and Add',
          description: 'Subtracting v₂ from v₁ is equivalent to adding v₁ and -v₂. Geometrically, this means reversing v₂ and then adding it to v₁ using tip-to-tail method.',
          visualization: 'Parallelogram Law',
          details: [
            'Reverse the second vector (v₂ → -v₂)',
            'Add v₁ + (-v₂) using tip-to-tail',
            'Result points from tip of v₂ to tip of v₁',
            'Represents the difference or relative displacement'
          ],
          geometricMeaning: 'The difference vector shows the direction and distance from v₂ to v₁.'
        },
        'dotproduct': {
          title: 'Dot Product - Projection and Angle',
          description: 'The dot product measures how much one vector extends in the direction of another. It equals the product of their magnitudes times the cosine of the angle between them.',
          visualization: 'Projection Length',
          details: [
            'v₁ · v₂ = ||v₁|| × ||v₂|| × cos(θ)',
            'Geometrically: length of v₁ projected onto v₂',
            'If vectors are perpendicular: dot product = 0',
            'If vectors point same direction: dot product = ||v₁|| × ||v₂||',
            'If vectors point opposite: dot product = -||v₁|| × ||v₂||'
          ],
          geometricMeaning: 'Measures alignment: positive = same direction, negative = opposite, zero = perpendicular.'
        },
        'magnitude': {
          title: 'Magnitude - Distance from Origin',
          description: 'The magnitude (length) of a vector is the straight-line distance from the origin to the point represented by the vector.',
          visualization: 'Pythagorean Theorem',
          details: [
            'In 2D: ||v|| = √(vₓ² + vᵧ²)',
            'Forms a right triangle with x and y components',
            'Magnitude is the hypotenuse',
            'Always non-negative (distance cannot be negative)'
          ],
          geometricMeaning: 'Represents the "size" or "strength" of the vector, independent of direction.'
        },
        'normalize': {
          title: 'Normalize - Unit Vector',
          description: 'Normalizing a vector scales it to have length 1 while preserving its direction. This creates a unit vector pointing in the same direction.',
          visualization: 'Scaling to Unit Circle',
          details: [
            'Divide vector by its magnitude',
            'Result has length = 1',
            'Direction remains unchanged',
            'Lies on unit circle (2D) or unit sphere (3D)'
          ],
          geometricMeaning: 'Unit vectors are used to represent pure directions without magnitude information.'
        },
        'cross': {
          title: 'Cross Product - Perpendicular Vector',
          description: 'The cross product of two 2D vectors gives the signed area of the parallelogram they form. In 3D, it produces a vector perpendicular to both input vectors.',
          visualization: 'Parallelogram Area',
          details: [
            'Magnitude = area of parallelogram formed by vectors',
            'Sign indicates orientation (clockwise vs counterclockwise)',
            'In 3D: result is perpendicular to both input vectors',
            'Right-hand rule determines direction'
          ],
          geometricMeaning: 'Measures "twist" or "rotation" between vectors. Zero when vectors are parallel.'
        },
        'angle2d': {
          title: 'Angle Between Vectors',
          description: 'The angle between two vectors measures how much you need to rotate one vector to align it with the other.',
          visualization: 'Arc Between Vectors',
          details: [
            'Angle θ = arccos((v₁·v₂) / (||v₁|| × ||v₂||))',
            'Range: 0° (parallel, same direction) to 180° (opposite)',
            '90° means vectors are perpendicular',
            'Angle is always between 0 and π radians'
          ],
          geometricMeaning: 'Describes the geometric relationship between vector directions.'
        },
        'projection2d': {
          title: 'Vector Projection - Shadow',
          description: 'Projecting vector u onto vector v gives the component of u that lies along the direction of v. It\'s like casting a shadow of u onto v.',
          visualization: 'Shadow Projection',
          details: [
            'projᵥ(u) = ((u·v) / ||v||²) × v',
            'Result is a vector parallel to v',
            'Length = ||u|| × cos(θ)',
            'Forms a right triangle with u and projᵥ(u)'
          ],
          geometricMeaning: 'Decomposes u into components parallel and perpendicular to v.'
        },
        'reflection': {
          title: 'Reflection - Mirror Image',
          description: 'Reflecting a vector across an axis creates a mirror image. The component perpendicular to the axis is reversed, while the parallel component remains.',
          visualization: 'Mirror Transformation',
          details: [
            'Reflect across axis reverses perpendicular component',
            'Parallel component stays the same',
            'Creates symmetric vector about the axis'
          ],
          geometricMeaning: 'Geometric transformation that preserves distances but reverses orientation across the axis.'
        },
        'perpendicular': {
          title: 'Perpendicular Vector',
          description: 'A vector perpendicular to another forms a 90-degree angle. In 2D, rotate by 90°: (x, y) → (-y, x) or (y, -x).',
          visualization: 'Right Angle',
          details: [
            'Dot product with original vector = 0',
            'In 2D: rotate (x, y) → (-y, x)',
            'Two possible directions (clockwise or counterclockwise)',
            'Forms basis for perpendicular decomposition'
          ],
          geometricMeaning: 'Represents the component of a vector that is orthogonal (at right angles) to another.'
        }
      };

      return interpretations[selectedOperation] || interpretations['addition'];
    } else if (mode === 'matrix') {
      const interpretations = {
        'addition': {
          title: 'Matrix Addition - Component-wise Translation',
          description: 'Adding matrices geometrically means applying both transformations sequentially. Each element addition corresponds to translating the corresponding basis vector transformation.',
          visualization: 'Combined Transformations',
          details: [
            'Each matrix column represents transformed basis vector',
            'Addition combines the transformations',
            'Geometrically: translate each basis vector by the corresponding vector from second matrix',
            'Result: new positions for basis vectors'
          ],
          geometricMeaning: 'Combines two linear transformations additively, shifting the transformation space.'
        },
        'subtraction': {
          title: 'Matrix Subtraction - Inverse Translation',
          description: 'Subtracting matrices reverses the second transformation and adds it. Geometrically, this undoes part of the transformation.',
          visualization: 'Difference Transformation',
          details: [
            'Subtracts the effect of second matrix from first',
            'Geometrically: reverse second transformation, then add',
            'Shows the difference between two transformations'
          ],
          geometricMeaning: 'Measures how much one transformation differs from another.'
        },
        'multiply': {
          title: 'Matrix Multiplication - Composition',
          description: 'Multiplying matrices geometrically means applying transformations sequentially. The result is the composition: first apply the right matrix, then the left matrix.',
          visualization: 'Transformation Composition',
          details: [
            'M₁ × M₂ means: apply M₂ first, then M₁',
            'Each column of result = M₁ applied to corresponding column of M₂',
            'Geometrically: chain of transformations',
            'Order matters! M₁ × M₂ ≠ M₂ × M₁ in general'
          ],
          geometricMeaning: 'Represents the combined effect of applying two linear transformations in sequence.'
        },
        'determinant': {
          title: 'Determinant - Area/Volume Scaling',
          description: 'The determinant measures how much a matrix scales area (2D) or volume (3D). It\'s the factor by which the transformation changes the size of geometric objects.',
          visualization: 'Scaling Factor',
          details: [
            'det(M) = area/volume scaling factor',
            'det > 0: preserves orientation',
            'det < 0: reverses orientation (mirror)',
            'det = 0: collapses to lower dimension (singular)',
            'det = 1: preserves area/volume (isometry)'
          ],
          geometricMeaning: 'Tells you how much the transformation stretches or compresses space, and whether it flips orientation.'
        },
        'transpose': {
          title: 'Transpose - Dual Transformation',
          description: 'Transposing a matrix swaps rows and columns. Geometrically, this represents the "dual" or "adjoint" transformation that operates on the dual space.',
          visualization: 'Row-Column Swap',
          details: [
            'Rows become columns, columns become rows',
            'Geometrically: transformation on dual space',
            'For orthogonal matrices: transpose = inverse',
            'Preserves some geometric properties'
          ],
          geometricMeaning: 'Represents the transformation on the dual vector space (covectors/linear functionals).'
        },
        'apply': {
          title: 'Apply Matrix to Vector - Linear Transformation',
          description: 'Applying a matrix to a vector transforms it linearly. Each column of the matrix shows where the corresponding basis vector goes.',
          visualization: 'Vector Transformation',
          details: [
            'Matrix columns = where basis vectors (î, ĵ) map to',
            'Transformed vector = linear combination of transformed basis vectors',
            'Preserves lines through origin (linearity)',
            'Can rotate, scale, shear, or reflect'
          ],
          geometricMeaning: 'Maps vectors to vectors, preserving linear structure. Shows how the matrix distorts space.'
        },
        'inverse': {
          title: 'Inverse - Undo Transformation',
          description: 'The inverse matrix undoes the transformation. If M maps v to v\', then M⁻¹ maps v\' back to v. Only exists if det(M) ≠ 0.',
          visualization: 'Reverse Transformation',
          details: [
            'M⁻¹ × M = I (identity, no change)',
            'Geometrically: reverses the transformation',
            'Only exists if transformation is invertible (det ≠ 0)',
            'If det = 0: transformation collapses space (singular)'
          ],
          geometricMeaning: 'Represents the transformation that exactly undoes the original matrix transformation.'
        },
        'eigenvalues': {
          title: 'Eigenvalues & Eigenvectors - Invariant Directions',
          description: 'Eigenvectors are directions that remain unchanged (only scaled) by the transformation. Eigenvalues are the scaling factors along those directions.',
          visualization: 'Invariant Lines',
          details: [
            'Eigenvector v: direction that doesn\'t rotate under transformation',
            'Eigenvalue λ: scaling factor along eigenvector direction',
            'Mv = λv (eigenvector scaled by eigenvalue)',
            'Eigenvectors define principal axes of transformation',
            'For 2D: eigenvectors show stretching/compression directions',
            'For 3D: eigenvectors show principal axes of deformation'
          ],
          geometricMeaning: 'Eigenvectors reveal the "natural" coordinate system of the transformation, where it acts as simple scaling.'
        },
        'rank': {
          title: 'Matrix Rank - Dimension of Transformation',
          description: 'Rank measures the "dimensionality" of the transformation. It tells you how many dimensions the matrix can actually transform into.',
          visualization: 'Column Space Dimension',
          details: [
            'rank = number of linearly independent columns',
            'rank = number of linearly independent rows',
            'rank = dimension of column space (image of transformation)',
            'rank = dimension of row space',
            'rank ≤ min(rows, columns)',
            'Full rank: rank = min(rows, columns)',
            'Deficient rank: rank < min(rows, columns) → transformation collapses dimensions'
          ],
          geometricMeaning: 'Rank tells you how many dimensions the transformation preserves. Low rank means the transformation squashes space into fewer dimensions.'
        }
      };

      return interpretations[selectedOperation] || interpretations['addition'];
    } else if (mode === '3d') {
      const interpretations = {
        'rotation': {
          title: '3D Rotation - Spherical Motion',
          description: 'Rotation in 3D space rotates objects around an axis. The rotation preserves distances and angles, maintaining the shape of objects.',
          visualization: 'Axis-Angle Rotation',
          details: [
            'Rotates around X, Y, or Z axis',
            'Preserves distances (isometry)',
            'Preserves angles (conformal)',
            'Composition of rotations around different axes',
            'Right-hand rule determines positive rotation direction'
          ],
          geometricMeaning: 'Rigid motion that preserves shape and size, only changing orientation in 3D space.'
        },
        'translation': {
          title: '3D Translation - Displacement',
          description: 'Translation moves every point by the same amount in 3D space. It preserves distances and angles but changes position.',
          visualization: 'Parallel Displacement',
          details: [
            'Moves all points by same vector',
            'Preserves distances (isometry)',
            'Preserves angles',
            'No rotation or scaling',
            'All points move in parallel'
          ],
          geometricMeaning: 'Rigid motion that shifts entire space without rotation or scaling.'
        },
        'scale': {
          title: '3D Scaling - Uniform/Non-uniform Resize',
          description: 'Scaling changes the size of objects. Uniform scaling preserves shape, while non-uniform scaling distorts proportions.',
          visualization: 'Size Transformation',
          details: [
            'Uniform scaling: same factor in all directions (preserves shape)',
            'Non-uniform scaling: different factors per axis (distorts shape)',
            'Scale > 1: enlarges',
            'Scale < 1: shrinks',
            'Scale = 1: no change',
            'Preserves angles but not distances'
          ],
          geometricMeaning: 'Changes size of objects, potentially distorting shape if non-uniform.'
        }
      };

      return interpretations[transform3dType] || interpretations['rotation'];
    } else if (mode === 'advanced') {
      const interpretations = {
        'crossproduct3d': {
          title: '3D Cross Product - Perpendicular Vector',
          description: 'The cross product of two 3D vectors produces a third vector perpendicular to both. Its magnitude equals the area of the parallelogram they form.',
          visualization: 'Right-Hand Rule',
          details: [
            'Result is perpendicular to both input vectors',
            'Magnitude = area of parallelogram',
            'Direction follows right-hand rule',
            'a × b = -b × a (anti-commutative)',
            'a × a = 0 (parallel vectors give zero)'
          ],
          geometricMeaning: 'Creates a vector orthogonal to the plane spanned by the two input vectors. Used for normals, torque, etc.'
        },
        'dotproduct3d': {
          title: '3D Dot Product - Alignment Measure',
          description: 'The 3D dot product measures how much one vector extends in the direction of another, scaled by their magnitudes.',
          visualization: 'Projection and Angle',
          details: [
            'a · b = ||a|| × ||b|| × cos(θ)',
            'Measures alignment between vectors',
            'Positive: acute angle (< 90°)',
            'Zero: perpendicular (90°)',
            'Negative: obtuse angle (> 90°)'
          ],
          geometricMeaning: 'Scalar measure of how aligned two vectors are. Used for projections, angles, and similarity.'
        },
        'projection': {
          title: '3D Vector Projection - Component Along Direction',
          description: 'Projecting a 3D vector onto another gives the component that lies along that direction. It\'s the "shadow" of one vector onto another.',
          visualization: 'Shadow in 3D',
          details: [
            'projᵥ(u) = ((u·v) / ||v||²) × v',
            'Result is parallel to v',
            'Length = ||u|| × cos(θ)',
            'Remainder (u - projᵥ(u)) is perpendicular to v'
          ],
          geometricMeaning: 'Decomposes a vector into parallel and perpendicular components relative to another vector.'
        },
        'angle': {
          title: 'Angle Between 3D Vectors',
          description: 'The angle between two 3D vectors measures their separation in space, regardless of their magnitudes.',
          visualization: '3D Angle',
          details: [
            'θ = arccos((u·v) / (||u|| × ||v||))',
            'Range: 0° to 180°',
            '0°: parallel, same direction',
            '90°: perpendicular',
            '180°: opposite directions'
          ],
          geometricMeaning: 'Measures the geometric relationship between two directions in 3D space.'
        },
        'magnitude3d': {
          title: '3D Magnitude - Distance in Space',
          description: 'The magnitude of a 3D vector is the straight-line distance from the origin to the point in 3D space.',
          visualization: '3D Distance',
          details: [
            '||v|| = √(vₓ² + vᵧ² + vᵧ²)',
            '3D extension of Pythagorean theorem',
            'Forms a rectangular box with x, y, z components',
            'Magnitude is the space diagonal'
          ],
          geometricMeaning: 'Represents the "length" or "size" of a vector in 3D space, independent of direction.'
        },
        'normalize3d': {
          title: '3D Normalize - Unit Vector on Sphere',
          description: 'Normalizing a 3D vector scales it to length 1, placing it on the unit sphere while preserving direction.',
          visualization: 'Unit Sphere',
          details: [
            'û = v / ||v||',
            'Result lies on unit sphere',
            'Direction preserved, magnitude = 1',
            'Used to represent pure directions'
          ],
          geometricMeaning: 'Creates a unit vector representing pure direction in 3D space, useful for normals, directions, etc.'
        }
      };

      return interpretations[selectedOperation] || interpretations['crossproduct3d'];
    }
    return null;
  };

  const interpretation = getGeometricInterpretation();

  if (!interpretation) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg shadow-lg p-4 mb-4 border-2 border-violet-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full mb-3 text-left"
      >
        <div className="flex items-center gap-2">
          <Shapes className="w-5 h-5 text-violet-600" />
          <h3 className="text-lg font-bold text-violet-900">
            Geometric Interpretation
          </h3>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-violet-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-violet-600" />
        )}
      </button>

      {expanded && (
        <div className="bg-white rounded-lg p-4 border-2 border-violet-200">
          <h4 className="text-md font-semibold text-violet-900 mb-2">{interpretation.title}</h4>
          <p className="text-sm text-gray-700 mb-3 leading-relaxed">{interpretation.description}</p>
          
          {interpretation.visualization && (
            <div className="bg-violet-50 p-3 rounded-lg border border-violet-300 mb-3">
              <p className="text-xs font-semibold text-violet-800 mb-1">Visualization Method:</p>
              <p className="text-sm font-semibold text-violet-900">{interpretation.visualization}</p>
            </div>
          )}

          {interpretation.details && interpretation.details.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-violet-800 mb-2">Key Geometric Points:</p>
              <ul className="space-y-1">
                {interpretation.details.map((detail, index) => (
                  <li key={index} className="text-xs text-gray-700 flex items-start gap-2">
                    <span className="text-violet-600 font-bold mt-0.5">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {interpretation.geometricMeaning && (
            <div className="bg-purple-50 p-3 rounded border border-purple-200 mt-3">
              <p className="text-xs font-semibold text-purple-800 mb-1">Geometric Meaning:</p>
              <p className="text-sm text-purple-900 italic">{interpretation.geometricMeaning}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

