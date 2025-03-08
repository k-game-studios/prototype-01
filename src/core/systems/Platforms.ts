import Phaser from 'phaser';

interface AssetsProps {
    name: string;
    path: string;
    frameWidth: number;
    frameHeight: number;
    scale: number;
};

interface PreloadProps {
    scene: Phaser.Scene;
    assets: AssetsProps;
}

interface CreatePlataformProps {
    spriteNumber: number;
    positionX: number;
    positionY: number;
}
interface Config {
    name: string,
    scale: number;
}

interface PlataformProps {
    scene: Phaser.Scene,
    config: Config
}

export class Platforms {
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private config: Config;

    static preload({ scene, assets }: PreloadProps) {
        scene.load.spritesheet(assets.name, assets.path, {
            frameWidth: assets.frameWidth,
            frameHeight: assets.frameHeight
        });
    }

    constructor({ scene, config }: PlataformProps) {
        this.platforms = scene.physics.add.staticGroup();
        this.config = config;
    }

    create(assets: CreatePlataformProps) {
        this.platforms.create(
            assets.positionX,
            assets.positionY,
            this.config.name,
            assets.spriteNumber
        ).setScale(this.config.scale).refreshBody();

    }

    get Platforms() {
        return this.platforms;
    }
}
