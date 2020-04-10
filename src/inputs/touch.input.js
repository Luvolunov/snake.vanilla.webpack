import { Input } from "./input";

export class TouchInput extends Input{
    onSwipe(cb){
        const self = this;
        let downTouch = null,
            upTouch = null;

        this.element.addEventListener("touchstart", function onStart({touches: [touch]}){

            
            downTouch = touch;

            self.element.addEventListener("touchmove", onMove);
            self.element.addEventListener("touchend", onEnd)

            
            function onMove({touches: [touch]}){
                upTouch = touch;
            }
            function onEnd(){
                self.element.removeEventListener("touchend", onEnd);
                self.element.removeEventListener("touchmove", onMove);
                cb(downTouch, upTouch);
            }
        });
    }
}