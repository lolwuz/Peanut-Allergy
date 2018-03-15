/**
 * Cloud
 */
export default class Cloud extends Phaser.Graphics {
    constructor(game, speed) {
        super(game, game.world.centerX + game.world.width, game.world.centerY + -400);
        // Create rectange
        this.beginFill(0xFFFFFF);
        this.drawRect(0, 0, Math.floor((Math.random() * 400) + 200), Math.floor((Math.random() * 200) + 100));
        this.endFill();

        // Set cloud speed
        this.speed =  speed;

        // Add the sprite to the game.
        this.game.add.existing(this);
    }
  
    update() {
      this.x = this.x - this.speed; 
    }
  }
  