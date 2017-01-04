import {
    GET_COLUMNS_REQUEST,
    GET_COLUMNS_SUCCESS,
    GET_COLUMNS_FAIL,
    SET_COLUMNS_WINDOW_STATE
} from '../constants/columns'

export function getColumns() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_COLUMNS_REQUEST
        })

        try {
            const response = await api.getColumns()

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
        const { minimized } = getState().columns

        if (minimized) {
            dispatch({
                type: SET_COLUMNS_WINDOW_STATE,
                payload: false,
            })
        }
    }
}
