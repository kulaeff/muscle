import {
    ADD_TABLE_FIELD,
    CLOSE_CREATE_TABLE_MODAL,
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
    REMOVE_TABLE_FIELD,
    SET_LISTBOX_FIELDS_SELECTED_INDEX,
    SET_TABLE_COLLATION,
    SET_TABLE_ENGINE,
    SET_TABLE_COMMENT,
    SET_TABLE_NAME
} from '../constants/tables'

/*------------------------------------------------------------------------------------*/
/* DATA                                                                               */
/*------------------------------------------------------------------------------------*/

/**
 * Retrieves the list of tables
 * @param {string} database Database name
 * @param {string} token String used to filter tables
 */
export function getTables(database, token = '') {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_TABLES_REQUEST
        });

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
 * CreateTableModal:ListBoxFields
 * Add a new field to the list box
 */
export function addTableField() {
    return async (dispatch, getState) => {
        const
            state = getState().tables,
            [...fields] = state.tableFields;

        fields.push({
            attributes: '',
            autoIncrement: false,
            collation: '',
            comment: '',
            default: '',
            index: '',
            length: null,
            name: `field_${state.tableFieldCounter}`,
            type: 'int'
        });

        dispatch({
            type: ADD_TABLE_FIELD,
            payload: fields
        });
    };
}

/**
 * CreateTableModal:ListBoxFields
 * Remove the field from the list box
 */
export function removeTableField() {
    return async (dispatch, getState) => {
        const
            state = getState().tables,
            [...fields] = state.tableFields;

        fields.splice(state.listBoxFieldsSelectedIndex, 1);

        dispatch({
            type: REMOVE_TABLE_FIELD,
            payload: fields
        });
    };
}

/**
 * CreateTableModal:ListBoxFields
 * Set the index of a selected field
 * @param {number} index Index of a selected field
 */
export function setListBoxFieldsSelectedIndex(index) {
    return async (dispatch) => {
        dispatch({
            type: SET_LISTBOX_FIELDS_SELECTED_INDEX,
            payload: index
        });
    };
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