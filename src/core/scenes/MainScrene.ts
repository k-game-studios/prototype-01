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
        this.platforms.create({ spriteNumber: 0, positionX: 32, positionY: 596 });
        this.platforms.create({ spriteNumber: 1, positionX: 96, positionY: 596 });
        this.platforms.create({ spriteNumber: 2, positionX: 160, positionY: 596 });


        this.player.create(100, 450);
        this.physics.add.collider(this.player.Entity, this.platforms.Entity);

        this.debug({
            gameObjects: [...this.platforms.Entity.getChildren()]
        });
    }

    update() {
        this.player.update();
        this.debugUpdated({ gameObject: this.player.Entity });
    }
}
