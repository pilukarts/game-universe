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
