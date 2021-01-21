import axios from 'axios';
import authHeader from "@/service/auth-header";

class DashboardServices{
    // Dashboard
    getCurrentReservations(id){
        return axios.get(`${process.env.VUE_APP_API_ENDPOINT}/booking/current/?storeId=${id}`, {
            headers: authHeader()
        });
    }

    getCanceledReservations(id){
        return axios.get(`${process.env.VUE_APP_API_ENDPOINT}/booking/canceled/?storeId=${id}`, {
            headers: authHeader()
        } )
    }

    getConcludedReservations(id){
        return axios.get(`${process.env.VUE_APP_API_ENDPOINT}/booking/concluded/?storeId=${id}`, {
            headers: authHeader()
        } )
    }

    getReservationsConcludedCanceled(id){
        return axios.get(`${process.env.VUE_APP_API_ENDPOINT}/booking/store/id=${id}?state=concluded&canceled=true`, {
            headers: authHeader()
        })
    }

    getReservations(id){
        return axios.get(`${process.env.VUE_APP_API_ENDPOINT}/booking/store/${id}`, {
            headers: authHeader()
        });
    }

    getSlots(id){
        return axios.get(`${process.env.VUE_APP_API_ENDPOINT}/slot/store/${id}`, {
            headers: authHeader()
        });
    }
}
export default new DashboardServices();