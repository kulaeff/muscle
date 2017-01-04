import {
    GET_COLUMN_REQUEST,
    GET_COLUMN_SUCCESS,
    GET_COLUMN_FAIL
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
        } catch(ex) {
            dispatch({
                type: GET_COLUMN_FAIL,
                payload: ex
            })
        }
    }
}