export class Spike {
    constructor(game, x, y){
        this.game = game;
        this.spriteWidth = 400;
        this.spriteHeight = 400;
        this.width = this.spriteWidth / 4;
        this.height = this.spriteHeight / 4;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = '../assets/spritesheet/object.png';

        this.frame = 0;
        this.animation = 0;
    }
    update(){

    }
    draw(context){
        context.drawImage(this.image, this.frame * this.spriteWidth, this.animation * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}