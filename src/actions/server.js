import {
    GET_SERVER_REQUEST,
    GET_SERVER_SUCCESS,
    GET_SERVER_FAIL,
    CREATE_DATABASE_REQUEST,
    CREATE_DATABASE_SUCCESS,
    CREATE_DATABASE_FAIL,
    SET_SERVER_WINDOW_STATE
} from '../constants/server'

/**
 * Retrieves the list of SERVER
 * @function
 * @param {string} token String used as filter
 */
export function getServer(token = '') {
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
 * Creates the database with specified name
 * @function
 * @param {string} name Database name
 */
export function createDatabase(name) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: CREATE_DATABASE_REQUEST
        })

        try {
            const response = await api.createDatabase(name)

            dispatch({
                type: CREATE_DATABASE_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: CREATE_DATABASE_FAIL,
                payload: ex
            })
        }
    }
}
/*------------------------------------------------------------------------------------*/
/* UI                                                                                 */
/*------------------------------------------------------------------------------------*/
/**
 *
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