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
                delay = 800,
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
                .onGet('/columns').reply(statusCode, {
                    items: [
                        { name: 'id' },
                        { name: 'loko' },
                        { name: 'fsx' },
                        { name: 'wheels' },
                        { name: 'money' }
                    ]
                })
                .onGet('/databases').reply(statusCode, {
                    items: [
                        { name: 'mysql' },
                        { name: 'loko' },
                        { name: 'fsx' },
                        { name: 'wheels' },
                        { name: 'money' }
                    ]
                })
                .onGet('/tables').reply(statusCode, {
                    items: [
                        { name: 'columns' },
                        { name: 'profiles' },
                        { name: 'messages' },
                        { name: 'events' },
                        { name: 'groups' },
                        { name: 'users' }
                    ]
                })
        }
    }

    async getStatus() {
        const response = await this.axios.get('status')

        return response
    }

    async getDatabases() {
        const response = await this.axios.get('databases')

        return response
    }

    async getDatabasesByFilter(token) {
        const response = await this.axios.get('databases', { token })

        return response
    }

    async getTables() {
        const response = await this.axios.get('tables')

        return response
    }

    async getTablesByFilter(token) {
        const response = await this.axios.get('tables', { token })

        return response
    }
}

export default API;