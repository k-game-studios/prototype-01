import Phaser from 'phaser';

interface ConstructorProps {
    scene: Phaser.Scene;
    name: string;
    path: string;
    frameSize: number;
    scale: number;
}

export class Player {
    private scene: Phaser.Scene;
    private entity!: Phaser.Physics.Arcade.Sprite;
    private config: ConstructorProps;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private isJumping: boolean = false;
    private keyAlt!: Phaser.Input.Keyboard.Key;

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
            .setCollideWorldBounds(true)
            .setSize(10, 16)
            .setOffset(10, 10);

        if (this.scene.input && this.scene.input.keyboard) {
            this.cursors = this.scene.input.keyboard.createCursorKeys();
            this.keyAlt = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
        
        }

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers(this.config.name, { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers(this.config.name, { start: 16, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'jump',
            // frames: this.scene.anims.generateFrameNumbers(this.config.name, { start: 40, end: 48 }),
            frames: this.scene.anims.generateFrameNumbers(this.config.name, { start: 18, end: 20 }),
            frameRate: 18,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'down',
            frames: this.scene.anims.generateFrameNumbers(this.config.name, { start: 42, end: 42 }),
            frameRate: 18,
            repeat: 0
        });

        this.entity.play('idle');
        this.camera();
    }

    update() {
        if (!this.cursors) return;

        const onGround = this.entity.body?.blocked.down || this.entity.body?.touching.down;

        if (onGround) {
            this.isJumping = false;
        }

        if (this.cursors.down.isDown) {
            this.entity.setVelocityX(0);
            if (!this.isJumping && this.entity.anims.currentAnim?.key !== 'down') {
                this.entity.play('down');
            }
        } else if (this.cursors.left.isDown) {
            this.entity.setVelocityX(-220);
            if (!this.isJumping && this.entity.anims.currentAnim?.key !== 'run') {
                this.entity.play('run');
            }
            this.entity.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.entity.setVelocityX(220);
            if (!this.isJumping && this.entity.anims.currentAnim?.key !== 'run') {
                this.entity.play('run');
            }
            this.entity.setFlipX(false);
        } else {
            this.entity.setVelocityX(0);
            if (!this.isJumping && this.entity.anims.currentAnim?.key !== 'idle') {
                this.entity.play('idle');
            }
        }

        if (this.keyAlt.isDown && onGround) {
            this.entity.setVelocityY(-960);
            this.isJumping = true;
            this.entity.play('jump');
        }

        const playerBounds = this.Entity.getBounds();
        const worldBounds = this.scene.physics.world.bounds;

        if (playerBounds.bottom > worldBounds.bottom) {
            this.Entity.setPosition(320, 448);
        }
    }

    get Entity() {
        return this.entity;
    }

    set Entity(entity: Phaser.Physics.Arcade.Sprite) {
        this.entity = entity;
    }

    camera() {
        this.scene.physics.world.setBounds(0, 0, 1200, 700);
        this.scene.cameras.main.startFollow(this.Entity, true, 0.08, 0, 0.1, 132);
    }
}
