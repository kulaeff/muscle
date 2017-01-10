import {
    GET_DATABASES_REQUEST,
    GET_DATABASES_SUCCESS,
    GET_DATABASES_FAIL,
    SET_DATABASES_WINDOW_STATE
} from '../constants/databases'

/**
 * Retrieves the list of databases
 * @function
 * @param {string} token String used as filter
 */
export function getDatabases(token) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_DATABASES_REQUEST
        })

        try {
            const response = await api.getDatabases(token)

            dispatch({
                type: GET_DATABASES_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_DATABASES_FAIL,
                payload: ex
            })
        }
    }
}

/**
 * Minimizes window
 * @function
 */
export function minimizeWindow() {
    return async (dispatch) => {
        dispatch({
            type: SET_DATABASES_WINDOW_STATE,
            payload: true,
        })
    }
}

/**
 * Restores window
 * @function
 */
export function restoreWindow() {
    return async (dispatch, getState) => {
        const { minimized } = getState().databases

        if (minimized) {
            dispatch({
                type: SET_DATABASES_WINDOW_STATE,
                payload: false,
            })
        }
    }
}