require('dotenv').config()

export const findFilmByTitle = (title) =>
    // fetch(`https://www.googleapis.com/Films/v1/volumes?q=${title}`)
    //     .then(response => response.json());
    fetch('http://www.omdbapi.com/?apikey=e5a4694e&t=' + title)
        .then(response => response.json());

export function findFilmById(filmId) {
    // let API_URL = 'https://www.googleapis.com/Films/v1/volumes/' + filmId
    // return fetch(API_URL)
    //     .then(response => response.json())
    let API_URL = 'http://www.omdbapi.com/?apikey=e5a4694e&i=' + filmId
    return fetch(API_URL)
        .then(response => response.json())
}

const api = {
    findFilmByTitle,
    findFilmById
}

export default api;
