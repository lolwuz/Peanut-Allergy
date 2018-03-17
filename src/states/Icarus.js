/**
 * Icarus 
 */
export default class Menu extends Phaser.State {
    create() {
        // ICARUS text
        this.text = game.add.text(game.world.centerX, 250, '  ICARUS  ');
        this.text.anchor.set(0.5);
        this.text.align = 'center';

        this.text.font = 'Arial Black';
        this.text.fontSize = 140;
        this.text.fontWeight = 'bold';
        this.text.fill = '#ffffff';

        this.text.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    
        const style = { font: 'bold 40pt Aria Black', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 600 };

        this.text2 = game.add.text(game.world.centerX, 800, "... ignored his father's instructions not to fly too close to the sun; when the wax in his wings melted he tumbled out of the sky and fell into the sea where he drowned.", style);
        this.text2.anchor.set(0.5);


        this.text2.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
    }

    update(){
        if(this.game.input.activePointer.leftButton.justReleased()){
            this.game.state.start('Main');
        }
    }
}
  