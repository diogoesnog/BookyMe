import cookie from 'vue-cookies';
import axios from 'axios';

export default {
  login: (user) => {
    return axios.post(`${process.env.API_ENDPOINT}/users/login`, user)
      .then(response => {
        // TODO: Check headers for Token
        console.log(response.data);

        console.log(response.headers);
        // TODO: Save common data on local storage
      }).catch(err => {
        // TODO: Handle Error
        console.log(err.response);
      });
  },

  logout: () => {
    cookie.remove('userToken');
    // TODO: Redirect to login
  }
}
