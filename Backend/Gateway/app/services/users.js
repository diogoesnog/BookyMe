const axios = require('axios');


module.exports.login = async (user) => {

    try {
        let res = await axios.post(`${process.env.USER_SERVICE_ENDPOINT}/user/authentication`, user);
        let cookies = res.headers['set-cookie'];
        let response = res.data;

        return {
            cookies, response
        }
    } catch(err) {
        throw err.response.data;
    }

}