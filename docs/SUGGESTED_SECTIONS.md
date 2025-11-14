# Suggested Sections/Pages for Math & Graphics Learning Platform

> **Note:** This document focuses on sections that are **NOT already covered** in the `/shaders` page.  
> The shaders section already includes: Color Spaces, Lighting (Phong), Raymarching, Procedural Generation, Distance Fields, Post-Processing, and more.

## 🎯 High Priority (Core Graphics Math - NOT in Shaders)

### 1. **3D Transformations & Projections** 📐
**Why:** Essential bridge between vector/matrix math and 3D graphics. This is **matrix math**, not shader code.
- **Topics:**
  - 3D Coordinate Systems (World, View, Screen space)
  - Translation, Rotation, Scaling (3D) - Matrix operations
  - Rotation Matrices (Euler angles, Axis-angle)
  - Quaternions (for smooth rotations)
  - View & Projection Matrices
  - Perspective vs Orthographic Projection
  - Camera Systems (Look-at, FPS, Orbit)
- **Interactive Features:**
  - 3D object manipulation (rotate, translate, scale)
  - Camera controls (pan, zoom, orbit)
  - Matrix decomposition visualization
  - Projection comparison (perspective vs ortho)
- **Different from Shaders:** Focuses on **matrix mathematics** and **3D coordinate systems**, not shader implementation

### 2. **Curves & Surfaces** 🌊
**Why:** Foundation for modeling and animation. **Mathematical curves**, not shader effects.
- **Topics:**
  - Bezier Curves (Quadratic, Cubic)
  - B-Splines
  - NURBS Basics
  - Hermite/Bezier Interpolation
  - Surface Patches
  - De Casteljau's Algorithm
- **Interactive Features:**
  - Drag control points
  - Visualize curve construction
  - Animate along curves
  - Surface visualization
- **Different from Shaders:** Focuses on **curve mathematics** and **control point manipulation**, not procedural generation

### 3. **Animation & Interpolation** 🎬
**Why:** Essential for dynamic graphics. **Mathematical interpolation**, not shader time-based effects.
- **Topics:**
  - Linear Interpolation (Lerp)
  - Easing Functions (Ease-in, Ease-out, Ease-in-out)
  - Bezier Easing
  - Keyframe Animation
  - Spherical Linear Interpolation (Slerp)
  - Tweening
  - Physics-based Animation (Spring, Damping)
- **Interactive Features:**
  - Animate objects with different easing
  - Keyframe editor
  - Real-time interpolation visualization
  - Compare interpolation methods
- **Different from Shaders:** Focuses on **animation mathematics** and **interpolation functions**, not shader time uniforms

---

## 🔥 Medium Priority (Advanced Concepts - NOT in Shaders)

### 4. **Physics Simulation Basics** ⚙️
**Why:** Combines math with practical applications. **Physics calculations**, not shader effects.
- **Topics:**
  - Particle Systems (JavaScript-based, not shader)
  - Gravity & Forces
  - Collision Detection (AABB, Circle, SAT)
  - Verlet Integration
  - Cloth Simulation Basics
  - Fluid Dynamics (Simple)
- **Interactive Features:**
  - Interactive particle systems
  - Adjustable physics parameters
  - Real-time simulation
  - Export simulation data
- **Different from Shaders:** Focuses on **physics mathematics** and **JavaScript simulation**, not GPU shader particles

### 5. **Image Processing & Filters** 🖼️
**Why:** Practical application of math in graphics. **Algorithm-focused**, not just shader implementation.
- **Topics:**
  - Convolution Kernels (mathematical explanation)
  - Blur (Gaussian, Box) - kernel math
  - Edge Detection (Sobel, Canny) - gradient math
  - Morphological Operations
  - Histogram Equalization
  - Fourier Transform Basics
- **Interactive Features:**
  - Upload images
  - Apply filters in real-time (JavaScript/Canvas)
  - Adjust kernel parameters
  - Compare filter results
  - Show step-by-step convolution process
- **Different from Shaders:** Focuses on **filter mathematics** and **algorithm explanation**, not just shader post-processing effects

---

## 💎 Advanced Priority (Specialized Topics - NOT in Shaders)

### 6. **Optimization Techniques** ⚡
**Why:** Practical for real-world applications. **Performance math**, not shader code.
- **Topics:**
  - Algorithm Complexity Analysis
  - Spatial Data Structures (Octrees, BVH)
  - Frustum Culling Mathematics
  - LOD (Level of Detail) Calculations
  - Batching & Instancing Math
  - Performance Profiling & Metrics
- **Interactive Features:**
  - Compare optimized vs unoptimized algorithms
  - Performance metrics display
  - Real-time optimization tips
  - Visualize spatial partitioning
- **Different from Shaders:** Focuses on **algorithm optimization** and **performance mathematics**, not shader-specific optimization

---

## 📚 Educational Priority (Supporting Content)

### 7. **Math Reference** 📖
**Why:** Quick reference for formulas and concepts. **Centralized knowledge base**.
- **Content:**
  - Formula Library (all formulas from vectors, matrices, shaders)
  - Common Math Functions
  - Conversion Tables
  - Cheat Sheets
  - Glossary
- **Different from Shaders:** Centralized reference, not shader-specific

### 8. **Interactive Playground** 🎮
**Why:** Sandbox for experimentation. **User-created content**.
- **Features:**
  - Code editor (GLSL + JavaScript)
  - Live preview
  - Save/load projects
  - Share functionality
  - Template library
- **Different from Shaders:** User-generated content, not predefined concepts

### 9. **Tutorials & Challenges** 🎯
**Why:** Guided learning path. **Structured learning**.
- **Content:**
  - Step-by-step tutorials
  - Coding challenges
  - Project ideas
  - Solutions & explanations
  - Progress tracking
- **Different from Shaders:** Learning path, not individual concepts

---

## 🎨 UI/UX Enhancements

### 10. **Visualization Gallery** 🖼️
- Showcase of visualizations
- Filter by topic
- Code snippets
- Interactive demos

### 11. **Progress Tracking** 📊
- Learning path
- Completed topics
- Bookmarks
- Notes system

---

## ❌ What's ALREADY Covered in `/shaders` (Don't Duplicate)

### Already Implemented:
- ✅ **Color Spaces** (HSV, color mixing) - Basic level
- ✅ **Lighting** (Phong) - Advanced level
- ✅ **Raymarching** - Advanced level
- ✅ **Procedural Generation** (Noise, Advanced Noise, Patterns) - Intermediate level
- ✅ **Distance Fields** - Intermediate level
- ✅ **Post-Processing** (Blur, Edge Detection, Vignette, Chromatic, Glitch, Bloom, Color Grading, AO) - Intermediate level
- ✅ **Displacement Mapping** - Intermediate level
- ✅ **Coordinate Transformations** (Rotation, Translation, Scaling, Polar) - Basic level
- ✅ **Basic Shapes** (Circle, Rectangle, Line) - Basic level
- ✅ **Gradients** (Linear & Radial) - Basic level
- ✅ **Math Operations** - Basic level

### Don't Create Separate Sections For:
- ❌ Color Theory (already in shaders)
- ❌ Lighting Models (already in shaders)
- ❌ Raymarching (already in shaders)
- ❌ Procedural Generation (already in shaders)
- ❌ Distance Fields (already in shaders)
- ❌ Post-Processing (already in shaders)

---

## 📋 Implementation Priority Recommendation

### Phase 1 (Foundation - Math Focus):
1. **3D Transformations & Projections** - Critical bridge from vector/matrix math
2. **Curves & Surfaces** - Mathematical foundation for modeling
3. **Animation & Interpolation** - Mathematical interpolation functions

### Phase 2 (Practical Applications):
4. **Image Processing & Filters** - Algorithm-focused, not shader-focused
5. **Physics Simulation Basics** - JavaScript-based physics math

### Phase 3 (Supporting Content):
6. **Math Reference** - Centralized knowledge base
7. **Interactive Playground** - User empowerment
8. **Tutorials & Challenges** - Guided learning

### Phase 4 (Polish):
9. **Visualization Gallery** - Showcase
10. **Progress Tracking** - Learning management

---

## 💡 Quick Wins (Easy to Implement)

1. **Math Reference** - Static content, high value (centralize existing formulas)
2. **Animation Basics** - Simple interpolation demos (mathematical, not shader)
3. **Formula Library** - Centralize existing formulas from all sections

---

## 🔗 Integration Opportunities

- **Link Vector/Matrix → 3D Transformations** (natural progression - matrix math)
- **Link 3D Transformations → Shaders** (use transformation matrices in shaders)
- **Link Curves → Animation** (smooth motion mathematics)
- **Link Math Reference → All Sections** (centralized knowledge base)

---

## 📝 Notes

- Each section should follow the existing pattern:
  - Interactive visualizations
  - Step-by-step explanations
  - Code examples
  - Theory & formulas
  - Mathematical concepts
  - Geometric interpretations

- **Key Distinction:** These sections focus on **mathematical concepts** and **algorithms**, not shader implementation. They complement the shader section by providing the mathematical foundation.

- Consider modular components that can be reused across sections

- Maintain consistency with existing UI/UX patterns

- **Avoid Duplication:** Don't recreate concepts already in `/shaders`. Instead, focus on:
  - Mathematical foundations (3D transformations, curves)
  - Algorithm explanations (image processing, physics)
  - Supporting content (reference, playground, tutorials)

