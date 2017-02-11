import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import faker from 'faker'

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
            responseType: 'json'
        })

        if (process.env.NODE_ENV === 'prototyping') {
            const
                delay = 200,
                mock = new MockAdapter(this.axios, {
                    delayResponse: delay
                })

            mock
                .onGet('/column').reply(() => {
                    return [
                        HTTPStatusCodes.OK, {
                            name: faker.hacker.noun(),
                            type: faker.random.arrayElement([ 'int', 'varchar', 'byte', 'timestamp', 'char' ]),
                            length: faker.random.number({
                                max: 32,
                                min: 1,
                            }),
                            collation: faker.random.arrayElement([ '', 'utf8-general-ci' ]),
                            attributes: faker.random.arrayElement([ '', 'unsigned' ]),
                            null: true,
                            default: 'none',
                            extra: false
                        }]
                })
                .onPut('/column').reply(HTTPStatusCodes.OK)
                .onGet('/columns').reply(HTTPStatusCodes.OK, {
                    items: [
                        [ 'id', 'int', 5, '', 'unsigned', 'no', '', 'auto_increment' ],
                        [ 'group', 'int', 5, '', 'unsigned', 'yes', 'null', '' ],
                        [ 'title', 'varchar', 32, '', '', 'no', '', '' ],
                        [ 'createdAt', 'timestamp', null, '', '', 'no', '', '' ],
                        [ 'updatedAt', 'timestamp', null, '', '', 'no', '', '' ]
                    ]
                })
                .onGet('/rows').reply(HTTPStatusCodes.OK, {
                    columns: [ 'id', 'group', 'title', 'createdAt', 'updatedAt' ],
                    rows: [
                        [ 1, 1, 'tirtoer e', 3753452356, 1322436543 ],
                        [ 2, 1, 'sdfsdr e', 3453452356, 1352636543 ],
                        [ 3, 1, 'sdfsdfsr e', 3413452356, 1359436543 ],
                        [ 4, 1, 'sdfsdf e', 3453482356, 1352430543 ],
                        [ 5, 2, 'sdfsdfsr e', 3453752356, 1352536543 ]
                    ],
                })
                .onGet('/credentials').reply(HTTPStatusCodes.OK, {
                    user: 'test',
                    password: 'test'
                })
                .onGet('/server').reply(HTTPStatusCodes.OK, {
                    items: [
                        { name: 'mysql' },
                        { name: 'loko' },
                        { name: 'fsx' },
                        { name: 'wheels' },
                        { name: 'money' }
                    ]
                })
                .onGet('/indexes').reply(HTTPStatusCodes.OK, {
                    items: [
                        [ 'PRIMARY', 'BTREE', 'Yes', 'No', 'id', 10, 'A', 'No', '' ],
                        [ 'users_email_unique', 'BTREE', 'Yes', 'No', 'email', 10, 'A', 'No', '' ],
                        [ 'users_group_index', 'BTREE', 'Yes', 'No', 'group', 1, 'A', 'No', '' ],
                        [ 'users_status_index', 'BTREE', 'No', 'No', 'status', 1, 'A', 'No', '' ],
                        [ 'users_createdat_index', 'BTREE', 'No', 'No', 'email', 2, 'A', 'No', '' ]
                    ]
                })
                .onGet('/status/connections').reply(HTTPStatusCodes.OK, {
                    connections: {
                        upTime: 56456343445,
                        usage: 1356416,
                        connections: 364
                    }
                })
                .onGet('/status/summary').reply(HTTPStatusCodes.OK, {
                    summary: {
                        connections: 364,
                        queries: 1485,
                        upTime: 56456343445,
                        usage: 1356416,
                        user: 'root@localhost'
                    }
                })
                .onGet('/status/usage').reply(HTTPStatusCodes.OK, {
                    usage: {
                        upTime: 56456343445,
                        usage: 1356416,
                        connections: 364
                    }
                })
                .onGet('/database').reply(HTTPStatusCodes.OK, {
                    items: [
                        [ 'userProfiles', 12, 'InnoDB', 'utf8_general_ci', 12356, 0 ],
                        [ 'userMessages', 75, 'InnoDB', 'utf8_general_ci', 512459, 0 ],
                        [ 'userEvents', 18, 'InnoDB', 'utf8_general_ci', 2346244, 0 ],
                        [ 'userGroups', 3, 'InnoDB', 'utf8_general_ci', 115352, 0 ],
                        [ 'itemItems', 154, 'InnoDB', 'utf8_general_ci', 53231, 0 ]
                    ]
                })
        }
    }

    async checkCredentials(user, password) {
        return this.axios.get('credentials', { params: { user, password }})
    }

    async getStatusSummary() {
        return this.axios.get('status/summary')
    }

    async getStatusUsage() {
        return this.axios.get('status/usage')
    }

    async getStatusConnections() {
        return this.axios.get('status/connections')
    }

    /**
     * Gets column's schema with specified name
     * @func
     * @param {string} name Column's name
     */
    async getColumn() {
        return this.axios.get('column')
    }

    async getColumns(database, table) {
        return this.axios.get('columns', { params: { database, table }})
    }

    async getServer(token) {
        return this.axios.get('server', { token })
    }

    async getIndexes(database, table) {
        return this.axios.get('indexes', { params: { database, table }})
    }

    async getDatabase(database, token) {
        return this.axios.get('database', { params: { database, token }})
    }

    async saveColumn(data) {
        return this.axios.put('column', data)
    }
}

export default API;