// Utility functions for 2D Engine Demo visualization

// Check if demo needs animation loop
export const needsAnimation = (module, step) => {
  // Steps that need animation
  const animatedSteps = {
    setup: [2, 3, 4, 5, 6, 7, 8, 9, 10], // Most setup steps show animations/demos
    core: [2, 3, 4, 6], // Game loop, timing, running state, usage example
    renderer: [2, 6], // Transformations, usage example
    scene: [4, 6], // Update/render lifecycle, spatial queries
    entity: [2, 3, 4], // Rotation, scale, combined transforms
    input: [1, 2, 3, 5, 6], // All steps need mouse tracking
    utils: [2, 3, 4, 5, 6], // Distance, timing, vector ops, math helpers, usage example
    assetloader: [2, 3, 4, 5, 6], // Loading progress, batch loading, usage examples
    sprite: [2, 3, 4, 5, 6], // Animation, sprite sheets, usage examples
    effects: [2, 3, 4, 5, 6], // Blend modes, filters, post-processing animations
    font: [2, 3, 4, 5, 6], // Font loading progress, multiple fonts, usage examples
    tweening: [1, 2, 3, 4, 5, 6] // All steps show animated tweens
  };
  
  return animatedSteps[module] && animatedSteps[module].includes(step);
};

export const drawModuleDemo = (ctx, module, step, width, height, mousePos = null, mouseDown = false, clickedEntity = null) => {
  // Don't clear here - let each demo function handle it
  // This allows for smoother animations

  switch (module) {
    case 'setup':
      drawSetupDemo(ctx, step, width, height);
      break;
    case 'core':
      drawCoreDemo(ctx, step, width, height);
      break;
    case 'renderer':
      drawRendererDemo(ctx, step, width, height);
      break;
    case 'scene':
      drawSceneDemo(ctx, step, width, height);
      break;
    case 'entity':
      drawEntityDemo(ctx, step, width, height);
      break;
    case 'input':
      drawInputDemo(ctx, step, width, height, mousePos, mouseDown, clickedEntity);
      break;
    case 'utils':
      drawUtilsDemo(ctx, step, width, height);
      break;
    case 'assetloader':
      drawAssetLoaderDemo(ctx, step, width, height);
      break;
    case 'sprite':
      drawSpriteDemo(ctx, step, width, height);
      break;
    case 'effects':
      drawEffectsDemo(ctx, step, width, height);
      break;
    case 'font':
      drawFontDemo(ctx, step, width, height);
      break;
    case 'tweening':
      drawTweeningDemo(ctx, step, width, height);
      break;
    default:
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Select a module to see demo', width / 2, height / 2);
  }
};

// Setup module demo visualization
let setupTime = 0;
const drawSetupDemo = (ctx, step, width, height) => {
  setupTime += 0.016; // Approximate delta time
  
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'left';
  
  if (step === 1) {
    ctx.fillText('Step 1: Project Setup with Vite.js', 20, 40);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('1. Install Node.js and npm', 20, 80);
    ctx.fillText('2. Create Vite project: npm create vite@latest engine2d-tutorial', 20, 110);
    ctx.fillText('3. Install dependencies: npm install', 20, 140);
    ctx.fillText('4. Create project structure:', 20, 170);
    ctx.fillStyle = '#4ade80';
    ctx.font = '12px monospace';
    ctx.fillText('   src/engine2D/', 30, 200);
    ctx.fillText('   ├── Core.js', 40, 220);
    ctx.fillText('   ├── Renderer.js', 40, 240);
    ctx.fillText('   └── ...', 40, 260);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('5. Configure index.html with canvas', 20, 300);
    ctx.fillText('6. Start dev server: npm run dev', 20, 330);
  } else if (step === 2) {
    ctx.fillText('Step 2: Creating the Core Module', 20, 40);
    
    // Animated canvas initialization
    const progress = Math.min(setupTime * 2, 1);
    const canvasX = 50 + (width - 100) * progress;
    const canvasY = 100;
    const canvasW = 100;
    const canvasH = 80;
    
    // Draw canvas
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.strokeRect(canvasX, canvasY, canvasW, canvasH);
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(canvasX + 2, canvasY + 2, canvasW - 4, canvasH - 4);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.fillText('Canvas initialized', canvasX, canvasY - 10);
    
    // Game loop visualization
    if (progress >= 0.5) {
      const loopY = canvasY + canvasH + 30;
      ctx.fillStyle = '#4ade80';
      ctx.font = '12px monospace';
      ctx.fillText('Game Loop Running', 50, loopY);
      
      // Animated FPS counter
      const fps = 30 + Math.sin(setupTime * 5) * 10;
      ctx.fillText(`FPS: ${Math.floor(fps)}`, 50, loopY + 25);
      
      // Delta time visualization
      const deltaTime = 0.016 + Math.sin(setupTime * 3) * 0.005;
      ctx.fillText(`Delta Time: ${deltaTime.toFixed(4)}s`, 50, loopY + 45);
    }
  } else if (step === 3) {
    ctx.fillText('Step 3: Creating the Renderer Module', 20, 40);
    
    // Draw shapes demonstration
    const time = setupTime;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Rectangle
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(centerX - 150, centerY - 50, 60, 60);
    
    // Circle
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fill();
    
    // Text
    ctx.fillStyle = '#4ade80';
    ctx.font = '16px Arial';
    ctx.fillText('Renderer', centerX + 100, centerY);
    
    // Transform demonstration
    ctx.save();
    ctx.translate(centerX, centerY - 100);
    ctx.rotate(time);
    ctx.scale(1 + Math.sin(time * 2) * 0.3, 1 + Math.sin(time * 2) * 0.3);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-20, -20, 40, 40);
    ctx.restore();
    
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px monospace';
    ctx.fillText('Transform Stack Demo', centerX - 60, centerY - 130);
  } else if (step === 4) {
    ctx.fillText('Step 4: Creating the Scene Module', 20, 40);
    
    // Entity collection visualization
    const entities = [
      { x: 100, y: 100, color: '#ef4444', label: 'Entity 1' },
      { x: 200, y: 150, color: '#3b82f6', label: 'Entity 2' },
      { x: 300, y: 120, color: '#4ade80', label: 'Entity 3' },
      { x: 150, y: 200, color: '#fbbf24', label: 'Entity 4' }
    ];
    
    entities.forEach((entity, i) => {
      ctx.fillStyle = entity.color;
      ctx.fillRect(entity.x, entity.y, 40, 40);
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.fillText(entity.label, entity.x, entity.y - 5);
    });
    
    // Hierarchy visualization
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.lineTo(150, 200);
    ctx.stroke();
    
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px monospace';
    ctx.fillText('Parent → Child Hierarchy', 100, 250);
  } else if (step === 5) {
    ctx.fillText('Step 5: Creating the Entity Module', 20, 40);
    
    // Transform visualization
    const time = setupTime;
    const parentX = width / 2 - 100;
    const parentY = height / 2;
    const childX = parentX + 80;
    const childY = parentY;
    
    // Parent entity
    ctx.save();
    ctx.translate(parentX, parentY);
    ctx.rotate(time * 0.5);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-25, -25, 50, 50);
    ctx.restore();
    
    // Child entity (relative to parent)
    ctx.save();
    ctx.translate(parentX, parentY);
    ctx.rotate(time * 0.5);
    ctx.translate(80, 0);
    ctx.rotate(time);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(-15, -15, 30, 30);
    ctx.restore();
    
    // World position calculation
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px monospace';
    ctx.fillText('World Transform = Parent × Local', 50, height - 50);
  } else if (step === 6) {
    ctx.fillText('Step 6: Creating the Input Module', 20, 40);
    
    // Mouse tracking visualization
    const mouseX = width / 2 + Math.sin(setupTime) * 100;
    const mouseY = height / 2 + Math.cos(setupTime) * 80;
    
    // Draw interactive area
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 100, width - 100, height - 200);
    
    // Mouse cursor
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouse position text
    ctx.fillStyle = '#4ade80';
    ctx.font = '12px monospace';
    ctx.fillText(`Mouse: (${Math.floor(mouseX)}, ${Math.floor(mouseY)})`, 50, 90);
    
    // Hit test visualization
    const hitBox = { x: width / 2, y: height / 2, w: 80, h: 60 };
    const hit = mouseX >= hitBox.x && mouseX <= hitBox.x + hitBox.w &&
                mouseY >= hitBox.y && mouseY <= hitBox.y + hitBox.h;
    
    ctx.fillStyle = hit ? '#4ade80' : '#ef4444';
    ctx.fillRect(hitBox.x, hitBox.y, hitBox.w, hitBox.h);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.fillText('Hit Test', hitBox.x + 10, hitBox.y + 35);
  } else if (step === 7) {
    ctx.fillText('Step 7: Creating the Utils Module', 20, 40);
    
    // Vector visualization
    const v1 = { x: 100, y: 150 };
    const v2 = { x: 200, y: 200 };
    const vSum = { x: v1.x + v2.x, y: v1.y + v2.y };
    
    // Vector 1
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(v1.x, v1.y);
    ctx.stroke();
    
    // Vector 2
    ctx.strokeStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.stroke();
    
    // Sum vector
    ctx.strokeStyle = '#4ade80';
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(vSum.x, vSum.y);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.fillText('v1', v1.x + 10, v1.y);
    ctx.fillText('v2', v2.x + 10, v2.y);
    ctx.fillText('v1 + v2', vSum.x + 10, vSum.y);
    
    // Distance calculation
    const dist = Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2);
    ctx.fillText(`Distance: ${dist.toFixed(1)}`, 50, 250);
    
    // LERP visualization
    const lerpValue = 0.5 + Math.sin(setupTime) * 0.5;
    const lerpStart = 50;
    const lerpEnd = width - 50;
    const lerpPos = lerpStart + (lerpEnd - lerpStart) * lerpValue;
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(lerpPos - 10, 280, 20, 20);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`LERP: ${lerpValue.toFixed(2)}`, 50, 320);
  } else if (step === 8) {
    ctx.fillText('Step 8: Creating the AssetLoader Module', 20, 40);
    
    // Loading progress visualization
    const progress = (Math.sin(setupTime * 2) + 1) / 2;
    const loadingImages = ['player.png', 'enemy.png', 'background.png'];
    
    loadingImages.forEach((img, i) => {
      const y = 100 + i * 80;
      const imgProgress = Math.min(progress + i * 0.2, 1);
      
      // Progress bar
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(50, y, 200, 20);
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(50, y, 200 * imgProgress, 20);
      
      // Label
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText(img, 50, y - 5);
      ctx.fillText(`${Math.floor(imgProgress * 100)}%`, 260, y + 15);
    });
    
    // Cache visualization
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px monospace';
    ctx.fillText('Cache: Map<key, image>', 50, 350);
    ctx.fillText('O(1) lookup time', 50, 370);
  } else if (step === 9) {
    ctx.fillText('Step 9: Creating the Sprite Module', 20, 40);
    
    // Sprite sheet visualization
    const sheetX = 50;
    const sheetY = 100;
    const frameW = 32;
    const frameH = 32;
    const cols = 4;
    const currentFrame = Math.floor(setupTime * 5) % 8;
    const col = currentFrame % cols;
    const row = Math.floor(currentFrame / cols);
    
    // Draw sprite sheet grid
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 1;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < 2; r++) {
        ctx.strokeRect(sheetX + c * frameW, sheetY + r * frameH, frameW, frameH);
      }
    }
    
    // Highlight current frame
    ctx.fillStyle = 'rgba(74, 222, 128, 0.3)';
    ctx.fillRect(sheetX + col * frameW, sheetY + row * frameH, frameW, frameH);
    
    // Current sprite
    const spriteX = 250;
    const spriteY = 150;
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(spriteX, spriteY, frameW * 2, frameH * 2);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.fillText(`Frame: ${currentFrame}`, spriteX, spriteY - 10);
    ctx.fillText(`Col: ${col}, Row: ${row}`, spriteX, spriteY + frameH * 2 + 15);
  } else if (step === 10) {
    ctx.fillText('Step 10: Creating the Effects Module', 20, 40);
    
    const time = setupTime;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Blend mode demo
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(centerX - 100, centerY - 100, 60, 60);
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(centerX - 80, centerY - 80, 60, 60);
    ctx.globalCompositeOperation = 'source-over';
    
    // Blur demo
    ctx.filter = `blur(${2 + Math.sin(time) * 2}px)`;
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(centerX + 50, centerY - 100, 60, 60);
    ctx.filter = 'none';
    
    // Shadow demo
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(centerX - 25, centerY + 20, 60, 60);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px monospace';
    ctx.fillText('Blend Mode', centerX - 100, centerY - 120);
    ctx.fillText('Blur Filter', centerX + 50, centerY - 120);
    ctx.fillText('Drop Shadow', centerX - 25, centerY + 10);
  } else {
    ctx.fillText('Setup Module', 20, 40);
  }
};

const drawCoreDemo = (ctx, step, width, height) => {
  // Clear background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  
  if (step === 1) {
    ctx.fillText('Step 1: Initialize Canvas', 20, 40);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(20, 60, width - 40, 60);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Canvas initialized', 30, 90);
  } else if (step === 2) {
    ctx.fillText('Step 2: Set up Game Loop', 20, 40);
    // Animate a simple counter
    const time = Date.now() / 1000;
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(20, 60, (time % 1) * (width - 40), 60);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Frame: ${Math.floor(time * 60)}`, 30, 90);
  } else if (step === 3) {
    ctx.fillText('Step 3: Frame Timing & FPS', 20, 40);
    const time = Date.now() / 1000;
    // Show FPS counter
    ctx.fillStyle = '#fbbf24';
    ctx.font = '24px monospace';
    ctx.fillText(`FPS: ${Math.floor(60 + Math.sin(time) * 5)}`, 20, 100);
    // Show delta time
    ctx.fillStyle = '#60a5fa';
    ctx.font = '18px monospace';
    ctx.fillText(`Delta Time: ${(0.016 + Math.sin(time * 2) * 0.002).toFixed(4)}s`, 20, 140);
  } else if (step === 4) {
    ctx.fillText('Step 4: Complete Core Module', 20, 40);
    ctx.fillStyle = '#a78bfa';
    ctx.font = '18px monospace';
    ctx.fillText('Engine2D class ready!', 20, 100);
    // Show engine running
    const time = Date.now() / 1000;
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('RUNNING', width / 2, height / 2 + 5);
  } else if (step === 5) {
    ctx.fillText('Step 5: Engine Lifecycle', 20, 40);
    const time = Date.now() / 1000;
    // Show start/stop functionality
    ctx.fillStyle = '#60a5fa';
    ctx.font = '18px monospace';
    ctx.fillText('Engine State:', 20, 100);
    ctx.fillStyle = '#4ade80';
    ctx.fillText('● Running', 20, 130);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.fillText('start() - Begin game loop', 20, 160);
    ctx.fillText('stop() - End game loop', 20, 180);
    ctx.fillText('onUpdate(callback) - Set update handler', 20, 200);
    ctx.fillText('onRender(callback) - Set render handler', 20, 220);
  } else if (step === 6) {
    ctx.fillText('Step 6: Usage Example', 20, 40);
    ctx.fillStyle = '#a78bfa';
    ctx.font = '14px monospace';
    ctx.fillText('const engine = new Engine2D("canvas");', 20, 80);
    ctx.fillText('engine.onUpdate((dt) => { ... });', 20, 100);
    ctx.fillText('engine.onRender((ctx) => { ... });', 20, 120);
    ctx.fillText('engine.start();', 20, 140);
    // Animated example
    const time = Date.now() / 1000;
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2 + 60, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#60a5fa';
    const x = width / 2 + Math.cos(time) * 80;
    const y = height / 2 + 60 + Math.sin(time) * 40;
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Fallback for any other step
    ctx.fillText('Core Module', 20, 40);
    ctx.fillStyle = '#a78bfa';
    const time = Date.now() / 1000;
    const x = width / 2 + Math.cos(time) * 50;
    const y = height / 2 + Math.sin(time) * 50;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  }
};

const drawRendererDemo = (ctx, step, width, height) => {
  // Clear background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  
  if (step === 1) {
    ctx.fillText('Step 1: Draw Rectangle', 20, 40);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(100, 100, 150, 100);
    // Also show stroke
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 100, 150, 100);
  } else if (step === 2) {
    ctx.fillText('Step 2: Transformations', 20, 40);
    const time = Date.now() / 1000;
    // Show rotation
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(time);
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(-40, -40, 80, 80);
    ctx.restore();
    // Show scale
    ctx.save();
    ctx.translate(width / 2, height / 2);
    const scale = 1 + Math.sin(time * 2) * 0.3;
    ctx.scale(scale, scale);
    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(-30, -30, 60, 60);
    ctx.restore();
  } else if (step === 3) {
    ctx.fillText('Step 3: Draw Text', 20, 40);
    ctx.fillStyle = '#fbbf24';
    ctx.font = '32px sans-serif';
    ctx.fillText('Hello Engine!', 150, 200);
    // Also show styled text
    ctx.fillStyle = '#60a5fa';
    ctx.font = '24px monospace';
    ctx.fillText('Styled Text', 150, 250);
  } else if (step === 4) {
    ctx.fillText('Step 4: Complete Renderer', 20, 40);
    ctx.fillStyle = '#a78bfa';
    ctx.font = '18px monospace';
    ctx.fillText('Renderer class ready!', 20, 100);
    // Show all shapes combined
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(50, 150, 100, 80);
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(300, 190, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.font = '24px sans-serif';
    ctx.fillText('Renderer', 200, 280);
    // Show line
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 120);
    ctx.lineTo(350, 120);
    ctx.stroke();
  } else if (step === 5) {
    ctx.fillText('Step 5: Advanced Drawing', 20, 40);
    // Show polygon
    ctx.fillStyle = '#a78bfa';
    ctx.beginPath();
    ctx.moveTo(300, 100);
    ctx.lineTo(350, 150);
    ctx.lineTo(300, 200);
    ctx.lineTo(250, 200);
    ctx.lineTo(200, 150);
    ctx.lineTo(250, 100);
    ctx.closePath();
    ctx.fill();
    // Show arc
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(150, 250, 50, 0, Math.PI);
    ctx.stroke();
    // Show gradient-like effect with multiple circles
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = `rgba(96, 165, 250, ${1 - i * 0.2})`;
      ctx.beginPath();
      ctx.arc(450, 200, 30 - i * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (step === 6) {
    ctx.fillText('Step 6: Usage Example', 20, 40);
    ctx.fillStyle = '#a78bfa';
    ctx.font = '14px monospace';
    ctx.fillText('const renderer = new Renderer(ctx);', 20, 80);
    ctx.fillText('renderer.fillRect(100, 100, 50, 50);', 20, 100);
    ctx.fillText('renderer.fillCircle(200, 200, 25);', 20, 120);
    ctx.fillText('renderer.drawText("Hello", 300, 300);', 20, 140);
    // Animated example
    const time = Date.now() / 1000;
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(100, 200, 50, 50);
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(200 + Math.cos(time) * 30, 225 + Math.sin(time) * 20, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.font = '20px sans-serif';
    ctx.fillText('Hello', 300, 300);
  } else {
    // Fallback
    ctx.fillText('Renderer Module', 20, 40);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(50, 50, 100, 80);
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(300, 150, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.font = '24px sans-serif';
    ctx.fillText('Renderer', 200, 250);
  }
};

const drawSceneDemo = (ctx, step, width, height) => {
  // Clear background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  
  if (step === 1) {
    ctx.fillText('Step 1: Create Scene', 20, 40);
    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(50, 80, width - 100, height - 120);
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px monospace';
    ctx.fillText('Scene Container', 60, 110);
    // Show scene structure
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('scene.entities = []', 60, 140);
  } else if (step === 2) {
    ctx.fillText('Step 2: Add Entities', 20, 40);
    // Draw multiple entities - make sure they fit on screen
    const numEntities = 5;
    const entityWidth = 60;
    const entityHeight = 60;
    const spacing = (width - 100 - numEntities * entityWidth) / (numEntities - 1);
    
    for (let i = 0; i < numEntities; i++) {
      ctx.fillStyle = `hsl(${i * 60}, 70%, 60%)`;
      const x = 50 + i * (entityWidth + spacing);
      ctx.fillRect(x, 100, entityWidth, entityHeight);
      // Show entity index
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${i + 1}`, x + entityWidth / 2, 100 + entityHeight / 2 + 4);
      ctx.textAlign = 'left';
    }
  } else if (step === 3) {
    ctx.fillText('Step 3: Entity Hierarchy', 20, 40);
    // Draw parent-child relationship - ensure it fits
    const parentX = width / 2 - 50;
    const parentY = height / 2 - 50;
    const parentSize = 100;
    
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(parentX, parentY, parentSize, parentSize);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Parent', parentX + parentSize / 2, parentY + parentSize / 2 + 5);
    
    // Draw children relative to parent
    ctx.fillStyle = '#60a5fa';
    const childSize = 30;
    const offset = 10;
    ctx.fillRect(parentX + offset, parentY + offset, childSize, childSize);
    ctx.fillRect(parentX + parentSize - offset - childSize, parentY + offset, childSize, childSize);
    ctx.fillRect(parentX + offset, parentY + parentSize - offset - childSize, childSize, childSize);
    ctx.fillRect(parentX + parentSize - offset - childSize, parentY + parentSize - offset - childSize, childSize, childSize);
    
    ctx.textAlign = 'left';
  } else if (step === 4) {
    ctx.fillText('Step 4: Update & Render', 20, 40);
    ctx.fillStyle = '#a78bfa';
    ctx.font = '18px monospace';
    ctx.fillText('Scene Lifecycle', 20, 100);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.fillText('scene.update(deltaTime)', 20, 130);
    ctx.fillText('scene.render(renderer)', 20, 155);
    // Show entities being updated/rendered
    const time = Date.now() / 1000;
    for (let i = 0; i < 3; i++) {
      const x = 100 + i * 150;
      const y = 200 + Math.sin(time + i) * 10;
      ctx.fillStyle = `hsl(${i * 120}, 70%, 60%)`;
      ctx.fillRect(x, y, 50, 50);
    }
  } else if (step === 5) {
    ctx.fillText('Step 5: Entity Queries', 20, 40);
    // Show query by type
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('findByType(Enemy)', 20, 100);
    // Draw different entity types
    ctx.fillStyle = '#ef4444'; // Enemies (red)
    ctx.fillRect(50, 120, 40, 40);
    ctx.fillRect(150, 120, 40, 40);
    ctx.fillStyle = '#4ade80'; // Others (green)
    ctx.fillRect(250, 120, 40, 40);
    ctx.fillRect(350, 120, 40, 40);
    // Highlight queried entities
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 120, 40, 40);
    ctx.strokeRect(150, 120, 40, 40);
  } else if (step === 6) {
    ctx.fillText('Step 6: Spatial Queries', 20, 40);
    const time = Date.now() / 1000;
    // Show query by position
    const queryX = width / 2;
    const queryY = height / 2;
    const radius = 80;
    
    // Draw query radius
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(queryX, queryY, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw entities
    const numEntities = 8;
    for (let i = 0; i < numEntities; i++) {
      const angle = (i / numEntities) * Math.PI * 2 + time;
      const dist = 60 + Math.sin(time * 2 + i) * 20;
      const x = queryX + Math.cos(angle) * dist;
      const y = queryY + Math.sin(angle) * dist;
      
      const distance = Math.sqrt((x - queryX) ** 2 + (y - queryY) ** 2);
      const inside = distance <= radius;
      
      ctx.fillStyle = inside ? '#4ade80' : '#60a5fa';
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Show query point
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(queryX, queryY, 8, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Fallback
    ctx.fillText('Scene Module', 20, 40);
    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(50, 80, width - 100, height - 120);
  }
};

const drawEntityDemo = (ctx, step, width, height) => {
  // Clear background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  
  const time = Date.now() / 1000;
  
  if (step === 1) {
    ctx.fillText('Step 1: Entity Position', 20, 40);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(200, 150, 80, 80);
  } else if (step === 2) {
    ctx.fillText('Step 2: Entity Rotation', 20, 40);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(time);
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(-40, -40, 80, 80);
    ctx.restore();
  } else if (step === 3) {
    ctx.fillText('Step 3: Entity Scale', 20, 40);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    const scale = 1 + Math.sin(time) * 0.3;
    ctx.scale(scale, scale);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-40, -40, 80, 80);
    ctx.restore();
  } else {
    ctx.fillText('Step 4: Combined Transform', 20, 40);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(time);
    const scale = 1 + Math.sin(time * 2) * 0.2;
    ctx.scale(scale, scale);
    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(-40, -40, 80, 80);
    ctx.restore();
  }
};

const drawInputDemo = (ctx, step, width, height, mousePos = null, mouseDown = false, clickedEntity = null) => {
  // Clear background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  
  if (step === 1) {
    ctx.fillText('Step 1: Mouse Position Tracking', 20, 40);
    ctx.fillStyle = '#4ade80';
    ctx.font = '14px monospace';
    ctx.fillText('Move mouse over canvas', 20, 80);
    
    // Show actual mouse position
    if (mousePos && mousePos.x >= 0 && mousePos.y >= 0) {
      ctx.fillStyle = '#60a5fa';
      ctx.fillText(`X: ${Math.floor(mousePos.x)}, Y: ${Math.floor(mousePos.y)}`, 20, 110);
      
      // Draw crosshair at mouse position
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mousePos.x - 10, mousePos.y);
      ctx.lineTo(mousePos.x + 10, mousePos.y);
      ctx.moveTo(mousePos.x, mousePos.y - 10);
      ctx.lineTo(mousePos.x, mousePos.y + 10);
      ctx.stroke();
      
      // Draw circle at mouse position
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 20, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#666666';
      ctx.fillText('X: --, Y: --', 20, 110);
    }
  } else if (step === 2) {
    ctx.fillText('Step 2: Click Detection', 20, 40);
    
    const buttonX = 100;
    const buttonY = 100;
    const buttonWidth = 200;
    const buttonHeight = 100;
    
    // Check if mouse is over button
    const isHovering = mousePos && 
      mousePos.x >= buttonX && mousePos.x <= buttonX + buttonWidth &&
      mousePos.y >= buttonY && mousePos.y <= buttonY + buttonHeight;
    
    // Draw button with hover/click effect
    if (clickedEntity === 'button') {
      ctx.fillStyle = '#4ade80'; // Green when clicked
    } else if (isHovering) {
      ctx.fillStyle = '#3b82f6'; // Brighter blue when hovering
    } else {
      ctx.fillStyle = '#60a5fa'; // Normal blue
    }
    
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    
    // Button text
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    if (clickedEntity === 'button') {
      ctx.fillText('Clicked!', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2 + 7);
    } else {
      ctx.fillText('Click here!', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2 + 7);
    }
    
    // Show mouse position relative to button
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    if (mousePos && mousePos.x >= 0 && mousePos.y >= 0) {
      ctx.fillText(`Mouse: (${Math.floor(mousePos.x)}, ${Math.floor(mousePos.y)})`, 20, 250);
      ctx.fillText(`Hovering: ${isHovering ? 'Yes' : 'No'}`, 20, 270);
      ctx.fillText(`Mouse Down: ${mouseDown ? 'Yes' : 'No'}`, 20, 290);
    }
  } else if (step === 3) {
    ctx.fillText('Step 3: Event Dispatch', 20, 40);
    
    const entity1X = 50;
    const entity1Y = 80;
    const entity1Width = 100;
    const entity1Height = 100;
    
    const entity2X = 250;
    const entity2Y = 80;
    const entity2Width = 100;
    const entity2Height = 100;
    
    // Check which entity is being hovered
    const hoverEntity1 = mousePos && 
      mousePos.x >= entity1X && mousePos.x <= entity1X + entity1Width &&
      mousePos.y >= entity1Y && mousePos.y <= entity1Y + entity1Height;
    
    const hoverEntity2 = mousePos && 
      mousePos.x >= entity2X && mousePos.x <= entity2X + entity2Width &&
      mousePos.y >= entity2Y && mousePos.y <= entity2Y + entity2Height;
    
    // Draw Entity 1
    if (clickedEntity === 'entity1') {
      ctx.fillStyle = '#4ade80'; // Green when clicked
    } else if (hoverEntity1) {
      ctx.fillStyle = '#fbbf24'; // Brighter yellow when hovering
    } else {
      ctx.fillStyle = '#fbbf24'; // Normal yellow
    }
    ctx.fillRect(entity1X, entity1Y, entity1Width, entity1Height);
    ctx.fillStyle = '#1a1a2e';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Entity 1', entity1X + entity1Width / 2, entity1Y + entity1Height / 2 + 5);
    
    // Draw Entity 2
    if (clickedEntity === 'entity2') {
      ctx.fillStyle = '#4ade80'; // Green when clicked
    } else if (hoverEntity2) {
      ctx.fillStyle = '#fbbf24'; // Brighter yellow when hovering
    } else {
      ctx.fillStyle = '#fbbf24'; // Normal yellow
    }
    ctx.fillRect(entity2X, entity2Y, entity2Width, entity2Height);
    ctx.fillStyle = '#1a1a2e';
    ctx.fillText('Entity 2', entity2X + entity2Width / 2, entity2Y + entity2Height / 2 + 5);
    
    // Show click status
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    if (clickedEntity) {
      ctx.fillText(`Clicked: ${clickedEntity}`, 20, 220);
    }
    if (hoverEntity1 || hoverEntity2) {
      ctx.fillText(`Hovering: ${hoverEntity1 ? 'Entity 1' : 'Entity 2'}`, 20, 240);
    }
  } else if (step === 4) {
    ctx.fillText('Step 4: Touch Support', 20, 40);
    ctx.fillStyle = '#a78bfa';
    ctx.font = '18px monospace';
    ctx.fillText('Touch events work similarly', 20, 100);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.fillText('Touch on mobile devices', 20, 130);
    ctx.fillText('Supports multi-touch', 20, 150);
  } else if (step === 5) {
    ctx.fillText('Step 5: Input State Management', 20, 40);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('mouseX, mouseY - Current position', 20, 100);
    ctx.fillText('mouseDown - Button pressed', 20, 120);
    ctx.fillText('mousePressed - Just pressed this frame', 20, 140);
    ctx.fillText('mouseReleased - Just released this frame', 20, 160);
    // Show current state
    if (mousePos && mousePos.x >= 0 && mousePos.y >= 0) {
      ctx.fillStyle = '#4ade80';
      ctx.fillText(`Current: X=${Math.floor(mousePos.x)}, Y=${Math.floor(mousePos.y)}`, 20, 200);
      ctx.fillText(`Down: ${mouseDown ? 'Yes' : 'No'}`, 20, 220);
    }
  } else if (step === 6) {
    ctx.fillText('Step 6: Complete Input Module', 20, 40);
    ctx.fillStyle = '#a78bfa';
    ctx.font = '14px monospace';
    ctx.fillText('const input = new Input(canvas);', 20, 100);
    ctx.fillText('input.update();', 20, 120);
    ctx.fillText('if (input.mousePressed) { ... }', 20, 140);
    // Interactive demo
    if (mousePos && mousePos.x >= 0 && mousePos.y >= 0) {
      ctx.fillStyle = '#60a5fa';
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 15, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Fallback
    ctx.fillText('Input Module', 20, 40);
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(100, 100, 200, 100);
  }
};

const drawUtilsDemo = (ctx, step, width, height) => {
  // Clear background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  
  const time = Date.now() / 1000;
  
  if (step === 1) {
    ctx.fillText('Step 1: Vector Math', 20, 40);
    // Draw vectors with labels
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.lineTo(200, 150);
    ctx.stroke();
    // Vector 1 label
    ctx.fillStyle = '#4ade80';
    ctx.font = '12px monospace';
    ctx.fillText('v1', 140, 170);
    
    ctx.beginPath();
    ctx.moveTo(200, 150);
    ctx.lineTo(300, 200);
    ctx.stroke();
    // Vector 2 label
    ctx.fillText('v2', 240, 170);
    
    // Show vector addition result
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.lineTo(300, 200);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#60a5fa';
    ctx.fillText('v1 + v2', 180, 220);
    
    // Draw origin point
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(100, 200, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (step === 2) {
    ctx.fillText('Step 2: Distance Calculation', 20, 40);
    const x1 = 150;
    const y1 = 150;
    const x2 = 300 + Math.cos(time) * 50;
    const y2 = 200 + Math.sin(time) * 50;
    
    // Draw points
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(x1, y1, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(x2, y2, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw distance line
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    // Calculate and show distance
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.fillText(`Distance: ${distance.toFixed(1)}`, 20, 250);
    
    // Show angle
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.fillText(`Angle: ${(angle * 180 / Math.PI).toFixed(1)}°`, 20, 270);
  } else if (step === 3) {
    ctx.fillText('Step 3: Utility Functions', 20, 40);
    const t = (time % 2) / 2;
    
    // Show lerp example
    ctx.fillStyle = '#a78bfa';
    ctx.font = '14px monospace';
    ctx.fillText('LERP Example:', 20, 80);
    const startValue = 50;
    const endValue = 350;
    const lerpedValue = startValue + (endValue - startValue) * t;
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(lerpedValue, 100, 20, 20);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`t: ${t.toFixed(2)}`, 20, 140);
    
    // Show clamp example
    ctx.fillStyle = '#4ade80';
    ctx.fillText('Clamp Example:', 20, 180);
    const clampedValue = Math.min(Math.max(lerpedValue, 100), 300);
    ctx.fillRect(clampedValue, 200, 20, 20);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Clamped: ${clampedValue.toFixed(0)}`, 20, 240);
    
    // Show timer progress
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(50, 280, t * (width - 100), 30);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Timer: ${(t * 100).toFixed(0)}%`, 60, 300);
  } else if (step === 4) {
    ctx.fillText('Step 4: Vector Operations', 20, 40);
    const time = Date.now() / 1000;
    
    // Show vector addition visually
    const v1 = { x: 100, y: 200 };
    const v2 = { x: Math.cos(time) * 80, y: Math.sin(time) * 80 };
    const sum = { x: v1.x + v2.x, y: v1.y + v2.y };
    
    // Draw v1
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(v1.x, v1.y);
    ctx.stroke();
    
    // Draw v2
    ctx.strokeStyle = '#60a5fa';
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v1.x + v2.x, v1.y + v2.y);
    ctx.stroke();
    
    // Draw sum (result)
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(50, 250);
    ctx.lineTo(sum.x, sum.y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Labels
    ctx.fillStyle = '#4ade80';
    ctx.font = '12px monospace';
    ctx.fillText('v1', v1.x / 2 + 25, v1.y - 10);
    ctx.fillStyle = '#60a5fa';
    ctx.fillText('v2', v1.x + v2.x / 2, v1.y + v2.y / 2 - 10);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('v1 + v2', sum.x + 10, sum.y);
  } else if (step === 5) {
    ctx.fillText('Step 5: Math Helpers', 20, 40);
    const time = Date.now() / 1000;
    
    // Show degToRad/radToDeg
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('Angle Conversions:', 20, 80);
    const degrees = (time * 30) % 360;
    const radians = degrees * Math.PI / 180;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${degrees.toFixed(0)}° = ${radians.toFixed(3)} rad`, 20, 100);
    
    // Show map function
    ctx.fillStyle = '#4ade80';
    ctx.fillText('Map Range:', 20, 140);
    const inputValue = (time % 2) / 2; // 0 to 1
    const mappedValue = inputValue * (width - 100) + 50;
    ctx.fillRect(50, 160, mappedValue - 50, 20);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Map(0-1 → 50-${width - 50})`, 20, 200);
    
    // Show random (simulated)
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('Random Values:', 20, 240);
    for (let i = 0; i < 5; i++) {
      const randX = 50 + i * 100 + Math.sin(time + i) * 20;
      const randY = 260 + Math.cos(time + i) * 10;
      ctx.beginPath();
      ctx.arc(randX, randY, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (step === 6) {
    ctx.fillText('Step 6: Complete Utils Module', 20, 40);
    ctx.fillStyle = '#a78bfa';
    ctx.font = '14px monospace';
    ctx.fillText('import { Vec2, distance, lerp }', 20, 80);
    ctx.fillText('from "./engine2D/Utils.js";', 20, 100);
    ctx.fillText('', 20, 120);
    ctx.fillText('const v1 = new Vec2(100, 200);', 20, 140);
    ctx.fillText('const v2 = new Vec2(50, -30);', 20, 160);
    ctx.fillText('const sum = v1.add(v2);', 20, 180);
    
    // Animated example
    const time = Date.now() / 1000;
    const v1 = { x: 200, y: 250 };
    const v2 = { x: Math.cos(time) * 60, y: Math.sin(time) * 60 };
    const sum = { x: v1.x + v2.x, y: v1.y + v2.y };
    
    // Draw vectors
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 250);
    ctx.lineTo(v1.x, v1.y);
    ctx.stroke();
    
    ctx.strokeStyle = '#60a5fa';
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(sum.x, sum.y);
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(v1.x, v1.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(sum.x, sum.y, 8, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Fallback
    ctx.fillText('Utils Module', 20, 40);
    const time = Date.now() / 1000;
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(100, 200);
    ctx.lineTo(200, 150);
    ctx.stroke();
  }
};

// AssetLoader demo - uses cached image from Engine2DDemo
let cachedImage = null;
let imageLoadProgress = 0;
let imageLoadStatus = 'idle'; // 'idle', 'loading', 'loaded', 'error'

export const setCachedImage = (img) => {
  cachedImage = img;
};

export const setImageLoadProgress = (progress, status) => {
  imageLoadProgress = progress;
  imageLoadStatus = status;
};

const drawAssetLoaderDemo = (ctx, step, width, height) => {
  // Clear background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  
  if (step === 1) {
    ctx.fillText('Step 1: AssetLoader Introduction', 20, 40);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('AssetLoader manages image loading', 20, 80);
    ctx.fillText('and caching for the engine.', 20, 100);
    ctx.fillText('', 20, 120);
    ctx.fillStyle = '#4ade80';
    ctx.fillText('Features:', 20, 150);
    ctx.fillText('• Promise-based loading', 20, 170);
    ctx.fillText('• Automatic caching', 20, 190);
    ctx.fillText('• Progress tracking', 20, 210);
    ctx.fillText('• Error handling', 20, 230);
  } else if (step === 2) {
    ctx.fillText('Step 2: Loading Single Image', 20, 40);
    
    // Show loading status
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText(`Status: ${imageLoadStatus}`, 20, 80);
    
    if (imageLoadStatus === 'loading') {
      // Loading bar
      const barWidth = width - 100;
      const barHeight = 20;
      const barX = 50;
      const barY = 120;
      
      ctx.fillStyle = '#333333';
      ctx.fillRect(barX, barY, barWidth, barHeight);
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(barX, barY, barWidth * imageLoadProgress, barHeight);
      
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`Loading... ${Math.floor(imageLoadProgress * 100)}%`, barX, barY - 10);
    } else if (imageLoadStatus === 'loaded' && cachedImage) {
      ctx.fillStyle = '#4ade80';
      ctx.fillText('✓ Image loaded successfully!', 20, 120);
      
      // Draw loaded image
      const imgWidth = Math.min(cachedImage.width, 200);
      const imgHeight = (cachedImage.height / cachedImage.width) * imgWidth;
      ctx.drawImage(cachedImage, 50, 150, imgWidth, imgHeight);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText(`Size: ${cachedImage.width}x${cachedImage.height}`, 50, 150 + imgHeight + 20);
    } else if (imageLoadStatus === 'error') {
      ctx.fillStyle = '#ef4444';
      ctx.fillText('✗ Failed to load image', 20, 120);
    } else {
      ctx.fillStyle = '#fbbf24';
      ctx.fillText('Image will load automatically...', 20, 120);
    }
  } else if (step === 3) {
    ctx.fillText('Step 3: Asset Caching', 20, 40);
    
    if (cachedImage) {
      ctx.fillStyle = '#4ade80';
      ctx.font = '14px monospace';
      ctx.fillText('✓ Image is cached', 20, 80);
      ctx.fillText('Subsequent requests return instantly', 20, 100);
      
      // Draw cached image multiple times to show it's reused
      const imgWidth = 100;
      const imgHeight = (cachedImage.height / cachedImage.width) * imgWidth;
      
      for (let i = 0; i < 3; i++) {
        ctx.drawImage(cachedImage, 50 + i * 120, 150, imgWidth, imgHeight);
        ctx.fillStyle = '#60a5fa';
        ctx.font = '12px monospace';
        ctx.fillText(`Cached #${i + 1}`, 50 + i * 120, 150 + imgHeight + 15);
      }
    } else {
      ctx.fillStyle = '#fbbf24';
      ctx.font = '14px monospace';
      ctx.fillText('Load an image first (Step 2)', 20, 80);
    }
  } else if (step === 4) {
    ctx.fillText('Step 4: Batch Loading', 20, 40);
    
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('loadImages() loads multiple assets:', 20, 80);
    ctx.fillText('', 20, 100);
    
    ctx.fillStyle = '#a78bfa';
    ctx.font = '12px monospace';
    ctx.fillText('await loader.loadImages({', 20, 130);
    ctx.fillText('  player: "/sprites/player.png",', 30, 150);
    ctx.fillText('  enemy: "/sprites/enemy.png",', 30, 170);
    ctx.fillText('  background: "/sprites/bg.png"', 30, 190);
    ctx.fillText('});', 20, 210);
    
    if (cachedImage) {
      ctx.fillStyle = '#4ade80';
      ctx.font = '14px monospace';
      ctx.fillText('✓ Example: Image loaded', 20, 250);
      ctx.drawImage(cachedImage, 50, 280, 150, (cachedImage.height / cachedImage.width) * 150);
    }
  } else if (step === 5) {
    ctx.fillText('Step 5: Progress Tracking', 20, 40);
    
    const time = Date.now() / 1000;
    const progress = (Math.sin(time) + 1) / 2; // Simulated progress
    
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('Loading Progress:', 20, 80);
    
    // Progress bar
    const barWidth = width - 100;
    const barHeight = 30;
    const barX = 50;
    const barY = 110;
    
    ctx.fillStyle = '#333333';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(barX, barY, barWidth * progress, barHeight);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px monospace';
    ctx.fillText(`${Math.floor(progress * 100)}%`, barX + barWidth / 2 - 20, barY + barHeight / 2 + 5);
    
    ctx.fillStyle = '#4ade80';
    ctx.font = '12px monospace';
    ctx.fillText(`getProgress(): ${progress.toFixed(2)}`, 20, 170);
    ctx.fillText(`getStatus(): { total: 1, loaded: ${Math.floor(progress)}, failed: 0 }`, 20, 190);
  } else if (step === 6) {
    ctx.fillText('Step 6: Complete AssetLoader Usage', 20, 40);
    
    ctx.fillStyle = '#a78bfa';
    ctx.font = '12px monospace';
    ctx.fillText('import { AssetLoader } from "./AssetLoader.js";', 20, 80);
    ctx.fillText('', 20, 100);
    ctx.fillText('const loader = new AssetLoader();', 20, 120);
    ctx.fillText('await loader.loadImage("player", "/player.png");', 20, 140);
    ctx.fillText('const image = loader.get("player");', 20, 160);
    ctx.fillText('renderer.drawSprite(image, x, y, w, h);', 20, 180);
    
    if (cachedImage) {
      ctx.fillStyle = '#4ade80';
      ctx.font = '14px monospace';
      ctx.fillText('✓ Ready to use!', 20, 220);
      ctx.drawImage(cachedImage, 50, 250, 200, (cachedImage.height / cachedImage.width) * 200);
    }
  } else {
    ctx.fillText('AssetLoader Module', 20, 40);
  }
};

let spriteAnimationTime = 0;
let spriteCurrentFrame = 0;

const drawSpriteDemo = (ctx, step, width, height) => {
  // Clear background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  
  const time = Date.now() / 1000;
  
  if (step === 1) {
    ctx.fillText('Step 1: Sprite Introduction', 20, 40);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('Sprite extends Entity with image support', 20, 80);
    ctx.fillText('and animation capabilities.', 20, 100);
    ctx.fillText('', 20, 120);
    ctx.fillStyle = '#4ade80';
    ctx.fillText('Features:', 20, 150);
    ctx.fillText('• Image rendering', 20, 170);
    ctx.fillText('• Sprite sheet support', 20, 190);
    ctx.fillText('• Frame-based animation', 20, 210);
    ctx.fillText('• Animation states', 20, 230);
  } else if (step === 2) {
    ctx.fillText('Step 2: Basic Sprite', 20, 40);
    
    if (cachedImage) {
      // Draw sprite at center
      const spriteX = width / 2;
      const spriteY = height / 2;
      const spriteWidth = 150;
      const spriteHeight = (cachedImage.height / cachedImage.width) * spriteWidth;
      
      ctx.drawImage(
        cachedImage,
        spriteX - spriteWidth / 2,
        spriteY - spriteHeight / 2,
        spriteWidth,
        spriteHeight
      );
      
      // Show sprite info
      ctx.fillStyle = '#60a5fa';
      ctx.font = '14px monospace';
      ctx.fillText('Sprite with image:', 20, 80);
      ctx.fillText(`Position: (${spriteX}, ${spriteY})`, 20, 100);
      ctx.fillText(`Size: ${spriteWidth}x${spriteHeight}`, 20, 120);
      
      // Draw origin point
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(spriteX, spriteY, 5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#fbbf24';
      ctx.font = '14px monospace';
      ctx.fillText('Load image in AssetLoader module first', 20, 80);
    }
  } else if (step === 3) {
    ctx.fillText('Step 3: Sprite Sheet', 20, 40);
    
    if (cachedImage) {
      // Simulate sprite sheet frames
      const frameWidth = cachedImage.width / 4; // Assume 4 columns
      const frameHeight = cachedImage.height;
      const frameIndex = Math.floor((time * 2) % 4);
      const sourceX = frameIndex * frameWidth;
      
      const spriteX = width / 2;
      const spriteY = height / 2;
      const spriteWidth = 150;
      const spriteHeight = (frameHeight / frameWidth) * spriteWidth;
      
      // Draw current frame
      ctx.drawImage(
        cachedImage,
        sourceX, 0, frameWidth, frameHeight,
        spriteX - spriteWidth / 2,
        spriteY - spriteHeight / 2,
        spriteWidth,
        spriteHeight
      );
      
      ctx.fillStyle = '#60a5fa';
      ctx.font = '14px monospace';
      ctx.fillText('Sprite Sheet Animation:', 20, 80);
      ctx.fillText(`Frame: ${frameIndex + 1}/4`, 20, 100);
      ctx.fillText(`Frame Size: ${frameWidth}x${frameHeight}`, 20, 120);
      
      // Draw frame indicator
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 2;
      ctx.strokeRect(spriteX - spriteWidth / 2, spriteY - spriteHeight / 2, spriteWidth, spriteHeight);
    } else {
      ctx.fillStyle = '#fbbf24';
      ctx.font = '14px monospace';
      ctx.fillText('Load image in AssetLoader module first', 20, 80);
    }
  } else if (step === 4) {
    ctx.fillText('Step 4: Animation System', 20, 40);
    
    if (cachedImage) {
      spriteAnimationTime += 0.016; // Simulate deltaTime
      const animSpeed = 0.2;
      
      if (spriteAnimationTime >= animSpeed) {
        spriteAnimationTime = 0;
        spriteCurrentFrame = (spriteCurrentFrame + 1) % 4;
      }
      
      const frameWidth = cachedImage.width / 4;
      const frameHeight = cachedImage.height;
      const sourceX = spriteCurrentFrame * frameWidth;
      
      const spriteX = width / 2;
      const spriteY = height / 2;
      const spriteWidth = 150;
      const spriteHeight = (frameHeight / frameWidth) * spriteWidth;
      
      ctx.drawImage(
        cachedImage,
        sourceX, 0, frameWidth, frameHeight,
        spriteX - spriteWidth / 2,
        spriteY - spriteHeight / 2,
        spriteWidth,
        spriteHeight
      );
      
      ctx.fillStyle = '#60a5fa';
      ctx.font = '14px monospace';
      ctx.fillText('Animation:', 20, 80);
      ctx.fillText(`Current Frame: ${spriteCurrentFrame + 1}`, 20, 100);
      ctx.fillText(`Speed: ${animSpeed}s per frame`, 20, 120);
      ctx.fillText(`Loop: true`, 20, 140);
    } else {
      ctx.fillStyle = '#fbbf24';
      ctx.font = '14px monospace';
      ctx.fillText('Load image in AssetLoader module first', 20, 80);
    }
  } else if (step === 5) {
    ctx.fillText('Step 5: Animation States', 20, 40);
    
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('Animation States:', 20, 80);
    ctx.fillText('', 20, 100);
    
    ctx.fillStyle = '#4ade80';
    ctx.fillText('• idle: [0]', 20, 130);
    ctx.fillText('• walk: [1, 2, 3, 4]', 20, 150);
    ctx.fillText('• jump: [5]', 20, 170);
    ctx.fillText('• attack: [6, 7]', 20, 190);
    
    ctx.fillStyle = '#a78bfa';
    ctx.font = '12px monospace';
    ctx.fillText('sprite.addAnimation("walk", [1,2,3,4], 0.1);', 20, 230);
    ctx.fillText('sprite.playAnimation("walk");', 20, 250);
    
    if (cachedImage) {
      // Show multiple animation states
      const frameWidth = cachedImage.width / 8; // Assume 8 frames total
      const spriteWidth = 80;
      const spriteHeight = (cachedImage.height / frameWidth) * spriteWidth;
      
      for (let i = 0; i < 3; i++) {
        const frameIndex = i;
        const sourceX = frameIndex * frameWidth;
        const x = 100 + i * 150;
        const y = 300;
        
        ctx.drawImage(
          cachedImage,
          sourceX, 0, frameWidth, cachedImage.height,
          x - spriteWidth / 2,
          y - spriteHeight / 2,
          spriteWidth,
          spriteHeight
        );
        
        ctx.fillStyle = '#fbbf24';
        ctx.font = '12px monospace';
        ctx.fillText(`State ${i + 1}`, x - 30, y + spriteHeight / 2 + 20);
      }
    }
  } else if (step === 6) {
    ctx.fillText('Step 6: Complete Sprite Usage', 20, 40);
    
    ctx.fillStyle = '#a78bfa';
    ctx.font = '12px monospace';
    ctx.fillText('import { Sprite } from "./Sprite.js";', 20, 80);
    ctx.fillText('import { AssetLoader } from "./AssetLoader.js";', 20, 100);
    ctx.fillText('', 20, 120);
    ctx.fillText('const loader = new AssetLoader();', 20, 140);
    ctx.fillText('await loader.loadImage("player", "/player.png");', 20, 160);
    ctx.fillText('', 20, 180);
    ctx.fillText('const sprite = new Sprite(100, 100);', 20, 200);
    ctx.fillText('sprite.setImage(loader.get("player"));', 20, 220);
    ctx.fillText('sprite.setSpriteSheet(image, 32, 32, 8);', 20, 240);
    ctx.fillText('sprite.addAnimation("walk", [0,1,2,3], 0.1);', 20, 260);
    ctx.fillText('sprite.playAnimation("walk");', 20, 280);
    
    if (cachedImage) {
      ctx.fillStyle = '#4ade80';
      ctx.font = '14px monospace';
      ctx.fillText('✓ Sprite ready!', 20, 320);
    }
  } else {
    ctx.fillText('Sprite Module', 20, 40);
  }
};

const drawEffectsDemo = (ctx, step, width, height) => {
  // Clear background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  
  const time = Date.now() / 1000;
  
  if (step === 1) {
    ctx.fillText('Step 1: Effects & Shaders Introduction', 20, 40);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('Effects enhance rendering with:', 20, 80);
    ctx.fillText('', 20, 100);
    ctx.fillStyle = '#4ade80';
    ctx.fillText('• Blend modes (multiply, screen, overlay)', 20, 130);
    ctx.fillText('• Filters (blur, shadow, glow, color)', 20, 150);
    ctx.fillText('• Post-processing effects', 20, 170);
    ctx.fillText('• Composite operations', 20, 190);
  } else if (step === 2) {
    ctx.fillText('Step 2: Blend Modes', 20, 40);
    
    // Draw base shapes with different blend modes
    const x = 100;
    const y = 150;
    const size = 80;
    
    // Base rectangle (red)
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x, y, size, size);
    
    // Multiply blend mode
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(x + 20, y + 20, size, size);
    
    // Reset and show other blend modes
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px monospace';
    ctx.fillText('Multiply: Darkens colors', 20, 80);
    
    // Screen blend mode example
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x, y + 120, size, size);
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(x + 20, y + 140, size, size);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillText('Screen: Lightens colors', 20, 110);
    
    // Overlay blend mode example
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x + 200, y, size, size);
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(x + 220, y + 20, size, size);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillText('Overlay: Combines multiply & screen', 220, 80);
  } else if (step === 3) {
    ctx.fillText('Step 3: Filters - Blur & Shadow', 20, 40);
    
    // Blur example
    ctx.fillStyle = '#4ade80';
    ctx.filter = 'blur(5px)';
    ctx.fillRect(50, 100, 100, 100);
    ctx.filter = 'none';
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px monospace';
    ctx.fillText('Blur Filter', 20, 80);
    
    // Drop shadow example
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(200, 100, 100, 100);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.fillText('Drop Shadow', 200, 80);
    
    // Glow example
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#60a5fa';
    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(350, 100, 100, 100);
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.fillText('Glow Effect', 350, 80);
  } else if (step === 4) {
    ctx.fillText('Step 4: Color Adjustments', 20, 40);
    
    const baseX = 50;
    const baseY = 100;
    const rectSize = 80;
    
    // Original
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(baseX, baseY, rectSize, rectSize);
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.fillText('Original', baseX, baseY - 10);
    
    // Brightness
    ctx.filter = 'brightness(1.5)';
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(baseX + 120, baseY, rectSize, rectSize);
    ctx.filter = 'none';
    ctx.fillText('Brightness', baseX + 120, baseY - 10);
    
    // Contrast
    ctx.filter = 'contrast(1.5)';
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(baseX + 240, baseY, rectSize, rectSize);
    ctx.filter = 'none';
    ctx.fillText('Contrast', baseX + 240, baseY - 10);
    
    // Saturation
    ctx.filter = 'saturate(2.0)';
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(baseX + 360, baseY, rectSize, rectSize);
    ctx.filter = 'none';
    ctx.fillText('Saturation', baseX + 360, baseY - 10);
    
    // Hue rotate (animated)
    const hue = (time * 30) % 360;
    ctx.filter = `hue-rotate(${hue}deg)`;
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(baseX, baseY + 120, rectSize, rectSize);
    ctx.filter = 'none';
    ctx.fillText(`Hue Rotate: ${Math.floor(hue)}°`, baseX, baseY + 110);
  } else if (step === 5) {
    ctx.fillText('Step 5: Post-Processing', 20, 40);
    
    // Create offscreen canvas
    const offscreen = document.createElement('canvas');
    offscreen.width = width - 100;
    offscreen.height = height - 150;
    const offscreenCtx = offscreen.getContext('2d');
    
    // Draw scene to offscreen
    offscreenCtx.fillStyle = '#1e293b';
    offscreenCtx.fillRect(0, 0, offscreen.width, offscreen.height);
    
    // Draw some shapes
    offscreenCtx.fillStyle = '#4ade80';
    offscreenCtx.fillRect(50, 50, 100, 100);
    offscreenCtx.fillStyle = '#60a5fa';
    offscreenCtx.fillRect(200, 50, 100, 100);
    offscreenCtx.fillStyle = '#fbbf24';
    offscreenCtx.fillRect(350, 50, 100, 100);
    
    // Apply post-processing (blur effect)
    const blurAmount = 2 + Math.sin(time) * 2;
    ctx.filter = `blur(${blurAmount}px)`;
    ctx.drawImage(offscreen, 50, 100);
    ctx.filter = 'none';
    
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px monospace';
    ctx.fillText('Post-processing: Blur applied to entire scene', 20, 80);
    ctx.fillText(`Blur: ${blurAmount.toFixed(1)}px`, 20, 95);
  } else if (step === 6) {
    ctx.fillText('Step 6: Complete Effects Usage', 20, 40);
    
    ctx.fillStyle = '#a78bfa';
    ctx.font = '12px monospace';
    ctx.fillText('import { Effects, BlendModes } from "./Effects.js";', 20, 80);
    ctx.fillText('', 20, 100);
    ctx.fillText('const effects = new Effects(ctx);', 20, 120);
    ctx.fillText('', 20, 140);
    ctx.fillText('// Blend modes', 20, 160);
    ctx.fillText('effects.setBlendMode(BlendModes.MULTIPLY);', 20, 180);
    ctx.fillText('ctx.fillRect(x, y, w, h);', 20, 200);
    ctx.fillText('', 20, 220);
    ctx.fillText('// Filters', 20, 240);
    ctx.fillText('effects.applyBlur(5);', 20, 260);
    ctx.fillText('effects.applyDropShadow(5, 5, 10, "rgba(0,0,0,0.5)");', 20, 280);
    ctx.fillText('', 20, 300);
    ctx.fillText('// Color adjustments', 20, 320);
    ctx.fillText('effects.applyColorAdjustment({', 20, 340);
    ctx.fillText('  brightness: 1.2,', 30, 360);
    ctx.fillText('  contrast: 1.1,', 30, 380);
    ctx.fillText('  saturation: 1.5', 30, 400);
    ctx.fillText('});', 20, 420);
  } else {
    ctx.fillText('Effects Module', 20, 40);
  }
};

// Font loading state tracking
let fontLoadProgress = 0;
let fontLoadStatus = 'idle'; // 'idle', 'loading', 'loaded', 'error'
let loadedFontsCount = 0;
let totalFontsCount = 1;
let fontLoaded = false;

export const setFontLoadProgress = (progress, status, loaded = 0, total = 1) => {
  fontLoadProgress = progress;
  fontLoadStatus = status;
  loadedFontsCount = loaded;
  totalFontsCount = total;
  fontLoaded = status === 'loaded';
};

export const isFontLoaded = () => {
  return fontLoaded || document.fonts.check('16px McQueenDisplay');
};

const drawFontDemo = (ctx, step, width, height) => {
  // Clear background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  
  const time = Date.now() / 1000;
  
  if (step === 1) {
    ctx.fillText('Step 1: Font Loader Module', 20, 40);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('FontLoader provides clean API for loading', 20, 80);
    ctx.fillText('custom fonts dynamically.', 20, 100);
    ctx.fillText('', 20, 120);
    ctx.fillStyle = '#4ade80';
    ctx.fillText('Features:', 20, 150);
    ctx.fillText('• FontFace API integration', 20, 170);
    ctx.fillText('• Promise-based loading', 20, 190);
    ctx.fillText('• Font caching', 20, 210);
    ctx.fillText('• Multiple font variants', 20, 230);
    
    // Show FontLoader structure
    ctx.fillStyle = '#a78bfa';
    ctx.font = '12px monospace';
    ctx.fillText('class FontLoader {', 20, 280);
    ctx.fillText('  loadFont(name, url, options)', 30, 300);
    ctx.fillText('  isLoaded(name)', 30, 320);
    ctx.fillText('  get(name)', 30, 340);
    ctx.fillText('}', 20, 360);
  } else if (step === 2) {
    ctx.fillText('Step 2: Loading Multiple Fonts', 20, 40);
    
    // Use actual font loading state
    const isLoaded = isFontLoaded();
    const currentProgress = fontLoadStatus === 'loaded' ? 1 : fontLoadProgress;
    
    const fonts = [
      { name: 'McQueenDisplay', weight: '400', progress: currentProgress, file: '/fonts/McQueenDisplay-Regular.woff2' }
    ];
    
    fonts.forEach((font, i) => {
      const y = 100 + i * 80;
      
      // Font name
      ctx.fillStyle = '#60a5fa';
      ctx.font = '14px monospace';
      ctx.fillText(font.name, 20, y);
      
      // Font details
      ctx.fillStyle = '#a78bfa';
      ctx.font = '12px monospace';
      ctx.fillText(`Weight: ${font.weight}`, 20, y + 20);
      ctx.fillText(`File: ${font.file}`, 20, y + 35);
      
      // Loading progress bar
      const barWidth = width - 100;
      const barHeight = 15;
      ctx.fillStyle = '#333333';
      ctx.fillRect(20, y + 50, barWidth, barHeight);
      ctx.fillStyle = font.progress >= 1 ? '#4ade80' : '#60a5fa';
      ctx.fillRect(20, y + 50, barWidth * font.progress, barHeight);
      
      // Status
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      if (fontLoadStatus === 'loaded') {
        ctx.fillText('✓ Loaded', barWidth - 50, y + 62);
      } else if (fontLoadStatus === 'loading') {
        ctx.fillText(`${Math.floor(font.progress * 100)}%`, barWidth - 50, y + 62);
      } else if (fontLoadStatus === 'error') {
        ctx.fillStyle = '#ef4444';
        ctx.fillText('✗ Error', barWidth - 50, y + 62);
      } else {
        ctx.fillText('Waiting...', barWidth - 50, y + 62);
      }
    });
    
    // Show preview of loaded font
    if (isLoaded) {
      ctx.fillStyle = '#4ade80';
      ctx.font = '24px McQueenDisplay, Arial, sans-serif';
      ctx.fillText('McQueenDisplay Font Preview', 20, 250);
    }
  } else if (step === 3) {
    ctx.fillText('Step 3: Font Loading with Fallbacks', 20, 40);
    
    // Show font fallback chain
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('Font Fallback Chain:', 20, 80);
    
    const fontChain = ['McQueenDisplay', 'Arial', 'sans-serif'];
    fontChain.forEach((font, i) => {
      const y = 110 + i * 30;
      ctx.fillStyle = i === 0 ? '#4ade80' : '#a78bfa';
      ctx.font = '12px monospace';
      ctx.fillText(`${i === 0 ? 'Primary' : i === 1 ? 'Fallback 1' : 'Fallback 2'}: ${font}`, 30, y);
    });
    
    // Show text with fallback - use actual loaded font
    const isLoaded = isFontLoaded();
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px McQueenDisplay, Arial, sans-serif';
    ctx.fillText('Sample Text', 50, 220);
    
    // Show which font is actually being used
    ctx.fillStyle = '#fbbf24';
    ctx.font = '12px monospace';
    ctx.fillText(`Using: ${isLoaded ? 'McQueenDisplay (loaded)' : 'Arial (fallback)'}`, 20, 250);
    ctx.fillText('If McQueenDisplay fails, Arial is used', 20, 270);
    ctx.fillText('If Arial fails, sans-serif is used', 20, 290);
    
    // Check font availability
    ctx.fillStyle = isLoaded ? '#4ade80' : '#ef4444';
    ctx.fillText(`Font Available: ${isLoaded ? 'Yes ✓' : 'No (using fallback)'}`, 20, 320);
  } else if (step === 4) {
    ctx.fillText('Step 4: Font Loading Progress', 20, 40);
    
    // Use actual loading progress
    const progress = fontLoadProgress;
    const loaded = loadedFontsCount;
    const isLoaded = isFontLoaded();
    
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText(`Loading fonts: ${loaded}/${totalFontsCount}`, 20, 80);
    ctx.fillText(`Status: ${fontLoadStatus}`, 20, 100);
    
    // Overall progress bar
    const barWidth = width - 100;
    const barHeight = 30;
    ctx.fillStyle = '#333333';
    ctx.fillRect(50, 130, barWidth, barHeight);
    ctx.fillStyle = isLoaded ? '#4ade80' : '#60a5fa';
    ctx.fillRect(50, 130, barWidth * progress, barHeight);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.floor(progress * 100)}%`, width / 2, 150);
    ctx.textAlign = 'left';
    
    // Individual font progress
    const fonts = ['McQueenDisplay'];
    fonts.forEach((font, i) => {
      const y = 200 + i * 50;
      const fontProgress = progress;
      
      ctx.fillStyle = '#a78bfa';
      ctx.font = '12px monospace';
      ctx.fillText(font, 50, y);
      
      // Progress bar
      ctx.fillStyle = '#333333';
      ctx.fillRect(50, y + 10, barWidth, 15);
      ctx.fillStyle = fontProgress >= 1 ? '#4ade80' : '#60a5fa';
      ctx.fillRect(50, y + 10, barWidth * fontProgress, 15);
      
      if (fontProgress >= 1) {
        ctx.fillStyle = '#4ade80';
        ctx.font = '12px monospace';
        ctx.fillText('✓ Loaded', barWidth + 60, y + 22);
      } else if (fontLoadStatus === 'loading') {
        ctx.fillStyle = '#60a5fa';
        ctx.font = '12px monospace';
        ctx.fillText('Loading...', barWidth + 60, y + 22);
      }
    });
  } else if (step === 5) {
    ctx.fillText('Step 5: Using Fonts in Renderer', 20, 40);
    
    const isLoaded = isFontLoaded();
    
    // Show different font sizes using the loaded font
    const texts = [
      { text: 'Large Title', font: '48px McQueenDisplay, Arial', y: 100, color: '#4ade80' },
      { text: 'Body Text', font: '24px McQueenDisplay, Arial', y: 160, color: '#60a5fa' },
      { text: 'Small UI', font: '20px McQueenDisplay, Arial', y: 200, color: '#fbbf24' },
      { text: 'Medium Text', font: '32px McQueenDisplay, Arial', y: 240, color: '#a78bfa' }
    ];
    
    texts.forEach((item, i) => {
      ctx.fillStyle = item.color;
      ctx.font = item.font;
      ctx.fillText(item.text, 50, item.y);
      
      // Show font info
      ctx.fillStyle = '#a78bfa';
      ctx.font = '10px monospace';
      ctx.fillText(item.font, 50, item.y + 25);
    });
    
    // Show text measurement
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('Text Measurement:', 20, 300);
    
    const sampleText = 'Hello World';
    ctx.fillStyle = '#ffffff';
    ctx.font = `24px McQueenDisplay, Arial`;
    ctx.fillText(sampleText, 50, 330);
    
    const metrics = ctx.measureText(sampleText);
    ctx.fillStyle = '#a78bfa';
    ctx.font = '12px monospace';
    ctx.fillText(`Width: ${metrics.width.toFixed(1)}px`, 50, 360);
    ctx.fillText(`Font: ${isLoaded ? 'McQueenDisplay (loaded)' : 'Arial (fallback)'}`, 50, 380);
  } else if (step === 6) {
    ctx.fillText('Step 6: Complete Font System Integration', 20, 40);
    
    const isLoaded = isFontLoaded();
    
    // Show complete game UI with fonts
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('Game UI with Custom Fonts:', 20, 80);
    
    // Title - using loaded font
    ctx.fillStyle = '#4ade80';
    ctx.font = `bold 36px McQueenDisplay, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('My Game', width / 2, 130);
    
    // Score
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 24px McQueenDisplay, Arial, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText('Score: 1000', 50, 180);
    
    // Health
    ctx.fillStyle = '#60a5fa';
    ctx.font = `20px McQueenDisplay, Arial, sans-serif`;
    ctx.fillText('Health: 100', 50, 210);
    
    // Instructions
    ctx.fillStyle = '#a78bfa';
    ctx.font = `16px McQueenDisplay, Arial, sans-serif`;
    ctx.fillText('All text uses custom fonts!', 50, 250);
    
    // Show font loading status
    ctx.fillStyle = isLoaded ? '#4ade80' : '#fbbf24';
    ctx.font = '12px monospace';
    ctx.fillText(`Font Status: ${isLoaded ? '✓ McQueenDisplay loaded' : 'Using fallback (Arial)'}`, 50, 290);
    
    // Animated example
    const currentTime = Date.now() / 1000;
    ctx.fillStyle = '#fbbf24';
    ctx.font = `18px McQueenDisplay, Arial, sans-serif`;
    ctx.fillText(`Time: ${currentTime.toFixed(1)}s`, 50, 330);
  } else {
    ctx.fillText('Font Module', 20, 40);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '24px Arial, sans-serif';
    ctx.fillText('Custom Font Demo', 50, 150);
  }
};

// Tweening animation state
let tweenTime = 0;
let tweenObjects = {};

// Easing functions for demo
const easings = {
  Linear: (t) => t,
  EaseInQuad: (t) => t * t,
  EaseOutQuad: (t) => t * (2 - t),
  EaseInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  EaseOutBounce: (t) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },
  EaseOutElastic: (t) => {
    if (t === 0 || t === 1) return t;
    const p = 0.3;
    const s = p / 4;
    return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
  }
};

const drawTweeningDemo = (ctx, step, width, height) => {
  // Clear background
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px monospace';
  ctx.textAlign = 'left';
  
  // Update tween time (loops every 3 seconds)
  tweenTime += 0.016;
  if (tweenTime > 3) {
    tweenTime = 0;
  }
  
  const progress = (tweenTime % 3) / 3;
  
  if (step === 1) {
    ctx.fillText('Step 1: Tween Class Module', 20, 40);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('Tweening smoothly animates properties over time', 20, 80);
    ctx.fillText('using interpolation and easing functions.', 20, 100);
    
    // Show basic tween animation
    const boxX = 50 + (width - 150) * progress;
    const boxY = 150;
    
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(boxX, boxY, 50, 50);
    
    // Show interpolation formula
    ctx.fillStyle = '#a78bfa';
    ctx.font = '12px monospace';
    ctx.fillText('value = start + (end - start) * t', 20, 250);
    ctx.fillText(`t = ${progress.toFixed(2)}`, 20, 270);
    ctx.fillText(`x = 50 + (${width - 150} - 50) * ${progress.toFixed(2)} = ${boxX.toFixed(0)}`, 20, 290);
    
    // Show start and end points
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, boxY + 25);
    ctx.lineTo(width - 100, boxY + 25);
    ctx.stroke();
    
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(50, boxY + 25, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width - 100, boxY + 25, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px monospace';
    ctx.fillText('Start', 45, boxY + 15);
    ctx.fillText('End', width - 105, boxY + 15);
  } else if (step === 2) {
    ctx.fillText('Step 2: Tween Manager', 20, 40);
    
    // Show multiple tweens being managed
    const numTweens = 3;
    const tweenObjects = [];
    
    for (let i = 0; i < numTweens; i++) {
      const tweenProgress = ((progress + i * 0.2) % 1);
      const x = 50 + (width - 150) * tweenProgress;
      const y = 120 + i * 80;
      
      ctx.fillStyle = `hsl(${i * 120}, 70%, 60%)`;
      ctx.fillRect(x, y, 40, 40);
      
      ctx.fillStyle = '#60a5fa';
      ctx.font = '12px monospace';
      ctx.fillText(`Tween ${i + 1}`, 20, y + 25);
      
      // Show progress
      ctx.fillStyle = '#a78bfa';
      ctx.fillText(`${(tweenProgress * 100).toFixed(0)}%`, width - 80, y + 25);
    }
    
    ctx.fillStyle = '#4ade80';
    ctx.font = '14px monospace';
    ctx.fillText(`Active Tweens: ${numTweens}`, 20, 350);
  } else if (step === 3) {
    ctx.fillText('Step 3: Using Tweens with Entities', 20, 40);
    
    // Animate an entity
    const entityX = 50 + (width - 150) * easings.EaseOutQuad(progress);
    const entityY = 150;
    
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(entityX, entityY, 50, 50);
    
    // Show entity info
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('Entity Animation:', 20, 80);
    ctx.fillText(`Position: (${entityX.toFixed(0)}, ${entityY})`, 20, 100);
    
    // Show tween code
    ctx.fillStyle = '#a78bfa';
    ctx.font = '12px monospace';
    ctx.fillText('tweenManager.to(entity, 1000, {', 20, 250);
    ctx.fillText('  x: 500,', 30, 270);
    ctx.fillText('  y: 300', 30, 290);
    ctx.fillText('});', 20, 310);
  } else if (step === 4) {
    ctx.fillText('Step 4: Chaining and Sequencing', 20, 40);
    
    // Show sequential animation
    const phase1 = Math.min(progress * 3, 1);
    const phase2 = Math.max(0, Math.min((progress * 3 - 1), 1));
    const phase3 = Math.max(0, Math.min((progress * 3 - 2), 1));
    
    // Phase 1: Move right
    const x1 = 50 + 200 * easings.EaseOutQuad(phase1);
    const y1 = 150;
    
    // Phase 2: Move down
    const x2 = 250;
    const y2 = 150 + 100 * easings.EaseOutQuad(phase2);
    
    // Phase 3: Scale
    const x3 = 250;
    const y3 = 250;
    const scale3 = 1 + 0.5 * easings.EaseInOutQuad(phase3);
    
    // Draw current phase
    let currentX, currentY, currentScale;
    if (phase1 < 1) {
      currentX = x1;
      currentY = y1;
      currentScale = 1;
    } else if (phase2 < 1) {
      currentX = x2;
      currentY = y2;
      currentScale = 1;
    } else {
      currentX = x3;
      currentY = y3;
      currentScale = scale3;
    }
    
    ctx.save();
    ctx.translate(currentX + 25, currentY + 25);
    ctx.scale(currentScale, currentScale);
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(-25, -25, 50, 50);
    ctx.restore();
    
    // Show sequence
    ctx.fillStyle = '#60a5fa';
    ctx.font = '12px monospace';
    ctx.fillText('Sequence:', 20, 80);
    ctx.fillText(`Phase 1: Move right ${(phase1 * 100).toFixed(0)}%`, 20, 100);
    ctx.fillText(`Phase 2: Move down ${(phase2 * 100).toFixed(0)}%`, 20, 120);
    ctx.fillText(`Phase 3: Scale ${(phase3 * 100).toFixed(0)}%`, 20, 140);
    
    // Show yoyo example
    const yoyoProgress = easings.EaseInOutQuad((Math.sin(progress * Math.PI * 2) + 1) / 2);
    const yoyoX = 50 + (width - 150) * yoyoProgress;
    
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(yoyoX, 320, 40, 40);
    
    ctx.fillStyle = '#a78bfa';
    ctx.font = '12px monospace';
    ctx.fillText('Yoyo (back and forth):', 20, 310);
  } else if (step === 5) {
    ctx.fillText('Step 5: Advanced Easing Functions', 20, 40);
    
    // Show different easing functions
    const easingNames = ['Linear', 'EaseInQuad', 'EaseOutQuad', 'EaseInOutQuad', 'EaseOutBounce', 'EaseOutElastic'];
    const startX = 50;
    const endX = width - 50;
    const baseY = 100;
    const spacing = 45;
    
    easingNames.forEach((name, i) => {
      const y = baseY + i * spacing;
      const easedProgress = easings[name](progress);
      const x = startX + (endX - startX) * easedProgress;
      
      // Draw path
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
      
      // Draw object
      ctx.fillStyle = `hsl(${i * 60}, 70%, 60%)`;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Label
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.fillText(name, 10, y + 4);
    });
    
    // Show easing curve visualization
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const curveStartX = 50;
    const curveStartY = 350;
    const curveWidth = width - 100;
    const curveHeight = 30;
    
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const easedT = easings.EaseOutBounce(t);
      const x = curveStartX + (curveWidth * t);
      const y = curveStartY + (curveHeight * (1 - easedT));
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    
    ctx.fillStyle = '#a78bfa';
    ctx.font = '12px monospace';
    ctx.fillText('EaseOutBounce Curve:', 50, curveStartY - 10);
  } else if (step === 6) {
    ctx.fillText('Step 6: Complete Tweening Integration', 20, 40);
    
    // Show complete game example with multiple tweens
    const playerX = 100 + 200 * easings.EaseOutQuad(progress);
    const playerY = 150;
    
    const enemyX = 400;
    const enemyY = 150 + 100 * easings.EaseOutBounce((Math.sin(progress * Math.PI * 2) + 1) / 2);
    
    const uiScale = 1 + 0.2 * Math.sin(progress * Math.PI * 4);
    
    // Draw player
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(playerX, playerY, 40, 40);
    
    // Draw enemy
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(enemyX, enemyY, 40, 40);
    
    // Draw UI element (scaled)
    ctx.save();
    ctx.translate(width / 2, 300);
    ctx.scale(uiScale, uiScale);
    ctx.fillStyle = '#60a5fa';
    ctx.fillRect(-30, -15, 60, 30);
    ctx.restore();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('UI', width / 2, 305);
    ctx.textAlign = 'left';
    
    // Show info
    ctx.fillStyle = '#60a5fa';
    ctx.font = '14px monospace';
    ctx.fillText('Game with Tweens:', 20, 80);
    ctx.fillText('• Player: Smooth movement (EaseOutQuad)', 20, 100);
    ctx.fillText('• Enemy: Bouncing (EaseOutBounce)', 20, 120);
    ctx.fillText('• UI: Pulsing scale', 20, 140);
    
    // Show code
    ctx.fillStyle = '#a78bfa';
    ctx.font = '10px monospace';
    ctx.fillText('tweenManager.to(player, 1000, { x: 300 });', 20, 360);
    ctx.fillText('tweenManager.to(enemy, 1500, { y: 250 }, { repeat: -1, yoyo: true });', 20, 375);
  } else {
    ctx.fillText('Tweening Module', 20, 40);
    ctx.fillStyle = '#60a5fa';
    const x = 50 + (width - 100) * progress;
    ctx.fillRect(x, 150, 50, 50);
  }
};

