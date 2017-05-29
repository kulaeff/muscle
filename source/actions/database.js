import { push } from 'react-router-redux'
import {
    GET_TABLES_REQUEST,
    GET_TABLES_SUCCESS,
    GET_TABLES_FAIL,
    CLOSE_DATABASE_WINDOW,
    SET_DATABASE_WINDOW_STATE
} from '../constants/database'
import { SET_DATABASE_NAME } from '../constants/server'
import {
    restoreWindow as restoreServerWindow
} from '../actions/server'

/**
 * Retrieves the list of tables
 * @param {string} database Database name
 * @param {string} token String used to filter tables
 */
export function getTables(database, token = '') {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_TABLES_REQUEST
        })

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

/* Windows */

/**
 * Closes window
 */
export function closeWindow() {
    return async (dispatch) => {
        dispatch({
            type: CLOSE_DATABASE_WINDOW
        });

        dispatch({
            type: SET_DATABASE_NAME,
            payload: ''
        });

        dispatch(push('/server'));

        dispatch(restoreServerWindow());
    };
}

/**
 * Minimizes window
  */
export function minimizeWindow() {
    return {
        type: SET_DATABASE_WINDOW_STATE,
        payload: true
    }
}

/**
 * Restores window
  */
export function restoreWindow() {
    return {
        type: SET_DATABASE_WINDOW_STATE,
        payload: false
    }
}