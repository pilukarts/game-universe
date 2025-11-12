import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Simple loader text (use this.add.text, not graphics text helpers)
    const loadingText = this.add.text(54, 84, 'Loading...', {
      fontSize: '36px',
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: '#FFFFFF',
    });
    loadingText.setDepth(10);

    // Progress bar background
    const barX = 40;
    const barY = 140;
    const barWidth = 480;
    const barHeight = 18;

    const bg = this.add.graphics();
    bg.fillStyle(0x2b2b2b, 1);
    bg.fillRect(barX, barY, barWidth, barHeight);

    const progressBar = this.add.graphics();
    progressBar.setDepth(5);

    // Hook loader progress events
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x4fc3f7, 1);
      progressBar.fillRect(barX, barY, barWidth * value, barHeight);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      bg.destroy();
      loadingText.destroy();
    });

    // Preload assets (adjust paths to your assets folder)
    this.load.image('hologram_overlay', 'assets/ui/hologram_overlay_2048.png');
    this.load.image('scanline', 'assets/ui/scanline.png');
    this.load.image('particle_star', 'assets/particles/particle_star_512.png');

    this.load.image('tile_U_1024', 'assets/icons/tile_U_1024.png');
    this.load.image('tile_U_512', 'assets/icons/tile_U_512.png');
    this.load.image('tile_X_2048', 'assets/icons/tile_X_2048.png');
    this.load.image('tile_X_1024', 'assets/icons/tile_X_1024.png');

    // Audio: load both mp3 and ogg as fallback
    this.load.audio('ping', ['assets/sfx/ping.mp3', 'assets/sfx/ping.ogg']);
    this.load.audio('ambient_loop', ['assets/sfx/ambient_loop.mp3', 'assets/sfx/ambient_loop.ogg']);

    // Other optional assets used elsewhere
    this.load.image('holo_scan', 'assets/ui/holo_scan.png');
  }

  create() {
    // Start the main GameScene after preload finishes
    this.scene.start('GameScene');
  }
}

export default PreloadScene;
