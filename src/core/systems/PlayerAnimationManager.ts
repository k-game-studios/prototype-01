import Phaser from 'phaser';

class PlayerAnimationManager {
    constructor(private scene: Phaser.Scene, private name: string) {}

    setupAnimations() {
        this.createAnimation('idle', 0, 3, 6, -1);
        this.createAnimation('run', 16, 23, 10, -1);
        this.createAnimation('jump', 18, 20, 18, 0);
        this.createAnimation('down', 42, 42, 18, -1);
    }

    private createAnimation(key: string, startFrame: number, endFrame: number, frameRate: number, repeat: number) {
        this.scene.anims.create({
            key,
            frames: this.scene.anims.generateFrameNumbers(this.name, { start: startFrame, end: endFrame }),
            frameRate,
            repeat,
        });
    }
}

export { PlayerAnimationManager };