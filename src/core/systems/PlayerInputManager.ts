import Phaser from 'phaser';

class PlayerInputManager {
    public cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyAlt!: Phaser.Input.Keyboard.Key;

    constructor(private scene: Phaser.Scene) {
        this.setupInput();
    }

    private setupInput() {
        if (this.scene.input?.keyboard) {
            this.cursors = this.scene.input.keyboard.createCursorKeys();
            this.keyAlt = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
        }
    }

    handleMovement(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        const movementState = {
            down: () => {
                entity.setVelocityX(0);
                if (!isJumping && entity.anims.currentAnim?.key !== 'down') {
                    entity.play('down');
                }
            },
            left: () => {
                entity.setVelocityX(-220);
                this.playRunAnimation(isJumping, entity);
                entity.setFlipX(true);
            },
            right: () => {
                entity.setVelocityX(220);
                this.playRunAnimation(isJumping, entity);
                entity.setFlipX(false);
            },
            idle: () => {
                entity.setVelocityX(0);
                if (!isJumping && entity.anims.currentAnim?.key !== 'idle') {
                    entity.play('idle');
                }
            }
        };

        if (this.cursors.down.isDown) {
            movementState.down();
        } else if (this.cursors.left.isDown) {
            movementState.left();
        } else if (this.cursors.right.isDown) {
            movementState.right();
        } else {
            movementState.idle();
        }
    }

    handleJump(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        if (this.keyAlt.isDown && !isJumping) {
            entity.setVelocityY(-960);
            entity.play('jump');
        }
    }

    private playRunAnimation(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        if (!isJumping && entity.anims.currentAnim?.key !== 'run') {
            entity.play('run');
        }
    }
}

export { PlayerInputManager };
