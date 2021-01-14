import axios from 'axios';
import cookies from 'vue-cookies'

export default {
    login: (user) => {
        return axios.post(`${process.env.VUE_APP_API_ENDPOINT}/users/login`, user)
            .then(response => {
                let headers = response.headers;
                let data = response.data[ "data" ];

                let cookie = headers.Authorization || headers.authorization;

                cookies.set('Authorization', cookie, "1h");

                localStorage.setItem('stores', JSON.stringify(data.user.stores.length));

                return data.user;
            });
    },

    logout: () => {
        cookies.remove('Authorization');
        localStorage.removeItem("stores");
    }
}