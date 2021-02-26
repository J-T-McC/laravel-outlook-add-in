const {OAUTH_ENDPOINT} = process.env;
const hash = window.location.hash;
if (!hash) {
    window.location.replace(OAUTH_ENDPOINT);
} else {
    const urlParams = new URLSearchParams(hash.replace('#access_token', '?access_token'))
    if (urlParams.has('access_token')) {
        window.localStorage.setItem('access_token', urlParams.get('access_token'))
    }
    window.close()
}
