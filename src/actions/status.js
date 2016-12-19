import {
    GET_STATUS_REQUEST,
    GET_STATUS_SUCCESS,
    GET_STATUS_FAIL
} from '../constants/status'

export function getStatus() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_STATUS_REQUEST
        })

        try {
            const response = await api.getSTATUS()

            dispatch({
                type: GET_STATUS_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_STATUS_FAIL,
                payload: ex
            })
        }
    }
}