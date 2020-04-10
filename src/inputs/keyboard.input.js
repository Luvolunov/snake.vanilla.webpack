import { Input } from "./input";

export class KeyboardInput extends Input{
    onKeyDown(cb){
        this.element.addEventListener("keydown", cb);
    }
}