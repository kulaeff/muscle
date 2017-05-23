import {
    GET_STATUS_CONNECTIONS_REQUEST,
    GET_STATUS_CONNECTIONS_SUCCESS,
    GET_STATUS_CONNECTIONS_FAIL
} from '../../constants/status/connections'

export function getStatusConnections() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_STATUS_CONNECTIONS_REQUEST
        })

        try {
            const response = await api.getStatusConnections()

            dispatch({
                type: GET_STATUS_CONNECTIONS_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_STATUS_CONNECTIONS_FAIL,
                payload: ex
            })
        }
    }
}