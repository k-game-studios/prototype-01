import Phaser from 'phaser';

export class BaseScene extends Phaser.Scene {
    constructor(sceneKey: string) {
        super(sceneKey);
    }

    debugGrid() {
        const graphics = this.add.graphics();
        const GRID_SIZE = 64;

        graphics.lineStyle(1, 0xff0000, 0.5);

        const width = this.scale.width;
        const height = this.scale.height;

        for (let x = 0; x < width; x += GRID_SIZE) {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, height);
        }

        for (let y = 0; y < height; y += GRID_SIZE) {
            graphics.moveTo(0, y);
            graphics.lineTo(width, y);
        }

        graphics.strokePath();

        graphics.fillStyle(0xffffff, 1);

        for (let x = 0; x < width; x += GRID_SIZE) {
            for (let y = 0; y < height; y += GRID_SIZE) {
                this.add.text(
                    x,
                    y,
                    `X: ${x}, \nY: ${y}`,
                    { color: '#ffffff', fontSize: '12px' }
                );
            }
        }
    }
}
