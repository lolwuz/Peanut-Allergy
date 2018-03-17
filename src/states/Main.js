import throttle from "lodash.throttle";
import Player from "../objects/Player";
import Cloud from "../objects/Cloud";
import Ground from "../objects/Ground";
import Score from "../objects/Score";

/**
 * Setup and display the main game state.
 */
export default class Main extends Phaser.State {
    /**
     * Setup all objects, etc needed for the main game state.
     */
    create() {
        // Enable arcade physics.
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // Enable cursor input
        this.game.input.mouse.capture = true;
        // Add background tile.
        this.game.stage.setBackgroundColor("#40C4FF");
       

        // Starting speed
        this.speed = 4;
        this.score = new Score();
        
        // Add a player to the game.
        this.player = new Player({
            game: this.game,
            x: this.game.world.centerX,
            y: this.game.world.centerY,
            key: "p",
            frame: "pwalk.png"
        });

        // Add Physics to player
        this.game.physics.arcade.gravity.y = 1000;

        // Clouds
        this.cloudArray = [];
        this.game.time.events.repeat(
            Phaser.Timer.SECOND * 6,
            10,
            this.spawnCloud,
            this
        );

        // Ground
        this.groundArray = [];
        let startGround = new Ground({
            // Start ground
            game: this.game,
            x: this.game.world.centerX,
            y: this.game.world.centerY + 300 * window.devicePixelRatio,
            width: this.game.world.width * 2,
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
            width: Math.floor((Math.random() * 1400) + 1200) * window.devicePixelRatio,
            height: this.game.height / 2,
            speed: this.speed
        };
        this.groundArray.push(new Ground(config));
    }

    /**
     * Resize the game to fit the window.
     */
    resize() {
        const width = window.innerWidth * window.devicePixelRatio;
        const height = window.innerHeight * window.devicePixelRatio;

        this.scale.setGameSize(width, height);
    }

    /**
     * Handle actions in the main game loop.
     */
    update() {
        // Update gamespeed
        this.speed = this.speed + 0.001;

        // Check collisions
        if (this.game.physics.arcade.collide(this.player, this.groundArray)) {
            this.player.hasGrounded = true; // Player has landed on the ground
        }

        // Update clouds
        for (let i = 0; i < this.cloudArray.length; i++) {
            this.cloudArray[i].speed = this.speed;
            this.cloudArray[i].update();
        }

        // Update ground
        for (let i = 0; i < this.groundArray.length; i++) {
            this.groundArray[i].speed = this.speed;
            this.groundArray[i].update(this.speed);
        }
        let lastGround = this.groundArray[this.groundArray.length - 1];
        if(lastGround.x < this.world.centerX){
            console.log("spawning new Ground");
            this.spawnGround();
        }

        // Game over?
        if(this.player.y < this.world.bounds.bottom.y){
            // this.score.lives(-1);
            // this.game.time.paused();
        }
        if(this.player.y < - 1000){
            this.game.state.start('Icarus');
        }
    }
}
