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

    currentUser() {
        return axios.get(`${process.env.VUE_APP_API_ENDPOINT}/user/validation`, {
            headers: authHeader()
        });
    }

    uploadPhoto(id, file) {

        let fileForm = new FormData();
        fileForm.append('file', file, file.name);

        return axios.post(`${process.env.VUE_APP_API_ENDPOINT}/stores/${id}/photo`, fileForm, {
            headers: {
                ...authHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    // TODO: Add Store Description
    updateDescription(id, description) {
        // let request = new Request(`${process.env.API_ENDPOINT}/stores/${id}`);

        return axios.patch(`${process.env.VUE_APP_API_ENDPOINT}/store/${id}/description`, {
            description: description
        });
    }
    updatePhone(id, phone) {
        return axios.patch(`${process.env.VUE_APP_API_ENDPOINT}/store/${id}/phone`, {
            phone: phone
        });
    }
    updateAddress(id, address) {
        return axios.put(`${process.env.VUE_APP_API_ENDPOINT}/store/${id}/address`, address);
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