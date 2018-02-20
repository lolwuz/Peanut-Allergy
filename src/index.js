import * as states from 'states';

class Game extends Phaser.Game {

	constructor() {
		super(500, 500, Phaser.AUTO, 'content', null);
		Object.keys(states).forEach(state => this.state.add(state, states[state]));
		
		this.state.start('Boot');
	}

}

new Game();
