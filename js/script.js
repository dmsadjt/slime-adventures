import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Spike } from './spike.js';
import { Plant } from './plant.js';
import { Level } from './level.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('play-area');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 1000;  
    // var canvasPos = {
    //     x: canvas.offsetLeft,
    //     y: canvas.getBoundingClientRect().top
    // };
    var canvasRect = canvas.getBoundingClientRect();

    const level1 = {
        spike: [
            {
                x: 0,
                y: 20,
                state : 1,
            },
            {
                x: canvas.width-100,
                y: 200,
                state : 2,
            }
        ],
        rumput: [
            {
                x: canvas.width-100,
                y: 300,
                state : 2,
            },
            {
                x: 100,
                y: canvas.height-100,
                state : 0,
            }
        ],
    }
    
    class Game {
        constructor(width, height, canvasRect){
            this.width = width;
            this.height = height;
            this.canvasRect = canvasRect;
            this.canvasScale = {
                x: this.width / this.canvasRect.width,
                y: this.height / this.canvasRect.height
            }
            this.player = new Player(this);
            this.level1 = new Level(level1, this.player);
            this.spike = new Spike(this, 0, this.height/3, 1);
            this.plant = new Plant(this, 0, this.height/10, 1);
            this.input = new InputHandler(this.canvasRect, this.canvasScale);
            this.gameFrame = 0;
        }
        update(){
            this.player.update(this.input.mousedown, this.input.mousePos);
            this.level1.update();
        }
        draw(context){
            this.level1.draw(context);
            // this.spike.draw(context);
            // this.plant.draw(context);
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height, canvasRect);

    console.log(game);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        game.gameFrame++;
        requestAnimationFrame(animate);
    }
    animate();
});