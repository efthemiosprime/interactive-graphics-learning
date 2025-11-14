# Interactive Graphics Learning Platform

An interactive educational web application for learning computer graphics, linear algebra, WebGL programming, and mathematical concepts through hands-on visualizations and step-by-step tutorials.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![WebGL](https://img.shields.io/badge/WebGL-Enabled-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎯 Features

### 📐 Vector & Matrix Operations
- **Vector Operations**: Addition, subtraction, dot product, cross product, magnitude, normalization, angle calculation, projection, reflection
- **Matrix Operations**: Addition, subtraction, multiplication, determinant, transpose, inverse, eigenvalues, rank, matrix-to-vector application
- **Interactive Visualizations**: Real-time SVG visualizations with step-by-step breakdowns
- **Educational Content**: Detailed explanations, formulas, and real-world applications

### 🎨 Shaders
- **Shader Levels**: Basic, Intermediate, and Advanced shader concepts
- **Shader Types**: Fragment, Vertex, and Compute shaders
- **Interactive Shader Editor**: Real-time shader visualization with customizable parameters
- **Shader Concepts**: Color manipulation, UV coordinates, noise generation, lighting, post-processing effects
- **Complete Tutorials**: 
  - [Vite + WebGL Tutorial](/shaders/tutorial) - Build shader visualizations from scratch
  - [Three.js Tutorial](/shaders/tutorial) - Learn shader development with Three.js

### 🔄 3D Transformations
- **Transformation Types**: Rotation, Translation, Scaling, Projection, Quaternions
- **Interactive Controls**: Real-time manipulation of 3D objects
- **Visual Feedback**: See transformations applied instantly
- **Educational Panels**: Learn the math behind each transformation

### 📊 Curves & Surfaces
- **Curve Types**: Bezier curves, B-splines, Hermite curves, Catmull-Rom splines, NURBS
- **Parametric Surfaces**: Interactive surface visualization
- **Interactive Editing**: Drag control points to modify curves in real-time
- **Complete Tutorial**: [Build a Curves & Surfaces Editor](/curves-surfaces/tutorials)

### 🎬 Animation & Interpolation
- **Interpolation Types**: Linear (LERP), Easing functions, Bezier easing, SLERP
- **Keyframe Animation**: Multi-point animation with customizable interpolation
- **Path Animation**: Animate objects along curves
- **Interactive Timeline**: Control animation playback and scrubbing
- **Complete Tutorial**: [Build an Animation & Interpolation Editor](/animation-interpolation/tutorials)

### 🎮 2D Game Engine Tutorial
- **Complete Engine**: Build a full 2D game engine from scratch
- **Modules**: Core, Renderer, Scene, Entity, Input, Utils, AssetLoader, Sprite, Effects, Font, Tweening
- **Step-by-Step Guide**: Detailed implementation for each engine component
- **Complete Tutorial**: [Build a 2D Game Engine](/engine2d-tutorial/complete)

### 🔧 Transformation Visualization
- **2D & 3D Transformations**: Visualize matrix operations and transformations
- **Interactive Demos**: Real-time transformation visualization
- **Educational Content**: Learn transformation matrices and their applications
- **Complete Tutorials**: 
  - [2D Transformations Tutorial](/transformation-visualization/tutorials)
  - [3D Transformations Tutorial](/transformation-visualization/tutorials)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/interactive-graphics-learning.git
   cd interactive-graphics-learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📚 Available Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Main landing page with navigation |
| **Vector & Matrix** | `/vector-matrix` | Interactive vector and matrix operations |
| **Shaders** | `/shaders` | Shader visualization and editor |
| **Shaders Tutorial** | `/shaders/tutorial` | Complete shader development tutorial |
| **3D Transformations** | `/transform3d` | 3D transformation visualizations |
| **Curves & Surfaces** | `/curves-surfaces` | Parametric curves and surfaces |
| **Curves Tutorial** | `/curves-surfaces/tutorials` | Build a curves editor tutorial |
| **Animation & Interpolation** | `/animation-interpolation` | Animation and interpolation demos |
| **Animation Tutorial** | `/animation-interpolation/tutorials` | Build an animation editor tutorial |
| **2D Engine Tutorial** | `/engine2d-tutorial` | Step-by-step 2D game engine tutorial |
| **2D Engine Complete** | `/engine2d-tutorial/complete` | Complete 2D engine building tutorial |
| **Transformation Visualization** | `/transformation-visualization` | Transformation matrix visualizations |
| **Transformation Tutorial** | `/transformation-visualization/tutorials` | Build transformation editor tutorial |

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **WebGL** - 3D graphics rendering
- **GLSL** - Shader programming
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Canvas API** - 2D rendering
- **SVG** - Vector graphics

## 📁 Project Structure

```
deep_learning/
├── src/
│   ├── components/          # React components
│   │   ├── shader/         # Shader-related components
│   │   ├── transform3D/    # 3D transformation components
│   │   ├── curvesAndSurfaces/  # Curve visualization components
│   │   ├── animationInterpolation/  # Animation components
│   │   ├── engine2D/      # 2D engine components
│   │   └── transformation/  # Transformation components
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Shaders.jsx
│   │   ├── ShadersTutorial.jsx
│   │   ├── Transform3D.jsx
│   │   ├── CurvesAndSurfaces.jsx
│   │   ├── CurvesAndSurfacesTutorial.jsx
│   │   ├── AnimationInterpolation.jsx
│   │   ├── AnimationInterpolationTutorial.jsx
│   │   ├── Engine2DTutorial.jsx
│   │   ├── Engine2DCompleteTutorial.jsx
│   │   ├── TransformationVisualization.jsx
│   │   └── TransformationTutorial.jsx
│   ├── utils/              # Utility functions
│   │   ├── math.js         # Mathematical operations
│   │   ├── theory.js       # Educational content
│   │   ├── formulas.js     # Formula definitions
│   │   ├── decomposition.jsx  # Step-by-step visualizations
│   │   └── shader/         # Shader utilities
│   ├── shaders/            # GLSL shader files
│   │   ├── vertex.glsl
│   │   └── fragment/      # Fragment shaders
│   ├── engine2D/          # 2D game engine modules
│   ├── App.jsx             # Main app component
│   └── main.jsx           # Entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── README.md              # This file
```

## 🎓 Learning Resources

This platform includes comprehensive step-by-step tutorials for:

1. **Shader Development**
   - Building shader visualizations with Vite + WebGL
   - Creating shaders with Three.js
   - Understanding GLSL and WebGL concepts

2. **Transformation Editors**
   - Building 2D transformation visualizers
   - Creating 3D transformation editors
   - Understanding matrix mathematics

3. **Curves & Surfaces**
   - Implementing Bezier curves
   - Creating B-splines and NURBS
   - Building interactive curve editors

4. **Animation Systems**
   - Implementing interpolation functions
   - Creating keyframe animation systems
   - Building path-based animations

5. **Game Engine Development**
   - Building a complete 2D game engine
   - Understanding engine architecture
   - Implementing core game systems

## 🧪 Features in Detail

### Interactive Visualizations
- Real-time updates as you adjust parameters
- Step-by-step visual breakdowns
- Educational explanations for each concept
- Formula references and mathematical theory

### Step-by-Step Tutorials
- Complete code examples
- File structure guidance
- Detailed explanations
- Best practices and tips

### Educational Content
- Real-world applications
- Mathematical foundations
- Geometric interpretations
- Common pitfalls and debugging tips

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Happy Learning! 🚀**
