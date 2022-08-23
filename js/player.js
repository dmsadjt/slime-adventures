export class Player {
    constructor(game){
        this.game = game;
        this.spriteWidth = 204.8;
        this.spriteHeight = 204.8;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = (this.game.width - this.spriteWidth)/2;
        this.y = this.game.height - this.spriteHeight;
        this.image = new Image();
        this.image.src = '../assets/char.png';

        this.powery = 0; // power to jump (y axis)
        this.powerx = 0;
        this.strength = 5; // how much power increase per frame
        this.maxpower = 50; // maximum power can be
        this.vy = 0; // vertical velocity of character
        this.vx = 0;
        this.weight = 1.5; // gravity acceleration = 1, gravity force = 1 * weight
        this.anglerad = 0;
        this.groundFriction = 0.5;
    }
    update(press, mousex, canvasx){
        if(this.onGround()){
            if(press){
                this.powery = Math.min(this.maxpower, this.powery+this.strength); // charge up power to jump
                this.anglerad = Math.random() * Math.PI;
            } else {
                this.vy = -this.powery * Math.sin(this.anglerad);
                this.vx = this.powery * Math.cos(this.anglerad);
                this.powery = 0; // reset charged power
                this.anglerad = 0;
            }
        }
        // console.log(Math.cos(this.anglerad));

        this.x += this.vx;
        this.y += this.vy;

        if(this.isHitWallL()){
            this.vx = Math.abs(this.vx);
        }
        if(this.isHitWallR()){
            this.vx = -Math.abs(this.vx);
        }

        if(!this.onGround()){
            this.vy += this.weight; // vt = vo + gt
        } else {
            this.vy = 0; // when hit the ground, vertical velocity is 0
            this.vx = Math.max(0, this.vx-this.groundFriction); // not working ?
        }
        if(this.y > this.game.height - this.height) this.y = this.game.height - this.height; // corrector ground if fps is not good
        
        
        // // horizontal movement
        // if(this.onGround()){
        //     if(press){
        //         this.powerx = 10; // charge up power to jump
        //     } else {
        //         if(this.isHitWallL() || this.isHitWallR()){
        //             this.vx = -this.powerx;
        //         } else {
        //             this.vx = this.powerx;
        //         }
        //         this.powerx = 0; // reset charged power
        //     }
        // }
        // this.x += this.vx;        

        // if(this.isHitWallL()){
        //     this.vx = -this.vx;
        // }
        // if(this.isHitWallR()){
        //     this.vx = -this.vx;
        // }

        // // vertical movement
        // if(this.onGround()){
        //     if(press){
        //         this.powery = Math.min(this.maxpower, this.powery+this.strength); // charge up power to jump
        //     } else {
        //         this.vy = -this.powery; // changing power into vertical velocity (upward velocity is minus)
        //         this.powery = 0; // reset charged power
        //     }
        // }
        // this.y += this.vy; // change position based on velocity
        // if(!this.onGround()){
        //     this.vy += this.weight; // vt = vo + gt
        // } else {
        //     this.vy = 0; // when hit the ground, vertical velocity is 0
        // }
        // if(this.y > this.game.height - this.height) this.y = this.game.height - this.height; // corrector ground if fps is not good

    }

    draw(context){
        context.drawImage(this.image, 0*this.spriteWidth, 0*this.spriteHeight, this.spriteWidth, this.spriteHeight,  this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height;
    }
    isHitWallL(){
        return (this.x < 0);
    }
    isHitWallR(){
        return (this.x > this.game.width - this.spriteWidth);
    }
}