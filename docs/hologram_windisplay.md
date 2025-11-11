# Hologram WinDisplay Documentation

## Overview
The holographic WinDisplay is a UI component that presents win amounts with futuristic holographic effects, including animated overlays, scanline effects, particle emissions, and audio feedback.

## Components

### WinDisplay.ts (`src/ui/WinDisplay.ts`)
A reusable Phaser UI component that displays win amounts with holographic styling.

**Features:**
- Holographic overlay background with animated effects
- Scanline shader effects for retro-futuristic aesthetic
- Particle star emissions around the win display
- Audio feedback (ping sound on display)
- Configurable display modes and formatting options
- Responsive fade-in/fade-out animations
- Pulsing text effects

**Usage:**
```typescript
import WinDisplay from '../ui/WinDisplay'

// In your scene's create method:
this.winDisplay = new WinDisplay(this)

// Show a win:
this.winDisplay.showWin(100.50, {
  mode: 'untilNextSpin',  // or 'timed'
  duration: 3000,          // milliseconds (for timed mode)
  currency: 'GBP',
  locale: 'en-GB'
})

// Hide the display:
this.winDisplay.hide()

// Clean up:
this.winDisplay.destroy()
```

**Display Modes:**
- `untilNextSpin` - Display remains visible until manually hidden (default)
- `timed` - Automatically hides after the specified duration

### WinDemoScene.ts (`src/scenes/WinDemoScene.ts`)
An interactive test scene for the WinDisplay component.

**Features:**
- Multiple test amounts (£10, £50, £100, £250, £500, £1000)
- Toggle between display modes (untilNextSpin vs timed)
- Keyboard shortcuts for rapid testing
- Visual test buttons for different amounts
- Back button to return to GameScene

**Keyboard Controls:**
- `SPACE` - Show win with current test amount
- `UP/DOWN` - Cycle through test amounts
- `H` - Hide the win display

**Accessing the Demo:**
1. From GameScene, click the "Demo" button in the top-right corner
2. Or directly start the scene: `this.scene.start('WinDemoScene')`

## GameScene Integration

### Minimal Integration
The WinDisplay is integrated into GameScene with minimal changes:

1. **Import and Initialize** (in `create()`):
```typescript
import WinDisplay from '../ui/WinDisplay'

create() {
  // ... existing setup ...
  this.winDisplay = new WinDisplay(this)
}
```

2. **Show Win** (in `resolveCascades()` or after win calculation):
```typescript
if (totalWin > 0) {
  this.winDisplay?.showWin(totalWin, {
    mode: 'untilNextSpin',
    currency: 'GBP',
    locale: 'en-GB'
  })
}
```

3. **Hide Before New Spin** (in `startSpin()` or equivalent):
```typescript
this.winDisplay?.hide()
```

## Asset Requirements

### Required Assets
All current assets are **placeholders** and must be replaced before production:

1. **Hologram Overlay** (`assets/ui/hologram_overlay_2048.png` / `.webp`)
   - Resolution: 2048x2048 (provide multiple sizes: 2048, 1024, 512)
   - Format: PNG with alpha channel or WebP
   - Content: Holographic/futuristic overlay texture with transparency

2. **Particle Star** (`assets/particles/particle_star_512.png` / `.webp`)
   - Resolution: 512x512 (provide 512, 256, 128)
   - Format: PNG with alpha or WebP
   - Content: Star/sparkle particle for emission effects

3. **Ping Audio** (`assets/sfx/ping.mp3` / `.ogg`)
   - Format: MP3 and OGG for cross-browser compatibility
   - Duration: ~0.5-1 second
   - Content: Short notification/win sound

4. **Scanline Effect** (optional - currently generated procedurally)
   - Can be provided as `assets/ui/scanline.png` for more control
   - Resolution: Tileable pattern (e.g., 64x32)

### Asset Loading
Assets are loaded in `PreloadScene.ts` with WebP/PNG fallback for Safari:

```typescript
preload() {
  if (this.sys.game.device.browser.safari) {
    this.load.image('hologram_overlay', 'assets/ui/hologram_overlay_2048.png')
  } else {
    this.load.image('hologram_overlay', 'assets/ui/hologram_overlay_2048.webp')
  }
  // Similar pattern for particle_star
}
```

## Testing Instructions

### Local Testing
1. Checkout the feature branch:
   ```bash
   git checkout features/variable-tiles-and-bonuses
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open in browser (typically http://localhost:5173)

### Testing the WinDisplay

**Option 1: WinDemoScene**
- Click "Demo" button in GameScene
- Use keyboard shortcuts or buttons to test various amounts
- Toggle between display modes
- Verify animations, particles, and text formatting

**Option 2: GameScene Integration**
- Play the game normally
- Spin and match symbols to create winning combinations
- Observe the WinDisplay appear after cascades complete
- Verify the display hides when starting a new spin

### QA Checklist
- [ ] WinDisplay appears correctly after wins
- [ ] Text formatting matches currency/locale settings
- [ ] Animations are smooth (fade-in, pulse, fade-out)
- [ ] Particles emit properly (if assets loaded)
- [ ] Display hides before new spin begins
- [ ] No console errors
- [ ] Performance is acceptable (especially on mobile)
- [ ] Works with both display modes

## Customization

### Styling
Edit `WinDisplay.ts` to adjust:
- Text size, color, and shadow effects
- Animation durations and easing functions
- Particle emission rates and properties
- Container depth and positioning

### Behavior
Modify display modes, timing, or interaction handling in the `showWin()` and `hide()` methods.

### Localization
The component supports Intl.NumberFormat for currency formatting:
```typescript
this.winDisplay.showWin(amount, {
  currency: 'EUR',
  locale: 'de-DE'
})
```

## Performance Considerations

### Mobile Optimization
For mobile devices, consider:
- Reducing particle emission frequency
- Lowering alpha/opacity values
- Using smaller asset resolutions
- Simplifying or disabling scanline effects

### Asset Optimization
- Use WebP format for modern browsers (smaller file sizes)
- Provide multiple resolutions and load appropriate sizes
- Compress PNG assets with tools like TinyPNG or pngquant
- Optimize audio files (lower bitrate for SFX)

## Troubleshooting

**Issue: Assets not loading**
- Verify asset paths in PreloadScene match actual file locations
- Check browser console for 404 errors
- Ensure WebP/PNG fallbacks are in place for Safari

**Issue: Particles not visible**
- Confirm `particle_star` texture is loaded
- Check particle emitter settings (scale, alpha, lifespan)
- Verify container depth is high enough (currently 1000)

**Issue: Audio not playing**
- Ensure audio files are in correct formats (mp3/ogg)
- Browser may block autoplay - user interaction required
- Check browser console for audio loading errors

**Issue: Display not hiding**
- Verify `hide()` is called in `startSpin()` or equivalent
- Check for tween conflicts that might prevent fade-out

## Future Enhancements
- Animated number counting (tween from 0 to final amount)
- Different hologram styles/colors based on win size
- Additional particle effects for large wins
- Multiplier display integration
- Sound variations for different win tiers
# Hologram WinDisplay

## Descripción

El componente `WinDisplay` es un efecto holográfico que muestra las ganancias al jugador de manera visual y atractiva. Utiliza capas de imágenes con modos de mezcla especiales, efectos de partículas y animaciones para crear una experiencia de "holograma" futurista.

## Características

- **Overlay holográfico**: Imagen semitransparente con modo de mezcla ADD para efecto de brillo
- **Scanline animado**: Efecto de líneas de escaneo que se mueven verticalmente
- **Partículas de estrellas**: Sistema de partículas que emite estrellas durante la animación
- **Sonido**: Reproduce un "ping" cuando aparece (requiere archivo de audio real)
- **Auto-hide**: Se oculta automáticamente después de 3 segundos

## Uso

### Integración en GameScene

```typescript
import { WinDisplay } from '../ui/WinDisplay'

// En el constructor o propiedades
private winDisplay?: WinDisplay

// En create()
this.winDisplay = new WinDisplay(this)
this.winDisplay.create(512, 400) // x, y center position

// Cuando hay una ganancia
this.winDisplay.showWin(winAmount)

// Para ocultar manualmente (se oculta solo automáticamente)
this.winDisplay.hide()

// Al iniciar un nuevo spin
this.winDisplay.hide()
```

### Demo Scene

Para probar el componente sin el juego completo, ejecuta la escena `WinDemoScene`:

1. Modifica `src/main.ts` para iniciar con `WinDemoScene`
2. O añade un botón/tecla en GameScene para cambiar a la demo
3. Presiona ESPACIO para disparar animaciones de prueba
4. Presiona 1-5 para montos específicos
5. Presiona ESC para volver al juego

## Assets Requeridos

Los siguientes assets deben estar cargados en PreloadScene:

- `hologram_overlay`: assets/ui/hologram_overlay_2048.webp (o .png)
- `scanline`: assets/ui/scanline.svg
- `particle_star`: assets/particles/particle_star_512.webp (o .png)
- `ping`: assets/sfx/ping.mp3 y ping.ogg (actualmente placeholder .txt)

## Personalización

### Ajustar posición y escala

En la llamada a `create()`:

```typescript
this.winDisplay.create(x, y) // Cambia x, y según necesites
```

En `WinDisplay.ts`, ajusta `.setScale()` para cambiar tamaño de overlays.

### Ajustar duración de animación

En `WinDisplay.ts`, método `showWin()`:
- Duración de fade-in: cambiar `duration: 400`
- Tiempo antes de auto-hide: cambiar `3000` en `delayedCall`
- Duración de partículas: cambiar `2000` en el stop de particles

### Ajustar efectos de partículas

En el constructor de partículas en `create()`:
- `speed`: velocidad de partículas
- `quantity`: número de partículas por emisión
- `frequency`: milisegundos entre emisiones
- `lifespan`: duración de vida de cada partícula

Para móviles, reduce `quantity` y `frequency` para mejor rendimiento.

## Notas

- Los archivos de audio actuales son placeholders (.txt). Reemplazar con .mp3/.ogg antes de producción.
- Las imágenes PNG/WebP son placeholders de baja calidad. Reemplazar con assets finales optimizados.
- El efecto usa `BlendMode.ADD` que puede verse diferente según el fondo. Ajusta `setAlpha()` si es necesario.
- En dispositivos móviles, considera reducir partículas o desactivarlas para mejor rendimiento.
