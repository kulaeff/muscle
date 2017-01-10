import {
    GET_SETTINGS_REQUEST,
    GET_SETTINGS_SUCCESS,
    GET_SETTINGS_FAIL
} from '../constants/settings'

export function getSettings() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_SETTINGS_REQUEST
        })

        try {
            const response = await api.getStatus()

            dispatch({
                type: GET_SETTINGS_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_SETTINGS_FAIL,
                payload: ex
            })
        }
    }
}