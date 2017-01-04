import {
    GET_DATABASES_REQUEST,
    GET_DATABASES_SUCCESS,
    GET_DATABASES_FAIL,
    SET_DATABASES_FILTER_REQUEST,
    SET_DATABASES_FILTER_SUCCESS,
    SET_DATABASES_FILTER_FAIL,
    SET_DATABASES_WINDOW_STATE
} from '../constants/databases'

/**
 * Gets databases
 * @function
 */
export function getDatabases() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_DATABASES_REQUEST
        })

        try {
            const response = await api.getDatabases()

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

/**
 * Gets databases filtered by token
 * @function
 * @param {string} token A string as a filter
 */
export function setDatabasesFilter(token) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: SET_DATABASES_FILTER_REQUEST
        })

        try {
            const response = await api.getDatabasesByFilter(token)

            dispatch({
                type: SET_DATABASES_FILTER_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: SET_DATABASES_FILTER_FAIL,
                payload: ex
            })
        }
    }
}