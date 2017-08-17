import {
    GET_ROWS_REQUEST,
    GET_ROWS_SUCCESS,
    GET_ROWS_FAIL
} from '../constants/rows'

export function getRows(database, table) {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_ROWS_REQUEST
        });

        try {
            const response = await api.getColumns(database, table);

            dispatch({
                type: GET_ROWS_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_ROWS_FAIL,
                payload: ex
            })
        }
    }
}