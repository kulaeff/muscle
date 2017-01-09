import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

const HTTPStatusCodes = {
    OK: 200,
    CREATED: 201,
    BADREQUEST: 400,
    NOTFOUND: 404
}

class API {
    constructor() {
        this.axios = axios.create({
            baseURL: '/api',
            responseType: 'json',
            withCredentials: false
        })

        if (process.env.NODE_ENV === 'development') {
            const
                delay = 600,
                mock = new MockAdapter(this.axios, {
                    delayResponse: delay
                })

            mock
                .onGet('/status').reply(HTTPStatusCodes.OK, {
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
                .onGet('/column').reply(HTTPStatusCodes.OK, {
                    name: 'title',
                    type: 'int',
                    size: 5,
                    collation: '',
                    attributes: 'unsigned',
                    null: 'no',
                    default: 'none',
                    extra: ''
                })
                .onPut('/column').reply(HTTPStatusCodes.OK)
                .onGet('/columns').reply(HTTPStatusCodes.OK, {
                    items: [
                        [ 'id', 'int (5)', '', 'unsigned', 'no', 'none', 'auto_inc' ],
                        [ 'group', 'int (5)', '', 'unsigned', 'yes', 'null', '' ],
                        [ 'title', 'varchar (32)', '', '', 'no', 'none', '' ],
                        [ 'createdAt', 'timestamp', '', '', 'no', 'none', '' ],
                        [ 'updatedAt', 'timestamp', '', '', 'no', 'none', '' ]
                    ]
                })
                .onGet('/databases').reply(HTTPStatusCodes.OK, {
                    items: [
                        { name: 'mysql' },
                        { name: 'loko' },
                        { name: 'fsx' },
                        { name: 'wheels' },
                        { name: 'money' }
                    ]
                })
                .onGet('/tables').reply(HTTPStatusCodes.OK, {
                    items: [
                        [ 'userProfiles', '12', 'InnoDB', 'utf8_general_ci', '16Kb', 0 ],
                        [ 'userMessages', '75', 'InnoDB', 'utf8_general_ci', '59Kb', 0 ],
                        [ 'userEvents', '18', 'InnoDB', 'utf8_general_ci', '24Kb', 0 ],
                        [ 'userGroups', '3', 'InnoDB', 'utf8_general_ci', '12Kb', 0 ],
                        [ 'itemItems', '154', 'InnoDB', 'utf8_general_ci', '531Kb', 0 ]
                    ]
                })
        }
    }

    async getStatus() {
        const response = await this.axios.get('status')

        return response
    }

    /**
     * Gets column's schema with specified name
     * @func
     * @param {string} name Column's name
     */
    async getColumn() {
        return this.axios.get('column')
    }

    async saveColumn(data) {
        const response = await this.axios.put('column', data)

        return response
    }

    async getColumns() {
        const response = await this.axios.get('columns')

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