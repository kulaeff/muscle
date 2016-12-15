import axios from 'axios';

class API {
    constructor() {
        this.axios = axios.create({
            baseURL: '/api',
            responseType: 'json',
            withCredentials: false
        })
    }

    async getSummary() {
        const response = await this.axios.get('summary.php')

        return response
    }
}

export default API;