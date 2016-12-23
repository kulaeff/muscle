import {
    GET_DATABASES_REQUEST,
    GET_DATABASES_SUCCESS,
    GET_DATABASES_FAIL,
    SET_FILTER_REQUEST,
    SET_FILTER_SUCCESS,
    SET_FILTER_FAIL
} from '../constants/databases'

export function getDatabases() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_DATABASES_REQUEST
        })

        try {
            const response = await api.getDatabases()

            dispatch({
                type: GET_DATABASES_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_DATABASES_FAIL,
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