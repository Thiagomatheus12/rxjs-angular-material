import { fromEvent } from "rxjs";
import { map, filter, delay } from "rxjs/operators";

interface mouseTrack {
    x: number;
    y: number;
}

let circle = document.getElementById('circle');

let source = fromEvent(document, 'mousemove').pipe(
    map((e: MouseEvent) => {
        return {x: e.clientX, y: e.clientY}
    }),
    filter((value: mouseTrack) => value.x < 500),
    delay(1000)
)

function onNext(value: mouseTrack) {
    console.log(value);
    circle.style.left = `${value.x}px`;
    circle.style.top = `${value.y}px`;
    
}

source.subscribe({
    next: (value: mouseTrack) => onNext(value),
    error: (e: Error) => console.log(e),
    complete: () => console.log(),
})