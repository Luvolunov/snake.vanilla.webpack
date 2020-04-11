export class FruitController{
    constructor(snake){
        this.snake = snake;
        this.coords = {x: null, y: null}
        this.color = "yellow"
    }
    generate(){
        let x = 0, y = 0;
        do {
            x = Math.round(Math.random() * (this.snake.threshold - 1));
            y = Math.round(Math.random() * (this.snake.threshold - 1));
        } while (!!this.snake.chunks.find(c => c.x === x && c.y === y))


        this.coords = {x, y};
    }
}