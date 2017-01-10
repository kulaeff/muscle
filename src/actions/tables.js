import {
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL,
    SET_TABLES_WINDOW_STATE
} from '../constants/tables'

/**
 * Retrieves the list of tables
 * @func
 * @param {string} database Database name
 * @param {string} token String used to filter tables
 */
export function getTables(database, token) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_TABLES_REQUEST
        })

        try {
            const response = await api.getTables(database, token)

            dispatch({
                type: GET_TABLES_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_TABLES_FAIL,
                payload: ex
            })
        }
    }
}

/**
 * Minimizes window
 * @func
 */
export function minimizeWindow() {
    return async (dispatch) => {
        dispatch({
            type: SET_TABLES_WINDOW_STATE,
            payload: true,
        })
    }
}

/**
 * Restores window
 * @func
 */
export function restoreWindow() {
    return async (dispatch, getState) => {
        const { minimized } = getState().tables

        if (minimized) {
            dispatch({
                type: SET_TABLES_WINDOW_STATE,
                payload: false,
            })
        }
    }
}