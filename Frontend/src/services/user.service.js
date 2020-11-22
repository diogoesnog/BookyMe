import axios from 'axios';

class UserService {

  registerUser(user) {
    return axios.post(`http://localhost:5200/v1/api/user/register`, user);
  }
}

export default new UserService();
