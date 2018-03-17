export default class Score {
    constructor({game}){
        this.game = game;
        this.lives = 3;
        this.gameScore = 0;

        // Foreach live print a heart 
        for(let i = 0; i < this.lives; i++){
            let image = new Phaser.Image(this.game, this.game.world.bounds.topLeft.x, this.game.world.bounds.topLeft.y, "heart");
            image.x = image.width * i;
            
            this.game.add.existing(image);
        }
    }

    getLives(){
        return this.lives;
    }

    setLives(number){
        this.lives = this.lives + number;
    }
}