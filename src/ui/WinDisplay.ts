import Phaser from 'phaser'

/**
 * WinDisplay - Hologram-style win notification component
 * Shows a holographic overlay with particle effects and displays win amount
 */
export class WinDisplay {
  private scene: Phaser.Scene
  private container?: Phaser.GameObjects.Container
  private hologramOverlay?: Phaser.GameObjects.Image
  private scanlineOverlay?: Phaser.GameObjects.Image
  private winText?: Phaser.GameObjects.Text
  private particles?: Phaser.GameObjects.Particles.ParticleEmitter

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  /**
   * Create the win display elements (call once in scene create())
   */
  create(x: number, y: number) {
    // Create container for all elements
    this.container = this.scene.add.container(x, y).setDepth(1000).setAlpha(0).setVisible(false)

    // Add hologram overlay background
    this.hologramOverlay = this.scene.add.image(0, 0, 'hologram_overlay')
      .setOrigin(0.5)
      .setScale(0.5)
      .setAlpha(0.8)
      .setBlendMode(Phaser.BlendModes.ADD)

    // Add animated scanline effect
    this.scanlineOverlay = this.scene.add.image(0, 0, 'scanline')
      .setOrigin(0.5)
      .setScale(0.5)
      .setAlpha(0.3)
      .setBlendMode(Phaser.BlendModes.ADD)

    // Add win amount text
    this.winText = this.scene.add.text(0, 0, '', {
      fontSize: '72px',
      color: '#00ffff',
      fontStyle: 'bold',
      stroke: '#003344',
      strokeThickness: 6
    }).setOrigin(0.5)

    // Add to container
    this.container.add([this.hologramOverlay, this.scanlineOverlay, this.winText])

    // Setup particle emitter for star particles
    if (this.scene.textures.exists('particle_star')) {
      const emitter = this.scene.add.particles(0, 0, 'particle_star', {
        speed: { min: 50, max: 150 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.4, end: 0 },
        alpha: { start: 1, end: 0 },
        lifespan: 1000,
        frequency: 50,
        quantity: 2,
        blendMode: Phaser.BlendModes.ADD
      })
      emitter.stop()
      this.particles = emitter
      this.container.add(emitter)
    }

    return this
  }

  /**
   * Show the win display with animation
   */
  showWin(amount: number) {
    if (!this.container || !this.winText) return

    // Format win amount
    this.winText.setText(`£${amount.toFixed(2)}`)

    // Make visible
    this.container.setVisible(true)

    // Play ping sound if available (check if audio exists in cache)
    if (this.scene.cache.audio.exists('ping')) {
      this.scene.sound.play('ping', { volume: 0.5 })
    }

    // Animate container fade in and scale
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      scale: 1.1,
      duration: 400,
      ease: 'Back.easeOut'
    })

    // Animate scanline movement
    if (this.scanlineOverlay) {
      this.scene.tweens.add({
        targets: this.scanlineOverlay,
        y: -100,
        duration: 1000,
        yoyo: true,
        repeat: 2,
        ease: 'Linear'
      })
    }

    // Start particle effects
    if (this.particles) {
      this.particles.start()
      this.scene.time.delayedCall(2000, () => {
        this.particles?.stop()
      })
    }

    // Auto-hide after 3 seconds
    this.scene.time.delayedCall(3000, () => {
      this.hide()
    })
  }

  /**
   * Hide the win display
   */
  hide() {
    if (!this.container) return

    this.scene.tweens.add({
      targets: this.container,
      alpha: 0,
      scale: 0.8,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        this.container?.setVisible(false)
        if (this.particles) {
          this.particles.stop()
        }
      }
    })
  }

  /**
   * Destroy the win display
   */
  destroy() {
    if (this.particles) {
      this.particles.destroy()
    }
    if (this.container) {
      this.container.destroy()
    }
  }
}
