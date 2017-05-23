import {
    GET_STATUS_USAGE_REQUEST,
    GET_STATUS_USAGE_SUCCESS,
    GET_STATUS_USAGE_FAIL
} from '../../constants/status/usage'

export function getStatusUsage() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_STATUS_USAGE_REQUEST
        })

        try {
            const response = await api.getStatusUsage()

            dispatch({
                type: GET_STATUS_USAGE_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_STATUS_USAGE_FAIL,
                payload: ex
            })
        }
    }
}