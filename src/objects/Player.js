/**
 * Setup and control base player.
 */
export default class Player extends Phaser.Sprite {
    constructor({ game, x, y, key, frame }) {
        super(game, x, y, key, frame);
        // Add walk animation
        this.walkAnimation = this.animations.add('walk', [1,2], 14, true);
        this.animations.play('walk');

        // Has landed on the ground. (For jumping)
        this.hasGrounded = true;

        // Add the sprite to the game.
        this.game.add.existing(this);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.bounce.y = 0.1;
        this.anchor.setTo(0.5);
    }

    /**
     * Update the player in the gameloop
     */
    update() {
        // Mouse input
        let mouse = this.game.input.activePointer;
        if (mouse.leftButton.isDown && this.hasGrounded) {
            this.body.velocity.y = -750; // Set up velocity for the jump
            this.hasGrounded = false;
        }

        if(mouse.rightButton.isDown){
            this.frameName = 'pduck.png';
        }
    }
}
