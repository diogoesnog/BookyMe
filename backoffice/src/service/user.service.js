import Requests from '../utils/Request';

export default class Services {

    register(user) {
        let request = new Request(`${process.env.API_ENDPOINT}/users/login`);
        return request.post(user);
    }
}