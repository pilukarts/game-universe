import Phaser from 'phaser'

/**
 * WinDisplay - Holographic win display UI component
 * Shows win amounts with holographic effects, particles, and audio feedback
 */

interface WinDisplayOptions {
  mode?: 'untilNextSpin' | 'timed'
  duration?: number
  currency?: string
  locale?: string
}

export default class WinDisplay {
  private scene: Phaser.Scene
  private container?: Phaser.GameObjects.Container
  private hologramOverlay?: Phaser.GameObjects.Image
  private scanlineEffect?: Phaser.GameObjects.TileSprite
  private winText?: Phaser.GameObjects.Text
  private particles?: Phaser.GameObjects.Particles.ParticleEmitter
  private pingSound?: Phaser.Sound.BaseSound
  private isVisible = false

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.createDisplay()
  }

  private createDisplay() {
    const centerX = this.scene.cameras.main.width / 2
    const centerY = this.scene.cameras.main.height / 2

    // Create container for all elements
    this.container = this.scene.add.container(centerX, centerY)
    this.container.setDepth(1000)
    this.container.setAlpha(0)
    this.container.setVisible(false)

    // Add hologram overlay background (if texture exists)
    if (this.scene.textures.exists('hologram_overlay')) {
      this.hologramOverlay = this.scene.add.image(0, 0, 'hologram_overlay')
      this.hologramOverlay.setAlpha(0.7)
      this.container.add(this.hologramOverlay)
    } else {
      // Fallback: semi-transparent rectangle
      const bg = this.scene.add.rectangle(0, 0, 600, 400, 0x00ffcc, 0.3)
      this.container.add(bg)
    }

    // Add scanline effect (if texture exists)
    if (this.scene.textures.exists('scanline')) {
      this.scanlineEffect = this.scene.add.tileSprite(0, 0, 600, 400, 'scanline')
      this.scanlineEffect.setAlpha(0.2)
      this.container.add(this.scanlineEffect)
    }

    // Win amount text
    this.winText = this.scene.add.text(0, 0, '', {
      fontSize: '72px',
      color: '#00ffcc',
      fontStyle: 'bold',
      stroke: '#003344',
      strokeThickness: 6,
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: '#00ffcc',
        blur: 20,
        fill: true
      }
    })
    this.winText.setOrigin(0.5)
    this.container.add(this.winText)

    // Particle emitter (if texture exists)
    if (this.scene.textures.exists('particle_star')) {
      const particleManager = this.scene.add.particles(0, 0, 'particle_star', {
        speed: { min: 50, max: 150 },
        scale: { start: 0.5, end: 0 },
        alpha: { start: 1, end: 0 },
        lifespan: 2000,
        blendMode: 'ADD',
        frequency: 100,
        emitting: false
      })
      this.container.add(particleManager)
      this.particles = particleManager as unknown as Phaser.GameObjects.Particles.ParticleEmitter
    }

    // Load ping sound if available
    if (this.scene.sound.get('ping')) {
      this.pingSound = this.scene.sound.get('ping')
    }
  }

  /**
   * Show the win display with amount and options
   */
  showWin(amount: number, options: WinDisplayOptions = {}) {
    if (this.isVisible) return

    const { mode = 'untilNextSpin', duration = 3000, currency = 'GBP', locale = 'en-GB' } = options

    this.isVisible = true

    // Format win amount based on currency and locale
    const formattedAmount = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount)

    if (this.winText) {
      this.winText.setText(`WIN!\n${formattedAmount}`)
    }

    if (this.container) {
      this.container.setVisible(true)

      // Fade in animation
      this.scene.tweens.add({
        targets: this.container,
        alpha: 1,
        scale: { from: 0.8, to: 1 },
        duration: 500,
        ease: 'Back.easeOut'
      })

      // Pulse effect on win text
      if (this.winText) {
        this.scene.tweens.add({
          targets: this.winText,
          scale: { from: 1, to: 1.1 },
          duration: 800,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        })
      }

      // Animate scanline effect
      if (this.scanlineEffect) {
        this.scene.tweens.add({
          targets: this.scanlineEffect,
          tilePositionY: 400,
          duration: 2000,
          repeat: -1,
          ease: 'Linear'
        })
      }

      // Start particle emission
      if (this.particles) {
        this.particles.start()
      }

      // Play ping sound
      if (this.pingSound) {
        this.pingSound.play()
      }

      // Auto-hide if mode is timed
      if (mode === 'timed') {
        this.scene.time.delayedCall(duration, () => {
          this.hide()
        })
      }
    }
  }

  /**
   * Hide the win display
   */
  hide() {
    if (!this.isVisible || !this.container) return

    // Stop all tweens on container children
    this.scene.tweens.killTweensOf(this.container)
    if (this.winText) {
      this.scene.tweens.killTweensOf(this.winText)
    }
    if (this.scanlineEffect) {
      this.scene.tweens.killTweensOf(this.scanlineEffect)
    }

    // Stop particle emission
    if (this.particles) {
      this.particles.stop()
    }

    // Fade out animation
    this.scene.tweens.add({
      targets: this.container,
      alpha: 0,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        if (this.container) {
          this.container.setVisible(false)
        }
        this.isVisible = false
      }
    })
  }

  /**
   * Destroy the win display and clean up resources
   */
  destroy() {
    this.hide()
    if (this.container) {
      this.container.destroy()
    }
  }
}
