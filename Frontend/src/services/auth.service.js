import cookie from 'vue-cookies';
import axios from 'axios';

export default {
  login: (user) => {
    return axios.post(`${process.env.API_ENDPOINT}`, user)
      .then(response => {
        // TODO: Check headers for Token
        console.log(response.data);

        // TODO: Save common data on local storage
      }).catch(err => {
        // TODO: Handle Error
      });
  },

  logout: () => {
    cookie.remove('userToken');
    // TODO: Redirect to login
  }
}
