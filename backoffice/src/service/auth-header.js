
import cookie from 'vue-cookies';

export default function authHeader() {
    //let user = JSON.parse(localStorage.getItem('user'));
    let token = cookie.get('Authorization');

    //console.log('Localstorage user: ' + user)
    if(token) {
        return {
            'Authorization': token
        }
    } else {
        return { };
    }
}