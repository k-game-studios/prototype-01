import Phaser from 'phaser';

interface ConstructorProps {
    scene: Phaser.Scene,
    name: string;
    path: string;
    frameSize: number,
    scale: number;
}

export class Player {
    private scene: Phaser.Scene;
    private entity!: Phaser.Physics.Arcade.Sprite;
    private config: ConstructorProps;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

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

    create(startX: number, startY: number) {
        this.entity = this.scene.physics.add
            .sprite(startX, startY, this.config.name)
            .setScale(this.config.scale)
            .setCollideWorldBounds(true);

        if (this.scene.input && this.scene.input.keyboard) {
            this.cursors = this.scene.input.keyboard.createCursorKeys();
        }
    }

    update() {
        if (!this.cursors) return;

        if (this.cursors.left.isDown) {
            this.entity.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.entity.setVelocityX(160);
        } else {
            this.entity.setVelocityX(0);
        }

        if (this.cursors.space.isDown && this.entity.body && this.entity.body.touching.down) {
            this.entity.setVelocityY(-330);
        }
    }

    get Entity() {
        return this.entity;
    }

    set Entity(entity: Phaser.Physics.Arcade.Sprite) {
        this.entity = entity;
    }
}
