import Phaser from 'phaser';


interface CreateProps {
    spriteNumber: number;
    positionX: number;
    positionY: number;
}

interface ConstructorProps {
    name: string,
    path: string,
    frameSize: number,
    scale: number;
    scene: Phaser.Scene,
}

export class Platforms {
    private scene: Phaser.Scene
    private entity!: Phaser.Physics.Arcade.StaticGroup;
    private config: ConstructorProps;

    constructor(props: ConstructorProps) {
        this.scene = props.scene;
        this.entity = this.scene.physics.add.staticGroup();
        this.config = props;
    }

    preload() {
        this.scene.load.spritesheet(this.config.name, this.config.path, {
            frameWidth: this.config.frameSize,
            frameHeight: this.config.frameSize,
        });
    }

    create(props: CreateProps) {
        this.entity.create(
            props.positionX,
            props.positionY,
            this.config.name,
            props.spriteNumber
        ).setScale(this.config.scale).refreshBody();

    }

    get Entity() {
        return this.entity;
    }
}
