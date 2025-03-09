import Phaser from 'phaser';

class PlayerAnimationManager {
    constructor(private scene: Phaser.Scene, private name: string) {}

    create() {
        this.setup('idle', 0, 3, 6, -1);
        this.setup('run', 16, 23, 10, -1);
        this.setup('jump', 18, 20, 18, 0);
        this.setup('down', 42, 42, 18, -1);
    }

    private setup(key: string, startFrame: number, endFrame: number, frameRate: number, repeat: number) {
        this.scene.anims.create({
            key,
            frames: this.scene.anims.generateFrameNumbers(this.name, { start: startFrame, end: endFrame }),
            frameRate,
            repeat,
        });
    }
}

export { PlayerAnimationManager };