import * as states from './states';

console.log("INITIATING GAME"); 
const GAME = new Phaser.Game(800, 1000, Phaser.AUTO);

Object.keys(states).forEach(state => GAME.state.add(state, states[state]));

GAME.state.start('Boot');
