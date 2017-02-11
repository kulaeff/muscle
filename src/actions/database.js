import {
    GET_DATABASE_REQUEST,
    GET_DATABASE_SUCCESS,
    GET_DATABASE_FAIL,
    SET_DATABASE_WINDOW_STATE
} from '../constants/database'

/**
 * Retrieves the list of tables
 * @func
 * @param {string} database Database name
 * @param {string} token String used to filter tables
 */
export function getDatabase(database, token) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_DATABASE_REQUEST
        })

        try {
            const response = await api.getDatabase(database, token)

            dispatch({
                type: GET_DATABASE_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_DATABASE_FAIL,
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
            type: SET_DATABASE_WINDOW_STATE,
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
        const { minimized } = getState().database

        if (minimized) {
            dispatch({
                type: SET_DATABASE_WINDOW_STATE,
                payload: false,
            })
        }
    }
}