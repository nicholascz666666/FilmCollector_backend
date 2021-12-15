//const LOCAL_API = 'https://fp4550.herokuapp.com/api/';
 const LOCAL_API = process.env.REACT_APP_USER_API

export const addBookmark = (filmId, userId, username, filmTitle) => {
    console.log( filmTitle);
    return fetch(`${LOCAL_API}/bookmarks/add`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({filmId, userId, username, filmTitle})
    }).then(res => res.json())
}

export const removeBookmark = (filmId, userId) => {
    return fetch(`${LOCAL_API}/bookmarks/remove`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({filmId, userId})
    }).then(res => res.json())
}

export const getBookmarksForUser = (userId) => {
    return fetch(`${LOCAL_API}/bookmarks/user/${userId}`)
        .then(res => res.json())
}

export const IsBookmark = (filmId, userId) => {
    return fetch(`${LOCAL_API}/bookmarks/currentUser/${filmId}/${userId}`)
        .then(res => res.json())
}

export const getAllBookmarks = () => {
    return fetch(`${LOCAL_API}/bookmarks/all`)
        .then(res => res.json())
}

export const getAllUsersForBookmark = (filmId) => {
    return fetch(`${LOCAL_API}/bookmarks/all/${filmId}`)
        .then(res => res.json())
}

const api = {
    IsBookmark,
    addBookmark,
    removeBookmark,
    getBookmarksForUser,
    getAllBookmarks,
    getAllUsersForBookmark
}

export default api