import Phaser from 'phaser';
import WinDisplay from '../ui/WinDisplay'; // ajusta si la ruta es distinta

export default class GameScene extends Phaser.Scene {
  private winDisplay: any = null;
  private isSpinning = false;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    try {
      // instanciar WinDisplay de forma defensiva (si existe)
      this.winDisplay = new (WinDisplay as any)(this);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('WinDisplay not available or failed to init:', err);
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
        console.warn('Failed to hide winDisplay:', err);
      }
    }
  }

  private playWinAnimation(): void {
    const timelineOptions = {
      tweens: [
        // Rellena con tweens reales si los necesitas
      ],
    };

    // cast a any y comprobación en tiempo de ejecución: evita el error TS2339
    const tm = this.tweens as any;

    if (tm && typeof tm.timeline === 'function') {
      tm.timeline(timelineOptions);
    } else if (tm && typeof tm.createTimeline === 'function') {
      tm.createTimeline(timelineOptions);
    } else {
      // fallback: si no existe timeline, no hacemos nada o creamos tweens sueltos
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
