import axios from 'axios';

class API {
    constructor() {
        this.axios = axios.create({
            baseURL: '/api/v1',
            responseType: 'json',
            withCredentials: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    async getSummary() {
        const response = await this.axios.get('summary.php')

        return response
    }
}

export default API;