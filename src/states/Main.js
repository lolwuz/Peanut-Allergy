import throttle from "lodash.throttle";
import Player from "../objects/Player";
import Cloud from "../objects/Cloud";
import Ground from "../objects/Ground";
import PeanutObject from "../objects/PeanutObject";
import Score from "../objects/Score";

/**
 * Setup and display the main game state.
 */
export default class Main extends Phaser.State {
    /**
     * Setup all objects, etc needed for the main game state.
     */
    create() {
        this.cloudArray = [];
        this.groundArray = [];
        this.obstracleArray = [];

        this.game.physics.startSystem(Phaser.Physics.ARCADE);  // Enable arcade physics.
        this.game.input.mouse.capture = true; // Enable cursor input
        this.game.stage.setBackgroundColor("#40C4FF");  // Add background color
       
        this.speed = 4; // Starting speed
        this.score = new Score({game: this.game}); // Game score object 
        this.distance = 0; // Distance runned.
        this.spawnGroundDistance = 1000; // Runned distance between each ground spawn 
        this.spawnObstacleDistance = 750; // Runed distance between each Obstacle spawn
        this.nextGroundSpawnDistance = this.distance + this.spawnGroundDistance;
        this.nextObstacleSpawnDistance = this.distance + this.spawnObstacleDistance;
        
        // Add a player to the game.
        this.player = new Player({
            game: this.game,
            x: this.game.world.centerX - (300 * window.devicePixelRatio),
            y: this.game.world.centerY,
            key: 'player',
            frame: 'stand.png'
        });

        // this.player2 = new Phaser.Sprite(this.game, this.game.world.left, this.game.world.centerY, "p", "pwalk.png");
        // this.game.add.existing(this.player2);
        // this.game.physics.enable(this.player2, Phaser.Physics.ARCADE);
        // this.player2.body.bounce.y = 0.1;
        // this.player2.anchor.setTo(0.5);
        
        // Add Physics to player
        this.game.physics.arcade.gravity.y = 1400;

        // Clouds
        this.game.time.events.repeat(
            Phaser.Timer.SECOND * 6,
            10,
            this.spawnCloud,
            this
        );

        // Ground
        let startGround = new Ground({
            // Start ground
            game: this.game,
            x: this.game.world.left,
            y: this.game.world.centerY + 300 * window.devicePixelRatio,
            width: this.game.world.width * 3,
            height: this.game.height / 2,
            speed: 4,
            spawnGround: this.spawGround
        });
        this.groundArray.push(startGround);
    
        // Setup listener for window resize.
        window.addEventListener(
            "resize",
            throttle(this.resize.bind(this), 50),
            false
        );
    }

    /**
     * Handle actions in the main game loop.
     */
    update() {
        // Update gamespeed
        this.speed = this.speed + 0.001;
        this.distance += this.speed;
    
        if(this.distance > this.nextGroundSpawnDistance){
            this.nextGroundSpawnDistance += this.spawnGroundDistance;
            this.spawnGround();
        }

        if(this.distance > this.nextObstacleSpawnDistance){
            this.nextObstacleSpawnDistance += this.spawnObstacleDistance;
            this.spawnObstacle();
        }

        // Check collisions
        if (this.game.physics.arcade.collide(this.player, this.groundArray)) {
            this.player.hasGrounded = true; // Player has landed on the ground
        }

        this.game.physics.arcade.collide(this.player, this.groundArray);
        // this.game.physics.arcade.collide(this.player2, this.obstracleArray);
        // this.game.physics.arcade.collide(this.player2, this.groundArray);
        if(this.game.physics.arcade.collide(this.player, this.obstracleArray)){
            this.score.setLives(-1);
        }

        let target = new Phaser.Point(this.player.x, this.player.y).add(-200, 0);
        // this.game.physics.arcade.moveToObject(this.player2, target, 10, 100);

        // Update clouds
        for (let i = 0; i < this.cloudArray.length; i++) {
            this.cloudArray[i].speed = this.speed;
            this.cloudArray[i].update();
        }

        // Update ground
        let firstGround = this.groundArray[0];
        for (let i = 0; i < this.groundArray.length; i++) {
            let ground = this.groundArray[i];
            ground.speed = this.speed;
            ground.update(this.speed);
        }
        
        if(firstGround.x + firstGround.width < this.world.bounds.left){ 
            this.groundArray.shift().destroy(); // Remove from the scene when not visible
        }
 
        // Update obstacles
        let firstObstacle = this.obstracleArray[0] || {};
        for(let i = 0; i < this.obstracleArray.length; i++){
            let obstacle = this.obstracleArray[i];
            obstacle.speed = this.speed;
            obstacle.update();
        }

        if(firstObstacle.x + firstObstacle.width < this.world.bounds.left){
            this.obstracleArray.shift().destroy(); // Remove from the scene when not visible
        }

        // Game over?
        if(this.player.y > this.world.bounds.bottom){
            this.lostLife();
        }

        this.score.setScore(this.distance);

        if(this.player.y < - 1000){
            this.game.state.start('Icarus', true, false);
        }
    }

    /**
     * Reset player when he lost his life
     */
    lostLife(){
        this.score.setLives(-1);
        this.player.position.set(this.game.world.centerX, this.game.world.centerY);
    }

    /**
     * Spawn cloud function
     */
    spawnCloud() {
        // Spawn a new Cloud.
        this.cloudArray.push(new Cloud(this.game));
    }

    /**
     * Spawn ground
     */
    spawnGround() {
        const config = {
            game: this.game,
            x: this.game.world.centerX + this.game.world.width,
            y: this.game.world.centerY + 300 * window.devicePixelRatio,
            width: Math.floor((Math.random() * 1300) + 1200) * window.devicePixelRatio,
            height: this.game.height / 2,
            speed: this.speed
        };
        this.groundArray.push(new Ground(config));
    }

    /** 
     * Spawn Obstacle
     */
    spawnObstacle(){
        const spawnLevel = Math.floor((Math.random() * 3) + 1);
        const config = {
            game: this.game,
            x: this.game.world.centerX + this.game.world.width,
            y: this.game.world.centerY + (300 * window.devicePixelRatio) - this.player.height * spawnLevel,
            key: 'peanut_products',
            frame: Math.floor((Math.random() * 12) + 1)+ '.png',
            speed: this.speed
        };
        this.obstracleArray.push(new PeanutObject(config));
    }

    /**
     * Resize the game to fit the window.
     */
    resize() {
        const width = window.innerWidth * window.devicePixelRatio;
        const height = window.innerHeight * window.devicePixelRatio;

        this.scale.setGameSize(width, height);
    }

}
