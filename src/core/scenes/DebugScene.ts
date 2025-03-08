import Phaser from 'phaser';

export class DebugScene extends Phaser.Scene {
    constructor(sceneKey: string) {
        super(sceneKey);
    }

    public debug() {
        const graphics = this.add.graphics();
        const GRID_SIZE = 64;

        const width = this.scale.width;
        const height = this.scale.height;

        const xCoords = this.generateCoordinates(width, GRID_SIZE);
        const yCoords = this.generateCoordinates(height, GRID_SIZE);

        this.drawGridLines(graphics, xCoords, yCoords, width, height);
        this.addGridText(xCoords, yCoords);
    }

    private generateCoordinates(dim: number, gridSize: number): number[] {
        return Array.from({ length: Math.ceil(dim / gridSize) }, (_, i) => i * gridSize);
    }

    private drawGridLines(graphics: Phaser.GameObjects.Graphics, xCoords: number[], yCoords: number[], width: number, height: number) {
        graphics.lineStyle(1, 0xff0000, 0.5);

        xCoords.forEach(x => {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, height);
        });

        yCoords.forEach(y => {
            graphics.moveTo(0, y);
            graphics.lineTo(width, y);
        });

        graphics.strokePath();
    }

    private addGridText(xCoords: number[], yCoords: number[]) {
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);

        xCoords.forEach(x => {
            yCoords.forEach(y => {
                this.add.text(
                    x,
                    y,
                    `X: ${x}, \nY: ${y}`,
                    { color: '#ffffff', fontSize: '12px' }
                );
            });
        });
    }
}
