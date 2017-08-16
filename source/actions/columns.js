import {
    GET_COLUMNS_REQUEST,
    GET_COLUMNS_SUCCESS,
    GET_COLUMNS_FAIL
} from '../constants/columns'

export function getColumns(database, table) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_COLUMNS_REQUEST
        });

        try {
            const response = await api.getColumns(database, table);

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