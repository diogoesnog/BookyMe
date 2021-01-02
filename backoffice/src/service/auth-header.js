
import cookie from 'vue-cookies';

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = cookie.get('Authorization');

    if(token && user) {
        return {
            'Authorization': token
        }
    } else {
        return { };
    }
}