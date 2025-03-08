import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
    }

    create() {
        this.add.image(400, 300, 'sky');
    }

    update() {
    }
}