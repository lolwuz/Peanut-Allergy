/**
 * Cloud
 */
export default class Player extends Phaser.Rectangle {
    constructor({ game, x, y, width, height, speed }) {
      super(x, y, width, height);
      this.game = game;
      this.speed = speed;
    

      // Add the sprite to the game.
      // this.game.add.existing(this);
    }
  
    update() {
      this.x = this.x - this.speed; 
    }
  }
  