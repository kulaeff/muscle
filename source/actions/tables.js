import {
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL
} from '../constants/tables'

/*------------------------------------------------------------------------------------*/
/* DATA                                                                               */
/*------------------------------------------------------------------------------------*/

/**
 * Retrieves the list of tables
 * @param {string} database Database name
 * @param {string} token String used to filter tables
 */
export function getTables(database, token = '') {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_TABLES_REQUEST
        });

        api.getTables(database, token)
            .then(response => {
                dispatch({
                    type: GET_TABLES_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_TABLES_FAIL,
                    payload: error
                })
            });
    }
}

/*------------------------------------------------------------------------------------*/
/* UI                                                                                 */
/*------------------------------------------------------------------------------------*/
