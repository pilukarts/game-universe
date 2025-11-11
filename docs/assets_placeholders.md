# Assets Placeholders Guide

## Overview
This document explains the placeholder assets included in the repository and provides instructions for replacing them with final production assets.

## Why Placeholders?
Placeholder assets allow developers and QA to test functionality before final art and audio assets are ready. They:
- Enable early testing of features
- Provide reference dimensions and formats
- Help identify integration issues before final assets arrive

## Placeholder Assets List

### UI Assets

#### hologram_overlay_2048.png / .webp
- **Location**: `assets/ui/`
- **Current Status**: Text placeholder
- **Required Specs**:
  - Dimensions: 2048x2048 pixels
  - Format: PNG with alpha transparency + WebP version
  - Content: Futuristic holographic interference pattern texture
  - Alpha: Semi-transparent (0.5-0.7 opacity)
  - File size: PNG < 500KB, WebP < 200KB
  - Usage: Background overlay for win display

#### Replacement Instructions:
1. Create a holographic texture with interference patterns
2. Export at 2048x2048 with transparency
3. Save as PNG and optimize with tools like TinyPNG
4. Convert to WebP using tools like cwebp or online converters
5. Replace both files in `assets/ui/`

### Particle Assets

#### particle_star_512.png / .webp
- **Location**: `assets/particles/`
- **Current Status**: Text placeholder
- **Required Specs**:
  - Dimensions: 512x512 pixels
  - Format: PNG with alpha transparency + WebP version
  - Content: White star with soft edges (radial gradient)
  - Alpha: Fully transparent edges, opaque center
  - File size: PNG < 100KB, WebP < 50KB
  - Usage: Particle emission in win display

#### Replacement Instructions:
1. Create a white star with a soft glow effect
2. Use radial gradients for smooth edges
3. Ensure full alpha transparency at edges
4. Export at 512x512
5. Optimize and convert to both PNG and WebP
6. Replace both files in `assets/particles/`

### Icon Assets

#### tile_U_1024.png, tile_U_512.png
- **Location**: `assets/icons/`
- **Current Status**: Text placeholder
- **Required Specs**:
  - Dimensions: 1024x1024 and 512x512 pixels
  - Format: PNG with alpha transparency
  - Content: 'U' letter tile matching game style
  - Usage: UNIVERSE bonus trigger symbol

#### tile_X_2048.png, tile_X_1024.png
- **Location**: `assets/icons/`
- **Current Status**: Text placeholder
- **Required Specs**:
  - Dimensions: 2048x2048 and 1024x1024 pixels
  - Format: PNG with alpha transparency
  - Content: 'X' letter tile matching game style
  - Usage: UNIVERSE bonus trigger symbol

#### Replacement Instructions:
1. Design 'U' and 'X' tiles to match game's visual style
2. Export at multiple resolutions for different device DPIs
3. Include alpha transparency for irregular shapes
4. Optimize file sizes
5. Replace all resolution variants in `assets/icons/`

### Audio Assets

#### ping_placeholder.txt
- **Location**: `assets/sfx/`
- **Current Status**: Text placeholder
- **Required Specs**:
  - Duration: ~0.5 seconds
  - Format: MP3 (128kbps) and OGG (quality 5)
  - Content: Bright, attention-grabbing "ping" sound
  - Usage: Win display audio feedback

#### Replacement Instructions:
1. Create or source a short ping sound effect
2. Edit to ~0.5 seconds duration
3. Export as:
   - `ping.mp3` (128kbps)
   - `ping.ogg` (quality 5)
4. Delete `ping_placeholder.txt`
5. Place MP3 and OGG files in `assets/sfx/`

#### ambient_placeholder.txt
- **Location**: `assets/sfx/`
- **Current Status**: Text placeholder
- **Required Specs**:
  - Duration: 60-120 seconds
  - Format: MP3 (128kbps) and OGG (quality 5)
  - Content: Looping ambient background music
  - Loop: Seamless loop
  - Usage: Background music for gameplay

#### Replacement Instructions:
1. Create or license looping ambient music
2. Ensure seamless loop (no clicks at loop point)
3. Duration: 60-120 seconds
4. Export as:
   - `ambient.mp3` (128kbps)
   - `ambient.ogg` (quality 5)
5. Delete `ambient_placeholder.txt`
6. Place MP3 and OGG files in `assets/sfx/`

## Multi-Resolution Strategy

For optimal performance across devices, provide multiple resolutions:

### Image Resolution Tiers
- **@4x (2048px)**: High-DPI desktop displays, large tablets
- **@2x (1024px)**: Standard desktop, tablets
- **@1x (512px)**: Mobile devices, low-DPI displays
- **@0.5x (256px)**: Low-end mobile devices
- **UI icons (48px)**: Small UI elements

### Format Choices
- **WebP**: Preferred for modern browsers (better compression)
- **PNG**: Fallback for older browsers
- **Progressive JPEG**: Alternative for photos (not used here)

## Asset Optimization Tools

### Image Optimization
- **TinyPNG**: https://tinypng.com/ (PNG/JPEG compression)
- **Squoosh**: https://squoosh.app/ (image optimization, WebP conversion)
- **ImageOptim**: https://imageoptim.com/ (Mac)
- **cwebp**: Command-line WebP converter

### Audio Optimization
- **Audacity**: Free audio editor
- **ffmpeg**: Command-line audio converter
- **Online Audio Converter**: https://online-audio-converter.com/

## Testing Checklist

After replacing placeholders:
- [ ] Verify all assets load without console errors
- [ ] Test on desktop (Chrome, Firefox, Safari)
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Verify WebP fallback to PNG works
- [ ] Check audio playback on all target browsers
- [ ] Measure and optimize file sizes
- [ ] Test performance on low-end devices
- [ ] Verify particle effects render smoothly
- [ ] Check hologram overlay alpha blending

## PreloadScene Updates

When replacing placeholders, ensure PreloadScene.ts handles:
1. WebP detection and fallback to PNG
2. Multiple resolution loading based on device DPI
3. Error handling for missing assets
4. Audio format selection (MP3 vs OGG)

### Example: Multiple Resolution Loading
```typescript
const dpr = window.devicePixelRatio || 1
let size = '512'
if (dpr >= 3) size = '2048'
else if (dpr >= 2) size = '1024'

this.load.image('tile_X', `assets/icons/tile_X_${size}.png`)
```

## Repository Structure

```
assets/
├── ui/
│   ├── hologram_overlay_2048.png (PLACEHOLDER)
│   └── hologram_overlay_2048.webp (PLACEHOLDER)
├── particles/
│   ├── particle_star_512.png (PLACEHOLDER)
│   └── particle_star_512.webp (PLACEHOLDER)
├── icons/
│   ├── tile_U_1024.png (PLACEHOLDER)
│   ├── tile_U_512.png (PLACEHOLDER)
│   ├── tile_X_2048.png (PLACEHOLDER)
│   └── tile_X_1024.png (PLACEHOLDER)
├── sfx/
│   ├── ping_placeholder.txt (PLACEHOLDER)
│   └── ambient_placeholder.txt (PLACEHOLDER)
└── docs/
    └── screenshots/
        └── win_demo_placeholder.png (PLACEHOLDER)
```

## Production Readiness

Before merging to main, ensure:
1. All text placeholders are replaced with real assets
2. Assets are optimized for web delivery
3. Multiple resolutions are provided for all images
4. Audio files are in both MP3 and OGG formats
5. All assets load without errors in PreloadScene
6. Performance is acceptable on target devices
7. Assets match the game's visual and audio style

## Questions?
If you encounter issues replacing assets or need clarification on specifications, please comment on the PR or contact the development team.
