import { MainScene } from './core/scenes/MainScrene';
import './styles/global.css';
import Phaser from 'phaser';

const physics: Phaser.Types.Core.PhysicsConfig = {
  default: 'arcade',
  arcade: {
    gravity: { y: 300, x: 0 },
    debug: false,
  },
}
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  scene: new MainScene(),
  pixelArt: true,
  physics: physics
};

function init() {
  new Phaser.Game(config);
}

init();
