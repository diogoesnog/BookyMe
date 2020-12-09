import Request from '../utils/Request';
export default {
    login: (user) => {
        let request = new Request(`${process.env.API_ENDPOINT}/users/login`);

        return request.post(user)
            .then(response => {
                let headers = response.headers;
                let data = response.data;
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