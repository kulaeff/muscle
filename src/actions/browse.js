import {
    GET_BROWSE_REQUEST,
    GET_BROWSE_SUCCESS,
    GET_BROWSE_FAIL
} from '../constants/browse'

export function getBrowse() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_BROWSE_REQUEST
        })

        try {
            const response = await api.getBrowse()

            dispatch({
                type: GET_BROWSE_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_BROWSE_FAIL,
                payload: ex
            })
        }
    }
}