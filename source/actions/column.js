import {
    GET_COLUMN_REQUEST,
    GET_COLUMN_SUCCESS,
    GET_COLUMN_FAIL,
    SAVE_COLUMN_REQUEST,
    SAVE_COLUMN_SUCCESS,
    SAVE_COLUMN_FAIL
} from '../constants/column'

export function getColumn() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_COLUMN_REQUEST
        })

        try {
            const response = await api.getColumn()

            dispatch({
                type: GET_COLUMN_SUCCESS,
                payload: response.data
            })
        } catch(error) {
            dispatch({
                type: GET_COLUMN_FAIL,
                payload: error
            })
        }
    }
}

export function saveColumn(data) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: SAVE_COLUMN_REQUEST
        })

        try {
            const response = await api.saveColumn(data)

            dispatch({
                type: SAVE_COLUMN_SUCCESS,
                payload: response.status
            })
        } catch(ex) {
            dispatch({
                type: SAVE_COLUMN_FAIL,
                payload: ex
            })
        }
    }
}