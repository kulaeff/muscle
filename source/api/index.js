import axios from 'axios';

class API {
    constructor() {
        this.axios = axios.create({
            baseURL: '/api/v1',
            responseType: 'json'
        })
    }

    async checkCredentials(user, password) {
        return this.axios.get('credentials', { params: { user, password }})
    }

    /**
     * Creates a database with specified name
     * @function
     * @param {string} name Database's name
     * @returns {Promise<AxiosPromise>}
     */
    async createDatabase(name) {
        return this.axios.post('databases', { name });
    }

    /**
     * Deletes a database with specified name
     * @param {string} name Database's name
     * @returns {Promise<AxiosPromise>}
     */
    async deleteDatabase(name) {
        return this.axios.delete(`databases/${name}`);
    }

    /**
     * Updates a database with specified name
     * @param {string} name Database's name
     * @returns {Promise<AxiosPromise>}
     */
    async updateDatabase(oldName, newName) {
        return this.axios.patch(`databases/${oldName}`, { name: newName });
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

    async getDatabases(token) {
        return this.axios.get('databases', { params: { token }})
    }

    async getDatabase(name) {
        return this.axios.get(`databases/${name}`)
    }

    async getIndexes(database, table) {
        return this.axios.get('indexes', { params: { database, table }})
    }

    async getDatabaseTables(name, token) {
        return this.axios.get(`databases/${name}/tables`, { params: { token }})
    }

    async saveColumn(data) {
        return this.axios.put('column', data)
    }
}

export default API;