# 2D Engine Features & Extensions

## Current Core Modules (Implemented)

1. **Core** - Canvas initialization & main loop ✅
2. **Renderer** - Drawing shapes, sprites, and text ✅
3. **Scene** - Entity management & hierarchy ✅
4. **Entity** - Base class for drawable objects ✅
5. **Input** - Mouse/touch event handling ✅
6. **Utils** - Math helpers & timing tools ✅

## Additional Modules (Available)

### 7. AssetLoader ✅ (Just Added)
**Purpose**: Load and manage images, textures, and other assets

**Features**:
- Image loading with Promises
- Asset caching
- Loading progress tracking
- Error handling
- Batch loading

**Usage**:
```javascript
import { AssetLoader } from './engine2D/AssetLoader.js';

const loader = new AssetLoader();
await loader.loadImage('player', '/sprites/player.png');
const playerSprite = loader.get('player');
```

### 8. Camera ✅ (Just Added)
**Purpose**: Viewport and camera system

**Features**:
- Camera position and zoom
- Viewport transformation
- Screen-to-world coordinate conversion
- Entity following
- Camera bounds

**Usage**:
```javascript
import { Camera } from './engine2D/Camera.js';

const camera = new Camera(400, 300, 1.5);
camera.follow(playerEntity);
camera.update(deltaTime);
camera.apply(renderer);
// Render entities
camera.unapply(renderer);
```

### 9. Collision ✅ (Just Added)
**Purpose**: Collision detection system

**Features**:
- AABB (Axis-Aligned Bounding Box) collision
- Circle collision detection
- Point-in-shape tests
- Collision response helpers

**Usage**:
```javascript
import { Collision } from './engine2D/Collision.js';

if (Collision.aabb(rect1, rect2)) {
  // Handle collision
}
```

### 10. Sprite ✅ (Just Added)
**Purpose**: Sprite and animation system

**Features**:
- Sprite entity with image support
- Sprite sheet animation
- Frame-based animation
- Animation state management

**Usage**:
```javascript
import { Sprite } from './engine2D/Sprite.js';

const sprite = new Sprite(100, 100, image);
sprite.setSpriteSheet(spriteSheet, 32, 32, 8);
sprite.addAnimation('walk', [0, 1, 2, 3], 0.1, true);
sprite.playAnimation('walk');
```

## Suggested Additional Features

### 11. Physics (Basic)
- Velocity and acceleration
- Gravity
- Friction
- Basic forces

### 12. Audio System
- Sound effect playback
- Background music
- Volume control
- Audio sprites

### 13. Particle System
- Particle emitters
- Particle effects (fire, smoke, explosions)
- Configurable particle properties

### 14. Tilemap System
- Tile-based level loading
- Tile rendering
- Collision from tilemap data

### 15. State Management
- Game states (Menu, Playing, Paused)
- State transitions
- State-specific update/render

### 16. UI System
- UI elements (buttons, panels, text)
- Layout management
- Event handling for UI

### 17. Pathfinding
- A* pathfinding algorithm
- Grid-based navigation
- Path smoothing

### 18. Save System
- LocalStorage integration
- Save/load game state
- Settings persistence

## Image/Texture Loading

**Current Status**: ✅ Supported via AssetLoader module

The engine now supports image loading through the `AssetLoader` class:

```javascript
// Load single image
const loader = new AssetLoader();
const image = await loader.loadImage('player', '/sprites/player.png');

// Load multiple images
const assets = await loader.loadImages({
  player: '/sprites/player.png',
  enemy: '/sprites/enemy.png',
  background: '/sprites/bg.png'
});

// Use in renderer
renderer.drawSprite(loader.get('player'), x, y, width, height);
```

**Features**:
- Promise-based loading
- Automatic caching
- Progress tracking
- Error handling
- Sprite sheet support (via Sprite class)

