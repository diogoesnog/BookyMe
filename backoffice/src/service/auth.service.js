import axios from 'axios';

export default {
    login: (user) => {
        return axios.post(`${process.env.API_ENDPOINT}/users/login`, user)
            .then(response => {
                let headers = response.headers;
                let data = response.data.data;
                console.log("Auth Service - Setting Cookies");
                console.log(data);
                let cookie = headers.Authorization || headers.authorization;

                this.$cookies.set('Authorization', cookie);

                localStorage.setItem('user', JSON.stringify(data.user));

            });
    },

    logout: () => {
        this.$cookies.remove('Authorization');
        // TODO: Redirect to login
    }
}