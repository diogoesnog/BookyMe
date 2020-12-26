import axios from 'axios';
import cookies from 'vue-cookies'

export default {
    login: (user) => {
        return axios.post(`${process.env.VUE_APP_API_ENDPOINT}/users/login`, user)
            .then(response => {
                let headers = response.headers;
                let data = response.data.data;
                console.log("Auth Service - Setting Cookies");
                console.log(data);
                let cookie = headers.Authorization || headers.authorization;

                cookies.set('Authorization', cookie);

                localStorage.setItem('user', JSON.stringify(data.user));

            });
    },

    logout: () => {
        cookies.remove('Authorization');
        // TODO: Redirect to login
    }
}