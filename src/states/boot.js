export default class Boot extends Phaser.State {

    preload() {
        console.log("BOOT");
        this.game.stage.backgroundColor = '#FF0000';
    }

    create() {
      
        // this.state.start('Preload');
    }

}
