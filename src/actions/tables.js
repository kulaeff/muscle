import {
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL,
    SET_TABLES_FILTER_REQUEST,
    SET_TABLES_FILTER_SUCCESS,
    SET_TABLES_FILTER_FAIL
} from '../constants/tables'

export function getTables() {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_TABLES_REQUEST
        })

        try {
            const response = await api.getTables()

            dispatch({
                type: GET_TABLES_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_TABLES_FAIL,
                payload: ex
            })
        }
    }
}

export function setTablesFilter(token) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: SET_TABLES_FILTER_REQUEST
        })

        try {
            const response = await api.getTablesByFilter(token)

            dispatch({
                type: SET_TABLES_FILTER_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: SET_TABLES_FILTER_FAIL,
                payload: ex
            })
        }
    }
}