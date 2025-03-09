class PlayerAttackManager {
    private attackHitbox: Phaser.GameObjects.Zone | null = null;
    private isAttacking = false;

    constructor(private scene: Phaser.Scene, private player: Phaser.GameObjects.Sprite) {}

    public startAttack() {
        if (this.isAttacking) return; // Impede que o ataque aconteça enquanto outro ataque está em andamento.

        this.isAttacking = true;
        const hitboxOffsetX = this.player.flipX ? -54 : 44;

        // Cria a hitbox de ataque
        this.createHitbox(hitboxOffsetX);
        // Configura as colisões
        this.setupCollisions();
        // Limpeza da hitbox após o término da animação
        this.cleanupAfterAnimation();
    }

    private createHitbox(hitboxOffsetX: number) {
        this.attackHitbox = this.scene.add.zone(this.player.x + hitboxOffsetX, this.player.y, 16, 64);
        this.attackHitbox.setOrigin(0, 0);
        this.attackHitbox.setInteractive();
        this.scene.physics.world.enable(this.attackHitbox);
        (this.attackHitbox.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    }

    private setupCollisions() {
        if (!this.attackHitbox) return;

        this.scene.physics.add.overlap(this.attackHitbox, this.player, () => {
            console.log('Colisão detectada durante o ataque!');
        });

        // Detecta o clique para a colisão
        this.attackHitbox.once('pointerdown', () => {
            console.log('Colisão detectada durante o ataque!');
        });
    }

    private cleanupAfterAnimation() {
        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isAttacking = false;
            if (this.attackHitbox) {
                this.attackHitbox.destroy();
                this.attackHitbox = null;
            }
        });
    }
}

export { PlayerAttackManager };