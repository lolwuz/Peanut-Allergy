/**
 * Setup and control base player.
 */
export default class Player extends Phaser.Sprite {
    constructor({ game, x, y, key, frame }) {
        super(game, x, y, key, frame);
        // Add walk animation
        this.walkAnimation = this.animations.add('walk', [1,2], 14, true);
        this.animations.play('walk');

        // Player
        this.isAlive = true;
        this.lives = 3;

        // Has landed on the ground. (For jumping)
        this.hasGrounded = false;
        this.jumpPower = 0; 
        this.jumpIndicator = new Phaser.Graphics(this.game, this.x, this.y);
        this.game.add.existing(this.jumpIndicator);

        // Add the sprite to the game.
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.bounce.y = 0.1;
        this.anchor.setTo(0.5);

        // On mouse up event
        this.game.input.activePointer.leftButton.onUp.add(this.onMouseUp.bind(this));
    }

    /**
     * Update the player in the gameloop
     */
    update() {
        // Mouse input
        let mouse = this.game.input.activePointer;
        if (mouse.leftButton.isDown) {
            this.jumpPower = this.jumpPower + 40; // Set up velocity for the jump
        } else {
            this.jumpPower = 0;
        }

        // Update the jump indicator
        this.jumpIndicator.clear();
        this.jumpIndicator.position.x = this.x;
        this.jumpIndicator.position.y = this.y;
        this.jumpIndicator.beginFill(0xFF6E40);
        this.jumpIndicator.drawCircle(0, 0, this.jumpPower);
        this.jumpIndicator.endFill();

        if(mouse.rightButton.isDown){
            this.frameName = 'pduck.png';
        }
    }

    /**
     * Launch player UP
     */
    onMouseUp(){
        if(this.hasGrounded){
            this.hasGrounded = false;
            this.body.velocity.y = -this.jumpPower; 
            this.jumpPower = 0;
        }
    }
}
