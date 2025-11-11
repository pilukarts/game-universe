import Phaser from 'phaser'

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    // Hologram overlay assets (WebP with PNG fallback)
    if (this.sys.game.device.browser.safari) {
      // Safari fallback to PNG
      this.load.image('hologram_overlay', 'assets/ui/hologram_overlay_2048.png')
    } else {
      // Modern browsers use WebP
      this.load.image('hologram_overlay', 'assets/ui/hologram_overlay_2048.webp')
    }

    // Scanline effect (generated procedurally as fallback)
    // In production, load from assets/ui/scanline.png or scanline.webp

    // Particle star asset (WebP with PNG fallback)
    if (this.sys.game.device.browser.safari) {
      this.load.image('particle_star', 'assets/particles/particle_star_512.png')
    } else {
      this.load.image('particle_star', 'assets/particles/particle_star_512.webp')
    }

    // Ping audio (placeholder - replace with real mp3/ogg)
    // this.load.audio('ping', 'assets/sfx/ping.mp3')
    // For now, we'll handle missing audio gracefully in WinDisplay
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

    // Generate scanline texture procedurally
    const scanlineG = this.make.graphics({ x: 0, y: 0, add: false })
    for (let y = 0; y < 32; y += 2) {
      scanlineG.fillStyle(0xffffff, y % 4 === 0 ? 0.1 : 0.05)
      scanlineG.fillRect(0, y, 64, 1)
    }
    scanlineG.generateTexture('scanline', 64, 32)
    scanlineG.destroy()

    this.scene.start('GameScene')
  }
}
