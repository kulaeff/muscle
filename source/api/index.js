import axios from 'axios';

class API {
    constructor() {
        const
            user = sessionStorage.getItem('user'),
            password = sessionStorage.getItem('password');

        let axiosOptions = {
            baseURL: '/api/v1',
            responseType: 'json'
        };

        if (user !== null && password !== null) {
            axiosOptions = {
                ...axiosOptions,
                auth: {
                    username: user,
                    password
                }
            };
        }

        this.axios = axios.create(axiosOptions);
    }

    async checkCredentials(user, password) {
        return this.axios.post('credentials', { user, password })
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
     * Creates a database with specified name
     * @function
     * @param {string} data Table data (schema)
     * @returns {Promise<AxiosPromise>.<object>}
     */
    async createTable(data) {
        return this.axios.post('tables', data);
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

    async getColumns(database, table) {
        return this.axios.get(`databases/${database}/tables/${table}/columns`)
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

    async getRows(database, table) {
        return this.axios.get(`databases/${database}/tables/${table}/rows`)
    }

    async getTables(database, token) {
        return this.axios.get(`databases/${database}/tables`, { params: { token }})
    }

    async saveColumn(data) {
        return this.axios.put('column', data)
    }

    async getCollations() {
        return this.axios.get('collations')
    }

    async getEngines() {
        return this.axios.get('engines')
    }
}

export default API;