import {
    GET_COLUMNS_REQUEST,
    GET_COLUMNS_SUCCESS,
    GET_COLUMNS_FAIL,
    GET_INDEXES_REQUEST,
    GET_INDEXES_SUCCESS,
    GET_INDEXES_FAIL,
    SET_COLUMNS_WINDOW_STATE
} from '../constants/table'

export function getColumns(database, table) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_COLUMNS_REQUEST
        })

        try {
            const response = await api.getColumns(database, table)

            dispatch({
                type: GET_COLUMNS_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_COLUMNS_FAIL,
                payload: ex
            })
        }
    }
}

export function getIndexes(database, table) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_INDEXES_REQUEST
        })

        try {
            const response = await api.getIndexes(database, table)

            dispatch({
                type: GET_INDEXES_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_INDEXES_FAIL,
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
            type: SET_COLUMNS_WINDOW_STATE,
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
        const { minimized } = getState().table

        if (minimized) {
            dispatch({
                type: SET_COLUMNS_WINDOW_STATE,
                payload: false,
            })
        }
    }
}
