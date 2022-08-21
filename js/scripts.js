const canvas = document.getElementById('play-area');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 360;
const CANVAS_HEIGHT = canvas.height = 640;

let gameFrame = 0;
let gravity = -0.5;

class Character{
    constructor(CANVAS_WIDTH, CANVAS_HEIGHT){
        this.spriteWidth = 204.8;
        this.spriteHeight = 204.8;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = (CANVAS_WIDTH - this.spriteWidth)/2;
        this.y = CANVAS_HEIGHT - this.spriteHeight;
        this.image = new Image();
        this.image.src = 'assets/char.png';
        this.frame = 0;
        this.staggerFrame = 5;

        this.power = 100;
        this.velocity = 0;
    }

    jumpDraw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0 * this.spriteHeight, this.spriteWidth, this.spriteHeight,  this.x, this.y, this.width, this.height);
    }

    jumpUpdate(gameFrame){
        if(this.frame < 4){
            if(gameFrame % this.staggerFrame == 0){
                this.frame = (this.frame+1)%5;
            }
            return true;
        } else {
            this.y -= this.velocity;
            this.velocity = this.velocity + gameFrame*gravity;
            if(this.y >= CANVAS_HEIGHT - this.spriteHeight){
                this.y = CANVAS_HEIGHT - this.spriteHeight;
                this.velocity = 0;
                this.frame = 0;
                return false;
            }
            return true;
        }
    }

    jump(){
        this.velocity = this.power;
    }
}

const char = new Character(CANVAS_WIDTH, CANVAS_HEIGHT);

window.addEventListener('click', function(e){
    char.jump();
    animateJump();
});


function animateJump(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    char.jumpDraw();
    if(char.jumpUpdate(gameFrame)){
        gameFrame++;
        requestAnimationFrame(animateJump);
    }
}