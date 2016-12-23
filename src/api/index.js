import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

class API {
    constructor() {
        this.axios = axios.create({
            baseURL: '/api',
            responseType: 'json',
            withCredentials: false
        })

        if (process.env.NODE_ENV === 'development') {
            const
                statusCode = 200,
                delay = 500,
                mock = new MockAdapter(this.axios, {
                    delayResponse: delay
                })

            mock
                .onGet('/status').reply(statusCode, {
                    server: {
                        upTime: 56456343445,
                        usage: {
                            received: 245,
                            sent: 129,
                            total: 416
                        },
                        connections: {
                            aborted: 6,
                            failed: 25,
                            total: 364
                        }
                    }
                })
                .onGet('/browse').replyOnce(statusCode, {
                    items: [
                        { name: 'mysql' },
                        { name: 'loko' },
                        { name: 'fsx' },
                        { name: 'wheels' },
                        { name: 'money' }
                    ]
                })
        }
    }

    async getStatus() {
        const response = await this.axios.get('status')

        return response
    }

    async getBrowse() {
        const response = await this.axios.get('browse')

        return response
    }

    async setDatabasesFilter(token) {
        const response = await this.axios.get('browse', { token })

        return response
    }
}

export default API;