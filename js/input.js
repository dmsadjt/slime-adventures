export class InputHandler{
    constructor(){
        this.mousedown = false;
        window.addEventListener('mousedown', e => {
            this.mousedown = true;
        });
        window.addEventListener('mouseup', e => {
            this.mousedown = false;
        });
    }
}