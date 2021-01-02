import axios from 'axios';
import authHeader from "@/service/auth-header";

class Services {
    // TODO: Login

    register(user) {
        return axios.post(`${process.env.VUE_APP_API_ENDPOINT}/users/login`, user);
    }

    registerStore(store) {
        // let request = new Request(`${process.env.API_ENDPOINT}/stores`);

        return axios.post(`${process.env.VUE_APP_API_ENDPOINT}/stores`, store);
    }


    // TODO: Add Store Description
    updateDescription(id, description) {
        // let request = new Request(`${process.env.API_ENDPOINT}/stores/${id}`);

        return axios.patch(`${process.env.VUE_APP_API_ENDPOINT}/stores/${id}/description`, {
            description: description
        });
    }

    getStores() {
        return axios.get(`${process.env.VUE_APP_API_ENDPOINT}/stores/admin`, {
            headers: authHeader()
        });
    }

    getStoreById(id) {
        return axios.get(`${process.env.VUE_APP_API_ENDPOINT}/stores?_id=${id}`, {
            headers: authHeader()
        });
    }

    // TODO: Add Opening Hours


    // TODO: Add Catalog


    // TODO: Upload Images
}

export default new Services();