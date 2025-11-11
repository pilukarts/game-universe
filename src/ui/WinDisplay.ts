import Phaser from 'phaser'

export type WinDisplayOptions = {
  mode?: 'untilNextSpin' | 'timed'
  duration?: number
  currency?: string
  locale?: string
}

/**
 * Holographic WinDisplay component
 * Displays win amounts with holographic effects, particles, and audio
 */
export default class WinDisplay {
  private scene: Phaser.Scene
  private container?: Phaser.GameObjects.Container
  private hologramOverlay?: Phaser.GameObjects.Image
  private winText?: Phaser.GameObjects.Text
  private particleEmitter?: Phaser.GameObjects.Particles.ParticleEmitter
  private scanlineEffect?: Phaser.GameObjects.TileSprite
  private isVisible = false

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  /**
   * Show the win display with holographic effects
   * @param winAmount - The amount won
   * @param options - Display options (mode, duration, currency, locale)
   */
  showWin(winAmount: number, options: WinDisplayOptions = {}) {
    if (this.isVisible) {
      this.hide()
    }

    const {
      mode = 'untilNextSpin',
      duration = 3000,
      currency = 'GBP',
      locale = 'en-GB'
    } = options

    this.isVisible = true

    // Create container for all win display elements
    const centerX = this.scene.cameras.main.centerX
    const centerY = this.scene.cameras.main.centerY
    this.container = this.scene.add.container(centerX, centerY)

    // Add hologram overlay (futuristic background effect)
    if (this.scene.textures.exists('hologram_overlay')) {
      this.hologramOverlay = this.scene.add.image(0, 0, 'hologram_overlay')
        .setAlpha(0.7)
        .setBlendMode(Phaser.BlendModes.ADD)
      this.container.add(this.hologramOverlay)

      // Pulse animation for hologram
      this.scene.tweens.add({
        targets: this.hologramOverlay,
        alpha: { from: 0.7, to: 0.9 },
        scale: { from: 1, to: 1.05 },
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      })
    }

    // Add scanline effect for retro-futuristic look
    const graphics = this.scene.make.graphics({ x: 0, y: 0, add: false })
    graphics.fillStyle(0x00ffff, 0.1)
    for (let i = 0; i < 20; i++) {
      graphics.fillRect(0, i * 10, 400, 2)
    }
    graphics.generateTexture('scanline_pattern', 400, 200)
    graphics.destroy()

    this.scanlineEffect = this.scene.add.tileSprite(0, 0, 400, 200, 'scanline_pattern')
      .setAlpha(0.3)
      .setBlendMode(Phaser.BlendModes.ADD)
    this.container.add(this.scanlineEffect)

    // Animate scanline scrolling
    this.scene.tweens.add({
      targets: this.scanlineEffect,
      tilePositionY: 200,
      duration: 2000,
      repeat: -1,
      ease: 'Linear'
    })

    // Format win amount with currency
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    const formattedAmount = formatter.format(winAmount)

    // Create win text with glowing effect
    this.winText = this.scene.add.text(0, 0, `WIN!\n${formattedAmount}`, {
      fontSize: '64px',
      fontFamily: 'Arial',
      color: '#00ffff',
      fontStyle: 'bold',
      align: 'center',
      stroke: '#0080ff',
      strokeThickness: 4
    })
      .setOrigin(0.5)
      .setShadow(0, 0, '#00ffff', 20, true, true)
    this.container.add(this.winText)

    // Glow pulse animation for text
    this.scene.tweens.add({
      targets: this.winText,
      scale: { from: 1, to: 1.1 },
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })

    // Add particle effects if available
    if (this.scene.textures.exists('particle_star')) {
      const particles = this.scene.add.particles(0, 0, 'particle_star', {
        speed: { min: 50, max: 150 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.5, end: 0 },
        alpha: { start: 1, end: 0 },
        lifespan: 2000,
        frequency: 100,
        blendMode: Phaser.BlendModes.ADD
      })
      this.container.add(particles)
      this.particleEmitter = particles as unknown as Phaser.GameObjects.Particles.ParticleEmitter
    }

    // Play ping audio if available
    if (this.scene.sound.get('ping') || this.scene.cache.audio.exists('ping')) {
      this.scene.sound.play('ping', { volume: 0.5 })
    }

    // Fade in container
    this.container.setAlpha(0)
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 500,
      ease: 'Power2'
    })

    // Auto-hide if timed mode
    if (mode === 'timed') {
      this.scene.time.delayedCall(duration, () => {
        this.hide()
      })
    }
  }

  /**
   * Hide the win display
   */
  hide() {
    if (!this.isVisible || !this.container) {
      return
    }

    this.isVisible = false

    // Fade out and destroy
    this.scene.tweens.add({
      targets: this.container,
      alpha: 0,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        if (this.particleEmitter) {
          this.particleEmitter.stop()
        }
        this.container?.destroy(true)
        this.container = undefined
        this.hologramOverlay = undefined
        this.winText = undefined
        this.scanlineEffect = undefined
        this.particleEmitter = undefined
      }
    })
  }

  /**
   * Check if the display is currently visible
   */
  isShowing(): boolean {
    return this.isVisible
  }

  /**
   * Destroy the component and clean up resources
   */
  destroy() {
    if (this.container) {
      this.container.destroy(true)
    }
    this.isVisible = false
    this.container = undefined
    this.hologramOverlay = undefined
    this.winText = undefined
    this.scanlineEffect = undefined
    this.particleEmitter = undefined
  }
}
