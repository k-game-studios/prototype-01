import Phaser from 'phaser';


interface CreatePlataformProps {
    spriteNumber: number;
    positionX: number;
    positionY: number;
}
interface Config {
    name: string,
    path: string,
    frameSize: number,
    scale: number;
}

interface PlataformProps {
    scene: Phaser.Scene,
    config: Config
}

export class Platforms {
    private scene: Phaser.Scene
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private config: Config;

    constructor({ scene, config }: PlataformProps) {
        this.scene = scene;
        this.platforms = this.scene.physics.add.staticGroup();
        this.config = config;

        this.preload();
    }

    preload() {
        this.scene.load.spritesheet(this.config.name, this.config.path, {
            frameWidth: this.config.frameSize,
            frameHeight: this.config.frameSize,
        });
    }

    create(sprite: CreatePlataformProps) {
        this.platforms.create(
            sprite.positionX,
            sprite.positionY,
            this.config.name,
            sprite.spriteNumber
        ).setScale(this.config.scale).refreshBody();

    }

    get Platforms() {
        return this.platforms;
    }
}
