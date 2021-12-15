const LOCAL_API = 'https://fp4550.herokuapp.com/api/';
//const LOCAL_API = process.env.REACT_APP_USER_API

export const addProducerFilm = (filmId, userId, username, filmTitle) => {
    return fetch(`${LOCAL_API}/producerFilms/add`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({filmId, userId, username, filmTitle})
    }).then(res => res.json())
}

export const removeProducerFilm = (filmId, userId) => {
    return fetch(`${LOCAL_API}/producerFilms/remove`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({filmId, userId})
    }).then(res => res.json())
}

export const getProducerFilmsForUser = (userId) => {
    return fetch(`${LOCAL_API}/producerFilms/user/${userId}`)
        .then(res => res.json())
}

export const IsProducerFilm = (filmId, userId) => {
    return fetch(`${LOCAL_API}/producerFilms/currentUser/${filmId}/${userId}`)
        .then(res => res.json())
}

export const getAllProducerFilms = () => {
    return fetch(`${LOCAL_API}/producerFilms/all`)
        .then(res => res.json())
}

const api = {
    IsProducerFilm,
    addProducerFilm,
    removeProducerFilm,
    getProducerFilmsForUser,
    getAllProducerFilms
}

export default api