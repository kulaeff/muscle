import {
    GET_SUMMARY_REQUEST,
    GET_SUMMARY_SUCCESS,
    GET_SUMMARY_FAIL
} from '../constants/summary'

export function getSummary() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_SUMMARY_REQUEST
        })

        try {
            const response = await api.getSummary()

            dispatch({
                type: GET_SUMMARY_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_SUMMARY_FAIL,
                payload: ex
            })
        }
    }
}