import cookies from 'vue-cookies';
import axios from 'axios';

export default {
  login: (user) => {
    return axios.post(`${process.env.API_ENDPOINT}/users/login`, user)
      .then(response => {
        let headers = response.headers;
        let data = response.data;

        let cookie = headers.Authorization || headers.authorization;

        cookies.set('Authorization', cookie);

        localStorage.setItem('user', JSON.stringify(data));

      });
  },

  logout: () => {
    cookies.remove('Authorization');
    // TODO: Redirect to login
  }
}
