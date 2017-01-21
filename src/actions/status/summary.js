import {
    GET_STATUS_SUMMARY_REQUEST,
    GET_STATUS_SUMMARY_SUCCESS,
    GET_STATUS_SUMMARY_FAIL
} from '../../constants/status/summary'

export function getStatusSummary() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_STATUS_SUMMARY_REQUEST
        })

        try {
            const response = await api.getStatusSummary()

            dispatch({
                type: GET_STATUS_SUMMARY_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_STATUS_SUMMARY_FAIL,
                payload: ex
            })
        }
    }
}