import { TouchInput } from "../inputs/touch.input";
import { MouseInput } from "../inputs/mouse.input";
import { KeyboardInput } from "../inputs/keyboard.input";

export class AppController{
    constructor(canvas, snake, fruit){
        this.steps = 20;
        this.touchInput = new TouchInput(canvas.canvas);
        this.mouseInput = new MouseInput(document.getElementById("panel"));
        this.keyboardInput = new KeyboardInput(canvas.canvas);

        window.onresize = function(){
            cnv.normalize();
        }
        canvas.canvas.onclick = () => {
            if (!canvas.isFullscreen){
                canvas.canvas.requestFullscreen();
            }
        }
        snake.onStep = (chunk) => {
            if (chunk.x === fruit.coords.x && chunk.y === fruit.coords.y){
                fruit.generate()
                snake.addChunk()
            }
        }
        snake.onDie = () => {
            snake.reset()
            alert("you are dead")
        }

        this.canvas = canvas;
        this.snake = snake;
        this.fruit = fruit;

        this.bindInputs();

        snake.setThreshold(this.steps);
        fruit.generate();

        setInterval(() => {
            this.loop()
        }, 300);
    }
    bindInputs(){
        const snake = this.snake;
        this.touchInput.onSwipe((downTouch, upTouch) => {
            const diffX = upTouch.clientX - downTouch.clientX;
            const diffY = downTouch.clientY - upTouch.clientY;
            if (Math.abs(diffX) > Math.abs(diffY)){
                if (diffX < 0){
                    snake.setDirection(3);
                    this.loop()
                } else {
                    snake.setDirection(1)
                    this.loop()
                }
            } else {
                if (diffY < 0){
                    snake.setDirection(2)
                    this.loop()
                } else {
                    snake.setDirection(0)
                    this.loop()
                }
            }
        });
        this.mouseInput.onClick((e) => {
            e.preventDefault();
            e.stopPropagation();
            const el = e.target;
            if (el.hasAttribute("data-control-up")) {
                snake.setDirection(0);
                this.loop();
            } else if (el.hasAttribute("data-control-down")){
                snake.setDirection(2);
                this.loop();
            } else if (el.hasAttribute("data-control-left")){
                snake.setDirection(3);
                this.loop();
            } else if (el.hasAttribute("data-control-right")) {
                snake.setDirection(1);
                this.loop();
            }
        });
        this.keyboardInput.onKeyDown((e) => {
            const code = e.keyCode;
            if (code === 38) {
                snake.setDirection(0);
                this.loop();
            } else if (code === 40){
                snake.setDirection(2);
                this.loop();
            } else if (code === 37){
                snake.setDirection(3);
                this.loop();
            } else if (code === 39) {
                snake.setDirection(1);
                this.loop();
            }
        })
    }
    loop(){
        this.snake.go();
        this.draw();
    }
    draw(){
        this.canvas.context.fillStyle = "#FFAE70";
        this.canvas.context.fillRect(0, 0, this.canvas.mainValue, this.canvas.mainValue);
        this.canvas.drawRect({
            x: this.fruit.coords.x * 5,
            y: this.fruit.coords.y * 5,
            width: 5,
            height: 5,
            color: this.fruit.color
        })
        this.snake.chunks.forEach(chunk => {
            this.canvas.drawRect({
                x: chunk.x * 5, 
                y: chunk.y * 5, 
                width: 5, 
                height: 5,
                color: chunk.color
            });
        });
    }
}