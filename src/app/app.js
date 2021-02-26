import Api from './src/Api.js'

const {API_ENDPOINT} = process.env;

const userStore = document.querySelector('#user');

(async function () {
    const user = await Api(API_ENDPOINT + '/user').get()
    userStore.textContent = JSON.stringify(user, undefined, 2)
})()