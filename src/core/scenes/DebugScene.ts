import Phaser from 'phaser';

interface DebugProps {
    gameObjects?: Phaser.GameObjects.GameObject[];
}

export class DebugScene extends Phaser.Scene {
    constructor(sceneKey: string) {
        super(sceneKey);
    }

    public debug({ gameObjects }: DebugProps) {
        const graphics = this.add.graphics();
        const GRID_SIZE = 64;

        const width = this.scale.width;
        const height = this.scale.height;

        const xCoords = this.generateCoordinates(width, GRID_SIZE);
        const yCoords = this.generateCoordinates(height, GRID_SIZE);

        this.drawGridLines(graphics, xCoords, yCoords, width, height);
        this.addGridText(xCoords, yCoords);

        if (gameObjects) {
            this.debugGameObjects(gameObjects
                .filter((value: Phaser.GameObjects.GameObject) => {
                    const sprite = value as Phaser.GameObjects.Sprite;
                    return sprite.body;
                })
            );
        }
    }

    public debugUpdatedGameObject({ gameObject }: { gameObject: Phaser.GameObjects.GameObject }) {
        const sprite = gameObject as Phaser.GameObjects.Sprite;
        this.drawDebugRect(sprite, true); 
        
    }

    private debugGameObjects(array: Phaser.GameObjects.GameObject[] = []) {
        array.forEach((value: Phaser.GameObjects.GameObject) => {
            const sprite = value as Phaser.GameObjects.Sprite;
            this.drawDebugRect(sprite);
        });
    }

    private drawDebugRect(sprite: Phaser.GameObjects.Sprite, isUpdated = false) {
        const debugGraphics = sprite.scene.add.graphics();
        debugGraphics.lineStyle(2, isUpdated ? 0x0000ff : 0x00ff00) ;
        const { x, y, width, height } = sprite.getBounds();
        debugGraphics.strokeRect(x, y, width, height);
        if (isUpdated) {
            this.time.delayedCall(0, () => debugGraphics.clear(), [], this);
        }
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
