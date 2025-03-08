import { BaseScene } from './BaseScene';

export class MainScene extends BaseScene {
    platforms!: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.spritesheet("platforms", "assets/sprites/platforms.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
    }

    create() {
        this.debugGrid()

        this.add.image(100, 100, "platforms", 0).setScale(4);
        this.add.image(164, 100, "platforms", 1).setScale(4);
        this.add.image(228, 100, "platforms", 2).setScale(4);

        this.add.image(100, 164, "platforms", 4).setScale(4);
        this.add.image(164, 164, "platforms", 5).setScale(4);
        this.add.image(228, 164, "platforms", 6).setScale(4);

        this.add.image(100, 228, "platforms", 8).setScale(4);
        this.add.image(164, 228, "platforms", 9).setScale(4);
        this.add.image(228, 228, "platforms", 10).setScale(4);

        this.add.image(100, 292, "platforms", 12).setScale(4);
        this.add.image(164, 292, "platforms", 13).setScale(4);
        this.add.image(228, 292, "platforms", 14).setScale(4);
    }


    update() {
    }
}