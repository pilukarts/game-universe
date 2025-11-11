import Phaser from 'phaser'

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    // Preload hologram overlay assets (with fallback to WebP/PNG)
    // Try WebP first, fallback to PNG
    const useWebP = this.sys.game.device.browser.webp
    
    if (useWebP && this.load.image) {
      // Try to load WebP versions first
      this.load.image('hologram_overlay', 'assets/ui/hologram_overlay_2048.webp')
      this.load.image('particle_star', 'assets/particles/particle_star_512.webp')
    } else {
      // Fallback to PNG
      this.load.image('hologram_overlay', 'assets/ui/hologram_overlay_2048.png')
      this.load.image('particle_star', 'assets/particles/particle_star_512.png')
    }

    // Load icon tiles (U and X for bonus triggers)
    this.load.image('tile_U_1024', 'assets/icons/tile_U_1024.png')
    this.load.image('tile_U_512', 'assets/icons/tile_U_512.png')
    this.load.image('tile_X_2048', 'assets/icons/tile_X_2048.png')
    this.load.image('tile_X_1024', 'assets/icons/tile_X_1024.png')

    // Load audio (placeholder text files for now - replace with mp3/ogg)
    // Note: These will fail to load as audio but won't crash the game
    // Replace with real audio files before production
    this.load.on('loaderror', (file: Phaser.Loader.File) => {
      console.warn(`Failed to load: ${file.key} (${file.src}) - this is expected for placeholder text files`)
    })
    
    // Attempt to load audio - will fail gracefully if files are text placeholders
    if (this.load.audio) {
      this.load.audio('ping', ['assets/sfx/ping_placeholder.txt'])
      this.load.audio('ambient', ['assets/sfx/ambient_placeholder.txt'])
    }
  }

  create() {
    // Generate placeholder textures for symbols (replace with your assets later)
    const colors = [0x60a86b, 0xd94b3b, 0x7b5fd1, 0x2fa6b4, 0xf0c75e, 0x9b9b9b]
    for (let i = 0; i < colors.length; i++) {
      const key = `symbol_${i}`
      const g = this.make.graphics({ x: 0, y: 0, add: false })
      g.fillStyle(0x222222, 1)
      g.fillRoundedRect(0, 0, 128, 128, 16)
      g.fillStyle(colors[i], 1)
      g.fillCircle(64, 44, 34)
      g.fillStyle(0xffffff, 1)
      g.setTextStyle({ fontSize: '36px', fontFamily: 'Arial' })
      const txt = String.fromCharCode(65 + i)
      g.fillText(txt, 54, 84)
      g.generateTexture(key, 128, 128)
      g.destroy()
    }

    // gold frame for winning symbols
    const g2 = this.make.graphics({ x: 0, y: 0, add: false })
    g2.lineStyle(6, 0xffd166)
    g2.strokeRoundedRect(3, 3, 122, 122, 14)
    g2.generateTexture('gold_frame', 128, 128)
    g2.destroy()

    this.scene.start('GameScene')
  }
}
