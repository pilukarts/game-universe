import Phaser from 'phaser'
import WinDisplay from '../ui/WinDisplay'

/**
 * WinDemoScene - Interactive demo scene to test the WinDisplay component
 * Allows developers and QA to trigger and test win animations
 */
export default class WinDemoScene extends Phaser.Scene {
  private winDisplay?: WinDisplay
  private instructionText?: Phaser.GameObjects.Text
  private testAmounts = [10.0, 50.0, 100.0, 250.0, 500.0, 1000.0]
  private currentAmountIndex = 0

  constructor() {
    super({ key: 'WinDemoScene' })
  }

  create() {
    // Background
    this.cameras.main.setBackgroundColor(0x0a1622)
    
    // Title
    this.add.text(512, 50, 'WinDisplay Demo Scene', {
      fontSize: '32px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Instructions
    this.instructionText = this.add.text(512, 150, this.getInstructionText(), {
      fontSize: '18px',
      color: '#cccccc',
      align: 'center',
      wordWrap: { width: 800 }
    }).setOrigin(0.5)

    // Create WinDisplay instance
    this.winDisplay = new WinDisplay(this)

    // Create test buttons
    this.createTestButtons()

    // Back button to GameScene
    this.createBackButton()

    // Keyboard shortcuts
    this.input.keyboard?.on('keydown-SPACE', () => {
      this.showCurrentWinAmount()
    })

    this.input.keyboard?.on('keydown-UP', () => {
      this.cycleWinAmount(1)
    })

    this.input.keyboard?.on('keydown-DOWN', () => {
      this.cycleWinAmount(-1)
    })

    this.input.keyboard?.on('keydown-H', () => {
      this.winDisplay?.hide()
    })
  }

  private getInstructionText(): string {
    const amount = this.testAmounts[this.currentAmountIndex]
    return `Test the holographic WinDisplay component
    
Current test amount: £${amount.toFixed(2)}

Controls:
- SPACE: Show win with current amount
- UP/DOWN: Cycle through test amounts
- H: Hide win display
- Click buttons below to test different amounts

Note: Assets are placeholders. Replace with final assets before production.`
  }

  private createTestButtons() {
    const buttonY = 400
    const spacing = 120
    const startX = 512 - (this.testAmounts.length - 1) * spacing / 2

    this.testAmounts.forEach((amount, index) => {
      const x = startX + index * spacing
      this.createButton(x, buttonY, `£${amount}`, () => {
        this.currentAmountIndex = index
        this.showCurrentWinAmount()
        this.updateInstructionText()
      })
    })

    // Mode toggle buttons
    this.add.text(512, 500, 'Display Modes:', {
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    this.createButton(400, 550, 'Until Next Spin', () => {
      this.winDisplay?.showWin(this.testAmounts[this.currentAmountIndex], {
        mode: 'untilNextSpin',
        currency: 'GBP',
        locale: 'en-GB'
      })
    })

    this.createButton(624, 550, 'Timed (3s)', () => {
      this.winDisplay?.showWin(this.testAmounts[this.currentAmountIndex], {
        mode: 'timed',
        duration: 3000,
        currency: 'GBP',
        locale: 'en-GB'
      })
    })
  }

  private createButton(x: number, y: number, text: string, callback: () => void) {
    const container = this.add.container(x, y)
    
    const bg = this.add.rectangle(0, 0, text.length * 10 + 20, 40, 0x2ca6f8)
    bg.setInteractive({ cursor: 'pointer' })
    
    const label = this.add.text(0, 0, text, {
      fontSize: '16px',
      color: '#ffffff'
    }).setOrigin(0.5)

    container.add([bg, label])

    bg.on('pointerover', () => {
      bg.setFillStyle(0x3cb6ff)
    })

    bg.on('pointerout', () => {
      bg.setFillStyle(0x2ca6f8)
    })

    bg.on('pointerdown', () => {
      bg.setScale(0.95)
      callback()
      this.time.delayedCall(100, () => {
        bg.setScale(1)
      })
    })
  }

  private createBackButton() {
    const backButton = this.add.text(50, 700, '← Back to Game', {
      fontSize: '18px',
      color: '#2ca6f8',
      fontStyle: 'bold'
    })
    backButton.setInteractive({ cursor: 'pointer' })
    
    backButton.on('pointerover', () => {
      backButton.setColor('#3cb6ff')
    })
    
    backButton.on('pointerout', () => {
      backButton.setColor('#2ca6f8')
    })
    
    backButton.on('pointerdown', () => {
      this.scene.start('GameScene')
    })
  }

  private showCurrentWinAmount() {
    const amount = this.testAmounts[this.currentAmountIndex]
    this.winDisplay?.showWin(amount, {
      mode: 'untilNextSpin',
      currency: 'GBP',
      locale: 'en-GB'
    })
  }

  private cycleWinAmount(direction: number) {
    this.currentAmountIndex = (this.currentAmountIndex + direction + this.testAmounts.length) % this.testAmounts.length
    this.updateInstructionText()
  }

  private updateInstructionText() {
    if (this.instructionText) {
      this.instructionText.setText(this.getInstructionText())
    }
  }
}
