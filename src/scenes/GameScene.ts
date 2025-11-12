import Phaser from 'phaser';
import WinDisplay from '../ui/WinDisplay'; // assumes default export exists

export default class GameScene extends Phaser.Scene {
  private winDisplay: WinDisplay | null = null;
  private isSpinning = false;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    // Initialize game scene (background, reels, UI, etc).
    // Minimal non-intrusive integration of WinDisplay:
    try {
      this.winDisplay = new WinDisplay(this);
    } catch (err) {
      // If WinDisplay is not present or fails, keep null but don't crash the scene.
      // This keeps the integration non-invasive.
      // eslint-disable-next-line no-console
      console.warn('WinDisplay could not be instantiated:', err);
      this.winDisplay = null;
    }

    // Example: wire up a demo button to simulate win for QA/dev
    const demoBtn = this.add.text(16, 16, 'Demo Win', {
      fontSize: '18px',
      color: '#ffffff',
      backgroundColor: '#0a84ff',
      padding: { x: 8, y: 6 },
    }).setInteractive({ useHandCursor: true });

    demoBtn.on('pointerup', () => {
      // Simulate a spin resolved with a win amount
      this.onSpinResolved(12.5);
    });

    // Initialize other game systems here...
  }

  // Example method: called when a spin resolves in your game logic
  onSpinResolved(winAmount: number): void {
    this.isSpinning = false;

    // Show the WinDisplay safely if present
    if (this.winDisplay) {
      try {
        // showWin signature may accept options depending on implementation
        // We call with a common set of params: amount and mode
        (this.winDisplay as any).showWin(winAmount, { mode: 'untilNextSpin' });
      } catch (err) {
        // log but don't crash
        // eslint-disable-next-line no-console
        console.warn('Failed to call winDisplay.showWin:', err);
      }
    }

    // Example animation using tween timeline — use a cast to any to avoid TS typing issues
    this.playWinAnimation(); // uses timeline/cast internally
  }

  // Example: called when starting a new spin
  startNewSpin(): void {
    this.isSpinning = true;

    // Ensure WinDisplay is hidden before starting a new spin
    if (this.winDisplay) {
      try {
        (this.winDisplay as any).hide();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Failed to call winDisplay.hide:', err);
      }
    }

    // Continue with spin start logic...
  }

  // Example of using the timeline safely with a cast to any
  private playWinAnimation(): void {
    // Build your timeline/tweens options here according to your game's needs
    const timelineOptions = {
      tweens: [
        // Example tween: adapt targets to actual game objects in your scene
        // {
        //   targets: someGameObject,
        //   alpha: { from: 0, to: 1 },
        //   duration: 300,
        //   ease: 'Power1',
        // },
      ],
    };

    // Cast tween manager to any to call timeline if available in runtime
    const tweenManagerAny = this.tweens as any;

    if (tweenManagerAny && typeof tweenManagerAny.timeline === 'function') {
      tweenManagerAny.timeline(timelineOptions);
    } else if (tweenManagerAny && typeof tweenManagerAny.createTimeline === 'function') {
      tweenManagerAny.createTimeline(timelineOptions);
    } else {
      // Fallback: if timeline isn't available, add basic tweens manually,
      // or simply log that timeline api is not available.
      // eslint-disable-next-line no-console
      console.debug('Timeline API not available on this.tweens; skipping timeline animation.');
    }
  }

  // Optional cleanup on shutdown to avoid leaks
  shutdown(): void {
    // ensure winDisplay is destroyed/hidden
    if (this.winDisplay) {
      try {
        (this.winDisplay as any).hide();
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
