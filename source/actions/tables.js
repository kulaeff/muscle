import {
    CLOSE_CREATE_TABLE_MODAL,
    CREATE_TABLE_REQUEST,
    CREATE_TABLE_SUCCESS,
    CREATE_TABLE_FAIL,
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL,
    GET_COLLATIONS_REQUEST,
    GET_COLLATIONS_SUCCESS,
    GET_COLLATIONS_FAIL,
    GET_ENGINES_REQUEST,
    GET_ENGINES_SUCCESS,
    GET_ENGINES_FAIL,
    OPEN_CREATE_TABLE_MODAL,
    SET_CURRENT_DATABASE,
    SET_TABLE_COLLATION,
    SET_TABLE_ENGINE,
    SET_TABLE_COMMENT,
    SET_TABLE_NAME
} from '../constants/tables'

/*------------------------------------------------------------------------------------*/
/* DATA                                                                               */
/*------------------------------------------------------------------------------------*/

/**
 * Create a new table
 */
export function createTable() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: CREATE_TABLE_REQUEST
        });

        const
            state = getState(),
            data = {
                collation: state.tables.tableCollation,
                comment: state.tables.tableComment,
                database: state.tables.currentDatabase,
                engine: state.tables.tableEngine,
                name: state.tables.tableName
            };

        api.createTable(data)
            .then(response => {
                dispatch({
                    type: CREATE_TABLE_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: CREATE_TABLE_FAIL,
                    payload: error
                })
            });
    }
}

/**
 * Load the list of tables
 * @param {string} database Database name
 * @param {string} token String used to filter tables
 */
export function getTables(token = '') {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_TABLES_REQUEST
        });

        const
            state = getState(),
            database = state.tables.currentDatabase;

        api.getTables(database, token)
            .then(response => {
                dispatch({
                    type: GET_TABLES_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_TABLES_FAIL,
                    payload: error
                })
            });
    }
}

/**
 * Retrieves the list of collations
 */
export function getCollations() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_COLLATIONS_REQUEST
        });

        api.getCollations()
            .then(response => {
                dispatch({
                    type: GET_COLLATIONS_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_COLLATIONS_FAIL,
                    payload: error
                })
            });
    }
}

/**
 * Retrieves the list of engines
 */
export function getEngines() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_ENGINES_REQUEST
        });

        api.getEngines()
            .then(response => {
                dispatch({
                    type: GET_ENGINES_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_ENGINES_FAIL,
                    payload: error
                })
            });
    }
}

/*------------------------------------------------------------------------------------*/
/* UI                                                                                 */
/*------------------------------------------------------------------------------------*/

/* Modals */

/**
 * Close Create Table modal
 */
export function closeCreateTableModal() {
    return {
        type: CLOSE_CREATE_TABLE_MODAL
    };
}

/**
 * Open Create Table modal
 */
export function openCreateTableModal() {
    return async (dispatch) => {
        dispatch({
            type: OPEN_CREATE_TABLE_MODAL
        });

        dispatch(getCollations());
        dispatch(getEngines());
    }
}

/* Controls */

/**
 * Stores current database
 * @param {string} collation Collation
 */
export function setCurrentDatabase(database) {
    return {
        type: SET_CURRENT_DATABASE,
        payload: database
    }
}

/**
 * Stores current table comment
 * @param {string} collation Collation
 */
export function setTableCollation(collation) {
    return {
        type: SET_TABLE_COLLATION,
        payload: collation
    }
}

/**
 * Stores current table comment
 * @param {string} comment Comment
 */
export function setTableComment(comment) {
    return async (dispatch) => {
        dispatch({
            type: SET_TABLE_COMMENT,
            payload: comment
        });
    };
}

/**
 * Stores current table engine
 * @param {string} engine Engine
 */
export function setTableEngine(engine) {
    return async (dispatch) => {
        dispatch({
            type: SET_TABLE_ENGINE,
            payload: engine
        });
    };
}

/**
 * Stores current table name
 * @param {string} name Name
 */
export function setTableName(name) {
    return async (dispatch) => {
        dispatch({
            type: SET_TABLE_NAME,
            payload: name
        });
    };
}