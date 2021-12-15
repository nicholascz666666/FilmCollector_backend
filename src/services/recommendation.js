const LOCAL_API = 'https://fp4550.herokuapp.com/api/';
//const LOCAL_API = process.env.REACT_APP_USER_API

export const addRecommendation = (filmId, userId, username, filmTitle) => {
    return fetch(`${LOCAL_API}/recommendations/add`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({filmId, userId, username, filmTitle})
    }).then(res => res.json())
}

export const removeRecommendation = (filmId, userId) => {
    return fetch(`${LOCAL_API}/recommendations/remove`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({filmId, userId})
    }).then(res => res.json())
}

export const getRecommendationsForUser = (userId) => {
    return fetch(`${LOCAL_API}/recommendations/user/${userId}`)
        .then(res => res.json())
}

export const IsRecommendation = (filmId, userId) => {
    return fetch(`${LOCAL_API}/recommendations/currentUser/${filmId}/${userId}`)
        .then(res => res.json())
}

export const getAllRecommendations = () => {
    return fetch(`${LOCAL_API}/recommendations/all`)
        .then(res => res.json())
}

const api = {
    addRecommendation,
    removeRecommendation,
    getRecommendationsForUser,
    IsRecommendation,
    getAllRecommendations
}

export default api