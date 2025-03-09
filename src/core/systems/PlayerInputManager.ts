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
            entity.setVelocityX(-220);
            this.playRunAnimation(isJumping, entity);
            entity.setFlipX(true);
            return;
        }

        if (this.cursors.right.isDown) {
            entity.setVelocityX(220);
            this.playRunAnimation(isJumping, entity);
            entity.setFlipX(false);
            return;
        }

        entity.setVelocityX(0);
        this.playAnimationIfNotPlaying('idle', isJumping, entity);
    }

    handleJump(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        if (this.keyAlt.isDown && !isJumping) {
            entity.setVelocityY(-960);
            entity.play('jump');
        }
    }

    handleAttack(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        if (this.keyAttack.isDown && !this.isAttacking && !isJumping) {
            this.isAttacking = true;
            entity.setVelocityX(0);
            entity.play('attack', true);


            setTimeout(() => {
                const hitboxOffsetX = entity.flipX ? -54 : 44;

                this.attackHitbox = this.scene.add.zone(entity.x + hitboxOffsetX, entity.y, 16, 64);

                this.attackHitbox.setOrigin(0, 0);
                this.attackHitbox.setInteractive();


                this.scene.physics.world.enable(this.attackHitbox);
                (this.attackHitbox.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
                this.scene.physics.add.overlap(this.attackHitbox, entity, () => {
                    console.log('Colisão detectada durante o ataque!');
                });

                this.attackHitbox.once('pointerdown', () => {
                    console.log('Colisão detectada durante o ataque!');
                });

                entity.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    this.isAttacking = false;
                    if (this.attackHitbox) {
                        this.attackHitbox.destroy();
                        this.attackHitbox = null;
                    }
                });
            }, 300)

        }
    }

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
