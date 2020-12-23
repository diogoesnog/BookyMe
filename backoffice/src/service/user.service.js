import axios from 'axios';

class Services {
    // TODO: Login

    register(user) {
        return axios.post(`${process.env.API_ENDPOINT}/users/login`, user);
    }

    registerStore(store) {
        // let request = new Request(`${process.env.API_ENDPOINT}/stores`);

        return axios.post(`${process.env.API_ENDPOINT}/stores`, store);
    }


    // TODO: Add Store Description
    updateDescription(id, description) {
        // let request = new Request(`${process.env.API_ENDPOINT}/stores/${id}`);

        return axios.patch(`${process.env.API_ENDPOINT}/stores/${id}/description`, {
            description: description
        });
    }

    // TODO: Add Opening Hours


    // TODO: Add Catalog


    // TODO: Upload Images
}

export default new Services();