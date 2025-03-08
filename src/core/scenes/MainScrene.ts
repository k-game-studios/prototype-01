import Phaser from 'phaser';

import { Platforms } from '../systems/Platforms';
import { BaseScene } from './BaseScene';

export class MainScene extends BaseScene {
    platforms = {
        name: "platforms",
        path: "assets/sprites/platforms.png"
    }
    player!: Phaser.Physics.Arcade.Sprite;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

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
        const platforms = new Platforms({
            scene: this,
            config: { name: this.platforms.name, scale: 4 }
        });

        platforms.create({ spriteNumber: 0, positionX: 32, positionY: 596 });
        platforms.create({ spriteNumber: 1, positionX: 96, positionY: 596 });
        platforms.create({ spriteNumber: 2, positionX: 160, positionY: 596 });

        this.player = this.physics.add.sprite(100, 450, 'player').setScale(4);
        this.physics.add.collider(this.player, platforms.Platforms);

        if (this.input && this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        this.debug({
            gameObjects: [...platforms.Platforms.getChildren()]
        });
    }

    update() {
        if (this.cursors && this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors && this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors && this.cursors.space.isDown && this.player && this.player.body && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }

        this.debugUpdatedGameObject({ gameObject: this.player });
    }
}
