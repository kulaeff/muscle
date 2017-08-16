import {
    GET_COLUMNS_REQUEST,
    GET_COLUMNS_SUCCESS,
    GET_COLUMNS_FAIL,
    GET_INDEXES_REQUEST,
    GET_INDEXES_SUCCESS,
    GET_INDEXES_FAIL
} from '../constants/schema'

export function getColumns(database, table) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_COLUMNS_REQUEST
        });

        try {
            const response = await api.getTableColumns(database, table)

            dispatch({
                type: GET_COLUMNS_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_COLUMNS_FAIL,
                payload: ex
            })
        }
    }
}

export function getIndexes(database, table) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_INDEXES_REQUEST
        });

        try {
            const response = await api.getIndexes(database, table)

            dispatch({
                type: GET_INDEXES_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_INDEXES_FAIL,
                payload: ex
            })
        }
    }
}