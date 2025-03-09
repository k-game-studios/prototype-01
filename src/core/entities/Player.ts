import Phaser from 'phaser';
import { PlayerInputManager } from '../systems/PlayerInputManager';
import { PlayerAnimationManager } from '../systems/PlayerAnimationManager';
import { CameraManager } from '../systems/CameraManager';

interface CreateProps {
    positionX: number;
    positionY: number;
}

interface ConstructorProps {
    scene: Phaser.Scene;
    name: string;
    path: string;
    frameSize: number;
    scale: number;
}

class Player {
    private scene: Phaser.Scene;
    private entity!: Phaser.Physics.Arcade.Sprite;
    private config: ConstructorProps;
    private inputHandler!: PlayerInputManager;
    private animationManager!: PlayerAnimationManager;
    private cameraManager!: CameraManager;

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

    create(props: CreateProps) {
        this.createEntity(props.positionX, props.positionY);
        this.inputHandler = new PlayerInputManager(this.scene);
        this.animationManager = new PlayerAnimationManager(this.scene, this.config.name);
        this.cameraManager = new CameraManager(this.scene, this.entity);
        this.animationManager.setupAnimations();
        this.cameraManager.setupCamera();
    }

    update() {
        if (!this.inputHandler.cursors) return;

        const isJumping = !this.isOnGround();
        this.inputHandler.handleMovement(isJumping, this.entity);
        this.inputHandler.handleJump(isJumping, this.entity);
        this.checkBounds();
    }

    private createEntity(startX: number, startY: number) {
        this.entity = this.scene.physics.add.sprite(startX, startY, this.config.name)
            .setScale(this.config.scale)
            .setCollideWorldBounds(true)
            .setSize(10, 16)
            .setOffset(10, 10);
    }

    private isOnGround(): boolean {
        return !!(this.entity.body?.blocked.down || this.entity.body?.touching.down);
    }

    private checkBounds() {
        const playerBounds = this.entity.getBounds();
        const worldBounds = this.scene.physics.world.bounds;

        if (playerBounds.bottom > worldBounds.bottom) {
            this.entity.setPosition(320, 448);
        }
    }

    get Entity() {
        return this.entity;
    }

    set Entity(entity: Phaser.Physics.Arcade.Sprite) {
        this.entity = entity;
    }
}

export { Player };
