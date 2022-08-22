export class Player {
    constructor(game){
        this.game = game;
        this.spriteWidth = 204.8;
        this.spriteHeight = 204.8;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = (this.game.width - this.spriteWidth)/2;
        this.y = this.game.height - this.spriteHeight;
        this.image = document.getElementById('char');
        this.velocity = 0;
        this.maxvelocity = this.game.height - this.spriteHeight;
    }
    update(press){
        if(press){
            // this.velocity = Math.min(this.maxvelocity, this.velocity+5);
            this.velocity = 100;
        } else {
            this.y -= this.velocity;
            this.velocity-=1;
    
            if(this.y > this.game.width - this.spriteHeight){
                // console.log(true);
                this.y = this.game.height - this.spriteHeight;
                this.velocity = 0;
            }
        }
        // console.log(this.velocity);
    }
    draw(context){
        // context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, 0*this.spriteWidth, 0*this.spriteHeight, this.spriteWidth, this.spriteHeight,  this.x, this.y, this.width, this.height);
    }
}