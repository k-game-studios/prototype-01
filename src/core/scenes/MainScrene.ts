import { Platforms } from '../systems/Platforms';
import { BaseScene } from './BaseScene';

export class MainScene extends BaseScene {
    platforms = {
        name: "platforms",
        path: "assets/sprites/platforms.png"
    }
    player!: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super('MainScene');
    }

    preload() {
        Platforms.preload({
            scene: this,
            assets: {
                name: this.platforms.name,
                path: this.platforms.path,
                frameWidth: 16,
                frameHeight: 16,
                scale: 4
            }

        });

        this.load.spritesheet("player", "assets/sprites/knight.png", {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        this.debug();

        const platform = new Platforms({
            scene: this,
            config: { name: this.platforms.name, scale: 4 }
        });

        platform.create({ spriteNumber: 0, positionX: 32, positionY: 596 });
        platform.create({ spriteNumber: 1, positionX: 96, positionY: 596 });
        platform.create({ spriteNumber: 2, positionX: 128, positionY: 596 });

        this.player = this.physics.add.sprite(100, 450, 'player').setScale(4);
        this.physics.add.collider(this.player, platform.Platforms);
    }

    update() {
    }
}
