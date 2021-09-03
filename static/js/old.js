
async function fetchfilms(url, films, nbFilms = -1) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        films = films.concat(data.results);
        if (data.next) {
            if (nbFilms != -1 && nbFilms > films.length) {
                console.log(data.next);
                await fetchfilms(data.next, films, nbFilms);
            } else {
                let temp = films.slice(0, nbFilms)
                loadFilms(temp);
            }
        } else {
            loadFilms(films);
        }
        return films;
    } catch (error) {
        console.log(error);
        return []
    }
}

async function fetchGenres(url, genres) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        Array.from(data.results, element => {
            genres.set(element.id, element.name);
        });
        if (data.next) {
            console.log(data.next);
            await fetchGenres(data.next, genres);
        }
        return genres;
    } catch (error) {
        console.log(error);
    }
}

function loadFilms(films) {
    let elt = document.getElementsByClassName("films")[0];
    Array.from(films, element => {
        let film = document.createElement("LI");
        let textnode = document.createTextNode(element.title);
        film.appendChild(textnode);
        elt.appendChild(film);
    })
}

let url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
let genres = new Map();
let films = []
let nbFilms = 7
films = fetchfilms(url, films, nbFilms = 7);
// genres = fetchGenres("http://localhost:8000/api/v1/genres/", genres);


