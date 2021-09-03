import FilmAPI from '/static/js/filmAPI.js'
//import Carousel from '/static/js/carousel.js'

let filmByGenres = new FilmAPI()
let

function listFilmTitle(films, className) {
    let ul = document.getElementsByClassName(className)[0];
    Array.from(films, element => {
        let li = document.createElement("LI");
        let textnode = document.createTextNode(element.title);
        li.appendChild(textnode);
        ul.appendChild(li);
    })
}

