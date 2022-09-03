class Plant {
    constructor(x, y, state){
        this.spriteWidth = 400;
        this.spriteHeight = 400;
        this.width = this.spriteWidth / 4;
        this.height = this.spriteHeight / 4;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = '../assets/spritesheet/object.png';

        this.frame = state;
        this.animation = 1;
    }
    update(){

    }
    draw(context){
        context.drawImage(this.image, this.frame * this.spriteWidth, this.animation * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
class Spike {
    constructor(x, y, state){
        this.spriteWidth = 400;
        this.spriteHeight = 400;
        this.width = this.spriteWidth / 4;
        this.height = this.spriteHeight / 4;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = '../assets/spritesheet/object.png';

        this.frame = state;
        this.animation = 0;
    }
    update(){

    }
    draw(context){
        context.drawImage(this.image, this.frame * this.spriteWidth, this.animation * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
export class Level {

    constructor(desc, player) {
        this.player = player;
        this.spikeList = [];
        this.plantList = [];
        desc.spike.forEach(element => {
            let spike = new Spike(element.x, element.y, element.state);
            this.spikeList.push(spike);
        });

        desc.rumput.forEach(element => {
            let rumput = new Plant(element.x, element.y, element.state);
            this.plantList.push(rumput);
        });
    }

    update() {
        this.spikeList.forEach(element => {
            element.update();
        });
        this.plantList.forEach(element => {
            element.update();
        })
        this.spikeList.forEach((element,index) => {
            if(this.collide(element.x, element.y, element.width, element.height)){
                console.log("hp-1 index: " + index);
                this.player.depleteHealth();
            }
        });

        this.plantList.forEach((element, index) => {
            if(this.collide(element.x, element.y, element.width, element.height)){
                this.player.addScore();
                this.plantList.splice(index, 1);
            }
        });

    }

    draw(context) {
        this.spikeList.forEach(element => {
            element.draw(context);
        });
        this.plantList.forEach(element => {
            element.draw(context);
        })
    
    }

    collide(x, y, w, h){
        if (
            x < this.player.x + this.player.width &&
            x + w > this.player.x &&
            y < this.player.y + this.player.height &&
            h + y > this.player.y
        ) return true;
        else return false;
    }


}

