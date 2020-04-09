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


    drawLine(coords){
        for (const propName in coords){
            coords[propName] *= this.percent;
        }
        const {x1, y1, x2, y2} = coords;

        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    drawRect(metrics){
        for (const propName in metrics){
            metrics[propName] *= this.percent;
        }
        const {x, y, width, height} = metrics;
        this.context.strokeRect(x, y, width, height);
        this.context.stroke();
    }
}