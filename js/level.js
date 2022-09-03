import { Plant } from "./plant";
import { Spike } from "./spike";

export class Level {

    constructor(desc, player) {
        this.player = player;
        this.objList = [];
        desc.spike.forEach(element => {
            let spike = new Spike(element.x, element.y, element.state);
            this.objList.push(spike);
        });

        desc.rumput.forEach(element => {
            let rumput = new Plant(element.x, element.y, element.state);
            this.objList.push(rumput)
        });
    }


    update() {
        this.objList.forEach(element => {
            element.update();
        })
    }

    draw(context) {
        this.objList.forEach(element => {
            element.draw(context);
        })
    }
}

