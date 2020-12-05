import axios from 'axios';

class UserService {

  registerUser(user) {

    return axios.post(`${process.env.API_ENDPOINT}/users/register`, user);

  }
}

export default new UserService();
