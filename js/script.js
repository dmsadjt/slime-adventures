import { Player } from './player.js';
import { InputHandler } from './input.js';

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
            this.input = new InputHandler(this.canvasRect, this.canvasScale);
            this.gameFrame = 0;
        }
        update(){
            this.player.update(this.input.mousedown, this.input.mousePos);
        }
        draw(context){
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