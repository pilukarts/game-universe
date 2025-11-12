import Phaser from 'phaser';
import WinDisplay from '../ui/WinDisplay'; // adjust path if needed

export default class GameScene extends Phaser.Scene {
  private winDisplay: WinDisplay | null = null;
  private isSpinning = false;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    // Try to instantiate WinDisplay defensively
    try {
      // If WinDisplay constructor signature differs, adapt accordingly
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.winDisplay = new (WinDisplay as any)(this);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('WinDisplay could not be instantiated:', err);
      this.winDisplay = null;
    }

    const demoBtn = this.add
      .text(16, 16, 'Demo Win', {
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#0a84ff',
        padding: { x: 8, y: 6 },
      })
      .setInteractive({ useHandCursor: true });

    demoBtn.on('pointerup', () => {
      this.onSpinResolved(12.5);
    });
  }

  onSpinResolved(winAmount: number): void {
    this.isSpinning = false;

    if (this.winDisplay) {
      try {
        // call the API defensively — some implementations may differ
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.winDisplay as any).showWin?.(winAmount, { mode: 'untilNextSpin' });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Failed to call winDisplay.showWin:', err);
      }
    }

    this.playWinAnimation();
  }

  startNewSpin(): void {
    this.isSpinning = true;

    if (this.winDisplay) {
      try {
        (this.winDisplay as any).hide?.();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Failed to call winDisplay.hide:', err);
      }
    }
  }

  // Use a safe runtime check / cast for timeline usage so TS doesn't complain
  private playWinAnimation(): void {
    // Build timeline options as plain object
    const timelineOptions = {
      tweens: [
        // put your tweens here
        // example:
        // {
        //   targets: someGameObject,
        //   alpha: { from: 0, to: 1 },
        //   duration: 300,
        //   ease: 'Power1'
        // }
      ],
    };

    // Cast to any to call timeline/createTimeline if available at runtime
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tm = this.tweens as any;

    if (tm && typeof tm.timeline === 'function') {
      tm.timeline(timelineOptions);
    } else if (tm && typeof tm.createTimeline === 'function') {
      tm.createTimeline(timelineOptions);
    } else {
      // Fallback: timeline API not available — skip or create manual tweens
      // eslint-disable-next-line no-console
      console.debug('Timeline API not available on this.tweens; skipping timeline animation.');
    }
  }

  shutdown(): void {
    if (this.winDisplay) {
      try {
        (this.winDisplay as any).hide?.();
        if (typeof (this.winDisplay as any).destroy === 'function') {
          (this.winDisplay as any).destroy();
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Error while shutting down WinDisplay:', err);
      }
      this.winDisplay = null;
    }
  }
}
