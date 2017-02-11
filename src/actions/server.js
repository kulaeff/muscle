import {
    GET_SERVER_REQUEST,
    GET_SERVER_SUCCESS,
    GET_SERVER_FAIL,
    SET_SERVER_WINDOW_STATE
} from '../constants/server'

/**
 * Retrieves the list of SERVER
 * @function
 * @param {string} token String used as filter
 */
export function getServer(token) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_SERVER_REQUEST
        })

        try {
            const response = await api.getServer(token)

            dispatch({
                type: GET_SERVER_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_SERVER_FAIL,
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
            type: SET_SERVER_WINDOW_STATE,
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
        const { minimized } = getState().server

        if (minimized) {
            dispatch({
                type: SET_SERVER_WINDOW_STATE,
                payload: false,
            })
        }
    }
}