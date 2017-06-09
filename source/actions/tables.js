import {
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL,
    SET_CREATE_TABLE_MODAL_VISIBILITY,
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

/*------------------------------------------------------------------------------------*/
/* UI                                                                                 */
/*------------------------------------------------------------------------------------*/

/* Modals */

/**
 * Closes Create Database modal
 */
export function closeModalCreateTable() {
    return async (dispatch) => {
        dispatch({
            type: SET_CREATE_TABLE_MODAL_VISIBILITY,
            payload: false
        });

        dispatch(setTableName(''));
    };
}

/**
 * Shows Create Database modal
 */
export function showModalCreateTable() {
    return async (dispatch) => {
        dispatch({
            type: SET_CREATE_TABLE_MODAL_VISIBILITY,
            payload: true
        });
    };
}

/* Textboxes */

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