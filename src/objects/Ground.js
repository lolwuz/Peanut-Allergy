export default class Ground extends Phaser.Graphics{
    constructor({game, x, y, width, height, speed}){
        super(game, x, y);
        // Create rectange
        this.beginFill(0x00E676);
        this.drawRect(0, 0, width, height);
        this.endFill();

        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.speed = speed;
        this.body.allowGravity = false;
        this.body.immovable = true;
    }

    update(){
        this.x = this.x - this.speed;
    }
}