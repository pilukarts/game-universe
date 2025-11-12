import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Loading text (use add.text because Graphics doesn't have text helpers)
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

    // --- assets (ajusta rutas según tu proyecto) ---
    this.load.image('hologram_overlay', 'assets/ui/hologram_overlay_2048.png');
    this.load.image('scanline', 'assets/ui/scanline.png');
    this.load.image('particle_star', 'assets/particles/particle_star_512.png');

    this.load.image('tile_U_1024', 'assets/icons/tile_U_1024.png');
    this.load.image('tile_U_512', 'assets/icons/tile_U_512.png');
    this.load.image('tile_X_2048', 'assets/icons/tile_X_2048.png');
    this.load.image('tile_X_1024', 'assets/icons/tile_X_1024.png');

    this.load.audio('ping', ['assets/sfx/ping.mp3', 'assets/sfx/ping.ogg']);
    this.load.audio('ambient_loop', ['assets/sfx/ambient_loop.mp3', 'assets/sfx/ambient_loop.ogg']);

    // otros recursos opcionales
    this.load.image('holo_scan', 'assets/ui/holo_scan.png');
  }

  create() {
    this.scene.start('GameScene');
  }
}

export default PreloadScene;
