import Phaser from 'phaser';

class PlayerInputManager {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyAlt: Phaser.Input.Keyboard.Key;

    constructor(private scene: Phaser.Scene) {
        this.cursors = this.scene.input.keyboard!.createCursorKeys();
        this.keyAlt = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);
    }

    handleMovement(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        if (this.cursors.down.isDown) {
            entity.setVelocityX(0);
            this.playAnimationIfNotPlaying('down', isJumping, entity);
            this.setEntitySize(entity, 10, 8, 10, 18);
            return;
        }

        if (this.cursors.left.isDown) {
            entity.setVelocityX(-220);
            this.playRunAnimation(isJumping, entity);
            entity.setFlipX(true);
            this.setEntitySize(entity, 10, 16, 10, 10);
            return;
        }

        if (this.cursors.right.isDown) {
            entity.setVelocityX(220);
            this.playRunAnimation(isJumping, entity);
            entity.setFlipX(false);
            this.setEntitySize(entity, 10, 16, 10, 10);
            return;
        }

        entity.setVelocityX(0);
        this.playAnimationIfNotPlaying('idle', isJumping, entity);
        this.setEntitySize(entity, 10, 16, 10, 10);
    }

    handleJump(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        if (this.keyAlt.isDown && !isJumping) {
            entity.setVelocityY(-960);
            entity.play('jump');
        }
    }

    private playRunAnimation(isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        this.playAnimationIfNotPlaying('run', isJumping, entity);
    }

    private playAnimationIfNotPlaying(animation: string, isJumping: boolean, entity: Phaser.Physics.Arcade.Sprite) {
        if (!isJumping && entity.anims.currentAnim?.key !== animation) {
            entity.play(animation);
        }
    }

    private setEntitySize(entity: Phaser.Physics.Arcade.Sprite, width: number, height: number, offsetX: number, offsetY: number) {
        entity.setSize(width, height).setOffset(offsetX, offsetY);
    }
}

export { PlayerInputManager };
