/**
 * Class of a  film : all the attribute given by the API
 */
class Film {
    constructor({ id, url, imdb_url, title, year, score, votes, image_url, directors, actors, writers, genres }) {
        this.id = id
        this.url = url
        this.imdb_url = imdb_url
        this.title = title
        this.year = year
        this.imdb_score = score
        this.votes = votes
        this.image_url = image_url
        this.directors = directors
        this.actors = actors
        this.writers = writers
        this.genres = genres
    }
}

/**
 * Get all the movies needed in the carousel
 * @param { String } url
 * @returns { Array } allFilms
 */
export default class FilmAPI {

    constructor() {
        this.createFilms()
    }

    /**
     * Fetch the films
     * @param { String } url
     * @param { Film[] } films
     * @param { Number } nbFilms
     * @returns { Film[] } films
     */
    async fetchFilms(url, films, nbFilms = -1) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            document.film = data.results[0]
            document.Film = Film
            const newFilms = data.results.map(f => new Film(f))
            console.log(newFilms)
            films = films.concat(newFilms);
            if (data.next) {
                if (nbFilms != -1 && nbFilms > films.length) {
                    films = await this.fetchFilms(data.next, films, nbFilms);
                }
                else {
                    films = films.slice(0, nbFilms);
                    console.log(films)
                    return films;
                }
            }
            return films;
        } catch (error) {
            console.log(error);
            return []
        }
    }

    /**
    * Fetch all the genres 
    * @param { String } url
    * @returns { Object } genres 
    */
    async fetchGenres(url, genres) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            genres = data.results;
            if (data.next) {
                console.log(data.next);
                await this.fetchGenres(data.next, genres);
            }
            return genres;
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Fetch the film's url to get all the details
     * @param { String } url 
     * @returns { Object } film_details
     */
    async fetchFilm(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            let film_details = (data.results);
            return film_details;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * Fetch all the genres, the 7 bests films of 3 randoms genres and the 8 bests films all genres mixed 
     * @returns 
     */
    async createFilms() {
        let genres;
        genres = await this.fetchGenres("http://localhost:8000/api/v1/genres/", genres);
        let i;
        let filmsByGenres = {};
        for (i = 0; i < 3; i++) {
            url = "http://localhost:8000/api/v1/titles/?genre=" + genres[i].name + "&sort_by=-imdb_score";
            filmsByGenres[genres[i].name] = await this.fetchFilms(url, [], 7);
        }
        let url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
        filmsByGenres["Best"] = await this.fetchFilms(url, [], 8);
        return filmsByGenres
    }

}

