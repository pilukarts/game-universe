# Asset Placeholders Documentation

## Overview
This document describes all placeholder assets in the repository that must be replaced with final production assets before merging to main or deploying to production.

**IMPORTANT:** All placeholders are text files or basic placeholders. They serve as reminders of what assets are needed and their specifications. Replace them with real, optimized assets before release.

## Placeholder Asset List

### UI Assets

#### Hologram Overlay
- **Placeholder Files:**
  - `assets/ui/hologram_overlay_2048.png`
  - `assets/ui/hologram_overlay_2048.webp`
- **Status:** PLACEHOLDER - Text files, not actual images
- **Required Specifications:**
  - Format: PNG (with alpha transparency) and WebP
  - Resolutions needed: 2048x2048, 1024x1024, 512x512
  - Content: Holographic/futuristic overlay texture with transparency gradient
  - Style: Sci-fi hologram aesthetic (cyan/blue tones recommended)
  - File naming: `hologram_overlay_{resolution}.{ext}`
- **Usage:** Background overlay for WinDisplay component
- **Priority:** HIGH - Critical for visual appearance

#### Scanline Effect
- **Status:** Currently generated procedurally in PreloadScene
- **Optional Improvement:** Provide custom scanline texture
  - Path: `assets/ui/scanline.png` or `scanline.webp`
  - Format: Tileable pattern
  - Resolution: 64x32 or similar tileable size
  - Content: Horizontal scanlines for CRT/hologram effect
- **Priority:** LOW - Procedural generation is acceptable

### Particle Assets

#### Particle Star
- **Placeholder Files:**
  - `assets/particles/particle_star_512.png`
  - `assets/particles/particle_star_512.webp`
- **Status:** PLACEHOLDER - Text files, not actual images
- **Required Specifications:**
  - Format: PNG (with alpha transparency) and WebP
  - Resolutions needed: 512x512, 256x256, 128x128
  - Content: Star/sparkle particle with soft glow
  - Style: White or light cyan with transparent edges
  - File naming: `particle_star_{resolution}.{ext}`
- **Usage:** Particle emission effects in WinDisplay
- **Priority:** HIGH - Affects visual polish significantly

### Icon/Tile Assets

#### Tile U
- **Placeholder Files:**
  - `assets/icons/tile_U_1024.png`
  - `assets/icons/tile_U_512.png`
- **Status:** PLACEHOLDER - Text files, not actual images
- **Required Specifications:**
  - Format: PNG with alpha transparency
  - Resolutions: 1024x1024, 512x512, 256x256
  - Content: 'U' tile graphic for UNIVERSE X bonus mechanic
  - Style: Match game's visual theme
  - File naming: `tile_U_{resolution}.png`
- **Usage:** Symbol graphics for U+X combo bonus trigger
- **Priority:** MEDIUM - Required for bonus feature visualization

#### Tile X
- **Placeholder Files:**
  - `assets/icons/tile_X_2048.png`
  - `assets/icons/tile_X_1024.png`
- **Status:** PLACEHOLDER - Text files, not actual images
- **Required Specifications:**
  - Format: PNG with alpha transparency
  - Resolutions: 2048x2048, 1024x1024, 512x512, 256x256
  - Content: 'X' tile graphic for UNIVERSE X bonus mechanic
  - Style: Match game's visual theme
  - File naming: `tile_X_{resolution}.png`
- **Usage:** Symbol graphics for U+X combo bonus trigger
- **Priority:** MEDIUM - Required for bonus feature visualization

### Audio Assets

#### Ping Sound Effect
- **Placeholder File:**
  - `assets/sfx/ping_placeholder.txt`
- **Status:** PLACEHOLDER - Text file, not actual audio
- **Required Specifications:**
  - Formats: MP3 and OGG (for cross-browser compatibility)
  - Duration: ~0.5-1 second
  - Content: Short, pleasant notification/win sound
  - Style: Futuristic/electronic (matches hologram theme)
  - File naming: `ping.mp3`, `ping.ogg`
- **Usage:** Audio feedback when WinDisplay appears
- **Priority:** MEDIUM - Enhances UX but not critical

#### Ambient Loop
- **Placeholder File:**
  - `assets/sfx/ambient_placeholder.txt`
- **Status:** PLACEHOLDER - Text file, not actual audio
- **Required Specifications:**
  - Formats: MP3 and OGG
  - Duration: Variable (loop-friendly, typically 30-120 seconds)
  - Content: Atmospheric background music/soundscape
  - Style: Space/sci-fi ambient (subtle, non-intrusive)
  - File naming: `ambient_loop.mp3`, `ambient_loop.ogg`
- **Usage:** Background ambience (if implemented)
- **Priority:** LOW - Optional feature

### Documentation Assets

#### Win Demo Screenshot
- **Placeholder File:**
  - `assets/docs/screenshots/win_demo_placeholder.png`
- **Status:** PLACEHOLDER - Text file, not actual screenshot
- **Required Specifications:**
  - Format: PNG
  - Resolution: 1024x768 or higher
  - Content: Screenshot of WinDisplay in action
  - Capture: Show hologram effects, particles, and formatted win amount
- **Usage:** Pull request and documentation illustration
- **Priority:** HIGH - Required for PR review and documentation

## Replacement Instructions

### For Designers/Artists

1. **Review Specifications:** Check the required specs for each asset above
2. **Create Assets:** Design assets according to specifications
3. **Optimize:**
   - PNG: Use TinyPNG, pngquant, or similar for compression
   - WebP: Convert from PNG using tools like `cwebp` or online converters
   - Audio: Use appropriate bitrates (128-192 kbps for music, 96-128 kbps for SFX)
4. **Provide Multiple Resolutions:** Create 2-4 resolution variants for images
5. **Replace Placeholders:** Delete placeholder text files and add real assets
6. **Test:** Run the game locally to verify assets load correctly

### For Developers

#### Image Assets
```bash
# After receiving assets from designers:
# 1. Remove placeholder text files
rm assets/ui/hologram_overlay_2048.png
rm assets/ui/hologram_overlay_2048.webp

# 2. Add optimized images
cp ~/designs/hologram_overlay_2048.png assets/ui/
cp ~/designs/hologram_overlay_2048.webp assets/ui/

# 3. Verify file sizes are reasonable (2048px should be < 500KB)
ls -lh assets/ui/

# 4. Test loading in browser
npm run dev
```

#### Audio Assets
```bash
# After receiving audio from sound designer:
# 1. Remove placeholder text file
rm assets/sfx/ping_placeholder.txt

# 2. Add both MP3 and OGG formats
cp ~/sounds/ping.mp3 assets/sfx/
cp ~/sounds/ping.ogg assets/sfx/

# 3. Update PreloadScene.ts to load audio
# Uncomment the audio loading lines
```

#### Update PreloadScene
After adding real assets, update `src/scenes/PreloadScene.ts` to load them:

```typescript
preload() {
  // Images - with WebP/PNG fallback
  if (this.sys.game.device.browser.safari) {
    this.load.image('hologram_overlay', 'assets/ui/hologram_overlay_2048.png')
    this.load.image('particle_star', 'assets/particles/particle_star_512.png')
  } else {
    this.load.image('hologram_overlay', 'assets/ui/hologram_overlay_2048.webp')
    this.load.image('particle_star', 'assets/particles/particle_star_512.webp')
  }

  // Audio - uncomment when real files are added
  this.load.audio('ping', ['assets/sfx/ping.mp3', 'assets/sfx/ping.ogg'])
}
```

## Asset Optimization Guidelines

### Images
- **PNG:**
  - Use 8-bit color depth if possible (24-bit if gradients require it)
  - Enable alpha transparency
  - Compress with TinyPNG or pngquant
  - Target: < 200KB for 2048px, < 100KB for 1024px

- **WebP:**
  - Quality setting: 80-90
  - Enable alpha transparency
  - Target: ~30-50% smaller than equivalent PNG

### Audio
- **MP3:**
  - Bitrate: 128 kbps for SFX, 192 kbps for music
  - Sample rate: 44.1 kHz
  - Mono for SFX, stereo for music

- **OGG:**
  - Quality setting: ~5-6 (VBR)
  - Sample rate: 44.1 kHz
  - Generally produces smaller files than MP3 at equivalent quality

## Verification Checklist

Before marking placeholders as replaced:

- [ ] All placeholder text files have been deleted
- [ ] Real optimized assets are in place
- [ ] Multiple resolutions provided where specified
- [ ] Both WebP and PNG formats provided for images
- [ ] Both MP3 and OGG formats provided for audio
- [ ] File sizes are optimized (see guidelines above)
- [ ] Assets load without errors in browser console
- [ ] Visual/audio quality meets production standards
- [ ] Game performance is not negatively impacted
- [ ] Assets tested on multiple browsers (Chrome, Firefox, Safari)
- [ ] Mobile testing completed (if applicable)

## Fallback Strategy

The code includes fallbacks for missing assets:

- **Hologram Overlay:** Falls back to semi-transparent rectangle (cyan color)
- **Scanline:** Procedurally generated in PreloadScene
- **Particle Star:** Particle emitter is conditionally created (skipped if texture missing)
- **Audio:** Playback is conditional (no error if sound not loaded)

These fallbacks allow the feature to work during development but should NOT be relied upon for production.

## Asset Management Best Practices

1. **Version Control:**
   - Do not commit large binary files directly to Git (consider Git LFS)
   - Keep source files (PSD, AI, etc.) in a separate design repository
   - Use `.gitignore` for intermediate/unoptimized assets

2. **Organization:**
   - Maintain consistent naming conventions
   - Group assets by type (ui/, particles/, sfx/, etc.)
   - Include resolution in filename (e.g., `_2048`, `_512`)

3. **Documentation:**
   - Update this document when adding new placeholder assets
   - Document any asset-specific requirements or constraints
   - Keep a changelog of asset replacements

## Contact / Asset Delivery

**Where to send final assets:**
- Create a pull request with asset files replacing placeholders
- Or notify the project maintainer (@pilukarts) with a link to asset package
- Include any special instructions or attribution requirements

**Asset package should include:**
- All required formats and resolutions
- Source files (optional but recommended)
- License/attribution information if applicable
- Brief description of any special requirements or effects

---

**Last Updated:** Branch created for features/variable-tiles-and-bonuses integration
**Maintainer:** @pilukarts
# Asset placeholders added

The following placeholder files were added to the branch features/variable-tiles-and-bonuses. Replace them with optimized PNG/WebP and real SFX before production.

- assets/ui/hologram_overlay_2048.png
- assets/ui/hologram_overlay_2048.webp
- assets/particles/particle_star_512.png
- assets/particles/particle_star_512.webp
- assets/icons/tile_U_1024.png
- assets/icons/tile_U_512.png
- assets/icons/tile_X_2048.png
- assets/icons/tile_X_1024.png
- assets/sfx/ping_placeholder.txt
- assets/sfx/ambient_placeholder.txt

Instructions:
- Export PNG/WebP at 2048/1024/512/256/48 sizes. Optimize PNGs and create WebP fallbacks.
- Add both .mp3 and .ogg versions of SFX.
- Update PreloadScene paths if you change filenames.
