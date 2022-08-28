export class InputHandler{
    constructor(canvasRect, canvasScale){
        this.mousedown = false;
        this.mousePos = {
            x: 0,
            y: 0
        }
        window.addEventListener('mousedown', e => {
            this.mousedown = true;
        });
        window.addEventListener('mouseup', e => {
            this.mousedown = false;
        });
        window.addEventListener('mousemove', e => {
            this.mousePos.x = (e.clientX - canvasRect.left) * canvasScale.x;
            this.mousePos.y = (e.clientY - canvasRect.top) * canvasScale.y;
            // this.mousePos.x = e.clientX
            // this.mousePos.y = e.clientY
        });
    }
}