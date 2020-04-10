import { Input } from "./input";

export class MouseInput extends Input {
    onClick(cb){
        this.element.addEventListener("click", cb)
    }
}