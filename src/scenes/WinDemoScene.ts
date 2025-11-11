import Phaser from 'phaser'
import WinDisplay from '../ui/WinDisplay'

/**
 * WinDemoScene - Interactive demo for testing the WinDisplay component
 * This scene allows developers and QA to test win display with different amounts
 */
export default class WinDemoScene extends Phaser.Scene {
  private winDisplay?: WinDisplay
  private instructionText?: Phaser.GameObjects.Text
  private testAmounts = [10.50, 50.00, 100.00, 250.00, 500.00, 1000.00]
  private currentAmountIndex = 0

  constructor() {
    super({ key: 'WinDemoScene' })
  }

  create() {
    // Set dark background
    this.cameras.main.setBackgroundColor(0x0e2230)

    // Add title
    this.add.text(this.cameras.main.centerX, 50, 'WinDisplay Demo Scene', {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // Instructions
    this.instructionText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 200,
      'Click "SHOW WIN" to test the holographic WinDisplay\nUse arrow keys to change win amount',
      {
        fontSize: '18px',
        fontFamily: 'Arial',
        color: '#ffffff',
        align: 'center'
      }
    ).setOrigin(0.5)

    // Initialize WinDisplay component
    this.winDisplay = new WinDisplay(this)

    // Create test buttons
    this.createTestButtons()

    // Add keyboard controls
    this.addKeyboardControls()

    // Add back button to return to GameScene
    this.createBackButton()
  }

  private createTestButtons() {
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    // Show Win button
    const showButton = this.createButton(
      centerX - 120,
      centerY,
      'SHOW WIN',
      0x2ca6f8,
      () => this.showTestWin()
    )

    // Hide Win button
    const hideButton = this.createButton(
      centerX + 120,
      centerY,
      'HIDE WIN',
      0xd94b3b,
      () => this.hideWin()
    )

    // Amount display
    this.add.text(centerX, centerY - 80, 'Test Amount:', {
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5)

    const amountText = this.add.text(
      centerX,
      centerY - 50,
      `£${this.testAmounts[this.currentAmountIndex].toFixed(2)}`,
      {
        fontSize: '28px',
        color: '#ffd166',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5)

    // Arrow buttons for changing amount
    this.createButton(centerX - 100, centerY - 50, '◄', 0x7b5fd1, () => {
      this.currentAmountIndex = (this.currentAmountIndex - 1 + this.testAmounts.length) % this.testAmounts.length
      amountText.setText(`£${this.testAmounts[this.currentAmountIndex].toFixed(2)}`)
    }, 40, 40)

    this.createButton(centerX + 100, centerY - 50, '►', 0x7b5fd1, () => {
      this.currentAmountIndex = (this.currentAmountIndex + 1) % this.testAmounts.length
      amountText.setText(`£${this.testAmounts[this.currentAmountIndex].toFixed(2)}`)
    }, 40, 40)
  }

  private createButton(
    x: number,
    y: number,
    text: string,
    color: number,
    callback: () => void,
    width = 100,
    height = 50
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y)
    
    const bg = this.add.rectangle(0, 0, width, height, color)
      .setInteractive({ cursor: 'pointer' })
    
    const label = this.add.text(0, 0, text, {
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    container.add([bg, label])

    // Button interactions
    bg.on('pointerover', () => {
      bg.setFillStyle(color, 0.8)
      this.tweens.add({
        targets: container,
        scale: 1.05,
        duration: 100
      })
    })

    bg.on('pointerout', () => {
      bg.setFillStyle(color, 1)
      this.tweens.add({
        targets: container,
        scale: 1,
        duration: 100
      })
    })

    bg.on('pointerdown', () => {
      this.tweens.add({
        targets: container,
        scale: 0.95,
        duration: 50,
        yoyo: true,
        onComplete: callback
      })
    })

    return container
  }

  private showTestWin() {
    const amount = this.testAmounts[this.currentAmountIndex]
    this.winDisplay?.showWin(amount, {
      mode: 'untilNextSpin',
      currency: 'GBP',
      locale: 'en-GB'
    })
  }

  private hideWin() {
    this.winDisplay?.hide()
  }

  private addKeyboardControls() {
    // Left/Right arrows to change amount
    this.input.keyboard?.on('keydown-LEFT', () => {
      this.currentAmountIndex = (this.currentAmountIndex - 1 + this.testAmounts.length) % this.testAmounts.length
    })

    this.input.keyboard?.on('keydown-RIGHT', () => {
      this.currentAmountIndex = (this.currentAmountIndex + 1) % this.testAmounts.length
    })

    // Space to show win
    this.input.keyboard?.on('keydown-SPACE', () => {
      this.showTestWin()
    })

    // H to hide win
    this.input.keyboard?.on('keydown-H', () => {
      this.hideWin()
    })
  }

  private createBackButton() {
    const backBtn = this.createButton(
      100,
      50,
      '← Back to Game',
      0x666666,
      () => {
        this.winDisplay?.destroy()
        this.scene.start('GameScene')
      },
      150,
      40
    )
  }

  destroy() {
    this.winDisplay?.destroy()
    super.destroy()
  }
}
