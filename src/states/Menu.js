/**
 * Setup the pre-game boot sequence.
 */
export default class Menu extends Phaser.State {
    preload() {
        console.log("MENU LOADED");
    }
 
    create() {

        this.game.stage.setBackgroundColor("#a8c9ff");

        this.startButton = this.game.add.button(this.game.world.centerX - 95, this.game.world.centerY - 100, 'startbtn', this.activationOnClick, this, 2, 1, 0);

        this.startButton.onInputOver.add(this.over, this);
        this.startButton.onInputOut.add(this.out, this);
        this.startButton.onInputUp.add(this.up, this);

        
    }

    up(){
        this.startButton.loadTexture('startbtn'); 
    }

    over(){
        this.startButton.loadTexture('startbtnp'); 
    }

    out(){
        this.startButton.loadTexture('startbtn'); 
    }

    activationOnClick(){
        console.log("Starting main");
        this.game.state.start('Main');
    }

  }
  