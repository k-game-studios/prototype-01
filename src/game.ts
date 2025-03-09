import { PlaygroundScrene } from './core/scenes/PlaygroundScrene';
import './styles/global.css';
import Phaser from 'phaser';

const physics: Phaser.Types.Core.PhysicsConfig = {
  default: 'arcade',
  arcade: {
    gravity: { y: 4000, x: 0 },
    debug: true,
  },
}
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'app',
  scene: new PlaygroundScrene(),
  pixelArt: true,
  physics: physics,
  fps: {
    target: 60,
    forceSetTimeOut: true
  },
  render: {
    antialias: false, 
    preserveDrawingBuffer: true,
    pixelArt: true,
    clearBeforeRender: true,
  },
};

function init() {
  new Phaser.Game(config);
}

init();
