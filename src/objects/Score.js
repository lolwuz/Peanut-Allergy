export default class Score {
    constructor(){
        this.lives = 3;
        this.gameScore = 0;
    }

    getLives(){
        return this.lives;
    }

    setLives(number){
        this.lives = this.lives + number;
    }
}