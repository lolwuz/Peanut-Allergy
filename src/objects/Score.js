/**
 * Class for keeping and updating score.
 */
export default class Score {
    constructor({game}){
        this.game = game;
        this.lives = 3;
        this.gameScore = 0;
        this.heartArray = [];

        // Foreach live print a heart 
        for(let i = 0; i < this.lives; i++){
            let image = new Phaser.Image(this.game, this.game.world.bounds.topLeft.x, this.game.world.bounds.topLeft.y, "heart");
            image.x = image.width * i;
            
            this.heartArray.push(image);
            this.game.add.existing(image);
        }

        // Print gamescore
        this.gameScoreText = game.add.text(this.game.world.bounds.topLeft.x + 100, this.game.world.bounds.topLeft.y + this.heartArray[0].height, this.gameScore,{
            font: "30px Arial",
            fill: "ffffff",
            alignm: "center"
        });
        this.gameScoreText.anchor.setTo(0.5, 0.5);
    }

    getLives(){
        return this.lives;
    }

    setLives(number){
        this.lives = this.lives + number;

        if(this.lives <= 0){
            this.game.state.start('Main', true, false);
        }

        if(number < 0){
            this.heartArray.pop().destroy();
        } else {
            let image = new Phaser.Image(this.game, this.game.world.bounds.topLeft.x, this.game.world.bounds.topLeft.y, "heart");
            image.x = image.width * this.heartArray.length;
            this.heartArray.push();
            this.game.add.existing(image);
        }
    }

    setScore(distance){
        this.gameScore = Math.round(distance / 1000);
        this.gameScoreText.setText(this.gameScore);
    }
}