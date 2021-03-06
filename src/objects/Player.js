/**
 * Setup and control base player.
 */
export default class Player extends Phaser.Sprite {
    constructor({ game, x, y, key, frame }) {
        super(game, x, y, key);
        // Add walk animation
        this.walkAnimation = this.animations.add('walk', [2, 1, 3, 1], 10, true);
        this.animations.play('walk');

        // Player
        this.isAlive = true;
        this.lives = 3;

        // Has landed on the ground. (For jumping)
        this.hasGrounded = false;
        this.wasDown = true;
        this.jumpPower = 0; 
        this.jumpIndicator = new Phaser.Graphics(this.game, this.x, this.y);
        this.game.add.existing(this.jumpIndicator);

        // Add the sprite to the game.
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.game.add.existing(this);
        this.body.bounce.y = 0.1;
        this.anchor.setTo(0.5);
    }

    /**
     * Update the player in the gameloop
     */
    update() {
        // Mouse input
        let mouse = this.game.input.activePointer;
        if(mouse.leftButton.isUp && this.wasDown){
            this.wasDown = false;
            if(this.hasGrounded){
                this.hasGrounded = false;
                this.body.velocity.y = -this.jumpPower; 
                this.jumpPower = 0;
            }
        }

        if (mouse.leftButton.isDown) {
            this.wasDown = true;
            this.jumpPower = this.jumpPower + 50; // Set up velocity for the jump
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
            this.frameName = 'fly.png';
        }
    }
}
