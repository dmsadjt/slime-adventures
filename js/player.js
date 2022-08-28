export class Player {
    constructor(game){
        this.game = game;
        this.spriteWidth = 204.8;
        this.spriteHeight = 204.8;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = (this.game.width - this.spriteWidth)/2;
        this.y = this.game.height - this.spriteHeight;
        // this.charx = this.x + this.width/2;
        // this.chary = this.y + this.height/2;
        this.image = new Image();
        this.image.src = '../assets/char.png';

        this.power = 0; // power to jump (y axis)
        this.strength = 1; // how much power increase per frame
        this.maxpower = 50; // maximum power can be
        this.vy = 0; // vertical velocity of character
        this.vx = 0; // horizontal velocity of character
        this.weight = 1.5; // gravity acceleration = 1, gravity force = 1 * weight
        this.anglerad = 45 * Math.PI / 180; // to which angle character will launch
        this.groundFriction = 0.5; // what makes horizontal velocity stop

        this.mousex = 0;
        this.mousey = 0;
    }
    update(press, mousePos){
        if(this.onGround()){
            if(press){
                this.vx = 0;
                this.vy = 0;
                this.power = Math.min(this.maxpower, this.power+this.strength); // charge up power to jump
                
            } else {
                // sistem sudut pake jump king, cuman berdasarkan arah aja kanan-kiri-atas
                // let dotprod = this.dotproduct(this.x + this.width/2 + 1, this.y + this.height/2, this.mousex, this.mousey);
                // if(dotprod > -this.width/2 && dotprod < this.width/2){
                //     this.anglerad = 2 * 45 * Math.PI / 180;;
                // } else if(dotprod-this.width/2 < 0){
                //     this.anglerad = 3 * 45 * Math.PI / 180;
                // } else {
                //     this.anglerad = 45 * Math.PI / 180;
                // }

                // sistem angle berdasarkan posisi mouse, character akan loncat ke arah mouse
                this.anglerad = this.getangle(this.x + this.width/2 + 1, this.y + this.height/2, this.mousex, this.mousey);

                this.vy = -this.power * Math.sin(this.anglerad);
                this.vx = this.power * Math.cos(this.anglerad);
                this.power = 0; // reset charged power
            }
        }

        
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
            // this.vx = Math.max(0, this.vx-this.groundFriction); // not working ?
        }
        if(this.y > this.game.height - this.height) this.y = this.game.height - this.height; // corrector ground if fps is not good

        this.mousex = mousePos.x;
        this.mousey = mousePos.y;
        document.getElementById("powergauge").innerHTML = this.power;
        document.getElementById("angle").innerHTML = this.anglerad;
        document.getElementById("charx").innerHTML = this.x + this.width/2;
        document.getElementById("chary").innerHTML = this.y + this.height/2;
        document.getElementById("mousex").innerHTML = this.mousex;
        document.getElementById("mousey").innerHTML = this.mousey;
    }

    draw(context){
        context.drawImage(this.image, 0*this.spriteWidth, 0*this.spriteHeight, this.spriteWidth, this.spriteHeight,  this.x, this.y, this.width, this.height);
        context.fillRect(this.x + this.width/2, 0, 1, this.game.height); // garis di tengah character
        context.fillRect(this.mousex, this.mousey, 8, 8); // garis horizontal di posisi mouse
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
    dotproduct(ax, ay, bx, by){
        return ax*bx + ay*by;
    }
    vectorlen(x, y){
        return Math.sqrt(x*x + y*y);
    }
    getangle(ax, ay, bx, by){
        ax -= (this.x + this.width/2);
        bx -= (this.x + this.width/2);
        ay -= (this.y + this.height/2);
        by -= (this.y + this.height/2);
        return Math.acos(this.dotproduct(ax, ay, bx, by)/(this.vectorlen(ax, ay) * this.vectorlen(bx, by)));
    }
}