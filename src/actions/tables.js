import {
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL,
    SET_TABLES_FILTER_REQUEST,
    SET_TABLES_FILTER_SUCCESS,
    SET_TABLES_FILTER_FAIL,
    SET_TABLES_WINDOW_STATE
} from '../constants/tables'

export function getTables() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_TABLES_REQUEST,
            payload: []
        })

        try {
            const response = await api.getTables()

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
 * @function
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
 * @function
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

export function setTablesFilter(token) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: SET_TABLES_FILTER_REQUEST,
        })

        try {
            const response = await api.getTablesByFilter(token)

            dispatch({
                type: SET_TABLES_FILTER_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: SET_TABLES_FILTER_FAIL,
                payload: ex
            })
        }
    }
}