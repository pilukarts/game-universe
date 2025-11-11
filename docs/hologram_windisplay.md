# Hologram WinDisplay Documentation

## Overview
The hologram WinDisplay is a futuristic UI component that displays win amounts with holographic effects, particles, and audio feedback. It's designed to provide an engaging visual experience when players win in the game.

## Features
- **Holographic Overlay**: Semi-transparent holographic texture with pulsing animation
- **Scanline Effect**: Retro-futuristic scrolling scanline effect
- **Particle Effects**: Star particles that emit from the center of the display
- **Audio Feedback**: Plays a "ping" sound when the win is displayed
- **Customizable Display**: Supports different currencies, locales, and display modes

## Usage

### Basic Integration in GameScene

```typescript
import WinDisplay from '../ui/WinDisplay'

export default class GameScene extends Phaser.Scene {
  private winDisplay?: WinDisplay

  create() {
    // Initialize WinDisplay in your scene's create method
    this.winDisplay = new WinDisplay(this)
  }

  // When a player wins (e.g., after spin resolution)
  onSpinResolved(winAmount: number) {
    if (winAmount > 0) {
      this.winDisplay?.showWin(winAmount, {
        mode: 'untilNextSpin',
        currency: 'GBP',
        locale: 'en-GB'
      })
    }
  }

  // Before starting a new spin
  startNewSpin() {
    this.winDisplay?.hide()
    // ... rest of spin logic
  }
}
```

### Display Options

The `showWin()` method accepts the following options:

- **mode**: `'untilNextSpin'` (default) or `'timed'`
  - `'untilNextSpin'`: Display stays visible until explicitly hidden
  - `'timed'`: Display auto-hides after the specified duration
  
- **duration**: Duration in milliseconds (default: 3000) - only applies in 'timed' mode

- **currency**: Currency code (default: 'GBP')
  - Examples: 'GBP', 'USD', 'EUR'

- **locale**: Locale for number formatting (default: 'en-GB')
  - Examples: 'en-GB', 'en-US', 'de-DE'

### Example: Timed Display

```typescript
// Show win for 5 seconds, then auto-hide
this.winDisplay?.showWin(50.00, {
  mode: 'timed',
  duration: 5000,
  currency: 'USD',
  locale: 'en-US'
})
```

## Testing

Use the **WinDemoScene** to test the WinDisplay component:

1. Start the game in development mode
2. Navigate to WinDemoScene (or modify main.ts to load it directly)
3. Click "SHOW WIN" to display the win effect
4. Use arrow keys or buttons to change the test amount
5. Click "HIDE WIN" or press 'H' to manually hide the display

### Keyboard Controls in Demo Scene
- **Left/Right Arrow**: Change test amount
- **Space**: Show win display
- **H**: Hide win display

## Asset Requirements

The WinDisplay component requires the following assets:

### Images
- `hologram_overlay`: Holographic overlay texture (2048x2048 recommended)
  - Should be semi-transparent with holographic interference patterns
  - WebP and PNG versions for browser compatibility

- `particle_star`: Star particle for particle effects (512x512 recommended)
  - White star with soft edges and alpha transparency
  - WebP and PNG versions for browser compatibility

### Audio
- `ping`: Short ping sound effect (0.5 seconds)
  - Bright, attention-grabbing sound
  - MP3 and OGG formats for browser compatibility

## Performance Considerations

### Mobile Optimization
For mobile devices, consider:
- Reducing particle emission frequency
- Lowering particle counts
- Reducing hologram overlay alpha
- Disabling scanline effect on lower-end devices

### Example Mobile Optimization

```typescript
const isMobile = this.sys.game.device.os.android || this.sys.game.device.os.iOS

if (isMobile) {
  // Show simpler version on mobile
  this.winDisplay?.showWin(winAmount, {
    mode: 'timed',
    duration: 2000 // Shorter duration on mobile
  })
} else {
  // Full effects on desktop
  this.winDisplay?.showWin(winAmount, {
    mode: 'untilNextSpin'
  })
}
```

## API Reference

### Constructor
```typescript
new WinDisplay(scene: Phaser.Scene)
```

### Methods

#### showWin(winAmount, options?)
Displays the win with holographic effects.

```typescript
showWin(winAmount: number, options?: WinDisplayOptions): void
```

#### hide()
Hides the win display with a fade-out animation.

```typescript
hide(): void
```

#### isShowing()
Returns whether the display is currently visible.

```typescript
isShowing(): boolean
```

#### destroy()
Destroys the component and cleans up all resources.

```typescript
destroy(): void
```

## Troubleshooting

### Display not showing
- Ensure assets are loaded in PreloadScene
- Check browser console for asset loading errors
- Verify the WinDisplay is instantiated before calling showWin()

### No audio
- Check that audio files are in MP3 and OGG formats
- Verify PreloadScene is loading the audio assets
- Check browser console for audio loading errors
- Note: Some browsers require user interaction before playing audio

### Poor performance
- Reduce particle emission frequency
- Lower particle count
- Disable scanline effect
- Use smaller texture sizes for hologram overlay

## Future Enhancements

Potential improvements for future versions:
- Tiered win displays (small, medium, big, mega wins)
- Different hologram colors based on win amount
- Multiple particle types
- Win streak indicators
- Animated coin/currency symbols
- Sound effects for different win tiers
