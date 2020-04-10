export class CanvasController{

    get mainValue(){
        return window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
    }

    get percent(){
        return this.mainValue / 100;
    }

    constructor(canvas){
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.normalize();
    }

    normalize(){
        this.canvas.setAttribute("width", this.mainValue);
        this.canvas.setAttribute("height", this.mainValue);
    }


    drawLine({x1, y1, x2, y2}){
        x1 *= this.percent;
        y1 *= this.percent;
        x2 *= this.percent;
        y2 *= this.percent;

        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    drawRect({x, y, width, height, color}){
        x *= this.percent;
        y *= this.percent;
        width *= this.percent;
        height *= this.percent;

        if (color){
            this.context.fillStyle = color;
            this.context.fillRect(x, y, width, height);
        } 
        
        this.context.strokeRect(x, y, width, height);
        this.context.stroke();
        
    }
}