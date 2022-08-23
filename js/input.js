export class InputHandler{
    constructor(){
        this.mousedown = false;
        this.mousex = 0;
        window.addEventListener('mousedown', e => {
            this.mousedown = true;
        });
        window.addEventListener('mouseup', e => {
            this.mousedown = false;
        });
        window.addEventListener('mousemove', e => {
            this.mousex = e.clientX;
        });
    }
}