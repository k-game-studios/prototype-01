import Phaser from 'phaser';

export class CameraManager {
    constructor(private scene: Phaser.Scene, private entity: Phaser.Physics.Arcade.Sprite) {}

    create() {
        this.scene.physics.world.setBounds(0, 0, 1200, 700);
        this.scene.cameras.main.startFollow(this.entity, true, 0.08, 0, 0.1, 132);
    }
}
