import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PreloadScene from './scenes/PreloadScene'
import GameScene from './scenes/GameScene'
import WinDemoScene from './scenes/WinDemoScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  scene: [BootScene, PreloadScene, GameScene, WinDemoScene],
  backgroundColor: '#0a1622'
}

new Phaser.Game(config)
