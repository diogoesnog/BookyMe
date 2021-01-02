export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = this.$cookies.get('Authorization');

    if(token && user) {
        return {
            'Authorization': token
        }
    } else {
        return { };
    }
}