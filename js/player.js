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
        this.power = 0; // power to jump
        this.strength = 5; // how much power increase per frame
        this.maxpower = 50; // maximum power can be
        this.vy = 0; // horizontal velocity of character
        this.weight = 1.5; // gravity acceleration = 1, gravity force = 1 * weight
    }
    update(press){

        // Horizontal movement
        if(this.onGround()){
            if(press){
                this.power = Math.min(this.maxpower, this.power+this.strength); // charge up power to jump
            } else {
                this.vy = -this.power; // changing power into horizontal velocity (upward velocity is minus)
                this.power = 0; // reset charged power
            }
        }
        this.y += this.vy; // change position based on velocity
        if(!this.onGround()){
            this.vy += this.weight; // vt = vo + gt
        } else {
            this.vy = 0; // when hit the ground, horizontal velocity is 0
        }
        if(this.y > this.game.height - this.height) this.y = this.game.height - this.height // corrector if fps is not good
    }
    draw(context){
        context.drawImage(this.image, 0*this.spriteWidth, 0*this.spriteHeight, this.spriteWidth, this.spriteHeight,  this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height
    }
}