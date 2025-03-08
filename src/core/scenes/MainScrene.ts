import Phaser from 'phaser';

import { Platforms } from '../systems/Platforms';
import { BaseScene } from './BaseScene';
import { Player } from '../entities/Player';

const PLATFORM_CONFIG = {
    name: "platforms",
    path: "assets/sprites/platforms.png"
}

const PLAYER_CONFIG = {
    name: "player",
    path: "assets/sprites/knight.png",
}

export class MainScene extends BaseScene {
    private platforms!: Platforms;
    private player!: Player;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('MainScene');
    }

    preload() {
        this.platforms = new Platforms({
            scene: this,
            name: PLATFORM_CONFIG.name,
            path: PLATFORM_CONFIG.path,
            frameSize: 16,
            scale: 4
        });

        this.player = new Player({
            scene: this,
            name: PLAYER_CONFIG.name,
            path: PLAYER_CONFIG.path,
            frameSize: 32,
            scale: 4
        });

        this.platforms.preload();
        this.player.preload();
    }

    create() {
        Array(4).fill(0).map((_, i) => {
            const posX = 32 + (i * 128) - 4;
            const posY = 596;

            this.platforms.create({ spriteNumber: 1, positionX: posX, positionY: posY });
            this.platforms.create({ spriteNumber: 2, positionX: posX + 64, positionY: posY });
        });


        Array(2).fill(0).map((_, i) => {
            const posX = 596 + 48 + (i * 128) - 4;
            const posY = 596;

            this.platforms.create({ spriteNumber: 1, positionX: posX, positionY: posY });
            this.platforms.create({ spriteNumber: 2, positionX: posX + 64, positionY: posY });
        });

        
        // Array(4).fill(0).map((_, i) => {
        //     const posX = 756 + (i * 128) - 4;
        //     const posY = 532;

        //     this.platforms.create({ spriteNumber: 1, positionX: posX, positionY: posY });
        //     this.platforms.create({ spriteNumber: 2, positionX: posX + 64, positionY: posY });
        // });
        

        this.player.create(320, 448);
        this.physics.add.collider(
            this.player.Entity,
            this.platforms.Entity.getChildren()
        );

        // this.physics.world.createDebugGraphic();
    }

    update() {
        this.player.update();

        const playerBounds = this.player.Entity.getBounds();
        const worldBounds = this.physics.world.bounds;

        if (playerBounds.bottom > worldBounds.bottom) {
            this.player.Entity.setPosition(320, 448);
        }
    }
}
