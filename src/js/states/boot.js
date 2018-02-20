export default class Boot extends Phaser.State {

    preload() {
        this.game.stage.backgroundColor = '#000';

    }

    create() {
      
        this.state.start('Preload');
    }

}
