import { fromEvent, Observable, retry, switchMap, scan, delay, takeWhile } from "rxjs";

interface IMovie {
    title: string;
}

let button = document.getElementById("button");
let output = document.getElementById("output");

let click = fromEvent(button, "click");

function load(url: string): Observable<any> {

    return new Observable(Subscriber => {
        let xhr = new XMLHttpRequest();
        output.innerHTML = '';

        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);

                Subscriber.next(data);
                Subscriber.complete();
            } else {
                Subscriber.error(xhr.statusText)
            }
        })

        xhr.open('GET', url)
        xhr.send();
    }).pipe(
        retry({ count: 3, delay: 1000 })

        // retryWhen(retryStrategy())
    )

}

function retryStrategy(attempt = 4, timeDelay = 1000) {
    return (errors: Observable<any>) => {
        return errors.pipe(
            scan((acc, value) => {
                return acc + 1
            }, 0),
            takeWhile(acc => acc < attempt),
            delay(timeDelay)
        )
    }
}

function renderMovies(movies: IMovie[]) {
    movies.forEach((movie: IMovie) => {
        let div = document.createElement("div");
        div.innerText = movie.title;
        output.appendChild(div);
    })
}

click.pipe(
    switchMap(() => load('./movies.json'))
).subscribe({
    next: renderMovies,
    error: (e: Error) => console.log(`Error ${e}`),
    complete: () => console.log('complete'),
})