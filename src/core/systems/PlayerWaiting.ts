import Phaser from 'phaser';

class PlayerWaiting {
    private lastAnimChangeTime: number | null = null;
    private lastAnimKey: string | null = null;
    private waitingTime: number = 10800;
    private readonly incrementTime: number = 14400;

    waiting(entity: Phaser.Physics.Arcade.Sprite) {
        const currentAnimKey = entity.anims.currentAnim?.key;

        if (currentAnimKey !== 'waiting' && currentAnimKey !== 'idle') {
            this.waitingTime = 5000;
        }

        if (currentAnimKey !== this.lastAnimKey) {
            this.lastAnimKey = currentAnimKey ?? null;
            this.lastAnimChangeTime = Date.now();
        } else if (this.lastAnimChangeTime && Date.now() - this.lastAnimChangeTime > this.waitingTime) {
            if (currentAnimKey !== 'waiting') {
                entity.play('waiting');
                this.waitingTime += this.incrementTime;
                setTimeout(() => entity.play('idle'), 1600 + (this.waitingTime / 10));
            }
        }
    }
}

export { PlayerWaiting };
