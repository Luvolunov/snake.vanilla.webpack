import './index.scss'
import { CanvasController } from './models/canvas.controller'
import { SnakeController } from './models/snake.controller';
import { FruitController } from './models/fruit.controller';
import { AppController } from './models/app.controller';

const cnv = new CanvasController(document.getElementById("canvas"));
const snake = new SnakeController();
const fruit = new FruitController(snake);

const app = new AppController(cnv, snake, fruit);
