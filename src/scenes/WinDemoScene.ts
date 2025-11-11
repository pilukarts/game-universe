import Phaser from 'phaser'
import { WinDisplay } from '../ui/WinDisplay'

/**
 * WinDemoScene - Demo scene to test the WinDisplay hologram component
 * Press SPACE to trigger a win animation
 */
export default class WinDemoScene extends Phaser.Scene {
  private winDisplay?: WinDisplay
  private instructionText?: Phaser.GameObjects.Text
  private winAmount = 10.50

  constructor() {
    super({ key: 'WinDemoScene' })
  }

  preload() {
    // Load hologram assets
    if (!this.textures.exists('hologram_overlay')) {
      this.load.image('hologram_overlay', 'assets/ui/hologram_overlay_2048.webp')
    }
    if (!this.textures.exists('scanline')) {
      this.load.image('scanline', 'assets/ui/scanline.svg')
    }
    if (!this.textures.exists('particle_star')) {
      this.load.image('particle_star', 'assets/particles/particle_star_512.webp')
    }
    
    // Note: Audio placeholders are .txt files, so we skip loading them for now
    // When real audio files are added (mp3/ogg), uncomment this:
    // this.load.audio('ping', ['assets/sfx/ping.mp3', 'assets/sfx/ping.ogg'])
  }

  create() {
    // Set background
    this.cameras.main.setBackgroundColor(0x1a1a2e)

    // Add title
    this.add.text(512, 100, 'WinDisplay Demo', {
      fontSize: '48px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Add instructions
    this.instructionText = this.add.text(512, 200, 
      'Press SPACE to trigger win animation\nPress 1-5 to test different amounts\nPress ESC to return to game',
      {
        fontSize: '24px',
        color: '#cccccc',
        align: 'center'
      }
    ).setOrigin(0.5)

    // Create WinDisplay instance
    this.winDisplay = new WinDisplay(this)
    this.winDisplay.create(512, 400)

    // Setup keyboard controls
    this.input.keyboard?.on('keydown-SPACE', () => {
      this.triggerWin(this.winAmount)
      // Increment for next test
      this.winAmount += 5.25
    })

    this.input.keyboard?.on('keydown-ONE', () => {
      this.triggerWin(5.00)
    })

    this.input.keyboard?.on('keydown-TWO', () => {
      this.triggerWin(25.00)
    })

    this.input.keyboard?.on('keydown-THREE', () => {
      this.triggerWin(50.00)
    })

    this.input.keyboard?.on('keydown-FOUR', () => {
      this.triggerWin(100.00)
    })

    this.input.keyboard?.on('keydown-FIVE', () => {
      this.triggerWin(250.00)
    })

    this.input.keyboard?.on('keydown-ESC', () => {
      this.scene.start('GameScene')
    })

    // Show initial demo
    this.time.delayedCall(500, () => {
      this.triggerWin(12.50)
    })
  }

  private triggerWin(amount: number) {
    if (this.winDisplay) {
      this.winDisplay.showWin(amount)
    }
  }
}
