import { MainScene } from './scenes/MainScrene';
import './styles/global.css';
import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  scene: MainScene
};

function init() {
  new Phaser.Game(config);
}

init();
