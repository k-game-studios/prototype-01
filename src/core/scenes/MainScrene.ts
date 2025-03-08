import Phaser from 'phaser';

import { Platforms } from '../systems/Platforms';
import { BaseScene } from './BaseScene';

const PLATFORM_CONFIG = {
    name: "platforms",
    path: "assets/sprites/platforms.png"
}

export class MainScene extends BaseScene {
    platforms!: Platforms;
    player!: Phaser.Physics.Arcade.Sprite;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('MainScene');
    }

    preload() {
        this.platforms = new Platforms({
            scene: this, config: {
                name: PLATFORM_CONFIG.name,
                path: PLATFORM_CONFIG.path,
                frameSize: 16,
                scale: 4
            }
        });

        this.load.spritesheet("player", "assets/sprites/knight.png", {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        this.platforms.create({ spriteNumber: 0, positionX: 32, positionY: 596 });
        this.platforms.create({ spriteNumber: 1, positionX: 96, positionY: 596 });
        this.platforms.create({ spriteNumber: 2, positionX: 160, positionY: 596 });

        this.player = this.physics.add.sprite(100, 450, 'player').setScale(4);
        this.physics.add.collider(this.player, this.platforms.Platforms);

        if (this.input && this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }

        this.debug({
            gameObjects: [...this.platforms.Platforms.getChildren()]
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

        this.debugUpdated({ gameObject: this.player });
    }
}
