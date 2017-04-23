import axios from 'axios';

class API {
    constructor() {
        this.axios = axios.create({
            baseURL: '/api',
            responseType: 'json'
        })
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

    async getTableColumns(database, table) {
        return this.axios.get('table/columns', { params: { database, table }})
    }

    async getServer(token) {
        return this.axios.get('server', { params: { token }})
    }

    async getIndexes(database, table) {
        return this.axios.get('indexes', { params: { database, table }})
    }

    async getDatabase(name, token) {
        return this.axios.get('database', { params: { name, token }})
    }

    async saveColumn(data) {
        return this.axios.put('column', data)
    }
}

export default API;