import { Input } from "./input";

export class KeyboardInput extends Input{
    onKeyDown(cb){
        document.addEventListener("keydown", cb);
    }
}