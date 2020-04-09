export class SnakeController{
    constructor(threshold){
        this.threshold = threshold;
        this.chunks = [{x: 1, y: 0}, {x: 0, y: 0}];
        this.direction = 1;
    }

    addChunk(){
        const chunk = {};
        const lastChunk = this.chunks[this.chunks.length - 1];
        chunk.x = lastChunk.x;
        chunk.y = lastChunk.y;
        this.chunks.push(chunk);
    }

    go(){
        for (let i = this.chunks.length - 1; i > 0; --i){
            const prevChunk = this.chunks[i];
            const nextChunk = this.chunks[i - 1];
            prevChunk.x = nextChunk.x;
            prevChunk.y = nextChunk.y;
        }
        const chunk = this.chunks[0];

        if (chunk.x === this.threshold - 1 && this.direction === 1){
            chunk.x = 0;
        } else if (chunk.x === 0 && this.direction === 3) {
            chunk.x = this.threshold - 1;
        } else {
            chunk.x += this.direction === 1 ? 1: this.direction === 3 ? -1: 0;
        }

        if (chunk.y === this.threshold - 1 && this.direction === 2){
            chunk.y = 0;
        } else if (chunk.y === 0 && this.direction === 0) {
            chunk.y = this.threshold - 1;
        } else {
            chunk.y += this.direction === 2 ? 1: this.direction === 0 ? -1: 0;
        }
    }

    setDirection(num){
        if ((this.direction === num)            ||
            (this.direction === 0 && num === 2) ||
            (this.direction === 2 && num === 0) ||
            (this.direction === 1 && num === 3) ||
            (this.direction === 3 && num === 1)) return;
        this.direction = num;
    }
}