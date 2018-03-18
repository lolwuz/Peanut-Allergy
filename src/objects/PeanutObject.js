export default class PeanutObject extends Phaser.Sprite{
    constructor({ game, x, y, key, speed }){
        super(game, x, y, key);
        this.speed = speed;
        this.anchor.set(0.5);
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.body.onCollide = new Phaser.Signal();
        this.body.onCollide.add(this.onCollide, this);

        this.game.add.existing(this);
    }

    update(){
        this.angle--;
        this.x = this.x - this.speed;
    }

    onCollide(){
        this.destroy();
    }
}