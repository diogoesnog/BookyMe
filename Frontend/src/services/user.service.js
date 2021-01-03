import axios from 'axios';
import authHeader from './auth-header'

class UserService {

  registerUser(user) {
    return axios.post(`${process.env.API_ENDPOINT}/users/register`, user);
  }

  getCategories() {
    return axios.get(`${process.env.API_ENDPOINT}/stores/categories`);
  }

  getFavorites() {
    console.log(authHeader());
    return axios.get(`${process.env.API_ENDPOINT}/users/favorite`, {
      headers: authHeader()
    });
  }

  getStores() {
    return axios.get(`${process.env.API_ENDPOINT}/stores/`, {
      header: authHeader()
    })
  }

  postWithHeaders(data) {
    return axios.post('url', data, {
      headers: authHeader()
    });
  }

  getWithHeaders() {
    return axios.get('url', {
      headers: authHeader()
    })
  }
}

export default new UserService();
