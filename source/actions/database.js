import {
    GET_DATABASE_REQUEST,
    GET_DATABASE_SUCCESS,
    GET_DATABASE_FAIL,
    CLOSE_DATABASE_WINDOW,
    SET_DATABASE_WINDOW_STATE
} from '../constants/database'
import { SET_SELECTED_DATABASE } from '../constants/server'
import {
    restoreWindow as restoreServerWindow
} from '../actions/server'

/**
 * Retrieves the list of tables
 * @func
 * @param {string} database Database name
 * @param {string} token String used to filter tables
 */
export function getDatabase(name, token = '') {
    return async (dispatch, getState, api) => {
        dispatch({
            type: GET_DATABASE_REQUEST
        })

        try {
            const response = await api.getDatabase(name, token)

            dispatch({
                type: GET_DATABASE_SUCCESS,
                payload: response.data
            })
        } catch(ex) {
            dispatch({
                type: GET_DATABASE_FAIL,
                payload: ex
            })
        }
    }
}

/**
 * Closes window, resets selected database and restores Server window
 * @func
 */
export function closeWindow() {
    return async (dispatch) => {
        dispatch({
            type: CLOSE_DATABASE_WINDOW
        });

        dispatch({
            type: SET_SELECTED_DATABASE,
            payload: null
        });

        dispatch(restoreServerWindow());
    };
}

/**
 * Minimizes window
 * @func
 */
export function minimizeWindow() {
    return {
        type: SET_DATABASE_WINDOW_STATE,
        payload: true
    }
}

/**
 * Restores window
 * @func
 */
export function restoreWindow() {
    return {
        type: SET_DATABASE_WINDOW_STATE,
        payload: false
    }
}