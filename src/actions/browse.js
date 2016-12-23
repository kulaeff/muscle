import {
    GET_BROWSE_REQUEST,
    GET_BROWSE_SUCCESS,
    GET_BROWSE_FAIL,
    SET_FILTER_REQUEST,
    SET_FILTER_SUCCESS,
    SET_FILTER_FAIL
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

export function setFilter(token) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: SET_FILTER_REQUEST
        })

        try {
            const response = await api.setDatabasesFilter(token)

            dispatch({
                type: SET_FILTER_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: SET_FILTER_FAIL,
                payload: ex
            })
        }
    }
}