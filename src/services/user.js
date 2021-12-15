const USER_API = "https://fp4550.herokuapp.com/api/";
//const USER_API = process.env.REACT_APP_USER_API

export const register = (username, password, fullName, email, role) => {
    return fetch(`${USER_API}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({username, password, fullName, email, role})
    }).then(response => response.json());
}

export const login = (username, password) => {
    return fetch(`${USER_API}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then(response => response.json());
}

export const updateUser = (body) => {
    return fetch(`${USER_API}/profile/update`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(response => response.json());
}

export const fetchProfile = () => {
    return fetch(`${USER_API}/profile`, {
        credentials: 'include'
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            return undefined
        }
    })
}

export const logout = () => {
    return fetch(`${USER_API}/logout`, {
        method: 'POST',
        credentials: 'include'
    });
}

export const findAllUsers = () => {
     return fetch(`${USER_API}/users`)
        .then(response => response.json())
}

export const findAllProducers = () => {
    return fetch(`${USER_API}/users/producers`)
        .then(response => response.json())
}

export const findAllClients = () => {
    return fetch(`${USER_API}/users/clients`)
        .then(response => response.json())
}

export const findAllAdmins = () => {
    return fetch(`${USER_API}/users/admins`)
        .then(response => response.json())
}

export const findUserById = (uid) => {
    return fetch(`${USER_API}/users/${uid}`)
        .then(response => response.json())
}

const api = {
    login,
    register,
    logout,
    fetchProfile,
    updateUser,
    findAllUsers,
    findUserById,
    findAllProducers,
    findAllClients,
    findAllAdmins
}

export default api;