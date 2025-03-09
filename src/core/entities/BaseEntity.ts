import Phaser from 'phaser';

interface ConstructorProps {
    name: string;
    path: string;
    frameSize: number;
    scale: number;
    scene: Phaser.Scene;
}

abstract class BaseEntity {
    protected scene: Phaser.Scene;
    protected entity!: Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite;
    protected config: ConstructorProps;

    constructor(config: ConstructorProps) {
        this.scene = config.scene;
        this.config = config;
    }

    preload() {
        this.scene.load.spritesheet(this.config.name, this.config.path, {
            frameWidth: this.config.frameSize,
            frameHeight: this.config.frameSize,
        });
    }

    abstract create(...args: any[]): void;

    protected createEntity(startX: number, startY: number) {
        this.entity = this.scene.physics.add.sprite(startX, startY, this.config.name)
            .setScale(this.config.scale)
            .setCollideWorldBounds(true)
            // .setSize(10, 16)
            // .setOffset(10, 10);
    }

    get Entity() {
        return this.entity;
    }
}

export { BaseEntity };
