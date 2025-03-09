import Phaser from 'phaser';

class PlayerInputManager {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyAlt: Phaser.Input.Keyboard.Key;
    private keyAttack: Phaser.Input.Keyboard.Key;
    private isAttacking: boolean = false;
    private attackHitbox: Phaser.GameObjects.Zone | null = null;

    constructor(private scene: Phaser.Scene) {
        this.cursors = this.scene.input.keyboard!.createCursorKeys();
        this.keyAlt = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
        this.keyAttack = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    }

    handleMovement(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        if (this.isAttacking) return;
        if (this.cursors.left.isDown) {
            return this.moveLeft(entity, isJumping);
        }
        if (this.cursors.right.isDown) {
            return this.moveRight(entity, isJumping);
        }

        this.stopMovement(entity, isJumping);
    }

    handleJump(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        if (this.keyAlt.isDown && !isJumping) {
            this.jump(entity);
        }
    }

    handleAttack(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        if (this.keyAttack.isDown && !this.isAttacking && !isJumping) {
            this.initiateAttack(entity);
        }
    }

    private moveLeft(entity: Phaser.Physics.Arcade.Sprite, isJumping: boolean) {
        entity.setVelocityX(-220);
        this.playRunAnimation(isJumping, entity);
        entity.setFlipX(true);
    }

    private moveRight(entity: Phaser.Physics.Arcade.Sprite, isJumping: boolean) {
        entity.setVelocityX(220);
        this.playRunAnimation(isJumping, entity);
        entity.setFlipX(false);
    }

    private stopMovement(entity: Phaser.Physics.Arcade.Sprite, isJumping: boolean) {
        entity.setVelocityX(0);
        this.playAnimationIfNotPlaying('idle', isJumping, entity);
    }

    private jump(entity: Phaser.Physics.Arcade.Sprite) {
        entity.setVelocityY(-960);
        entity.play('jump');
    }

    private initiateAttack(entity: Phaser.Physics.Arcade.Sprite) {
        this.isAttacking = true;
        entity.setVelocityX(0);
        entity.play('attack', true);

        setTimeout(() => {
            this.createAttackHitbox(entity);
        }, 300);
    }

    private createAttackHitbox(entity: Phaser.Physics.Arcade.Sprite) {
        const hitboxOffsetX = entity.flipX ? -54 : 44;

        this.attackHitbox = this.scene.add.zone(entity.x + hitboxOffsetX, entity.y, 16, 64);
        this.attackHitbox.setOrigin(0, 0);
        this.attackHitbox.setInteractive();

        this.scene.physics.world.enable(this.attackHitbox);
        (this.attackHitbox.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        this.setupAttackCollision(entity);
        this.attackHitbox.once('pointerdown', this.handleHitboxCollision);
    }

    private setupAttackCollision(entity: Phaser.Physics.Arcade.Sprite) {
        if (this.attackHitbox) {
            this.scene.physics.add.overlap(this.attackHitbox, entity, () => {
                console.log('Colisão detectada durante o ataque!');
            });
        }

        entity.once(Phaser.Animations.Events.ANIMATION_COMPLETE, this.endAttack);
    }

    private handleHitboxCollision() {
        console.log('Colisão detectada durante o ataque!');
    }

    private endAttack = () => {
        this.isAttacking = false;
        if (this.attackHitbox) {
            this.attackHitbox.destroy();
            this.attackHitbox = null;
        }
    };

    private playRunAnimation(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        this.playAnimationIfNotPlaying('run', isJumping, entity);
    }

    private playAnimationIfNotPlaying(animation: string, isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        if (!isJumping && !this.isAttacking && entity.anims.currentAnim?.key !== animation) {
            entity.play(animation);
        }
    }
}

export { PlayerInputManager };
