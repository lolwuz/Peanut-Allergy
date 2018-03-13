/**
 * Cloud
 */
export default class Player extends Phaser.Graphics {
    constructor(game) {
      super(game, game.world.centerX + game.world.width, game.world.centerY);
      // Create rectange
      this.beginFill(0xFFFFFF);
      this.drawRect(0, 0, Math.floor((Math.random() * 400) + 200), Math.floor((Math.random() * 200) + 100));
      this.endFill();
    
      // Set cloud speed
      this.speed =  Math.floor((Math.random() * 1.4) + 1);

      // Add the sprite to the game.
      this.game.add.existing(this);
    }
  
    update() {
      this.x = this.x - this.speed; 
    }
  }
  