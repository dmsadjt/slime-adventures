import { Player } from './player.js';
import { InputHandler } from './input.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('play-area');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 1000;

    class Game {
        constructor(width, height, canvasx){
            this.width = width;
            this.height = height;
            this.canvasx = canvasx;
            this.player = new Player(this);
            this.input = new InputHandler();
        }
        update(){
            this.player.update(this.input.mousedown, this.input.mousex, this.canvasx);
        }
        draw(context){
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height, canvas.getBoundingClientRect().left);

    console.log(game);

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
        
    }
    animate();
});