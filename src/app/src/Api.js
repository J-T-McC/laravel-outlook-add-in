'use strict';

export default function Api(
    path,
    options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }) {

    const token = window.localStorage.getItem('access_token')

    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': 'Bearer ' + token,
        }
    }

    const get = async () => {
        const response = await fetch(path, options)
        if(response.status === 401) {
            window.localStorage.removeItem('access_token')
            window.location.replace('https://localhost:3000/taskpane.html')
        }
        else {
            return response.json()
        }
    }

    return {
        get
    }
}